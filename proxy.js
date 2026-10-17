import { NextResponse } from "next/server";

export function proxy(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDevelopment = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'none'",
    "script-src-attr 'none'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${isDevelopment ? " ws://localhost:3000 ws://127.0.0.1:3000" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDevelopment ? [] : ["upgrade-insecure-requests"])
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders }
  });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
