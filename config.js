// ==========================================================
// CONFIGURAZIONE TIMELINE — foto, testo e sincronizzazione
// ==========================================================
//
// Per ogni step scrivi "at": il minuto e secondo (formato "mm.ss",
// due cifre per i secondi) in cui quella foto o quel testo deve
// APPARIRE nella canzone. Esempi: "0.00" = inizio, "0.08" = 8 secondi,
// "1.05" = 1 minuto e 5 secondi, "2.30" = 2 minuti e 30 secondi.
//
// Non serve calcolare le pause a mano: la durata di ogni step viene
// calcolata automaticamente come differenza rispetto al successivo
// (l'ultimo step dura fino alla fine della canzone, poi si ricomincia
// in loop insieme alla musica).
//
// Gli step vanno scritti IN ORDINE crescente di tempo.
//
// Due tipi di step:
//
//  1) FOTO:
//     { photo: 5, at: "0.33" }
//     Mostra "photos/foto-05.jpg" a partire dal secondo indicato.
//     Il numero "photo" corrisponde al nome file foto-NN.jpg.
//
//  2) TESTO:
//     { text: "Tanti auguri Peppino!", at: "1.12" }
//     Mostra una schermata con sfondo scuro e scritta color oro
//     a partire dal secondo indicato. Puoi inserirne quante ne vuoi,
//     in qualsiasi punto della timeline.
//
// Esempio con un testo inserito tra due foto:
//   { photo: 12, at: "1.30" },
//   { text: "40 anni di sorrisi", at: "1.38" },
//   { photo: 13, at: "1.45" },

const TIMELINE = [
  { photo: 1,  at: "0.00" },
  { photo: 2,  at: "0.08" },
  { photo: 3,  at: "0.16" },
  { photo: 4,  at: "0.25" },
  { photo: 5,  at: "0.33" },
  { photo: 6,  at: "0.41" },
  { photo: 7,  at: "0.49" },
  { photo: 8,  at: "0.57" },
  { photo: 9,  at: "1.06" },
  { photo: 10, at: "1.14" },
  { photo: 11, at: "1.22" },
  { photo: 12, at: "1.30" },
  { photo: 13, at: "1.38" },
  { photo: 14, at: "1.46" },
  { photo: 15, at: "1.55" },
  { photo: 16, at: "2.03" },
  { photo: 17, at: "2.11" },
  { photo: 18, at: "2.19" },
  { photo: 19, at: "2.27" },
  { photo: 20, at: "2.36" },
  { photo: 21, at: "2.44" },
  { photo: 22, at: "2.52" },
  { photo: 23, at: "3.00" },
  { photo: 24, at: "3.08" },
  { photo: 25, at: "3.17" },
  { photo: 26, at: "3.25" },
  { photo: 27, at: "3.33" },
  { photo: 28, at: "3.41" }
];

// Percorso del file mp3 in audio/. Lascialo vuoto ("") per provare
// lo slideshow senza audio (in quel caso il loop dura fino all'ultimo
// "at" + qualche secondo, poi ricomincia).
const AUDIO_FILE = "audio/viaggio-con-te.mp3";
