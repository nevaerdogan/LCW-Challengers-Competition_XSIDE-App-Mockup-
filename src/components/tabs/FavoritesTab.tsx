import { useState } from 'react';

const favorites = [
  { id: 1, name: 'Crop Top', price: '199,99 ₺', oldPrice: '299,99 ₺', size: 'S', color: 'Beyaz', emoji: '👚', img: 'croptop' },
  { id: 2, name: 'Wide Leg Jean', price: '449,99 ₺', oldPrice: null, size: 'M', color: 'Mavi', emoji: '👖', img: 'wideleg' },
  { id: 3, name: 'Hoodie', price: '349,99 ₺', oldPrice: '499,99 ₺', size: 'L', color: 'Mor', emoji: '🧥', img: 'hoodie' },
  { id: 4, name: 'Sneaker', price: '599,99 ₺', oldPrice: null, size: '38', color: 'Gri', emoji: '👟', img: 'snaker' },
  { id: 5, name: 'Çanta', price: '279,99 ₺', oldPrice: '399,99 ₺', size: '-', color: 'Kahve', emoji: '👜', img: 'canta' },
  { id: 6, name: 'Ceket', price: '549,99 ₺', oldPrice: null, size: 'M', color: 'Yeşil', emoji: '🧥', img: 'ceket' },
];

const getImg = (name: string) => new URL(`../../assets/${name}.png`, import.meta.url).href;

export default function FavoritesTab() {
  const [items, setItems] = useState(favorites);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);

  const removeItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const addToCart = (id: number) => {
    setAddedToCart([...addedToCart, id]);
    setTimeout(() => setAddedToCart(addedToCart.filter((i) => i !== id)), 1500);
  };

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '8px 16px 12px' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A' }}>Favorilerim ❤️</h2>
          <p style={{ fontSize: 12, color: '#8E8E8E', marginTop: 2 }}>{items.length} ürün favorilerinde</p>
        </div>
        {items.length > 0 && (
          <button
            style={{ fontSize: 12, fontWeight: 600, color: '#F5C518', background: '#FFFBEC', borderRadius: 10, padding: '6px 12px' }}
          >
            Tümünü Ekle 🛒
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: 56 }}>💛</span>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginTop: 12 }}>Henüz favori yok</p>
          <p style={{ fontSize: 13, color: '#8E8E8E', marginTop: 4 }}>Beğendiğin ürünleri kalp ile işaretle</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3" style={{ padding: '0 12px' }}>
          {items.map((item) => {
            const inCart = addedToCart.includes(item.id);
            return (
              <div
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: 160, background: '#F5F5F5' }}>
                  <img
                    src={getImg(item.img)}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {/* Remove heart */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute active:scale-[0.9] transition-all duration-200"
                    style={{
                      top: 8,
                      right: 8,
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      background: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(4px)',
                      fontSize: 14,
                    }}
                  >
                    ❤️
                  </button>
                  {/* Discount badge */}
                  {item.oldPrice && (
                    <div
                      className="absolute"
                      style={{
                        top: 8,
                        left: 8,
                        background: '#FF4757',
                        borderRadius: 8,
                        padding: '2px 8px',
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#FFF',
                      }}
                    >
                      İNDİRİM
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '10px 12px 12px' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{item.name}</p>
                  <div className="flex items-center gap-1" style={{ marginTop: 2 }}>
                    <span style={{ fontSize: 9, color: '#8E8E8E' }}>{item.color}</span>
                    <span style={{ fontSize: 9, color: '#D0D0D0' }}>•</span>
                    <span style={{ fontSize: 9, color: '#8E8E8E' }}>Beden: {item.size}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ marginTop: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A' }}>{item.price}</span>
                    {item.oldPrice && (
                      <span style={{ fontSize: 11, color: '#BABABA', textDecoration: 'line-through' }}>{item.oldPrice}</span>
                    )}
                  </div>

                  {/* Add to cart button */}
                  <button
                    onClick={() => addToCart(item.id)}
                    className="w-full flex items-center justify-center gap-1.5 active:scale-[0.96] transition-all duration-200"
                    style={{
                      marginTop: 8,
                      height: 36,
                      borderRadius: 12,
                      background: inCart ? '#4CAF50' : '#F5C518',
                      fontSize: 12,
                      fontWeight: 700,
                      color: inCart ? '#FFF' : '#1A1A1A',
                    }}
                  >
                    {inCart ? '✓ Eklendi' : '🛒 Sepete Ekle'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
