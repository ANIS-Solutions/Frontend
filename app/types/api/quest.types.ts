import { ApiResponse } from "./auth.types";

export type QuestStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED"
  | "PENDING";

export type QuestType =
  | "Education"
  | "Health"
  | "Home"
  | "Music"
  | "Sports"
  | "Other";

export interface Quest {
  id: string;
  childId: string;
  title: string;
  type: QuestType;
  status: QuestStatus;
  description: string;
  deadline: string;
  points: number;
}


/*
{
    "success": true,
    "status": "success",
    "message": "Quest is created successfully!",
    "data": {
        "id": "6a0df7300334b6842f1caf47",
        "childId": "6a076131dee685848cb4f555",
        "title": "ana quest title",
        "type": "Education",
        "status": "NOT_STARTED",
        "description": "ana desc. ll quest dah",
        "deadline": "2026-05-20T18:02:22.402Z",
        "points": 42
    }
}
*/
export interface AddQuestPayload {
  title: string;
  description: string;
  type: QuestType;
  points: number;
  status: QuestStatus;
  deadline: string;
}

export interface UpdateQuestPayload {
  title?: string;
  description?: string;
  type?: QuestType;
  points?: number;
  // stats?: QuestStatus;
  deadline?: string;
}

export interface QuestsData {
  quests: Quest[];
}

export type GetQuestsResponse = ApiResponse<Quest[]>;
export type GetQuestResponse = ApiResponse<Quest>;
export type AddQuestResponse = ApiResponse<Quest>;
export type UpdateQuestResponse = ApiResponse<Quest>;
export type QuestActionResponse = ApiResponse;

//update
/*
{
    "title": "ana not quest title",
    "description": "ana desc. ll quest dah",
    "type": "Education",
    "points": 16,
    "stats": "NOT_STARTED",
    "deadline": "{{$date.isoTimestamp}}"
}
*/
//Add
/*
{
    "title": "ana quest title",
    "description": "ana desc. ll quest dah",
    "type": "Education",
    "points": 42,
    "stats": "NOT_STARTED",
    "deadline": "{{$date.isoTimestamp}}"
}
*/

/*
{
    "success": true,
    "status": "success",
    "message": "Quest is created successfully!",
    "data": {
        "id": "6a076538dee685848cb4f55a",
        "childId": "6a076131dee685848cb4f555",
        "title": "ana quest title",
        "type": "Education",
        "status": "NOT_STARTED",
        "description": "ana desc. ll quest dah",
        "deadline": "2026-05-15T18:25:59.934Z",
        "points": 42
    }
}
*/
