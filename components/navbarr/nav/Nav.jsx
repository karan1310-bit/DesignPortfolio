'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './body/index';
import Footer from './footer/index';

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Work',
    href: '/work',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export default function Nav({ textColor = '#000000' }) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden"
      style={{ color: textColor }}
    >
      <div className="flex flex-col font-satoshi lg:flex-row gap-[50px] mb-[80px] lg:mb-0 lg:justify-between">
        <div className="flex flex-col justify-between">
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
          <Footer />
        </div>
      </div>
    </motion.div>
  );
}