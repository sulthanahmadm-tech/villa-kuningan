# Product Requirements Document (PRD) - Villa Kampung Gunung

## 1. Ikhtisar Produk (Product Overview)
**Nama Produk:** Website Resmi Villa Kampung Gunung
**Platform:** Web (Responsif untuk Desktop, Tablet, dan Mobile)
**Tujuan Utama:** Menjadi gerbang utama (landing page) berorientasi *Business-to-Business (B2B)* dan *Business-to-Consumer (B2C)* skala besar untuk memfasilitasi pemesanan venue bagi acara *corporate gathering*, komunitas, dan keluarga besar di Kuningan, Jawa Barat.

## 2. Target Audiens
1. **Perusahaan / Corporate:** HRD atau panitia acara yang mencari tempat untuk *capacity building*, rapat tahunan, atau *employee gathering*.
2. **Komunitas / Organisasi:** Pengurus komunitas atau alumni yang mencari tempat reuni akbar dengan area *outdoor* yang luas.
3. **Keluarga Besar:** Perwakilan keluarga yang mengadakan *family gathering* dengan kebutuhan ruang bersama (joglo) dan penginapan.
4. **Individu (Opsional):** Tamu *private retreat* atau pasangan yang merencanakan *intimate wedding*.

## 3. Fitur Utama & Kebutuhan Sistem (Key Features)

### 3.1. Hero Section & "Art Direction"
- Menampilkan gambar utama yang dinamis:
  - *Landscape* untuk pengguna Desktop.
  - *Portrait* untuk pengguna Mobile (menghindari gambar terpotong).
- Headline yang mempertegas nilai jual (USP): Kapasitas besar hingga 120 orang di alam pegunungan asri.

### 3.2. Formulir "Lead Generation" (Penangkap Prospek)
- **Tujuan:** Mempermudah calon penyewa untuk menghitung dan meminta penawaran harga.
- **Input Field:**
  - Nama Instansi / Perusahaan / Komunitas
  - Estimasi Jumlah Peserta (Dropdown: 20-50, 50-100, 100+ orang)
  - Kebutuhan Tambahan (Checkbox: Catering, Outbound, Sound System)
- **Output:** Menghasilkan pesan teks otomatis (pre-filled) yang langsung diarahkan ke WhatsApp Admin.

### 3.3. Etalase Aktivitas (Bento Grid)
- Menampilkan kegiatan unggulan secara visual modern:
  - Malam Api Unggun
  - Games & Team Building
  - Karaoke Outdoor
  - Makan Bareng

### 3.4. Pilihan Paket Experience
- Menampilkan 3 paket siap jual (*ready-to-book*) dengan kartu harga:
  1. Paket Gathering Kantor
  2. Paket Character Building (Ditandai sebagai *Most Popular*)
  3. Paket Reuni / Komunitas
- Masing-masing dilengkapi deskripsi, kapasitas, fitur (*checklist*), dan CTA.

### 3.5. Carousel "Pilihan Acara Anda" (Interactive Target Market)
- Slider gambar interaktif 3D (Perspective Carousel) yang menampilkan dokumentasi nyata dari berbagai jenis acara:
  - Corporate Gathering
  - Community Gathering
  - Family Gathering
  - Private Retreat
  - Intimate Wedding
  - Pesantren Kilat
- Dilengkapi sistem rotasi otomatis dan dukungan gestur geser (swipe) di HP.

### 3.6. Integrasi Wisata Sekitar
- Menampilkan destinasi wisata terdekat sebagai nilai tambah lokasi:
  - Curug Putri Palutungan
  - Gedung Perundingan Linggarjati
  - Waduk Darma
- Terintegrasi dengan tombol "Buka di Maps".

### 3.7. Kontak & Navigasi Cepat
- **Peta Interaktif:** Embed Google Maps di bagian bawah.
- **Floating Button:** Tombol WhatsApp yang mengambang (melayang) di sudut kanan bawah layar yang beranimasi untuk menarik perhatian.

## 4. Arsitektur Informasi (Struktur Halaman)
Website menggunakan model *Single Page Application (Landing Page)* dengan urutan seksi (*section*) sebagai berikut:
1. `Navbar` (Header tetap dengan tombol Navigasi & WA)
2. `#hero` (Hero Banner + Formulir Reservasi)
3. `USP Banner` (Pita nilai jual - Desktop only)
4. `#activities` (Daftar Aktivitas B2B)
5. `#packages` (Pilihan Paket Harga)
6. `#target-market` (Carousel Pilihan Acara/Galeri)
7. `#wisata` (Wisata Sekitar)
8. `Contact / Maps` (Peta dan alamat detail)
9. `Footer` (Link Media Sosial dan Copyright)

## 5. Tumpukan Teknologi (Tech Stack)
- **Framework Utama:** Next.js (App Router)
- **Bahasa Pemrograman:** JavaScript / React.js
- **Styling & UI:** Tailwind CSS (dengan pemanfaatan utilitas responsif tingkat lanjut)
- **Ikon & Aset:** Lucide React, Unsplash (Image placeholder), Aset Lokal (Images)
- **Deployment & Hosting:** Vercel / GitHub
- **Integrasi Pihak Ketiga:** API WhatsApp Web, Google Maps Embed

## 6. Rencana Pengembangan ke Depan (Future Roadmap)
*(Dapat dikembangkan lebih lanjut)*
- **Fase 2:** Pembuatan halaman khusus (*dedicated page*) untuk setiap paket.
- **Fase 3:** Integrasi sistem kalender ketersediaan (Booking Calendar) agar pelanggan bisa melihat tanggal kosong secara *real-time*.
- **Fase 4:** Galeri video testimoni klien.
- **Fase 5:** Dasbor Admin (CMS) untuk mengubah teks, harga paket, dan gambar tanpa harus merubah kode.
