// Quest logo (circular green swirl) and small icons used throughout the flow.

const QuestLogo = ({ size = 40 }) => (
  // Recreates the Quest Diagnostics circular leaf-mark in two greens.
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="qLight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a6cc4a" />
        <stop offset="100%" stopColor="#7fb342" />
      </linearGradient>
      <linearGradient id="qDark" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#2f6b2c" />
        <stop offset="100%" stopColor="#4f8c3a" />
      </linearGradient>
    </defs>
    {/* outer arc — light green */}
    <path
      d="M32 4 a28 28 0 1 1 -19.8 47.8 a22 22 0 1 0 19.8 -39.6 z"
      fill="url(#qLight)"
    />
    {/* inner arc — dark green forming the Q tail */}
    <path
      d="M32 12 a20 20 0 1 0 14.1 34.1 l8 8 a4 4 0 0 0 5.7 -5.7 l-8 -8 A20 20 0 0 0 32 12 z m0 6 a14 14 0 1 1 0 28 a14 14 0 0 1 0 -28 z"
      fill="url(#qDark)"
    />
  </svg>
);

const QuestWordmark = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <QuestLogo size={44} />
    <div style={{ lineHeight: 1, paddingTop: 2 }}>
      <div style={{
        fontSize: 26,
        fontWeight: 700,
        color: '#5a8a3a',
        letterSpacing: '-0.01em',
        fontFamily: "'Source Sans 3', sans-serif",
      }}>
        Quest<sup style={{ fontSize: 11, fontWeight: 600, top: '-0.9em' }}>®</sup>
      </div>
      <div style={{
        fontSize: 13,
        color: '#7a9a5a',
        fontWeight: 400,
        marginTop: 2,
        letterSpacing: '0.01em',
      }}>
        Diagnostics
      </div>
    </div>
  </div>
);

// Small inline icons (line style, 1.75 stroke, currentColor)
const Icon = ({ name, size = 16, color = 'currentColor', style = {} }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: 1.75,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style, 'aria-hidden': true,
  };
  switch (name) {
    case 'menu':
      return <svg {...props}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
    case 'search':
      return <svg {...props}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    case 'pin':
      return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'calendar':
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case 'check':
      return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>;
    case 'check-circle-filled':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#2c6e35"/>
          <polyline points="7 12 11 16 17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'chevron-right':
      return <svg {...props}><polyline points="9 18 15 12 9 6"/></svg>;
    case 'chevron-left':
      return <svg {...props}><polyline points="15 18 9 12 15 6"/></svg>;
    case 'chevron-down':
      return <svg {...props}><polyline points="6 9 12 15 18 9"/></svg>;
    case 'arrow-right':
      return <svg {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
    case 'syringe':
      return <svg {...props}><path d="M18 2l4 4"/><path d="M17 7l-2-2 4-4 2 2-4 4z"/><path d="M14.5 5.5l4 4"/><path d="M3 21l3-3"/><path d="M9 15l-6 6"/><path d="M14.5 5.5L7 13l4 4 7.5-7.5"/></svg>;
    case 'clipboard':
      return <svg {...props}><rect x="8" y="4" width="8" height="4" rx="1"/><path d="M16 6h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>;
    case 'heart-pulse':
      return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><polyline points="3.5 12 7 12 9 8 13 16 15 12 20 12"/></svg>;
    case 'droplet':
      return <svg {...props}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
    case 'pill':
      return <svg {...props}><rect x="2" y="8" width="20" height="8" rx="4" transform="rotate(-45 12 12)"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></svg>;
    case 'utensils':
      return <svg {...props}><path d="M3 2v7a3 3 0 0 0 3 3v10"/><path d="M9 2v20"/><path d="M9 2v7a3 3 0 0 1-3 3"/><path d="M14 2h2a4 4 0 0 1 4 4v6h-6V6a4 4 0 0 1 4-4z"/><path d="M16 12v10"/></svg>;
    case 'lock':
      return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    case 'help':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
    case 'bell':
      return <svg {...props}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
    case 'home':
      return <svg {...props}><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>;
    case 'activity':
      return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
    case 'user':
      return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case 'shield':
      return <svg {...props}><path d="M12 2l9 4v6c0 5-3.5 9.5-9 10-5.5-.5-9-5-9-10V6z"/></svg>;
    case 'syringe-filled':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={color}>
          <path d="M19.71 4.29l-2-2a1 1 0 0 0-1.42 0l-1.79 1.8 3.42 3.41 1.79-1.79a1 1 0 0 0 0-1.42zM12.79 5.5L4.29 14a1 1 0 0 0-.29.5l-1 4a1 1 0 0 0 .26.95 1 1 0 0 0 .95.26l4-1a1 1 0 0 0 .5-.29l8.5-8.5z"/>
        </svg>
      );
    case 'microscope':
      return <svg {...props}><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>;
    case 'test-tube':
      return <svg {...props}><path d="M14 2v17.5A2.5 2.5 0 0 1 11.5 22v0A2.5 2.5 0 0 1 9 19.5V2"/><path d="M8 2h8"/><path d="M9 12h5"/></svg>;
    case 'blood-drops':
      return <svg {...props}><path d="M9 2.69 4.34 7.34a6 6 0 1 0 9.32 0L9 2.69z"/><path d="M16 13.5l-2.5 2.5a3.5 3.5 0 1 0 5 0L16 13.5z"/></svg>;
    case 'vials':
      return <svg {...props}><path d="M5 3v15a3 3 0 0 0 6 0V3"/><path d="M3 3h10"/><path d="M5 10h6"/><path d="M14 3v15a3 3 0 0 0 6 0V3"/><path d="M12 3h10"/><path d="M14 10h6"/></svg>;
    default: return null;
  }
};

window.QuestLogo = QuestLogo;
window.QuestWordmark = QuestWordmark;
window.Icon = Icon;
