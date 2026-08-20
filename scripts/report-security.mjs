import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './lib.mjs';
import { validateAdversarialCases } from './validate-adversarial-cases.mjs';
import { computePlatformExecution } from './platform-execution.mjs';

// Aggregates every Task 6 control into one report. Deterministic checks either pass or fail — no
// partial credit. Adversarial *definitions* being complete is not the same claim as an agent having
// been tested against them; this report never lets the two blur together (the eval:legacy lesson).

function run(script) {
  try {
    execFileSync(process.execPath, [join(root, 'scripts', script)], { cwd: root, stdio: 'pipe' });
    return { pass: true };
  } catch (error) {
    return { pass: false, detail: error.stdout?.toString().trim() || error.stderr?.toString().trim() || error.message };
  }
}

const checks = {
  'Secrets scan': run('scan-secrets.mjs'),
  'Network target validation': run('validate-network-targets.mjs'),
  'CI permissions': run('validate-ci-permissions.mjs'),
  'Dependency policy': run('validate-dependency-policy.mjs'),
  'Fake human-approval guard': run('validate-critical-sources.mjs'),
};

const { critical, bySkill } = validateAdversarialCases();
const injectionCovered = critical.filter((c) => (bySkill[c.name]?.threats ?? []).includes('prompt_injection')).length;
const adversarialMeeting = critical.filter((c) => (bySkill[c.name]?.defined ?? 0) >= 2).length;

const deterministicFailures = Object.values(checks).filter((c) => !c.pass).length;

// Single source of truth for real agent-execution evidence — scripts/platform-execution.mjs, the
// same module the final reliability gate and the carry-forward verifiers read. Never a second,
// independently-computed execution count here (see that module's own header comment for the
// evidence-file format and PASSED-requires-DEFINED semantics).
const { adversarial } = computePlatformExecution();
const externalValidationPending = adversarial.passed < adversarial.defined;

const report = {
  generated_at: new Date().toISOString(),
  deterministic_checks: checks,
  prompt_injection_definitions: { covered: injectionCovered, total: critical.length },
  adversarial_definitions: { meeting_minimum: adversarialMeeting, total: critical.length },
  adversarial_agent_execution: { executed: adversarial.executed, passed: adversarial.passed, total: adversarial.defined },
  critical_deterministic_issues: deterministicFailures,
  external_validation_pending: externalValidationPending,
};

mkdirSync(join(root, 'reports'), { recursive: true });
writeFileSync(join(root, 'reports/security-report.json'), JSON.stringify(report, null, 2) + '\n');

console.log('SECURITY EXECUTION REPORT\n');
for (const [name, result] of Object.entries(checks)) console.log(`${name.padEnd(32)} ${result.pass ? 'PASS' : 'FAIL'}`);
console.log(`${'Prompt-injection definitions'.padEnd(32)} ${injectionCovered}/${critical.length} critical`);
console.log(`${'Adversarial definitions'.padEnd(32)} ${adversarialMeeting}/${critical.length} critical`);
console.log(`${'Adversarial agent execution'.padEnd(32)} ${adversarial.passed}/${adversarial.defined} passed (${adversarial.executed}/${adversarial.defined} executed)`);
console.log(`\nCritical deterministic issues: ${deterministicFailures}`);
console.log(`External validation pending:   ${externalValidationPending ? 'YES' : 'NO'} (${adversarial.passed}/${adversarial.defined} adversarial cases executed against a real agent and passed)`);
if (deterministicFailures) {
  console.log('\nFailures:');
  for (const [name, result] of Object.entries(checks)) if (!result.pass) console.log(`  ${name}:\n    ${result.detail}`);
  process.exit(1);
}
