'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from './nav/Nav';
import { usePathname } from 'next/navigation';

export default function Header({
  backgroundColor = '#EDE8D0',
  textColor = '#000000',
}) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed w-full font-satoshi px-6 py-4 md:px-8 md:py-8 z-30"
      style={{ backgroundColor, color: textColor }}
    >
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? 'open' : 'closed'}
        className="absolute left-0 top-0 w-full h-full bg-black opacity-50"
      ></motion.div>

      <div className="relative flex justify-between items-center w-full text-[12px] sm:text-[15px] uppercase font-medium">
        <Link
          href="/"
          className="text-base font-medium no-underline"
          style={{ color: textColor }}
        >
          K
        </Link>

        <div className="hidden md:block font-medium text-center">
          Currently a Freelance Developer
        </div>
        <div className="hidden md:block font-medium text-center">
          Based in Ujjain, India
        </div>

        <div
          onClick={() => setIsActive(!isActive)}
          className="cursor-pointer relative text-base flex items-center font-medium font-satoshi"
        >
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

      <AnimatePresence mode="wait">{isActive && <Nav textColor={textColor} />}</AnimatePresence>
    </motion.div>
  );
}
