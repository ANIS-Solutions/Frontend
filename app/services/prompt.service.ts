import axiosInstance from "../lib/api/auth.api";
import {
  AddPromptPayload,
  AddPromptResponse,
  DeletePromptResponse,
  GetPromptResponse,
  GetPromptsResponse,
  UpdatePromptResponse,
  UpdatePromptPayload,
} from "../types/api/prompt.types";

export const promptService = {
  // /children/{childId}/service/prompt
  addPrompt(childId: string, data: AddPromptPayload) {
    return axiosInstance.post<AddPromptResponse>(
      `/children/${childId}/service/prompt`,
      data,
    );
  },

  //   /children/{childId}/service/prompt/{promptId}
  getPrompt(childId: string, promptId: string) {
    return axiosInstance.get<GetPromptResponse>(
      `/children/${childId}/service/prompt/${promptId}`,
    );
  },

  //   /children/{childId}/service/prompt
  getPrompts(childId: string) {
    return axiosInstance.get<GetPromptsResponse>(
      `/children/${childId}/service/prompt`,
    );
  },

  //   /children/{childId}/service/prompt/{promptId}
  updatePrompt(childId: string, promptId: string, data: UpdatePromptPayload) {
    return axiosInstance.patch<UpdatePromptResponse>(
      `/children/${childId}/service/prompt/${promptId}`,
      data,
    );
  },

  //   /children/{childId}/service/prompt/{promptId}
  deletePrompt(childId: string, promptId: string) {
    return axiosInstance.delete<DeletePromptResponse>(
      `/children/${childId}/service/prompt/${promptId}`,
    );
  },
};
