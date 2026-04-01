'use strict';

// ============================================================
// GAME-ENGINE.JS — Elenthyr
// Logica di gioco, progressione, stato del personaggio,
// reputazione PNG, sistema di gradi, calendario, eventi.
//
// Nessuna logica di interfaccia. Nessun accesso al DOM.
// Comunica con ui.js tramite chiamate esplicite e dati restituiti.
// ============================================================


// ------------------------------------------------------------
// STATO DEL GIOCO
// Struttura completa dello stato serializzabile in localStorage.
// ------------------------------------------------------------
let stato = null;  // inizializzato da nuovaPartita() o caricaPartita()

// Struttura dello stato iniziale di una nuova partita
function _creaStatoIniziale() {
  return {
    versione: '0.1.0',

    // Tempo
    giorno:   1,
    stagione: 'autunno',     // 'autunno' | 'inverno' | 'primavera' | 'estate'
    semestre: 1,             // 1 o 2 nella fase accademica, null nella post-accademica
    fasePostAccademica: false,
    // Quante notti sono state giocate nella settimana corrente
    nottiGiocateSettimana: 0,

    // Progressione del protagonista
    gradi: {
      arcana:     'Novizio',
      erudizione: 'Allievo'
    },

    // Progressione per singola disciplina (livello 0-100, interno)
    progressioneDiscipline: {
      teoriaArcana:   0,
      spellcasting:   0,
      rituali:        0,
      alchimia:       0,
      incantamento:   0,
      storia:         0,
      filosofia:      0,
      scienzeNaturali: 0,
      letteratura:    0
    },

    // Reputazione individuale per ogni PNG (-100 → +100)
    reputazione: _creaReputazioneIniziale(),

    // Slot giornalieri — array di oggetti {id, stato, contenuto}
    // Viene ricostruito ogni giorno da _preparaGiorno()
    slotGiorno: [],

    // Quali luoghi ha già visitato (per distinguere prima visita)
    luoghi: {
      aule:                   { visitato: false },
      biblioteca:             { visitato: false },
      laboratorioAlchimia:    { visitato: false },
      laboratorioIncantamento:{ visitato: false },
      salaRituale:            { visitato: false },
      cortile:                { visitato: false },
      torre:                  { visitato: false },
      archivioRiservato:      { visitato: false },
      scavi:                  { visitato: false }
    },

    // Eventi narrativi attivi [{id, tipo, durataResidua, dati}]
    eventiAttivi: [],

    // Task attive [{id, assegnatoDa, descrizione, scadenzaGiorno, completata}]
    taskAttive: [],

    // Indice dell'ultima voiceline usata per ogni PNG+trigger
    // (per evitare ripetizioni ravvicinate)
    ultimaVoiceline: {},

    // Flag: la sequenza di introduzione è già stata mostrata al giocatore
    introMostrata: false,

    // Avanzamenti di grado dei coetanei già processati (chiave: 'idPng_nuovoGrado')
    avanzamentiCoetanei: {},

    // Contatore fallimenti consecutivi per disciplina nello stesso semestre.
    // Struttura: { [idDisciplina]: N }. Azzerato al successo nella stessa disciplina.
    fallimentiConsecutivi: {},

    // Modificatore giornaliero ai punti disciplinari (bonus riposo, malus notte)
    // Resettato a 0 ogni mattina. Il malus notte è portato come carryover.
    _bonusGiorno: 0,
    _malusNotteCarryover: false,

    // Giorni in cui inizieranno i prossimi eventi narrativi ricorrenti.
    // Inizializzati al primo avvio da _generaEventiNarrativi().
    _prossimoGiornoMercante:   null,
    _prossimoGiornoEmissaria:  null,
    _prossimaDecisioneSenato:  null
  };
}

// Crea la mappa di reputazione iniziale per tutti i PNG
function _creaReputazioneIniziale() {
  const rep = {};
  Object.values(PERSONAGGI).forEach(png => {
    rep[png.id] = png.relazioneIniziale;
  });
  return rep;
}


// ------------------------------------------------------------
// NUOVA PARTITA / CARICAMENTO / SALVATAGGIO
// ------------------------------------------------------------
const CHIAVE_SALVATAGGIO = 'elenthyr_salvataggio';

function nuovaPartita() {
  stato = _creaStatoIniziale();
  _preparaGiorno();
  salva();
}

function salva() {
  if (!stato) return;
  try {
    localStorage.setItem(CHIAVE_SALVATAGGIO, JSON.stringify(stato));
  } catch (err) {
    console.warn('[Motore] Impossibile salvare in localStorage:', err);
  }
}

function caricaPartita() {
  try {
    const dati = localStorage.getItem(CHIAVE_SALVATAGGIO);
    if (!dati) return false;
    const caricato = JSON.parse(dati);
    // Merge con lo stato iniziale per garantire tutti i campi presenti
    // (protezione contro versioni precedenti o salvataggi parziali)
    stato = Object.assign(_creaStatoIniziale(), caricato);
    return true;
  } catch (err) {
    console.warn('[Motore] Impossibile caricare il salvataggio:', err);
    return false;
  }
}

function esportaSalvataggio() {
  if (!stato) return null;
  const contenuto = JSON.stringify(stato, null, 2);
  const blob = new Blob([contenuto], { type: 'text/plain;charset=utf-8' });
  return URL.createObjectURL(blob);
}

function importaSalvataggio(testoFile) {
  try {
    const datiImportati = JSON.parse(testoFile);
    // Verifica struttura minima
    if (!datiImportati.versione || !datiImportati.giorno || !datiImportati.gradi) {
      return false;
    }
    stato = datiImportati;
    salva();
    return true;
  } catch (err) {
    return false;
  }
}


// ------------------------------------------------------------
// SISTEMA TEMPORALE
// ------------------------------------------------------------

