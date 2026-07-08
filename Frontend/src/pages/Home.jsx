import React from "react";
import HeroSection from "./HeroSection";
import LogoMarquee from "./LogoMarquee";
import HeroSection2 from "./HeroSection2";
import StatsSection from "./StatsSection";
import WhyUse from "./WhyUse";
import AboutCampusFix from "./AboutSection";
import FAQSection from "./FaqSection";
import CtaSection from "./CtaSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <HeroSection2 />
      <StatsSection />
      <WhyUse />
      <AboutCampusFix />
      <FAQSection />
      <CtaSection />
    </>
  );
};

export default Home;