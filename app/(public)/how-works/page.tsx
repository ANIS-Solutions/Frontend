import React from "react";
import HeroSection from "./HeroSection";
import HowWorkSection from "./HowWorkSection";
import VideoDemoSection from "./VideoDemo";
import CommonQuestionSection from "./CommonQuestionSection";

function HowWork() {
  return (
    <div className="bg-[#F6F5F3]">
      <HeroSection />
      <HowWorkSection />
      <VideoDemoSection />
      <CommonQuestionSection />
    </div>
  );
}

export default HowWork;
