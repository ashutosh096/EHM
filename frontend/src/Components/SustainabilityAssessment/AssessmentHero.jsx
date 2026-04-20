import React, { useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

const FEATURES = [
  { label: "AI Sustainability BOT", color: "#00c8b4" },
  { label: "GHG Accounting", color: "#0090ff" },
  { label: "UNSDG Matrices", color: "#ffc200" },
  { label: "Centralized Tracking", color: "#8b5cf6" },
  { label: "API Integration", color: "#f97316" },
  { label: "MFA Security", color: "#ec4899" },
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
          labels: ["Physiotherapy", "Pathology", "X-Ray", "Other"],
          datasets: [
            {
              data: [66, 20, 8, 6],
              backgroundColor: ["#00c8b4", "#0090ff", "#ffc200", "#8b5cf6"],
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
          labels: ["Physio", "Health Ctr", "Pathology", "X-Ray"],
          datasets: [
            {
              label: "Cost",
              data: [4.5, 0.4, 5.5, 1.2],
              backgroundColor: "rgba(248,113,113,0.8)",
              borderRadius: 4,
            },
            {
              label: "Market Value",
              data: [18, 3.5, 17, 2.8],
              backgroundColor: "rgba(96,165,250,0.8)",
              borderRadius: 4,
            },
            {
              label: "Benefit",
              data: [13.5, 3.2, 11.5, 2],
              backgroundColor: "rgba(52,211,153,0.8)",
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
              ticks: { color: "rgba(255,255,255,0.45)", font: { size: 10 } },
              grid: { color: "rgba(255,255,255,0.04)" },
              border: { color: "rgba(255,255,255,0.08)" },
            },
            y: {
              ticks: {
                color: "rgba(255,255,255,0.45)",
                font: { size: 10 },
                callback: (v) => "₹" + v + "L",
              },
              grid: { color: "rgba(255,255,255,0.06)" },
              border: { color: "rgba(255,255,255,0.08)" },
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 py-16"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2244 40%, #0f1f3d 70%, #081530 100%)" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,200,180,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,180,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(0,200,180,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(0,120,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(255,180,0,0.05) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute top-[12%] right-[8%] w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,200,180,0.08), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[18%] left-[4%] w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,144,255,0.08), transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT CONTENT ── */}
          <div className="space-y-6 animate-fadeInLeft">

            <div className="space-y-6 animate-fadeInLeft font-sans">

              {/* ESG badge */}
              <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full border bg-[#00c8b4]/10 border-[#00c8b4]/30">
                <span className="text-[#00c8b4] text-xs font-semibold tracking-wide uppercase">
                  🌱 ESG Insight and Sustainability Intelligence
                </span>
              </div>

              {/* Brand wordmark */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white tracking-tight">
                    S
                  </span>
                  <span
                    className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#00c8b4] to-[#0090ff] bg-clip-text text-transparent"
                  >
                    TARC
                  </span>
                </div>
                <p className="text-[10px] font-semibold tracking-wider text-white/40 uppercase mt-1">
                  Sustainability Tracking, Assessment & Reporting for Campus
                </p>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white max-w-2xl">
                Empowering Institutions and Organizations Through Data-Driven Sustainability
              </h1>

              {/* Description */}
              <p className="text-base text-white/70 leading-relaxed max-w-xl">
                STARC empowers higher education institutions and industries to assess, manage, and communicate sustainability performance through data-driven ESG reporting, dashboards, and compliance frameworks.
              </p>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs text-white/70 font-medium"
                  style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.color }} />
                  {f.label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #00c8b4, #0090ff)",
                  boxShadow: "0 10px 30px rgba(0,200,180,0.3)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Calendar className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Book a Demo</span>
              </a>

              <button
                onClick={() => navigate("/resources/casestudies")}
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg rounded-xl border text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.2)" }}
              >
                📊 View Case Studies
              </button>
            </div>
          </div>

          {/* ── RIGHT — ESG DASHBOARD ── */}
          <div className="animate-fadeInRight relative">
            <div
              className="relative rounded-3xl p-6 border overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Top shimmer line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,180,0.5), transparent)" }}
              />

              {/* Dashboard header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-bold text-white text-base">ESG Performance Dashboard</p>
                  <p className="text-[11px] text-white/40 mt-0.5">Real-time sustainability metrics — CSJMU Campus</p>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-semibold text-[#00c8b4]"
                  style={{ background: "rgba(0,200,180,0.15)", borderColor: "rgba(0,200,180,0.3)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c8b4] animate-pulse" />
                  LIVE
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { val: "92%", label: "ESG Compliance", color: "#00c8b4", bg: "rgba(0,200,180,0.12)", border: "rgba(0,200,180,0.25)" },
                  { val: "34%", label: "Emission Reduction", color: "#4db6ff", bg: "rgba(0,144,255,0.12)", border: "rgba(0,144,255,0.25)" },
                  { val: "78%", label: "Sustainability Score", color: "#a78bfa", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.25)" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3.5 text-center border"
                    style={{ background: s.bg, borderColor: s.border }}
                  >
                    <div className="text-2xl text-white leading-none" >
                      {s.val}
                    </div>
                    <div className="text-[10px] text-white/50 mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-2 gap-4 mb-5">

                {/* Pie / Doughnut */}
                <div className="rounded-xl p-3.5" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <p className="text-[11px] text-white/50 font-medium mb-2.5">Healthcare beneficiaries by facility</p>
                  <div className="relative w-full h-36">
                    <canvas ref={pieRef} aria-label="Doughnut chart of healthcare beneficiaries" role="img" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                    {[
                      { label: "Physiotherapy 66%", color: "#00c8b4" },
                      { label: "Pathology 20%", color: "#0090ff" },
                      { label: "X-Ray 8%", color: "#ffc200" },
                      { label: "Other 6%", color: "#8b5cf6" },
                    ].map((l) => (
                      <span key={l.label} className="flex items-center gap-1 text-[10px] text-white/50">
                        <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                        {l.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bar chart */}
                <div className="rounded-xl p-3.5" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <p className="text-[11px] text-white/50 font-medium mb-2.5">University facilities benefit (₹L)</p>
                  <div className="relative w-full h-36">
                    <canvas ref={barRef} aria-label="Grouped bar chart of university healthcare financials" role="img" />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                    {[
                      { label: "Cost", color: "rgba(248,113,113,0.8)" },
                      { label: "Market Value", color: "rgba(96,165,250,0.8)" },
                      { label: "Benefit", color: "rgba(52,211,153,0.8)" },
                    ].map((l) => (
                      <span key={l.label} className="flex items-center gap-1 text-[10px] text-white/50">
                        <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                        {l.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/50 mb-1.5">
                  <span>Overall sustainability progress</span>
                  <span className="text-[#00c8b4] font-semibold">78%</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: "78%",
                      background: "linear-gradient(90deg, #00c8b4, #0090ff, #8b5cf6)",
                    }}
                  />
                </div>
              </div>

              {/* SDG pills */}
              <div className="flex flex-wrap gap-2">
                {SDG_PILLS.map((pill) => (
                  <span
                    key={pill}
                    className="text-[10px] text-white/50 px-2.5 py-1 rounded-md border"
                    style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

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
