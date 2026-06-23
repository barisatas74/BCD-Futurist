import { NextResponse, type NextRequest } from "next/server";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifyToken(token);

  // /api/admin/* (login hariç) → 401
  if (
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/login")
  ) {
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // /admin/* (login hariç) → giriş sayfasına yönlendir
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session) {
      const url = new URL("/admin/login", req.url);
      return NextResponse.redirect(url);
    }
  }

  // Zaten girişliyse login sayfasından panele al
  if (pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
