import { HelpCircle } from "lucide-react";

function HeroSection() {
  return (
    <section className="w-full py-8 md:py-20 px-6 bg-gradient-to-b from-[#F0F7FA] to-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#E8F4F7] flex items-center justify-center">
            <HelpCircle className="w-7 h-7 text-[#4FA3B5]" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2F3E4E] leading-tight">
          Frequently Asked Questions
        </h1>

        <p className="mt-5 text-base md:text-lg text-[#6B7280] leading-relaxed">
          Find answers to common questions about ANIS. Can&apos;t find what
          you&apos;re looking for? Contact our support team.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;