import Image from 'next/image';
import React from 'react';
import { BsArrowDown } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="pt-32 md:pt-28 px-6 sm:px-6 md:px-10 lg:px-12 font-satoshi">
      <h1 className="text-[15vw] sm:text-[10vw] md:text-[8vw] lg:text-[9.5vw] xl:text-[9.5vw] font-bold leading-[0.9]">
        CREATIVE
        <br />
        DEVELOPER
      </h1>

      <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-start md:items-start gap-10 md:gap-16 lg:gap-24">
  {/* Image Section */}
  <div className="w-3/4 md:w-1/2">
    <div className="aspect-[1/1] md:aspect-[3/1.2] overflow-hidden">
      <Image
        src="/images/img1.png" // Replace with your image
        alt="Portrait of Richard"
        width={1600}
        height={600}
        className="w-full h-full object-cover object-top"
        priority
      />
    </div>
  </div>

  <div className='flex items-start md:hidden gap-2'>
  <h1 className='text-[13vw] uppercase font-semibold leading-[0.9]'>Karan</h1>
  <BsArrowDown className="text-4xl mt-2 font-bold self-start" />
  </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col md:gap-2 mt-2 md:mt-12 lg:mt-36">
          <p className="text-xl font-medium leading-tight uppercase">
            I collaborate with agencies to engineer modern, expressive web interfaces. currently available for freelance work.
          </p>
          <BsArrowDown className="hidden md:block text-2xl sm:text-2xl self-start" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
