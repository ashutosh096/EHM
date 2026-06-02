import { useState } from "react";
import { Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react";
import API from "../../api/axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    interestedIn: "",
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\+?[0-9]{10,15}$/;

    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (formData.mobile.trim() && !mobileRegex.test(formData.mobile.trim())) {
      setErrorMsg("Please enter a valid mobile number (e.g., +911234567890).");
      setIsLoading(false);
      return;
    }

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

      if (res?.data?.success || res?.data?.sucess) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", mobile: "", interestedIn: "", message: "" });
        }, 5000);
      }
    } catch (err) {
      const firstError = err.response?.data?.error
        ? Object.values(err.response.data.error)[0]?.[0]
        : null;
      setErrorMsg(err.response?.data?.message || firstError || "Something went wrong. Please try again.");
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Thank you for reaching out. Our team will get back to you shortly.
          </p>
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

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border bg-[#4B7635]/5 border-[#4B7635]/20">
            <span className="text-[#4B7635] text-[10px] font-bold tracking-wider uppercase">
              ✉️ Contact Us
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Get in Touch with <span className="text-[#4B7635]">EHM</span>
          </h1>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl mb-6 text-center font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                <User className="w-5 h-5 text-slate-300 group-focus-within:text-[#4B7635] transition-colors" />
              </div>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                autoComplete="tel"
                className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] transition-all duration-300 text-slate-900 font-medium placeholder-slate-300 hover:bg-white"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          {/* Support Type */}
          <div className="space-y-1">
            <label htmlFor="interestedIn" className="block text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
              What type of support are you looking for?<span className="text-red-500">*</span>
            </label>
            <select
              id="interestedIn"
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] transition-all duration-300 text-slate-900 font-medium hover:bg-white appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center" }}
            >
              <option value="" disabled className="text-slate-300">Select a support type</option>
              <option value="Sustainability Reporting / ESG Support">Sustainability Reporting / ESG Support</option>
              <option value="Wastewater Treatment & Waterbody Restoration">Wastewater Treatment & Waterbody Restoration</option>
              <option value="Geophysical / Subsurface Investigation">Geophysical / Subsurface Investigation</option>
              <option value="Urban Planning & City Project Support">Urban Planning & City Project Support</option>
              <option value="Climate Risk Assessment / Climate Data Advisory">Climate Risk Assessment / Climate Data Advisory</option>
              <option value="Training, Workshops, or Capacity Building">Training, Workshops, or Capacity Building</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          {/* Message */}
          <div className="md:col-span-2 space-y-1">
            <label htmlFor="message" className="block text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-wider">
              Your Message <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute top-5 left-5">
                <MessageSquare className="w-5 h-5 text-slate-300 group-focus-within:text-[#4B7635] transition-colors" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4B7635]/20 focus:border-[#4B7635] transition-all duration-300 resize-none text-slate-900 font-medium placeholder-slate-300 hover:bg-white"
                placeholder="How can we help you?"
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full group relative overflow-hidden bg-[#4B7635] text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-[#4B7635]/20 hover:shadow-xl hover:shadow-[#4B7635]/30 hover:-translate-y-1 transition-all duration-300 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-60" />
                  </>
                )}
              </div>
            </button>
          </div>

        </form>

        {/* Footer */}
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
