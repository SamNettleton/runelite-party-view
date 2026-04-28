import { useState } from 'react';
import { useRuneLiteParty } from '@/hooks/useRuneLiteParty';
import { PlayerCard } from '@/components/player/PlayerCard';
import { JoinScreen } from '@/components/party/JoinScreen';
import { PartyTopBar } from '@/components/party/PartyTopBar';
import { HiddenPlayersList } from '@/components/party/HiddenPlayersList';
import './index.css';

function App() {
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

        <div style={styles.playersGrid}>
          {Object.values(players).length === 0 && connected && !error && (
            <p style={styles.waitingMessage}>Waiting for players to sync...</p>
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
  errorMessage: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '6px',
  },
  playersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '0.5rem',
    alignItems: 'start',
    width: '100%',
  },
  waitingMessage: {
    color: '#94a3b8',
    textAlign: 'center',
    width: '100%',
    gridColumn: '1 / -1',
  },
};
