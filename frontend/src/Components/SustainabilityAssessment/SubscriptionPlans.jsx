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
    <section className="relative py-24 px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-white" />
      <SectionHeading>
        <span className="block">Choose a Plan That Fits</span>
        <span className="text-[#3B66BC]">
          Your Sustainability Goals
        </span>
      </SectionHeading>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto text-center mb-16 relative z-10">
        Select the plan that matches your organization's sustainability needs and reporting maturity.
      </p>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 border-b border-slate-200 bg-slate-50 font-semibold text-slate-700 text-lg w-1/3">
                  Features
                </th>
                {plans.map((plan, idx) => (
                  <th key={idx} className={`p-6 border-b border-slate-200 bg-gradient-to-br ${plan.color} text-white font-bold text-xl text-center w-1/3 relative`}>
                    {plan.name}
                    {plan.name === "Standard" && (
                      <span className="absolute top-4 right-4 bg-[#E59518] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-lg">
                        Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featuresList.map((feature, fIdx) => (
                <tr key={fIdx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 px-6 border-b border-slate-100 font-medium text-slate-700">
                    {feature}
                  </td>
                  {plans.map((plan, pIdx) => {
                    const value = plan.features[feature];
                    return (
                      <td key={pIdx} className="p-4 border-b border-slate-100 text-center text-slate-600">
                        <div className="flex justify-center items-center">
                          {value === "✅" ? (
                            <Check className="w-5 h-5 text-[#4B7635]" />
                          ) : value === "-" ? (
                            <X className="w-5 h-5 text-slate-300" />
                          ) : (
                            <span className="text-sm font-medium">{value}</span>
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
                <td className="p-6 bg-slate-50 border-t border-slate-200"></td>
                {plans.map((plan, idx) => (
                  <td key={idx} className="p-6 border-t border-slate-200 text-center bg-slate-50/50">
                    <button 
                      onClick={() => handleChoosePlan(plan.name)}
                      className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md ${plan.color}`}
                    >
                      Choose {plan.name}
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
