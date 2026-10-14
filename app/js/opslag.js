// Bewaren en terugzetten in de browser (localStorage).
// Alles zit in try/catch: zonder opslag (privévenster, geblokkeerd, vol)
// werkt het spel gewoon door, alleen wordt er dan niets bewaard.
(function (root, maak) {
  if (typeof module === 'object' && module.exports) {
    module.exports = maak(require('./constanten.js'), require('./regels.js'));
  } else {
    root.Starlite = root.Starlite || {};
    root.Starlite.opslag = maak(root.Starlite.constanten, root.Starlite.regels);
  }
})(typeof self !== 'undefined' ? self : this, function (C, regels) {
  // Geeft de opslag van de browser, of null als die er niet is.
  function vindOpslag(venster) {
    try {
      const o = venster.localStorage;
      const sleutel = C.OPSLAG_SLEUTEL + '.proef';
      o.setItem(sleutel, '1');
      o.removeItem(sleutel);
      return o;
    } catch (e) {
      return null;
    }
  }

  // Leest de bewaarde stand. Geeft { toestand, opgeslagenOp } of null.
  function laad(opslag) {
    if (!opslag) return null;
    try {
      const tekst = opslag.getItem(C.OPSLAG_SLEUTEL);
      if (!tekst) return null;
      const data = JSON.parse(tekst);
      const toestand = regels.schoon(data && data.toestand);
      const tijd = data && data.opgeslagenOp;
      if (!toestand || typeof tijd !== 'number' || !Number.isFinite(tijd)) return null;
      return { toestand, opgeslagenOp: tijd };
    } catch (e) {
      return null;
    }
  }

  // Bewaart de stand met het tijdstip. Geeft true als het gelukt is.
  function bewaar(opslag, toestand, nu) {
    if (!opslag) return false;
    try {
      opslag.setItem(
        C.OPSLAG_SLEUTEL,
        JSON.stringify({ v: 1, toestand: { honger: toestand.honger, humeur: toestand.humeur }, opgeslagenOp: nu })
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  return { vindOpslag, laad, bewaar };
});
