import { FeatureComponentsProps } from "@/app/types/feature";
import { ArrowRight } from "lucide-react";

function HowWorkComponent({
  title,
  description,
  icon,
  items,
  count,
}: FeatureComponentsProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
      <div className="flex gap-6 items-start">
       
        <div className="relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-400 text-white text-sm font-semibold flex items-center justify-center shadow">
            {count}
          </div>

          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E8F4F7] text-[#4FA3B5] text-2xl">
            {icon}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-[#1F2A37] mb-3">
            {title}
          </h3>

          <p className="text-[#6B7280] leading-relaxed mb-6">
            {description}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-12">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-[#6B7280]"
              >
                <ArrowRight className="w-4 h-4 text-teal-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowWorkComponent;