import { FeatureComponentsProps } from "@/app/types/home";

function FeatureComponent({
  icon,
  title,
  description,
}: FeatureComponentsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#EEF6F8] text-[#4FA3B5] mb-5">
        {icon}
      </div>

      {/* Title */}
       <h3 className="text-lg font-semibold text-[#1F2A37] mb-3">{title}</h3>

      {/* Description */}
      <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureComponent;
