import { Fragment, ReactNode } from "react";

/**
 * Tiny markdown-lite renderer for i18n-driven marketing copy.
 * Supports:
 *   - Blank-line separated paragraphs
 *   - Unordered lists: lines starting with "- "
 *   - Inline: **bold**, *em*, [text](url)
 * Anything else is rendered as plain text.
 */

const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  const parts = text.split(INLINE_RE).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      const external = /^https?:\/\//.test(href);
      return (
        <a
          key={i}
          href={href}
          className="text-primary hover:underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={className ?? "space-y-4"}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-2">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{renderInline(block)}</p>;
      })}
    </div>
  );
}
