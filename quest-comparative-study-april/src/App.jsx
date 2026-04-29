import React from 'react'

// =====================================================================
// Icons / logo
// =====================================================================

const QuestLogo = ({ size = 40 }) => (
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
    <path
      d="M32 4 a28 28 0 1 1 -19.8 47.8 a22 22 0 1 0 19.8 -39.6 z"
      fill="url(#qLight)"
    />
    <path
      d="M32 12 a20 20 0 1 0 14.1 34.1 l8 8 a4 4 0 0 0 5.7 -5.7 l-8 -8 A20 20 0 0 0 32 12 z m0 6 a14 14 0 1 1 0 28 a14 14 0 0 1 0 -28 z"
      fill="url(#qDark)"
    />
  </svg>
)

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
)

const Icon = ({ name, size = 16, color = 'currentColor', style = {} }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: 1.75,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style, 'aria-hidden': true,
  }
  switch (name) {
    case 'menu':
      return <svg {...props}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    case 'search':
      return <svg {...props}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    case 'pin':
      return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    case 'calendar':
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    case 'check':
      return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>
    case 'check-circle-filled':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#2c6e35"/>
          <polyline points="7 12 11 16 17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'chevron-right':
      return <svg {...props}><polyline points="9 18 15 12 9 6"/></svg>
    case 'chevron-left':
      return <svg {...props}><polyline points="15 18 9 12 15 6"/></svg>
    case 'chevron-down':
      return <svg {...props}><polyline points="6 9 12 15 18 9"/></svg>
    case 'arrow-right':
      return <svg {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    case 'clipboard':
      return <svg {...props}><rect x="8" y="4" width="8" height="4" rx="1"/><path d="M16 6h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
    case 'heart-pulse':
      return <svg {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><polyline points="3.5 12 7 12 9 8 13 16 15 12 20 12"/></svg>
    case 'droplet':
      return <svg {...props}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
    case 'pill':
      return <svg {...props}><rect x="2" y="8" width="20" height="8" rx="4" transform="rotate(-45 12 12)"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/></svg>
    case 'activity':
      return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    case 'shield':
      return <svg {...props}><path d="M12 2l9 4v6c0 5-3.5 9.5-9 10-5.5-.5-9-5-9-10V6z"/></svg>
    case 'microscope':
      return <svg {...props}><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>
    case 'test-tube':
      return <svg {...props}><path d="M14 2v17.5A2.5 2.5 0 0 1 11.5 22v0A2.5 2.5 0 0 1 9 19.5V2"/><path d="M8 2h8"/><path d="M9 12h5"/></svg>
    case 'blood-drops':
      return <svg {...props}><path d="M9 2.69 4.34 7.34a6 6 0 1 0 9.32 0L9 2.69z"/><path d="M16 13.5l-2.5 2.5a3.5 3.5 0 1 0 5 0L16 13.5z"/></svg>
    case 'vials':
      return <svg {...props}><path d="M5 3v15a3 3 0 0 0 6 0V3"/><path d="M3 3h10"/><path d="M5 10h6"/><path d="M14 3v15a3 3 0 0 0 6 0V3"/><path d="M12 3h10"/><path d="M14 10h6"/></svg>
    default: return null
  }
}

// =====================================================================
// Chrome (header / footer) and shared building blocks
// =====================================================================

const footerLink = {
  color: '#cfcfcf',
  textDecoration: 'underline',
  textUnderlineOffset: 2,
}

const Header = ({ onHome }) => {
  const [skipFocused, setSkipFocused] = React.useState(false)
  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e5e5e5',
      boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
      position: 'relative',
      zIndex: 5,
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '12px 28px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: 24,
        minHeight: 70,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <button aria-label="Menu" style={{
            background: 'none', border: 'none', padding: 6,
            color: '#3a3a3a', display: 'flex',
          }}>
            <Icon name="menu" size={22} />
          </button>
          <button onClick={onHome} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="Quest Diagnostics home">
            <QuestWordmark />
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="#main"
            onFocus={() => setSkipFocused(true)}
            onBlur={() => setSkipFocused(false)}
            style={{
              background: '#2c6e35',
              color: '#fff',
              padding: '8px 18px',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: 2,
              borderRadius: 0,
              outline: skipFocused ? '2px solid #b6cc1f' : 'none',
            }}
          >
            Skip to main content
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ fontSize: 11, color: '#222', fontWeight: 600 }}>
            Hello, Test Sampleman
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, fontFamily: "'Source Sans 3', sans-serif" }}>
            <span style={{ color: '#2c6e35' }}>Healthy</span>
            <span style={{ color: '#7fb342' }}>Quest</span>
          </div>
        </div>
      </div>
    </header>
  )
}

