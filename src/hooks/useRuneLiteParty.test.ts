import { describe, it, expect } from 'vitest';
import { getPartyIdNumeric, createEmptyPlayer } from './useRuneLiteParty';

describe('getPartyIdNumeric', () => {
  it('returns a deterministic numeric string for a given passphrase', async () => {
    const result = await getPartyIdNumeric('test-party');
    expect(result).toMatch(/^\d+$/);

    // Same input should always produce the same output
    const result2 = await getPartyIdNumeric('test-party');
    expect(result).toBe(result2);
  });

  it('returns different IDs for different passphrases', async () => {
    const a = await getPartyIdNumeric('party-alpha');
    const b = await getPartyIdNumeric('party-beta');
    expect(a).not.toBe(b);
  });

  it('always returns a non-negative value (top bit is masked off)', async () => {
    // Run a few passphrases to check no negatives slip through
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
