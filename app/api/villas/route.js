import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  try {
    const villas = await prisma.villa.findMany({});
    return NextResponse.json(villas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_development_only_123' });
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ message: 'Akses ditolak' }, { status: 403 });
    }

    const body = await req.json();
    const newVilla = await prisma.villa.create({
      data: body,
    });
    return NextResponse.json(newVilla, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menambah data' }, { status: 500 });
  }
}
