import { test, assert } from 'folio/testing';
import { TIERS, tierFor } from '../tiers.js';

test('three memberships, Supported last', () => {
  assert.deepEqual(TIERS.map((t) => t.id), ['Starter', 'Standard', 'Supported']);
});
test('unknown memberships give nothing', () => { assert.equal(tierFor('Gold'), null); });
