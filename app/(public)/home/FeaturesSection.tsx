import FeatureComponent from "@/app/components/home/FeatureComponent";
import { FeatureData } from "@/app/data/Home/FeatureData";
import Link from "next/link";

function FeaturesSection() {
  return (
    <section className="py-5 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2F3E4E] mb-4">
            Everything you need to guide with care
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            ANIS provides powerful tools wrapped in a warm, supportive
            experience
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FeatureData.map((card, index) => (
            <FeatureComponent
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        {/* Explore Link */}
        <div className="text-center mt-10">
          <Link
            href="/features"
            className="inline-flex items-center gap-1 text-[#1E73BE] font-medium hover:underline transition-all "
          >
            Explore all features →{/* <span className="text-lg">→</span> */}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
