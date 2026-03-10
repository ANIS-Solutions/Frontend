import ResourceCard from "@/app/components/faq/ResourceCard";
import { resourcesData } from "@/app/data/FAQ/resourcesData";

function HelpfulResources() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-semibold text-center text-slate-800 mb-12">
          Helpful resources
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resourcesData.map((item, index) => (
            <ResourceCard key={index} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HelpfulResources;