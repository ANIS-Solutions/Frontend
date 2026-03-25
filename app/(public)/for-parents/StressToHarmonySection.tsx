import Image from "next/image";
import Link from "next/link";
import StressHarmonyImg from "@/public/imgs/stressImgBoy.jpeg";
import BenefitsComponent from "@/app/components/home/BenefitsComponent";

function StressToHarmonySection() {
  return (
    <section className="py-12 md:py-16 px-4 bg-[#F9FAFB]">
      <BenefitsComponent
        title="From stress to harmony"
        description="ANIS transforms daily screen time battles into opportunities for connection and growth. Instead of feeling like the bad guy, you become a supportive guide in your child's digital journey."
        img={StressHarmonyImg}
        link="/how-works"
        textLink="See how it works →"
      />
    </section>
  );
}

export default StressToHarmonySection;
