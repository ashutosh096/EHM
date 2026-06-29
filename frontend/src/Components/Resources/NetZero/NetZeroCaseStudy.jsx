/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import ScrollRevealElements from "../../Animations/ScrollRevealElements";

const NetZeroCaseStudy = ({ caseStudy }) => {
  const metrics = [
    {
      label: "50 Lacs Litres Water per year saving through Smart metering",
      image: "/DNTS/feat-source.webp"
    },
    {
      label: "2 MWp Solar Power Plant",
      image: "/offering/SR.webp"
    },
    {
      label: "49733 Sq. Mt. 14 Rainwater Harvesting Systems",
      image: "/WaterRestoration/approach.webp"
    },
    {
      label: "1.1 MLD Recycle & Reuse of Water",
      image: "/ProjectsImage/stp.webp"
    },
    {
      label: "1.5 Acre Rejuvenation of waterbody",
      image: "/ProjectsImage/Restoration of CSJM University Campus Waterbody.webp"
    },
    {
      label: "109 Unit Saved energy through sensor-based lighting",
      image: "/offering/8.webp"
    }
  ];

  return (
    <section className="bg-[#e2e9e4] py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <ScrollRevealElements className="mb-12" staggerAmount={0.3}>
          <motion.h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight text-left">
            Case study : <span className="text-[#10b981]">Net-Zero & Water Positive Campus</span>
          </motion.h2>
        </ScrollRevealElements>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Grid: 6 Metrics circles */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
              {metrics.map((metric, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 group-hover:border-[#10b981] group-hover:shadow-xl transition-all duration-300">
                    <img
                      loading="lazy"
                      src={metric.image}
                      alt={metric.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-xs md:text-sm font-extrabold text-slate-700 leading-snug max-w-[200px]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Sustainability Report */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <motion.div 
              className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center justify-between w-full max-w-md h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full flex-grow flex items-center justify-center overflow-hidden rounded-2xl mb-6 shadow-md border border-slate-100">
                <img
                  loading="lazy"
                  src="/ProjectsImage/Preparation of the Annual Sustainability Report 2024–25 and Development of the CSJMU Sustainability Dashboard – Kanpur.webp"
                  alt="CSJMU Sustainability Report Cover"
                  className="w-full h-auto max-h-[360px] object-contain"
                />
              </div>
              <div className="text-center w-full">
                <p className="text-sm md:text-base font-extrabold text-[#0f5451] leading-tight">
                  Estimation of current GHG emission under various scopes
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href={caseStudy.ctaLink || "/resources/casestudies"}
            className="inline-block bg-[#10b981] text-white font-black py-3.5 px-8 rounded-xl text-md hover:bg-[#0a7c56] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          >
            View Full Case Study
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NetZeroCaseStudy;
