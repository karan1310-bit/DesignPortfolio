'use client'
import Cursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import HomeHobbie from "@/components/HomeHobbie";
import Header from "@/components/navbarr/Header";
import Preloader from "@/components/Preloader";
import RecentProject from "@/components/RecentProject";
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

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 4500);
  }, [])

  return (
    <main className="bg-[#e5e3e0] text-black min-h-screen w-full overflow-hidden">
      <Cursor />
      <Preloader />
      <Header />
      <Hero />
      <HomeAbout />
      <HomeHobbie />
      <RecentProject />
      <Footer />
    </main>
  
  );
}
