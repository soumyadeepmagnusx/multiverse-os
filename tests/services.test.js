/**
 * Unit Test Suite for MultiverseOS Core Services
 * Run via: node tests/services.test.js
 */

import { validateUniverseSchema, calculateMultiverseEntropy } from '../src/services/universePresetService.js';
import { generateFountainScreenplay, generateNovelManuscript } from '../src/services/exportService.js';
import { defaultUniverse } from '../src/data/sampleUniverse.js';

function runTestSuite() {
  console.log("=== RUNNING MULTIVERSE//OS SERVICE UNIT TESTS ===");

  // Test 1: Schema Validation
  const schemaResult = validateUniverseSchema(defaultUniverse);
  if (!schemaResult.valid) {
    throw new Error(`Schema validation failed: ${schemaResult.error}`);
  }
  console.log("✓ Test 1: Canonical Universe Schema Validation PASSED");

  // Test 2: Multiverse Entropy Calculation
  const entropy = calculateMultiverseEntropy(defaultUniverse);
  if (entropy <= 0 || entropy > 100) {
    throw new Error(`Entropy value out of expected bounds: ${entropy}`);
  }
  console.log(`✓ Test 2: Multiverse Entropy Calculation PASSED (Score: ${entropy}%)`);

  // Test 3: Fountain Screenplay Generation
  const screenplay = generateFountainScreenplay(defaultUniverse);
  if (!screenplay.includes("NEO-AVALON") || !screenplay.includes("EXT.")) {
    throw new Error("Fountain screenplay generation missing required cues");
  }
  console.log("✓ Test 3: Fountain Screenplay Generation PASSED");

  // Test 4: Novel Manuscript Generation
  const manuscript = generateNovelManuscript(defaultUniverse);
  if (!manuscript.includes("# Neo-Avalon") || !manuscript.includes("Table of Contents")) {
    throw new Error("Novel manuscript generation missing table of contents");
  }
  console.log("✓ Test 4: Markdown Novel Manuscript Generation PASSED");

  console.log("=== ALL UNIT TESTS PASSED (4/4) ===");
}

runTestSuite();
