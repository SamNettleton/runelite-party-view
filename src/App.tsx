import { useState } from 'react';
import { useRuneLiteParty } from './hooks/useRuneLiteParty';
import './index.css';

function App() {
  const [partyPassphrase, setPartyPassphrase] = useState('');
  const [activePartyId, setActivePartyId] = useState<string | null>(null);
  const { players, connected, error, localMemberId } = useRuneLiteParty(activePartyId);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (partyPassphrase.trim()) {
      setActivePartyId(partyPassphrase.trim());
    }
  };

  const handleDisconnect = () => {
    setActivePartyId(null);
  };

  // Helper for OSRS quantity colors
  const getQtyColor = (qty: number) => {
    if (qty >= 10000000) return '#00ff80'; // 10M+ is Green
    if (qty >= 100000) return '#ffffff';   // 100K+ is White
    return '#ffff00';                      // Default is Yellow
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>RuneLite Party View</h1>
        <p>Monitor your party's inventory and stats in real-time</p>
      </header>

      {!activePartyId ? (
        <form className="join-panel" onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Enter Party Passphrase"
            value={partyPassphrase}
            onChange={(e) => setPartyPassphrase(e.target.value)}
            required
          />
          <button type="submit">Join Party</button>
        </form>
      ) : (
        <div className="dashboard">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <span className={`status-badge ${connected ? 'connected' : 'disconnected'}`}>
                {connected ? 'Connected' : 'Connecting...'}
              </span>
              <span style={{ marginLeft: '1rem', color: 'var(--text-muted)' }}>
                Party: <strong>{activePartyId}</strong>
              </span>
            </div>
            <button
              onClick={handleDisconnect}
              style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Disconnect
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div style={styles.playersGrid}>
            {Object.values(players).length === 0 && connected && !error && (
              <p style={{ color: 'var(--text-muted)' }}>Waiting for players to sync...</p>
            )}

            {Object.entries(players)
              .filter(([memberId]) => memberId !== localMemberId) // Skip local observer
              .map(([memberId, player]) => (
                <div key={memberId} style={styles.playerCard}>

                  {/* Clean Header with custom name color */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '0.5rem'
                  }}>
                    <h3 style={{
                      margin: 0,
                      color: player.member.color ? player.member.color.substring(0, 7) : '#fff'
                    }}>
                      {player.member.name || "Unknown Player"}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {memberId}</span>
                  </div>

                  {/* Live Stats Row */}
                  <div style={{ ...styles.statBarContainer, display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Hitpoints */}
                    {player.stats?.currentHitpoints !== undefined && (
                      <div style={{ ...styles.statItem, color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <img
                          src="https://oldschool.runescape.wiki/images/Hitpoints_icon.png"
                          alt="HP"
                          style={{ width: '16px', height: '16px' }}
                        />
                        {player.stats.currentHitpoints}{player.stats.maxHitpoints ? `/${player.stats.maxHitpoints}` : ''}
                      </div>
                    )}

                    {/* Prayer */}
                    {player.stats?.currentPrayer !== undefined && (
                      <div style={{ ...styles.statItem, color: '#33ccff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <img
                          src="https://oldschool.runescape.wiki/images/Prayer_icon.png"
                          alt="Pray"
                          style={{ width: '16px', height: '16px' }}
                        />
                        {player.stats.currentPrayer}{player.stats.maxPrayer ? `/${player.stats.maxPrayer}` : ''}
                      </div>
                    )}

                    {/* Run Energy */}
                    {player.stats?.runEnergy !== undefined && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffff66' }}>
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAAD/ZgD/mTP/zJn/zP//zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMxm8A7XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALklEQVQY02MAAkYGZqYARgZmZiYGYIAnAyuDExMwgzfIn8EJ0mACYgYnMMBkAgsAtiIDHqY/lOQAAAAASUVORK5CYII="
                          style={{ width: '15px' }} alt="Run"
                        />
                        <span style={{ fontSize: '0.85rem' }}>{player.stats.runEnergy}%</span>
                      </div>
                    )}

                    {/* Special Attack - The Crossed Swords */}
                    {player.stats?.spec !== undefined && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00ffcc' }}>
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAAD/ZgD/mTP/zJn/zP//zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMxm8A7XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALUlEQVQY02MAAkYGZqYARgZmZiYGYIAnAyuDExMwgzfIn8EJ0mACYgYnMMBkAosADwIDHl77iWwAAAAASUVORK5CYII="
                          style={{ width: '18px' }} alt="Spec"
                        />
                        <span style={{ fontSize: '0.85rem' }}>{player.stats.spec}%</span>
                      </div>
                    )}
                  </div>

                  {/* Inventory Grid */}
                  <div className="inventory-section">
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      Inventory
                    </h4>
                    <div style={styles.inventoryGrid}>
                      {player.inventory?.map((item, index) => (
                        <div key={index} style={styles.inventorySlot}>
                          {item.id !== -1 && item.id !== 0 && (
                            <>
                              <img
                                src={`https://static.runelite.net/cache/item/icon/${item.id}.png`}
                                style={styles.itemImg}
                                alt=""
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  if (target.src.includes('runelite')) {
                                    target.src = `https://www.osrsbox.com/osrsbox-db/items-icons/${item.id}.png`;
                                  }
                                }}
                              />
                              {item.qty > 1 && (
                                <span style={{ ...styles.itemQty, color: getQtyColor(item.qty) }}>
                                  {item.qty >= 10000000 ? `${Math.floor(item.qty / 1000000)}M` :
                                    item.qty >= 100000 ? `${Math.floor(item.qty / 1000)}K` : item.qty}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      )) || <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No inventory data</p>}
                    </div>
                  </div>

                  <div className="equipment-section" style={{ marginTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      Equipment
                    </h4>
                    <div style={styles.equipmentGrid}>
                      {/* Map through the 14 slots. Indexing matches OSRS equipment order */}
                      {player.equipment?.map((item, index) => {
                        // Logic to skip 'empty' slots in the 3x4 grid visual if desired
                        // but for a simple view, we just render the items
                        return (
                          <div key={index} style={styles.inventorySlot}>
                            {item.id > 0 && (
                              <>
                                <img
                                  src={`https://static.runelite.net/cache/item/icon/${item.id}.png`}
                                  style={styles.itemImg}
                                  alt=""
                                />
                                {item.qty > 1 && (
                                  <span style={{ ...styles.itemQty, color: getQtyColor(item.qty) }}>
                                    {item.qty}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="skills-section" style={{ marginTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      Skills & Combat (Lvl {player.combatLevel || 3})
                    </h4>
                    <div style={styles.skillsGrid}>
                      {Object.entries(player.stats || {})
                        .filter(([key]) => !['spec', 'runEnergy'].includes(key))
                        .map(([skill, data]) => {
                          // Handle both the new object {current, base} and the old flat numbers
                          const current = typeof data === 'object' ? data.current : data;
                          const base = typeof data === 'object' ? data.base : null;

                          return (
                            <div key={skill} style={styles.skillItem}>
                              <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize', fontSize: '0.7rem' }}>
                                {skill.substring(0, 3)}:
                              </span>
                              <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px', alignItems: 'baseline' }}>
                                <span style={{ color: '#ffff66', fontWeight: 'bold' }}>{current}</span>
                                {base !== null && (
                                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>/{base}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  playersGrid: {
    display: 'grid',
    // This allows cards to sit side-by-side if there's room
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
    alignItems: 'start',
    width: '100%',
  },
  // Update your card style
  playerCard: {
    backgroundColor: '#1e1e1e', // or your var(--bg-card)
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  inventoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 42px)',
    gridGap: '4px',
    backgroundColor: '#3e3529',
    padding: '6px',
    borderRadius: '4px',
    width: 'fit-content',
    border: '2px solid #2a241c',
    margin: '1rem 0',
  },
  inventorySlot: {
    width: '42px',
    height: '36px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '2px',
  },
  itemImg: {
    maxWidth: '32px',
    maxHeight: '32px',
    // Using filter for the classic OSRS item shadow
    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))',
  },
  itemQty: {
    position: 'absolute',
    top: '0',
    left: '0',
    fontSize: '10px',
    fontWeight: 'bold',
    textShadow: '1px 1px 0 #000',
    pointerEvents: 'none',
    zIndex: 1,
  },
  statBarContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
  },
  statItem: {
    fontSize: '0.8rem',
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  // Equipment uses a 3-column grid to mimic the in-game equipment tab
  equipmentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 42px)',
    gridGap: '4px',
    backgroundColor: '#3e3529',
    padding: '6px',
    borderRadius: '4px',
    border: '2px solid #2a241c',
    width: 'fit-content',
  },
  // Skills grid (3 columns: Attack, Strength, Defence, etc.)
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '4px',
    padding: '8px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '4px',
  },
  skillItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.75rem',
    background: 'rgba(255,255,255,0.03)',
    padding: '2px 4px',
    borderRadius: '2px',
  }
};