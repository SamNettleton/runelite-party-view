import { PlayerState, PlayerStats, InventoryItem, LastAttackedTarget } from '@/types';

const SKILL_NAMES = [
  'attack',
  'defence',
  'strength',
  'hitpoints',
  'ranged',
  'prayer',
  'magic',
  'cooking',
  'woodcutting',
  'fletching',
  'fishing',
  'firemaking',
  'crafting',
  'smithing',
  'mining',
  'herblore',
  'agility',
  'thieving',
  'slayer',
  'farming',
  'runecraft',
  'hunter',
  'construction',
  'sailing',
];

const parseItems = (arr: number[]): InventoryItem[] => {
  const items: InventoryItem[] = [];
  if (!Array.isArray(arr)) return items;

  for (let i = 0; i < arr.length; i += 2) {
    items.push({ id: arr[i], qty: arr[i + 1] });
  }

  return items;
};

function calculateCombatLevel(baseSkills: number[]): number {
  const attack = baseSkills[0] ?? 1;
  const defence = baseSkills[1] ?? 1;
  const strength = baseSkills[2] ?? 1;
  const hitpoints = baseSkills[3] ?? 10;
  const ranged = baseSkills[4] ?? 1;
  const prayer = baseSkills[5] ?? 1;
  const magic = baseSkills[6] ?? 1;

  const base = (defence + hitpoints + Math.floor(prayer / 2)) / 4;
  const melee = (325 * (attack + strength)) / 1000;
  const range = (325 * Math.floor(ranged * 1.5)) / 1000;
  const mage = (325 * Math.floor(magic * 1.5)) / 1000;

  return Math.floor(base + Math.max(melee, range, mage) + 0.0001);
}

function applySkillData(
  stats: PlayerStats,
  skillIndex: number,
  base: number,
  current: number
): void {
  const skillName = SKILL_NAMES[skillIndex];
  if (!skillName || base === undefined || current === undefined) return;

  stats[skillName] = {
    base: Math.min(base, 99),
    current,
  };
}

const parseFiniteNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

const extractNumberFromPayload = (value: unknown, key?: string): number | undefined => {
  const directValue = parseFiniteNumber(value);
  if (directValue !== undefined) return directValue;

  if (value && typeof value === 'object') {
    const objectValue = value as Record<string, unknown>;

    if (key && objectValue[key] !== undefined) {
      const nested = parseFiniteNumber(objectValue[key]);
      if (nested !== undefined) return nested;
    }

    for (const candidateKey of ['value', 'current', 'amount']) {
      const nested = parseFiniteNumber(objectValue[candidateKey]);
      if (nested !== undefined) return nested;
    }
  }

  return undefined;
};

