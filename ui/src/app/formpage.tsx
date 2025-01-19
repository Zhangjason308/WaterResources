'use client';

import { Header } from "@/sections/Header";
import 'leaflet/dist/leaflet.css';
import dynamic from "next/dynamic"

export default function Home({ params }: { params: { event: string }}) {

    return (
        <>
            <Header/>
            <section
                className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_80%)]">
                <label> Your name: </label>
                <input type="text" name="nameInput"> </input> <br> </br>
                <label> Your email: </label>
                <input type="text" name="emailInput"> </input>
                <label> Address of Resource: </label>
                <input type="text" name="addressInput"> </input>
                <label> Nature of update: </label>
                <select name="typeInput">
                    <option value="newWashroom">Report a new washroom</option>
                    <option value="newFountain">Report a new water fountain</option>
                    <option value="newShower">Report a new shower</option>
                    <option value="updateWashroom">Update washroom info</option>
                    <option value="updateFountain">Update fountain info</option>
                    <option value="updateShower">Update shower info</option>
                    <option value="missingWashroom">Report a missing washroom</option>
                    <option value="missingFountain">Report a missing fountain</option>
                    <option value="missingShower">Report a missing shower</option>
                </select>
                <label> Any other information/comments: </label>
                <input type="text" name="infoInput"> </input>
            </section>
        </>
    );
}