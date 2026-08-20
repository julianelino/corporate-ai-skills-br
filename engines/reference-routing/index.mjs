import * as v1 from './v1.mjs';
import * as v2 from './v2.mjs';

// ROUTER_VERSION=v1 selects the frozen Task 1c baseline (see v1.mjs, v2.mjs, and
// scripts/router-compare.mjs). Default is v2 once its shadow comparison against all committed
// static evals showed zero unexplained regressions (Task 4) — see
// docs/superpowers/plans/2026-08-17-reliability-hardening.md.
export const route = process.env.ROUTER_VERSION === 'v1' ? v1.route : v2.route;
