import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/user";

// Fungsi koneksi database (sesuaikan dengan file koneksimu)
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@villa.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        
        // 1. Cek apakah user ada di database
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("Email tidak ditemukan!");

        // 2. Cocokkan password mentah dengan password acak di database
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordsMatch) throw new Error("Password salah!");

        // 3. Jika sukses, kembalikan data user ke dalam Session
        return { id: user._id, name: user.name, email: user.email, role: user.role };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // Menyisipkan Role & ID ke dalam token JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/login', // Mengarahkan error/login ke halaman kustom kita
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };