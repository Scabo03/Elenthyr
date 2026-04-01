'use strict';

// ============================================================
// DATA.JS — Elenthyr
// Strutture dati statiche: personaggi, luoghi, eventi,
// trigger, configurazione dei gradi, slot giornalieri.
// Nessuna logica di gioco. Nessuna manipolazione dello stato.
// ============================================================


// ------------------------------------------------------------
// GRADI — gerarchia completa di entrambi i rami
// ------------------------------------------------------------
const GRADI_ARCANA = [
  'Novizio',
  'Apprendista',
  'Esperto',
  'Adepto',
  'Magister',
  'Alto Maestro',
  'Arcimago'
];

const GRADI_ERUDIZIONE = [
  'Allievo',
  'Copista',
  'Erudito',
  'Archivista',
  'Custode',
  'Alto Maestro',
  'Arcimago'
];

// Gradi che segnano la transizione alla fase post-accademica
const SOGLIA_POST_ACCADEMICA_ARCANA    = 'Esperto';
const SOGLIA_POST_ACCADEMICA_ERUDIZIONE = 'Archivista';

// Gradi che richiedono cerimonia presieduta dall'Arcimago
const GRADI_CERIMONIA_ARCIMAGO = ['Magister', 'Custode', 'Alto Maestro', 'Arcimago'];


// ------------------------------------------------------------
// DISCIPLINE — mappatura disciplina → ramo e grado docente
// ------------------------------------------------------------
const DISCIPLINE = {
  teoriaArcana: {
    id: 'teoriaArcana',
    nome: 'Teoria Arcana',
    ramo: 'arcana',
    docente: 'corneliaVesti',
    minigioco: 'mastermindFormule'
  },
  spellcasting: {
    id: 'spellcasting',
    nome: 'Spellcasting',
    ramo: 'arcana',
    docente: 'kaelDorne',
    minigioco: 'meccanicaSpellcasting'
  },
  rituali: {
    id: 'rituali',
    nome: 'Rituali',
    ramo: 'arcana',
    docente: 'sevanDrath',
    minigioco: 'labirintoEquilibrio'
  },
  alchimia: {
    id: 'alchimia',
    nome: 'Alchimia',
    ramo: 'arcana',
    docente: 'pietroVasso',
    minigioco: 'minesweeperReagenti'
  },
  incantamento: {
    id: 'incantamento',
    nome: 'Incantamento',
    ramo: 'arcana',
    docente: 'hildaVorn',
    minigioco: 'memoryRune'
  },
  storia: {
    id: 'storia',
    nome: 'Storia',
    ramo: 'erudizione',
    docente: 'matteoServi',
    minigioco: 'rebusAccessibile'
  },
  filosofia: {
    id: 'filosofia',
    nome: 'Filosofia',
    ramo: 'erudizione',
    docente: 'marenSolde',
    minigioco: 'rebusAccessibile'
  },
  scienzeNaturali: {
    id: 'scienzeNaturali',
    nome: 'Scienze Naturali',
    ramo: 'erudizione',
    docente: 'edvarSollen',
    minigioco: 'rebusAccessibile'
  },
  letteratura: {
    id: 'letteratura',
    nome: 'Letteratura',
    ramo: 'erudizione',
    docente: null,
    minigioco: 'rebusAccessibile'
  }
};


// ------------------------------------------------------------
// SLOT GIORNALIERI — ordine fisso e invariabile
// ------------------------------------------------------------
const SLOT_GIORNALIERI = [
  { id: 'mattina',          nome: 'Mattina' },
  { id: 'tardaMattina',     nome: 'Tarda mattina' },
  { id: 'pranzo',           nome: 'Pranzo' },
  { id: 'primoPomeriggio',  nome: 'Primo pomeriggio' },
  { id: 'tardoPomeriggio',  nome: 'Tardo pomeriggio' },
  { id: 'sera',             nome: 'Sera' },
  { id: 'notte',            nome: 'Notte' }
];

