import { FeatureComponentsProps } from "@/app/types/feature";
import React from "react";
function FeaturesComponent({
  title,
  description,
  icon,
  items,
}: FeatureComponentsProps) {
  return (
    <div
      className="
  bg-white 
  rounded-2xl 
  p-8 
  shadow-md 
  transition-all 
  duration-300 
  hover:shadow-xl 
  hover:-translate-y-1
"
    >
      {/* Icon */}
      <div
        className="
    w-14 h-14 
    flex items-center justify-center 
    rounded-xl 
    bg-[#EEF6F8] 
    text-[#4FA3B5] 
    text-2xl 
    mb-6
  "
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[#1F2A37] mb-4">{title}</h3>

      {/* Description */}
      <p className="text-[#6B7280] leading-relaxed">{description}</p>
    </div>
  );
}
export default FeaturesComponent;
