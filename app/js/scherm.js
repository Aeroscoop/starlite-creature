// Het scherm: tekent het wezentje, de meters en het menu.
// Hier zit geen spelregel in; die staan in regels.js.
(function (root) {
  const S = (root.Starlite = root.Starlite || {});
  const P = S.plaatjes;
  const C = S.constanten;

  const TEKSTEN = {
    tevreden: 'Starlite voelt zich fijn.',
    hongerig: 'Starlite heeft honger.',
    'erg-hongerig': 'Starlite rammelt van de honger!',
  };

  const ACTIES = [{ id: 'eten', label: 'Eten' }];

  function maakScherm(doc) {
    const doek = doc.getElementById('wezen');
    const pen = doek.getContext('2d');
    const meterHonger = doc.getElementById('meter-honger');
    const bericht = doc.getElementById('bericht');
    const menu = doc.getElementById('menu');
    let gezichtNu = null;

    const VAKJES = 5;
    for (let i = 0; i < VAKJES; i++) meterHonger.appendChild(doc.createElement('i'));

    function teken(gezicht) {
      if (gezicht === gezichtNu) return;
      gezichtNu = gezicht;
      pen.clearRect(0, 0, P.GROOTTE, P.GROOTTE);
      P.plaatje(gezicht).forEach((rij, y) => {
        [...rij].forEach((k, x) => {
          if (k === '.') return;
          pen.fillStyle = P.PALET[k];
          pen.fillRect(x, y, 1, 1);
        });
      });
    }

    // Meter: vol = goed. Honger 0 geeft 5 vakjes, honger 100 geeft 0.
    function toonHonger(honger) {
      const gevuld = Math.ceil(((C.HONGER_MAX - honger) / C.HONGER_MAX) * VAKJES);
      [...meterHonger.children].forEach((v, i) => v.classList.toggle('vol', i < gevuld));
      meterHonger.setAttribute('aria-label', 'Honger: ' + gevuld + ' van ' + VAKJES + ' vol');
    }

    function toonMenu(open, gekozen, kanActie, bijKlik) {
      menu.hidden = !open;
      if (!open) return;
      menu.replaceChildren();
      ACTIES.forEach((a, i) => {
        const li = doc.createElement('li');
        const b = doc.createElement('button');
        b.type = 'button';
        b.textContent = a.label;
        b.className = 'menu-item' + (i === gekozen ? ' gekozen' : '');
        b.disabled = !kanActie(a.id);
        b.addEventListener('click', () => bijKlik(i));
        li.appendChild(b);
        menu.appendChild(li);
      });
    }

    function toonBericht(tekst) {
      bericht.textContent = tekst;
    }

    return { teken, toonHonger, toonMenu, toonBericht, ACTIES, TEKSTEN };
  }

  S.scherm = { maakScherm, ACTIES, TEKSTEN };
})(self);
