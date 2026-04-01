'use strict';

// ============================================================
// AUDIO.JS — Elenthyr
// Gestione di tutti i canali audio: musica tematica,
// audio ambientale, voci e voicelines.
// Feedback sonori brevi generati sinteticamente via Web Audio API.
//
// REGOLA FONDAMENTALE Safari iOS:
// Il contesto audio deve essere inizializzato o ripreso
// ESCLUSIVAMENTE in risposta diretta a un gesto esplicito
// dell'utente. Mai in automatico.
//
// Tre canali indipendenti, regolabili separatamente:
//   1. musica      — temi musicali per schermata/luogo
//   2. ambientale  — paesaggi sonori dei luoghi
//   3. voci        — voicelines dei PNG
// ============================================================


// ------------------------------------------------------------
// STATO INTERNO DEL MODULO AUDIO
// ------------------------------------------------------------
let contestoAudio = null;  // AudioContext — inizializzato al primo gesto

const volumeCanali = {
  musica:      0.7,
  ambientale:  0.6,
  voci:        0.8
};

const nodi = {
  musica:     { guadagno: null, sorgente: null },
  ambientale: { guadagno: null, sorgente: null },
  voci:       { guadagno: null, sorgente: null }
};

// Traccia il luogo corrente per gestire le dissolvenze
let luogoCorrenteAudio = null;

// Flag VoiceOver — impostato da ui.js quando rileva il lettore di schermo attivo
let voiceOverAttivo = false;

// Tiene traccia dell'ultimo file riprodotto per ogni PNG+trigger (evita ripetizioni immediate)
const _ultimaVoiceline = new Map();


// ------------------------------------------------------------
// INIZIALIZZAZIONE
// Chiamare esclusivamente da un gestore di evento utente
// (touch, click). Mai in automatico.
// ------------------------------------------------------------
function inizializzaAudio() {
  if (contestoAudio) {
    // Se il contesto esiste ma è sospeso (comportamento iOS),
    // lo riprendiamo
    if (contestoAudio.state === 'suspended') {
      contestoAudio.resume();
    }
    return;
  }

  try {
    const CostruttoreAudio = window.AudioContext || window.webkitAudioContext;
    contestoAudio = new CostruttoreAudio();

    // Crea i nodi di guadagno per ogni canale
    nodi.musica.guadagno     = contestoAudio.createGain();
    nodi.ambientale.guadagno = contestoAudio.createGain();
    nodi.voci.guadagno       = contestoAudio.createGain();

    nodi.musica.guadagno.gain.value     = volumeCanali.musica;
    nodi.ambientale.guadagno.gain.value = volumeCanali.ambientale;
    nodi.voci.guadagno.gain.value       = volumeCanali.voci;

    // Collega tutti i canali alla destinazione finale
    nodi.musica.guadagno.connect(contestoAudio.destination);
    nodi.ambientale.guadagno.connect(contestoAudio.destination);
    nodi.voci.guadagno.connect(contestoAudio.destination);

  } catch (err) {
    console.warn('[Audio] Impossibile inizializzare Web Audio API:', err);
  }
}

// Riprende il contesto se sospeso — chiamare a ogni interazione utente
function riprendi() {
  if (contestoAudio && contestoAudio.state === 'suspended') {
    contestoAudio.resume();
  }
}


// ------------------------------------------------------------
// CONTROLLO VOLUME
// Ogni canale è regolabile indipendentemente.
// valore: 0.0 → 1.0
// ------------------------------------------------------------
function impostaVolume(canale, valore) {
  const valoreClamp = Math.max(0, Math.min(1, valore));
  volumeCanali[canale] = valoreClamp;

  if (contestoAudio && nodi[canale] && nodi[canale].guadagno) {
    // Dissolvenza morbida per evitare click audio
    const tempoRampa = contestoAudio.currentTime + 0.05;
    nodi[canale].guadagno.gain.linearRampToValueAtTime(valoreClamp, tempoRampa);
  }
}

