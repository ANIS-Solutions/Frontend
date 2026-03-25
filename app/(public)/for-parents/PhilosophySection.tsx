import { philosophyData } from "@/app/data/For-Parents/philosophyData";

function PhilosophySection() {
  return (
    <section className="py-12 md:py-16 px-4 bg-[#F9FAFB]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2F3E4E] mb-3">
            Our parenting philosophy
          </h2>
          <p className="text-[#6B7280]">
            The values that guide how ANIS supports your family
          </p>
        </div>

        {/* Philosophy Items */}
        <div className="space-y-6">
          {philosophyData.map((item, index) => (
            <div key={index} className="flex gap-4">
              {/* Number Badge */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E07A38] flex items-center justify-center text-white text-sm font-semibold">
                {item.number}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-semibold text-[#2F3E4E] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;