# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.js >> Home Page E2E & Visual Tests >> Interaksi Carousel Target Market Berjalan Normal
- Location: e2e\home.spec.js:20:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h2:has-text("Deretan kenangan bersama Villa Kampung Gunung")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h2:has-text("Deretan kenangan bersama Villa Kampung Gunung")')

```

```yaml
- main:
  - region "Notifications alt+T"
  - navigation:
    - button "Villa Kampung Gunung Logo Villa Kampung Gunung":
      - img "Villa Kampung Gunung Logo"
      - text: Villa Kampung Gunung
    - button "Beranda"
    - button "Aktivitas"
    - button "Paket Experience"
    - button "Wisata"
    - link "Tanya Paket":
      - /url: https://wa.me/628112333838
  - img "Pemandangan luas fasilitas gathering berkapasitas besar di Villa Kampung Gunung dengan nuansa alam pegunungan yang asri"
  - heading "Villa Khusus Gathering & Kebersamaan di Alam Kuningan" [level=1]
  - paragraph: Tempat Ngumpul Seru Dengan Kapasitas Besar (Muat hingga 120 Orang). Nikmati momen tak terlupakan dengan fasilitas lengkap di tengah hutan tropis Kuningan.
  - text: Muat hingga 120 Orang Alam Pegunungan Asri
  - heading "Rencanakan Event Anda" [level=2]
  - paragraph: Dapatkan rincian harga dan info jadwal kosong dari tim kami.
  - text: Nama Instansi / Perusahaan / Komunitas
  - textbox "Nama Instansi / Perusahaan / Komunitas":
    - /placeholder: "Misal: PT Teknologi Maju"
  - text: Estimasi Jumlah Peserta
  - combobox "Estimasi Jumlah Peserta":
    - option "20 - 50 Orang"
    - option "50 - 100 Orang" [selected]
    - option "Lebih dari 100 Orang"
  - text: Kebutuhan Tambahan (Opsional) Catering
  - checkbox "Catering"
  - text: Outbound
  - checkbox "Outbound"
  - text: Sound System
  - checkbox "Sound System"
  - button "Cek Harga & Jadwal"
  - heading "\"Tempat gathering 100 orang tapi serasa private!\"" [level=2]
  - heading "\"Hidden place buat reuni & komunitas di Kuningan\"" [level=2]
  - heading "Aktivitas & Kebersamaan" [level=2]
  - paragraph: Bangun keakraban tim Anda melalui berbagai aktivitas seru di venue kami yang luas.
  - img "Suasana hangat malam api unggun di area terbuka Villa Kampung Gunung"
  - heading "Malam Api Unggun" [level=3]
  - paragraph: Momen hangat berbagi cerita di bawah langit malam Kuningan dengan hangatnya api unggun.
  - img "Aktivitas team building dan outbond seru di lapangan rumput luas Villa Kampung Gunung"
  - heading "Games & Team Building" [level=3]
  - paragraph: Tingkatkan kerjasama tim dengan area lapang hijau yang super luas.
  - img "Fasilitas karaoke outdoor dengan panggung mini dan sound system di bawah langit pegunungan Kuningan"
  - heading "Karaoke Outdoor" [level=3]
  - paragraph: Panggung mini & sound system siap menyemarakkan acara.
  - img "Sajian makan bersama prasmanan di area makan terbuka dengan pemandangan alam Villa Kampung Gunung"
  - heading "Makan Bareng" [level=3]
  - paragraph: Opsional catering buffet atau BBQ set premium.
  - heading "Pilihan Paket Experience" [level=2]
  - paragraph: Solusi hemat dan praktis untuk event berskala besar Anda.
  - img "Fasilitas dan suasana untuk Paket Gathering Kantor berkapasitas 50-120 Orang"
  - text: 50-120 Orang 1 Hari 1 Malam
  - heading "Paket Gathering Kantor" [level=3]
  - paragraph: Fasilitas super lengkap untuk gathering kantor, rapat tahunan, atau perayaan bareng tim dengan nuansa alam yang menyegarkan.
  - text: Seluruh Area Villa Meeting Hall Sound System Api Unggun Opsional Catering Mulai dari Rp 7 Juta (50 Orang)
  - button "Pesan Paket Ini"
  - text: Most Popular
  - img "Fasilitas dan suasana untuk Paket Character Building berkapasitas 50-100 Orang"
  - text: 50-100 Orang Program Intensif & Menyenangkan
  - heading "Paket Character Building" [level=3]
  - paragraph: Dilengkapi dengan fasilitator profesional, outbound, dan permainan seru untuk bikin tim makin kompak dan solid.
  - text: Fasilitator Profesional Peralatan Outbound Games Station Ice Breaking Sertifikat Opsional Custom sesuai kebutuhan
  - button "Pesan Paket Ini"
  - img "Fasilitas dan suasana untuk Paket Reuni / Komunitas berkapasitas Hingga 120 Orang"
  - text: Hingga 120 Orang Temu Kangen Bebas Lepas
  - heading "Paket Reuni / Komunitas" [level=3]
  - paragraph: Sangat cocok untuk reuni akbar atau acara komunitas dengan area berkumpul yang sangat luas dan fleksibel.
  - text: Free Area Berkumpul Set Barbeque (BBQ) Panggung Mini Parkir Kapasitas Besar Bebas Bising Mulai dari Rp 12 Juta (100 Orang)
  - button "Pesan Paket Ini"
  - heading "Pilihan Acara Anda" [level=2]
  - paragraph: Apapun agendanya, temukan harmoni dan pertumbuhan di sini.
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - heading "Corporate Gathering" [level=3]
  - button "Tanya Paket Ini"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - img "Galeri dokumentasi acara Corporate Gathering di Villa Kampung Gunung"
  - button "Geser gambar sebelumnya"
  - button "Geser gambar selanjutnya"
  - paragraph: Tingkatkan produktivitas tim melalui kegiatan seru bareng tim di tengah asrinya alam yang menyegarkan pikiran.
  - heading "Pilih Tipe Pesanan Anda" [level=3]
  - 'img "Pilihan target pesanan: Corporate Gathering"'
  - heading "Corporate Gathering" [level=3]
  - 'img "Pilihan target pesanan: Community Gathering"'
  - heading "Community Gathering" [level=3]
  - 'img "Pilihan target pesanan: Family Gathering"'
  - heading "Family Gathering" [level=3]
  - 'img "Pilihan target pesanan: Private Retreat / Personal"'
  - heading "Private Retreat / Personal" [level=3]
  - 'img "Pilihan target pesanan: Intimate Wedding"'
  - heading "Intimate Wedding" [level=3]
  - 'img "Pilihan target pesanan: Pesantren Kilat (Sanlat)"'
  - heading "Pesantren Kilat (Sanlat)" [level=3]
  - text: Destinasi
  - heading "Wisata Sekitar" [level=2]
  - paragraph: Jelajahi keindahan alam dan tempat wisata menarik di sekitar Kuningan
  - img "Pemandangan destinasi wisata terdekat Curug Putri Palutungan dari Villa Kampung Gunung"
  - text: 10 menit dari villa
  - heading "Curug Putri Palutungan" [level=3]
  - paragraph: Akses masuk yang mudah dengan fasilitas wisata yang tertata rapi. Sangat cocok untuk menikmati kesejukan air terjun alami sehabis acara.
  - link "Buka di Maps":
    - /url: https://maps.app.goo.gl/oUsHAzSFd1WqJL4H9
  - img "Pemandangan destinasi wisata terdekat Gedung Perundingan Linggarjati dari Villa Kampung Gunung"
  - text: 20 menit dari villa
  - heading "Gedung Perundingan Linggarjati" [level=3]
  - paragraph: Wisata sejarah yang terawat dengan baik. Lokasinya sangat dekat untuk melengkapi agenda jalan-jalan santai rombongan.
  - link "Buka di Maps":
    - /url: https://maps.app.goo.gl/iFKJp519TToUAFQDA
  - img "Pemandangan destinasi wisata terdekat Waduk Darma dari Villa Kampung Gunung"
  - text: 25 menit dari villa
  - heading "Waduk Darma" [level=3]
  - paragraph: Nikmati pemandangan hamparan air yang luas. Sangat cocok untuk piknik santai menikmati angin sore bersama rombongan.
  - link "Buka di Maps":
    - /url: https://maps.app.goo.gl/HUjD73W2hecnVKDeA
  - heading "Temukan Kami" [level=2]
  - iframe
  - heading "Villa Kampung Gunung" [level=3]
  - text: Jl. Perumahan Cipari, Cigugur, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45518 +62 811-2333-838
  - heading "Siap Melaksanakan Event Anda?" [level=3]
  - paragraph: Jangan ragu untuk menghubungi tim kami. Kami siap membantu merencanakan acara kantor, reuni, atau gathering komunitas Anda dari awal hingga akhir dengan kelengkapan fasilitas yang kami sediakan.
  - button "Chat via WhatsApp"
  - img "Villa Kampung Gunung Logo"
  - text: Villa Kampung Gunung
  - paragraph: Venue Gathering Premium di Kuningan. Tempat terbaik untuk acara perusahaan, komunitas, dan reuni keluarga besar.
  - heading "Navigasi" [level=2]
  - link "Beranda":
    - /url: "#hero"
  - link "Aktivitas":
    - /url: "#activities"
  - link "Paket Experience":
    - /url: "#packages"
  - link "Wisata":
    - /url: "#wisata"
  - heading "Kontak B2B" [level=2]
  - text: Jl. Perumahan Cipari, Cigugur, Kuningan, Jawa Barat +62 811-2333-838
  - heading "Ikuti Kami" [level=2]
  - link "Kunjungi Instagram resmi kami":
    - /url: https://www.instagram.com/vilakampunggunung?igsh=MXV6N21iMnBjcnhmMw==
    - img
  - link "Kunjungi TikTok resmi kami":
    - /url: https://www.tiktok.com/@villakampunggunung?_r=1&_t=ZS-96Syg9IYbjg
    - img
  - link "Kunjungi Facebook resmi kami":
    - /url: https://www.facebook.com/share/1Jt8mHA8cb/
    - img
  - paragraph: © 2026 Villa Kampung Gunung. All rights reserved.
  - link "Chat WhatsApp":
    - /url: https://wa.me/628112333838?text=Halo%20Admin,%20saya%20ingin%20tanya%20informasi%20Villa%20Kampung%20Gunung.
