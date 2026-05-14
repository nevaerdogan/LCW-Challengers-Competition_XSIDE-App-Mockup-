import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

type TabType = 'all' | 'orders' | 'recommendations' | 'discounts' | 'special';

const tabList: { id: TabType; label: string }[] = [
  { id: 'all', label: 'Tümü' },
  { id: 'orders', label: 'Siparişler' },
  { id: 'recommendations', label: 'Öneriler' },
  { id: 'discounts', label: 'İndirimler' },
  { id: 'special', label: 'Özel Günler' },
];

const notifications = [
  {
    id: 1,
    type: 'orders' as const,
    iconEmoji: '📦',
    iconBg: '#DBEAFE',
    title: 'Siparişin kargoya verildi 📦',
    subtitle: 'XS-2026-0847 numaralı sipariş yola çıktı',
    time: '2 dk önce',
    unread: true,
  },
  {
    id: 2,
    type: 'recommendations' as const,
    iconEmoji: '✨',
    iconBg: '#FEF3C7',
    title: 'Sana özel 5 yeni kombin var ✨',
    subtitle: 'Stil quizine göre hazırlanan yeni öneriler',
    time: '15 dk önce',
    unread: true,
  },
  {
    id: 3,
    type: 'discounts' as const,
    iconEmoji: '🔥',
    iconBg: '#FEE2E2',
    title: 'Favorindeki ürün %30 indirime girdi 🔥',
    subtitle: 'Cargo Jogger şimdi 384,99 ₺',
    time: '1 saat önce',
    unread: true,
  },
  {
    id: 4,
    type: 'special' as const,
    iconEmoji: '🎂',
    iconBg: '#EDE9FE',
    title: 'Doğum günün yaklaşıyor 🎂',
    subtitle: 'Sana özel hediye kuponu hazırladık',
    time: '3 saat önce',
    unread: true,
  },
  {
    id: 5,
    type: 'orders' as const,
    iconEmoji: '✅',
    iconBg: '#DBEAFE',
    title: 'Siparişin teslim edildi',
    subtitle: 'Oversize Graphic Tee siparişin tamamlandı',
    time: '2 gün önce',
    unread: false,
  },
  {
    id: 6,
    type: 'recommendations' as const,
    iconEmoji: '💡',
    iconBg: '#FEF3C7',
    title: 'Yeni kombin önerisi',
    subtitle: 'Son aldığın ürünlerle harika bir kombin!',
    time: 'Dün',
    unread: false,
  },
  {
    id: 7,
    type: 'discounts' as const,
    iconEmoji: '🏷️',
    iconBg: '#FEE2E2',
    title: '%25 indirim fırsatı!',
    subtitle: 'Geçen siparişteki Cargo Jogger için özel teklif',
    time: '3 gün önce',
    unread: false,
  },
];

export default function NotificationsSheet({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeTab);

  return (
    <div className="absolute inset-0 z-[60] flex flex-col" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: '56px 16px 12px', background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>Bildirimler</h2>
        <button
          onClick={onClose}
          className="flex items-center justify-center"
          style={{ width: 32, height: 32, borderRadius: 12, background: '#F5F5F5' }}
        >
          <X size={18} color="#8E8E8E" />
        </button>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-2 overflow-x-auto"
        style={{ padding: '12px 16px', background: '#FFFFFF', scrollbarWidth: 'none' }}
      >
        {tabList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="whitespace-nowrap transition-all duration-200"
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: activeTab === tab.id ? 700 : 500,
              background: activeTab === tab.id ? '#F5C518' : '#F5F5F5',
              color: activeTab === tab.id ? '#1A1A1A' : '#8E8E8E',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '8px 16px 32px' }}>
        {filtered.map((n) => (
          <div
            key={n.id}
            className="flex gap-3"
            style={{
              padding: 12,
              marginBottom: 8,
              borderRadius: 12,
              background: '#FFFFFF',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              borderLeft: n.unread ? '3px solid #F5C518' : '3px solid transparent',
            }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 40, height: 40, borderRadius: '50%', background: n.iconBg }}
            >
              <span style={{ fontSize: 18 }}>{n.iconEmoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p style={{ fontSize: 14, fontWeight: n.unread ? 700 : 600, color: '#1A1A1A', lineHeight: 1.3 }}>
                  {n.title}
                </p>
                <span style={{ fontSize: 10, color: '#8E8E8E', flexShrink: 0, marginTop: 2 }}>{n.time}</span>
              </div>
              <p style={{ fontSize: 12, color: '#8E8E8E', marginTop: 2, lineHeight: 1.4 }}>{n.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
