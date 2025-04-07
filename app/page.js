'use client'
import Hero from "@/components/Hero";
import Header from "@/components/navbarr/Header";
import Preloader from "@/components/Preloder";
import Lenis from 'lenis'
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <main className="bg-[#e5e3e0] text-black min-h-screen w-full">
      <Preloader />
      <Header />
      <Hero />
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </main>
  );
}
