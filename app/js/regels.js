// De spelregels. Alleen pure functies: geen klok, geen scherm, geen opslag.
// Ze krijgen een toestand, een tijdsduur en/of een actie, en geven een
// NIEUWE toestand terug. De oude toestand blijft ongemoeid.
// Daardoor is alles zonder browser te testen.
(function (root, maak) {
  if (typeof module === 'object' && module.exports) {
    module.exports = maak(require('./constanten.js'));
  } else {
    root.Starlite = root.Starlite || {};
    root.Starlite.regels = maak(root.Starlite.constanten);
  }
})(typeof self !== 'undefined' ? self : this, function (C) {
  function begrens(x, min, max) {
    return Math.min(max, Math.max(min, x));
  }

  // De toestand waarmee een nieuw wezentje begint.
  function nieuweToestand() {
    return { honger: C.START_HONGER };
  }

  // Laat tijd verstrijken. De tijd komt als invoer (in milliseconden);
  // deze functie kijkt zelf nooit op een klok.
  function tik(toestand, verstrekenMs) {
    let ms = Number(verstrekenMs);
    if (!Number.isFinite(ms) && ms !== Infinity) ms = 0; // rommel telt als geen tijd
    ms = begrens(ms, 0, C.MAX_AFWEZIG_UUR * C.UUR_MS);   // klok terug gezet telt ook als geen tijd
    const uren = ms / C.UUR_MS;
    return {
      honger: begrens(toestand.honger + uren * C.HONGER_PER_UUR, 0, C.HONGER_MAX),
    };
  }

  // Kan deze actie nu? (Bijvoorbeeld: eten kan niet als hij al vol is.)
  function kan(toestand, actie) {
    if (actie === 'eten') return toestand.honger > C.VOL_TOT;
    return false;
  }

  // Voert een actie uit. Kan de actie niet, dan komt dezelfde stand terug.
  function pasToe(toestand, actie) {
    if (!kan(toestand, actie)) return { honger: toestand.honger };
    if (actie === 'eten') {
      return { honger: begrens(toestand.honger - C.ETEN_EFFECT, 0, C.HONGER_MAX) };
    }
    return { honger: toestand.honger };
  }

  // Hoe voelt Starlite zich? Het scherm kiest hier een plaatje en tekst bij.
  function stemming(toestand) {
    if (toestand.honger >= C.ERG_HONGRIG_VANAF) return 'erg-hongerig';
    if (toestand.honger >= C.HONGRIG_VANAF) return 'hongerig';
    return 'tevreden';
  }

  // Controleert iets wat uit de opslag komt. Geen geldige toestand? Dan null.
  function schoon(obj) {
    if (!obj || typeof obj !== 'object') return null;
    if (typeof obj.honger !== 'number' || !Number.isFinite(obj.honger)) return null;
    return { honger: begrens(obj.honger, 0, C.HONGER_MAX) };
  }

  return { nieuweToestand, tik, kan, pasToe, stemming, schoon };
});
