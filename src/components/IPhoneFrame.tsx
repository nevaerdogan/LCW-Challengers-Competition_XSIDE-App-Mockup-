import type { ReactNode } from 'react';

interface IPhoneFrameProps {
  children: ReactNode;
}

export default function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 375, height: 812 }}>
      {/* Phone outer shell */}
      <div
        className="absolute inset-0 rounded-[55px] bg-[#1a1a1a]"
        style={{
          boxShadow: '0 0 0 2px #333, 0 25px 80px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.2)',
        }}
      />

      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[120px] w-[3px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute -left-[3px] top-[170px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute -left-[3px] top-[230px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute -right-[3px] top-[180px] w-[3px] h-[65px] bg-[#2a2a2a] rounded-r-sm" />

      {/* Screen bezel */}
      <div className="absolute inset-[8px] rounded-[47px] overflow-hidden bg-black">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-[11px] pointer-events-none">
          <div className="w-[126px] h-[37px] bg-black rounded-full" />
        </div>

        {/* Screen content */}
        <div className="w-full h-full overflow-hidden rounded-[47px]">
          {children}
        </div>
      </div>
    </div>
  );
}
