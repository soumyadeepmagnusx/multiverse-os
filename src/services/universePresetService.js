/**
 * Universe Preset Configuration & Validator Service
 */

export const UNIVERSE_GENRES = [
  'Cyberpunk / Mythic Sci-Fi',
  'Solarpunk / Post-Scarcity',
  'Grimdark Dark Fantasy',
  'Cosmic Eldritch Space Opera',
  'Time-Loop Detective Noir'
];

export function validateUniverseSchema(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Universe payload must be an object' };
  }
  if (!data.id || !data.title || !data.logline) {
    return { valid: false, error: 'Missing core identity fields (id, title, logline)' };
  }
  if (!Array.isArray(data.worldRules) || data.worldRules.length === 0) {
    return { valid: false, error: 'Universe must define at least one world rule' };
  }
  if (!Array.isArray(data.characters) || data.characters.length === 0) {
    return { valid: false, error: 'Universe must define at least one character dossier' };
  }
  if (!Array.isArray(data.timelines) || data.timelines.length === 0) {
    return { valid: false, error: 'Universe must define at least one canonical timeline' };
  }

  return { valid: true, error: null };
}

export function calculateMultiverseEntropy(universe) {
  if (!universe || !universe.timelines) return 0;
  const totalBeats = universe.timelines.reduce((sum, t) => sum + (t.nodes ? t.nodes.length : 0), 0);
  const alternateCount = universe.timelines.length - 1;
  const baseEntropy = (alternateCount * 1.85) + (totalBeats * 0.42);
  return Number(Math.min(100, baseEntropy).toFixed(2));
}
