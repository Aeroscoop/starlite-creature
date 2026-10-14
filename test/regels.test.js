const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../app/js/constanten.js');
const R = require('../app/js/regels.js');

const uren = (n) => n * C.UUR_MS;
const bijna = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} is niet ${b}`);

test('een nieuw wezentje begint met de starthonger', () => {
  assert.equal(R.nieuweToestand().honger, C.START_HONGER);
});

test('honger loopt op met de tijd', () => {
  const na = R.tik({ honger: 20 }, uren(2));
  bijna(na.honger, 20 + 2 * C.HONGER_PER_UUR);
});

test('tik verandert de oude toestand niet', () => {
  const oud = { honger: 20 };
  R.tik(oud, uren(3));
  assert.equal(oud.honger, 20);
});

test('tijd in stukjes geeft hetzelfde als in één keer', () => {
  let a = { honger: 10 };
  for (let i = 0; i < 90; i++) a = R.tik(a, 60 * 1000);
  const b = R.tik({ honger: 10 }, 90 * 60 * 1000);
  bijna(a.honger, b.honger);
});

test('geen tijd, geen verandering', () => {
  assert.equal(R.tik({ honger: 42 }, 0).honger, 42);
});

test('lange afwezigheid: honger blijft op het maximum', () => {
  assert.equal(R.tik({ honger: 0 }, uren(24 * 365)).honger, C.HONGER_MAX);
  assert.equal(R.tik({ honger: 0 }, Infinity).honger, C.HONGER_MAX);
});

test('klok terug gezet of rommel telt als geen tijd', () => {
  assert.equal(R.tik({ honger: 50 }, -uren(5)).honger, 50);
  assert.equal(R.tik({ honger: 50 }, NaN).honger, 50);
  assert.equal(R.tik({ honger: 50 }, undefined).honger, 50);
});

test('eten verlaagt de honger', () => {
  const na = R.pasToe({ honger: 70 }, 'eten');
  assert.equal(na.honger, 70 - C.ETEN_EFFECT);
});

test('eten zakt nooit onder nul', () => {
  const na = R.pasToe({ honger: C.VOL_TOT + 1 }, 'eten');
  assert.equal(na.honger, 0);
});

test('eten kan niet als hij al vol is', () => {
  assert.equal(R.kan({ honger: C.VOL_TOT }, 'eten'), false);
  assert.equal(R.pasToe({ honger: 5 }, 'eten').honger, 5);
  assert.equal(R.kan({ honger: C.VOL_TOT + 1 }, 'eten'), true);
});

test('een onbekende actie doet niets', () => {
  assert.equal(R.kan({ honger: 50 }, 'dansen'), false);
  assert.equal(R.pasToe({ honger: 50 }, 'dansen').honger, 50);
});

test('stemming volgt de grenzen', () => {
  assert.equal(R.stemming({ honger: 0 }), 'tevreden');
  assert.equal(R.stemming({ honger: C.HONGRIG_VANAF - 1 }), 'tevreden');
  assert.equal(R.stemming({ honger: C.HONGRIG_VANAF }), 'hongerig');
  assert.equal(R.stemming({ honger: C.ERG_HONGRIG_VANAF }), 'erg-hongerig');
});

test('schoon accepteert goede en weigert slechte toestanden', () => {
  assert.deepEqual(R.schoon({ honger: 12 }), { honger: 12 });
  assert.equal(R.schoon({ honger: 500 }).honger, C.HONGER_MAX);
  assert.equal(R.schoon({ honger: -3 }).honger, 0);
  for (const slecht of [null, undefined, 5, 'x', {}, { honger: 'veel' }, { honger: NaN }]) {
    assert.equal(R.schoon(slecht), null);
  }
});
