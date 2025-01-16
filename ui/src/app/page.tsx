'use client';

import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import MapSection from "@/sections/MapSection";
import 'leaflet/dist/leaflet.css';

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