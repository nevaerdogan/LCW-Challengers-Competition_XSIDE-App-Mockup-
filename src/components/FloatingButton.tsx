import { useState, useEffect } from 'react';

interface Props {
  onTap: () => void;
  bottomOffset?: number;
}

const modes = [
  { emoji: '✏️', label: 'QUIZ' },
  { emoji: '🎮', label: 'OYUN' },
];

export default function FloatingButton({ onTap, bottomOffset = 86 }: Props) {
  const [modeIndex, setModeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setModeIndex((prev) => (prev + 1) % modes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const mode = modes[modeIndex];

  return (
    <button
      onClick={onTap}
      className="absolute z-50 flex flex-col items-center justify-center active:scale-[0.9] transition-all duration-300"
      style={{
        bottom: bottomOffset,
        right: 16,
        width: 58,
        height: 58,
        borderRadius: '50%',
        background: '#F5C518',
        boxShadow: '0 6px 20px rgba(245,197,24,0.5)',
        animation: 'floatBtn 3s ease-in-out infinite',
      }}
    >
      <span style={{ fontSize: 20, lineHeight: 1, transition: 'all 0.3s ease' }}>{mode.emoji}</span>
      <span style={{ fontSize: 8, fontWeight: 800, color: '#1A1A1A', letterSpacing: 0.5, marginTop: 1 }}>{mode.label}</span>
      <style>{`
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </button>
  );
}
