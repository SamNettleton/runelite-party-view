import { describe, it, expect } from 'vitest';
import { dedupePlayersByName, getPartyIdNumeric, createEmptyPlayer } from './useRuneLiteParty';
import type { PlayerState } from '@/types';

describe('getPartyIdNumeric', () => {
  it('returns a deterministic numeric string for a given passphrase', async () => {
    const result = await getPartyIdNumeric('test-party');
    expect(result).toMatch(/^\d+$/);

    const result2 = await getPartyIdNumeric('test-party');
    expect(result).toBe(result2);
  });

  it('returns different IDs for different passphrases', async () => {
    const a = await getPartyIdNumeric('party-alpha');
    const b = await getPartyIdNumeric('party-beta');
    expect(a).not.toBe(b);
  });

  it('always returns a non-negative value (top bit is masked off)', async () => {
    const phrases = ['abc', 'xyz', 'runelite', 'hello world', '12345'];
    for (const p of phrases) {
      const id = await getPartyIdNumeric(p);
      expect(BigInt(id)).toBeGreaterThanOrEqual(0n);
    }
  });
});

describe('createEmptyPlayer', () => {
  it('returns a player with the given memberId', () => {
    const player = createEmptyPlayer('42');
    expect(player.member.memberId).toBe('42');
  });

  it('has sensible defaults', () => {
    const player = createEmptyPlayer('1');
    expect(player.member.name).toBe('Loading...');
    expect(player.stats).toEqual({});
    expect(player.inventory).toEqual([]);
    expect(player.equipment).toEqual([]);
    expect(player.combatLevel).toBe(3);
    expect(player.world).toBe(0);
  });
});

describe('dedupePlayersByName', () => {
  const makePlayer = (id: string, name: string, lastUpdated: number): PlayerState => ({
    member: { memberId: id, name },
    stats: {},
    inventory: [],
    equipment: [],
    combatLevel: 3,
    world: 0,
    lastUpdated,
  });

  it('keeps only the newest session for a username', () => {
    const players: Record<string, PlayerState> = {
      old: makePlayer('old', 'Farmer Carb', 1000),
      newer: makePlayer('newer', 'Farmer Carb', 2000),
      other: makePlayer('other', 'Moo', 1500),
    };

    const result = dedupePlayersByName(players);
    expect(Object.keys(result)).toEqual(['newer', 'other']);
  });

  it('ignores loading and observer entries when deduplicating', () => {
    const players: Record<string, PlayerState> = {
      loading: makePlayer('loading', 'Loading...', 5000),
      observer: makePlayer('observer', 'Observer', 4000),
      real: makePlayer('real', 'Alice', 3000),
      stale: makePlayer('stale', 'Alice', 1000),
    };

    const result = dedupePlayersByName(players);
    expect(Object.keys(result)).toEqual(['real']);
  });
});
