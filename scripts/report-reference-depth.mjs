import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { files, json, root } from './lib.mjs';

// Measures REFERENCE_DEPTH (knowledge/registry/carry-forward.yaml) for real, per required topic —
// not per file. scripts/validate-critical-sources.mjs only checks that a critical-topics.yaml entry
// exists (a declared scope), never whether any reference file actually covers each named topic; this
// was the gap the reliability-hardening handoff flagged ("build the verifier before closing the
// carry-forward item"). A topic counts as covered only when a references/*.md file declares it
// verbatim under a "## Topics Covered" heading — never by filename guess, never by fuzzy text search,
// both of which could over-credit a file that merely mentions a word in passing.
//
// "Partial" coverage is deliberately never reported: there is no reliable signal in this repository
// for "half covered" short of a human judgment call, and inventing one risks crediting incomplete
// work. A topic is either declared covered by its own reference file, or it is uncovered.

export const reportPath = join(root, 'reports/reference-depth.json');

function skillDir(name) {
  const path = files('skills', (n) => n === 'skill.yaml').find((candidate) => JSON.parse(readFileSync(candidate, 'utf8')).name === name);
  return path ? dirname(path) : undefined;
}

function declaredTopics(referencesDir) {
  if (!existsSync(referencesDir)) return new Set();
  const relDir = referencesDir.slice(root.length).replace(/^[\\/]/, '');
  const covered = new Set();
  for (const file of files(relDir, (n) => n.endsWith('.md'))) {
    const lines = readFileSync(file, 'utf8').split('\n');
    const start = lines.findIndex((l) => /^##\s*Topics Covered\s*$/.test(l.trim()));
    if (start === -1) continue;
    for (let i = start + 1; i < lines.length; i++) {
      if (/^##\s/.test(lines[i])) break; // next section — end of file also ends the loop naturally
      const bullet = lines[i].match(/^\s*-\s*(.+?)\s*$/);
      if (bullet) covered.add(bullet[1].trim());
    }
  }
  return covered;
}

export function computeReferenceDepth() {
  const topicsBySkill = json('knowledge/registry/critical-topics.yaml').skills;
  const rows = Object.entries(topicsBySkill).map(([skill, required]) => {
    const dir = skillDir(skill);
    const covered = dir ? declaredTopics(join(dir, 'references')) : new Set();
    const covered_topics = required.filter((t) => covered.has(t));
    const uncovered_topics = required.filter((t) => !covered.has(t));
    return {
      skill,
      required_topics: required,
      covered_topics,
      partial_topics: [], // see module note: no reliable partial signal exists; never fabricated
      uncovered_topics,
      coverage_pct: required.length ? +((covered_topics.length / required.length) * 100).toFixed(1) : 0,
    };
  }).sort((a, b) => a.skill.localeCompare(b.skill));

  const totalRequired = rows.reduce((n, r) => n + r.required_topics.length, 0);
  const totalCovered = rows.reduce((n, r) => n + r.covered_topics.length, 0);
  const skillsFullyCovered = rows.filter((r) => r.uncovered_topics.length === 0).length;

  return {
    generated_at: new Date().toISOString(),
    totals: {
      skills: rows.length,
      skills_fully_covered: skillsFullyCovered,
      topics_total: totalRequired,
      topics_covered: totalCovered,
      pct: totalRequired ? +((totalCovered / totalRequired) * 100).toFixed(1) : 0,
    },
    skills: rows,
  };
}

function printReport(report) {
  console.log('REFERENCE DEPTH — PER-TOPIC COVERAGE (critical skills)\n');
  for (const row of report.skills) {
    console.log(`${row.skill.padEnd(24)} ${String(row.covered_topics.length).padStart(2)}/${row.required_topics.length} ${String(row.coverage_pct).padStart(5)}%`);
    if (row.uncovered_topics.length) console.log(`  uncovered: ${row.uncovered_topics.join(', ')}`);
  }
  console.log(`\n${report.totals.topics_covered}/${report.totals.topics_total} required topics covered (${report.totals.pct}%); ${report.totals.skills_fully_covered}/${report.totals.skills} critical skills fully covered`);
  console.log(`\nFull report written to ${reportPath}`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const report = computeReferenceDepth();
  mkdirSync(join(root, 'reports'), { recursive: true });
  writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
  printReport(report);
}
