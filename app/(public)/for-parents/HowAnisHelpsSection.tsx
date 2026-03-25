import { helpData } from "@/app/data/For-Parents/helpData";

function HowAnisHelpsSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2F3E4E] mb-3">
            How ANIS helps your family thrive
          </h2>
          <p className="text-[#6B7280]">
            More than just monitoring—it&apos;s about building better habits
            together
          </p>
        </div>

        {/* Help Cards */}
        <div className="space-y-4">
          {helpData.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl hover:shadow-sm transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#E8F4F7] flex items-center justify-center text-[#4FA3B5]">
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-semibold text-[#2F3E4E] mb-1">
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

export default HowAnisHelpsSection;
