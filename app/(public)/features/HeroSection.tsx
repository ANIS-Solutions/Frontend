import React from "react";

function HeroSection() {
  return (
    <section
      className="w-full py-20 px-6 text-center bg-[#EFF1F0] mb-4"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Powerful features for caring parents{" "}
        </h2>

        <p className="text-lg leading-relaxed text-gray-500">
          Everything you need to guide your child toward healthy digital habits,
          wrapped in a warm and supportive experience.{" "}
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
