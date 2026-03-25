import { FeatureComponentsProps } from "@/app/types/feature";

function FeaturesComponent({
  title,
  description,
  icon,
  items,
}: FeatureComponentsProps) {
  return (
    <div className="bg-[#FAFBFC] rounded-2xl p-6 md:p-8 border border-[#E5E7EB] hover:shadow-md transition-all duration-300">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E8F4F7] text-[#4FA3B5] mb-5">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-[#2F3E4E] mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
        {description}
      </p>

      {/* Items List */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-[#6B7280]"
          >
            <span className="text-[#E07A38]">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default FeaturesComponent;
