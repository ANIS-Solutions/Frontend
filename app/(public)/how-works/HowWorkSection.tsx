import HowWorkComponent from "@/app/components/how-work/HowWorkComponent";
import { HowWorkData } from "@/app/data/HowWork/HowWork";
import React from "react";

function HowWorkSection() {
  return (
    <section className="py-10">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl space-y-12 mx-auto px-4">
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
      </div>
    </section>
  );
}

export default HowWorkSection;