function leggiVolume(canale) {
  return volumeCanali[canale];
}


// ------------------------------------------------------------
// AUDIO AMBIENTALE DEI LUOGHI
// Ogni luogo ha 2-3 varianti di loop che si alternano.
// Le transizioni avvengono con dissolvenza morbida.
//
// NOTA: i file audio sono referenziati per percorso ma
// non ancora presenti. Il sistema si degrada silenziosamente
// se i file non sono disponibili.
// ------------------------------------------------------------

// Mappa luogo → file audio (da completare quando i file saranno disponibili)
const AUDIO_AMBIENTALE = {
  aule:                  ['audio/ambientale/aule-1.mp3', 'audio/ambientale/aule-2.mp3'],
  biblioteca:            ['audio/ambientale/biblioteca-1.mp3', 'audio/ambientale/biblioteca-2.mp3'],
  laboratorioAlchimia:   ['audio/ambientale/alchimia-1.mp3', 'audio/ambientale/alchimia-2.mp3'],
  laboratorioIncantamento: ['audio/ambientale/incantamento-1.mp3', 'audio/ambientale/incantamento-2.mp3'],
  salaRituale:           ['audio/ambientale/rituale-1.mp3', 'audio/ambientale/rituale-2.mp3'],
  cortile:               ['audio/ambientale/cortile-1.mp3', 'audio/ambientale/cortile-2.mp3'],
  torre:                 ['audio/ambientale/torre-1.mp3', 'audio/ambientale/torre-2.mp3'],
  archivioRiservato:     ['audio/ambientale/archivio-1.mp3', 'audio/ambientale/archivio-2.mp3'],
  scavi:                 ['audio/ambientale/scavi-1.mp3']
};

// Avvia l'audio ambientale per un luogo con dissolvenza in entrata
function avviaAmbientale(idLuogo) {
  if (!contestoAudio || luogoCorrenteAudio === idLuogo) return;

  // Prima ferma l'ambientale corrente con dissolvenza
  if (luogoCorrenteAudio) {
    fermaAmbientale();
  }

  luogoCorrenteAudio = idLuogo;
  const files = AUDIO_AMBIENTALE[idLuogo];
  if (!files || files.length === 0) return;

  // Seleziona una variante a caso tra quelle disponibili
  const file = files[Math.floor(Math.random() * files.length)];
  _caricaEAvviaLoop(file, nodi.ambientale.guadagno, 0, 0.8);
}

// Ferma l'audio ambientale con dissolvenza in uscita
function fermaAmbientale() {
  if (!contestoAudio || !nodi.ambientale.sorgente) return;

  const durataDissolvenza = 0.5;
  const tempoFine = contestoAudio.currentTime + durataDissolvenza;

  nodi.ambientale.guadagno.gain.linearRampToValueAtTime(0, tempoFine);

  setTimeout(() => {
    if (nodi.ambientale.sorgente) {
      try { nodi.ambientale.sorgente.stop(); } catch (_) {}
      nodi.ambientale.sorgente = null;
    }
    // Ripristina il volume del canale
    if (nodi.ambientale.guadagno) {
      nodi.ambientale.guadagno.gain.value = volumeCanali.ambientale;
    }
  }, durataDissolvenza * 1000);

  luogoCorrenteAudio = null;
}

// Funzione interna: carica un file audio e lo avvia in loop
function _caricaEAvviaLoop(percorsoFile, nodoDestinazione, guadagnoIniziale, guadagnoFinale) {
  if (!contestoAudio) return;

  fetch(percorsoFile)
    .then(risposta => risposta.arrayBuffer())
    .then(buffer => contestoAudio.decodeAudioData(buffer))
    .then(audioDecodificato => {
      const sorgente = contestoAudio.createBufferSource();
      sorgente.buffer = audioDecodificato;
      sorgente.loop = true;
      sorgente.connect(nodoDestinazione);

      // Dissolvenza in entrata
      nodoDestinazione.gain.value = guadagnoIniziale;
      sorgente.start(0);

      const tempoRampa = contestoAudio.currentTime + 0.5;
      nodoDestinazione.gain.linearRampToValueAtTime(
        guadagnoFinale * volumeCanali.ambientale,
        tempoRampa
      );

      nodi.ambientale.sorgente = sorgente;
    })
    .catch(() => {
      // Il file non è ancora disponibile — fallback silenzioso
    });
}


