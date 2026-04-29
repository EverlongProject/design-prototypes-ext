// Scheduling flow: Location → Date & Time → Review & Confirm
// Single page that uses an accordion-style stepper. Steps not yet reached
// render as gray collapsed bars; the active step is white with a green/lime
// top border; completed steps collapse to a summary with a "Change" link.

const STEPS = ['location', 'datetime', 'review'];

// ---- mock data ----
const LOCATIONS = [
  { id: 'loc1', name: 'Location 1', address: '2300 Steele St', city: 'Denver, CO 80205', distance: '1.2 mi', slots: 18 },
  { id: 'loc2', name: 'Location 2', address: '845 Sherman St', city: 'Denver, CO 80203', distance: '2.4 mi', slots: 12 },
  { id: 'loc3', name: 'Location 3', address: '1450 Larimer St, Suite 200', city: 'Denver, CO 80202', distance: '3.7 mi', slots: 6 },
  { id: 'loc4', name: 'Location 4', address: '7100 E Belleview Ave', city: 'Greenwood Village, CO 80111', distance: '8.1 mi', slots: 22 },
];

const TIME_SLOTS = [
  '8:00 AM', '8:10 AM', '8:20 AM', '8:30 AM', '8:40 AM', '8:50 AM',
  '9:00 AM', '9:10 AM', '9:20 AM', '9:30 AM', '9:40 AM',
  '10:00 AM', '10:20 AM', '10:30 AM',
  '11:00 AM', '11:10 AM', '11:30 AM',
  '1:00 PM', '1:10 PM', '1:30 PM', '1:40 PM',
  '2:00 PM', '2:20 PM', '2:30 PM', '2:50 PM',
  '3:00 PM', '3:10 PM', '3:30 PM',
];

// === Schedule wrapper ===

const ScheduleScreen = ({ onConfirm, onBack }) => {
  const [step, setStep] = React.useState('questionnaire');
  const [data, setData] = React.useState({
    answers: {}, // { q1: 'yes' | 'no', ... }
    zip: '66219',
    location: null,
    date: null,
    time: null,
  });

  const allAnswered = QUESTIONS.filter(q => q.required).every(q => data.answers[q.id]);
  const completed = {
    questionnaire: allAnswered && step !== 'questionnaire',
    location: !!data.location && step !== 'location',
    datetime: !!data.date && !!data.time && step !== 'datetime',
  };

  const goToStep = (s) => setStep(s);
  const updateData = (patch) => setData(d => ({ ...d, ...patch }));

  const submitConfirm = () => {
    onConfirm(data);
  };

  return (
    <main id="main" style={mainWrap}>
      <div style={contentWrap}>
        {/* breadcrumb */}
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

        {/* === QUESTIONNAIRE === */}
        <QuestionnaireStep
          state={step === 'questionnaire' ? 'active' : (completed.questionnaire ? 'done' : 'collapsed')}
          data={data}
          updateData={updateData}
          onContinue={() => goToStep('location')}
          onChange={() => goToStep('questionnaire')}
          onCancel={onBack}
        />

        {/* === LOCATION === */}
        <LocationStep
          state={step === 'location' ? 'active' : (completed.location ? 'done' : 'collapsed')}
          data={data}
          updateData={updateData}
          onContinue={() => goToStep('datetime')}
          onChange={() => goToStep('location')}
          onCancel={onBack}
        />

        {/* === DATE & TIME === */}
        <DateTimeStep
          state={step === 'datetime' ? 'active' : (completed.datetime ? 'done' : 'collapsed')}
          data={data}
          updateData={updateData}
          onContinue={() => goToStep('review')}
          onBack={() => goToStep('location')}
          onChange={() => goToStep('datetime')}
        />

        {/* === REVIEW & CONFIRM === */}
        <ReviewStep
          state={step === 'review' ? 'active' : 'collapsed'}
          data={data}
          onConfirm={submitConfirm}
          onCancel={onBack}
        />
      </div>
    </main>
  );
};

// =====================================================================
// QUESTIONNAIRE STEP
// =====================================================================