// Tipi di attività disponibili nel tempo libero
const TIPI_ATTIVITA = {
  riposo: {
    id: 'riposo',
    nome: 'Riposo',
    descrizione: 'Torni alla tua stanza. Un piccolo vantaggio per il resto della giornata.'
  },
  socialita: {
    id: 'socialita',
    nome: 'Socialità',
    descrizione: 'Trascorri del tempo con gli altri. La tua reputazione ne giova.'
  },
  studio: {
    id: 'studio',
    nome: 'Studio',
    descrizione: 'Studi in biblioteca. Utile per lezioni ed esami.'
  },
  ricerca: {
    id: 'ricerca',
    nome: 'Ricerca',
    descrizione: 'Scegli un luogo e porta avanti il tuo percorso.'
  }
};


// ------------------------------------------------------------
// LUOGHI — dati statici e requisiti di accesso
// ------------------------------------------------------------
const LUOGHI = {
  aule: {
    id: 'aule',
    nome: 'Aule e sale lezioni',
    colore: 'aule',
    gradoMinimo: null,  // accessibile da tutti
    accessibileNotte: false,
    attivitaDisponibili: ['lezione', 'esame', 'minigioco'],
    sommario: 'Lezioni, esami e esercitazioni guidate.'
  },
  biblioteca: {
    id: 'biblioteca',
    nome: 'Biblioteca',
    colore: 'biblioteca',
    gradoMinimo: null,
    accessibileNotte: false,
    attivitaDisponibili: ['ricercaStoria', 'ricercaFilosofia', 'ricercaScienze', 'ricercaLetteratura', 'dialogo'],
    sommario: 'Ricerca storica, filosofica, scientifica e letteraria.'
  },
  laboratorioAlchimia: {
    id: 'laboratorioAlchimia',
    nome: 'Laboratorio di Alchimia',
    colore: 'alchimia',
    gradoMinimo: 'Apprendista',
    ramoMinimo: 'arcana',
    accessibileNotte: true,
    attivitaDisponibili: ['praticaAlchemica', 'sblocaggioReagente', 'dialogo'],
    sommario: 'Pratica alchemica con reagenti e bollitori.'
  },
  laboratorioIncantamento: {
    id: 'laboratorioIncantamento',
    nome: 'Laboratorio di Incantamento',
    colore: 'incantamento',
    gradoMinimo: 'Apprendista',
    ramoMinimo: 'arcana',
    accessibileNotte: true,
    attivitaDisponibili: ['praticaIncantamento', 'dissolvenza', 'creazioneOggetti', 'dialogo'],
    sommario: 'Rune, glifi e creazione di oggetti magici.'
  },
  salaRituale: {
    id: 'salaRituale',
    nome: 'Sala Rituale',
    colore: 'sala-rituale',
    gradoMinimo: 'Esperto',
    ramoMinimo: 'arcana',
    gradoMinimoAlt: 'Archivista',
    ramoMinimoAlt: 'erudizione',
    accessibileNotte: true,
    attivitaDisponibili: ['praticaRituale', 'cerimonia', 'dialogo'],
    sommario: 'Rituali solenni e cerimonie formali.'
  },
  cortile: {
    id: 'cortile',
    nome: 'Cortile e giardino',
    colore: 'cortile',
    gradoMinimo: null,
    accessibileNotte: false,
    attivitaDisponibili: ['socialita', 'incontro', 'dialogo'],
    sommario: 'Incontri informali e vita dell\'accademia.'
  },
  torre: {
    id: 'torre',
    nome: 'Torre e Osservatorio',
    colore: 'torre',
    gradoMinimo: 'Esperto',
    ramoMinimo: 'arcana',
    accessibileNotte: true,
    attivitaDisponibili: ['ricercaAvanzata', 'osservazione', 'dialogo'],
    sommario: 'Ricerca avanzata e osservazione astronomica.'
  },
  archivioRiservato: {
    id: 'archivioRiservato',
    nome: 'Archivio Riservato',
    colore: 'archivio',
    gradoMinimo: 'Magister',
    ramoMinimo: 'arcana',
    gradoMinimoAlt: 'Custode',
    ramoMinimoAlt: 'erudizione',
    accessibileNotte: true,
    attivitaDisponibili: ['ricercaRara', 'dialogo'],
    sommario: 'Testi rari e ricerca nelle discipline più profonde.'
  },
  // Gli Scavi — strumento di test, da rimuovere prima della versione finale
  scavi: {
    id: 'scavi',
    nome: 'Gli Scavi',
    colore: 'scavi',
    gradoMinimo: null,
    accessibileNotte: true,
    attivitaDisponibili: ['test'],
    sommario: 'Cunicoli sotterranei antichi. Se ne mormora tra gli studenti.'
  }
};

