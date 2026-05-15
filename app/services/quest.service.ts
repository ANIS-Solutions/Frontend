import axiosInstance from "../lib/api/auth.api";
import {
  AddQuestPayload,
  UpdateQuestPayload,
  GetQuestsResponse,
  GetQuestResponse,
  AddQuestResponse,
  UpdateQuestResponse,
  QuestActionResponse,
} from "../types/api/quest.types";

export const questService = {
  // /children/{childId}/quests
  getQuests(childId: string) {
    return axiosInstance.get<GetQuestsResponse>(`/children/${childId}/quests`);
  },

  // /children/{childId}/quests/{questId}
  getQuest(childId: string, questId: string) {
    return axiosInstance.get<GetQuestResponse>(
      `/children/${childId}/quests/${questId}`,
    );
  },

  // /children/{childId}/quests/
  addQuest(childId: string, data: AddQuestPayload) {
    return axiosInstance.post<AddQuestResponse>(
      `/children/${childId}/quests/`,
      data,
    );
  },

  // /children/{childId}/quests/{questId}
  updateQuest(childId: string, questId: string, data: UpdateQuestPayload) {
    return axiosInstance.patch<UpdateQuestResponse>(
      `/children/${childId}/quests/${questId}`,
      data,
    );
  },

  // /children/{childId}/quests/{questId}/start
  startQuest(childId: string, questId: string) {
    return axiosInstance.patch<QuestActionResponse>(
      `/children/${childId}/quests/${questId}/start`,
    );
  },

  // /children/{childId}/quests/{questId}/cancel
  cancelQuest(childId: string, questId: string) {
    return axiosInstance.patch<QuestActionResponse>(
      `/children/${childId}/quests/${questId}/cancel`,
    );
  },

  // /children/{childId}/quests/{questId}/complete
  completeQuest(childId: string, questId: string) {
    return axiosInstance.patch<QuestActionResponse>(
      `/children/${childId}/quests/${questId}/complete`,
    );
  },

  // /children/{childId}/quests/{questId}/stop
  stopQuest(childId: string, questId: string) {
    return axiosInstance.patch<QuestActionResponse>(
      `/children/${childId}/quests/${questId}/stop`,
    );
  },
};