// Prepara gli slot del giorno corrente
function _preparaGiorno() {
  // Resetta modificatore giornaliero e applica eventuale malus notte dal giorno precedente.
  // Il malus notte (-2) è più pesante del bonus riposo (+1), coerentemente con il GDD.
  stato._bonusGiorno = 0;
  if (stato._malusNotteCarryover) {
    stato._bonusGiorno = -2;
    stato._malusNotteCarryover = false;
  }

  stato.slotGiorno = SLOT_GIORNALIERI.map(slot => ({
    id:         slot.id,
    nome:       slot.nome,
    stato:      'libero',    // 'libero' | 'obbligatorio' | 'completato' | 'saltato'
    tipoEvento: null,        // es. 'lezione', 'esame', 'cerimonia'
    idEvento:   null
  }));

  _pianificaEventiObbligatori();
  _controllaAvanzamentiCoetanei();

  // Lo slot notte è giocabile solo una volta a settimana
  if (!_notteGiocabileOggi()) {
    const slotNotte = stato.slotGiorno.find(s => s.id === 'notte');
    if (slotNotte) {
      slotNotte.stato = 'saltato';
    }
  }
}

// Determina se la notte è giocabile oggi
// (una sola volta per settimana, in un giorno randomico)
function _notteGiocabileOggi() {
  const giornoSettimana = ((stato.giorno - 1) % CALENDARIO.giorniPerSettimana) + 1;
  // Usa il numero di settimana come seed deterministico per il giorno notturno
  const settimanaCorrente = Math.floor((stato.giorno - 1) / CALENDARIO.giorniPerSettimana);
  const giornoNotturoSettimana = (settimanaCorrente % CALENDARIO.giorniPerSettimana) + 1;
  return giornoSettimana === giornoNotturoSettimana;
}

// Pianifica gli eventi obbligatori nel giorno corrente
// (lezioni, esami, cerimonie calendarizzate)
function _pianificaEventiObbligatori() {
  // Verifica se ci sono cerimonie calendarizzate per oggi
  const cerimonieOggi = stato.eventiAttivi.filter(
    ev => ev.tipo === 'cerimonia' && ev.dati && ev.dati.giornoCalendarizzato === stato.giorno
  );

  cerimonieOggi.forEach(cerimonia => {
    // Le cerimonie vanno nel primo slot mattutino libero
    const slotMattina = stato.slotGiorno.find(s => s.id === 'mattina' && s.stato === 'libero');
    if (slotMattina) {
      slotMattina.stato      = 'obbligatorio';
      slotMattina.tipoEvento = 'cerimonia';
      slotMattina.idEvento   = cerimonia.id;
    }
  });

  // Nella fase accademica: distribuzione lezioni
  // (da implementare completamente nella Fase 3)
  if (!stato.fasePostAccademica) {
    _pianificaLezioniGiornaliere();
  }
}

// Pianifica le lezioni o gli esami del giorno corrente negli slot disponibili.
// Chiamata solo durante la fase accademica.
// Le cerimonie sono già state inserite prima di questa chiamata,
// quindi i loro slot risultano già 'obbligatorio' e vengono saltati.
function _pianificaLezioniGiornaliere() {
  // Posizione all'interno della stagione corrente (1–60)
  const giornoNellaStagione = ((stato.giorno - 1) % CALENDARIO.giorniPerStagione) + 1;

  // Durante le pause formali nessuna lezione né esame
  if (
    (stato.stagione === 'estate' &&
      giornoNellaStagione >= CALENDARIO.pausaEstiva.inizio &&
      giornoNellaStagione <= CALENDARIO.pausaEstiva.fine) ||
    (stato.stagione === 'inverno' &&
      giornoNellaStagione >= CALENDARIO.pausaInvernale.inizio &&
      giornoNellaStagione <= CALENDARIO.pausaInvernale.fine)
  ) {
    return;
  }

  // Giorni 52–60 della stagione: sessione esami (9 giorni, una disciplina al giorno)
  const PRIMO_GIORNO_ESAMI = 52;
  const idDiscipline = Object.keys(DISCIPLINE);  // 9 discipline nell'ordine di data.js

  if (giornoNellaStagione >= PRIMO_GIORNO_ESAMI) {
    // Un esame al mattino, rotazione ciclica sulle 9 discipline
    const indiceDisciplina = (giornoNellaStagione - PRIMO_GIORNO_ESAMI) % idDiscipline.length;
    const slotMattina = stato.slotGiorno.find(s => s.id === 'mattina' && s.stato === 'libero');
    if (slotMattina) {
      slotMattina.stato      = 'obbligatorio';
      slotMattina.tipoEvento = 'esame';
      slotMattina.idEvento   = idDiscipline[indiceDisciplina];
    }
  } else {
    // Periodo lezioni: 2 lezioni al giorno in slot diurni (no pranzo, no sera, no notte)
    const SLOT_LEZIONE = ['mattina', 'tardaMattina', 'primoPomeriggio', 'tardoPomeriggio'];
    let lessioniPianificate = 0;

    for (const idSlot of SLOT_LEZIONE) {
      if (lessioniPianificate >= 2) break;
      const slot = stato.slotGiorno.find(s => s.id === idSlot && s.stato === 'libero');
      if (!slot) continue;

      // Rotazione deterministica: ogni coppia di slot di ogni giorno → disciplina diversa
      const indiceDisciplina = ((giornoNellaStagione - 1) * 2 + lessioniPianificate) % idDiscipline.length;
      slot.stato      = 'obbligatorio';
      slot.tipoEvento = 'lezione';
      slot.idEvento   = idDiscipline[indiceDisciplina];
      lessioniPianificate++;
    }
  }
}

// Avanza al giorno successivo
function avanzaGiorno() {
  // Aggiorna durata residua degli eventi
  _aggiornaDurataEventi();

  // Avanza il giorno
  stato.giorno += 1;

  // Verifica cambio stagione
  const giornoNellaStagione = ((stato.giorno - 1) % CALENDARIO.giorniPerStagione) + 1;
  if (giornoNellaStagione === 1 && stato.giorno > 1) {
    _avanzaStagione();
  }

  // Resetta il contatore notti a inizio settimana
  if ((stato.giorno - 1) % CALENDARIO.giorniPerSettimana === 0) {
    stato.nottiGiocateSettimana = 0;
  }

  // Genera nuovi eventi narrativi (visite, incidenti, decisioni del Senato)
  _generaEventiNarrativi();

  _preparaGiorno();
  salva();
}

// Avanza alla stagione successiva
function _avanzaStagione() {
  const indiceCorrente = ORDINE_STAGIONI.indexOf(stato.stagione);
  stato.stagione = ORDINE_STAGIONI[(indiceCorrente + 1) % ORDINE_STAGIONI.length];

  // Nella fase accademica, alterna tra semestre 1 e 2
  if (!stato.fasePostAccademica) {
    if (stato.semestre === 1) {
      stato.semestre = 2;
    } else {
      stato.semestre = 1;
    }
  }
}

// Aggiorna la durata residua di tutti gli eventi attivi
function _aggiornaDurataEventi() {
  stato.eventiAttivi = stato.eventiAttivi
    .map(ev => ({ ...ev, durataResidua: ev.durataResidua - 1 }))
    .filter(ev => ev.durataResidua > 0);
}


// ------------------------------------------------------------
// SISTEMA DI PROGRESSIONE E GRADI
// ------------------------------------------------------------

// Aggiunge punti progressione a una disciplina
// e verifica se il grado deve avanzare
function aggiungiProgressione(idDisciplina, punti) {
  if (!stato.progressioneDiscipline.hasOwnProperty(idDisciplina)) return;

  stato.progressioneDiscipline[idDisciplina] = Math.min(
    100,
    stato.progressioneDiscipline[idDisciplina] + punti
  );

  _verificaAvanzamentoGrado(idDisciplina);
  salva();
}

// Verifica se la progressione nella disciplina sblocca un nuovo grado
function _verificaAvanzamentoGrado(idDisciplina) {
  const disciplina = DISCIPLINE[idDisciplina];
  if (!disciplina) return;

  const ramo      = disciplina.ramo;
  const soglie    = _sogliePuntiPerGrado(ramo);
  const puntiAttuali = stato.progressioneDiscipline[idDisciplina];

  const gradoAttualeRamo  = stato.gradi[ramo];
  const listaGradi        = ramo === 'arcana' ? GRADI_ARCANA : GRADI_ERUDIZIONE;
  const indiceGradoAttuale = listaGradi.indexOf(gradoAttualeRamo);

  // Cerca il prossimo grado raggiungibile
  const prossimoIndice = indiceGradoAttuale + 1;
  if (prossimoIndice >= listaGradi.length) return;  // già al massimo

  const sogliaProssimoGrado = soglie[prossimoIndice];
  if (puntiAttuali >= sogliaProssimoGrado) {
    const nuovoGrado = listaGradi[prossimoIndice];
    _avanzaGrado(ramo, nuovoGrado, idDisciplina);
  }
}

// Soglie di punti per ogni grado (0-100 per grado)
// Ogni step costa più del precedente: 6, 10, 14, 18, 22, 26 punti
// Soglie: 0, 6, 16, 30, 48, 70, 96
function _sogliePuntiPerGrado(ramo) {
  const listaGradi = ramo === 'arcana' ? GRADI_ARCANA : GRADI_ERUDIZIONE;
  const soglie = [0, 6, 16, 30, 48, 70, 96];
  return listaGradi.map((_, i) => soglie[i] !== undefined ? soglie[i] : 96);
}

// Registra l'avanzamento a un nuovo grado e calendarizza la cerimonia.
// idDisciplina: la disciplina che ha causato l'avanzamento (es. 'alchimia').
// Viene salvata nei dati della cerimonia perché ui.js possa selezionare
// il monologo del docente competente.
function _avanzaGrado(ramo, nuovoGrado, idDisciplina) {
  stato.gradi[ramo] = nuovoGrado;

  // Verifica transizione alla fase post-accademica
  if (
    nuovoGrado === SOGLIA_POST_ACCADEMICA_ARCANA ||
    nuovoGrado === SOGLIA_POST_ACCADEMICA_ERUDIZIONE
  ) {
    stato.fasePostAccademica = true;
    stato.semestre = null;
  }

  // Calendarizza la cerimonia nel primo mattino libero successivo
  _calendarizzaCerimonia(ramo, nuovoGrado, idDisciplina || null);
}

// Trova il primo giorno futuro con lo slot mattina libero
// e registra la cerimonia come evento attivo.
// idDisciplina è incluso nei dati così ui.js può scegliere
// il monologo del docente corretto.
function _calendarizzaCerimonia(ramo, grado, idDisciplina) {
  // Cerca un giorno libero entro i prossimi 7 giorni
  for (let delta = 1; delta <= 7; delta++) {
    const giornoTarget = stato.giorno + delta;
    // Verifica che non ci siano già cerimonie in quel giorno
    const cerimoniaSovrapposta = stato.eventiAttivi.find(
      ev => ev.tipo === 'cerimonia' && ev.dati && ev.dati.giornoCalendarizzato === giornoTarget
    );
    if (!cerimoniaSovrapposta) {
      stato.eventiAttivi.push({
        id:            `cerimonia_${ramo}_${grado}_${stato.giorno}`,
        tipo:          'cerimonia',
        durataResidua: DURATA_EVENTI.minore,
        dati: {
          ramo:                 ramo,
          grado:                grado,
          idDisciplina:         idDisciplina || null,
          giornoCalendarizzato: giornoTarget
        }
      });
      break;
    }
  }
}

// Restituisce il grado attuale in un ramo
function leggiGrado(ramo) {
  return stato ? stato.gradi[ramo] : null;
}

// Verifica se il protagonista ha raggiunto almeno un certo grado
function haGrado(ramo, gradoRichiesto) {
  if (!stato) return false;
  const listaGradi = ramo === 'arcana' ? GRADI_ARCANA : GRADI_ERUDIZIONE;
  const indiceAttualeRamo   = listaGradi.indexOf(stato.gradi[ramo]);
  const indiceGradoRichiesto = listaGradi.indexOf(gradoRichiesto);
  return indiceAttualeRamo >= indiceGradoRichiesto;
}


// ------------------------------------------------------------
// REPUTAZIONE PNG
// ------------------------------------------------------------

// Modifica la reputazione con un PNG
// delta: numero positivo o negativo
function modificaReputazione(idPng, delta) {
  if (!stato || stato.reputazione[idPng] === undefined) return;
  stato.reputazione[idPng] = Math.max(-100, Math.min(100, stato.reputazione[idPng] + delta));
  salva();
}

// Legge il valore di reputazione con un PNG
function leggiReputazione(idPng) {
  if (!stato) return 0;
  return stato.reputazione[idPng] || 0;
}

