export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path?.trim()) return "";

  let trimmed = path.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  trimmed = trimmed.replace(/^\/\.\//, "/").replace(/^\.\//, "");
  if (!trimmed.startsWith("/")) trimmed = `/${trimmed}`;
  trimmed = trimmed.replace(/\/{2,}/g, "/");

  return trimmed;
}

export function normalizeStoredMediaPath(path: string): string {
  return resolveMediaUrl(path);
}