const Footer = () => (
  <footer style={{
    background: 'var(--quest-footer)',
    color: 'var(--quest-footer-text)',
    padding: '32px 28px 28px',
    fontSize: 11,
    lineHeight: 1.55,
    marginTop: 'auto',
  }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 18 }}>
        <div style={{ opacity: 0.9 }}>
          <QuestLogo size={42} />
          <div style={{ marginTop: 6, fontSize: 13, color: '#9bb86a', fontWeight: 600 }}>Quest</div>
          <div style={{ fontSize: 10, color: '#9bb86a' }}>Diagnostics</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 14, fontSize: 11 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#a8c8e8', textDecoration: 'underline' }}>
          <span style={{
            display: 'inline-block', width: 24, height: 12, borderRadius: 6,
            background: '#0066cc', position: 'relative', verticalAlign: 'middle',
          }}>
            <span style={{
              position: 'absolute', left: 1, top: 1, width: 10, height: 10,
              borderRadius: '50%', background: '#fff', fontSize: 8, color: '#0066cc',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
            }}>✓</span>
          </span>
          Your Privacy Choices
        </span>
        <a href="#" style={footerLink}>Contact Us</a>
        <a href="#" style={footerLink}>FAQ</a>
        <a href="#" style={footerLink}>About Us</a>
        <a href="#" style={footerLink}>Privacy Notices ↗</a>
        <a href="#" style={footerLink}>Terms ↗</a>
        <a href="#" style={footerLink}>Privacy Shield ↗</a>
      </div>

      <p style={{ textAlign: 'center', maxWidth: 980, margin: '0 auto 12px', color: '#bcbcbc' }}>
        Quest® is the brand name used for services offered by Quest Diagnostics Incorporated and its affiliated companies. Quest Diagnostics Incorporated and certain affiliates are CLIA-certified laboratories that provide HIPAA-covered services. Other affiliates operated under the Quest® brand, such as Quest Consumer Inc., do not provide HIPAA-covered services.
      </p>
      <p style={{ textAlign: 'center', maxWidth: 980, margin: '0 auto 12px', color: '#bcbcbc' }}>
        Quest, Quest Diagnostics®, any associated logos, and all associated Quest Diagnostics registered or unregistered trademarks are the property of Quest Diagnostics. All third-party marks—® and ™—are the property of their respective owners. © 2026 Quest Diagnostics Incorporated. All rights reserved. Image content features models and is intended for illustrative purposes only.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, fontSize: 11, marginTop: 6 }}>
        <a href="#" style={footerLink}>Language Assistance / Non-Discrimination Notice ↗</a>
        <span>|</span>
        <a href="#" style={footerLink}>Asistencia de idiomas / Aviso de no Discriminación ↗</a>
        <span>|</span>
        <a href="#" style={footerLink}>语言援助/不歧视通知 ↗</a>
      </div>

      <div style={{ textAlign: 'center', marginTop: 14, fontSize: 11 }}>
        <a href="#" style={{ ...footerLink, textDecoration: 'underline' }}>Last Login: 9:31 am EDT on 04/29/2026</a>
      </div>
    </div>
  </footer>
)

const Card = ({ children, accent = 'none', style = {}, padded = true }) => {
  let topBorder = null
  if (accent === 'green') {
    topBorder = (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#2c6e35' }} />
    )
  } else if (accent === 'lime') {
    topBorder = (
      <>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#2c6e35' }} />
        <div style={{ position: 'absolute', top: 4, left: 0, right: 0, height: 3, background: '#b6cc1f' }} />
      </>
    )
  }
  return (
    <div style={{
      position: 'relative',
      background: '#fff',
      border: '1px solid var(--quest-border)',
      marginBottom: 16,
      ...style,
    }}>
      {topBorder}
      <div style={{ padding: padded ? '20px 24px' : 0, paddingTop: padded ? (accent === 'lime' ? 26 : 24) : 0 }}>
        {children}
      </div>
    </div>
  )
}

const SectionTitle = ({ children, right = null }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  }}>
    <h2 style={{
      margin: 0,
      color: '#2c6e35',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '-0.005em',
      lineHeight: 1.1,
    }}>{children}</h2>
    {right && <div>{right}</div>}
  </div>
)

const CollapsedSection = ({ title }) => (
  <div style={{
    background: '#cfcfcf',
    border: '1px solid #b8b8b8',
    padding: '16px 20px',
    marginBottom: 16,
    color: '#3a3a3a',
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: '-0.005em',
  }}>
    {title}
  </div>
)

const CompletedHeader = ({ title, onChange }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
    <h2 style={{ margin: 0, color: '#2c6e35', fontSize: 22, fontWeight: 600 }}>{title}</h2>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={onChange} style={{
        background: 'none', border: 'none', color: '#2c6e35',
        textDecoration: 'underline', fontSize: 14, fontWeight: 500, padding: 0,
      }}>Change</button>
      <Icon name="check-circle-filled" size={26} />
    </div>
  </div>
)

const PrimaryButton = ({ children, onClick, disabled = false, type = 'button', icon = null, style = {} }) => (
  <button type={type} onClick={onClick} disabled={disabled} style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: disabled ? '#b8b8b8' : '#2c6e35',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    fontSize: 14,
    fontWeight: 600,
    textDecoration: disabled ? 'none' : 'underline',
    textUnderlineOffset: 2,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 120ms',
    ...style,
  }}
  onMouseDown={e => { if (!disabled) e.currentTarget.style.background = '#1d4a23' }}
  onMouseUp={e => { if (!disabled) e.currentTarget.style.background = '#2c6e35' }}
  onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = '#2c6e35' }}
  onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = '#245a2c' }}
  >
    {icon && <Icon name={icon} size={14} />}
    <span>{children}</span>
    <span style={{ fontSize: 14, marginLeft: 2 }}>›</span>
  </button>
)

const TextLink = ({ children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none',
    color: '#2c6e35', textDecoration: 'underline',
    textUnderlineOffset: 2, padding: 0, fontSize: 14,
    fontWeight: 500, cursor: 'pointer', ...style,
  }}>{children}</button>
)

// =====================================================================
// Shared layout style tokens
// =====================================================================

const mainWrap = {
  flex: 1,
  background: '#f4f4f4',
  width: '100%',
}

const contentWrap = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '0 24px 48px',
}

// =====================================================================
// Home screen
// =====================================================================

const HomeScreen = ({ onNav }) => {
  const greeting = 'Welcome back, Test'

  return (
    <main id="main" style={mainWrap}>
      <div style={contentWrap}>
        <div style={{ padding: '32px 0 20px' }}>
          <h1 style={{
            margin: 0,
            color: '#2c6e35',
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}>{greeting}</h1>
          <p style={{ margin: '6px 0 0', color: '#3a3a3a', fontSize: 15 }}>
            Choose a wellness service to get started, or continue where you left off.
          </p>
        </div>

        <Card accent="green">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 20, alignItems: 'center' }}>
            <div>
              <SectionTitle>Why You Should Participate</SectionTitle>
              <p style={{ margin: '4px 0 0', color: '#3a3a3a', fontSize: 14, maxWidth: 540 }}>
                Completing a screening gives you the knowledge you need to identify your health risks
                and transform your health. Schedule today to stay on track with your wellness goals.
              </p>
            </div>
            <div style={{
              width: 220, height: 130,
              background: 'linear-gradient(135deg, #c9d4a3 0%, #8eb469 50%, #4f7d3c 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 30% 60%, rgba(255,255,255,0.18), transparent 50%)',
              }} />
              <div style={{
                position: 'absolute', bottom: 8, right: 10,
                fontSize: 9, color: 'rgba(255,255,255,0.7)',
              }}>image placeholder</div>
            </div>
          </div>
        </Card>

        <Card accent="green">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center' }}>
            <div>
              <SectionTitle>All Services</SectionTitle>
              <p style={{ margin: '0 0 14px', color: '#3a3a3a', fontSize: 14, maxWidth: 540 }}>
                Schedule a screening, flu shot, or other available service. Choose what you need and we'll guide you through booking.
              </p>
              <PrimaryButton onClick={() => onNav('services')}>View All Services</PrimaryButton>
            </div>
            <div style={{
              width: 110, height: 110, background: '#f1f5ed',
              border: '1px solid #d4e0c5', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#2c6e35',
            }}>
              <Icon name="activity" size={56} />
            </div>
          </div>
        </Card>

        <Card accent="green">
          <SectionTitle>Biometric Screening</SectionTitle>
          <p style={{ margin: '4px 0 14px', fontSize: 14, color: '#3a3a3a' }}>
            To get started, select an appointment method below.
          </p>
          <div style={{
            paddingTop: 14, borderTop: '1px solid #e8e8e8',
          }}>
            <div style={{ color: '#5a5a5a', fontSize: 18, fontWeight: 500, marginBottom: 6 }}>At an Event</div>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: '#3a3a3a', maxWidth: 460 }}>
              Attend an event at work or a location designated by your organization.
            </p>
            <PrimaryButton onClick={() => onNav('services')}>Make an Appointment</PrimaryButton>
          </div>
        </Card>

        <Card accent="green">
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, alignItems: 'center' }}>
            <div style={{
              width: 220, height: 130,
              background: 'linear-gradient(135deg, #d8d4a8 0%, #8a9555 60%, #4a6b3a 100%)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', bottom: 8, right: 10,
                fontSize: 9, color: 'rgba(255,255,255,0.7)',
              }}>image placeholder</div>
            </div>
            <div>
              <SectionTitle>Health Questionnaire</SectionTitle>
              <p style={{ margin: '4px 0 14px', fontSize: 14, color: '#3a3a3a' }}>
                Complete your health questionnaire for your current program to get deeper insights about your health and wellness.
              </p>
              <PrimaryButton>Continue Health Questionnaire</PrimaryButton>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

// =====================================================================
// All Services screen
// =====================================================================

const ALL_SERVICES = [
  {
    id: 'employer',
    title: 'Employer Health and Wellness Screening',
    desc: 'Employer or health plan sponsored health screening.',
    duration: '20 min',
    icon: 'microscope',
    available: true,
    routesTo: null,
  },
  {
    id: 'flu',
    title: 'Flu Shot',
    desc: 'Annual flu vaccination.',
    duration: '10 min',
    icon: 'test-tube',
    available: true,
    badge: 'In season',
    routesTo: 'schedule',
  },
  {
    id: 'blood-cancer',
    title: 'Blood-Based Cancer Screening',
    desc: 'Standard panels, metabolic tests, or specialist blood draws ordered by your physician.',
    duration: '15 min',
    icon: 'blood-drops',
    available: true,
    routesTo: null,
  },
  {
    id: 'colorectal',
    title: 'Colorectal Cancer Screening',
    desc: 'Select this for specific tests (like EKG, respiratory, or allergy testing) not listed elsewhere.',
    duration: '15 min',
    icon: 'vials',
    available: true,
    routesTo: null,
  },
]