// PNG presenti in luoghi sociali — pool esteso per la selezione del dialogo
// Usato da _pngPrincipalePerLuogo() quando luogoPrincipale non basta.
const PNG_NEL_LUOGO = {
  cortile: ['marcoAlessi', 'brittaVorn', 'chiaraMotti', 'edwynDrael', 'halvardMunk', 'marenSolde']
};


// Ordine di presentazione nella schermata di scelta luogo
const ORDINE_LUOGHI = [
  'aule',
  'biblioteca',
  'cortile',
  'laboratorioAlchimia',
  'laboratorioIncantamento',
  'salaRituale',
  'torre',
  'archivioRiservato',
  'scavi'
];


// ------------------------------------------------------------
// PERSONAGGI — schede complete
// ------------------------------------------------------------
const PERSONAGGI = {
  valdricSonn: {
    id: 'valdricSonn',
    nome: 'Valdric Sonn',
    ruolo: 'Arcimago',
    grado: 'Arcimago',
    archetipo: 'autorevole e perspicace',
    luogoPrincipale: null,  // appare solo in eventi formali
    relazioneIniziale: 0    // scala interna: -100 → +100, inizio neutro
  },
  brennarOstk: {
    id: 'brennarOstk',
    nome: 'Brennar Ostk',
    ruolo: 'Alto Maestro',
    grado: 'Alto Maestro',
    archetipo: 'pragmatico e diretto',
    luogoPrincipale: null,
    relazioneIniziale: 0
  },
  liviaCauro: {
    id: 'liviaCauro',
    nome: 'Livia Cauro',
    ruolo: 'Alto Maestro',
    grado: 'Alto Maestro',
    archetipo: 'elegante e strategica',
    luogoPrincipale: null,
    relazioneIniziale: 0
  },
  corneliaVesti: {
    id: 'corneliaVesti',
    nome: 'Cornelia Vesti',
    ruolo: 'Docente di Teoria Arcana',
    grado: 'Magister',
    archetipo: 'fredda e formale',
    luogoPrincipale: 'aule',
    relazioneIniziale: 0
  },
  pietroVasso: {
    id: 'pietroVasso',
    nome: 'Pietro Vasso',
    ruolo: 'Docente di Alchimia',
    grado: 'Adepto',
    archetipo: 'gioviale e ironico',
    luogoPrincipale: 'laboratorioAlchimia',
    relazioneIniziale: 10  // più accessibile fin da subito
  },
  sevanDrath: {
    id: 'sevanDrath',
    nome: 'Sevan Drath',
    ruolo: 'Docente di Rituali',
    grado: 'Alto Maestro',
    archetipo: 'misterioso e riservato',
    luogoPrincipale: 'salaRituale',
    relazioneIniziale: -5
  },
  hildaVorn: {
    id: 'hildaVorn',
    nome: 'Hilda Vorn',
    ruolo: 'Docente di Incantamento',
    grado: 'Magister',
    archetipo: 'ambiziosa e calcolatrice',
    luogoPrincipale: 'laboratorioIncantamento',
    relazioneIniziale: 0
  },
  kaelDorne: {
    id: 'kaelDorne',
    nome: 'Kael Dorne',
    ruolo: 'Docente di Spellcasting',
    grado: 'Adepto',
    archetipo: 'energico e brillante',
    luogoPrincipale: 'aule',
    relazioneIniziale: 10
  },
  matteoServi: {
    id: 'matteoServi',
    nome: 'Matteo Servi',
    ruolo: 'Docente di Storia',
    grado: 'Archivista',
    archetipo: 'malinconico e riflessivo',
    luogoPrincipale: 'aule',
    relazioneIniziale: 5
  },
  marenSolde: {
    id: 'marenSolde',
    nome: 'Maren Solde',
    ruolo: 'Docente di Filosofia',
    grado: 'Archivista',
    archetipo: 'calorosa e disponibile',
    luogoPrincipale: 'aule',
    relazioneIniziale: 10
  },
  edvarSollen: {
    id: 'edvarSollen',
    nome: 'Edvar Sollen',
    ruolo: 'Docente di Scienze Naturali',
    grado: 'Custode',
    archetipo: 'eccentrico e imprevedibile',
    luogoPrincipale: 'torre',
    relazioneIniziale: 0
  },
  lucaFerri: {
    id: 'lucaFerri',
    nome: 'Luca Ferri',
    ruolo: 'Studente',
    grado: 'Apprendista',
    archetipo: 'ambizioso e calcolatore',
    luogoPrincipale: 'aule',
    relazioneIniziale: 5
  },
  sylraKend: {
    id: 'sylraKend',
    nome: 'Sylra Kend',
    ruolo: 'Studentessa',
    grado: 'Novizio',
    archetipo: 'misteriosa e riservata',
    luogoPrincipale: 'biblioteca',
    relazioneIniziale: 0
  },
  brittaVorn: {
    id: 'brittaVorn',
    nome: 'Britta Vorn',
    ruolo: 'Studentessa',
    grado: 'Apprendista',
    archetipo: 'diretta e leale',
    luogoPrincipale: 'aule',
    relazioneIniziale: 10
  },
  marcoAlessi: {
    id: 'marcoAlessi',
    nome: 'Marco Alessi',
    ruolo: 'Studente',
    grado: 'Novizio',
    archetipo: 'gioviale e ironico',
    luogoPrincipale: 'aule',
    relazioneIniziale: 15
  },
  edwynDrael: {
    id: 'edwynDrael',
    nome: 'Edwyn Drael',
    ruolo: 'Studente',
    grado: 'Novizio',
    archetipo: 'malinconico e riflessivo',
    luogoPrincipale: 'biblioteca',
    relazioneIniziale: 0
  },
  valkaStrenn: {
    id: 'valkaStrenn',
    nome: 'Valka Strenn',
    ruolo: 'Studentessa',
    grado: 'Apprendista',
    archetipo: 'ambiziosa e calcolatrice',
    luogoPrincipale: 'aule',
    relazioneIniziale: 0
  },
  chiaraMotti: {
    id: 'chiaraMotti',
    nome: 'Chiara Motti',
    ruolo: 'Studentessa',
    grado: 'Novizio',
    archetipo: 'calorosa e curiosa',
    luogoPrincipale: 'aule',
    relazioneIniziale: 15
  },
  serelithVane: {
    id: 'serelithVane',
    nome: 'Serelith Vane',
    ruolo: 'Bibliotecaria',
    grado: 'Custode',
    archetipo: 'misteriosa e riservata',
    luogoPrincipale: 'biblioteca',
    relazioneIniziale: 0
  },
  halvardMunk: {
    id: 'halvardMunk',
    nome: 'Halvard Munk',
    ruolo: 'Custode dell\'accademia',
    grado: null,
    archetipo: 'solido e radicato',
    luogoPrincipale: 'cortile',
    relazioneIniziale: 5
  },
  tessalyWren: {
    id: 'tessalyWren',
    nome: 'Tessaly Wren',
    ruolo: 'Amministratrice',
    grado: null,
    archetipo: 'precisa ed efficiente',
    luogoPrincipale: null,
    relazioneIniziale: 0
  },
  darioMenci: {
    id: 'darioMenci',
    nome: 'Dario Menci',
    ruolo: 'Mercante',
    grado: null,
    archetipo: 'vivace e intraprendente',
    luogoPrincipale: 'cortile',
    relazioneIniziale: 10
  },
  sigridVael: {
    id: 'sigridVael',
    nome: 'Sigrid Vael',
    ruolo: 'Emissaria',
    grado: null,
    archetipo: 'autorevole e misurata',
    luogoPrincipale: null,
    relazioneIniziale: 0
  },
  arisMelk: {
    id: 'arisMelk',
    nome: 'Aris Melk',
    ruolo: 'Figura esterna',
    grado: null,
    archetipo: 'sfuggente',
    luogoPrincipale: null,
    relazioneIniziale: 0
  }
};


