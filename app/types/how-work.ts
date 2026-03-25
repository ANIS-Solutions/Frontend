import { ReactNode } from "react";

export interface HowWorkComponentsProps {
  icon: ReactNode;
  title: string;
  description: string;
  items: string[];
  count?: string;
}
