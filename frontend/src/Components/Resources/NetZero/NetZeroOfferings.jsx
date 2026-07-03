import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../../api/axios";
import {
  FileText,
  Recycle,
  Cpu,
  Droplets,
  Award,
  GraduationCap,
  Waves,
  Zap,
  ChevronRight,
  X,
  Send,
} from "lucide-react";
import ScrollRevealElements from "../../Animations/ScrollRevealElements";

const offerings = [
  {
    title: "Sustainability Assessment & Reporting",
    desc: "Auditing carbon footprints, water audits, and waste streams for GRI/ESG compliant sustainability reports.",
    icon: FileText,
    num: "01",
    tag: "Assessment",
  },
  {
    title: "Reuse of Treated Wastewater",
    desc: "Engineering DNTS-based natural treatments to reclaim and reuse wastewater for landscaping and irrigation.",
    icon: Recycle,
    num: "02",
    tag: "Water",
  },
  {
    title: "Smart Water Management",
    desc: "Installing IoT meters and controls to track live consumption and monitor pH, TDS, and flow levels.",
    icon: Cpu,
    num: "03",
    tag: "IoT",
  },
  {
    title: "Water Positive Campus",
    desc: "Designing frameworks aligning rainwater recharge, wastewater reuse, and conservation for a water surplus.",
    icon: Droplets,
    num: "04",
    tag: "Campus",
  },
  {
    title: "Certifications (ISOs & ZLD)",
    desc: "Securing ISO 14001, environmental water audits, and Zero Liquid Discharge compliance validations.",
    icon: Award,
    num: "05",
    tag: "Compliance",
  },
  {
    title: "Training & Workshop (ESG)",
    desc: "Educational programs on ESG compliance, green campus design, and sustainability reporting practices.",
    icon: GraduationCap,
    num: "06",
    tag: "Training",
  },
  {
    title: "Waterbody Restoration",
    desc: "Rejuvenating degraded ponds and lakes using bio-remediation, floating wetlands, and nature-based solutions.",
    icon: Waves,
    num: "07",
    tag: "Ecology",
  },
  {
    title: "Smart Energy Management",
    desc: "Integrating rooftop solar, automated LED lighting, and energy monitoring to reduce carbon emissions.",
    icon: Zap,
    num: "08",
    tag: "Energy",
  },
];

const NetZeroOfferings = () => {
  const [active, setActive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "", org: "", message: "" });

  // Lock body scroll when the modal is active
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const cleanMobile = (formData.phone || "").replace(/\s+/g, "");
    
    API.post("/contact", {
      name: formData.name,
      email: formData.email,
      mobile: cleanMobile,
      interestedIn: "[Net-Zero] Net-Zero Campus Service Consultation",
      message: `Requesting Net-Zero Campus Transition Service. Role: ${formData.role}. Organization: ${formData.org || "N/A"}. Message: ${formData.message || "None"}`
    }).then(() => {
      alert("Your request for consultation has been submitted successfully! EHM team will get back to you shortly.");
    }).catch((err) => {
      console.error("Error submitting lead to contact database:", err);
      alert("Submission failed. Please check your network and try again.");
    });
    
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", role: "", org: "", message: "" });
  };

  return (
    <section className="bg-[#e2e9e4] py-16 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <ScrollRevealElements className="text-center mb-12" staggerAmount={0.3}>
          <span className="text-[#10b981] font-extrabold text-xs uppercase tracking-widest">
            Specialized Frameworks
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mt-2">
            Our Key <span className="text-[#10b981]">Offerings</span>
          </h2>
          <p className="mt-4 text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Transitioning campus environments into circular economy models through expertise in water, energy, and sustainability reporting.
          </p>
        </ScrollRevealElements>

        {/* Two-column accordion list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {offerings.map((off, index) => {
            const Icon = off.icon;
            const isOpen = active === index;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group"
                style={{
                  boxShadow: isOpen ? "0 8px 32px rgba(16,185,129,0.15)" : undefined,
                  borderColor: isOpen ? "#10b981" : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Row header */}
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Number */}
                  <span
                    className="text-2xl font-black leading-none flex-shrink-0 transition-colors duration-300"
                    style={{ color: isOpen ? "#10b981" : "#d1d5db" }}
                  >
                    {off.num}
                  </span>

                  {/* Icon circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen ? "#10b981" : "#e2f0ed",
                      color: isOpen ? "white" : "#10b981",
                    }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>

                  {/* Title + tag */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold text-sm text-slate-800 leading-snug transition-colors duration-300 truncate"
                      style={{ color: isOpen ? "#0f5451" : undefined }}
                    >
                      {off.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {off.tag}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className="w-4 h-4 text-slate-300 flex-shrink-0 transition-all duration-300"
                    style={{
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      color: isOpen ? "#10b981" : undefined,
                    }}
                  />
                </div>

                {/* Expandable description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 pt-0 border-t border-slate-100">
                        <p className="text-slate-500 text-xs leading-relaxed mt-3">
                          {off.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom green bar */}
                <div
                  className="h-0.5 transition-all duration-500"
                  style={{
                    background: isOpen
                      ? "linear-gradient(90deg, #10b981, #06b6d4)"
                      : "transparent",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Full-width white card container directly below grid */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-slate-800">
              Ready to transition your campus?
            </h4>
            <p className="text-sm text-slate-500 mt-1">
              Request a consultation or details package for any of our specialized key offerings.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="whitespace-nowrap inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-[#10b981] to-[#06b6d4] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Request This Service
          </button>
        </div>
      </div>

      {/* Form Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full mx-4 p-6 sm:p-8 shadow-2xl relative border border-emerald-50 animate-scaleUp">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              title="Close"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Request Net-Zero Transition Service</h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter your details below to request a customized roadmap assessment and consultation for your campus.
            </p>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Your name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Phone number (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    pattern="^\+?[0-9\s]{10,20}$"
                    title="Please enter a valid phone number (10-15 digits)"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email address <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  I am a <span className="text-red-500 font-bold">*</span>
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none bg-white transition-all text-sm"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="Sustainability Reporting / ESG Support">Sustainability Reporting / ESG Support</option>
                  <option value="Wastewater Treatment & Waterbody Restoration">Wastewater Treatment & Waterbody Restoration</option>
                  <option value="Geophysical / Subsurface Investigation">Geophysical / Subsurface Investigation</option>
                  <option value="Urban Planning & City Project Support">Urban Planning & City Project Support</option>
                  <option value="Climate Risk Assessment / Climate Data Advisory">Climate Risk Assessment / Climate Data Advisory</option>
                  <option value="Training, Workshops, or Capacity Building">Training, Workshops, or Capacity Building</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Organization / Company (optional)
                </label>
                <input
                  type="text"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Message / Requirements (optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none transition-all text-sm"
                  placeholder="Specify any details or requirements for your campus transition..."
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Submit Consultation Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};

export default NetZeroOfferings;
