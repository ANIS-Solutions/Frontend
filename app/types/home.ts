import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface FeatureComponentsProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface BenefitsComponentsProps {
  img: StaticImageData;
  title: string;
  description: string;
  link: string;
  textLink: string;
  reverse?: boolean;
}

export interface StateSection {
  icon: ReactNode;
  num: string;
  desc: string;
}
