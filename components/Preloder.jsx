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

    requestAnimationFrame(() => {
      const { initial, complete, percentage } = refs;

      // Make sure preloader is visible only after styles are set
      gsap.set(".preloader", { visibility: "visible" });

      // Setup initial states
      gsap.set(initial.current, { opacity: 1, y: 0, display: "block" });
      gsap.set(complete.current, { opacity: 0, y: 30, display: "none" });

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
        .to(initial.current, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(initial.current, { display: "none" });
            gsap.set(complete.current, { display: "block" });
          },
        })
        .to(
          complete.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          ">"
        )
        .to(".preloader", {
          y: "-100vh",
          duration: 1,
          ease: "power2.inOut",
          delay: 0.8,
        })
        .set(".preloader", { display: "none" });
    });
  }, []);

  return (
    <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#e5e3e0] font-satoshi invisible">
      {/* Progress bar */}
      <div className="progress-container w-[80%] max-w-[300px] h-[2px] bg-white/10 mb-2 relative">
        <div className="progress-bar absolute top-0 left-0 h-full w-0 bg-black" />
      </div>

      {/* Animated text */}
      <div className="text-container relative overflow-hidden my-2 text-center uppercase tracking-tight text-base sm:text-xl md:text-xl lg:text-xl leading-none w-[70%] sm:w-[250px] md:w-[300px] h-12 sm:h-14 md:h-16">
        <div
          ref={refs.initial}
          className="absolute w-full opacity-0 translate-y-0"
        >
          Don’t blink
        </div>
        <div
          ref={refs.complete}
          className="absolute w-full opacity-0 translate-y-8"
        >
          Told you not to
        </div>
      </div>

      {/* Percentage counter */}
      <div
        ref={refs.percentage}
        className="percentage fixed bottom-6 right-4 text-[11rem] sm:text-[12rem] md:text-[13rem] lg:text-[13rem] xl:text-[15rem] 2xl:text-[15rem] font-bold opacity-10 leading-[0.8]"
      >
        0
      </div>
    </div>
  );
};

export default Preloader;

