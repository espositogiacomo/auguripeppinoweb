# Auguri Peppino — pagina web di compleanno

Sito statico (HTML + CSS + JS vanilla, nessun framework/bundler) che mostra
uno slideshow di foto sincronizzato con una canzone mp3, con didascalie,
tasto play/pausa, progress bar interattiva ed effetto coriandoli. Pubblicato
gratis su GitHub Pages.

**Repo**: https://github.com/espositogiacomo/auguripeppinoweb
**Live**: https://espositogiacomo.github.io/auguripeppinoweb/
**Account GitHub**: `espositogiacomo` (username), email `espositogiacomo@gmail.com`

## File principali

- [index.html](index.html) — struttura pagina (overlay di avvio, slideshow, didascalia, tasto play/pausa, progress bar, debug info)
- [style.css](style.css) — tutto lo stile, incluse le animazioni (fade, comparsa/scomparsa a fumo, pulsazione)
- [config.js](config.js) — **unico file che l'utente deve modificare** per contenuto/timing (vedi sotto)
- [script.js](script.js) — tutta la logica: costruzione slide, sincronizzazione col tempo audio, scrubbing, pausa, coriandoli
- [photos/](photos) — foto originali, numerate `foto-01.jpg` ... (numerazione attuale: **fino a foto-53.jpg**; foto-32 e foto-36…41 rimosse di proposito, la sequenza ha dei buchi)
- [photos/optimized/](photos/optimized) — foto con correzione fotografica conservativa (vedi sotto), stessi nomi file, usate dal sito
- [audio/viaggio-con-te.mp3](audio) — traccia audio
- [tools/optimize-photos/](tools/optimize-photos) — script Node/Sharp per generare `photos/optimized/` dagli originali

## config.js — cosa contiene

