import Image from "next/image";
import Link from "next/link";
import { BenefitsComponentsProps } from "@/app/types/home";

function BenefitsComponent({
  title,
  description,
  img,
  link,
  reverse,
  textLink,
}: BenefitsComponentsProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div
        className={`flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-10 md:gap-16`}
      >
        <div className="flex-1">
          <Image
            src={img}
            alt={title}
            className="rounded-3xl shadow-md object-cover w-full h-auto max-h-[350px]"
            width={500}
            height={500}
          />
        </div>

        <div className="flex-1 space-y-5 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800">
            {title}
          </h2>

          <p className="text-slate-600 leading-relaxed">{description}</p>

          <Link
            href={link}
            className="inline-block text-[#1E73BE] font-medium hover:underline"
          >
            {textLink}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BenefitsComponent;
