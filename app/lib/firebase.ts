import { initializeApp, getApps, FirebaseApp, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  Messaging,
  isSupported,
} from "firebase/messaging";
import { env } from "@/app/config/env";

const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
  measurementId: env.firebase.measurementId,
};

export const firebaseApp: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export async function getMessagingInstance(): Promise<Messaging | null> {
  if (typeof window === "undefined") return null;
  if (!(await isSupported())) return null;
  return getMessaging(firebaseApp);
}
