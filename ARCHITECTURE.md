# MultiverseOS Architecture Specification

This document provides a technical overview of the **MultiverseOS** software architecture.

## 1. System Layers

```
+-------------------------------------------------------------+
|                     Presentation Layer                      |
|  - Obsidian Neon Spatial Lattice (React 19, HTML5 Canvas)   |
|  - Command Center Dashboard & Audio Waveform Spectrogram    |
|  - Interactive CYOA Playable Novel Engine                   |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
|                     State & Graph Layer                     |
|  - Multiverse Timeline Branching Graph                      |
|  - Character Psychological Invariance Matrix (Pentagon SVG) |
|  - Immutable Physical Constants Store                       |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
|                   AI & Continuity Engine                    |
|  - Dynamic Context Injection Pipeline                       |
|  - Strict Zero-Shot JSON Schema Auditor (draft-07)          |
|  - Dual-Mode LLM Dispatcher (Gemini 1.5 + Fallback Core)    |
+-------------------------------------------------------------+
```

## 2. Dynamic Context Injection
Instead of static prompt concatenation, MultiverseOS filters the active universe state down to:
- Specific characters present in the target beat.
- Active domain rules (Physics, Society, Biology).
- Author steerability parameters (Conflict Level 1-5, Pacing, POV).

## 3. Strict Schema Guardrails
Continuity audits return strongly-typed JSON payloads containing:
- `passed`: Boolean status
- `score`: Quantitative health metric (0-100)
- `violations`: Typed severity array with auto-fix suggestions
- `characterCheck`: Entity behavioral fidelity review

## 4. Multi-Voice Audio Synthesis
Uses the Web Speech API with tailored character voice profiles specifying pitch, speech rate, and gender to bring narrative dialogue to life.
