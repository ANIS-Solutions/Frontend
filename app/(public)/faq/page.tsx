import React from "react";
import HeroSection from "./HeroSection";
import FAQSection from "./FAQSection";
import HelpfulResources from "./HelpfulResources";

function FaqQuestionPage() {
  return (
    <div className="bg-[#F6F5F3]">
      <HeroSection />
      <FAQSection />
      <HelpfulResources/>
    </div>
  );
}

export default FaqQuestionPage;
