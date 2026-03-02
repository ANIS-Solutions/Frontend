import { Play } from "lucide-react";
function VideoDemoSection() {
  return (
    <div>
      <section className="py-10 ">
        <div className="container mx-auto px-4 w-full max-w-4xl ">
          {/* Title Section */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
              See ANIS in action
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Watch a quick 2-minute video to see how easy it is to set up and
              use ANIS
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
            <div className="relative bg-gray-100 rounded-2xl h-97.5 flex items-center justify-center">
              {/* Play Button */}
              <div className="w-20 h-20 rounded-full bg-orange-200 flex items-center justify-center cursor-pointer hover:scale-105 transition">
                <Play className="text-orange-500 w-8 h-8 ml-1" />
              </div>

              <p className="absolute bottom-10 text-slate-500">
                Demo video coming soon
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VideoDemoSection;
