import React, { useState, useRef } from 'react';
import { InventoryItem } from '@/types';
import { formatQty, getQtyColor } from '@/utils/itemHelpers';
import { getItemName } from '@/utils/itemResolver';

let lastHoverTime = 0;
const HOVER_WARM_THRESHOLD = 300;

export const InventoryGrid: React.FC<{ items?: InventoryItem[] }> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slots = Array.from({ length: 28 }, (_, i) => items?.[i] || { id: -1, qty: 0 });

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);

    const now = Date.now();
    const isWarm = now - lastHoverTime < HOVER_WARM_THRESHOLD;

    if (isWarm) {
      setShowTooltip(true);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowTooltip(true);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoveredIndex(null);
    setShowTooltip(false);
    lastHoverTime = Date.now();
  };

  return (
    <div style={styles.inventoryGrid}>
      {slots.map((item, index) => (
        <div
          key={index}
          style={styles.slot}
          onMouseEnter={() => item.id > 0 && handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {item.id > 0 && (
            <>
              <img
                src={`https://static.runelite.net/cache/item/icon/${item.id}.png`}
                style={styles.itemImg}
                alt=""
                onError={(e) =>
                  (e.currentTarget.src = `https://www.osrsbox.com/osrsbox-db/items-icons/${item.id}.png`)
                }
              />
              {item.qty > 1 && (
                <span style={{ ...styles.qty, color: getQtyColor(item.qty) }}>
                  {formatQty(item.qty)}
                </span>
              )}

              {/* Dark Theme Tooltip */}
              {showTooltip && hoveredIndex === index && (
                <div style={styles.tooltip}>
                  <span style={styles.tooltipText}>{getItemName(item.id)}</span>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  inventoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 45px)',
    gridTemplateRows: 'repeat(7, 42px)',
    gap: '5px',
    backgroundColor: '#3e3529',
    padding: '8px',
    borderRadius: '4px',
    border: '2px solid #2a241c',
    width: 'fit-content',
    position: 'relative',
  },
  slot: {
    width: '45px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '2px',
  },
  itemImg: {
    maxWidth: '36px',
    maxHeight: '32px',
  },
  qty: {
    position: 'absolute',
    top: '1px',
    left: '1px',
    fontSize: '11px',
    fontWeight: 'normal',
    textShadow: '1px 1px 0 #000',
    zIndex: 1,
    pointerEvents: 'none',
  },
  tooltip: {
    position: 'absolute',
    bottom: '110%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1a1a1a',
    border: '1px solid #4a4a4a',
    padding: '2px 6px',
    borderRadius: '2px',
    zIndex: 100,
    whiteSpace: 'nowrap',
    boxShadow: '2px 2px 0 rgba(0,0,0,0.5)',
    pointerEvents: 'none',
  },
  tooltipText: {
    color: '#e9e9e9',
    fontSize: '11px',
    fontWeight: 'bold',
  },
};
