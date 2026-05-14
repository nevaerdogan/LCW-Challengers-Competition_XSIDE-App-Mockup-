import { useState, useEffect } from 'react';

interface GameRewardScreenProps {
  onClose: () => void;
  onGoHome: () => void;
}

export default function GameRewardScreen({ onClose, onGoHome }: GameRewardScreenProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(72);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const t = setTimeout(() => setProgressWidth(86.5), 800);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText('XSD-7K2M-9P4Q');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 z-[70] flex flex-col" style={{ background: '#FAFAFA', overflow: 'hidden' }}>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none z-[80] overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: -8,
              width: Math.random() * 7 + 3,
              height: Math.random() * 7 + 3,
              borderRadius: Math.random() > 0.5 ? '50%' : '1px',
              background: ['#F5C518', '#FF6B35', '#4CAF50', '#7B2FF7', '#FF3B5C'][i % 5],
              animation: `confettiFall ${1.8 + Math.random() * 2.2}s ease-in ${Math.random() * 1}s forwards`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ paddingBottom: 110 }}>

        {/* ── DARK HEADER ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFF8E1, #FFECB3)',
            borderRadius: '0 0 32px 32px',
            height: 260,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(245,197,24,0.2)' }} />
          <div style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(245,197,24,0.15)' }} />

          <div
            style={{
              fontSize: 64,
              animation: mounted ? 'giftBounce 1.5s ease-in-out infinite' : 'none',
              transform: mounted ? 'translateY(0)' : 'translateY(-24px)',
              opacity: mounted ? 1 : 0,
              transition: 'all 0.6s ease-out',
            }}
          >
            🎁
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#1A1A1A',
              letterSpacing: 1,
              marginTop: 10,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.5s ease-out 0.2s',
            }}
          >
            TEBRİKLER! 🎉
          </h1>
          <p style={{ fontSize: 13, color: '#8E7A3A', marginTop: 4, opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease-out 0.3s' }}>
            Oyunu tamamladın!
          </p>
          <div
            className="flex items-center justify-center"
            style={{
              marginTop: 10,
              background: '#F5C518',
              borderRadius: 20,
              padding: '6px 18px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.5s ease-out 0.4s',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>⭐ +150 Puan kazandın</span>
          </div>
        </div>

        {/* ── PUAN BARAJI CARD (overlaps header) ── */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            padding: '16px 18px',
            margin: '-18px 16px 0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            position: 'relative',
            zIndex: 2,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.5s ease-out 0.5s',
          }}
        >
          <div className="flex items-center justify-between">
            <p style={{ fontSize: 12, color: '#999' }}>Haftalık Puan Barajı</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A' }}>
              1.730 <span style={{ fontSize: 12, fontWeight: 500, color: '#8E8E8E' }}>/ 2.000</span>
            </p>
          </div>
          <div style={{ marginTop: 10, height: 7, borderRadius: 4, background: '#F0F0F0' }}>
            <div style={{ height: '100%', width: `${progressWidth}%`, background: '#F5C518', borderRadius: 4, transition: 'width 1s ease-out 0.8s' }} />
          </div>
          <div className="flex justify-between items-start" style={{ marginTop: 8, padding: '0 4px' }}>
            {[
              { val: 500, reached: true },
              { val: 1000, reached: true },
              { val: 1500, reached: true },
              { val: 2000, reached: false },
            ].map((m) => (
              <div key={m.val} className="flex flex-col items-center" style={{ width: 34 }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: m.reached ? '#F5C518' : '#E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: m.val === 2000 ? 10 : 8,
                    color: m.reached ? '#FFF' : '#999',
                    fontWeight: 700,
                  }}
                >
                  {m.reached ? '✓' : '🎁'}
                </div>
                <span style={{ fontSize: 9, color: '#999', marginTop: 2 }}>
                  {m.val >= 1000 ? `${m.val / 1000}.000` : m.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TWO REWARD CARDS SIDE BY SIDE ── */}
        <div
          className="flex gap-2.5"
          style={{
            padding: '14px 16px 0',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.5s ease-out 0.7s',
          }}
        >
          {/* HEDİYE card */}
          <div
            className="flex-1 flex flex-col items-center justify-center text-center"
            style={{
              background: '#FFF8E7',
              border: '2px solid #F5C518',
              borderRadius: 18,
              padding: '16px 10px',
            }}
          >
            <span style={{ fontSize: 32 }}>🎁</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A', marginTop: 6 }}>HEDİYE</span>
            <span style={{ fontSize: 10, color: '#8E8E8E', marginTop: 2 }}>Sürpriz ürün</span>
            <div style={{ marginTop: 8, background: '#F5C518', borderRadius: 10, padding: '4px 12px', fontSize: 10, fontWeight: 700, color: '#1A1A1A' }}>
              KAZANILDI ✓
            </div>
          </div>

          {/* İNDİRİM card */}
          <div
            className="flex-1 flex flex-col items-center justify-center text-center"
            style={{
              background: '#F0FFF4',
              border: '2px dashed #4CAF50',
              borderRadius: 18,
              padding: '16px 10px',
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 900, color: '#4CAF50', lineHeight: 1 }}>%10</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A', marginTop: 6 }}>İNDİRİM</span>
            <span style={{ fontSize: 10, color: '#8E8E8E', marginTop: 2 }}>Tüm ürünlerde</span>
            <div style={{ marginTop: 8, background: '#4CAF50', borderRadius: 10, padding: '4px 12px', fontSize: 10, fontWeight: 700, color: '#FFF' }}>
              AKTİF ✓
            </div>
          </div>
        </div>

        {/* ── COUPON CODE CARD ── */}
        <div
          style={{
            margin: '12px 16px 0',
            borderRadius: 18,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.5s ease-out 0.9s',
          }}
        >
          <div style={{ background: '#FFFFFF', padding: '14px 18px' }}>
            <p style={{ fontSize: 11, color: '#999' }}>Kupon Kodu</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', letterSpacing: 3, fontFamily: 'monospace', marginTop: 4 }}>
              XSD-7K2M-9P4Q
            </p>
          </div>
          <div style={{ borderTop: '2px dashed #E8E0C8' }} />
          <div style={{ background: '#FFFDF0', padding: '12px 18px' }} className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: 10, color: '#8E8E8E' }}>⏰ Son Kullanım: 7 gün</p>
            </div>
            <button
              onClick={handleCopy}
              className="active:scale-[0.95] transition-all duration-200"
              style={{
                background: '#F5C518',
                borderRadius: 10,
                padding: '7px 14px',
                fontSize: 12,
                fontWeight: 700,
                color: '#1A1A1A',
                whiteSpace: 'nowrap',
              }}
            >
              {copied ? '✓ Kopyalandı!' : '📋 Kopyala'}
            </button>
          </div>
        </div>

        {/* ── STORE LIST ── */}
        <div
          style={{
            margin: '16px 16px 0',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.5s ease-out 1.1s',
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>📍 Yakın Mağazalar</h3>
            <button style={{ fontSize: 11, fontWeight: 600, color: '#F5C518' }}>Tümünü Gör</button>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            {[
              { name: 'XSIDE Bağdat Caddesi', dist: '1.2 km', stock: 'STOKTA ✓', color: '#4CAF50', bg: '#E8F5E9' },
              { name: 'XSIDE Kadıköy', dist: '2.8 km', stock: 'SINIRLI STOK', color: '#FF6B35', bg: '#FFF3E0' },
            ].map((store, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{ padding: '12px 14px', borderBottom: i === 0 ? '1px solid #F5F5F5' : 'none' }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 38, height: 38, borderRadius: 8, background: '#F5C518', fontSize: 13, fontWeight: 800, color: '#1A1A1A' }}
                >
                  X
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{store.name}</p>
                  <p style={{ fontSize: 11, color: '#8E8E8E' }}>{store.dist}</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: store.color, background: store.bg, borderRadius: 6, padding: '3px 7px' }}>
                  {store.stock}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FIXED BOTTOM ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px 16px',
          background: 'linear-gradient(transparent, #FAFAFA 20%)',
        }}
      >
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center active:scale-[0.96] transition-all duration-200"
          style={{
            height: 54,
            borderRadius: 27,
            background: '#F5C518',
            fontSize: 15,
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: 1,
            boxShadow: '0 8px 24px rgba(245,197,24,0.45)',
          }}
        >
          🛍 MAĞAZADA KULLAN
        </button>
        <button
          onClick={onGoHome}
          className="w-full active:scale-[0.97] transition-all duration-200"
          style={{ marginTop: 8, fontSize: 13, color: '#999', textAlign: 'center', background: 'none', border: 'none' }}
        >
          Ana Sayfaya Dön
        </button>
      </div>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(720px) rotate(600deg); opacity: 0; }
        }
        @keyframes giftBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
