import { useEffect, useState } from 'react';
import IPhoneFrame from './components/IPhoneFrame';
import WelcomeScreen from './components/WelcomeScreen';
import GetStartedScreen from './components/GetStartedScreen';
import MainApp from './components/MainApp';

const PHONE_W = 375;
const PHONE_H = 812;

type Screen = 'welcome' | 'getstarted' | 'main';

function App() {
  const [scale, setScale] = useState(0.75);
  const [screen, setScreen] = useState<Screen>('welcome');

  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isMobile = vw < 768;
      const widthFactor = isMobile ? 0.92 : 0.4;
      const heightFactor = isMobile ? 0.95 : 0.88;
      const s = Math.min((vh * heightFactor) / PHONE_H, (vw * widthFactor) / PHONE_W, 1);
      setScale(s);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setScreen('getstarted')} />;
      case 'getstarted':
        return <GetStartedScreen onNext={() => setScreen('main')} />;
      case 'main':
        return <MainApp />;
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFFDF5, #FFF8E1, #FFF3CC, #FFFDF5)', position: 'relative' }}
    >
      {/* Animated XSIDE watermarks + sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {['XSIDE', 'XSIDE', 'XSIDE', 'XSIDE', 'XSIDE', 'XSIDE', 'XSIDE', 'XSIDE'].map((text, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              fontSize: [80, 60, 100, 50, 70, 90, 55, 75][i],
              fontWeight: 900,
              letterSpacing: 8,
              whiteSpace: 'nowrap',
              left: `${[5, 60, -5, 70, 15, 55, 30, 75][i]}%`,
              top: `${[8, 20, 35, 50, 65, 78, 88, 5][i]}%`,
              transform: `rotate(${[-12, 8, -5, 15, -8, 6, -15, 10][i]}deg)`,
              animation: `floatText${i % 4} ${14 + i * 2}s ease-in-out infinite, shimmer ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.05), rgba(245,197,24,0.12), rgba(0,0,0,0.05))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {text}
          </div>
        ))}

        {/* Sparkle particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: [10, 14, 8, 12, 16, 9, 11, 15, 10, 13, 8, 14, 12, 10, 16, 9, 11, 13, 15, 8][i],
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0,
            }}
          >
            ✦
          </div>
        ))}

        {/* Floating dots */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute"
            style={{
              width: [6, 8, 5, 10, 7, 4, 9, 6, 8, 5, 7, 10][i],
              height: [6, 8, 5, 10, 7, 4, 9, 6, 8, 5, 7, 10][i],
              borderRadius: '50%',
              background: `rgba(245,197,24,${[0.12, 0.08, 0.15, 0.07, 0.1, 0.13, 0.09, 0.11, 0.08, 0.14, 0.1, 0.09][i]})`,
              left: `${[10, 85, 20, 90, 5, 75, 30, 65, 45, 95, 15, 55][i]}%`,
              top: `${[15, 25, 45, 60, 75, 10, 85, 40, 55, 70, 30, 90][i]}%`,
              animation: `dotFloat ${5 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Phone mockup */}
      <div
        className="flex-shrink-0"
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <IPhoneFrame>
          {renderScreen()}
        </IPhoneFrame>
      </div>

      {/* Team credit box */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 14,
          padding: '12px 16px',
          zIndex: 10,
          border: '1px solid rgba(245,197,24,0.25)',
          maxWidth: 200,
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, color: '#B8860B', marginBottom: 6, letterSpacing: 0.5 }}>Grup 5 — NEXT SIDE</p>
        {[
          'Neva Erdoğan',
          'Aylin İpek Başar',
          'Büşra Yılmaz',
          'Ekin Yılmaz',
          'Gülay Yılmaz',
          'Yerkenaz Baizhigit',
        ].map((name) => (
          <p key={name} style={{ fontSize: 10, color: '#8B7355', lineHeight: 1.7, fontWeight: 500 }}>{name}</p>
        ))}
      </div>

      <style>{`
        @keyframes floatText0 {
          0%, 100% { transform: rotate(-12deg) translateY(0) translateX(0); }
          33% { transform: rotate(-10deg) translateY(-18px) translateX(8px); }
          66% { transform: rotate(-14deg) translateY(8px) translateX(-5px); }
        }
        @keyframes floatText1 {
          0%, 100% { transform: rotate(8deg) translateX(0) translateY(0); }
          33% { transform: rotate(6deg) translateX(15px) translateY(-10px); }
          66% { transform: rotate(10deg) translateX(-8px) translateY(6px); }
        }
        @keyframes floatText2 {
          0%, 100% { transform: rotate(-5deg) translateY(0) translateX(0); }
          33% { transform: rotate(-3deg) translateY(12px) translateX(10px); }
          66% { transform: rotate(-7deg) translateY(-8px) translateX(-6px); }
        }
        @keyframes floatText3 {
          0%, 100% { transform: rotate(15deg) translateX(0) translateY(0); }
          33% { transform: rotate(13deg) translateX(-12px) translateY(8px); }
          66% { transform: rotate(17deg) translateX(8px) translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          25% { opacity: 0.6; transform: scale(1) rotate(45deg); color: #F5C518; }
          50% { opacity: 0.3; transform: scale(1.2) rotate(90deg); color: #FFD700; }
          75% { opacity: 0.7; transform: scale(0.8) rotate(135deg); color: #F5C518; }
        }
        @keyframes dotFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          25% { transform: translateY(-12px) scale(1.3); opacity: 0.9; }
          50% { transform: translateY(-6px) scale(1); opacity: 0.6; }
          75% { transform: translateY(-16px) scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
