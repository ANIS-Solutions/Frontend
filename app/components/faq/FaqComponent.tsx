import CollapsibleItem from "./CollapsibleItem";
import { FaqComponentProps } from "@/app/types/faq";



function FaqComponent({ header, data }: FaqComponentProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">{header}</h2>

      <div className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {data.map((item, index) => (
          <CollapsibleItem
            key={index}
            title={item.question}
            description={item.answer}
          />
        ))}
      </div>
    </div>
  );
}

export default FaqComponent;