const ServicesScreen = ({ onSelectService, onBack }) => {
  const [selected, setSelected] = React.useState(null)
  const [hint] = React.useState(null)

  const handleClick = (svc) => {
    if (!svc.routesTo) return
    setSelected(svc.id)
    setTimeout(() => onSelectService(svc.id), 180)
  }

  return (
    <main id="main" style={mainWrap}>
      <div style={contentWrap}>
        <div style={{
          padding: '20px 0 8px',
          fontSize: 13,
          color: '#5a5a5a',
        }}>
          <button onClick={onBack} style={{
            background: 'none', border: 'none', color: '#2c6e35',
            textDecoration: 'underline', padding: 0, fontSize: 13, cursor: 'pointer',
          }}>Home</button>
          <span style={{ margin: '0 8px', color: '#888' }}>/</span>
          <span>All Services</span>
        </div>

        <div style={{ padding: '8px 0 16px' }}>
          <h1 style={{
            margin: 0, color: '#2c6e35', fontSize: 30, fontWeight: 600,
            letterSpacing: '-0.01em',
          }}>All Services</h1>
          <p style={{ margin: '6px 0 0', color: '#3a3a3a', fontSize: 15 }}>
            Select a service to get started. We'll guide you through location, date and time.
          </p>
        </div>

        <Card accent="green" padded={false}>
          <ol style={{
            listStyle: 'none', margin: 0, padding: 0,
          }}>
            {ALL_SERVICES.map((svc, i) => {
              const isSelected = selected === svc.id
              const showHint = hint === svc.id
              const isClickable = !!svc.routesTo
              return (
                <li key={svc.id} style={{
                  borderBottom: i < ALL_SERVICES.length - 1 ? '1px solid #e8e8e8' : 'none',
                }}>
                  <button
                    onClick={() => handleClick(svc)}
                    disabled={!isClickable}
                    style={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: '40px 64px 1fr auto',
                      alignItems: 'center',
                      gap: 16,
                      padding: '20px 24px',
                      background: isSelected ? '#f1f5ed' : '#fff',
                      border: 'none',
                      borderLeft: isSelected ? '4px solid #b6cc1f' : '4px solid transparent',
                      textAlign: 'left',
                      cursor: isClickable ? 'pointer' : 'default',
                      transition: 'background 120ms, border-color 120ms',
                    }}
                    onMouseEnter={e => { if (isClickable && !isSelected) e.currentTarget.style.background = '#fafaf6' }}
                    onMouseLeave={e => { if (isClickable && !isSelected) e.currentTarget.style.background = '#fff' }}
                  >
                    <span style={{
                      fontSize: 22, fontWeight: 600, color: '#2c6e35',
                      fontVariantNumeric: 'tabular-nums',
                    }}>{i + 1}.</span>

                    <span style={{
                      width: 56, height: 56, borderRadius: 0,
                      background: '#f1f5ed', border: '1px solid #d4e0c5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#2c6e35',
                    }}>
                      <Icon name={svc.icon} size={30} />
                    </span>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ color: '#2c6e35', fontSize: 20, fontWeight: 600 }}>
                          {svc.title}
                        </span>
                        {svc.badge && (
                          <span style={{
                            background: '#fffbe6',
                            color: '#7a5a00',
                            border: '1px solid #e8d97a',
                            padding: '2px 8px',
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}>{svc.badge}</span>
                        )}
                      </div>
                      <p style={{ margin: 0, color: '#3a3a3a', fontSize: 13, maxWidth: 460 }}>
                        {svc.desc}
                      </p>
                      {showHint && (
                        <div style={{
                          marginTop: 8, padding: '6px 10px',
                          background: '#fff8e1', border: '1px solid #e8d97a',
                          color: '#5a4400', fontSize: 12, display: 'inline-block',
                        }}>
                          Screening booking is handled separately on the Biometric Screening tile.
                        </div>
                      )}
                    </div>

                    <span style={{
                      color: '#2c6e35',
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 14, fontWeight: 600,
                      visibility: isClickable ? 'visible' : 'hidden',
                    }}>
                      <span style={{ textDecoration: 'underline' }}>Select</span>
                      <Icon name="chevron-right" size={18} />
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </Card>

        <div style={{ marginTop: 8, fontSize: 13, color: '#5a5a5a' }}>
          <TextLink onClick={onBack}>‹ Back to Home</TextLink>
        </div>
      </div>
    </main>
  )
}

// =====================================================================
// Schedule screen + steps
// =====================================================================

const LOCATIONS = [
  { id: 'loc1', name: 'Location 1', address: '2300 Steele St', city: 'Denver, CO 80205', distance: '1.2 mi', slots: 18 },
  { id: 'loc2', name: 'Location 2', address: '845 Sherman St', city: 'Denver, CO 80203', distance: '2.4 mi', slots: 12 },
  { id: 'loc3', name: 'Location 3', address: '1450 Larimer St, Suite 200', city: 'Denver, CO 80202', distance: '3.7 mi', slots: 6 },
  { id: 'loc4', name: 'Location 4', address: '7100 E Belleview Ave', city: 'Greenwood Village, CO 80111', distance: '8.1 mi', slots: 22 },
]

const TIME_SLOTS = [
  '8:00 AM', '8:10 AM', '8:20 AM', '8:30 AM', '8:40 AM', '8:50 AM',
  '9:00 AM', '9:10 AM', '9:20 AM', '9:30 AM', '9:40 AM',
  '10:00 AM', '10:20 AM', '10:30 AM',
  '11:00 AM', '11:10 AM', '11:30 AM',
  '1:00 PM', '1:10 PM', '1:30 PM', '1:40 PM',
  '2:00 PM', '2:20 PM', '2:30 PM', '2:50 PM',
  '3:00 PM', '3:10 PM', '3:30 PM',
]

const breadLink = {
  background: 'none', border: 'none', color: '#2c6e35',
  textDecoration: 'underline', padding: 0, fontSize: 13, cursor: 'pointer',
}
const breadSep = { margin: '0 8px', color: '#888' }

const fieldLabel = {
  display: 'block',
  fontSize: 11,
  color: '#5a5a5a',
  marginBottom: 4,
}

const textInput = {
  width: '100%',
  fontSize: 15,
  padding: '6px 0',
  border: 'none',
  borderBottom: '1px solid #888',
  background: 'transparent',
  outline: 'none',
  fontFamily: 'inherit',
  color: '#2b2b2b',
}

const errorText = {
  color: '#c5292a',
  fontSize: 12,
  marginTop: 4,
}

const iconBtn = {
  width: 28, height: 28,
  border: 'none', background: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#2b2b2b',
}

const dayCell = {
  height: 36,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 14, fontVariantNumeric: 'tabular-nums',
}

function formatLongDate(d) {
  if (!d) return ''
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
}
function formatShortDate(d) {
  if (!d) return ''
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${m}/${day}/${d.getFullYear()}`
}

const LocationStep = ({ state, data, updateData, onContinue, onChange, onCancel }) => {
  const [zip, setZip] = React.useState(data.zip || '')
  const [searched, setSearched] = React.useState(!!data.location)
  const [results, setResults] = React.useState(data.location ? LOCATIONS : [])
  const [selectedId, setSelectedId] = React.useState(data.location?.id || null)
  const [zipError, setZipError] = React.useState('')

  if (state === 'collapsed') {
    return <CollapsedSection title="Location" />
  }

  if (state === 'done') {
    return (
      <Card>
        <CompletedHeader title="Location" onChange={onChange} />
        <div style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600 }}>{data.location.name}</div>
          <div>{data.location.address}</div>
          <div>{data.location.city}</div>
        </div>
      </Card>
    )
  }

  const runSearch = () => {
    if (!/^\d{5}$/.test(zip)) {
      setZipError('Please enter a valid 5-digit ZIP code.')
      return
    }
    setZipError('')
    updateData({ zip })
    setResults(LOCATIONS)
    setSearched(true)
    setSelectedId(null)
  }

  const useMyLocation = () => {
    setZip('80205')
    setZipError('')
    updateData({ zip: '80205' })
    setResults(LOCATIONS)
    setSearched(true)
    setSelectedId(null)
  }

  const pickLocation = (loc) => {
    setSelectedId(loc.id)
    updateData({ location: loc })
  }

  const canContinue = !!selectedId

  return (
    <Card accent="lime">
      <SectionTitle>Location</SectionTitle>

      <div style={{ maxWidth: 540, marginBottom: 20 }}>
        <label style={fieldLabel}>
          Zip Code <span style={{ color: '#c5292a' }}>*</span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ''))}
          onKeyDown={(e) => { if (e.key === 'Enter') runSearch() }}
          style={{
            ...textInput,
            borderColor: zipError ? '#c5292a' : '#888',
          }}
        />
        {zipError && <div style={errorText}>{zipError}</div>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <PrimaryButton icon="search" onClick={runSearch}>Search</PrimaryButton>
        <span style={{ color: '#5a5a5a', fontSize: 14 }}>or</span>
        <PrimaryButton icon="pin" onClick={useMyLocation}>Use Your Location</PrimaryButton>
      </div>

      {searched && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, color: '#3a3a3a', marginBottom: 10 }}>
            Showing <strong>{results.length} locations</strong> near {zip}. Select one to continue.
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: '1px solid #e0e0e0' }}>
            {results.map((loc, i) => {
              const isSel = selectedId === loc.id
              return (
                <li key={loc.id} style={{
                  borderBottom: i < results.length - 1 ? '1px solid #e8e8e8' : 'none',
                }}>
                  <button
                    onClick={() => pickLocation(loc)}
                    style={{
                      width: '100%', textAlign: 'left',
                      background: isSel ? '#f1f5ed' : '#fff',
                      borderLeft: isSel ? '4px solid #2c6e35' : '4px solid transparent',
                      border: 'none',
                      borderBottom: 'none',
                      padding: '12px 16px',
                      display: 'grid',
                      gridTemplateColumns: '24px 1fr auto auto',
                      gap: 12,
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = '#fafaf6' }}
                    onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = '#fff' }}
                  >
                    <span style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `2px solid ${isSel ? '#2c6e35' : '#888'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isSel && <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2c6e35' }} />}
                    </span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#2c6e35' }}>{loc.name}</div>
                      <div style={{ fontSize: 13, color: '#3a3a3a' }}>{loc.address}</div>
                      <div style={{ fontSize: 13, color: '#3a3a3a' }}>{loc.city}</div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 12, color: '#5a5a5a' }}>
                      <div>{loc.distance}</div>
                      <div style={{ color: '#2c6e35', fontWeight: 600 }}>{loc.slots} times available</div>
                    </div>
                    <Icon name="chevron-right" size={18} color="#888" />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        paddingTop: 14, borderTop: '1px solid #e8e8e8',
      }}>
        <PrimaryButton onClick={onContinue} disabled={!canContinue}>Continue</PrimaryButton>
        <TextLink onClick={onCancel}>Cancel</TextLink>
      </div>
    </Card>
  )
}

