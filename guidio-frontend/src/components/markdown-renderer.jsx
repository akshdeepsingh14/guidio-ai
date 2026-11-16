import { Children, isValidElement, memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";

const remarkPlugins = [remarkGfm];

function textFromNode(node) {
  if (Array.isArray(node)) {
    return node.map(textFromNode).join("");
  }

  return node == null ? "" : String(node);
}

// react-markdown v10 wraps every fenced code block in <pre><code>.
// Handling <pre> lets us tell fenced blocks (with or without a language)
// apart from inline `code`.
function Pre({ children }) {
  const child = Children.toArray(children)[0];

  if (isValidElement(child)) {
    const className = child.props.className || "";
    const match = /language-([^\s]+)/.exec(className);
    const code = textFromNode(child.props.children).replace(/\n$/, "");

    return <CodeBlock code={code} language={match ? match[1] : ""} />;
  }

  return <pre>{children}</pre>;
}

// Created once, so React does not re-create these on every streamed chunk.
const components = {
  h1: ({ children }) => (
    <h1 className="mb-3 mt-6 text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-2.5 mt-5 text-lg font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-4 text-base font-semibold first:mt-0">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 mt-4 text-sm font-semibold first:mt-0">{children}</h4>
  ),

  p: ({ children }) => <p className="mb-3.5 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => (
    <del className="text-muted-foreground">{children}</del>
  ),

  pre: Pre,
  // Only inline code reaches here. Fenced blocks are handled by Pre.
  code: ({ children }) => (
    <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] break-words">
      {children}
    </code>
  ),

  ul: ({ children }) => (
    <ul className="mb-3.5 list-disc space-y-1.5 pl-5 marker:text-muted-foreground last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3.5 list-decimal space-y-1.5 pl-5 marker:text-muted-foreground last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-foreground/30 pl-4 text-muted-foreground">
      {children}
    </blockquote>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ),

  hr: () => <hr className="my-5" />,

  // Images from AI answers are shown as links instead of being loaded
  // automatically from unknown websites.
  img: ({ src, alt }) =>
    src ? (
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-4"
      >
        {alt || "Open image"}
      </a>
    ) : null,

  table: ({ children }) => (
    <div className="my-4 w-full max-w-full overflow-x-auto rounded-lg border">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 align-top text-muted-foreground">{children}</td>
  ),

  input: ({ type, checked }) =>
    type === "checkbox" ? (
      <input
        type="checkbox"
        checked={Boolean(checked)}
        readOnly
        disabled
        className="mr-2 size-3.5 translate-y-0.5 accent-foreground"
      />
    ) : null,
};

function MarkdownRenderer({ content }) {
  return (
    <div className="min-w-0 max-w-full break-words text-sm leading-7 text-foreground sm:text-[15px]">
      <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownRenderer);