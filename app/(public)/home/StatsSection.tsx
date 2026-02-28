import StateComponent from "@/app/components/home/StateComponent";
import { ratingCards } from "@/app/data/Home/StateSection";
import React from "react";

function StatsSection() {
  return (
    <section className="py-12 mt-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 justify-items-center">
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
