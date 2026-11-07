import { test, assert } from 'folio/testing';
import { scaleFor, nextSize } from '../sizes.js';

test('unknown sizes fall back to normal', () => { assert.equal(scaleFor('huge'), 1); });
test('bigger text steps up and wraps round', () => {
  assert.equal(nextSize('normal'), 'large');
  assert.equal(nextSize('large'), 'largest');
  assert.equal(nextSize('largest'), 'normal');
});
