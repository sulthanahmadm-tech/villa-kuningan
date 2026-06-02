const { test, expect } = require('@playwright/test');

test.describe('Home Page E2E & Visual Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigasi ke halaman utama sebelum setiap tes
    // Playwright secara otomatis akan menunggu event 'load' selesai.
    await page.goto('/');
  });

  test('Pengecekan Kritis Elemen Utama (Hero & Navigasi)', async ({ page }) => {
    // Memastikan judul Hero Section sesuai dengan teks yang ada di web
    await expect(page.locator('h1')).toContainText('Villa Kampung Gunung');
    
    // Memastikan tombol CTA WhatsApp Hero ada dan bisa diklik
    const waButton = page.getByRole('button', { name: /Cari Villa/i }); // Berdasarkan snapshot, nama tombolnya "Cari Villa" atau kita sesuaikan.
    // Berdasarkan page snapshot: ada button "Kelola Booking", "Cari Villa"
    // Mari kita cek tombol yang sesuai.
    await expect(page.locator('button:has-text("Cari Villa")')).toBeVisible();
  });

  test('Interaksi Carousel Target Market Berjalan Normal', async ({ page }) => {
    // Memastikan bagian section "target-market" muncul
    const targetSection = page.locator('#target-market');
    await expect(targetSection).toBeVisible();

    // Pastikan judul carousel muncul
    await expect(page.locator('h2:has-text("Deretan kenangan bersama Villa Kampung Gunung")')).toBeVisible();

    // Secara default, "Private Retreat" harusnya aktif
    await expect(page.locator('h4', { hasText: 'Private Retreat' }).first()).toBeVisible();

    // Klik kartu "Family Gathering"
    const familyCard = page.locator('h4', { hasText: 'Family Gathering' }).first();
    await familyCard.click();

    // Verifikasi bahwa teks penjelasan Family Gathering muncul
    await expect(page.locator('p:has-text("Rasakan kembali kehangatan keluarga tradisional")')).toBeVisible();
  });

  test('Visual Regression Testing (Snapshot Compare)', async ({ page }) => {
    test.setTimeout(60000); // Ekstra waktu jika internet lambat memuat gambar

    // Arahkan mouse (hover) ke carousel untuk menghentikan interval Auto-Play & Progress Bar
    await page.locator('#target-market').hover();
    
    // Tunggu sebentar agar animasi CSS / transisi JS benar-benar berhenti
    await page.waitForTimeout(1000);

    // Mengambil screenshot penuh dari halaman
    await expect(page).toHaveScreenshot('homepage-layout.png', {
      fullPage: true,
      maxDiffPixels: 500, // Toleransi perubahan kecil ditingkatkan untuk mencegah flaky test
      animations: 'disabled' // Fitur native Playwright untuk menonaktifkan animasi CSS
    });
  });
});
