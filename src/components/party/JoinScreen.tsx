import { useState } from 'react';

interface JoinScreenProps {
  onJoin: (passphrase: string) => void;
}

export const JoinScreen: React.FC<JoinScreenProps> = ({ onJoin }) => {
  const [passphrase, setPassphrase] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase.trim()) {
      onJoin(passphrase.trim());
    }
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>RuneLite Party View</h1>
        <p style={styles.subtitle}>Monitor your team's vitals in real-time</p>
      </header>

      <form style={styles.joinPanel} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter Party Passphrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          required
        />
        <button style={styles.joinButton} type="submit">
          Join Party
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    color: '#94a3b8',
  },
  joinPanel: {
    background: '#14151c',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  input: {
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  },
  joinButton: {
    padding: '0.75rem 1rem',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