// Restituisce una categoria descrittiva della relazione (per uso interno al motore)
// Non viene mai mostrata direttamente al giocatore
function categoriaRelazione(idPng) {
  const valore = leggiReputazione(idPng);
  if (valore >= 60)  return 'alta';
  if (valore >= 20)  return 'media';
  if (valore >= -20) return 'base';
  if (valore >= -60) return 'tesa';
  return 'ostile';
}


// ------------------------------------------------------------
// GESTIONE SLOT GIORNALIERI
// ------------------------------------------------------------

// Restituisce lo stato dello slot corrente
function leggiSlot(idSlot) {
  if (!stato) return null;
  return stato.slotGiorno.find(s => s.id === idSlot) || null;
}

// Marca uno slot come completato e salva.
// Se è lo slot notte, registra il malus da applicare al giorno successivo.
function completaSlot(idSlot) {
  const slot = leggiSlot(idSlot);
  if (!slot || slot.stato === 'completato') return false;
  slot.stato = 'completato';
  if (idSlot === 'notte') {
    stato.nottiGiocateSettimana++;
    stato._malusNotteCarryover = true;
  }
  salva();
  return true;
}

// Verifica se tutti gli slot del giorno sono completati o saltati
function tuttiSlotCompletati() {
  if (!stato) return false;
  return stato.slotGiorno.every(s => s.stato === 'completato' || s.stato === 'saltato');
}


// ------------------------------------------------------------
// GESTIONE LUOGHI
// ------------------------------------------------------------

// Marca un luogo come visitato (per mostrare la descrizione breve)
function segnaLuogoVisitato(idLuogo) {
  if (!stato || !stato.luoghi[idLuogo]) return;
  stato.luoghi[idLuogo].visitato = true;
  salva();
}

// Verifica se un luogo è accessibile in base al grado del protagonista.
// Se il luogo ha gradoMinimoAlt/ramoMinimoAlt, basta soddisfare uno dei due requisiti.
function luogoAccessibile(idLuogo) {
  const luogo = LUOGHI[idLuogo];
  if (!luogo) return false;
  if (!luogo.gradoMinimo) return true;  // accessibile a tutti

  const ramo = luogo.ramoMinimo || 'arcana';
  if (haGrado(ramo, luogo.gradoMinimo)) return true;

  if (luogo.gradoMinimoAlt) {
    const ramoAlt = luogo.ramoMinimoAlt || 'arcana';
    return haGrado(ramoAlt, luogo.gradoMinimoAlt);
  }

  return false;
}

// Verifica se un luogo è accessibile di notte
function luogoAccessibileNotte(idLuogo) {
  const luogo = LUOGHI[idLuogo];
  return luogo ? luogo.accessibileNotte : false;
}


// ------------------------------------------------------------
// EFFETTI DELLE ATTIVITÀ AUTOMATICHE
// Riposo, Socialità, Studio — effetti immediati e automatici
// ------------------------------------------------------------

// Applica l'effetto del Riposo.
// Produce un piccolo bonus ai punti disciplinari per il resto della giornata.
function applicaRiposo() {
  stato._bonusGiorno = (stato._bonusGiorno || 0) + 1;
  salva();
}

// Applica l'effetto della Socialità
function applicaSocialita() {
  // Piccolo bonus di reputazione con PNG casuali presenti
  const pngPresenti = _pngPresenteOggi();
  pngPresenti.slice(0, 2).forEach(idPng => {
    modificaReputazione(idPng, 2);
  });
}

// Applica l'effetto dello Studio
function applicaStudio() {
  if (!stato.fasePostAccademica) {
    // Nella fase accademica: bonus ai punti progressione per il resto della giornata
    stato._bonusGiorno = (stato._bonusGiorno || 0) + 2;
  } else {
    // Nella fase post-accademica: piccolo bonus permanente alla disciplina più carente
    const disciplinaCarente = _trovaDisciplinaCarente();
    if (disciplinaCarente) {
      const modificatore = stato._bonusGiorno || 0;
      aggiungiProgressione(disciplinaCarente, Math.max(1, 2 + modificatore));
    }
  }
  salva();
}

// Trova la disciplina con il punteggio più basso
function _trovaDisciplinaCarente() {
  let minPunti  = Infinity;
  let disciplina = null;
  Object.entries(stato.progressioneDiscipline).forEach(([id, punti]) => {
    if (punti < minPunti) {
      minPunti  = punti;
      disciplina = id;
    }
  });
  return disciplina;
}

// Applica gli effetti di un'attività svolta in un luogo.
// Chiamata da ui.js — unico punto di accesso per gli effetti delle attività dei luoghi.
// Restituisce i punti progressione aggiunti (0 se nessuno).
function applicaAttivitaLuogo(idAttivita, idLuogo) {
  // Mappa luogo → disciplina principale.
  // Biblioteca e Cortile non hanno una disciplina generica:
  // la biblioteca offre attività disciplinari esplicite,
  // il cortile è esclusivamente sociale e non avanza nessuna disciplina.
  const disciplinaDaLuogo = {
    aule:                    'teoriaArcana',
    laboratorioAlchimia:     'alchimia',
    laboratorioIncantamento: 'incantamento',
    salaRituale:             'rituali',
    torre:                   'scienzeNaturali',
    archivioRiservato:       'storia',
    scavi:                   null
  };

  // Mappa attività → disciplina specifica (ha precedenza sulla mappa luogo)
  const disciplinaDaAttivita = {
    praticaAlchemica:     'alchimia',
    praticaIncantamento:  'incantamento',
    praticaRituale:       'rituali',
    minigioco:            'spellcasting',
    creazioneOggetti:     'incantamento',
    osservazione:         'scienzeNaturali',
    ricercaRara:          'storia',
    // Attività disciplinari specifiche della biblioteca
    ricercaStoria:        'storia',
    ricercaFilosofia:     'filosofia',
    ricercaScienze:       'scienzeNaturali',
    ricercaLetteratura:   'letteratura'
  };

  // Mappa attività → punti progressione (ridotti rispetto alla versione precedente)
  const puntiDaAttivita = {
    studio:              4,
    ricercaAvanzata:     4,
    ricercaRara:         6,
    praticaAlchemica:    5,
    praticaIncantamento: 5,
    praticaRituale:      5,
    minigioco:           3,
    creazioneOggetti:    3,
    osservazione:        3,
    ricercaStoria:       4,
    ricercaFilosofia:    4,
    ricercaScienze:      4,
    ricercaLetteratura:  4,
    socialita:           0,
    incontro:            0,
    dialogo:             0
  };

  let puntiAggiunti = 0;

  // Effetti sociali nel cortile: bonus reputazionale maggiore dell'attività automatica
  if (idLuogo === 'cortile' && (idAttivita === 'socialita' || idAttivita === 'incontro')) {
    _applicaSocialitaCortile();
  } else if (idAttivita === 'socialita' || idAttivita === 'incontro') {
    applicaSocialita();
  }

  // Effetti di progressione disciplina
  const disciplina = disciplinaDaAttivita[idAttivita] || disciplinaDaLuogo[idLuogo];
  const punti      = puntiDaAttivita[idAttivita] !== undefined ? puntiDaAttivita[idAttivita] : 3;

  if (disciplina && punti > 0) {
    // Applica modificatore giornaliero (bonus riposo +1, malus notte -2)
    const modificatore = stato._bonusGiorno || 0;
    const puntiEffettivi = Math.max(1, punti + modificatore);
    aggiungiProgressione(disciplina, puntiEffettivi);
    puntiAggiunti = puntiEffettivi;
  }

  salva();
  return puntiAggiunti;
}

// Effetto sociale del cortile: bonus reputazionale maggiore della Socialità automatica.
// Seleziona 3 PNG dal pool del cortile e dà +4 a ciascuno (vs +2 a 2 PNG della Socialità base).
function _applicaSocialitaCortile() {
  const poolCortile = PNG_NEL_LUOGO.cortile || [];
  if (poolCortile.length === 0) {
    applicaSocialita();
    return;
  }
  // Rotazione deterministica: 3 PNG diversi ogni giorno
  const offset = stato.giorno % poolCortile.length;
  const selezionati = [
    poolCortile[offset % poolCortile.length],
    poolCortile[(offset + 1) % poolCortile.length],
    poolCortile[(offset + 2) % poolCortile.length]
  ];
  selezionati.forEach(idPng => {
    modificaReputazione(idPng, 4);
  });
}

// ============================================================
// SISTEMA DIALOGO PNG
// Seleziona la conversazione appropriata per un luogo
// e applica gli effetti della scelta del giocatore.
// ============================================================

// Verifica se un PNG è un "membro fisso" del luogo (docente o ruolo equivalente).
// I membri fissi sono sempre presenti nel loro luogoPrincipale — non ruotano.
function _isMembroFisso(png) {
  if (!png.ruolo) return false;
  return png.ruolo.startsWith('Docente') || png.ruolo === 'Bibliotecaria';
}

// Restituisce i coetanei (studenti) presenti in un luogo oggi
// tramite rotazione deterministica basata sul giorno.
// Ogni studente è nel proprio luogoPrincipale + visita un altro luogo a rotazione.
function _coetaneiNelLuogoOggi(idLuogo) {
  const studenti = Object.values(PERSONAGGI)
    .filter(png => png.ruolo === 'Studente' || png.ruolo === 'Studentessa');

  // Luoghi visitabili nella rotazione (esclusi scavi e cortile — già gestito da PNG_NEL_LUOGO)
  const luoghiRuotabili = ORDINE_LUOGHI.filter(l => l !== 'scavi' && l !== 'cortile');

  return studenti
    .filter((png, i) => {
      if (png.luogoPrincipale === idLuogo) return true;
      // Ogni giorno ogni studente "visita" un luogo diverso dal suo principale
      const luogoVisita = luoghiRuotabili[(stato.giorno + i) % luoghiRuotabili.length];
      return luogoVisita === idLuogo;
    })
    .map(png => png.id);
}

// Trova il PNG interlocutore per un dialogo in un dato luogo.
// Priorità: 1) membri fissi del luogo con DIALOGHI, 2) pool esteso (PNG_NEL_LUOGO),
// 3) coetanei con DIALOGHI (propri o di rotazione).
// In ogni categoria preferisce il PNG con la relazione più alta.
function _pngPrincipalePerLuogo(idLuogo) {
  // 1. Membri fissi (docenti, bibliotecaria) — sempre presenti nel loro luogo
  const membriConDialoghi = Object.values(PERSONAGGI)
    .filter(png => png.luogoPrincipale === idLuogo && _isMembroFisso(png) && DIALOGHI_PNG[png.id])
    .map(png => png.id);

  if (membriConDialoghi.length > 0) {
    membriConDialoghi.sort((a, b) => (stato.reputazione[b] || 0) - (stato.reputazione[a] || 0));
    return membriConDialoghi[0];
  }

  // 2. Pool esteso per luoghi sociali (es. cortile)
  if (PNG_NEL_LUOGO[idLuogo]) {
    const candidati = PNG_NEL_LUOGO[idLuogo].filter(id => DIALOGHI_PNG[id]);
    if (candidati.length > 0) {
      candidati.sort((a, b) => (stato.reputazione[b] || 0) - (stato.reputazione[a] || 0));
      return candidati[0];
    }
  }

  // 3. Coetanei con luogoPrincipale qui + coetanei in rotazione oggi
  const coetaneiDiretti = Object.values(PERSONAGGI)
    .filter(png => png.luogoPrincipale === idLuogo && !_isMembroFisso(png) && DIALOGHI_PNG[png.id])
    .map(png => png.id);
  const coetaneiRotazione = _coetaneiNelLuogoOggi(idLuogo)
    .filter(id => DIALOGHI_PNG[id] && !coetaneiDiretti.includes(id));

  const tuttiCoetanei = [...coetaneiDiretti, ...coetaneiRotazione];
  if (tuttiCoetanei.length === 0) return null;

  tuttiCoetanei.sort((a, b) => (stato.reputazione[b] || 0) - (stato.reputazione[a] || 0));
  return tuttiCoetanei[0];
}

// Determina la lunghezza della conversazione in base a relazione, luogo e grado.
// Cortile: sempre media (relazione base/media) o lunga (relazione alta).
// Altri luoghi: breve (base), media (media), lunga (alta).
function _determinaLunghezzaDialogo(idPng, idLuogo) {
  const relazione = categoriaRelazione(idPng);
  if (idLuogo === 'cortile') {
    return relazione === 'alta' ? 'lunga' : 'media';
  }
  if (relazione === 'alta')  return 'lunga';
  if (relazione === 'media') return 'media';
  return 'breve';
}

// Restituisce il numero target di scambi per una data lunghezza.
// I valori sono conservativi per adattarsi ai pool attuali;
// cresceranno man mano che i contenuti di narrative.js si espandono.
function _numScambiPerLunghezza(lunghezza) {
  const mappa = { breve: 1, media: 2, lunga: 3 };
  return mappa[lunghezza] || 1;
}

// Seleziona una sequenza di scambi di dialogo per un'intera conversazione.
// Gestisce: primoIngresso (una tantum), rotazione anti-ripetizione,
// livello di relazione, lunghezza determinata da _determinaLunghezzaDialogo.
// Restituisce { idPng, scambi: [...], lunghezza } oppure null.
function selezionaSequenzaDialogo(idLuogo) {
  if (!stato) return null;
  const idPng = _pngPrincipalePerLuogo(idLuogo);
  if (!idPng) return null;

  const datiPng = DIALOGHI_PNG[idPng];
  if (!datiPng) return null;

  const lunghezza  = _determinaLunghezzaDialogo(idPng, idLuogo);
  const numScambi  = _numScambiPerLunghezza(lunghezza);
  const sequenza   = [];
  const usati      = new Set();  // chiavi 'contesto_indice' già incluse in questa conv.

  // 1. primoIngresso — selezionato una sola volta in assoluto per questo PNG
  const chiavePrimo = `dialogo_primo_${idPng}`;
  if (stato.ultimaVoiceline[chiavePrimo] !== true && datiPng.primoIngresso) {
    const pool = Array.isArray(datiPng.primoIngresso) ? datiPng.primoIngresso : [datiPng.primoIngresso];
    const chiaveTracker = `dialogo_${idPng}_primoIngresso`;
    const ultimoIdx = stato.ultimaVoiceline[chiaveTracker] !== undefined
      ? stato.ultimaVoiceline[chiaveTracker] : -1;
    const idx = (ultimoIdx + 1) % pool.length;
    stato.ultimaVoiceline[chiaveTracker] = idx;
    stato.ultimaVoiceline[chiavePrimo]   = true;
    sequenza.push(pool[idx]);
    usati.add(`primoIngresso_${idx}`);
  }

  // 2. Scambi di approccio fino a riempire numScambi
  if (datiPng.approccio && sequenza.length < numScambi) {
    const livello = categoriaRelazione(idPng);
    const chiaveRel = livello === 'alta'  ? 'relazioneAlta'  :
                      livello === 'media' ? 'relazioneMedia' : 'relazioneBase';

    const pool = Array.isArray(datiPng.approccio)
      ? datiPng.approccio
      : (datiPng.approccio[chiaveRel] || datiPng.approccio.relazioneBase || []);

    if (pool.length > 0) {
      const chiaveTracker = `dialogo_${idPng}_approccio`;
      let ultimoIdx = stato.ultimaVoiceline[chiaveTracker] !== undefined
        ? stato.ultimaVoiceline[chiaveTracker] : -1;

      // Prende tanti scambi consecutivi quanti ne servono, senza ripetere nella stessa conv.
      for (let t = 0; t < pool.length && sequenza.length < numScambi; t++) {
        const idx  = (ultimoIdx + 1 + t) % pool.length;
        const key  = `approccio_${idx}`;
        if (!usati.has(key)) {
          sequenza.push(pool[idx]);
          usati.add(key);
          // Aggiorna il tracker all'ultimo indice usato in questa conversazione
          stato.ultimaVoiceline[chiaveTracker] = idx;
        }
      }
    }
  }

  if (sequenza.length === 0) return null;

  // TODO (Sistema 2): preferire scambi contestuali agli eventi attivi quando disponibili.
  // Verificare stato.eventiAttivi per tipi 'visitaMercante', 'visitaEmissaria',
  // 'decisioneSenato', 'incidenteInterno' e, se datiPng.evento esiste per quel tipo,
  // anteporre uno scambio contestuale prima degli scambi di approccio ordinari.

  salva();
  return { idPng, scambi: sequenza, lunghezza };
}

// Applica gli effetti del tono scelto durante un dialogo.
// Se il PNG ha una scheda in EFFETTI_TONO_PNG, usa quella (reputazione + eventuale progressione).
// Altrimenti usa i delta di default generici.
// Chiamata da ui.js dopo la scelta del giocatore.
// Restituisce l'effetto applicato (per uso opzionale in ui.js).
function applicaSceltaDialogo(idPng, tono) {
  const effettiPng = EFFETTI_TONO_PNG[idPng];

  if (effettiPng && effettiPng[tono]) {
    const effetto = effettiPng[tono];
    if (effetto.reputazione !== undefined && effetto.reputazione !== 0) {
      modificaReputazione(idPng, effetto.reputazione);
    }
    if (effetto.progressione) {
      aggiungiProgressione(effetto.progressione.disciplina, effetto.progressione.punti);
    }
    return effetto;
  }

  // Fallback: delta generici indipendenti dall'archetipo
  const deltaTono = {
    formale:    1,
    amichevole: 2,
    curioso:    1,
    cauto:      1,
    diretto:    0,
    scettico:  -1,
    ironico:   -1,
    distaccato:-1,
    elusivo:   -2
  };
  const delta = deltaTono[tono] !== undefined ? deltaTono[tono] : 0;
  if (delta !== 0) modificaReputazione(idPng, delta);
  return null;
}


