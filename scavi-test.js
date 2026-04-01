'use strict';

// ============================================================
// SCAVI-TEST.JS — Elenthyr
// Strumento di test per tutta la fase di sviluppo.
// DA RIMUOVERE PRIMA DELLA VERSIONE FINALE PUBBLICA.
//
// Rimozione: eliminare questo file, rimuovere il riferimento
// in data.js (LUOGHI.scavi), rimuovere il <script> in
// index.html, rimuovere dalla lista in service-worker.js.
// Nessun altro file va modificato.
//
// Questo file non interagisce con il salvataggio reale.
// Tutte le operazioni di test sono isolate.
// ============================================================


// ------------------------------------------------------------
// RENDERER DELLA SCHERMATA DI TEST DEGLI SCAVI
// Viene chiamato da ui.js quando il giocatore seleziona
// l'attività 'test' nel luogo 'scavi'.
// ------------------------------------------------------------
function renderizzaSchermataScavi(contenitore) {
  const pannello = document.createElement('div');
  pannello.className = 'schermata-scavi-test';
  pannello.setAttribute('role', 'main');
  pannello.setAttribute('aria-label', 'Pannello di test degli Scavi');

  const titolo = document.createElement('h2');
  titolo.textContent = 'Gli Scavi — Pannello di Test';
  titolo.setAttribute('tabindex', '-1');
  pannello.appendChild(titolo);

  const avviso = document.createElement('p');
  avviso.textContent = 'Strumento di sviluppo. Le azioni qui non producono effetti sul salvataggio reale.';
  avviso.style.fontStyle = 'italic';
  avviso.style.opacity   = '0.6';
  pannello.appendChild(avviso);

  // Sezioni del pannello di test
  pannello.appendChild(_sezioneTestMinigiochi());
  pannello.appendChild(_sezioneSimulazioneGrado());
  pannello.appendChild(_sezioneTestAudio());
  pannello.appendChild(_sezioneTestVoicelines());
  pannello.appendChild(_sezioneNavigazioneSchermate());

  contenitore.replaceChildren(pannello);
  titolo.focus();
  annunciaVoiceover('Pannello di test degli Scavi aperto. Sviluppo: questo strumento verrà rimosso nella versione finale.');
}


// ------------------------------------------------------------
// SEZIONE: TEST MINIGIOCHI
// Tutti i minigiochi in tutte le difficoltà, senza prerequisiti.
// ------------------------------------------------------------
function _sezioneTestMinigiochi() {
  const sezione = _creaSezione('Test Minigiochi');

  const minigiochi = [
    { id: 'memoryRune',            nome: 'Memory delle Rune' },
    { id: 'minesweeperReagenti',   nome: 'Minesweeper dei Reagenti' },
    { id: 'mastermindFormule',     nome: 'Mastermind delle Formule' },
    { id: 'meccanicaSpellcasting', nome: 'Meccanica di Spellcasting' },
    { id: 'labirintoEquilibrio',   nome: 'Labirinto dell\'Equilibrio' },
    { id: 'rebusAccessibile',      nome: 'Rebus Accessibile' }
  ];

  const gradi = ['novizio', 'apprendista', 'esperto', 'adepto'];

  minigiochi.forEach(mg => {
    const gruppo = document.createElement('div');
    gruppo.setAttribute('role', 'group');
    gruppo.setAttribute('aria-label', `Test ${mg.nome}`);
    gruppo.style.marginBottom = '0.75rem';

    const etichetta = document.createElement('div');
    etichetta.textContent = mg.nome;
    etichetta.style.fontWeight = '600';
    etichetta.style.marginBottom = '0.375rem';
    gruppo.appendChild(etichetta);

    const rigaPulsanti = document.createElement('div');
    rigaPulsanti.style.display = 'flex';
    rigaPulsanti.style.flexWrap = 'wrap';
    rigaPulsanti.style.gap = '0.375rem';

    gradi.forEach(grado => {
      const pulsante = document.createElement('button');
      pulsante.type = 'button';
      pulsante.className = 'pulsante-slot';
      pulsante.textContent = grado;
      pulsante.setAttribute('aria-label', `Avvia ${mg.nome} difficoltà ${grado}`);

      pulsante.addEventListener('click', () => {
        Audio.riprendi();
        // Crea un contenitore temporaneo isolato per il minigioco
        const contenitoreTest = document.getElementById('contenuto-principale');
        const stato = leggiStato();

        // Override temporaneo del grado: Minigiochi.avvia legge leggiGrado() che
        // accede direttamente a stato.gradi — statoFinto non sarebbe mai letto.
        const gradoMap = {
          novizio: 'Novizio', apprendista: 'Apprendista',
          esperto: 'Esperto', adepto: 'Adepto'
        };
        const gradoOriginaleArcana     = stato.gradi.arcana;
        const gradoOriginaleErudizione = stato.gradi.erudizione;
        stato.gradi.arcana     = gradoMap[grado] || 'Novizio';
        stato.gradi.erudizione = gradoMap[grado] || 'Allievo';

        annunciaVoiceover(`Avvio test: ${mg.nome} a difficoltà ${grado}`);
        Minigiochi.avvia(mg.id, contenitoreTest, (risultato, punti) => {
          // Ripristina i gradi reali prima di tornare alla schermata
          stato.gradi.arcana     = gradoOriginaleArcana;
          stato.gradi.erudizione = gradoOriginaleErudizione;
          annunciaVoiceover(`Test completato. Risultato: ${risultato}. (Nessun effetto sul salvataggio)`);
          // Torna al pannello scavi
          renderizzaSchermataScavi(contenitoreTest);
        });
      });

      rigaPulsanti.appendChild(pulsante);
    });

    gruppo.appendChild(rigaPulsanti);
    sezione.appendChild(gruppo);
  });

  return sezione;
}


