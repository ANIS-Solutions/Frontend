import { StateSection } from "@/app/types/home";

function StateComponent({ icon, num, desc }: StateSection) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className=" flex gap-4">
        {/* Icon */}
        <div className="text-[#1E73BE] text-3xl">{icon}</div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[#2F3E4E]">{num}</h3>
      </div>
      {/* Text */}
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}

export default StateComponent;