const CalendarModal = ({ selected, onSelect, onClose }) => {
  const initial = selected || new Date(2026, 6, 1)
  const [view, setView] = React.useState({
    year: (selected || initial).getFullYear(),
    month: (selected || initial).getMonth(),
  })

  const monthName = new Date(view.year, view.month, 1)
    .toLocaleString('en-US', { month: 'long' }).toUpperCase()
  const monthShort = new Date(view.year, view.month, 1)
    .toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const yearLabel = `${monthName.slice(0, 3)} ${view.year}`

  const firstDay = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  const today = new Date(2026, 3, 29)

  const cells = []
  for (let i = 0; i < firstDay; i++) {
    cells.push({ blank: true, key: `b${i}` })
  }
  const isJulyView = view.year === 2026 && view.month === 6
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(view.year, view.month, d)
    const isAvailable = isJulyView && d === 9
    const isToday = date.toDateString() === today.toDateString()
    cells.push({
      day: d,
      date,
      disabled: !isAvailable,
      isToday,
      isSelected: selected && date.toDateString() === selected.toDateString(),
      key: `d${d}`,
    })
  }

  const moveMonth = (delta) => {
    let m = view.month + delta
    let y = view.year
    if (m < 0) { m = 11; y -= 1 }
    if (m > 11) { m = 0; y += 1 }
    setView({ year: y, month: m })
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
          zIndex: 50,
        }}
      />
      <div role="dialog" aria-label="Choose a date" style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
        width: 380,
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 51,
        padding: '20px 22px 22px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 14,
        }}>
          <button style={{
            background: 'none', border: 'none', padding: 0, fontSize: 14,
            color: '#2b2b2b', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
          }}>
            {yearLabel}
            <Icon name="chevron-down" size={16} />
          </button>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => moveMonth(-1)} aria-label="Previous month" style={iconBtn}>
              <Icon name="chevron-left" size={18} />
            </button>
            <button onClick={() => moveMonth(1)} aria-label="Next month" style={iconBtn}>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center', fontSize: 11, color: '#777',
          textTransform: 'uppercase', letterSpacing: '0.04em',
          marginBottom: 6,
        }}>
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: 4, columnGap: 0,
        }}>
          {cells.map((c, i) => {
            if (c.blank) {
              if (i === 0) {
                return <div key={c.key} style={{ ...dayCell, color: '#777', fontSize: 12 }}>{monthShort}</div>
              }
              return <div key={c.key} style={dayCell} />
            }
            const dayStyle = {
              ...dayCell,
              color: c.disabled ? '#c5c5c5' : '#2b2b2b',
              cursor: c.disabled ? 'not-allowed' : 'pointer',
              border: c.isSelected ? '2px solid #2c6e35' : '2px solid transparent',
              borderRadius: '50%',
              fontWeight: c.isSelected ? 600 : 400,
            }
            return (
              <button
                key={c.key}
                disabled={c.disabled}
                onClick={() => !c.disabled && onSelect(c.date)}
                style={{ ...dayStyle, background: 'none' }}
                onMouseEnter={(e) => { if (!c.disabled && !c.isSelected) e.currentTarget.style.background = '#f1f5ed' }}
                onMouseLeave={(e) => { if (!c.disabled && !c.isSelected) e.currentTarget.style.background = 'none' }}
              >
                {c.day}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

const DateTimeStep = ({ state, data, updateData, onContinue, onBack, onChange }) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const [timeOpen, setTimeOpen] = React.useState(false)
  const [showRequired, setShowRequired] = React.useState(false)

  if (state === 'collapsed') {
    return <CollapsedSection title="Date & Time" />
  }

  if (state === 'done') {
    return (
      <Card>
        <CompletedHeader title="Date & Time" onChange={onChange} />
        <div style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.6 }}>
          <div>{formatLongDate(data.date)}</div>
          <div>{data.time}</div>
        </div>
      </Card>
    )
  }

  const dateString = data.date ? formatShortDate(data.date) : ''
  const canContinue = !!data.date && !!data.time

  return (
    <Card accent="lime">
      <SectionTitle>Date &amp; Time</SectionTitle>
      <p style={{ margin: '0 0 14px', fontSize: 14, color: '#3a3a3a' }}>
        Select a date to find availability at the above location.
      </p>

      <div style={{ maxWidth: 540, marginBottom: 6, position: 'relative' }}>
        <label style={fieldLabel}>
          Choose a date <span style={{ color: '#c5292a' }}>*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            readOnly
            value={dateString}
            placeholder=""
            onClick={() => setCalendarOpen(true)}
            style={{
              ...textInput,
              cursor: 'pointer',
              paddingRight: 36,
              borderColor: showRequired && !data.date ? '#c5292a' : '#888',
            }}
          />
          <button
            onClick={() => setCalendarOpen(true)}
            aria-label="Open calendar"
            style={{
              position: 'absolute', right: 0, top: 0, bottom: 0,
              background: 'none', border: 'none', padding: '0 8px',
              color: '#3a3a3a', display: 'flex', alignItems: 'center',
            }}>
            <Icon name="calendar" size={20} />
          </button>
        </div>
        {!data.date && showRequired && (
          <div style={errorText}>Required</div>
        )}
        <div style={{ fontSize: 11, color: '#777', marginTop: 4 }}>Example: 01/25/1990</div>
      </div>

      {data.date && (
        <div style={{ maxWidth: 540, marginTop: 16, position: 'relative' }}>
          <p style={{ margin: '0 0 8px', fontSize: 14, color: '#3a3a3a' }}>
            Select the time of your appointment. Unavailable times will not display.
          </p>
          <label style={fieldLabel}>
            Choose a time <span style={{ color: '#c5292a' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setTimeOpen((v) => !v)}
              style={{
                ...textInput,
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                background: '#fff',
                paddingRight: 36,
                color: data.time ? '#2b2b2b' : '#9a9a9a',
              }}>
              {data.time || 'Choose a time'}
            </button>
            <span style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              color: '#3a3a3a', display: 'flex', alignItems: 'center', pointerEvents: 'none',
            }}>
              <Icon name="chevron-down" size={18} />
            </span>
            {timeOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                background: '#fff', border: '1px solid #c5c5c5',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                maxHeight: 240, overflowY: 'auto',
                zIndex: 5,
              }}>
                <div style={{
                  padding: '10px 14px', fontSize: 12, color: '#777',
                  borderBottom: '1px solid #eee', background: '#fafafa',
                }}>Choose a time</div>
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    onClick={() => { updateData({ time: t }); setTimeOpen(false) }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 14px', background: data.time === t ? '#f1f5ed' : '#fff',
                      border: 'none', borderBottom: '1px solid #f0f0f0',
                      fontSize: 14, color: '#2b2b2b', cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { if (data.time !== t) e.currentTarget.style.background = '#f7f7f3' }}
                    onMouseLeave={(e) => { if (data.time !== t) e.currentTarget.style.background = '#fff' }}
                  >{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        paddingTop: 18, marginTop: 18, borderTop: '1px solid #e8e8e8',
      }}>
        <PrimaryButton onClick={() => {
          if (!canContinue) { setShowRequired(true); return }
          onContinue()
        }} disabled={!canContinue}>Continue</PrimaryButton>
        <TextLink onClick={onBack}>Back</TextLink>
      </div>

      {calendarOpen && (
        <CalendarModal
          selected={data.date}
          onSelect={(d) => { updateData({ date: d, time: null }); setCalendarOpen(false) }}
          onClose={() => setCalendarOpen(false)}
        />
      )}
    </Card>
  )
}