// ------------------------------------------------------------
// SEZIONE: SIMULAZIONE GRADO
// Permette di impostare manualmente il grado del protagonista
// per testare i contenuti a diversi livelli.
// NOTA: modifica lo stato reale del gioco — usare con cautela.
// ------------------------------------------------------------
function _sezioneSimulazioneGrado() {
  const sezione = _creaSezione('Simulazione Grado ⚠ (modifica lo stato reale)');

  const avviso = document.createElement('p');
  avviso.textContent = 'Attenzione: questi controlli modificano lo stato reale del gioco per il testing.';
  avviso.style.color    = '#e07b39';
  avviso.style.fontSize = '0.875rem';
  sezione.appendChild(avviso);

  // Ramo Arcana
  const gruppoArcana = document.createElement('div');
  gruppoArcana.setAttribute('role', 'group');
  gruppoArcana.setAttribute('aria-label', 'Grado ramo Arcana');
  gruppoArcana.style.marginBottom = '0.75rem';

  const labelArcana = document.createElement('label');
  labelArcana.textContent = 'Ramo Arcana:';
  labelArcana.setAttribute('for', 'scavi-grado-arcana');
  gruppoArcana.appendChild(labelArcana);

  const selectArcana = document.createElement('select');
  selectArcana.id = 'scavi-grado-arcana';
  selectArcana.style.marginLeft = '0.5rem';
  GRADI_ARCANA.forEach(grado => {
    const opt = document.createElement('option');
    opt.value = grado;
    opt.textContent = grado;
    if (grado === leggiGrado('arcana')) opt.selected = true;
    selectArcana.appendChild(opt);
  });
  selectArcana.addEventListener('change', () => {
    const stato = leggiStato();
    stato.gradi.arcana = selectArcana.value;
    salva();
    annunciaVoiceover(`Grado Arcana impostato a: ${selectArcana.value}`);
  });
  gruppoArcana.appendChild(selectArcana);
  sezione.appendChild(gruppoArcana);

  // Ramo Erudizione
  const gruppoErudizione = document.createElement('div');
  gruppoErudizione.setAttribute('role', 'group');
  gruppoErudizione.setAttribute('aria-label', 'Grado ramo Erudizione');

  const labelErudizione = document.createElement('label');
  labelErudizione.textContent = 'Ramo Erudizione:';
  labelErudizione.setAttribute('for', 'scavi-grado-erudizione');
  gruppoErudizione.appendChild(labelErudizione);

  const selectErudizione = document.createElement('select');
  selectErudizione.id = 'scavi-grado-erudizione';
  selectErudizione.style.marginLeft = '0.5rem';
  GRADI_ERUDIZIONE.forEach(grado => {
    const opt = document.createElement('option');
    opt.value = grado;
    opt.textContent = grado;
    if (grado === leggiGrado('erudizione')) opt.selected = true;
    selectErudizione.appendChild(opt);
  });
  selectErudizione.addEventListener('change', () => {
    const stato = leggiStato();
    stato.gradi.erudizione = selectErudizione.value;
    salva();
    annunciaVoiceover(`Grado Erudizione impostato a: ${selectErudizione.value}`);
  });
  gruppoErudizione.appendChild(selectErudizione);
  sezione.appendChild(gruppoErudizione);

  return sezione;
}


