# Instructies voor AI-agents (Claude Code, Jules e.a.)

Dit bestand geldt voor elke sessie, in de chat en in de bouwtools.

## Lees eerst
`KOMPAS.md` en `PRINCIPES.md`. Ze gaan vóór alle andere regels.

## Uitleg
- Leg bij elke keuze in architectuur, tools of manier van programmeren kort uit: wat je kiest, waarom, en waarom het beter is dan het alternatief. Kort, bondig, gewone taal. Doel: Melroy leert hoe de app werkt.
- Leg uit in gewone taal: eerst wat en waarom, dan pas hoe. Zo min mogelijk commando's en paden. Dit geldt ook voor eindverslagen en de README.

## Rollen
- **Denken: chat (claude.ai) of plan-modus van Claude Code.** Meedenken, plannen, code lezen en beoordelen. Plannen en besluiten komen in een GitHub-issue.
- **Bouwen: Claude Code en Jules.** Veranderen code en bestanden, testen, committen en pushen. Jules pakt alleen issues op die daarvoor klaargezet zijn.
- **Melroy test en beslist.**

Merk je wijzigingen die jij niet hebt gedaan? Stop en meld het eerst. Niet zelf gaan uitzoeken of terugdraaien.

## Bij start
1. Begin vanaf de nieuwste `main`. Zit de sessie al op een eigen branch, werk daarop verder en meld dat.
2. Lees `KOMPAS.md`, `PRINCIPES.md` en de andere documenten uit de tabel hieronder die bestaan.
3. Lees het issue waaraan gewerkt wordt. Geen issue? Vraag welk, behalve bij "start project": daar is de handoff de opdracht.
4. Een cloudsessie kan zelf niet zien op welk apparaat Melroy test. Gebruik de tabel "Apparaten" of de handoff. Draai je lokaal, kijk dan ook met `hostname` waar je zit.
5. Noemt de handoff meer dan één repo, controleer dan meteen of je ze allemaal kunt bereiken. Zo niet: meld het direct, zodat Melroy ze kan toevoegen.
6. Meld in twee of drie zinnen: de stand, het apparaat, en wat je hier gaat doen.

## Bij afronden
1. Tests draaien (zie "Testen") en de app starten op het apparaat waar je zit.
2. Documentatie bijwerken in dezelfde PR als de code, ook `STATUS.md` (zie "Start project").
3. Zet in `STATUS.md` onder "Voor Melroy": Testen met `test-pr <repo> <nummer>` (uit de workspace-repo), met de testpunten eronder.
4. Nieuw besluit genomen? Eén regel erbij in `BESLUITEN.md`, met datum.
5. Iets geleerd dat ook voor een volgend project geldt? Eén regel in `LESSEN.md`.
6. Commit en push, of een PR naar `main`.
7. Controleer of alle checks op de PR groen zijn (Gitleaks, tests) vóór het eindverslag. Kun je ze niet zien, zeg dat expliciet.
8. Reactie in het issue: wat is gedaan, wat staat nog open, wat moet nog getest worden en waar.

## Werkafspraken
- Plannen in de chat, bouwen bij de bouwer. De bouwer werkt vanuit een issue of handoff.
- Het issue is de overdracht. Elk issue heeft: context, gewenst gedrag, betrokken bestanden, "Klaar als"-vinkjes, wat de agent zelf niet kan testen, en testpunten per apparaat.
- Eén issue = één branch = één bouwer. Heeft een issue al een open branch of PR, dan komt er geen tweede bouwer op.
- Klaar = gemerged én getest. Gemerged maar niet getest staat in `STATUS.md` onder "Voor Melroy".
- Kleine dingen gaan als vinkje in het issue "Kleine dingen", niet elk in een eigen PR.
- Melroy test en beslist; hij commit niet zelf. Testpunten moeten zonder uitleg uit te voeren zijn.
- Algemene les: één regel in `LESSEN.md`, eindigend op `(kandidaat template)`. Melroy beslist of die naar de template gaat.
- Issues met label `later` zijn ideeën. Niet oppakken, tenzij Melroy erom vraagt.
- Omgevingsinfo (servers, netwerk, homelab) mag alleen in de repo als in `VRAGENLIJST.md` is gekozen dat de repo privé blijft. Bij publiek: niet in bestanden, alleen gebruiken uit de handoff.
- Werkplek: kijk bij de start op welk apparaat en welk netwerk je zit. Onderweg (bijv. bibliotheek) zijn de homelab en sommige diensten vaak niet bereikbaar. Dat is geen fout: zet wat hier niet kan in `STATUS.md` onder "Voor Melroy" met "thuis testen". Geef testpunten per plek als dat verschil maakt. De workflow is niet afgestemd op onderweg, maar vangt het wel op.

