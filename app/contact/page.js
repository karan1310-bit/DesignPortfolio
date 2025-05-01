'use client'
import Lenis from 'lenis'
import { useEffect } from "react";
import { motion } from 'framer-motion'
import StarfieldBackground from "@/components/StarfieldBackground ";
import Header from '@/components/navbarr/Header';
import Link from 'next/link';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="bg-black"
    >
      <main className="bg-black text-[#EDE8D0] relative font-satoshi min-h-screen w-full overflow-hidden ">
        <Header backgroundColor="#000000" textColor="#EDE8D0" />

        <StarfieldBackground />

        <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-12 py-4 lg:py-8">
          {/* Centered Email */}
          <section className="flex flex-col items-center justify-center text-center px-4 grow">
            <p className="text-lg md:text-xl font-medium leading-tight mb-4">
              Send me a message
            </p>
            <h1 className="text-[10vw] sm:text-5xl md:text-7xl lg:text-9xl font-bold leading-none">
              {["KFREELANCE", "@GMAIL.COM"].map((line) => (
                <a
                  key={line}
                  href="mailto:kfreelance131@gmail.com"
                  className="block relative overflow-hidden group"
                >
                  <span className="relative z-10">{line}</span>
                  <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#EDE8D0] transform scale-x-0 group-hover:scale-x-100 group-hover:translate-x-0 translate-x-[-100%] origin-left transition-transform duration-500 ease-out" />
                </a>
              ))}
            </h1>
          </section>

          {/* Bottom Social Links */}
          <div className="flex items-center justify-between text-xl md:text-2xl uppercase font-medium w-full">

            <Link
              href="https://www.instagram.com/bhati_.01?igsh=Z3VyZjlpYjh5Znc2"
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">INSTAGRAM</span>
              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#EDE8D0] transform scale-x-0 group-hover:scale-x-100 group-hover:translate-x-0 translate-x-[-100%] origin-left transition-transform duration-500 ease-out" />
            </Link>

            <Link
              href="https://x.com/bhati_131?t=vnNfkKdx59cJmwNvNuOHrQ&s=09"
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">X</span>
              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#EDE8D0] transform scale-x-0 group-hover:scale-x-100 group-hover:translate-x-0 translate-x-[-100%] origin-left transition-transform duration-500 ease-out" />
            </Link>

            <Link
              href="https://github.com/karan1310-bit"
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">GITHUB</span>
              <span className="absolute left-0 bottom-0 h-[1px] w-full bg-[#EDE8D0] transform scale-x-0 group-hover:scale-x-100 group-hover:translate-x-0 translate-x-[-100%] origin-left transition-transform duration-500 ease-out" />
            </Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
}