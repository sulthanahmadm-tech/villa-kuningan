require('dotenv').config();
const { Client } = require('pg');

async function testConnection() {
  const connectionString = process.env.DIRECT_URL;
  console.log("Mencoba koneksi ke:", connectionString.replace(/:[^:@]+@/, ':***@'));
  
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log("✅ Koneksi BERHASIL!");
    await client.end();
  } catch (err) {
    console.error("❌ Koneksi GAGAL:");
    console.error(err.message);
  }
}

testConnection();
