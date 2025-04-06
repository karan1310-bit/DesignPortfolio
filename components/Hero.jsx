import Image from 'next/image'
import React from 'react'
import { BsArrowDown } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="mt-16 font-satoshi px-6">
      <h1 className="text-[9vw] leading-[0.9] font-bold">
        CREATIVE
        <br />
        DEVELOPER
      </h1>
      <div className="flex items-center gap-24">
      <div className="mt-6 min-w-2xl">
        <Image
          src="/images/img1.png" // Replace with actual image
          alt="Portrait of Richard"
          width={1600}
          height={600}
          className="w-full h-[300px] object-cover object-top"
        />
      </div>
      <div className='mt-64 flex gap-2 items-center'>
        <p className="text-xl font-medium leading-7">
        I collaborate with agencies to engineer modern, expressive web interfaces. I’m currently available for freelance work.
        </p>
        <BsArrowDown className="text-4xl" />
      </div>
      </div>
    </section>
  );
}

export default Hero