export function updatePlayerFromData(existing: PlayerState, type: string, data: any): PlayerState {
  const stats: PlayerStats = { ...(existing.stats ?? {}) };
  const next: PlayerState = {
    ...existing,
    member: { ...existing.member },
    stats,
  };

  let hasMeaningfulUpdate = false;

  if (type === 'PartyData' || type === 'StatusUpdate' || type === 'PartyMemberUpdate') {
    console.log('data:', data);
    if (data.n) {
      next.member.name = data.n;
      hasMeaningfulUpdate = true;
    }

    if (typeof data.c === 'number') {
      const color = '#' + (data.c & 0x00ffffff).toString(16).padStart(6, '0');
      if (next.member.color !== color) {
        next.member.color = color;
        hasMeaningfulUpdate = true;
      }
    } else if (data.c) {
      if (next.member.color !== data.c) {
        next.member.color = data.c;
        hasMeaningfulUpdate = true;
      }
    }

    if (typeof data.currentHealth === 'number' || typeof data.maxHealth === 'number') {
      const currentHealth =
        typeof data.currentHealth === 'number'
          ? data.currentHealth
          : (stats.hitpoints?.current ?? 0);
      const maxHealth =
        typeof data.maxHealth === 'number'
          ? data.maxHealth
          : (stats.hitpoints?.base ?? currentHealth);
      const nextHp = {
        base: Math.min(maxHealth, 99),
        current: currentHealth,
      };
      if (JSON.stringify(stats.hitpoints) !== JSON.stringify(nextHp)) {
        stats.hitpoints = nextHp;
        hasMeaningfulUpdate = true;
      }
    }

    const runEnergyValue =
      extractNumberFromPayload(data.r, 'r') ?? extractNumberFromPayload(data.e, 'e');
    if (runEnergyValue !== undefined) {
      if (stats.runEnergy !== runEnergyValue) {
        stats.runEnergy = runEnergyValue;
        hasMeaningfulUpdate = true;
      }
    } else if (stats.runEnergy === undefined) {
      stats.runEnergy = 100;
      hasMeaningfulUpdate = true;
    }

    const specialValue =
      extractNumberFromPayload(data.q, 'q') ?? extractNumberFromPayload(data.sp, 'sp');
    if (specialValue !== undefined) {
      if (stats.spec !== specialValue) {
        stats.spec = specialValue;
        hasMeaningfulUpdate = true;
      }
    } else if (stats.spec === undefined) {
      stats.spec = 100;
      hasMeaningfulUpdate = true;
    }

    if (data.p !== undefined && data.p !== null) {
      if (next.prayerMask !== data.p) {
        next.prayerMask = data.p;
        hasMeaningfulUpdate = true;
      }
    }

    if (Array.isArray(data.i)) {
      const nextInventory = parseItems(data.i);
      if (JSON.stringify(next.inventory ?? []) !== JSON.stringify(nextInventory)) {
        next.inventory = nextInventory;
        hasMeaningfulUpdate = true;
      }
    }
    if (Array.isArray(data.w)) {
      const nextEquipment = parseItems(data.w);
      if (JSON.stringify(next.equipment ?? []) !== JSON.stringify(nextEquipment)) {
        next.equipment = nextEquipment;
        hasMeaningfulUpdate = true;
      }
    }

    if (Array.isArray(data.b) || Array.isArray(data.s)) {
      const baseValues = Array.isArray(data.b)
        ? data.b
        : Array.from({ length: data.s.length }, (_, index) => {
            const existingSkill = stats[SKILL_NAMES[index]];
            return typeof existingSkill === 'object' && existingSkill && 'base' in existingSkill
              ? existingSkill.base
              : 0;
          });
      const currentValues = Array.isArray(data.s) ? data.s : baseValues;

      let anySkillChanged = false;
      currentValues.forEach((currentLevel: number, idx: number) => {
        const skillName = SKILL_NAMES[idx];
        if (!skillName || currentLevel === undefined) return;

        const baseFromPacket = Array.isArray(data.b) ? data.b[idx] : undefined;
        const baseLevel =
          baseFromPacket !== undefined
            ? baseFromPacket
            : typeof stats[skillName] === 'object' &&
                stats[skillName] &&
                'base' in (stats[skillName] as object)
              ? (stats[skillName] as any).base
              : currentLevel;

        const nextSkill = {
          base: Math.min(baseLevel ?? currentLevel, 99),
          current: currentLevel,
        };

        if (JSON.stringify((stats as any)[skillName]) !== JSON.stringify(nextSkill)) {
          applySkillData(stats, idx, nextSkill.base, nextSkill.current);
          anySkillChanged = true;
        }
      });

      if (anySkillChanged) {
        hasMeaningfulUpdate = true;
      }

      if (Array.isArray(data.b)) {
        const clampedBaseSkills = data.b.map((lvl: number) => Math.min(lvl, 99));
        next.combatLevel = calculateCombatLevel(clampedBaseSkills);
        hasMeaningfulUpdate = true;
      }
    }
  }

  if (type === 'PartyHealthStatusUpdate') {
    if (typeof data.currentHealth === 'number' || typeof data.maxHealth === 'number') {
      const currentHealth =
        typeof data.currentHealth === 'number'
          ? data.currentHealth
          : (stats.hitpoints?.current ?? 0);
      const maxHealth =
        typeof data.maxHealth === 'number'
          ? data.maxHealth
          : (stats.hitpoints?.base ?? currentHealth);
      const nextHp = {
        base: Math.min(maxHealth, 99),
        current: currentHealth,
      };
      if (JSON.stringify(stats.hitpoints) !== JSON.stringify(nextHp)) {
        stats.hitpoints = nextHp;
        hasMeaningfulUpdate = true;
      }
    }
  }

  if (type === 'PartyRaidsPotsUpdate') {
    if (data.pot === 'OVL') {
      if (data.ticks === 500) {
        stats.overloadSippedAt = Date.now();
        hasMeaningfulUpdate = true;
      }
    } else if (data.pot === 'DEAD') {
      if (stats.overloadSippedAt !== undefined) {
        stats.overloadSippedAt = undefined;
        hasMeaningfulUpdate = true;
      }
    }
  }

  if (type === 'PredictedHitPartyMessage') {
    const hit = data.predictedHit;
    if (hit) {
      const isPlayer: boolean = hit.opponentIsPlayer === true;
      const lastAttackedTarget: LastAttackedTarget = {
        npcId: isPlayer ? -1 : (hit.npcId ?? -1),
        isPlayer,
      };
      if (JSON.stringify(next.lastAttackedTarget ?? null) !== JSON.stringify(lastAttackedTarget)) {
        next.lastAttackedTarget = lastAttackedTarget;
        hasMeaningfulUpdate = true;
      }
    }
  }

  if (hasMeaningfulUpdate) {
    next.lastUpdated = Date.now();
  }

  return { ...next, stats };
}
