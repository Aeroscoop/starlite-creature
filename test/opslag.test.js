const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../app/js/constanten.js');
const O = require('../app/js/opslag.js');

// Een nepopslag die werkt als localStorage.
function nepOpslag() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => void data.set(k, String(v)),
    removeItem: (k) => void data.delete(k),
  };
}

// Een opslag die overal een fout geeft (geblokkeerd of vol).
const kapotteOpslag = {
  getItem() { throw new Error('geblokkeerd'); },
  setItem() { throw new Error('vol'); },
  removeItem() { throw new Error('geblokkeerd'); },
};

test('bewaren en terugzetten geeft dezelfde stand', () => {
  const o = nepOpslag();
  assert.equal(O.bewaar(o, { honger: 33 }, 1000), true);
  assert.deepEqual(O.laad(o), { toestand: { honger: 33 }, opgeslagenOp: 1000 });
});

test('niets bewaard: laad geeft null', () => {
  assert.equal(O.laad(nepOpslag()), null);
});

test('kapotte of ontbrekende opslag laat het spel niet crashen', () => {
  assert.equal(O.bewaar(kapotteOpslag, { honger: 1 }, 1), false);
  assert.equal(O.laad(kapotteOpslag), null);
  assert.equal(O.bewaar(null, { honger: 1 }, 1), false);
  assert.equal(O.laad(null), null);
});

test('beschadigde gegevens worden genegeerd', () => {
  for (const rommel of ['{kapot', '[]', '"tekst"', '{"toestand":{"honger":"x"},"opgeslagenOp":1}', '{"toestand":{"honger":5}}']) {
    const o = nepOpslag();
    o.setItem(C.OPSLAG_SLEUTEL, rommel);
    assert.equal(O.laad(o), null, rommel);
  }
});

test('vindOpslag geeft null als de browser geen opslag toestaat', () => {
  const geblokkeerd = { get localStorage() { throw new Error('geen toegang'); } };
  assert.equal(O.vindOpslag(geblokkeerd), null);
  assert.equal(O.vindOpslag({ localStorage: kapotteOpslag }), null);
  const goed = nepOpslag();
  assert.equal(O.vindOpslag({ localStorage: goed }), goed);
});
