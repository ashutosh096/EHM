import React, { useState, useEffect } from "react";
import { FileText, X, Download } from "lucide-react";
import API from "../../api/axios";

export default function StarcFloatingBrochure() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "", org: "" });
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const scrollPos = window.scrollY + window.innerHeight;

      // Show button only after scrolling 150px down, and hide it when within 550px of the footer
      const isScrolledDown = window.scrollY > 150;
      const isNearFooter = docHeight - scrollPos < 550;

      setIsVisible(isScrolledDown && !isNearFooter);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial run
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleDownloadSubmit = (e) => {
    e.preventDefault();

    // Clean mobile number before sending
    const cleanMobile = (formData.phone || "").replace(/\s+/g, "");
    API.post("/contact", {
      name: formData.name,
      email: formData.email,
      mobile: cleanMobile,
      interestedIn: "[STARC Brochure] STARC Brochure Download",
      message: `Downloaded STARC Brochure. Support Type: ${formData.role}. Organization: ${formData.org || "N/A"}`
    }).catch((err) => {
      console.error("Error submitting lead to contact database:", err);
    });

    // Open brochure in new tab (full page)
    window.open("/pdfs/starc_two_pager.pdf", "_blank");

    // Trigger brochure download
    const a = document.createElement('a');
    a.href = "/pdfs/starc_two_pager.pdf";
    a.download = "EHM_STARC_Brochure.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setShowModal(false);
    setIsRoleDropdownOpen(false);
    setFormData({ name: "", email: "", phone: "", role: "", org: "" });
  };

  return (
    <>
      {/* STARC Brochure (Vertical EHM Green Capsule Tab on Right Edge) */}
      <div
        className={`fixed right-0 top-[50%] -translate-y-1/2 z-50 transition-all duration-500 transform origin-right ${isVisible
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-x-4 scale-95 pointer-events-none"
          }`}
      >
        <button
          onClick={() => setShowModal(true)}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          className="bg-[#4B7635] hover:bg-[#3d622b] text-white font-extrabold py-6 px-3.5 rounded-r-full shadow-xl flex items-center gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-102 border-l border-t border-b border-white/20"
        >
          <FileText className="w-5 h-5 text-white transform rotate-90" />
          <span className="tracking-wide text-xs uppercase font-sans">STARC Brochure</span>
        </button>
      </div>

      {/* Form Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full mx-4 p-6 sm:p-8 shadow-2xl relative border border-emerald-50 animate-scaleUp">
            <button
              onClick={() => {
                setShowModal(false);
                setIsRoleDropdownOpen(false);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Download STARC Brochure</h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter your details to download the <strong>STARC Platform Brochure</strong>.
            </p>

            <form onSubmit={handleDownloadSubmit} className="space-y-4">
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

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  I am a <span className="text-red-500 font-bold">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-250 focus:outline-none bg-white transition-all text-sm flex justify-between items-center text-left"
                >
                  <span className={formData.role ? "text-gray-900" : "text-gray-400"}>
                    {formData.role || "Select an option"}
                  </span>
                  <span className="text-gray-400 text-xs">▼</span>
                </button>
                <input
                  type="hidden"
                  required
                  value={formData.role}
                />

                {isRoleDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto py-1 overflow-x-hidden">
                    {[
                      "Sustainability & ESG Support",
                      "Water & Wastewater Treatment",
                      "Geophysical Subsurface Survey",
                      "Urban Planning & Project Support",
                      "Climate Risk & Data Advisory",
                      "Training & Capacity Building",
                      "General Inquiry"
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, role: option });
                          setIsRoleDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-950 text-left text-sm text-gray-700 transition-colors border-none whitespace-normal leading-tight"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
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

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Document
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
    </>
  );
}
