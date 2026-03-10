import { ResourceItem } from "@/app/types/faq";
import Link from "next/link";

function ResourceCard({ title, description, link }: ResourceItem) {
  return (
    <div className="border border-gray-200 rounded-2xl p-8 text-center hover:shadow-md transition bg-white">
      
      <h3 className="text-lg font-semibold text-slate-700 mb-4">
        {title}
      </h3>

      <p className="text-gray-500 mb-6">
        {description}
      </p>

      <Link
        href={link}
        className="text-sky-600 font-medium hover:underline"
      >
        Learn more →
      </Link>

    </div>
  );
}

export default ResourceCard;