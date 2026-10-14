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
    verdrietig: 'Starlite is verdrietig.',
  };

  // De acties in het menu. Een nieuwe actie? Zet hem hier bij, en zet de regel in regels.js.
  const ACTIES = [
    { id: 'eten', label: 'Eten', gezicht: 'eten', gelukt: 'Mmm, lekker!', mislukt: 'Starlite is al vol.' },
    { id: 'spelen', label: 'Spelen', gezicht: 'spelen', gelukt: 'Hoera, een spelletje!', mislukt: 'Starlite heeft genoeg gespeeld.' },
  ];

  const METERS = [
    { id: 'meter-honger', naam: 'Honger', max: C.HONGER_MAX, omgekeerd: true },  // laag = goed
    { id: 'meter-humeur', naam: 'Humeur', max: C.HUMEUR_MAX, omgekeerd: false }, // hoog = goed
  ];
  const VAKJES = 5;

  function maakScherm(doc) {
    const doek = doc.getElementById('wezen');
    const pen = doek.getContext('2d');
    const bericht = doc.getElementById('bericht');
    const menu = doc.getElementById('menu');
    let gezichtNu = null;

    METERS.forEach((m) => {
      m.el = doc.getElementById(m.id);
      for (let i = 0; i < VAKJES; i++) m.el.appendChild(doc.createElement('i'));
    });

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

    // Meters: vol = goed. Honger 0 geeft 5 vakjes, honger 100 geeft 0. Bij humeur andersom.
    function toonMeters(toestand) {
      METERS.forEach((m) => {
        const waarde = toestand[m.naam.toLowerCase()];
        const goed = m.omgekeerd ? m.max - waarde : waarde;
        const gevuld = Math.ceil((goed / m.max) * VAKJES);
        [...m.el.children].forEach((v, i) => v.classList.toggle('vol', i < gevuld));
        m.el.setAttribute('aria-label', m.naam + ': ' + gevuld + ' van ' + VAKJES + (m.omgekeerd ? ' vol' : ''));
      });
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

    return { teken, toonMeters, toonMenu, toonBericht };
  }

  S.scherm = { maakScherm, ACTIES, TEKSTEN };
})(self);
