import WebSocket from 'ws';
const ws = new WebSocket('wss://api.runelite.net/ws2?sessionId=123e4567-e89b-12d3-a456-426614174000');
ws.on('open', () => { console.log('connected to wss://api.runelite.net/ws2'); ws.close(); });
ws.on('error', (err) => console.error('error:', err.message));
