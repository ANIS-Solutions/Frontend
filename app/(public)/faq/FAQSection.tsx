import FaqComponent from "@/app/components/faq/FaqComponent";
import { GettingStartedData ,Safety_Privacy,Features_Usages} from "@/app/data/FAQ/FaqData";

export default function FAQPage() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 space-y-16">
        <FaqComponent header="Getting Started" data={GettingStartedData} />
      </div>
      <div className="max-w-4xl mx-auto px-4 space-y-16 mt-15">
        <FaqComponent header="Safety & Privacy" data={Safety_Privacy} />
      </div>
       <div className="max-w-4xl mx-auto px-4 space-y-16 mt-15">
        <FaqComponent header="Safety & Privacy" data={Features_Usages} />
      </div>
    </section>
  );
}