# Pagina auguri con foto e musica

Pagina web statica: mostra una serie di foto a scorrimento automatico, con didascalie opzionali (sfondo scuro, scritta color oro, animazione a effetto fumo) sotto le foto che lo richiedono, e una canzone mp3 in sottofondo. Include un tasto play/pausa. Pensata per essere aperta tramite QR code, ad esempio da smartphone.

## 1. Aggiungere/modificare foto, didascalie, tempi e audio

Tutto si gestisce da un unico file: [config.js](config.js).

- Le foto vanno nella cartella [photos/](photos), con nome `foto-01.jpg`, `foto-02.jpg`, ecc.
- Il file audio mp3 va nella cartella [audio/](audio).
- In `config.js` trovi la `TIMELINE`: l'elenco delle foto mostrate in sequenza. Per ognuna scrivi `at`, il minuto e secondo della canzone in cui deve apparire (formato `"mm.ss"`, es. `"1.05"` = 1 minuto e 5 secondi). Le pause vengono calcolate automaticamente come differenza tra un `at` e il successivo — non serve fare i calcoli a mano.
  - Una foto semplice: `{ photo: 5, at: "0.33" }` → mostra `photos/foto-05.jpg` a partire dal secondo 33, senza scritta.
  - Una foto con didascalia: `{ photo: 13, at: "1.38", text: "40 anni di sorrisi" }` → la scritta compare/scompare con un'animazione a effetto fumo insieme a quella foto. Basta aggiungere o togliere `text` per mostrarla o no.
  - Le foto vanno scritte in ordine crescente di tempo. L'ultima dura fino alla fine della canzone, poi lo slideshow ricomincia in loop insieme alla musica.
- `AUDIO_FILE`: percorso del tuo mp3 (es. `"audio/nome-canzone.mp3"`). Lascialo vuoto (`""`) se non hai ancora il file.
- `CONFETTI`: parametri dell'effetto coriandoli sulla prima foto (quella del brindisi) — quante volte lanciarli, ogni quanto, quanti coriandoli, quanto in alto/lontano arrivano (`startVelocity`/`gravity`), quanto durano (`decay`/`ticks`), dimensione e colori. Metti `enabled: false` per disattivarlo del tutto.
- `PHOTOS_DIR`: cartella da cui vengono caricate le foto. Di norma `"photos/optimized"` (versioni con correzione fotografica leggera — vedi [tools/optimize-photos/](tools/optimize-photos)); per tornare agli scatti originali basta rimettere `"photos"`.

Non serve toccare nessun altro file.

## 2. Provare in locale

Apri semplicemente [index.html](index.html) con il browser (doppio click) per vedere l'anteprima. Al primo click sul pulsante "Tocca per iniziare" partono musica e slideshow (i browser bloccano l'autoplay con audio finché l'utente non interagisce con la pagina: per questo c'è il pulsante iniziale).

## 3. Pubblicare gratis su GitHub Pages

1. Crea un account su [github.com](https://github.com) se non ne hai già uno.
2. Crea un nuovo repository (es. `auguripeppinoweb`), pubblico.
3. Dal terminale, nella cartella del progetto:

   ```bash
   git init
   git add .
   git commit -m "Prima versione pagina auguri"
   git branch -M main
   git remote add origin https://github.com/TUO-USERNAME/auguripeppinoweb.git
   git push -u origin main
   ```

4. Su GitHub vai su **Settings → Pages**, in "Branch" seleziona `main` e cartella `/ (root)`, poi salva.
5. Dopo qualche minuto la pagina sarà online su:
   `https://TUO-USERNAME.github.io/auguripeppinoweb/`

## 4. Generare il QR code

Usa un generatore gratuito online (es. cerca "QR code generator" sul tuo motore di ricerca preferito) e incolla l'URL della pagina GitHub Pages ottenuto al punto precedente. Scarica l'immagine del QR e stampala o condividila.

## Note

- Le foto vengono mostrate mantenendo le proporzioni (senza deformarle) su sfondo nero, allineate in alto (utile soprattutto per le foto verticali su schermi di telefono).
- Lo slideshow è sincronizzato sul tempo effettivo della canzone (non su timer separati), quindi resta in fase con l'audio anche dopo molti loop.
- Il tasto in basso mette in pausa/riavvia sia la musica sia lo slideshow.
- Per cambiare quando appare una foto, modifica il suo `at` in [config.js](config.js): la durata di visualizzazione si aggiorna da sola.
