// Home screen — HealthyQuest member dashboard with the "All Services" tile.
// This is the entry point of the flow per the diagram.

const HomeScreen = ({ onNav }) => {
  const greeting = 'Welcome back, Test';

  const tiles = [
    {
      id: 'all-services',
      title: 'All Services',
      desc: 'Browse and book screenings, vaccinations, lab tests, and more in one place.',
      icon: 'activity',
      cta: 'View All Services',
      featured: true,
      action: () => onNav('services'),
    },
    {
      id: 'screening',
      title: 'Biometric Screening',
      desc: 'Get the knowledge you need to identify your health risks.',
      icon: 'heart-pulse',
      cta: 'Make an Appointment',
      action: () => onNav('services'),
    },
    {
      id: 'questionnaire',
      title: 'Health Questionnaire',
      desc: 'Get deeper insights about your health and wellness.',
      icon: 'clipboard',
      cta: 'Continue Questionnaire',
      action: () => {},
    },
    {
      id: 'rewards',
      title: 'My Rewards',
      desc: 'Track your earned wellness incentives and program progress.',
      icon: 'shield',
      cta: 'View Rewards',
      action: () => {},
    },
  ];

  return (
    <main id="main" style={mainWrap}>
      <div style={contentWrap}>
        {/* Page intro — sentence-case, Quest-green H1 */}
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

        {/* "Why You Should Participate" hero card — recreates the screenshot */}
        <Card accent="green">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 20, alignItems: 'center' }}>
            <div>
              <SectionTitle>Why You Should Participate</SectionTitle>
              <p style={{ margin: '4px 0 0', color: '#3a3a3a', fontSize: 14, maxWidth: 540 }}>
                Completing a screening gives you the knowledge you need to identify your health risks
                and transform your health. Schedule today to stay on track with your wellness goals.
              </p>
            </div>
            {/* Placeholder photo block — warm tones, illustrative */}
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

        {/* Featured tile — All Services (this is the route into the flow) */}
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

        {/* Secondary tiles — match the Biometric Screening + Health Questionnaire pattern */}
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
  );
};

const mainWrap = {
  flex: 1,
  background: '#f4f4f4',
  width: '100%',
};

const contentWrap = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '0 24px 48px',
};

window.HomeScreen = HomeScreen;
window.mainWrap = mainWrap;
window.contentWrap = contentWrap;
