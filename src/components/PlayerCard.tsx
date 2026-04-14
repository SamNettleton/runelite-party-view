import React, { useState } from 'react';
import { PlayerState } from '@/types';
import { InventoryGrid } from './InventoryGrid';
import { EquipmentGrid } from './EquipmentGrid';
import { StatBars } from './StatBars';
import { SkillsGrid } from './SkillsGrid';

import wornEquipmentIcon from '@/assets/Worn_Equipment.png';

interface PlayerCardProps {
  memberId: string;
  player: PlayerState;
}

type GridView = 'inventory' | 'equipment' | 'skills' | 'prayer';

export const PlayerCard: React.FC<PlayerCardProps> = ({ memberId, player }) => {
  const [activeView, setActiveView] = useState<GridView>('inventory');

  const nameColor = player.member.color ? player.member.color.substring(0, 7) : '#fff';

  const tabs = [
    { id: 'inventory', icon: 'https://oldschool.runescape.wiki/images/Inventory.png', alt: 'Inv' },
    {
      id: 'equipment',
      icon: wornEquipmentIcon,
      alt: 'Equip',
    },
    {
      id: 'prayer',
      icon: 'https://oldschool.runescape.wiki/images/Prayer_icon_%28detail%29.png',
      alt: 'Pray',
    },
    { id: 'skills', icon: 'https://oldschool.runescape.wiki/images/Stats_icon.png', alt: 'Stats' },
  ];

  return (
    <div style={styles.playerCard}>
      <div style={styles.cardHeader}>
        <h3 style={{ color: nameColor, margin: 0 }}>
          {player.member.name || 'Unknown Player'} (level-{player.combatLevel})
        </h3>
      </div>

      <div style={styles.statsWrapper}>
        <StatBars stats={player.stats} />
      </div>

      <div style={styles.buttonGroup}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as GridView)}
            style={{
              ...styles.button,
              ...(activeView === tab.id ? styles.activeButton : {}),
            }}
          >
            <img src={tab.icon} alt={tab.alt} style={styles.tabIcon} />
          </button>
        ))}
      </div>

      <div style={styles.gridContainer}>
        {activeView === 'inventory' && <InventoryGrid items={player.inventory} />}
        {activeView === 'equipment' && <EquipmentGrid items={player.equipment} />}
        {activeView === 'skills' && <SkillsGrid stats={player.stats} />}
        {activeView === 'prayer' && (
          <div style={styles.placeholder}>
            <p>Prayer Grid Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  playerCard: {
    width: '243px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '12px',
    width: '100%',
  },
  memberId: {
    fontSize: '0.75rem',
    color: '#aaa',
  },
  statsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonGroup: {
    display: 'flex',
    gap: '2px',
    marginTop: '12px',
    marginBottom: '8px',
    justifyContent: 'center',
    backgroundColor: '#2a241c',
    padding: '2px',
    borderRadius: '4px',
    width: 'fit-content',
  },
  button: {
    width: '40px',
    height: '32px',
    backgroundColor: '#3e3529',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#2a241c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.1s',
  },
  activeButton: {
    backgroundColor: '#6b5a44',
    borderColor: '#9d8b70',
  },
  tabIcon: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '365px',
    width: '100%',
  },
  placeholder: {
    width: '243px',
    height: '365px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a4a4a',
    color: '#aaa',
    borderRadius: '4px',
    border: '2px solid #3a3a3a',
    fontSize: '0.8rem',
  },
};
