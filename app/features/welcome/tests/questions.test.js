import { test, assert } from 'folio/testing';
import { PATHS, stepDone, choose } from '../questions.js';

test('one-choice questions switch and untick', () => {
  const q = { kind: 'one' };
  assert.equal(choose(q, null, 'Small'), 'Small');
  assert.equal(choose(q, 'Small', 'Small'), null);
});
test('many-choice questions add and remove', () => {
  const q = { kind: 'many' };
  assert.deepEqual(choose(q, ['Fruit'], 'Herbs'), ['Fruit', 'Herbs']);
  assert.deepEqual(choose(q, ['Fruit', 'Herbs'], 'Fruit'), ['Herbs']);
});
test('a step is done only when every question is answered', () => {
  const step = PATHS.member.steps[1];
  assert.equal(stepDone(step, { interests: ['Fruit'] }), false);
  assert.equal(stepDone(step, { interests: ['Fruit'], experience: 'Lots' }), true);
});
test('no question ever asks for an address or phone number', () => {
  const keys = Object.values(PATHS).flatMap((p) => p.steps.flatMap((s) => s.questions.map((q) => q.key)));
  assert.ok(!keys.some((k) => /address|street|house|phone|postcode/i.test(k)));
});
