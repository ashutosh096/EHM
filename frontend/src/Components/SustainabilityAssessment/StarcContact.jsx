import { useState, useRef, useEffect } from "react";
import { Mail, User, MessageSquare, Send, CheckCircle, Calendar, ChevronDown, Check, Phone } from "lucide-react";
import API from "../../api/axios";

const SOLUTIONS = [
  'ESG Tool "STARC" & Sustainability Report',
  "Water Positive & Climate Resilient",
  "Energy Audit & Management",
  "Biodiversity",
  "Green Cover Mapping",
  "GHG Accounting",
  "Waste Audit & Management",
];

function SolutionDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (solution) => {
    if (selected.includes(solution)) {
      onChange(selected.filter((s) => s !== solution));
    } else {
      onChange([...selected, solution]);
    }
  };

  const displayText =
    selected.length === 0
      ? "Select solutions of interest"
      : selected.length === 1
        ? selected[0]
        : `${selected.length} solutions selected`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl text-left flex items-center justify-between transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] ${open ? "border-[#4B7635] bg-white ring-2 ring-[#4B7635]/20" : "border-slate-200"
          }`}
      >
        <span
          className={`font-medium text-sm truncate pr-2 ${selected.length === 0 ? "text-slate-300" : "text-slate-900"
            }`}
        >
          {displayText}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#4B7635]" : ""
            }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden animate-dropdownOpen">
          <div className="p-2 max-h-72 overflow-y-auto">
            {SOLUTIONS.map((solution) => {
              const checked = selected.includes(solution);
              return (
                <button
                  key={solution}
                  type="button"
                  onClick={() => toggle(solution)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 group ${checked
                    ? "bg-[#4B7635]/8 text-slate-900"
                    : "hover:bg-slate-50 text-slate-700"
                    }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${checked
                      ? "bg-[#4B7635] border-[#4B7635]"
                      : "border-slate-300 group-hover:border-[#4B7635]/50"
                      }`}
                  >
                    {checked && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span className="text-sm font-medium leading-snug">{solution}</span>
                </button>
              );
            })}
          </div>

          {selected.length > 0 && (
            <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {selected.length} selected
              </span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-[11px] font-bold text-red-400 hover:text-red-600 uppercase tracking-wider transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function StarcContact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal?.("init", { origin: "https://cal.com" });
    window.Cal?.("ui", {
      styles: { branding: { brandColor: "#4B7635" } },
      hideEventTypeDetails: false,
      layout: "month_view"
    });
  }, []);

  const handleScheduleClick = (e) => {
    e.preventDefault();
    if (window.Cal) {
      window.Cal("modal", {
        calLink: "dr.-utsav-mishra/discovery-call",
        config: { layout: "month_view" }
      });
    } else {
      window.open("https://cal.com/dr.-utsav-mishra/discovery-call?overlayCalendar=true", "_blank");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.target);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const mobile = formData.get("mobile") || "";
    const message = formData.get("message") || "NULL";
    const interestedIn =
      "[STARC Demo] STARC: " +
      (selectedSolutions.length > 0
        ? selectedSolutions.join(", ")
        : "No Specific Selection"
      );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\+?[0-9]{10,15}$/;

    if (!emailRegex.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (mobile.trim() && !mobileRegex.test(mobile.trim())) {
      setErrorMsg("Please enter a valid mobile number (e.g., +911234567890).");
      setIsLoading(false);
      return;
    }

    const cleanedData = {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      interestedIn,
      message: message.trim(),
    };

    try {
      const res = await API.post("/contact", cleanedData);

      if (res?.data?.success || res?.data?.sucess) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setSelectedSolutions([]);
          if (formRef.current) formRef.current.reset();
        }, 3000);
      }
    } catch (err) {
      const firstError = err.response?.data?.error
        ? Object.values(err.response.data.error)[0]?.[0]
        : null;
      setErrorMsg(firstError || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-6 bg-slate-50">
        <div className="bg-white shadow-2xl rounded-[2.5rem] p-12 max-w-md w-full text-center border border-slate-100 animate-fadeInUp">
          <div className="w-20 h-20 bg-[#4B7635]/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle className="w-10 h-10 text-[#4B7635]" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Sent!</h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Thank you for your interest in STARC. Our team will reach out shortly to schedule your
            personalized demo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-12 px-4 relative overflow-hidden bg-slate-50">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#4B7635 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-[#4B7635]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-[#3B66BC]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl bg-white shadow-2xl shadow-slate-200/60 rounded-[2rem] p-6 lg:p-10 border border-slate-100 relative z-10 animate-fadeInUp">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border bg-[#4B7635]/5 border-[#4B7635]/20">
            <span className="text-[#4B7635] text-[10px] font-bold tracking-wider uppercase">
              🚀 Book a STARC Demo
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Meet the <span className="text-[#4B7635]">Experts at EHM</span>
          </h1>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl mb-8 text-center font-bold">
            {errorMsg}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-slate-300 group-focus-within:text-[#4B7635] transition-colors" />
              </div>
              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                required
                className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] transition-all duration-300 text-slate-900 font-medium placeholder-slate-300 hover:bg-white"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-300 group-focus-within:text-[#4B7635] transition-colors" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] transition-all duration-300 text-slate-900 font-medium placeholder-slate-300 hover:bg-white"
                placeholder="your.name@example.com"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="space-y-1">
            <label htmlFor="mobile" className="block text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
              Mobile Number
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Phone className="w-5 h-5 text-slate-300 group-focus-within:text-[#4B7635] transition-colors" />
              </div>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                autoComplete="tel"
                className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] transition-all duration-300 text-slate-900 font-medium placeholder-slate-300 hover:bg-white"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          {/* Solution of Interest — checklist dropdown */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
              Solution of Interest <span className="text-red-500">*</span>
            </label>
            <SolutionDropdown selected={selectedSolutions} onChange={setSelectedSolutions} />
          </div>

          {/* Message */}
          <div className="md:col-span-2 space-y-1">
            <label htmlFor="message" className="block text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
              Requirements
            </label>
            <div className="relative group">
              <div className="absolute top-5 left-5">
                <MessageSquare className="w-5 h-5 text-slate-300 group-focus-within:text-[#4B7635] transition-colors" />
              </div>
              <textarea
                id="message"
                name="message"
                rows="2"
                className="w-full pl-14 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] transition-all duration-300 resize-none text-slate-900 font-medium placeholder-slate-300 hover:bg-white"
                placeholder="Sustainability Goals we can help you with.."
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-4 flex flex-col sm:flex-row items-stretch gap-0">
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 group relative overflow-hidden bg-[#4B7635] text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-[#4B7635]/20 hover:shadow-xl hover:shadow-[#4B7635]/30 hover:-translate-y-1 transition-all duration-300 ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? <span>Wait a moment...</span> : (
                  <>
                    <Calendar className="w-6 h-6" />
                    <span>Confirm Live Demo Request</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </div>
            </button>

            {/* OR divider */}
            <div className="flex sm:flex-col items-center justify-center px-3 py-2 sm:py-0">
              <div className="flex-1 sm:w-px sm:h-full w-full h-px bg-slate-200" />
              <span className="mx-2 sm:mx-0 sm:my-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-1 sm:px-0 sm:py-1">
                or
              </span>
              <div className="flex-1 sm:w-px sm:h-full w-full h-px bg-slate-200" />
            </div>

            {/* Cal.com button */}
            <button
              onClick={handleScheduleClick}
              type="button"
              className="flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg border-2 border-[#4B7635] text-[#4B7635] hover:bg-[#4B7635]/5 hover:-translate-y-1 transition-all duration-300"
            >
              <Calendar className="w-6 h-6" />
              <span>Schedule a Meet</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Prefer direct contact? Reach us at{" "}
            <a
              href="mailto:info@ehmconsultancy.co.in"
              className="text-[#4B7635] hover:underline decoration-2 underline-offset-4"
            >
              info@ehmconsultancy.co.in
            </a>
          </p>
        </div>
      </div >

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }

        @keyframes dropdownOpen {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.95); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .animate-dropdownOpen {
          animation: dropdownOpen 0.2s ease-out forwards;
          transform-origin: top;
        }
      `}</style>
    </div >
  );
}
