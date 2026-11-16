import { useState } from "react";
import { History, Plus, X } from "lucide-react";
import { AiErrorNotice } from "@/components/common/ai-error-notice";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatComposer } from "@/features/assistant/chat-composer";
import { ChatEmptyState } from "@/features/assistant/chat-empty-state";
import { ChatThread } from "@/features/assistant/chat-thread";
import { ConversationList } from "@/features/assistant/conversation-list";
import { useAssistant } from "@/features/assistant/use-assistant";

function AssistantPage() {
  const assistant = useAssistant();
  const [historyOpen, setHistoryOpen] = useState(false);

  const {
    conversations,
    listStatus,
    activeId,
    activeTitle,
    messages,
    isLoadingMessages,
    isSending,
    draft,
    sendError,
    pageError,
    cooldown,
  } = assistant;

  function handleSelect(id) {
    setHistoryOpen(false);
    assistant.selectConversation(id);
  }

  function handleNewChat() {
    setHistoryOpen(false);
    assistant.startNewChat();
  }

  const listProps = {
    conversations,
    status: listStatus,
    activeId,
    disabled: isSending,
    onSelect: handleSelect,
    onDelete: assistant.deleteConversation,
    onNewChat: handleNewChat,
    onRetry: assistant.retryConversationList,
  };

  return (
    <div className="flex h-[calc(100dvh-7.5rem)] min-h-[26rem] overflow-hidden rounded-xl border bg-card">
      {/* Chat history: fixed column on large screens */}
      <aside className="hidden w-72 shrink-0 border-r lg:block">
        <ConversationList {...listProps} />
      </aside>

      {/* Chat history: slide-in panel on smaller screens */}
      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="data-[side=left]:w-[85vw] gap-0 p-0 lg:hidden"
        >
          <SheetTitle className="sr-only">Chat history</SheetTitle>
          <SheetDescription className="sr-only">
            Your previous conversations with the AI Student Assistant.
          </SheetDescription>

          <ConversationList
            {...listProps}
            onClose={() => setHistoryOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <section className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b px-3 py-2.5 sm:px-4">
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            onClick={() => setHistoryOpen(true)}
            aria-label="Open chat history"
            className="lg:hidden"
          >
            <History aria-hidden="true" />
          </Button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold">
              AI Student Assistant
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              {activeTitle || "New conversation"}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleNewChat}
            disabled={isSending}
            className="lg:hidden"
          >
            <Plus aria-hidden="true" />
            <span className="hidden sm:inline">New chat</span>
            <span className="sr-only sm:hidden">New chat</span>
          </Button>
        </div>

        <ChatThread
          messages={messages}
          activeId={activeId}
          isLoading={isLoadingMessages}
          isSending={isSending}
          emptyState={
            <ChatEmptyState
              onPick={(prompt) => assistant.sendMessage(prompt)}
              disabled={isSending || cooldown.isCoolingDown}
            />
          }
        />

        {pageError || sendError ? (
          <div className="mx-auto w-full max-w-3xl space-y-2 px-3 pb-3 sm:px-4">
            {pageError ? (
              <Alert variant="destructive" className="pr-10">
                <AlertDescription className="text-destructive/90">
                  {pageError}
                </AlertDescription>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={assistant.dismissPageError}
                  aria-label="Dismiss message"
                  className="absolute right-2 top-2"
                >
                  <X aria-hidden="true" />
                </Button>
              </Alert>
            ) : null}

            {sendError ? (
              <AiErrorNotice
                error={sendError}
                onRetry={draft.trim() ? () => assistant.sendMessage() : undefined}
                cooldownSeconds={cooldown.remaining}
              />
            ) : null}
          </div>
        ) : null}

        <ChatComposer
          value={draft}
          onChange={assistant.setDraft}
          onSend={() => assistant.sendMessage()}
          isSending={isSending}
          cooldownSeconds={cooldown.remaining}
        />
      </section>
    </div>
  );
}

export default AssistantPage;