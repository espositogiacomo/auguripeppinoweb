# Correzione fotografica conservativa

Script di sviluppo (non fa parte del sito pubblicato) per generare versioni
corrette delle foto in `photos/`, mantenendo intatti gli originali.

**Nessuna modifica di contenuto**: solo regolazioni globali e non distruttive
(esposizione, contrasto, vibrance, nitidezza molto leggera, riduzione rumore
moderata). Nessun face enhancement, nessun generative fill, nessuna
ricostruzione di dettagli. Ogni foto viene valutata singolarmente
(luminosità, contrasto, dominante cromatica) e corretta solo parzialmente
(mai una normalizzazione piena) per restare fedele all'originale.

**Nota (lezione imparata)**: una prima versione includeva anche un
bilanciamento del bianco automatico (gray-world, parziale). E' stato
rimosso perche' su foto con un soggetto molto saturo (es. un vestito rosso
vivo) scambiava quel colore per una dominante cromatica e lo desaturava
visibilmente — un effetto collaterale reale, notato confrontando le foto
affiancate. Meglio lasciare l'eventuale dominante calda di una vecchia
stampa piuttosto che rischiare di alterare un colore vero: la fedeltà
all'originale viene prima dell'uniformità estetica.

## Uso

```bash
npm install
node analyze.js    # stampa dimensioni/luminanza/contrasto/dominante per ogni foto (analysis.json)
node optimize.js    # genera le versioni corrette in photos/optimized/ (report.json)
```

## Rollback

In `config.js` la costante `PHOTOS_DIR` indica da quale cartella il sito
carica le foto. Per tornare agli originali basta cambiarla da
`"photos/optimized"` a `"photos"`.
