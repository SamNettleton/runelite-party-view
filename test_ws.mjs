import WebSocket from 'ws';
const ws = new WebSocket('wss://party.runelite.net/');
ws.on('open', () => { console.log('connected'); ws.close(); });
ws.on('error', (err) => console.error('error:', err.message));
