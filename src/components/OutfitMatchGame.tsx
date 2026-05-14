import { useState } from 'react';

const outfits = [
  {
    id: 1,
    name: 'Kafe Kombini',
    emoji: '☕',
    pieces: [
      { slot: 'Üst', correct: 'Crop Top', wrong: 'Blazer', correctEmoji: '👚', wrongEmoji: '🧥' },
      { slot: 'Alt', correct: 'Wide Leg Jean', wrong: 'Jogger', correctEmoji: '👖', wrongEmoji: '🩳' },
      { slot: 'Ayakkabı', correct: 'Sneaker', wrong: 'Topuklu', correctEmoji: '👟', wrongEmoji: '👠' },
    ],
  },
  {
    id: 2,
    name: 'Gece Kombini',
    emoji: '🌙',
    pieces: [
      { slot: 'Üst', correct: 'Saten Bluz', wrong: 'Hoodie', correctEmoji: '👚', wrongEmoji: '🧥' },
      { slot: 'Alt', correct: 'Mini Etek', wrong: 'Cargo', correctEmoji: '👗', wrongEmoji: '👖' },
      { slot: 'Aksesuar', correct: 'Clutch Çanta', wrong: 'Sırt Çantası', correctEmoji: '👜', wrongEmoji: '🎒' },
    ],
  },
  {
    id: 3,
    name: 'Okul Kombini',
    emoji: '📚',
    pieces: [
      { slot: 'Üst', correct: 'Oversize Tee', wrong: 'Gömlek', correctEmoji: '👕', wrongEmoji: '👔' },
      { slot: 'Alt', correct: 'Jogger', wrong: 'Kumaş Pantolon', correctEmoji: '👖', wrongEmoji: '👔' },
      { slot: 'Aksesuar', correct: 'Şapka', wrong: 'Kravat', correctEmoji: '🧢', wrongEmoji: '👔' },
    ],
  },
];

interface Props {
  onClose: () => void;
  onFinish: () => void;
}

