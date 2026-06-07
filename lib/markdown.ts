import Vditor from "vditor";

export type LegalContentFormat = "html" | "markdown";

export function isHtmlLegalContent(content: string): boolean {
  const trimmed = content.trim();
  return trimmed.startsWith("<") && /<\/[a-z][\s\S]*>/i.test(trimmed);
}

export function resolveLegalContentFormat(slug: string, content: string, contentType: string): LegalContentFormat {
  if (slug === "tokushoho") return "html";
  if (contentType === "MARKDOWN") return "markdown";
  if (isHtmlLegalContent(content)) return "html";
  return "markdown";
}

export async function renderLegalContent(content: string, format: LegalContentFormat): Promise<string> {
  if (!content.trim()) return "";

  if (format === "html") {
    return content;
  }

  const plainText = content.replace(/\n/g, "  \n");
  return Vditor.md2html(plainText, {
    mode: "light",
    anchor: 0
  });
}

export async function renderMarkdown(content: string): Promise<string> {
  return renderLegalContent(content, "markdown");
}
