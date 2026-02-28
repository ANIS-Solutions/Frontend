import FeatureComponent from "@/app/components/home/FeatureComponent";
import { FeatureData } from "@/app/data/Home/FeatureData";

function FeaturesSection() {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col justify-center items-center mb-12 min-h-[200px] ">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold leading-tight text-[#2F3E4E]">
          Everything you need to guide with care
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 text-center max-w-2xl">
          ANIS provides powerful tools wrapped in a warm, supportive experience
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FeatureData.map((card, index) => (
          <FeatureComponent
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
