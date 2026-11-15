import { useState, useEffect, useRef } from 'react';
import { party } from '@/hooks/party_pb';
import { PlayerState, ConnectionStatus } from '@/types';
import Long from 'long';
import * as $protobuf from 'protobufjs/minimal';
import { updatePlayerFromData } from './partyReducer';

$protobuf.util.Long = Long;
$protobuf.configure();

export const dedupePlayersByName = (players: Record<string, PlayerState>) => {
  const latestByName = new Map<string, { id: string; lastUpdated: number }>();

  for (const [id, player] of Object.entries(players)) {
    const name = player?.member?.name?.trim();
    if (!name || name === 'Loading...' || name.toLowerCase().includes('observer')) continue;

    const current = latestByName.get(name);
    const lastUpdated = player.lastUpdated ?? 0;

    if (!current || lastUpdated > current.lastUpdated) {
      latestByName.set(name, { id, lastUpdated });
    }
  }

  const keepIds = new Set(Array.from(latestByName.values()).map((entry) => entry.id));
  return Object.fromEntries(
    Object.entries(players).filter(([id, player]) => {
      const name = player?.member?.name?.trim();
      if (!name || name === 'Loading...' || name.toLowerCase().includes('observer')) {
        return true;
      }

      return keepIds.has(id);
    })
  );
};

export function useRuneLiteParty(partyIdStr: string | null) {
  const [players, setPlayers] = useState<Record<string, PlayerState>>({});
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const memberIdRef = useRef<number>(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  const isComponentMounted = useRef(true);
  const socketVersion = useRef(0);

  const createSocket = async (partyId: string, version: number) => {
    if (!isComponentMounted.current || version !== socketVersion.current) return;

    try {
      const sessionUuid = crypto.randomUUID();
      const ws = new WebSocket(`wss://api.runelite.net/ws2?sessionId=${sessionUuid}`);
      ws.binaryType = 'arraybuffer';

      ws.onopen = () => {
        if (version !== socketVersion.current) {
          ws.close();
          return;
        }

        setStatus('connected');
        setError(null);
        sendHandshake(ws, partyId, memberIdRef.current);
      };

      ws.onmessage = (event) => {
        if (version !== socketVersion.current || !(event.data instanceof ArrayBuffer)) return;
        handleProtoMessage(event.data);
      };

      ws.onclose = (event) => {
        if (isComponentMounted.current && version === socketVersion.current) {
          setStatus('reconnecting');
          scheduleReconnect(event.code, partyId);
        }
      };

      socketRef.current = ws;
    } catch (e: any) {
      setError(`System Error: ${e.message}`);
    }
  };

  const scheduleReconnect = (closeCode: number, partyId: string) => {
    if (closeCode === 1008) {
      memberIdRef.current = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }

    setTimeout(() => {
      if (isComponentMounted.current && partyIdStr) {
        initConnection(partyId);
      }
    }, 3000);
  };

  const initConnection = (partyId: string) => {
    if (socketRef.current) {
      socketRef.current.onclose = null;
      socketRef.current.close();
      socketRef.current = null;
    }
    setStatus((prev) => (prev === 'reconnecting' ? 'reconnecting' : 'connecting'));
    socketVersion.current += 1;
    createSocket(partyId, socketVersion.current);
  };

  const handleProtoMessage = (data: ArrayBuffer) => {
    try {
      const decoded = party.S2C.decode(new Uint8Array(data));

      if (decoded.part) {
        const id = decoded.part.memberId!.toString();
        setPlayers((prev) => {
          const { [id]: _, ...rest } = prev;
          return dedupePlayersByName(rest);
        });
      } else if (decoded.join) {
        const id = decoded.join.memberId!.toString();
        setPlayers((prev) => {
          const next = {
            ...prev,
            [id]: prev[id] ? { ...prev[id], lastUpdated: Date.now() } : createEmptyPlayer(id),
          };
          return dedupePlayersByName(next);
        });
      } else if (decoded.data?.memberId && decoded.data.data) {
        const senderId = decoded.data.memberId.toString();
        const type = decoded.data.type!;
        const json = JSON.parse(new TextDecoder().decode(decoded.data.data));

        setPlayers((prev) => {
          const existing = prev[senderId] || createEmptyPlayer(senderId);
          const updatedPlayer = updatePlayerFromData(existing, type, json);
          const next = {
            ...prev,
            [senderId]: updatedPlayer,
          };
          return dedupePlayersByName(next);
        });
      }
    } catch (e) {
      console.error('Decode Error:', e);
    }
  };

  useEffect(() => {
    isComponentMounted.current = true;

    if (!partyIdStr) {
      setStatus('idle');
      setPlayers({});
      return;
    }

    const init = async () => {
      try {
        const partyIdNumeric = await getPartyIdNumeric(partyIdStr);
        if (!isComponentMounted.current) return;
        initConnection(partyIdNumeric);
      } catch (e: any) {
        setError('Invalid Party ID.');
      }
    };

    init();

    return () => {
      isComponentMounted.current = false;
      if (socketRef.current) {
        socketRef.current.onclose = null;
        socketRef.current.close();
      }
    };
  }, [partyIdStr]);

  return {
    players,
    status,
    error,
  };
}

export async function getPartyIdNumeric(passphrase: string): Promise<string> {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest('SHA-256', encoder.encode(passphrase));
  const hashArray = new Uint8Array(hash);
  const view = new DataView(hashArray.buffer);
  const rawLong = view.getBigInt64(0, true);
  return (rawLong & 0x7fffffffffffffffn).toString();
}

export const sendHandshake = (ws: WebSocket, partyId: string, memberId: number) => {
  if (ws.readyState !== WebSocket.OPEN) return;
  const mId = Long.fromNumber(memberId, false);
  const pId = Long.fromString(partyId, false);

  ws.send(party.C2S.encode(party.C2S.create({ join: { partyId: pId, memberId: mId } })).finish());
};

export function createEmptyPlayer(id: string): PlayerState {
  return {
    member: { memberId: id, name: 'Loading...' },
    stats: {},
    inventory: [],
    equipment: [],
    combatLevel: 3,
    world: 0,
    lastUpdated: Date.now(),
  };
}
