'use client'
import Cursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import HomeHobbie from "@/components/HomeHobbie";
import Header from "@/components/navbarr/Header";
import RecentProject from "@/components/RecentProject";
import Lenis from 'lenis'
import { useEffect } from "react";
import { motion } from 'framer-motion'

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
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1, ease: "easeInOut" }}
  className="bg-[#e5e3e0]"
>
    <main className="bg-[#e5e3e0] text-black min-h-screen w-full overflow-hidden">
      <Cursor />
      <Header />
      <Hero />
      <HomeAbout />
      <HomeHobbie />
      <RecentProject />
      <Footer />
    </main>  </motion.div>
  );
}