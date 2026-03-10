import React from "react";

function HeroSection() {
  return (
    <section className="w-full pt-20 px-6 text-center mb-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Frequently Asked Questions
        </h2>

        <p className="text-lg leading-relaxed text-gray-500">
          Find answers to common questions about ANIS. Can&rsquo;t find what
          you&rsquo;re looking for? Contact our support team.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
