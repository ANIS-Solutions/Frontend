const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import {
  AddChildPayload,
  AddChildResponse,
  Child,
  updateChildPayload,
} from "../types/api/child.types";

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getMyChildren(): Promise<Child[]> {
  const res = await fetch(`${BASE_URL}/children/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch children: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function getChild(childId: string): Promise<Child> {
  const res = await fetch(`${BASE_URL}/children/${childId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to fetch child: ${res.status}`);
  return res.json();
}

export async function addChild(payload: AddChildPayload): Promise<Child> {
  const res = await fetch(`${BASE_URL}/children/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to add child: ${res.status}`);
  const json = await res.json();
  return json.data;
}

// export async function addChild(
//   payload: AddChildPayload,
// ): Promise<AddChildResponse> {
//   const res = await fetch(`${BASE_URL}/children/`, {
//     method: "POST",
//     headers: getAuthHeaders(),
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) throw new Error(`Failed to add child: ${res.status}`);
//   const json = await res.json();
//   return {
//     data: json.data,
//     qrcode: json.qrcode,
//     pairToken: json.devInfo?.pairToken,
//   };
// }

export async function updateChild(
  childId: string,
  payload: updateChildPayload,
): Promise<Child> {
  const res = await fetch(`${BASE_URL}/children/${childId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update child: ${res.status}`);
  return res.json();
}
