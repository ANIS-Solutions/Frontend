import { CommonQuestionProps } from "@/app/types/faq";

function CommonQuestionComponent({ title, description }: CommonQuestionProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 transition hover:border-[#2692CF]/40">
      <h3 className="text-lg font-bold text-slate-700 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default CommonQuestionComponent;
