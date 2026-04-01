'use strict';

// ============================================================
// SERVICE WORKER — Elenthyr
// Gestione cache offline e aggiornamenti PWA.
// Strategia: cache-first per asset statici, network-first
// per richieste di navigazione.
// ============================================================

const VERSIONE_CACHE = 'elenthyr-v2';

// File da precachare all'installazione
const FILE_DA_CACHARE = [
  './',
  './index.html',
  './style.css',
  './data.js',
  './narrative.js',
  './dialoghi.js',
  './audio.js',
  './game-engine.js',
  './minigames.js',
  './ui.js',
  './scavi-test.js',
  './manifest.json',

  // Voicelines — percorsi relativi alla directory di servizio del gioco
  // Valdric Sonn
  '../Voicelines/VS/Apertura cerimonie/ElevenLabs_2026-03-29T21_36_25_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Apertura cerimonie/ElevenLabs_2026-03-29T21_38_40_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Apertura cerimonie/ElevenLabs_2026-03-29T21_40_02_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Chiusura cerimonie/ElevenLabs_2026-03-29T21_42_50_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Chiusura cerimonie/ElevenLabs_2026-03-29T21_43_40_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Chiusura cerimonie/ElevenLabs_2026-03-29T21_45_36_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Annunci importanti/ElevenLabs_2026-03-29T21_47_55_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Annunci importanti/ElevenLabs_2026-03-29T21_48_42_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  '../Voicelines/VS/Annunci importanti/ElevenLabs_2026-03-29T21_49_41_Spuds Oxley - Wise and Approachable_pvc_sp100_s50_sb75_se0_b_m2.mp3',
  // Brennar Ostk
  '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_00_19_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
  '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_01_01_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
  '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_01_51_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
  '../Voicelines/BO/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_02_36_Luca Brasi - Deep, Profound and Low_pvc_sp100_s54_sb47_se0_b_m2.mp3',
  // Livia Cauro
  '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_09_53_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
  '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_10_31_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
  '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_11_10_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
  '../Voicelines/LC/Introduzione conversazioni importanti/ElevenLabs_2026-03-29T22_11_52_Adeline - Feminine and Conversational_pvc_sp100_s97_sb95_se0_b_m2.mp3',
  // Sevan Drath
  '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_34_05_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
  '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_34_38_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
  '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_35_18_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
  '../Voicelines/SD/Introduzione conversazione importante/ElevenLabs_2026-03-29T22_35_58_Victor - Deep, Malevolent and Ancient_pvc_sp107_s77_sb75_se0_b_m2.mp3',
  // Cornelia Vesti
  '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_17_43_Tripti - Calm and Experienced_pvc_sp95_s30_sb75_se0_b_m2.mp3',
  '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_19_14_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
  '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_19_59_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
  '../Voicelines/CV/Inizio lezioni/ElevenLabs_2026-03-29T22_20_40_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
  '../Voicelines/CV/Fine lezioni/ElevenLabs_2026-03-29T22_22_47_Tripti - Calm and Experienced_pvc_sp83_s30_sb75_se0_b_m2.mp3',
  '../Voicelines/CV/Fine lezioni/ElevenLabs_2026-03-29T22_23_53_Tripti - Calm and Experienced_pvc_sp83_s52_sb75_se0_b_m2.mp3',
  '../Voicelines/CV/Fine lezioni/ElevenLabs_2026-03-29T22_24_31_Tripti - Calm and Experienced_pvc_sp83_s52_sb75_se0_b_m2.mp3',
  // Pietro Vasso
  '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_44_15_Jimmy - Plummy, Theatrical and Lively_pvc_sp103_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_45_12_Jimmy - Plummy, Theatrical and Lively_pvc_sp103_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_46_02_Jimmy - Plummy, Theatrical and Lively_pvc_sp103_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Inizio lezioni/ElevenLabs_2026-03-29T22_47_25_Jimmy - Plummy, Theatrical and Lively_pvc_sp110_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Fine lezioni/ElevenLabs_2026-03-29T22_49_18_Jimmy - Plummy, Theatrical and Lively_pvc_sp113_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Fine lezioni/ElevenLabs_2026-03-29T22_50_02_Jimmy - Plummy, Theatrical and Lively_pvc_sp113_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Fine lezioni/ElevenLabs_2026-03-29T22_51_42_Jimmy - Plummy, Theatrical and Lively_pvc_sp117_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_54_00_Jimmy - Plummy, Theatrical and Lively_pvc_sp114_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_55_03_Jimmy - Plummy, Theatrical and Lively_pvc_sp115_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_55_38_Jimmy - Plummy, Theatrical and Lively_pvc_sp115_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_56_34_Jimmy - Plummy, Theatrical and Lively_pvc_sp116_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_57_52_Jimmy - Plummy, Theatrical and Lively_pvc_sp116_s16_sb100_se0_b_m2.mp3',
  '../Voicelines/PV/Commenti esperimenti/ElevenLabs_2026-03-29T22_58_48_Jimmy - Plummy, Theatrical and Lively_pvc_sp116_s16_sb100_se0_b_m2.mp3',
  // Hilda Vorn
  '../Voicelines/HV/Inizio lezione/ElevenLabs_2026-03-30T11_31_54_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
  '../Voicelines/HV/Inizio lezione/ElevenLabs_2026-03-30T11_32_44_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
  '../Voicelines/HV/Inizio lezione/ElevenLabs_2026-03-30T11_33_24_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
  '../Voicelines/HV/Fine lezione/ElevenLabs_2026-03-30T11_35_33_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
  '../Voicelines/HV/Fine lezione/ElevenLabs_2026-03-30T11_36_20_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
  '../Voicelines/HV/Fine lezione/ElevenLabs_2026-03-30T11_37_01_Jane - Professional Audiobook Reader_pvc_sp100_s40_sb40_se10_b_m2.mp3',
  // Kael Dorne
  '../Voicelines/KD/Inizio lezioni/ElevenLabs_2026-03-30T11_48_43_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
  '../Voicelines/KD/Inizio lezioni/ElevenLabs_2026-03-30T11_49_32_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
  '../Voicelines/KD/Inizio lezioni/ElevenLabs_2026-03-30T11_50_17_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
  '../Voicelines/KD/Fine lezioni/ElevenLabs_2026-03-30T11_52_03_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
  '../Voicelines/KD/Fine lezioni/ElevenLabs_2026-03-30T11_52_42_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
  '../Voicelines/KD/Fine lezioni/ElevenLabs_2026-03-30T11_53_29_Mario - Animated and chatty_pvc_sp93_s40_sb25_se36_b_m2.mp3',
  // Matteo Servi
  '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_43_53_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
  '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_44_35_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
  '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_45_18_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
  '../Voicelines/MtS/Inizio lezioni/ElevenLabs_2026-03-30T18_45_54_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
  '../Voicelines/MtS/Fine lezioni/ElevenLabs_2026-03-30T18_47_44_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
  '../Voicelines/MtS/Fine lezioni/ElevenLabs_2026-03-30T18_48_25_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
  '../Voicelines/MtS/Fine lezioni/ElevenLabs_2026-03-30T18_49_06_Mauro - Deep_pvc_sp99_s52_sb95_se11_b_m2.mp3',
  // Maren Solde
  '../Voicelines/MS/Inizio lezioni/ElevenLabs_2026-03-30T18_59_19_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
  '../Voicelines/MS/Inizio lezioni/ElevenLabs_2026-03-30T19_00_04_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
  '../Voicelines/MS/Inizio lezioni/ElevenLabs_2026-03-30T19_00_49_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
  '../Voicelines/MS/Fine lezioni/ElevenLabs_2026-03-30T19_02_19_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
  '../Voicelines/MS/Fine lezioni/ElevenLabs_2026-03-30T19_03_14_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
  '../Voicelines/MS/Fine lezioni/ElevenLabs_2026-03-30T19_04_05_Monika Sogam - Deep and Captivating_pvc_sp100_s37_sb75_se9_b_m2.mp3',
  // Edvar Sollen
  '../Voicelines/ES/Inizio lezioni/ElevenLabs_2026-03-31T09_43_49_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
  '../Voicelines/ES/Inizio lezioni/ElevenLabs_2026-03-31T09_44_33_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
  '../Voicelines/ES/Inizio lezioni/ElevenLabs_2026-03-31T09_45_09_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
  '../Voicelines/ES/Fine lezioni/ElevenLabs_2026-03-31T09_47_11_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
  '../Voicelines/ES/Fine lezioni/ElevenLabs_2026-03-31T09_47_47_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
  '../Voicelines/ES/Fine lezioni/ElevenLabs_2026-03-31T09_48_29_Marcello - Dynamic deep expressive male voice_pvc_sp111_s14_sb100_se26_b_m2.mp3',
  // Dario Menci
  '../Voicelines/DM/Inizio conversazioni/ElevenLabs_2026-03-31T09_56_07_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
  '../Voicelines/DM/Inizio conversazioni/ElevenLabs_2026-03-31T09_56_41_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
  '../Voicelines/DM/Inizio conversazioni/ElevenLabs_2026-03-31T09_57_13_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
  '../Voicelines/DM/Fine conversazioni/ElevenLabs_2026-03-31T09_58_24_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
  '../Voicelines/DM/Fine conversazioni/ElevenLabs_2026-03-31T09_59_01_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3',
  '../Voicelines/DM/Fine conversazioni/ElevenLabs_2026-03-31T09_59_32_Andrea Loco - Bright and Engaging_pvc_sp108_s37_sb99_se63_b_m2.mp3'
];


