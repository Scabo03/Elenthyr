'use strict';

// ============================================================
// MINIGAMES.JS — Elenthyr
// Logica di tutti i minigiochi, indipendente dal motore principale.
//
// I minigiochi comunicano con game-engine.js SOLO tramite
// l'interfaccia definita qui sotto — mai accedendo direttamente
// allo stato del gioco.
//
// Tutti i minigiochi sono progettati audio-first e aptici-first:
// completamente giocabili senza guardare lo schermo.
//
// Dipendenze esterne (disponibili a runtime per ordine di caricamento):
//   - game-engine.js: aggiungiProgressione(), leggiGrado()
//   - data.js: CONFIG_MINIGIOCHI, DISCIPLINE
//   - ui.js: _annunciaVoiceoverSafe()
//     NB: minigames.js è caricato prima di ui.js, quindi annunciaVoiceover
//     non esiste al parse time ma è disponibile quando i minigiochi vengono
//     avviati dall'utente (dopo che ui.js è stato eseguito).
//
// Minigiochi implementati:
//   - Memory delle Rune (Incantamento)
//   - Minesweeper dei Reagenti (Alchimia)
//   - Labirinto dell'Equilibrio (Rituali)
//   - Mastermind delle Formule (Teoria Arcana) — solo via lezioni/esami
//   - Meccanica di Spellcasting (Spellcasting) — solo via lezioni/esami
//   - Rebus Accessibile (Erudizione) — solo via lezioni/esami
//   - Sbloccaggio Reagente (Alchimia — attività libera in laboratorio)
//   - Dissolvenza (Incantamento — attività libera in laboratorio)
// ============================================================


// ------------------------------------------------------------
// WRAPPER DIFENSIVO PER ANNUNCI VOICEOVER
// _annunciaVoiceoverSafe() è definita in ui.js (caricato dopo).
// Questo wrapper protegge le chiamate da ReferenceError nel
// caso in cui ui.js non fosse ancora eseguito.
// ------------------------------------------------------------
function _annunciaVoiceoverSafe(testo) {
  if (typeof annunciaVoiceover === 'function') {
    annunciaVoiceover(testo);
  }
}


// ------------------------------------------------------------
// INTERFACCIA CON IL MOTORE DI GIOCO
// Le sole funzioni che i minigiochi possono chiamare
// per produrre effetti sullo stato.
// ------------------------------------------------------------
const InterfacciaMinigiochi = {
  // Registra il risultato di un minigioco completato
  // idMinigioco: stringa identificativa
  // risultato: 'ottimale' | 'buono' | 'accettabile' | 'fallito'
  // idDisciplina: disciplina a cui appartiene il minigioco
  registraRisultato(idMinigioco, risultato, idDisciplina) {
    const puntiPerRisultato = {
      ottimale:    7,
      buono:       4,
      accettabile: 2,
      fallito:     0
    };

    const punti = puntiPerRisultato[risultato] || 0;

    if (punti > 0 && idDisciplina) {
      aggiungiProgressione(idDisciplina, punti);
    }

    // Ritorna i punti ottenuti per il feedback narrativo
    return punti;
  },

  // Legge il grado del protagonista nella disciplina
  // (per determinare la difficoltà)
  leggiGradoDisciplina(idDisciplina) {
    const disciplina = DISCIPLINE[idDisciplina];
    if (!disciplina) return null;
    return leggiGrado(disciplina.ramo);
  }
};


// ------------------------------------------------------------
// STATO CORRENTE DEL MINIGIOCO ATTIVO
// Un solo minigioco alla volta può essere attivo.
// ------------------------------------------------------------
let minigiocoAttivo = null;


// ------------------------------------------------------------
// SISTEMA DI TENTATIVI E RENDIMENTI DECRESCENTI
// Al primo tentativo: risultato ottimale.
// Al secondo/terzo: buono.
// Oltre il terzo: accettabile.
// ------------------------------------------------------------
const contatoriTentativi = {};  // { idMinigioco: numTentativi }

function _incrementaTentativi(idMinigioco) {
  contatoriTentativi[idMinigioco] = (contatoriTentativi[idMinigioco] || 0) + 1;
  return contatoriTentativi[idMinigioco];
}

function _categoriaRisultato(idMinigioco, riuscito) {
  if (!riuscito) return 'fallito';
  const tentativi = contatoriTentativi[idMinigioco] || 1;
  if (tentativi === 1) return 'ottimale';
  if (tentativi <= 3)  return 'buono';
  return 'accettabile';
}


// ------------------------------------------------------------
// FEEDBACK APTICO
// Riservato ai minigiochi di Alchimia, Incantamento,
// Rituali e Spellcasting.
// Testare esclusivamente su dispositivo fisico.
// ------------------------------------------------------------
function _vibra(pattern) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

const Aptico = {
  leggero:          () => _vibra(30),
  medio:            () => _vibra(60),
  forte:            () => _vibra(100),
  doppio:           () => _vibra([40, 30, 40]),
  trillo:           () => _vibra([20, 10, 20, 10, 20]),
  lungo:            () => _vibra(200),
  errore:           () => _vibra([80, 50, 80]),
  irregolare:       () => _vibra([30, 20, 50, 20, 30]),
  // Pattern crescente (per avvicinamento all'equilibrio nei Rituali)
  crescente(intensita) {
    const durata = Math.round(20 + intensita * 80);
    _vibra(durata);
  }
};


// ------------------------------------------------------------
// AUDIO SINTETICO PER I MINIGIOCHI
// Usa l'AudioContext di audio.js — un solo contesto per
// tutta l'app (pratica corretta su Safari iOS).
// ------------------------------------------------------------

// Restituisce il contesto audio condiviso (da audio.js)
function _contestoAudio() {
  return (typeof Audio !== 'undefined' && Audio.leggiContesto)
    ? Audio.leggiContesto()
    : null;
}

// Genera un suono sintetico breve
// frequenza: Hz, durata: secondi, forma: tipo oscillatore, volume: 0-1
function _suonoMinigioco(frequenza, durata, forma, volume) {
  const ctx = _contestoAudio();
  if (!ctx || ctx.state === 'suspended') return;

  const oscillatore = ctx.createOscillator();
  const guadagno    = ctx.createGain();

  oscillatore.type              = forma;
  oscillatore.frequency.value   = frequenza;
  guadagno.gain.value           = volume * 0.25;

  oscillatore.connect(guadagno);
  guadagno.connect(ctx.destination);

  const ora = ctx.currentTime;
  oscillatore.start(ora);
  guadagno.gain.exponentialRampToValueAtTime(0.001, ora + durata);
  oscillatore.stop(ora + durata + 0.01);
}


// ------------------------------------------------------------
// MEMORY DELLE RUNE — Incantamento
// Il giocatore abbina coppie di rune tramite firma sonora e aptica.
// ------------------------------------------------------------
const MemoryRune = {
  stato: null,

  avvia(contenitore, gradoArcana, callbackFine) {
    const config    = CONFIG_MINIGIOCHI.memoryRune;
    const configGrado = config[gradoArcana.toLowerCase()] || config.novizio;

    this.stato = {
      coppie:        configGrado.coppie,
      carte:         [],
      selezionate:   [],
      abbinate:      new Set(),
      tentativo:     _incrementaTentativi('memoryRune'),
      callbackFine
    };

    this._generaCarte();
    this._renderizza(contenitore);
    _annunciaVoiceoverSafe(`Memory delle Rune. ${this.stato.coppie * 2} rune da abbinare a coppie. Seleziona la prima runa.`);

    // Focus al primo elemento interattivo — coerente con le transizioni del resto del progetto
    const primoTasto = contenitore.querySelector('.carta-runa');
    if (primoTasto) primoTasto.focus();
  },

  _generaCarte() {
    // Genera le coppie di rune e le mescola
    const nomeRune = [
      'Fehu', 'Uruz', 'Thurisaz', 'Ansuz', 'Raido', 'Kenaz',
      'Gebo', 'Wunjo', 'Hagalaz', 'Nauthiz', 'Isa', 'Jera'
    ];

    const runeUsate = nomeRune.slice(0, this.stato.coppie);
    const tutteLeRune = [...runeUsate, ...runeUsate];

    // Mescolamento (Fisher-Yates)
    for (let i = tutteLeRune.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tutteLeRune[i], tutteLeRune[j]] = [tutteLeRune[j], tutteLeRune[i]];
    }

    this.stato.carte = tutteLeRune.map((nome, i) => ({
      id:      i,
      nome,
      visibile: false
    }));
  },

  _renderizza(contenitore) {
    const griglia = document.createElement('div');
    griglia.className = 'minigioco-griglia';
    griglia.setAttribute('role', 'grid');
    griglia.setAttribute('aria-label', 'Griglia Memory delle Rune');

    this.stato.carte.forEach(carta => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'carta-runa';
      el.setAttribute('data-id', carta.id);

      const statoStringa = this.stato.abbinate.has(carta.id)
        ? 'abbinata'
        : carta.visibile ? 'rivelata' : 'nascosta';

      el.setAttribute('aria-label', `Runa ${statoStringa === 'nascosta' ? 'nascosta' : carta.nome}, ${statoStringa}`);
      el.textContent = statoStringa === 'nascosta' ? '?' : carta.nome;

      el.addEventListener('click', () => this._seleziona(carta.id, contenitore));
      griglia.appendChild(el);
    });

    contenitore.replaceChildren(griglia);
  },

  _seleziona(idCarta, contenitore) {
    const { stato } = this;
    if (stato.abbinate.has(idCarta)) return;
    if (stato.selezionate.includes(idCarta)) return;
    if (stato.selezionate.length >= 2) return;

    stato.carte[idCarta].visibile = true;
    stato.selezionate.push(idCarta);
    Aptico.leggero();

    const nomeCarta = stato.carte[idCarta].nome;
    _annunciaVoiceoverSafe(`Runa selezionata: ${nomeCarta}`);

    this._renderizza(contenitore);

    if (stato.selezionate.length === 2) {
      this._verificaCoppia(contenitore);
    }
  },

  _verificaCoppia(contenitore) {
    const { stato } = this;
    const [id1, id2] = stato.selezionate;
    const runa1 = stato.carte[id1];
    const runa2 = stato.carte[id2];

    if (runa1.nome === runa2.nome) {
      // Coppia trovata
      stato.abbinate.add(id1);
      stato.abbinate.add(id2);
      stato.selezionate = [];
      Aptico.trillo();
      _annunciaVoiceoverSafe(`Coppia abbinata: ${runa1.nome}. ${stato.abbinate.size / 2} coppie trovate su ${stato.coppie}.`);

      this._renderizza(contenitore);

      if (stato.abbinate.size === stato.carte.length) {
        this._termina(true);
      }
    } else {
      // Coppia errata
      Aptico.errore();
      _annunciaVoiceoverSafe(`Non corrispondono. Le rune tornano nascoste.`);

      setTimeout(() => {
        stato.carte[id1].visibile = false;
        stato.carte[id2].visibile = false;
        stato.selezionate = [];
        this._renderizza(contenitore);
      }, 1000);
    }
  },

  _termina(riuscito) {
    const categoria = _categoriaRisultato('memoryRune', riuscito);
    const punti = InterfacciaMinigiochi.registraRisultato('memoryRune', categoria, 'incantamento');
    _annunciaVoiceoverSafe(`Memory completato. Risultato: ${categoria}. Progressione: +${punti}.`);
    if (this.stato.callbackFine) this.stato.callbackFine(categoria, punti);
  }
};


