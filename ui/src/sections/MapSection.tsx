import Image from 'next/image';
import React, { useEffect, useState, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import searchIcon from '@/assets/search-image.png';
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import { Map } from 'leaflet';

const libraries = ["places"]


function MapSection() {
    // Place Autocomplete API stuff
    const center = {
        lat: 45.25350,
        lng: -75.73308
    }

    const ottawa = {
        north: center.lat + 0.55,
        south: center.lat - 0.55,
        east: center.lng + 0.55,
        west: center.lng - 0.55,
    };

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries,
    });

    const [input, setInput] = useState({});
    const inputRef = useRef(null);

    useEffect(() => {
        if (!isLoaded || loadError) return;

        const options = {
            bounds: ottawa,
            strictBounds: true, // restrict to ottawa area
            componentRestrictions: {country: "ca"},
            fields: ["address_components", "geometry"],
        };

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.set
        autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));

        // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
    }, [isLoaded, loadError]);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setInput((values) => ({...values, [name]: value}));
    };

    const handlePlaceChanged = async (address: any) => {
        if (!isLoaded) return;
        const place = address.getPlace()

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
            const componentType = component.types[0];
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
        map = useMap()
        return null
    }

    function handleClick(){
        let lat:any = input.latitude
        let long:any = input.longitude
        if (lat && long) {
            map.flyTo([lat, long], 16);
        }
    }

    return (
        <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='col-span-1'>
                <div className='p-2 md:p-6 border-[2px] rounded-xl'>
                    <p className='text-[20px] font-bold'>Find a pee pee spot</p>
                    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
                        <Image src={searchIcon} width={24} height={24} alt='Search Icon'/>
                        <input type='text'
                               placeholder='Current Location'
                               className='bg-transparent w-full outline-none'
                               ref={inputRef}
                               name="streetAddress"
                               value={input.streetAddress || ""}
                               onChange={handleChange}
                               required/>
                    </div>
                    <button className=' p-3 bg-black w-full mt-5 text-white rounded-lg'
                            onClick={handleClick}>Search
                    </button>
                </div>
            </div>
                <div className='col-span-2' style={{height: '700px'}}>
                    <div style={{
                        height: '100%',
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <MapContainer
                            style={{height: '100%', width: '100%'}}
                            center={center}
                            zoom={13}
                            scrollWheelZoom={true}
                            id="map-container"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <GetMap />
                        </MapContainer>
                    </div>
                </div>
        </div>
    );
}

export default MapSection;