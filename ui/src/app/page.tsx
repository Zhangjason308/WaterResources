'use client';

import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import MapSection from "@/sections/MapSection";
import 'leaflet/dist/leaflet.css';


function Setup() {
  let stuff = document.getElementsByTagName('MapContainer')
  console.log(stuff);
  return null
}

export default function Home({ params }: { params: { event: string }}) {

    return (
    <>
      <Header />
      <Hero />
      <div>
        <MapSection />
      </div>
    </>
  );
}