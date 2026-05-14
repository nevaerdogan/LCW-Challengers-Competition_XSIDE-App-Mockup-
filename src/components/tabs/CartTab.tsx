import { useState, useRef, useCallback } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  colorHex: string;
  qty: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Oversize Graphic Tee',
    price: 299.99,
    size: 'M',
    color: 'Siyah',
    colorHex: '#1A1A1A',
    qty: 1,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Cargo Jogger',
    price: 549.99,
    size: 'L',
    color: 'Haki',
    colorHex: '#6B7B3A',
    qty: 2,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=400&fit=crop',
  },
];

function formatPrice(n: number): string {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
}

function SwipeableCard({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const [offset, setOffset] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    if (diff < 0) {
      setOffset(Math.max(diff, -100));
    } else if (offset < 0) {
      setOffset(Math.min(0, offset + diff));
    }
  }, [offset]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (offset < -60) {
      setOffset(-80);
    } else {
      setOffset(0);
    }
  }, [offset]);

  return (
    <div style={{ position: 'relative', marginLeft: 16, marginRight: 16, marginBottom: 10, borderRadius: 16, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: 80,
          background: '#FF4757',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button onClick={onDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <span style={{ fontSize: 24 }}>🗑</span>
        </button>
      </div>

      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          transform: `translateX(${offset}px)`,
          transition: isDragging.current ? 'none' : 'transform 0.3s ease',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function CartTab() {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const discount = couponApplied ? 50 : 0;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal - discount;
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  const updateQty = (id: number, delta: number) => {
    setItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
        .filter(item => item.qty > 0)
    );
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.trim().length > 0) {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#FAFAFA' }}>
        <span style={{ fontSize: 64 }}>🛍</span>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginTop: 16 }}>Sepetin boş</p>
        <p style={{ fontSize: 14, color: '#999', marginTop: 6 }}>Beğendiğin ürünleri ekle</p>
        <button
          className="active:scale-[0.95] transition-all duration-200"
          style={{
            marginTop: 24,
            background: '#F5C518',
            borderRadius: 24,
            padding: '12px 32px',
            fontSize: 15,
            fontWeight: 700,
            color: '#1A1A1A',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(245,197,24,0.35)',
          }}
        >
          Keşfetmeye Başla
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FAFAFA' }}>
      {/* HEADER */}
      <div style={{ padding: '12px 16px 12px', background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>Sepetim</h2>
        <div style={{
          width: 24, height: 24, borderRadius: '50%', background: '#F5C518',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#1A1A1A',
        }}>
          {itemCount}
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 110 }}>
        {/* PRODUCT CARDS */}
        {items.map(item => (
          <SwipeableCard key={item.id} onDelete={() => deleteItem(item.id)}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: 16,
              padding: 12,
              boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
              display: 'flex',
              flexDirection: 'row',
              gap: 0,
            }}>
              {/* LEFT — Image */}
              <div style={{
                width: 80, height: 88, borderRadius: 12,
                background: '#F5F5F5', overflow: 'hidden', flexShrink: 0,
              }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>

              {/* MIDDLE — Info */}
              <div style={{ flex: 1, marginLeft: 12, marginRight: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    fontSize: 14, fontWeight: 700, color: '#1A1A1A', margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {item.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.colorHex, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#999' }}>{item.color} · {item.size}</span>
                  </div>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', margin: 0, marginTop: 8 }}>
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* RIGHT — Delete + Quantity */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: 36 }}>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="active:scale-[0.9] transition-all duration-150"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, lineHeight: 1 }}
                >
                  <span style={{ fontSize: 16, opacity: 0.35 }}>🗑</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="active:scale-[0.9] transition-all duration-150"
                    style={{
                      width: 28, height: 28, borderRadius: 14,
                      background: '#F5F5F5', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, color: '#1A1A1A', fontWeight: 600,
                    }}
                  >
                    −
                  </button>
                  <span style={{ width: 28, textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="active:scale-[0.9] transition-all duration-150"
                    style={{
                      width: 28, height: 28, borderRadius: 14,
                      background: '#F5C518', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, color: '#1A1A1A', fontWeight: 600,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </SwipeableCard>
        ))}

        {/* KUPON KODU */}
        <div style={{
          marginLeft: 16, marginRight: 16, marginTop: 4,
          background: '#FFFFFF', borderRadius: 16, padding: '14px 16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
        }}>
          <button
            onClick={() => setCouponOpen(!couponOpen)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🏷</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>Kupon Kodu</span>
              {couponApplied && (
                <span style={{ fontSize: 11, fontWeight: 600, color: '#4CAF50', background: '#E8F5E9', borderRadius: 8, padding: '2px 8px' }}>
                  Uygulandı ✓
                </span>
              )}
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#F5C518' }}>
              {couponOpen ? 'Kapat' : 'Ekle ›'}
            </span>
          </button>

          <div style={{
            maxHeight: couponOpen ? 52 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
            marginTop: couponOpen ? 12 : 0,
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder="Kupon kodunu gir"
                style={{
                  flex: 1, height: 40, borderRadius: 10, background: '#F5F5F5',
                  border: 'none', padding: '0 14px', fontSize: 14, color: '#1A1A1A',
                  outline: 'none',
                }}
              />
              <button
                onClick={applyCoupon}
                className="active:scale-[0.95] transition-all duration-150"
                style={{
                  background: '#F5C518', border: 'none', borderRadius: 10,
                  padding: '0 16px', fontSize: 13, fontWeight: 700, color: '#1A1A1A',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                Uygula
              </button>
            </div>
          </div>
        </div>

        {/* SİPARİŞ ÖZETİ */}
        <div style={{
          marginLeft: 16, marginRight: 16, marginTop: 12,
          background: '#FFFFFF', borderRadius: 16, padding: '16px 20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 36 }}>
            <span style={{ fontSize: 13, color: '#666' }}>Ara Toplam</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{formatPrice(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 36 }}>
            <span style={{ fontSize: 13, color: '#666' }}>Kargo</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#4CAF50' }}>Ücretsiz 🎉</span>
          </div>
          {couponApplied && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 36 }}>
              <span style={{ fontSize: 13, color: '#666' }}>İndirim</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#FF4757' }}>-{formatPrice(discount)}</span>
            </div>
          )}
          <div style={{ height: 1, background: '#F0F0F0', margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 36 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>TOPLAM</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{formatPrice(total)}</span>
          </div>
        </div>

        <div style={{ height: 16 }} />
      </div>

      {/* FIXED BOTTOM — SİPARİŞİ TAMAMLA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#FAFAFA', borderTop: '1px solid #F0F0F0',
        padding: '12px 16px 28px',
      }}>
        <button
          className="active:scale-[0.96] transition-all duration-200"
          style={{
            width: '100%', height: 56, borderRadius: 28,
            background: '#F5C518', border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(245,197,24,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', letterSpacing: 0.5 }}>Siparişi Tamamla</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', letterSpacing: 0.5 }}>{formatPrice(total)}</span>
        </button>
      </div>
    </div>
  );
}
