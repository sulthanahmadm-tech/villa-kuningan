import { NextResponse } from 'next/server';

// Wajib ada kata 'export' sebelum function, dan gunakan nama fungsi 'proxy'
export function proxy(request) {
  
  // ---> Masukkan logika kode kamu yang sebelumnya di sini <---

  return NextResponse.next();
}

// (Opsional) Kalau kamu pakai 'config matcher' sebelumnya, bentuknya seperti ini:
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};