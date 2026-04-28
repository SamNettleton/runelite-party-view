import { PlayerState } from '@/types';

interface HiddenPlayersListProps {
  hiddenIds: Set<string>;
  players: Record<string, PlayerState>;
  onUnhide: (id: string) => void;
}

export const HiddenPlayersList: React.FC<HiddenPlayersListProps> = ({
  hiddenIds,
  players,
  onUnhide,
}) => {
  if (hiddenIds.size === 0) return null;

  return (
    <div style={styles.hiddenList}>
      <span style={{ fontSize: '0.8rem', color: '#888' }}>Hidden:</span>
      {Array.from(hiddenIds).map((id) => {
        const playerName = players[id]?.member.name || 'Unknown';
        return (
          <button
            key={id}
            onClick={() => onUnhide(id)}
            style={styles.unhideBadge}
            title="Click to unhide"
          >
            {playerName} <span style={{ marginLeft: '4px', opacity: 0.6 }}>+</span>
          </button>
        );
      })}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
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
};
