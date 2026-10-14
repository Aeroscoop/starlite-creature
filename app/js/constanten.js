// Alle snelheden en grenzen van het spel staan hier, en nergens anders.
// Wil je het spel trager of sneller maken? Pas alleen dit bestand aan.
//
// Dit bestand is gewoon een script (geen module), zodat de pagina ook
// werkt als je index.html direct opent. De bovenkant zorgt dat dezelfde
// code ook in de Node-tests geladen kan worden.
(function (root, maak) {
  if (typeof module === 'object' && module.exports) {
    module.exports = maak();
  } else {
    root.Starlite = root.Starlite || {};
    root.Starlite.constanten = maak();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const UUR_MS = 60 * 60 * 1000;

  return Object.freeze({
    UUR_MS,

    // Honger: 0 = helemaal vol, 100 = uitgehongerd.
    HONGER_MAX: 100,
    START_HONGER: 30,
    HONGER_PER_UUR: 10,     // zo snel loopt honger op (ongeveer 6 uur van vol tot hongerig)
    HONGRIG_VANAF: 60,      // vanaf hier laat Starlite merken dat hij honger heeft
    ERG_HONGRIG_VANAF: 85,  // vanaf hier is hij echt ongelukkig
    ETEN_EFFECT: 40,        // zoveel punten gaat de honger omlaag bij een maaltijd
    VOL_TOT: 10,            // is de honger zo laag of lager, dan wil hij niet meer eten

    // Humeur: 0 = heel verdrietig, 100 = superblij. Zakt langzaam, en sneller bij honger.
    HUMEUR_MAX: 100,
    START_HUMEUR: 70,
    HUMEUR_PER_UUR: 4,          // zoveel zakt het humeur per uur, altijd
    HUMEUR_HONGER_PER_UUR: 6,   // extra daling per uur zolang hij hongerig is (HONGRIG_VANAF)
    VERDRIETIG_TOT: 30,         // met dit humeur of lager kijkt hij verdrietig
    SPELEN_HUMEUR: 25,          // zoveel punten gaat het humeur omhoog bij spelen
    SPELEN_HONGER: 8,           // en zoveel honger krijgt hij ervan
    GENOEG_GESPEELD_VANAF: 90,  // is het humeur zo hoog of hoger, dan wil hij even niet spelen

    // Langer dan dit tellen we een afwezigheid niet mee. Honger zit dan toch al aan zijn maximum.
    MAX_AFWEZIG_UUR: 24 * 30,

    TIK_MS: 1000,           // hoe vaak het scherm de tijd bijwerkt
    ACTIE_TOON_MS: 1600,    // hoe lang het plaatje en de tekst van een actie blijven staan

    OPSLAG_SLEUTEL: 'starlite.v1',
  });
});
