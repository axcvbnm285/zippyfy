import { notifications } from "@/mock/notifications";
import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

export default function NotificationList() {
  if (notifications.length === 0) return <EmptyNotifications />;

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-3">
      {unread > 0 && (
        <p className="text-xs font-semibold text-slate-500">{unread} unread notification{unread > 1 ? "s" : ""}</p>
      )}
      {notifications.map((n) => (
        <NotificationCard key={n.id} n={n} />
      ))}
    </div>
  );
}
