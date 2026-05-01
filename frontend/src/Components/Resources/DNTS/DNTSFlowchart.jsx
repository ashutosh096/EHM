import React from "react";
import { motion } from "framer-motion";
import ScrollRevealElements from "../../Animations/ScrollRevealElements";

const DNTSFlowchart = ({ flowStages, headingStyle }) => {
  return (
    <ScrollRevealElements className="mb-20" staggerAmount={0.4}>
      <motion.h3 className={`${headingStyle} text-center`}>
        How DNTS Works
      </motion.h3>
      <motion.div className="bg-white rounded-3xl shadow-md p-8 max-w-4xl mx-auto">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Decentralised Natural Treatment System (DNTS)
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {flowStages.map((stage, i) => (
            <React.Fragment key={stage.id}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center ${stage.bg}`}
                >
                  {stage.svgContent}
                </div>
                <span className="text-xs font-medium text-gray-600 text-center max-w-[110px]">
                  {stage.label}
                </span>
              </div>
              {i < flowStages.length - 1 && (
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </ScrollRevealElements>
  );
};

export default DNTSFlowchart;