// ------------------------------------------------------------
// MINESWEEPER DEI REAGENTI — Alchimia
// Il giocatore identifica e isola i reagenti pericolosi.
// ------------------------------------------------------------
const MinesweeperReagenti = {
  stato: null,

  avvia(contenitore, gradoArcana, callbackFine) {
    const config      = CONFIG_MINIGIOCHI.minesweeperReagenti;
    const configGrado = config[gradoArcana.toLowerCase()] || config.novizio;

    const [righe, colonne] = configGrado.griglia.split('x').map(Number);

    this.stato = {
      righe,
      colonne,
      pericoli:    configGrado.pericoli,
      celle:       [],
      rivelate:    new Set(),
      segnate:     new Set(),
      tentativo:   _incrementaTentativi('minesweeperReagenti'),
      callbackFine
    };

    this._generaGriglia();
    this._renderizza(contenitore);
    _annunciaVoiceoverSafe(`Minesweeper dei Reagenti. Griglia ${righe}×${colonne}. ${configGrado.pericoli} reagenti pericolosi da individuare. Usa le coordinate come A1, B2.`);

    // Focus alla prima cella — coerente con le transizioni del resto del progetto
    const primaCella = contenitore.querySelector('.cella-reagente');
    if (primaCella) primaCella.focus();
  },

  _generaGriglia() {
    const { righe, colonne, pericoli } = this.stato;
    const totaleCelle = righe * colonne;
    const celle = Array(totaleCelle).fill(false);

    // Posiziona i pericoli
    let posizionati = 0;
    while (posizionati < pericoli) {
      const pos = Math.floor(Math.random() * totaleCelle);
      if (!celle[pos]) {
        celle[pos] = true;
        posizionati++;
      }
    }

    this.stato.celle = celle;
  },

  _adiacenti(riga, colonna) {
    const { righe, colonne } = this.stato;
    const vicini = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = riga + dr;
        const c = colonna + dc;
        if (r >= 0 && r < righe && c >= 0 && c < colonne) {
          vicini.push(r * colonne + c);
        }
      }
    }
    return vicini;
  },

  _contaPericoli(indice) {
    const { colonne } = this.stato;
    const riga    = Math.floor(indice / colonne);
    const colonna = indice % colonne;
    return this._adiacenti(riga, colonna).filter(i => this.stato.celle[i]).length;
  },

  _renderizza(contenitore) {
    const { righe, colonne } = this.stato;

    const griglia = document.createElement('div');
    griglia.className = 'minigioco-griglia-minesweeper';
    griglia.setAttribute('role', 'grid');
    griglia.style.gridTemplateColumns = `repeat(${colonne}, 1fr)`;

    const lettere = 'ABCDEFGHIJ';

    for (let r = 0; r < righe; r++) {
      for (let c = 0; c < colonne; c++) {
        const indice     = r * colonne + c;
        const coordinata = `${lettere[r]}${c + 1}`;
        const rivelata   = this.stato.rivelate.has(indice);
        const segnata    = this.stato.segnate.has(indice);
        const pericolosa = this.stato.celle[indice];

        const cella = document.createElement('button');
        cella.type = 'button';
        cella.className = 'cella-reagente';
        cella.setAttribute('data-indice', indice);

        let statoLabel = 'non esaminata';
        let testoVisivo = '';

        if (rivelata) {
          const conteggio = this._contaPericoli(indice);
          statoLabel  = pericolosa ? 'pericolosa!' : `sicura, ${conteggio} pericoli adiacenti`;
          testoVisivo = pericolosa ? '⚠' : String(conteggio || '·');
        } else if (segnata) {
          statoLabel  = 'segnata come pericolosa';
          testoVisivo = '⚑';
        }

        cella.setAttribute('aria-label', `Cella ${coordinata}: ${statoLabel}`);
        cella.textContent = testoVisivo || coordinata;

        // Click sinistro: esamina
        cella.addEventListener('click', () => this._esamina(indice, contenitore));

        griglia.appendChild(cella);
      }
    }

    contenitore.replaceChildren(griglia);
  },

  _esamina(indice, contenitore) {
    if (this.stato.rivelate.has(indice) || this.stato.segnate.has(indice)) return;

    const pericolosa = this.stato.celle[indice];

    if (pericolosa) {
      Aptico.lungo();
      _annunciaVoiceoverSafe('Reagente pericoloso! Minigioco fallito.');
      this.stato.rivelate.add(indice);
      this._renderizza(contenitore);
      this._termina(false);
      return;
    }

    // Rivela la cella e le celle adiacenti sicure (flood fill)
    this._rivelaCella(indice);
    Aptico.leggero();

    const conteggio = this._contaPericoli(indice);
    const { colonne } = this.stato;
    const riga    = Math.floor(indice / colonne);
    const colonna = indice % colonne;
    const coord   = `${'ABCDEFGHIJ'[riga]}${colonna + 1}`;
    _annunciaVoiceoverSafe(`Cella ${coord}: sicura. ${conteggio} pericoli adiacenti.`);

    this._renderizza(contenitore);

    // Verifica vittoria: tutte le celle sicure rivelate
    const totaleSicure = this.stato.celle.filter(p => !p).length;
    if (this.stato.rivelate.size >= totaleSicure) {
      this._termina(true);
    }
  },

  // Flood fill: rivela ricorsivamente le celle sicure a 0 pericoli adiacenti
  _rivelaCella(indice) {
    if (this.stato.rivelate.has(indice)) return;
    if (this.stato.celle[indice]) return;

    this.stato.rivelate.add(indice);

    if (this._contaPericoli(indice) === 0) {
      const { colonne } = this.stato;
      const riga    = Math.floor(indice / colonne);
      const colonna = indice % colonne;
      this._adiacenti(riga, colonna).forEach(i => this._rivelaCella(i));
    }
  },

  _termina(riuscito) {
    const categoria = _categoriaRisultato('minesweeperReagenti', riuscito);
    const punti = InterfacciaMinigiochi.registraRisultato('minesweeperReagenti', categoria, 'alchimia');
    _annunciaVoiceoverSafe(`Minigioco terminato. Risultato: ${categoria}. Progressione: +${punti}.`);
    if (this.stato.callbackFine) this.stato.callbackFine(categoria, punti);
  }
};


// ------------------------------------------------------------
// MASTERMIND DELLE FORMULE — Teoria Arcana
// Il giocatore ricostruisce la sequenza segreta di simboli arcani
// attraverso ragionamento logico e tentativi progressivi.
// Feedback: quanti simboli in posizione esatta (tori) e quanti
// corretti ma fuori posto (vacche).
// VoiceOver: SÌ — feedback letto in modo esteso
// Aptico: SÌ — impulso netto per posizione corretta,
//              impulso doppio per simbolo fuori posto
// ------------------------------------------------------------
const MastermindFormule = {
  stato: null,

  // Pool completo di simboli arcani con firma sonora unica ciascuno.
  // Il gioco usa solo i primi N in base alla difficoltà.
  // Ogni simbolo ha: freq (Hz), forma oscillatore, durata (s).
  _simboli: [
    { nome: 'Ignis',  freq: 523.25, forma: 'sawtooth', durata: 0.15 },  // Do5 — caldo e deciso
    { nome: 'Aqua',   freq: 392.00, forma: 'sine',     durata: 0.20 },  // Sol4 — fluido e puro
    { nome: 'Terra',  freq: 261.63, forma: 'square',   durata: 0.18 },  // Do4 — denso e cavo
    { nome: 'Ventus', freq: 659.25, forma: 'sine',     durata: 0.12 },  // Mi5 — acuto e leggero
    { nome: 'Lux',    freq: 784.00, forma: 'triangle', durata: 0.10 },  // Sol5 — cristallino
    { nome: 'Umbra',  freq: 196.00, forma: 'sawtooth', durata: 0.25 },  // Sol3 — basso e oscuro
    { nome: 'Tempus', freq: 440.00, forma: 'square',   durata: 0.16 },  // La4 — metallico
    { nome: 'Vis',    freq: 587.33, forma: 'triangle', durata: 0.14 },  // Re5 — morbido e potente
    { nome: 'Arcus',  freq: 329.63, forma: 'sine',     durata: 0.22 },  // Mi4 — rotondo e caldo
    { nome: 'Nexus',  freq: 493.88, forma: 'sawtooth', durata: 0.13 }   // Si4 — teso e vibrante
  ],

  avvia(contenitore, gradoArcana, callbackFine) {
    const config = CONFIG_MINIGIOCHI.mastermindFormule;
    const cfg    = config[gradoArcana.toLowerCase()] || config.novizio;

    // Pool dei simboli disponibili per questa difficoltà
    const pool = this._simboli.slice(0, cfg.poolSimboli);

    // Genera la sequenza segreta (duplicati ammessi)
    const sequenzaSegreta = [];
    for (let i = 0; i < cfg.lunghezza; i++) {
      sequenzaSegreta.push(pool[Math.floor(Math.random() * pool.length)].nome);
    }

    this.stato = {
      sequenzaSegreta,
      pool,
      lunghezza:        cfg.lunghezza,
      tentativiMax:     cfg.tentativiMax,
      tentativiUsati:   0,
      feedbackParziale: cfg.feedbackParziale || false,
      ipoTesiCorrente:  [],
      storiaTentativi:  [],
      callbackFine,
      contenitore
    };

    _incrementaTentativi('mastermindFormule');
    this._renderizza();

    // Focus al primo simbolo disponibile — coerente con le transizioni del resto del progetto
    const primoSimbolo = this.stato.contenitore.querySelector('.mastermind-simbolo-pool');
    if (primoSimbolo) primoSimbolo.focus();

    // Istruzioni VoiceOver complete all'avvio
    const nomiPool = pool.map(s => s.nome).join(', ');
    const avviso   = cfg.feedbackParziale
      ? ' In questa modalità riceverai solo il conteggio delle posizioni corrette.'
      : '';
    _annunciaVoiceoverSafe(
      `Mastermind delle Formule. Ricostruisci la sequenza segreta di ${cfg.lunghezza} simboli arcani. ` +
      `Hai ${cfg.tentativiMax} tentativi. Simboli disponibili: ${nomiPool}.${avviso} ` +
      `Seleziona i simboli nell\'ordine corretto, poi premi Invia formula.`
    );
  },

  // Riproduce la firma sonora di un simbolo
  _suonoSimbolo(nomeSimb) {
    const simbolo = this._simboli.find(s => s.nome === nomeSimb);
    if (!simbolo) return;
    _suonoMinigioco(simbolo.freq, simbolo.durata, simbolo.forma, 0.09);
  },

  // Suono per simbolo in posizione corretta (preciso e risoluto)
  _suonoPosizioneCorretta() {
    _suonoMinigioco(880, 0.10, 'sine', 0.13);
  },

  // Suono per simbolo corretto ma fuori posto (incerto e sospeso)
  _suonoSimboloFuoriPosto() {
    _suonoMinigioco(440, 0.28, 'triangle', 0.07);
  },

  // Suona la sequenza segreta in ordine — melodia della formula attivata
  _suonoFormulaAttivata() {
    this.stato.sequenzaSegreta.forEach((nomeSimb, i) => {
      const simbolo = this._simboli.find(s => s.nome === nomeSimb);
      if (simbolo) {
        setTimeout(() => _suonoMinigioco(simbolo.freq, 0.35, 'sine', 0.11), i * 230);
      }
    });
  },

  // Algoritmo standard Mastermind: conta tori (posizione esatta) e vacche (simbolo giusto, posto sbagliato)
  _calcolaToriVacche(ipotesi, segreta) {
    let tori = 0, vacche = 0;
    const usatiSegreta = new Array(segreta.length).fill(false);
    const usatiIpotesi = new Array(ipotesi.length).fill(false);

    // Primo passaggio: tori
    for (let i = 0; i < segreta.length; i++) {
      if (ipotesi[i] === segreta[i]) {
        tori++;
        usatiSegreta[i] = true;
        usatiIpotesi[i] = true;
      }
    }

    // Secondo passaggio: vacche
    for (let i = 0; i < ipotesi.length; i++) {
      if (usatiIpotesi[i]) continue;
      for (let j = 0; j < segreta.length; j++) {
        if (usatiSegreta[j]) continue;
        if (ipotesi[i] === segreta[j]) {
          vacche++;
          usatiSegreta[j] = true;
          break;
        }
      }
    }

    return { tori, vacche };
  },

  _renderizza() {
    const { stato } = this;
    const contenitore      = stato.contenitore;
    const tentativiRimasti = stato.tentativiMax - stato.tentativiUsati;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-mastermind';

    // --- Intestazione con tentativi rimasti ---
    const intestazione = document.createElement('p');
    intestazione.className = 'mastermind-intestazione';
    intestazione.setAttribute('role', 'status');
    intestazione.setAttribute('aria-label', `Tentativi rimasti: ${tentativiRimasti} su ${stato.tentativiMax}.`);
    intestazione.textContent = `Tentativi rimasti: ${tentativiRimasti} / ${stato.tentativiMax}`;
    wrapper.appendChild(intestazione);

    // Legenda feedback (solo se non feedback parziale)
    if (!stato.feedbackParziale) {
      const legenda = document.createElement('p');
      legenda.className = 'mastermind-legenda';
      legenda.setAttribute('aria-hidden', 'true');
      legenda.textContent = '● posizione corretta   ○ simbolo fuori posto';
      wrapper.appendChild(legenda);
    }

    // --- Storico tentativi (aria-live per annunci automatici) ---
    const storico = document.createElement('ol');
    storico.className = 'mastermind-storico';
    storico.setAttribute('aria-label', 'Storico tentativi');
    storico.setAttribute('aria-live', 'polite');
    storico.setAttribute('aria-atomic', 'false');

    stato.storiaTentativi.forEach((tentativo, idx) => {
      const riga     = document.createElement('li');
      riga.className = 'mastermind-riga-storico';

      const simboliStr = tentativo.ipotesi.join(' · ');
      const feedbackVO = stato.feedbackParziale
        ? `${tentativo.tori} ${tentativo.tori === 1 ? 'simbolo' : 'simboli'} in posizione corretta`
        : `${tentativo.tori} in posizione corretta, ${tentativo.vacche} ${tentativo.vacche === 1 ? 'fuori posto' : 'fuori posto'}`;

      riga.setAttribute('aria-label', `Tentativo ${idx + 1}: ${simboliStr}. Risultato: ${feedbackVO}.`);

      const elSimb = document.createElement('span');
      elSimb.className = 'mastermind-simboli-storico';
      elSimb.setAttribute('aria-hidden', 'true');
      elSimb.textContent = simboliStr;
      riga.appendChild(elSimb);

      const elFeedback = document.createElement('span');
      elFeedback.className = 'mastermind-feedback-storico';
      elFeedback.setAttribute('aria-hidden', 'true');
      elFeedback.textContent = stato.feedbackParziale
        ? `● ${tentativo.tori}`
        : `● ${tentativo.tori}  ○ ${tentativo.vacche}`;
      riga.appendChild(elFeedback);

      storico.appendChild(riga);
    });

    wrapper.appendChild(storico);

    // --- Ipotesi corrente (slot da riempire) ---
    const sezioneIpotesi = document.createElement('div');
    sezioneIpotesi.className = 'mastermind-ipotesi';
    sezioneIpotesi.setAttribute('role', 'group');
    sezioneIpotesi.setAttribute('aria-label',
      `Ipotesi corrente: ${stato.ipoTesiCorrente.length} di ${stato.lunghezza} simboli inseriti`);

    for (let i = 0; i < stato.lunghezza; i++) {
      const nomeSimb = stato.ipoTesiCorrente[i];
      const slot     = document.createElement('button');
      slot.type      = 'button';

      if (nomeSimb) {
        slot.className = 'mastermind-slot mastermind-slot--pieno';
        slot.textContent = nomeSimb;
        slot.setAttribute('aria-label', `Posizione ${i + 1}: ${nomeSimb}. Tocca per rimuovere.`);
        const indiceCapturato = i;
        slot.addEventListener('click', () => this._rimuoviSimbolo(indiceCapturato));
      } else {
        slot.className = 'mastermind-slot mastermind-slot--vuoto';
        slot.textContent = '?';
        slot.setAttribute('aria-label', `Posizione ${i + 1}: vuota.`);
        slot.disabled = true;
      }

      sezioneIpotesi.appendChild(slot);
    }

    wrapper.appendChild(sezioneIpotesi);

    // --- Pool dei simboli disponibili ---
    const sezionePool = document.createElement('div');
    sezionePool.className = 'mastermind-pool';
    sezionePool.setAttribute('role', 'group');
    sezionePool.setAttribute('aria-label', 'Simboli disponibili — seleziona per aggiungere all\'ipotesi');

    const ipotesiPiena = stato.ipoTesiCorrente.length >= stato.lunghezza;

    stato.pool.forEach(simbolo => {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = 'mastermind-simbolo-pool';
      btn.textContent = simbolo.nome;
      btn.setAttribute('aria-label', `Aggiungi ${simbolo.nome}`);
      btn.disabled = ipotesiPiena;

      btn.addEventListener('click', () => this._aggiungiSimbolo(simbolo.nome));
      sezionePool.appendChild(btn);
    });

    wrapper.appendChild(sezionePool);

    // --- Pulsanti di controllo ---
    const sezioneControlli = document.createElement('div');
    sezioneControlli.className = 'mastermind-controlli';

    const btnInvia = document.createElement('button');
    btnInvia.type      = 'button';
    btnInvia.className = 'btn-primario';
    btnInvia.textContent = 'Invia formula';
    btnInvia.setAttribute('aria-label', 'Invia la formula corrente');
    btnInvia.disabled = stato.ipoTesiCorrente.length < stato.lunghezza;
    btnInvia.addEventListener('click', () => this._inviaIpotesi());

    const btnCancella = document.createElement('button');
    btnCancella.type      = 'button';
    btnCancella.className = 'btn-secondario';
    btnCancella.textContent = 'Cancella tutto';
    btnCancella.setAttribute('aria-label', 'Cancella l\'ipotesi corrente e ricomincia');
    btnCancella.disabled = stato.ipoTesiCorrente.length === 0;
    btnCancella.addEventListener('click', () => this._cancellaIpotesi());

    sezioneControlli.appendChild(btnInvia);
    sezioneControlli.appendChild(btnCancella);
    wrapper.appendChild(sezioneControlli);

    contenitore.replaceChildren(wrapper);
  },

  _aggiungiSimbolo(nomeSimb) {
    const { stato } = this;
    if (stato.ipoTesiCorrente.length >= stato.lunghezza) return;

    stato.ipoTesiCorrente.push(nomeSimb);
    this._suonoSimbolo(nomeSimb);

    const posizione = stato.ipoTesiCorrente.length;
    _annunciaVoiceoverSafe(`${nomeSimb} in posizione ${posizione}.`);

    this._renderizza();
  },

  _rimuoviSimbolo(indice) {
    const { stato } = this;
    const simbolo = stato.ipoTesiCorrente[indice];
    stato.ipoTesiCorrente.splice(indice, 1);
    _annunciaVoiceoverSafe(`${simbolo} rimosso dalla posizione ${indice + 1}.`);
    this._renderizza();
  },

  _cancellaIpotesi() {
    this.stato.ipoTesiCorrente = [];
    _annunciaVoiceoverSafe('Ipotesi cancellata.');
    this._renderizza();
  },

  _inviaIpotesi() {
    const { stato } = this;
    if (stato.ipoTesiCorrente.length < stato.lunghezza) return;

    const { tori, vacche } = this._calcolaToriVacche(
      stato.ipoTesiCorrente,
      stato.sequenzaSegreta
    );

    stato.storiaTentativi.push({
      ipotesi: [...stato.ipoTesiCorrente],
      tori,
      vacche
    });
    stato.tentativiUsati++;
    stato.ipoTesiCorrente = [];

    // Feedback sonoro e aptico — prima i tori (posizione corretta), poi le vacche (fuori posto)
    for (let i = 0; i < tori; i++) {
      setTimeout(() => {
        this._suonoPosizioneCorretta();
        Aptico.medio();
      }, i * 160);
    }
    const sfasamentoVacche = tori * 160 + 120;
    for (let i = 0; i < vacche; i++) {
      setTimeout(() => {
        this._suonoSimboloFuoriPosto();
        Aptico.doppio();
      }, sfasamentoVacche + i * 220);
    }

    // Annuncio VoiceOver esteso
    const _plurale = (n, sing, plur) => `${n} ${n === 1 ? sing : plur}`;
    const feedbackVO = stato.feedbackParziale
      ? `${_plurale(tori, 'simbolo corretto', 'simboli corretti')} nella posizione giusta.`
      : `${_plurale(tori, 'simbolo corretto', 'simboli corretti')} nella posizione giusta, ` +
        `${_plurale(vacche, 'simbolo corretto', 'simboli corretti')} nella posizione sbagliata.`;
    _annunciaVoiceoverSafe(feedbackVO);

    // Vittoria
    if (tori === stato.lunghezza) {
      this._renderizza();
      setTimeout(() => {
        this._suonoFormulaAttivata();
        Aptico.trillo();
        _annunciaVoiceoverSafe('Formula corretta! Sequenza arcana ricostruita.');
        this._termina(true);
      }, 500);
      return;
    }

    // Tentativi esauriti
    if (stato.tentativiUsati >= stato.tentativiMax) {
      this._renderizza();
      setTimeout(() => {
        Aptico.errore();
        _annunciaVoiceoverSafe(
          `Tentativi esauriti. La sequenza segreta era: ${stato.sequenzaSegreta.join(', ')}.`
        );
        this._termina(false);
      }, 400);
      return;
    }

    this._renderizza();
  },

  _termina(riuscito) {
    const categoria = _categoriaRisultato('mastermindFormule', riuscito);
    const punti = InterfacciaMinigiochi.registraRisultato(
      'mastermindFormule', categoria, 'teoriaArcana'
    );
    const messaggio = riuscito
      ? `Mastermind completato. Risultato: ${categoria}. Progressione: +${punti}.`
      : `Mastermind fallito. Nessuna progressione ottenuta.`;
    _annunciaVoiceoverSafe(messaggio);
    if (this.stato.callbackFine) this.stato.callbackFine(categoria, punti);
  }
};


