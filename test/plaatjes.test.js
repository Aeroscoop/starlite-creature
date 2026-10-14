const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../app/js/plaatjes.js');

test('elk plaatje is 16 x 16 en gebruikt alleen kleuren uit het palet', () => {
  for (const naam of Object.keys(P.GEZICHTEN)) {
    const rijen = P.plaatje(naam);
    assert.equal(rijen.length, P.GROOTTE, naam);
    for (const rij of rijen) {
      assert.equal(rij.length, P.GROOTTE, naam);
      for (const teken of rij) assert.ok(teken === '.' || P.PALET[teken], `${naam}: ${teken}`);
    }
  }
});

test('de gezichten verschillen van elkaar', () => {
  const alle = Object.keys(P.GEZICHTEN).map((n) => P.plaatje(n).join(''));
  assert.equal(new Set(alle).size, alle.length);
});