const QUESTIONS = [
  { id: 'q1', text: 'Have you ever had an adverse reaction to a previous dose of Influenza (flu) or Pneumonia vaccine?', required: true },
  { id: 'q2', text: 'Have you ever had an adverse reaction to a previous dose of any other vaccine (Does not include tiredness, soreness, fever, or chills in response to an mRNA COVID-19 vaccine)?', required: false },
  { id: 'q3', text: 'Have you ever had Guillain-Barre Syndrome (an illness with sudden muscle weakness)?', required: true },
  { id: 'q4', text: 'Have you ever had an active, unstabilized neurological disorder?', required: true },
  { id: 'q5', text: 'Are you currently experiencing a moderate or severe acute illness, with or without a fever?', required: true },
  { id: 'q6', text: 'Do you have a known severe allergy to eggs, gelatin, or any component of the influenza vaccine?', required: true },
];

const QuestionnaireStep = ({ state, data, updateData, onContinue, onChange, onCancel }) => {
  const [showRequired, setShowRequired] = React.useState(false);

  if (state === 'collapsed') {
    return <CollapsedSection title="Vaccines / Immunizations" />;
  }
  if (state === 'done') {
    const yesCount = Object.values(data.answers).filter(v => v === 'yes').length;
    return (
      <Card>
        <CompletedHeader title="Vaccines / Immunizations" onChange={onChange} />
        <div style={{ fontSize: 14, color: '#3a3a3a' }}>
          {QUESTIONS.filter(q => q.required).length} required questions answered.
          {yesCount > 0 && <span style={{ marginLeft: 6, color: '#5a5a5a' }}>({yesCount} "Yes")</span>}
        </div>
      </Card>
    );
  }

  const setAnswer = (qid, val) => {
    updateData({ answers: { ...data.answers, [qid]: val } });
  };

  const requiredAnswered = QUESTIONS.filter(q => q.required).every(q => data.answers[q.id]);

  return (
    <Card accent="lime">
      <SectionTitle>Vaccines / Immunizations</SectionTitle>
      <p style={{ margin: '0 0 18px', fontSize: 14, color: '#3a3a3a' }}>
        To ensure your safety and determine eligibility for this service, please answer the following questions.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {QUESTIONS.map((q) => {
          const val = data.answers[q.id];
          const missing = showRequired && q.required && !val;
          return (
            <div key={q.id}>
              <div style={{
                fontSize: 14, fontWeight: 600, color: '#2b2b2b',
                marginBottom: 10, lineHeight: 1.45,
              }}>
                {q.text}{q.required && <span style={{ color: '#c5292a' }}> *</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['yes', 'no'].map(opt => (
                  <label key={opt} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    cursor: 'pointer', fontSize: 14, color: '#2b2b2b',
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `2px solid ${missing ? '#c5292a' : (val === opt ? '#2c6e35' : '#888')}`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {val === opt && <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2c6e35' }} />}
                    </span>
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      checked={val === opt}
                      onChange={() => setAnswer(q.id, opt)}
                      style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                    />
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </label>
                ))}
              </div>
              {missing && <div style={errorText}>Required</div>}
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        paddingTop: 18, marginTop: 22, borderTop: '1px solid #e8e8e8',
      }}>
        <PrimaryButton onClick={() => {
          if (!requiredAnswered) { setShowRequired(true); return; }
          onContinue();
        }} disabled={!requiredAnswered}>Continue</PrimaryButton>
        <TextLink onClick={onCancel}>Cancel</TextLink>
      </div>
    </Card>
  );
};

const breadLink = {
  background: 'none', border: 'none', color: '#2c6e35',
  textDecoration: 'underline', padding: 0, fontSize: 13, cursor: 'pointer',
};
const breadSep = { margin: '0 8px', color: '#888' };

// =====================================================================
// LOCATION STEP
// =====================================================================

const LocationStep = ({ state, data, updateData, onContinue, onChange, onCancel }) => {
  const [zip, setZip] = React.useState(data.zip || '');
  const [searched, setSearched] = React.useState(!!data.location);
  const [results, setResults] = React.useState(data.location ? LOCATIONS : []);
  const [selectedId, setSelectedId] = React.useState(data.location?.id || null);
  const [zipError, setZipError] = React.useState('');

  if (state === 'collapsed') {
    return <CollapsedSection title="Location" />;
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
    );
  }

  const runSearch = () => {
    if (!/^\d{5}$/.test(zip)) {
      setZipError('Please enter a valid 5-digit ZIP code.');
      return;
    }
    setZipError('');
    updateData({ zip });
    setResults(LOCATIONS);
    setSearched(true);
    setSelectedId(null);
  };

  const useMyLocation = () => {
    setZip('80205');
    setZipError('');
    updateData({ zip: '80205' });
    setResults(LOCATIONS);
    setSearched(true);
    setSelectedId(null);
  };

  const pickLocation = (loc) => {
    setSelectedId(loc.id);
    updateData({ location: loc });
  };

  const canContinue = !!selectedId;

  return (
    <Card accent="lime">
      <SectionTitle>Location</SectionTitle>

      {/* ZIP search */}
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
          onKeyDown={(e) => { if (e.key === 'Enter') runSearch(); }}
          style={{
            ...textInput,
            borderColor: zipError ? '#c5292a' : '#888',
          }}
        />
        {zipError && <div style={errorText}>{zipError}</div>}
      </div>

      {/* Search / Use My Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <PrimaryButton icon="search" onClick={runSearch}>Search</PrimaryButton>
        <span style={{ color: '#5a5a5a', fontSize: 14 }}>or</span>
        <PrimaryButton icon="pin" onClick={useMyLocation}>Use Your Location</PrimaryButton>
      </div>

      {/* Results */}
      {searched && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, color: '#3a3a3a', marginBottom: 10 }}>
            Showing <strong>{results.length} locations</strong> near {zip}. Select one to continue.
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: '1px solid #e0e0e0' }}>
            {results.map((loc, i) => {
              const isSel = selectedId === loc.id;
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
                    onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = '#fafaf6'; }}
                    onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = '#fff'; }}
                  >
                    {/* Radio */}
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
              );
            })}
          </ul>
        </div>
      )}

      {/* Footer buttons */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        paddingTop: 14, borderTop: '1px solid #e8e8e8',
      }}>
        <PrimaryButton onClick={onContinue} disabled={!canContinue}>Continue</PrimaryButton>
        <TextLink onClick={onCancel}>Cancel</TextLink>
      </div>
    </Card>
  );
};

