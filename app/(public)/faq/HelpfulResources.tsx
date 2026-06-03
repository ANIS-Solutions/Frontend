import ResourceCard from "@/app/components/faq/ResourceCard";
import { resourcesData } from "@/app/data/FAQ/resourcesData";

function HelpfulResources() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#2F3E4E] mb-10">
          Helpful resources
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resourcesData.map((item, index) => (
            <ResourceCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HelpfulResources;