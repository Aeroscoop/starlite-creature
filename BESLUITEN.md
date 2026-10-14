# Besluiten

Eén regel per besluit, met datum. Een vervallen besluit wordt vervangen en gemarkeerd met `(vervangt …)`.

## Werkwijze
- 2026-10-14: Starlite is de end-to-end test van de template-workflow; wat schuurt wordt genoteerd.
- 2026-10-14: Repo is publiek; geen omgevingsinfo in bestanden.

## Architectuur
- 2026-10-14: Gewone HTML, CSS en JavaScript, zonder framework en zonder bouwstap.
- 2026-10-14: Geen JavaScript-modules, maar gewone scripts. Reden: een pagina die direct als bestand wordt geopend (`file://`) laadt geen modules, en zo werkt de app op aeropc zonder server.
- 2026-10-14: Elk bestand werkt zowel in de browser als in Node (kleine `(function (root, maak) …)`-kop bovenaan). Zo kunnen de tests het gewoon met `require` laden.
- 2026-10-14: Spelregels zijn pure functies in `app/js/regels.js`: (toestand, verstreken tijd of actie) geeft een nieuwe toestand. Geen klok erin; tijd komt als invoer.
- 2026-10-14: Alle snelheden en grenzen staan in `app/js/constanten.js`.
- 2026-10-14: Scherm (`scherm.js`, `main.js`) staat los van de logica; opslag in `opslag.js` met try/catch, zonder opslag werkt het spel gewoon.
- 2026-10-14: Honger is 0 (vol) tot 100 (uitgehongerd), ongeveer 10 per uur. Een afwezigheid telt maximaal 30 dagen mee.
- 2026-10-14: De opslag bewaart de stand plus het tijdstip. Bij openen laat de app de tijd sinds dat tijdstip verstrijken. Dat geeft hetzelfde resultaat als doorlopen.
- 2026-10-14: Wezentje is pixel art van 16 × 16 vakjes in code (`plaatjes.js`), geen afbeeldingsbestanden. Reden: geen externe bestanden en makkelijk aan te passen.
- 2026-10-14: Content Security Policy in de pagina: alleen eigen scripts en stijlen, niets van andere sites.
- 2026-10-14: Publicatie via GitHub Pages met een Actions-workflow die alleen de map `app/` publiceert.

## Functies
- 2026-10-14: Humeur loopt van 0 (verdrietig) tot 100 (superblij). Het zakt altijd langzaam (4 per uur) en sneller zolang Starlite hongerig is (6 per uur extra). Dat is exact uit te rekenen, ook na lange afwezigheid.
- 2026-10-14: Spelen geeft +25 humeur en +8 honger. Vanaf humeur 90 wil hij even niet spelen. Eten verandert het humeur niet.
- 2026-10-14: Gezicht: honger gaat voor verdriet (een hongerig wezentje is niet echt vrolijk). Verdrietig vanaf humeur 30 of lager.
- 2026-10-14: Oude opslag zonder humeur blijft werken; het humeur begint dan op de startwaarde.
- 2026-10-14: Proef: wezentje, behuizing, drie knoppen (kies, ok, terug), honger en eten. Rest staat in issues.
- 2026-10-14: Bediening: kies opent het menu en gaat naar de volgende keuze, ok bevestigt, terug sluit het menu. Op de telefoon kun je ook gewoon op een menu-item tikken. Toetsenbord: spatie, enter, escape.
- 2026-10-14: Licht en donker volgen de instelling van het apparaat. Het "scherm" blijft licht, zoals een echt gadget.

## Data
- 2026-10-14: Alleen `localStorage` in de browser, sleutel `starlite.v1`. Gegevens worden gecontroleerd bij het laden; beschadigde gegevens worden genegeerd.

## Niet nu
- 2026-10-14: Doodgaan, munten en ziekenhuis (idee voor later: ernstig ziek vervangt doodgaan).
- 2026-10-14: Accounts, server, meldingen, meerdere wezentjes.
