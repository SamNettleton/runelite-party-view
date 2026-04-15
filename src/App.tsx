import { useState } from 'react';
import { useRuneLiteParty } from '@/hooks/useRuneLiteParty';
import './index.css';
import { PlayerCard } from '@/components/PlayerCard';

function App() {
  const [partyPassphrase, setPartyPassphrase] = useState('');
  const [activePartyId, setActivePartyId] = useState<string | null>(null);
  const [hiddenPlayers, setHiddenPlayers] = useState<Set<string>>(new Set());
  const { players, connected, error, localMemberIds } = useRuneLiteParty(activePartyId);

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
    <div className="app-container">
      {!activePartyId ? (
        <form className="join-panel" onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Enter Party Passphrase"
            value={partyPassphrase}
            onChange={(e) => setPartyPassphrase(e.target.value)}
            required
          />
          <button type="submit">Join Party</button>
        </form>
      ) : (
        <div className="dashboard">
          <div style={styles.topBar}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className={`status-badge ${connected ? 'connected' : 'disconnected'}`}>
                  {connected ? 'Connected' : 'Connecting...'}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  Party: <strong>{activePartyId}</strong>
                </span>
              </div>

              {/* HIDDEN PLAYERS LIST */}
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
            </div>

            <button onClick={handleDisconnect} style={styles.disconnectBtn}>
              Disconnect
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div style={styles.playersGrid}>
            {Object.values(players).length === 0 && connected && !error && (
              <p style={{ color: 'var(--text-muted)' }}>Waiting for players to sync...</p>
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
                  onHide={() => toggleHidePlayer(memberId)} // Pass the callback
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
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Changed from center to accommodate the list underneath
    marginBottom: '2rem',
  },
  hiddenList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px',
    alignItems: 'center',
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
