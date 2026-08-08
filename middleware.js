import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Contoh proteksi ekstra: Hanya role 'admin' yang bisa buka /dashboard
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/login?message=Akses Ditolak", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Jika tidak ada token (belum login), tendang ke /login
    },
  }
);

// Tentukan rute mana saja yang ingin digembok
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], 
};