// ============================================================
// INSTALLAZIONE — precaching degli asset statici
// ============================================================
self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(VERSIONE_CACHE).then(function (cache) {
      return cache.addAll(FILE_DA_CACHARE);
    })
  );
  // Forza l'attivazione immediata senza attendere che le tab
  // esistenti vengano chiuse
  self.skipWaiting();
});


// ============================================================
// ATTIVAZIONE — pulizia delle cache obsolete
// ============================================================
self.addEventListener('activate', function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nomiCache) {
      return Promise.all(
        nomiCache
          .filter(function (nome) {
            return nome !== VERSIONE_CACHE;
          })
          .map(function (nome) {
            return caches.delete(nome);
          })
      );
    })
  );
  // Prende il controllo di tutte le tab aperte immediatamente
  self.clients.claim();
});


// ============================================================
// INTERCETTAZIONE RICHIESTE — strategia cache-first
// ============================================================
self.addEventListener('fetch', function (evento) {
  // Gestisce solo richieste GET
  if (evento.request.method !== 'GET') return;

  evento.respondWith(
    caches.match(evento.request).then(function (rispostaCacheata) {
      if (rispostaCacheata) {
        // Restituisce la versione cachata
        return rispostaCacheata;
      }

      // Non in cache: recupera dalla rete e salva per il futuro
      return fetch(evento.request).then(function (rispostaRete) {
        // Non cacheamo risposte non valide
        if (
          !rispostaRete ||
          rispostaRete.status !== 200 ||
          rispostaRete.type === 'opaque'
        ) {
          return rispostaRete;
        }

        // Cloniamo la risposta perché può essere consumata una sola volta
        var rispostaDaSalvare = rispostaRete.clone();

        caches.open(VERSIONE_CACHE).then(function (cache) {
          cache.put(evento.request, rispostaDaSalvare);
        });

        return rispostaRete;
      });
    })
  );
});
