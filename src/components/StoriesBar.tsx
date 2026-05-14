import { useState } from 'react';

const stories = [
  {
    id: '1',
    name: 'senaa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    ring: true,
    storyImg: new URL('../assets/sena.png', import.meta.url).href,
    products: [
      { name: 'Crop Top Siyah', price: '199,99 ₺', emoji: '🖤' },
      { name: 'Wide Leg Jean', price: '349,99 ₺', emoji: '👖' },
      { name: 'Platform Sneaker', price: '599,99 ₺', emoji: '👟' },
    ],
  },
  {
    id: '2',
    name: 'zeynep.sr',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    ring: true,
    storyImg: new URL('../assets/zeynep.png', import.meta.url).href,
    products: [
      { name: 'Oversize Blazer', price: '799,99 ₺', emoji: '🧥' },
      { name: 'Mini Etek', price: '249,99 ₺', emoji: '💜' },
      { name: 'Şapka', price: '129,99 ₺', emoji: '🧢' },
      { name: 'Çanta', price: '449,99 ₺', emoji: '👜' },
    ],
  },
  {
    id: '3',
    name: 'denizkaya',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    ring: true,
    storyImg: new URL('../assets/deniz.png', import.meta.url).href,
    products: [
      { name: 'Yelek', price: '499,99 ₺', emoji: '🧥' },
      { name: 'Beyaz Tişört', price: '149,99 ₺', emoji: '👚' },
      { name: 'Etek', price: '299,99 ₺', emoji: '👗' },
    ],
  },
  {
    id: '4',
    name: 'ecemstyl',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    ring: true,
    storyImg: new URL('../assets/ecem.png', import.meta.url).href,
    products: [
      { name: 'Gri Kazak', price: '349,99 ₺', emoji: '🧶' },
      { name: 'Jogger Pantolon', price: '329,99 ₺', emoji: '👖' },
      { name: 'Sneaker', price: '549,99 ₺', emoji: '👟' },
    ],
  },
  {
    id: '5',
    name: 'gizemm',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop',
    ring: true,
    storyImg: new URL('../assets/gizem.png', import.meta.url).href,
    products: [
      { name: 'Saten Bluz', price: '299,99 ₺', emoji: '👚' },
      { name: 'Palazzo Pantolon', price: '449,99 ₺', emoji: '👖' },
    ],
  },
  {
    id: '6',
    name: 'ayse.style',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    ring: true,
    storyImg: new URL('../assets/ayse.png', import.meta.url).href,
    products: [
      { name: 'Çiçekli Elbise', price: '449,99 ₺', emoji: '👗' },
      { name: 'Bej Çanta', price: '349,99 ₺', emoji: '👜' },
    ],
  },
];

