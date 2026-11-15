import { describe, it, expect } from 'vitest';
import { updatePlayerFromData } from './partyReducer';
import type { PlayerState } from '@/types';

function emptyPlayer(id = '1'): PlayerState {
  return {
    member: { memberId: id, name: 'Test' },
    stats: {},
    inventory: [],
    equipment: [],
    combatLevel: 3,
    world: 0,
  };
}

describe('updatePlayerFromData – PartyData', () => {
  it('sets the player name', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', { n: 'Farmer Carb' });
    expect(result.member.name).toBe('Farmer Carb');
  });

  it('converts packed integer color to hex string', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', { c: 527488582 });
    expect(result.member.color).toBe('#70d646');
  });

  it('preserves string color values', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', { c: '#ff0000' });
    expect(result.member.color).toBe('#ff0000');
  });

  it('reads run energy and spec from the live RuneLite payload keys', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', { e: 75, sp: 50 });
    expect(result.stats?.runEnergy).toBe(75);
    expect(result.stats?.spec).toBe(50);
  });

  it('defaults missing run energy and spec values to 100 when absent', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', { n: 'Sam' });
    expect(result.stats?.runEnergy).toBe(100);
    expect(result.stats?.spec).toBe(100);
  });

  it('sets prayer mask including explicit 0 for no active prayers', () => {
    const withPrayer = updatePlayerFromData(emptyPlayer(), 'PartyData', { p: 16384 });
    expect(withPrayer.prayerMask).toBe(16384);

    const cleared = updatePlayerFromData(withPrayer, 'PartyData', { p: 0 });
    expect(cleared.prayerMask).toBe(0);
  });

  it('parses inventory (i) and equipment (w) arrays', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', {
      i: [995, 2639407, 4151, 1],
      w: [24664, 1, 12821, 1],
    });

    expect(result.inventory).toEqual([
      { id: 995, qty: 2639407 },
      { id: 4151, qty: 1 },
    ]);
    expect(result.equipment).toEqual([
      { id: 24664, qty: 1 },
      { id: 12821, qty: 1 },
    ]);
  });

  it('parses modern skill arrays and calculates combat level from base skills', () => {
    const baseSkills = Array(24).fill(99);
    const currentSkills = Array(24).fill(99);
    currentSkills[0] = 118;
    currentSkills[3] = 108;
    currentSkills[5] = 94;

    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', {
      b: baseSkills,
      s: currentSkills,
    });

    expect(result.stats?.attack).toEqual({ base: 99, current: 118 });
    expect(result.stats?.hitpoints).toEqual({ base: 99, current: 108 });
    expect(result.stats?.prayer).toEqual({ base: 99, current: 94 });
    expect(result.combatLevel).toBe(126);
  });

  it('preserves existing state when receiving partial PartyData updates', () => {
    const initial = updatePlayerFromData(emptyPlayer(), 'PartyData', {
      n: 'Farmer Carb',
      e: 90,
      p: 2048,
    });
    const result = updatePlayerFromData(initial, 'PartyData', { sp: 25 });

    expect(result.member.name).toBe('Farmer Carb');
    expect(result.stats?.runEnergy).toBe(90);
    expect(result.prayerMask).toBe(2048);
    expect(result.stats?.spec).toBe(25);
  });

  it('supports the newer object payload with current and base values', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyData', {
      b: [99, 99, 99, 99, 99, 99],
      s: [99, 99, 99, 108, 99, 94],
    });

    expect(result.stats?.hitpoints).toEqual({ base: 99, current: 108 });
    expect(result.stats?.prayer).toEqual({ base: 99, current: 94 });
  });

  it('does not clobber skill data when only one field changes', () => {
    const initial = updatePlayerFromData(emptyPlayer(), 'PartyData', {
      b: Array(24).fill(99),
      s: Array(24).fill(99),
    });
    const result = updatePlayerFromData(initial, 'PartyData', {
      e: 65,
      sp: 45,
    });

    expect(result.stats?.hitpoints).toEqual({ base: 99, current: 99 });
    expect(result.stats?.runEnergy).toBe(65);
    expect(result.stats?.spec).toBe(45);
  });
});

describe('updatePlayerFromData – PartyHealthStatusUpdate', () => {
  it('updates hp based on live currentHealth and maxHealth values', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PartyHealthStatusUpdate', {
      currentHealth: 116,
      maxHealth: 117,
    });

    expect(result.stats?.hitpoints).toEqual({ base: 117, current: 116 });
  });
});

describe('updatePlayerFromData – PredictedHitPartyMessage', () => {
  it('stores NPC target from predictedHit', () => {
    const data = {
      predictedHit: {
        npcId: 8349,
        opponentIsPlayer: false,
        targetIndex: 7,
        playerCombatLevel: -1,
      },
      color: { r: 255, g: 255, b: 255 },
      world: 302,
    };
    const result = updatePlayerFromData(emptyPlayer(), 'PredictedHitPartyMessage', data);
    expect(result.lastAttackedTarget).toEqual({
      npcId: 8349,
      isPlayer: false,
    });
  });

  it('stores player target', () => {
    const data = {
      predictedHit: {
        npcId: -1,
        opponentIsPlayer: true,
        targetIndex: 3,
      },
      color: { r: 0, g: 0, b: 0 },
      world: 302,
    };
    const result = updatePlayerFromData(emptyPlayer(), 'PredictedHitPartyMessage', data);
    expect(result.lastAttackedTarget).toEqual({
      npcId: -1,
      isPlayer: true,
    });
  });

  it('does not set lastAttackedTarget when predictedHit is absent', () => {
    const result = updatePlayerFromData(emptyPlayer(), 'PredictedHitPartyMessage', {
      color: {},
      world: 302,
    });
    expect(result.lastAttackedTarget).toBeUndefined();
  });
});