// ------------------------------------------------------------
// MECCANICA DI SPELLCASTING — Spellcasting
// Ogni elemento energetico emette un crescendo sonoro/aptico.
// Il giocatore interviene (tap) al momento del picco.
// Feedback aptico: SÌ — è il minigioco principale per l'aptico
// VoiceOver: SÌ — il segnale sonoro al picco non richiede la vista
// ------------------------------------------------------------
const MeccanicaSpellcasting = {
  stato: null,

  // Nomi degli elementi energetici per i gradi
  _nomiElementi: [
    'Prima canalizzazione',
    'Seconda risonanza',
    'Terzo flusso',
    'Quarta convergenza',
    'Quinta tensione',
    'Sesta proiezione',
    'Settima amplificazione',
    'Ottava manifestazione'
  ],

  // Frequenza base di ogni elemento (Hz) — sale con l'indice
  _freqBase: [330, 370, 392, 440, 494, 523, 587, 659],

  avvia(contenitore, gradoArcana, callbackFine) {
    const config = CONFIG_MINIGIOCHI.meccanicaSpellcasting;
    const cfg    = config[gradoArcana.toLowerCase()] || config.novizio;

    // Calcola la durata di ogni ciclo (varia per ritmo 'vario')
    const ritmiElementi = [];
    for (let i = 0; i < cfg.elementi; i++) {
      if (cfg.ritmo === 'vario') {
        const fattore = 0.75 + Math.random() * 0.5;   // 75%-125%
        ritmiElementi.push(Math.round(cfg.durataCicloMs * fattore));
      } else {
        ritmiElementi.push(cfg.durataCicloMs);
      }
    }

    this.stato = {
      elementi:          cfg.elementi,
      finestraMs:        cfg.finestraMs,
      sovrapposto:       cfg.sovrapposto || false,
      nomiElementi:      this._nomiElementi.slice(0, cfg.elementi),
      ritmiElementi,
      indiceCorrente:    0,         // prossimo elemento da attivare con un tap
      risultatiEl:       new Array(cfg.elementi).fill('inAttesa'),
      tempiInizio:       new Array(cfg.elementi).fill(null),
      oscillatoriAttivi: new Map(), // indice → { osc, gain }
      timersTimeout:     new Map(), // indice → timeoutId
      faseCompletata:    false,
      callbackFine,
      contenitore
    };

    _incrementaTentativi('meccanicaSpellcasting');
    this._renderizza();

    // Focus al pulsante Attiva (inizialmente disabilitato ma leggibile da VoiceOver)
    const btnAttiva = this.stato.contenitore.querySelector('.spellcasting-btn-attiva');
    if (btnAttiva) btnAttiva.focus();

    _annunciaVoiceoverSafe(
      `Meccanica di Spellcasting. ${cfg.elementi} elementi energetici da attivare. ` +
      `Ogni elemento emette un suono crescente verso il picco. ` +
      `Tocca Attiva al momento del picco sonoro per attivarlo. ` +
      `Il primo elemento parte tra un momento.`
    );

    setTimeout(() => this._avviaElemento(0), 1500);
  },

  _avviaElemento(indice) {
    const { stato } = this;
    if (stato.faseCompletata) return;
    if (indice >= stato.elementi) return;
    if (stato.risultatiEl[indice] !== 'inAttesa') return;

    const durata = stato.ritmiElementi[indice];
    stato.risultatiEl[indice] = 'attivo';
    stato.tempiInizio[indice] = performance.now();

    _annunciaVoiceoverSafe(stato.nomiElementi[indice] + '.');

    // Crescendo sonoro (oscillatore che cresce in freq e volume fino al 75%)
    this._avviaCrescendo(indice, durata);

    // Vibrazioni crescenti nei passi di avvicinamento al picco
    const fineAvvicinamento = durata * 0.75;
    for (let p = 0; p < 5; p++) {
      setTimeout(
        () => Aptico.crescente(p / 4),
        Math.round(fineAvvicinamento * p / 4)
      );
    }

    // Aggiorna la UI — avvia poi l'animazione in-place sulla barra
    this._renderizza();
    this._avviaAnimazioneBarra(indice, durata);

    // Timeout per "mancato" se il giocatore non interviene
    const idTimeout = setTimeout(() => {
      if (stato.risultatiEl[indice] === 'attivo') {
        stato.risultatiEl[indice] = 'mancato';
        this._fermaOscillatore(indice);
        _suonoMinigioco(150, 0.30, 'square', 0.06);
        Aptico.irregolare();
        _annunciaVoiceoverSafe(`${stato.nomiElementi[indice]}: mancato.`);
        this._renderizza();
        this._dopoElemento(indice);
      }
    }, durata + stato.finestraMs / 2 + 150);

    stato.timersTimeout.set(indice, idTimeout);

    // Modalità sovrapposta (adepto): avvia il prossimo al 60% del ciclo corrente
    if (stato.sovrapposto && indice + 1 < stato.elementi) {
      setTimeout(
        () => this._avviaElemento(indice + 1),
        Math.round(durata * 0.60)
      );
    }
  },

  _avviaCrescendo(indice, durataMs) {
    const ctx = _contestoAudio();
    if (!ctx) return;

    const durata       = durataMs / 1000;
    const freqBase     = this._freqBase[indice % this._freqBase.length];
    const tempoOttimale = durata * 0.75;
    const ora          = ctx.currentTime;

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequenza: parte bassa, sale al valore pieno al picco
    osc.frequency.setValueAtTime(freqBase * 0.70, ora);
    osc.frequency.linearRampToValueAtTime(freqBase, ora + tempoOttimale);

    // Volume: parte silenzioso, crescende al picco, poi cala
    gain.gain.setValueAtTime(0.001, ora);
    gain.gain.linearRampToValueAtTime(0.18, ora + tempoOttimale);
    gain.gain.linearRampToValueAtTime(0.03, ora + durata);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ora);
    osc.stop(ora + durata + 0.1);

    this.stato.oscillatoriAttivi.set(indice, { osc, gain });

    // Click/pop secco e distinto al momento del picco — segnale per VoiceOver
    this._schedulaClickPicco(ora + tempoOttimale);
  },

  _schedulaClickPicco(tempoAssoluto) {
    const ctx = _contestoAudio();
    if (!ctx) return;

    // Rumore bianco brevissimo: click netto percepibile anche su cuffie
    const campioni = Math.floor(ctx.sampleRate * 0.015);
    const buffer   = ctx.createBuffer(1, campioni, ctx.sampleRate);
    const data     = buffer.getChannelData(0);
    for (let i = 0; i < campioni; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / campioni);
    }

    const sorgente = ctx.createBufferSource();
    sorgente.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.value = 0.55;
    sorgente.connect(gain);
    gain.connect(ctx.destination);
    sorgente.start(tempoAssoluto);
  },

  _fermaOscillatore(indice) {
    const entry = this.stato.oscillatoriAttivi.get(indice);
    if (!entry) return;
    const ctx = _contestoAudio();
    if (ctx) {
      try {
        entry.gain.gain.cancelScheduledValues(ctx.currentTime);
        entry.gain.gain.setValueAtTime(entry.gain.gain.value, ctx.currentTime);
        entry.gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        setTimeout(() => { try { entry.osc.stop(); } catch (_) {} }, 60);
      } catch (_) {}
    }
    this.stato.oscillatoriAttivi.delete(indice);
  },

  // Aggiorna la barra di carica visiva in-place via requestAnimationFrame.
  // Non chiama _renderizza — opera direttamente sul DOM esistente.
  _avviaAnimazioneBarra(indice, durataMs) {
    const { stato } = this;
    const aggiorna = () => {
      if (stato.risultatiEl[indice] !== 'attivo') return;

      const ora      = performance.now();
      const progresso = Math.min(
        (ora - stato.tempiInizio[indice]) / durataMs, 1
      ) * 100;

      const barra = stato.contenitore.querySelector(
        `[data-barra-carica="${indice}"]`
      );
      if (barra) {
        barra.style.width = `${progresso.toFixed(1)}%`;
        // Zona di picco evidenziata visivamente (72%-78%)
        barra.classList.toggle(
          'spellcasting-barra--picco',
          progresso >= 72 && progresso <= 78
        );
      }

      requestAnimationFrame(aggiorna);
    };
    requestAnimationFrame(aggiorna);
  },

  // Chiamato dal pulsante Attiva — misura la precisione e registra il risultato
  _gestisciTap() {
    const { stato } = this;
    if (stato.faseCompletata) return;

    const indice = stato.indiceCorrente;
    if (indice >= stato.elementi) return;
    if (stato.risultatiEl[indice] !== 'attivo') return;

    // Cancella il timer di timeout per questo elemento
    const idTimeout = stato.timersTimeout.get(indice);
    if (idTimeout !== undefined) {
      clearTimeout(idTimeout);
      stato.timersTimeout.delete(indice);
    }

    const ora           = performance.now();
    const trascorso     = ora - stato.tempiInizio[indice];
    const durata        = stato.ritmiElementi[indice];
    const centroOttimale = durata * 0.75;
    const distanza      = Math.abs(trascorso - centroOttimale);

    this._fermaOscillatore(indice);

    const nome = stato.nomiElementi[indice];

    if (distanza <= stato.finestraMs / 2) {
      stato.risultatiEl[indice] = 'corretto';
      // Suono: netto e risoluto — due note in rapida successione
      _suonoMinigioco(880, 0.12, 'sine', 0.14);
      setTimeout(() => _suonoMinigioco(1108, 0.10, 'sine', 0.10), 80);
      Aptico.forte();
      _annunciaVoiceoverSafe(`${nome}: corretto.`);
    } else {
      stato.risultatiEl[indice] = 'fuoriTempo';
      // Suono: smorzato
      _suonoMinigioco(220, 0.22, 'sawtooth', 0.07);
      Aptico.irregolare();
      _annunciaVoiceoverSafe(`${nome}: fuori tempo.`);
    }

    this._renderizza();
    this._dopoElemento(indice);
  },

  _dopoElemento(indice) {
    const { stato } = this;
    stato.indiceCorrente = indice + 1;

    if (!stato.sovrapposto) {
      // Modalità sequenziale: avvia il prossimo dopo breve pausa
      if (indice + 1 < stato.elementi) {
        setTimeout(() => this._avviaElemento(indice + 1), 600);
      } else {
        setTimeout(() => this._terminaSpell(), 900);
      }
    } else {
      // Modalità sovrapposta: controlla se tutti sono stati processati
      const tuttiProcessati = stato.risultatiEl
        .slice(0, stato.elementi)
        .every(r => r !== 'inAttesa' && r !== 'attivo');
      if (tuttiProcessati) {
        setTimeout(() => this._terminaSpell(), 700);
      }
    }
  },

  _terminaSpell() {
    const { stato } = this;
    if (stato.faseCompletata) return;
    stato.faseCompletata = true;

    const corretti = stato.risultatiEl
      .slice(0, stato.elementi)
      .filter(r => r === 'corretto').length;
    const soglia   = Math.ceil(stato.elementi / 2);
    const riuscito = corretti >= soglia;

    if (riuscito) {
      // Sequenza armonica che rappresenta la spell attivata
      [523.25, 659.25, 784.00, 1046.50].forEach((freq, i) => {
        setTimeout(() => _suonoMinigioco(freq, 0.30, 'sine', 0.12), i * 150);
      });
      Aptico.trillo();
    } else {
      Aptico.errore();
    }

    _annunciaVoiceoverSafe(
      `Spell ${riuscito ? 'attivata' : 'fallita'}. ` +
      `${corretti} elementi su ${stato.elementi} corretti.`
    );

    this._renderizza();
    setTimeout(() => this._termina(riuscito, corretti), 1500);
  },

  _termina(riuscito, corretti) {
    const categoria = _categoriaRisultato('meccanicaSpellcasting', riuscito);
    const punti = InterfacciaMinigiochi.registraRisultato(
      'meccanicaSpellcasting', categoria, 'spellcasting'
    );
    _annunciaVoiceoverSafe(
      riuscito
        ? `Meccanica di Spellcasting completata. ${corretti} elementi. Risultato: ${categoria}. Progressione: +${punti}.`
        : `Spell fallita. Troppi elementi mancati.`
    );
    if (this.stato.callbackFine) this.stato.callbackFine(categoria, punti);
  },

  _renderizza() {
    const { stato } = this;
    const contenitore = stato.contenitore;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-spellcasting';

    // Intestazione — aria-live per aggiornamenti automatici
    const titolo = document.createElement('p');
    titolo.className = 'spellcasting-titolo';
    titolo.setAttribute('role', 'status');
    titolo.setAttribute('aria-live', 'polite');
    const corretti = stato.risultatiEl.slice(0, stato.elementi).filter(r => r === 'corretto').length;
    if (stato.faseCompletata) {
      titolo.setAttribute('aria-label', `Spell completata. ${corretti} elementi corretti su ${stato.elementi}.`);
      titolo.textContent = 'Spell completata';
    } else {
      const indice = stato.indiceCorrente;
      const nomeC  = indice < stato.elementi ? stato.nomiElementi[indice] : '';
      titolo.setAttribute('aria-label',
        stato.risultatiEl[indice] === 'attivo'
          ? `${nomeC} in carica — attiva al picco sonoro.`
          : 'Spell in canalizzazione. In attesa del prossimo elemento.'
      );
      titolo.textContent = 'Spell in canalizzazione';
    }
    wrapper.appendChild(titolo);

    // Lista elementi
    const listaEl = document.createElement('ul');
    listaEl.className = 'spellcasting-elementi';
    listaEl.setAttribute('role', 'list');
    listaEl.setAttribute('aria-label', 'Elementi della spell');

    for (let i = 0; i < stato.elementi; i++) {
      const risultato = stato.risultatiEl[i];
      const li = document.createElement('li');
      li.className = `spellcasting-elemento spellcasting-elemento--${risultato}`;

      const descVo = {
        inAttesa:    'in attesa',
        attivo:      'in carica — attiva ora',
        corretto:    'attivato',
        fuoriTempo:  'fuori tempo',
        mancato:     'mancato',
      }[risultato] || '';
      li.setAttribute('aria-label', `${stato.nomiElementi[i]}: ${descVo}`);

      // Barra di carica in fondo all'elemento (solo se attivo)
      if (risultato === 'attivo') {
        const wrapBarra = document.createElement('div');
        wrapBarra.className = 'spellcasting-contenitore-barra';
        wrapBarra.setAttribute('aria-hidden', 'true');

        const barra = document.createElement('div');
        barra.className = 'spellcasting-barra';
        barra.setAttribute('data-barra-carica', i);
        barra.style.width = '0%';
        wrapBarra.appendChild(barra);
        li.appendChild(wrapBarra);
      }

      const elNome = document.createElement('span');
      elNome.className = 'spellcasting-nome-el';
      elNome.setAttribute('aria-hidden', 'true');
      elNome.textContent = stato.nomiElementi[i];

      const elIcona = document.createElement('span');
      elIcona.className = 'spellcasting-icona-stato';
      elIcona.setAttribute('aria-hidden', 'true');
      elIcona.textContent = {
        inAttesa:   '·',
        attivo:     '◎',
        corretto:   '●',
        fuoriTempo: '○',
        mancato:    '✕',
      }[risultato] || '·';

      li.appendChild(elNome);
      li.appendChild(elIcona);
      listaEl.appendChild(li);
    }

    wrapper.appendChild(listaEl);

    // Pulsante Attiva — unico elemento interattivo durante il gioco
    const elementoAttivo = !stato.faseCompletata
      && stato.indiceCorrente < stato.elementi
      && stato.risultatiEl[stato.indiceCorrente] === 'attivo';

    const btnAttiva = document.createElement('button');
    btnAttiva.type = 'button';
    btnAttiva.className = 'spellcasting-btn-attiva' +
      (elementoAttivo ? ' spellcasting-btn-attiva--pronto' : '');
    btnAttiva.disabled = !elementoAttivo;

    if (elementoAttivo) {
      const nomeEl = stato.nomiElementi[stato.indiceCorrente];
      btnAttiva.setAttribute('aria-label',
        `Attiva ${nomeEl} — tocca al momento del picco sonoro`);
      btnAttiva.textContent = 'Attiva';
    } else if (stato.faseCompletata) {
      btnAttiva.setAttribute('aria-label', 'Spell completata');
      btnAttiva.textContent = '✓';
    } else {
      btnAttiva.setAttribute('aria-label', 'In attesa del prossimo elemento');
      btnAttiva.textContent = '·';
    }

    btnAttiva.addEventListener('click', () => this._gestisciTap());
    // touchstart per risposta immediata su iPhone (senza delay 300ms)
    btnAttiva.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this._gestisciTap();
    }, { passive: false });

    wrapper.appendChild(btnAttiva);

    contenitore.replaceChildren(wrapper);
  }
};


