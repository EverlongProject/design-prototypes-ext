// All Services screen — list of bookable services. Per the spec, both Screening
// and Flu Shot are clickable, but only Flu Shot continues into the booking flow.

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
];

const ServicesScreen = ({ onSelectService, onBack }) => {
  const [selected, setSelected] = React.useState(null);
  const [hint, setHint] = React.useState(null);

  const handleClick = (svc) => {
    if (!svc.routesTo) return; // only Flu Shot is clickable
    setSelected(svc.id);
    setTimeout(() => onSelectService(svc.id), 180);
  };

  return (
    <main id="main" style={mainWrap}>
      <div style={contentWrap}>
        {/* breadcrumb */}
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

        {/* Numbered list per the flow diagram: 1. Screening, 2. Flu shot */}
        <Card accent="green" padded={false}>
          <ol style={{
            listStyle: 'none', margin: 0, padding: 0,
          }}>
            {ALL_SERVICES.map((svc, i) => {
              const isSelected = selected === svc.id;
              const showHint = hint === svc.id;
              const isClickable = !!svc.routesTo;
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
                    onMouseEnter={e => { if (isClickable && !isSelected) e.currentTarget.style.background = '#fafaf6'; }}
                    onMouseLeave={e => { if (isClickable && !isSelected) e.currentTarget.style.background = '#fff'; }}
                  >
                    {/* number */}
                    <span style={{
                      fontSize: 22, fontWeight: 600, color: '#2c6e35',
                      fontVariantNumeric: 'tabular-nums',
                    }}>{i + 1}.</span>

                    {/* icon */}
                    <span style={{
                      width: 56, height: 56, borderRadius: 0,
                      background: '#f1f5ed', border: '1px solid #d4e0c5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#2c6e35',
                    }}>
                      <Icon name={svc.icon} size={30} />
                    </span>

                    {/* text */}
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

                    {/* CTA arrow */}
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
              );
            })}
          </ol>
        </Card>

        <div style={{ marginTop: 8, fontSize: 13, color: '#5a5a5a' }}>
          <TextLink onClick={onBack}>‹ Back to Home</TextLink>
        </div>
      </div>
    </main>
  );
};

window.ServicesScreen = ServicesScreen;
