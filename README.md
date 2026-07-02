# Website Coiffure De Zaat

Astro-project, statische output. Designtaal: fase 6 "premium" (zie fase-6-benchmark-highend.md).

## Structuur

```
src/data/        ← ALLE content: teksten, prijzen, team, uren. Hier aanpassen, nooit in componenten.
src/styles/      ← tokens.css (kleuren/typografie/ritme) + global.css (basisklassen)
src/components/  ← Header, Footer, Hero, Split, TeamGrid
src/layouts/     ← Base.astro: meta's, Open Graph, HairSalon structured data
src/pages/       ← één bestand per pagina
src/scripts/     ← beweging.js: reveal (één keer) + parallax, respecteert reduced-motion
public/beelden/  ← afbeeldingen
dist/            ← gebouwde site (niet handmatig aanpassen)
```

## Lokaal bekijken

```bash
npm install
npm run dev        # dev-server op localhost:4321
npm run build      # statische build naar dist/
npm run preview    # gebouwde versie bekijken
```

Zonder node: open dist/index.html na een build (paden zijn absoluut, gebruik een simpele webserver: `npx serve dist`).

## Content aanpassen

- Prijzen: `src/data/prijzen.json`
- Team(volgorde, rollen, wie op de homepage): `src/data/team.json`
- Uren, adres, telefoon, boeklink: `src/data/site.json`
- Openstaand: annulatietermijn staat op 48u (Salonkee-waarde); bevestigen met salon.
