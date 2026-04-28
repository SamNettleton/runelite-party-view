import { describe, it, expect } from 'vitest';
import { getQtyColor, formatQty } from './itemHelpers';

describe('getQtyColor', () => {
  it('returns green (#00ff80) for 10M+', () => {
    expect(getQtyColor(10_000_000)).toBe('#00ff80');
    expect(getQtyColor(99_999_999)).toBe('#00ff80');
  });

  it('returns white (#ffffff) for 100K–9,999,999', () => {
    expect(getQtyColor(100_000)).toBe('#ffffff');
    expect(getQtyColor(9_999_999)).toBe('#ffffff');
  });

  it('returns yellow (#ffff00) for anything below 100K', () => {
    expect(getQtyColor(1)).toBe('#ffff00');
    expect(getQtyColor(99_999)).toBe('#ffff00');
    expect(getQtyColor(0)).toBe('#ffff00');
  });
});

describe('formatQty', () => {
  it('formats 10M+ as whole millions with M suffix', () => {
    expect(formatQty(10_000_000)).toBe('10M');
    expect(formatQty(25_500_000)).toBe('25M'); // floors, not rounds
    expect(formatQty(2_147_483_647)).toBe('2147M'); // max cash stack
  });

  it('formats 100K–9,999,999 as whole thousands with K suffix', () => {
    expect(formatQty(100_000)).toBe('100K');
    expect(formatQty(999_999)).toBe('999K');
    expect(formatQty(5_750_000)).toBe('5750K');
  });

  it('returns the raw number for anything below 100K', () => {
    expect(formatQty(1)).toBe(1);
    expect(formatQty(99_999)).toBe(99_999);
    expect(formatQty(0)).toBe(0);
  });
});
