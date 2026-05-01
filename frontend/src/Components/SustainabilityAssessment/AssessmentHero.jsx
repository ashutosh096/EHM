import React, { useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

const FEATURES = [
  { label: "AI Sustainability BOT", color: "#088f8f" },
  { label: "GHG Accounting", color: "#0047ab" },
  { label: "UNSDG Matrices", color: "#e4d00a" },
  { label: "Centralized Tracking", color: "#088f8f" },
  { label: "API Integration", color: "#0047ab" },
  { label: "MFA Security", color: "#e4d00a" },
];

const SDG_PILLS = [
  "SDG 3 — Good Health",
  "SDG 4 — Quality Education",
  "SDG 7 — Clean Energy",
  "SDG 13 — Climate Action",
  "SDG 17 — Partnerships",
];

const StarcHero = () => {
  const navigate = useNavigate();
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const pieChart = useRef(null);
  const barChart = useRef(null);

  useEffect(() => {
    if (pieRef.current) {
      pieChart.current?.destroy();
      pieChart.current = new Chart(pieRef.current, {
        type: "doughnut",
        data: {
          labels: ["Rooftop Solar On-grid", "Solar Street Lights", "Biogas Generation", "Non-Renewable"],
          datasets: [
            {
              data: [40, 36, 24, 60], // Energy Mix: 40% renewable (split by source), 60% non-renewable
              backgroundColor: ["#088f8f", "#e4d00a", "#0047ab", "#8ccbbd"],
              borderColor: "rgba(255,255,255,0.08)",
              borderWidth: 2,
              hoverBorderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "62%",
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: (c) => " " + c.label + ": " + c.parsed + "%" },
            },
          },
        },
      });
    }

    if (barRef.current) {
      barChart.current?.destroy();
      barChart.current = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: ["2022-23", "2023-24", "2024-25"],
          datasets: [
            {
              label: "Scope 1",
              // Scope 1 = 4.52% of 1346.41 total tCO₂e ≈ 60.86; baseline year was higher
              data: [180, 120, 60.86],
              backgroundColor: "rgba(0,71,171,0.75)",
              borderRadius: 4,
            },
            {
              label: "Scope 2",
              // Scope 2 = 95.48% of 1346.41 ≈ 1285.55; trend shows reduction from ~3400 baseline
              data: [3400, 1800, 1285.55],
              backgroundColor: "rgba(228,208,10,0.75)",
              borderRadius: 4,
            },
            {
              label: "Total tCO₂e",
              data: [3580, 1920, 1346.41],
              backgroundColor: "rgba(8,143,143,0.75)",
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks: { color: "#64748b", font: { size: 10 } },
              grid: { color: "rgba(0,0,0,0.04)" },
              border: { color: "rgba(0,0,0,0.08)" },
            },
            y: {
              ticks: {
                color: "#64748b",
                font: { size: 10 },
                callback: (v) => v + " t",  // tCO₂e unit
              },
              grid: { color: "rgba(0,0,0,0.06)" },
              border: { color: "rgba(0,0,0,0.08)" },
            },
          },
        },
      });
    }

    return () => {
      pieChart.current?.destroy();
      barChart.current?.destroy();
    };
  }, []);
  return (
    <section
      className="relative flex items-center overflow-hidden pt-24 pb-12"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-100 to-white" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-teal-200/70 to-white/95" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/90" />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/60 via-teal-200/40 to-teal-100/60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-50/50 via-teal-100/30 to-teal-50/50" />
      {/* Top & bottom white fades */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

      {/* Brand glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(8,143,143,0.05) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(0,71,171,0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT CONTENT ── */}
          <div className="space-y-6 animate-fadeInLeft">
            <div className="space-y-4 font-sans">

              {/* ESG badge */}
              <div
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full border"
                style={{ backgroundColor: "rgba(8,143,143,0.1)", borderColor: "rgba(8,143,143,0.3)" }}
              >
                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#088f8f" }}>
                  🌱 ESG Insight and Sustainability Intelligence
                </span>
              </div>

              {/* Brand wordmark */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-[#1a1a1a] tracking-tight">S</span>
                  <span className="text-5xl font-extrabold tracking-tight" style={{ color: "#088f8f" }}>TARC</span>
                </div>
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-1">
                  Sustainability Tracking, Assessment & Reporting for Campus
                </p>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-[#1a1a1a] max-w-2xl">
                Empowering Institutions and Organizations Through Data-Driven Sustainability
              </h1>

              {/* Description */}
              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                STARC empowers higher education institutions and industries to assess, manage, and communicate sustainability performance through data-driven ESG reporting, dashboards, and compliance frameworks.
              </p>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs text-slate-600 font-medium bg-white border-slate-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.color }} />
                  {f.label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => window.location.href = "/contact/starc"}
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#088f8f",
                  boxShadow: "0 6px 20px rgba(8,143,143,0.25)",
                }}
              >
                <Calendar className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Book a Demo</span>
              </button>

              <button
                onClick={() => navigate("/resources/casestudies")}
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg rounded-xl border text-slate-700 bg-white border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 shadow-sm"
              >
                📊 View Case Studies
              </button>
            </div>
          </div>
          {/* ── END LEFT CONTENT ── */}

          {/* ✅ Fixed: RIGHT column is now a proper sibling of LEFT column */}
          <div className="animate-fadeInRight relative">
            <div className="relative rounded-3xl p-6 border overflow-hidden bg-white border-slate-200 shadow-xl">

              {/* Dashboard header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-bold text-slate-800 text-base">ESG Performance Dashboard</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Real-time sustainability metrics — CSJMU Campus</p>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-semibold"
                  style={{ color: "#088f8f", backgroundColor: "rgba(8,143,143,0.08)", borderColor: "rgba(8,143,143,0.25)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#088f8f" }} />
                  LIVE
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { val: "92%", label: "ESG Compliance", color: "#088f8f" },
                  { val: "62%", label: "Emission Reduction", color: "#0047ab" },
                  { val: "78%", label: "Sustainability Score", color: "#e4d00a" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-3.5 text-center border bg-slate-50 border-slate-100 shadow-sm">
                    <div className="text-2xl text-slate-800 leading-none">{s.val}</div>
                    <div className="text-[10px] text-slate-500 mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-100">
                  <p className="text-[11px] text-slate-500 font-medium mb-2.5">Energy Mix Distribution</p>
                  <div className="relative w-full h-36">
                    <canvas ref={pieRef} aria-label="Doughnut chart" role="img" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                    {
                      [
                        { label: "Rooftop Solar 40%", color: "#088f8f" },
                        { label: "Street Lights 36%", color: "#e4d00a" },
                        { label: "Biogas 24%", color: "#0047ab" },
                        { label: "Non-Renewable 60%", color: "#8ccbbd" },
                      ].map((l) => (
                        <span key={l.label} className="flex items-center gap-1 text-[10px] text-slate-500">
                          <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                          {l.label}
                        </span>
                      ))
                    }
                  </div>
                </div>

                <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-100">
                  <p className="text-[11px] text-slate-500 font-medium mb-2.5">GHG Emissions Trend (tCO₂e)</p>
                  <div className="relative w-full h-36">
                    <canvas ref={barRef} aria-label="Grouped bar chart" role="img" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                    {[
                      { label: "Scope 1", color: "rgba(0,71,171,0.75)" },
                      { label: "Scope 2", color: "rgba(228,208,10,0.75)" },
                      { label: "Total tCO₂e", color: "rgba(8,143,143,0.75)" },
                    ].map((l) => (
                      <span key={l.label} className="flex items-center gap-1 text-[10px] text-slate-500">
                        <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                        {l.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>Overall sustainability progress</span>
                  <span className="font-semibold" style={{ color: "#088f8f" }}>78%</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: "78%", backgroundColor: "#088f8f" }}
                  />
                </div>
              </div>

              {/* SDG pills */}
              <div className="flex flex-wrap gap-2">
                {SDG_PILLS.map((pill) => (
                  <span key={pill} className="text-[10px] text-slate-500 px-2.5 py-1 rounded-md border bg-white border-slate-200">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* ── END RIGHT CONTENT ── */}

        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInLeft  { animation: fadeInLeft  0.8s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out; }
      `}</style>
    </section>
  );
};

export default StarcHero;
