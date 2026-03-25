import HowWorkComponent from "@/app/components/how-work/HowWorkComponent";
import { HowWorkData } from "@/app/data/HowWork/HowWork";

function HowWorkSection() {
  return (
     <section className="py-4 md:py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {HowWorkData.map((card, index) => (
          <HowWorkComponent
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            items={card.items}
            count={card.count}
          />
        ))}
      </div>
    </section>
  );
}

export default HowWorkSection;
