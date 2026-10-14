// De lijm: haalt de stand op, laat de tijd lopen, en luistert naar de knoppen.
(function (root) {
  const S = root.Starlite;
  const C = S.constanten;
  const R = S.regels;
  const O = S.opslag;
  const scherm = S.scherm.maakScherm(document);
  const opslag = O.vindOpslag(root);

  // --- Begin: oude stand terugzetten en de tijd sinds sluiten laten verstrijken.
  let nu = Date.now();
  const bewaard = O.laad(opslag);
  let toestand = bewaard
    ? R.tik(bewaard.toestand, nu - bewaard.opgeslagenOp)
    : R.nieuweToestand();
  let laatsteTik = nu;

  // --- Wat er op het scherm staat.
  let menuOpen = false;
  let gekozen = 0;
  let tijdelijkGezicht = null; // bijv. 'eten', tijdelijk
  let tijdelijkTot = 0;
  let melding = '';
  let meldingTot = 0;

  function bewaar() {
    O.bewaar(opslag, toestand, laatsteTik);
  }

  function tekenAlles() {
    const t = Date.now();
    const stemming = R.stemming(toestand);
    const gezicht = tijdelijkGezicht && t < tijdelijkTot ? tijdelijkGezicht : stemming;
    scherm.teken(gezicht);
    scherm.toonMeters(toestand);
    scherm.toonBericht(melding && t < meldingTot ? melding : S.scherm.TEKSTEN[stemming]);
    scherm.toonMenu(menuOpen, gekozen, (id) => R.kan(toestand, id), kiesMetKlik);
  }

  function laatTijdVerstrijken() {
    const t = Date.now();
    toestand = R.tik(toestand, t - laatsteTik);
    laatsteTik = t;
  }

  // --- De drie knoppen.
  function kies() {
    if (!menuOpen) { menuOpen = true; gekozen = 0; }
    else gekozen = (gekozen + 1) % S.scherm.ACTIES.length;
    tekenAlles();
  }

  function bevestig() {
    if (!menuOpen) { menuOpen = true; tekenAlles(); return; }
    doeActie(S.scherm.ACTIES[gekozen].id);
  }

  function terug() {
    menuOpen = false;
    tekenAlles();
  }

  function kiesMetKlik(i) {
    gekozen = i;
    doeActie(S.scherm.ACTIES[i].id);
  }

  function doeActie(id) {
    laatTijdVerstrijken();
    const t = Date.now();
    const actie = S.scherm.ACTIES.find((a) => a.id === id);
    if (R.kan(toestand, id)) {
      toestand = R.pasToe(toestand, id);
      tijdelijkGezicht = actie.gezicht;
      tijdelijkTot = t + C.ACTIE_TOON_MS;
      melding = actie.gelukt;
      bewaar();
    } else {
      melding = actie.mislukt;
    }
    meldingTot = t + C.ACTIE_TOON_MS;
    menuOpen = false;
    tekenAlles();
    setTimeout(tekenAlles, C.ACTIE_TOON_MS + 50);
  }

  document.getElementById('knop-kies').addEventListener('click', kies);
  document.getElementById('knop-ok').addEventListener('click', bevestig);
  document.getElementById('knop-terug').addEventListener('click', terug);

  document.addEventListener('keydown', (e) => {
    if (e.target && e.target.closest && e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;
    if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); kies(); }
    else if (e.key === 'Enter') { e.preventDefault(); bevestig(); }
    else if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); terug(); }
  });

  // --- De tijd loopt door.
  setInterval(() => { laatTijdVerstrijken(); tekenAlles(); }, C.TIK_MS);
  document.addEventListener('visibilitychange', () => {
    laatTijdVerstrijken();
    if (document.hidden) bewaar();
    tekenAlles();
  });
  root.addEventListener('pagehide', () => { laatTijdVerstrijken(); bewaar(); });

  bewaar();
  tekenAlles();
})(self);
