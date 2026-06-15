import { ApiResponse } from "./auth.types";

export type StrictnessLevel = "NORMAL" | "RISK" | "HIGH_RISK";
export type PromptAction = "BLUR" | "BLOCK" | "SKIP";

export interface Prompt {
  id: string;
  childId: string;
  title: string;
  key: string;
  LevelOfStrictness: StrictnessLevel;
  threat: boolean;
  action: PromptAction;
  description: string;
}

export interface AddPromptPayload {
  title: string;
  key: string;
  description: string;
  LevelOfStrictness: StrictnessLevel;
  threat: boolean;
  action: PromptAction;
}

export interface UpdatePromptPayload {
  title?: string;
  key?: string;
  description?: string;
  LevelOfStrictness?: StrictnessLevel;
  threat?: boolean;
  action?: PromptAction;
}

export interface PromptsData {
  prompts: Prompt[];
}

export type GetPromptsResponse = ApiResponse<PromptsData>;
export type GetPromptResponse = ApiResponse<Prompt>;
export type AddPromptResponse = ApiResponse<Prompt>;
export type UpdatePromptResponse = ApiResponse<Prompt>;
export type DeletePromptResponse = ApiResponse;

