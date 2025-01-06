'use client';

import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const DynamicMap = dynamic(() => import('@/sections/Map'), {
  ssr: false,
});

export default function Home({ params }: { params: { event: string } }) {
  return (
    <>
      <Header />
      <Hero />
      <div style={{ height: '675px', width: '1200px' }}>
        <DynamicMap params={params} />
      </div>
    </>
  );
}