// Controlla se oggi qualche coetaneo ha raggiunto un nuovo grado
// secondo lo schedule deterministico in PROGRESSIONE_COETANEI.
// Se sì, calendarizza la cerimonia di ascensione.
function _controllaAvanzamentiCoetanei() {
  if (!PROGRESSIONE_COETANEI) return;
  if (!stato.avanzamentiCoetanei) stato.avanzamentiCoetanei = {};

  Object.entries(PROGRESSIONE_COETANEI).forEach(([idPng, schedule]) => {
    schedule.forEach(avanzamento => {
      const chiave = `${idPng}_${avanzamento.nuovoGrado}`;
      if (stato.avanzamentiCoetanei[chiave]) return;  // già processato
      if (stato.giorno >= avanzamento.giorno) {
        stato.avanzamentiCoetanei[chiave] = true;
        _calendarizzaCerimoniaCoetaneo(idPng, avanzamento.ramo, avanzamento.nuovoGrado);
      }
    });
  });
}

// Calendarizza la cerimonia di ascensione di un coetaneo
// nel primo slot mattutino libero dei prossimi 7 giorni.
function _calendarizzaCerimoniaCoetaneo(idPng, ramo, nuovoGrado) {
  for (let delta = 1; delta <= 7; delta++) {
    const giornoTarget = stato.giorno + delta;
    const cerimoniaSovrapposta = stato.eventiAttivi.find(
      ev => ev.tipo === 'cerimonia' && ev.dati && ev.dati.giornoCalendarizzato === giornoTarget
    );
    if (!cerimoniaSovrapposta) {
      stato.eventiAttivi.push({
        id:            `cerimonia_coetaneo_${idPng}_${nuovoGrado}_${stato.giorno}`,
        tipo:          'cerimonia',
        durataResidua: DURATA_EVENTI.minore,
        dati: {
          idPng,
          ramo,
          grado:                nuovoGrado,
          giornoCalendarizzato: giornoTarget,
          eCoetaneo:            true
        }
      });
      break;
    }
  }
}


// Restituisce un subset di PNG "presenti" oggi in base a logica semplificata
function _pngPresenteOggi() {
  // Usa il giorno come seed per selezionare PNG in modo deterministico
  const tutti = Object.keys(stato.reputazione);
  const offset = stato.giorno % tutti.length;
  return tutti.slice(offset, offset + 4).concat(tutti.slice(0, Math.max(0, offset + 4 - tutti.length)));
}


// Espone la lunghezza della conversazione per uso in ui.js
function determinaLunghezzaDialogo(idPng, idLuogo) {
  return _determinaLunghezzaDialogo(idPng, idLuogo);
}


// ------------------------------------------------------------
// INDICATORE TEMPORALE
// Restituisce la stringa da mostrare nella fascia superiore.
// ------------------------------------------------------------
function testoIndicatoreTemporale() {
  if (!stato) return '';

  const stagione  = STAGIONI[stato.stagione].nome;
  const giorno    = stato.giorno;

  if (stato.fasePostAccademica) {
    return `${stagione} · Giorno ${giorno}`;
  } else {
    return `${stagione} · Giorno ${giorno} · S${stato.semestre}`;
  }
}


// ------------------------------------------------------------
// ACCESSO ALLO STATO (lettura)
// Funzioni che ui.js può chiamare per leggere lo stato.
// ------------------------------------------------------------
function leggiStato() {
  return stato;
}

function leggiSlotGiorno() {
  return stato ? stato.slotGiorno : [];
}

function leggiEventiAttivi() {
  return stato ? stato.eventiAttivi : [];
}

function leggiTaskAttive() {
  return stato ? stato.taskAttive : [];
}


// ------------------------------------------------------------
// CONSEGUENZE FALLIMENTO MINIGIOCO
// ------------------------------------------------------------

// Mapping disciplina → docente principale, usato per il malus reputazionale.
// Per sblocaggioReagente e dissolvenza la disciplina passata è alchimia/incantamento.
const _DISCIPLINA_DOCENTE = {
  teoriaArcana:    'corneliaVesti',
  spellcasting:    'kaelDorne',
  rituali:         'sevanDrath',
  alchimia:        'pietroVasso',
  incantamento:    'hildaVorn',
  storia:          'matteoServi',
  filosofia:       'marenSolde',
  scienzeNaturali: 'edvarSollen'
};

// Restituisce 'base', 'media' o 'alta' in base al grado del protagonista
// nel ramo rilevante per la disciplina coinvolta.
function _fasciaGradoCorrente(idDisciplina) {
  const disciplina = DISCIPLINE[idDisciplina];
  const ramo = disciplina ? disciplina.ramo : 'arcana';
  const grado = stato.gradi[ramo];
  const listaGradi = ramo === 'arcana' ? GRADI_ARCANA : GRADI_ERUDIZIONE;
  const indice = listaGradi.indexOf(grado);

  if (ramo === 'arcana') {
    // Novizio (0) → base; Apprendista/Esperto (1-2) → media; Adepto+ (3+) → alta
    if (indice <= 0) return 'base';
    if (indice <= 2) return 'media';
    return 'alta';
  } else {
    // Allievo/Copista (0-1) → base; Erudito (2) → media; Archivista+ (3+) → alta
    if (indice <= 1) return 'base';
    if (indice === 2) return 'media';
    return 'alta';
  }
}

// Registra un fallimento in una disciplina e applica le conseguenze meccaniche.
// Restituisce la fascia di grado ('base' | 'media' | 'alta') per uso in ui.js.
function gestisciFallimentoMinigioco(idDisciplina) {
  if (!stato) return 'base';
  if (!stato.fallimentiConsecutivi) stato.fallimentiConsecutivi = {};

  // Incrementa contatore fallimenti consecutivi per questa disciplina
  stato.fallimentiConsecutivi[idDisciplina] = (stato.fallimentiConsecutivi[idDisciplina] || 0) + 1;
  const fallimentiConsec = stato.fallimentiConsecutivi[idDisciplina];

  const fascia  = _fasciaGradoCorrente(idDisciplina);
  const docente = _DISCIPLINA_DOCENTE[idDisciplina];

  if (fascia === 'media') {
    // Malus reputazionale solo dal secondo fallimento consecutivo
    if (fallimentiConsec >= 2 && docente) {
      modificaReputazione(docente, -2);
    }
  } else if (fascia === 'alta') {
    // Primo fallimento: -2; secondo+ fallimento consecutivo: -4
    if (docente) {
      const malus = fallimentiConsec >= 2 ? -4 : -2;
      modificaReputazione(docente, malus);
    }

    // Se c'è una task attiva per questa disciplina, marcala come fallita
    if (stato.taskAttive && stato.taskAttive.length > 0) {
      stato.taskAttive.forEach(task => {
        if (task.disciplina === idDisciplina && !task.completata && task.esito !== 'fallita') {
          task.esito = 'fallita';
        }
      });
    }
  }

  salva();
  return fascia;
}

