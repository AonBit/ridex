import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, detectLocaleFromHeader, isSupportedLocale, type AppLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0] as AppLocale | undefined;

  if (maybeLocale && isSupportedLocale(maybeLocale)) {
    return NextResponse.next();
  }

  const locale = detectLocaleFromHeader(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;
  const target = new URL(`/${locale}${pathname}`, request.url);
  target.search = request.nextUrl.search;
  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
