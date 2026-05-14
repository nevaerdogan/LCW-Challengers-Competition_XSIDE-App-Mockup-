import { useState } from 'react';
import GameRewardScreen from '../GameRewardScreen';
import CatchGame from '../CatchGame';

const quizQuestions = [
  {
    emoji: '🌍',
    question: 'Bugün nereye gidiyorsun?',
    sub: 'Ortamına göre kombin önerelim',
    options: [
      { emoji: '☕', label: 'Kafe & Sosyal' },
      { emoji: '🏢', label: 'İş & Okul' },
      { emoji: '🛍', label: 'Alışveriş' },
      { emoji: '🌿', label: 'Dışarı & Doğa' },
    ],
  },
  {
    emoji: '👗',
    question: 'Seni nasıl bir kalıp rahat hissettiriyor?',
    sub: 'Rahatlık mı şıklık mı?',
    options: [
      { emoji: '🌸', label: 'Bol & Rahat' },
      { emoji: '✂️', label: 'Slim & Fitted' },
      { emoji: '🎨', label: 'Oversized' },
      { emoji: '⚡', label: 'Crop & Kısa' },
    ],
  },
  {
    emoji: '🎨',
    question: 'Bugünkü renk ruhun ne?',
    sub: 'Ruh haline uygun palet',
    options: [
      { emoji: '🤍', label: 'Nötr & Minimal' },
      { emoji: '🌈', label: 'Canlı & Bold' },
      { emoji: '🖤', label: 'Koyu & Edge' },
      { emoji: '🌸', label: 'Pastel & Soft' },
    ],
  },
  {
    emoji: '✨',
    question: 'Tarzın hangisine daha yakın?',
    sub: 'Kişiliğini yansıtan stil',
    options: [
      { emoji: '😎', label: 'Street & Cool' },
      { emoji: '💛', label: 'Y2K & Retro' },
      { emoji: '🌿', label: 'Boho & Casual' },
      { emoji: '💼', label: 'Smart & Chic' },
    ],
  },
];

const resultOutfits = [
  { name: 'Crop Hoodie', price: '299 ₺', emoji: '👚' },
  { name: 'Cargo Jogger', price: '449 ₺', emoji: '👖' },
  { name: 'Platform Sneaker', price: '599 ₺', emoji: '👟' },
];

