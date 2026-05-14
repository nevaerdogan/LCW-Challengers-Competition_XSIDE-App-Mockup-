import { useState, useEffect, useRef, useCallback } from 'react';

const slides = [
  {
    id: 1,
    emoji: '🎮',
    title: 'Oyna &',
    highlight: 'Kazan!',
    highlightColor: '#2563EB',
    subtitle: 'Puan topla, ödül kazan',
    subtitleColor: '#6B8DB5',
    buttonText: 'HEMEN OYNA →',
    buttonBg: '#2563EB',
    buttonColor: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #DBEAFE, #BFDBFE)',
    titleColor: '#1E3A5F',
    image: new URL('../assets/oyun.png', import.meta.url).href,
    imageFade: 'linear-gradient(to right, #BFDBFE 0%, rgba(191,219,254,0.4) 25%, transparent 50%)',
    action: 'game',
  },
  {
    id: 2,
    emoji: '✨',
    title: 'Tarzını',
    highlight: 'Keşfet!',
    highlightColor: '#F5C518',
    subtitle: '4 soruda stilini bul',
    subtitleColor: '#666',
    buttonText: 'QUİZİ ÇÖZ →',
    buttonBg: '#1A1A1A',
    buttonColor: '#F5C518',
    gradient: 'linear-gradient(135deg, #F5F0E8, #E8DFCF)',
    titleColor: '#1A1A1A',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    imageFade: 'linear-gradient(to right, #E8DFCF 0%, transparent 40%)',
    action: 'quiz',
  },
  {
    id: 3,
    emoji: '🌻',
    title: 'Yeni',
    highlight: 'Gelenler',
    highlightColor: '#D4A017',
    subtitle: 'Bu hafta 120+ yeni ürün',
    subtitleColor: '#8B7300',
    buttonText: 'İNCELE →',
    buttonBg: '#F5C518',
    buttonColor: '#1A1A1A',
    gradient: 'linear-gradient(135deg, #FFF8E7, #FFEDBA)',
    titleColor: '#1A1A1A',
    image: new URL('../assets/yenigelenler.png', import.meta.url).href,
    imageFade: 'linear-gradient(to right, #FFEDBA 0%, transparent 40%)',
    action: 'newArrivals',
  },
  {
    id: 4,
    emoji: '❤️',
    title: 'Favori',
    highlight: 'Listen',
    highlightColor: '#E53E3E',
    subtitle: 'Beğendiklerin burada',
    subtitleColor: '#994444',
    buttonText: 'GÖZ AT →',
    buttonBg: '#E53E3E',
    buttonColor: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #FEE2E2, #FECACA)',
    titleColor: '#1A1A1A',
    image: new URL('../assets/favori.png', import.meta.url).href,
    imageFade: 'linear-gradient(to right, #FECACA 0%, transparent 40%)',
    action: 'favorites',
  },
];

interface HeroBannerProps {
  onAction?: (action: string) => void;
}

export default function HeroBanner({ onAction }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const containerWidth = useRef(0);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (isPaused.current) return;
      setCurrent(prev => {
        const next = (prev + 1) % slides.length;
        scrollRef.current?.scrollTo({ left: next * containerWidth.current, behavior: 'smooth' });
        return next;
      });
    }, 1500);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) containerWidth.current = el.offsetWidth;

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || containerWidth.current === 0) return;
    const idx = Math.round(el.scrollLeft / containerWidth.current);
    if (idx !== current && idx >= 0 && idx < slides.length) {
      setCurrent(idx);
    }
  };

  const pauseTimer = () => {
    isPaused.current = true;
  };

  const resumeTimer = () => {
    isPaused.current = false;
    startTimer();
  };

  return (
    <div
      style={{
        margin: '12px 16px 0',
        borderRadius: 20,
        overflow: 'hidden',
        height: 180,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        position: 'relative',
      }}
    >
      {/* Slides scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={pauseTimer}
        onTouchEnd={resumeTimer}
        onMouseDown={pauseTimer}
        onMouseUp={resumeTimer}
        onMouseLeave={resumeTimer}
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              minWidth: '100%',
              height: '100%',
              scrollSnapAlign: 'start',
              background: slide.gradient,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Background image — right side */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60%',
                height: '100%',
                overflow: 'hidden',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <img
                src={slide.image}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              {/* Gradient overlay on top of image for smooth fade */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '70%',
                  height: '100%',
                  background: slide.imageFade,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Left content */}
            <div style={{ position: 'relative', zIndex: 2, padding: '20px 20px' }}>
              <span style={{ fontSize: 28, lineHeight: 1 }}>{slide.emoji}</span>
              <p style={{ fontSize: 20, fontWeight: 700, color: slide.titleColor, marginTop: 6, lineHeight: 1.2 }}>
                {slide.title}
              </p>
              <p style={{ fontSize: 20, fontWeight: 700, color: slide.highlightColor, lineHeight: 1.2 }}>
                {slide.highlight}
              </p>
              <p style={{ fontSize: 11, color: slide.subtitleColor, marginTop: 4 }}>
                {slide.subtitle}
              </p>
              <button
                onClick={() => onAction?.(slide.action)}
                className="active:scale-[0.95] transition-all duration-200"
                style={{
                  marginTop: 10,
                  background: slide.buttonBg,
                  color: slide.buttonColor,
                  border: 'none',
                  borderRadius: 20,
                  padding: '8px 14px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: 0.3,
                }}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          zIndex: 10,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              scrollRef.current?.scrollTo({ left: i * containerWidth.current, behavior: 'smooth' });
            }}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? '#F5C518' : 'rgba(255,255,255,0.5)',
              transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
