import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose'; // Nah, ini yang benar, tanpa kurung kurawal!
import Reservation from '@/models/Reservation';

function generateReservationId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'VKG-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      room,
      checkIn,
      checkOut,
      nights,
      guests,
      totalPrice,
      customerName,
      customerPhone,
    } = body;

    // Validasi field kosong
    if (!room || !checkIn || !checkOut || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validasi logika tanggal
    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Tanggal check-out harus setelah check-in' },
        { status: 400 }
      );
    }

    // Generate ID unik
    let reservationId = generateReservationId();
    let exists = await Reservation.findOne({ reservationId });
    while (exists) {
      reservationId = generateReservationId();
      exists = await Reservation.findOne({ reservationId });
    }

    // Buat data baru
    const computedNights = nights || Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const computedTotalPrice = totalPrice || 0;
    const reservation = new Reservation({
      reservationId,
      room,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: computedNights,
      pricePerNight: computedNights > 0 ? computedTotalPrice / computedNights : 0,
      guests: guests || 1,
      totalPrice: totalPrice || 0,
      customerName,
      customerPhone,
      status: 'pending',
    });

    const saved = await reservation.save();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}