// ------------------------------------------------------------
// LABIRINTO DELL'EQUILIBRIO — Rituali
// Il giocatore naviga tra stati di tensione e rilascio,
// mantenendo l'equilibrio del rituale per passiEquilibrio
// passaggi consecutivi.
// Audio ambientale della Sala Rituale: NON viene silenziato.
// ------------------------------------------------------------
const LabirintoEquilibrio = {
  stato: null,

  avvia(contenitore, gradoArcana, callbackFine) {
    const grado       = gradoArcana.toLowerCase();
    const config      = CONFIG_MINIGIOCHI.labirintoEquilibrio;
    const cfg         = config[grado] || config.novizio;

    const nodi            = cfg.nodi;
    const interdipendenze = !!cfg.interdipendenze;
    const equilibriMultipli = !!cfg.equilibriMultipli;
    const passiEquilibrio = cfg.passiEquilibrio || 1;
    // Range di equilibrio: più stretto per i gradi avanzati
    const eqMin = (grado === 'esperto' || grado === 'adepto') ? 4 : 3;
    const eqMax = (grado === 'esperto' || grado === 'adepto') ? 6 : 7;

    this.stato = {
      grado,
      nodi,
      nodoCorrente:   0,
      tensione:       5,
      tensione2:      equilibriMultipli ? 5 : null,
      drifts:         this._generaDrifts(nodi, interdipendenze, false),
      drifts2:        equilibriMultipli ? this._generaDrifts(nodi, interdipendenze, true) : null,
      passiEquilibrio,
      passiConsecutivi: 0,
      interdipendenze,
      equilibriMultipli,
      eqMin,
      eqMax,
      storico:        [],
      callbackFine,
      tentativo:      _incrementaTentativi('labirintoEquilibrio')
    };

    this._renderizza(contenitore);

    // Focus alla prima azione disponibile — coerente con le transizioni del resto del progetto
    const primaAzione = contenitore.querySelector('[data-azione]');
    if (primaAzione) primaAzione.focus();

    const msgInizio = equilibriMultipli
      ? `Labirinto dell'Equilibrio. Adepto. ${nodi} nodi. Mantieni forza arcana e armonia in equilibrio per ${passiEquilibrio} passaggi consecutivi.`
      : passiEquilibrio > 1
        ? `Labirinto dell'Equilibrio. ${nodi} nodi. Mantieni l'equilibrio per ${passiEquilibrio} passaggi consecutivi.`
        : `Labirinto dell'Equilibrio. ${nodi} nodi. Raggiungi e mantieni l'equilibrio del rituale.`;
    _annunciaVoiceoverSafe(msgInizio);
  },

  // Genera i drift (spinta naturale del rituale) per ogni nodo.
  // interdipendenze: i drift seguono un pattern oscillante (rituale che "respira").
  // inverso: per il secondo asse in equilibriMultipli, il pattern è sfasato di π.
  _generaDrifts(n, interdipendenze, inverso) {
    const drifts = [];
    for (let i = 0; i < n; i++) {
      let d;
      if (interdipendenze) {
        const fase = inverso ? Math.PI : 0;
        d = Math.round(Math.sin(i * 0.9 + fase) * 1.2 + (Math.random() * 0.8 - 0.4));
        d = Math.max(-2, Math.min(2, d));
      } else {
        d = Math.round(Math.random() * 2 - 1); // -1, 0, oppure 1
      }
      drifts.push(d);
    }
    return drifts;
  },

  // Testo descrittivo dello stato della tensione — usato da VoiceOver.
  _descrizioneTensione(t, eqMin, eqMax) {
    if (t >= eqMin && t <= eqMax) {
      return (t === 5)
        ? 'La tensione è in perfetto equilibrio. Il rituale risuona con chiarezza.'
        : 'La tensione è in equilibrio. Il cerchio rituale è stabile.';
    }
    const dist = this._distanzaEquilibrio(t, eqMin, eqMax);
    if (t < eqMin) {
      if (dist === 1) return 'La tensione è appena insufficiente. Il rituale respira a fatica.';
      if (dist === 2) return 'La tensione è troppo bassa. L\'energia fatica a mantenersi.';
      return 'La tensione è crollata. Il rituale si sta dissolvendo.';
    } else {
      if (dist === 1) return 'La tensione è appena eccessiva. Il rituale pulsa con troppa forza.';
      if (dist === 2) return 'La tensione è troppo alta. L\'energia preme contro le pareti del cerchio.';
      return 'La tensione è al limite. Il rituale rischia di spezzarsi.';
    }
  },

  _inEquilibrio(t, eqMin, eqMax) {
    return t >= eqMin && t <= eqMax;
  },

  _distanzaEquilibrio(t, eqMin, eqMax) {
    if (t < eqMin) return eqMin - t;
    if (t > eqMax) return t - eqMax;
    return 0;
  },

  _renderizza(contenitore) {
    const s = this.stato;
    const percLeft  = (s.eqMin / 10) * 100;
    const percWidth = ((s.eqMax - s.eqMin) / 10) * 100;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-labirinto';

    // Intestazione nodo
    const intestazione = document.createElement('p');
    intestazione.className = 'labirinto-intestazione';
    intestazione.textContent = `Nodo ${s.nodoCorrente + 1} di ${s.nodi}`;
    wrapper.appendChild(intestazione);

    // Gruppo stato principale
    wrapper.appendChild(
      this._creaGruppoStato(
        s.equilibriMultipli ? 'Forza arcana' : 'Stato del rituale',
        s.tensione, percLeft, percWidth, false
      )
    );

    // Gruppo stato secondario (solo adepto — equilibriMultipli)
    if (s.equilibriMultipli) {
      wrapper.appendChild(
        this._creaGruppoStato('Armonia rituale', s.tensione2, percLeft, percWidth, true)
      );
    }

    // Contatore passi (solo se passiEquilibrio > 1)
    if (s.passiEquilibrio > 1) {
      const passiEl = document.createElement('p');
      passiEl.className = 'labirinto-passi';
      passiEl.setAttribute('data-passi', '');
      passiEl.textContent = `Equilibrio mantenuto: ${s.passiConsecutivi} / ${s.passiEquilibrio}`;
      wrapper.appendChild(passiEl);
    }

    // Pulsanti di azione
    wrapper.appendChild(this._creaAzioni(contenitore));

    // Storico ultime mosse (decorativo, nascosto a VoiceOver)
    const storicoEl = document.createElement('ul');
    storicoEl.className = 'labirinto-storico';
    storicoEl.setAttribute('aria-hidden', 'true');
    storicoEl.setAttribute('data-storico', '');
    wrapper.appendChild(storicoEl);

    contenitore.replaceChildren(wrapper);
  },

  _creaGruppoStato(labelGruppo, tensione, percLeft, percWidth, secondo) {
    const s = this.stato;

    const gruppo = document.createElement('div');
    gruppo.className = 'labirinto-gruppo-stato';
    gruppo.setAttribute('role', 'group');
    gruppo.setAttribute('aria-label', labelGruppo);

    // Etichetta visiva del gruppo
    const labelEl = document.createElement('p');
    labelEl.className = 'labirinto-etichetta-stato';
    labelEl.setAttribute('aria-hidden', 'true');
    labelEl.textContent = labelGruppo;
    gruppo.appendChild(labelEl);

    // Testo descrittivo della tensione — annunciato da VoiceOver tramite aria-live
    const testoEl = document.createElement('p');
    testoEl.className = 'labirinto-testo-stato';
    testoEl.setAttribute('aria-live', 'polite');
    testoEl.setAttribute(secondo ? 'data-tensione2' : 'data-tensione', '');
    testoEl.textContent = this._descrizioneTensione(tensione, s.eqMin, s.eqMax);
    gruppo.appendChild(testoEl);

    // Barra visiva della tensione
    const contenitoreBarra = document.createElement('div');
    contenitoreBarra.className = 'labirinto-contenitore-barra';
    contenitoreBarra.setAttribute('aria-hidden', 'true');

    const zonaEq = document.createElement('div');
    zonaEq.className = 'labirinto-zona-equilibrio';
    zonaEq.style.left  = percLeft + '%';
    zonaEq.style.width = percWidth + '%';
    contenitoreBarra.appendChild(zonaEq);

    const indicatore = document.createElement('div');
    indicatore.className = 'labirinto-indicatore';
    indicatore.setAttribute(secondo ? 'data-indicatore2' : 'data-indicatore', '');
    indicatore.style.left = (tensione / 10 * 100) + '%';
    this._applicaClasseIndicatore(indicatore, tensione);
    contenitoreBarra.appendChild(indicatore);

    gruppo.appendChild(contenitoreBarra);
    return gruppo;
  },

  _creaAzioni(contenitore) {
    const s = this.stato;
    const azioniEl = document.createElement('div');
    azioniEl.className = 'labirinto-azioni';
    azioniEl.setAttribute('data-azioni', '');

    // In modalità equilibriMultipli le azioni agiscono sui due assi separatamente
    const datiAzioni = s.equilibriMultipli
      ? [
          { valore: 'forza',    label: 'Rafforza la forza arcana', primario: false },
          { valore: 'bilancia', label: 'Bilancia le componenti',   primario: true  },
          { valore: 'armonia',  label: 'Rafforza l\'armonia',      primario: false }
        ]
      : [
          { valore:  1, label: 'Aumenta tensione',   primario: false },
          { valore:  0, label: 'Mantieni',            primario: true  },
          { valore: -1, label: 'Diminuisci tensione', primario: false }
        ];

    datiAzioni.forEach(az => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = az.primario ? 'btn-primario' : 'btn-secondario';
      btn.textContent = az.label;
      btn.setAttribute('data-azione', String(az.valore));
      btn.addEventListener('click', () => this._applicaAzione(az.valore, contenitore));
      azioniEl.appendChild(btn);
    });

    return azioniEl;
  },

  // Aggiorna i modificatori visivi dell'indicatore in base alla distanza dall'equilibrio
  _applicaClasseIndicatore(el, t) {
    const s = this.stato;
    el.classList.remove(
      'labirinto-indicatore--equilibrio',
      'labirinto-indicatore--vicino',
      'labirinto-indicatore--lontano'
    );
    const dist = this._distanzaEquilibrio(t, s.eqMin, s.eqMax);
    if (dist === 0)      el.classList.add('labirinto-indicatore--equilibrio');
    else if (dist <= 1)  el.classList.add('labirinto-indicatore--vicino');
    else                 el.classList.add('labirinto-indicatore--lontano');
  },

  _applicaAzione(azione, contenitore) {
    const s = this.stato;
    if (s.nodoCorrente >= s.nodi) return;

    Aptico.medio();

    const drift  = s.drifts[s.nodoCorrente];
    const drift2 = s.equilibriMultipli ? s.drifts2[s.nodoCorrente] : null;

    // Stato prima dell'azione (per rilevare perdita di equilibrio)
    const eraInEq = this._inEquilibrio(s.tensione, s.eqMin, s.eqMax) &&
      (!s.equilibriMultipli || this._inEquilibrio(s.tensione2, s.eqMin, s.eqMax));

    // Calcola delta in base all'azione scelta
    let delta1 = 0, delta2 = 0;
    if (s.equilibriMultipli) {
      if (azione === 'forza') {
        delta1 = 1;
      } else if (azione === 'armonia') {
        delta2 = 1;
      } else { // 'bilancia': avvicina entrambi gli assi al centro
        delta1 = s.tensione  > 5 ? -1 : (s.tensione  < 5 ? 1 : 0);
        delta2 = s.tensione2 > 5 ? -1 : (s.tensione2 < 5 ? 1 : 0);
      }
    } else {
      delta1 = Number(azione); // -1, 0, oppure 1
    }

    // Applica delta + drift naturale del rituale
    s.tensione = Math.max(0, Math.min(10, s.tensione + delta1 + drift));
    if (s.equilibriMultipli) {
      s.tensione2 = Math.max(0, Math.min(10, s.tensione2 + delta2 + drift2));
    }

    // Controlla equilibrio dopo l'aggiornamento
    const inEq = this._inEquilibrio(s.tensione, s.eqMin, s.eqMax) &&
      (!s.equilibriMultipli || this._inEquilibrio(s.tensione2, s.eqMin, s.eqMax));

    if (inEq) {
      s.passiConsecutivi++;
      Aptico.trillo();
      this._suonoEquilibrio(true);
    } else {
      if (eraInEq) Aptico.errore(); // vibrazione di avviso se appena uscito dall'equilibrio
      s.passiConsecutivi = 0;
      const dist = Math.max(
        this._distanzaEquilibrio(s.tensione, s.eqMin, s.eqMax),
        s.equilibriMultipli ? this._distanzaEquilibrio(s.tensione2, s.eqMin, s.eqMax) : 0
      );
      this._suonoEquilibrio(false, dist);
      // Aptico crescente: intensità inversamente proporzionale alla distanza dall'equilibrio
      Aptico.crescente(Math.max(0.1, 1 - dist / 5));
    }

    // Aggiunge al registro delle ultime mosse
    const labelAzione = s.equilibriMultipli
      ? { forza: 'Forza', bilancia: 'Bilancia', armonia: 'Armonia' }[azione]
      : (Number(azione) === 1 ? 'Aumenta' : Number(azione) === -1 ? 'Diminuisci' : 'Mantieni');
    s.storico.push({ azione: labelAzione, tensione: s.tensione, inEquilibrio: inEq });

    s.nodoCorrente++;

    // Verifica vittoria
    if (s.passiConsecutivi >= s.passiEquilibrio) {
      this._concludi(true, contenitore);
      return;
    }

    // Verifica sconfitta (nodi esauriti)
    if (s.nodoCorrente >= s.nodi) {
      this._concludi(false, contenitore);
      return;
    }

    // Aggiorna il DOM senza re-render completo
    this._aggiornaDomNodo(contenitore);
  },

  _aggiornaDomNodo(contenitore) {
    const s = this.stato;
    const wrapper = contenitore.firstElementChild;
    if (!wrapper) return;

    // Intestazione
    const intestazione = wrapper.querySelector('.labirinto-intestazione');
    if (intestazione) intestazione.textContent = `Nodo ${s.nodoCorrente + 1} di ${s.nodi}`;

    // Testo e indicatore dell'asse principale
    const testoEl = wrapper.querySelector('[data-tensione]');
    if (testoEl) testoEl.textContent = this._descrizioneTensione(s.tensione, s.eqMin, s.eqMax);
    const indEl = wrapper.querySelector('[data-indicatore]');
    if (indEl) {
      indEl.style.left = (s.tensione / 10 * 100) + '%';
      this._applicaClasseIndicatore(indEl, s.tensione);
    }

    // Testo e indicatore del secondo asse (solo adepto)
    if (s.equilibriMultipli) {
      const testoEl2 = wrapper.querySelector('[data-tensione2]');
      if (testoEl2) testoEl2.textContent = this._descrizioneTensione(s.tensione2, s.eqMin, s.eqMax);
      const indEl2 = wrapper.querySelector('[data-indicatore2]');
      if (indEl2) {
        indEl2.style.left = (s.tensione2 / 10 * 100) + '%';
        this._applicaClasseIndicatore(indEl2, s.tensione2);
      }
    }

    // Contatore passi
    if (s.passiEquilibrio > 1) {
      const passiEl = wrapper.querySelector('[data-passi]');
      if (passiEl) passiEl.textContent = `Equilibrio mantenuto: ${s.passiConsecutivi} / ${s.passiEquilibrio}`;
    }

    // Storico
    this._aggiornaStorico(wrapper);

    // Annuncio VoiceOver
    let msg = this._descrizioneTensione(s.tensione, s.eqMin, s.eqMax);
    if (s.equilibriMultipli) {
      // Adatta la seconda descrizione all'asse "armonia"
      const descArmonia = this._descrizioneTensione(s.tensione2, s.eqMin, s.eqMax)
        .replace('La tensione è', 'L\'armonia è')
        .replace('La tensione', 'L\'armonia');
      msg += ' ' + descArmonia;
    }
    if (s.passiConsecutivi > 0) {
      msg += ` Equilibrio mantenuto: ${s.passiConsecutivi} su ${s.passiEquilibrio}.`;
    }
    _annunciaVoiceoverSafe(msg);
  },

  _aggiornaStorico(wrapper) {
    const s = this.stato;
    const storicoEl = wrapper.querySelector('[data-storico]');
    if (!storicoEl) return;

    const ultimeVoci = s.storico.slice(-3);
    const items = ultimeVoci.map(v => {
      const li = document.createElement('li');
      li.className = 'labirinto-storico-voce' +
        (v.inEquilibrio ? ' labirinto-storico-voce--equilibrio' : '');
      li.textContent = `${v.azione}: ${v.tensione}`;
      return li;
    });

    if (storicoEl.replaceChildren) {
      storicoEl.replaceChildren(...items);
    } else {
      while (storicoEl.firstChild) storicoEl.removeChild(storicoEl.firstChild);
      items.forEach(item => storicoEl.appendChild(item));
    }
  },

  // Audio sintetico per il feedback di equilibrio.
  // Non silenzia l'audio ambientale — si sovrappone ad esso.
  _suonoEquilibrio(inEquilibrio, distanza = 0) {
    if (inEquilibrio) {
      // Accordo stabile: A2 + E3 + A3 — si fonde con le vocalizzazioni della Sala Rituale
      _suonoMinigioco(220, 0.6, 'sine', 0.3);
      _suonoMinigioco(330, 0.5, 'sine', 0.25);
      _suonoMinigioco(440, 0.5, 'sine', 0.2);
    } else {
      // Tono basso che cresce in dissonanza con la distanza
      const freq  = Math.max(150, Math.round(440 * Math.pow(0.82, distanza)));
      const forma = distanza >= 3 ? 'sawtooth' : 'triangle';
      _suonoMinigioco(freq, 0.25, forma, 0.25);
    }
  },

  _concludi(riuscito, contenitore) {
    const s = this.stato;
    const categoria = _categoriaRisultato('labirintoEquilibrio', riuscito);
    const punti = InterfacciaMinigiochi.registraRisultato('labirintoEquilibrio', categoria, 'rituali');

    if (riuscito) {
      Aptico.lungo();
      // Melodia di completamento — 4 note ascendenti programmate via AudioContext
      const ctx = _contestoAudio();
      if (ctx && ctx.state !== 'suspended') {
        const note = [
          { freq: 261, t: 0,    d: 0.4 },
          { freq: 330, t: 0.25, d: 0.4 },
          { freq: 392, t: 0.5,  d: 0.4 },
          { freq: 523, t: 0.75, d: 0.8 }
        ];
        const ora = ctx.currentTime;
        note.forEach(({ freq, t, d }) => {
          const osc  = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.value = 0.07;
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ora + t);
          gain.gain.exponentialRampToValueAtTime(0.001, ora + t + d);
          osc.stop(ora + t + d + 0.01);
        });
      }
      _annunciaVoiceoverSafe('Equilibrio raggiunto. Il rituale è completo.');
    } else {
      Aptico.errore();
      _suonoMinigioco(196, 0.5, 'sawtooth', 0.2);
      _annunciaVoiceoverSafe('Il rituale si è dissolto. L\'equilibrio non è stato mantenuto.');
    }

    this._mostraFine(riuscito, categoria, punti, contenitore);
  },

  _mostraFine(riuscito, categoria, punti, contenitore) {
    const s = this.stato;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-labirinto minigioco-labirinto--fine';

    const titolo = document.createElement('p');
    titolo.className = 'labirinto-fine-titolo';
    titolo.textContent = riuscito ? 'Equilibrio raggiunto' : 'Rituale dissolto';
    wrapper.appendChild(titolo);

    const descrizione = document.createElement('p');
    descrizione.className = 'labirinto-fine-descrizione';
    if (riuscito) {
      if (categoria === 'ottimale') {
        descrizione.textContent = 'Il cerchio rituale risuona con chiarezza. Ogni fase è stata condotta con precisione.';
      } else if (categoria === 'buono') {
        descrizione.textContent = 'Il rituale si è concluso. La tensione era governabile, ma non padroneggiata appieno.';
      } else {
        descrizione.textContent = 'Il rituale ha tenuto, al limite. C\'è ancora molto da imparare sulla gestione della tensione.';
      }
    } else {
      descrizione.textContent = 'La tensione ha sfuggito al controllo. Il rituale si è interrotto prima del completamento.';
    }
    wrapper.appendChild(descrizione);

    const btnProsegui = document.createElement('button');
    btnProsegui.type = 'button';
    btnProsegui.className = 'btn-primario';
    btnProsegui.textContent = 'Prosegui';
    btnProsegui.addEventListener('click', () => {
      if (s.callbackFine) s.callbackFine(categoria, punti);
    });
    wrapper.appendChild(btnProsegui);

    contenitore.replaceChildren(wrapper);
    btnProsegui.focus();
  }
};


