'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from './nav/Nav';

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed w-full bg-[#e5e3e0] text-black font-satoshi px-6 py-4 md:px-8 md:py-8 z-10">
  <motion.div
    variants={background}
    initial="initial"
    animate={isActive ? 'open' : 'closed'}
    className="absolute left-0 top-0 w-full h-full bg-black opacity-50"
  ></motion.div>

  <div className="relative flex justify-between items-center w-full text-[12px] sm:text-[15px] uppercase font-medium">
    {/* Left Side: Logo */}
    <Link href="/" className="text-black text-base font-medium no-underline">
      K
    </Link>

    {/* Center Info for md+ screens */}
    <div className="hidden md:block font-medium text-center">
      Currently a Freelance Developer
    </div>

    <div className="hidden md:block font-medium text-center">Based in Ujjain, India</div>

    {/* Right Side: Menu Toggle */}
    <div onClick={() => setIsActive(!isActive)} className="cursor-pointer relative text-base flex items-center font-medium font-satoshi">
      <motion.p variants={opacity} animate={!isActive ? 'open' : 'closed'}>
        Menu
      </motion.p>
      <motion.p
        variants={opacity}
        animate={isActive ? 'open' : 'closed'}
        className="absolute opacity-0"
      >
        Close
      </motion.p>
    </div>
  </div>

  <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
</div>

  );
}
