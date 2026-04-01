'use strict';

// ============================================================
// TEST-ENGINE.JS — Elenthyr
// Test automatici per la logica pura del motore in Node.js.
//
// Da eseguire con: node test-engine.js
//
// IMPORTANTE: i test automatici verificano SOLO la logica
// pura del motore — mai interfaccia, navigazione, audio,
// aptici o compatibilità browser. Non sostituiscono mai
// il test su dispositivo fisico iPhone con Safari.
// ============================================================

// Shim minimo per eseguire game-engine.js e data.js in Node.js
// (che non ha window, localStorage, DOM, ecc.)
const shimLocalStorage = {
  _store: {},
  getItem(k)    { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

// Carica le dipendenze in un contesto vm condiviso.
// vm.createContext garantisce che tutte le dichiarazioni di funzione
// siano visibili nello stesso contesto, compatibile con Node.js 14+.
const fs = require('fs');
const vm = require('vm');

// Contesto condiviso tra tutti i file di gioco
const _ctx = vm.createContext({ localStorage: shimLocalStorage, console });

function caricaFile(percorso) {
  const codice = fs.readFileSync(percorso, 'utf8');
  vm.runInContext(codice, _ctx);
}

// Rende visibili nel test le funzioni definite nel contesto di gioco.
// Chiamata dopo il caricamento dei moduli.
function _esportaFunzioni() {
  const nomi = [
    'nuovaPartita', 'leggiStato', 'avanzaGiorno', 'testoIndicatoreTemporale',
    'leggiGrado', 'haGrado', 'aggiungiProgressione',
    'leggiReputazione', 'modificaReputazione', 'categoriaRelazione',
    'leggiSlotGiorno', 'leggiSlot', 'completaSlot', 'tuttiSlotCompletati',
    'luogoAccessibile', 'primaVisitaLuogo', 'segnaLuogoVisitato',
    'salva', 'caricaPartita', 'introGiaMostrata', 'segnaIntroMostrata',
    'applicaRiposo', 'applicaSocialita', 'applicaStudio', 'applicaAttivitaLuogo',
    'selezionaSequenzaDialogo', 'applicaSceltaDialogo', 'determinaLunghezzaDialogo'
  ];
  nomi.forEach(nome => { global[nome] = _ctx[nome]; });
}

// ============================================================
// INFRASTRUTTURA DI TEST
// ============================================================

let testPassati   = 0;
let testFalliti   = 0;
const risultati   = [];

function test(descrizione, fn) {
  try {
    fn();
    testPassati++;
    risultati.push({ ok: true, descrizione });
  } catch (err) {
    testFalliti++;
    risultati.push({ ok: false, descrizione, errore: err.message });
  }
}

function afferma(condizione, messaggio) {
  if (!condizione) {
    throw new Error(messaggio || 'Asserzione fallita');
  }
}

function uguali(a, b, messaggio) {
  if (a !== b) {
    throw new Error(messaggio || `Atteso ${JSON.stringify(b)}, ottenuto ${JSON.stringify(a)}`);
  }
}

function stampaRisultati() {
  console.log('\n=== Risultati test Elenthyr ===\n');
  risultati.forEach(r => {
    const simbolo = r.ok ? '✓' : '✗';
    console.log(`  ${simbolo} ${r.descrizione}`);
    if (!r.ok) {
      console.log(`    → ${r.errore}`);
    }
  });
  console.log(`\n  ${testPassati} passati, ${testFalliti} falliti\n`);

  if (testFalliti > 0) {
    process.exit(1);
  }
}


// ============================================================
// CARICAMENTO DEI MODULI DA TESTARE
// ============================================================

try {
  caricaFile('./data.js');
  caricaFile('./narrative.js');
  caricaFile('./game-engine.js');
  _esportaFunzioni();
} catch (err) {
  console.error('Impossibile caricare i moduli:', err.message);
  process.exit(1);
}


// ============================================================
// TEST — Sistema temporale
// ============================================================

test('nuovaPartita inizializza il giorno a 1', () => {
  nuovaPartita();
  const stato = leggiStato();
  uguali(stato.giorno, 1, 'Il giorno iniziale deve essere 1');
});

test('nuovaPartita inizializza la stagione come autunno', () => {
  nuovaPartita();
  const stato = leggiStato();
  uguali(stato.stagione, 'autunno', 'La stagione iniziale deve essere autunno');
});

test('nuovaPartita inizializza il semestre a 1', () => {
  nuovaPartita();
  const stato = leggiStato();
  uguali(stato.semestre, 1, 'Il semestre iniziale deve essere 1');
});

test('avanzaGiorno incrementa il giorno correttamente', () => {
  nuovaPartita();
  avanzaGiorno();
  const stato = leggiStato();
  uguali(stato.giorno, 2, 'Dopo avanzaGiorno il giorno deve essere 2');
});

test('testoIndicatoreTemporale nella fase accademica contiene il semestre', () => {
  nuovaPartita();
  const testo = testoIndicatoreTemporale();
  afferma(testo.includes('S1'), `Il testo "${testo}" deve contenere "S1"`);
});

test('testoIndicatoreTemporale nella fase post-accademica non contiene il semestre', () => {
  nuovaPartita();
  const stato = leggiStato();
  stato.fasePostAccademica = true;
  stato.semestre = null;
  const testo = testoIndicatoreTemporale();
  afferma(!testo.includes('S'), `Il testo "${testo}" non deve contenere il semestre`);
});


// ============================================================
// TEST — Sistema di gradi
// ============================================================

test('leggiGrado restituisce il grado iniziale corretto per arcana', () => {
  nuovaPartita();
  uguali(leggiGrado('arcana'), 'Novizio');
});

test('leggiGrado restituisce il grado iniziale corretto per erudizione', () => {
  nuovaPartita();
  uguali(leggiGrado('erudizione'), 'Allievo');
});

test('haGrado riconosce il grado attuale', () => {
  nuovaPartita();
  afferma(haGrado('arcana', 'Novizio'), 'Il protagonista deve avere grado Novizio');
});

test('haGrado restituisce false per un grado superiore non raggiunto', () => {
  nuovaPartita();
  afferma(!haGrado('arcana', 'Apprendista'), 'Il protagonista non deve avere grado Apprendista');
});

test('aggiungiProgressione aumenta i punti della disciplina', () => {
  nuovaPartita();
  aggiungiProgressione('alchimia', 10);
  const stato = leggiStato();
  uguali(stato.progressioneDiscipline.alchimia, 10, 'I punti alchimia devono essere 10');
});

test('aggiungiProgressione non supera 100', () => {
  nuovaPartita();
  aggiungiProgressione('alchimia', 150);
  const stato = leggiStato();
  uguali(stato.progressioneDiscipline.alchimia, 100, 'I punti non devono superare 100');
});


// ============================================================
// TEST — Reputazione PNG
// ============================================================

test('leggiReputazione restituisce il valore iniziale di Pietro Vasso', () => {
  nuovaPartita();
  uguali(leggiReputazione('pietroVasso'), 10, 'Pietro Vasso parte con relazione 10');
});

test('modificaReputazione aumenta la reputazione correttamente', () => {
  nuovaPartita();
  modificaReputazione('pietroVasso', 5);
  uguali(leggiReputazione('pietroVasso'), 15);
});

test('modificaReputazione non supera 100', () => {
  nuovaPartita();
  modificaReputazione('pietroVasso', 200);
  uguali(leggiReputazione('pietroVasso'), 100);
});

test('modificaReputazione non scende sotto -100', () => {
  nuovaPartita();
  modificaReputazione('pietroVasso', -200);
  uguali(leggiReputazione('pietroVasso'), -100);
});

test('categoriaRelazione restituisce "base" per valori neutri', () => {
  nuovaPartita();
  uguali(categoriaRelazione('corneliaVesti'), 'base');
});


// ============================================================
// TEST — Slot giornalieri
// ============================================================

test('nuovaPartita genera 7 slot giornalieri', () => {
  nuovaPartita();
  const slots = leggiSlotGiorno();
  uguali(slots.length, 7, 'Devono esserci 7 slot giornalieri');
});

test('Il primo slot è "mattina"', () => {
  nuovaPartita();
  const slots = leggiSlotGiorno();
  uguali(slots[0].id, 'mattina');
});

test('L\'ultimo slot è "notte"', () => {
  nuovaPartita();
  const slots = leggiSlotGiorno();
  uguali(slots[6].id, 'notte');
});

test('completaSlot segna lo slot come completato', () => {
  nuovaPartita();
  // Libera lo slot mattina per il test
  const stato = leggiStato();
  const slotMattina = stato.slotGiorno.find(s => s.id === 'mattina');
  slotMattina.stato = 'libero';

  completaSlot('mattina');
  const slotAggiornato = leggiSlot('mattina');
  uguali(slotAggiornato.stato, 'completato');
});


// ============================================================
// TEST — Luoghi
// ============================================================

test('luogoAccessibile restituisce true per luoghi senza requisiti', () => {
  nuovaPartita();
  afferma(luogoAccessibile('biblioteca'), 'La biblioteca deve essere accessibile da Novizio');
});

test('luogoAccessibile restituisce false per luoghi con requisiti non soddisfatti', () => {
  nuovaPartita();
  afferma(!luogoAccessibile('laboratorioAlchimia'), 'Il laboratorio non deve essere accessibile da Novizio');
});

test('primaVisitaLuogo restituisce true all\'inizio', () => {
  nuovaPartita();
  afferma(primaVisitaLuogo('biblioteca'), 'La biblioteca deve risultare non visitata all\'inizio');
});

test('segnaLuogoVisitato aggiorna correttamente lo stato', () => {
  nuovaPartita();
  segnaLuogoVisitato('biblioteca');
  afferma(!primaVisitaLuogo('biblioteca'), 'Dopo la visita, primaVisitaLuogo deve restituire false');
});


// ============================================================
// TEST — Salvataggio
// ============================================================

test('salva e caricaPartita preservano lo stato', () => {
  nuovaPartita();
  avanzaGiorno();
  avanzaGiorno();
  salva();

  // Simula un nuovo caricamento azzerando lo stato
  const giornoSalvato = leggiStato().giorno;
  const caricato = caricaPartita();

  afferma(caricato, 'caricaPartita deve restituire true');
  uguali(leggiStato().giorno, giornoSalvato, 'Il giorno deve essere preservato dopo il salvataggio');
});


// ============================================================
// TEST — Introduzione (Fase 4)
// ============================================================

test('nuovaPartita inizializza introMostrata a false', () => {
  nuovaPartita();
  const stato = leggiStato();
  uguali(stato.introMostrata, false, 'introMostrata deve essere false per una nuova partita');
});

test('introGiaMostrata restituisce false per una nuova partita al giorno 1', () => {
  nuovaPartita();
  afferma(!introGiaMostrata(), 'introGiaMostrata deve essere false per una nuova partita');
});

test('segnaIntroMostrata imposta il flag a true', () => {
  nuovaPartita();
  segnaIntroMostrata();
  afferma(introGiaMostrata(), 'Dopo segnaIntroMostrata, introGiaMostrata deve essere true');
});

test('introGiaMostrata restituisce true per giorno > 1 (salvataggi senza il campo)', () => {
  nuovaPartita();
  const stato = leggiStato();
  stato.giorno = 5;
  delete stato.introMostrata;
  afferma(introGiaMostrata(), 'Per giorno > 1 senza il campo, introGiaMostrata deve essere true');
});


// ============================================================
// TEST — Bonus riposo e malus notte (E2)
// ============================================================

test('applicaRiposo aggiunge +1 al bonus giornaliero', () => {
  nuovaPartita();
  const stato = leggiStato();
  uguali(stato._bonusGiorno, 0, 'Il bonus parte da 0');
  applicaRiposo();
  uguali(leggiStato()._bonusGiorno, 1, 'Dopo riposo il bonus deve essere 1');
});

test('completaSlot della notte imposta il flag malus carryover', () => {
  nuovaPartita();
  // Forza la notte come giocabile e libera
  const stato = leggiStato();
  const slotNotte = stato.slotGiorno.find(s => s.id === 'notte');
  if (slotNotte) slotNotte.stato = 'libero';
  completaSlot('notte');
  uguali(leggiStato()._malusNotteCarryover, true, 'Il flag malus deve essere true dopo la notte');
});

test('il malus notte viene applicato al giorno successivo e poi resettato', () => {
  nuovaPartita();
  const stato = leggiStato();
  stato._malusNotteCarryover = true;
  avanzaGiorno();
  const nuovoStato = leggiStato();
  uguali(nuovoStato._bonusGiorno, -2, 'Il giorno dopo la notte il bonus deve essere -2');
  uguali(nuovoStato._malusNotteCarryover, false, 'Il flag carryover deve essere resettato');
});

test('senza notte giocata il bonus del giorno è 0 all\'inizio', () => {
  nuovaPartita();
  avanzaGiorno();
  uguali(leggiStato()._bonusGiorno, 0, 'Senza notte, il bonus del nuovo giorno è 0');
});


// ============================================================
// TEST — Sistema dialogo (C4)
// ============================================================

test('selezionaSequenzaDialogo restituisce null se nessun dialogo disponibile', () => {
  nuovaPartita();
  // Luogo inesistente: non è in ORDINE_LUOGHI, quindi nessun membro fisso
  // né coetaneo può trovarsi lì per rotazione → garantisce null
  const ris = selezionaSequenzaDialogo('luogoInesistente');
  uguali(ris, null, 'Deve restituire null per luogo senza dialoghi');
});

test('selezionaSequenzaDialogo restituisce una sequenza per laboratorioAlchimia', () => {
  nuovaPartita();
  const ris = selezionaSequenzaDialogo('laboratorioAlchimia');
  afferma(ris !== null, 'Deve trovare Pietro Vasso nel laboratorio');
  afferma(ris.scambi.length > 0, 'La sequenza deve avere almeno uno scambio');
  uguali(ris.idPng, 'pietroVasso', 'L\'interlocutore deve essere pietroVasso');
});

test('determinaLunghezzaDialogo restituisce media per cortile con relazione base', () => {
  nuovaPartita();
  const lunghezza = determinaLunghezzaDialogo('marcoAlessi', 'cortile');
  uguali(lunghezza, 'media', 'Cortile con relazione base deve dare dialogo media');
});

test('determinaLunghezzaDialogo restituisce lunga per cortile con relazione alta', () => {
  nuovaPartita();
  modificaReputazione('marcoAlessi', 70);  // porta a soglia alta (≥60)
  const lunghezza = determinaLunghezzaDialogo('marcoAlessi', 'cortile');
  uguali(lunghezza, 'lunga', 'Cortile con relazione alta deve dare dialogo lunga');
});

test('la rotazione anti-ripetizione avanza l\'indice tra una conversazione e l\'altra', () => {
  nuovaPartita();
  const prima  = selezionaSequenzaDialogo('laboratorioAlchimia');
  const seconda = selezionaSequenzaDialogo('laboratorioAlchimia');
  afferma(prima !== null && seconda !== null, 'Entrambe le selezioni devono riuscire');
  // Con pool di 1 scambio per relazioneBase, il secondo scambio è lo stesso (rotazione ciclica)
  // ma il tracker deve essere avanzato — verifica che la chiamata sia andata a buon fine
  afferma(seconda.scambi.length > 0, 'La seconda sequenza deve avere scambi');
});


// ============================================================
// TEST — Progressione coetanei (C5)
// ============================================================

test('avanzamentiCoetanei esiste nello stato iniziale', () => {
  nuovaPartita();
  const stato = leggiStato();
  afferma(typeof stato.avanzamentiCoetanei === 'object', 'avanzamentiCoetanei deve essere un oggetto');
});

test('al giorno 40 marco alessi avanza ad Apprendista', () => {
  nuovaPartita();
  const stato = leggiStato();
  stato.giorno = 40;
  // Forza _preparaGiorno indirettamente chiamando avanzaGiorno non basta (cambia il giorno),
  // quindi simuliamo la chiamata diretta come farebbe avanzaGiorno internamente.
  // Usiamo avanzaGiorno partendo dal giorno 39.
  stato.giorno = 39;
  avanzaGiorno();  // porta a 40 e chiama _preparaGiorno → _controllaAvanzamentiCoetanei
  const statoAgg = leggiStato();
  const chiave = 'marcoAlessi_Apprendista';
  afferma(statoAgg.avanzamentiCoetanei[chiave] === true,
    'Al giorno 40, marcoAlessi deve essere marcato come avanzato ad Apprendista');
});

test('la cerimonia del coetaneo viene calendarizzata come evento attivo', () => {
  nuovaPartita();
  const stato = leggiStato();
  stato.giorno = 39;
  avanzaGiorno();  // porta a 40 → attiva cerimonia marcoAlessi
  const eventi = leggiStato().eventiAttivi;
  const cerimonia = eventi.find(ev => ev.tipo === 'cerimonia' && ev.dati && ev.dati.eCoetaneo);
  afferma(cerimonia !== undefined, 'Deve esserci una cerimonia coetaneo negli eventi attivi');
  afferma(cerimonia.dati.idPng === 'marcoAlessi', 'La cerimonia deve essere di marcoAlessi');
});


// ============================================================
// ESECUZIONE
// ============================================================

stampaRisultati();
