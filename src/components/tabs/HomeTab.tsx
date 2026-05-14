import { Bell, Search } from 'lucide-react';
import StoriesBar from '../StoriesBar';
import HeroBanner from '../HeroBanner';

const recommendations = [
  {
    id: 1,
    title: 'Sana Özel Kombin',
    items: [
      { img: new URL('../../assets/croptop.png', import.meta.url).href, name: 'Crop Top' },
      { img: new URL('../../assets/wideleg.png', import.meta.url).href, name: 'Wide Leg Jean' },
      { img: new URL('../../assets/canta.png', import.meta.url).href, name: 'Çanta' },
    ],
  },
];

const xsideProducts = [
  { id: 1, img: new URL('../../assets/hoodie.png', import.meta.url).href, name: 'Hoodie' },
  { id: 2, img: new URL('../../assets/snaker.png', import.meta.url).href, name: 'Sneaker' },
  { id: 3, img: new URL('../../assets/ceket.png', import.meta.url).href, name: 'Ceket' },
  { id: 4, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a20?w=150&h=180&fit=crop', name: 'T-shirt' },
  { id: 5, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=180&fit=crop', name: 'Pantolon' },
];

const newSeason = [
  { id: 1, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop', name: 'Sarı Takım', price: '499,99 ₺' },
  { id: 2, img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop', name: 'Oversize Tee', price: '279,99 ₺' },
  { id: 3, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=400&fit=crop', name: 'Cargo Jogger', price: '549,99 ₺' },
  { id: 4, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop', name: 'Bomber Ceket', price: '749,99 ₺' },
];

const bayramPicks = [
  { id: 1, img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop', name: 'Bayramlık Set', price: '899,99 ₺', badge: 'Bayram Özel' },
  { id: 2, img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop', name: 'Şık Kombin', price: '699,99 ₺', badge: 'Bayram Özel' },
  { id: 3, img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop', name: 'Elegant Look', price: '599,99 ₺', badge: null },
];

interface Props {
  onNotifications: () => void;
  onAction?: (action: string) => void;
  onStoryOverlay?: (active: boolean) => void;
}

export default function HomeTab({ onNotifications, onAction, onStoryOverlay }: Props) {
  return (
    <div className="pb-8" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ background: '#FFFFFF', padding: '4px 20px 6px' }}
      >
        <h1 style={{ fontSize: 19, fontWeight: 800, color: '#1A1A1A', letterSpacing: -0.3 }}>
          <span style={{ color: '#F5C518', fontWeight: 900 }}>X</span>SIDE
        </h1>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          >
            <Search size={18} strokeWidth={1.8} color="#1A1A1A" />
          </button>
          <button
            onClick={onNotifications}
            className="relative flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          >
            <Bell size={18} strokeWidth={1.8} color="#1A1A1A" />
            <div
              className="absolute"
              style={{ top: 2, right: 3, width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }}
            />
          </button>
        </div>
      </div>

      {/* Stories */}
      <div style={{ background: '#FFFFFF' }}>
        <StoriesBar onOverlayChange={onStoryOverlay} />
      </div>

      {/* Hero Banner */}
      <HeroBanner onAction={onAction} />

      <div style={{ height: 16 }} />

      {/* Section 1 - Sana Özel Kombin */}
      {recommendations.map((rec) => (
        <div key={rec.id} style={{ padding: '0 16px', marginBottom: 24 }}>
          <div className="flex items-center gap-1.5" style={{ marginBottom: 12 }}>
            <span>⚡</span>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>{rec.title}</h3>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <div className="flex gap-3 items-end">
              {rec.items.map((item, i) => {
                const isFeatured = i === 1;
                return (
                  <div key={i} className="flex-1" style={{ transform: isFeatured ? 'scale(1.05)' : undefined, zIndex: isFeatured ? 1 : 0 }}>
                    <div style={{ aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', background: '#F5F5F5' }}>
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 500, color: '#8E8E8E', textAlign: 'center', marginTop: 6 }}>{item.name}</p>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16 }}>
              <button
                className="w-full flex items-center justify-center gap-2 active:scale-[0.96] transition-all duration-200"
                style={{
                  height: 48,
                  borderRadius: 50,
                  background: '#F5C518',
                  color: '#1A1A1A',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase' as const,
                  boxShadow: '0px 6px 20px rgba(245, 197, 24, 0.4)',
                }}
              >
                KOMBİNİ KEŞFET
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Section 2 - XSIDE Ürünleri */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>XSIDE Ürünleri</h3>
          <button style={{ fontSize: 13, fontWeight: 600, color: '#F5C518' }}>Tümünü Gör</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {xsideProducts.map((p) => (
            <div key={p.id} style={{ minWidth: 100 }}>
              <div style={{ width: 100, height: 120, borderRadius: 10, overflow: 'hidden', background: '#F5F5F5' }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p style={{ fontSize: 11, fontWeight: 500, color: '#8E8E8E', textAlign: 'center', marginTop: 6 }}>{p.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 - YENİ SEZON */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>🌱 YENİ SEZON</h3>
          <button style={{ fontSize: 13, fontWeight: 600, color: '#F5C518' }}>Tümünü Gör</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {newSeason.map((item) => (
            <div key={item.id}>
              <div className="relative" style={{ height: 160, borderRadius: 12, overflow: 'hidden', background: '#F5F5F5' }}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                <div
                  className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
                  style={{ height: '50%', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: 10 }}
                >
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>{item.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 - BAYRAM */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{ background: '#FFFBF0', borderRadius: 12, padding: 16, marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>🎊 BAYRAM KOLEKSİYONU</h3>
          <p style={{ fontSize: 12, color: '#8E8E8E', marginTop: 4 }}>Bayrama özel seçilmiş parçalar</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {bayramPicks.map((item) => (
            <div key={item.id}>
              <div className="relative" style={{ height: 160, borderRadius: 12, overflow: 'hidden', background: '#F5F5F5' }}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                {item.badge && (
                  <span
                    className="absolute"
                    style={{
                      top: 8,
                      left: 8,
                      background: '#F5C518',
                      color: '#1A1A1A',
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 20,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <div
                  className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
                  style={{ height: '50%', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: 10 }}
                >
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>{item.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