// ------------------------------------------------------------
// STAGIONI — dati atmosferici per la narrativa
// ------------------------------------------------------------
const STAGIONI = {
  autunno: {
    id: 'autunno',
    nome: 'Autunno',
    atmosfera: 'raccoglimento, preparazione, arrivo di nuovi studenti'
  },
  inverno: {
    id: 'inverno',
    nome: 'Inverno',
    atmosfera: 'isolamento, interiorità, fuochi accesi'
  },
  primavera: {
    id: 'primavera',
    nome: 'Primavera',
    atmosfera: 'ripresa, apertura, nuovi ingressi'
  },
  estate: {
    id: 'estate',
    nome: 'Estate',
    atmosfera: 'rallentamento, caldo, studio intenso'
  }
};

// Ordine delle stagioni nell'anno
const ORDINE_STAGIONI = ['autunno', 'inverno', 'primavera', 'estate'];


// ------------------------------------------------------------
// CONFIGURAZIONE CALENDARIO
// ------------------------------------------------------------
const CALENDARIO = {
  giorniPerSettimana:  5,
  settimanePerMese:    4,
  mesiPerStagione:     3,
  giorniPerStagione:   60,
  // Notti giocabili attivamente: 1 su 5 giorni
  nottiGiocabiliPerSettimana: 1,
  // Pause formali (in giorni dall'inizio della stagione)
  pausaEstiva:   { inizio: 25, fine: 35 },  // centrata sul solstizio
  pausaInvernale: { inizio: 25, fine: 35 }
};


