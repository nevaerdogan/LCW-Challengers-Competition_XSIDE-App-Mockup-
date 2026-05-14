import { useState } from 'react';

const menuGroups = [
  {
    items: [
      { emoji: '📦', label: 'Siparişlerim', bg: '#FFF8E7', badge: '2', badgeBg: '#FF6B35' },
      { emoji: '📍', label: 'Adreslerim', bg: '#F0FFF4', badge: null },
      { emoji: '💳', label: 'Ödeme Yöntemlerim', bg: '#F0F4FF', badge: null },
    ],
  },
  {
    items: [
      { emoji: '⭐', label: 'Değerlendirmelerim', bg: '#FFF0F0', badge: null },
      { emoji: '🔔', label: 'Bildirim Ayarları', bg: '#F5F0FF', badge: null },
      { emoji: '⚙️', label: 'Ayarlar', bg: '#F5F5F5', badge: null },
    ],
  },
];

export default function ProfileTab() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100%', paddingBottom: 100 }}>
      {/* Dark header */}
      <div
        style={{
          background: '#1A1A1A',
          borderRadius: '0 0 28px 28px',
          paddingTop: 16,
          paddingBottom: 24,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div className="flex items-center">
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                background: '#F5C518',
                border: '3px solid rgba(255,255,255,0.2)',
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 700, color: '#FFF' }}>NE</span>
            </div>
            <div
              className="absolute flex items-center justify-center"
              style={{
                bottom: -2,
                right: -2,
                width: 22,
                height: 22,
                borderRadius: 11,
                background: '#F5C518',
                border: '2px solid #1A1A1A',
                fontSize: 10,
              }}
            >
              📷
            </div>
          </div>

          {/* Info */}
          <div style={{ marginLeft: 14, flex: 1 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#FFF' }}>Neva E.</p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>xside@email.com</p>
            <button style={{ fontSize: 12, color: '#F5C518', fontWeight: 600, marginTop: 4 }}>
              Profili Düzenle ›
            </button>
          </div>

          {/* Bell */}
          <button style={{ position: 'relative' }}>
            <span style={{ fontSize: 22, color: '#FFF' }}>🔔</span>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 4, background: '#EF4444', border: '1.5px solid #1A1A1A' }} />
          </button>
        </div>
      </div>

      {/* XSIDE Club Card */}
      <div
        style={{
          margin: '-20px 16px 0',
          background: '#F5C518',
          borderRadius: 20,
          padding: '16px 20px',
          boxShadow: '0 8px 24px rgba(245,197,24,0.4)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', letterSpacing: 1.5 }}>⭐ XSIDE CLUB</span>
          <span style={{ background: '#1A1A1A', color: '#F5C518', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>GOLD</span>
        </div>
        <div className="flex items-end justify-between" style={{ marginTop: 10 }}>
          <div>
            <p style={{ fontSize: 11, color: '#666' }}>Puan Bakiyesi</p>
            <p style={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A' }}>1.250 ⭐</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: '#666' }}>Üyelik No</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', fontFamily: 'monospace' }}>XS-2026-0847</p>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#666' }}>Sonraki: PLATINUM</span>
            <span style={{ fontSize: 11, color: '#666' }}>250 puan kaldı</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.15)' }}>
            <div style={{ width: '83%', height: '100%', borderRadius: 3, background: '#1A1A1A' }} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          margin: '10px 16px 0',
          background: '#FFFFFF',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex">
          {[
            { num: '12', label: 'Sipariş', dot: false },
            { num: '3', label: 'Favori', dot: false },
            { num: '5', label: 'Kupon', dot: true },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex-1 text-center"
              style={{ borderRight: i < 2 ? '1px solid #F0F0F0' : 'none' }}
            >
              <div className="flex items-center justify-center gap-1">
                <span style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>{s.num}</span>
                {s.dot && <div style={{ width: 6, height: 6, borderRadius: 3, background: '#F5C518' }} />}
              </div>
              <p style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu groups */}
      <div style={{ marginTop: 16, padding: '0 16px' }}>
        {menuGroups.map((group, gi) => (
          <div
            key={gi}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              marginBottom: 12,
            }}
          >
            {group.items.map((item, ii) => (
              <button
                key={item.label}
                className="w-full flex items-center active:bg-gray-50 transition-colors duration-150"
                style={{
                  height: 52,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderBottom: ii < group.items.length - 1 ? '1px solid #F8F8F8' : 'none',
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 34, height: 34, borderRadius: 17, background: item.bg, marginRight: 12, fontSize: 16 }}
                >
                  {item.emoji}
                </div>
                <span style={{ flex: 1, fontSize: 14, color: '#1A1A1A', textAlign: 'left' }}>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      background: item.badgeBg,
                      color: '#FFF',
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: 8,
                      padding: '2px 8px',
                      marginRight: 8,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <span style={{ fontSize: 16, color: '#BABABA' }}>›</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Çıkış Yap */}
      <div style={{ padding: '0 16px', marginTop: 4, marginBottom: 24 }}>
        <button
          onClick={() => setShowLogout(true)}
          className="w-full flex items-center justify-center gap-2 active:scale-[0.97] transition-all duration-200"
          style={{
            height: 52,
            borderRadius: 28,
            background: 'transparent',
            border: '1.5px solid #FF4757',
            fontSize: 15,
            fontWeight: 700,
            color: '#FF4757',
          }}
        >
          ↪ Çıkış Yap
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showLogout && (
        <div
          className="absolute inset-0 z-[70] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <div style={{ background: '#FFF', borderRadius: 24, padding: 24, margin: '0 32px', width: '100%', maxWidth: 300 }}>
            <p className="text-center" style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>
              Çıkış yapmak istediğinden emin misin?
            </p>
            <div className="flex gap-3" style={{ marginTop: 20 }}>
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 active:scale-[0.96] transition-all duration-200"
                style={{ height: 44, borderRadius: 14, background: '#F0F0F0', fontSize: 14, fontWeight: 600, color: '#666' }}
              >
                İptal
              </button>
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 active:scale-[0.96] transition-all duration-200"
                style={{ height: 44, borderRadius: 14, background: '#FF4757', fontSize: 14, fontWeight: 700, color: '#FFF' }}
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
