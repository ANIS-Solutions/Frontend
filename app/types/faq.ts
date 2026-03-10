export interface FaqItem {
  question: string;
  answer: string;
}

export interface CommonQuestionProps {
  title: string;
  description: string;
}

export interface FaqComponentProps {
  header: string;
  data: FaqItem[];
}

export interface ResourceItem {
  title: string;
  description: string;
  link: string;
}