## Start project
Melroy maakt zelf een nieuwe repo met "Use this template". Daarna geeft hij de opdracht op een van twee manieren:
- **Standaard:** een gewoon bericht met "start project" en de handoff eronder. Een slash-commando accepteert geen opmaak, dus plakken gaat hier het best.
- **Of:** `/start` met de handoff als bestand via `@`, bijv. `/start @handoff.md`.

Jij richt de repo in, klaar om de app te bouwen. Deze sectie is de bron; `.claude/commands/start.md` verwijst er alleen naar.

Stappen:
1. **Geen repo maken.** De repo bestaat al.
2. **Vragenlijst moet al ingevuld zijn.** Plannen gebeurt in de chat, daar is de vragenlijst ingevuld. Melroy geeft die mee in de handoff (geplakt onder "start project", of als bestand via `@`). Geen ingevulde vragenlijst? **Stop** en vraag Melroy om die eerst in de chat in te vullen. Vul hem niet zelf in en neem niets aan.
3. **Invullen vanuit die antwoorden:** `VRAGENLIJST.md`, `KOMPAS.md` (van de app, niet meer van de template), `dev.txt` invullen (de controle van de template eruit), `BESLUITEN.md` en `STATUS.md` nieuw aanmaken (zie hieronder), en in dit bestand de secties Apparaten, Code en Testen. De tabel Apparaten komt uit de handoff. Verzin niets bij: ontbreekt er iets (ook bij apparaten), vraag het aan Melroy.
4. **Template-teksten opruimen:**
   - [ ] `README.md`: over de app, niet over de template.
   - [ ] `dev.txt`: de vier regels ingevuld (test en start, voor Linux en Windows). Laat een platform leeg als de app daar niet draait. De controle van de template (`test_linux=test -f …`) vervang je door de echte test.
   - [ ] `KOMPAS.md`: het kompas van de app.
   - [ ] `.github/dependabot.yml`: de ecosystemen van de stack erbij (bijv. `gomod`, `npm`); de template-opmerking weg.
   - [ ] `.gitignore`: de template-versie is stack-neutraal (geheimen, OS-bestanden, editormappen). Vul aan voor de gekozen stack, bijv. `node_modules/` of `*.exe` (voor Wails: zie hieronder).
   - [ ] `AGENTS.md`: de sectie "Start project" en "Werkafspraken" blijven staan, de rest is per app ingevuld. Haal de Wails-regel uit "Testen" als de app geen Wails gebruikt.
5. **Test-workflow toevoegen** voor de stack (bijv. `go test`, `npm test`) als GitHub Action, zodat tests bij elke PR draaien. Gebruik de actuele actie-versies uit `.github/workflows/gitleaks.yml`.
6. **Kleinste proef bouwen** die op elk platform werkt, met tests.
7. **Issues maken** voor de rest van het MVP, alleen als het MVP groter is dan de proef. Het issue "Kleine dingen" met een lege checklist komt er altijd.
8. **Alles via één PR.** Melroy test de proef lokaal.

