import { fail, json } from './lib.mjs';

// Keeps "zero external dependencies" a verified property, not an assumption that quietly stops being
// true. Any package.json dependency/devDependency must be explicitly allowlisted in
// security/dependency-policy.json with a reason — this script never auto-approves one.

const pkg = json('package.json');
const policy = json('security/dependency-policy.json');
const allowed = new Map((policy.allowed ?? []).map((entry) => [entry.name, entry]));

const errors = [];
for (const field of ['dependencies', 'devDependencies']) {
  for (const name of Object.keys(pkg[field] ?? {})) {
    const entry = allowed.get(name);
    if (!entry) { errors.push(`DEPENDENCY_POLICY: ${field}.${name} is not in security/dependency-policy.json's allowlist`); continue; }
    if (!entry.reason) errors.push(`DEPENDENCY_POLICY: ${name} is allowlisted without a reason`);
  }
}

fail(errors);
console.log(`DEPENDENCY_POLICY_VALID: ${Object.keys(pkg.dependencies ?? {}).length + Object.keys(pkg.devDependencies ?? {}).length} dependencies declared`);