// ------------------------------------------------------------
// DURATA EVENTI NARRATIVI
// ------------------------------------------------------------
const DURATA_EVENTI = {
  minore:   7,   // piccoli incidenti, cerimonie, task
  rilevante: 15,  // cerimonie istituzionali, ambascerie, decisioni del Senato
  maggiore:  30   // guerre, crisi esterne, eventi misteriosi
};


// ------------------------------------------------------------
// MINIGIOCHI — configurazione difficoltà per grado
// ------------------------------------------------------------
const CONFIG_MINIGIOCHI = {
  memoryRune: {
    novizio:     { coppie: 4, distinzione: 'alta' },
    apprendista: { coppie: 6, distinzione: 'media' },
    esperto:     { coppie: 8, distinzione: 'bassa' },
    adepto:      { coppie: 10, distinzione: 'minima' }
  },
  minesweeperReagenti: {
    novizio:     { griglia: '4x4', pericoli: 3 },
    apprendista: { griglia: '6x6', pericoli: 8 },
    esperto:     { griglia: '8x8', pericoli: 15 },
    adepto:      { griglia: '10x10', pericoli: 25 }
  },
  mastermindFormule: {
    novizio:     { lunghezza: 3, poolSimboli: 4,  tentativiMax: 10 },
    apprendista: { lunghezza: 4, poolSimboli: 6,  tentativiMax: 8  },
    esperto:     { lunghezza: 5, poolSimboli: 8,  tentativiMax: 7  },
    adepto:      { lunghezza: 6, poolSimboli: 10, tentativiMax: 6,  feedbackParziale: true }
  },
  meccanicaSpellcasting: {
    // durataCicloMs: durata totale del ciclo di carica per ogni elemento (ms)
    // finestraMs: finestra ottimale di intervento (ms)
    novizio:     { elementi: 2, ritmo: 'lento',       finestraTempo: 'ampia',   durataCicloMs: 2000, finestraMs: 600 },
    apprendista: { elementi: 4, ritmo: 'medio',       finestraTempo: 'media',   durataCicloMs: 1500, finestraMs: 400 },
    esperto:     { elementi: 6, ritmo: 'vario',       finestraTempo: 'stretta', durataCicloMs: 1200, finestraMs: 250 },
    adepto:      { elementi: 8, ritmo: 'sovrapposto', finestraTempo: 'minima',  durataCicloMs: 900,  finestraMs: 150, sovrapposto: true }
  },
  labirintoEquilibrio: {
    // passiEquilibrio: passaggi consecutivi da mantenere per completare il minigioco
    novizio:     { nodi: 4,  interdipendenze: false },
    apprendista: { nodi: 7,  interdipendenze: false },
    esperto:     { nodi: 12, interdipendenze: true,  passiEquilibrio: 3 },
    adepto:      { nodi: 20, interdipendenze: true,  passiEquilibrio: 3, equilibriMultipli: true }
  },
  rebusAccessibile: {
    allievo:    { indiziMassimo: 5, distinzione: 'alta'   },
    copista:    { indiziMassimo: 4, distinzione: 'media'  },
    erudito:    { indiziMassimo: 3, distinzione: 'bassa'  },
    archivista: { indiziMassimo: 2, distinzione: 'minima', trasversale: true }
  },
  // durataMaxMs: durata totale del processo prima del timeout
  // finestraMs: larghezza della finestra ottimale di intervento
  sblocaggioReagente: {
    apprendista: { durataMaxMs: 8000, finestraMs: 2000 },
    esperto:     { durataMaxMs: 8000, finestraMs: 1200 },
    adepto:      { durataMaxMs: 8000, finestraMs: 700  }
  },
  // periodoMs: durata di un'oscillazione completa del pendolo
  // finestraMs: larghezza della finestra ottimale a ogni picco
  dissolvenza: {
    apprendista: { periodoMs: 3000, finestraMs: 800 },
    esperto:     { periodoMs: 2500, finestraMs: 500 },
    adepto:      { periodoMs: 2000, finestraMs: 300 }
  }
};


