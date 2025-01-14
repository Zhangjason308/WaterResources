'use client';

import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import SearchSection from "@/sections/SearchSection";
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
      <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='col-span-1'>
          <SearchSection />
        </div>
        <div className='col-span-2' style={{ height: '675px' }}>
          <DynamicMap />
        </div>
      </div>
    </>
  );
}