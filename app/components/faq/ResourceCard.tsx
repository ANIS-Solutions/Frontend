// import { ResourceItem } from "@/app/types/faq";
// import Link from "next/link";

// function ResourceCard({ title, description, link }: ResourceItem) {
//   return (
//     <div className="border border-gray-200 rounded-2xl p-8 text-center hover:shadow-md transition bg-white">
//       <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>

//       <p className="text-gray-500 mb-6">{description}</p>

//       <Link href={link} className="text-sky-600 font-medium hover:underline">
//         Learn more →
//       </Link>
//     </div>
//   );
// }

// export default ResourceCard;
import { ResourceItem } from "@/app/types/faq";
import Link from "next/link";

function ResourceCard({ title, description, link }: ResourceItem) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center hover:shadow-md hover:border-[#D1D5DB] transition-all duration-300">
      <h3 className="text-base font-semibold text-[#2F3E4E] mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
        {description}
      </p>

      <Link
        href={`/${link}`}
        className="inline-flex items-center gap-1 text-sm text-[#E07A38] font-medium hover:underline"
      >
        Learn more
        <span>→</span>
      </Link>
    </div>
  );
}

export default ResourceCard;