export default function OutfitMatchGame({ onClose, onFinish }: Props) {
  const [round, setRound] = useState(0);
  const [pieceIdx, setPieceIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<'correct' | 'wrong' | null>(null);
  const [chosenPieces, setChosenPieces] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const outfit = outfits[round];
  const piece = outfit.pieces[pieceIdx];
  const isLeft = Math.random() > 0.5;

  const [options] = useState(() =>
    outfits.map((o) =>
      o.pieces.map((p) => (Math.random() > 0.5 ? [p.correct, p.wrong] : [p.wrong, p.correct]))
    )
  );

  const currentOptions = options[round][pieceIdx];
  const leftIsCorrect = currentOptions[0] === piece.correct;

  const handlePick = (choice: string) => {
    if (picked) return;
    const isCorrect = choice === piece.correct;
    setPicked(isCorrect ? 'correct' : 'wrong');

    const newScore = isCorrect ? score + (25 * (streak + 1)) : score;
    const newStreak = isCorrect ? streak + 1 : 0;
    const newChosen = [...chosenPieces, isCorrect ? piece.correctEmoji : piece.wrongEmoji];

    setTimeout(() => {
      setScore(newScore);
      setStreak(newStreak);
      setChosenPieces(newChosen);
      setPicked(null);

      if (pieceIdx < outfit.pieces.length - 1) {
        setPieceIdx(pieceIdx + 1);
      } else if (round < outfits.length - 1) {
        setRound(round + 1);
        setPieceIdx(0);
        setChosenPieces([]);
      } else {
        setScore(newScore);
        setGameOver(true);
      }
    }, 600);
  };

  if (gameOver) {
    return (
      <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center" style={{ background: 'linear-gradient(180deg, #F3E8FF, #E9D5FF)' }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A' }}>Tebrikler!</h2>
        <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>3 kombini tamamladın</p>
        <div style={{ background: '#FFF', borderRadius: 20, padding: '16px 32px', marginTop: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: 14, color: '#999', textAlign: 'center' }}>Toplam Puan</p>
          <p style={{ fontSize: 36, fontWeight: 900, color: '#9B59B6', textAlign: 'center' }}>⭐ {score}</p>
        </div>
        <button
          onClick={onFinish}
          className="active:scale-[0.96] transition-all duration-200"
          style={{ marginTop: 24, background: '#9B59B6', color: '#FFF', borderRadius: 50, padding: '14px 48px', fontSize: 15, fontWeight: 700, border: 'none', boxShadow: '0 6px 20px rgba(155,89,182,0.4)' }}
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
    <div className="absolute inset-0 z-[60] flex flex-col" style={{ background: 'linear-gradient(180deg, #F3E8FF, #E9D5FF)' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '56px 16px 12px' }}>
        <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(155,89,182,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B21A8', fontSize: 16, border: 'none' }}>
          ←
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#6B21A8' }}>KOMBİN EŞLE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#FFF', borderRadius: 12, padding: '4px 10px' }}>
          <span style={{ fontSize: 12 }}>⭐</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#1A1A1A' }}>{score}</span>
        </div>
      </div>

      {/* Round indicator */}
      <div className="flex items-center justify-center gap-2" style={{ marginBottom: 4 }}>
        {outfits.map((_, i) => (
          <div key={i} style={{ width: i === round ? 24 : 8, height: 8, borderRadius: 4, background: i < round ? '#9B59B6' : i === round ? '#7C3AED' : 'rgba(155,89,182,0.25)', transition: 'all 0.3s' }} />
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: 11, color: '#8B5CF6', fontWeight: 600, marginBottom: 12 }}>
        Kombin {round + 1} / {outfits.length}
      </p>

      {/* Outfit card */}
      <div style={{ margin: '0 16px', background: '#FFF', borderRadius: 24, padding: '20px 20px 24px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 32 }}>{outfit.emoji}</span>
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A' }}>{outfit.name}</p>
            <p style={{ fontSize: 12, color: '#999' }}>Doğru parçayı seç</p>
          </div>
        </div>

        {/* Chosen pieces so far */}
        <div className="flex gap-2" style={{ marginBottom: 16 }}>
          {outfit.pieces.map((p, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-center"
              style={{
                height: 56,
                borderRadius: 14,
                background: i < pieceIdx || (i === pieceIdx && picked) ? '#F3E8FF' : i === pieceIdx ? '#FAFAFA' : '#F8F8F8',
                border: i === pieceIdx && !picked ? '2px dashed #9B59B6' : '2px solid transparent',
              }}
            >
              {i < chosenPieces.length ? (
                <span style={{ fontSize: 24 }}>{chosenPieces[i]}</span>
              ) : i === pieceIdx ? (
                <span style={{ fontSize: 18, color: '#9B59B6' }}>?</span>
              ) : (
                <span style={{ fontSize: 10, color: '#CCC' }}>{p.slot}</span>
              )}
            </div>
          ))}
        </div>

        {/* Slot label */}
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#6B21A8', marginBottom: 12 }}>
          {piece.slot} seç:
        </p>

        {/* Two choices */}
        <div className="flex gap-3">
          {currentOptions.map((choice, i) => {
            const isCorrectOption = choice === piece.correct;
            const emoji = isCorrectOption ? piece.correctEmoji : piece.wrongEmoji;
            const showResult = picked !== null;
            const isThisCorrect = showResult && isCorrectOption;
            const isThisWrong = showResult && !isCorrectOption;

            return (
              <button
                key={i}
                onClick={() => handlePick(choice)}
                className="flex-1 flex flex-col items-center justify-center active:scale-[0.96] transition-all duration-200"
                style={{
                  height: 100,
                  borderRadius: 18,
                  background: isThisCorrect ? '#E8F5E9' : isThisWrong ? '#FFEBEE' : '#FAFAFA',
                  border: isThisCorrect ? '2.5px solid #4CAF50' : isThisWrong ? '2.5px solid #EF5350' : '2.5px solid #EEEEEE',
                }}
              >
                <span style={{ fontSize: 36 }}>{emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginTop: 4 }}>{choice}</span>
                {isThisCorrect && <span style={{ fontSize: 10, color: '#4CAF50', fontWeight: 700, marginTop: 2 }}>✓ Doğru!</span>}
                {isThisWrong && <span style={{ fontSize: 10, color: '#EF5350', fontWeight: 700, marginTop: 2 }}>✗ Yanlış</span>}
              </button>
            );
          })}
        </div>

        {/* Streak */}
        {streak > 1 && (
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <span style={{ background: '#FFF3E0', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#E65100' }}>
              🔥 {streak}x Seri!
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
