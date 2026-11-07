import { test, assert } from 'folio/testing';
import { GARDENS, GROWERS, next } from '../examples.js';

test('show me someone else goes round the list', () => { assert.equal(next(GARDENS, GARDENS.length - 1), 0); });
test('example matches carry no names, addresses or phone numbers', () => {
  for (const m of [...GARDENS, ...GROWERS]) assert.ok(!Object.keys(m).some((k) => /name|address|street|phone|postcode/i.test(k)));
});
