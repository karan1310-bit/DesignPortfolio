'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = () => {
  const refs = {
    container: useRef(null),
    initial: useRef(null),
    complete: useRef(null),
    percentage: useRef(null),
  };

  useGSAP(() => {
    const { container, initial, complete, percentage } = refs;

    const seen = sessionStorage.getItem('hasSeenPreloader');
    if (seen) {
      gsap.set(container.current, { display: 'none' });
      return;
    }

    gsap.set(initial.current, { opacity: 1, y: 0 });
    gsap.set(complete.current, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hasSeenPreloader', 'true');
        container.current.style.display = 'none';
      },
    });

    tl.to('.progress-bar', {
      width: '100%',
      duration: 4,
      ease: 'power1.inOut',
      onUpdate() {
        if (percentage.current) {
          percentage.current.textContent = Math.round(this.progress() * 100);
        }
      },
    })
      .to(initial.current, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      })
      .to(complete.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(container.current, {
        y: '-100vh',
        duration: 1,
        ease: 'power2.inOut',
        delay: 0.8,
      });
  }, []);

  return (
    <div
      ref={refs.container}
      className="preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-satoshi"
    >

      <div className='fixed top-8 left-8'>
        <p className="text-lg sm:text-2xl font-medium text-[#EDE8D0]">&copy; K 2025</p>
      </div>

      <div className="progress-container w-[80%] max-w-[300px] h-[1px] md:h-[2px] bg-black mb-2 relative">
        <div className="progress-bar absolute top-0 left-0 h-full w-0 bg-white/20" />
      </div>

      <div
        ref={refs.percentage}
        className="percentage fixed bottom-8 right-4 text-[6rem] sm:text-[9rem] md:text-[14rem] lg:text-[15rem] xl:text-[18rem] 2xl:text-[20rem] font-medium text-[#EDE8D0] leading-[0.8]"
      >
        0
      </div>
    </div>
  );
};

export default Preloader;
