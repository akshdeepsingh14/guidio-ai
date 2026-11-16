import { memo } from "react";
import { Sparkles } from "lucide-react";
import { CopyButton } from "@/components/common/copy-button";
import MarkdownRenderer from "@/components/markdown-renderer";
import { cn } from "@/lib/utils";
import { formatMessageTime } from "./assistant-utils";

function ThinkingDots() {
  return (
    <div
      role="status"
      aria-label="Guidio AI is thinking"
      className="flex items-center gap-1.5 py-2"
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="size-1.5 animate-pulse rounded-full bg-muted-foreground"
          style={{ animationDelay: `${index * 180}ms` }}
        />
      ))}
    </div>
  );
}

function MessageBubbleBase({ message }) {
  const time = formatMessageTime(message.createdAt);

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="min-w-0 max-w-[88%] sm:max-w-[75%]">
          <div className="rounded-2xl rounded-br-md border bg-accent px-4 py-2.5 text-sm leading-7 text-accent-foreground sm:text-[15px]">
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>

          {time ? (
            <p className="mt-1 px-1 text-right text-xs text-muted-foreground">
              {time}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const isWaiting = message.isStreaming && !message.content;

  return (
    <div className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background"
      >
        <Sparkles className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        {isWaiting ? (
          <ThinkingDots />
        ) : (
          <MarkdownRenderer content={message.content || ""} />
        )}

        {!message.isStreaming && message.content ? (
          <div
            className={cn(
              "mt-2 flex items-center gap-2 text-xs text-muted-foreground"
            )}
          >
            <CopyButton
              text={message.content}
              label="Copy"
              ariaLabel="Copy response"
              className="-ml-2"
            />
            {time ? <span>{time}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const MessageBubble = memo(MessageBubbleBase);