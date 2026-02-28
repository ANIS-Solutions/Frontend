import React from "react";
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
    <div className="max-w-6xl mx-auto px-6 sm:py-6">
      <div
        className={`flex flex-col md:flex-row items-center gap-8 sm:gap-12 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="flex-1">
          <Image
            src={img}
            alt={title}
            className="rounded-2xl shadow-lg"
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
            className="inline-block text-teal-600 font-medium hover:underline"
          >
            {textLink}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BenefitsComponent;
