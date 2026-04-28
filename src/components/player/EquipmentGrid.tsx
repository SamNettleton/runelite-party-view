import React, { useState, useRef } from 'react';
import { InventoryItem } from '@/types';
import { formatQty, getQtyColor } from '@/utils/itemHelpers';
import { getItemName } from '@/utils/itemResolver';
import BlankSlotImg from '@/assets/Blank_Slot.png';

const SLOT_PLACEHOLDERS: Record<number, string> = {
  0: 'https://oldschool.runescape.wiki/images/Head_slot.png',
  1: 'https://oldschool.runescape.wiki/images/Cape_slot.png',
  2: 'https://oldschool.runescape.wiki/images/Neck_slot.png',
  13: 'https://oldschool.runescape.wiki/images/Ammo_slot.png',
  3: 'https://oldschool.runescape.wiki/images/Weapon_slot.png',
  4: 'https://oldschool.runescape.wiki/images/Body_slot.png',
  5: 'https://oldschool.runescape.wiki/images/Shield_slot.png',
  7: 'https://oldschool.runescape.wiki/images/Legs_slot.png',
  9: 'https://oldschool.runescape.wiki/images/Hands_slot.png',
  10: 'https://oldschool.runescape.wiki/images/Feet_slot.png',
  12: 'https://oldschool.runescape.wiki/images/Ring_slot.png',
};

// Row-based layout to achieve the flared "X" shape
const ROWS = [
  { ids: [0], gap: '0px' },
  { ids: [1, 2, 13], gap: '4px' }, // Tight padding
  { ids: [3, 4, 5], gap: '22px' }, // Wide flare
  { ids: [7], gap: '0px' },
  { ids: [9, 10, 12], gap: '22px' }, // Identical wide flare
];

let lastHoverTime = 0;
const HOVER_WARM_THRESHOLD = 300;

export const EquipmentGrid: React.FC<{ items?: InventoryItem[] }> = ({ items }) => {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (slotId: number) => {
    setHoveredSlot(slotId);
    const now = Date.now();
    const isWarm = now - lastHoverTime < HOVER_WARM_THRESHOLD;
    if (isWarm) {
      setShowTooltip(true);
    } else {
      timerRef.current = setTimeout(() => setShowTooltip(true), 500);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoveredSlot(null);
    setShowTooltip(false);
    lastHoverTime = Date.now();
  };

  return (
    <div style={styles.equipmentContainer}>
      {/* Connector Line: Vertical (middle column) */}
      <div style={styles.middleColumnConnector} />
      {/* Connector Line: Left (Weapon to Gloves) */}
      <div style={styles.weaponGloveConnector} />
      {/* Connector Line: Right (Shield to Ring) */}
      <div style={styles.shieldRingConnector} />
      {/* Connector Line: Horizontal (Cape through Necklace to Ammo) */}
      <div style={styles.capeNecklaceAmmoConnector} />
      {/* Connector Line: Horizontal (Weapon through Body to Shield) */}
      <div style={styles.weaponBodyShieldConnector} />
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} style={{ ...styles.row, gap: row.gap }}>
          {row.ids.map((slotId) => {
            const item = items?.[slotId];
            const hasItem = item && item.id > 0;

            return (
              <div
                key={slotId}
                style={styles.slot}
                onMouseEnter={() => hasItem && handleMouseEnter(slotId)}
                onMouseLeave={handleMouseLeave}
              >
                {hasItem ? (
                  <>
                    <img
                      src={`https://static.runelite.net/cache/item/icon/${item.id}.png`}
                      style={styles.itemImg}
                      alt=""
                    />
                    {item.qty > 1 && (
                      <span style={{ ...styles.qty, color: getQtyColor(item.qty) }}>
                        {formatQty(item.qty)}
                      </span>
                    )}
                    {showTooltip && hoveredSlot === slotId && (
                      <div style={styles.tooltip}>
                        <span style={styles.tooltipText}>{getItemName(item.id)}</span>
                      </div>
                    )}
                  </>
                ) : (
                  /* Placeholder takes up full 100% of slot to match border */
                  <img src={SLOT_PLACEHOLDERS[slotId]} style={styles.placeholderImg} alt="" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  equipmentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px', // Vertical spacing between rows
    backgroundColor: '#3e3529',
    borderRadius: '4px',
    border: '2px solid #2a241c',
    boxSizing: 'border-box',
    width: '215px',
    height: '344px',
    padding: '20px 10px',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  middleColumnConnector: {
    position: 'absolute',
    width: '5px',
    height: '200px',
    backgroundColor: '#2a241c',
    left: '103.5px',
    top: '60px',
    zIndex: 0,
  },
  weaponGloveConnector: {
    position: 'absolute',
    width: '5px',
    height: '115px', // Spans from Weapon row to Gloves row
    backgroundColor: '#2a241c', // Matches the border color
    left: '37px', // Aligned to the center of the outer slots
    top: '160px',
    zIndex: 0,
  },
  shieldRingConnector: {
    position: 'absolute',
    width: '5px',
    height: '115px',
    backgroundColor: '#2a241c',
    right: '36px',
    top: '160px',
    zIndex: 0,
  },
  weaponBodyShieldConnector: {
    position: 'absolute',
    width: '115px',
    height: '5px',
    backgroundColor: '#2a241c',
    left: '39px',
    top: '168px',
    zIndex: 0,
  },
  capeNecklaceAmmoConnector: {
    position: 'absolute',
    width: '115px',
    height: '5px',
    backgroundColor: '#2a241c',
    right: '37px',
    top: '118px',
    zIndex: 0,
  },
  row: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  slot: {
    width: '45px',
    height: '45px',
    backgroundImage: `url(${BlankSlotImg})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexShrink: 0,
  },
  itemImg: {
    maxWidth: '38px',
    maxHeight: '38px',
    zIndex: 2,
    position: 'relative',
    left: '2px', // Centering nudge
    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.4))',
  },
  placeholderImg: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'relative',
  },
  qty: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    fontSize: '10px',
    fontWeight: 'bold',
    textShadow: '1px 1px 0 #000',
    zIndex: 3,
    pointerEvents: 'none',
  },
  tooltip: {
    position: 'absolute',
    bottom: '115%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1a1a1a',
    border: '1px solid #4a4a4a',
    padding: '4px 8px',
    borderRadius: '4px',
    zIndex: 1000,
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    pointerEvents: 'none',
  },
  tooltipText: {
    color: '#e9e9e9',
    fontSize: '11px',
    fontWeight: 'bold',
  },
};
