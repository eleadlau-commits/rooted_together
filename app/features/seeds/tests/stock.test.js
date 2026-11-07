import { test, assert } from 'folio/testing';
import { left, canReserve } from '../stock.js';

test('reserving takes one off what is left', () => {
  const s = { id: 'kale', count: 4 };
  assert.equal(left(s, []), 4);
  assert.equal(left(s, ['kale']), 3);
});
test('cannot reserve twice or when none are left', () => {
  assert.equal(canReserve({ id: 'kale', count: 4 }, ['kale']), false);
  assert.equal(canReserve({ id: 'courgette', count: 0 }, []), false);
});
