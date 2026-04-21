import { useState } from "react";
import { Mail, User, MessageSquare, Send, CheckCircle, Calendar } from "lucide-react";
import API from "../../api/axios";

export default function StarcContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    interestedIn: "Sustainability Reporting / ESG Support",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      interestedIn: formData.interestedIn.trim(),
      message: formData.message.trim(),
    };

    try {
      const res = await API.post("/contact", cleanedData);

      if (res?.data?.success) {
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            mobile: "",
            interestedIn: "Sustainability Reporting / ESG Support (STARC)",
            message: "",
          });
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
      <div className="min-h-screen flex items-center justify-center py-20 px-6"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2244 40%, #0f1f3d 70%, #081530 100%)" }}>
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-white/20 animate-fadeInUp">
          <div className="w-20 h-20 bg-gradient-to-r from-[#00c8b4] to-[#0090ff] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00c8b4]/20">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Request Sent!</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Thank you for your interest in STARC. Our team will reach out shortly to schedule your personalized demo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2244 40%, #0f1f3d 70%, #081530 100%)" }}>

      {/* Background decorations matching STARC theme */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,200,180,0.15), transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,144,255,0.15), transparent 70%)" }} />
      </div>

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-8 md:p-12 border border-white/10 relative z-10 animate-fadeInUp">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border bg-[#00c8b4]/10 border-[#00c8b4]/30">
            <span className="text-[#00c8b4] text-xs font-semibold tracking-wide uppercase">
              🚀 Experience STARC Firsthand
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Book a <span className="bg-gradient-to-r from-[#00c8b4] to-[#0090ff] bg-clip-text text-transparent">STARC Demo</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover how our AI-driven sustainability intelligence platform can transform your institution's ESG reporting and compliance.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl mb-8 text-center backdrop-blur-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-white/30 group-focus-within:text-[#00c8b4] transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00c8b4]/50 focus:border-[#00c8b4]/50 transition-all duration-300 text-white placeholder-white/20 hover:bg-white/10"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 ml-1">Work Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-white/30 group-focus-within:text-[#00c8b4] transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00c8b4]/50 focus:border-[#00c8b4]/50 transition-all duration-300 text-white placeholder-white/20 hover:bg-white/10"
                placeholder="your.name@organization.com"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 ml-1">Mobile Number (optional)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-white/30 group-focus-within:text-[#00c8b4] transition-colors" />
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00c8b4]/50 focus:border-[#00c8b4]/50 transition-all duration-300 text-white placeholder-white/20 hover:bg-white/10"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          {/* Interested In */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/80 ml-1">Solution of Interest</label>
            <select
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#00c8b4]/50 focus:border-[#00c8b4]/50 transition-all duration-300 hover:bg-white/10 appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
            >
              <option value="Sustainability Reporting / ESG Support" className="bg-[#0d2244]">Sustainability Reporting / ESG Support (STARC)</option>
              <option value="Wastewater Treatment & Waterbody Restoration" className="bg-[#0d2244]">Wastewater Treatment & Restoration</option>
              <option value="Geophysical / Subsurface Investigation" className="bg-[#0d2244]">Geophysical Investigation</option>
              <option value="Urban Planning & City Project Support" className="bg-[#0d2244]">Urban Planning Support</option>
              <option value="Climate Risk Assessment / Data Advisory" className="bg-[#0d2244]">Climate Risk Assessment</option>
              <option value="Training, Workshops, or Capacity Building" className="bg-[#0d2244]">Training & Workshops</option>
              <option value="General Inquiry" className="bg-[#0d2244]">General Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-white/80 ml-1">Tell us about your requirements</label>
            <div className="relative group">
              <div className="absolute top-4 left-4">
                <MessageSquare className="w-5 h-5 text-white/30 group-focus-within:text-[#00c8b4] transition-colors" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00c8b4]/50 focus:border-[#00c8b4]/50 transition-all duration-300 resize-none text-white placeholder-white/20 hover:bg-white/10"
                placeholder="What specific sustainability challenges are you looking to address with STARC?"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full group relative overflow-hidden bg-gradient-to-r from-[#00c8b4] to-[#0090ff] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#00c8b4]/20 hover:shadow-[#00c8b4]/40 hover:-translate-y-1 transition-all duration-300 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                  <span>Wait a moment...</span>
                ) : (
                  <>
                    <Calendar className="w-6 h-6" />
                    <span>Confirm Live Demo Request</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </div>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm">
            Prefer direct contact? Reach us at <a href="mailto:info@ehmconsultancy.co.in" className="text-[#00c8b4] hover:underline">info@ehmconsultancy.co.in</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
