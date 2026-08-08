'use client';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Utama</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Pemesanan</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Kamar Aktif</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">0</p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Pemasukan (Bulan Ini)</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">Rp 0</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Pesanan Terbaru</h2>
        <div className="text-gray-500 text-sm text-center py-8">
          Belum ada pesanan masuk.
        </div>
      </div>
    </div>
  );
}
