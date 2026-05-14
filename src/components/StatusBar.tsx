export default function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 flex items-end justify-between h-[52px]" style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 4 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', letterSpacing: -0.3 }}>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="15" height="11" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#1a1a1a"/>
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill="#1a1a1a"/>
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="#1a1a1a"/>
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#1a1a1a"/>
        </svg>
        <svg width="14" height="11" viewBox="0 0 16 12" fill="none">
          <path d="M0.5 3.5C3.5 0.5 6.5 -0.5 8 -0.5s4.5 1 7.5 4" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <path d="M3 6C4.8 4.2 6.3 3.5 8 3.5s3.2 0.7 5 2.5" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <circle cx="8" cy="10.5" r="1.5" fill="#1a1a1a"/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="#1a1a1a" strokeOpacity="0.4" strokeWidth="1"/>
          <rect x="2" y="2" width="19" height="9" rx="1.5" fill="#1a1a1a"/>
          <path d="M24 4.5V8.5C25.1 8.17 25.1 4.83 24 4.5Z" fill="#1a1a1a" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