// ------------------------------------------------------------
// EFFETTI DEI TONI DI RISPOSTA PER PNG
// Ogni PNG reagisce in modo diverso a ogni tono.
// { reputazione: N } è obbligatorio.
// { progressione: { disciplina, punti } } è opzionale:
// indica che rispondere con quel tono a quel PNG produce
// anche un piccolo guadagno disciplinare (es. curioso con
// un docente che spiega qualcosa).
// Per i PNG non presenti in questa mappa, applicaSceltaDialogo()
// usa i delta di default.
// ------------------------------------------------------------
const EFFETTI_TONO_PNG = {

  corneliaVesti: {
    formale:    { reputazione:  2 },
    amichevole: { reputazione: -1 },
    ironico:    { reputazione: -3 },
    distaccato: { reputazione:  0 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  2 },
    curioso:    { reputazione:  0 },
    elusivo:    { reputazione: -2 }
  },

  pietroVasso: {
    formale:    { reputazione:  0 },
    amichevole: { reputazione:  3 },
    ironico:    { reputazione:  1 },
    distaccato: { reputazione: -1 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  0 },
    curioso:    { reputazione:  2, progressione: { disciplina: 'alchimia', punti: 2 } },
    elusivo:    { reputazione: -1 }
  },

  serelithVane: {
    formale:    { reputazione:  2 },
    amichevole: { reputazione:  0 },
    ironico:    { reputazione: -2 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione:  0 },
    cauto:      { reputazione:  2 },
    curioso:    { reputazione:  1, progressione: { disciplina: 'storia', punti: 2 } },
    elusivo:    { reputazione: -1 }
  },

  marcoAlessi: {
    formale:    { reputazione: -1 },
    amichevole: { reputazione:  3 },
    ironico:    { reputazione:  2 },
    distaccato: { reputazione: -2 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  0 },
    curioso:    { reputazione:  1 },
    elusivo:    { reputazione: -2 }
  },

  valdricSonn: {
    formale:    { reputazione:  2 },
    amichevole: { reputazione: -1 },
    ironico:    { reputazione: -3 },
    distaccato: { reputazione:  0 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione:  0 },
    elusivo:    { reputazione: -2 }
  },

  brennarOstk: {
    formale:    { reputazione:  0 },
    amichevole: { reputazione:  1 },
    ironico:    { reputazione: -1 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione:  3 },
    cauto:      { reputazione: -1 },
    curioso:    { reputazione:  0 },
    elusivo:    { reputazione: -2 }
  },

  liviaCauro: {
    formale:    { reputazione:  2 },
    amichevole: { reputazione:  0 },
    ironico:    { reputazione: -2 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione:  0 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione: -1 },
    elusivo:    { reputazione: -1 }
  },

  sevanDrath: {
    formale:    { reputazione:  2 },
    amichevole: { reputazione: -2 },
    ironico:    { reputazione: -3 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione:  0 },
    cauto:      { reputazione:  2 },
    curioso:    { reputazione: -1 },
    elusivo:    { reputazione:  0 }
  },

  hildaVorn: {
    formale:    { reputazione:  1 },
    amichevole: { reputazione:  0 },
    ironico:    { reputazione: -1 },
    distaccato: { reputazione:  0 },
    diretto:    { reputazione:  2 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione:  1, progressione: { disciplina: 'incantamento', punti: 2 } },
    elusivo:    { reputazione: -2 }
  },

  kaelDorne: {
    formale:    { reputazione: -1 },
    amichevole: { reputazione:  2 },
    ironico:    { reputazione:  2 },
    distaccato: { reputazione: -1 },
    diretto:    { reputazione:  2 },
    cauto:      { reputazione: -1 },
    curioso:    { reputazione:  3, progressione: { disciplina: 'spellcasting', punti: 2 } },
    elusivo:    { reputazione: -1 }
  },

  matteoServi: {
    formale:    { reputazione:  1 },
    amichevole: { reputazione:  1 },
    ironico:    { reputazione: -2 },
    distaccato: { reputazione: -1 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  2 },
    curioso:    { reputazione:  2, progressione: { disciplina: 'storia', punti: 2 } },
    elusivo:    { reputazione: -1 }
  },

  marenSolde: {
    formale:    { reputazione:  0 },
    amichevole: { reputazione:  3 },
    ironico:    { reputazione:  0 },
    distaccato: { reputazione: -2 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione:  3, progressione: { disciplina: 'filosofia', punti: 2 } },
    elusivo:    { reputazione: -2 }
  },

  edvarSollen: {
    formale:    { reputazione: -1 },
    amichevole: { reputazione:  1 },
    ironico:    { reputazione:  1 },
    distaccato: { reputazione:  0 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione: -1 },
    curioso:    { reputazione:  3, progressione: { disciplina: 'scienzeNaturali', punti: 2 } },
    elusivo:    { reputazione:  1 }
  },

  lucaFerri: {
    formale:    { reputazione:  1 },
    amichevole: { reputazione:  0 },
    ironico:    { reputazione:  1 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione:  2 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione:  0 },
    elusivo:    { reputazione: -1 }
  },

  sylraKend: {
    formale:    { reputazione:  2 },
    amichevole: { reputazione: -1 },
    ironico:    { reputazione: -2 },
    distaccato: { reputazione:  2 },
    diretto:    { reputazione:  0 },
    cauto:      { reputazione:  2 },
    curioso:    { reputazione:  0 },
    elusivo:    { reputazione:  1 }
  },

  brittaVorn: {
    formale:    { reputazione: -1 },
    amichevole: { reputazione:  3 },
    ironico:    { reputazione:  1 },
    distaccato: { reputazione: -2 },
    diretto:    { reputazione:  3 },
    cauto:      { reputazione:  0 },
    curioso:    { reputazione:  1 },
    elusivo:    { reputazione: -2 }
  },

  edwynDrael: {
    formale:    { reputazione:  1 },
    amichevole: { reputazione:  1 },
    ironico:    { reputazione: -2 },
    distaccato: { reputazione:  0 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  2 },
    curioso:    { reputazione:  2 },
    elusivo:    { reputazione: -1 }
  },

  valkaStrenn: {
    formale:    { reputazione:  1 },
    amichevole: { reputazione: -1 },
    ironico:    { reputazione: -1 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione:  2 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione:  0 },
    elusivo:    { reputazione: -2 }
  },

  chiaraMotti: {
    formale:    { reputazione: -1 },
    amichevole: { reputazione:  3 },
    ironico:    { reputazione:  1 },
    distaccato: { reputazione: -2 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione:  0 },
    curioso:    { reputazione:  3 },
    elusivo:    { reputazione: -1 }
  },

  halvardMunk: {
    formale:    { reputazione:  0 },
    amichevole: { reputazione:  2 },
    ironico:    { reputazione:  1 },
    distaccato: { reputazione: -1 },
    diretto:    { reputazione:  3 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione:  1 },
    elusivo:    { reputazione: -2 }
  },

  tessalyWren: {
    formale:    { reputazione:  2 },
    amichevole: { reputazione:  0 },
    ironico:    { reputazione: -2 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione:  2 },
    cauto:      { reputazione:  1 },
    curioso:    { reputazione: -1 },
    elusivo:    { reputazione: -3 }
  },

  darioMenci: {
    formale:    { reputazione: -1 },
    amichevole: { reputazione:  3 },
    ironico:    { reputazione:  2 },
    distaccato: { reputazione: -2 },
    diretto:    { reputazione:  1 },
    cauto:      { reputazione: -1 },
    curioso:    { reputazione:  2 },
    elusivo:    { reputazione: -1 }
  },

  arisMelk: {
    formale:    { reputazione:  0 },
    amichevole: { reputazione: -1 },
    ironico:    { reputazione:  1 },
    distaccato: { reputazione:  1 },
    diretto:    { reputazione: -1 },
    cauto:      { reputazione:  2 },
    curioso:    { reputazione:  0 },
    elusivo:    { reputazione:  2 }
  }

};


