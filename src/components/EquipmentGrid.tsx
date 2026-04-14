import React from 'react';
import { InventoryItem } from '@/types';
import { formatQty, getQtyColor } from '@/utils/itemHelpers';

export const EquipmentGrid: React.FC<{ items?: InventoryItem[] }> = ({ items }) => {
  const layout = [-1, 0, -1, 1, 2, 13, 3, 4, 5, -1, 7, -1, 9, 10, 12];

  return (
    <div style={styles.equipmentGrid}>
      {layout.map((slotId, gridIndex) => {
        if (slotId === -1) {
          return <div key={`spacer-${gridIndex}`} style={styles.spacer} />;
        }

        const item = items?.[slotId];
        const hasItem = item && item.id > 0;

        return (
          <div key={`slot-${slotId}`} style={styles.slot}>
            {hasItem && (
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
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  equipmentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 52px)',
    gridTemplateRows: 'repeat(5, 45px)',
    gap: '5px',
    backgroundColor: '#3e3529',
    borderRadius: '4px',
    border: '2px solid #2a241c',
    boxSizing: 'border-box',
    width: '243px',
    height: '365px',
    paddingLeft: '36.5px',
    paddingRight: '36.5px',
    paddingTop: '58px',
    paddingBottom: '58px',
  },
  slot: {
    width: '52px',
    height: '45px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '2px',
  },
  spacer: {
    width: '52px',
    height: '45px',
    visibility: 'hidden',
  },
  itemImg: {
    maxWidth: '40px',
    maxHeight: '40px',
    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))',
  },
  qty: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    fontSize: '12px',
    fontWeight: 'bold',
    textShadow: '1px 1px 0 #000',
    zIndex: 1,
  },
};
