import { useState, useEffect, useRef, useCallback } from 'react';

const GOOD_EMOJIS = ['👗', '👟', '👜', '👒', '🧥', '👖', '👚', '👠', '🎒', '👔', '👕', '💍', '🕶️', '👑', '🧢'];
const BAD_EMOJIS = ['🗑️', '🧱'];
const GAME_DURATION = 15;
const BASKET_W = 80;
const SPAWN_INTERVAL = 900;

interface FallingItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  isBad: boolean;
  caught: boolean;
}

interface CatchGameProps {
  onClose: () => void;
  onFinish: (score: number) => void;
}

export default function CatchGame({ onClose, onFinish }: CatchGameProps) {
  const [basketX, setBasketX] = useState(0);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  const [basketBounce, setBasketBounce] = useState(false);
  const [caughtEmojis, setCaughtEmojis] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);

  const areaRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const idRef = useRef(0);
  const itemsRef = useRef<FallingItem[]>([]);
  const bxRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const livesRef = useRef(3);
  const overRef = useRef(false);
  const areaWRef = useRef(343);
  const areaHRef = useRef(500);

  useEffect(() => {
    const el = areaRef.current;
    if (el) {
      areaWRef.current = el.clientWidth;
      areaHRef.current = el.clientHeight;
      bxRef.current = el.clientWidth / 2 - BASKET_W / 2;
      setBasketX(bxRef.current);
    }
  }, []);

  const spawn = useCallback(() => {
    const isBad = Math.random() < 0.12;
    const pool = isBad ? BAD_EMOJIS : GOOD_EMOJIS;
    const emoji = pool[Math.floor(Math.random() * pool.length)];
    const aw = areaWRef.current;
    const item: FallingItem = {
      id: idRef.current++,
      emoji,
      x: Math.random() * (aw - 50) + 10,
      y: -44,
      speed: 1.0 + Math.random() * 0.8,
      isBad,
      caught: false,
    };
    itemsRef.current = [...itemsRef.current, item];
    setItems([...itemsRef.current]);
  }, []);

  const loop = useCallback((ts: number) => {
    if (overRef.current) return;

    if (ts - lastSpawnRef.current > SPAWN_INTERVAL) {
      spawn();
      lastSpawnRef.current = ts;
    }

    const bx = bxRef.current;
    const ah = areaHRef.current;
    const catchY = ah - 70;
    let ns = scoreRef.current;
    let nc = comboRef.current;
    let nl = livesRef.current;
    const newCaught: { id: number; emoji: string; x: number; y: number }[] = [];

    const updated = itemsRef.current
      .map((it) => {
        if (it.caught) return it;
        const ny = it.y + it.speed;

        const hitLeft = bx - 20;
        const hitRight = bx + BASKET_W + 20;
        if (ny >= catchY - 20 && ny <= catchY + 40 && it.x >= hitLeft && it.x <= hitRight) {
          if (it.isBad) {
            nl = Math.max(0, nl - 1);
            nc = 0;
            newCaught.push({ id: it.id, emoji: '💥', x: it.x, y: ny });
          } else {
            const bonus = nc >= 5 ? 3 : nc >= 3 ? 2 : 1;
            ns += 10 * bonus;
            nc += 1;
            newCaught.push({ id: it.id, emoji: `+${10 * bonus}`, x: it.x, y: ny });
          }
          return { ...it, y: ny, caught: true };
        }

        if (ny > ah + 50) {
          if (!it.isBad) nc = 0;
          return null;
        }
        return { ...it, y: ny };
      })
      .filter(Boolean) as FallingItem[];

    itemsRef.current = updated;
    setItems([...updated]);

    if (ns !== scoreRef.current) { scoreRef.current = ns; setScore(ns); }
    if (nc !== comboRef.current) { comboRef.current = nc; setCombo(nc); }
    if (nl !== livesRef.current) {
      livesRef.current = nl;
      setLives(nl);
      if (nl <= 0) { overRef.current = true; setGameOver(true); return; }
    }
    if (newCaught.length > 0) {
      setCaughtEmojis(newCaught);
      setBasketBounce(true);
      setTimeout(() => { setCaughtEmojis([]); setBasketBounce(false); }, 600);
    }

    animRef.current = requestAnimationFrame(loop);
  }, [spawn]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [loop]);

  useEffect(() => {
    if (gameOver) return;
    const t = setInterval(() => {
      setTimeLeft((v) => {
        if (v <= 1) { clearInterval(t); overRef.current = true; setGameOver(true); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [gameOver]);

  const moveBasket = (clientX: number) => {
    if (gameOver) return;
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left - BASKET_W / 2;
    const clamped = Math.max(0, Math.min(areaWRef.current - BASKET_W, x));
    bxRef.current = clamped;
    setBasketX(clamped);
  };

  return (
    <div
      className="absolute inset-0 z-[60] flex flex-col"
      style={{ background: '#FFF9E6', overflow: 'hidden' }}
      onPointerMove={(e) => moveBasket(e.clientX)}
      onTouchMove={(e) => { e.preventDefault(); moveBasket(e.touches[0].clientX); }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '52px 16px 6px' }}>
        <button
          onClick={onClose}
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', fontSize: 16 }}
        >
          ←
        </button>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A' }}>STİL YAKALA 🛒</span>
        </div>
        <div style={{ width: 32 }} />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between" style={{ padding: '6px 20px 4px' }}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 20, fontWeight: 900, color: timeLeft <= 5 ? '#EF4444' : '#1A1A1A', fontVariantNumeric: 'tabular-nums', animation: timeLeft <= 5 ? 'timerPulse 0.5s ease infinite' : 'none' }}>
            {timeLeft}s
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((h) => (
            <span key={h} style={{ fontSize: 14, opacity: h <= lives ? 1 : 0.15, transition: 'all 0.3s' }}>❤️</span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span style={{ fontSize: 22, fontWeight: 900, color: '#F5C518' }}>{score}</span>
          <span style={{ fontSize: 13 }}>⭐</span>
        </div>
      </div>

      {combo >= 3 && (
        <div className="flex justify-center" style={{ marginBottom: 2 }}>
          <div style={{ background: '#FF6B35', borderRadius: 14, padding: '3px 14px' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#FFF' }}>🔥 KOMBO x{combo}!</span>
          </div>
        </div>
      )}

      {/* Game area */}
      <div
        ref={areaRef}
        className="relative flex-1"
        style={{
          margin: '4px 12px 0',
          borderRadius: 24,
          background: 'linear-gradient(180deg, #FFFDF0 0%, #FFF5D6 100%)',
          overflow: 'hidden',
          touchAction: 'none',
          border: '2px solid #F0E5B0',
        }}
      >
        {/* Falling emojis */}
        {items.map((it) =>
          it.caught ? null : (
            <div
              key={it.id}
              className="absolute"
              style={{
                left: it.x,
                top: it.y,
                fontSize: 36,
                filter: it.isBad ? 'grayscale(0.4)' : 'none',
                animation: 'emojiFloat 2s ease-in-out infinite',
                animationDelay: `${it.id * 0.1}s`,
              }}
            >
              {it.emoji}
            </div>
          )
        )}

        {/* Catch animations */}
        {caughtEmojis.map((c) => (
          <div
            key={c.id}
            className="absolute pointer-events-none"
            style={{
              left: c.x,
              top: c.y - 20,
              zIndex: 30,
              animation: 'catchBurst 0.6s ease-out forwards',
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, color: c.emoji === '💥' ? '#EF4444' : '#F5C518', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              {c.emoji}
            </span>
          </div>
        ))}

        {/* Sparkle ring on catch */}
        {basketBounce && !caughtEmojis.some(c => c.emoji === '💥') && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: bxRef.current + BASKET_W / 2 - 30,
              bottom: 20,
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid #F5C518',
              animation: 'ringPop 0.5s ease-out forwards',
              zIndex: 20,
            }}
          />
        )}

        {/* Basket */}
        <div
          className="absolute"
          style={{
            left: basketX,
            bottom: 8,
            width: BASKET_W,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: basketBounce ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.15s ease-out',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 68,
              height: 50,
              borderRadius: '12px 12px 20px 20px',
              background: 'linear-gradient(180deg, #F5C518, #E8B800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: basketBounce
                ? '0 0 24px rgba(245,197,24,0.8), 0 8px 20px rgba(245,197,24,0.5)'
                : '0 4px 12px rgba(245,197,24,0.3)',
              transition: 'box-shadow 0.15s ease',
            }}
          >
            <span style={{ fontSize: 32 }}>🛒</span>
          </div>
        </div>

        {/* Game Over */}
        {gameOver && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(255,249,230,0.95)', zIndex: 40, backdropFilter: 'blur(8px)' }}
          >
            <div style={{ fontSize: 56, marginBottom: 8 }}>{score >= 80 ? '🏆' : '🛍️'}</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A' }}>
              {timeLeft <= 0 ? 'Süre Doldu!' : 'Oyun Bitti!'}
            </h2>
            <div className="flex items-center justify-center" style={{ marginTop: 12, background: '#F5C518', borderRadius: 20, padding: '8px 24px' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A' }}>⭐ {score} Puan</span>
            </div>
            <p style={{ fontSize: 13, color: '#8E8E8E', marginTop: 8, textAlign: 'center', padding: '0 20px' }}>
              {score >= 80 ? 'Harika! Moda dünyasını domine ettin!' : score >= 40 ? 'Güzel oyun! Tarzını kanıtladın!' : 'İyi başlangıç! Tekrar dene!'}
            </p>
            <div className="flex gap-3" style={{ marginTop: 20 }}>
              <button
                onClick={onClose}
                style={{ background: '#E8E8E8', borderRadius: 16, padding: '10px 20px', fontSize: 13, fontWeight: 700, color: '#666' }}
              >
                Çık
              </button>
              <button
                onClick={() => onFinish(score)}
                className="active:scale-[0.96] transition-all duration-200"
                style={{ background: '#F5C518', borderRadius: 16, padding: '10px 24px', fontSize: 13, fontWeight: 700, color: '#1A1A1A', boxShadow: '0 4px 16px rgba(245,197,24,0.4)' }}
              >
                Ödülü Al →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      {!gameOver && (
        <div className="text-center" style={{ padding: '6px 0 12px' }}>
          <span style={{ fontSize: 11, color: '#C4A84D' }}>👆 Ekranda parmağını kaydır</span>
        </div>
      )}

      <style>{`
        @keyframes emojiFloat {
          0%, 100% { transform: rotate(-4deg) scale(1); }
          50% { transform: rotate(4deg) scale(1.05); }
        }
        @keyframes catchBurst {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-50px) scale(1.6); opacity: 0; }
        }
        @keyframes ringPop {
          0% { transform: scale(0.3); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes timerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