// Registra un successo in una disciplina: azzera il contatore dei fallimenti consecutivi.
function gestisciSuccessoMinigioco(idDisciplina) {
  if (!stato) return;
  if (!stato.fallimentiConsecutivi) stato.fallimentiConsecutivi = {};
  stato.fallimentiConsecutivi[idDisciplina] = 0;
  salva();
}

// Rimuove punti progressione da una disciplina.
// Usata per annullare la progressione in caso di fallimento fascia alta.
// Clamp a 0 — non può scendere sotto zero.
function rimuoviProgressioneMinigioco(idDisciplina, punti) {
  if (!stato || !stato.progressioneDiscipline.hasOwnProperty(idDisciplina) || punti <= 0) return;
  stato.progressioneDiscipline[idDisciplina] = Math.max(
    0,
    stato.progressioneDiscipline[idDisciplina] - punti
  );
  salva();
}


// ------------------------------------------------------------
// SISTEMA EVENTI NARRATIVI RICORRENTI
// ------------------------------------------------------------

// Inizializza i campi di programmazione degli eventi ricorrenti se assenti.
// Necessario per compatibilità con salvataggi antecedenti al sistema eventi.
function _inizializzaProgrammazioneEventi(g) {
  if (stato._prossimoGiornoMercante  == null) stato._prossimoGiornoMercante  = g + 15 + Math.floor(Math.random() * 6);
  if (stato._prossimoGiornoEmissaria == null) stato._prossimoGiornoEmissaria = g + 40 + Math.floor(Math.random() * 21);
  if (stato._prossimaDecisioneSenato == null) stato._prossimaDecisioneSenato = g + 30 + Math.floor(Math.random() * 16);
}

// Aggiunge un evento narrativo ricorrente standard alla lista degli eventi attivi.
function _aggiungiEventoRicorrente(tipo, g, durata, descrizione, pngCoinvolti) {
  stato.eventiAttivi.push({
    id:            `${tipo}_${g}`,
    tipo,
    durataResidua: durata,
    descrizione,
    pngCoinvolti,
    effetti:       {}
  });
}

// Genera automaticamente gli eventi narrativi ricorrenti per il giorno corrente.
// Chiamata da avanzaGiorno() dopo aver aggiornato stato.giorno.
function _generaEventiNarrativi() {
  const g = stato.giorno;
  _inizializzaProgrammazioneEventi(g);

  // --- Visita Mercante ---
  if (!stato.eventiAttivi.find(ev => ev.tipo === 'visitaMercante') && g >= stato._prossimoGiornoMercante) {
    const durata = 7;
    _aggiungiEventoRicorrente('visitaMercante', g, durata, `Dario Menci è in visita all'accademia.`, ['darioMenci']);
    // Prossima visita: 15–20 giorni dopo la fine di questa
    stato._prossimoGiornoMercante = g + durata + 15 + Math.floor(Math.random() * 6);
  }

  // --- Visita Emissaria ---
  if (!stato.eventiAttivi.find(ev => ev.tipo === 'visitaEmissaria') && g >= stato._prossimoGiornoEmissaria) {
    const durata = 15;
    _aggiungiEventoRicorrente('visitaEmissaria', g, durata, `Sigrid Vael è presente nell'accademia.`, ['sigridVael']);
    stato._prossimoGiornoEmissaria = g + durata + 40 + Math.floor(Math.random() * 21);
  }

  // --- Decisione Senato ---
  if (!stato.eventiAttivi.find(ev => ev.tipo === 'decisioneSenato') && g >= stato._prossimaDecisioneSenato) {
    const durata = 15;
    _aggiungiEventoRicorrente('decisioneSenato', g, durata, `Il Senato Accademico è in deliberazione.`, ['valdricSonn', 'brennarOstk', 'liviaCauro']);
    stato._prossimaDecisioneSenato = g + durata + 30 + Math.floor(Math.random() * 16);
  }

  // --- Incidente Interno ---
  // Probabilità 8% al giorno, non si sovrappone a cerimonie né a un incidente già attivo.
  const incidenteAttivo = stato.eventiAttivi.find(ev => ev.tipo === 'incidenteInterno');
  const cerimoniaOggi   = stato.eventiAttivi.find(
    ev => ev.tipo === 'cerimonia' && ev.dati && ev.dati.giornoCalendarizzato === g
  );
  if (!incidenteAttivo && !cerimoniaOggi && Math.random() < 0.08) {
    const durata      = 7;
    // TESTI_INCIDENTI_INTERNI è definita in narrative.js (carica prima di game-engine.js)
    const pool        = typeof TESTI_INCIDENTI_INTERNI !== 'undefined' ? TESTI_INCIDENTI_INTERNI : [];
    const descrizione = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : `Qualcosa di insolito è accaduto nell'accademia.`;
    _aggiungiEventoRicorrente('incidenteInterno', g, durata, descrizione, []);
  }
}


function primaVisitaLuogo(idLuogo) {
  if (!stato || !stato.luoghi[idLuogo]) return true;
  return !stato.luoghi[idLuogo].visitato;
}

// Segna la sequenza di introduzione come già mostrata
function segnaIntroMostrata() {
  if (!stato) return;
  stato.introMostrata = true;
  salva();
}

// Restituisce true se l'intro è già stata mostrata o se il gioco è già avanzato.
// Gestisce correttamente i salvataggi creati prima di questo campo.
function introGiaMostrata() {
  if (!stato) return false;
  if (stato.introMostrata === true) return true;
  // Salvataggi precedenti alla versione con introMostrata:
  // se il gioco è già avanzato oltre il giorno 1, l'intro è implicitamente già avvenuta
  return stato.giorno > 1;
}


// ------------------------------------------------------------
// INIZIALIZZAZIONE DEL MOTORE
// Chiamata da ui.js al primo avvio.
// ------------------------------------------------------------
function inizializzaMotore() {
  const caricato = caricaPartita();
  if (!caricato) {
    nuovaPartita();
  }
}
