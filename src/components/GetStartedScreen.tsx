interface Props {
  onNext: () => void;
}

const fashionImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=450&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=450&fit=crop',
];

export default function GetStartedScreen({ onNext }: Props) {
  return (
    <div className="w-full h-full bg-[#faf9f7] flex flex-col relative overflow-hidden">
      {/* Text content - upper area */}
      <div className="pb-2 px-8 text-center relative z-20" style={{ paddingTop: '66px' }}>
        <h2 className="text-[27px] font-extralight text-[#3a3a3a] leading-[1.25] tracking-[-0.01em]">
          Tarzını Keşfet,
        </h2>
        <h2 className="text-[27px] font-extralight text-[#c8a97e] leading-[1.25] tracking-[-0.01em]">
          Stilini Yarat
        </h2>
        <p className="text-[#3a3a3a] text-[11.5px] text-center mt-3 leading-[1.7] font-medium tracking-wide">
          Sana özel stil önerileri, kombinler
          <br />
          ve ödüller seni bekliyor
        </p>
      </div>

      {/* Image collage area */}
      <div className="flex-1 relative px-5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative h-full flex items-center justify-center" style={{ marginTop: '-10px' }}>
          {/* Left card */}
          <div
            className="absolute w-[115px] h-[160px] rounded-[22px] overflow-hidden border-[3px] border-white/90"
            style={{ left: '6%', top: '12%', transform: 'rotate(-7deg)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
          >
            <img src={fashionImages[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>

          {/* Center card */}
          <div
            className="relative w-[145px] h-[200px] rounded-[22px] overflow-hidden z-10 border-[3px] border-white/90"
            style={{ transform: 'rotate(1deg)', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
          >
            <img src={fashionImages[1]} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute bottom-2.5 left-2.5 bg-white/70 backdrop-blur-md rounded-full px-2.5 py-1">
              <span className="text-[#2a2a2a] text-[9px] font-medium tracking-wide">XSIDE</span>
            </div>
          </div>

          {/* Right card */}
          <div
            className="absolute w-[115px] h-[160px] rounded-[22px] overflow-hidden border-[3px] border-white/90"
            style={{ right: '6%', top: '16%', transform: 'rotate(6deg)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
          >
            <img src={fashionImages[2]} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Floating button */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center z-30" style={{ paddingBottom: 48 }}>
        <button
          onClick={onNext}
          className="flex items-center justify-center gap-2.5 bg-[#F5C518] text-[#1A1A1A] text-[15px] font-bold uppercase tracking-[1.5px] active:scale-[0.96] transition-all duration-200"
          style={{
            width: '80%',
            height: 56,
            borderRadius: 60,
            boxShadow: '0px 8px 24px rgba(245, 197, 24, 0.45)',
          }}
        >
          HEMEN KEŞFET
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
