// ==========================================================
// CONFIGURAZIONE TIMELINE — foto, testo e tempi (in secondi)
// ==========================================================
//
// La TIMELINE e' l'elenco di "step" mostrati in sequenza, uno dopo
// l'altro, nell'ordine in cui li scrivi qui sotto. Ogni step ha una
// sua "duration" (pausa in secondi, anche con decimali, es. 3.5)
// che puoi modificare per sincronizzare lo slideshow con la musica.
//
// Due tipi di step:
//
//  1) FOTO:
//     { photo: 5, duration: 4 }
//     Mostra "photos/foto-05.jpg" per 4 secondi.
//     Il numero "photo" corrisponde al nome file foto-NN.jpg.
//
//  2) TESTO:
//     { text: "Tanti auguri Peppino!", duration: 3 }
//     Mostra una schermata con sfondo scuro e scritta color oro
//     per 3 secondi. Puoi inserirne quante ne vuoi, in qualsiasi
//     punto della timeline, anche una dopo l'altra.
//
// Esempio con un testo inserito tra due foto:
//   { photo: 12, duration: 4 },
//   { text: "40 anni di sorrisi", duration: 3 },
//   { photo: 13, duration: 4 },

const TIMELINE = [
  { photo: 1,  duration: 5 },
  { photo: 2,  duration: 5 },
  { photo: 3,  duration: 5 },
  { photo: 4,  duration: 5 },
  { photo: 5,  duration: 5 },
  { photo: 6,  duration: 5 },
  { photo: 7,  duration: 5 },
  { photo: 8,  duration: 5 },
  { photo: 9,  duration: 5 },
  { photo: 10, duration: 5 },
  { photo: 11, duration: 5 },
  { photo: 12, duration: 5 },
  { photo: 13, duration: 5 },
  { photo: 14, duration: 5 },
  { photo: 15, duration: 5 },
  { photo: 16, duration: 5 },
  { photo: 17, duration: 5 },
  { photo: 18, duration: 5 },
  { photo: 19, duration: 5 },
  { photo: 20, duration: 5 },
  { photo: 21, duration: 5 },
  { photo: 22, duration: 5 },
  { photo: 23, duration: 5 },
  { photo: 24, duration: 5 },
  { photo: 25, duration: 5 },
  { photo: 26, duration: 5 },
  { photo: 27, duration: 5 },
  { photo: 28, duration: 5 }
];

// Lascia vuoto ("") finché non carichi l'mp3 in audio/: la pagina
// funziona comunque senza audio. Quando aggiungi il file, scrivi qui
// il percorso, es. "audio/canzone.mp3".
const AUDIO_FILE = "audio/viaggio-con-te.mp3";