- alert
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Home Page E2E & Visual Tests', () => {
  4  |   
  5  |   test.beforeEach(async ({ page }) => {
  6  |     // Navigasi ke halaman utama sebelum setiap tes
  7  |     // Playwright secara otomatis akan menunggu event 'load' selesai.
  8  |     await page.goto('/');
  9  |   });
  10 | 
  11 |   test('Pengecekan Kritis Elemen Utama (Hero & Navigasi)', async ({ page }) => {
  12 |     // Memastikan judul Hero Section sesuai dengan teks yang ada di web
  13 |     await expect(page.locator('h1')).toContainText('Villa Khusus Gathering');
  14 |     
  15 |     // Memastikan tombol CTA WhatsApp Hero ada dan bisa diklik
  16 |     const waButton = page.getByRole('button', { name: /Cek Harga & Jadwal/i });
  17 |     await expect(waButton).toBeVisible();
  18 |   });
  19 | 
  20 |   test('Interaksi Carousel Target Market Berjalan Normal', async ({ page }) => {
  21 |     // Memastikan bagian section "target-market" muncul
  22 |     const targetSection = page.locator('#target-market');
  23 |     await expect(targetSection).toBeVisible();
  24 | 
  25 |     // Pastikan judul carousel muncul
> 26 |     await expect(page.locator('h2:has-text("Deretan kenangan bersama Villa Kampung Gunung")')).toBeVisible();
     |                                                                                                ^ Error: expect(locator).toBeVisible() failed
  27 | 
  28 |     // Secara default, "Private Retreat" harusnya aktif
  29 |     await expect(page.locator('h4', { hasText: 'Private Retreat' }).first()).toBeVisible();
  30 | 
  31 |     // Klik kartu "Family Gathering"
  32 |     const familyCard = page.locator('h4', { hasText: 'Family Gathering' }).first();
  33 |     await familyCard.click();
  34 | 
  35 |     // Verifikasi bahwa teks penjelasan Family Gathering muncul
  36 |     await expect(page.locator('p:has-text("Rasakan kembali kehangatan keluarga tradisional")')).toBeVisible();
  37 |   });
  38 | 
  39 |   test('Visual Regression Testing (Snapshot Compare)', async ({ page }) => {
  40 |     test.setTimeout(60000); // Ekstra waktu jika internet lambat memuat gambar
  41 | 
  42 |     // Arahkan mouse (hover) ke carousel untuk menghentikan interval Auto-Play & Progress Bar
  43 |     await page.locator('#target-market').hover();
  44 |     
  45 |     // Tunggu sebentar agar animasi CSS / transisi JS benar-benar berhenti
  46 |     await page.waitForTimeout(1000);
  47 | 
  48 |     // Mengambil screenshot penuh dari halaman
  49 |     await expect(page).toHaveScreenshot('homepage-layout.png', {
  50 |       fullPage: true,
  51 |       maxDiffPixels: 500, // Toleransi perubahan kecil ditingkatkan untuk mencegah flaky test
  52 |       animations: 'disabled' // Fitur native Playwright untuk menonaktifkan animasi CSS
  53 |     });
  54 |   });
  55 | });
  56 | 
```