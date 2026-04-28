import { useState, useEffect } from 'react';
import { useRuneLiteParty } from '@/hooks/useRuneLiteParty';
import { JoinScreen } from '@/components/party/JoinScreen';
import { PartyTopBar } from '@/components/party/PartyTopBar';
import { HiddenPlayersList } from '@/components/party/HiddenPlayersList';
import { PlayerGrid } from '@/components/party/PlayerGrid';
import { initItemDatabase } from '@/utils/itemResolver';
import './index.css';

function App() {
  useEffect(() => {
    initItemDatabase();
  }, []);
  const [activePartyId, setActivePartyId] = useState<string | null>(null);
  const [hiddenPlayers, setHiddenPlayers] = useState<Set<string>>(new Set());
  const { players, connected, error } = useRuneLiteParty(activePartyId);

  const toggleHidePlayer = (id: string) => {
    setHiddenPlayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  if (!activePartyId) {
    return (
      <div style={styles.appContainer}>
        <JoinScreen onJoin={setActivePartyId} />
      </div>
    );
  }

  const hasPlayers = Object.values(players).some(
    (p) => !p.member.name?.toLowerCase().includes('observer') && p.member.name !== 'Loading...'
  );

  return (
    <div style={styles.appContainer}>
      <div style={{ marginTop: '2rem' }}>
        <PartyTopBar
          connected={connected}
          partyId={activePartyId}
          onDisconnect={() => setActivePartyId(null)}
        />

        <HiddenPlayersList
          hiddenIds={hiddenPlayers}
          players={players}
          onUnhide={toggleHidePlayer}
        />

        {error && <div style={styles.errorMessage}>{error}</div>}

        {!hasPlayers && connected && !error ? (
          <p style={styles.waitingMessage}>Waiting for players to sync...</p>
        ) : (
          <PlayerGrid players={players} hiddenIds={hiddenPlayers} onHidePlayer={toggleHidePlayer} />
        )}
      </div>
    </div>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  appContainer: {
    maxWidth: '95vw',
    margin: '0 auto',
    padding: '1rem',
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '6px',
  },
  waitingMessage: {
    color: '#94a3b8',
    textAlign: 'center',
    width: '100%',
    marginTop: '2rem',
  },
};