// ------------------------------------------------------------
// VOICELINES
// Mappa idPng → trigger → lista percorsi MP3.
// Percorsi relativi alla directory di servizio del gioco.
// Solo trigger con audio su disco e corrispondenza confermata.
// ------------------------------------------------------------

const VOICELINES = {
  valdricSonn: {
    apertura_cerimonia: [
      '../Voicelines/VS/Apertura cerimonie/ElevenLabs_2026-03-29T21_36_25_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
      '../Voicelines/VS/Apertura cerimonie/ElevenLabs_2026-03-29T21_38_40_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
      '../Voicelines/VS/Apertura cerimonie/ElevenLabs_2026-03-29T21_40_02_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
    ],
    chiusura_cerimonia: [
      '../Voicelines/VS/Chiusura cerimonie/ElevenLabs_2026-03-29T21_42_50_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
      '../Voicelines/VS/Chiusura cerimonie/ElevenLabs_2026-03-29T21_43_40_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
      '../Voicelines/VS/Chiusura cerimonie/ElevenLabs_2026-03-29T21_45_36_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
    ],
    annuncio_importante: [
      '../Voicelines/VS/Annunci importanti/ElevenLabs_2026-03-29T21_47_55_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
      '../Voicelines/VS/Annunci importanti/ElevenLabs_2026-03-29T21_48_42_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
      '../Voicelines/VS/Annunci importanti/ElevenLabs_2026-03-29T21_49_41_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
    ],
  },
  brennarOstk: {
    intro_seria: [
      '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_00_19_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
      '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_01_01_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
      '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_01_51_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
      '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_02_36_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
    ],
  },
  liviaCauro: {
    intro_seria: [
      '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_09_53_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
      '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_10_31_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
      '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_11_10_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
      '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_11_52_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
    ],
  },
  sevanDrath: {
    intro_seria: [
      '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_34_05_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
      '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_34_38_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
      '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_35_18_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
      '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_35_58_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
    ],
  },
  corneliaVesti: {
    inizio_lezione: [
      '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_17_43_Tripti - Calm and Experienced_pvc_sp95_s30_sb75_se0_b_m2.mp3',
      '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_19_14_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
      '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_19_59_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
      '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_20_40_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
    ],
    fine_lezione: [
      '../Voicelines/CV/Fine lezioni/ElevenLabs_2026-03-29T22_22_47_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
      '../Voicelines/CV/Fine lezioni/ElevenLabs_2026-03-29T22_23_53_Tripti - Calm and Experienced_pvc_sp83_s52_sb75_se0_b_m2.mp3',
      '../Voicelines/CV/Fine lezioni/ElevenLabs_2026-03-29T22_24_31_Tripti - Calm and Experienced_pvc_sp83_s52_sb75_se0_b_m2.mp3',
    ],
  },
  pietroVasso: {
    inizio_lezione: [
      '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_44_15_Jimmy - Plummy, Theatrical and Lively_pvc_sp103_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_45_12_Jimmy - Plummy, Theatrical and Lively_pvc_sp103_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_46_02_Jimmy - Plummy, Theatrical and Lively_pvc_sp103_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_47_25_Jimmy - Plummy, Theatrical and Lively_pvc_sp110_s16_sb100_se0_b_m2.mp3',
    ],
    fine_lezione: [
      '../Voicelines/PV/Fine lezioni/ElevenLabs_2026-03-29T22_49_18_Jimmy - Plummy, Theatrical and Lively_pvc_sp113_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Fine lezioni/ElevenLabs_2026-03-29T22_50_02_Jimmy - Plummy, Theatrical and Lively_pvc_sp113_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Fine lezioni/ElevenLabs_2026-03-29T22_51_42_Jimmy - Plummy, Theatrical and Lively_pvc_sp117_s16_sb100_se0_b_m2.mp3',
    ],
    commento_esperimento: [
      '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_54_00_Jimmy - Plummy, Theatrical and Lively_pvc_sp114_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_55_03_Jimmy - Plummy, Theatrical and Lively_pvc_sp115_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_55_38_Jimmy - Plummy, Theatrical and Lively_pvc_sp115_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_56_34_Jimmy - Plummy, Theatrical and Lively_pvc_sp116_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_57_52_Jimmy - Plummy, Theatrical and Lively_pvc_sp116_s16_sb100_se0_b_m2.mp3',
      '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_58_48_Jimmy - Plummy, Theatrical and Lively_pvc_sp116_s16_sb100_se0_b_m2.mp3',
    ],
  },
  hildaVorn: {
    inizio_lezione: [
      '../Voicelines/HV/Inizio lezione/ElevenLabs_2026-03-30T11_31_54_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
      '../Voicelines/HV/Inizio lezione/ElevenLabs_2026-03-30T11_32_44_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
      '../Voicelines/HV/Inizio lezione/ElevenLabs_2026-03-30T11_33_24_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
    ],
    fine_lezione: [
      '../Voicelines/HV/Fine lezione/ElevenLabs_2026-03-30T11_35_33_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
      '../Voicelines/HV/Fine lezione/ElevenLabs_2026-03-30T11_36_20_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
      '../Voicelines/HV/Fine lezione/ElevenLabs_2026-03-30T11_37_01_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
    ],
  },
  kaelDorne: {
    inizio_lezione: [
      '../Voicelines/KD/Inizio lezioni/ElevenLabs_2026-03-30T11_48_43_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
      '../Voicelines/KD/Inizio lezioni/ElevenLabs_2026-03-30T11_49_32_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
      '../Voicelines/KD/Inizio lezioni/ElevenLabs_2026-03-30T11_50_17_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
    ],
    fine_lezione: [
      '../Voicelines/KD/Fine lezioni/ElevenLabs_2026-03-30T11_52_03_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
      '../Voicelines/KD/Fine lezioni/ElevenLabs_2026-03-30T11_52_42_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
      '../Voicelines/KD/Fine lezioni/ElevenLabs_2026-03-30T11_53_29_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
    ],
  },
  matteoServi: {
    inizio_lezione: [
      '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_43_53_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
      '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_44_35_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
      '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_45_18_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
      '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_45_54_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
    ],
    fine_lezione: [
      '../Voicelines/MtS/Fine lezioni/ElevenLabs_2026-03-30T18_47_44_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
      '../Voicelines/MtS/Fine lezioni/ElevenLabs_2026-03-30T18_48_25_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
      '../Voicelines/MtS/Fine lezioni/ElevenLabs_2026-03-30T18_49_06_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
    ],
  },
  marenSolde: {
    inizio_lezione: [
      '../Voicelines/MS/Inizio lezioni/ElevenLabs_2026-03-30T18_59_19_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
      '../Voicelines/MS/Inizio lezioni/ElevenLabs_2026-03-30T19_00_04_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
      '../Voicelines/MS/Inizio lezioni/ElevenLabs_2026-03-30T19_00_49_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
    ],
    fine_lezione: [
      '../Voicelines/MS/Fine lezioni/ElevenLabs_2026-03-30T19_02_19_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
      '../Voicelines/MS/Fine lezioni/ElevenLabs_2026-03-30T19_03_14_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
      '../Voicelines/MS/Fine lezioni/ElevenLabs_2026-03-30T19_04_05_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
    ],
  },
  edvarSollen: {
    inizio_lezione: [
      '../Voicelines/ES/Inizio lezioni/ElevenLabs_2026-03-31T09_43_49_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
      '../Voicelines/ES/Inizio lezioni/ElevenLabs_2026-03-31T09_44_33_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
      '../Voicelines/ES/Inizio lezioni/ElevenLabs_2026-03-31T09_45_09_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
    ],
    fine_lezione: [
      '../Voicelines/ES/Fine lezioni/ElevenLabs_2026-03-31T09_47_11_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
      '../Voicelines/ES/Fine lezioni/ElevenLabs_2026-03-31T09_47_47_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
      '../Voicelines/ES/Fine lezioni/ElevenLabs_2026-03-31T09_48_29_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
    ],
  },
  darioMenci: {
    apertura_visita: [
      '../Voicelines/DM/Inizio conversazioni/ElevenLabs_2026-03-31T09_56_07_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
      '../Voicelines/DM/Inizio conversazioni/ElevenLabs_2026-03-31T09_56_41_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
      '../Voicelines/DM/Inizio conversazioni/ElevenLabs_2026-03-31T09_57_13_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
    ],
    chiusura_visita: [
      '../Voicelines/DM/Fine conversazioni/ElevenLabs_2026-03-31T09_58_24_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
      '../Voicelines/DM/Fine conversazioni/ElevenLabs_2026-03-31T09_59_01_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
      '../Voicelines/DM/Fine conversazioni/ElevenLabs_2026-03-31T09_59_32_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
    ],
  },
};