- `TIMELINE`: array ordinato per tempo crescente. Ogni voce: `{ photo: N, at: "mm.ss", text: "..." (opzionale) }`.
  `at` è il momento della canzone in cui la foto deve apparire; la durata di visualizzazione si calcola da sola come
  differenza col prossimo `at` (l'ultima dura fino alla fine della canzone, poi loop). `text` è una didascalia opzionale
  mostrata sotto la foto con animazione a effetto fumo.
  **Stato attuale**: la TIMELINE (40 voci) usa quasi tutte le foto, incluse le nuove 44-53; verificare nel file quali
  restano fuori.
- `AUDIO_FILE`: percorso mp3, oppure `""` per provare senza audio (fallback a un clock manuale).
- `SHOW_DEBUG_INFO`: se `true`, mostra vicino al tasto pausa "Foto NN · m:ss" per aiutare a sincronizzare la TIMELINE
  con la canzone (attivo di default, per ora — l'utente potrebbe volerlo disattivare quando ha finito i tarocchi).
- `PHOTOS_DIR`: `"photos/optimized"` normalmente; mettere `"photos"` per tornare agli originali non ritoccati (rollback
  immediato, un solo valore da cambiare).
- `SHOW_COMPARISON`: se `true` (attivo per ora, su richiesta), ogni slide mostra affiancate originale (sinistra) e
  ottimizzata (destra) con etichette, per verificare a colpo d'occhio la correzione fotografica. E' un aiuto
  temporaneo come `SHOW_DEBUG_INFO`: quando l'utente ha finito di controllare, va rimesso a `false`.
- `CONFETTI`: parametri dell'effetto coriandoli sulla prima foto (enabled, burstCount, burstDelayMs, initialDelayMs,
  particleCount, spread, startVelocity, gravity, decay, ticks, scalar, colors).

## script.js — logica chiave

- Il carousel **non usa timer indipendenti**: `tick()` (via `requestAnimationFrame`) legge `audio.currentTime` a ogni
  frame e mostra lo step della TIMELINE corrispondente — resta sempre in fase con la musica, anche dopo molti loop o
  dopo aver trascinato la progress bar.
- La progress bar (`#progress-bar`) è trascinabile (pointer events) per saltare a qualsiasi punto.
- Il tasto play/pausa (`#play-pause-button`) mette in pausa sia audio che slideshow insieme. Le icone sono disegnate in
  CSS (`.icon-play`/`.icon-pause`), non emoji, per colore coerente su ogni piattaforma.
- `playConfetti()` è isolata dal resto della logica, con guardia `confettiPlayed` per farla partire una sola volta a
  visualizzazione di pagina. Libreria `canvas-confetti` caricata via CDN in `index.html` (nessuna dipendenza npm nel
  sito pubblicato).

## Foto: correzione fotografica (tools/optimize-photos/)

Vincolo assoluto rispettato: **nessuna alterazione del contenuto** (niente face enhancement/restoration, niente
generative fill, niente ricostruzione di dettagli). Solo correzioni globali non distruttive via Sharp: esposizione,
contrasto, vibrance leggera, nitidezza molto leggera, riduzione rumore moderata — tutte calcolate per-immagine dai
dati misurati (luminanza, deviazione standard, dominante cromatica) e applicate solo parzialmente (mai una
normalizzazione piena), per restare fedeli all'originale. Dettagli e parametri esatti in
[tools/optimize-photos/README.md](tools/optimize-photos/README.md) e [optimize.js](tools/optimize-photos/optimize.js).

**Lezione imparata (importante)**: una prima versione includeva anche un bilanciamento del bianco automatico
(gray-world parziale). E' stato **rimosso** dopo un controllo visivo con `SHOW_COMPARISON`: su foto con un soggetto
molto saturo (es. un vestito rosso vivo) l'algoritmo scambiava quel colore per una dominante cromatica e lo
desaturava visibilmente, tradendo il vincolo di fedeltà. Se in futuro si reintroduce una correzione del bilanciamento
del bianco, va gestita con grande cautela (es. non basarsi solo sulla media dei canali RGB dell'intera immagine) e
va sempre riverificata foto per foto con `SHOW_COMPARISON` prima di pubblicare.

**Rigenerare dopo aver aggiunto nuove foto**:
```bash
cd tools/optimize-photos
npm install   # solo la prima volta
node optimize.js
```
Rielabora TUTTE le foto in `photos/*.jpg` e scrive in `photos/optimized/` (stesso nome file, sovrascrive). Gli
originali in `photos/` non vengono mai toccati.

**Nota**: nella cartella `photos/` a volte finiscono file `WhatsApp Image ....jpeg` residui (dal salvataggio diretto da
WhatsApp) — vanno rinominati in `foto-NN.jpg` (prossimo numero libero, in ordine di `LastWriteTime`) prima di
lanciare l'ottimizzazione, altrimenti lo script li ignora (filtra solo `foto-*.jpg`).

## Pubblicazione (GitHub Pages)

Non è installato `gh` (GitHub CLI) in questo ambiente. Il deploy avviene con un **token di accesso personale
fine-grained** (repo `auguripeppinoweb`, permessi Contents read/write + Pages read/write), usato solo inline nel
comando `git push` (mai salvato in `.git/config`). Il token è salvato in `C:\dev\_secrets\github\auguripeppinoweb-pat.txt`
(scadenza breve, ~7 giorni dalla generazione — se scaduto, chiedere all'utente di generarne uno nuovo con le stesse
istruzioni: Settings → Developer settings → Personal access tokens → Fine-grained → repo `auguripeppinoweb` →
Contents+Pages read/write).

```bash
git add -A
git commit -m "..."
git push "https://espositogiacomo:<TOKEN>@github.com/espositogiacomo/auguripeppinoweb.git" main:main
```

GitHub Pages è già attivo (branch `main`, root) — non serve riconfigurarlo. Dopo il push, la pagina live si aggiorna
in 1-2 minuti.

## Prima di ogni pubblicazione, verificare sempre

1. `config.js` è JS valido (una virgola dimenticata ha già rotto la pagina una volta) — controllare con:
   ```bash
   node -e "require('./config.js')" # oppure eval come negli script precedenti
   ```
2. La `TIMELINE` è in ordine crescente di `at` e ogni `photo: N` referenziato esiste in `photos/optimized/foto-NN.jpg`.
3. Testare in locale col dev server (`.claude/launch.json` già configurato, `preview_start` su "auguripeppinoweb",
   python `http.server` sulla porta 8080) prima di pushare: cliccare start, verificare che tutte le immagini carichino
   (`naturalWidth !== 0`), controllare la console per errori.

## Cose da sapere / avvertenze per una nuova sessione

- L'utente modifica spesso `config.js` direttamente (timing, foto, testi) e poi chiede solo "aggiorna/pubblica" — in
  quel caso: validare (virgole, ordine, file esistenti), testare in locale, poi commit+push.
- Quando l'utente carica nuove foto, spesso arrivano come `WhatsApp Image ... .jpeg` — rinominarle in `foto-NN.jpg`
  proseguendo la numerazione esistente, poi rilanciare `node optimize.js`.
- I flag `SHOW_DEBUG_INFO` e `SHOW_COMPARISON` in `config.js` sono aiuti temporanei (sincronizzazione timeline e
  verifica della correzione fotografica): non disattivarli di propria iniziativa, ma e' lecito ricordare all'utente
  di rimetterli a `false` quando sembrano ormai aver esaurito il loro scopo.
- Non modificare mai gli originali in `photos/` — solo `photos/optimized/` viene rigenerato dallo script.