// ------------------------------------------------------------
// REBUS ACCESSIBILE — Erudizione
// Due sottomodalità scelte casualmente:
//   - Rebus: indizi graduali (1 → N) + scelta multipla
//   - Quiz: domanda diretta + scelta multipla
// Nessun feedback aptico (Erudizione non è disciplina aptica).
// Dati contenuti in narrative.js: REBUS_ACCESSIBILE, QUIZ_ERUDIZIONE.
// ------------------------------------------------------------
const RebusAccessibile = {
  stato: null,

  avvia(contenitore, gradoErudizione, disciplina, callbackFine) {
    const grado = (gradoErudizione || 'allievo').toLowerCase();
    const config = CONFIG_MINIGIOCHI.rebusAccessibile;
    const cfg    = config[grado] || config.allievo;

    // Per archivista (trasversale) la disciplina viene scelta casualmente
    const discipline = ['storia', 'filosofia', 'scienzeNaturali', 'letteratura'];
    const idDisciplina = (cfg.trasversale || !disciplina || !discipline.includes(disciplina))
      ? discipline[Math.floor(Math.random() * discipline.length)]
      : disciplina;

    // Scelta casuale tra Rebus e Quiz
    const modalita = Math.random() < 0.5 ? 'rebus' : 'quiz';

    // Selezione domanda casuale dal pool della disciplina
    const pool = modalita === 'rebus'
      ? (REBUS_ACCESSIBILE[idDisciplina] || REBUS_ACCESSIBILE.storia)
      : (QUIZ_ERUDIZIONE[idDisciplina]   || QUIZ_ERUDIZIONE.storia);
    const domanda = pool[Math.floor(Math.random() * pool.length)];

    this.stato = {
      grado,
      modalita,
      idDisciplina,
      domanda,
      indiziMassimo:  cfg.indiziMassimo,
      indiziRivelati: 1,  // il primo indizio è sempre mostrato automaticamente
      callbackFine,
      tentativo: _incrementaTentativi('rebusAccessibile')
    };

    this._renderizza(contenitore);

    // Focus alla prima opzione di risposta — coerente con le transizioni del resto del progetto
    const primaOpzione = contenitore.querySelector('.rebus-opzione');
    if (primaOpzione) primaOpzione.focus();

    // Annuncio iniziale per VoiceOver
    const nomeDisc = this._nomeDisciplina(idDisciplina);
    if (modalita === 'rebus') {
      _annunciaVoiceoverSafe(
        `Rebus di ${nomeDisc}. Indizio 1 di ${cfg.indiziMassimo}: ${domanda.indizi[0]}. ` +
        'Scegli la risposta oppure ascolta altri indizi.'
      );
    } else {
      _annunciaVoiceoverSafe(`Quiz di ${nomeDisc}. ${domanda.domanda}`);
    }
  },

  _nomeDisciplina(id) {
    return { storia: 'Storia', filosofia: 'Filosofia', scienzeNaturali: 'Scienze Naturali', letteratura: 'Letteratura' }[id] || id;
  },

  _renderizza(contenitore) {
    const s = this.stato;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-rebus';

    // Riga tipo + disciplina
    const intestazione = document.createElement('div');
    intestazione.className = 'rebus-intestazione';

    const tipoEl = document.createElement('span');
    tipoEl.className = 'rebus-tipo';
    tipoEl.textContent = s.modalita === 'rebus' ? 'Rebus' : 'Quiz';
    intestazione.appendChild(tipoEl);

    const disciplinaEl = document.createElement('span');
    disciplinaEl.className = 'rebus-disciplina-label';
    disciplinaEl.textContent = this._nomeDisciplina(s.idDisciplina);
    intestazione.appendChild(disciplinaEl);

    wrapper.appendChild(intestazione);

    if (s.modalita === 'rebus') {
      // Blocco indizi
      const indiziGruppo = document.createElement('div');
      indiziGruppo.className = 'rebus-indizi';
      indiziGruppo.setAttribute('role', 'group');
      indiziGruppo.setAttribute('aria-label', 'Indizi rivelati');

      const indiziLista = document.createElement('ul');
      indiziLista.className = 'rebus-indizi-lista';
      indiziLista.setAttribute('data-indizi-lista', '');
      // aria-live: aggiornamenti annunciati da VoiceOver senza disturbare la lettura corrente
      indiziLista.setAttribute('aria-live', 'polite');

      const li = document.createElement('li');
      li.className = 'rebus-indizio';
      li.textContent = `Indizio 1: ${s.domanda.indizi[0]}`;
      indiziLista.appendChild(li);
      indiziGruppo.appendChild(indiziLista);

      const contatoreEl = document.createElement('p');
      contatoreEl.className = 'rebus-contatore';
      contatoreEl.setAttribute('data-contatore', '');
      contatoreEl.textContent = `Indizi usati: 1 di ${s.indiziMassimo}`;
      indiziGruppo.appendChild(contatoreEl);

      wrapper.appendChild(indiziGruppo);

      // Pulsante per rivelare il prossimo indizio
      const btnIndizio = document.createElement('button');
      btnIndizio.type = 'button';
      btnIndizio.className = 'btn-secondario rebus-btn-indizio';
      btnIndizio.setAttribute('data-btn-indizio', '');
      btnIndizio.textContent = 'Prossimo indizio';
      if (s.indiziRivelati >= s.indiziMassimo) btnIndizio.disabled = true;
      btnIndizio.addEventListener('click', () => this._rivelaProssimoIndizio(contenitore));
      wrapper.appendChild(btnIndizio);

    } else {
      // Blocco domanda (Quiz)
      const domandaEl = document.createElement('p');
      domandaEl.className = 'rebus-domanda';
      domandaEl.textContent = s.domanda.domanda;
      wrapper.appendChild(domandaEl);
    }

    // Opzioni di risposta
    const opzioniGruppo = document.createElement('div');
    opzioniGruppo.className = 'rebus-opzioni';
    opzioniGruppo.setAttribute('role', 'group');
    opzioniGruppo.setAttribute('aria-label', 'Scegli la risposta');
    opzioniGruppo.setAttribute('data-opzioni', '');

    s.domanda.opzioni.forEach((testo, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-secondario rebus-opzione';
      btn.textContent = testo;
      btn.setAttribute('aria-label', `Opzione ${idx + 1}: ${testo}`);
      btn.addEventListener('click', () => this._selezionaOpzione(idx, contenitore));
      opzioniGruppo.appendChild(btn);
    });

    wrapper.appendChild(opzioniGruppo);
    contenitore.replaceChildren(wrapper);
  },

  _rivelaProssimoIndizio(contenitore) {
    const s = this.stato;
    if (s.indiziRivelati >= s.indiziMassimo) return;
    if (s.indiziRivelati >= s.domanda.indizi.length) return;

    s.indiziRivelati++;
    const nuovoIndizio = s.domanda.indizi[s.indiziRivelati - 1];

    // Suono sottile di rivelazione — coerente con il registro accademico
    _suonoMinigioco(659, 0.15, 'sine', 0.2);

    const wrapper  = contenitore.firstElementChild;
    const lista    = wrapper && wrapper.querySelector('[data-indizi-lista]');
    if (lista) {
      const li = document.createElement('li');
      li.className = 'rebus-indizio rebus-indizio--nuovo';
      li.textContent = `Indizio ${s.indiziRivelati}: ${nuovoIndizio}`;
      lista.appendChild(li);
      // Rimuove la classe di animazione al termine
      setTimeout(() => li.classList.remove('rebus-indizio--nuovo'), 600);
    }

    const contatoreEl = wrapper && wrapper.querySelector('[data-contatore]');
    if (contatoreEl) {
      contatoreEl.textContent = `Indizi usati: ${s.indiziRivelati} di ${s.indiziMassimo}`;
    }

    const btnIndizio = wrapper && wrapper.querySelector('[data-btn-indizio]');
    if (btnIndizio && s.indiziRivelati >= s.indiziMassimo) {
      btnIndizio.disabled = true;
    }

    _annunciaVoiceoverSafe(
      `Indizio ${s.indiziRivelati}: ${nuovoIndizio}. ` +
      `Indizi usati: ${s.indiziRivelati} di ${s.indiziMassimo}.`
    );
  },

  _selezionaOpzione(idxSelezionato, contenitore) {
    const s = this.stato;

    const riuscito = s.modalita === 'rebus'
      ? s.domanda.opzioni[idxSelezionato] === s.domanda.risposta
      : idxSelezionato === s.domanda.rispostaCorretta;

    // Calcola categoria — nessun feedback aptico per Erudizione
    const categoria = !riuscito
      ? 'fallito'
      : s.modalita === 'rebus'
        ? this._categoriaConIndizi(s.indiziRivelati, s.indiziMassimo)
        : _categoriaRisultato('rebusAccessibile', true);

    if (riuscito) {
      _suonoMinigioco(523, 0.4, 'sine', 0.4);
    } else {
      _suonoMinigioco(311, 0.3, 'triangle', 0.3);
    }

    const punti = InterfacciaMinigiochi.registraRisultato('rebusAccessibile', categoria, s.idDisciplina);

    // Evidenzia la risposta corretta (e quella sbagliata se diversa)
    const wrapper      = contenitore.firstElementChild;
    const opzioniGruppo = wrapper && wrapper.querySelector('[data-opzioni]');
    if (opzioniGruppo) {
      const idxCorretto = s.modalita === 'rebus'
        ? s.domanda.opzioni.indexOf(s.domanda.risposta)
        : s.domanda.rispostaCorretta;

      opzioniGruppo.querySelectorAll('.rebus-opzione').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === idxCorretto)                    btn.classList.add('rebus-opzione--corretta');
        if (idx === idxSelezionato && !riuscito)    btn.classList.add('rebus-opzione--sbagliata');
      });

      const btnIndizio = wrapper.querySelector('[data-btn-indizio]');
      if (btnIndizio) btnIndizio.disabled = true;
    }

    this._mostraRisultato(riuscito, categoria, punti, contenitore);
  },

  // La categoria per il Rebus tiene conto di quanti indizi sono stati usati.
  // Pochi indizi → nessuna penalità sul risultato base.
  // Molti indizi → risultato degradato al massimo a 'accettabile'.
  _categoriaConIndizi(indiziUsati, indiziMassimo) {
    const base    = _categoriaRisultato('rebusAccessibile', true);
    const rapporto = indiziUsati / indiziMassimo;
    if (rapporto <= 0.3) return base;
    if (rapporto <= 0.6) return this._peggiore(base, 'buono');
    return this._peggiore(base, 'accettabile');
  },

  // Restituisce la peggiore tra due categorie (ottimale < buono < accettabile < fallito)
  _peggiore(a, b) {
    const ordine = ['ottimale', 'buono', 'accettabile', 'fallito'];
    const ia = ordine.indexOf(a);
    const ib = ordine.indexOf(b);
    return ordine[Math.max(ia < 0 ? 3 : ia, ib < 0 ? 3 : ib)];
  },

  _mostraRisultato(riuscito, categoria, punti, contenitore) {
    const s = this.stato;

    const rispCorretta = s.modalita === 'rebus'
      ? s.domanda.risposta
      : s.domanda.opzioni[s.domanda.rispostaCorretta];

    const wrapper = contenitore.firstElementChild;
    const pannello = document.createElement('div');
    pannello.className = 'rebus-pannello-risultato' +
      (riuscito ? ' rebus-pannello-risultato--corretto' : ' rebus-pannello-risultato--errato');

    // Il pulsante viene inserito PRIMA nel DOM (convenzione VoiceOver del progetto)
    const btnProsegui = document.createElement('button');
    btnProsegui.type = 'button';
    btnProsegui.className = 'btn-primario';
    btnProsegui.textContent = 'Prosegui';
    btnProsegui.addEventListener('click', () => {
      if (s.callbackFine) s.callbackFine(categoria, punti);
    });
    pannello.appendChild(btnProsegui);

    // Testo del risultato
    const testoEl = document.createElement('p');
    testoEl.className = 'rebus-testo-risultato';
    testoEl.setAttribute('aria-live', 'assertive');
    if (riuscito) {
      if (categoria === 'ottimale') {
        testoEl.textContent = 'Risposta corretta. Identificata con pochi indizi.';
      } else if (categoria === 'buono') {
        testoEl.textContent = 'Risposta corretta.';
      } else {
        testoEl.textContent = 'Risposta corretta, ma con molti indizi.';
      }
    } else {
      testoEl.textContent = `Risposta errata. La risposta corretta era: ${rispCorretta}.`;
    }
    pannello.appendChild(testoEl);

    if (wrapper) wrapper.appendChild(pannello);
    btnProsegui.focus();

    _annunciaVoiceoverSafe(testoEl.textContent);
  }
};


