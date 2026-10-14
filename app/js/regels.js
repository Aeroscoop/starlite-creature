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

  // Maakt een toestand met de juiste grenzen. Elke functie hieronder gebruikt dit,
  // zodat er nooit een waarde buiten 0..100 uitkomt.
  function maak(honger, humeur) {
    return {
      honger: begrens(honger, 0, C.HONGER_MAX),
      humeur: begrens(humeur, 0, C.HUMEUR_MAX),
    };
  }

  // De toestand waarmee een nieuw wezentje begint.
  function nieuweToestand() {
    return maak(C.START_HONGER, C.START_HUMEUR);
  }

  // Laat tijd verstrijken. De tijd komt als invoer (in milliseconden);
  // deze functie kijkt zelf nooit op een klok.
  function tik(toestand, verstrekenMs) {
    let ms = Number(verstrekenMs);
    if (!Number.isFinite(ms) && ms !== Infinity) ms = 0; // rommel telt als geen tijd
    ms = begrens(ms, 0, C.MAX_AFWEZIG_UUR * C.UUR_MS);   // klok terug gezet telt ook als geen tijd
    const uren = ms / C.UUR_MS;

    // Hoeveel van deze uren was hij hongerig? Honger loopt recht omhoog, dus dat is te
    // rekenen: pas na (grens - honger) / snelheid uur komt hij boven de grens.
    const urenTotHongrig = Math.max(0, (C.HONGRIG_VANAF - toestand.honger) / C.HONGER_PER_UUR);
    const urenHongerig = Math.max(0, uren - urenTotHongrig);

    return maak(
      toestand.honger + uren * C.HONGER_PER_UUR,
      toestand.humeur - uren * C.HUMEUR_PER_UUR - urenHongerig * C.HUMEUR_HONGER_PER_UUR
    );
  }

  // Kan deze actie nu? (Bijvoorbeeld: eten kan niet als hij al vol is.)
  function kan(toestand, actie) {
    if (actie === 'eten') return toestand.honger > C.VOL_TOT;
    if (actie === 'spelen') return toestand.humeur < C.GENOEG_GESPEELD_VANAF;
    return false;
  }

  // Voert een actie uit. Kan de actie niet, dan komt dezelfde stand terug.
  function pasToe(toestand, actie) {
    if (!kan(toestand, actie)) return maak(toestand.honger, toestand.humeur);
    if (actie === 'eten') {
      return maak(toestand.honger - C.ETEN_EFFECT, toestand.humeur);
    }
    if (actie === 'spelen') {
      return maak(toestand.honger + C.SPELEN_HONGER, toestand.humeur + C.SPELEN_HUMEUR);
    }
    return maak(toestand.honger, toestand.humeur);
  }

  // Hoe voelt Starlite zich? Het scherm kiest hier een plaatje en tekst bij.
  // Honger gaat voor: een hongerig wezentje kan niet echt vrolijk zijn.
  function stemming(toestand) {
    if (toestand.honger >= C.ERG_HONGRIG_VANAF) return 'erg-hongerig';
    if (toestand.honger >= C.HONGRIG_VANAF) return 'hongerig';
    if (toestand.humeur <= C.VERDRIETIG_TOT) return 'verdrietig';
    return 'tevreden';
  }

  // Controleert iets wat uit de opslag komt. Geen geldige toestand? Dan null.
  // Een oude opslag zonder humeur is wel geldig: dan begint het humeur op de startwaarde.
  function schoon(obj) {
    if (!obj || typeof obj !== 'object') return null;
    if (typeof obj.honger !== 'number' || !Number.isFinite(obj.honger)) return null;
    const humeur = typeof obj.humeur === 'number' && Number.isFinite(obj.humeur)
      ? obj.humeur
      : C.START_HUMEUR;
    return maak(obj.honger, humeur);
  }

  return { nieuweToestand, tik, kan, pasToe, stemming, schoon };
});
