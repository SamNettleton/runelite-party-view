interface PartyTopBarProps {
  connected: boolean;
  partyId: string;
  onDisconnect: () => void;
}

export const PartyTopBar: React.FC<PartyTopBarProps> = ({
  connected,
  partyId,
  onDisconnect,
}) => {
  return (
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
          Party: <strong style={{ marginLeft: '6px' }}>{partyId}</strong>
        </span>
      </div>

      <button onClick={onDisconnect} style={styles.disconnectBtn}>
        Disconnect
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
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
  partyInfo: {
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1',
  },
  disconnectBtn: {
    padding: '0.5rem 1rem',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