// ------------------------------------------------------------
// HELPER CONDIVISI — Scassinamento Alchemico e Incantamento
//
// Entrambi i minigiochi richiedono la disattivazione di VoiceOver.
// Un pannello sovrimpresso avvisa prima dell'avvio.
// Un segnale acustico dedicato marca inizio e fine del gioco.
// ------------------------------------------------------------

// Pannello di avviso VoiceOver — mostrato prima dell'avvio.
// Il pulsante è il primo elemento nel DOM (convenzione del progetto).
function _pannelloVoiceOff(contenitore, onProcedi) {
  const pannello = document.createElement('div');
  pannello.className = 'minigioco-scassinamento-avviso';
  pannello.setAttribute('role', 'alertdialog');
  pannello.setAttribute('aria-modal', 'true');
  pannello.setAttribute('aria-label', 'Avviso: disattivare VoiceOver per continuare');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-primario';
  btn.textContent = 'Inizia';
  btn.addEventListener('click', () => onProcedi());
  pannello.appendChild(btn);

  const testo = document.createElement('p');
  testo.className = 'scassinamento-avviso-testo';
  testo.textContent = 'Questo minigioco non è compatibile con VoiceOver. ' +
    'Disattiva VoiceOver prima di procedere. ' +
    'Un segnale acustico segnalerà l\'inizio e la fine.';
  pannello.appendChild(testo);

  contenitore.replaceChildren(pannello);
  btn.focus();
}

