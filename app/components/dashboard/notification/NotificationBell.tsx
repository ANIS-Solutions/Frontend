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

// ✅ برا الـ component خالص
function NotificationList({
  notifications,
  onDelete,
  onClearAll,
  onClose,
  clearLoading,
}: {
  notifications: Notification[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
  clearLoading: boolean;
}) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Notifications</p>
        <div className="flex items-center gap-3">
          <button
            onClick={onClearAll}
            disabled={clearLoading}
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: "#A32D2D", background: "none", border: "none", cursor: "pointer" }}
          >
            <Trash2 size={12} />
            Clear all
          </button>
          <button onClick={onClose} className="md:hidden p-1 rounded-lg text-gray-400">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="overflow-y-auto" style={{ maxHeight: 360 }}>
        {notifications.length === 0 ? (
          <div className="text-center py-10">
            <Bell size={28} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p className="text-sm text-gray-400 dark:text-gray-500">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => {
            const config = getTypeConfig(n.type);
            return (
              <div
                key={n._id}
                className={`flex items-start gap-3 px-4 py-3 transition-all border-b-[0.5px] border-gray-100 dark:border-gray-700 ${
                  n.isRead ? "" : "bg-[#FAFBFF] dark:bg-gray-700/40"
                }`}
              >
                <div className="shrink-0 mt-1">
                  {!n.isRead
                    ? <div className="w-2 h-2 rounded-full" style={{ background: "#1E73BE" }} />
                    : <div className="w-2 h-2" />
                  }
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base" style={{ background: config.bg }}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 mb-0.5">{n.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{n.body}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{timeAgo(n.createdAt)}</p>
                </div>
                <button
                  onClick={() => onDelete(n._id)}
                  className="p-1 rounded-lg shrink-0"
                  style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
                >
                  <Trash2 size={13} className="text-gray-400 dark:text-gray-500" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 text-center border-t-[0.5px] border-gray-100 dark:border-gray-700">
         
        </div>
      )}
    </>
  );
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Notification | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { notifications, unreadCount, refetch } = useNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: clearAll, isLoading: clearLoading } = useClearNotifications();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

  const listProps = {
    notifications,
    onDelete: handleDelete,
    onClearAll: handleClearAll,
    onClose: () => setOpen(false),
    clearLoading,
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Bell Button */}
        <button
          onClick={() => { setOpen(!open); if (!open) refetch(); }}
          className="relative p-2 rounded-xl transition-all border-[0.5px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <Bell size={18} className="text-gray-500 dark:text-gray-400" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white flex items-center justify-center"
              style={{ background: "#F72B35", fontSize: 10, fontWeight: 700 }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Desktop dropdown */}
        {open && (
          <div
            className="hidden md:block absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-2xl z-50 border-[0.5px] border-gray-200 dark:border-gray-700"
            style={{ width: 360, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
          >
            <NotificationList {...listProps} />
          </div>
        )}
      </div>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div
            className="relative bg-white dark:bg-gray-800 rounded-t-2xl border-t border-gray-200 dark:border-gray-700"
            style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.1)" }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-gray-600" />
            </div>
            <NotificationList {...listProps} />
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-4 left-4 md:left-auto md:right-6 md:max-w-xs z-[9999] flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl p-4 border-[0.5px] border-gray-200 dark:border-gray-700"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0" style={{ background: getTypeConfig(toast.type).bg }}>
            {getTypeConfig(toast.type).icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">{toast.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{toast.body}</p>
          </div>
          <button onClick={() => setToast(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <X size={14} className="text-gray-400 dark:text-gray-500" />
          </button>
        </div>
      )}
    </>
  );
}