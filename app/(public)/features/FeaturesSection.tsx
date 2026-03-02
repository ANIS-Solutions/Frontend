import HowWorkComponent from "@/app/components/how-work/HowWorkComponent";
import { FeatureData } from "@/app/data/Features/FeaturesData";

function FeaturesSection() {
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {FeatureData.map((card, index) => (
          <HowWorkComponent
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            items={card.items}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
