import { useState } from 'react';

const trendQuestions = [
  {
    question: 'Bu yaz en çok hangi renk trend olacak?',
    emoji: '☀️',
    options: [
      { label: 'Butter Yellow', emoji: '💛', correct: true },
      { label: 'Neon Yeşil', emoji: '💚', correct: false },
      { label: 'Bordo', emoji: '🤎', correct: false },
    ],
  },
  {
    question: '2025 sokak modasının vazgeçilmezi hangisi?',
    emoji: '🛹',
    options: [
      { label: 'Skinny Jean', emoji: '👖', correct: false },
      { label: 'Wide Leg Pantolon', emoji: '👖', correct: true },
      { label: 'Tayt', emoji: '🩲', correct: false },
    ],
  },
  {
    question: 'Hangi aksesuar bu sezon geri döndü?',
    emoji: '💎',
    options: [
      { label: 'Chunky Bileklik', emoji: '📿', correct: false },
      { label: 'Micro Çanta', emoji: '👜', correct: true },
      { label: 'Bel Çantası', emoji: '🎒', correct: false },
    ],
  },
  {
    question: 'Y2K stili denince akla ilk gelen?',
    emoji: '🦋',
    options: [
      { label: 'Crop Top + Low Rise', emoji: '👚', correct: true },
      { label: 'Oversize Blazer', emoji: '🧥', correct: false },
      { label: 'Maxi Elbise', emoji: '👗', correct: false },
    ],
  },
  {
    question: 'Hangi ayakkabı modeli tekrar trend?',
    emoji: '👟',
    options: [
      { label: 'Platform Sneaker', emoji: '👟', correct: true },
      { label: 'Stiletto', emoji: '👠', correct: false },
      { label: 'Crocs', emoji: '🥿', correct: false },
    ],
  },
];

interface Props {
  onClose: () => void;
  onFinish: () => void;
}

export default function TrendPredictGame({ onClose, onFinish }: Props) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = trendQuestions[qIdx];

  const handlePick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);

    const isCorrect = q.options[idx].correct;
    const newScore = isCorrect ? score + 10 : score;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;

    setTimeout(() => {
      setScore(newScore);
      setCorrectCount(newCorrect);
      setPicked(null);

      if (qIdx < trendQuestions.length - 1) {
        setQIdx(qIdx + 1);
      } else {
        setScore(newScore);
        setCorrectCount(newCorrect);
        setDone(true);
      }
    }, 800);
  };

  if (done) {
    const ratio = correctCount / trendQuestions.length;
    const label = ratio >= 0.8 ? 'Trend Guru! 👑' : ratio >= 0.6 ? 'Moda Takipçisi ✨' : 'Daha Çok Takip Et 📱';

    return (
      <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center" style={{ background: 'linear-gradient(180deg, #E0F7FA, #B2EBF2)' }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>{ratio >= 0.8 ? '👑' : ratio >= 0.6 ? '✨' : '📱'}</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A' }}>{label}</h2>
        <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{correctCount} / {trendQuestions.length} doğru</p>
        <div style={{ background: '#FFF', borderRadius: 20, padding: '16px 32px', marginTop: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: 14, color: '#999', textAlign: 'center' }}>Kazandığın Puan</p>
          <p style={{ fontSize: 36, fontWeight: 900, color: '#1ABC9C', textAlign: 'center' }}>⭐ {score}</p>
        </div>
        <button
          onClick={onFinish}
          className="active:scale-[0.96] transition-all duration-200"
          style={{ marginTop: 24, background: '#1ABC9C', color: '#FFF', borderRadius: 50, padding: '14px 48px', fontSize: 15, fontWeight: 700, border: 'none', boxShadow: '0 6px 20px rgba(26,188,156,0.4)' }}
        >
          Ödülleri Gör →
        </button>
        <button onClick={onClose} style={{ marginTop: 12, fontSize: 13, color: '#999', background: 'none', border: 'none' }}>
          Kapat
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[60] flex flex-col" style={{ background: 'linear-gradient(180deg, #E0F7FA, #B2EBF2)' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '56px 16px 8px' }}>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(26,188,156,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D9488', fontSize: 16, border: 'none' }}>
          ←
        </button>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#0D9488' }}>TREND TAHMİN 🔮</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF', borderRadius: 12, padding: '4px 10px' }}>
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A' }}>{score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-1.5" style={{ margin: '8px 16px 4px' }}>
        {trendQuestions.map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background: i < qIdx ? '#1ABC9C' : i === qIdx ? '#0D9488' : 'rgba(26,188,156,0.2)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: 11, color: '#0D9488', fontWeight: 600, marginBottom: 12 }}>
        Soru {qIdx + 1} / {trendQuestions.length}
      </p>

      {/* Question card */}
      <div style={{ margin: '0 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#FFF', borderRadius: 24, padding: '28px 20px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', fontSize: 48, marginBottom: 12 }}>{q.emoji}</div>
          <h3 style={{ textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#1A1A1A', lineHeight: 1.4 }}>{q.question}</h3>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 6 }}>Doğru trendi tahmin et!</p>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, justifyContent: 'center' }}>
            {q.options.map((opt, i) => {
              const showResult = picked !== null;
              const isCorrect = opt.correct;
              const isPicked = picked === i;

              let bg = '#FAFAFA';
              let border = '2px solid #EEEEEE';
              if (showResult && isCorrect) { bg = '#E8F5E9'; border = '2.5px solid #4CAF50'; }
              else if (showResult && isPicked && !isCorrect) { bg = '#FFEBEE'; border = '2.5px solid #EF5350'; }

              return (
                <button
                  key={i}
                  onClick={() => handlePick(i)}
                  className="flex items-center gap-3 active:scale-[0.97] transition-all duration-200"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: bg,
                    border,
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 28, width: 40, textAlign: 'center' }}>{opt.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', flex: 1 }}>{opt.label}</span>
                  {showResult && isCorrect && <span style={{ fontSize: 16, color: '#4CAF50' }}>✓</span>}
                  {showResult && isPicked && !isCorrect && <span style={{ fontSize: 16, color: '#EF5350' }}>✗</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}
