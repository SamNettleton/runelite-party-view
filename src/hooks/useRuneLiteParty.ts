import { useState, useEffect, useRef } from 'react';
import { party } from '@/hooks/party_pb';
import { PlayerState } from '@/types';
import Long from 'long';
import * as $protobuf from 'protobufjs/minimal';
import { updatePlayerFromData } from './partyReducer';

$protobuf.util.Long = Long;
$protobuf.configure();

export function useRuneLiteParty(partyIdStr: string | null) {
  const [players, setPlayers] = useState<Record<string, PlayerState>>({});
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socketARef = useRef<WebSocket | null>(null);
  const socketBRef = useRef<WebSocket | null>(null);

  const errorARef = useRef<string | null>(null);
  const errorBRef = useRef<string | null>(null);

  // Two separate IDs to bypass the 1008 "Member Resumed" error
  const memberIdARef = useRef<number>(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  const memberIdBRef = useRef<number>(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  const createSocket = async (label: 'A' | 'B', partyId: string) => {
    try {
      const sessionUuid = crypto.randomUUID();
      const currentMemberId = label === 'A' ? memberIdARef.current : memberIdBRef.current;

      const ws = new WebSocket(`wss://api.runelite.net/ws2?sessionId=${sessionUuid}`);
      ws.binaryType = 'arraybuffer';

      ws.onopen = () => {
        console.log(`[Socket ${label}] ✅ Connected as ID: ${currentMemberId}`);
        if (label === 'A') errorARef.current = null;
        else errorBRef.current = null;

        setError(null);
        setConnected(true);

        sendHandshake(ws, partyId, currentMemberId, `Web Observer ${label}`);
      };

      ws.onmessage = (event) => {
        if (!(event.data instanceof ArrayBuffer)) return;
        handleProtoMessage(event.data);
      };

      ws.onerror = () => {
        const errMsg = `Socket ${label} failed.`;
        if (label === 'A') errorARef.current = errMsg;
        else errorBRef.current = errMsg;

        if (errorARef.current && errorBRef.current) {
          setError('All relay connections failed.');
        }
      };

      ws.onclose = (event) => {
        console.log(`[Socket ${label}] 🔌 Closed (Code: ${event.code}). Reconnecting...`);
        setTimeout(() => {
          if (partyIdStr) createSocket(label, partyId);
        }, 3000); // 3s buffer to prevent spamming the relay
      };

      if (label === 'A') socketARef.current = ws;
      else socketBRef.current = ws;
    } catch (e: any) {
      setError(`System Error: ${e.message}`);
    }
  };

  const handleProtoMessage = (data: ArrayBuffer) => {
    try {
      const decoded = party.S2C.decode(new Uint8Array(data));

      if (decoded.part) {
        const id = decoded.part.memberId!.toString();
        setPlayers(({ [id]: _, ...rest }) => rest);
      } else if (decoded.join) {
        const id = decoded.join.memberId!.toString();
        setPlayers((prev) => ({ ...prev, [id]: prev[id] || createEmptyPlayer(id) }));
      } else if (decoded.data?.memberId && decoded.data.data) {
        const senderId = decoded.data.memberId.toString();
        const type = decoded.data.type!;
        const json = JSON.parse(new TextDecoder().decode(decoded.data.data));
        setPlayers((prev) => {
          const player = prev[senderId] || createEmptyPlayer(senderId);
          return { ...prev, [senderId]: updatePlayerFromData(player, type, json) };
        });
      }
    } catch (e) {
      console.error('Decode Error:', e);
    }
  };

  useEffect(() => {
    if (!partyIdStr) {
      setConnected(false);
      setError(null);
      setPlayers({});
      return;
    }

    let isComponentMounted = true;
    let shadowTimer: number;

    const init = async () => {
      try {
        const partyIdNumeric = await getPartyIdNumeric(partyIdStr);
        if (!isComponentMounted) return;

        createSocket('A', partyIdNumeric);

        // 60-second offset ensures they never "die" at the same time
        shadowTimer = window.setTimeout(() => {
          if (isComponentMounted) createSocket('B', partyIdNumeric);
        }, 60000);
      } catch (e: any) {
        setError('Invalid Party ID.');
      }
    };

    init();

    return () => {
      isComponentMounted = false;
      clearTimeout(shadowTimer);
      if (socketARef.current) socketARef.current.onclose = null;
      if (socketBRef.current) socketBRef.current.onclose = null;
      socketARef.current?.close();
      socketBRef.current?.close();
    };
  }, [partyIdStr]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const isAOpen = socketARef.current?.readyState === WebSocket.OPEN;
      const isBOpen = socketBRef.current?.readyState === WebSocket.OPEN;
      setConnected(isAOpen || isBOpen);
    }, 1000);
    return () => clearInterval(checkInterval);
  }, []);

  return {
    players,
    connected,
    error,
  };
}

async function getPartyIdNumeric(passphrase: string): Promise<string> {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(passphrase));
  const hashArray = new Uint8Array(hash);
  const view = new DataView(hashArray.buffer);
  const rawLong = view.getBigInt64(0, true);
  return (rawLong & 0x7fffffffffffffffn).toString();
}

const sendHandshake = (ws: WebSocket, partyId: string, memberId: number, name: string) => {
  if (ws.readyState !== WebSocket.OPEN) return;
  const mId = Long.fromNumber(memberId, false);
  const pId = Long.fromString(partyId, false);
  const encoder = new TextEncoder();

  ws.send(party.C2S.encode(party.C2S.create({ join: { partyId: pId, memberId: mId } })).finish());
  ws.send(
    party.C2S.encode(
      party.C2S.create({
        data: { memberId: mId, type: 'UserSync', data: encoder.encode(JSON.stringify({ name })) },
      })
    ).finish()
  );
};

function createEmptyPlayer(id: string): PlayerState {
  return {
    member: { memberId: id, name: 'Loading...' },
    stats: {},
    inventory: [],
    equipment: [],
    combatLevel: 3,
    world: 0,
  };
}
