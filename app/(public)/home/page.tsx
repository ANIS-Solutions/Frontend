import BenefitsSection from "./BenefitsSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";

function page() {
  return (
    <div >
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <StatsSection />
    </div>
  );
}

export default page;
