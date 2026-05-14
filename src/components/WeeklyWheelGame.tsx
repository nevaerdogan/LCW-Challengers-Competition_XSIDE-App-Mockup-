import { useState, useRef } from 'react';

const SEGMENTS = [
  { label: '%5\nİndirim', emoji: '🏷️', color: '#FF6B6B', value: 5 },
  { label: '50\nPuan', emoji: '⭐', color: '#F5C518', value: 50 },
  { label: '%10\nİndirim', emoji: '🎁', color: '#9B59B6', value: 10 },
  { label: '100\nPuan', emoji: '💎', color: '#1ABC9C', value: 100 },
  { label: '%15\nİndirim', emoji: '🔥', color: '#FF4757', value: 15 },
  { label: '200\nPuan', emoji: '👑', color: '#F39C12', value: 200 },
  { label: 'Kargo\nBedava', emoji: '🚀', color: '#3498DB', value: 0 },
  { label: '75\nPuan', emoji: '✨', color: '#E91E63', value: 75 },
];

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

interface Props {
  onClose: () => void;
  onFinish: () => void;
}

export default function WeeklyWheelGame({ onClose, onFinish }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const winner = Math.floor(Math.random() * SEGMENTS.length);
    const fullRotations = 5 + Math.floor(Math.random() * 3);
    const segmentOffset = winner * SEGMENT_ANGLE;
    const finalDeg = fullRotations * 360 + (360 - segmentOffset - SEGMENT_ANGLE / 2);
    setRotation(finalDeg);

    setTimeout(() => {
      setSpinning(false);
      setResult(winner);
    }, 4200);
  };

  const segSize = 280;
  const cx = segSize / 2;
  const cy = segSize / 2;
  const r = segSize / 2 - 4;

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const large = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: centerX + radius * Math.cos(rad), y: centerY + radius * Math.sin(rad) };
  };

  return (
    <div className="absolute inset-0 z-[60] flex flex-col" style={{ background: 'linear-gradient(180deg, #FFF8E1, #FFE0B2)' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '56px 16px 8px' }}>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(243,156,18,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E67E22', fontSize: 16, border: 'none' }}>
          ←
        </button>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#E67E22' }}>HAFTALIK ÇARK 🎡</span>
        <div style={{ width: 32 }} />
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#BF8B2E', marginBottom: 8 }}>Haftada 1 kez çevir, ödülünü kap!</p>

      {/* Wheel */}
      <div className="flex-1 flex flex-col items-center justify-center" style={{ position: 'relative' }}>
        {/* Pointer */}
        <div style={{ position: 'absolute', top: 'calc(50% - 152px)', zIndex: 10, transform: 'translateX(-50%)', left: '50%' }}>
          <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '22px solid #1A1A1A', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
        </div>

        <div
          ref={wheelRef}
          style={{
            width: segSize,
            height: segSize,
            borderRadius: '50%',
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15), inset 0 0 0 6px rgba(255,255,255,0.4)',
          }}
        >
          <svg width={segSize} height={segSize} viewBox={`0 0 ${segSize} ${segSize}`}>
            {SEGMENTS.map((seg, i) => {
              const startAngle = i * SEGMENT_ANGLE;
              const endAngle = startAngle + SEGMENT_ANGLE;
              const midAngle = startAngle + SEGMENT_ANGLE / 2;
              const textR = r * 0.6;
              const textPos = polarToCartesian(cx, cy, textR, midAngle);
              const emojiPos = polarToCartesian(cx, cy, r * 0.38, midAngle);

              return (
                <g key={i}>
                  <path d={describeArc(startAngle, endAngle)} fill={seg.color} stroke="#FFF" strokeWidth="2" />
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFF"
                    fontWeight="800"
                    fontSize="10"
                    transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                  >
                    {seg.label.split('\n').map((line, li) => (
                      <tspan key={li} x={textPos.x} dy={li === 0 ? 0 : 12}>{line}</tspan>
                    ))}
                  </text>
                  <text
                    x={emojiPos.x}
                    y={emojiPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="18"
                    transform={`rotate(${midAngle}, ${emojiPos.x}, ${emojiPos.y})`}
                  >
                    {seg.emoji}
                  </text>
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r="26" fill="#1A1A1A" />
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fill="#F5C518" fontWeight="900" fontSize="11">
              XSIDE
            </text>
          </svg>
        </div>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={spinning || result !== null}
          className="active:scale-[0.96] transition-all duration-200"
          style={{
            marginTop: 24,
            width: 200,
            height: 52,
            borderRadius: 26,
            background: spinning ? '#CCC' : '#F5C518',
            border: 'none',
            fontSize: 16,
            fontWeight: 800,
            color: '#1A1A1A',
            boxShadow: spinning ? 'none' : '0 6px 20px rgba(245,197,24,0.5)',
            cursor: spinning ? 'not-allowed' : 'pointer',
          }}
        >
          {spinning ? '🎡 Dönüyor...' : result !== null ? '✓ Tamamlandı' : 'ÇEVİR! 🎡'}
        </button>
      </div>

      {/* Result overlay */}
      {result !== null && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFF',
          borderRadius: '24px 24px 0 0',
          padding: '24px 20px 32px',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.1)',
          animation: 'slideUpWheel 0.4s ease',
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48 }}>{SEGMENTS[result].emoji}</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', marginTop: 8 }}>
              {SEGMENTS[result].label.replace('\n', ' ')}
            </h3>
            <p style={{ fontSize: 13, color: '#999', marginTop: 4 }}>Ödülün hesabına tanımlandı!</p>
          </div>
          <button
            onClick={onFinish}
            className="w-full active:scale-[0.96] transition-all duration-200"
            style={{
              marginTop: 16,
              height: 48,
              borderRadius: 24,
              background: '#F5C518',
              border: 'none',
              fontSize: 15,
              fontWeight: 700,
              color: '#1A1A1A',
              boxShadow: '0 4px 16px rgba(245,197,24,0.4)',
            }}
          >
            Ödülleri Gör →
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideUpWheel {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