`BESLUITEN.md` heeft de vaste onderwerpen Werkwijze, Architectuur, Functies, Data en Niet nu. Eén regel per besluit, met datum. Een vervallen besluit wordt vervangen en gemarkeerd met `(vervangt …)`. Beide staan al in de documentatietabel hieronder, als "per app"; ze bestaan pas in de app, niet in de template.

`dev.txt` staat al in de template: start-regels leeg, en als testregel een kleine controle of de vaste bestanden bestaan (zodat `test-pr` op de template zelf iets zinvols doet). Het zegt hoe je de app test en start, per platform. `test-pr` uit de workspace-repo leest het. Eén regel per commando, vorm `naam=commando`; regels met `#` zijn uitleg. Voorbeeld voor een Wails-app:
```
test_linux=go test -tags webkit2_41 ./...
test_windows=go test ./...
start_linux=wails dev -tags webkit2_41
start_windows=wails dev
```
Het test-commando is hetzelfde als in de test-workflow uit stap 5, zodat er één waarheid is. Het eerste woord moet een programma zijn dat bestaat (bijv. `go`, `npm`).

`STATUS.md` en `BESLUITEN.md` bestaan niet in de template; maak ze nieuw aan in de app. `STATUS.md`: Vaste kopjes:
- **Bezig**
- **Voor Melroy**: te testen, met apparaat en testpunten.
- **Volgende**: in volgorde, met issue.
- **Klaar**: alleen de laatste 5; de rest staat in de PR's.

### Wails-apps (Go + Wails v2)
Pas dit toe op `.gitignore`; zet het niet in de algemene `.gitignore` van de template.
- Negeer alleen `build/bin/`, niet heel `build/`. Iconen en het Windows-manifest in `build/` horen in git.
- `go:embed` heeft de map `frontend/dist/` nodig, anders faalt `go test` op een verse clone. Negeer de inhoud, maar houd de map in git:
  ```
  frontend/dist/*
  !frontend/dist/.gitkeep
  ```
  Maak ook een leeg bestand `frontend/dist/.gitkeep`.
- Negeer ook `frontend/wailsjs/` en `frontend/package.json.md5`; Wails maakt ze zelf aan.
- Linux-bibliotheken en de tag `webkit2_41`: zie "Testen".

## Apparaten
Waar gewerkt wordt, bepaalt wat er kan. Per app invullen, uit de handoff. Ontbreekt iets: vragen, niet invullen.

| Apparaat | Waar | Netwerk / diensten | Geschikt voor |
|---|---|---|---|
| | | | |

## Code
Per app invullen.

## Testen
Per app invullen.

- Alleen Wails-apps: op Linux heb je `libgtk-3-dev` en `libwebkit2gtk-4.1-dev` nodig (`sudo apt install`). Bouw en test met tag `webkit2_41`, bijv. `go test -tags webkit2_41 ./...`.

## Documentatie
Elk bestand heeft één taak en elk feit staat op één plek. Staat iets al ergens, verwijs er dan naar in plaats van het te herhalen.

| Bestand | Wat erin staat |
|---|---|
| `KOMPAS.md` | Waarom, voor wie, wat wel en niet, wanneer het goed is |
| `PRINCIPES.md` | Vaste principes die altijd gelden |
| `VRAGENLIJST.md` | Invullijst bij de start van een app |
| `AGENTS.md` | Deze werkregels |
| `LESSEN.md` | Lessen die ook voor een volgend project gelden |
| `README.md` | Wat de repo is en hoe je hem gebruikt |
| `BESLUITEN.md` (per app) | Genomen besluiten, één regel per besluit, met datum |
| `STATUS.md` (per app) | Bezig, voor Melroy, volgende, klaar |
| `dev.txt` (per app) | Hoe je de app test en start, per platform |

Komt later per app: `ONTWERP.md`. Voeg het toe aan deze tabel zodra het bestaat.

## Taal
- Documentatie en issues: Nederlands.
- Korte zinnen, eenvoudige woorden.
