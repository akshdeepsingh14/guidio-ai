import { useEffect, useRef, useState } from "react";
import { ArrowDown, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./message-bubble";

const STICK_THRESHOLD_PX = 80;

/**
 * Scrollable message area.
 *
 * It follows new text only while the student is reading the bottom. If they
 * scroll up to re-read something, it stops following and shows a
 * "Latest" button instead.
 */
export function ChatThread({
  messages,
  activeId,
  isLoading,
  isSending,
  emptyState,
}) {
  const scrollRef = useRef(null);
  const stickToBottomRef = useRef(true);
  const [showJump, setShowJump] = useState(false);

  function scrollToBottom(behavior = "auto") {
    const element = scrollRef.current;
    if (!element) return;

    element.scrollTo({ top: element.scrollHeight, behavior });
  }

  function handleScroll() {
    const element = scrollRef.current;
    if (!element) return;

    const distance =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    const atBottom = distance < STICK_THRESHOLD_PX;

    stickToBottomRef.current = atBottom;
    setShowJump(!atBottom);
  }

  // Opening another conversation always starts at the bottom.
  useEffect(() => {
    stickToBottomRef.current = true;
  }, [activeId]);

  // Sending a message always brings the student to the bottom.
  useEffect(() => {
    if (isSending) {
      stickToBottomRef.current = true;
    }
  }, [isSending]);

  useEffect(() => {
    if (stickToBottomRef.current) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="log"
        aria-label="Conversation"
        className="h-full overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
          {isLoading ? (
            <div
              role="status"
              className="flex flex-1 items-center justify-center gap-2 py-20 text-sm text-muted-foreground"
            >
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Loading conversation…
            </div>
          ) : hasMessages ? (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          ) : (
            emptyState
          )}
        </div>
      </div>

      {showJump ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            stickToBottomRef.current = true;
            scrollToBottom("smooth");
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full shadow-sm"
        >
          <ArrowDown aria-hidden="true" />
          Latest
        </Button>
      ) : null}
    </div>
  );
}