const ReviewStep = ({ state, data, onConfirm, onCancel }) => {
  if (state === 'collapsed') {
    return <CollapsedSection title="Review &amp; Confirm" />
  }
  return (
    <Card accent="lime">
      <SectionTitle>Review &amp; Confirm</SectionTitle>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <PrimaryButton onClick={onConfirm}>Confirm</PrimaryButton>
        <TextLink onClick={onCancel}>Cancel</TextLink>
      </div>
      <p style={{ fontSize: 12, color: '#777', margin: 0 }}>
        Your appointment is not scheduled until you click confirm.
      </p>
    </Card>
  )
}

const ScheduleScreen = ({ onConfirm, onBack }) => {
  const [step, setStep] = React.useState('location')
  const [data, setData] = React.useState({
    zip: '66219',
    location: null,
    date: null,
    time: null,
  })

  const completed = {
    location: !!data.location && step !== 'location',
    datetime: !!data.date && !!data.time && step !== 'datetime',
  }

  const goToStep = (s) => setStep(s)
  const updateData = (patch) => setData(d => ({ ...d, ...patch }))

  const submitConfirm = () => onConfirm(data)

  return (
    <main id="main" style={mainWrap}>
      <div style={contentWrap}>
        <div style={{ padding: '20px 0 8px', fontSize: 13, color: '#5a5a5a' }}>
          <button onClick={onBack} style={breadLink}>Home</button>
          <span style={breadSep}>/</span>
          <button onClick={onBack} style={breadLink}>All Services</button>
          <span style={breadSep}>/</span>
          <span>Flu Shot</span>
        </div>

        <div style={{ padding: '8px 0 16px' }}>
          <h1 style={{ margin: 0, color: '#2c6e35', fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Schedule your flu shot
          </h1>
          <p style={{ margin: '6px 0 0', color: '#3a3a3a', fontSize: 14 }}>
            Complete each step to book your appointment.
          </p>
        </div>

        <LocationStep
          state={step === 'location' ? 'active' : (completed.location ? 'done' : 'collapsed')}
          data={data}
          updateData={updateData}
          onContinue={() => goToStep('datetime')}
          onChange={() => goToStep('location')}
          onCancel={onBack}
        />

        <DateTimeStep
          state={step === 'datetime' ? 'active' : (completed.datetime ? 'done' : 'collapsed')}
          data={data}
          updateData={updateData}
          onContinue={() => goToStep('review')}
          onBack={() => goToStep('location')}
          onChange={() => goToStep('datetime')}
        />

        <ReviewStep
          state={step === 'review' ? 'active' : 'collapsed'}
          data={data}
          onConfirm={submitConfirm}
          onCancel={onBack}
        />
      </div>
    </main>
  )
}

// =====================================================================
// Confirmation screen
// =====================================================================

const PrepTip = ({ icon, text }) => (
  <div style={{ textAlign: 'center', padding: '0 4px' }}>
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: '#b6cc1f',
      margin: '0 auto 10px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#2c6e35',
    }}>
      <Icon name={icon} size={22} />
    </div>
    <div style={{ fontSize: 13, color: '#3a3a3a', lineHeight: 1.45 }}>{text}</div>
  </div>
)

