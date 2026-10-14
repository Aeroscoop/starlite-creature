# Lessen

Universele lessen uit onze projecten, om mee te nemen naar volgende projecten en nieuwe opslagplaatsen.
Geen besluiten over één app (die staan in `BESLUITEN.md`), maar werkwijzen die overal gelden.
Het document groeit mee: na elk project nieuwe lessen toevoegen, met projectnaam en datum. Lessen die alleen voor één soort app gelden staan apart onderaan.
Bijgewerkt op 2026-10-14 (Orchestrator).

## Werkwijze
- **Scheid denken en bouwen.** De chat denkt, ontwerpt, plant, schrijft issues en past op verzoek documentatie aan (README, ROADMAP, BESLUITEN, LESSEN) via een eigen branch en PR. Een bouwer (Claude Code, Jules) verandert de code en voert tests uit. Zo is altijd helder wie wat aanpast.
- **Het issue is de overdracht.** Elk issue bevat context, gewenst gedrag, specifieke bestanden, "Klaar als"-vinkjes, afhankelijkheden en testinstructies per apparaat. Voor autonome agents vermeld je daarnaast expliciet wat ze niet zelf kunnen testen (zoals de app GUI openen).
- **Vaste start en afronding per sessie.** Gebruik `CLAUDE.md` voor vaste stappen bij start (pull, roadmap/besluiten lezen, stand melden) en afronding (tests, roadmap bijwerken, besluiten/lessen noteren, PR).
- **Klaar = gemerged én getest.** Gemerged maar nog niet op alle apparaten getest werk staat onder "Nog te testen" op de roadmap met de beoogde testapparaten. Update de roadmap in dezelfde PR als de code.
- **Leg besluiten direct vast met datum.** Eén regel per besluit in `BESLUITEN.md`. Vervallen besluiten worden vervangen en gemarkeerd met `(vervangt …)`.
- **Houd PR's gefocust en herkenbaar.** Bouw geen extra's buiten het issue. Verwijs naar onderwerpen bij naam (bijv. "Projects-tab filter-issue") en niet alleen met een rugnummer.
- **Apparaat- en netwerkcontext vastleggen.** Leg vast welk apparaat welke netwerkbronnen bereikt (zoals thuisnetwerk/homelab). Een onbereikbare interne server onderweg is een gegeven, geen bug.
- **Schrappen geeft snelheid.** Niet-essentiële wensen (zoals iPhone-weergave of extra tabs) direct verplaatsen naar "Niet nu".

## Code en repo
- **Eén bron van waarheid op GitHub.** Code synchroniseren via bestandssync (zoals Syncthing) veroorzaakt conflicten. Sync is voor data, GitHub voor code.
- **Leg eerst vast wat er tussen onderdelen gaat.** Welk bestand of welke koppeling, welke velden, wie schrijft en wie leest. Losse onderdelen werken vaak prima; het koppelen is het moeilijkste deel.
- **Validatie via de kleinst mogelijke proef.** Test een nieuwe integratie of techniek eerst met een minimale proof-of-concept op elk platform voordat de volledige functie wordt gebouwd.
- **Eén centrale laag voor bestanden en netwerk.** Alle I/O verloopt via één backend-module met centrale padcontrole (in de Orchestrator: `vaultfs.go`).
- **Modulaire opbouw van de frontend.** Eén bestand per tab/functie met één duidelijke ingang. Algemene hulpfuncties (zoals escapen en datumformattering) staan centraal (in de Orchestrator: `common.js`).
- **Rekenlogica als pure functies.** Scheid datatransformaties en berekeningen van de weergave (in de Orchestrator: `stats.js`, `task-parser.js`), zodat ze eenvoudig via unit tests te verifiëren zijn.
- **Test op alle ondersteunde platforms.** Elk platform kan zich anders gedragen. Test op elk apparaat en systeem waarop het project moet draaien.
- **Startscript voor geautomatiseerd bouwen.** Een opstartscript dat automatisch de nieuwste code ophaalt, herbouwt bij wijzigingen en de app start, vereenvoudigt het dagelijks testen.

