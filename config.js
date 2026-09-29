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
  { photo: 1,  at: "0.00", text: "Auguri Papà!" },
  { photo: 2,  at: "0.08", text: ""},
  { photo: 3,  at: "0.17", text: "" },
  { photo: 4,  at: "0.25", text: "Ma la vita l'hai insegnata tu" },
  { photo: 5,  at: "0.34", text: "Ogni giorno un po' di più" },
  { photo: 6,  at: "0.42", text: "" },
  { photo: 7,  at: "0.51", text: "Con quegli occhi innamorati tuoi" },
  { photo: 8,  at: "0.59", text: "Di due figlie matte come noi" },
  { photo: 9,  at: "1.08", text: "" },
  { photo: 10, at: "1.16", text: "Cosa non darei perché il tempo Non ci invecchi mai" },
  { photo: 11, at: "1.25", text: "" },
  { photo: 12, at: "1.33", text: "" },
  { photo: 13, at: "1.42", text: "" },
  { photo: 14, at: "1.50", text: "Ho imparato il mio coraggio" },
  { photo: 15, at: "1.59", text: "" },
  { photo: 16, at: "2.07", text: "" },
  { photo: 17, at: "2.16", text: "E ho diviso la strada e l'allegria" },
  { photo: 18, at: "2.24", text: "" },
  { photo: 19, at: "2.33", text: "La tua forza la tua malinconia" },
  { photo: 20, at: "2.41", text: "Cosa non farei per ridarti il tempo perso ormai" },
  { photo: 21, at: "2.50", text: "Ho imparato ad amare come te" },
  { photo: 22, at: "2.58", text: "Questa vita rischiando tutta me Ho imparato il tuo coraggio" },
  { photo: 23, at: "3.07", text: "" },
  { photo: 24, at: "3.15", text: "" },
  { photo: 25, at: "3.24", text: "E ho capito la timida follia Del tuo essere unico perché Sei la meta del mio viaggio per me E così .... Sempre di più Somiglio a te Nei tuoi sorrisi E nelle lacrime" },
  { photo: 26, at: "3.32", text: "" },
  { photo: 27, at: "3.41", text: "E ho imparato ad amare e credere Nella vita rischiando tutta me E ho diviso questo viaggio con te Io con te" }
];

// Percorso del file mp3 in audio/. Lascialo vuoto ("") per provare
// lo slideshow senza audio (in quel caso il loop dura fino all'ultimo
// "at" + qualche secondo, poi ricomincia).
const AUDIO_FILE = "audio/viaggio-con-te.mp3";