export default function StoriesBar() {
  const [openStory, setOpenStory] = useState<string | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  const activeStory = stories.find((s) => s.id === openStory);

  return (
    <>
      <div className="pt-1 pb-2">
        <div className="flex gap-3 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {stories.map((s) => (
            <button
              key={s.id}
              onClick={() => { setOpenStory(s.id); setShowProducts(false); }}
              className="flex flex-col items-center gap-1 min-w-[58px]"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: s.ring ? 'linear-gradient(135deg, #F5C518, #FF8C00)' : '#E5E7EB',
                  padding: 2.5,
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white" style={{ padding: 2 }}>
                  <img src={s.avatar} alt={s.name} className="w-full h-full object-cover rounded-full" loading="lazy" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-[#8E8E8E] truncate w-[58px] text-center">
                {s.name}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Story viewer overlay */}
      {activeStory && !showProducts && (
        <div
          className="flex flex-col"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 70, background: '#000' }}
        >
          {/* Story image — full screen behind everything */}
          <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
            <img src={activeStory.storyImg} alt="" className="w-full h-full object-cover" />
            {/* Top gradient so white text is readable */}
            <div
              className="absolute inset-x-0 top-0"
              style={{ height: 140, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}
            />
          </div>

          {/* Progress bar */}
          <div className="relative z-10 flex gap-1 px-3" style={{ paddingTop: 12 }}>
            {stories.map((s) => (
              <div
                key={s.id}
                className="flex-1"
                style={{ height: 2.5, borderRadius: 2, background: s.id === openStory ? '#FFFFFF' : 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </div>

          {/* User info */}
          <div className="relative z-10 flex items-center gap-3 px-4" style={{ paddingTop: 8, paddingBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid #F5C518' }}>
              <img src={activeStory.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>{activeStory.name}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>2 saat önce</p>
            </div>
            <button
              onClick={() => { setOpenStory(null); setShowProducts(false); }}
              style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: 18 }}
            >
              ✕
            </button>
          </div>

          {/* Navigation areas + Ürünleri Gör */}
          <div className="relative z-10 flex-1 flex">
            <button
              className="w-1/3 h-full"
              onClick={() => {
                const idx = stories.findIndex((s) => s.id === openStory);
                if (idx > 0) setOpenStory(stories[idx - 1].id);
                else setOpenStory(null);
              }}
            />
            <div className="w-1/3" />
            <button
              className="w-1/3 h-full"
              onClick={() => {
                const idx = stories.findIndex((s) => s.id === openStory);
                if (idx < stories.length - 1) setOpenStory(stories[idx + 1].id);
                else setOpenStory(null);
              }}
            />
          </div>

          {/* Ürünleri Gör button */}
          <div className="relative z-10" style={{ padding: '0 16px 20px' }}>
            <button
              onClick={() => setShowProducts(true)}
              className="flex items-center gap-1.5 active:scale-[0.95] transition-all duration-200"
              style={{ background: 'rgba(245,197,24,0.9)', borderRadius: 20, padding: '8px 16px' }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A' }}>🛍️ Ürünleri Gör</span>
            </button>
          </div>
        </div>
      )}

      {/* Products page */}
      {activeStory && showProducts && (
        <div
          className="flex flex-col"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 70, background: '#FAFAFA' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3"
            style={{ padding: '52px 16px 12px', background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <button
              onClick={() => setShowProducts(false)}
              style={{ width: 32, height: 32, borderRadius: 12, background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
            >
              ←
            </button>
            <div className="flex items-center gap-2 flex-1">
              <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', border: '2px solid #F5C518' }}>
                <img src={activeStory.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{activeStory.name}</p>
                <p style={{ fontSize: 10, color: '#8E8E8E' }}>kombinindeki ürünler</p>
              </div>
            </div>
          </div>

          {/* Story preview thumbnail */}
          <div style={{ padding: '16px 16px 8px' }}>
            <div className="flex items-center gap-3" style={{ background: '#FFFFFF', borderRadius: 16, padding: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 64, height: 80, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <img src={activeStory.storyImg} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{activeStory.name}'in Kombini</p>
                <p style={{ fontSize: 11, color: '#8E8E8E', marginTop: 2 }}>{activeStory.products.length} ürün</p>
              </div>
            </div>
          </div>

          {/* Products list */}
          <div className="flex-1 overflow-y-auto" style={{ padding: '8px 16px 24px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#8E8E8E', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
              Ürünler
            </p>
            <div className="space-y-3">
              {activeStory.products.map((p, i) => (
                <div
                  key={i}
                  style={{ background: '#FFFFFF', borderRadius: 16, padding: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{ width: 56, height: 56, borderRadius: 14, background: '#FFF8E1' }}
                    >
                      <span style={{ fontSize: 28 }}>{p.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{p.name}</p>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#F5C518', marginTop: 2 }}>{p.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2" style={{ marginTop: 12 }}>
                    <button
                      className="flex-1 flex items-center justify-center active:scale-[0.96] transition-all duration-200"
                      style={{ height: 42, borderRadius: 50, background: '#F5C518', color: '#1A1A1A', fontSize: 13, fontWeight: 700 }}
                    >
                      Sepete Ekle
                    </button>
                    <button
                      className="flex items-center justify-center active:scale-[0.96] transition-all duration-200"
                      style={{ width: 42, height: 42, borderRadius: 50, border: '1.5px solid #E0E0E0', fontSize: 18 }}
                    >
                      ♡
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
