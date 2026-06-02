import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Waves, Filter, FlaskConical, Sprout, Droplets, ChevronsDown } from "lucide-react";
import ScrollRevealElements from "../../Animations/ScrollRevealElements";

const DNTSFeatures = ({
  features,
  suitedFor,
  activeNode,
  setActiveNode,
  headingStyle,
  centerImage,
}) => {
  const swiperRef = useRef(null);

  return (
    <ScrollRevealElements
      className="w-full flex flex-col gap-6"
      staggerAmount={0.3}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Top Section: System Card & Suited For stack */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

        {/* Left Side: System Card */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border-2 border-[#10b981] flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0f5451] tracking-wide mb-1 text-left">
              Decentralised Natural Treatment System (DNTS)
            </h3>
            <p className="text-sm md:text-base font-semibold text-[#10b981] mb-6 text-left">
              Natural treatment at source
            </p>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow py-4">
            <img
              loading="lazy"
              src={centerImage || "/DNTS/dnts-system-updated.webp"}
              alt="Decentralised Natural Treatment System (DNTS) Diagram"
              className="w-full max-w-full h-auto object-contain rounded-xl"
              onError={(e) => {
                e.target.src = "https://placehold.co/800x400/a0aec0/ffffff?text=DNTS+System+Diagram";
              }}
            />
          </div>

          <div className="mt-4 flex flex-nowrap items-center justify-between gap-1 md:gap-1.5 text-xs md:text-sm font-extrabold text-[#0f5451] bg-teal-50/80 backdrop-blur-sm py-3 px-3 md:px-4 rounded-2xl border border-teal-200/50 shadow-inner overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 bg-white py-1 px-2.5 rounded-lg border border-teal-100/50 shadow-sm text-[10px] sm:text-xs md:text-sm whitespace-nowrap flex-shrink-0">
              <Waves className="w-3 h-3 md:w-3.5 md:h-3.5 text-teal-600 flex-shrink-0" />
              <span>Inlet</span>
            </div>
            <span className="text-teal-500 font-bold flex-shrink-0 text-xs md:text-sm">→</span>
            <div className="flex items-center gap-1 bg-white py-1 px-2.5 rounded-lg border border-teal-100/50 shadow-sm text-[10px] sm:text-xs md:text-sm whitespace-nowrap flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" strokeWidth={2.5} />
              <span>Screening</span>
            </div>
            <span className="text-teal-500 font-bold flex-shrink-0 text-xs md:text-sm">→</span>
            <div className="flex items-center gap-1 bg-white py-1 px-2.5 rounded-lg border border-teal-100/50 shadow-sm text-[10px] sm:text-xs md:text-sm whitespace-nowrap flex-shrink-0">
              <FlaskConical className="w-3 h-3 md:w-3.5 md:h-3.5 text-teal-600 flex-shrink-0" />
              <span>AABR</span>
            </div>
            <span className="text-teal-500 font-bold flex-shrink-0 text-xs md:text-sm">→</span>
            <div className="flex items-center gap-1 bg-white py-1 px-2.5 rounded-lg border border-teal-100/50 shadow-sm text-[10px] sm:text-xs md:text-sm whitespace-nowrap flex-shrink-0">
              <Sprout className="w-3 h-3 md:w-3.5 md:h-3.5 text-teal-600 flex-shrink-0" />
              <span>Constructed wetland</span>
            </div>
            <span className="text-teal-500 font-bold flex-shrink-0 text-xs md:text-sm">→</span>
            <div className="flex items-center gap-1 bg-white py-1 px-2.5 rounded-lg border border-teal-100/50 shadow-sm text-[10px] sm:text-xs md:text-sm whitespace-nowrap flex-shrink-0">
              <Droplets className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span>Treated water</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Suited For List */}
        <motion.div
          className="lg:col-span-1 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-base md:text-lg font-bold text-[#0f5451] tracking-widest uppercase">
                SUITED FOR
              </h4>
            </div>

            <div className="flex flex-col gap-4 flex-grow justify-between">
              {suitedFor.map(({ id, name, IconComponent }) => (
                <div
                  key={id}
                  onMouseEnter={() => setActiveNode(id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`flex items-center gap-4 bg-white rounded-2xl py-3.5 px-5 border border-slate-100/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${activeNode === id ? "ring-2 ring-[#10b981]/50 bg-emerald-50/20" : ""
                    }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#e5f2ee] rounded-xl flex items-center justify-center text-[#0f5451]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-[#1e3553] text-sm md:text-base text-left">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Downward Arrow - Double Chevron */}
      <div className="flex justify-center -mt-4 -mb-3 text-[#10b981]">
        <ChevronsDown size={36} className="animate-bounce-vertical text-[#10b981] stroke-[2.5]" />
      </div>

      {/* Separator Line:   DNTS FEATURES */}
      <div className="relative my-2 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#d0e5e0]"></div>
        </div>
        <div className="relative bg-[#e2f0ed] px-6 text-base md:text-lg font-extrabold tracking-widest text-[#0f5451] uppercase">
          DNTS FEATURES
        </div>
      </div>

      {/* Bottom Section: Swiper Features Slider */}
      <div className="relative w-full px-4 md:px-8">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: { slidesPerView: 2.2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 24 },
            768: { slidesPerView: 4, spaceBetween: 24 },
            1024: { slidesPerView: 5, spaceBetween: 28 },
          }}
          grabCursor={true}
          speed={800}
          modules={[Autoplay]}
          className="w-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {features.map((feat) => (
            <SwiperSlide key={feat.id} className="py-4">
              <div
                onMouseEnter={() => setActiveNode(feat.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-4 bg-white transition-all duration-300 ease-in-out group-hover:-translate-y-1 ${
                    activeNode === feat.id
                      ? "border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                      : "border-[#10b981]/70 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                  }`}
                >
                  <img
                    loading="lazy"
                    src={feat.image}
                    alt={feat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="absolute inset-0 items-center justify-center bg-white"
                    style={{ display: "none" }}
                  >
                    <feat.IconComponent className="w-8 h-8 text-[#10b981]" />
                  </div>
                </div>
                <p className="mt-2 w-full text-xs md:text-sm font-extrabold leading-snug text-[#0f5451] break-words px-1 max-w-[150px]">
                  {feat.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ScrollRevealElements>
  );
};

export default DNTSFeatures;
