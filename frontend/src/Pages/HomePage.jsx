// src/Pages/HomePage.jsx
import { lazy, Suspense } from "react";
import HeroSection from "../Components/LandingPage/HeroSection";
const FootPrint = lazy(() => import("../Components/LandingPage/FootPrint"));
const Testimonials = lazy(() => import("../Components/LandingPage/Testimonials"));
const Partners_logo = lazy(() => import("../Components/LandingPage/Partners_logo"));
const ServiceSection = lazy(() => import("../Components/LandingPage/ServiceSection"));
const EhmBrief = lazy(() => import("../Components/LandingPage/EhmBrief"));
const Resource = lazy(() => import("../Components/LandingPage/Resource"));

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#ededed]">
      <HeroSection />
      <Suspense fallback={<div className="h-20" />}>
        <EhmBrief />
        <ServiceSection />
        <Partners_logo />
        <Testimonials />
        <Resource />
        <FootPrint />
      </Suspense>
    </div>
  );
};

export default HomePage;
