import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama wajib diisi'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email wajib diisi'],
    },
    password: {
      type: String,
      required: [true, 'Password wajib diisi'],
    },
    role: {
      type: String,
      default: 'user', // Bisa diubah jadi 'admin' secara manual di database
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);