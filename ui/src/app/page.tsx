'use client';

import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { AboutUs } from "@/sections/AboutUs";

import MapSection from "@/sections/MapSection";
import { Tutorial } from "@/sections/Tutorial";
import { Footer } from "@/sections/Footer";
import 'leaflet/dist/leaflet.css';
import dynamic from "next/dynamic";
import {UserForm} from "@/sections/UserForm";

const DynamicMap = dynamic(() => import('@/sections/MapSection'), {
    ssr: false,
});


export default function Home({ params }: { params: { event: string }}) {

    return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <DynamicMap />
      <Tutorial/>
        <UserForm />
      <Footer/>
    </>
  );
}