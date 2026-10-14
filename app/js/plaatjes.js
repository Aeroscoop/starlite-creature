// Het wezentje als pixel art: een rooster van 16 x 16 vakjes.
// Elk teken is een kleur (zie PALET). De punt is leeg.
// Eigen ontwerp: een blokkerig, vriendelijk wezentje met een sterretje op zijn kop.
(function (root, maak) {
  if (typeof module === 'object' && module.exports) {
    module.exports = maak();
  } else {
    root.Starlite = root.Starlite || {};
    root.Starlite.plaatjes = maak();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  const PALET = {
    o: '#20304a', // rand
    b: '#4fc3a1', // lijf
    l: '#9be8cf', // lichte plek
    y: '#ffd23f', // sterretje
    e: '#1b1b2f', // ogen
    m: '#b3263e', // mond
    c: '#ff8fa3', // wangen
    w: '#ffffff', // glans
  };

  const LIJF = [
    '.......yy.......',
    '......yyyy......',
    '.......oo.......',
    '.......oo.......',
    '....oooooooo....',
    '..ooobbbbbbooo..',
    '.ollbbbbbbbbbbo.',
    '.olbbbbbbbbbbbo.',
    '.obbbbbbbbbbbbo.',
    '.obbbbbbbbbbbbo.',
    '.obbbbbbbbbbbbo.',
    '.obbbbbbbbbbbbo.',
    '..obbbbbbbbbbo..',
    '..oobbbbbbbboo..',
    '...obbo..obbo...',
    '...oooo..oooo...',
  ];

  // Gezichten: lijstjes van [x, y, kleur] die over het lijf heen komen.
  const GEZICHTEN = {
    tevreden: [
      [4, 8, 'e'], [4, 9, 'e'], [11, 8, 'e'], [11, 9, 'e'],
      [3, 10, 'c'], [12, 10, 'c'],
      [6, 10, 'm'], [9, 10, 'm'], [7, 11, 'm'], [8, 11, 'm'],
    ],
    hongerig: [
      [4, 8, 'e'], [4, 9, 'e'], [11, 8, 'e'], [11, 9, 'e'],
      [3, 10, 'c'], [12, 10, 'c'],
      [7, 10, 'm'], [8, 10, 'm'], [7, 11, 'm'], [8, 11, 'm'],
    ],
    'erg-hongerig': [
      [3, 8, 'e'], [4, 9, 'e'], [12, 8, 'e'], [11, 9, 'e'],
      [6, 11, 'm'], [9, 11, 'm'], [7, 10, 'm'], [8, 10, 'm'],
      [13, 7, 'w'], [13, 8, 'w'], // een traantje
    ],
    verdrietig: [
      [4, 9, 'e'], [4, 10, 'e'], [11, 9, 'e'], [11, 10, 'e'],
      [5, 8, 'e'], [10, 8, 'e'],
      [6, 11, 'm'], [9, 11, 'm'], [7, 10, 'm'], [8, 10, 'm'],
      [4, 11, 'w'], [4, 12, 'w'], // een traantje
    ],
    spelen: [
      [4, 9, 'e'], [5, 8, 'e'], [11, 9, 'e'], [10, 8, 'e'],
      [3, 10, 'c'], [12, 10, 'c'],
      [5, 10, 'm'], [6, 11, 'm'], [7, 11, 'm'], [8, 11, 'm'], [9, 11, 'm'], [10, 10, 'm'],
      [6, 10, 'm'], [7, 10, 'm'], [8, 10, 'm'], [9, 10, 'm'],
      [1, 5, 'y'], [14, 4, 'y'], [15, 11, 'y'], // sterretjes erbij
    ],
    eten: [
      [4, 9, 'e'], [5, 8, 'e'], [11, 9, 'e'], [10, 8, 'e'],
      [3, 10, 'c'], [12, 10, 'c'],
      [6, 10, 'm'], [7, 10, 'm'], [8, 10, 'm'], [9, 10, 'm'],
      [7, 11, 'm'], [8, 11, 'm'],
    ],
  };

  // Geeft het plaatje als lijst van rijen (elk teken een kleur of punt).
  function plaatje(gezicht) {
    const rijen = LIJF.map((r) => r.split(''));
    for (const [x, y, k] of GEZICHTEN[gezicht] || GEZICHTEN.tevreden) rijen[y][x] = k;
    return rijen.map((r) => r.join(''));
  }

  return { PALET, GEZICHTEN, LIJF, plaatje, GROOTTE: 16 };
});