// Riproduce una voiceline per il PNG e il trigger indicati.
// Non produce alcun output se VoiceOver è attivo, il contesto audio non è
// inizializzato, o il trigger non ha audio disponibile.
// Evita la ripetizione immediata dello stesso file se esistono alternative.
function riproduciVoiceline(idPng, trigger) {
  if (voiceOverAttivo)  return;
  if (!contestoAudio)   return;

  const filePng = VOICELINES[idPng];
  if (!filePng) return;
  const files = filePng[trigger];
  if (!files || files.length === 0) return;

  // Seleziona il file evitando la ripetizione immediata
  const chiave    = `${idPng}:${trigger}`;
  const ultimoFile = _ultimaVoiceline.get(chiave);
  let file;
  if (files.length === 1) {
    file = files[0];
  } else {
    const candidati = files.filter(f => f !== ultimoFile);
    file = candidati[Math.floor(Math.random() * candidati.length)];
  }
  _ultimaVoiceline.set(chiave, file);

  // Ferma l'eventuale voiceline in corso
  if (nodi.voci.sorgente) {
    try { nodi.voci.sorgente.stop(); } catch (_) {}
    nodi.voci.sorgente = null;
  }

  // Carica e riproduci sul canale voci (non in loop)
  fetch(encodeURI(file))
    .then(risposta => {
      if (!risposta.ok) throw new Error('fetch voiceline');
      return risposta.arrayBuffer();
    })
    .then(buffer => contestoAudio.decodeAudioData(buffer))
    .then(audioDecodificato => {
      const sorgente = contestoAudio.createBufferSource();
      sorgente.buffer = audioDecodificato;
      sorgente.loop   = false;
      sorgente.connect(nodi.voci.guadagno);
      sorgente.start(0);
      nodi.voci.sorgente = sorgente;
      sorgente.onended = () => {
        if (nodi.voci.sorgente === sorgente) nodi.voci.sorgente = null;
      };
    })
    .catch(() => {
      // File non disponibile o errore di decodifica — fallback silenzioso
    });
}

// Segnala se VoiceOver è attivo — chiamare da ui.js al rilevamento
function segnalaVoiceOver(attivo) {
  voiceOverAttivo = attivo;
}


// ------------------------------------------------------------
// FEEDBACK SONORI SINTETICI
// Generati via Web Audio API senza file esterni.
// Usati per le interazioni dell'interfaccia.
// ------------------------------------------------------------

// Suono di ingresso in un luogo (arpeggio ascendente morbido, 3 note in sequenza)
function suonoIngresso() {
  if (!contestoAudio) return;
  const note = [261.63, 329.63, 392.00];  // Do4, Mi4, Sol4
  note.forEach((freq, i) => {
    setTimeout(() => _suonoBreve(freq, 0.14, 'sine', 0.08), i * 90);
  });
}

// Suono di nuovo giorno (arpeggio mattutino ascendente, 3 note più acute)
function suonoNuovoGiorno() {
  if (!contestoAudio) return;
  const note = [349.23, 440.00, 523.25];  // Fa4, La4, Do5
  note.forEach((freq, i) => {
    setTimeout(() => _suonoBreve(freq, 0.18, 'sine', 0.1), i * 110);
  });
}

// Suono di conferma generico (scelta effettuata)
function suonoConferma() {
  if (!contestoAudio) return;
  _suonoBreve(440, 0.1, 'sine', 0.15);
}

