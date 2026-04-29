// Top-level app — owns the screen route and wires the four screens together.

const App = () => {
  // route: 'home' | 'services' | 'schedule' | 'confirmation'
  const [route, setRoute] = React.useState('home');
  const [confirmedData, setConfirmedData] = React.useState(null);

  // Reset scroll on route change so each screen lands at the top — feels
  // closer to a real multi-page navigation.
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [route]);

  const screen = (() => {
    switch (route) {
      case 'home':
        return (
          <div data-screen-label="01 Home">
            <HomeScreen onNav={(r) => setRoute(r)} />
          </div>
        );
      case 'services':
        return (
          <div data-screen-label="02 All Services">
            <ServicesScreen
              onSelectService={(svcId) => {
                if (svcId === 'flu') setRoute('schedule');
              }}
              onBack={() => setRoute('home')}
            />
          </div>
        );
      case 'schedule':
        return (
          <div data-screen-label="03 Schedule (Location · Date · Review)">
            <ScheduleScreen
              onConfirm={(d) => { setConfirmedData(d); setRoute('confirmation'); }}
              onBack={() => setRoute('services')}
            />
          </div>
        );
      case 'confirmation':
        return (
          <div data-screen-label="04 Confirmation">
            <ConfirmationScreen
              data={confirmedData}
              onHome={() => { setConfirmedData(null); setRoute('home'); }}
            />
          </div>
        );
      default:
        return null;
    }
  })();

  return (
    <>
      <Header onHome={() => setRoute('home')} />
      {screen}
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