// =====================================================================
// DATE & TIME STEP
// =====================================================================

const DateTimeStep = ({ state, data, updateData, onContinue, onBack, onChange }) => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [timeOpen, setTimeOpen] = React.useState(false);
  const [showRequired, setShowRequired] = React.useState(false);

  if (state === 'collapsed') {
    return <CollapsedSection title="Date & Time" />;
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
    );
  }

  const dateString = data.date ? formatShortDate(data.date) : '';
  const canContinue = !!data.date && !!data.time;

  return (
    <Card accent="lime">
      <SectionTitle>Date &amp; Time</SectionTitle>
      <p style={{ margin: '0 0 14px', fontSize: 14, color: '#3a3a3a' }}>
        Select a date to find availability at the above location.
      </p>

      {/* Date input */}
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

      {/* Time picker — only after a date is selected */}
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
                    onClick={() => { updateData({ time: t }); setTimeOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '10px 14px', background: data.time === t ? '#f1f5ed' : '#fff',
                      border: 'none', borderBottom: '1px solid #f0f0f0',
                      fontSize: 14, color: '#2b2b2b', cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { if (data.time !== t) e.currentTarget.style.background = '#f7f7f3'; }}
                    onMouseLeave={(e) => { if (data.time !== t) e.currentTarget.style.background = '#fff'; }}
                  >{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        paddingTop: 18, marginTop: 18, borderTop: '1px solid #e8e8e8',
      }}>
        <PrimaryButton onClick={() => {
          if (!canContinue) { setShowRequired(true); return; }
          onContinue();
        }} disabled={!canContinue}>Continue</PrimaryButton>
        <TextLink onClick={onBack}>Back</TextLink>
      </div>

      {calendarOpen && (
        <CalendarModal
          selected={data.date}
          onSelect={(d) => { updateData({ date: d, time: null }); setCalendarOpen(false); }}
          onClose={() => setCalendarOpen(false)}
        />
      )}
    </Card>
  );
};

// =====================================================================
// REVIEW & CONFIRM
// =====================================================================

