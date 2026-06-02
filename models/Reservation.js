import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
  {
    reservationId: { type: String, required: true, unique: true },
    room: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    customerName: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);