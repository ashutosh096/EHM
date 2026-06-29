/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, Shield, Zap, Compass, Cpu, CloudRain, Filter, Sprout, ArrowDownCircle } from "lucide-react";
import ScrollRevealElements from "../../Animations/ScrollRevealElements";

const NetZeroDetails = () => {
  const [activeNode, setActiveNode] = useState(null);

  const objectives = [
    {
      title: "Zero Liquid Discharge (ZLD)",
      desc: "Targeting 100% on-site wastewater reclamation and zero untreated waste release.",
      icon: Shield
    },
    {
      title: "Resource Security",
      desc: "Mitigating water scarcity risks by establishing local water grid independence.",
      icon: Zap
    },
    {
      title: "Compliance & Rating",
      desc: "Aligning with NAAC, UGC, and international ESG carbon accounting standards.",
      icon: Target
    },
    {
      title: "Real-Time Governance",
      desc: "Deploying continuous IoT sensors for full carbon, energy, and water transparency.",
      icon: Compass
    }
  ];

  const renderDiagram = () => (
    <motion.div
      className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border-2 border-[#10b981] flex flex-col justify-between h-full"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
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
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#0f5451] tracking-wide mb-1 text-left uppercase">
          Net-Zero & Water Positive Campus
        </h3>
        <p className="text-sm md:text-base font-semibold text-[#10b981] mb-6 text-left">
          Integrated circular water management
        </p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-4">
        <img
          loading="lazy"
          src="/NetZero/campus-diagram.png"
          alt="Towards Net-Zero & Water Positive Campus Diagram"
          className="w-full max-w-full h-auto object-contain rounded-xl hover:scale-[1.01] transition-transform duration-500"
        />
      </div>

      <div className="mt-4 flex flex-nowrap items-center justify-between gap-0.5 sm:gap-1 text-xs md:text-sm font-extrabold text-[#0f5451] bg-teal-50/80 backdrop-blur-sm py-2 px-2 md:px-3 rounded-2xl border border-teal-200/50 shadow-inner overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 bg-white py-0.5 px-1.5 sm:px-2 rounded-lg border border-teal-100/50 shadow-sm text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap flex-shrink-0">
          <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-650 flex-shrink-0" />
          <span>Reduce</span>
        </div>
        <span className="text-teal-500 font-bold flex-shrink-0 text-[10px] sm:text-xs">→</span>
        
        <div className="flex items-center gap-1 bg-white py-0.5 px-1.5 sm:px-2 rounded-lg border border-teal-100/50 shadow-sm text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap flex-shrink-0">
          <CloudRain className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-650 flex-shrink-0" />
          <span>Recycle</span>
        </div>
        <span className="text-teal-500 font-bold flex-shrink-0 text-[10px] sm:text-xs">→</span>
        
        <div className="flex items-center gap-1 bg-white py-0.5 px-1.5 sm:px-2 rounded-lg border border-teal-100/50 shadow-sm text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap flex-shrink-0">
          <Filter className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-650 flex-shrink-0" strokeWidth={2.5} />
          <span>Treat</span>
        </div>
        <span className="text-teal-500 font-bold flex-shrink-0 text-[10px] sm:text-xs">→</span>
        
        <div className="flex items-center gap-1 bg-white py-0.5 px-1.5 sm:px-2 rounded-lg border border-teal-100/50 shadow-sm text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap flex-shrink-0">
          <Sprout className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-650 flex-shrink-0" />
          <span>Reuse</span>
        </div>
        <span className="text-teal-500 font-bold flex-shrink-0 text-[10px] sm:text-xs">→</span>
        
        <div className="flex items-center gap-1 bg-white py-0.5 px-1.5 sm:px-2 rounded-lg border border-teal-100/50 shadow-sm text-[9px] sm:text-[10px] md:text-xs whitespace-nowrap flex-shrink-0">
          <ArrowDownCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-650 flex-shrink-0" />
          <span>Recharge</span>
        </div>
      </div>
    </motion.div>
  );

  const renderObjectivesList = () => (
    <motion.div
      className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-500/10 flex flex-col justify-between h-full"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h3 className="text-xl font-black text-[#0f5451] tracking-wide mb-6 uppercase border-b border-slate-100 pb-3 flex items-center gap-2">
          <div className="w-2.5 h-6 bg-[#10b981] rounded-full" />
          Objectives
        </h3>
        <ul className="space-y-5">
          {objectives.map((obj, index) => {
            const Icon = obj.icon;
            return (
              <li key={index} className="flex items-start gap-3.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#e5f2ee] text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#10b981] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#0f5451] transition-colors duration-200">
                    {obj.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug mt-1">
                    {obj.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );

  return (
    <section className="bg-[#e2f0ed] py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <ScrollRevealElements className="text-center mb-12" staggerAmount={0.3}>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f5451] tracking-tight uppercase">
            Campus Eco-System Design
          </h2>
          <p className="mt-4 text-slate-650 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-semibold">
            Deploying integrated systems to achieve water neutrality and lower carbon footprints across educational and corporate workspaces.
          </p>
        </ScrollRevealElements>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8">
            {renderDiagram()}
          </div>
          <div className="lg:col-span-4">
            {renderObjectivesList()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetZeroDetails;
