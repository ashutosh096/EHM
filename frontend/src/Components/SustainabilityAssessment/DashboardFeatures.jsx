import React, { useState } from "react";
import {
  BarChart3,
  Cpu,
  Globe2,
  Award,
  BookOpen,
  ClipboardList,
  CalendarHeart,
  ShieldCheck,
  Brain,
} from "lucide-react";
import SectionHeading from "../../Common/SectionHeading";

const features = [
  { 
    icon: BarChart3, 
    category: "Performance Tracking", 
    description: "Real-time monitoring of energy, water, waste, and emission metrics with automated updates.", 
    color: "bg-[#4B7635]",
    size: "large"
  },
  { 
    icon: Brain, 
    category: "AI Insight Engine", 
    description: "AI Insight Engine delivers data-driven recommendations to optimize your business decisions. It offers performance benchmarking to help you measure and improve efficiency. The platform also provides sustainability-focused chat support, guiding eco-friendly practices. Together, these features empower smarter, greener growth.", 
    color: "bg-[#3B66BC]",
    size: "large"
  },
  { 
    icon: Cpu, 
    category: "Carbon & Resource Accounting", 
    description: "Scope 1, 2 & 3 carbon footprint measurement with energy efficiency analysis.", 
    color: "bg-[#3B66BC]",
    size: "medium"
  },
  { 
    icon: Globe2, 
    category: "SDG & ESG Mapping", 
    description: "Auto-maps initiatives to UNSDG and ESG disclosure indicators.", 
    color: "bg-[#4B7635]",
    size: "medium"
  },
  { 
    icon: Award, 
    category: "Ranking Support", 
    description: "Generate performance data for NAAC, NIRF, QS, and THE Impact Rankings.", 
    color: "bg-[#E59518]",
    size: "small"
  },
  { 
    icon: BookOpen, 
    category: "Literacy Assessment", 
    description: "Assess and visualize sustainability literacy levels among stakeholders.", 
    color: "bg-[#4B7635]",
    size: "small"
  },
  { 
    icon: ClipboardList, 
    category: "Policy Tracker", 
    description: "Track progress of sustainability policies and action plans.", 
    color: "bg-[#3B66BC]",
    size: "small"
  },
  { 
    icon: CalendarHeart, 
    category: "Event Reporting", 
    description: "Auto-log sustainability events and community initiatives.", 
    color: "bg-[#E59518]",
    size: "small"
  },
  { 
    icon: ShieldCheck, 
    category: "Certification Readiness", 
    description: "Track compliance for ISO 14001, Water Positive certifications.", 
    color: "bg-[#3B66BC]",
    size: "medium"
  },
];

const DashboardFeaturesBento = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-12 px-6 overflow-hidden bg-white">
      {/* Subtle background elements only */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Minimal background subtle circle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6">
        {/* Header */}
        <SectionHeading>
          <span className="block text-slate-800">Dashboard</span>
          <span className="text-[#4B7635]">
            Features & Plug-ins
          </span>
        </SectionHeading>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto text-center mb-8">
          Intelligent integrations and insights that transform sustainability data into strategic, measurable outcomes.
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          <div
            className="md:col-span-2 md:row-span-2 group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500"
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${features[0].color} text-white mb-6 transform group-hover:scale-105 transition-transform duration-300`}>
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{features[0].category}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{features[0].description}</p>
            </div>
          </div>

          {/* Medium Cards */}
          {[2, 3].map((idx) => (
            <div
              className="md:col-span-2 group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10 flex items-start gap-4">
                <div className={`flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl ${features[idx].color} text-white transform group-hover:scale-105 transition-transform duration-300`}>
                  {React.createElement(features[idx].icon, { className: "w-7 h-7" })}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{features[idx].category}</h3>
                  <p className="text-slate-600 leading-relaxed">{features[idx].description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Small Cards - First Row */}
          {[4, 5].map((idx) => (
            <div
              key={idx}
              className="md:col-span-1 group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${features[idx].color} text-white mb-4 transform group-hover:scale-105 transition-transform duration-300`}>
                  {React.createElement(features[idx].icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{features[idx].category}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{features[idx].description}</p>
              </div>
            </div>
          ))}

          {/* Large Card 2 - Spans 2 columns and 2 rows */}
          <div
            className="md:col-span-2 md:row-span-2 group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500"
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${features[1].color} text-white mb-6 transform group-hover:scale-105 transition-transform duration-300`}>
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{features[1].category}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{features[1].description}</p>
            </div>
          </div>

          {/* Small Cards - Second Row */}
          {[6, 7].map((idx) => (
            <div
              key={idx}
              className="md:col-span-1 group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${features[idx].color} text-white mb-4 transform group-hover:scale-105 transition-transform duration-300`}>
                  {React.createElement(features[idx].icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{features[idx].category}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{features[idx].description}</p>
              </div>
            </div>
          ))}

          {/* Bottom Medium Card */}
          <div
            className="md:col-span-4 group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500"
            onMouseEnter={() => setHoveredIndex(8)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative z-10 flex items-center gap-6">
              <div className={`flex-shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-xl ${features[8].color} text-white transform group-hover:scale-105 transition-transform duration-300`}>
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{features[8].category}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{features[8].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardFeaturesBento;