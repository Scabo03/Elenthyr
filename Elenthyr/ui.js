'use strict';

// ============================================================
// UI.JS — Elenthyr
// Gestione dell'interfaccia, transizioni tra schermate,
// rendering del testo. Nessuna logica di gioco.
//
// Legge lo stato tramite le funzioni pubbliche di game-engine.js.
// Scrive solo tramite le API di game-engine.js — mai direttamente.
// ============================================================


// ------------------------------------------------------------
// POLYFILL — replaceChildren()
// Non supportato prima di Safari 14.
// Deve stare in cima al file, prima di qualsiasi altro codice.
// ------------------------------------------------------------
if (!Element.prototype.replaceChildren) {
  Element.prototype.replaceChildren = function (...nuoviNodi) {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    nuoviNodi.forEach(nodo => {
      if (typeof nodo === 'string') {
        this.appendChild(document.createTextNode(nodo));
      } else {
        this.appendChild(nodo);
      }
    });
  };
}


// ------------------------------------------------------------
// RIFERIMENTI AGLI ELEMENTI DOM FISSI
// Tutti gli elementi presenti in index.html e mai ricreati.
// ------------------------------------------------------------
const dom = {
  fasciaSuperiore:         document.getElementById('fascia-superiore'),
  indicatoreTemporale:     document.getElementById('indicatore-temporale'),
  testoTemporale:          document.getElementById('testo-temporale'),
  pulsanteImpostazioni:    document.getElementById('pulsante-impostazioni'),
  fasciaCalendario:        document.getElementById('fascia-calendario'),
  contenutoPrincipale:     document.getElementById('contenuto-principale'),
  schermataImpostazioni:   document.getElementById('schermata-impostazioni'),
  pannelloSovrapposto:     document.getElementById('pannello-sovrapposto'),
  pannelloOk:              document.getElementById('pannello-ok'),
  pannelloContenuto:       document.getElementById('pannello-contenuto'),
  annunciVoiceover:        document.getElementById('annunci-voiceover'),
  volumeMusica:            document.getElementById('volume-musica'),
  volumeAmbientale:        document.getElementById('volume-ambientale'),
  volumeVoci:              document.getElementById('volume-voci'),
  pulsanteEsporta:         document.getElementById('pulsante-esporta-salvataggio'),
  pulsanteImporta:         document.getElementById('pulsante-importa-salvataggio'),
  inputImporta:            document.getElementById('input-importa-salvataggio'),
  zonaConfermaImport:      document.getElementById('zona-conferma-import'),
  pulsanteConfermaImport:  document.getElementById('pulsante-conferma-import'),
  pulsanteAnnullaImport:   document.getElementById('pulsante-annulla-import'),
  pulsanteChiudiImpost:    document.getElementById('pulsante-chiudi-impostazioni')
};


// ------------------------------------------------------------
// ANNUNCI VOICEOVER
// Usato per comunicare aggiornamenti dinamici a VoiceOver
// senza spostare il focus visivo.
// ------------------------------------------------------------
function annunciaVoiceover(testo) {
  if (!dom.annunciVoiceover) return;
  // Svuota prima di riempire per forzare la rilettura
  dom.annunciVoiceover.textContent = '';
  // Piccolo ritardo per garantire che il reset sia rilevato
  requestAnimationFrame(() => {
    dom.annunciVoiceover.textContent = testo;
  });
}


// ------------------------------------------------------------
// AGGIORNAMENTO INDICATORE TEMPORALE
// ------------------------------------------------------------
function aggiornaIndicatoreTemporale() {
  const testo = testoIndicatoreTemporale();
  if (!dom.testoTemporale) return;

  dom.testoTemporale.textContent = testo;

  // Aggiorna aria-label del gruppo con testo esteso per VoiceOver
  if (dom.indicatoreTemporale) {
    const statoGioco  = leggiStato();
    const stagione    = statoGioco ? STAGIONI[statoGioco.stagione].nome : '';
    const giorno      = statoGioco ? statoGioco.giorno : 1;
    const semestre    = statoGioco && !statoGioco.fasePostAccademica
      ? `, Semestre ${statoGioco.semestre}`
      : '';
    dom.indicatoreTemporale.setAttribute(
      'aria-label',
      `Periodo attuale: ${stagione}, Giorno ${giorno}${semestre}`
    );
  }
}


// ------------------------------------------------------------
// FASCIA CALENDARIO
// Mostra il giorno corrente e i 3 successivi.
// ------------------------------------------------------------
function aggiornaCalendario() {
  if (!dom.fasciaCalendario) return;

  const stato = leggiStato();
  if (!stato) return;

  const boxGiorni = [];

  for (let delta = 0; delta < 4; delta++) {
    const giornoNum    = stato.giorno + delta;
    const eCorrente    = delta === 0;

    const box = document.createElement('div');
    box.className = eCorrente ? 'box-giorno giorno-corrente' : 'box-giorno';
    box.setAttribute('role', 'group');
    box.setAttribute('tabindex', '0');

    // Determina gli impegni del giorno per il sommario
    const sommarioBreve = delta === 0
      ? _sommarioSlotOggi()
      : _sommarioGiornoFuturo(giornoNum);

    // Label esteso per VoiceOver
    const labelVoiceover = eCorrente
      ? `Oggi, Giorno ${giornoNum}: ${sommarioBreve || 'nessun impegno programmato'}`
      : `Giorno ${giornoNum}: ${sommarioBreve || 'nessun impegno programmato'}`;

    box.setAttribute('aria-label', labelVoiceover);

    const elNumero = document.createElement('div');
    elNumero.className    = 'box-giorno-numero';
    elNumero.textContent  = `Giorno ${giornoNum}`;
    elNumero.setAttribute('aria-hidden', 'true');

    const elImpegni = document.createElement('div');
    elImpegni.className   = 'box-giorno-impegni';
    elImpegni.textContent = sommarioBreve || '—';
    elImpegni.setAttribute('aria-hidden', 'true');

    box.appendChild(elNumero);
    box.appendChild(elImpegni);
    boxGiorni.push(box);
  }

  // Sezione eventi narrativi attivi (escluse le cerimonie, già visibili negli slot)
  const eventiNarrativi = (stato.eventiAttivi || []).filter(ev => ev.tipo !== 'cerimonia');
  const elementi = [...boxGiorni];

  if (eventiNarrativi.length > 0) {
    const contenitoreEventi = document.createElement('div');
    contenitoreEventi.className = 'eventi-attivi';
    contenitoreEventi.setAttribute('role', 'group');
    contenitoreEventi.setAttribute('aria-label', 'Eventi in corso nell\'accademia');

    eventiNarrativi.forEach(ev => {
      const elEvento = document.createElement('div');
      elEvento.className = 'evento-attivo';
      elEvento.setAttribute('role', 'status');
      elEvento.setAttribute('aria-label', ev.descrizione);
      elEvento.textContent = ev.descrizione;
      contenitoreEventi.appendChild(elEvento);
    });

    elementi.push(contenitoreEventi);
  }

  dom.fasciaCalendario.replaceChildren(...elementi);

  // Aggiorna il margin-top del contenuto principale per compensare l'altezza variabile
  // della fascia calendario (cresce quando ci sono eventi attivi).
  requestAnimationFrame(() => {
    if (!dom.contenutoPrincipale || !dom.fasciaCalendario) return;
    const altezzaFasciaSup = dom.fasciaSuperiore
      ? dom.fasciaSuperiore.getBoundingClientRect().height
      : 0;
    const altezzaFasciaCal = dom.fasciaCalendario.getBoundingClientRect().height;
    dom.contenutoPrincipale.style.marginTop = `${altezzaFasciaSup + altezzaFasciaCal}px`;
  });
}

// Costruisce un sommario testuale degli slot di oggi
function _sommarioSlotOggi() {
  const slots = leggiSlotGiorno();
  const obbligatori = slots
    .filter(s => s.stato === 'obbligatorio')
    .map(s => s.tipoEvento || s.nome);

  if (obbligatori.length === 0) return 'giorno libero';
  return obbligatori.join(', ');
}

// Sommario approssimativo per i giorni futuri (da eventi attivi)
function _sommarioGiornoFuturo(giornoNum) {
  const eventi = leggiEventiAttivi();
  const cerimonieGiorno = eventi.filter(
    ev => ev.tipo === 'cerimonia' && ev.dati && ev.dati.giornoCalendarizzato === giornoNum
  );
  if (cerimonieGiorno.length > 0) return 'cerimonia';
  return '';
}


// ------------------------------------------------------------
// RENDERING SCHERMATA PRINCIPALE DEL GIORNO
// Slot giornalieri in ordine cronologico.
// ------------------------------------------------------------
function renderizzaSchermataGiorno() {
  if (!dom.contenutoPrincipale) return;

  // Aggiorna il colore tematico del documento (schermata giorno = neutro)
  _impostaColoreLuogo(null);

  const slots = leggiSlotGiorno();
  const contenitore = document.createElement('div');
  contenitore.className = 'schermata-giorno';

  slots.forEach(slot => {
    const elSlot = _creaElementoSlot(slot);
    contenitore.appendChild(elSlot);
  });

  dom.contenutoPrincipale.replaceChildren(contenitore);
  dom.contenutoPrincipale.classList.add('dissolvenza-entrata');

  // Rimuove la classe di animazione dopo che è terminata
  dom.contenutoPrincipale.addEventListener('animationend', () => {
    dom.contenutoPrincipale.classList.remove('dissolvenza-entrata');
  }, { once: true });

  // Focus management: porta il focus al primo slot interattivo.
  // Necessario per VoiceOver quando la schermata è raggiunta
  // tramite transizione automatica (fine giornata, avanzamento giorno).
  const primoPulsante = contenitore.querySelector('.pulsante-slot');
  if (primoPulsante) primoPulsante.focus();
}

// Crea l'elemento DOM per un singolo slot giornaliero
function _creaElementoSlot(slot) {
  const elSlot = document.createElement('div');

  const classiSlot = ['slot-giornaliero'];
  if (slot.stato === 'obbligatorio') classiSlot.push('slot-obbligatorio');
  if (slot.stato === 'completato')   classiSlot.push('slot-completato');
  elSlot.className = classiSlot.join(' ');

  // Intestazione dello slot
  const intestazione = document.createElement('div');
  intestazione.className = 'slot-giornaliero-intestazione';

  const elNome = document.createElement('div');
  elNome.className   = 'slot-nome';
  elNome.textContent = slot.nome;
  intestazione.appendChild(elNome);
  elSlot.appendChild(intestazione);

  // Contenuto e pulsante in base allo stato
  if (slot.stato === 'obbligatorio') {
    const elContenuto = document.createElement('div');
    elContenuto.className = 'slot-contenuto';
    elContenuto.textContent = _nomeTipoEvento(slot.tipoEvento);
    elSlot.appendChild(elContenuto);

    const pulsante = document.createElement('button');
    pulsante.className = 'pulsante-slot';
    pulsante.type = 'button';
    pulsante.textContent = 'Partecipa';
    pulsante.setAttribute('aria-label', `${slot.nome}: partecipa a ${_nomeTipoEvento(slot.tipoEvento)}`);
    pulsante.addEventListener('click', () => _gestisciClickSlotObbligatorio(slot));
    elSlot.appendChild(pulsante);

  } else if (slot.stato === 'libero') {
    const pulsante = document.createElement('button');
    pulsante.className = 'pulsante-slot';
    pulsante.type = 'button';
    pulsante.textContent = 'Tempo libero';
    pulsante.setAttribute('aria-label', `${slot.nome}: scegli un'attività per il tempo libero`);
    pulsante.addEventListener('click', () => _gestisciClickSlotLibero(slot));
    elSlot.appendChild(pulsante);

  } else if (slot.stato === 'saltato') {
    // Notte automaticamente saltata — nessun pulsante, testo variante per giorno
    const statoNotte  = leggiStato();
    const indiceNotte = statoNotte ? statoNotte.giorno % TESTI_NOTTE_SALTATA.length : 0;
    const testoNotte  = TESTI_NOTTE_SALTATA[indiceNotte];
    const elContenuto = document.createElement('div');
    elContenuto.className = 'slot-contenuto';
    elContenuto.textContent = testoNotte;
    elContenuto.setAttribute('aria-label', `${slot.nome}: ${testoNotte}`);
    elSlot.appendChild(elContenuto);
  }

  // Imposta aria-label sul gruppo slot
  elSlot.setAttribute('role', 'group');
  elSlot.setAttribute('aria-label', `Slot ${slot.nome}`);

  return elSlot;
}

// Restituisce il nome leggibile di un tipo di evento
function _nomeTipoEvento(tipo) {
  const nomi = {
    lezione:  'Lezione',
    esame:    'Esame',
    cerimonia: 'Cerimonia'
  };
  return nomi[tipo] || tipo || '';
}


// ------------------------------------------------------------
// SCHERMATA SCELTA TIPO ATTIVITÀ (tempo libero)
// ------------------------------------------------------------
function renderizzaSceltaAttivita(slotCorrente) {
  if (!dom.contenutoPrincipale) return;

  const contenitore = document.createElement('div');
  contenitore.className = 'schermata-attivita';

  const titolo = document.createElement('h2');
  titolo.textContent = slotCorrente.nome || 'Tempo libero';
  contenitore.appendChild(titolo);

  const griglia = document.createElement('div');
  griglia.className = 'griglia-attivita';

  Object.values(TIPI_ATTIVITA).forEach(attivita => {
    const pulsante = document.createElement('button');
    pulsante.className = 'pulsante-attivita';
    pulsante.type = 'button';
    pulsante.setAttribute('aria-label', `${attivita.nome}: ${attivita.descrizione}`);

    const elNome = document.createElement('div');
    elNome.className   = 'attivita-nome';
    elNome.textContent = attivita.nome;
    elNome.setAttribute('aria-hidden', 'true');

    const elDescrizione = document.createElement('div');
    elDescrizione.className   = 'attivita-descrizione';
    elDescrizione.textContent = attivita.descrizione;
    elDescrizione.setAttribute('aria-hidden', 'true');

    pulsante.appendChild(elNome);
    pulsante.appendChild(elDescrizione);

    pulsante.addEventListener('click', () => {
      Audio.riprendi();
      Audio.conferma();
      _gestisciSceltaAttivita(attivita.id, slotCorrente);
    });

    griglia.appendChild(pulsante);
  });

  // Nessun pulsante indietro — il GDD specifica che il back
  // esiste solo nella schermata di scelta luogo, non qui.
  contenitore.appendChild(griglia);
  dom.contenutoPrincipale.replaceChildren(contenitore);

  // Porta il focus al titolo
  titolo.setAttribute('tabindex', '-1');
  titolo.focus();
}


// ------------------------------------------------------------
// SCHERMATA SCELTA LUOGO
// ------------------------------------------------------------
function renderizzaSceltaLuogo(slotCorrente) {
  if (!dom.contenutoPrincipale) return;

  const contenitore = document.createElement('div');
  contenitore.className = 'schermata-luoghi';

  const titolo = document.createElement('h2');
  titolo.textContent = 'Dove vuoi andare?';
  contenitore.appendChild(titolo);

  ORDINE_LUOGHI.forEach(idLuogo => {
    const luogo = LUOGHI[idLuogo];
    if (!luogo) return;

    const accessibile = luogoAccessibile(idLuogo);

    const boxLuogo = document.createElement('button');
    boxLuogo.className = `box-luogo${accessibile ? '' : ' bloccato'}`;
    boxLuogo.type = 'button';
    boxLuogo.setAttribute('data-colore', luogo.colore);

    // Label VoiceOver: include il requisito mancante se bloccato
    let labelVoiceover = `${luogo.nome}: ${luogo.sommario}`;
    if (!accessibile) {
      const req = luogo.gradoMinimo ? `Richiede ${luogo.gradoMinimo}` : 'Non accessibile';
      labelVoiceover += `. ${req}`;
      boxLuogo.setAttribute('aria-disabled', 'true');
    }
    boxLuogo.setAttribute('aria-label', labelVoiceover);

    const elNome = document.createElement('div');
    elNome.className   = 'luogo-nome';
    elNome.textContent = luogo.nome;
    elNome.setAttribute('aria-hidden', 'true');

    const elSommario = document.createElement('div');
    elSommario.className   = 'luogo-sommario';
    elSommario.textContent = luogo.sommario;
    elSommario.setAttribute('aria-hidden', 'true');

    boxLuogo.appendChild(elNome);
    boxLuogo.appendChild(elSommario);

    if (!accessibile && luogo.gradoMinimo) {
      const elRequisito = document.createElement('div');
      elRequisito.className   = 'luogo-requisito';
      elRequisito.textContent = `Richiede: ${luogo.gradoMinimo}`;
      elRequisito.setAttribute('aria-hidden', 'true');
      boxLuogo.appendChild(elRequisito);
    }

    if (accessibile) {
      boxLuogo.addEventListener('click', () => {
        Audio.riprendi();
        Audio.avanza();
        renderizzaSchermataLuogo(idLuogo, slotCorrente);
      });
    }

    contenitore.appendChild(boxLuogo);
  });

  // Pulsante indietro — disponibile in questa schermata
  const pulsanteIndietro = document.createElement('button');
  pulsanteIndietro.className = 'pulsante-avanza';
  pulsanteIndietro.type = 'button';
  pulsanteIndietro.textContent = '← Indietro';
  pulsanteIndietro.setAttribute('aria-label', 'Torna alla scelta del tipo di attività');
  pulsanteIndietro.addEventListener('click', () => {
    renderizzaSceltaAttivita(slotCorrente);
  });

  contenitore.appendChild(pulsanteIndietro);
  dom.contenutoPrincipale.replaceChildren(contenitore);

  // Porta il focus al titolo
  titolo.setAttribute('tabindex', '-1');
  titolo.focus();
}


// ------------------------------------------------------------
// SCHERMATA DEL LUOGO
// ------------------------------------------------------------
function renderizzaSchermataLuogo(idLuogo, slotCorrente) {
  if (!dom.contenutoPrincipale) return;

  const luogo     = LUOGHI[idLuogo];
  if (!luogo) {
    console.warn('[UI] Luogo non trovato:', idLuogo);
    return;
  }
  const primaVis  = primaVisitaLuogo(idLuogo);

  // Segna come visitato
  segnaLuogoVisitato(idLuogo);

  // Imposta il colore tematico del luogo
  _impostaColoreLuogo(luogo.colore);

  // Avvia audio ambientale e suono di ingresso
  Audio.riprendi();
  Audio.ingresso();
  Audio.avviaAmbientale(idLuogo);

  const contenitore = document.createElement('div');
  contenitore.className = 'schermata-luogo';

  // Intestazione luogo
  const intestazione = document.createElement('div');
  intestazione.className = 'luogo-intestazione';

  const titolo = document.createElement('h2');
  titolo.textContent = luogo.nome;
  titolo.setAttribute('tabindex', '-1');
  intestazione.appendChild(titolo);
  contenitore.appendChild(intestazione);

  // Descrizione testuale
  const descrizioni = DESCRIZIONI_LUOGHI[idLuogo];
  if (descrizioni) {
    const testoDescrizione = primaVis ? descrizioni.primaVisita : descrizioni.visitaSuccessiva;
    const elDescrizione = document.createElement('div');
    elDescrizione.className = 'luogo-descrizione';
    elDescrizione.textContent = testoDescrizione;
    contenitore.appendChild(elDescrizione);
  }

  // Lista attività disponibili
  const listaAttivita = document.createElement('div');
  listaAttivita.className = 'lista-attivita-luogo';
  listaAttivita.setAttribute('role', 'group');
  listaAttivita.setAttribute('aria-label', `Attività disponibili in ${luogo.nome}`);

  luogo.attivitaDisponibili.forEach(idAttivita => {
    const pulsante = _creaPulsanteAttivitaLuogo(idAttivita, idLuogo, slotCorrente);
    listaAttivita.appendChild(pulsante);
  });

  contenitore.appendChild(listaAttivita);
  dom.contenutoPrincipale.replaceChildren(contenitore);

  // Focus al titolo del luogo
  titolo.focus();
}

// Etichette pulsante per le attività nei luoghi (imperative, visive e per aria-label).
// Costante a livello file — non cambia tra una chiamata e l'altra.
const _NOMI_ATTIVITA = {
  studio:              'Studia',
  ricercaTesti:        'Cerca un testo',
  dialogo:             'Avvicina qualcuno',
  praticaAlchemica:    'Pratica alchemica',
  praticaIncantamento: 'Pratica di incantamento',
  praticaRituale:      'Pratica rituale',
  creazioneOggetti:    'Crea un oggetto',
  socialita:           'Socializza',
  incontro:            'Cerca un incontro',
  lezione:             'Partecipa alla lezione',
  esame:               'Sostieni l\'esame',
  cerimonia:           'Partecipa alla cerimonia',
  ricercaAvanzata:     'Ricerca avanzata',
  osservazione:        'Osserva',
  ricercaRara:         'Consulta testi rari',
  minigioco:           'Esercitazione guidata',
  test:                'Apri pannello di test',
  ricercaStoria:       'Ricerca storica',
  ricercaFilosofia:    'Ricerca filosofica',
  ricercaScienze:      'Ricerca scientifica',
  ricercaLetteratura:  'Ricerca letteraria',
  sblocaggioReagente:  'Sbloccaggio reagente',
  dissolvenza:         'Dissolvenza'
};

// Crea il pulsante per una singola attività in un luogo
function _creaPulsanteAttivitaLuogo(idAttivita, idLuogo, slotCorrente) {
  const pulsante = document.createElement('button');
  pulsante.type = 'button';

  const nomeAttivita = _NOMI_ATTIVITA[idAttivita] || idAttivita;
  pulsante.textContent = nomeAttivita;
  pulsante.className = 'pulsante-attivita-luogo';
  pulsante.setAttribute('aria-label', nomeAttivita);

  pulsante.addEventListener('click', () => {
    Audio.riprendi();
    Audio.conferma();
    _gestisciAttivitaLuogo(idAttivita, idLuogo, slotCorrente);
  });

  return pulsante;
}


// ------------------------------------------------------------
// HELPER DOM — VoiceOver overlay
// Usati da mostraPannello e apriImpostazioni/chiudiImpostazioni.
// Nasconde/ripristina il contenuto sottostante quando un dialog è aperto.
// ------------------------------------------------------------
function _nascondiSottofondoAVoiceOver() {
  dom.contenutoPrincipale.setAttribute('aria-hidden', 'true');
  dom.contenutoPrincipale.setAttribute('inert', '');
  dom.fasciaCalendario.setAttribute('aria-hidden', 'true');
  dom.fasciaCalendario.setAttribute('inert', '');
  dom.fasciaSuperiore.setAttribute('aria-hidden', 'true');
  dom.fasciaSuperiore.setAttribute('inert', '');
}

function _mostraSottofondoAVoiceOver() {
  dom.contenutoPrincipale.removeAttribute('aria-hidden');
  dom.contenutoPrincipale.removeAttribute('inert');
  dom.fasciaCalendario.removeAttribute('aria-hidden');
  dom.fasciaCalendario.removeAttribute('inert');
  dom.fasciaSuperiore.removeAttribute('aria-hidden');
  dom.fasciaSuperiore.removeAttribute('inert');
}


// ------------------------------------------------------------
// PANNELLO SOVRAPPOSTO
// Notifiche del narratore, avvisi di sistema.
// Il pulsante Ok è già primo nel DOM in index.html.
// ------------------------------------------------------------
function mostraPannello(testo, callbackChiusura) {
  if (!dom.pannelloSovrapposto || !dom.pannelloContenuto) return;

  dom.pannelloContenuto.textContent = testo;
  dom.pannelloSovrapposto.classList.remove('nascosto');

  // Rende tutto il contenuto sottostante inerte e invisibile a VoiceOver,
  // inclusa la fascia superiore (pulsante impostazioni deve essere irraggiungibile).
  _nascondiSottofondoAVoiceOver();

  // Focus al pulsante Ok (primo nel DOM del pannello)
  dom.pannelloOk.focus();

  // Gestore chiusura
  const chiudi = () => {
    dom.pannelloSovrapposto.classList.add('nascosto');
    _mostraSottofondoAVoiceOver();
    if (callbackChiusura) callbackChiusura();
  };

  dom.pannelloOk.addEventListener('click', chiudi, { once: true });
}


// ------------------------------------------------------------
// IMPOSTAZIONI
// ------------------------------------------------------------
function apriImpostazioni() {
  dom.schermataImpostazioni.classList.remove('nascosto');

  // Imposta i valori correnti degli slider
  dom.volumeMusica.value     = Math.round(Audio.leggiVolume('musica') * 100);
  dom.volumeAmbientale.value = Math.round(Audio.leggiVolume('ambientale') * 100);
  dom.volumeVoci.value       = Math.round(Audio.leggiVolume('voci') * 100);

  _aggiornaLabelSlider(dom.volumeMusica,     'musica');
  _aggiornaLabelSlider(dom.volumeAmbientale, 'ambientale');
  _aggiornaLabelSlider(dom.volumeVoci,       'voci');

  // Nasconde il contenuto sottostante a VoiceOver, incluse fascia calendario
  // e fascia superiore — il dialog deve essere l'unica area navigabile.
  _nascondiSottofondoAVoiceOver();

  dom.pulsanteChiudiImpost.focus();
}

function chiudiImpostazioni() {
  dom.schermataImpostazioni.classList.add('nascosto');
  _mostraSottofondoAVoiceOver();
  dom.pulsanteImpostazioni.focus();
}

// Aggiorna aria-label dello slider con il valore corrente
function _aggiornaLabelSlider(slider, nomeCanale) {
  const valore = slider.value;
  const nomi = { musica: 'musica', ambientale: 'audio ambientale', voci: 'voci' };
  slider.setAttribute('aria-label', `Volume ${nomi[nomeCanale]}: ${valore}%`);
  slider.setAttribute('aria-valuenow', valore);
}


// ------------------------------------------------------------
// COLORE TEMATICO DEL LUOGO CORRENTE
// Imposta la variabile CSS --colore-luogo-corrente sul document.
// ------------------------------------------------------------
function _impostaColoreLuogo(chiaveColore) {
  const variabiliColore = {
    'aule':         'var(--colore-aule)',
    'biblioteca':   'var(--colore-biblioteca)',
    'alchimia':     'var(--colore-alchimia)',
    'incantamento': 'var(--colore-incantamento)',
    'sala-rituale': 'var(--colore-sala-rituale)',
    'cortile':      'var(--colore-cortile)',
    'torre':        'var(--colore-torre)',
    'archivio':     'var(--colore-archivio)',
    'scavi':        'var(--colore-scavi)'
  };

  const colore = chiaveColore ? (variabiliColore[chiaveColore] || 'var(--colore-accento)') : 'var(--colore-accento)';
  document.documentElement.style.setProperty('--colore-luogo-corrente', colore);
}


// ------------------------------------------------------------
// COSTANTI GESTORI
// Attività che aprono un minigioco specifico e la disciplina associata.
// ------------------------------------------------------------
const _ATTIVITA_CON_MINIGIOCO = {
  praticaAlchemica:    'minesweeperReagenti',
  praticaIncantamento: 'memoryRune',
  praticaRituale:      'labirintoEquilibrio',
  sblocaggioReagente:  'sblocaggioReagente',
  dissolvenza:         'dissolvenza'
};

const _DISCIPLINA_DA_ATTIVITA_MINIGIOCO = {
  praticaAlchemica:    'alchimia',
  praticaIncantamento: 'incantamento',
  praticaRituale:      'rituali',
  sblocaggioReagente:  'alchimia',
  dissolvenza:         'incantamento'
};

// Callback standard per la fine di un evento obbligatorio (lezione, esame, cerimonia).
// Non ferma l'audio ambientale: gli eventi obbligatori non hanno un luogo attivo.
function _concludiEventoObbligatorio() {
  aggiornaCalendario();
  aggiornaIndicatoreTemporale();
  _verificaFineGiornata();
}

// Callback standard per la fine di un'attività in un luogo.
// Ferma l'audio ambientale e reimposta il colore tema prima di tornare alla giornata.
function _concludiUscitaDaLuogo() {
  Audio.fermaAmbientale();
  _impostaColoreLuogo(null);
  aggiornaCalendario();
  aggiornaIndicatoreTemporale();
  _verificaFineGiornata();
}


// ------------------------------------------------------------
// GESTORI DELLE INTERAZIONI
// Chiamati dai listener degli elementi UI.
// ------------------------------------------------------------
// Gestisce la cerimonia di ascensione di un coetaneo.
function _gestisciCerimoniaCoetaneo(slot, evento, statoCorrente) {
  const nomePng = evento.dati.idPng
    ? (Object.values(PERSONAGGI).find(p => p.id === evento.dati.idPng) || {}).nome || evento.dati.idPng
    : 'Un tuo pari';
  const testiCerimonia = TESTI_CERIMONIE_COETANEI || TESTI_EVENTI_OBBLIGATORI.cerimonia;
  const indice = statoCorrente ? statoCorrente.giorno % testiCerimonia.length : 0;
  const testo  = testiCerimonia[indice].replace('{nome}', nomePng).replace('{grado}', evento.dati.grado || '');
  completaSlot(slot.id);
  _mostraTestoNarrativo(testo, _concludiEventoObbligatorio);
}

// Gestisce la cerimonia di ascensione del protagonista.
function _gestisciCerimoniaProtagonista(slot, evento) {
  completaSlot(slot.id);
  Audio.cerimonia();
  _mostraCerimoniaProtagonista(evento.dati, _concludiEventoObbligatorio);
}

// Gestisce lezioni ed esami: lancia il minigioco della disciplina o usa il testo standard.
function _gestisciLezioneEsame(slot, tipoEvento, statoCorrente) {
  const idDisciplina = slot.idEvento;
  const disciplina   = idDisciplina ? DISCIPLINE[idDisciplina] : null;
  const idMinigioco  = disciplina ? disciplina.minigioco : null;
  const idDocente    = disciplina ? disciplina.docente : null;

  if (idMinigioco) {
    // Le lezioni sono in modalità tutorial: reset tentativi per garantire
    // il risultato ottimale al primo successo, senza penalità per i tentativi precedenti.
    if (tipoEvento === 'lezione') {
      Minigiochi.resetTentativi(idMinigioco);
      Audio.riproduciVoiceline(idDocente, 'inizio_lezione');
    }
    completaSlot(slot.id);
    dom.contenutoPrincipale.replaceChildren();
    Minigiochi.avvia(idMinigioco, dom.contenutoPrincipale, () => {
      if (tipoEvento === 'lezione') {
        Audio.riproduciVoiceline(idDocente, 'fine_lezione');
      }
      const testiEvento = TESTI_EVENTI_OBBLIGATORI[tipoEvento] || TESTI_EVENTI_OBBLIGATORI.lezione;
      const indice = statoCorrente ? statoCorrente.giorno % testiEvento.length : 0;
      _mostraTestoNarrativo(testiEvento[indice], _concludiEventoObbligatorio);
    }, idDisciplina);
    return;
  }

  // Fallback — disciplina senza minigioco associato, usa testo standard
  const testiEvento = TESTI_EVENTI_OBBLIGATORI[tipoEvento] || TESTI_EVENTI_OBBLIGATORI.lezione;
  const indice = statoCorrente ? statoCorrente.giorno % testiEvento.length : 0;
  const testo  = testiEvento[indice];

  if (tipoEvento === 'lezione') {
    Audio.riproduciVoiceline(idDocente, 'inizio_lezione');
  }
  completaSlot(slot.id);

  _mostraTestoNarrativo(testo, () => {
    if (tipoEvento === 'lezione') {
      Audio.riproduciVoiceline(idDocente, 'fine_lezione');
    }
    _concludiEventoObbligatorio();
  });
}

function _gestisciClickSlotObbligatorio(slot) {
  Audio.riprendi();
  Audio.avanza();

  const tipoEvento    = slot.tipoEvento || 'lezione';
  const statoCorrente = leggiStato();
  annunciaVoiceover(`Inizio ${_nomeTipoEvento(tipoEvento)}`);

  if (tipoEvento === 'cerimonia' && slot.idEvento) {
    const evento = leggiEventiAttivi().find(ev => ev.id === slot.idEvento);
    if (evento && evento.dati) {
      if (evento.dati.eCoetaneo) {
        _gestisciCerimoniaCoetaneo(slot, evento, statoCorrente);
      } else {
        _gestisciCerimoniaProtagonista(slot, evento);
      }
      return;
    }
  }

  _gestisciLezioneEsame(slot, tipoEvento, statoCorrente);
}

function _gestisciClickSlotLibero(slot) {
  Audio.riprendi();
  renderizzaSceltaAttivita(slot);
}

function _gestisciSceltaAttivita(idAttivita, slotCorrente) {
  if (idAttivita === 'ricerca') {
    renderizzaSceltaLuogo(slotCorrente);
  } else {
    // Attività automatiche: Riposo, Socialità, Studio
    _eseguiAttivitaAutomatica(idAttivita, slotCorrente);
  }
}

function _eseguiAttivitaAutomatica(idAttivita, slotCorrente) {
  // Esegue l'effetto nel motore
  switch (idAttivita) {
    case 'riposo':    applicaRiposo();    break;
    case 'socialita': applicaSocialita(); break;
    case 'studio':    applicaStudio();    break;
  }

  // Seleziona un testo narrativo tra le varianti disponibili
  const varianti = TESTI_ATTIVITA[idAttivita];
  if (!varianti || varianti.length === 0) {
    completaSlot(slotCorrente.id);
    renderizzaSchermataGiorno();
    return;
  }

  const statoCorrente = leggiStato();
  const indice = statoCorrente ? statoCorrente.giorno % varianti.length : 0;
  const testo  = varianti[indice];

  // Marca lo slot come completato
  completaSlot(slotCorrente.id);

  // Mostra il testo e poi verifica se la giornata è finita
  _mostraTestoNarrativo(testo, () => {
    aggiornaCalendario();
    _verificaFineGiornata();
  });
}

// Gestisce il dialogo interattivo con un PNG nel luogo.
// Restituisce true se la sequenza esiste ed è stata avviata, false altrimenti.
// Se false, il chiamante degrada all'attività generica.
function _gestisciDialogoLuogo(idLuogo, slotCorrente) {
  const sequenza = selezionaSequenzaDialogo(idLuogo);
  if (!sequenza) return false;

  applicaAttivitaLuogo('dialogo', idLuogo);
  completaSlot(slotCorrente.id);
  annunciaVoiceover('Conversazione in corso.');
  _eseguiSequenzaDialogo(sequenza.idPng, sequenza.scambi, 0, _concludiUscitaDaLuogo);
  return true;
}

// Gestisce l'attività che integra un minigioco.
// NB: MastermindFormule (Teoria Arcana) è accessibile ESCLUSIVAMENTE
// via lezioni/esami — non come attività libera — e non appare qui.
function _gestisciMinigiocoLuogo(idAttivita, idLuogo, slotCorrente) {
  const idMinigiocoAttivita = _ATTIVITA_CON_MINIGIOCO[idAttivita];
  const idDisciplina        = _DISCIPLINA_DA_ATTIVITA_MINIGIOCO[idAttivita] || null;
  const puntiAggiunti       = applicaAttivitaLuogo(idAttivita, idLuogo);
  completaSlot(slotCorrente.id);
  annunciaVoiceover(`${_nomeTipoAttivita(idAttivita)} in corso.`);
  dom.contenutoPrincipale.replaceChildren();

  Minigiochi.avvia(idMinigiocoAttivita, dom.contenutoPrincipale, (esito) => {
    const fallito = esito === 'fallito';

    let fasciaFallimento = null;
    if (idDisciplina) {
      if (fallito) {
        fasciaFallimento = gestisciFallimentoMinigioco(idDisciplina);
        // Per fascia alta: annulla la progressione già applicata
        if (fasciaFallimento === 'alta' && typeof puntiAggiunti === 'number' && puntiAggiunti > 0) {
          rimuoviProgressioneMinigioco(idDisciplina, puntiAggiunti);
        }
      } else {
        gestisciSuccessoMinigioco(idDisciplina);
      }
    }

    // Testo narrativo: fallimento o esito normale
    let testo;
    if (fallito && fasciaFallimento && typeof TESTI_FALLIMENTO_MINIGIOCO !== 'undefined') {
      const chiave = `fascia${fasciaFallimento.charAt(0).toUpperCase()}${fasciaFallimento.slice(1)}`;
      const pool   = TESTI_FALLIMENTO_MINIGIOCO[chiave];
      testo = pool && pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : _testoAttivitaLuogo(idAttivita, idLuogo);
    } else {
      testo = _testoAttivitaLuogo(idAttivita, idLuogo);
    }

    // Commento del docente di laboratorio a esito positivo
    if (!fallito && idLuogo === 'laboratorioAlchimia' && idAttivita === 'praticaAlchemica') {
      Audio.riproduciVoiceline('pietroVasso', 'commento_esperimento');
    }

    _mostraTestoNarrativo(testo, _concludiUscitaDaLuogo);
  });
}

function _gestisciAttivitaLuogo(idAttivita, idLuogo, slotCorrente) {
  // Pannello di test — solo negli Scavi, non completa lo slot
  if (idAttivita === 'test') {
    if (typeof renderizzaSchermataScavi === 'function') {
      renderizzaSchermataScavi(dom.contenutoPrincipale);
    }
    return;
  }

  // Il dialogo usa il sistema interattivo quando esiste una sequenza disponibile.
  // Se nessun PNG con dialogo è disponibile, degrada al testo statico.
  if (idAttivita === 'dialogo' && _gestisciDialogoLuogo(idLuogo, slotCorrente)) return;

  // Attività di pratica che integrano un minigioco
  if (_ATTIVITA_CON_MINIGIOCO[idAttivita]) {
    _gestisciMinigiocoLuogo(idAttivita, idLuogo, slotCorrente);
    return;
  }

  // Attività generica: testo narrativo senza minigioco
  const testo = _testoAttivitaLuogo(idAttivita, idLuogo);
  applicaAttivitaLuogo(idAttivita, idLuogo);
  completaSlot(slotCorrente.id);
  annunciaVoiceover(`${_nomeTipoAttivita(idAttivita)} in corso.`);
  _mostraTestoNarrativo(testo, _concludiUscitaDaLuogo);
}

// Seleziona il testo narrativo appropriato per un'attività in un luogo
function _testoAttivitaLuogo(idAttivita, idLuogo) {
  const testiAttivita = TESTI_ATTIVITA_LUOGO[idAttivita];

  // Il dialogo ha sottochavi per luogo
  if (idAttivita === 'dialogo') {
    return testiAttivita[idLuogo] || testiAttivita._generico;
  }

  // Array di varianti — seleziona in base al giorno per evitare ripetizioni
  if (Array.isArray(testiAttivita) && testiAttivita.length > 0) {
    const statoCorrente = leggiStato();
    const indice = statoCorrente ? statoCorrente.giorno % testiAttivita.length : 0;
    return testiAttivita[indice];
  }

  return TESTI_ATTIVITA_LUOGO._generico;
}

// Restituisce il nome leggibile di un tipo di attività (per VoiceOver)
function _nomeTipoAttivita(idAttivita) {
  const nomi = {
    studio:              'Studio',
    ricercaTesti:        'Ricerca testi',
    dialogo:             'Dialogo',
    praticaAlchemica:    'Pratica alchemica',
    praticaIncantamento: 'Pratica di incantamento',
    praticaRituale:      'Pratica rituale',
    creazioneOggetti:    'Creazione oggetto',
    socialita:           'Socialità',
    incontro:            'Incontro',
    ricercaAvanzata:     'Ricerca avanzata',
    osservazione:        'Osservazione',
    ricercaRara:         'Ricerca rara',
    sblocaggioReagente: 'Sbloccaggio Reagente',
    dissolvenza:        'Dissolvenza',
    ricercaStoria:       'Ricerca storica',
    ricercaFilosofia:    'Ricerca filosofica',
    ricercaScienze:      'Ricerca scientifica',
    ricercaLetteratura:  'Ricerca letteraria'
  };
  return nomi[idAttivita] || idAttivita;
}

// Mostra un box di dialogo interattivo con testo del PNG e scelte di risposta.
// Se scambio.risposte è null (voiceline), mostra solo il testo con pulsante Continua.
// VoiceOver legge prima il testo del PNG (via aria-label del gruppo), poi le opzioni.
function _mostraDialogo(idPng, scambio, onFine) {
  if (!dom.contenutoPrincipale) return;

  const png = Object.values(PERSONAGGI).find(p => p.id === idPng);
  const nomePng = png ? png.nome : idPng;

  const contenitore = document.createElement('div');
  contenitore.className = 'testo-narrativo';

  // Box del testo del PNG — il gruppo comunica il nome del parlante a VoiceOver
  const boxDialogo = document.createElement('div');
  boxDialogo.className = 'box-dialogo-png';
  boxDialogo.setAttribute('role', 'group');
  boxDialogo.setAttribute('aria-label', `${nomePng} dice:`);

  const nomeEl = document.createElement('p');
  nomeEl.className = 'png-nome';
  nomeEl.setAttribute('aria-hidden', 'true');  // già incluso in aria-label del gruppo
  nomeEl.textContent = nomePng;
  boxDialogo.appendChild(nomeEl);

  const testoEl = document.createElement('p');
  testoEl.className = 'png-testo';
  testoEl.textContent = scambio.testo;
  boxDialogo.appendChild(testoEl);

  contenitore.appendChild(boxDialogo);

  if (scambio.risposte && scambio.risposte.length > 0) {
    // Dialogo con scelte: mostra i pulsanti di risposta
    const listaRisposte = document.createElement('div');
    listaRisposte.className = 'lista-risposte';
    listaRisposte.setAttribute('role', 'group');
    listaRisposte.setAttribute('aria-label', 'Scegli come rispondere');

    scambio.risposte.forEach(risposta => {
      const nomeTono = TONI_RISPOSTA[risposta.tono] || risposta.tono;

      const pulsante = document.createElement('button');
      pulsante.className = 'pulsante-risposta';
      pulsante.type = 'button';
      // aria-label include tono e testo completo per VoiceOver
      pulsante.setAttribute('aria-label', `[${nomeTono}] ${risposta.testo}`);

      const spanTono = document.createElement('span');
      spanTono.className = 'risposta-tono';
      spanTono.setAttribute('aria-hidden', 'true');  // già in aria-label
      spanTono.textContent = nomeTono;
      pulsante.appendChild(spanTono);

      const spanTesto = document.createElement('span');
      spanTesto.textContent = risposta.testo;
      pulsante.appendChild(spanTesto);

      pulsante.addEventListener('click', () => {
        Audio.avanza();
        applicaSceltaDialogo(idPng, risposta.tono);
        annunciaVoiceover(`Risposta scelta: ${nomeTono}.`);
        // Se la risposta ha un testo narrativo aggiuntivo (es. il PNG spiega qualcosa),
        // mostralo prima di procedere.
        if (risposta.effetti && risposta.effetti.testoRisposta) {
          _mostraTestoNarrativo(risposta.effetti.testoRisposta, onFine);
        } else {
          if (onFine) onFine();
        }
      });

      listaRisposte.appendChild(pulsante);
    });

    contenitore.appendChild(listaRisposte);
    dom.contenutoPrincipale.replaceChildren(contenitore);

    // Focus al primo pulsante di risposta — raggiungibile immediatamente dopo la lettura del testo
    const primoPulsante = listaRisposte.querySelector('.pulsante-risposta');
    if (primoPulsante) {
      primoPulsante.setAttribute('tabindex', '-1');
      primoPulsante.focus();
    }
  } else {
    // Voiceline senza scelta: pulsante Continua
    const pulsante = document.createElement('button');
    pulsante.className = 'pulsante-avanza';
    pulsante.type = 'button';
    pulsante.textContent = 'Continua';
    pulsante.setAttribute('aria-label', 'Continua');
    pulsante.addEventListener('click', () => {
      Audio.avanza();
      if (onFine) onFine();
    });
    contenitore.appendChild(pulsante);
    dom.contenutoPrincipale.replaceChildren(contenitore);
    pulsante.setAttribute('tabindex', '-1');
    pulsante.focus();
  }
}


// Esegue una sequenza di scambi di dialogo in catena.
// Dopo ogni risposta del giocatore, passa al prossimo scambio.
// Quando tutti gli scambi sono esauriti, chiama onFine.
function _eseguiSequenzaDialogo(idPng, scambi, indiceCorrente, onFine) {
  if (indiceCorrente >= scambi.length) {
    // Fine sequenza: voiceline di chiusura (DM)
    Audio.riproduciVoiceline(idPng, 'chiusura_visita');
    if (onFine) onFine();
    return;
  }

  // Primo scambio: voiceline di apertura ambientale del PNG
  if (indiceCorrente === 0) {
    Audio.riproduciVoiceline(idPng, 'intro_seria');      // BO, LC, SD
    Audio.riproduciVoiceline(idPng, 'apertura_visita');  // DM
  }

  const scambio     = scambi[indiceCorrente];
  const onProssimo  = () => {
    _eseguiSequenzaDialogo(idPng, scambi, indiceCorrente + 1, onFine);
  };

  _mostraDialogo(idPng, scambio, onProssimo);
}


// Mostra la cerimonia di ascensione del protagonista in due schermate:
// 1. Testo scenico (da TESTI_EVENTI_OBBLIGATORI.cerimonia)
// 2. Monologo del docente competente (da MONOLOGHI_CERIMONIALI)
//    Se non esiste il monologo specifico, rimane solo il testo scenico.
//
// datiEvento: { ramo, grado, idDisciplina } dall'evento attivo
function _mostraCerimoniaProtagonista(datiEvento, onFine) {
  const statoCorrente = leggiStato();
  const grado = datiEvento.grado || '';

  // Normalizza il grado in chiave per MONOLOGHI_CERIMONIALI
  // es. 'Alto Maestro' → 'altoMaestro', 'Magister' → 'magister'
  function _normalizzaChiaveGrado(g) {
    const mappa = {
      'Apprendista':  'apprendista',
      'Esperto':      'esperto',
      'Adepto':       'adepto',
      'Magister':     'magister',
      'Alto Maestro': 'altoMaestro',
      'Arcimago':     'arcimago',
      'Copista':      'copista',
      'Erudito':      'erudito',
      'Archivista':   'archivista',
      'Custode':      'custode'
    };
    return mappa[g] || g.toLowerCase().replace(/\s+/g, '');
  }

  // Determina chi presiede la cerimonia:
  // gradi alti → Valdric Sonn, altrimenti il docente della disciplina
  function _docentePresidente(datiEvento) {
    if (GRADI_CERIMONIA_ARCIMAGO && GRADI_CERIMONIA_ARCIMAGO.includes(datiEvento.grado)) {
      return 'valdricSonn';
    }
    if (datiEvento.idDisciplina && DISCIPLINE[datiEvento.idDisciplina]) {
      return DISCIPLINE[datiEvento.idDisciplina].docente;
    }
    return null;
  }

  // Testo scenico (schermata 1)
  const testiCerimonia = TESTI_EVENTI_OBBLIGATORI.cerimonia;
  const indiceTesto = statoCorrente ? statoCorrente.giorno % testiCerimonia.length : 0;
  const testoScenico = testiCerimonia[indiceTesto];

  // Monologo docente (schermata 2, se disponibile)
  const idDocente  = _docentePresidente(datiEvento);
  const chiaveGrado = _normalizzaChiaveGrado(grado);
  let monologo = null;

  if (idDocente && MONOLOGHI_CERIMONIALI && MONOLOGHI_CERIMONIALI[idDocente]) {
    const poolGrado = MONOLOGHI_CERIMONIALI[idDocente][chiaveGrado];
    if (poolGrado && poolGrado.length > 0) {
      const indiceMonologo = statoCorrente
        ? statoCorrente.giorno % poolGrado.length
        : 0;
      monologo = poolGrado[indiceMonologo];
    }
  }

  // Annuncio VoiceOver per la cerimonia
  const nomeDocente = idDocente && PERSONAGGI[idDocente]
    ? PERSONAGGI[idDocente].nome
    : 'Il docente';
  annunciaVoiceover(`Cerimonia di ascensione al grado di ${grado}.`);

  // Voiceline di apertura cerimonia (il docente che presiede)
  if (idDocente) {
    Audio.riproduciVoiceline(idDocente, 'apertura_cerimonia');
  }

  if (monologo) {
    // Due schermate: scena → monologo del docente
    _mostraTestoNarrativo(testoScenico, () => {
      if (idDocente) Audio.riproduciVoiceline(idDocente, 'chiusura_cerimonia');
      _mostraMonologoCerimonia(nomeDocente, monologo, onFine);
    });
  } else {
    // Solo testo scenico (nessun monologo disponibile per questo grado/docente)
    _mostraTestoNarrativo(testoScenico, onFine);
  }
}

// Mostra il monologo del docente durante una cerimonia.
// Usa lo stesso stile del dialogo PNG (box con nome del parlante)
// ma senza scelte di risposta — solo il pulsante Continua.
function _mostraMonologoCerimonia(nomeDocente, testoMonologo, onFine) {
  if (!dom.contenutoPrincipale) return;

  const contenitore = document.createElement('div');
  contenitore.className = 'testo-narrativo';

  const boxDocente = document.createElement('div');
  boxDocente.className = 'box-dialogo-png';
  boxDocente.setAttribute('role', 'group');
  boxDocente.setAttribute('aria-label', `${nomeDocente} dice:`);

  const nomeEl = document.createElement('p');
  nomeEl.className = 'png-nome';
  nomeEl.setAttribute('aria-hidden', 'true');
  nomeEl.textContent = nomeDocente;
  boxDocente.appendChild(nomeEl);

  const testoEl = document.createElement('p');
  testoEl.className = 'png-testo';
  testoEl.textContent = testoMonologo;
  boxDocente.appendChild(testoEl);

  contenitore.appendChild(boxDocente);

  const pulsante = document.createElement('button');
  pulsante.className = 'pulsante-avanza';
  pulsante.type = 'button';
  pulsante.textContent = 'Continua';
  pulsante.setAttribute('aria-label', 'Continua');
  pulsante.addEventListener('click', () => {
    Audio.avanza();
    if (onFine) onFine();
  });

  contenitore.appendChild(pulsante);
  dom.contenutoPrincipale.replaceChildren(contenitore);

  pulsante.setAttribute('tabindex', '-1');
  pulsante.focus();
}


// Mostra un testo narrativo con pulsante di avanzamento
function _mostraTestoNarrativo(testo, callback) {
  if (!dom.contenutoPrincipale) return;

  const contenitore = document.createElement('div');
  contenitore.className = 'testo-narrativo';

  const paragrafo = document.createElement('p');
  paragrafo.textContent = testo;
  contenitore.appendChild(paragrafo);

  const pulsante = document.createElement('button');
  pulsante.className = 'pulsante-avanza';
  pulsante.type = 'button';
  pulsante.textContent = 'Continua';
  pulsante.setAttribute('aria-label', 'Continua');
  pulsante.addEventListener('click', () => {
    Audio.avanza();
    if (callback) callback();
  });

  contenitore.appendChild(pulsante);
  dom.contenutoPrincipale.replaceChildren(contenitore);

  // Focus al pulsante Continua, che deve essere raggiungibile immediatamente
  pulsante.setAttribute('tabindex', '-1');
  pulsante.focus();
}


// ------------------------------------------------------------
// CICLO DELLA GIORNATA — verifica fine giornata e avanzamento
// ------------------------------------------------------------

// Verifica se tutti gli slot sono completati o saltati.
// Se sì, avvia automaticamente la transizione al giorno successivo.
// Se no, torna alla schermata principale del giorno.
function _verificaFineGiornata() {
  if (tuttiSlotCompletati()) {
    _avanzaGiornoAutomatico();
  } else {
    renderizzaSchermataGiorno();
    annunciaVoiceover('Attività completata. Scegli il prossimo slot.');
  }
}

// Mostra il testo di fine giornata, avanza il giorno nel motore,
// poi mostra il testo di inizio nuovo giorno.
function _avanzaGiornoAutomatico() {
  const statoCorrente = leggiStato();
  const indice = statoCorrente ? statoCorrente.giorno % TESTI_TRANSIZIONE_GIORNO.fine.length : 0;
  const testoFine = TESTI_TRANSIZIONE_GIORNO.fine[indice];

  _mostraTestoNarrativo(testoFine, () => {
    // Avanza il giorno nel motore
    avanzaGiorno();

    // Aggiorna l'interfaccia per il nuovo giorno
    aggiornaIndicatoreTemporale();
    aggiornaCalendario();

    // Mostra il testo di inizio del nuovo giorno
    const nuovoStato   = leggiStato();
    const indiceInizio = nuovoStato ? nuovoStato.giorno % TESTI_TRANSIZIONE_GIORNO.inizio.length : 0;
    const testoInizio  = TESTI_TRANSIZIONE_GIORNO.inizio[indiceInizio];

    // Suono mattutino per il nuovo giorno
    Audio.nuovoGiorno();

    _mostraTestoNarrativo(testoInizio, () => {
      renderizzaSchermataGiorno();
      annunciaVoiceover(
        `Giorno ${nuovoStato ? nuovoStato.giorno : ''} iniziato. ${_sommarioSlotOggi()}`
      );
    });
  });
}