const baseEmojis = ['👗', '👟', '👜', '👒', '🧥', '👖', '👚', '🧤'];
const shuffleArray = (arr: string[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const clothingEmojis = shuffleArray([...baseEmojis, ...baseEmojis]);

interface GameTabProps {
  initialTab?: 'quiz' | 'games';
}

export default function GameTab({ initialTab = 'quiz' }: GameTabProps) {
  const [activeGameTab, setActiveGameTab] = useState<'quiz' | 'games'>(initialTab);
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [showGameplay, setShowGameplay] = useState(false);
  const [gameScore, setGameScore] = useState(340);
  const [gameCombo, setGameCombo] = useState(6);
  const [matchedCells, setMatchedCells] = useState<number[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [showCatchGame, setShowCatchGame] = useState(false);

  const handleNext = () => {
    if (selectedAnswer === null) return;
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
      setSelectedAnswer(null);
    } else {
      setQuizDone(true);
    }
  };

  const handleCellTap = (idx: number) => {
    if (matchedCells.includes(idx)) return;
    if (selectedCells.includes(idx)) return;

    const newSelected = [...selectedCells, idx];
    setSelectedCells(newSelected);

    if (newSelected.length === 2) {
      if (clothingEmojis[newSelected[0]] === clothingEmojis[newSelected[1]]) {
        const newMatched = [...matchedCells, ...newSelected];
        setMatchedCells(newMatched);
        setGameScore(gameScore + 25);
        setGameCombo(gameCombo + 1);
        if (newMatched.length >= 16) {
          setTimeout(() => { setShowGameplay(false); setShowReward(true); }, 600);
        }
      }
      setTimeout(() => setSelectedCells([]), 400);
    }
  };

  return (
    <div className="pb-4" style={{ background: '#FAFAFA', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ padding: '4px 16px 8px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A' }}>Oyna & Kazan ✨</h2>
      </div>

      {/* Tab switcher */}
      <div style={{ margin: '0 16px 16px', background: '#F5F5F5', borderRadius: 35, padding: 4 }} className="flex">
        <button
          onClick={() => { setActiveGameTab('quiz'); }}
          className="flex-1 flex items-center justify-center gap-1.5 transition-all duration-200"
          style={{
            height: 40,
            borderRadius: 30,
            background: activeGameTab === 'quiz' ? '#F5C518' : 'transparent',
            fontWeight: activeGameTab === 'quiz' ? 700 : 500,
            fontSize: 13,
            color: activeGameTab === 'quiz' ? '#1A1A1A' : '#999',
          }}
        >
          🎯 Stil Quiz
        </button>
        <button
          onClick={() => { setActiveGameTab('games'); }}
          className="flex-1 flex items-center justify-center gap-1.5 transition-all duration-200"
          style={{
            height: 40,
            borderRadius: 30,
            background: activeGameTab === 'games' ? '#F5C518' : 'transparent',
            fontWeight: activeGameTab === 'games' ? 700 : 500,
            fontSize: 13,
            color: activeGameTab === 'games' ? '#1A1A1A' : '#999',
          }}
        >
          🎮 Mini Oyunlar
        </button>
      </div>

      {/* STİL QUİZ */}
      {activeGameTab === 'quiz' && !quizDone && (
        <div style={{ padding: '0 16px' }}>
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-0" style={{ marginBottom: 8 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  style={{
                    width: i === quizStep ? 14 : 10,
                    height: i === quizStep ? 14 : 10,
                    borderRadius: '50%',
                    background: i < quizStep ? '#F5C518' : i === quizStep ? 'transparent' : '#E0E0E0',
                    border: i === quizStep ? '2.5px solid #F5C518' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
                {i < 3 && <div style={{ width: 32, height: 2, background: i < quizStep ? '#F5C518' : '#E0E0E0' }} />}
              </div>
            ))}
          </div>
          <p className="text-center" style={{ fontSize: 12, color: '#8E8E8E', marginBottom: 16 }}>
            {quizStep + 1} / 4 — {['Ortam', 'Kalıp', 'Renk', 'Tarz'][quizStep]}
          </p>

          {/* Question card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '28px 24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <div className="text-center" style={{ fontSize: 48, marginBottom: 12 }}>
              {quizQuestions[quizStep].emoji}
            </div>
            <h3 className="text-center" style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', lineHeight: '28px' }}>
              {quizQuestions[quizStep].question}
            </h3>
            <p className="text-center" style={{ fontSize: 13, color: '#999', marginTop: 6 }}>
              {quizQuestions[quizStep].sub}
            </p>

            {/* 2x2 grid */}
            <div className="grid grid-cols-2 gap-3" style={{ marginTop: 20 }}>
              {quizQuestions[quizStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAnswer(i)}
                  className="flex flex-col items-center justify-center active:scale-[0.97] transition-all duration-200"
                  style={{
                    height: 90,
                    borderRadius: 16,
                    border: selectedAnswer === i ? '2px solid #F5C518' : '2px solid #EEEEEE',
                    background: selectedAnswer === i ? '#FFFBEC' : '#FAFAFA',
                  }}
                >
                  <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginTop: 4 }}>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center active:scale-[0.96] transition-all duration-200"
              style={{
                marginTop: 20,
                height: 52,
                borderRadius: 26,
                background: '#F5C518',
                opacity: selectedAnswer === null ? 0.4 : 1,
                fontSize: 15,
                fontWeight: 700,
                color: '#1A1A1A',
              }}
            >
              {quizStep < 3 ? 'Devam Et →' : 'Sonucu Gör →'}
            </button>
          </div>
        </div>
      )}

      {/* Quiz Result */}
      {activeGameTab === 'quiz' && quizDone && (
        <div style={{ padding: '0 16px' }}>
          <div
            className="text-center"
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              padding: '32px 24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 8 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>Senin Tarzın:</h3>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#F5C518', marginTop: 4 }}>Street Casual 🔥</h2>
            <p style={{ fontSize: 13, color: '#8E8E8E', marginTop: 8 }}>Sana özel kombinler hazırladık!</p>

            <div className="flex gap-3 overflow-x-auto" style={{ marginTop: 20, paddingBottom: 4 }}>
              {resultOutfits.map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{ width: 110, background: '#FAFAFA', borderRadius: 16, padding: 12, textAlign: 'center' }}
                >
                  <span style={{ fontSize: 36 }}>{item.emoji}</span>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginTop: 6 }}>{item.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 800, color: '#F5C518' }}>{item.price}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setQuizDone(false); setQuizStep(0); setSelectedAnswer(null); }}
              className="w-full flex items-center justify-center active:scale-[0.96] transition-all duration-200"
              style={{
                marginTop: 20,
                height: 52,
                borderRadius: 26,
                background: '#F5C518',
                fontSize: 15,
                fontWeight: 700,
                color: '#1A1A1A',
                boxShadow: '0 6px 20px rgba(245,197,24,0.4)',
              }}
            >
              Kombinleri Gör →
            </button>
          </div>

          <div className="flex justify-center" style={{ marginTop: 16 }}>
            <button
              onClick={() => { setQuizDone(false); setQuizStep(0); setSelectedAnswer(null); }}
              style={{ fontSize: 13, fontWeight: 600, color: '#8E8E8E' }}
            >
              Tekrar Çöz
            </button>
          </div>
        </div>
      )}

      {/* MİNİ OYUNLAR */}
      {activeGameTab === 'games' && !showGameplay && (
        <div style={{ padding: '0 16px' }}>
          {/* Haftalık Hedef */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF8E7, #FFF0C0)',
              border: '1.5px solid #F5E090',
              borderRadius: 20,
              padding: '18px 20px',
              marginBottom: 16,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(245,197,24,0.15)' }} />
            <span style={{ position: 'absolute', right: 20, top: 18, fontSize: 28 }}>🎁</span>

            <p style={{ fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 6 }}>Haftalık Hedef</p>
            <div>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#1A1A1A' }}>1.580 </span>
              <span style={{ fontSize: 16, color: '#999' }}>/ 2.000</span>
            </div>
            <div style={{ marginTop: 12, height: 8, background: 'rgba(245,197,24,0.2)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ width: '79%', height: '100%', background: '#F5C518', borderRadius: 10, boxShadow: '0 2px 6px rgba(245,197,24,0.4)' }} />
            </div>
            <div className="flex justify-between" style={{ marginTop: 6 }}>
              {[500, 1000, 1500, 2000].map((m) => (
                <span key={m} style={{ fontSize: 9, color: m <= 1580 ? '#B8860B' : '#CCCCCC', fontWeight: m <= 1580 ? 700 : 500 }}>
                  {m <= 1580 ? '✓ ' : ''}{m >= 1000 ? `${m / 1000}.000` : m}
                </span>
              ))}
            </div>
          </div>

          {/* Featured card — Stil Rush */}
          <button
            onClick={() => setShowGameplay(true)}
            className="w-full text-left active:scale-[0.98] transition-all duration-200"
            style={{
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: 18,
              border: '1.5px solid #EEEEEE',
              height: 96,
              marginBottom: 10,
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#F5C518', borderRadius: '18px 0 0 18px' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 90, background: '#F5C518', opacity: 0.06 }} />

            <div style={{ flex: 1, paddingLeft: 18, paddingTop: 12, paddingBottom: 12 }}>
              <span style={{ display: 'inline-block', background: '#F5C518', color: '#1A1A1A', fontSize: 9, fontWeight: 700, borderRadius: 8, padding: '3px 8px', marginBottom: 4 }}>
                YENİ
              </span>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>Stil Rush</p>
              <p style={{ fontSize: 11, color: '#999', marginTop: 2 }}>Kombinleri eşleştir</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', background: '#1A1A1A', color: '#FFF', borderRadius: 10, padding: '5px 10px', fontSize: 11, fontWeight: 700 }}>OYNA →</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', background: '#FFFBEC', border: '1px solid #F5C518', color: '#F5C518', borderRadius: 8, padding: '4px 8px', fontSize: 11, fontWeight: 700 }}>+100 Puan</span>
              </div>
            </div>

            <div style={{ width: 90, height: '100%', display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 2, padding: 8, position: 'relative', zIndex: 1 }}>
              {['👗', '👟', '👜', '🧢', '🧥', '👒'].map((e, i) => (
                <span key={i} style={{ fontSize: 20 }}>{e}</span>
              ))}
            </div>
          </button>

          {/* 2x2 Game grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { key: 'stilyakala', title: 'Stil\nYakala', subtitle: 'Emojileri yakala', accent: '#FF4757', badge: 'POPÜLER 🔥', badgeBg: '#FF4757', badgeColor: '#FFF', emoji: '🛒', points: '+200 Puan', onPress: () => setShowCatchGame(true) },
              { key: 'kombinesle', title: 'Kombin\nEşle', subtitle: 'Doğru parçaları bul', accent: '#9B59B6', badge: null, badgeBg: '', badgeColor: '', emoji: '🃏', points: '+75 Puan', onPress: () => {} },
              { key: 'gunlukcark', title: 'Günlük\nÇark', subtitle: 'Sürpriz ödül', accent: '#F39C12', badge: 'GÜNLÜK', badgeBg: '#E8F5E9', badgeColor: '#2E7D32', emoji: '🎡', points: 'Sürpriz', onPress: () => {} },
              { key: 'trendtahmin', title: 'Trend\nTahmin', subtitle: 'Bu sezon ne moda?', accent: '#1ABC9C', badge: null, badgeBg: '', badgeColor: '', emoji: '🔮', points: '+50 Puan', onPress: () => {} },
            ].map((game) => (
              <button
                key={game.key}
                onClick={game.onPress}
                className="text-left active:scale-[0.97] transition-all duration-200"
                style={{
                  position: 'relative',
                  background: '#FFFFFF',
                  borderRadius: 18,
                  border: '1.5px solid #EEEEEE',
                  height: 148,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px 10px 12px',
                }}
              >
                {/* Left accent bar */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: game.accent, borderRadius: '18px 0 0 18px' }} />

                {/* Top-right emoji */}
                <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 26 }}>{game.emoji}</span>

                {/* Content */}
                <div style={{ paddingLeft: 6 }}>
                  {game.badge && (
                    <span style={{ display: 'inline-block', background: game.badgeBg, color: game.badgeColor, fontSize: 9, fontWeight: 700, borderRadius: 8, padding: '3px 8px', marginBottom: 4 }}>
                      {game.badge}
                    </span>
                  )}
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.25, whiteSpace: 'pre-line' }}>{game.title}</p>
                  <p style={{ fontSize: 10, color: '#999', marginTop: 2 }}>{game.subtitle}</p>
                </div>

                {/* Bottom row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingLeft: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', background: '#1A1A1A', color: '#FFF', borderRadius: 10, padding: '5px 10px', fontSize: 11, fontWeight: 700 }}>OYNA →</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', background: '#FFFBEC', border: '1px solid #F5C518', color: '#F5C518', borderRadius: 8, padding: '4px 8px', fontSize: 11, fontWeight: 700 }}>{game.points}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STİL RUSH GAMEPLAY */}
      {showGameplay && (
        <div
          className="absolute inset-0 z-[60] flex flex-col"
          style={{ background: 'linear-gradient(180deg, #FFF8E1, #FFECB3)' }}
        >
          {/* Game header */}
          <div className="flex items-center justify-between" style={{ padding: '52px 16px 12px' }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 14 }}>⏱</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', fontVariantNumeric: 'tabular-nums' }}>00:45</span>
            </div>
            <div style={{ background: '#F5C518', borderRadius: 12, padding: '4px 12px' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A' }}>KOMBO x{gameCombo}</span>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: 12 }}>⭐</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A' }}>{gameScore}</span>
            </div>
          </div>

          {/* Kombo stars */}
          <div className="flex justify-center gap-1" style={{ marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} style={{ fontSize: 16, opacity: s <= Math.min(gameCombo, 5) ? 1 : 0.2 }}>⭐</span>
            ))}
          </div>

          {/* Game grid 4x4 */}
          <div className="flex-1 flex items-center justify-center" style={{ padding: '0 20px' }}>
            <div className="grid grid-cols-4 gap-3" style={{ width: '100%', maxWidth: 320 }}>
              {clothingEmojis.slice(0, 16).map((emoji, i) => {
                const isMatched = matchedCells.includes(i);
                const isSelected = selectedCells.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleCellTap(i)}
                    className="flex items-center justify-center transition-all duration-200"
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: 14,
                      background: isMatched ? 'rgba(245,197,24,0.3)' : 'rgba(255,255,255,0.7)',
                      border: isSelected ? '2.5px solid #F5C518' : isMatched ? '2.5px solid rgba(245,197,24,0.4)' : '2.5px solid transparent',
                      fontSize: 32,
                      opacity: isMatched ? 0.35 : 1,
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      boxShadow: isSelected ? '0 0 16px rgba(245,197,24,0.4)' : 'none',
                    }}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Power-ups */}
          <div className="flex justify-center gap-3" style={{ padding: '12px 16px' }}>
            {[
              { emoji: '💣', label: 'BOMBA', count: 2 },
              { emoji: '🔀', label: 'KARIŞTIR', count: 1 },
              { emoji: '💡', label: 'İPUCU', count: 3 },
              { emoji: '🎨', label: 'RENK', count: 1 },
            ].map((pw) => (
              <button
                key={pw.label}
                className="flex items-center gap-1.5 relative"
                style={{ background: 'rgba(0,0,0,0.08)', borderRadius: 20, padding: '8px 14px' }}
              >
                <span style={{ fontSize: 16 }}>{pw.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#666' }}>{pw.label}</span>
                <span
                  className="absolute"
                  style={{ top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#F5C518', fontSize: 9, fontWeight: 800, color: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {pw.count}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom progress */}
          <div style={{ padding: '8px 16px 20px' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#8E7A3A' }}>PUAN BARAJI</span>
              <div className="flex items-center gap-1">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A' }}>1.580</span>
                <span style={{ fontSize: 10, color: '#8E7A3A' }}> / 2.000</span>
                <span style={{ fontSize: 12, marginLeft: 4 }}>🎁</span>
              </div>
            </div>
            <div style={{ height: 6, background: 'rgba(0,0,0,0.1)', borderRadius: 10 }}>
              <div style={{ width: '79%', height: '100%', background: '#F5C518', borderRadius: 10 }} />
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setShowGameplay(false)}
            className="absolute"
            style={{ top: 52, left: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', fontSize: 16 }}
          >
            ←
          </button>

          {/* Win button (shortcut for demo) */}
          <button
            onClick={() => { setShowGameplay(false); setShowReward(true); }}
            className="absolute"
            style={{ top: 52, right: 16, borderRadius: 12, background: '#F5C518', padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#1A1A1A' }}
          >
            BİTİR ✓
          </button>
        </div>
      )}

      {/* STİL YAKALA */}
      {showCatchGame && (
        <CatchGame
          onClose={() => setShowCatchGame(false)}
          onFinish={() => { setShowCatchGame(false); setShowReward(true); }}
        />
      )}

      {/* REWARD SCREEN */}
      {showReward && (
        <GameRewardScreen
          onClose={() => { setShowReward(false); setMatchedCells([]); setGameScore(340); setGameCombo(6); }}
          onGoHome={() => { setShowReward(false); setMatchedCells([]); setGameScore(340); setGameCombo(6); setActiveGameTab('quiz'); }}
        />
      )}
    </div>
  );
}
