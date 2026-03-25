import BenefitsComponent from "@/app/components/home/BenefitsComponent";

import BenefitsImg1 from "@/public/imgs/BenefitsImg1.jpeg";
function BenefitsSection() {
  return (
    <section className="py-10">
      <BenefitsComponent
        title="Build Trust Together"
        description="ANIS helps you have open conversations about healthy device use, building trust instead of creating conflict."
        img={BenefitsImg1}
        link="/for-parents"
        textLink="Learn more →"
      />
      <BenefitsComponent
        title="Peace of Mind"
        description="Rest easy knowing your child is developing healthy digital habits while exploring, learning, and growing."
        img={BenefitsImg1}
        link="/for-parents"
        textLink="Learn more →"
        reverse
      />
      <BenefitsComponent
        title="Balanced Growth"
        description="Help your child balance screen time with other activities, supporting their overall development and wellbeing."
        img={BenefitsImg1}
        link="/for-parents"
        textLink="Learn more →"
      />
    </section>
  );
}

export default BenefitsSection;
