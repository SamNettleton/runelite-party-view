import WebSocket from 'ws';
const ws = new WebSocket('wss://api.runelite.net/ws');
ws.on('open', () => { console.log('connected to wss://api.runelite.net/ws'); ws.close(); });
ws.on('error', (err) => console.error('error:', err.message));
