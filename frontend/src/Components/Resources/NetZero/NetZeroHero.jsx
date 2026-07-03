/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Leaf, Cpu, Recycle, ArrowDown } from "lucide-react";
import ScrollRevealElements from "../../Animations/ScrollRevealElements";

const NetZeroHero = () => {
  const highlights = [
    { label: "Reuse (DNTS)", Icon: Recycle },
    { label: "Reduce (IoT Smart)", Icon: Cpu },
    { label: "Recycle (Rainwater)", Icon: Leaf },
  ];

  // ==================== OPTION 1: ECO-VIBRANT & INTERACTIVE (DEFAULT) ====================
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#7dbea8] to-[#98d8dc] px-4 py-20 md:px-8 md:py-24 overflow-hidden">
      {/* floating bubbles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 80 + 20;
          return (
            <div
              key={i}
              className="absolute bottom-[-150px] bg-white/30 rounded-full animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                animationDelay: `-${Math.random() * 25}s`,
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          );
        })}
      </div>

      <ScrollRevealElements
        className="relative z-10 text-center mb-16 md:mb-28 w-full max-w-5xl mx-auto"
        staggerAmount={0.4}
      >
        <motion.div className="flex justify-center mb-4">
          <Player
            autoplay
            loop
            src="/lottie-assets/Recycle-Process-Animetion/animations/175a9a37-546c-4c9a-9f82-4c1bf51fb1ac.json"
            className="w-36 h-36 lg:w-48 lg:h-48 lg:translate-y-5"
          />
        </motion.div>
        
        <motion.h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-wider leading-tight">
          <span className="block"><span className="text-[#02ffe6]">Net-Zero</span> &amp; Water</span>
          <span className="block">Positive <span className="text-[#02ffe6]">Campus</span></span>
        </motion.h1>
        
        <motion.p className="mt-6 text-white/95 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-semibold">
          Transitioning to eco-friendly, resource-efficient institutions by integrating smart technologies, 
          decentralized nature-based treatments, and water security solutions.
        </motion.p>
        
        <motion.div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 lg:gap-6">
          {highlights.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex h-12 w-full max-w-[260px] sm:w-auto sm:min-w-[220px] items-center justify-center gap-3 rounded-full border border-teal-900/50 bg-teal-950/70 px-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all duration-300 hover:bg-teal-950/90 hover:scale-105"
            >
              <Icon className="h-5 w-5 flex-shrink-0 text-[#02ffe6]" strokeWidth={2.5} />
              <span className="text-sm sm:text-base font-bold tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>
      </ScrollRevealElements>

      {/* SVG Waves */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#e2f0ed"
            fillOpacity="0.5"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#e2f0ed"
              fillOpacity="1"
              d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,250.7C672,267,768,245,864,213.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ArrowDown className="w-8 h-8 text-emerald-600/90" strokeWidth={3} />
      </div>
    </section>
  );
};

export default NetZeroHero;
