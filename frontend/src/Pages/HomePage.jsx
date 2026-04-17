// src/Pages/HomePage.jsx

import HeroSection from "../Components/LandingPage/HeroSection";
import FootPrint from "../Components/LandingPage/FootPrint";
import Testimonials from "../Components/LandingPage/Testimonials";
import Partners_logo from "../Components/LandingPage/Partners_logo";
import ServiceSection from "../Components/LandingPage/ServiceSection";
import EhmBrief from "../Components/LandingPage/EhmBrief";
import Resource from "../Components/LandingPage/Resource";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#ededed]">
      <HeroSection />
      <EhmBrief />
      <ServiceSection />
      <Partners_logo />
      <Testimonials />
      <Resource />
      {<FootPrint />}
    </div>
  );
};

export default HomePage;
