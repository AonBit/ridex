import { handlers } from "@/lib/auth";
import { NextRequest } from "next/server";

function toProxyAwareRequest(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (!forwardedHost) {
    return request;
  }

  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const protocol = forwardedProto.endsWith(":") ? forwardedProto : `${forwardedProto}:`;
  const url = new URL(`${protocol}//${forwardedHost}${request.nextUrl.pathname}${request.nextUrl.search}`);

  return new NextRequest(url, request);
}

export async function GET(request: NextRequest) {
  return handlers.GET(toProxyAwareRequest(request));
}

export async function POST(request: NextRequest) {
  return handlers.POST(toProxyAwareRequest(request));
}