// ------------------------------------------------------------
// REGISTRAZIONE DEGLI EVENT LISTENER FISSI
// Chiamata una sola volta all'inizializzazione.
// ------------------------------------------------------------
function _registraEventListener() {
  // Pulsante impostazioni
  dom.pulsanteImpostazioni.addEventListener('click', () => {
    Audio.riprendi();
    apriImpostazioni();
  });

  dom.pulsanteChiudiImpost.addEventListener('click', () => {
    chiudiImpostazioni();
  });

  // Slider volume
  dom.volumeMusica.addEventListener('input', () => {
    const valore = dom.volumeMusica.value / 100;
    Audio.impostaVolume('musica', valore);
    _aggiornaLabelSlider(dom.volumeMusica, 'musica');
  });

  dom.volumeAmbientale.addEventListener('input', () => {
    const valore = dom.volumeAmbientale.value / 100;
    Audio.impostaVolume('ambientale', valore);
    _aggiornaLabelSlider(dom.volumeAmbientale, 'ambientale');
  });

  dom.volumeVoci.addEventListener('input', () => {
    const valore = dom.volumeVoci.value / 100;
    Audio.impostaVolume('voci', valore);
    _aggiornaLabelSlider(dom.volumeVoci, 'voci');
  });

  // Esportazione salvataggio
  dom.pulsanteEsporta.addEventListener('click', () => {
    const url = esportaSalvataggio();
    if (!url) return;
    const link = document.createElement('a');
    link.href     = url;
    link.download = `elenthyr_salvataggio_giorno${leggiStato()?.giorno || 1}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    annunciaVoiceover('Salvataggio esportato.');
  });

  // Importazione salvataggio
  dom.pulsanteImporta.addEventListener('click', () => {
    dom.inputImporta.click();
  });

  dom.inputImporta.addEventListener('change', () => {
    const file = dom.inputImporta.files[0];
    if (!file) return;
    const lettore = new FileReader();
    lettore.onload = (e) => {
      const testoFile = e.target.result;

      // Valida la struttura prima di mostrare la conferma
      let datiValidi = false;
      try {
        const dati = JSON.parse(testoFile);
        datiValidi = !!(dati.versione && dati.giorno && dati.gradi);
      } catch (_) { /* datiValidi rimane false */ }

      if (!datiValidi) {
        dom.inputImporta.value = '';
        annunciaVoiceover(TESTI_SISTEMA.erroreCaricamento);
        return;
      }

      // Mostra la zona di conferma prima di sovrascrivere
      dom.zonaConfermaImport.classList.remove('nascosto');
      dom.pulsanteConfermaImport.focus();
      annunciaVoiceover('File valido. Premi Conferma per sovrascrivere il salvataggio attuale, o Annulla per tornare indietro.');

      dom.pulsanteConfermaImport.addEventListener('click', () => {
        dom.zonaConfermaImport.classList.add('nascosto');
        dom.inputImporta.value = '';
        const successo = importaSalvataggio(testoFile);
        if (successo) {
          chiudiImpostazioni();
          avviaUI();
          annunciaVoiceover('Salvataggio importato con successo.');
        } else {
          annunciaVoiceover(TESTI_SISTEMA.erroreCaricamento);
        }
      }, { once: true });

      dom.pulsanteAnnullaImport.addEventListener('click', () => {
        dom.zonaConfermaImport.classList.add('nascosto');
        dom.inputImporta.value = '';
        annunciaVoiceover('Importazione annullata.');
        dom.pulsanteImporta.focus();
      }, { once: true });
    };
    lettore.readAsText(file);
  });

  // Il primo tocco/click ovunque inizializza l'audio (requisito Safari iOS)
  document.addEventListener('touchstart', () => Audio.inizializza(), { once: true, passive: true });
  document.addEventListener('click',      () => Audio.inizializza(), { once: true });

  // Rilevamento euristico VoiceOver su Safari iOS:
  // VoiceOver genera click con gap elevato (> 500ms) dal touchstart precedente.
  let _ultimoTouchstart = 0;
  document.addEventListener('touchstart', () => { _ultimoTouchstart = Date.now(); }, { passive: true, capture: true });
  document.addEventListener('click', () => {
    Audio.segnalaVoiceOver(Date.now() - _ultimoTouchstart > 500);
  }, { passive: true, capture: true });
}


// ------------------------------------------------------------
// SEQUENZA DI INTRODUZIONE — Primo avvio di una nuova partita
// Mostra i tre passi narrativi in sequenza (TESTI_INTRODUZIONE)
// prima di passare alla schermata principale del giorno.
// ------------------------------------------------------------
function mostraIntroduzione() {
  const passi = TESTI_INTRODUZIONE;

  function mostraPasso(indice) {
    if (indice >= passi.length) {
      // Intro completata: segna il flag e passa al gioco
      segnaIntroMostrata();
      renderizzaSchermataGiorno();
      annunciaVoiceover(`Il tuo primo giorno nell'Accademia di Elenthyr è cominciato.`);
      return;
    }

    const passo    = passi[indice];
    const contenitore = document.createElement('div');
    contenitore.className = 'testo-narrativo';

    // Titolo opzionale — presente solo nel primo passo
    if (passo.titolo) {
      const titolo = document.createElement('h2');
      titolo.textContent = passo.titolo;
      titolo.setAttribute('tabindex', '-1');
      contenitore.appendChild(titolo);
    }

    const paragrafo = document.createElement('p');
    paragrafo.textContent = passo.testo;
    contenitore.appendChild(paragrafo);

    // L'ultimo passo usa "Inizia" invece di "Continua"
    const etichetta = (indice === passi.length - 1) ? 'Inizia' : 'Continua';
    const pulsante  = document.createElement('button');
    pulsante.className = 'pulsante-avanza';
    pulsante.type      = 'button';
    pulsante.textContent = etichetta;
    pulsante.setAttribute('aria-label', etichetta);
    pulsante.addEventListener('click', () => {
      Audio.avanza();
      mostraPasso(indice + 1);
    });

    contenitore.appendChild(pulsante);
    dom.contenutoPrincipale.replaceChildren(contenitore);

    // Focus: sul titolo se presente (primo passo), altrimenti sul pulsante
    if (passo.titolo) {
      contenitore.querySelector('h2').focus();
    } else {
      pulsante.setAttribute('tabindex', '-1');
      pulsante.focus();
    }
  }

  mostraPasso(0);
}


// ------------------------------------------------------------
// AVVIO DELL'INTERFACCIA
// Chiamata una sola volta al caricamento del gioco.
// ------------------------------------------------------------
function avviaUI() {
  inizializzaMotore();
  aggiornaIndicatoreTemporale();
  aggiornaCalendario();

  // Mostra l'introduzione solo per le nuove partite
  if (!introGiaMostrata()) {
    mostraIntroduzione();
  } else {
    renderizzaSchermataGiorno();
  }
}


// ------------------------------------------------------------
// PUNTO DI ENTRATA
// Eseguito quando tutti gli script defer sono stati caricati.
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  _registraEventListener();
  avviaUI();
});
