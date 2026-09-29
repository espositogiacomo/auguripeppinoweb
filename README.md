# Pagina auguri con foto e musica

Pagina web statica: mostra una serie di foto a scorrimento automatico, con testi personalizzati (sfondo scuro, scritta color oro) intervallati alle foto, e una canzone mp3 in sottofondo. Pensata per essere aperta tramite QR code, ad esempio da smartphone.

## 1. Aggiungere/modificare foto, testi, tempi e audio

Tutto si gestisce da un unico file: [config.js](config.js).

- Le foto vanno nella cartella [photos/](photos), con nome `foto-01.jpg`, `foto-02.jpg`, ecc.
- Il file audio mp3 va nella cartella [audio/](audio).
- In `config.js` trovi la `TIMELINE`: l'elenco degli step mostrati in sequenza, ciascuno con la propria `duration` (pausa in secondi, anche con decimali) — usa queste durate per sincronizzare le foto con la musica.
  - Uno step foto: `{ photo: 5, duration: 4 }` → mostra `photos/foto-05.jpg` per 4 secondi.
  - Uno step testo: `{ text: "Tanti auguri!", duration: 3 }` → mostra una schermata con sfondo scuro e scritta color oro per 3 secondi. Puoi inserirne quante vuoi, in qualsiasi punto della timeline.
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
- Lo slideshow (foto + testi) è in loop continuo, così come l'audio.
- Ogni step della `TIMELINE` in [config.js](config.js) ha la sua durata: modificale singolarmente per sincronizzare con la musica.