// ------------------------------------------------------------
// SEZIONE: TEST AUDIO
// Testa i paesaggi sonori di tutti i luoghi.
// ------------------------------------------------------------
function _sezioneTestAudio() {
  const sezione = _creaSezione('Test Audio Ambientale');

  const luoghiConAudio = Object.keys(LUOGHI);

  luoghiConAudio.forEach(idLuogo => {
    const luogo = LUOGHI[idLuogo];
    const pulsante = document.createElement('button');
    pulsante.type = 'button';
    pulsante.className = 'pulsante-slot';
    pulsante.textContent = luogo.nome;
    pulsante.setAttribute('aria-label', `Avvia audio ambientale: ${luogo.nome}`);
    pulsante.style.marginBottom = '0.375rem';
    pulsante.style.marginRight  = '0.375rem';

    pulsante.addEventListener('click', () => {
      Audio.riprendi();
      Audio.avviaAmbientale(idLuogo);
      annunciaVoiceover(`Audio ambientale avviato: ${luogo.nome}`);
    });

    sezione.appendChild(pulsante);
  });

  const pulsanteStop = document.createElement('button');
  pulsanteStop.type = 'button';
  pulsanteStop.className = 'pulsante-slot';
  pulsanteStop.textContent = '⏹ Ferma audio';
  pulsanteStop.setAttribute('aria-label', 'Ferma audio ambientale');
  pulsanteStop.addEventListener('click', () => {
    Audio.fermaAmbientale();
    annunciaVoiceover('Audio ambientale fermato.');
  });
  sezione.appendChild(pulsanteStop);

  // Test feedback sonori sintetici
  const feedbackSonori = [
    { id: 'conferma',  nome: 'Conferma',   fn: () => Audio.conferma() },
    { id: 'errore',    nome: 'Errore',      fn: () => Audio.errore() },
    { id: 'avanza',    nome: 'Avanza',      fn: () => Audio.avanza() },
    { id: 'cerimonia', nome: 'Cerimonia',   fn: () => Audio.cerimonia() }
  ];

  const titolFeedback = document.createElement('div');
  titolFeedback.textContent = 'Feedback sonori sintetici:';
  titolFeedback.style.marginTop    = '0.75rem';
  titolFeedback.style.marginBottom = '0.375rem';
  titolFeedback.style.fontWeight   = '600';
  sezione.appendChild(titolFeedback);

  feedbackSonori.forEach(fb => {
    const pulsante = document.createElement('button');
    pulsante.type = 'button';
    pulsante.className = 'pulsante-slot';
    pulsante.textContent = fb.nome;
    pulsante.setAttribute('aria-label', `Test suono: ${fb.nome}`);
    pulsante.style.marginRight = '0.375rem';
    pulsante.addEventListener('click', () => {
      Audio.riprendi();
      fb.fn();
    });
    sezione.appendChild(pulsante);
  });

  return sezione;
}


