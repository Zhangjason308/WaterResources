import Image from 'next/image';
import React, { useEffect, useState, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import searchIcon from '@/assets/search-image.png';
import getLocImage from '@/assets/my-location.png';
import washroomPin from '@/assets/bathroom-pin.png';
import userPin from '@/assets/placeholder_map_pin.png';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { icon, Map } from 'leaflet';
import { fetchLocationData, Washroom_Location, Water_Fountain_Location} from './LocationFunction';


const libraries = ["places"];
const washroomIcon = icon({
    iconUrl: washroomPin.src,
    iconSize: [48, 48]
});

const userIcon = icon({
    iconUrl: userPin.src,
    iconSize: [48, 48]
});


let currentLocationLayer: L.Marker;

function MapSection() {
    const [washroomLocations, setWashroomLocations] = useState<Washroom_Location[]>([]);
    const [fountainLocations, setFountainLocations] = useState<Water_Fountain_Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { washroomLocations, fountainLocations } = await fetchLocationData();
            setWashroomLocations(washroomLocations);
            setFountainLocations(fountainLocations);
          } catch (error) {
            console.error('Error fetching locations:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, []);

    const center = {
        lat: 45.25350,
        lng: -75.73308
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
        // @ts-ignore
        libraries,
    });

    const [input, setInput] = useState<{ streetAddress?: string; latitude?: number; longitude?: number }>({});
    const inputRef = useRef(null);

    useEffect(() => {
        if (!isLoaded || loadError) return;

        const options = {
            bounds: {
                north: center.lat + 0.55,
                south: center.lat - 0.55,
                east: center.lng + 0.55,
                west: center.lng - 0.55,
            },
            strictBounds: true,
            componentRestrictions: { country: "ca" },
            fields: ["address_components", "geometry"],
        };

        if (inputRef.current) {
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current as HTMLInputElement, options);
            autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
        }
    }, [isLoaded, loadError]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setInput((values) => ({ ...values, [name]: value }));
    };

    const handlePlaceChanged = async (address: any) => {
        if (!isLoaded) return;
        const place = address.getPlace();

        if (!place || !place.geometry) {
            setInput({});
            return;
        }
        formData(place);
    };

    const formData = (data: any) => {
        const addressComponents = data?.address_components;

        const componentMap = {
            subPremise: "",
            premise: "",
            street_number: "",
            route: "",
            country: "",
            postal_code: "",
            administrative_area_level_2: "",
            administrative_area_level_1: "",
        };

        for (const component of addressComponents) {
            const componentType = component.types[0] as keyof typeof componentMap;
            if (componentMap.hasOwnProperty(componentType)) {
                componentMap[componentType] = component.long_name;
            }
        }

        const formattedAddress =
            `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}, ${componentMap.administrative_area_level_2}, ${componentMap.administrative_area_level_1}`.trim();
        const latitude = data?.geometry?.location?.lat();
        const longitude = data?.geometry?.location?.lng();

        setInput((values) => ({
            ...values,
            streetAddress: formattedAddress,
            country: componentMap.country,
            zipCode: componentMap.postal_code,
            city: componentMap.administrative_area_level_2,
            state: componentMap.administrative_area_level_1,
            latitude: latitude,
            longitude: longitude,
        }));
    };

    let map: Map;

    function GetMap() {
        map = useMap();
        return null;
    }

    function handleClick() {
        const lat = input.latitude;
        const long = input.longitude;
        if (lat !== undefined && long !== undefined) {
            mapFly(lat, long);
        }
    }

    function mapFly(lat: number, long: number) {
        if (!currentLocationLayer) {
            currentLocationLayer = L.marker([lat, long], { icon: userIcon }).addTo(map);
        }
        if (lat && long) {
            map.flyTo([lat, long], 16);
        }
        currentLocationLayer.setLatLng([lat, long]);
    }

    function showPosition(position: any) {
        mapFly(position.coords.latitude, position.coords.longitude);
    }

    function getLoc() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported");
        }
    }

    return (
        <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='col-span-1'>
                <div className='p-2 md:p-6 border-[2px] rounded-xl'>
                    <p className='text-[20px] font-bold'>Find a resource near you</p>
                    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
                        <Image src={searchIcon} width={24} height={24} alt='Search Icon' />
                        <input
                            type='text'
                            placeholder='Search Location'
                            className='bg-transparent w-full outline-none'
                            ref={inputRef}
                            name="streetAddress"
                            value={input.streetAddress || ""}
                            onChange={handleChange}
                            required
                        />
                        <button className='p-0 text-white rounded-lg' onClick={getLoc}>
                            <Image src={getLocImage} width={30} height={30} alt='Search Icon' />
                        </button>
                    </div>
                    <button className='p-3 bg-black w-full mt-5 text-white rounded-lg' onClick={handleClick}>
                        Search
                    </button>
                </div>
            </div>
            <div className='col-span-2' style={{ height: '700px' }}>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    {!loading ? (
                        <MapContainer
                            style={{ height: '100%', width: '100%' }}
                            center={center}
                            zoom={13}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <GetMap />
                            {washroomLocations.map((location) => (
                                <Marker
                                    key={location._id}
                                    position={[location.Y_COORDINATE, location.X_COORDINATE]} 
                                    icon={washroomIcon}
                                >
                                    <Popup>
                                    <div>
                                        <h2><u><strong>{location.NAME}</strong></u></h2>
                                        <ul>
                                            <li><strong>Address: </strong>{location.ADDRESS}</li>
                                            <li>
                                                <strong>Hours: </strong>
                                                <details>
                                                    <summary>View Hours</summary>
                                                    <ul>
                                                        <li>Monday: {location.HOURS_MONDAY_OPEN} - {location.HOURS_MONDAY_CLOSED}</li>
                                                        <li>Tuesday: {location.HOURS_TUESDAY_OPEN} - {location.HOURS_TUESDAY_CLOSED}</li>
                                                        <li>Wednesday: {location.HOURS_WEDNESDAY_OPEN} - {location.HOURS_WEDNESDAY_CLOSED}</li>
                                                        <li>Thursday: {location.HOURS_THURSDAY_OPEN} - {location.HOURS_THURSDAY_CLOSED}</li>
                                                        <li>Friday: {location.HOURS_FRIDAY_OPEN} - {location.HOURS_FRIDAY_CLOSED}</li>
                                                        <li>Saturday: {location.HOURS_SATURDAY_OPEN} - {location.HOURS_SATURDAY_CLOSED}</li>
                                                        <li>Sunday: {location.HOURS_SUNDAY_OPEN} - {location.HOURS_SUNDAY_CLOSED}</li>
                                                    </ul>
                                                </details>
                                            </li>
                                        </ul>
                                    </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    ) : (
                        <p>Loading map data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MapSection;
