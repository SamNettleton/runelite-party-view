import { useState } from 'react';
import { useRuneLiteParty } from '@/hooks/useRuneLiteParty';
import './index.css';
import { PlayerCard } from '@/components/PlayerCard';

function App() {
  const [partyPassphrase, setPartyPassphrase] = useState('');
  const [activePartyId, setActivePartyId] = useState<string | null>(null);
  const [hiddenPlayers, setHiddenPlayers] = useState<Set<string>>(new Set());
  const { players, connected, error } = useRuneLiteParty(activePartyId);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (partyPassphrase.trim()) {
      setActivePartyId(partyPassphrase.trim());
    }
  };

  const handleDisconnect = () => {
    setActivePartyId(null);
  };

  const toggleHidePlayer = (id: string) => {
    setHiddenPlayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return (
    <div style={styles.appContainer} className="app-container">
      {!activePartyId ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            justifyContent: 'center',
          }}
        >
          <header style={styles.header}>
            <h1 style={styles.title}>RuneLite Party View</h1>
            <p style={styles.headerSub}>Monitor your team's vitals in real-time</p>
          </header>

          <form style={styles.joinPanel} onSubmit={handleJoin}>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter Party Passphrase"
              value={partyPassphrase}
              onChange={(e) => setPartyPassphrase(e.target.value)}
              required
            />
            {/* Added a class here for the hover effect in index.css */}
            <button style={styles.joinButton} className="join-panel-button" type="submit">
              Join Party
            </button>
          </form>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          {/* TOP BAR */}
          <div style={styles.topBar}>
            <div style={styles.statusGroup}>
              <span
                style={{
                  ...styles.statusBadge,
                  ...(connected ? styles.connected : styles.disconnected),
                }}
              >
                {connected ? 'Connected' : 'Connecting...'}
              </span>
              <span style={styles.partyInfo}>
                Party: <strong style={{ marginLeft: '6px' }}>{activePartyId}</strong>
              </span>
            </div>

            <button
              onClick={handleDisconnect}
              style={styles.disconnectBtn}
              className="disconnect-button-hover"
            >
              Disconnect
            </button>
          </div>

          {/* HIDDEN LIST */}
          {hiddenPlayers.size > 0 && (
            <div style={styles.hiddenList}>
              <span style={{ fontSize: '0.8rem', color: '#888' }}>Hidden:</span>
              {Array.from(hiddenPlayers).map((id) => {
                const playerName = players[id]?.member.name || 'Unknown';
                return (
                  <button
                    key={id}
                    onClick={() => toggleHidePlayer(id)}
                    style={styles.unhideBadge}
                    title="Click to unhide"
                  >
                    {playerName} <span style={{ marginLeft: '4px', opacity: 0.6 }}>+</span>
                  </button>
                );
              })}
            </div>
          )}

          {error && <div style={styles.errorMessage}>{error}</div>}

          <div style={styles.playersGrid}>
            {Object.values(players).length === 0 && connected && !error && (
              <p
                style={{
                  color: '#94a3b8',
                  textAlign: 'center',
                  width: '100%',
                  gridColumn: '1 / -1',
                }}
              >
                Waiting for players to sync...
              </p>
            )}

            {Object.entries(players)
              .filter(([id, player]) => {
                const isObserver =
                  player.member.name === '__web_observer__' || player.member.name === 'Loading...';
                const isHidden = hiddenPlayers.has(id);
                return !isObserver && !isHidden;
              })
              .map(([memberId, player]) => (
                <PlayerCard
                  key={memberId}
                  memberId={memberId}
                  player={player}
                  onHide={() => toggleHidePlayer(memberId)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerSub: {
    color: '#94a3b8',
  },
  joinPanel: {
    background: '#14151c',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  input: {
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  },
  joinButton: {
    padding: '0.75rem 1rem',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connected: {
    background: 'rgba(16, 185, 129, 0.2)',
    color: '#10b981',
  },
  disconnected: {
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '6px',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // This centers Disconnect with the Status/Party text
    marginBottom: '1rem',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  hiddenList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px',
    alignItems: 'center',
  },
  partyInfo: {
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1',
  },
  unhideBadge: {
    background: '#2a241c',
    border: '1px solid #3e3529',
    color: '#aaa',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'border-color 0.2s, color 0.2s',
  },
  disconnectBtn: {
    padding: '0.5rem 1rem',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  playersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '0.5rem',
    alignItems: 'start',
    width: '100%',
  },
};
