// Confirmation screen — shows after the user clicks Confirm.

const ConfirmationScreen = ({ data, onHome }) => {
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

        {/* Two-column summary cards, matching the Quest "Thank you" screen */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 16,
          marginBottom: 16,
        }}>
          {/* Appointment card */}
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

          {/* Prep card */}
          <Card accent="green" style={{ marginBottom: 0 }}>
            <SectionTitle>Prepare For Your Appointment</SectionTitle>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16, marginTop: 8, marginBottom: 14,
            }}>
              <PrepTip
                icon="droplet"
                text="Drink plenty of water prior to your appointment."
              />
              <PrepTip
                icon="pill"
                text="Continue to take all medications as prescribed by your healthcare provider."
              />
              <PrepTip
                icon="clipboard"
                text="Bring a photo ID and your insurance card to your appointment."
              />
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

        {/* Confirmation reference */}
        <div style={{
          fontSize: 13, color: '#5a5a5a',
          padding: '10px 0',
        }}>
          Confirmation #: <strong style={{ color: '#2b2b2b' }}>QFL-{Math.floor(Math.random() * 900000 + 100000)}</strong>
          &nbsp;&nbsp;·&nbsp;&nbsp;
          A confirmation email has been sent to your account on file.
        </div>
      </div>
    </main>
  );
};

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
);

window.ConfirmationScreen = ConfirmationScreen;
