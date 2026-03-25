import StateComponent from "@/app/components/home/StateComponent";
import { ratingCards } from "@/app/data/Home/StateSection";

function StatsSection() {
  return (
  <section className="py-16 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {ratingCards.map((card, index) => (
            <StateComponent
              key={index}
              icon={card.icon}
              num={card.title}
              desc={card.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
