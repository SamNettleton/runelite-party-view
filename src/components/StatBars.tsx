import React from 'react';
import { PlayerStats } from '@/types';

export const StatBars: React.FC<{ stats?: PlayerStats }> = ({ stats }) => {
  if (!stats) return null;
  return (
    <div style={styles.container}>
      {stats.hitpoints && (
        <div style={{ ...styles.pill, color: '#ff4d4d' }}>
          <img
            src="https://oldschool.runescape.wiki/images/Hitpoints_icon.png"
            style={styles.icon}
            alt="HP"
          />
          <span style={styles.value}>{stats.hitpoints.current}</span>
        </div>
      )}
      {stats.prayer && (
        <div style={{ ...styles.pill, color: '#33ccff' }}>
          <img
            src="https://oldschool.runescape.wiki/images/Prayer_icon.png"
            style={styles.icon}
            alt="Pray"
          />
          <span style={styles.value}>{stats.prayer.current}</span>
        </div>
      )}
      {stats.runEnergy !== undefined && (
        <div style={{ ...styles.pill, color: '#ffff66' }}>
          <img
            src="https://oldschool.runescape.wiki/images/Leather_boots_detail.png"
            style={styles.icon}
            alt="Run"
          />
          <span style={styles.value}>{stats.runEnergy}</span>
        </div>
      )}
      {stats.spec !== undefined && (
        <div style={{ ...styles.pill, color: '#009d8e' }}>
          <img
            src="https://oldschool.runescape.wiki/images/Multicombat.png"
            style={styles.icon}
            alt="Spec"
          />
          <span style={styles.value}>{stats.spec}</span>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexWrap: 'nowrap', // FORCE single line
    gap: '4px', // Tighter gap
    marginBottom: '1rem',
    justifyContent: 'center',
    width: '100%',
  },
  pill: {
    fontSize: '0.8rem',
    padding: '2px 4px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    minWidth: '42px', // Keeps width consistent for 1, 2, or 3 digits
    justifyContent: 'center',
  },
  value: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Ensures the number stays centered in the remaining space
  },
  icon: {
    width: '14px', // Slightly smaller to save space
    height: '14px',
    flexShrink: 0,
  },
};
