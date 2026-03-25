import { challengesData } from "@/app/data/For-Parents/challengesData";
import { CircleAlert} from "lucide-react";

function ChallengesSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2F3E4E] mb-3">
            Do these challenges sound familiar?
          </h2>
          <p className="text-[#6B7280]">
            You&apos;re not the only one facing these daily struggles
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challengesData.map((challenge, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#FECACA] transition-all duration-300"
            >
              {/* X Icon */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <CircleAlert className="w-4 h-4 text-[#EF4444]" strokeWidth={2.5} />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-sm font-semibold text-[#2F3E4E] mb-1">
                  {challenge.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChallengesSection;