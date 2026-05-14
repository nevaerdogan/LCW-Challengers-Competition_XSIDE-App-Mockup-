import { Heart, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'ai', emoji: '🤖', label: 'Asistan' },
  { id: 'favorites', icon: Heart, label: 'Favoriler' },
  { id: 'home', label: '' },
  { id: 'cart', icon: ShoppingBag, label: 'Sepetim' },
  { id: 'profile', icon: User, label: 'Hesabım' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40"
      style={{
        background: '#FFFFFF',
        height: 72,
        boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <div className="flex items-center justify-around h-full px-2 pb-2">
        {tabs.map(({ id, icon: Icon, emoji, label }) => {
          if (id === 'home') {
            return (
              <button
                key={id}
                onClick={() => onTabChange('home')}
                className="flex items-center justify-center active:scale-[0.92] transition-all duration-200"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#F5C518',
                  marginTop: -18,
                  boxShadow: '0 4px 16px rgba(245,197,24,0.45)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" fill="#1A1A1A" />
                  <rect x="9" y="14" width="6" height="8" rx="1" fill="#F5C518" />
                </svg>
              </button>
            );
          }

          const isActive = activeTab === id;

          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex flex-col items-center gap-[3px] transition-all duration-200"
              style={{ minWidth: 50 }}
            >
              {emoji ? (
                <span style={{ fontSize: 22, opacity: isActive ? 1 : 0.5 }}>{emoji}</span>
              ) : Icon ? (
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.5}
                  color={isActive ? '#F5C518' : '#8E8E8E'}
                />
              ) : null}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#F5C518' : '#8E8E8E',
                  letterSpacing: 0.3,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
