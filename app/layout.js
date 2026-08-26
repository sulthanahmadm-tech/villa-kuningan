import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Villa Kampung Gunung | Tempat Gathering & Kebersamaan di Kuningan",
  description: "Tempat ngumpul seru dengan kapasitas besar hingga 120 orang di alam Kuningan. Spesialis paket gathering perusahaan, makrab kampus, komunitas, dan reuni keluarga.",
  keywords: ["villa gathering kuningan", "villa rombongan kuningan", "tempat outing perusahaan kuningan", "makrab kampus kuningan", "villa kapasitas besar kuningan", "villa kampung gunung"],
  openGraph: {
    title: "Villa Kampung Gunung | Tempat Ngumpul Seru Kapasitas Besar",
    description: "Spesialis paket gathering perusahaan, makrab kampus, dan reuni keluarga di Kuningan, Jawa Barat. Kapasitas hingga 120 orang!",
    type: "website",
    locale: "id_ID",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
