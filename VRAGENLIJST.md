# Vragenlijst

Ingevuld in de chat op 14-10-2026, voordat er gebouwd werd. De antwoorden worden het KOMPAS.md van de app
en de eerste regels in BESLUITEN.md.

1. **Doel:** welk probleem lost de app op?

   Antwoord: Een virtueel huisdiertje met het gevoel van een jaren-90-gadget (pixels, drie knoppen, piepjes), maar soepel en modern.

2. **Doelgroep:** wie gebruikt het, op welk apparaat, in welke situatie?

   Antwoord: Melroy, en iedereen die de link heeft.

3. **Scope en MVP:** wat is de kleinste versie die al nut heeft?

   Antwoord: Eén wezentje met meters voor honger, humeur, energie, netheid en gezondheid. Acties: eten, spelen, slapen, opruimen, medicijn. De tijd loopt door, ook als de pagina dicht is. Stand bewaard in de browser. Online via GitHub Pages.

4. **Wat de app níét doet.**

   Antwoord: Accounts, een server, meerdere wezentjes, meldingen. Doodgaan, munten en ziekenhuis komen later.

5. **Programmeertaal en waarom.**

   Antwoord: Gewone HTML, CSS en JavaScript, zonder framework. Tests op de logica met Node (`node --test`).

6. **Platform:** waar draait het (desktop, web, server, telefoon)?

   Antwoord: Browser, op pc en telefoon. Publicatie via GitHub Pages.

7. **Architectuur:** de onderdelen en wat er tussen ze gaat.

   Antwoord: De spelregels als pure functies: (toestand, verstreken tijd, actie) geeft een nieuwe toestand. Geen datum of klok in de functies; tijd komt als invoer. Alle snelheden en grenzen in één bestand met constanten. Scherm apart van de logica. Opslag in `localStorage`, met try/catch; zonder opslag werkt het spel gewoon (dan zonder bewaren).

8. **Beveiliging:** welke geheimen, welke data, wie mag erbij?

   Antwoord: Geen geheimen, geen data buiten de browser, geen scripts, lettertypes of afbeeldingen van andere sites.

9. **Apparaten en testen:** op welke apparaten wordt getest, met welk systeem, en wat is daar wel of niet bereikbaar?

   Antwoord: aeropc (Windows 11), in de browser.

10. **Zichtbaarheid:** blijft de repo privé of wordt hij publiek? Dit bepaalt welke omgevingsinfo in de repo mag.

   Antwoord: Publiek. Geen omgevingsinfo in de repo.
