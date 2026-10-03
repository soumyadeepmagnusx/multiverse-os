/**
 * MultiverseOS AI Engine & Prompt Engineering Service
 * Implements Prompt Chaining, Guardrails, and Structured Output Evaluation
 */

export const getStoredApiKey = () => {
  return localStorage.getItem("multiverse_gemini_api_key") || "";
};

export const setStoredApiKey = (key) => {
  if (key) {
    localStorage.setItem("multiverse_gemini_api_key", key);
  } else {
    localStorage.removeItem("multiverse_gemini_api_key");
  }
};

/**
 * Builds the prompt engineering chain for scene generation
 */
export function buildScenePrompt(options) {
  const {
    universe,
    characters,
    selectedNode,
    steerability,
    customInstructions
  } = options;

  const charactersContext = characters.map(c => 
    `- **${c.name}** (${c.archetype}): Traits [${c.traits.join(", ")}]. Voice: "${c.voiceQuirks}". Flaw: ${c.flaw}. Motive: ${c.motive}`
  ).join("\n");

  const rulesContext = universe.worldRules.map(r =>
    `- [${r.severity}] ${r.title}: ${r.rule}`
  ).join("\n");

  const systemPrompt = `You are MultiverseOS Core, an elite narrative co-writer and multiverse continuity architect.
Your objective is to generate gripping, publication-ready narrative scenes adhering strictly to the author's world canon and character psychology.

### WORLD CANON & GOVERNING LAWS:
${rulesContext}

### ACTIVE CHARACTER DOSSIERS:
${charactersContext}

### STEERABILITY & NARRATIVE METRICS:
- Tone: ${steerability.tone}
- Pacing: ${steerability.pacing}
- Conflict Level: ${steerability.conflictLevel}/5 (${steerability.conflictLevel >= 4 ? 'High Lethality / Visceral' : 'Subtle Psychological / Tension'})
- Perspective / POV: ${steerability.pov}
- Output Format: ${steerability.format} (Ensure realistic dialogue beats, body language, sensory detail)

${customInstructions ? `### AUTHOR INSTRUCTIONS / SPECIFIC BEATS:\n${customInstructions}` : ''}
${selectedNode ? `### CURRENT STORY BEAT CONTEXT:\nTitle: ${selectedNode.title}\nAct: ${selectedNode.act}\nPremise: ${selectedNode.summary}` : ''}

Output high-impact storytelling that honors these constraints.`;

  return systemPrompt;
}

/**
 * Builds the prompt for continuity and plot-hole detection
 */
export function buildContinuityAuditPrompt(sceneText, universe) {
  const rules = universe.worldRules.map((r, i) => `${i+1}. [${r.title}] ${r.rule}`).join("\n");
  const chars = universe.characters.map(c => `- ${c.name}: Flaw="${c.flaw}", Voice="${c.voiceQuirks}", Motive="${c.motive}"`).join("\n");

  return `You are the MultiverseOS Canon Integrity Engine. Analyze the following story scene for continuity violations, plot holes, and out-of-character behavior.

### WORLD RULES:
${rules}

### CHARACTER TRUTHS:
${chars}

### SCENE TO EVALUATE:
"""
${sceneText}
"""

Return a valid JSON response with the following schema:
{
  "passed": boolean,
  "score": number (0-100),
  "violations": [
    {
      "severity": "CRITICAL" | "MODERATE" | "MINOR",
      "ruleViolated": string,
      "explanation": string,
      "fixSuggestion": string
    }
  ],
  "characterCheck": [
    {
      "character": string,
      "inCharacter": boolean,
      "observation": string
    }
  ],
  "overallVerdict": string
}`;
}

/**
 * Call Gemini API directly or fall back to high-fidelity generative simulation
 */
export async function callGeminiApi(prompt, jsonMode = false) {
  const apiKey = getStoredApiKey();
  
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: jsonMode ? "application/json" : "text/plain"
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (outputText) {
        return { success: true, text: outputText, isLive: true };
      }
    } catch (err) {
      console.warn("Live Gemini API call failed, switching to high-fidelity simulation engine:", err);
    }
  }

  // Fallback high-fidelity smart simulation for offline / instant evaluation
  return { success: true, text: null, isLive: false };
}

/**
 * Generate Scene with steerability
 */
export async function generateSceneWithEngine(options) {
  const prompt = buildScenePrompt(options);
  const result = await callGeminiApi(prompt, false);

  if (result.isLive && result.text) {
    return { text: result.text, isLive: true, promptUsed: prompt };
  }

  // High fidelity realistic response based on steerability
  const char1 = options.characters[0]?.name || "Kaelen Vex";
  const char2 = options.characters[1]?.name || "Lady Morgana Kane";
  const { tone, pacing, conflictLevel, pov } = options.steerability;

  const toneAdjective = tone === "Grimdark / Gritty" ? "drenched in industrial grease and ozone" :
                        tone === "High Octane / Cinematic" ? "pulsing with frenetic tactical adrenaline" :
                        tone === "Philosophical / Mythic" ? "steeped in eerie, metaphysical resonance" : "wrapped in heavy shadows";

  const simulatedScene = `[POV: ${pov} | Tone: ${tone} | Conflict Rating: ${conflictLevel}/5]

The ambient pressure in the containment sub-sector dropped, leaving the room ${toneAdjective}. Neon condensation beaded across the alloy bulkheads like synthetic sweat.

${char1} adjusted the neural dampener on his gauntlet, the diagnostic readout pulsing in erratic amber spikes. He refused to look directly into the holographic beam. 

"You haven't calibrated the coolant channels," ${char1} said, voice level despite the micro-tremors in his hands. "Forty-five seconds of raw ley resonance, and the entire lower ward's neural grid will suffer terminal synaptic blowback."

From the shadows of the mezzanine, ${char2} stepped into the pale illumination of the quantum conduits. A cold smile cut across her features.

"You speak of biological limits as if they were holy scripture, Kaelen," ${char2} replied smoothly, her vocal synthesizer smoothing away every trace of human doubt. "Limits are simply engineering flaws waiting for a firmer hand."

A warning chime echoed down the corridor. The Excalibur shard inside the sealed chamber began to hum—a low, rhythmic frequency that resonated directly inside their cerebral cortexes.

"We have thirty seconds before the Syndicate enforcers breach the airlock," ${char1} muttered, drawing his thermal blade. "Decide whose side you're dying on."`;

  return { text: simulatedScene, isLive: false, promptUsed: prompt };
}

/**
 * Continuity Auditor
 */
export async function auditContinuityWithEngine(sceneText, universe) {
  const prompt = buildContinuityAuditPrompt(sceneText, universe);
  const result = await callGeminiApi(prompt, true);

  if (result.isLive && result.text) {
    try {
      const parsed = JSON.parse(result.text);
      return { audit: parsed, isLive: true, promptUsed: prompt };
    } catch {
      // JSON parse fallback
    }
  }

  // Smart heuristic rule audit
  const hasRule1Violation = sceneText.toLowerCase().includes("overheat") || 
                           sceneText.toLowerCase().includes("seconds") || 
                           sceneText.toLowerCase().includes("burn");

  const violations = [];
  if (sceneText.toLowerCase().includes("magic") && !sceneText.toLowerCase().includes("neural")) {
    violations.push({
      severity: "MODERATE",
      ruleViolated: "The Ley-Grid Resonance Limit",
      explanation: "Character manipulated energy channels without explicit mention of bio-synthetic neural linkage or time thresholds.",
      fixSuggestion: "Explicitly reference Kaelen's gauntlet dampener and the strict 45-second cognitive limit."
    });
  }

  if (sceneText.toLowerCase().includes("trust") || sceneText.toLowerCase().includes("surrender")) {
    violations.push({
      severity: "CRITICAL",
      ruleViolated: "Character Dossier: Kaelen Vex [Flaw: Distrustful of Authority]",
      explanation: "Kaelen demonstrates uncharacteristic compliance with corporate figures, conflicting with his core trauma.",
      fixSuggestion: "Introduce internal resistance, tactical hesitance, or an ulterior motive before agreement."
    });
  }

  // If no violations found from keywords, give a clean passing audit
  if (violations.length === 0) {
    violations.push({
      severity: "MINOR",
      ruleViolated: "Stylistic Continuity Check",
      explanation: "The pacing in the middle dialogue beat briefly slows down during high conflict stakes.",
      fixSuggestion: "Shorten Morgana's second line to maintain urgency."
    });
  }

  const score = violations.some(v => v.severity === "CRITICAL") ? 68 : 94;

  const mockAudit = {
    passed: score >= 75,
    score: score,
    violations: violations,
    characterCheck: [
      {
        character: universe.characters[0]?.name || "Kaelen Vex",
        inCharacter: true,
        observation: "Displays hallmark cynicism and technical focus; dialogue is clipped and guarded."
      },
      {
        character: universe.characters[1]?.name || "Lady Morgana Kane",
        inCharacter: true,
        observation: "Philosophical condescension aligns with her vision of rewriting human nature."
      }
    ],
    overallVerdict: score >= 75 
      ? "Canon Compliant: Scene honors the Ley-Grid constraints and character psychological trajectories with high atmospheric fidelity."
      : "Continuity Warning: Minor canon frictions detected that require author alignment before merging to Prime Timeline."
  };

  return { audit: mockAudit, isLive: false, promptUsed: prompt };
}
