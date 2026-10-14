# template-repo

Het fundament waar elke nieuwe app mee start (en later Glio). Een nieuwe app begint niet vanaf nul.

## Gebruik
1. Klik op **Use this template** op GitHub en maak een nieuwe (privé) repo.
2. Open de repo in Claude Code en typ een gewoon bericht met "start project" en de handoff (met de ingevulde vragenlijst) eronder. Dat werkt het best, want een slash-commando accepteert geen opmaak. Mag ook: `/start @handoff.md`, met de handoff als bestand. Zonder ingevulde vragenlijst stopt de agent. Daarna richt de agent de repo in. De stappen staan in `AGENTS.md`, sectie "Start project".

## Een PR testen
PR's testen gaat met `test-pr` uit de repo `workspace-repo` (`Aeroscoop/workspace-repo`). Daar staat ook `setup`, dat een computer klaarzet. Hoe je ze gebruikt, staat in de README van die repo. Een app hoeft alleen een `dev.txt` te hebben; dat bestand staat in deze template.

## Bestanden
- `KOMPAS.md`: waar dit project heen gaat; eerste instructie voor mens en agent.
- `PRINCIPES.md`: vaste principes voor elke app.
- `VRAGENLIJST.md`: invullijst die de start van een app vormt.
- `AGENTS.md`: werkregels voor AI-agents.
- `CLAUDE.md`: laadt `AGENTS.md`, `KOMPAS.md` en `PRINCIPES.md` in Claude Code.
- `.claude/commands/start.md`: maakt `/start` mogelijk in Claude Code; verwijst naar `AGENTS.md`.
- `dev.txt`: hoe je de app test en start, per platform. In de template is dat een kleine controle of de vaste bestanden er zijn.
- `LESSEN.md`: lessen uit eerdere projecten.
- `.gitignore`: sluit geheimen (`.env`, behalve `.env.example`), OS-bestanden en editormappen uit. Stack-neutraal; een nieuwe app vult hem aan.
- `.github/workflows/gitleaks.yml`: zoekt bij elke push en PR naar geheimen in de code.
- `.github/dependabot.yml`: houdt GitHub Actions up-to-date.
