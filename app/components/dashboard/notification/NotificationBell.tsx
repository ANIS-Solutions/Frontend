"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Trash2, X } from "lucide-react";
import { useNotifications } from "@/app/hooks/notifications/useNotifications";
import { useDeleteNotification } from "@/app/hooks/notifications/useDeleteNotification";
import { useClearNotifications } from "@/app/hooks/notifications/useClearNotifications";
import { Notification } from "@/app/types/api/notification.types";

const typeIcons: Record<string, { icon: string; bg: string; color: string }> = {
  NEW_CHILD: { icon: "📱", bg: "#E6F1FB", color: "#1E73BE" },
  APP_LIMIT: { icon: "🛡️", bg: "#EAF3DE", color: "#3B6D11" },
  LOCATION: { icon: "📍", bg: "#FCEBEB", color: "#A32D2D" },
  QUEST: { icon: "🏆", bg: "#FEF3C7", color: "#854F0B" },
  DEFAULT: { icon: "🔔", bg: "#f3f4f6", color: "#6b7280" },
};

function getTypeConfig(type: string) {
  return typeIcons[type] ?? typeIcons.DEFAULT;
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${Math.floor(hours / 24)} day${Math.floor(hours / 24) > 1 ? "s" : ""} ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Notification | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { notifications, unreadCount, refetch } = useNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: clearAll, isLoading: clearLoading } = useClearNotifications();

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const prevNotificationsRef = useRef<string>("");

  useEffect(() => {
    const latest = notifications.find((n) => !n.isRead);
    if (!latest) return;

    if (prevNotificationsRef.current === latest._id) return;
    prevNotificationsRef.current = latest._id;

    const showTimer = setTimeout(() => {
      setToast(latest);
      const hideTimer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(hideTimer);
    }, 0);

    return () => clearTimeout(showTimer);
  }, [notifications]);

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    refetch();
  };

  const handleClearAll = async () => {
    await clearAll();
    refetch();
  };

  return (
    <>
      {/* Bell Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => {
            setOpen(!open);
            if (!open) refetch();
          }}
          className="relative p-2 rounded-xl transition-all"
          style={{
            border: "0.5px solid #e5e7eb",
            background: "white",
            cursor: "pointer",
          }}
        >
          <Bell size={18} style={{ color: "#6b7280" }} />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white flex items-center justify-center"
              style={{ background: "#F72B35", fontSize: 10, fontWeight: 700 }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 top-full mt-2 bg-white rounded-2xl z-50"
            style={{
              width: 360,
              border: "0.5px solid #e5e7eb",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "0.5px solid #f3f4f6" }}
            >
              <p className="text-sm font-semibold text-gray-800">
                Notifications
              </p>
              <div className="flex items-center gap-3">
                {/* <button
                  className="text-xs font-medium"
                  style={{
                    color: "#1E73BE",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Mark all as read
                </button> */}
                <button
                  onClick={handleClearAll}
                  disabled={clearLoading}
                  className="flex items-center gap-1 text-xs font-medium"
                  style={{
                    color: "#A32D2D",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={12} />
                  Clear all
                </button>
              </div>
            </div>

            {/* List */}
            <div style={{ maxHeight: 360, overflowY: "auto" }}>
              {notifications.length === 0 ? (
                <div className="text-center py-10">
                  <Bell
                    size={28}
                    className="mx-auto mb-2"
                    style={{ color: "#d1d5db" }}
                  />
                  <p className="text-sm text-gray-400">No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const config = getTypeConfig(n.type);
                  return (
                    <div
                      key={n._id}
                      className="flex items-start gap-3 px-4 py-3 transition-all"
                      style={{
                        borderBottom: "0.5px solid #f3f4f6",
                        background: n.isRead ? "transparent" : "#FAFBFF",
                      }}
                    >
                      {/* Unread dot */}
                      <div className="shrink-0 mt-1">
                        {!n.isRead && (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#1E73BE" }}
                          />
                        )}
                        {n.isRead && <div className="w-2 h-2" />}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
                        style={{ background: config.bg }}
                      >
                        {config.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 mb-0.5">
                          {n.title}
                        </p>
                        <p className="text-xs text-gray-500 mb-0.5">{n.body}</p>
                        <p className="text-xs" style={{ color: "#9ca3af" }}>
                          {timeAgo(n.createdAt)}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(n._id)}
                        className="p-1 rounded-lg shrink-0 opacity-0 hover:opacity-100 transition-all"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0.3")
                        }
                      >
                        <Trash2 size={13} style={{ color: "#9ca3af" }} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div
                className="px-4 py-3 text-center"
                style={{ borderTop: "0.5px solid #f3f4f6" }}
              >
                <button
                  className="text-xs font-medium"
                  style={{
                    color: "#1E73BE",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-9999 flex items-center gap-3 bg-white rounded-2xl p-4 transition-all"
          style={{
            border: "0.5px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            maxWidth: 320,
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
            style={{ background: getTypeConfig(toast.type).bg }}
          >
            {getTypeConfig(toast.type).icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800">{toast.title}</p>
            <p className="text-xs text-gray-500 truncate">{toast.body}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <X size={14} style={{ color: "#9ca3af" }} />
          </button>
        </div>
      )}
    </>
  );
}
