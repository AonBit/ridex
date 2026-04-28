import { ThemeConfig } from "@prisma/client";

export function ThemeInjector({ theme }: { theme: ThemeConfig | null }) {
  const cssVars = theme
    ? {
        "--carolina-blue": theme.primaryColor,
        "--slate-blue": theme.secondaryColor,
        "--deep-cerise": theme.accentColor,
        "--alice-blue-2": theme.backgroundColor,
        "--white": theme.surfaceColor,
        "--space-cadet": theme.textColor,
        "--medium-sea-green": theme.successColor,
        "--red-salsa": theme.errorColor,
        "--radius-10": theme.borderRadius,
        "--shadow-1": theme.shadowStyle,
        "--ff-nunito": `${theme.fontHeading}, sans-serif`,
        "--ff-open-sans": `${theme.fontBody}, sans-serif`,
        "--color-brand": theme.primaryColor,
        "--color-brand-secondary": theme.secondaryColor,
        "--color-accent": theme.accentColor,
        "--color-bg": theme.backgroundColor,
        "--color-surface": theme.surfaceColor,
        "--color-text-primary": theme.textColor
      }
    : {};

  return <style>{`:root { ${Object.entries(cssVars).map(([key, value]) => `${key}:${value};`).join(" ")} }`}</style>;
}