// ------------------------------------------------------------
// SEZIONE: TEST VOICELINES
// Testa le voicelines di ogni PNG per ogni trigger.
// ------------------------------------------------------------
function _sezioneTestVoicelines() {
  const sezione = _creaSezione('Test Voicelines PNG');

  const nota = document.createElement('p');
  nota.textContent = 'Le voicelines verranno aggiunte con i file audio. Qui si testa la struttura dei trigger.';
  nota.style.fontSize = '0.875rem';
  nota.style.opacity  = '0.7';
  sezione.appendChild(nota);

  const triggerDisponibili = [
    'inizioLezione', 'fineLezione', 'approccio',
    'completamentoStudio', 'eventoStagionale', 'cerimonia'
  ];

  Object.values(PERSONAGGI).slice(0, 8).forEach(png => {
    const riga = document.createElement('div');
    riga.style.marginBottom = '0.375rem';
    riga.style.display      = 'flex';
    riga.style.flexWrap     = 'wrap';
    riga.style.gap          = '0.375rem';
    riga.style.alignItems   = 'center';

    const nomeLabel = document.createElement('span');
    nomeLabel.textContent = `${png.nome}:`;
    nomeLabel.style.minWidth = '8rem';
    riga.appendChild(nomeLabel);

    triggerDisponibili.slice(0, 3).forEach(trigger => {
      const pulsante = document.createElement('button');
      pulsante.type = 'button';
      pulsante.className = 'pulsante-slot';
      pulsante.textContent = trigger;
      pulsante.setAttribute('aria-label', `Test voiceline: ${png.nome}, trigger ${trigger}`);

      pulsante.addEventListener('click', () => {
        annunciaVoiceover(`Voiceline test: ${png.nome} — ${trigger}. (Audio non ancora disponibile)`);
      });
      riga.appendChild(pulsante);
    });

    sezione.appendChild(riga);
  });

  return sezione;
}


// ------------------------------------------------------------
// SEZIONE: NAVIGAZIONE SCHERMATE
// Naviga a qualsiasi schermata del gioco in qualsiasi stato.
// ------------------------------------------------------------
function _sezioneNavigazioneSchermate() {
  const sezione = _creaSezione('Navigazione Schermate');

  const contenitore = document.getElementById('contenuto-principale');

  const schermate = [
    {
      nome: 'Giorno principale',
      fn: () => {
        renderizzaSchermataGiorno();
        annunciaVoiceover('Schermata principale del giorno.');
      }
    },
    {
      nome: 'Scelta attività',
      fn: () => {
        const slotFinto = { id: 'mattina', nome: 'Mattina', stato: 'libero' };
        renderizzaSceltaAttivita(slotFinto);
        annunciaVoiceover('Schermata scelta tipo attività.');
      }
    },
    {
      nome: 'Scelta luogo',
      fn: () => {
        const slotFinto = { id: 'mattina', nome: 'Mattina', stato: 'libero' };
        renderizzaSceltaLuogo(slotFinto);
        annunciaVoiceover('Schermata scelta luogo.');
      }
    }
  ];

  // Aggiunge un pulsante per ogni luogo
  Object.values(LUOGHI).forEach(luogo => {
    schermate.push({
      nome: luogo.nome,
      fn: () => {
        const slotFinto = { id: 'mattina', nome: 'Mattina', stato: 'libero' };
        renderizzaSchermataLuogo(luogo.id, slotFinto);
        annunciaVoiceover(`Schermata luogo: ${luogo.nome}.`);
      }
    });
  });

  schermate.forEach(schermata => {
    const pulsante = document.createElement('button');
    pulsante.type = 'button';
    pulsante.className = 'pulsante-slot';
    pulsante.textContent = schermata.nome;
    pulsante.setAttribute('aria-label', `Naviga a: ${schermata.nome}`);
    pulsante.style.marginRight  = '0.375rem';
    pulsante.style.marginBottom = '0.375rem';

    pulsante.addEventListener('click', () => {
      Audio.riprendi();
      schermata.fn();
    });

    sezione.appendChild(pulsante);
  });

  return sezione;
}


// ------------------------------------------------------------
// UTILITÀ INTERNA
// ------------------------------------------------------------
function _creaSezione(titolo) {
  const sezione = document.createElement('div');
  sezione.style.marginBottom  = '1.5rem';
  sezione.style.paddingBottom = '1rem';
  sezione.style.borderBottom  = '1px solid var(--colore-bordo)';

  const h3 = document.createElement('h3');
  h3.textContent = titolo;
  h3.style.color        = 'var(--colore-scavi)';
  h3.style.marginBottom = '0.75rem';
  sezione.appendChild(h3);

  return sezione;
}
