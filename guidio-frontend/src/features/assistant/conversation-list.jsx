import { useState } from "react";
import { MessageSquare, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { groupConversations } from "./assistant-utils";

function ConversationItem({ conversation, isActive, disabled, onSelect, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <li className="flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5">
        <span className="min-w-0 flex-1 truncate text-sm">Delete this chat?</span>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => {
            setConfirming(false);
            onDelete(conversation.id);
          }}
        >
          Delete
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
      </li>
    );
  }

  return (
    <li
      className={cn(
        "group flex items-center rounded-lg transition-colors",
        isActive ? "bg-accent" : "hover:bg-accent/60"
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(conversation.id)}
        disabled={disabled}
        aria-current={isActive ? "true" : undefined}
        className={cn(
          "flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm disabled:opacity-60",
          isActive ? "font-medium text-foreground" : "text-muted-foreground"
        )}
      >
        <MessageSquare aria-hidden="true" className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 truncate">{conversation.title}</span>
      </button>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setConfirming(true)}
        disabled={disabled}
        aria-label={`Delete conversation: ${conversation.title}`}
        className="mr-1 text-muted-foreground hover:text-destructive focus-visible:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
      >
        <Trash2 aria-hidden="true" />
      </Button>
    </li>
  );
}

export function ConversationList({
  conversations,
  status,
  activeId,
  disabled,
  onSelect,
  onDelete,
  onNewChat,
  onRetry,
  onClose,
}) {
  const groups = groupConversations(conversations);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 p-3">
        <Button
          type="button"
          onClick={onNewChat}
          disabled={disabled}
          className="h-9 flex-1 justify-start"
        >
          <Plus aria-hidden="true" />
          New chat
        </Button>

        {onClose ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={onClose}
            aria-label="Close chat history"
          >
            <X aria-hidden="true" />
          </Button>
        ) : null}
      </div>

      <nav
        aria-label="Chat history"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3"
      >
        {status === "loading" ? (
          <div role="status" className="space-y-2">
            <span className="sr-only">Loading chats…</span>
            {[0, 1, 2, 3, 4].map((index) => (
              <Skeleton key={index} className="h-9 w-full rounded-lg" />
            ))}
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Your chats could not be loaded.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3"
            >
              <RefreshCw aria-hidden="true" />
              Try again
            </Button>
          </div>
        ) : null}

        {status === "ready" && conversations.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm leading-6 text-muted-foreground">
            No chats yet. Your conversations will appear here.
          </p>
        ) : null}

        {status === "ready"
          ? groups.map((group) => (
              <section key={group.label} className="mb-4 last:mb-0">
                <h2 className="px-2.5 pb-1.5 text-xs font-medium text-muted-foreground">
                  {group.label}
                </h2>

                <ul className="space-y-0.5">
                  {group.items.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isActive={conversation.id === activeId}
                      disabled={disabled}
                      onSelect={onSelect}
                      onDelete={onDelete}
                    />
                  ))}
                </ul>
              </section>
            ))
          : null}
      </nav>
    </div>
  );
}