// Segnale acustico di INIZIO — 3 toni discendenti (conta alla rovescia)
function _suonoAvvioScassinamento() {
  const ctx = _contestoAudio();
  if (!ctx || ctx.state === 'suspended') return;
  const ora = ctx.currentTime;
  [[880, 0], [660, 0.18], [440, 0.36]].forEach(([freq, t]) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, ora + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ora + t + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ora + t);
    osc.stop(ora + t + 0.15);
  });
}

// Segnale acustico di FINE — 2 toni ascendenti (chiusura)
function _suonoFineScassinamento() {
  const ctx = _contestoAudio();
  if (!ctx || ctx.state === 'suspended') return;
  const ora = ctx.currentTime;
  [[440, 0], [880, 0.22]].forEach(([freq, t]) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, ora + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ora + t + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ora + t);
    osc.stop(ora + t + 0.19);
  });
}


// ------------------------------------------------------------
// SBLOCCAGGIO REAGENTE — Alchimia (attività libera in laboratorio)
//
// Crescendo lineare: il segnale cresce da zero al massimo in durataMaxMs.
// Un click/pop secco segnala l'inizio della finestra ottimale.
// Haptic irregolare prima, regolare nella finestra.
// Troppo presto → accettabile. Finestra → ottimale. Troppo tardi → fallito.
// ------------------------------------------------------------
const ScassinamentoAlchemico = {
  stato: null,

  avvia(contenitore, gradoArcana, callbackFine) {
    _pannelloVoiceOff(contenitore, () => this._avviaGioco(contenitore, gradoArcana, callbackFine));
  },

  _avviaGioco(contenitore, gradoArcana, callbackFine) {
    const grado = gradoArcana.toLowerCase();
    const config = CONFIG_MINIGIOCHI.sblocaggioReagente;
    const cfg    = config[grado] || config.apprendista;

    const durataMaxMs    = cfg.durataMaxMs;
    const finestraMs     = cfg.finestraMs;
    // Il punto critico si trova al 72% del ciclo (bollitura che raggiunge il picco)
    const puntoOttimale  = durataMaxMs * 0.72;
    const finestraInizio = puntoOttimale - finestraMs / 2;
    const finestraFine   = puntoOttimale + finestraMs / 2;

    this.stato = {
      grado,
      durataMaxMs,
      finestraMs,
      puntoOttimale,
      finestraInizio,
      finestraFine,
      startTime:        null,
      rafId:            null,
      oscilatoreRumore: null,
      lastHapticTime:   0,
      eseguito:         false,
      callbackFine,
      tentativo: _incrementaTentativi('sblocaggioReagente')
    };

    this._renderizza(contenitore);

    // Segnale di inizio, poi avvia il ciclo dopo i 3 beep (~650ms)
    _suonoAvvioScassinamento();
    setTimeout(() => this._iniziaLoop(contenitore), 650);
  },

  _renderizza(contenitore) {
    const s = this.stato;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-scassinamento minigioco-scassinamento--alchemico';

    const titolo = document.createElement('p');
    titolo.className = 'scassinamento-titolo';
    titolo.textContent = 'Sbloccaggio Reagente';
    wrapper.appendChild(titolo);

    const istruzione = document.createElement('p');
    istruzione.className = 'scassinamento-istruzione';
    istruzione.textContent = 'Scorri verso l\'alto nel momento giusto.';
    wrapper.appendChild(istruzione);

    // Barra di progresso lineare
    const barraContenitore = document.createElement('div');
    barraContenitore.className = 'scassinamento-barra-contenitore';
    barraContenitore.setAttribute('aria-hidden', 'true');

    const barraProgresso = document.createElement('div');
    barraProgresso.className = 'scassinamento-barra-progresso';
    barraProgresso.setAttribute('data-barra-progresso', '');
    barraContenitore.appendChild(barraProgresso);

    // Marker della finestra ottimale (visibile ai giocatori non VoiceOver)
    const markerFinestra = document.createElement('div');
    markerFinestra.className = 'scassinamento-marker-finestra';
    markerFinestra.setAttribute('aria-hidden', 'true');
    markerFinestra.style.left  = (s.finestraInizio / s.durataMaxMs * 100) + '%';
    markerFinestra.style.width = (s.finestraMs     / s.durataMaxMs * 100) + '%';
    barraContenitore.appendChild(markerFinestra);

    wrapper.appendChild(barraContenitore);

    // Area tap/swipe — grande per facilità di utilizzo su iPhone
    wrapper.appendChild(this._creaAreaTap(contenitore));

    contenitore.replaceChildren(wrapper);
  },

  _creaAreaTap(contenitore) {
    const areaTap = document.createElement('button');
    areaTap.type = 'button';
    areaTap.className = 'scassinamento-area-tap';
    areaTap.setAttribute('data-area-tap', '');
    areaTap.setAttribute('aria-label', 'Scorri verso l\'alto per agire');

    let startY = null;
    areaTap.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startY = e.touches[0].clientY;
    }, { passive: false });
    areaTap.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (startY !== null) {
        if (startY - e.changedTouches[0].clientY > 20) this._catturaTap(contenitore);
        startY = null;
      }
    }, { passive: false });
    areaTap.addEventListener('click', () => this._catturaTap(contenitore));

    return areaTap;
  },

  _iniziaLoop(contenitore) {
    const s = this.stato;
    s.startTime = performance.now();

    // Audio: rumore di bollitura crescente (sawtooth freq/vol in rampa)
    const ctx = _contestoAudio();
    if (ctx && ctx.state !== 'suspended') {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      const sec  = s.durataMaxMs / 1000;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(290, ctx.currentTime + sec);
      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + sec);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      s.oscilatoreRumore = osc;

      // Click/pop secco all'inizio della finestra — segnale primario per il giocatore
      const tPop = ctx.currentTime + s.finestraInizio / 1000;
      const oscPop  = ctx.createOscillator();
      const gainPop = ctx.createGain();
      oscPop.type = 'square';
      oscPop.frequency.value = 1100;
      gainPop.gain.setValueAtTime(0, tPop);
      gainPop.gain.linearRampToValueAtTime(0.85, tPop + 0.001);
      gainPop.gain.exponentialRampToValueAtTime(0.001, tPop + 0.04);
      oscPop.connect(gainPop);
      gainPop.connect(ctx.destination);
      oscPop.start(tPop);
      oscPop.stop(tPop + 0.05);
    }

    // Haptic pre-finestra: impulsi irregolari con frequenza crescente
    // Distribuiti con legge di potenza (più densi vicino alla finestra)
    const N = 11;
    for (let i = 1; i <= N; i++) {
      const t = s.finestraInizio * Math.pow(i / (N + 1), 0.6);
      setTimeout(() => { if (!s.eseguito) Aptico.irregolare(); }, t);
    }

    // Loop di animazione
    const loop = () => {
      if (s.eseguito) return;
      const elapsed = performance.now() - s.startTime;
      const perc    = Math.min(elapsed / s.durataMaxMs * 100, 100);

      // Aggiorna barra progresso
      const wrapper = contenitore.firstElementChild;
      if (wrapper) {
        const barra = wrapper.querySelector('[data-barra-progresso]');
        if (barra) {
          barra.style.width = perc + '%';
          const inFinestra = elapsed >= s.finestraInizio && elapsed <= s.finestraFine;
          const oltreFinestra = elapsed > s.finestraFine;
          barra.classList.toggle('scassinamento-barra-progresso--finestra', inFinestra);
          barra.classList.toggle('scassinamento-barra-progresso--tardo',    oltreFinestra);
        }
      }

      // Haptic regolare nella finestra ottimale (rate-limited)
      const inFin = elapsed >= s.finestraInizio && elapsed <= s.finestraFine;
      const ora   = performance.now();
      if (inFin && ora - s.lastHapticTime > 180) {
        Aptico.medio();
        s.lastHapticTime = ora;
      }

      // Timeout — il preparato si deteriora
      if (elapsed >= s.durataMaxMs) {
        this._fermaAudio();
        this._concludi('tardi', contenitore);
        return;
      }

      s.rafId = requestAnimationFrame(loop);
    };
    s.rafId = requestAnimationFrame(loop);
  },

  _catturaTap(contenitore) {
    const s = this.stato;
    if (s.eseguito || !s.startTime) return;
    s.eseguito = true;

    if (s.rafId) cancelAnimationFrame(s.rafId);
    this._fermaAudio();

    const elapsed = performance.now() - s.startTime;
    const esito = (elapsed >= s.finestraInizio && elapsed <= s.finestraFine)
      ? 'ottimale'
      : elapsed < s.finestraInizio ? 'presto' : 'tardi';

    this._concludi(esito, contenitore);
  },

  _fermaAudio() {
    const s = this.stato;
    try {
      if (s.oscilatoreRumore) { s.oscilatoreRumore.stop(); s.oscilatoreRumore = null; }
    } catch(e) {}
  },

  _concludi(esito, contenitore) {
    _suonoFineScassinamento();

    const s = this.stato;
    let categoria;
    if (esito === 'ottimale') {
      categoria = _categoriaRisultato('sblocaggioReagente', true);
      Aptico.lungo();
    } else if (esito === 'presto') {
      categoria = 'accettabile';
      Aptico.doppio();
    } else {
      categoria = 'fallito';
      Aptico.errore();
    }

    const punti = InterfacciaMinigiochi.registraRisultato('sblocaggioReagente', categoria, 'alchimia');
    this._mostraFine(esito, categoria, punti, contenitore);
  },

  _mostraFine(esito, categoria, punti, contenitore) {
    const s = this.stato;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-scassinamento minigioco-scassinamento--fine';

    const titolo = document.createElement('p');
    titolo.className = 'scassinamento-fine-titolo';
    titolo.textContent =
      esito === 'ottimale' ? 'Distillazione riuscita' :
      esito === 'presto'   ? 'Preparato incompleto'   :
                             'Preparato deteriorato';
    wrapper.appendChild(titolo);

    const descrizione = document.createElement('p');
    descrizione.className = 'scassinamento-fine-descrizione';
    if (esito === 'ottimale') {
      descrizione.textContent = categoria === 'ottimale'
        ? 'Il momento era esatto. Il preparato è di prima qualità.'
        : categoria === 'buono'
          ? 'Tempismo buono. Il preparato è integro.'
          : 'Hai centrato la finestra. Il risultato è accettabile.';
    } else if (esito === 'presto') {
      descrizione.textContent = 'Hai agito troppo presto. Il processo non aveva raggiunto il punto critico.';
    } else {
      descrizione.textContent = 'Hai aspettato troppo. Il preparato si è deteriorato oltre il punto di recupero.';
    }
    wrapper.appendChild(descrizione);

    const btnProsegui = document.createElement('button');
    btnProsegui.type = 'button';
    btnProsegui.className = 'btn-primario';
    btnProsegui.textContent = 'Prosegui';
    btnProsegui.addEventListener('click', () => {
      if (s.callbackFine) s.callbackFine(categoria, punti);
    });
    wrapper.appendChild(btnProsegui);

    contenitore.replaceChildren(wrapper);
    btnProsegui.focus();
  }
};


