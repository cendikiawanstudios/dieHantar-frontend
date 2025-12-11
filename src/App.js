import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // 1. STATE: Tempat menyimpan data restoran
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. EFFECT: Dijalankan otomatis saat website dibuka
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // 3. FUNCTION: Mengambil data dari Backend Sesi 2
  const fetchRestaurants = async () => {
    try {
      // Pastikan port 3000 sesuai dengan terminal Backend kamu
      const response = await fetch('http://localhost:3000/api/restaurants');
      const jsonData = await response.json();
      
      // Simpan data ke state
      if (jsonData.data) {
        setRestaurants(jsonData.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <h1>🚀 dieHantar Food</h1>
        <p>Pengantaran Makanan Tercepat di Riau</p>
      </header>

      {/* CONTENT */}
      <main className="main-content">
        <h2>Daftar Restoran Mitra</h2>

        {loading ? (
          <p className="loading-text">Sedang memuat restoran...</p>
        ) : (
          <div className="restaurant-grid">
            {restaurants.length > 0 ? (
              restaurants.map((resto) => (
                <div key={resto.id} className="card">
                  <div className="card-image">
                    {/* Placeholder gambar jika database kosong */}
                    <img 
                      src={resto.image_url || 'https://via.placeholder.com/300x200?text=Resto+dieFood'} 
                      alt={resto.name} 
                    />
                  </div>
                  <div className="card-body">
                    <h3>{resto.name}</h3>
                    <p className="address">📍 {resto.address}</p>
                    <p className="desc">{resto.description}</p>
                    <button className="btn-order">Pesan Sekarang</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>Belum ada restoran yang buka saat ini.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
