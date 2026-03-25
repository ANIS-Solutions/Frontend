import FeaturesComponent from "@/app/components/features/FeaturesComponent";
import { FeatureData } from "@/app/data/Features/FeaturesData";

function FeaturesSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FeatureData.map((card, index) => (
            <FeaturesComponent
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              items={card.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
