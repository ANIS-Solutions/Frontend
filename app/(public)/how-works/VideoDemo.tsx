import { Play } from "lucide-react";

function VideoDemoSection() {
  return (
    <section className="py-12 md:py-16 bg-[#F9FAFB]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2F3E4E] mb-3">
            See ANIS in action
          </h2>
          <p className="text-[#6B7280]">
            Watch a quick 2-minute video to see how easy it is to set up and use ANIS
          </p>
        </div>

        {/* Video Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4 md:p-6">
          <div className="relative bg-[#F3F4F6] rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-[#E5E7EB] transition-colors">
            {/* Play Button */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FDEEE4] flex items-center justify-center mb-4 hover:scale-105 transition-transform">
              <Play className="text-[#E07A38] w-6 h-6 md:w-8 md:h-8 ml-1" fill="#E07A38" />
            </div>

            <p className="text-[#9CA3AF] text-sm">Demo video coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoDemoSection;