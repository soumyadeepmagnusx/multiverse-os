# Contributing to MultiverseOS

Thank you for your interest in contributing to **MultiverseOS** — the Next-Gen Multiverse Narrative Studio & Lore Integrity Engine!

## 🚀 Development Setup

### Prerequisites
- Node.js (v18.0.0 or higher, v24 recommended)
- npm or pnpm
- Git

### 1. Clone & Install
```bash
git clone https://github.com/soumyadeepmagnusx/multiverse-os.git
cd multiverse-os
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🏗️ Codebase Structure

```
multiverse-os/
├── src/
│   ├── components/
│   │   ├── dashboard/       # Command Center & Telemetry widgets
│   │   ├── spatial/         # 70/30 Obsidian Neon spatial lattice & canvas
│   │   ├── CanonMergeResolver.jsx  # Git for Storytellers
│   │   ├── PlayableNovelMode.jsx   # Choose-Your-Own-Adventure reader engine
│   │   ├── ContinuityAuditor.jsx   # Zero-Shot JSON Schema auditor
│   │   └── ExportModal.jsx         # Screenplay, Kindle & Twine exporter
│   ├── data/                # Canonical showcase universe datasets
│   └── services/
│       ├── aiService.js     # Prompt chaining & Gemini 1.5 Flash endpoint
│       ├── exportService.js # Fountain, Markdown, and JSON exporters
│       └── voiceService.js  # Web Speech API multi-voice synthesis
```

---

## 📋 Pull Request Process

1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
2. Commit your changes with meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat(lattice): add zoom and pan controls to spatial canvas"
   ```
3. Ensure the project builds cleanly without errors:
   ```bash
   npm run build
   ```
4. Push to your branch and open a Pull Request.

---

## 📜 Code of Conduct
We are committed to providing a welcoming, inclusive, and harassment-free environment for all contributors.
