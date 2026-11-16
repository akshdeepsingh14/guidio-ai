import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { ArrowRight, Bell, CheckCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getSafeRedirect } from "@/features/auth/auth-redirect";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";

function formatReminderTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function NotificationPopover() {
  const { getToken } = useAuth();

  // Keep the latest getToken in a ref so re-renders never trigger new requests.
  const getTokenRef = useRef(getToken);

  const [open, setOpen] = useState(false);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);
  const [actionError, setActionError] = useState("");
  const [state, setState] = useState({
    status: "loading", // "loading" | "ready" | "error"
    reminders: [],
    unreadCount: 0,
    error: "",
  });

  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const load = useCallback(async (signal) => {
    try {
      const token = await getTokenRef.current();
      const response = await apiRequest("/api/reminders", { token, signal });

      setState({
        status: "ready",
        reminders: response?.data?.reminders ?? [],
        unreadCount: response?.data?.unreadCount ?? 0,
        error: "",
      });
    } catch (error) {
      if (error?.name === "AbortError") return;

      setState((previous) => ({
        ...previous,
        status: "error",
        error: error?.message || "Unable to load notifications.",
      }));
    }
  }, []);

  // Load once when the app shell appears, so the unread badge is correct
  // before the popover is ever opened.
  useEffect(() => {
    const controller = new AbortController();

    load(controller.signal);

    return () => controller.abort();
  }, [load]);

  function handleOpenChange(nextOpen) {
    setOpen(nextOpen);

    if (!nextOpen) return;

    setActionError("");

    // Refresh quietly. Show the loading skeleton only if there is nothing
    // to display yet.
    if (state.status !== "ready") {
      setState((previous) => ({ ...previous, status: "loading", error: "" }));
    }

    load();
  }

  function handleRetry() {
    setState((previous) => ({ ...previous, status: "loading", error: "" }));
    load();
  }

  async function markReminderRead(reminderId) {
    const target = state.reminders.find((reminder) => reminder.id === reminderId);

    if (!target || target.isRead) return;

    try {
      const token = await getTokenRef.current();

      await apiRequest(`/api/reminders/${reminderId}/read`, {
        method: "PATCH",
        token,
      });

      setState((previous) => ({
        ...previous,
        reminders: previous.reminders.map((reminder) =>
          reminder.id === reminderId ? { ...reminder, isRead: true } : reminder
        ),
        unreadCount: Math.max(0, previous.unreadCount - 1),
      }));
    } catch {
      // The reminder simply stays unread. Navigation still works.
    }
  }

  async function markAllRead() {
    if (!state.unreadCount) return;

    try {
      setIsMarkingAllRead(true);
      setActionError("");

      const token = await getTokenRef.current();

      await apiRequest("/api/reminders/read-all", {
        method: "PATCH",
        token,
      });

      setState((previous) => ({
        ...previous,
        reminders: previous.reminders.map((reminder) => ({
          ...reminder,
          isRead: true,
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      setActionError(error?.message || "Unable to mark notifications as read.");
    } finally {
      setIsMarkingAllRead(false);
    }
  }

  function handleReminderClick(reminderId) {
    markReminderRead(reminderId);
    setOpen(false);
  }

  const { status, reminders, unreadCount, error } = state;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={
            unreadCount > 0
              ? `Notifications, ${unreadCount} unread`
              : "Notifications"
          }
          className="relative size-9"
        >
          <Bell aria-hidden="true" />

          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[calc(100vw-2rem)] max-w-md rounded-xl p-0"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold">Notifications</p>
            <p className="text-xs text-muted-foreground">
              Your weekly readiness reminders
            </p>
          </div>

          {unreadCount > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={markAllRead}
              disabled={isMarkingAllRead}
              className="shrink-0"
            >
              {isMarkingAllRead ? (
                <LoaderCircle aria-hidden="true" className="animate-spin" />
              ) : (
                <CheckCheck aria-hidden="true" />
              )}
              Mark all read
            </Button>
          ) : null}
        </div>

        <Separator />

        <div className="max-h-96 overflow-y-auto p-2">
          {actionError ? (
            <p role="alert" className="px-3 py-2 text-xs text-destructive">
              {actionError}
            </p>
          ) : null}

          {status === "loading" ? (
            <div role="status" aria-busy="true" className="space-y-2 p-2">
              <span className="sr-only">Loading notifications…</span>
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : null}

          {status === "error" ? (
            <div role="alert" className="m-2 space-y-3 rounded-lg border p-4">
              <div className="flex items-start gap-2">
                <TriangleAlert
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-destructive"
                />
                <p className="text-sm leading-6 text-muted-foreground">{error}</p>
              </div>

              <Button type="button" variant="outline" size="sm" onClick={handleRetry}>
                Try again
              </Button>
            </div>
          ) : null}

          {status === "ready" && reminders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
              <Bell aria-hidden="true" className="size-8 text-muted-foreground" />
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs leading-5 text-muted-foreground">
                Weekly readiness reminders will appear here once they are sent.
              </p>
            </div>
          ) : null}

          {status === "ready"
            ? reminders.map((reminder) => (
                <Link
                  key={reminder.id}
                  to={getSafeRedirect(reminder.actionHref) ?? "/dashboard"}
                  onClick={() => handleReminderClick(reminder.id)}
                  className={cn(
                    "relative block rounded-lg p-3 transition-colors hover:bg-muted",
                    !reminder.isRead && "bg-muted/60"
                  )}
                >
                  {!reminder.isRead ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 size-2 rounded-full bg-primary"
                    />
                  ) : null}

                  <div className="space-y-1 pr-5">
                    <p className="text-sm font-medium">{reminder.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {reminder.message}
                    </p>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatReminderTime(reminder.createdAt)}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-medium">
                        {reminder.actionLabel || "Open"}
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationPopover;