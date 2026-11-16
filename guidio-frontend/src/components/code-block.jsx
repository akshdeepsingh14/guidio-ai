import { lazy, memo, Suspense } from "react";
import { CopyButton } from "@/components/common/copy-button";

// The syntax highlighter is loaded only when an answer contains code.
const CodeHighlighter = lazy(() => import("@/components/code-highlighter"));

function PlainCode({ code }) {
  return (
    <pre className="m-0 px-4 py-3.5 font-mono text-[13px] leading-[1.65] text-neutral-200">
      <code>{code}</code>
    </pre>
  );
}

function CodeBlockBase({ code, language }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0a] text-neutral-200">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 bg-[#111111] px-3 py-1.5">
        <span className="truncate font-mono text-xs text-neutral-400">
          {language || "text"}
        </span>

        <CopyButton
          text={code}
          tone="dark"
          ariaLabel="Copy code"
          label="Copy code"
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        {language ? (
          <Suspense fallback={<PlainCode code={code} />}>
            <CodeHighlighter code={code} language={language} />
          </Suspense>
        ) : (
          <PlainCode code={code} />
        )}
      </div>
    </div>
  );
}

export const CodeBlock = memo(CodeBlockBase);