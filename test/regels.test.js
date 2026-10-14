const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../app/js/constanten.js');
const R = require('../app/js/regels.js');

const uren = (n) => n * C.UUR_MS;
const bijna = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} is niet ${b}`);

test('een nieuw wezentje begint met de starthonger en het starthumeur', () => {
  assert.deepEqual(R.nieuweToestand(), { honger: C.START_HONGER, humeur: C.START_HUMEUR });
});

test('honger loopt op met de tijd', () => {
  const na = R.tik({ honger: 20 }, uren(2));
  bijna(na.honger, 20 + 2 * C.HONGER_PER_UUR);
});

test('tik en pasToe veranderen de oude toestand niet', () => {
  const oud = { honger: 20, humeur: 50 };
  R.tik(oud, uren(3));
  R.pasToe(oud, 'spelen');
  assert.deepEqual(oud, { honger: 20, humeur: 50 });
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
  assert.equal(R.stemming({ honger: 0, humeur: 80 }), 'tevreden');
  assert.equal(R.stemming({ honger: C.HONGRIG_VANAF - 1, humeur: 80 }), 'tevreden');
  assert.equal(R.stemming({ honger: C.HONGRIG_VANAF, humeur: 80 }), 'hongerig');
  assert.equal(R.stemming({ honger: C.ERG_HONGRIG_VANAF, humeur: 80 }), 'erg-hongerig');
  assert.equal(R.stemming({ honger: 0, humeur: C.VERDRIETIG_TOT }), 'verdrietig');
  assert.equal(R.stemming({ honger: 0, humeur: C.VERDRIETIG_TOT + 1 }), 'tevreden');
});

test('honger gaat voor verdriet in de stemming', () => {
  assert.equal(R.stemming({ honger: C.HONGRIG_VANAF, humeur: 0 }), 'hongerig');
});

// --- Humeur en spelen

test('humeur zakt langzaam als hij niet hongerig is', () => {
  const na = R.tik({ honger: 0, humeur: 80 }, uren(2));   // honger blijft onder de grens
  bijna(na.humeur, 80 - 2 * C.HUMEUR_PER_UUR);
});

test('humeur zakt sneller zodra hij hongerig is', () => {
  const na = R.tik({ honger: C.HONGRIG_VANAF, humeur: 80 }, uren(1));
  bijna(na.humeur, 80 - C.HUMEUR_PER_UUR - C.HUMEUR_HONGER_PER_UUR);
});

test('extra daling telt alleen voor de tijd dat hij echt hongerig was', () => {
  // Start net onder de grens: na 1 uur is hij 10 punten hongeriger; de helft van de tijd hongerig.
  const start = C.HONGRIG_VANAF - C.HONGER_PER_UUR / 2;
  const na = R.tik({ honger: start, humeur: 80 }, uren(1));
  bijna(na.humeur, 80 - C.HUMEUR_PER_UUR - 0.5 * C.HUMEUR_HONGER_PER_UUR);
});

test('humeur: tijd in stukjes geeft hetzelfde als in één keer', () => {
  let a = { honger: 10, humeur: 90 };
  for (let i = 0; i < 300; i++) a = R.tik(a, 60 * 1000);
  const b = R.tik({ honger: 10, humeur: 90 }, 300 * 60 * 1000);
  bijna(a.honger, b.honger);
  bijna(a.humeur, b.humeur);
});

test('lange afwezigheid: humeur blijft op nul', () => {
  const na = R.tik({ honger: 0, humeur: 100 }, uren(24 * 365));
  assert.equal(na.humeur, 0);
  assert.equal(na.honger, C.HONGER_MAX);
});

test('klok terug gezet verandert humeur niet', () => {
  assert.equal(R.tik({ honger: 5, humeur: 60 }, -uren(9)).humeur, 60);
});

test('spelen verhoogt humeur en kost een beetje honger', () => {
  const na = R.pasToe({ honger: 20, humeur: 40 }, 'spelen');
  assert.equal(na.humeur, 40 + C.SPELEN_HUMEUR);
  assert.equal(na.honger, 20 + C.SPELEN_HONGER);
});

test('spelen gaat nooit boven het maximum', () => {
  const na = R.pasToe({ honger: 0, humeur: C.GENOEG_GESPEELD_VANAF - 1 }, 'spelen');
  assert.equal(na.humeur, C.HUMEUR_MAX);
});

test('spelen kan niet als hij al genoeg gespeeld heeft', () => {
  assert.equal(R.kan({ honger: 0, humeur: C.GENOEG_GESPEELD_VANAF }, 'spelen'), false);
  assert.deepEqual(R.pasToe({ honger: 5, humeur: 95 }, 'spelen'), { honger: 5, humeur: 95 });
  assert.equal(R.kan({ honger: 0, humeur: C.GENOEG_GESPEELD_VANAF - 1 }, 'spelen'), true);
});

test('eten laat het humeur ongemoeid', () => {
  assert.equal(R.pasToe({ honger: 70, humeur: 33 }, 'eten').humeur, 33);
});

test('een oude toestand zonder humeur krijgt het starthumeur', () => {
  assert.deepEqual(R.schoon({ honger: 20 }), { honger: 20, humeur: C.START_HUMEUR });
  assert.equal(R.schoon({ honger: 20, humeur: 'blij' }).humeur, C.START_HUMEUR);
  assert.equal(R.schoon({ honger: 20, humeur: 400 }).humeur, C.HUMEUR_MAX);
});

test('schoon accepteert goede en weigert slechte toestanden', () => {
  assert.deepEqual(R.schoon({ honger: 12, humeur: 40 }), { honger: 12, humeur: 40 });
  assert.equal(R.schoon({ honger: 500 }).honger, C.HONGER_MAX);
  assert.equal(R.schoon({ honger: -3 }).honger, 0);
  for (const slecht of [null, undefined, 5, 'x', {}, { honger: 'veel' }, { honger: NaN }]) {
    assert.equal(R.schoon(slecht), null);
  }
});
