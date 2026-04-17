import BenefitsSection from "./BenefitsSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";

export default function HomePage() {
  return (
    <>
      <div>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <StatsSection />
      </div>
    </>
  );
}
