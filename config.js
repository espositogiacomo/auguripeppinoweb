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
  { photo: 30, at: "0.05", text: ""},
  { photo: 29, at: "0.10", text: ""},
  { photo: 2,  at: "0.15", text: ""},
  { photo: 6,  at: "0.20", text: "" },
  { photo: 3,  at: "0.28", text: "" },
  { photo: 4,  at: "0.32", text: "Ma la vita l'hai insegnata tu" },
  { photo: 5,  at: "0.37", text: "Ogni giorno un po' di più" },
  { photo: 7,  at: "0.40", text: "Con quegli occhi innamorati tuoi" },
  { photo: 8,  at: "0.44", text: "Di due figlie matte come noi" },
  { photo: 9,  at: "0.48", text: "Cosa non darei" },
  { photo: 10, at: "0.55", text: "perché il tempo Non ci invecchi mai" },
  { photo: 11, at: "0.58", text: "" },
  { photo: 12, at: "1.02", text: "" },
  { photo: 13, at: "1.07", text: "" },
  { photo: 14, at: "1.09", text: "Ho imparato il mio coraggio" },
  { photo: 16, at: "1.13", text: "" },
  { photo: 17, at: "1.15", text: "E ho diviso la strada e l'allegria" },
  { photo: 19, at: "1.20", text: "La tua forza la tua malinconia" },
  { photo: 15, at: "1.30", text: "" },
  { photo: 32, at: "1.40", text: ""},  
  { photo: 20, at: "1.48", text: "Cosa non farei per ridarti il tempo perso ormai" },
  { photo: 21, at: "1.58", text: "Ho imparato ad amare come te" },
  { photo: 22, at: "2.02", text: "Questa vita rischiando tutta me" },
  { photo: 23, at: "2.07", text: "Ho imparato il tuo coraggio" },
  { photo: 34, at: "2.09", text: "" },
  { photo: 35, at: "2.10", text: "" },
  { photo: 24, at: "2.12", text: "" },
  { photo: 25, at: "2.13", text: "E ho capito la timida follia Del tuo essere unico perché " },
  { photo: 26, at: "2.21", text: "Sei la meta del mio viaggio per me E così .... Sempre di più " },
  { photo: 28,  at: "2.34", text: "Somiglio a te Nei tuoi sorrisi E nelle lacrime"},
  { photo: 27, at: "2.52", text: "E ho imparato ad amare e credere Nella vita rischiando tutta me E ho diviso questo viaggio con te Io con te" },
  { photo: 33,  at: "3.05", text: ""},
  { photo: 31,  at: "3.10", text: "Ti voglio bene Papà!"}
];

// Percorso del file mp3 in audio/. Lascialo vuoto ("") per provare
// lo slideshow senza audio (in quel caso il loop dura fino all'ultimo
// "at" + qualche secondo, poi ricomincia).
const AUDIO_FILE = "audio/viaggio-con-te.mp3";

// Aiuto visuale per sincronizzare foto e testi: mostra vicino al tasto
// pausa il numero della foto corrente e il tempo trascorso (mm:ss),
// aggiornato in tempo reale insieme alla progress bar. Utile solo in
// fase di messa a punto della TIMELINE: metti a "false" per nasconderlo
// quando la sincronizzazione e' definitiva.
const SHOW_DEBUG_INFO = true;

// Cartella da cui vengono caricate le foto. Le versioni in "photos/optimized"
// sono corrette globalmente (esposizione, contrasto, bilanciamento del
// bianco, leggera nitidezza) ma identiche nel contenuto agli originali,
// che restano intatti in "photos/". Per tornare alle foto originali basta
// rimettere "photos".
const PHOTOS_DIR = "photos/optimized";

// Aiuto visuale per controllare la correzione fotografica: se "true",
// ogni foto viene mostrata affiancata alla sua versione originale
// (sinistra = originale, destra = ottimizzata), per confrontarle a colpo
// d'occhio. Utile solo in fase di verifica: metti a "false" per tornare
// alla visualizzazione normale (una foto sola, quella di PHOTOS_DIR).
const SHOW_COMPARISON = true;

// Effetto coriandoli sulla prima foto (il brindisi). Parte una sola volta
// per visualizzazione della pagina, da entrambi gli angoli inferiori.
const CONFETTI = {
  enabled: true,       // metti "false" per disattivare del tutto l'effetto

  burstCount: 3,       // quanti piccoli lanci consecutivi
  burstDelayMs: 250,   // pausa tra un lancio e il successivo (millisecondi)
  initialDelayMs: 400, // attesa prima del primo lancio quando la pagina e' pronta

  particleCount: 30,   // coriandoli per lato, per ogni lancio
  spread: 70,          // ampiezza del ventaglio, in gradi (piu' alto = piu' largo)

  startVelocity: 45,   // spinta iniziale: piu' alto = arrivano piu' in alto/lontano dal centro
  gravity: 1,          // quanto scendono velocemente: piu' basso = restano su piu' a lungo
  decay: 0.9,          // quanto rallentano nel tempo (0-1): piu' vicino a 1 = volano piu' a lungo
  ticks: 200,          // "fotogrammi" di vita di ogni coriandolo: piu' alto = dura di piu' prima di sparire

  scalar: 1,           // dimensione dei coriandoli (1 = normale, 1.5 = piu' grandi, 0.7 = piu' piccoli)
  colors: undefined,   // es. ["#ffcc00", "#ffffff", "#ff6699"] per colori personalizzati; undefined = colori predefiniti
};
