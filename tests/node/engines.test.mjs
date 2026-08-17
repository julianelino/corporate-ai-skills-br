import test from 'node:test';
import assert from 'node:assert/strict';
import { allocation, decimalToHhmm, hhmmToDecimal, irr, npv, turnoverRate } from '../../engines/calculations/index.mjs';
import { intakeStrategy } from '../../engines/data-intake/index.mjs';
import { classifyMatch } from '../../engines/matching/index.mjs';
import { route } from '../../engines/reference-routing/index.mjs';

test('calculates deterministic corporate values', () => {
  assert.equal(hhmmToDecimal('08:30'), 8.5);
  assert.equal(decimalToHhmm(7.75), '07:45');
  assert.equal(turnoverRate(2, 100), 2);
  assert.deepEqual(allocation(100, { A: 1, B: 3 }), { A: 25, B: 75 });
  assert.equal(npv(0.1, [-100, 110]), 0);
  assert.ok(Math.abs(irr([-100, 110]) - 0.1) < 0.001);
});

test('uses conservative intake, matching, and routing', () => {
  assert.equal(intakeStrategy('invoice.csv'), 'STRUCTURED_PARSE');
  assert.equal(intakeStrategy('invoice.pdf'), 'NATIVE_EXTRACTION_REQUIRED');
  assert.equal(classifyMatch({ amount: 100 }, { amount: 90 }), 'EXCEPTION');
  assert.equal(route('Review payroll INSS').primary, 'payroll-br');
});