// Suono di errore / azione non disponibile
function suonoErrore() {
  if (!contestoAudio) return;
  _suonoBreve(180, 0.15, 'sawtooth', 0.2);
}

// Suono di avanzamento (passaggio a schermata successiva)
function suonoAvanza() {
  if (!contestoAudio) return;
  _suonoDoppio(330, 440, 0.08, 'sine');
}

// Suono cerimoniale (cerimonie di ascensione)
function suonoCerimonia() {
  if (!contestoAudio) return;
  _accordo([261.63, 329.63, 392.00], 0.3, 'sine');
}

// Funzione interna: genera un suono breve a frequenza fissa
function _suonoBreve(frequenza, durata, forma, volume) {
  const oscillatore = contestoAudio.createOscillator();
  const guadagno    = contestoAudio.createGain();

  oscillatore.type      = forma;
  oscillatore.frequency.value = frequenza;
  guadagno.gain.value   = volume * 0.3;  // volume ridotto per non sovrastare

  oscillatore.connect(guadagno);
  guadagno.connect(contestoAudio.destination);

  const ora = contestoAudio.currentTime;
  oscillatore.start(ora);
  guadagno.gain.exponentialRampToValueAtTime(0.001, ora + durata);
  oscillatore.stop(ora + durata + 0.01);
}

// Funzione interna: genera due note in sequenza rapida
function _suonoDoppio(freq1, freq2, durata, forma) {
  _suonoBreve(freq1, durata, forma, 0.15);
  setTimeout(() => _suonoBreve(freq2, durata, forma, 0.15), durata * 800);
}

// Funzione interna: genera un accordo di note simultanee
function _accordo(frequenze, durata, forma) {
  frequenze.forEach(freq => _suonoBreve(freq, durata, forma, 0.1));
}


// ------------------------------------------------------------
// API PUBBLICA DEL MODULO AUDIO
// Tutte le funzioni che gli altri moduli possono chiamare.
// ------------------------------------------------------------
const Audio = {
  inizializza:     inizializzaAudio,
  riprendi:        riprendi,
  impostaVolume:   impostaVolume,
  leggiVolume:     leggiVolume,
  avviaAmbientale: avviaAmbientale,
  fermaAmbientale: fermaAmbientale,
  // Espone il contesto audio per i minigiochi
  // (un solo AudioContext per tutta l'app — pratica corretta su Safari iOS)
  leggiContesto:   () => contestoAudio,
  // Feedback sonori
  conferma:        suonoConferma,
  errore:          suonoErrore,
  avanza:          suonoAvanza,
  cerimonia:       suonoCerimonia,
  ingresso:        suonoIngresso,
  nuovoGiorno:     suonoNuovoGiorno,
  // Voicelines dei PNG
  riproduciVoiceline: riproduciVoiceline,
  segnalaVoiceOver:   segnalaVoiceOver
};
