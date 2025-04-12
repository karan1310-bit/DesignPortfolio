import { useEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = () => {
  const refs = {
    initial: useRef(null),
    complete: useRef(null),
    percentage: useRef(null),
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const { initial, complete, percentage } = refs;
  
    // Set initial states
    gsap.set(initial.current, { opacity: 1, y: 0 });
    gsap.set(complete.current, { opacity: 0, y: 30 });
  
    const tl = gsap.timeline();
  
    tl.to(".progress-bar", {
      width: "100%",
      duration: 4,
      ease: "power1.inOut",
      onUpdate: function () {
        if (percentage.current) {
          percentage.current.textContent = Math.round(this.progress() * 100);
        }
      },
    })
    // FIX: Remove the overlap by sequencing animations properly
    .to(initial.current, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    })
    .to(complete.current, { // Remove the "<0.1" offset
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    })  
      .to(".preloader", {
        y: "-100vh",
        duration: 1,
        ease: "power2.inOut",
        delay: 0.8,
      })
      .set(".preloader", { display: "none" });
  }, []);

  return (
    <div className="preloader fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#e5e3e0] font-satoshi">
      {/* Progress bar */}
      <div className="progress-container w-[80%] max-w-[300px] h-[1px] md:h-[2px] bg-white/10 mb-2 relative">
        <div className="progress-bar absolute top-0 left-0 h-full w-0 bg-black" />
      </div>

      {/* Animated text */}
      <div className="text-container relative overflow-hidden my-2 text-center uppercase tracking-tight text-sm sm:text-xl leading-none w-[70%] sm:w-[250px] md:w-[300px] h-12 sm:h-14 md:h-16">
        <div ref={refs.initial} className="absolute w-full">
        don’t tell anyone
        </div>
        <div ref={refs.complete} className="absolute w-full">
        I'm Batman
        </div>
      </div>

      {/* Percentage counter */}
      <div
        ref={refs.percentage}
        className="percentage fixed bottom-6 right-4 text-[7rem] sm:text-[8rem] md:text-[9rem] lg:text-[10rem] xl:text-[14rem] 2xl:text-[16rem] font-bold opacity-10 leading-[0.8]"
      >
        0
      </div>
    </div>
  );
};

export default Preloader;