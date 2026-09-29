// ==========================================================
// CONFIGURAZIONE TIMELINE — foto, testo e sincronizzazione
// ==========================================================
//
// Per ogni step scrivi "at": il minuto e secondo (formato "mm.ss",
// due cifre per i secondi) in cui quella foto o quel testo deve
// APPARIRE nella canzone. Esempi: "0.00" = inizio, "0.08" = 8 secondi,
// "1.05" = 1 minuto e 5 secondi, "2.30" = 2 minuti e 30 secondi.
//
// Non serve calcolare le pause a mano: la durata di ogni foto viene
// calcolata automaticamente come differenza rispetto alla successiva
// (l'ultima foto dura fino alla fine della canzone, poi si ricomincia
// in loop insieme alla musica).
//
// Le foto vanno scritte IN ORDINE crescente di tempo.
//
// Ogni riga e' una foto:
//   { photo: 5, at: "0.33" }
//   Mostra "photos/foto-05.jpg" a partire dal secondo indicato.
//   Il numero "photo" corrisponde al nome file foto-NN.jpg.
//
// Per aggiungere una didascalia sotto una foto, aggiungi semplicemente
// "text": apparira' insieme alla foto (con un'animazione a effetto
// fumo) e sparira' quando cambia la foto. Se non scrivi "text", quella
// foto viene mostrata da sola, senza scritta.
//
//   { photo: 12, at: "1.30" },
//   { photo: 13, at: "1.38", text: "40 anni di sorrisi" },
//   { photo: 14, at: "1.45" },

const TIMELINE = [
  { photo: 1,  at: "0.00", text: "Tanti auguri Peppino!" },
  { photo: 2,  at: "0.08" },
  { photo: 3,  at: "0.17" },
  { photo: 4,  at: "0.25" },
  { photo: 5,  at: "0.34" },
  { photo: 6,  at: "0.42" },
  { photo: 7,  at: "0.51" },
  { photo: 8,  at: "0.59" },
  { photo: 9,  at: "1.08" },
  { photo: 10, at: "1.16" },
  { photo: 11, at: "1.25" },
  { photo: 12, at: "1.33" },
  { photo: 13, at: "1.42" },
  { photo: 14, at: "1.50" },
  { photo: 15, at: "1.59" },
  { photo: 16, at: "2.07" },
  { photo: 17, at: "2.16" },
  { photo: 18, at: "2.24" },
  { photo: 19, at: "2.33" },
  { photo: 20, at: "2.41" },
  { photo: 21, at: "2.50" },
  { photo: 22, at: "2.58" },
  { photo: 23, at: "3.07" },
  { photo: 24, at: "3.15" },
  { photo: 25, at: "3.24" },
  { photo: 26, at: "3.32" },
  { photo: 27, at: "3.41" }
];

// Percorso del file mp3 in audio/. Lascialo vuoto ("") per provare
// lo slideshow senza audio (in quel caso il loop dura fino all'ultimo
// "at" + qualche secondo, poi ricomincia).
const AUDIO_FILE = "audio/viaggio-con-te.mp3";
