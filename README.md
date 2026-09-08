# enricoavagliano.com — PWA (scaffold)

Ricostruzione del sito come Progressive Web App: Next.js 14 (App Router) +
`next-pwa` per installabilità e cache offline. Stesso stack di
`diari-pesca-app`, per coerenza tecnica tra i due progetti.

## Cosa c'è già

- Home, `/blog` (elenco articoli filtrabile per categoria), `/blog/[slug]`
  (pagina singolo articolo), `/chi-sono`, `/contatti`, `/diari-di-pesca`
  (rimanda all'app companion)
- Manifest PWA + icone segnaposto (installabile su Android/iOS/desktop)
- Service worker via `next-pwa`: cache "network-first" delle pagine visitate,
  quindi consultabili anche offline dopo la prima visita
- Identità visiva dedicata (non un template): palette blu-petrolio/carta/ocra,
  Fraunces + Inter, elenco articoli in stile "registro di pesca"

## Cosa manca prima di pubblicare

1. **Contenuti reali**: `lib/articles.ts` contiene solo 3 voci segnaposto.
   Vanno importati i 54 articoli reali (già mappati altrove) — o via file
   JSON statico, o collegando un CMS headless, o leggendo direttamente dal
   sitemap del sito attuale.
2. **Icone vere**: sostituire i 3 PNG in `public/icons/` con un logo reale
   (192×192, 512×512, 512×512 maskable).
3. **Notifiche push**: il service worker di `next-pwa` gestisce solo cache
   offline. Le notifiche push richiedono un pezzo separato — chiavi VAPID,
   un endpoint backend per salvare le iscrizioni, e la chiamata
   `pushManager.subscribe()` lato client. Non ancora implementato in questo
   scaffold: lo aggiungo alla prossima sessione se confermi che ti serve
   davvero a lancio (altrimenti si può aggiungere in un secondo momento senza
   toccare il resto del sito).
4. **Banner "Aggiungi a Home" per iOS**: come nell'app Diari di Pesca, Safari
   non mostra il prompt automatico — va aggiunto un banner custom.

## Sviluppo locale

```bash
npm install
npm run dev
```

## Deploy

Pensato per Vercel (stesso hosting di diari-pesca-app):

```bash
npm i -g vercel
vercel
```