const ReviewStep = ({ state, data, onConfirm, onCancel }) => {
  if (state === 'collapsed') {
    return <CollapsedSection title="Review &amp; Confirm" />;
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
  );
};

// =====================================================================
// CALENDAR MODAL
// =====================================================================

const CalendarModal = ({ selected, onSelect, onClose }) => {
  // Default to July 2026 to match the screenshot
  const initial = selected || new Date(2026, 6, 1);
  const [view, setView] = React.useState({
    year: (selected || initial).getFullYear(),
    month: (selected || initial).getMonth(), // 0-indexed
  });

  const monthName = new Date(view.year, view.month, 1)
    .toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const monthShort = new Date(view.year, view.month, 1)
    .toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const yearLabel = `${monthName.slice(0, 3)} ${view.year}`;

  const firstDay = new Date(view.year, view.month, 1).getDay(); // 0 Sun
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  // Disable past + weekends to feel realistic; enable lots of weekday slots in July 2026
  const today = new Date(2026, 3, 29); // current date per system info

  const cells = [];
  // The Quest screenshot shows the month label in the first cell of week 1.
  for (let i = 0; i < firstDay; i++) {
    cells.push({ blank: true, key: `b${i}`, label: i === 0 ? null : null });
  }
  // Per spec: only July 9, 2026 is selectable in this view; all other days are disabled.
  const isJulyView = view.year === 2026 && view.month === 6;
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(view.year, view.month, d);
    const isAvailable = isJulyView && d === 9;
    const isToday = date.toDateString() === today.toDateString();
    cells.push({
      day: d,
      date,
      disabled: !isAvailable,
      isToday,
      isSelected: selected && date.toDateString() === selected.toDateString(),
      key: `d${d}`,
    });
  }

  const moveMonth = (delta) => {
    let m = view.month + delta;
    let y = view.year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setView({ year: y, month: m });
  };

  return (
    <>
      {/* Overlay */}
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
        {/* Header */}
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

        {/* Day-of-week header */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center', fontSize: 11, color: '#777',
          textTransform: 'uppercase', letterSpacing: '0.04em',
          marginBottom: 6,
        }}>
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
        </div>

        {/* Days grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: 4, columnGap: 0,
        }}>
          {cells.map((c, i) => {
            // The first row's first non-blank cell shows the abbreviated month name
            // matching the Quest UI ("JUL")
            if (c.blank) {
              if (i === 0) {
                return <div key={c.key} style={{ ...dayCell, color: '#777', fontSize: 12 }}>{monthShort}</div>;
              }
              return <div key={c.key} style={dayCell} />;
            }
            const dayStyle = {
              ...dayCell,
              color: c.disabled ? '#c5c5c5' : '#2b2b2b',
              cursor: c.disabled ? 'not-allowed' : 'pointer',
              border: c.isSelected ? '2px solid #2c6e35' : '2px solid transparent',
              borderRadius: '50%',
              fontWeight: c.isSelected ? 600 : 400,
            };
            return (
              <button
                key={c.key}
                disabled={c.disabled}
                onClick={() => !c.disabled && onSelect(c.date)}
                style={{ ...dayStyle, background: 'none' }}
                onMouseEnter={(e) => { if (!c.disabled && !c.isSelected) e.currentTarget.style.background = '#f1f5ed'; }}
                onMouseLeave={(e) => { if (!c.disabled && !c.isSelected) e.currentTarget.style.background = 'none'; }}
              >
                {c.day}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

// =====================================================================
// styles + helpers
// =====================================================================

const fieldLabel = {
  display: 'block',
  fontSize: 11,
  color: '#5a5a5a',
  marginBottom: 4,
};

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
};

const errorText = {
  color: '#c5292a',
  fontSize: 12,
  marginTop: 4,
};

const iconBtn = {
  width: 28, height: 28,
  border: 'none', background: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#2b2b2b',
};

const dayCell = {
  height: 36,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 14, fontVariantNumeric: 'tabular-nums',
};

function formatLongDate(d) {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
}
function formatShortDate(d) {
  if (!d) return '';
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}/${day}/${d.getFullYear()}`;
}

window.ScheduleScreen = ScheduleScreen;
window.formatLongDate = formatLongDate;
window.formatShortDate = formatShortDate;
