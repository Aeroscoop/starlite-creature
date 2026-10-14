# Starlite

Een virtueel huisdiertje met het gevoel van een jaren-90-gadget: pixels, drie knoppen en
(straks) piepjes, maar soepel en modern. Het draait gewoon in de browser, op pc en telefoon.
Geen account, geen server: alles blijft in jouw browser.

Starlite wordt hongerig, ook als de pagina dicht is. Geef hem te eten, en kom een paar keer
per dag terug.

## Spelen
Online via GitHub Pages: https://aeroscoop.github.io/starlite/
(werkt pas nadat GitHub Pages is aangezet, zie `STATUS.md`).

Op de telefoon: tik op de knoppen. Op de pc kan ook met het toetsenbord:
spatie = kies, enter = ok, escape = terug.

## Zelf draaien
Open `app/index.html` in je browser. Er is niets te installeren.
De tests draai je met `node --test` (Node 22 of nieuwer).

## Bestanden
- `app/`: de app zelf (wat online komt).
- `test/`: tests op de spelregels.
- `KOMPAS.md`, `PRINCIPES.md`: waar dit project heen gaat en de vaste principes.
- `AGENTS.md`: werkregels voor AI-agents, inclusief Code, Testen en Apparaten.
- `BESLUITEN.md`: genomen besluiten, met datum.
- `STATUS.md`: wat er bezig is, wat getest moet worden, wat daarna komt.
- `LESSEN.md`: lessen die ook voor volgende projecten gelden.
- `VRAGENLIJST.md`: de ingevulde start-vragenlijst.
- `dev.txt`: hoe de app wordt getest en gestart (gebruikt door `test-pr`).
- `.github/workflows/`: `test.yml` (tests), `pages.yml` (online zetten), `gitleaks.yml` (geheimen zoeken).
