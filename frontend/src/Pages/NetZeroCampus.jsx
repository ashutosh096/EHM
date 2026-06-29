import React, { useState } from "react";
import SEO from "../Components/Common/SEO";
import NetZeroHero from "../Components/Resources/NetZero/NetZeroHero";
import NetZeroDetails from "../Components/Resources/NetZero/NetZeroDetails";
import NetZeroOfferings from "../Components/Resources/NetZero/NetZeroOfferings";
import NetZeroApproach from "../Components/Resources/NetZero/NetZeroApproach";
import NetZeroBenefits from "../Components/Resources/NetZero/NetZeroBenefits";
import NetZeroCaseStudy from "../Components/Resources/NetZero/NetZeroCaseStudy";
import NetZeroProjects from "../Components/Resources/NetZero/NetZeroProjects";

const NetZeroCampus = () => {
  const [hoveredProject, setHoveredProject] = useState("csjmu");

  const benefitsData = [
    {
      title: "Sustainability",
      items: [
        "Cost Savings & Energy Security",
        "Water security & surplus local grid",
        "Resource efficiency & zero waste",
      ]
    },
    {
      title: "Reputation",
      items: [
        "Enhanced brand image & prestige",
        "Global & National rankings growth",
        "Eco-friendly campus showcase",
      ]
    },
    {
      title: "Compliance",
      items: [
        "Aligns with NAAC & UGC mandates",
        "ISO & Water Positive certifications",
        "ESG & SDG-aligned carbon accounting",
      ]
    }
  ];

  const approachData = [
    {
      title: "Water Positive",
      image: "/WaterRestoration/approach.webp",
      points: ["Rainwater harvesting & recharge", "Reducing freshwater usage", "Gravity-driven distribution"]
    },
    {
      title: "Recycling & Reuse",
      image: "/ProjectsImage/stp.webp",
      points: ["Decentralized natural treatments (DNTS)", "MLD scale greywater recycling", "Landscaping and irrigation reuse"]
    },
    {
      title: "Smart Monitoring",
      image: "/DNTS/feat-source.webp",
      points: ["IoT-based real-time flow meters", "Continuous pH, TDS monitoring", "Web dashboard for insights"]
    },
    {
      title: "Compliance",
      image: "/offering/SR.webp",
      points: ["GRI/ESG sustainability reporting", "Third party assurance & validations", "ISO 14001 & ZLD compliance"]
    }
  ];

  const caseStudy = {
    title: "CSJMU Campus, Kanpur",
    intro:
      "A real-world showcase of transition into a fully sustainable, water-positive, and resource-efficient institution at CSJM University Campus, Kanpur — covering GHG assessment, smart water systems, and ecological restoration.",
    restorationPoints: [
      "50 Lacs Litres of water saved per year through smart IoT metering sensors.",
      "2 MWp solar power plant installed, capturing clean energy to offset grid emissions.",
      "49,733 Sq. Mt. covered by 14 rainwater harvesting systems for groundwater recharge.",
      "1.1 MLD greywater treatment plant supplying reclaimed water for campus landscaping.",
      "1.5-acre waterbody restored using bioremediation and floating wetland island technology.",
      "109 energy units saved per year through sensor-based automated corridor lighting.",
    ],
    beforeImages: [
      "/ProjectsImage/Restoration of CSJM University Campus Waterbody.webp",
      "/ProjectsImage/stp.webp",
    ],
    afterImages: [
      "https://res.cloudinary.com/dlpluej6w/image/upload/v1756901253/Restoration_of_Waterbody_hrs3eq.webp",
      "https://res.cloudinary.com/dlpluej6w/image/upload/v1756901213/Grey_Water_Management_orkst3.webp",
    ],
    ctaLink: "/casestudies/p1",
  };

  const projectsData = {
    csjmu: {
      title: "CSJMU Campus (Ongoing)",
      description:
        "Preparing Annual Sustainability Report 2025–26 and developing the CSJMU Sustainability Dashboard for tracking GHG emissions, energy, water, and waste KPIs.",
      details: "Scope 1, 2 & 3 GHG Assessment · Net Zero Roadmap",
      image:
        "https://res.cloudinary.com/dlpluej6w/image/upload/v1756901213/CSJMU_Sustainability_Report_be0pv3.webp",
      imagePosition: "center",
      link: "/projects#p2",
    },
    iitk: {
      title: "IIT Kanpur — Ecology & Biodiversity",
      description:
        "Comprehensive biodiversity and ecology assessment across the IIT Kanpur campus including baseline data on flora, fauna, and carbon sequestration potential.",
      details: "Flora & Fauna Baseline · Carbon Sequestration Mapping",
      image: "/ProjectsImage/Ecology and Biodiversity Assessment.webp",
      imagePosition: "center",
      link: "/projects#p30",
    },

  };

  return (
    <div className="bg-[#e2f0ed] min-h-screen text-slate-800 transition-colors duration-500">
      <SEO
        title="Net-Zero & Water Positive Campus - EHM"
        description="EHM's Net-Zero & Water Positive Campus transition solutions integrate decentralized natural wastewater treatments (DNTS), smart IoT management, and rainwater harvest recharging."
        keywords="Net-Zero Campus, Water Positive Campus, DNTS, smart water system, rainwater harvesting, resource efficiency, EHM, CSJMU Kanpur"
        canonical="/resources/netzero-campus"
      />

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0) translateX(0); }
          50%  { transform: translateY(-50vh) translateX(20px); }
          100% { transform: translateY(-120vh) translateX(-20px); }
        }
        .animate-float { animation: float linear infinite; }

        @keyframes bounceVertical {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-bounce-vertical { animation: bounceVertical 2.2s infinite ease-in-out; }
      `}</style>

      {/* 1. Hero Section */}
      <NetZeroHero />

      {/* 2. Campus Diagram Section */}
      <NetZeroDetails />

      {/* 3. Key Offerings Grid */}
      <NetZeroOfferings />

      {/* 4. Benefits Section */}
      <NetZeroBenefits benefitsData={benefitsData} />

      {/* 5. Approach Section */}
      <NetZeroApproach approachData={approachData} />

      {/* 6. Case Study Section */}
      <NetZeroCaseStudy caseStudy={caseStudy} />

      {/* 6. Other Projects */}
      <NetZeroProjects
        projectsData={projectsData}
        hoveredProject={hoveredProject}
        setHoveredProject={setHoveredProject}
      />
    </div>
  );
};

export default NetZeroCampus;
