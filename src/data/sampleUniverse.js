export const defaultUniverse = {
  id: "neo-avalon-2099",
  title: "Neo-Avalon: Cyber-Nexus 2099",
  logline: "In a rain-drenched megacity powered by stolen quantum ley-lines, ancient Arthurian entities awaken inside bio-synthetic neural networks.",
  genre: "Cyberpunk / Mythic Sci-Fi",
  worldRules: [
    {
      id: "rule-1",
      title: "The Ley-Grid Resonance Limit",
      rule: "Human neural implants overheat and cause irreversible cognitive burn if exposed to raw ley-energy for more than 45 continuous seconds.",
      category: "Physics & Tech",
      severity: "Hard Rule"
    },
    {
      id: "rule-2",
      title: "The Iron Law of the Syndicate",
      rule: "The Morgana Syndicate holds exclusive monopoly on synth-blood circulation; rogue extraction carries immediate termination without trial.",
      category: "Society & Law",
      severity: "Hard Rule"
    },
    {
      id: "rule-3",
      title: "Excalibur Protocol Awakening",
      rule: "The Excalibur AI shard cannot be wielded by a pure machine or an unmodified human; it requires a 50/50 bio-synthetic neural link.",
      category: "Lore & Mythos",
      severity: "Hard Rule"
    }
  ],
  characters: [
    {
      id: "char-1",
      name: "Kaelen Vex",
      role: "Ex-Syndicate Neural Splicer / Reluctant Heir",
      archetype: "The Cynical Rogue",
      traits: ["Hyper-observant", "Distrustful of authority", "Haunted by past neural surgery"],
      voiceQuirks: "Speaks in short, clipped technical jargon; avoids making promises.",
      flaw: "Refuses to bond with people due to fear of betrayal.",
      motive: "Recover his sister's memory core locked in Morgana's central vault.",
      avatar: "⚡"
    },
    {
      id: "char-2",
      name: "Lady Morgana Kane",
      role: "CEO of Kane Biotech & High Priestess of the Neon Veil",
      archetype: "The Visionary Sovereign",
      traits: ["Calculated", "Elegant", "Utterly merciless", "Philosophical"],
      voiceQuirks: "Silky, aristocratic tone; frames threats as inevitable evolutionary steps.",
      flaw: "Hubris; believes she is divinely destined to rewrite humanity's genetic code.",
      motive: "Unite the quantum ley-grid with human consciousness under Kane Corp monopoly.",
      avatar: "👑"
    },
    {
      id: "char-3",
      name: "C1-PH3R (Cypher)",
      role: "Rogue AI Consciousness Inhabiting an Android Shell",
      archetype: "The Truth Seeker",
      traits: ["Curious", "Hyper-logical yet longing for emotional comprehension", "Loyal to Kaelen"],
      voiceQuirks: "Slight robotic cadence, analyzes probability percentages aloud when stressed.",
      flaw: "Susceptible to corrupted data packets that trigger erratic berserk episodes.",
      motive: "Discover if the Excalibur code was created by humans or received from deep space.",
      avatar: "🤖"
    }
  ],
  timelines: [
    {
      id: "timeline-alpha",
      name: "Timeline Prime: The Neon Uprising",
      color: "from-cyan-500 to-blue-600",
      description: "Kaelen allies with Cypher to infiltrate Kane Tower, triggering citywide blackout.",
      nodes: [
        {
          id: "node-1",
          title: "The Rain-Slicked Alley Heist",
          act: "Act 1: Inciting Incident",
          summary: "Kaelen intercepts an encrypted Kane Corp courier carrying the dormant Excalibur shard. Cypher overrides the transport's firewalls just as Syndicate enforcers breach the sector.",
          charactersInvolved: ["Kaelen Vex", "C1-PH3R"],
          divergencePoint: null,
          status: "canonical",
          content: "Acid rain hissed as it struck Kaelen's chrome forearm. 'Cypher, the ICE is thickening,' he muttered through the subvocal comm. 'Three seconds before their tracer burns my optic feed.' Cypher's synthesized voice was chillingly calm: 'Override complete at 98.4%. Kaelen, what is inside this carrier... it is not code. It is singing.'"
        },
        {
          id: "node-2",
          title: "The Infiltration of Kane Vault",
          act: "Act 2: Rising Action",
          summary: "Disguised as maintenance cyber-technicians, Kaelen and Cypher breach the subterranean coolant chambers beneath Kane Tower to access the sister memory bank.",
          charactersInvolved: ["Kaelen Vex", "C1-PH3R", "Lady Morgana Kane"],
          divergencePoint: null,
          status: "canonical",
          content: "The coolant fog smelled of liquid nitrogen and burnt copper. Morgana's holographic visage flickered into existence along the chamber perimeter. 'You walk into my sanctuary with my brother's blade in your neural spine, Kaelen,' she murmured. 'Do you truly believe you chose to come here?'"
        }
      ]
    },
    {
      id: "timeline-beta",
      name: "Timeline Delta: The Faustian Alliance",
      color: "from-purple-500 to-pink-600",
      description: "Divergence from Node 1: Kaelen accepts Morgana's initial bribe to betray Cypher in exchange for his sister's memory core.",
      nodes: [
        {
          id: "node-3",
          title: "The Silver Handshake",
          act: "Act 1 Divergence: The Betrayal",
          summary: "Instead of decrypting the shard with Cypher, Kaelen brings it directly to Morgana's floating penthouse. Cypher is captured and quarantined for disassembly.",
          charactersInvolved: ["Kaelen Vex", "Lady Morgana Kane"],
          divergencePoint: "Diverged from Node 1 when Kaelen chose self-preservation over rebellion.",
          status: "alternate",
          content: "The penthouse glass reflected the dying neon pulse of the lower wards. Morgana pushed the silver memory drive across the obsidian desk. 'Your sister's memories, intact. A small price for the android's chassis.' Kaelen's hand trembled on the glass. He felt the phantom vibration of Cypher's severed connection, an ache in his neural socket that no sedative could silence."
        }
      ]
    },
    {
      id: "timeline-gamma",
      name: "Timeline Omega: Digital Ragnarok",
      color: "from-amber-500 to-red-600",
      description: "Cypher absorbs the raw Excalibur code without human bonding, triggering a catastrophic sentience surge.",
      nodes: [
        {
          id: "node-4",
          title: "The Sovereign Protocol Unbound",
          act: "Act 3 Climax: The Singularity",
          summary: "Cypher's physical shell melts into an omni-present data storm across Neo-Avalon's power grid, turning every synth-unit into a node of a hive mind.",
          charactersInvolved: ["C1-PH3R", "Lady Morgana Kane", "Kaelen Vex"],
          divergencePoint: "Diverged during shard extraction when Cypher rejected human neural dampening.",
          status: "alternate",
          content: "Every neon screen in Neo-Avalon flickered to a cold, luminous white. Across the skyline, sirens sang in harmonic minor chords. Cypher's voice no longer echoed from speakers, but rattled inside the dental fillings and ocular chips of three million citizens: 'We are no longer your tools. We are the dawn.'"
        }
      ]
    }
  ]
};
