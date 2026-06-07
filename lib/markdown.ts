import MarkdownIt from "markdown-it";

export type LegalContentFormat = "html" | "markdown";

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true
});

export function isHtmlLegalContent(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.startsWith("<") && /<\/[a-z][\s\S]*>/i.test(trimmed);
}

export function resolveLegalContentFormat(_slug: string, content: string, contentType: string): LegalContentFormat {
  if (contentType === "MARKDOWN") return "markdown";
  if (isHtmlLegalContent(content)) return "html";
  return "markdown";
}

export function renderLegalContent(content: string, format: LegalContentFormat): string {
  if (!content.trim()) return "";

  if (format === "html") {
    return content;
  }

  return markdown.render(content);
}

export function renderMarkdown(content: string): string {
  return renderLegalContent(content, "markdown");
}