const ConfirmationScreen = ({ data, onHome }) => {
  const confirmation = React.useMemo(
    () => `QFL-${Math.floor(Math.random() * 900000 + 100000)}`,
    []
  )
  return (
    <main id="main" style={mainWrap}>
      <div style={contentWrap}>
        <div style={{ padding: '28px 0 16px' }}>
          <h1 style={{
            margin: 0, color: '#2c6e35', fontSize: 30, fontWeight: 600,
            letterSpacing: '-0.01em',
          }}>Thank you, Test</h1>
          <p style={{ margin: '6px 0 0', color: '#3a3a3a', fontSize: 15 }}>
            Your flu shot has been scheduled at the location below.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 16,
          marginBottom: 16,
        }}>
          <Card accent="green" style={{ marginBottom: 0 }}>
            <SectionTitle>At an Event</SectionTitle>
            <div style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.7, marginBottom: 14 }}>
              <div style={{ fontWeight: 600 }}>{data.location.name}</div>
              <div>{data.location.address}</div>
              <div>{data.location.city}</div>
              <div style={{ marginTop: 10 }}>{formatLongDate(data.date)}</div>
              <div>{data.time}</div>
            </div>
            <PrimaryButton onClick={onHome}>Back to Dashboard</PrimaryButton>
          </Card>

          <Card accent="green" style={{ marginBottom: 0 }}>
            <SectionTitle>Prepare For Your Appointment</SectionTitle>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16, marginTop: 8, marginBottom: 14,
            }}>
              <PrepTip icon="droplet" text="Drink plenty of water prior to your appointment." />
              <PrepTip icon="pill" text="Continue to take all medications as prescribed by your healthcare provider." />
              <PrepTip icon="clipboard" text="Bring a photo ID and your insurance card to your appointment." />
            </div>
            <div style={{
              fontSize: 13, color: '#3a3a3a',
              borderTop: '1px solid #e8e8e8',
              paddingTop: 12,
            }}>
              For questions, contact the Health &amp; Wellness Service Center: <strong>800.591.9220</strong>
            </div>
          </Card>
        </div>

        <div style={{
          fontSize: 13, color: '#5a5a5a',
          padding: '10px 0',
        }}>
          Confirmation #: <strong style={{ color: '#2b2b2b' }}>{confirmation}</strong>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          A confirmation email has been sent to your account on file.
        </div>
      </div>
    </main>
  )
}

