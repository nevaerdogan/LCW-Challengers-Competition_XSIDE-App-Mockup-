interface Props {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: Props) {
  return (
    <div
      className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
      onClick={onNext}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-[15%] left-[10%] w-32 h-32 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-40 h-40 bg-amber-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-amber-400 rounded-2xl flex items-center justify-center rotate-12 shadow-lg shadow-amber-400/30">
            <span className="text-black text-[28px] font-black -rotate-12">X</span>
          </div>
        </div>

        <h1 className="text-white text-[42px] font-black tracking-tight leading-none">XSIDE</h1>
        <p className="text-amber-400/80 text-[13px] font-medium tracking-[4px] mt-2 uppercase">Express Your Style</p>

      </div>

      <p className="absolute bottom-16 text-white/30 text-[12px] font-medium tracking-wide">
        Devam etmek için dokun
      </p>
    </div>
  );
}
