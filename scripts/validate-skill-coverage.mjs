import { fail } from './lib.mjs';
import { buildReport } from './report-skill-coverage.mjs';

// Task 1d gate: deliberately thin. It checks the *report itself* is complete and well-formed —
// it does not yet enforce any coverage threshold. That belongs to Task 1e, once the requirements
// per exposure/criticality tier have been chosen deliberately from what this report shows, not guessed.

const report = buildReport();
const errors = [];
if (report.skills.length !== report.totals.skills) errors.push('SKILL_COVERAGE: totals.skills does not match the number of reported skills');
for (const row of report.skills) {
  for (const field of ['skill', 'domain', 'status', 'exposure', 'risk_ceiling', 'coverage_pct', 'dimensions']) {
    if (!(field in row)) errors.push(`SKILL_COVERAGE: ${row.skill ?? '(unknown)'} missing reported field ${field}`);
  }
}
const names = new Set(report.skills.map((r) => r.skill));
if (names.size !== report.skills.length) errors.push('SKILL_COVERAGE: duplicate skill entries in report');

fail(errors);
console.log(`SKILL_COVERAGE_REPORT_VALID: ${report.skills.length} skills reported`);
