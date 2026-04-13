import { useState, useEffect, useRef } from 'react';
import { party } from './party_pb';
import Long from 'long';
import * as $protobuf from 'protobufjs/minimal';

$protobuf.util.Long = Long;
$protobuf.configure();

export interface PartyMember {
  memberId: string;
  name: string;
  color?: string;
}

export interface InventoryItem {
  id: number;
  qty: number;
}

export interface PlayerStats {
  currentHitpoints?: number;
  maxHitpoints?: number;
  currentPrayer?: number;
  maxPrayer?: number;
  runEnergy?: number;
  spec?: number;
  [key: string]: any;
}

export interface PlayerState {
  member: PartyMember;
  inventory?: InventoryItem[];
  equipment?: InventoryItem[];
  stats?: PlayerStats;
  world?: number;
  combatLevel?: number;
  [key: string]: any;
}

export function useRuneLiteParty(partyIdStr: string | null) {
  const [players, setPlayers] = useState<Record<string, PlayerState>>({});
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heartbeatIntervalRef = useRef<number | null>(null);

  const getPersistentMemberId = () => {
    const saved = localStorage.getItem('runelite-member-id');
    if (saved) return parseInt(saved, 10);

    const newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    localStorage.setItem('runelite-member-id', newId.toString());
    return newId;
  };

  const memberIdRef = useRef<number>(getPersistentMemberId());

  const startHeartbeat = (socket: WebSocket) => {
    if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);

    heartbeatIntervalRef.current = window.setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        const mId = Long.fromNumber(memberIdRef.current, false);

        // Mimicking a UserSync is the most reliable "Stay Alive" signal
        const syncPayload = JSON.stringify({ name: "Web Observer" });
        const heartbeatMsg = party.C2S.create({
          data: {
            memberId: mId,
            type: "UserSync",
            data: new TextEncoder().encode(syncPayload)
          }
        });

        const buffer = party.C2S.encode(heartbeatMsg).finish();
        socket.send(buffer);
        console.log("Active Heartbeat (UserSync) sent");
      }
    }, 300000); // 5 minutes (300,000ms)
  };

  useEffect(() => {
    if (!partyIdStr) {
      setConnected(false);
      setError(null);
      setPlayers({});
      return;
    }

    let ws: WebSocket;
    let isComponentMounted = true;
    const sessionUuid = crypto.randomUUID();
    const wsUrl = `wss://api.runelite.net/ws2?sessionId=${sessionUuid}`;

    async function initConnection() {
      if (!partyIdStr) return;

      const encoder = new TextEncoder();
      const encoded = encoder.encode(partyIdStr);
      const hash = await crypto.subtle.digest('SHA-256', encoded);
      const hashArray = new Uint8Array(hash);
      const view = new DataView(hashArray.buffer);

      const rawLong = view.getBigInt64(0, true);
      const partyIdNumeric = (rawLong & 0x7FFFFFFFFFFFFFFFn).toString();

      try {
        ws = new WebSocket(wsUrl);
        ws.binaryType = 'arraybuffer';

        ws.onopen = () => {
          if (!isComponentMounted) {
            ws?.close();
            return;
          }

          setConnected(true);
          setError(null);

          const pId = Long.fromString(partyIdNumeric, false);
          const mId = Long.fromNumber(memberIdRef.current, false);

          // 1. Join the party
          const c2sMessage = party.C2S.create({
            join: { partyId: pId, memberId: mId }
          });
          ws.send(party.C2S.encode(c2sMessage).finish());

          // 2. Identify yourself (Handshake)
          const syncPayload = JSON.stringify({ name: "Web Observer" });
          const syncBuffer = party.C2S.encode(party.C2S.create({
            data: { memberId: mId, type: "UserSync", data: new TextEncoder().encode(syncPayload) }
          })).finish();
          ws.send(syncBuffer);

          // 3. Initial Status Update (Initializes HP/Prayer/Spec/Color)
          // This ensures you show up properly in the sidebar for other players
          const statusPayload = JSON.stringify({
            n: "Web Observer",
            hc: 99,           // Current HP
            hm: 99,           // Max HP
            pc: 99,           // Current Prayer
            pm: 99,           // Max Prayer
            r: 100,           // Run Energy
            s: 100,           // Spec
            v: false,         // Visibility
            c: "#00FFFF"      // Name color
          });

          const statusBuffer = party.C2S.encode(party.C2S.create({
            data: {
              memberId: mId,
              type: "StatusUpdate",
              data: new TextEncoder().encode(statusPayload)
            }
          })).finish();
          ws.send(statusBuffer);

          // 4. Start the keep-alive timer
          startHeartbeat(ws);
        };

        ws.onmessage = (event) => {
          try {
            if (!(event.data instanceof ArrayBuffer)) return;

            const buffer = new Uint8Array(event.data);
            const decoded = party.S2C.decode(buffer);

            // 1. Handle Member Leaving
            if (decoded.part && decoded.part.memberId) {
              const leftMemberId = decoded.part.memberId.toString();
              setPlayers(prev => {
                const newState = { ...prev };
                delete newState[leftMemberId];
                return newState;
              });
              return;
            }

            // 2. Handle Member Joining
            if (decoded.join && decoded.join.memberId) {
              const joinedMemberId = decoded.join.memberId.toString();
              setPlayers(prev => ({
                ...prev,
                [joinedMemberId]: {
                  ...prev[joinedMemberId],
                  member: { memberId: joinedMemberId, name: prev[joinedMemberId]?.member?.name || 'Unknown' },
                  stats: prev[joinedMemberId]?.stats || {},
                  inventory: prev[joinedMemberId]?.inventory || []
                }
              }));
            }

            // 3. Handle Data Packets
            if (decoded.data && decoded.data.memberId) {
              const senderId = decoded.data.memberId.toString();
              const type = decoded.data.type; // This is the string "UserSync", "StatusUpdate", etc.
              const rawPayload = decoded.data.data;

              if (rawPayload && rawPayload.length > 0) {
                const jsonStr = new TextDecoder().decode(rawPayload);

                try {
                  const decodedJson = JSON.parse(jsonStr);

                  // Log only valid, incoming data from OTHER players
                  if (senderId !== memberIdRef.current.toString()) {
                    console.log(`%c[${type}] from ${senderId}`, "color: #33ccff;", decodedJson);
                  }

                  setPlayers((prev): Record<string, PlayerState> => {
                    const existingPlayer = prev[senderId] || {
                      member: { memberId: senderId, name: 'Unknown' },
                      stats: {},
                      equipment: [],
                      combatLevel: 3,
                      world: 0,
                      inventory: []
                    };

                    const stats = { ...existingPlayer.stats };
                    let name = existingPlayer.member.name;
                    let color = existingPlayer.member.color;
                    let inventory = existingPlayer.inventory ? [...existingPlayer.inventory] : [];
                    let equipment = existingPlayer.equipment ? [...existingPlayer.equipment] : [];
                    let combatLevel = existingPlayer.combatLevel;
                    let world = existingPlayer.world;

                    if (type === "StatusUpdate") {
                      if (decodedJson.n) name = decodedJson.n;
                      if (decodedJson.c) color = decodedJson.c;
                      stats.currentHitpoints = decodedJson.hc ?? stats.currentHitpoints;
                      stats.maxHitpoints = decodedJson.hm ?? stats.maxHitpoints;
                      stats.currentPrayer = decodedJson.pc ?? stats.currentPrayer;
                      stats.maxPrayer = decodedJson.pm ?? stats.maxPrayer;
                      stats.runEnergy = decodedJson.r ?? stats.runEnergy;
                      stats.spec = decodedJson.s ?? stats.spec;
                    }

                    if (type === "PartyBatchedChange") {
                      // Stats/Misc
                      if (Array.isArray(decodedJson.m)) {
                        decodedJson.m.forEach((u: any) => {
                          switch (u.t) {
                            case 'R': stats.runEnergy = u.v; break;
                            case 'H': stats.currentHitpoints = u.v; break;
                            case 'P': stats.currentPrayer = u.v; break;
                            case 'S': stats.spec = u.v; break;
                            case 'C': combatLevel = u.v; break;
                            case 'W': world = u.v; break;
                          }
                        });
                      }
                      // Inventory
                      if (Array.isArray(decodedJson.i)) {
                        inventory = [];
                        for (let i = 0; i < decodedJson.i.length; i += 2) {
                          inventory.push({ id: decodedJson.i[i], qty: decodedJson.i[i + 1] });
                        }
                      }
                      // Equipment
                      if (Array.isArray(decodedJson.e)) {
                        equipment = [];
                        for (let i = 0; i < decodedJson.e.length; i += 2) {
                          equipment.push({ id: decodedJson.e[i], qty: decodedJson.e[i + 1] });
                        }
                      }
                      // Skills
                      if (Array.isArray(decodedJson.s)) {
                        const skillNames = [
                          "attack", "defence", "strength", "hitpoints", "ranged", "prayer",
                          "magic", "cooking", "woodcutting", "fletching", "fishing", "firemaking",
                          "crafting", "smithing", "mining", "herblore", "agility", "thieving",
                          "slayer", "farming", "runecraft", "hunter", "construction"
                        ];

                        decodedJson.s.forEach((skillData: { s: number, l: number, b: number }) => {
                          const sName = skillNames[skillData.s];
                          if (sName) {
                            // Store as an object so it's easier to grab both at once
                            stats[sName] = {
                              current: skillData.l,
                              base: skillData.b
                            };
                          }
                        });
                      }
                    }

                    return {
                      ...prev,
                      [senderId]: {
                        ...existingPlayer,
                        member: { ...existingPlayer.member, name, color },
                        stats,
                        inventory,
                        equipment,
                        combatLevel,
                        world
                      }
                    };
                  });
                } catch (e) {
                  console.warn("Could not parse JSON for type:", type);
                }
              }
            }
          } catch (e) {
            console.error("Decode Error:", e);
          }
        };

        ws.onerror = (err) => {
          console.error("WS Error:", err);
          setError("Network error occurred.");
        };

        ws.onclose = () => {
          setConnected(false);
          console.log("WS Closed");

          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
          }
        };

      } catch (e: any) {
        setError(e.message);
      }
    }

    initConnection();

    return () => {
      if (ws) ws.close();
    };
  }, [partyIdStr]);

  return { players, connected, error, localMemberId: memberIdRef.current.toString() };
}