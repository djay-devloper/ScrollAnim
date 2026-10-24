import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const carImage = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100">
    <path d="M32 60 48 34c4-7 10-11 19-11h73c9 0 16 4 21 12l17 25c10 2 16 9 16 19v8H22v-8c0-10 3-16 10-19Z" fill="#b8f36b"/>
    <path d="m57 42 9-13c2-3 5-5 10-5h27v22H52l5-4Zm54 4V24h27c5 0 9 2 12 7l11 15h-50Z" fill="#17251d"/>
    <path d="M29 61h164" stroke="#526542" stroke-width="4"/>
    <circle cx="61" cy="82" r="15" fill="#111916"/><circle cx="61" cy="82" r="7" fill="#d7e2d1"/>
    <circle cx="165" cy="82" r="15" fill="#111916"/><circle cx="165" cy="82" r="7" fill="#d7e2d1"/>
    <path d="M25 66h16v10H24m168-10h8v10h-10" fill="#fff0ad"/>
  </svg>
`)}`;

const stats = [
  {
    value: "58%",
    label: "Increase in pick up point use",
    className: "bg-lime-300 text-[#17251d]",
  },
  {
    value: "23%",
    label: "Decreased in customer phone calls",
    className: "bg-sky-300 text-[#10212a]",
  },
  {
    value: "27%",
    label: "Increase in pick up point use",
    className: "bg-zinc-800 text-white",
  },
  {
    value: "40%",
    label: "Decreased in customer phone calls",
    className: "bg-orange-300 text-[#302016]",
  },
];

export default function App() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const carRef = useRef(null);
  const progressRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const context = gsap.context(() => {
      // The intro plays once on load; the scroll timeline below is controlled by scrolling.
      gsap.from(headlineRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(cardsRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.2,
        delay: 0.2,
        ease: "power2.out",
      });

      // Pin the first-screen hero and scrub the car and trail across it with page scroll.
      const drive = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      drive
        .to(
          carRef.current,
          {
            x: () =>
              Math.max(
                0,
                sectionRef.current.clientWidth - carRef.current.offsetWidth - 48,
              ),
            ease: "none",
          },
          0,
        )
        .to(progressRef.current, { scaleX: 1, ease: "none" }, 0);

      // Refresh after the pinned timeline is in place so the initial scroll range is measured.
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#091310] text-[#f6f8f5]">
      <div className="relative h-[250vh]">
        <section
          ref={sectionRef}
          className="hero-section relative flex h-screen min-h-[620px] w-full flex-col overflow-hidden bg-[#091310] px-5 sm:px-10 lg:px-16"
          aria-label="Welcome to ItzFizz"
        >
          <header className="hero-header flex items-center justify-between pt-7 sm:pt-9">
            <a href="#" className="text-lg font-black tracking-tight" aria-label="ItzFizz home">
              itz<span className="text-lime-300">fizz</span>
            </a>
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50 sm:text-xs">
              Scroll to take a ride <span aria-hidden="true">↓</span>
            </span>
          </header>

          <div className="hero-content mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center pb-5">
            <div className="hero-heading mb-7 text-center sm:mb-10">
              <p className="hero-kicker mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-lime-300 sm:text-xs">
                Delivery, with a little more fizz
              </p>
              <h1
                ref={headlineRef}
                className="text-[clamp(1.45rem,5.8vw,4.8rem)] font-black leading-none tracking-[0.12em] text-white"
              >
                W E L C O M E <span className="text-lime-300">I T Z F I Z Z</span>
              </h1>
            </div>

            <div className="hero-track relative mb-9 h-24 sm:mb-12 sm:h-32" aria-label="Car moving along a track">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/20" />
              <div
                ref={progressRef}
                className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 origin-left scale-x-0 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(184,243,107,0.55)]"
              />
              <img
                ref={carRef}
                src={carImage}
                alt="car"
                className="absolute left-0 top-1/2 z-10 w-24 -translate-y-1/2 sm:w-36"
              />
              <div className="hero-track-labels absolute left-0 right-0 top-[calc(50%+24px)] flex justify-between text-[9px] font-medium uppercase tracking-[0.2em] text-white/35 sm:top-[calc(50%+34px)] sm:text-[10px]">
                <span>Pickup</span>
                <span>Delivered</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <article
                  key={`${stat.value}-${index}`}
                  ref={(element) => {
                    cardsRef.current[index] = element;
                  }}
                  className={`hero-stat-card min-h-28 rounded-2xl p-4 sm:min-h-36 sm:rounded-3xl sm:p-6 ${stat.className}`}
                >
                  <p className="hero-stat-value text-3xl font-black leading-none tracking-tight sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="hero-stat-label mt-3 max-w-[17ch] text-xs font-medium leading-snug opacity-80 sm:mt-4 sm:text-sm">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <footer className="hero-footer flex items-center justify-between pb-6 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:pb-8 sm:text-[10px]">
            <span>Small journeys. Big impact.</span>
            <span>01 — 04</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
