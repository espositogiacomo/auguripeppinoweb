# Pagina auguri con foto e musica

Pagina web statica: mostra una serie di foto a scorrimento automatico, con testi personalizzati (sfondo scuro, scritta color oro) intervallati alle foto, e una canzone mp3 in sottofondo. Pensata per essere aperta tramite QR code, ad esempio da smartphone.

## 1. Aggiungere/modificare foto, testi, tempi e audio

Tutto si gestisce da un unico file: [config.js](config.js).

- Le foto vanno nella cartella [photos/](photos), con nome `foto-01.jpg`, `foto-02.jpg`, ecc.
- Il file audio mp3 va nella cartella [audio/](audio).
- In `config.js` trovi la `TIMELINE`: l'elenco degli step mostrati in sequenza. Per ognuno scrivi `at`, il minuto e secondo della canzone in cui deve apparire (formato `"mm.ss"`, es. `"1.05"` = 1 minuto e 5 secondi). Le pause vengono calcolate automaticamente come differenza tra un `at` e il successivo — non serve fare i calcoli a mano.
  - Uno step foto: `{ photo: 5, at: "0.33" }` → mostra `photos/foto-05.jpg` a partire dal secondo 33.
  - Uno step testo: `{ text: "Tanti auguri!", at: "1.12" }` → mostra una schermata con sfondo scuro e scritta color oro a partire da quell'istante. Puoi inserirne quanti vuoi, in qualsiasi punto della timeline.
  - Gli step vanno scritti in ordine crescente di tempo. L'ultimo dura fino alla fine della canzone, poi lo slideshow ricomincia in loop insieme alla musica.
- `AUDIO_FILE`: percorso del tuo mp3 (es. `"audio/nome-canzone.mp3"`). Lascialo vuoto (`""`) se non hai ancora il file.

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

- Le foto vengono mostrate mantenendo le proporzioni (senza deformarle) su sfondo nero.
- Lo slideshow (foto + testi) è sincronizzato sul tempo effettivo della canzone (non su timer separati), quindi resta in fase con l'audio anche dopo molti loop.
- Per cambiare quando appare una foto o un testo, modifica il suo `at` in [config.js](config.js): la durata di visualizzazione si aggiorna da sola.
