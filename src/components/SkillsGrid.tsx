import React from 'react';
import { PlayerStats } from '@/types';

export const SkillsGrid: React.FC<{ stats?: PlayerStats }> = ({ stats }) => {
  const skillLayout = [
    'attack',
    'hitpoints',
    'mining',
    'strength',
    'agility',
    'smithing',
    'defence',
    'herblore',
    'fishing',
    'ranged',
    'thieving',
    'cooking',
    'prayer',
    'crafting',
    'firemaking',
    'magic',
    'fletching',
    'woodcutting',
    'runecraft',
    'slayer',
    'farming',
    'construction',
    'hunter',
    'sailing',
  ];

  const getIconUrl = (skill: string) => {
    const name = skill.charAt(0).toUpperCase() + skill.slice(1);
    return `https://oldschool.runescape.wiki/images/${name}_icon.png`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {skillLayout.map((skill) => {
          const data = stats?.[skill];
          const current = typeof data === 'object' ? data.current : data || 1;
          const base = typeof data === 'object' ? data.base : data || 1;

          return (
            <div key={skill} style={styles.item}>
              <img
                src={getIconUrl(skill)}
                alt={skill}
                style={styles.skillIcon}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div style={styles.values}>
                <span style={{ color: '#ffff66', fontWeight: 'bold' }}>{current}</span>
                <span style={styles.base}>/{base}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '243px',
    height: '365px',
    backgroundColor: '#4a4a4a',
    borderRadius: '4px',
    border: '2px solid #3a3a3a',
    boxSizing: 'border-box',
    padding: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 73px)',
    gridTemplateRows: 'repeat(8, 40px)',
    gap: '4px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    background: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '2px',
    padding: '0 4px',
    height: '100%',
  },
  skillIcon: {
    width: '22px',
    height: '22px',
    objectFit: 'contain',
  },
  values: {
    display: 'flex',
    gap: '1px',
    alignItems: 'baseline',
    fontSize: '1rem',
  },
  base: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.75rem',
  },
};
