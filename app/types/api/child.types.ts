export type Gender = "MALE" | "FEMALE";

export interface Child {
  _id: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  hobbies: string[];
  dob: string;
}

export interface AddChildPayload {
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  hobbies: string[];
  dob: string;
}

export interface updateChildPayload {
  firstName?: string;
  lastName?: string;
  gender: "MALE" | "FEMALE";
  hobbies: string[];
  dob: string;
}

export interface AddChildResponse {
  data: Child;
  qrcode: string;
  pairToken: string;
}

