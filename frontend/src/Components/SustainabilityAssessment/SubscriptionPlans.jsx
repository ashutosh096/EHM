import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import SectionHeading from "../../Common/SectionHeading";

const plans = [
  {
    name: "Standard",
    borderColor: "#3B66BC",
    accentColor: "#3B66BC",
    badgeLabel: "Most Popular",
    btnBg: "#3B66BC",
    btnHoverBg: "#2d4d8e",
    features: {
      "SDG Mapping": "✅",
      "GHG Accounting": "Scope 1 & Scope 2",
      "Policy Review": "✅",
      "Ranking Related Queries": "✅",
      "Sustainability Dashboard": "✅",
      "Dashboard Updates": "-",
      "AI Sustainability bot": "Flow based",
      "Sustainability Literacy Test": "Pre assesement",
      "ESG Webinar": "✅",
      "Facilitation for Certification": "✅",
      "ClimIntellio Access": "-",
    },
  },
  {
    name: "Premium",
    borderColor: "#4B7635",
    accentColor: "#4B7635",
    badgeLabel: "Enterprise Tier",
    btnBg: "#4B7635",
    btnHoverBg: "#3a5d28",
    features: {
      "SDG Mapping": "✅",
      "GHG Accounting": "Scope 1, Scope 2 & Scope 3",
      "Policy Review": "✅",
      "Ranking Related Queries": "✅",
      "Sustainability Dashboard": "✅",
      "Dashboard Updates": "Twice in a year",
      "AI Sustainability bot": "Query based",
      "Sustainability Literacy Test": "Pre & Post Assessment",
      "ESG Webinar": "✅",
      "Facilitation for Certification": "As per requirement",
      "ClimIntellio Access": "✅",
    },
  },
];

const featuresList = [
  "SDG Mapping",
  "GHG Accounting",
  "Policy Review",
  "Ranking Related Queries",
  "Sustainability Dashboard",
  "Dashboard Updates",
  "AI Sustainability bot",
  "Sustainability Literacy Test",
  "ESG Webinar",
  "Facilitation for Certification",
  "ClimIntellio Access",
];

const TOTAL_ROWS = 1 + featuresList.length + 1;

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const handleChoosePlan = (planName) =>
    navigate("/contact", { state: { selectedPlan: planName } });

  return (
    <section className="relative font-sans bg-white py-16 overflow-hidden">
      <SectionHeading>
        <span className="block text-slate-900">Choose a Plan That Fits</span>
        <span className="text-[#3B66BC]">Your Sustainability Goals</span>
      </SectionHeading>

      <p className="text-lg text-slate-500 max-w-2xl mx-auto text-center mb-6">
        Transparent pricing and features designed to scale with your
        institution's environmental commitments.
      </p>

      <div className="max-w-5xl mx-auto px-4 pt-14">
        {/* Horizontal scroll container for mobile */}
        <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide select-none">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr 1fr",
              gridTemplateRows: `160px repeat(${featuresList.length}, 56px) 130px`,
              columnGap: "16px",
              minWidth: "800px", // Ensures columns don't compress too much on mobile
            }}
          >
            {/* ── Plan card border overlays ── */}
            {plans.map((plan, pIdx) => (
              <div
                key={`border-${pIdx}`}
                style={{
                  gridRow: `1 / ${TOTAL_ROWS + 1}`,
                  gridColumn: pIdx + 2,
                  outline: `2px solid ${plan.borderColor}`,
                  borderRadius: "1.75rem",
                  marginTop: "-24px",
                  boxShadow: `0 4px 40px ${plan.borderColor}22`,
                  pointerEvents: "none",
                  zIndex: 10,
                  backgroundColor: "transparent",
                }}
              />
            ))}

            {/* ── COLUMN 1: Feature Labels ── */}
            <div
              style={{ gridRow: 1, gridColumn: 1, zIndex: 2 }}
              className="flex items-end pb-5 px-4"
            >
              <span className="font-extrabold text-slate-800 text-xl">
                Capabilities
              </span>
            </div>

            {featuresList.map((feature, i) => (
              <div
                key={`label-${i}`}
                style={{ gridRow: i + 2, gridColumn: 1, zIndex: 2 }}
                className={`flex items-center px-4 border-b border-slate-100 font-semibold text-slate-600 text-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                {feature}
              </div>
            ))}

            <div style={{ gridRow: TOTAL_ROWS, gridColumn: 1, zIndex: 2 }} />

            {/* ── COLUMNS 2 & 3: Plan content ── */}
            {plans.map((plan, pIdx) => {
              const col = pIdx + 2;
              return (
                <React.Fragment key={`plan-${pIdx}`}>
                  {/* Header */}
                  <div
                    style={{
                      gridRow: 1,
                      gridColumn: col,
                      zIndex: 2,
                      marginTop: "-24px",
                      backgroundColor: "#ffffff",
                    }}
                    className="flex flex-col items-center justify-center gap-2 px-4"
                  >
                    <span
                      style={{
                        color: plan.accentColor,
                        border: `1px solid ${plan.borderColor}33`,
                        backgroundColor: `${plan.borderColor}18`,
                      }}
                      className="text-[10px] uppercase font-black px-4 py-1.5 rounded-full tracking-widest"
                    >
                      {plan.badgeLabel}
                    </span>
                    <h3
                      style={{ color: plan.accentColor }}
                      className="text-4xl font-black leading-none"
                    >
                      {plan.name}
                    </h3>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-tighter">
                      Scalable Solution
                    </p>
                  </div>

                  {/* Feature value cells */}
                  {featuresList.map((feature, fIdx) => {
                    const value = plan.features[feature];
                    return (
                      <div
                        key={`val-${pIdx}-${fIdx}`}
                        style={{ gridRow: fIdx + 2, gridColumn: col, zIndex: 2 }}
                        className={`flex items-center justify-center border-b border-slate-100 ${
                          fIdx % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        {value === "✅" ? (
                          <div
                            style={{
                              backgroundColor: `${plan.borderColor}18`,
                              color: plan.accentColor,
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-full"
                          >
                            <Check className="w-4 h-4" strokeWidth={3} />
                          </div>
                        ) : value === "-" ? (
                          <X className="w-4 h-4 text-slate-300" />
                        ) : (
                          <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm text-center leading-snug">
                            {value}
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {/* Footer CTA */}
                  <div
                    style={{
                      gridRow: TOTAL_ROWS,
                      gridColumn: col,
                      zIndex: 2,
                      backgroundColor: "#ffffff",
                    }}
                    className="flex flex-col items-center justify-center px-5 gap-2"
                  >
                    <button
                      onClick={() => handleChoosePlan(plan.name)}
                      style={{ backgroundColor: plan.btnBg }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          plan.btnHoverBg)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = plan.btnBg)
                      }
                      className="w-full py-4 px-6 rounded-2xl font-black text-base text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 shadow-md"
                    >
                      Select {plan.name}
                    </button>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Join 100+ Campuses
                    </p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 animate-pulse">
          <span className="text-lg">←</span>
          Swipe to compare
          <span className="text-lg">→</span>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 opacity-60">
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
            Trusted by 20+ Institutions
          </p>
          <div className="h-px w-24 bg-slate-200 hidden md:block" />
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
            CSJMU Accredited
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
