'use client'

import React, { useEffect, useState, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]



export default function Home() {

    // Place Autocomplete API stuff
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries,
    });

    const [input, setInput] = useState({});
    const inputRef = useRef(null);

    useEffect(() => {
        if (!isLoaded || loadError) return;

        const options = {
            componentRestrictions: { country: "ng" },
            fields: ["address_components", "geometry"],
        };

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));

        // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
    }, [isLoaded, loadError]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput((values) => ({ ...values, [name]: value }));
    };

    const handlePlaceChanged = async(address) => {
        if (!isLoaded) return;
        const place = address.getPlace()

        if (!place || !place.geometry) {
            setInput({});
            return;
        }
        formData(place);
    };

    const formData = (data) => {
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
            `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
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
    //---------------

    return (


        <div className="mb-4">
            <label className="text-md">Street address</label>
            <input
                type="text"
                name="streetAddress"
                ref={inputRef}
                value={input.streetAddress || ""}
                onChange={handleChange}
                className="search"
                placeholder="Enter Street Address"
                required
            />
        </div>

    );
}