// ------------------------------------------------------------
// PROGRESSIONE DEI COETANEI — schedule deterministico
// Ogni entry: { giorno, ramo, nuovoGrado }
// Il giorno è assoluto (dall'inizio della partita).
// Gli eventi narrativi attivi possono anticipare o posticipare
// questi avanzamenti tramite modificatori in game-engine.js.
// ------------------------------------------------------------
const PROGRESSIONE_COETANEI = {
  lucaFerri: [
    { giorno:  55, ramo: 'arcana',     nuovoGrado: 'Esperto'  },
    { giorno: 135, ramo: 'arcana',     nuovoGrado: 'Adepto'   },
    { giorno: 220, ramo: 'arcana',     nuovoGrado: 'Magister' }
  ],
  sylraKend: [
    { giorno:  45, ramo: 'erudizione', nuovoGrado: 'Copista'   },
    { giorno: 130, ramo: 'erudizione', nuovoGrado: 'Erudito'   },
    { giorno: 240, ramo: 'erudizione', nuovoGrado: 'Archivista'}
  ],
  brittaVorn: [
    { giorno:  65, ramo: 'arcana',     nuovoGrado: 'Esperto'  },
    { giorno: 155, ramo: 'arcana',     nuovoGrado: 'Adepto'   }
  ],
  marcoAlessi: [
    { giorno:  40, ramo: 'arcana',     nuovoGrado: 'Apprendista' },
    { giorno: 100, ramo: 'arcana',     nuovoGrado: 'Esperto'     },
    { giorno: 190, ramo: 'arcana',     nuovoGrado: 'Adepto'      }
  ],
  edwynDrael: [
    { giorno:  50, ramo: 'arcana',     nuovoGrado: 'Apprendista' },
    { giorno: 150, ramo: 'arcana',     nuovoGrado: 'Esperto'     }
  ],
  valkaStrenn: [
    { giorno:  50, ramo: 'arcana',     nuovoGrado: 'Esperto'  },
    { giorno: 125, ramo: 'arcana',     nuovoGrado: 'Adepto'   },
    { giorno: 210, ramo: 'arcana',     nuovoGrado: 'Magister' }
  ],
  chiaraMotti: [
    { giorno:  35, ramo: 'erudizione', nuovoGrado: 'Copista'   },
    { giorno: 110, ramo: 'erudizione', nuovoGrado: 'Erudito'   },
    { giorno: 220, ramo: 'erudizione', nuovoGrado: 'Archivista'}
  ]
};
