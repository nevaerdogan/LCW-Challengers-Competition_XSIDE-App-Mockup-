import { useState, useEffect } from 'react';

const getImg = (name: string) => new URL(`../assets/${name}.png`, import.meta.url).href;

const favoriteProducts = [
  { id: 1, name: 'Crop Top', price: '199,99 ₺', img: 'croptop', color: 'Beyaz', size: 'S' },
  { id: 2, name: 'Wide Leg Jean', price: '449,99 ₺', img: 'wideleg', color: 'Mavi', size: 'M' },
  { id: 3, name: 'Hoodie', price: '349,99 ₺', img: 'hoodie', color: 'Mor', size: 'L' },
  { id: 4, name: 'Sneaker', price: '599,99 ₺', img: 'snaker', color: 'Gri', size: '38' },
  { id: 5, name: 'Çanta', price: '279,99 ₺', img: 'canta', color: 'Kahve', size: '-' },
  { id: 6, name: 'Ceket', price: '549,99 ₺', img: 'ceket', color: 'Yeşil', size: 'M' },
];

interface Props {
  onClose: () => void;
}

export default function QRScannerScreen({ onClose }: Props) {
  const [phase, setPhase] = useState<'scanning' | 'products'>('scanning');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (phase !== 'scanning') return;
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('products'), 200);
          return 100;
        }
        return p + 5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  if (phase === 'scanning') {
    return (
      <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center" style={{ background: '#0A0A0A' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 52, left: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 18, border: 'none', zIndex: 10 }}
        >
          ←
        </button>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 24, letterSpacing: 0.5 }}>
          QR Kodu Okutun
        </p>

        {/* QR Frame */}
        <div style={{ width: 220, height: 220, position: 'relative' }}>
          {[
            { top: 0, left: 0, borderTop: '3px solid #F5C518', borderLeft: '3px solid #F5C518' },
            { top: 0, right: 0, borderTop: '3px solid #F5C518', borderRight: '3px solid #F5C518' },
            { bottom: 0, left: 0, borderBottom: '3px solid #F5C518', borderLeft: '3px solid #F5C518' },
            { bottom: 0, right: 0, borderBottom: '3px solid #F5C518', borderRight: '3px solid #F5C518' },
          ].map((style, i) => (
            <div key={i} style={{ position: 'absolute', width: 36, height: 36, borderRadius: 4, ...style }} />
          ))}

          <div
            style={{
              position: 'absolute',
              left: 8,
              right: 8,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #F5C518, transparent)',
              top: `${scanProgress}%`,
              transition: 'top 0.03s linear',
              boxShadow: '0 0 12px rgba(245,197,24,0.6)',
            }}
          />

          <div style={{ position: 'absolute', inset: 24, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(7, 1fr)', gap: 3, opacity: 0.3 }}>
            {Array.from({ length: 49 }).map((_, i) => (
              <div key={i} style={{ background: Math.random() > 0.4 ? '#FFF' : 'transparent', borderRadius: 1 }} />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, width: 180 }}>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${scanProgress}%`, background: '#F5C518', borderRadius: 2, transition: 'width 0.03s linear' }} />
          </div>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            {scanProgress < 100 ? 'Taranıyor...' : 'Tamamlandı!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[60] flex flex-col" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)', padding: '52px 16px 20px', borderRadius: '0 0 28px 28px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 16, border: 'none' }}>
            ←
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20 }}>🪞</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#FFF', letterSpacing: 0.5 }}>FAVORİLERİNİ AYNADA DENE</span>
          </div>
          <div style={{ width: 32 }} />
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          Favori ürünlerini mağazadaki akıllı aynada dene!
        </p>
      </div>

      {/* Products */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 12px 20px' }}>
        <div className="grid grid-cols-2 gap-3">
          {favoriteProducts.map((p, i) => (
            <div
              key={p.id}
              style={{
                background: '#FFF',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both`,
              }}
            >
              <div style={{ position: 'relative', height: 140, background: '#F5F5F5' }}>
                <img
                  src={getImg(p.img)}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 40,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 8,
                    padding: '3px 8px',
                    fontSize: 9,
                    fontWeight: 700,
                    color: '#1A1A1A',
                  }}
                >
                  {p.size} • {p.color}
                </span>
              </div>

              <div style={{ padding: '10px 12px 12px' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{p.name}</p>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#F5C518', marginTop: 2 }}>{p.price}</p>
                <button
                  className="w-full flex items-center justify-center gap-1.5 active:scale-[0.95] transition-all duration-200"
                  style={{
                    marginTop: 8,
                    height: 34,
                    borderRadius: 12,
                    background: '#1A1A1A',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#FFF',
                    border: 'none',
                  }}
                >
                  🪞 Aynada Dene
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div style={{ marginTop: 16, background: '#FFF', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 28 }}>📱</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>Nasıl Çalışır?</p>
              <p style={{ fontSize: 11, color: '#999', lineHeight: 1.4, marginTop: 2 }}>
                Mağazadaki akıllı aynaya QR kodu okut, favori ürünlerini üzerinde sanal olarak dene!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
