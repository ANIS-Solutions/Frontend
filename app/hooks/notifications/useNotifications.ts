"use client";
import { useState, useEffect, useCallback } from "react";
import { onMessage } from "firebase/messaging";
import { getMessagingInstance } from "@/app/lib/firebase";
import { notificationService } from "../../services/notification.service";
import { Notification } from "../../types/api/notification.types";
import axios from "axios";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setError(null);
    try {
      const res = await notificationService.getNotifications();
      setNotifications(res.data.data?.notifications || []);
      setUnreadCount(res.data.data?.unreadCount || 0);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();

    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    // 1. Foreground FCM listener — fires when a push arrives while the tab is focused.
    (async () => {
      const messaging = await getMessagingInstance();
      if (cancelled || !messaging) return;
      unsubscribe = onMessage(messaging, () => {
        fetch();
      });
    })();

    // 2. Background bridge — service worker posts FCM_NOTIFICATION to open tabs.
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === "FCM_NOTIFICATION") {
        fetch();
      }
    };
    navigator.serviceWorker?.addEventListener("message", handleSWMessage);

    // 3. Polling fallback — catches anything the push channels miss.
    const interval = setInterval(fetch, 60000);

    return () => {
      cancelled = true;
      unsubscribe?.();
      navigator.serviceWorker?.removeEventListener("message", handleSWMessage);
      clearInterval(interval);
    };
  }, [fetch]);

  return { notifications, unreadCount, isLoading, error, refetch: fetch };
}
