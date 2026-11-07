import { test, assert } from 'folio/testing';
import { totals, problem } from '../log.js';

test('totals count jobs and add up kg', () => {
  assert.deepEqual(totals([{ type: 'job' }, { type: 'food', kg: 0.5 }, { type: 'food', kg: 1.25 }]), { jobs: 1, kg: 1.8 });
});
test('entries need words, and food needs a weight', () => {
  assert.ok(problem('job', '  ', null));
  assert.ok(problem('food', 'Kale', ''));
  assert.equal(problem('food', 'Kale', '0.4'), null);
});
