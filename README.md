# Pagina auguri con foto e musica

Pagina web statica: mostra una serie di foto a scorrimento automatico (ogni 5 secondi) con una canzone mp3 in sottofondo. Pensata per essere aperta tramite QR code, ad esempio da smartphone.

## 1. Aggiungere le foto e l'audio

1. Copia le tue foto nella cartella [photos/](photos) (formati jpg/png). Rinominale come preferisci.
2. Copia il file audio mp3 nella cartella [audio/](audio).
3. Apri [config.js](config.js) e aggiorna:
   - l'elenco `PHOTOS` con i percorsi dei file che hai copiato (es. `"photos/nome-foto.jpg"`);
   - `AUDIO_FILE` con il percorso del tuo mp3 (es. `"audio/nome-canzone.mp3"`).

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
- Lo slideshow è in loop continuo, così come l'audio.
- Per cambiare la velocità di scorrimento, modifica `SLIDE_INTERVAL_MS` in [config.js](config.js) (valore in millisecondi, 5000 = 5 secondi).
