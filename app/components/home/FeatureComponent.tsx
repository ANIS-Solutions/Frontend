import { FeatureComponentsProps } from "@/app/types/home";

function FeatureComponent({
  icon,
  title,
  description,
}: FeatureComponentsProps) {
  return (
    <div className="shadow p-6 flex flex-col items-center text-center rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-[#d0e9f894]">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureComponent;
