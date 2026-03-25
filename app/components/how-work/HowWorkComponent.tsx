import { HowWorkComponentsProps } from "@/app/types/how-work";
import { ArrowRight } from "lucide-react";

function HowWorkComponent({
  title,
  description,
  icon,
  items,
  count,
}: HowWorkComponentsProps) {
   return (
    <div className="bg-[#FAFBFC] rounded-2xl p-6 md:p-8 border border-[#E5E7EB] hover:shadow-sm transition-all duration-300">
      <div className="flex gap-5 items-start">
        {/* Icon with Count Badge */}
        <div className="relative flex-shrink-0">
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#E07A38] text-white text-xs font-semibold flex items-center justify-center shadow-sm">
            {count}
          </div>

          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E8F4F7] text-[#4FA3B5]">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-[#2F3E4E] mb-2">
            {title}
          </h3>

          <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Items Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-[#6B7280]"
              >
                <span className="text-[#E07A38] text-xs">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowWorkComponent;