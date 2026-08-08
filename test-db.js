require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

async function test() {
  console.log('Mencoba koneksi ke MongoDB...');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Koneksi BERHASIL!');
    process.exit(0);
  } catch (error) {
    console.error('Koneksi GAGAL:', error.message);
    process.exit(1);
  }
}

test();
