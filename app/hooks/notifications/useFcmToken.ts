"use client";

import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { getMessagingInstance } from "@/app/lib/firebase";
import { env } from "@/app/config/env";
import { registerFcmToken } from "@/app/services/fcm.service";

export function useFcmToken(enabled: boolean) {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined" || !("Notification" in window)) return;

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      const perm = await Notification.requestPermission();
      if (cancelled) return;
      setPermission(perm);
      if (perm !== "granted") return;

      const messaging = await getMessagingInstance();
      if (cancelled || !messaging) return;

      const swReg = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );

      const fcmToken = await getToken(messaging, {
        vapidKey: env.firebase.vapidKey,
        serviceWorkerRegistration: swReg,
      });

      // console.log(fcmToken);

      if (cancelled || !fcmToken) return;

      setToken(fcmToken);
      await registerFcmToken(fcmToken);

      // unsubscribe = onMessage(messaging, (payload) => {
      //   console.log("Foreground notification:", payload);
      // });
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [enabled]);

  return { token, permission };
}