// =====================================================================
// App
// =====================================================================

export default function App() {
  const [route, setRoute] = React.useState('home')
  const [confirmedData, setConfirmedData] = React.useState(null)

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [route])

  const screen = (() => {
    switch (route) {
      case 'home':
        return (
          <div data-screen-label="01 Home">
            <HomeScreen onNav={(r) => setRoute(r)} />
          </div>
        )
      case 'services':
        return (
          <div data-screen-label="02 All Services">
            <ServicesScreen
              onSelectService={(svcId) => {
                if (svcId === 'flu') setRoute('schedule')
              }}
              onBack={() => setRoute('home')}
            />
          </div>
        )
      case 'schedule':
        return (
          <div data-screen-label="03 Schedule (Location · Date · Review)">
            <ScheduleScreen
              onConfirm={(d) => { setConfirmedData(d); setRoute('confirmation') }}
              onBack={() => setRoute('services')}
            />
          </div>
        )
      case 'confirmation':
        return (
          <div data-screen-label="04 Confirmation">
            <ConfirmationScreen
              data={confirmedData}
              onHome={() => { setConfirmedData(null); setRoute('home') }}
            />
          </div>
        )
      default:
        return null
    }
  })()

  return (
    <>
      <Header onHome={() => setRoute('home')} />
      {screen}
      <Footer />
    </>
  )
}
