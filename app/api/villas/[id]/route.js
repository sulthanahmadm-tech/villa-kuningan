import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_development_only_123' });
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ message: 'Akses ditolak' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    
    const updatedVilla = await prisma.villa.update({
      where: { id: id },
      data: body,
    });

    return NextResponse.json(updatedVilla, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengubah data' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_development_only_123' });
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ message: 'Akses ditolak' }, { status: 403 });
    }

    const { id } = await params;
    
    await prisma.villa.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Villa berhasil dihapus' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus data' }, { status: 500 });
  }
}
