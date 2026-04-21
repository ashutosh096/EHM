import React from 'react'
import AssessmentHero from '../Components/SustainabilityAssessment/AssessmentHero'
import DashBoardBrief from '../Components/SustainabilityAssessment/DashBoardBrief'
import DashboardFeatures from '../Components/SustainabilityAssessment/DashboardFeatures'
import ImplementationPlanSection from '../Components/SustainabilityAssessment/ImplementationPlanSection'
import SubscriptionPlans from '../Components/SustainabilityAssessment/SubscriptionPlans'
import FeatureProject from '../Components/SustainabilityAssessment/FeatureProject'


const SustainabilityAssessment = () => {
  return (
    <div className="min-h-screen bg-white">
      <AssessmentHero />
      <DashBoardBrief />
      <DashboardFeatures/>
      <ImplementationPlanSection/>  
      <SubscriptionPlans/>  
      <FeatureProject/>
    </div>
  )
}

export default SustainabilityAssessment