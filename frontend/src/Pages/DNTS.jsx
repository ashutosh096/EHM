import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  ChevronsRight,
  ChevronsDown,
  CheckCircle,
  Droplets,
  Leaf,
  Factory,
  School,
  Building2,
  Home,
  ShoppingBag,
  Zap,
  Wind,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import ScrollRevealElements from "../Components/Animations/ScrollRevealElements";
import SEO from "../Components/Common/SEO";

const DNTSPage = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredStage, setHoveredStage] = useState(null);
  const [hoveredProject, setHoveredProject] = useState("tirupathur");

  // ── FLOWCHART STAGES ──────────────────────────────────────────────────────
  const flowStages = [
    {
      id: "inlet",
      label: "Inlet Water",
      bg: "bg-blue-100",
      svgContent: (
        <svg viewBox="0 0 40 40" className="w-10 h-10">
          <rect x="4" y="18" width="8" height="20" fill="#4a90c4" rx="1" />
          <rect x="14" y="10" width="10" height="28" fill="#3a7ab4" rx="1" />
          <rect x="26" y="14" width="8" height="24" fill="#4a90c4" rx="1" />
          <rect x="6" y="20" width="3" height="4" fill="white" opacity="0.6" rx="0.5" />
          <rect x="17" y="12" width="3" height="4" fill="white" opacity="0.6" rx="0.5" />
        </svg>
      ),
    },
    {
      id: "aabr",
      label: "Accelerated Anaerobic Baffle Reactor (AABR)",
      bg: "bg-blue-50 border border-blue-200",
      svgContent: (
        <div className="flex items-center gap-1 px-2">
          {[20, 28, 24, 30, 22].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-sm bg-blue-400"
              style={{ height: `${h}px`, opacity: 0.55 + i * 0.09 }}
            />
          ))}
        </div>
      ),
    },
    {
      id: "wetland",
      label: "Constructed Wetland",
      bg: "bg-green-50 border border-green-200",
      svgContent: (
        <div className="flex items-end gap-1 px-2 pb-1 h-full">
          {[28, 34, 26, 32].map((h, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-red-400 -mb-1 z-10" />
              <div
                className="w-1.5 rounded-t-full bg-green-600"
                style={{ height: `${h}px` }}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "treated",
      label: "Treated Water",
      bg: "bg-teal-100",
      svgContent: (
        <svg viewBox="0 0 40 40" className="w-9 h-9">
          <path
            d="M20 6 C20 6 10 18 10 25 a10 10 0 0 0 20 0 C30 18 20 6 20 6z"
            fill="#2a9d8f"
            opacity="0.85"
          />
        </svg>
      ),
    },
  ];

  // ── FEATURES ─────────────────────────────────────────────────────────────
  const features = [
    { id: "feat1", name: "Nature-based treatment", IconComponent: Leaf },
    { id: "feat2", name: "Treatment at the source", IconComponent: Filter },
    { id: "feat3", name: "No foul odor", IconComponent: Wind },
    { id: "feat4", name: "Low O & M expenses", IconComponent: Zap },
    { id: "feat5", name: "No skilled manpower required during O&M", IconComponent: CheckCircle },
    { id: "feat6", name: "Smaller carbon footprint", IconComponent: Leaf },
  ];

  // ── SUITED FOR ────────────────────────────────────────────────────────────
  const suitedFor = [
    { id: "s1", name: "Universities/Colleges/Schools", IconComponent: School },
    { id: "s2", name: "Office buildings", IconComponent: Building2 },
    { id: "s3", name: "Housing/Residential societies", IconComponent: Home },
    { id: "s4", name: "Industries", IconComponent: Factory },
    { id: "s5", name: "Commercial establishment", IconComponent: ShoppingBag },
  ];

  const headingStyle = "text-2xl font-bold text-slate-700 mb-8 tracking-wide";

  // ── CASE STUDY ────────────────────────────────────────────────────────────
  const caseStudy = {
    title: "Prachi Leathers",
    intro:
      "A DNTS unit was installed at Prachi Leathers to treat industrial effluent on-site using constructed wetlands and an AABR system, achieving compliant treated water output and eliminating untreated discharge.",
    restorationPoints: [
      "Untreated industrial effluent was being directly discharged, causing severe local contamination.",
      "A DNTS unit combining AABR and constructed wetland technology was designed and commissioned on-site.",
      "The system achieved treated water output at the outlet, meeting compliance standards with no skilled O&M required.",
    ],
    beforeImages: [
      "/DNTS/prachi-before.webp",
      "/DNTS/prachi-before2.webp",
    ],
    afterImages: [
      "/DNTS/prachi-after.webp",
      "/DNTS/prachi-after2.webp",
    ],
  };

  // ── DNTS INFO CARDS ───────────────────────────────────────────────────────
  const dntsInfoData = [
    {
      title: "What is DNTS?",
      items: [
        "Gravity based, natural and self-sustainable root-based technology",
        "Treats and reuses sewage and wastewater on-site",
        "Flexible alternative to large sewage treatment plants",
      ],
    },
    {
      title: "How it works",
      items: [
        "Filtration through root-zone media",
        "Sedimentation of suspended solids",
        "Nutrient-uptake by hormonal plants",
        "Microbial degradation of pollutants",
      ],
    },
    {
      title: "Key Advantage",
      items: [
        "No civil infrastructure at scale",
        "Zero electricity required",
        "Self-sustaining once established",
        "Deployable at any site size",
      ],
    },
  ];

  // ── OTHER PROJECTS ────────────────────────────────────────────────────────
  const projectsData = {
    tirupathur: {
      title: "Tirupathur Municipal Corporation",
      description:
        "DNTS installation for Tirupathur Municipal Corporation, Tamilnadu.",
      details: "Capacity: 227 KLD",
      image: "/DNTS/tirupathur.webp",
    },
    gajwel: {
      title: "Gajwel City, Hyderabad",
      description:
        "Multiple DNTS units at Gajwel, Telangana in collaboration with Nav Enviro Consultants, Hyderabad.",
      details: "0.5 MLD, 1.25 MLD, 1.50 MLD & 3.50 MLD",
      image: "/DNTS/gajwel.webp",
    },
  };

  // ── APPROACH ──────────────────────────────────────────────────────────────
  const approachData = [
    {
      title: "Treatment",
      image: "/DNTS/approach-treatment.webp",
      points: [
        "Treated water via Nature-Based Solutions",
        "AABR + Constructed Wetland system",
        "Zero electricity consumption",
      ],
    },
    {
      title: "Sustainability",
      image: "/DNTS/approach-sustainability.webp",
      points: [
        "Self-sustaining root-zone system",
        "Gravity-driven — no pumps needed",
        "Minimal maintenance costs",
      ],
    },
    {
      title: "Awareness",
      image: "/DNTS/approach-awareness.webp",
      points: [
        "Community education programs",
        "School & college showcasing",
        "Site visits and demonstrations",
      ],
    },
    {
      title: "Deployment",
      image: "/DNTS/approach-deployment.webp",
      points: [
        "Scalable for any institution size",
        "Rapid on-site commissioning",
        "Replicable across industries",
      ],
    },
  ];

  return (
    <div>
      <SEO 
        title="DNTS - Decentralized Natural Treatment System"
        description="EHM's Decentralized Natural Treatment System (DNTS) is a gravity-based, self-sustainable, nature-based wastewater treatment solution at the source."
        keywords="DNTS, nature based wastewater treatment, sewage treatment, decentralized treatment system, EHM, water management"
        canonical="/resources/dnts"
      />
      <style>{`
        @keyframes bounceHorizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        @keyframes bounceVertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce-horizontal { animation: bounceHorizontal 2s infinite; }
        .animate-bounce-vertical { animation: bounceVertical 2s infinite; }
        @keyframes float {
          0%   { transform: translateY(0) translateX(0); }
          50%  { transform: translateY(-50vh) translateX(20px); }
          100% { transform: translateY(-120vh) translateX(-20px); }
        }
        .animate-float { animation: float linear infinite; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#4a9e8a] to-[#7dcfcf] p-4 md:p-8 overflow-hidden">
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
          className="relative z-10 text-center mb-20 md:mb-40"
          staggerAmount={0.5}
        >
          <motion.div className="flex justify-center mb-4">
            <Player
              autoplay
              loop
              src="/lottie-assets/Recycle-Process-Animetion/animations/175a9a37-546c-4c9a-9f82-4c1bf51fb1ac.json"
              className="w-36 h-36 lg:w-48 lg:h-48 lg:translate-y-5"
            />
          </motion.div>
          <motion.h1 className="relative z-10 text-4xl sm:text-5xl md:text-7xl font-extrabold text-white uppercase tracking-wider">
            <span className="text-[#02ffe6]">Decentralized </span>Natural
            <br />
            <span className="text-[#02ffe6]">Treatment </span>System
          </motion.h1>
          <motion.p className="mt-6 text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Gravity-based, self-sustainable, root-based technology to treat and
            reuse sewage and wastewater — at the source.
          </motion.p>
        </ScrollRevealElements>

        {/* wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="0.3"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#ffffff"
                fillOpacity="0.5"
                d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,250.7C672,267,768,245,864,213.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-[calc(50%-0.5rem)] md:left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 md:w-11 md:h-11 border-r-2 border-b-2 md:border-r-4 md:border-b-4 border-emerald-500/80 rotate-45" />
        </div>
      </section>

      {/* ── FLOWCHART + FEATURES + SUITED FOR ────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#dbf1f2] to-[#ededed] py-20 px-4">
        <div className="container mx-auto">

          {/* Flowchart */}
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

          {/* Features & Suited For */}
          <ScrollRevealElements
            className="container mx-auto flex flex-col lg:flex-row items-center justify-around gap-10"
            staggerAmount={0.5}
          >
            {/* Features */}
            <motion.div className="flex flex-col items-center lg:w-[450px]">
              <h3 className={headingStyle}>Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8">
                {features.map((feat) => (
                  <div
                    key={feat.id}
                    onMouseEnter={() => setActiveNode(feat.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    <div
                      className={`relative w-24 h-24 rounded-full bg-[#0f101071] shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-xl ${activeNode === feat.id
                        ? "ring-2 ring-[#10b981]"
                        : "ring-1 ring-gray-200"
                        }`}
                    >
                      <feat.IconComponent className="w-8 h-8 text-[#10b981]" />
                    </div>
                    <p className="mt-3 font-semibold text-gray-700 text-sm w-28">
                      {feat.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div className="text-[#10b981] my-4 lg:my-0 flex-shrink-0">
              <ChevronsDown size={60} className="block lg:hidden animate-bounce-vertical" />
              <ChevronsRight size={80} className="hidden lg:block animate-bounce-horizontal" />
            </motion.div>

            {/* DNTS Visual centre */}
            <motion.div className="flex flex-col items-center">
              <h3 className={headingStyle}>DNTS System</h3>
              <div
                onMouseEnter={() => setActiveNode("center")}
                onMouseLeave={() => setActiveNode(null)}
                className={`relative group rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl ${activeNode === "center"
                  ? "ring-2 ring-[#10b981]"
                  : "ring-1 ring-gray-200"
                  }`}
              >
                <img
                  loading="lazy"
                  src="/DNTS/dnts-system.webp"
                  alt="DNTS System"
                  className="rounded-xl w-64 h-48 md:w-80 md:h-60 object-cover"
                  onError={(e) =>
                  (e.target.src =
                    "https://placehold.co/400x300/a0aec0/ffffff?text=DNTS+System")
                  }
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                  <p className="text-white font-bold text-xl text-center px-4">
                    Natural Treatment at Source
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div className="text-[#10b981] my-4 lg:my-0 flex-shrink-0">
              <ChevronsDown size={60} className="block lg:hidden animate-bounce-vertical" />
              <ChevronsRight size={80} className="hidden lg:block animate-bounce-horizontal" />
            </motion.div>

            {/* Suited For */}
            <motion.div className="flex flex-col items-center lg:w-[350px]">
              <h3 className={headingStyle}>Suited For</h3>
              <div className="flex flex-col gap-6 w-full px-4 lg:px-0">
                {suitedFor.map(({ id, name, IconComponent }) => (
                  <div
                    key={id}
                    onMouseEnter={() => setActiveNode(id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`flex items-center w-full gap-4 p-4 rounded-xl bg-[#ffffff88] shadow-md transition-all duration-300 ease-in-out cursor-pointer group hover:shadow-xl hover:-translate-y-1 hover:bg-slate-50 ${activeNode === id
                      ? "ring-2 ring-[#10b981] shadow-lg"
                      : "ring-1 ring-gray-200"
                      }`}
                  >
                    <div
                      className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full transition-colors duration-300 ${activeNode === id
                        ? "bg-[#10b98118]"
                        : "bg-gray-100 group-hover:bg-emerald-50"
                        }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 transition-colors duration-300 ${activeNode === id ? "text-[#10b981]" : "text-gray-600"
                          }`}
                      />
                    </div>
                    <p className="font-semibold text-gray-800 text-left leading-tight">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollRevealElements>
        </div>
      </section>

      {/* ── CASE STUDY ───────────────────────────────────────────────────── */}
      <section className="bg-[#e2e9e4] pt-16 pb-20 px-4">
        <div className="container mx-auto">
          <ScrollRevealElements className="text-center mb-12 md:mb-16" staggerAmount={0.5}>
            <motion.h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800">
              Case Study:{" "}
              <span className="text-[#10b981]">{caseStudy.title}</span>
            </motion.h2>
            <motion.p className="text-slate-500 mt-4 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              {caseStudy.intro}
            </motion.p>
          </ScrollRevealElements>

          {/* Before / Middle / After panel */}
          <motion.div
            className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl bg-gray-50 min-h-[450px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Before */}
            <div
              className={`relative transition-all duration-500 ease-in-out ${hoveredStage === "before" ? "lg:w-[50%]" : "lg:w-[25%]"
                } ${hoveredStage === "after" ? "lg:w-[25%]" : ""} flex-grow`}
              onMouseEnter={() => setHoveredStage("before")}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {hoveredStage === "before" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
                  {caseStudy.beforeImages.map((src, idx) => (
                    <div
                      key={idx}
                      className="h-full min-h-[200px] lg:min-h-0 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  ))}
                </div>
              ) : (
                <div className="relative w-full h-full bg-red-800 p-6 md:p-8">
                  <img
                    loading="lazy"
                    src={caseStudy.beforeImages[0]}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-white">
                    Before
                  </h3>
                </div>
              )}
            </div>

            {/* Middle */}
            <div
              className={`relative flex flex-col p-6 md:p-8 transition-all duration-500 ease-in-out ${hoveredStage === null ? "lg:w-[50%]" : "lg:w-[25%]"
                } flex-grow bg-slate-100 text-slate-800 justify-center items-start`}
            >
              <div className="w-full text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#10b981]">
                  Treatment Journey
                </h3>
                <ul className="space-y-4 max-w-md mx-auto text-left">
                  {caseStudy.restorationPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <Droplets className="h-5 w-5 text-[#10b981] mr-3 mt-1 flex-shrink-0" />
                      <span className="text-slate-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* After */}
            <div
              className={`relative transition-all duration-500 ease-in-out ${hoveredStage === "after" ? "lg:w-[50%]" : "lg:w-[25%]"
                } ${hoveredStage === "before" ? "lg:w-[25%]" : ""} flex-grow`}
              onMouseEnter={() => setHoveredStage("after")}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {hoveredStage === "after" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
                  {caseStudy.afterImages.map((src, idx) => (
                    <div
                      key={idx}
                      className="h-full min-h-[200px] lg:min-h-0 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  ))}
                </div>
              ) : (
                <div className="relative w-full h-full bg-green-800 p-6 md:p-8 flex justify-end items-start">
                  <img
                    loading="lazy"
                    src={caseStudy.afterImages[0]}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-white">
                    After
                  </h3>
                </div>
              )}
            </div>
          </motion.div>

          {/* DNTS Info Cards (mirrors Benefits section) */}
          <motion.div
            className="text-center mt-28 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              About <span className="text-[#10b981]">DNTS</span>
            </h2>
          </motion.div>

          {/* Desktop */}
          <ScrollRevealElements
            className="hidden lg:flex justify-center items-start gap-12 relative py-12"
            staggerAmount={0.5}
          >
            {dntsInfoData.map((item, index) => {
              const icons = [Leaf, Filter, Zap];
              const Icon = icons[index] || CheckCircle;
              const isLast = index === dntsInfoData.length - 1;
              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center group"
                >
                  {!isLast && (
                    <div className="absolute top-10 left-full h-1 w-16 bg-[#10b981]" />
                  )}
                  <div className="relative p-4 bg-white rounded-full border-4 border-[#10b981] z-10 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    <Icon className="w-8 h-8 text-[#10b981]" />
                  </div>
                  <div className="mt-6 w-64 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 text-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                    <h4 className="font-bold text-lg text-slate-700">{item.title}</h4>
                    <ul className="mt-2 text-sm text-left text-slate-500 space-y-1">
                      {item.items.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#10b981] flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </ScrollRevealElements>

          {/* Mobile */}
          <div className="lg:hidden relative max-w-xl mx-auto mt-12">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-[#10b981]" />
            <ScrollRevealElements className="space-y-16" staggerAmount={0.5}>
              {dntsInfoData.map((item, index) => {
                const icons = [Leaf, Filter, Zap];
                const Icon = icons[index] || CheckCircle;
                return (
                  <motion.div key={index} className="relative pl-20 group">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-white border-4 border-[#10b981] shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8 text-[#10b981]" />
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                      <h4 className="font-bold text-lg text-slate-700 mb-2">{item.title}</h4>
                      <ul className="space-y-1">
                        {item.items.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start text-slate-600">
                            <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#10b981] flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </ScrollRevealElements>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <a
              href="/resources/casestudies"
              className="inline-block bg-[#10b981] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#0a7c56] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Full Case Study
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── OTHER PROJECTS & APPROACH ─────────────────────────────────────── */}
      <section className="bg-[#f6f6f6] pt-20 pb-20 px-4">
        <div className="container mx-auto">

          {/* Other Projects */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800">
              Other <span className="text-[#10b981]">Projects</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-gray-100 min-h-[300px] md:min-h-[400px] border-2 border-[#3a3a3a0f]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {["tirupathur", "gajwel"].map((key) => (
              <div
                key={key}
                onMouseEnter={() => setHoveredProject(key)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`group relative overflow-hidden transition-all duration-500 ease-in-out flex-grow cursor-pointer h-[350px] sm:h-[400px] md:h-auto ${hoveredProject === key ? "md:w-2/3" : "md:w-1/3"
                  }`}
              >
                <img
                  loading="lazy"
                  src={projectsData[key].image}
                  alt={projectsData[key].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  onError={(e) =>
                    (e.target.src = `https://placehold.co/800x500/4a9e8a/ffffff?text=${projectsData[key].title}`)
                  }
                />
                <div
                  className={`absolute inset-0 z-10 transition-colors duration-300 ${hoveredProject && hoveredProject !== key
                    ? "bg-black/60"
                    : "bg-black/0"
                    }`}
                />
                <div className="relative z-20 h-full w-full flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white bg-gradient-to-t from-black/55 to-transparent">
                  <h3 className="text-xl text-[#26ffb7] sm:text-2xl font-bold">
                    {projectsData[key].title}
                  </h3>
                  <div className="transition-all duration-500 ease-in-out max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100">
                    <div className="mt-2 sm:mt-4">
                      <p className="text-sm sm:text-base text-slate-200">
                        {projectsData[key].description}
                      </p>
                      {projectsData[key].details && (
                        <p className="mt-2 text-sm sm:text-base font-semibold">
                          {projectsData[key].details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Approach */}
          <motion.div
            className="text-center mt-28 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              Our <span className="text-[#10b981]">Approach</span>
            </h2>
          </motion.div>

          {/* Desktop */}
          <div className="hidden lg:flex justify-between items-start relative py-4 mx-auto">
            <svg
              className="absolute -top-20 left-0 w-full h-full z-0"
              preserveAspectRatio="none"
              viewBox="0 0 1152 300"
            >
              <path
                d="M 52 100 C 218 100, 218 196, 384 196 C 550 196, 584 100, 768 100 C 934 100, 934 196, 1100 196"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,10"
              />
            </svg>
            <ScrollRevealElements
              className="w-full flex justify-between items-start"
              staggerAmount={0.5}
            >
              {approachData.map((item, index) => {
                const isOdd = index % 2 !== 0;
                return (
                  <motion.div
                    key={index}
                    className="relative flex flex-col items-center z-10 group"
                  >
                    <div
                      className={`relative p-2 bg-slate-50 rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl ${isOdd ? "mt-28" : ""
                        }`}
                    >
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-full object-cover"
                        onError={(e) =>
                          (e.target.src = `https://placehold.co/80x80/4a9e8a/ffffff?text=${item.title[0]}`)
                        }
                      />
                    </div>
                    <div className="mt-6 w-64 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 text-center transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      <h4 className="font-bold text-lg text-slate-700">{item.title}</h4>
                      <ul className="mt-2 text-sm text-left text-slate-500 space-y-1">
                        {item.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#10b981] flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </ScrollRevealElements>
          </div>

          {/* Mobile */}
          <div className="lg:hidden relative max-w-xl mx-auto mt-12">
            <div className="absolute left-12 top-0 h-full w-0.5 bg-[#10b981]" />
            <ScrollRevealElements className="space-y-16" staggerAmount={0.5}>
              {approachData.map((item, index) => (
                <motion.div key={index} className="relative pl-28 group">
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:scale-110">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                      onError={(e) =>
                        (e.target.src = `https://placehold.co/80x80/4a9e8a/ffffff?text=${item.title[0]}`)
                      }
                    />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                    <h4 className="font-bold text-lg text-slate-700">{item.title}</h4>
                    <ul className="mt-2 text-sm text-left text-slate-500 space-y-1">
                      {item.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#10b981] flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </ScrollRevealElements>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <a
              href="/projects"
              className="inline-block bg-[#10b981] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#0d8e63] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View More Projects
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DNTSPage;
