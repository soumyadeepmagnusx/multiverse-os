/**
 * MultiverseOS Industry Export Engine
 * Generates production-ready exports for screenwriters, authors, and game developers.
 */

// 1. Export as Fountain Screenplay Format
export function generateFountainScreenplay(universe) {
  let output = `Title: ${universe.title.toUpperCase()}\n`;
  output += `Credit: Created with MultiverseOS\n`;
  output += `Author: Multiverse Architects\n`;
  output += `Draft date: ${new Date().toLocaleDateString()}\n\n`;
  output += `=== LOGLINE ===\n${universe.logline}\n\n`;

  universe.timelines.forEach((timeline, tIdx) => {
    output += `\n/* ======================================================== */\n`;
    output += `/* TIMELINE: ${timeline.name.toUpperCase()} */\n`;
    output += `/* ======================================================== */\n\n`;

    timeline.nodes.forEach((node, nIdx) => {
      output += `EXT. NEO-AVALON SUB-SECTOR - NIGHT\n\n`;
      output += `/* Story Beat: ${node.title} (${node.act}) */\n`;
      if (node.divergencePoint) {
        output += `/* DIVERGENCE: ${node.divergencePoint} */\n\n`;
      }

      output += `${node.summary}\n\n`;

      if (node.content) {
        // Format content as screenplay dialogue if quotes exist
        const dialogueMatch = node.content.match(/'([^']+)'|"([^"]+)"/g);
        if (dialogueMatch) {
          dialogueMatch.forEach((quote, qIdx) => {
            const speaker = node.charactersInvolved[qIdx % node.charactersInvolved.length] || "KAELEN";
            output += `${speaker.toUpperCase()}\n`;
            output += `(guarded)\n`;
            output += `${quote.replace(/['"]/g, '')}\n\n`;
          });
        } else {
          output += `${node.content}\n\n`;
        }
      }
    });
  });

  return output;
}

// 2. Export as Markdown Novel Manuscript (Kindle / E-Reader ready)
export function generateNovelManuscript(universe) {
  let md = `# ${universe.title}\n\n`;
  md += `**Genre:** ${universe.genre}\n\n`;
  md += `> *${universe.logline}*\n\n`;
  md += `----\n\n`;
  md += `## Table of Contents\n`;
  universe.timelines.forEach(t => {
    md += `- **${t.name}**\n`;
    t.nodes.forEach(n => {
      md += `  - [${n.title}](#${n.id})\n`;
    });
  });
  md += `\n----\n\n`;

  md += `## Prologue: Governing Canon & Universal Laws\n\n`;
  universe.worldRules.forEach(r => {
    md += `### ${r.title} [${r.severity}]\n`;
    md += `*Category: ${r.category}*\n\n`;
    md += `${r.rule}\n\n`;
  });
  md += `----\n\n`;

  universe.timelines.forEach(timeline => {
    md += `## ${timeline.name}\n\n`;
    md += `*${timeline.description}*\n\n`;

    timeline.nodes.forEach(node => {
      md += `### <a id="${node.id}"></a>${node.title}\n`;
      md += `*${node.act}* | *Cast: ${node.charactersInvolved.join(", ")}*\n\n`;
      if (node.divergencePoint) {
        md += `> **Fracture Point:** ${node.divergencePoint}\n\n`;
      }
      md += `${node.content || node.summary}\n\n`;
      md += `***\n\n`;
    });
  });

  return md;
}

// 3. Export as Twine / Ink Interactive Fiction JSON
export function generateTwineInteractiveMap(universe) {
  const passages = [];
  let passageId = 1;

  universe.timelines.forEach(timeline => {
    timeline.nodes.forEach((node, idx) => {
      const nextNode = timeline.nodes[idx + 1];
      const links = [];

      if (nextNode) {
        links.push({
          name: `Continue: ${nextNode.title}`,
          link: nextNode.id
        });
      }

      // Add multiverse branching choices if divergence exists
      const alternateTimelines = universe.timelines.filter(t => t.id !== timeline.id);
      alternateTimelines.forEach(alt => {
        if (alt.nodes[0]) {
          links.push({
            name: `Splinter Reality: Jump to ${alt.name}`,
            link: alt.nodes[0].id
          });
        }
      });

      passages.push({
        id: node.id,
        pid: passageId++,
        name: node.title,
        tags: [timeline.id, node.act],
        text: `${node.content || node.summary}\n\nCast: ${node.charactersInvolved.join(", ")}`,
        links: links
      });
    });
  });

  return JSON.stringify({
    creator: "MultiverseOS",
    creatorVersion: "3.0.0",
    format: "Twine Sugarcube / Ink Compatible",
    storyName: universe.title,
    startnode: universe.timelines[0]?.nodes[0]?.id || "node-1",
    passages: passages
  }, null, 2);
}

// Helper to trigger direct browser file download
export function downloadFile(content, fileName, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
