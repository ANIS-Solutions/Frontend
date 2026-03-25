import FaqComponent from "@/app/components/faq/FaqComponent";
import {
  GettingStartedData,
  Safety_Privacy,
  Features_Usages,
} from "@/app/data/FAQ/FaqData";

function FAQSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <FaqComponent header="Getting Started" data={GettingStartedData} />
        <FaqComponent header="Safety & Privacy" data={Safety_Privacy} />
        <FaqComponent header="Features & Usage" data={Features_Usages} />
      </div>
    </section>
  );
}

export default FAQSection;