// ------------------------------------------------------------
// DISSOLVENZA — Incantamento (attività libera in laboratorio)
//
// Pendolo oscillante: sin(t) con periodo periodoMs.
// La finestra si presenta ciclicamente a ogni picco.
// Audio FM: suono grezzo lontano dal picco, puro al picco.
// Haptic: oscillante → stabile e regolare nella finestra.
// ------------------------------------------------------------
const ScassinamentoIncantamento = {
  stato: null,

  avvia(contenitore, gradoArcana, callbackFine) {
    _pannelloVoiceOff(contenitore, () => this._avviaGioco(contenitore, gradoArcana, callbackFine));
  },

  _avviaGioco(contenitore, gradoArcana, callbackFine) {
    const grado = gradoArcana.toLowerCase();
    const config = CONFIG_MINIGIOCHI.dissolvenza;
    const cfg    = config[grado] || config.apprendista;

    const periodoMs   = cfg.periodoMs;
    const finestraMs  = cfg.finestraMs;
    const cicliMax    = 4;

    this.stato = {
      grado,
      periodoMs,
      finestraMs,
      cicliMax,
      durataMaxMs:    periodoMs * cicliMax,
      startTime:      null,
      rafId:          null,
      oscPrincipale:  null,
      lfoOscillatore: null,
      lfoGainNodo:    null,
      gainPrincipale: null,
      lastHapticTime: 0,
      eseguito:       false,
      callbackFine,
      tentativo: _incrementaTentativi('dissolvenza')
    };

    this._renderizza(contenitore);

    _suonoAvvioScassinamento();
    setTimeout(() => this._iniziaLoop(contenitore), 650);
  },

  _renderizza(contenitore) {
    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-scassinamento minigioco-scassinamento--incantamento';

    const titolo = document.createElement('p');
    titolo.className = 'scassinamento-titolo';
    titolo.textContent = 'Dissolvenza';
    wrapper.appendChild(titolo);

    const istruzione = document.createElement('p');
    istruzione.className = 'scassinamento-istruzione';
    istruzione.textContent = 'Scorri verso l\'alto quando il suono è più puro.';
    wrapper.appendChild(istruzione);

    // Indicatore visivo del pendolo
    const pendoloContenitore = document.createElement('div');
    pendoloContenitore.className = 'scassinamento-pendolo-contenitore';
    pendoloContenitore.setAttribute('aria-hidden', 'true');

    const traccia = document.createElement('div');
    traccia.className = 'scassinamento-pendolo-traccia';

    // Zona ottimale all'estremità destra (dove il pendolo raggiunge il picco)
    const zonaOttimale = document.createElement('div');
    zonaOttimale.className = 'scassinamento-pendolo-zona-ottimale';
    traccia.appendChild(zonaOttimale);

    // Pallino che si muove lungo la traccia
    const pallino = document.createElement('div');
    pallino.className = 'scassinamento-pendolo-pallino';
    pallino.setAttribute('data-pendolo', '');
    pallino.style.left = '5%';
    traccia.appendChild(pallino);

    pendoloContenitore.appendChild(traccia);
    wrapper.appendChild(pendoloContenitore);

    wrapper.appendChild(this._creaAreaTap(contenitore));

    contenitore.replaceChildren(wrapper);
  },

  _creaAreaTap(contenitore) {
    const areaTap = document.createElement('button');
    areaTap.type = 'button';
    areaTap.className = 'scassinamento-area-tap';
    areaTap.setAttribute('data-area-tap', '');
    areaTap.setAttribute('aria-label', 'Scorri verso l\'alto per agire');

    let startY = null;
    areaTap.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startY = e.touches[0].clientY;
    }, { passive: false });
    areaTap.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (startY !== null) {
        if (startY - e.changedTouches[0].clientY > 20) this._catturaTap(contenitore);
        startY = null;
      }
    }, { passive: false });
    areaTap.addEventListener('click', () => this._catturaTap(contenitore));

    return areaTap;
  },

  _iniziaLoop(contenitore) {
    const s = this.stato;
    s.startTime = performance.now();

    // Audio FM: oscillatore principale modulato in frequenza da un LFO.
    // L'LFO è sincronizzato col pendolo — la profondità di modulazione diminuisce
    // al picco, producendo un suono più puro nella finestra ottimale.
    const ctx = _contestoAudio();
    if (ctx && ctx.state !== 'suspended') {
      const oscP = ctx.createOscillator();
      oscP.type = 'sine';
      oscP.frequency.value = 330;

      const lfoOsc = ctx.createOscillator();
      lfoOsc.type = 'sine';
      // LFO sincronizzato col pendolo: 1 ciclo ogni periodoMs
      lfoOsc.frequency.value = 1000 / s.periodoMs;

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 22; // profondità FM iniziale (Hz) — viene variata nel loop

      const gainP = ctx.createGain();
      gainP.gain.value = 0.15;

      lfoOsc.connect(lfoGain);
      lfoGain.connect(oscP.frequency); // FM: LFO modula la frequenza principale

      oscP.connect(gainP);
      gainP.connect(ctx.destination);

      oscP.start();
      lfoOsc.start();

      s.oscPrincipale  = oscP;
      s.lfoOscillatore = lfoOsc;
      s.lfoGainNodo    = lfoGain;
      s.gainPrincipale = gainP;
    }

    const loop = () => {
      if (s.eseguito) return;
      const elapsed = performance.now() - s.startTime;

      // sin oscillante: 1 al picco (finestra), -1 al minimo
      const sinV   = Math.sin(2 * Math.PI * elapsed / s.periodoMs);
      // Normalizzato: 0 (minimo) → 1 (picco)
      const livello = (sinV + 1) / 2;

      // Aggiorna audio FM in tempo reale
      const ctx2 = _contestoAudio();
      if (ctx2 && ctx2.state !== 'suspended') {
        // Al picco: lfoGain → 0 (suono puro). Al minimo: lfoGain → 25 (grezzo)
        if (s.lfoGainNodo)    s.lfoGainNodo.gain.value    = (1 - livello) * 25;
        // Volume oscilla con il pendolo
        if (s.gainPrincipale) s.gainPrincipale.gain.value = 0.06 + livello * 0.22;
      }

      // Aggiorna indicatore visivo
      const wrapper = contenitore.firstElementChild;
      if (wrapper) {
        const pallino = wrapper.querySelector('[data-pendolo]');
        if (pallino) {
          // left: da 5% (minimo sin) a 87% (picco sin)
          pallino.style.left = (5 + livello * 82) + '%';
          pallino.classList.toggle('scassinamento-pendolo-pallino--picco', livello > 0.85);
        }
      }

      // Feedback aptico rate-limited
      const inFin = this._inFinestra(elapsed, s.periodoMs, s.finestraMs);
      const ora   = performance.now();
      if (inFin && ora - s.lastHapticTime > 200) {
        // Nella finestra: impulso regolare stabile
        Aptico.medio();
        s.lastHapticTime = ora;
      } else if (!inFin && livello > 0.55 && ora - s.lastHapticTime > 320) {
        // Vicino al picco: impulso leggero (segnale oscillante)
        Aptico.leggero();
        s.lastHapticTime = ora;
      }

      // Fine cicli
      if (elapsed >= s.durataMaxMs) {
        this._fermaAudio();
        this._concludi(false, s.finestraMs * 2, contenitore); // distanza grande → fallito
        return;
      }

      s.rafId = requestAnimationFrame(loop);
    };
    s.rafId = requestAnimationFrame(loop);
  },

  // Verifica se il tempo corrente cade nella finestra ottimale (vicino al picco del sin)
  _inFinestra(elapsed, periodoMs, finestraMs) {
    const tInCiclo     = elapsed % periodoMs;
    const piccoInCiclo = periodoMs / 4;
    const dist         = Math.abs(tInCiclo - piccoInCiclo);
    // Distanza circolare al picco più vicino nel ciclo
    const distCircolare = Math.min(dist, periodoMs - dist);
    return distCircolare <= finestraMs / 2;
  },

  _catturaTap(contenitore) {
    const s = this.stato;
    if (s.eseguito || !s.startTime) return;
    s.eseguito = true;

    if (s.rafId) cancelAnimationFrame(s.rafId);
    this._fermaAudio();

    const elapsed      = performance.now() - s.startTime;
    const tInCiclo     = elapsed % s.periodoMs;
    const piccoInCiclo = s.periodoMs / 4;
    const dist         = Math.abs(tInCiclo - piccoInCiclo);
    const distPicco    = Math.min(dist, s.periodoMs - dist);

    this._concludi(this._inFinestra(elapsed, s.periodoMs, s.finestraMs), distPicco, contenitore);
  },

  _fermaAudio() {
    const s = this.stato;
    try {
      if (s.oscPrincipale)  { s.oscPrincipale.stop();  s.oscPrincipale  = null; }
      if (s.lfoOscillatore) { s.lfoOscillatore.stop(); s.lfoOscillatore = null; }
    } catch(e) {}
  },

  _concludi(inFinestra, distPicco, contenitore) {
    _suonoFineScassinamento();

    const s = this.stato;
    let categoria;
    if (inFinestra) {
      categoria = _categoriaRisultato('dissolvenza', true);
      Aptico.lungo();
    } else if (distPicco <= s.finestraMs) {
      // Vicino alla finestra ma non dentro — risultato parziale
      categoria = 'accettabile';
      Aptico.doppio();
    } else {
      categoria = 'fallito';
      Aptico.errore();
    }

    const punti = InterfacciaMinigiochi.registraRisultato('dissolvenza', categoria, 'incantamento');
    this._mostraFine(inFinestra, categoria, punti, contenitore);
  },

  _mostraFine(inFinestra, categoria, punti, contenitore) {
    const s = this.stato;

    const wrapper = document.createElement('div');
    wrapper.className = 'minigioco-scassinamento minigioco-scassinamento--fine';

    const titolo = document.createElement('p');
    titolo.className = 'scassinamento-fine-titolo';
    titolo.textContent = inFinestra ? 'Dissolvenza riuscita' : 'Dissolvenza mancata';
    wrapper.appendChild(titolo);

    const descrizione = document.createElement('p');
    descrizione.className = 'scassinamento-fine-descrizione';
    if (inFinestra) {
      descrizione.textContent = categoria === 'ottimale'
        ? 'Il ritmo era esatto. L\'incantamento ha preso forma con precisione.'
        : categoria === 'buono'
          ? 'Buon tempismo. L\'incantamento è riuscito.'
          : 'Hai trovato il momento. Il risultato è accettabile.';
    } else if (categoria === 'accettabile') {
      descrizione.textContent = 'Quasi nel momento giusto. L\'incantamento è debole ma presente.';
    } else {
      descrizione.textContent = 'Il momento era sbagliato. L\'incantamento non ha attecchito.';
    }
    wrapper.appendChild(descrizione);

    const btnProsegui = document.createElement('button');
    btnProsegui.type = 'button';
    btnProsegui.className = 'btn-primario';
    btnProsegui.textContent = 'Prosegui';
    btnProsegui.addEventListener('click', () => {
      if (s.callbackFine) s.callbackFine(categoria, punti);
    });
    wrapper.appendChild(btnProsegui);

    contenitore.replaceChildren(wrapper);
    btnProsegui.focus();
  }
};


// ------------------------------------------------------------
// API PUBBLICA DEI MINIGIOCHI
// Punto di accesso unico per ui.js.
// ------------------------------------------------------------
const Minigiochi = {
  // disciplina: opzionale — passato da ui.js per i contesti lezione/esame.
  // Usato da RebusAccessibile per selezionare il contenuto corretto.
  avvia(idMinigioco, contenitore, callbackFine, disciplina) {
    const gradoArcana      = leggiGrado('arcana')      || 'Novizio';
    const gradoErudizione  = leggiGrado('erudizione')  || 'Allievo';

    switch (idMinigioco) {
      case 'memoryRune':
        MemoryRune.avvia(contenitore, gradoArcana, callbackFine);
        break;
      case 'minesweeperReagenti':
        MinesweeperReagenti.avvia(contenitore, gradoArcana, callbackFine);
        break;
      case 'mastermindFormule':
        MastermindFormule.avvia(contenitore, gradoArcana, callbackFine);
        break;
      case 'meccanicaSpellcasting':
        MeccanicaSpellcasting.avvia(contenitore, gradoArcana, callbackFine);
        break;
      case 'labirintoEquilibrio':
        LabirintoEquilibrio.avvia(contenitore, gradoArcana, callbackFine);
        break;
      case 'rebusAccessibile':
        RebusAccessibile.avvia(contenitore, gradoErudizione, disciplina || null, callbackFine);
        break;
      case 'sblocaggioReagente':
        ScassinamentoAlchemico.avvia(contenitore, gradoArcana, callbackFine);
        break;
      case 'dissolvenza':
        ScassinamentoIncantamento.avvia(contenitore, gradoArcana, callbackFine);
        break;
      default:
        console.warn('[Minigiochi] Minigioco non riconosciuto:', idMinigioco);
        // Chiama la callback per evitare che l'UI rimanga bloccata
        if (typeof callbackFine === 'function') callbackFine('fallimento', 0);
    }
  },

  resetTentativi(idMinigioco) {
    delete contatoriTentativi[idMinigioco];
  }
};
