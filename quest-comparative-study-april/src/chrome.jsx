// Quest header + footer chrome shared across all screens.

const Header = ({ onHome }) => {
  const [skipFocused, setSkipFocused] = React.useState(false);
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
        {/* left: hamburger + logo */}
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

        {/* center: skip to main content (visible per screenshot) */}
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

        {/* right: HealthyQuest + greeting */}
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
  );
};

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
);

const footerLink = {
  color: '#cfcfcf',
  textDecoration: 'underline',
  textUnderlineOffset: 2,
};

// ----- Common building blocks -----

// Quest's signature "card" — white surface, thin border, optional top accent stripe.
const Card = ({ children, accent = 'none', style = {}, padded = true }) => {
  // accent: 'green' | 'lime' | 'collapsed' | 'none'
  let topBorder = null;
  if (accent === 'green') {
    topBorder = (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#2c6e35' }} />
    );
  } else if (accent === 'lime') {
    topBorder = (
      <>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#2c6e35' }} />
        <div style={{ position: 'absolute', top: 4, left: 0, right: 0, height: 3, background: '#b6cc1f' }} />
      </>
    );
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
  );
};

// Section heading used inside cards (green, semibold, with bottom hairline)
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
);

// Collapsed section (gray bar) for steps not yet reached
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
);

// Completed-step header: green title, "Change" link + green check on the right
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
);

// Buttons --------------------------------------------------------------

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
  onMouseDown={e => { if (!disabled) e.currentTarget.style.background = '#1d4a23'; }}
  onMouseUp={e => { if (!disabled) e.currentTarget.style.background = '#2c6e35'; }}
  onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = '#2c6e35'; }}
  onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = '#245a2c'; }}
  >
    {icon && <Icon name={icon} size={14} />}
    <span>{children}</span>
    <span style={{ fontSize: 14, marginLeft: 2 }}>›</span>
  </button>
);

const SecondaryButton = ({ children, onClick, icon = null, style = {} }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: '#fff',
    color: '#2c6e35',
    border: '1px solid #2c6e35',
    padding: '7px 14px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    ...style,
  }}
  onMouseEnter={e => { e.currentTarget.style.background = '#f1f5ed'; }}
  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
  >
    {icon && <Icon name={icon} size={14} />}
    <span>{children}</span>
  </button>
);

const TextLink = ({ children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none',
    color: '#2c6e35', textDecoration: 'underline',
    textUnderlineOffset: 2, padding: 0, fontSize: 14,
    fontWeight: 500, cursor: 'pointer', ...style,
  }}>{children}</button>
);

Object.assign(window, {
  Header, Footer, Card, SectionTitle, CollapsedSection, CompletedHeader,
  PrimaryButton, SecondaryButton, TextLink,
});