## Data en privacy
- **Geheimen buiten de opslagplaats.** Configuratie en sleutels staan buiten de repo (in de Orchestrator: `~/.orchestrator`) met bestandsrechten 600, uitgesloten via `.gitignore`.
- **Minimale rechten (least privilege).** Vraag alleen strikt noodzakelijke OAuth-scopes en API-rechten aan (zoals `gmail.metadata` voor enkel headerinformatie).
- **Gevoelige data alleen in-memory.** Mailberichten en nieuwsartikelen worden uitsluitend in het geheugen geladen en niet naar schijf of logs geschreven.
- **Robuuste netwerkafhandeling en reserves.** Bewaar een lokale cache voor externe gegevens (zoals de agenda). Gooi authenticatietokens alleen weg bij expliciete afwijzing door de provider, nooit bij tijdelijke netwerkstoringen.
- **Eenduidige dataregels.** Leg de regels voor datastructuren en uitzonderingen expliciet vast (bijv. "een taak heeft nooit ⏳ en 📅 tegelijk").

## Ontwerp
- **Prototyping via schetsen.** Maak en keur eerst een losse HTML/CSS-schets goed (opgeslagen in `docs/sketches/`) voordat de functionaliteit wordt ingebouwd.
- **Voorspelbare UI-lay-out.** Houd elementen op vaste posities. Laat informatie-inhoud variëren, maar verschuif geen UI-componenten.
- **Feitelijke en rustige statusmeldingen.** Gebruik neutrale, accurate statusmeldingen met tijdstempels; vermijd motiverende of emotionele teksten.
- **Sneltoetsen vanaf de start.** Bouw toetsenbordnavigatie direct vanaf het begin in als eerste-klas bediening.

## Bij desktop-apps
- **Kies de runtime op basis van de benodigde rechten.** Browser-API's (zoals file pickers) vragen continu permissies en ontbreken soms in WebKitGTK (Linux). Een desktop runtime (Go + Wails) omzeilt dit.
- **Test op Linux én Windows.** Linux (WebKitGTK) vertoont regelmatig ander gedrag dan Windows (WebView2) bij mappen kiezen, grid-breedtes en drag-and-drop.
- **Wails en `.gitignore`.** `go:embed` heeft `frontend/dist` nodig, anders faalt `go test` op een verse clone: commit een `.gitkeep` in `frontend/dist`. Ignoreer alleen `build/bin`, niet heel `build/` (iconen en Windows-manifest horen in git). (md-editor-module, 2026-10)
- **Schrijven in bestanden van externe apps (zoals Obsidian).** Herlees het bestand vlak voor schrijven, verifieer de doelregel, schrijf via een tijdelijk bestand (atomic write) en behoud de originele regeleinden (CRLF/LF) en BOM.

## Startlijst voor een nieuw project
1. Repo aanmaken (privé indien persoonlijke data gebruikt wordt) met een `.gitignore` voor geheimen en build-artifacts.
2. `CLAUDE.md` opstellen met rollen, werkafspraken met de chat (eerst meedenken, dan bouwen; 1–3 dingen per bericht; issues bij naam noemen), start/afrondstappen, apparaatcontext, coderegels en testinstructies.
3. `ROADMAP.md` inrichten met de secties Nog te testen / Nu / Daarna / Later / Klaar.
4. `docs/BESLUITEN.md` aanmaken met de vaste onderwerpen (Werkwijze, Architectuur, Functies, Ontwerp, Data, Niet nu).
5. `docs/LESSEN.md` kopiëren en doornemen voor universele richtlijnen.
6. Testframework inrichten en unit tests toevoegen vanaf de eerste functie.
7. Eerste issue uitvoeren: de kleinste haalbare proof-of-concept op elk beoogd platform.

## Bij web-apps zonder bouwstap
- **Geen JavaScript-modules als de pagina ook direct als bestand moet werken.** `file://` laadt geen modules. Gebruik gewone scripts met een kleine kop bovenaan (`module.exports` in Node, een naam op `window` in de browser), dan werken dezelfde bestanden in de pagina én in `node --test`. (Starlite, 2026-10) (kandidaat template)
- **Test een geladen stand met een init-script, niet erna.** Een pagina die bij sluiten opslaat overschrijft handmatig aangepaste opslag bij herladen. (Starlite, 2026-10)
