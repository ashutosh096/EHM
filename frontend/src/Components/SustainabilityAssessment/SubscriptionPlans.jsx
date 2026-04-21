import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import SectionHeading from "../../Common/SectionHeading";

const plans = [
  {
    name: "Standard",
    color: "bg-[#3B66BC]",
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
    color: "bg-[#4B7635]",
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

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  
  const handleChoosePlan = (planName) => {
    navigate('/contact', { state: { selectedPlan: planName } });
  };

  return (
    <section className="relative font-sans overflow-hidden bg-white py-16">
      <SectionHeading>
        <span className="block text-slate-900">Choose a Plan That Fits</span>
        <span className="text-[#3B66BC]">Your Sustainability Goals</span>
      </SectionHeading>
      
      <p className="text-lg text-slate-500 max-w-2xl mx-auto text-center mb-6 relative z-10">
        Transparent pricing and features designed to scale with your institution's environmental commitments.
      </p>

      <div className="max-w-6xl mx-auto relative z-10 px-4 pt-12">
        {/* Main Comparison Container */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="overflow-x-auto pt-10">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="p-8 pb-10 bg-slate-50/50 border-b border-slate-100 font-extrabold text-slate-800 text-2xl w-1/4 align-bottom">
                    Capabilities
                  </th>
                  {plans.map((plan, idx) => (
                    <th key={idx} className={`p-0 border-b border-slate-100 w-1/3 min-w-[300px] relative z-20`}>
                      <div className={`p-10 pb-12 flex flex-col items-center relative transition-all duration-500 group group-hover:-translate-y-2 ${idx === 0 ? 'bg-white shadow-[0_20px_50px_rgba(59,102,188,0.1)] border-x-2 border-t-2 border-[#3B66BC] rounded-t-[2.5rem] -mt-6' : 'bg-white shadow-[0_20px_50px_rgba(75,118,53,0.1)] border-x-2 border-t-2 border-[#4B7635] rounded-t-[2.5rem] -mt-6'}`}>
                        {plan.name === "Standard" ? (
                          <div className="mb-4 bg-[#3B66BC]/10 text-[#3B66BC] text-[10px] uppercase font-black px-4 py-1.5 rounded-full border border-[#3B66BC]/20 tracking-widest">
                            Most Popular
                          </div>
                        ) : (
                          <div className="mb-4 bg-[#4B7635]/10 text-[#4B7635] text-[10px] uppercase font-black px-4 py-1.5 rounded-full border border-[#4B7635]/20 tracking-widest">
                            Enterprise Tier
                          </div>
                        )}
                        <h3 className={`text-4xl font-black mb-1 ${plan.name === 'Premium' ? 'text-[#4B7635]' : 'text-[#3B66BC]'}`}>
                          {plan.name}
                        </h3>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-tighter">Scalable Solution</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featuresList.map((feature, fIdx) => (
                  <tr key={fIdx} className="group">
                    <td className={`p-5 px-8 border-b border-slate-50 font-semibold text-slate-700 transition-colors group-hover:bg-slate-50 ${fIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                      {feature}
                    </td>
                    {plans.map((plan, pIdx) => {
                      const value = plan.features[feature];
                      return (
                        <td key={pIdx} className={`p-6 border-b border-slate-50 text-center transition-all duration-500 relative z-20 bg-white ${pIdx === 0 ? 'border-x-2 border-[#3B66BC]' : 'border-x-2 border-[#4B7635]'} hover:bg-slate-50/50`}>
                          <div className="flex justify-center items-center">
                            {value === "✅" ? (
                              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${pIdx === 1 ? 'bg-[#4B7635]/10 text-[#4B7635]' : 'bg-[#3B66BC]/10 text-[#3B66BC]'}`}>
                                <Check className="w-5 h-5 shadow-sm" strokeWidth={3} />
                              </div>
                            ) : value === "-" ? (
                              <X className="w-5 h-5 text-slate-200" />
                            ) : (
                              <span className="text-sm font-bold text-slate-600 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                                {value}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="p-10 bg-slate-50/50"></td>
                  {plans.map((plan, idx) => (
                    <td key={idx} className={`p-10 text-center relative z-20 bg-white border-x-2 border-b-2 ${idx === 0 ? 'border-[#3B66BC] shadow-[0_20px_50px_rgba(59,102,188,0.1)]' : 'border-[#4B7635] shadow-[0_20px_50px_rgba(75,118,53,0.1)]'} rounded-b-[2.5rem] -mb-6`}>
                      <button 
                        onClick={() => handleChoosePlan(plan.name)}
                        className={`w-full py-5 px-8 rounded-2xl font-black text-xl text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl active:scale-95 shadow-xl ${idx === 0 ? 'bg-[#3B66BC] hover:bg-[#2d4d8e]' : 'bg-[#4B7635] hover:bg-[#3a5d28]'}`}
                      >
                        Select {plan.name}
                      </button>
                      <p className="mt-6 text-xs text-slate-400 font-bold uppercase tracking-wider">Join 100+ Campuses</p>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 opacity-60">
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">Trusted by 20+ Institutions</p>
          <div className="h-px w-24 bg-slate-200 hidden md:block" />
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">CSJMU Accredited</p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
