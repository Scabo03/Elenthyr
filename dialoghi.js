'use strict';

// ============================================================
// DIALOGHI_PNG.JS — Elenthyr
// Dialoghi interattivi di tutti i PNG, organizzati per
// livello di relazione e contesto narrativo.
//
// Struttura per ogni PNG:
//   voicelines  — battute unidirezionali (nessuna risposta)
//   dialoghi    — array per livello di relazione:
//                 ostile | teso | neutro | positivo |
//                 moltoPositivo | eventi
//
// Sigle PNG: VS BO LC SD CV PV HV KD MtS MS ES
//            LF SK BV MA ED VkS CM SV HM TW DM SiV AR
//
// Toni risposta: F AM I DIS DI C CU EL SC
//
// Coniugazioni:
//   Giocatore → VS/BO/LC/SD/CV/HV : Voi
//   Giocatore → PV/KD/MtS/MS/ES   : Lei
//   Giocatore → Staff/Esterni      : Lei
//   Giocatore → Coetanei           : tu
//   PNG/Narratore → giocatore      : tu
// ============================================================

const DIALOGHI_PNG = {


  // ============================================================
  // VS — VALDRIC SONN | Arcimago | (60+)
  // Formale, solenne, misura ogni parola
  // Giocatore usa: Voi
  // ============================================================
  valdricSonn: {

    voicelines: [
      // Cerimonie
      { id: 'vs_v01', contesto: 'apertura_cerimonia', testo: `"Questa sala conosce il peso delle parole che si stanno per pronunciare. Vi chiedo silenzio — non per rispetto verso di me, ma verso ciò che questo momento rappresenta."` },
      { id: 'vs_v02', contesto: 'apertura_cerimonia', testo: `"Ciò che accade oggi non appartiene a un singolo giorno. Appartiene a una catena che viene da lontano e va lontano. Siatene consapevoli."` },
      { id: 'vs_v03', contesto: 'apertura_cerimonia', testo: `"L'Accademia di Elenthyr non è queste mura. È ciò che accade dentro di esse nei momenti come questo. Presenziate con la serietà che merita."` },
      { id: 'vs_v04', contesto: 'chiusura_cerimonia', testo: `"Quanto è stato detto oggi rimane. Portatelo con voi — non come un fardello, ma come una bussola."` },
      { id: 'vs_v05', contesto: 'chiusura_cerimonia', testo: `"La cerimonia è conclusa. Il suo significato non lo è. Congedatevi."` },
      { id: 'vs_v06', contesto: 'chiusura_cerimonia', testo: `"Quello che avete ricevuto oggi non vi appartiene ancora del tutto. Ve lo guadagnerete nel tempo. Andate."` },
      { id: 'vs_v07', contesto: 'annuncio_importante', testo: `"Interrompo il corso ordinario delle cose perché ciò che devo comunicare non tollera di essere trattato come ordinario."` },
      { id: 'vs_v08', contesto: 'annuncio_importante', testo: `"Quello che state per ascoltare cambierà qualcosa — in questa accademia, o fuori da essa, o in entrambe. Ascoltatemi con attenzione."` },
      { id: 'vs_v09', contesto: 'annuncio_importante', testo: `"Non è mia abitudine riunire l'accademia senza ragione. Oggi la ragione esiste. Ascoltatemi."` },
      // Monologhi cerimoniali promozione
      { id: 'vs_v10', contesto: 'promozione_magister', testo: `"Magister. Questo titolo è stato portato da chi vi ha preceduto con il peso di ciò che sapevano. Ora appartiene a voi — con lo stesso peso, e con la stessa opportunità. Non sprecatela."` },
      { id: 'vs_v11', contesto: 'promozione_magister', testo: `"Ho presieduto molte di queste cerimonie. Ogni volta mi chiedo se chi riceve il titolo comprende davvero cosa porta con sé. Raramente ne sono certo. Di voi, oggi, lo sono un poco di più."` },
      { id: 'vs_v12', contesto: 'promozione_custode', testo: `"Custode. L'Erudizione a questo livello non è più un percorso — è una responsabilità verso ciò che si è custodito prima di voi e ciò che verrà dopo. Portatelo con la serietà che merita."` },
      { id: 'vs_v13', contesto: 'promozione_altomaestro', testo: `"Alto Maestro. Non aggiungo altro. Chi è arrivato fin qui sa già tutto ciò che occorre sapere sul peso di questo titolo."` },
    ],

    primoIngresso: [
      {
        id: 'vs_pi01',
        contesto: 'Sonn attraversa il corridoio dopo la cerimonia di apertura del semestre. Si ferma quando ti nota tra i nuovi ingressi — con la calma di chi non si affretta mai, e non ne ha bisogno.',
        testo: `"Nuovo ingresso." Non è una domanda. "Il vostro nome."`,
        risposte: [
          { tono: 'formale',    testo: `Vi presentate con nome e grado di ingresso in modo conciso, senza aggiungere altro.`,                              effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `Date il vostro nome e aspettate — la brevità della domanda suggerisce che la brevità è la risposta giusta.`,       effetti: { rep: +1 } },
          { tono: 'diretto',    testo: `"Il mio nome. Ho preparato l'ingresso con cura — ho letto tutto il materiale disponibile prima di arrivare."`,     effetti: { rep: +1 } },
          { tono: 'amichevole', testo: `Vi presentate con calore, aggiungendo che è un privilegio essere qui. L'espressione di Sonn rimane invariata.`,    effetti: { rep: -1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'vs_o01',
          contesto: 'Dopo un provvedimento disciplinare. Sonn ti ferma nel corridoio centrale.',
          testo: `"Ho ricevuto una segnalazione sul vostro comportamento durante la sessione di ieri. Non sono qui per ascoltare spiegazioni. Sono qui per verificare se avete capito."`,
          risposte: [
            { tono: 'formale',   testo: `"Ho compreso la natura della mancanza. Non si ripeterà."`,                                                     effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Sì. Ho sbagliato e so esattamente in cosa."`,                                                                 effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Credo di aver compreso. Se c'è qualcosa che ho frainteso, sono disposto ad ascoltare."`,                       effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"La situazione era più complessa di quanto la segnalazione probabilmente descriva."`,                          effetti: { rep: -2 } },
            { tono: 'ironico',   testo: `"Verificare. Capisco. E se la risposta fosse no?"`,                                                            effetti: { rep: -3, chiudeDialogo: true } },
          ]
        },
        {
          id: 'vs_o02',
          contesto: 'Sonn ti incrocia in corridoio senza fermarsi. Poi si volta.',
          testo: `"Sto notando un andamento. Non mi piace."`,
          risposte: [
            { tono: 'formale',   testo: `"Se ritiene opportuno un colloquio formale, sono disponibile."`,                                               effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa intende esattamente?"`,                                                                                  effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sono disposto a cambiare quello che devo cambiare. Ma ho bisogno di capire cosa vede."`,                       effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Lo guardi senza rispondere, aspettando che prosegua.`,                                                         effetti: { rep:  0 } },
            { tono: 'elusivo',  testo: `"Gli andamenti si interpretano in molti modi."`,                                                               effetti: { rep: -2 } },
          ]
        },
        {
          id: 'vs_o03',
          contesto: 'Sonn vi ferma al termine di una sessione. Non ha l\'espressione di chi apre un dialogo.',
          testo: `"Il lavoro di questa settimana è stato sotto il livello abituale." Non aggiunge altro — aspetta.`,
          risposte: [
            { tono: 'cauto',      testo: `"Ha ragione. Non trovo una giustificazione adeguata."`,                                         effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Ne sono consapevole. Ci sono state complicazioni che sto gestendo."`,                          effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Lo so. Posso recuperare nella prossima sessione."`,                                            effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                         effetti: { rep: +1 } },
            { tono: 'elusivo',    testo: `"Dipende da quale livello considerate quello abituale."`,                                       effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'vs_t01',
          contesto: 'Fine cerimonia minore. Sonn passa accanto a te e dice sottovoce.',
          testo: `"Il vostro contributo oggi era corretto. Solo corretto."`,
          risposte: [
            { tono: 'formale',   testo: `"Farò in modo che la prossima volta sia più che corretto."`,                                                   effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Lo so. Posso fare meglio."`,                                                                                  effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"C'è qualcosa di specifico che avrei potuto fare diversamente?"`,                                              effetti: { rep:  0, sblocca: 'vs_t01_cu' } },
            { tono: 'distaccato', testo: `Annuisci leggermente, senza elaborare.`,                                                                       effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Grazie comunque. Apprezzo che l'abbia notato."`,                                                              effetti: { rep: -1 } },
          ]
        },
        {
          id: 'vs_t02',
          contesto: 'Sonn ti convoca. Non si siede. Ti guarda dall\'altra parte della stanza.',
          testo: `"Il vostro rendimento nelle ultime settimane non è coerente con quello che ho visto all'inizio. Voglio capire se è una fase o una direzione."`,
          risposte: [
            { tono: 'formale',   testo: `"È una fase. Ho intenzione di correggerla."`,                                                                  effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"È stato un periodo difficile. Ma sa già che posso fare di più."`,                                             effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non voglio risponderle con una promessa che non so mantenere. Posso dirle che ci sto lavorando."`,             effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Dipende da cosa intende per direzione."`,                                                                     effetti: { rep: -2 } },
            { tono: 'amichevole',  testo: `"Mi fa piacere che se ne sia accorto. Pensavo di non essere abbastanza visibile da questo punto di vista."`,   effetti: { rep: -1 } },
          ]
        },
        {
          id: 'vs_t03',
          contesto: 'A fine sessione pratica, Sonn si ferma vicino a te mentre gli altri escono.',
          testo: `"Avete eseguito la sequenza in modo tecnicamente accettabile. C'è però una scelta che non ho capito."`,
          risposte: [
            { tono: 'formale',   testo: `"Sono pronto a spiegarla, se lo ritiene utile."`,                                                              effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Ho preferito la stabilità alla velocità. So che non è l'approccio standard."`,                                effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Anch'io non ero sicuro fosse la scelta giusta. Cosa avrebbe fatto lei?"`,                                     effetti: { rep:  0, sblocca: 'vs_t03_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"La scelta aveva una logica. Non sono sicuro che fosse la migliore."`,                                         effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"È stata una valutazione al momento."`,                                                                        effetti: { rep:  0 } },
          ]
        },
        {
          id: 'vs_t04',
          contesto: 'Sonn vi incontra nel corridoio e si ferma un secondo — abbastanza da far capire che non è accidentale.',
          testo: `"Ho visto i risultati dell'ultimo esame. Tecnicamente sufficienti." Una pausa. "Sufficiente non è il vostro standard. O non dovrebbe esserlo."`,
          risposte: [
            { tono: 'diretto',    testo: `"Non era il mio standard. Non si ripeterà."`,                                                   effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Ha ragione. Posso fare meglio."`,                                                               effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Era un periodo difficile. Non è una scusa — è un contesto."`,                                  effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa vedete, rispetto agli esami precedenti?"`,                                                 effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Capisco."`,                                                                                    effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'vs_n01',
          contesto: 'Sonn ti nota mentre un gruppo di studenti si dissolve. Ti guarda un momento in più del necessario.',
          testo: `"Come procedono gli studi?"`,
          risposte: [
            { tono: 'formale',   testo: `"Procedono con regolarità, Alto Maestro. Nessuna difficoltà che non sia gestibile."`,                          effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Bene nel complesso. C'è una disciplina in cui sto investendo più attenzione."`,                               effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Stavo riflettendo su un aspetto della teoria arcana che non riesco a inquadrare. Posso chiederle un'indicazione?"`, effetti: { rep: 0, sblocca: 'vs_n01_cu' } },
            { tono: 'cauto',   testo: `"Con qualche difficoltà in certi ambiti, ma sto cercando di affrontarle nel modo giusto."`,                    effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Bene, grazie. È raro che qualcuno lo chieda direttamente."`,                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'vs_n02',
          contesto: 'Sonn attraversa il cortile e rallenta impercettibilmente avvicinandosi a te.',
          testo: `"Non è una giornata da stare dentro."`,
          risposte: [
            { tono: 'formale',   testo: `Ti alzi leggermente. "No, Alto Maestro. Stavo approfittando del silenzio per riflettere."`,                    effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"No. Avevo bisogno di aria."`,                                                                                 effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `Lo guardi, incerto se sia un'osservazione o un invito. "È così."`,                                             effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Viene spesso nel cortile a quest'ora?"`,                                                                      effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È il posto migliore dell'accademia quando è così."`,                                                          effetti: { rep: -1 } },
          ]
        },
        {
          id: 'vs_n03',
          contesto: 'Sonn ti vede studiare tardi in una sala comune. Si ferma sulla soglia.',
          testo: `"Ancora qui."`,
          risposte: [
            { tono: 'formale',   testo: `"Sì, Alto Maestro. C'è del materiale che non riesco a chiudere prima di dormire."`,                            effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Sì. Ho bisogno di più tempo per certe cose."`,                                                                effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sì. Non sempre riesco a finire durante le ore ordinarie."`,                                                   effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Annuisci senza aggiungere altro.`,                                                                             effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Sempre. È il momento più tranquillo della giornata."`,                                                        effetti: { rep: -1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'vs_p01',
          contesto: 'Sonn è in piedi vicino alla finestra. Non ti guarda subito.',
          testo: `"Tre docenti mi hanno fatto il vostro nome nell'arco di due settimane. Non è normale. Di solito non è un segnale positivo." Una pausa. "Stavolta lo è."`,
          risposte: [
            { tono: 'formale',   testo: `"È un riconoscimento che non mi aspettavo. Farò in modo di meritarlo."`,                                       effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Sono contento di saperlo. Mi impegno perché questo continui."`,                                               effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non so cosa abbiano detto, ma cercherò di esserne all'altezza."`,                                             effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Posso chiederle cosa hanno osservato in particolare?"`,                                                       effetti: { rep:  0, sblocca: 'vs_p01_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Questo è forse il miglior complimento che abbia ricevuto da quando sono qui."`,                               effetti: { rep: -1 } },
          ]
        },
        {
          id: 'vs_p02',
          contesto: 'Dopo la promozione. Sonn ti raggiunge mentre la sala si svuota.',
          testo: `"Il monologo cerimoniale era per tutti. Questo è per voi. Non sprecate quello che avete dimostrato oggi."`,
          risposte: [
            { tono: 'formale',   testo: `"Non lo farò. Grazie, Alto Maestro."`,                                                                         effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Ha la mia parola."`,                                                                                          effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Lo terrò a mente. Ogni giorno."`,                                                                             effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"C'è qualcosa che dovrei tenere presente in particolare, andando avanti?"`,                                    effetti: { rep:  0, sblocca: 'vs_p02_cu' } },
            { tono: 'amichevole',  testo: `"Questa frase peserà più del titolo, nei prossimi mesi. Glielo prometto."`,                                     effetti: { rep: -1 } },
          ]
        },
        {
          id: 'vs_p03',
          contesto: 'Sonn ti ha risposto brevemente in sessione. Ora ti ferma nel corridoio.',
          testo: `"La domanda che avete posto stamattina era più precisa di quanto sembrava. Non volevo risponderle in modo superficiale davanti a tutti."`,
          risposte: [
            { tono: 'formale',   testo: `"La ringrazio. Ero consapevole che la risposta breve non fosse tutta la risposta."`,                           effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Allora la ascolto. Ho tutto il tempo."`,                                                                      effetti: { rep:  0, sblocca: 'vs_p03_cu', conoscenza: +2 } },
            { tono: 'diretto',  testo: `"Ero curioso di sapere se l'avesse notato."`,                                                                   effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Apprezzo che se ne sia ricordato."`,                                                                          effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sono pronto ad ascoltare."`,                                                                                   effetti: { rep:  0 } },
          ]
        },
        {
          id: 'vs_p04',
          contesto: 'Sonn vi incontra all\'uscita della Torre. È raro che si trovi qui — ancora più raro che si fermi.',
          testo: `"Ho seguito il vostro percorso in questa disciplina dall'inizio. Non lo dico spesso — ma c'è una qualità nel modo in cui lavorate che non si trova in tutti." Una pausa secca. "Non sprecarla."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non sapevo che lo notaste. Lo prendo come un impegno, non un complimento."`,                   effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Grazie. Farò in modo che non sia mal riposta."`,                                               effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Non la sprecherò."`,                                                                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa intendete esattamente con 'qualità'?"`,                                                   effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci. Sarà sufficiente.`,                                                                   effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'vs_mp01',
          contesto: 'Sonn si ferma con te in un corridoio silenzioso. Il tono è leggermente diverso dal solito.',
          testo: `"Sto valutando una modifica al curriculum del secondo semestre. Ho sentito altri. Voglio sentire anche voi."`,
          risposte: [
            { tono: 'formale',   testo: `"È un onore. Posso chiederle su quale aspetto vuole il mio punto di vista?"`,                                  effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Dica pure. Sarò onesto."`,                                                                                    effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Voglio essere utile, non solo compiacente. Mi permetta di pensarci un momento prima di rispondere."`,          effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa l'ha portata a chiedere proprio a me?"`,                                                                 effetti: { rep:  0, sblocca: 'vs_mp01_cu' } },
            { tono: 'amichevole',  testo: `"Non me lo aspettavo. Ma sono contento che l'abbia fatto."`,                                                   effetti: { rep: -1 } },
          ]
        },
        {
          id: 'vs_mp02',
          contesto: 'Sonn ti guarda un momento più a lungo del solito. Poi parla con la stessa cadenza formale di sempre.',
          testo: `"Provengo da un posto molto diverso da questo. Non ne parlo spesso. Voi, però, mi ricordate qualcosa di quel periodo. Non so ancora se è un complimento."`,
          risposte: [
            { tono: 'formale',   testo: `"Non ho bisogno che lo sia. Il fatto che lo dica è già sufficiente."`,                                         effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Rimani in silenzio un momento. "Lo terrò presente."`,                                                          effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa le ricordo, se posso chiederlo?"`,                                                                       effetti: { rep:  0, sblocca: 'vs_mp02_cu', narrativo: true } },
            { tono: 'diretto',  testo: `"Allora aspetto di capire in quale direzione va."`,                                                            effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Lo guardi senza rispondere — a volte il silenzio è la risposta giusta.`,                                       effetti: { rep:  0 } },
          ]
        },
        {
          id: 'vs_mp03',
          contesto: 'Fine anno. Sonn ti raggiunge mentre la sala del congedo si svuota.',
          testo: `"Un semestre è una misura arbitraria. Quello che conta è cosa portate fuori da questa stanza."`,
          risposte: [
            { tono: 'formale',   testo: `"Porto qualcosa che non avevo quando sono entrato. È abbastanza, per ora."`,                                   effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Porto più domande di quando sono arrivato. Spero sia la risposta giusta."`,                                   effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Ci sto ancora pensando. Forse è già un segno."`,                                                             effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa portava lei, la prima volta che ha concluso un anno in questo posto?"`,                                  effetti: { rep:  0, sblocca: 'vs_mp03_cu', narrativo: true } },
            { tono: 'amichevole',  testo: `"È stata una bella stagione. Anche nei momenti più difficili."`,                                               effetti: { rep: -1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'vs_e01',
          trigger: 'crisi_province',
          contesto: 'Sonn attraversa l\'ingresso. Ti nota. Si ferma un secondo.',
          testo: `"Avete sentito. Lo so dalla vostra espressione." Non aspetta conferma. "Continuate a studiare. Le crisi esterne sono esattamente il motivo per cui questo posto esiste."`,
          risposte: [
            { tono: 'formale',   testo: `"Capito. Mi concentro."`,                                                                                      effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Ha ragione. Ma è difficile non chiedersi cosa significhi per noi."`,                                          effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Lo farò. Ma posso chiederle se siamo al sicuro qui?"`,                                                        effetti: { rep: +1, sblocca: 'vs_e01_c' } },
            { tono: 'curioso',  testo: `"Cosa succederà all'accademia se la situazione peggiora?"`,                                                    effetti: { rep:  0, sblocca: 'vs_e01_cu' } },
            { tono: 'distaccato', testo: `Annuisci e ti allontani.`,                                                                                     effetti: { rep:  0 } },
          ]
        },
        {
          id: 'vs_e02',
          trigger: 'ala_chiusa_notturna',
          contesto: 'Sonn compare senza che tu lo abbia sentito. Ti guarda. Non sembra sorpreso.',
          testo: `"Sapevate che quest'ala non è ufficialmente aperta a quest'ora."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo sapevo. Me ne assumo la responsabilità."`,                                                                 effetti: { rep: +2, sblocca: 'vs_e02_f' } },
            { tono: 'diretto',  testo: `"Sì. Il testo che cercavo non era accessibile altrove."`,                                                      effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sì. Stavo per andarmene."`,                                                                                   effetti: { rep:  0 } },
            { tono: 'elusivo',  testo: `"Non ero sicuro dei confini esatti degli orari."`,                                                             effetti: { rep: -2, chiudeDialogo: true } },
            { tono: 'curioso',  testo: `"È un posto che frequenta anche lei, a quest'ora?"`,                                                           effetti: { rep:  0, sblocca: 'vs_e02_cu', narrativo: true } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // BO — BRENNAR OSTK | Alto Maestro | (50+)
  // Asciutto, diretto, zero ornamenti
  // Giocatore usa: Voi
  // ============================================================
  brennarOstk: {

    voicelines: [
      { id: 'bo_v01', contesto: 'intro_seria', testo: `"Siediti. Quello che ho da dirti richiede che tu sia fermo."` },
      { id: 'bo_v02', contesto: 'intro_seria', testo: `"Non ho molto tempo, ma quello che ho è tuo adesso. Ascolta."` },
      { id: 'bo_v03', contesto: 'intro_seria', testo: `"Non ti ho chiamato per una questione ordinaria. Saprai perché tra un momento."` },
      { id: 'bo_v04', contesto: 'comunicazione_operativa', testo: `"Cambiamento di orario. Terza sessione spostata al pomeriggio. Controlla il registro."` },
      { id: 'bo_v05', contesto: 'comunicazione_operativa', testo: `"Risultati dell'ultima valutazione sono nel registro. Leggi prima di venire da me con domande."` },
    ],

    primoIngresso: [
      {
        id: 'bo_pi01',
        contesto: 'Brennar Ostk ti ferma all\'ingresso con il registro aperto e l\'espressione di chi ha tre cose urgenti da fare e ne sta aggiungendo una quarta.',
        testo: `"Nome, grado di ingresso, disciplina principale. Ho il registro aperto."`,
        risposte: [
          { tono: 'formale',    testo: `Fornite le informazioni richieste nell'ordine corretto, senza aggiungere altro.`,                                  effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `Fornite le informazioni in modo rapido e preciso — sembra esattamente quello che vuole.`,                          effetti: { rep: +2 } },
          { tono: 'curioso',    testo: `"Brennar Ostk, corretto? Posso chiederle una cosa pratica prima di procedere?"`,                                  effetti: { rep:  0 } },
          { tono: 'amichevole', testo: `Fornite le informazioni e aggiungete che siete entusiasti di cominciare. Lui non alza lo sguardo dalla pagina.`,   effetti: { rep: -1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'bo_o01',
          contesto: 'Ostk ti trova fuori dall\'ufficio con una lista in mano.',
          testo: `"Hai ignorato una comunicazione formale. Nella mia sezione, questo non è tollerato. Cosa hai da dire."`,
          risposte: [
            { tono: 'diretto',  testo: `"Ho sbagliato. Non ho giustificazioni."`,                                                                      effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Riconosco la mancanza. Provvederò immediatamente a regolarizzare la situazione."`,                            effetti: { rep:  0 } },
            { tono: 'cauto',   testo: `"Non l'ho ignorata intenzionalmente. Posso spiegarvi cosa è successo?"`,                                       effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `Lo guardi senza rispondere, aspettando che prosegua.`,                                                         effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Non ero sicuro che la comunicazione riguardasse anche me."`,                                                  effetti: { rep: -2, chiudeDialogo: true } },
          ]
        },
        {
          id: 'bo_o02',
          contesto: 'Ostk ti incrocia senza fermarsi, poi si volta di scatto.',
          testo: `"Ho il tuo nome su tre pratiche aperte. Tre. Sistemale entro domani o le sistemo io."`,
          risposte: [
            { tono: 'diretto',  testo: `"Entro stasera."`,                                                                                             effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Provvederò nelle prossime ore. Potete indicarmi quale ha priorità?"`,                                          effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Non sapevo ci fossero tre. Ditemi dove devo andare."`,                                                        effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Alcune di quelle pratiche dipendono da fattori che non controllo completamente."`,                            effetti: { rep: -2 } },
            { tono: 'ironico',   testo: `"Tre. Non male. Ho battuto qualche record?"`,                                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'bo_o03',
          contesto: 'Brennar Ostk vi incrocia nel corridoio amministrativo. Non ha tempo da sprecare ma si ferma un secondo.',
          testo: `"Avete depositato la documentazione per il progetto di ricerca in ritardo di tre giorni. Non mi interessa il motivo. Mi interessa che non succeda di nuovo."`,
          risposte: [
            { tono: 'formale',    testo: `"Capito. Non si ripeterà."`,                                                                    effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Giusto. Ho gestito male i tempi. Non accadrà più."`,                                           effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Capisco. Posso sapere se ci sono altre scadenze critiche in arrivo?"`,                         effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `"Ha ragione. Me ne scuso. Posso recuperare in qualche modo?"`,                                  effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Tre giorni di ritardo su un'intera sessione. Direi che il bilancio regge."`,                   effetti: { rep: -2 } },
          ]
        },
      ],

      teso: [
        {
          id: 'bo_t01',
          contesto: 'Ostk è seduto alla scrivania con un registro aperto davanti.',
          testo: `"Il tuo accesso alla sezione Est risulta non autorizzato per due occasioni consecutive. Voglio sapere perché."`,
          risposte: [
            { tono: 'diretto',  testo: `"Avevo bisogno di consultare dei testi. Non ho fatto richiesta formale — è stato un errore."`,                  effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"In entrambi i casi si trattava di studio autonomo. Non sapevo che la sezione richiedesse autorizzazione specifica."`, effetti: { rep: 0 } },
            { tono: 'cauto',   testo: `"Posso spiegare la ragione pratica di ciascun accesso, se è utile."`,                                          effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `"Non sapevo fosse necessaria un'autorizzazione separata."`,                                                    effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"La sezione non sembrava esplicitamente off-limits."`,                                                         effetti: { rep: -2 } },
          ]
        },
        {
          id: 'bo_t02',
          contesto: 'Ostk ti consegna un foglio senza guardarlo. Poi si ferma.',
          testo: `"Il tuo profilo di presenze è accettabile. Solo accettabile. Il prossimo semestre fallo diventare regolare."`,
          risposte: [
            { tono: 'diretto',  testo: `"Capito. Lo farò."`,                                                                                           effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Prendo nota. Ci sarà un miglioramento."`,                                                                     effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Avete ragione. È stato un semestre complicato, ma non è una scusa."`,                                         effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Ci sono state alcune sovrapposizioni di impegni. Posso chiedervi se c'è un modo per gestirle meglio?"`,        effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `Prendi il foglio e annuisci.`,                                                                                 effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bo_t03',
          contesto: 'Ostk ti convoca per un chiarimento su una richiesta insolita.',
          testo: `"Hai fatto richiesta di accesso alla sezione est fuori dall'orario standard. Questo tipo di richiesta richiede una motivazione documentata."`,
          risposte: [
            { tono: 'diretto',  testo: `"Ho bisogno di consultare un testo specifico per un approfondimento che non posso fare durante le ore standard."`, effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Stavo preparando un lavoro aggiuntivo su indicazione di un docente. Posso fornire la documentazione necessaria."`, effetti: { rep: 0 } },
            { tono: 'cauto',   testo: `"Qual è la procedura corretta per questo tipo di richiesta? Voglio farlo nel modo giusto."`,                    effetti: { rep: -1, sblocca: 'bo_t03_c' } },
            { tono: 'amichevole',  testo: `"Ha ragione — non sapevo che richiedesse documentazione. Come si procede?"`,                                    effetti: { rep:  0 } },
            { tono: 'elusivo',  testo: `"Stavo solo cercando un posto tranquillo per studiare."`,                                                      effetti: { rep: -3 } },
          ]
        },
        {
          id: 'bo_t04',
          contesto: 'Brennar Ostk vi convoca brevemente nell\'area amministrativa. Non è un incontro programmato.',
          testo: `"C'è un problema logistico che riguarda il vostro gruppo di studio. Non è grave, ma richiede una soluzione entro domani. Chi ha preso la decisione di usare quella sala senza prenotazione?"`,
          risposte: [
            { tono: 'diretto',    testo: `"Io. Non sapevo che richiedesse prenotazione. Come si risolve?"`,                               effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non ero al corrente del problema. Cosa serve per risolverlo?"`,                               effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"La decisione è stata condivisa. Possiamo sistemare adesso?"`,                                  effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"È stato un errore di coordinamento. Come possiamo rimediare?"`,                               effetti: { rep: +1 } },
            { tono: 'elusivo',    testo: `"Non ricordo esattamente come si è deciso."`,                                                   effetti: { rep: -2 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'bo_n01',
          contesto: 'Ostk ti intercetta nell\'atrio con l\'aria di chi ha già tre cose da fare.',
          testo: `"Hai ricevuto l'aggiornamento sugli orari del secondo semestre?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Sì. Ho già rivisto il mio piano di studio."`,                                                                 effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"L'ho ricevuto. C'è una variazione che vorrei chiarire, se avete un momento."`,                                effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Sì, anche se una delle sovrapposizioni mi crea qualche problema."`,                                           effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                                        effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"L'ho ricevuto. Posso chiedervi perché è cambiato il martedì pomeriggio?"`,                                    effetti: { rep:  0, sblocca: 'bo_n01_cu' } },
          ]
        },
        {
          id: 'bo_n02',
          contesto: 'Ostk è appoggiato a un pilastro del cortile con un bicchiere in mano. Ti nota.',
          testo: `"Non ti avevo visto fuori prima d'ora."`,
          risposte: [
            { tono: 'diretto',  testo: `"Di solito studio dentro. Oggi avevo bisogno di aria."`,                                                       effetti: { rep: +3 } },
            { tono: 'amichevole',  testo: `"Neanche io vi avevo visto fuori. È una buona sorpresa."`,                                                     effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Ogni tanto."`,                                                                                                effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Venite spesso qui durante le pause?"`,                                                                        effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Mi sono accorto anch'io che esiste un cortile. Rivelazione recente."`,                                        effetti: { rep: -1 } },
          ]
        },
        {
          id: 'bo_n03',
          contesto: 'Ostk ti trova prima che tu lo cerchi.',
          testo: `"Il conflitto di orario nella tua scheda è risolto. Ho spostato la sessione del giovedì. Controlla il registro."`,
          risposte: [
            { tono: 'diretto',  testo: `"Grazie. Era un problema concreto."`,                                                                          effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Vi ringrazio. Apprezzo la rapidità."`,                                                                        effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Non me lo aspettavo così presto. Grazie davvero."`,                                                           effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Come avete fatto a risolvere il conflitto? Pensavo che quella sessione fosse inamovibile."`,                   effetti: { rep:  0, sblocca: 'bo_n03_cu' } },
            { tono: 'distaccato', testo: `"Controllato. Grazie."`,                                                                                       effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'bo_p01',
          contesto: 'Ostk ti consegna una lista scritta a mano.',
          testo: `"Ho bisogno che qualcuno consegni questo ai docenti elencati entro pranzo. Nessuna spiegazione necessaria — solo consegna. Puoi farlo?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Sì. Entro pranzo."`,                                                                                          effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Certamente. C'è qualcosa che devo comunicare verbalmente insieme alla lista?"`,                               effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Certo. Serve altro?"`,                                                                                        effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Posso chiedervi perché proprio a me?"`,                                                                       effetti: { rep:  0, sblocca: 'bo_p01_cu' } },
            { tono: 'cauto',   testo: `"Lo faccio. Devo solo consegnare, niente altro?"`,                                                             effetti: { rep: -1 } },
          ]
        },
        {
          id: 'bo_p02',
          contesto: 'Ostk ti incrocia nell\'atrio. Non rallenta, ma dice senza girare la testa.',
          testo: `"Quella cosa della scorsa settimana. L'hai gestita bene."`,
          risposte: [
            { tono: 'diretto',  testo: `"Grazie."`,                                                                                                    effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Sono contento che sia stata utile."`,                                                                         effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È il miglior complimento che abbia ricevuto questa settimana."`,                                              effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Annuisci mentre passa.`,                                                                                       effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Stavo cominciando a chiedermi se lo aveste notato."`,                                                         effetti: { rep: -1 } },
          ]
        },
        {
          id: 'bo_p03',
          contesto: 'Ostk si siede — cosa rara — e ti guarda con l\'espressione di chi ha deciso di investire un quarto d\'ora.',
          testo: `"Vuoi capire come funziona davvero questo posto dal punto di vista pratico, o preferisci continuare a scoprirlo per tentativi?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Spiegatemelo."`,                                                                                              effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Da dove cominciate?"`,                                                                                        effetti: { rep:  0, sblocca: 'bo_p03_cu' } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare."`,                                                                                  effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Preferisco capirlo da voi, senza dubbio."`,                                                                   effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"I tentativi finora non sono andati malissimo, ma ascolto."`,                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'bo_p04',
          contesto: 'Brennar Ostk vi ferma nell\'area amministrativa con un foglio in mano — non è una comunicazione standard.',
          testo: `"Ho visto la vostra proposta per il progetto esteso. È strutturata bene." Lo dice come se fosse un dato, non un complimento. "Presentatela al Senato nella prossima sessione."`,
          risposte: [
            { tono: 'formale',    testo: `"Grazie. Saremo pronti per la presentazione."`,                                                  effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Capito. Cosa devo preparare in aggiunta?"`,                                                    effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Apprezzo la valutazione. Ci sono aspetti da rafforzare prima della presentazione?"`,           effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Grazie. Non me lo aspettavo."`,                                                                effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'bo_mp01',
          contesto: 'Ostk ti trova con un\'espressione che non è arrabbiata con te.',
          testo: `"C'era una segnalazione sul tuo conto. L'ho letta. Non reggeva. L'ho archiviata."`,
          risposte: [
            { tono: 'diretto',  testo: `"Grazie. So da chi viene?"`,                                                                                   effetti: { rep: +3, sblocca: 'bo_mp01_di' } },
            { tono: 'formale',   testo: `"Vi ringrazio. Posso chiedervi su cosa si basava?"`,                                                           effetti: { rep:  0, sblocca: 'bo_mp01_f' } },
            { tono: 'amichevole',  testo: `"Non sapevo nemmeno ci fosse. Apprezzo che ve ne siate occupato."`,                                            effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Posso chiedervi cosa conteneva?"`,                                                                            effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `"Capito. Grazie."`,                                                                                            effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bo_mp02',
          contesto: 'Ostk è alla scrivania, ma stavolta non ha documenti davanti.',
          testo: `"Fino a che grado pensi di arrivare?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Il più in alto possibile. Non ho ancora un limite in mente."`,                                                effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Non ho ancora definito un obiettivo preciso. Sto valutando."`,                                                effetti: { rep:  0 } },
            { tono: 'cauto',   testo: `"Dipende da molte cose. Ma ho intenzione di restare a lungo."`,                                                effetti: { rep: -1 } },
            { tono: 'curioso',  testo: `"Perché ce lo chiedete?"`,                                                                                     effetti: { rep:  0, sblocca: 'bo_mp02_cu' } },
            { tono: 'amichevole',  testo: `"È una domanda che mi faccio spesso anch'io. Non ho ancora una risposta."`,                                    effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bo_mp03',
          contesto: 'Ostk ti mostra una piantina dell\'accademia con alcune aree segnate.',
          testo: `"Sto valutando di spostare due sessioni pratiche in spazi diversi. Tu ci lavori dentro ogni giorno — dove funziona e dove no?"`,
          risposte: [
            { tono: 'diretto',  testo: `"La sala ovest ha problemi di acustica quando sono in più di dieci. La sala nord è meglio."`,                  effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Posso chiedervi perché state valutando lo spostamento? Dipende dalla risposta."`,                             effetti: { rep:  0, sblocca: 'bo_mp03_cu' } },
            { tono: 'formale',   testo: `"Posso darvi un'osservazione per ciascuna delle aree segnate, se è utile."`,                                   effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Finalmente qualcuno lo chiede agli studenti. La sala est ha un problema col pavimento."`,                      effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non ho osservazioni particolari."`,                                                                           effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'bo_e01',
          trigger: 'visita_vael',
          contesto: 'Ostk ti ferma nel corridoio con un tono che non ammette rallentamenti.',
          testo: `"Nei prossimi tre giorni l'accademia ospita una visita esterna di rilievo. Nessuna variazione ai tuoi orari, ma evita le aree amministrative senza motivo."`,
          risposte: [
            { tono: 'diretto',  testo: `"Capito. Nessun problema."`,                                                                                   effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Provvederò. C'è qualcosa che posso fare per facilitare la gestione?"`,                                        effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Posso chiedervi di che tipo di visita si tratta?"`,                                                           effetti: { rep:  0, sblocca: 'bo_e01_cu' } },
            { tono: 'cauto',   testo: `"Eviterò quelle aree. C'è qualcos'altro che dovrei sapere?"`,                                                  effetti: { rep: -1 } },
            { tono: 'amichevole',  testo: `"Nessun problema. Se serve una mano con qualcosa, sono disponibile."`,                                         effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bo_e02',
          trigger: 'fine_anno',
          contesto: 'Ostk ti vede caricare qualcosa vicino all\'uscita. Si ferma un secondo.',
          testo: `"Torni al prossimo semestre?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Sì."`,                                                                                                        effetti: { rep: +3 } },
            { tono: 'amichevole',  testo: `"Certamente. Ci conto."`,                                                                                      effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Dipende da quante pratiche aperte mi lasciate."`,                                                             effetti: { rep: -1 } },
            { tono: 'formale',   testo: `"Sì, Alto Maestro. A meno di imprevisti."`,                                                                    effetti: { rep:  0 } },
            { tono: 'cauto',   testo: `"Sì. Perché lo chiedete?"`,                                                                                    effetti: { rep: -1, sblocca: 'bo_e02_c' } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // LC — LIVIA CAURO | Alto Maestro | (45+)
  // Elegante, calibrata, mai una parola di troppo
  // Giocatore usa: Voi
  // ============================================================
  liviaCauro: {

    voicelines: [
      { id: 'lc_v01', contesto: 'intro_seria', testo: `"Quello che sto per dirti non esce da questa stanza. Te lo chiedo prima di cominciare."` },
      { id: 'lc_v02', contesto: 'intro_seria', testo: `"Ci sono conversazioni che si ricordano. Questa sarà una di quelle — almeno per te. Siediti."` },
      { id: 'lc_v03', contesto: 'intro_seria', testo: `"Non ti chiedo di capire subito. Ti chiedo solo di ascoltare fino in fondo prima di rispondere."` },
      { id: 'lc_v04', contesto: 'arrivo_ospiti', testo: `"Gli ospiti arriveranno tra venti minuti. Posizioni, per favore."` },
      { id: 'lc_v05', contesto: 'congedo_ospiti', testo: `"La visita si è conclusa nei tempi. Grazie a tutti per la compostezza."` },
    ],

    primoIngresso: [
      {
        id: 'lc_pi01',
        contesto: 'Livia Cauro ti accoglie nell\'ingresso principale con la cortesia misurata di chi ha trasformato la cortesia in una tecnica.',
        testo: `"Benvenuto/a all'Accademia di Elenthyr." Una pausa calibrata. "Il vostro nome, prima di tutto."`,
        risposte: [
          { tono: 'formale',    testo: `Vi presentate con nome e provenienza, mantenendo il registro che lei ha impostato.`,                                effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `Date il vostro nome e la osservate — c'è qualcosa nel modo in cui ascolta che suggerisce stia valutando più del semplice suono.`, effetti: { rep: +1 } },
          { tono: 'curioso',    testo: `"Grazie, Alto Maestro. Posso chiederle cosa ci sia dinnanzi a noi nelle prossime settimane?"`,                     effetti: { rep: +1 } },
          { tono: 'amichevole', testo: `Vi presentate calorosamente e dite che siete felici di essere arrivati. Il sorriso di Cauro non cambia.`,          effetti: { rep: -1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'lc_o01',
          contesto: 'Cauro ti raggiunge in un corridoio laterale dopo un evento con ospiti.',
          testo: `"Il tuo comportamento di stamattina era inappropriato per il contesto. Non ti chiedo di capire la diplomazia — ti chiedo di non ostacolarla."`,
          risposte: [
            { tono: 'formale',   testo: `"Comprendo. Non accadrà di nuovo."`,                                                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non era mia intenzione creare difficoltà. Posso chiedervi cosa esattamente è risultato inappropriato?"`,       effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Avete ragione. Non avevo valutato il peso del contesto."`,                                                    effetti: { rep:  0 } },
            { tono: 'elusivo',  testo: `"Non pensavo che la mia presenza fosse così rilevante in quel momento."`,                                      effetti: { rep: -2 } },
            { tono: 'ironico',   testo: `"La diplomazia ha standard più alti di quanto immaginassi."`,                                                  effetti: { rep: -2, chiudeDialogo: true } },
          ]
        },
        {
          id: 'lc_o02',
          contesto: 'Cauro ti incrocia con un sorriso che non arriva agli occhi.',
          testo: `"Ti vedo spesso nelle aree sbagliate nei momenti sbagliati. Non è ancora un problema. Ma lo diventa facilmente."`,
          risposte: [
            { tono: 'formale',   testo: `"Capisco l'avvertimento. Lo terrò presente."`,                                                                 effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non era mia intenzione. C'è un modo corretto per muoversi in queste aree?"`,                                  effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `La guardi senza rispondere, cercando di capire quanto sia seria.`,                                             effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Potete dirmi esattamente quali aree dovrei evitare?"`,                                                        effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"È un avvertimento o un consiglio?"`,                                                                          effetti: { rep: -2 } },
          ]
        },
        {
          id: 'lc_o03',
          contesto: 'Livia Cauro vi incontra durante una visita esterna. Vi guarda un momento in più del necessario prima di parlare.',
          testo: `"Ho notato la vostra presenza in quest'area durante la visita. Non era prevista." Non è aggressiva — è la registrazione di un fatto. "Vorreste spiegarmi come mai?"`,
          risposte: [
            { tono: 'formale',    testo: `"Mi scuso. Non ero al corrente della limitazione per oggi. Me ne vado subito."`,               effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Avevo un appuntamento in questa ala — ma non ero a conoscenza della visita."`,                effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Ho capito male il perimetro delle aree accessibili oggi. Mi scuso."`,                         effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Chiedo scusa. Mi allontano."`,                                                                 effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"È una domanda o un invito a sparire nel modo più ordinato possibile?"`,                       effetti: { rep: -2 } },
          ]
        },
      ],

      teso: [
        {
          id: 'lc_t01',
          contesto: 'Cauro ti raggiunge a evento concluso, quando la sala è quasi vuota.',
          testo: `"Durante la cerimonia hai commesso tre piccoli errori di protocollo. Separatamente, irrilevanti. Insieme, raccontano qualcosa."`,
          risposte: [
            { tono: 'formale',   testo: `"Avete ragione. Devo prestare più attenzione ai dettagli formali."`,                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Cosa raccontano, secondo voi?"`,                                                                              effetti: { rep: +1, sblocca: 'lc_t01_c' } },
            { tono: 'diretto',  testo: `"Che non conosco ancora bene il protocollo. È una lacuna che posso colmare."`,                                 effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Non me ne ero accorto."`,                                                                                     effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Apprezzo che me lo diciate direttamente. Dove devo migliorare?"`,                                             effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lc_t02',
          contesto: 'Cauro è seduta con le mani appoggiate al tavolo. Nessun documento davanti.',
          testo: `"Ho ricevuto alcune osservazioni sul tuo conto da parte di figure esterne. Non sono gravi. Ma esistono."`,
          risposte: [
            { tono: 'formale',   testo: `"Posso chiedervi la natura di queste osservazioni?"`,                                                          effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non sapevo di essere stato notato in quel senso. Posso sapere in quale contesto?"`,                            effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa devo cambiare?"`,                                                                                        effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Osservazioni in che direzione?"`,                                                                             effetti: { rep: -1 } },
          ]
        },
        {
          id: 'lc_t03',
          contesto: 'Cauro ti trova in corridoio con l\'espressione di chi ha aspettato il momento giusto.',
          testo: `"Hai un modo di occupare gli spazi che non sempre è appropriato al contesto. Non è maleducazione — è mancanza di lettura dell'ambiente. Si corregge."`,
          risposte: [
            { tono: 'formale',   testo: `"Avete ragione. Come si sviluppa questa capacità di lettura?"`,                                                effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non ne ero consapevole. Può darmi un esempio concreto di quello che ha notato?"`,                             effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Capito. Osserverò di più prima di muovermi."`,                                                                effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Ascolti senza difenderti.`,                                                                                    effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Non mi era sembrato fuori luogo in quel momento."`,                                                           effetti: { rep: -2 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'lc_n01',
          contesto: 'Cauro ti nota mentre attraversi l\'ingresso nel momento meno opportuno. Ti ferma. Quando gli ospiti passano, dice:',
          testo: `"Puoi andare."`,
          risposte: [
            { tono: 'formale',   testo: `"Vi ringrazio per l'avviso."`,                                                                                 effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Capito. Devo evitare questo corridoio durante le visite?"`,                                                   effetti: { rep: +1, sblocca: 'lc_n01_c' } },
            { tono: 'diretto',  testo: `"C'è un modo per sapere quando queste visite sono in corso?"`,                                                 effetti: { rep:  0, sblocca: 'lc_n01_di' } },
            { tono: 'distaccato', testo: `Annuisci e prosegui.`,                                                                                         effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Chi erano?"`,                                                                                                 effetti: { rep: -1 } },
          ]
        },
        {
          id: 'lc_n02',
          contesto: 'Cauro ti trova nell\'atrio con l\'aria di chi ha un minuto esatto da dedicarti.',
          testo: `"Hai domande su come funziona il rapporto tra l'accademia e il mondo esterno? Lo chiedo perché la tua posizione vicino alla sala di ricevimento questa mattina suggeriva curiosità."`,
          risposte: [
            { tono: 'formale',   testo: `"Sì. Non conoscevo l'estensione dei rapporti istituzionali dell'accademia."`,                                  effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Sì. Con quante istituzioni esterne intrattiene rapporti l'accademia?"`,                                       effetti: { rep: -1, sblocca: 'lc_n02_cu' } },
            { tono: 'cauto',   testo: `"Non volevo essere indiscreto. Ma sì, sono curioso."`,                                                         effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Cosa posso sapere e cosa no?"`,                                                                           effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Era curiosità generica. Non cerco informazioni riservate."`,                                                  effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lc_n03',
          contesto: 'Cauro è in piedi vicino all\'ingresso del cortile. Ti nota e non si sposta.',
          testo: `"Non capita spesso di avere dieci minuti senza nessuno che aspetta una risposta."`,
          risposte: [
            { tono: 'formale',   testo: `"Immagino. Non voglio disturbare."`,                                                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Ti fermi a distanza rispettosa. "Godeteveli, allora."`,                                                        effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"È raro che lo dica ad alta voce."`,                                                                           effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `Annuisci e prosegui verso il cortile.`,                                                                        effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Li meriterebbe di più, direi."`,                                                                              effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lc_t03',
          contesto: 'Livia Cauro vi trova con un documento che non dovrebbe essere in vostra circolazione in questa fase.',
          testo: `"Questo documento non dovrebbe essere in vostro possesso adesso. Non perché sia riservato — perché la sua circolazione ha tempi precisi." Una pausa. "Come l'avete ottenuto?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Non sapevo ci fossero tempistiche specifiche. Posso restituirlo adesso?"`,                    effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Me lo ha dato qualcuno che pensava fosse già di dominio comune. Non ero al corrente del protocollo."`, effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Ero convinto fosse accessibile. Mi spiegate il problema?"`,                                   effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Posso restituirlo."`,                                                                          effetti: { rep: +1 } },
            { tono: 'elusivo',    testo: `"Circolava. Non so esattamente da dove."`,                                                      effetti: { rep: -2 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'lc_p01',
          contesto: 'Cauro ti trova con un giorno di anticipo rispetto alla visita.',
          testo: `"Domani ci sarà una visita. Vorrei che tu fossi presente nell'atrio tra le dieci e le undici. Non devi fare nulla — solo essere lì, comportarti bene e osservare."`,
          risposte: [
            { tono: 'formale',   testo: `"Ci sarò. C'è qualcosa di specifico a cui prestare attenzione?"`,                                             effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Posso chiedervi perché volete che io sia presente?"`,                                                         effetti: { rep: +1, sblocca: 'lc_p01_c' } },
            { tono: 'diretto',  testo: `"Ci sarò. Devo sapere qualcosa sugli ospiti?"`,                                                                effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Di che tipo di visita si tratta?"`,                                                                           effetti: { rep: -1, sblocca: 'lc_p01_cu' } },
            { tono: 'amichevole',  testo: `"Capito. Mi fido del vostro giudizio su cosa significa comportarsi bene."`,                                    effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lc_p02',
          contesto: 'Cauro ti raggiunge con lo stesso passo di sempre, ma qualcosa nel tono è diverso.',
          testo: `"Stamattina hai fatto esattamente quello che serviva senza che nessuno te lo chiedesse. È più raro di quanto sembri."`,
          risposte: [
            { tono: 'formale',   testo: `"Ho cercato di leggere il contesto nel modo giusto."`,                                                         effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non ero sicuro di stare facendo la cosa giusta. Sono contento che fosse così."`,                              effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Ho osservato e ho agito di conseguenza."`,                                                                    effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"C'è qualcosa che avrei potuto fare meglio?"`,                                                                 effetti: { rep:  0, sblocca: 'lc_p02_cu' } },
            { tono: 'amichevole',  testo: `"È un bel complimento, venendo da voi."`,                                                                      effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lc_p03',
          contesto: 'Cauro si siede di fronte a te con la precisione di chi ha già deciso quanto tempo dedicare.',
          testo: `"Hai assistito alla visita di ieri. Vuoi sapere cosa stava succedendo davvero?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Cosa non era quello che sembrava?"`,                                                                      effetti: { rep: -1, sblocca: 'lc_p03_cu' } },
            { tono: 'formale',   testo: `"Sì. Sarebbe utile capire la struttura di questi incontri."`,                                                  effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sì, se ritenete che sia utile per me saperlo."`,                                                              effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Dal mio punto di vista sembrava una visita di cortesia. Ma probabilmente non lo era."`,                   effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Se volete spiegarmelo, ascolto."`,                                                                            effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lc_p03',
          contesto: 'Livia Cauro vi ferma in corridoio durante una pausa tra impegni istituzionali. Si ferma come se avesse deciso di farlo solo in questo momento.',
          testo: `"Ho apprezzato come avete gestito la situazione con l'ospite la settimana scorsa. Non era semplice e non avevate esperienza diretta." Una pausa misurata. "Il vostro giudizio è stato appropriato."`,
          risposte: [
            { tono: 'formale',    testo: `"Grazie. Ho seguito il protocollo nella misura in cui lo conoscevo."`,                         effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Apprezzo che lo diate. C'era qualcosa che avrei potuto fare meglio?"`,                       effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Grazie. Mi fa piacere che lo notiate."`,                                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                    effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'lc_mp01',
          contesto: 'Cauro ti consegna un foglio scritto a mano con alcune note.',
          testo: `"Tra due settimane ci sarà un evento a cui parteciperanno figure di rilievo. Ho pensato che potresti avere un ruolo più attivo. Leggi queste note e dimmi se hai domande."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo farò con attenzione. Posso venire da voi se qualcosa non è chiaro?"`,                                      effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Capito. Volete che vi riferisca le mie impressioni dopo averle lette?"`,                                      effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Lo leggo oggi. Cosa vi aspettate da me esattamente?"`,                                                        effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Che tipo di ruolo state considerando?"`,                                                                      effetti: { rep: -1 } },
            { tono: 'amichevole',  testo: `"Mi fido del fatto che abbiate pensato a me per questo."`,                                                     effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lc_mp02',
          contesto: 'Cauro ti guarda un momento più a lungo del solito prima di parlare.',
          testo: `"La maggior parte delle persone in questo posto non capisce che le relazioni esterne non sono accessori — sono struttura. Tu hai cominciato a capirlo. Non so ancora se per istinto o per metodo."`,
          risposte: [
            { tono: 'formale',   testo: `"Per entrambi, spero. È una distinzione che vale la pena colmare."`,                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non saprei dirvi con certezza. Forse è la stessa cosa, alla fine."`,                                          effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Per osservazione. Ho guardato come vi muovete voi."`,                                                         effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Fa differenza, per voi, quale dei due sia?"`,                                                                 effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `"Non ci avevo riflettuto in questi termini."`,                                                                 effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lc_mp03',
          contesto: 'Cauro ti trova alla fine di una giornata diplomaticamente complicata. Per la prima volta sembra leggermente meno composta.',
          testo: `"È andata. Non come previsto, ma è andata."`,
          risposte: [
            { tono: 'formale',   testo: `"Sono contento che si sia risolta. C'è qualcosa che posso fare per il seguito?"`,                              effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Come state?"`,                                                                                                effetti: { rep: +1, sblocca: 'lc_mp03_c' } },
            { tono: 'diretto',  testo: `"Cosa è andato storto rispetto al piano?"`,                                                                    effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Lo si vedeva che era una giornata difficile. È andata davvero bene."`,                                        effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Sono contento."`,                                                                                             effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'lc_e01',
          trigger: 'arrivo_vael',
          contesto: 'Cauro ti intercetta prima che tu possa avvicinarti all\'ingresso.',
          testo: `"L'ospite che sta arrivando non è qui per l'accademia in senso accademico. Mantieni distanza rispettosa e non iniziare conversazioni."`,
          risposte: [
            { tono: 'formale',   testo: `"Capito. Mi farò da parte."`,                                                                                  effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"C'è qualcosa che dovrei sapere nel caso incrociassi lo sguardo con lei?"`,                                    effetti: { rep: +1, sblocca: 'lc_e01_c' } },
            { tono: 'diretto',  testo: `"Capito. Posso restare nell'atrio o è meglio che vada altrove?"`,                                              effetti: { rep:  0, sblocca: 'lc_e01_di' } },
            { tono: 'curioso',  testo: `"Posso chiedervi da dove viene e cosa rappresenta?"`,                                                          effetti: { rep: -1, sblocca: 'lc_e01_cu' } },
            { tono: 'distaccato', testo: `Annuisci e ti allontani senza aggiungere altro.`,                                                              effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lc_e02',
          trigger: 'fine_semestre',
          contesto: 'Cauro ti incrocia mentre i corridoi si svuotano. Si ferma.',
          testo: `"Un semestre è una quantità di informazioni. La maggior parte degli studenti non sa cosa farsene. Tu stai imparando a usarle."`,
          risposte: [
            { tono: 'formale',   testo: `"È il tipo di apprendimento che non finisce. Lo so già."`,                                                     effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Spero di non avervi deluso nei momenti in cui non ero sicuro di cosa fare."`,                                 effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Ho cercato di osservare più che di parlare. Sembra aver funzionato."`,                                        effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Cosa vedete in me che vi porta a dirlo?"`,                                                                    effetti: { rep: -1, sblocca: 'lc_e02_cu' } },
            { tono: 'amichevole',  testo: `"È uno dei complimenti più insoliti che abbia ricevuto. Lo tengo."`,                                           effetti: { rep:  0 } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // SD — SEVAN DRATH | Alto Maestro, Rituali | (55+)
  // Lenta, cerimoniale, carica di peso
  // Giocatore usa: Voi
  // ============================================================
  sevanDrath: {

    voicelines: [
      { id: 'sd_v01', contesto: 'intro_seria', testo: `"C'è qualcosa che devo dirti. Non l'ho detto prima perché il momento non era pronto. Adesso lo è."` },
      { id: 'sd_v02', contesto: 'intro_seria', testo: `"Siediti. Non in fretta — siediti davvero."` },
      { id: 'sd_v03', contesto: 'intro_seria', testo: `"Quello che sto per dirti va ascoltato in silenzio. Rispondi solo quando hai finito di pensare."` },
      { id: 'sd_v04', contesto: 'inizio_lezione', testo: `"Entrate. Lasciate fuori quello che non riguarda questo luogo."` },
      { id: 'sd_v05', contesto: 'fine_lezione',   testo: `"La sessione è conclusa. Quello che non avete capito oggi — portatelo con voi. Tornerà."` },
      { id: 'sd_v06', contesto: 'promozione_esperto', testo: `"Il rituale non perdona chi si avvicina a esso per convenienza. Chi raggiunge questo grado ha dimostrato qualcosa che va oltre la tecnica. Non lo dimenticate nelle settimane che verranno."` },
      { id: 'sd_v07', contesto: 'promozione_esperto', testo: `"Esperto. Il suono di quel titolo è diverso, qui, in questa sala. Cercate di tenerlo a mente la prossima volta che entrerete."` },
    ],

    primoIngresso: [
      {
        id: 'sd_pi01',
        contesto: 'Sevan Drath è nella Sala Rituale quando entri per la prima volta — non ti aspettavi di trovare qualcuno. Ti guarda senza muoversi. Il silenzio in questa stanza ha un peso che non hai ancora imparato a misurare.',
        testo: `Silenzio. Poi, senza alzare la voce: "Nuovo."`,
        risposte: [
          { tono: 'formale',    testo: `Vi presentate e spiegate che siete venuti a familiarizzare con il luogo prima delle lezioni.`,                      effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `Vi presentate brevemente e aspettate — consapevoli che il silenzio in questa stanza va rispettato in modo diverso.`, effetti: { rep: +2 } },
          { tono: 'curioso',    testo: `"Sì. Non sapevo che ci fosse già qualcuno. Disturbo?"`,                                                            effetti: { rep: +1 } },
          { tono: 'distaccato', testo: `Date il vostro nome e rimanete fermi senza aggiungere altro.`,                                                     effetti: { rep: +1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'sd_o01',
          contesto: 'Drath ti aspetta fuori dalla Sala Rituale con la stessa immobilità di una statua.',
          testo: `"Quello che hai fatto oggi in questa sala non era un errore tecnico. Era mancanza di rispetto verso qualcosa che non capisci ancora. La differenza è importante."`,
          risposte: [
            { tono: 'formale',   testo: `"Avete ragione. Non avevo compreso il peso di quello che stavo facendo."`,                                     effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Posso chiedervi cosa esattamente ho mancato di rispettare? Voglio capirlo davvero."`,                          effetti: { rep: +2, sblocca: 'sd_o01_c' } },
            { tono: 'distaccato', testo: `Ascolti in silenzio, senza difenderti.`,                                                                       effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Capito. Non si ripeterà."`,                                                                                   effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Non era mia intenzione. Mi dispiace davvero."`,                                                               effetti: { rep: -2 } },
          ]
        },
        {
          id: 'sd_o02',
          contesto: 'Drath ti incrocia e si ferma. Non dice niente subito.',
          testo: `"Stai portando qualcosa in questa accademia che non sai ancora di portare. Non è un complimento."`,
          risposte: [
            { tono: 'formale',   testo: `"Posso chiedervi cosa intendete?"`,                                                                            effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Rimani in silenzio un momento. "Voglio capire cosa vedete."`,                                                  effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Lo guardi senza rispondere, aspettando che prosegua.`,                                                         effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa sto portando, secondo voi?"`,                                                                            effetti: { rep: -1 } },
            { tono: 'diretto',  testo: `"Ditemi cosa devo cambiare."`,                                                                                 effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sd_o03',
          contesto: 'Drath vi osserva durante una sessione pratica senza intervenire. Alla fine si avvicina.',
          testo: `"Avete la tecnica. Manca qualcos'altro." Si ferma lì — non spiega.`,
          risposte: [
            { tono: 'cauto',      testo: `"Ne sono consapevole. Sto cercando di trovarlo."`,                                               effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Posso chiedervi cosa manca, esattamente?"`,                                                     effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Ditemi dove guardare."`,                                                                        effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Come lo riconoscerete quando lo trovate?"`,                                                     effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Annuisci senza rispondere. Ci pensereste dopo.`,                                                 effetti: { rep: +1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'sd_t01',
          contesto: 'La sala è vuota. Drath è rimasto immobile vicino alla parete per tutta la sessione. Ora si avvicina lentamente.',
          testo: `"Hai eseguito la sequenza. Ma non eri presente."`,
          risposte: [
            { tono: 'formale',   testo: `"Avete ragione. La mia concentrazione non era dove doveva essere."`,                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Cosa significa essere presenti, in questo contesto? Voglio capire la distinzione."`,                           effetti: { rep: +2, sblocca: 'sd_t01_c' } },
            { tono: 'distaccato', testo: `"Lo so."`,                                                                                                     effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Come si corregge?"`,                                                                                          effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"È una cosa che si impara o si trova?"`,                                                                       effetti: { rep: -1, sblocca: 'sd_t01_cu' } },
          ]
        },
        {
          id: 'sd_t02',
          contesto: 'Drath è nella Sala Rituale quando arrivi. Non si volta. "Siediti." Poi, dopo un lungo silenzio:',
          testo: `"Stai studiando i rituali come se fossero procedure. Non lo sono."`,
          risposte: [
            { tono: 'formale',   testo: `"Come dovrei studiarli, secondo voi?"`,                                                                        effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Aspetti che continui, senza interrompere il silenzio.`,                                                        effetti: { rep: +2, sblocca: 'sd_t02_c' } },
            { tono: 'distaccato', testo: `"Ascolto."`,                                                                                                   effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa sono, allora?"`,                                                                                         effetti: { rep: -1, sblocca: 'sd_t02_cu' } },
            { tono: 'diretto',  testo: `"Come cambio l'approccio?"`,                                                                                   effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sd_t03',
          contesto: 'A metà sessione, Drath si avvicina senza che tu lo abbia sentito. "Fermati." Aspetta che tu lo faccia.',
          testo: `"Guarda quello che hai appena tracciato. Dimmi cosa vedi."`,
          risposte: [
            { tono: 'formale',   testo: `"Vedo una sequenza incompleta nel terzo segmento. L'angolazione non è corretta."`,                             effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Osservi a lungo. "Qualcosa non è simmetrico. Ma non riesco a individuare esattamente dove."`,                  effetti: { rep: +2, sblocca: 'sd_t03_c' } },
            { tono: 'curioso',  testo: `"Vedo l'errore tecnico. Ma ho la sensazione che non sia quello che volete che veda."`,                         effetti: { rep:  0, sblocca: 'sd_t03_cu' } },
            { tono: 'diretto',  testo: `"L'errore è nell'ultimo passaggio. Ho perso la concentrazione."`,                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Non lo vedo ancora."`,                                                                                        effetti: { rep: +1, sblocca: 'sd_t03_dis' } },
          ]
        },
        {
          id: 'sd_t04',
          contesto: 'Drath vi ferma mentre uscite dalla Sala Rituale. Il tono è più diretto del solito.',
          testo: `"La sessione di oggi era tecnicamente corretta. Ma state applicando una forma senza abitarla." Una pausa. "Sapete la differenza?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Non ancora. Ma la sentivo mentre facevo."`,                                                     effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Capisco la distinzione. Non so ancora come colmarla."`,                                         effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Come si abita una forma?"`,                                                                     effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Dimostratemi la differenza."`,                                                                  effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                          effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'sd_n01',
          contesto: 'Drath ti incrocia senza rallentare. Poi, quasi tra sé:',
          testo: `"Come procede lo studio?"`,
          risposte: [
            { tono: 'formale',   testo: `"Procede. Ci sono aspetti che non ho ancora inquadrato del tutto."`,                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Con qualche difficoltà. Ma sto cercando di affrontarla nel modo giusto."`,                                    effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Procede."`,                                                                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Lentamente su alcuni punti. Velocemente su altri."`,                                                          effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Posso chiedervi cosa intendete esattamente con quella domanda?"`,                                             effetti: { rep: -1 } },
          ]
        },
        {
          id: 'sd_n02',
          contesto: 'Drath è seduto su un muretto ai margini del cortile con gli occhi chiusi. Quando ti avvicini, parla senza aprirli.',
          testo: `"Siediti, se vuoi."`,
          risposte: [
            { tono: 'cauto',   testo: `Ti siedi a distanza rispettosa e stai in silenzio.`,                                                           effetti: { rep: +2, sblocca: 'sd_n02_c' } },
            { tono: 'formale',   testo: `Ti siedi e aspetti che sia lui a parlare, se lo ritiene opportuno.`,                                           effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Ti siedi senza dire niente.`,                                                                                  effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `Ti siedi. Dopo un momento: "Cosa state facendo?"`,                                                             effetti: { rep: -1 } },
            { tono: 'amichevole',  testo: `Ti siedi. "È un posto tranquillo, questo."`,                                                                   effetti: { rep: -2 } },
          ]
        },
        {
          id: 'sd_n03',
          contesto: 'Fine sessione collettiva. Drath si ferma mentre tutti escono e ti guarda rimanere.',
          testo: `"Hai una domanda. Non la stai facendo."`,
          risposte: [
            { tono: 'cauto',   testo: `"Sì. Non ero sicuro che fosse il momento."`,                                                                   effetti: { rep: +2, sblocca: 'sd_n03_c' } },
            { tono: 'formale',   testo: `"Sì. Posso chiederla adesso?"`,                                                                                effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Rimani in silenzio, confermando con uno sguardo.`,                                                             effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Come fa a saperlo?"`,                                                                                         effetti: { rep: -1 } },
            { tono: 'diretto',  testo: `"Sì. Cosa distingue un rituale riuscito da uno fallito quando il risultato sembra identico?"`,                  effetti: { rep:  0, sblocca: 'sd_n03_di' } },
          ]
        },
      ],

      positivo: [
        {
          id: 'sd_p01',
          contesto: 'Drath ti lascia un testo sul banco senza spiegazioni.',
          testo: `"Non è nel curriculum. Leggilo quando sei pronto, non prima."`,
          risposte: [
            { tono: 'formale',   testo: `"Come farò a sapere quando sono pronto?"`,                                                                     effetti: { rep: +2, sblocca: 'sd_p01_f' } },
            { tono: 'cauto',   testo: `Prendi il testo senza fare domande. Annuisci.`,                                                                effetti: { rep: +2, sblocca: 'sd_p01_c' } },
            { tono: 'curioso',  testo: `"Cosa contiene?"`,                                                                                             effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `Lo prendi e lo metti via.`,                                                                                    effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Lo leggerò con attenzione."`,                                                                                 effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sd_p02',
          contesto: 'Drath rimane immobile mentre gli altri escono. Quando la sala è vuota, dice senza voltarsi.',
          testo: `"Oggi eri presente."`,
          risposte: [
            { tono: 'formale',   testo: `"Ho cercato di portare in pratica quello che avete indicato."`,                                                effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Non rispondi subito. "Grazie."`,                                                                               effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci senza aggiungere altro.`,                                                                             effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Lo sentivo anch'io."`,                                                                                        effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"È diverso, quando succede. Come si mantiene?"`,                                                               effetti: { rep: -1, sblocca: 'sd_p02_cu' } },
          ]
        },
        {
          id: 'sd_p03',
          contesto: 'Drath ti trova nella biblioteca tardi. Si siede di fronte a te — cosa che non fa quasi mai.',
          testo: `"C'è una cosa sui rituali che non insegno in aula. Non perché sia proibita. Perché non serve a chi non è ancora pronto a sentirla."`,
          risposte: [
            { tono: 'cauto',   testo: `Chiudi il libro. Aspetti in silenzio.`,                                                                        effetti: { rep: +2, sblocca: 'sd_p03_c' } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare."`,                                                                                  effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa ve lo fa pensare che io lo sia adesso?"`,                                                                effetti: { rep:  0, sblocca: 'sd_p03_cu' } },
            { tono: 'distaccato', testo: `"Ascolto."`,                                                                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Ditemi."`,                                                                                                    effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sd_p04',
          contesto: 'Drath vi raggiunge in corridoio dopo una cerimonia di ascensione. Non è il tipo che si ferma senza motivo.',
          testo: `"Ho notato un cambiamento nell'approccio nell'ultimo mese. Non nella tecnica — in qualcosa di più difficile da nominare." Una pausa lunga. "Continuate così."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non sapevo che si vedesse."`,                                                                   effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Grazie. È un'osservazione che vale."`,                                                          effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa avete notato esattamente?"`,                                                               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Lo so anch'io. Non so ancora dove porta."`,                                                    effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci. È sufficiente.`,                                                                      effetti: { rep: +2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'sd_mp01',
          contesto: 'Drath ti guarda a lungo prima di parlare.',
          testo: `"Perché sei qui. Non in questa accademia — in questa sala, ogni volta che puoi esserci."`,
          risposte: [
            { tono: 'cauto',   testo: `Ci pensi davvero prima di rispondere. "Non lo so ancora con precisione. Ma quando sono qui qualcosa ha senso che fuori non ce l'ha."`, effetti: { rep: +2, sblocca: 'sd_mp01_c' } },
            { tono: 'formale',   testo: `"Perché è il luogo in cui sento che c'è qualcosa da capire che non si trova altrove."`,                        effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Perché quello che succede qui non assomiglia a nient'altro che ho studiato."`,                                 effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Perché voi lo chiedete?"`,                                                                                    effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `"Non lo so ancora."`,                                                                                          effetti: { rep: +1, sblocca: 'sd_mp01_dis' } },
          ]
        },
        {
          id: 'sd_mp02',
          contesto: 'Drath è immobile vicino alla finestra della Sala Rituale. Quando parla, sembra quasi che stia pensando ad alta voce.',
          testo: `"Ho imparato quello che insegno in un posto che non esiste più. Non per ragioni drammatiche — semplicemente non esiste più."`,
          risposte: [
            { tono: 'cauto',   testo: `Ascolti senza muoverti, senza fare domande.`,                                                                  effetti: { rep: +2, sblocca: 'sd_mp02_c' } },
            { tono: 'formale',   testo: `"Mi dispiace saperlo."`,                                                                                       effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa è rimasto di quel posto, oltre a quello che insegnate?"`,                                                effetti: { rep:  0, sblocca: 'sd_mp02_cu', narrativo: true } },
            { tono: 'distaccato', testo: `Rimani in silenzio.`,                                                                                          effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa insegnava quel posto che questo non insegna?"`,                                                          effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sd_mp03',
          contesto: 'Fine anno. Drath è solo nella sala quando ci entri. Non si volta.',
          testo: `"Un altro semestre."`,
          risposte: [
            { tono: 'cauto',   testo: `Ti fermi sulla soglia. "Sì. È cambiato qualcosa, in questa sala, da quando sono arrivato?"`,                   effetti: { rep: +2, sblocca: 'sd_mp03_c' } },
            { tono: 'formale',   testo: `"Sì. È stato diverso da quello che mi aspettavo, quando sono arrivato."`,                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Sì." Ti fermi un momento, poi te ne vai.`,                                                                    effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. E il prossimo sarà diverso ancora."`,                                                                     effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Voi li contatate, i semestri?"`,                                                                              effetti: { rep:  0, sblocca: 'sd_mp03_cu', narrativo: true } },
          ]
        },
      ],

      eventi: [
        {
          id: 'sd_e01',
          trigger: 'crisi_province',
          contesto: 'Drath è nella Sala Rituale quando entri. Non stava insegnando.',
          testo: `"Lo hai sentito."`,
          risposte: [
            { tono: 'cauto',   testo: `"Sì. Non so ancora cosa significhi per noi."`,                                                                 effetti: { rep: +2, sblocca: 'sd_e01_c' } },
            { tono: 'formale',   testo: `"Sì. Cambia qualcosa per l'accademia, secondo voi?"`,                                                          effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                                        effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Voi cosa ne pensate?"`,                                                                                   effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Sì. C'è un legame tra quello che è successo e quello che studiamo qui?"`,                                     effetti: { rep:  0, sblocca: 'sd_e01_cu' } },
          ]
        },
        {
          id: 'sd_e02',
          trigger: 'anomalia_rito',
          contesto: 'La cerimonia è finita. Drath ti trova in un corridoio laterale.',
          testo: `"Durante il rito hai percepito qualcosa di anomalo. Lo so perché ti ho visto fermarti un istante. Cosa era?"`,
          risposte: [
            { tono: 'cauto',   testo: `"Non so come descriverlo con precisione. C'era qualcosa che non corrispondeva al ritmo della sequenza."`,       effetti: { rep: +2, sblocca: 'sd_e02_c' } },
            { tono: 'formale',   testo: `"Una dissonanza nel terzo passaggio. Non riuscivo a capire se fosse mia o esterna."`,                           effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Era esterna, vero? Non dipendeva da me."`,                                                                    effetti: { rep:  0, sblocca: 'sd_e02_cu', narrativo: true } },
            { tono: 'diretto',  testo: `"Qualcosa nel ritmo non tornava. Ma non so se fosse rilevante."`,                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Qualcosa. Non so cos'era."`,                                                                                  effetti: { rep: +1 } },
          ]
        },
      ],
    },
  },

  // ============================================================
  // CV — CORNELIA VESTI | Magister, Teoria Arcana | (45+)
  // Fredda, precisa, non alza mai la voce
  // Giocatore usa: Voi
  // ============================================================
  corneliaVesti: {

    voicelines: [
      { id: 'cv_v01', contesto: 'inizio_lezione', testo: `"Silenzio. Aprite al capitolo quindici. Chi non ha ancora terminato il capitolo quattordici si faccia vedere dopo la lezione — non qui, non adesso."` },
      { id: 'cv_v02', contesto: 'inizio_lezione', testo: `"Siamo in ritardo sul programma di due sessioni. Recupereremo adesso. Prendete nota."` },
      { id: 'cv_v03', contesto: 'inizio_lezione', testo: `"Non ho intenzione di ripetere quello che avrei già dovuto dire la settimana scorsa. Chi era assente si arrangi. Gli altri — aprite i testi."` },
      { id: 'cv_v04', contesto: 'inizio_lezione', testo: `"Prima di cominciare: chi non ha letto i capitoli assegnati lo dica adesso, non a fine lezione. Bene. Procediamo."` },
      { id: 'cv_v05', contesto: 'fine_lezione',   testo: `"Per oggi è sufficiente. I capitoli dal sedici al diciotto per la prossima volta. Andate."` },
      { id: 'cv_v06', contesto: 'fine_lezione',   testo: `"Chiudete i testi. Quello che non avete capito oggi, rileggetelo stasera. Se non basta, tornate da me — non durante la lezione."` },
      { id: 'cv_v07', contesto: 'fine_lezione',   testo: `"La sessione è conclusa. Il programma è in ritardo di una sessione. Recupereremo. Andate."` },
      { id: 'cv_v08', contesto: 'commento_lavoro', testo: `"Questo è tecnicamente corretto. Tecnicamente. La prossima volta voglio che sia anche concettualmente fondato — c'è differenza."` },
      { id: 'cv_v09', contesto: 'commento_lavoro', testo: `"Avete evitato l'errore più comune. Non è un complimento — è il minimo. Ma è un inizio."` },
      { id: 'cv_v10', contesto: 'commento_lavoro', testo: `"Interessante. Non lo dico spesso. Non abituatevi."` },
      { id: 'cv_v11', contesto: 'commento_lavoro', testo: `"L'esecuzione era accettabile. Il ragionamento che c'era dietro — quello merita attenzione. Tornateci sopra."` },
      { id: 'cv_v12', contesto: 'commento_lavoro', testo: `"Questo errore ha una struttura precisa. Tenetelo — vale più di dieci esecuzioni corrette."` },
      { id: 'cv_v13', contesto: 'promozione_apprendista', testo: `"Il primo passo non è il più difficile. È il più necessario. Da questo momento, avete qualcosa che non potete più restituire: la consapevolezza di ciò che non sapete ancora. Procedete."` },
      { id: 'cv_v14', contesto: 'promozione_apprendista', testo: `"Apprendista. Il titolo non vi appartiene — lo portate in prestito fino a quando non lo meriterete davvero. Cominciate."` },
      { id: 'cv_v15', contesto: 'promozione_esperto', testo: `"Esperto in Teoria Arcana. Le fondamenta sono poste. Ciò che costruirete su di esse vi appartiene — e vi appartiene anche ogni errore che farete. Non dimenticate né gli uni né gli altri."` },
      { id: 'cv_v16', contesto: 'promozione_esperto', testo: `"Ho visto studenti raggiungere questo grado e fermarsi, convinti di essere arrivati. Non fatelo. Questo è un punto di partenza che ha richiesto tempo per essere raggiunto."` },
    ],

    primoIngresso: [
      {
        id: 'cv_pi01',
        contesto: 'Fine di una lezione di Teoria Arcana. Il Magister Vesti non si avvia verso l\'uscita — aspetta in silenzio che tutti abbiano lasciato la sala. Poi vi guarda.',
        testo: `"Avete fatto una domanda durante la lezione che gli altri non hanno fatto. Questo non è un complimento — è un'osservazione. Le domande giuste indicano dove si trovano i vuoti. Riempiteli."`,
        risposte: [
          { tono: 'formale',    testo: `Ringraziate il Magister e prendete nota mentalmente dell'indicazione. Non aggiungete altro.`,              effetti: { rep: +3 } },
          { tono: 'diretto',    testo: `"Ho già un testo in mente. Verificherò che sia quello giusto."`,                                           effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `"Cercherò di farlo. Se posso chiederle: da dove iniziare?"`,                                              effetti: { rep: +2 } },
          { tono: 'amichevole', testo: `"Grazie. Non avevo pensato che fosse una domanda utile — la facevo perché non capivo."`,                   effetti: { rep: -1 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'cv_o01',
          contesto: 'Vesti ti aspetta fuori dall\'aula con il testo aperto alla pagina corretta.',
          testo: `"Hai citato il capitolo dodici per giustificare una procedura del capitolo nove. Non è un errore di distrazione. È un errore di comprensione. C'è differenza."`,
          risposte: [
            { tono: 'formale',   testo: `"Avete ragione. Ho confuso i riferimenti. Non accadrà di nuovo."`,                                             effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Posso chiedervi di indicarmi dove esattamente la mia comprensione è lacunosa?"`,                              effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Ho capito la distinzione. Rivedrò entrambi i capitoli oggi."`,                                                effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Ascolti senza difenderti.`,                                                                                    effetti: { rep:  0 } },
            { tono: 'elusivo',  testo: `"Pensavo che i due passaggi fossero collegati in quel contesto."`,                                             effetti: { rep: -2 } },
            { tono: 'ironico',   testo: `"Almeno ho citato il libro giusto."`,                                                                          effetti: { rep: -3, chiudeDialogo: true } },
          ]
        },
        {
          id: 'cv_o02',
          contesto: 'Vesti ti incrocia in corridoio e si ferma.',
          testo: `"Il tuo rendimento nelle ultime sessioni è sotto la soglia che considero accettabile. Non te lo dico per motivarti. Te lo dico perché è un dato."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo so. Sto lavorando per correggerlo."`,                                                                      effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"C'è qualcosa di specifico su cui concentrarmi prima degli altri?"`,                                           effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa consigliate di affrontare per primo?"`,                                                                  effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Apprezzo che me lo diciate direttamente. Dove devo intervenire?"`,                                            effetti: { rep: -1 } },
            { tono: 'elusivo',  testo: `"È stato un periodo complicato."`,                                                                             effetti: { rep: -2 } },
          ]
        },
        {
          id: 'cv_o03',
          contesto: 'Cornelia Vesti vi ferma a fine lezione con un tono che non lascia margine per l\'interpretazione.',
          testo: `"Il lavoro scritto consegnato ieri conteneva un'imprecisione terminologica che avevo già segnalato due settimane fa. Non accetto che si presenti due volte lo stesso errore."`,
          risposte: [
            { tono: 'formale',    testo: `"Ha ragione. L'ho trascurato. Non accadrà di nuovo."`,                                         effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Mi scuso. Credevo di averlo corretto. Posso rivedere adesso?"`,                               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Ho capito. Posso rivedere il testo e correggerlo entro domani?"`,                             effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Capisco."`,                                                                                    effetti: { rep: +1 } },
            { tono: 'elusivo',    testo: `"Pensavo che nel contesto fosse accettabile."`,                                                 effetti: { rep: -2 } },
          ]
        },
      ],

      teso: [
        {
          id: 'cv_t01',
          contesto: 'Vesti ti restituisce il testo con margini pieni di annotazioni in una grafia piccola e precisa.',
          testo: `"Ho corretto tutto quello che era corretto. Il resto è segnato. Riscrivilo."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo riscriverò. Posso chiedervi quale delle annotazioni ritenete prioritaria?"`,                               effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Scorri le annotazioni lentamente. "Alcune di queste non le avevo considerate affatto. Posso tornare da voi dopo averle approfondite?"`, effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Lo riscrivo entro quando?"`,                                                                                  effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"C'è un'annotazione che non capisco. Posso chiedervi di spiegarla?"`,                                          effetti: { rep:  0, sblocca: 'cv_t01_cu' } },
            { tono: 'distaccato', testo: `"Capito. Grazie."`,                                                                                            effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Ci sono più annotazioni che parole mie. È un buon segno o un cattivo segno?"`,                                effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_t02',
          contesto: 'La sessione è finita. Vesti si avvicina mentre gli altri escono.',
          testo: `"Hai eseguito correttamente. Ma hai eseguito — non hai ragionato. Sono due cose diverse."`,
          risposte: [
            { tono: 'formale',   testo: `"Come si ragiona durante l'esecuzione, secondo voi? È una distinzione che non ho ancora interiorizzato."`,     effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non so ancora come fare entrambe le cose insieme. È qualcosa che si sviluppa con il tempo o con un metodo specifico?"`, effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa avreste voluto vedere, se avessi ragionato?"`,                                                           effetti: { rep:  0, sblocca: 'cv_t02_cu' } },
            { tono: 'diretto',  testo: `"Come si corregge?"`,                                                                                          effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Lo terrò presente."`,                                                                                         effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Ragionare durante l'esecuzione. È più facile dirlo che farlo."`,                                              effetti: { rep: -3 } },
          ]
        },
        {
          id: 'cv_t03',
          contesto: 'Vesti scorre la classe con lo sguardo e si ferma su di te.',
          testo: `"Tu. Capitolo quindici, terzo principio. Enuncialo."`,
          risposte: [
            { tono: 'formale',   testo: `Lo enunci con precisione, parola per parola.`,                                                                 effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `Lo enunci con parole tue, mantenendo il significato esatto.`,                                                  effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Il terzo principio stabilisce che ogni variazione nella sequenza primaria produce un effetto proporzionale sulla struttura secondaria. Se non ricordo male."`, effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `Lo enunci, poi aggiungi: "C'è però un passaggio che non mi è ancora del tutto chiaro nel modo in cui si applica al capitolo sedici."`, effetti: { rep: 0, sblocca: 'cv_t03_cu' } },
            { tono: 'distaccato', testo: `Lo enunci con tono neutro, senza elaborare.`,                                                                  effetti: { rep:  0 } },
            { tono: 'elusivo',  testo: `"Dipende da quale interpretazione si adotta per il termine struttura."`,                                       effetti: { rep: -2 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'cv_n01',
          contesto: 'Vesti si ferma davanti al tuo banco.',
          testo: `"Questo passaggio è sbagliato. Non perché non capisci la teoria — perché l'hai applicata a un contesto per cui non vale. Guarda."`,
          risposte: [
            { tono: 'formale',   testo: `Osservi attentamente mentre spiega. "Capito. Il contesto cambia le condizioni di applicazione."`,              effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Posso chiedervi come si riconosce il contesto corretto prima di applicare il principio?"`,                    effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Esistono altri contesti in cui questo principio non vale, oltre a questo?"`,                                  effetti: { rep:  0, sblocca: 'cv_n01_cu', conoscenza: +1 } },
            { tono: 'diretto',  testo: `"Vedo l'errore. Ho assunto che il contesto fosse invariante."`,                                                effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Osservi e annuisci.`,                                                                                          effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È un errore che avrei potuto evitare se avessi riletto il capitolo quattordici."`,                            effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_n02',
          contesto: 'Vesti ti incrocia nel corridoio. Non si ferma, ma rallenta di mezzo passo.',
          testo: `"Stai studiando il capitolo diciassette?"`,
          risposte: [
            { tono: 'formale',   testo: `"Sì. Sto cercando di consolidare i fondamenti prima di procedere."`,                                          effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sì, anche se c'è un punto che non riesco ancora a inquadrare. Posso chiedervi un suggerimento?"`,             effetti: { rep: +2, sblocca: 'cv_n02_c' } },
            { tono: 'diretto',  testo: `"Sì. C'è qualcosa che dovrei tenere a mente in particolare?"`,                                                effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Sì. Posso chiedervi quale parte ritenete più sottovalutata dagli studenti?"`,                                 effetti: { rep:  0, sblocca: 'cv_n02_cu' } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                                        effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Sì, anche se è più denso di quanto mi aspettassi."`,                                                          effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_n03',
          contesto: 'Vesti si ferma a metà corridoio. Hai appena posto ad alta voce una domanda che non ti aspettavi di fare.',
          testo: `"È una domanda che non è nel programma. Il che non significa che non abbia risposta."`,
          risposte: [
            { tono: 'formale',   testo: `"Sono pronto ad ascoltarla, se volete darla."`,                                                                effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Aspetti in silenzio, senza sollecitare.`,                                                                      effetti: { rep: +2, sblocca: 'cv_n03_c' } },
            { tono: 'curioso',  testo: `"Sono contento che non l'abbiate ignorata."`,                                                                  effetti: { rep:  0, sblocca: 'cv_n03_cu', conoscenza: +2 } },
            { tono: 'diretto',  testo: `"Allora datela."`,                                                                                             effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Ascolto."`,                                                                                                   effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È la domanda che mi porto dietro da settimane."`,                                                             effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_t04',
          contesto: 'Cornelia Vesti vi convoca brevemente alla fine di una sessione. Gli altri studenti hanno già lasciato.',
          testo: `"La vostra progressione nell'ultimo mese è stata irregolare. Non è un calo — è una mancanza di coerenza che suggerisce un problema di metodo, non di capacità." Si ferma. "Siete d'accordo?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Sì. Sto cercando di identificare dove il metodo cede."`,                                      effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"D'accordo. Posso chiederle dove lo vede più chiaramente?"`,                                   effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"In parte sì. C'è stata una variabile esterna che ha influito. Ma il metodo è un problema reale."`, effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa intendete esattamente per mancanza di coerenza?"`,                                       effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                         effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'cv_p01',
          contesto: 'Vesti ti restituisce il testo senza annotazioni nei margini — solo una riga alla fine.',
          testo: `"È migliorato. Non dico altro."`,
          risposte: [
            { tono: 'formale',   testo: `"Grazie. Ho cercato di applicare le correzioni precedenti con più rigore."`,                                   effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"C'è ancora qualcosa che non regge, secondo voi?"`,                                                            effetti: { rep: +2, sblocca: 'cv_p01_c' } },
            { tono: 'diretto',  testo: `"Cosa manca ancora?"`,                                                                                         effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa ha visto di diverso rispetto all'ultima versione?"`,                                                     effetti: { rep:  0, sblocca: 'cv_p01_cu' } },
            { tono: 'distaccato', testo: `"Capito. Grazie."`,                                                                                            effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Da voi è quasi un elogio. Lo prendo come tale."`,                                                             effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_p02',
          contesto: 'Vesti lascia un volume sul tuo banco prima che la lezione cominci.',
          testo: `"Non è obbligatorio. Ma se hai capito davvero il capitolo diciassette, questo è il passo successivo."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo studierò. Posso venire da voi se ho domande?"`,                                                            effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Come faccio a sapere se ho capito abbastanza da affrontarlo?"`,                                               effetti: { rep: +2, sblocca: 'cv_p02_c' } },
            { tono: 'curioso',  testo: `"Di cosa tratta?"`,                                                                                            effetti: { rep:  0, sblocca: 'cv_p02_cu' } },
            { tono: 'diretto',  testo: `"Lo leggo questa settimana."`,                                                                                  effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Prendi il volume e annuisci.`,                                                                                  effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Significa che pensate che ce la faccia. Lo apprezzo."`,                                                        effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_p03',
          contesto: 'Vesti ti incrocia nel corridoio dopo la lezione in cui ti ha citato come esempio.',
          testo: `"L'ho fatto perché era corretto, non per farti un favore."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo so. E per questo ha più valore."`,                                                                         effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non me lo aspettavo. Spero di esserne all'altezza in futuro."`,                                               effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Lo so. È per quello che lo apprezzo."`,                                                                       effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"C'era qualcosa di specifico che ha ritenuto degno di nota?"`,                                                 effetti: { rep:  0, sblocca: 'cv_p03_cu' } },
            { tono: 'distaccato', testo: `"Capito. Grazie."`,                                                                                            effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È il tipo di riconoscimento che preferisco a qualsiasi complimento diretto."`,                                effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_p04',
          contesto: 'Cornelia Vesti vi ferma dopo una sessione con qualcosa che, da lei, vale più di un elogio esplicito.',
          testo: `"La risposta alla quarta domanda dell'ultimo esame era la migliore dell'intero anno. Non perché fosse corretta — perché mostrava un tipo di ragionamento che non si insegna direttamente." Una pausa brevissima. "Si coltiva."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non sapevo che si vedesse. Come lo coltivo?"`,                                                effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Grazie. È un'osservazione che terrò presente."`,                                              effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Sa come riconoscere cosa lo ha prodotto?"`,                                                   effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa intendete con 'non si insegna direttamente'?"`,                                          effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                    effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'cv_mp01',
          contesto: 'Vesti è rimasta nell\'aula vuota. Prima che tu esca di nuovo, dice:',
          testo: `"Ho scritto il capitolo quindici dodici anni fa. Lo rileggo ogni anno. Ogni anno trovo qualcosa che avrei scritto diversamente."`,
          risposte: [
            { tono: 'cauto',   testo: `"Significa che continuate ad imparare anche da quello che avete già scritto?"`,                                effetti: { rep: +2 } },
            { tono: 'formale',   testo: `"È una disciplina che non si esaurisce. Lo si capisce leggendovi."`,                                           effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa cambiereste, se lo riscriveste adesso?"`,                                                                effetti: { rep:  0, sblocca: 'cv_mp01_cu', narrativo: true } },
            { tono: 'diretto',  testo: `"Cosa vi ha insegnato rileggendolo?"`,                                                                         effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Ascolti senza rispondere, poi esci lentamente.`,                                                               effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È una cosa rara, ammettere che si scriverebbe diversamente. Lo apprezzo."`,                                   effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_mp02',
          contesto: 'Vesti ti trova nell\'aula mentre prepari un lavoro aggiuntivo non richiesto.',
          testo: `"Questo non è nel programma. L'hai fatto di tua iniziativa."`,
          risposte: [
            { tono: 'formale',   testo: `"Sì. C'era una connessione tra il capitolo quindici e il diciassette che volevo verificare."`,                 effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sì. Non so ancora se la direzione è quella giusta — ma avevo bisogno di provarci."`,                          effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Sì. Avevo una domanda che non trovava risposta nel testo standard."`,                                         effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Sì. Posso chiedervi se la strada che sto percorrendo ha senso?"`,                                             effetti: { rep:  0, sblocca: 'cv_mp02_cu' } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                                        effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Mi veniva naturale. Non riuscivo a smettere di pensarci."`,                                                   effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_mp03',
          contesto: 'Fine anno. Vesti sta raccogliendo i propri materiali quando entri per dimenticare qualcosa.',
          testo: `"Torni il prossimo semestre con meno lacune di quante ne hai adesso. È tutto quello che chiedo."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo farò. È un obiettivo che mi pongo anch'io."`,                                                              effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Posso chiedervi quale lacuna ritenete più urgente da colmare?"`,                                              effetti: { rep: +2, sblocca: 'cv_mp03_c' } },
            { tono: 'diretto',  testo: `"Lo so già quale. Ci lavorerò durante la pausa."`,                                                             effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Quali lacune vedete voi, che io non vedo ancora?"`,                                                           effetti: { rep:  0, sblocca: 'cv_mp03_cu' } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È il tipo di arrivederci che preferisco. Ci sarò."`,                                                          effetti: { rep: -1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'cv_e01',
          trigger: 'crisi_lezione_sospesa',
          contesto: 'Vesti entra in aula e senza sedersi: "La lezione è sospesa. Tornate ai vostri alloggi." Mentre esci, ti ferma con un gesto minimo.',
          testo: `"Tu. Hai il capitolo diciotto?"`,
          risposte: [
            { tono: 'formale',   testo: `"No. Devo procurarmelo?"`,                                                                                     effetti: { rep: +2, sblocca: 'cv_e01_f' } },
            { tono: 'cauto',   testo: `"No. È importante averlo adesso?"`,                                                                            effetti: { rep: +2, sblocca: 'cv_e01_c' } },
            { tono: 'diretto',  testo: `"No. Lo prendo in biblioteca prima di tornare."`,                                                              effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"No. C'è un legame tra quello che sta succedendo e il capitolo diciotto?"`,                                    effetti: { rep:  0, sblocca: 'cv_e01_cu' } },
            { tono: 'distaccato', testo: `"No."`,                                                                                                        effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"No. Me lo procuro subito — devo preoccuparmi?"`,                                                              effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cv_e02',
          trigger: 'dopo_promozione',
          contesto: 'Vesti non partecipa ai convenevoli post-cerimonia. Ti trova in un corridoio laterale.',
          testo: `"Il titolo non cambia quello che sai. Cambia quello che ci si aspetta da te. Tienilo a mente."`,
          risposte: [
            { tono: 'formale',   testo: `"Lo terrò presente. Le aspettative sono una responsabilità che accetto."`,                                     effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Posso chiedervi cosa vi aspettate voi, nello specifico?"`,                                                    effetti: { rep: +2, sblocca: 'cv_e02_c' } },
            { tono: 'diretto',  testo: `"Lo so già. Per questo il titolo non mi spaventa."`,                                                           effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Come cambiano le aspettative, concretamente, da questo momento?"`,                                            effetti: { rep:  0, sblocca: 'cv_e02_cu' } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È il promemoria più utile che potessi ricevere oggi."`,                                                       effetti: { rep: -1 } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // PV — PIETRO VASSO | Adepto, Alchimia | (35+)
  // Caldo, informale, entusiasta, ironico
  // Giocatore usa: Lei
  // ============================================================
  pietroVasso: {

    voicelines: [
      { id: 'pv_v01', contesto: 'inizio_lezione', testo: `"Buongiorno. Prima che qualcuno tocchi qualcosa — chi sa dove sono finiti i guanti di protezione della scorsa settimana? No? Bene. Li trovate nell'armadio a destra. Indossateli adesso."` },
      { id: 'pv_v02', contesto: 'inizio_lezione', testo: `"Oggi facciamo una cosa nuova. Nuova per voi, intendo — io l'ho fatta abbastanza volte da sognarmela. Attenzione, perché la spiego una volta sola."` },
      { id: 'pv_v03', contesto: 'inizio_lezione', testo: `"Nessuno ha fatto esplodere niente la settimana scorsa. Ottimo precedente. Vediamo se riusciamo a replicarlo."` },
      { id: 'pv_v04', contesto: 'inizio_lezione', testo: `"Prima di cominciare — chi ha riletto il procedimento di ieri? Chi non l'ha fatto, siediti vicino a qualcuno che l'ha fatto. Non per copiare — per avere qualcuno che ti fermi se stai per fare qualcosa di stupido."` },
      { id: 'pv_v05', contesto: 'fine_lezione',   testo: `"Per oggi basta così. Pulite le superfici di lavoro e mettete via i reagenti nell'ordine in cui li avete trovati — lo so perché li ho contati."` },
      { id: 'pv_v06', contesto: 'fine_lezione',   testo: `"Bene. La maggior parte di voi ha ancora tutte le dita. Considero la sessione un successo. Arrivederci."` },
      { id: 'pv_v07', contesto: 'fine_lezione',   testo: `"Prima di andare — chi ha ancora l'estratto sul fuoco lo spenga. Non quello di destra, quello di destra è mio. L'altro."` },
      { id: 'pv_v08', contesto: 'commento_esperimento', testo: `"Aspetta — non toccare ancora. Guarda quello che hai appena fatto. Lo vedi? Quel cambio di colore non era nel procedimento. Cosa pensi che significhi?"` },
      { id: 'pv_v09', contesto: 'commento_esperimento', testo: `"Non male. Non male davvero. Riusciresti a ripeterlo? Perché se sì, voglio che me lo mostri di nuovo più lentamente."` },
      { id: 'pv_v10', contesto: 'commento_esperimento', testo: `"Hai sbagliato il terzo passaggio e il risultato è comunque interessante. Questo mi disturba e mi affascina in egual misura."` },
      { id: 'pv_v11', contesto: 'commento_esperimento', testo: `"Fermati un secondo. Annusa quello che hai davanti. Non così — non ti brucerà, ma non annusarlo direttamente. Ecco. Senti? Quello è il segno che la fermentazione è andata oltre il punto che volevi."` },
      { id: 'pv_v12', contesto: 'commento_esperimento', testo: `"Bello. Semplice, efficace, niente di superfluo. Questi sono i risultati che mi piacciono — quelli in cui si vede che chi li ha prodotti capisce cosa sta facendo."` },
      { id: 'pv_v13', contesto: 'promozione_apprendista', testo: `"Benvenuto nel laboratorio come Apprendista! Sai cosa cambia, adesso? Che posso darti reagenti più interessanti. E anche quelli più pericolosi. Non necessariamente in quest'ordine."` },
      { id: 'pv_v14', contesto: 'promozione_apprendista', testo: `"Apprendista! Finalmente. Sai quante volte ho spiegato la differenza tra un estratto volatile e uno stabile? Adesso puoi scoprirla da solo. È molto più divertente."` },
      { id: 'pv_v15', contesto: 'promozione_esperto',     testo: `"Esperto. Sai cosa significa? Significa che quando qualcosa va storto nel laboratorio, d'ora in poi devi sapere perché. Congratulazioni — è una responsabilità, non solo un titolo."` },
    ],

    primoIngresso: [
      {
        id: 'pv_pi01',
        contesto: 'Primo ingresso nel Laboratorio di Alchimia. Vasso è chino su un bollitore e non si gira finché non avete già attraversato metà della stanza.',
        testo: `"Ah, un nuovo ingresso. Bene — ho bisogno di qualcuno che non tocchi niente senza chiedere prima." Si gira con un sorriso. "Scherzo. Quasi. Com'è il suo rapporto con i vapori aromatici? Perché quello nell'angolo a sinistra è particolarmente... personale."`,
        risposte: [
          { tono: 'curioso',    testo: `"Personale in che senso? Qual è la composizione?"`,                                                       effetti: { rep: +3 } },
          { tono: 'amichevole', testo: `"Ottimo, mi auguro. Sono qui per imparare, non per stare alla larga."`,                                   effetti: { rep: +3 } },
          { tono: 'cauto',      testo: `"Mi consideri una persona prudente. Chiedo prima di toccare."`,                                           effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Dipende da cosa c'è dentro. Può dirmelo?"`,                                                              effetti: { rep: +2 } },
          { tono: 'ironico',    testo: `"Sto già tenendo il fiato."`,                                                                             effetti: { rep: +1 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'pv_o01',
          contesto: 'Vasso è chino sui resti dell\'esperimento con un\'espressione delusa, non arrabbiata.',
          testo: `"Sai qual è la differenza tra un errore e una negligenza? L'errore succede quando non sai. La negligenza succede quando sai e non ci fai caso. Questo era negligenza."`,
          risposte: [
            { tono: 'diretto',  testo: `"Ha ragione. Sapevo del rischio e non ho preso le precauzioni necessarie."`,                                   effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non voglio giustificarmi. Posso chiederle cosa avrei dovuto fare diversamente nel momento specifico in cui ho sbagliato?"`, effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Mi dispiace davvero. Non pensavo che potesse andare così."`,                                                  effetti: { rep: +3 } },
            { tono: 'formale',   testo: `"Comprendo la distinzione. Farò in modo che non si ripeta."`,                                                  effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"C'è un modo per rimediare al danno fatto, oltre a non ripetere l'errore?"`,                                   effetti: { rep: +2, sblocca: 'pv_o01_cu' } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep: -1 } },
          ]
        },
        {
          id: 'pv_o02',
          contesto: 'Vasso ti guarda arrivare con un\'espressione che di solito non ha.',
          testo: `"Sai, di solito sono contento quando uno studente entra qui. Con te ultimamente faccio fatica a esserlo."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Lo so. Ho gestito male alcune cose. Vorrei rimediare."`,                                                      effetti: { rep: +3 } },
            { tono: 'diretto',  testo: `"Cosa devo fare per cambiare questa situazione?"`,                                                             effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Ha ragione. Posso chiederle cosa ha cambiato la sua impressione?"`,                                           effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Cosa è cambiato, secondo lei?"`,                                                                              effetti: { rep: +2 } },
            { tono: 'formale',   testo: `"Capisco. Farò in modo di meritare di nuovo la sua fiducia."`,                                                 effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Mi dispiace sentirlo."`,                                                                                      effetti: { rep: -1 } },
          ]
        },
        {
          id: 'pv_o03',
          contesto: 'Vasso è nel laboratorio con un\'espressione che non è la sua — quella di chi ha trovato qualcosa che non torna.',
          testo: `"Il campione che ha preso dalla terza scaffalatura ieri non è quello che pensava di prendere. Come se ne è accorta — o non se ne è ancora accorta?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Non me ne ero accorta. Posso capire come rimediare?"`,                                        effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Non me ne ero accorta. Cosa ho preso esattamente?"`,                                          effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Sono mortificata. Come risolvo?"`,                                                            effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Ha ragione. Non ho controllato l'etichetta con sufficiente attenzione."`,                     effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Me ne sono accorta adesso, grazie alla sua espressione."`,                                    effetti: { rep: +0 } },
          ]
        },
      ],

      teso: [
        {
          id: 'pv_t01',
          contesto: 'Vasso si avvicina al tuo banco e abbassa la voce.',
          testo: `"Sei qui fisicamente. Ma non stai guardando quello che sta succedendo sul fuoco. Cosa c'è?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"È stata una settimana difficile. Non è una scusa, ma è la verità."`,                                          effetti: { rep: +3 } },
            { tono: 'diretto',  testo: `"Ho la testa altrove. Cerco di rientrare."`,                                                                   effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non lo so con precisione. Ma ha ragione — non sono presente come dovrei."`,                                   effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"È così visibile?"`,                                                                                           effetti: { rep: +2, sblocca: 'pv_t01_cu' } },
            { tono: 'formale',   testo: `"Mi scuso. Riporto l'attenzione sull'esperimento."`,                                                           effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Sto bene. Mi riconcentro."`,                                                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'pv_t02',
          contesto: 'Vasso aspetta che gli altri escano.',
          testo: `"Il tuo estratto di oggi era tecnicamente corretto. Ma l'hai fatto di fretta. L'alchimia non perdona la fretta — non perché sia pericolosa, ma perché perdi la metà di quello che stava succedendo."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Ha ragione. Stavo pensando al risultato invece di guardare il processo."`,                                    effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Cosa stava succedendo che non ho visto?"`,                                                                    effetti: { rep: +2, sblocca: 'pv_t02_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Come si impara a rallentare senza perdere precisione?"`,                                                      effetti: { rep:  0 } },
            { tono: 'diretto',  testo: `"La prossima volta ci dedico il tempo che serve."`,                                                            effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Terrò presente la distinzione."`,                                                                             effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"L'alchimia e la fretta. Una relazione complicata."`,                                                          effetti: { rep: +1 } },
          ]
        },
        {
          id: 'pv_t03',
          contesto: 'Vasso è chino su qualcosa che non fa parte del curriculum quando entri. Alza lo sguardo.',
          testo: `"Ah. Cercavi me o stavi solo esplorando?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Entrambe le cose, direi. Cosa sta preparando?"`,                                                              effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"La seconda. Ma adesso che la vedo, sono più curioso di prima."`,                                              effetti: { rep: +2, sblocca: 'pv_t03_cu', conoscenza: +1 } },
            { tono: 'diretto',  testo: `"La cercavo. Ho una domanda sull'estratto di ieri."`,                                                          effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non volevo disturbare. Posso tornare più tardi?"`,                                                            effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Stavo esplorando. Il laboratorio fuori orario ha un'atmosfera diversa."`,                                     effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"La cercavo per una domanda, se ha un momento."`,                                                              effetti: { rep:  0 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'pv_n01',
          contesto: 'Vasso entra in laboratorio con un contenitore che emette un vapore color rame.',
          testo: `"Oggi lavoriamo con la resina di quercia fermentata. Prima di toccare niente — qualcuno sa cosa succede se la si combina con un acido a temperatura sbagliata?"`,
          risposte: [
            { tono: 'curioso',  testo: `"No, ma vorrei saperlo prima di avvicinarmi."`,                                                                effetti: { rep: +2, sblocca: 'pv_n01_cu', conoscenza: +2 } },
            { tono: 'diretto',  testo: `"La reazione diventa instabile oltre i quaranta gradi, se ricordo bene."`,                                     effetti: { rep: +1, sblocca: 'pv_n01_di' } },
            { tono: 'amichevole',  testo: `"Non lo so, ma la sua faccia mi dice che la risposta è interessante."`,                                        effetti: { rep: +3 } },
            { tono: 'cauto',   testo: `"Non lo so. Preferisco ascoltare prima di procedere."`,                                                        effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Non ne sono certo. Aspetto la spiegazione."`,                                                                 effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Ascolti senza rispondere.`,                                                                                    effetti: { rep: -1 } },
          ]
        },
        {
          id: 'pv_n02',
          contesto: 'Vasso è in attesa che una reazione completi il suo ciclo e si appoggia al banco.',
          testo: `"La prima volta che ho fatto fermentare un estratto da solo avevo undici anni e ho riempito la cucina di vapore viola. Mia madre non era contenta. Io sì."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Viola? Come ci è arrivato a undici anni?"`,                                                                   effetti: { rep: +3, sblocca: 'pv_n02_am' } },
            { tono: 'curioso',  testo: `"Come ha reagito sua madre poi, quando ha capito che non sarebbe smessa?"`,                                    effetti: { rep: +2, sblocca: 'pv_n02_cu' } },
            { tono: 'ironico',   testo: `"Il vapore viola è già un buon risultato per undici anni."`,                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Da lì è cominciato tutto?"`,                                                                                  effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `Ascolti con un sorriso, senza interrompere.`,                                                                  effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"È un inizio memorabile."`,                                                                                    effetti: { rep:  0 } },
          ]
        },
        {
          id: 'pv_n03',
          contesto: 'Vasso ti vede osservare un esperimento altrui invece di lavorare sul tuo.',
          testo: `"Oi. Quello è il suo banco, il tuo è lì. Ma se hai finito prima, vieni qui — ho bisogno di un secondo paio d'occhi su questa reazione."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Arrivo subito. Stavo cercando di capire cosa stava facendo male."`,                                           effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Sì. Cosa sta succedendo in quella reazione?"`,                                                                effetti: { rep: +2, sblocca: 'pv_n03_cu', conoscenza: +1 } },
            { tono: 'diretto',  testo: `"Ho finito. Cosa devo guardare?"`,                                                                             effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Ero già qui per curiosità. Perfetto tempismo."`,                                                              effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non avevo finito, ma posso venire lo stesso se serve."`,                                                      effetti: { rep:  0 } },
            { tono: 'formale',   testo: `Mi sposto al mio banco e riprendo il lavoro.`,                                                                 effetti: { rep:  0 } },
          ]
        },
        {
          id: 'pv_t03',
          contesto: 'Vasso si avvicina al suo banco mentre lavora — il tono è meno leggero del solito.',
          testo: `"Ha saltato la fase di stabilizzazione nel passaggio intermedio. So che sembra un dettaglio. Non lo è." Si siede sul bordo del banco accanto. "Sa perché conta?"`,
          risposte: [
            { tono: 'cauto',      testo: `"No. Me lo spiega?"`,                                                                          effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Ho un'idea — ma voglio sentirlo da lei."`,                                                    effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Sì. Il reagente successivo reagisce diversamente se la stabilizzazione è incompleta."`,       effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Avevo fretta. Ma ha ragione che non è un dettaglio."`,                                        effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non del tutto."`,                                                                              effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'pv_p01',
          contesto: 'Vasso ti mette davanti un set di reagenti che non hai mai visto nel curriculum standard.',
          testo: `"Questo non è nel programma del tuo livello. Ma ho visto come lavori e penso che tu riesca a non farlo esplodere. Probabilmente."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Probabilmente. Ha già un piano di emergenza?"`,                                                               effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Da dove comincio?"`,                                                                                          effetti: { rep: +2, sblocca: 'pv_p01_cu', conoscenza: +2 } },
            { tono: 'diretto',  testo: `"Lo faccio. Cosa devo sapere prima di iniziare?"`,                                                             effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Cosa succede se sbaglio con questi reagenti specifici?"`,                                                     effetti: { rep:  0, sblocca: 'pv_p01_c' } },
            { tono: 'ironico',   testo: `"Probabilmente è una parola che mi piace in questo contesto."`,                                                effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Farò del mio meglio per non deludere la fiducia."`,                                                           effetti: { rep:  0 } },
          ]
        },
        {
          id: 'pv_p02',
          contesto: 'Vasso guarda il risultato finale con un\'espressione che non riesce a tenere neutrale.',
          testo: `"Sai cosa mi piace di questo? Non solo che ha funzionato — ma che si vede che hai capito perché ha funzionato. Sono cose diverse."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Me ne sono accorto durante il processo. C'è stato un momento in cui ho smesso di seguire le istruzioni e ho iniziato a seguire la reazione."`, effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Come si vede, dall'esterno, che uno ha capito e non solo eseguito?"`,                                         effetti: { rep: +2, sblocca: 'pv_p02_cu', conoscenza: +1 } },
            { tono: 'diretto',  testo: `"Sì. La differenza l'ho sentita."`,                                                                            effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non ero sicuro che si vedesse."`,                                                                             effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Le prometto che non è stato un caso."`,                                                                       effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Ho cercato di applicare quello che ha spiegato nelle ultime sessioni."`,                                      effetti: { rep:  0 } },
          ]
        },
        {
          id: 'pv_p03',
          contesto: 'Vasso si siede sul bordo del banco — cosa che fa quando la spiegazione sarà lunga.',
          testo: `"C'è una proprietà degli estratti volatili che non è nel curriculum perché è considerata troppo avanzata per questo livello. Io non sono d'accordo. Vuoi sentirla?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Da dove parte?"`,                                                                                         effetti: { rep: +2, sblocca: 'pv_p03_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"Sì. Quando si siede sul banco so che sarà interessante."`,                                                    effetti: { rep: +3 } },
            { tono: 'diretto',  testo: `"Sì."`,                                                                                                        effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sì, se pensa che sia il momento giusto per me."`,                                                             effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Considerata troppo avanzata da chi? Da lei non sembrava un parametro molto rigido."`,                          effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare."`,                                                                                  effetti: { rep:  0 } },
          ]
        },
        {
          id: 'pv_p04',
          contesto: 'Vasso entra nel laboratorio e la trova già al lavoro — è più presto del previsto. Non dice niente subito, poi sorride.',
          testo: `"Sa cosa mi fa piacere di lei? Che viene qui quando nessuno ci deve venire ancora." Si avvicina. "Cosa sta preparando?"`,
          risposte: [
            { tono: 'curioso',    testo: `"Stavo cercando di capire una cosa rimasta in sospeso dalla sessione di ieri."`,               effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Una cosa che non riuscivo ad aspettare."`,                                                    effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Una verifica su una reazione che non ho capito del tutto."`,                                  effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Qualcosa che non mi tornava. Spero non sia un problema essere qui prima."`,                   effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Il solito: trovare qualcosa che non funziona e capire perché."`,                              effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'pv_mp01',
          contesto: 'Vasso ti guarda con l\'espressione di chi sta per chiedere un favore e non è del tutto a suo agio nel farlo.',
          testo: `"Ho un esperimento che porto avanti da tre anni nel tempo libero. Stasera arrivo a un passaggio delicato e un secondo paio di occhi non guasterebbe. Sei disponibile?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Sì. Sono onorato che abbia pensato a me."`,                                                                   effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Tre anni su cosa?"`,                                                                                          effetti: { rep: +2, sblocca: 'pv_mp01_cu', narrativo: true } },
            { tono: 'diretto',  testo: `"Ci sono. A che ora?"`,                                                                                        effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sì. Cosa devo fare esattamente?"`,                                                                            effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Un secondo paio di occhi o un testimone in caso di emergenza?"`,                                              effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono disponibile. Mi dica quando."`,                                                                          effetti: { rep:  0 } },
          ]
        },
        {
          id: 'pv_mp02',
          contesto: 'Vasso ti guarda mentre pulisci il banco alla fine della sessione.',
          testo: `"Sai una cosa? Quando sei entrato la prima volta in questo laboratorio ero curioso di vedere quanto ci avresti messo a rompere qualcosa. Adesso mi chiedo quanto ci metterai a insegnare qualcosa a qualcun altro."`,
          risposte: [
            { tono: 'amichevole',  testo: `"È il complimento più strano e più bello che abbia ricevuto."`,                                                effetti: { rep: +3 } },
            { tono: 'ironico',   testo: `"Ho rotto qualcosa nelle prime tre sessioni. Non si ricorda?"`,                                                effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa l'ha fatto cambiare idea?"`,                                                                             effetti: { rep: +2, sblocca: 'pv_mp02_cu', conoscenza: +1 } },
            { tono: 'diretto',  testo: `"Non ci ho ancora pensato. Ma non è una cattiva idea."`,                                                       effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non so se sono pronto per quello. Ma apprezzo che lo pensi."`,                                                effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                                    effetti: { rep: -1 } },
          ]
        },
        {
          id: 'pv_mp03',
          contesto: 'Fine anno. Vasso sta etichettando i reagenti rimasti. Ti volta le spalle ma parla lo stesso.',
          testo: `"Un semestre intero. Hai rotto solo due vetrerie. È un record personale tuo o dell'accademia?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Personale. E sono orgoglioso di entrambe le rotture — erano rotture significative."`,                         effetti: { rep: +3 } },
            { tono: 'ironico',   testo: `"Due vetrerie su quante sessioni? Le percentuali sono dalla mia parte."`,                                      effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Qual è il record dell'accademia?"`,                                                                           effetti: { rep: +2, sblocca: 'pv_mp03_cu' } },
            { tono: 'diretto',  testo: `"Personale. Il prossimo semestre punto a zero."`,                                                              effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Una era inevitabile. L'altra meno. Ci lavoro."`,                                                              effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Personale. È un miglioramento su cui intendo continuare."`,                                                   effetti: { rep:  0 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'pv_e01',
          trigger: 'crisi_province',
          contesto: 'Vasso è in laboratorio ma non sta lavorando — sta guardando fuori dalla finestra. Quando ti sente entrare si volta.',
          testo: `"Ah. Bene. Siediti un attimo."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Tutto bene?" Ti siedi.`,                                                                                      effetti: { rep: +3, sblocca: 'pv_e01_am' } },
            { tono: 'curioso',  testo: `"Cosa sta succedendo, secondo lei?"`,                                                                          effetti: { rep: +2, sblocca: 'pv_e01_cu' } },
            { tono: 'cauto',   testo: `Ti siedi senza fare domande, aspettando che parli.`,                                                           effetti: { rep:  0 } },
            { tono: 'diretto',  testo: `"Cosa c'è?"`,                                                                                                  effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Non ha l'aria di uno che sta aspettando che l'estratto raffreddi."`,                                          effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono qui. Posso fare qualcosa?"`,                                                                             effetti: { rep:  0 } },
          ]
        },
        {
          id: 'pv_e02',
          trigger: 'dopo_promozione',
          contesto: 'Vasso ti aspetta fuori dall\'aula con un\'espressione soddisfatta.',
          testo: `"Allora. Apprendista. Sai cosa cambia adesso in laboratorio?"`,
          risposte: [
            { tono: 'curioso',  testo: `"No. Me lo dica lei."`,                                                                                        effetti: { rep: +2, sblocca: 'pv_e02_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"No, ma so che sarà qualcosa di interessante."`,                                                               effetti: { rep: +3 } },
            { tono: 'ironico',   testo: `"Immagino che la risposta coinvolga qualcosa di volatile."`,                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa cambia?"`,                                                                                               effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Spero di essere pronto per quello che cambia."`,                                                              effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Sono pronto a scoprirlo."`,                                                                                   effetti: { rep:  0 } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // HV — HILDA VORN | Magister, Incantamento | (40+)
  // Cortese in superficie, tagliente nella sostanza
  // Giocatore usa: Voi
  // ============================================================
  hildaVorn: {

    voicelines: [
      { id: 'hv_v01', contesto: 'inizio_lezione', testo: `"Buongiorno. Oggi lavoriamo su qualcosa che richiede concentrazione — non il tipo di concentrazione che usate per prendere appunti, quello più profondo. Preparatevi."` },
      { id: 'hv_v02', contesto: 'inizio_lezione', testo: `"Prima di cominciare voglio sapere dove siete rimasti nell'esercizio assegnato. Non quello che avete scritto — quello che avete capito."` },
      { id: 'hv_v03', contesto: 'inizio_lezione', testo: `"La sessione di oggi ha una struttura precisa. Non derogatemi — non perché non lo tolleri, ma perché perdereste qualcosa che non recuperereste facilmente."` },
      { id: 'hv_v04', contesto: 'fine_lezione',   testo: `"Fermi. Prima di andare — quello che abbiamo visto oggi non si trova nei testi standard. Non cercatelo lì. Se volete approfondire, venite da me."` },
      { id: 'hv_v05', contesto: 'fine_lezione',   testo: `"La sessione è conclusa. L'esercizio che vi ho assegnato non è facoltativo, anche se non l'ho detto esplicitamente. Consideratelo detto adesso."` },
      { id: 'hv_v06', contesto: 'fine_lezione',   testo: `"Andate. E pensate a quello che non ha funzionato oggi — non per colpevolizzarvi, ma perché quella è la parte che vale la pena portarsi dietro."` },
      { id: 'hv_v07', contesto: 'commento_oggetto', testo: `"Questa runa ha un'angolazione imprecisa di circa tre gradi. Non sembra molto. Provate ad attivare l'incantamento e poi ditemi se vi sembra ancora poco."` },
      { id: 'hv_v08', contesto: 'commento_oggetto', testo: `"L'oggetto funziona. Funziona davvero — non è un esercizio che si comporta come se funzionasse. Questo è un risultato, non una simulazione."` },
      { id: 'hv_v09', contesto: 'commento_oggetto', testo: `"Avete usato una tecnica che non ho insegnato. Voglio sapere dove l'avete presa e se capite perché funziona."` },
      { id: 'hv_v10', contesto: 'commento_oggetto', testo: `"Interessante scelta sulla sequenza di chiusura. Non è quella che avrei usato io. È meglio. Non lo dico spesso."` },
      { id: 'hv_v11', contesto: 'promozione_apprendista', testo: `"Apprendista in Incantamento. Il livello delle aspettative si è appena alzato. Non è una minaccia — è un'informazione."` },
      { id: 'hv_v12', contesto: 'promozione_esperto',     testo: `"Esperto. Da questo momento, gli errori che fate sono vostri — non della tecnica, non del curriculum. Vostri. È una distinzione che conta."` },
    ],

    primoIngresso: [
      {
        id: 'hv_pi01',
        contesto: 'Hilda Vorn non guarda subito chi entra nel Laboratorio di Incantamento. Finisce una sequenza di gesti precisi su un oggetto, poi alza gli occhi.',
        testo: `"Sa già qualcosa dell'Incantamento, o è tabula rasa?" Non è una domanda retorica. "Non è un giudizio — è una questione logistica. Preferisco sapere da dove partiamo."`,
        risposte: [
          { tono: 'diretto',    testo: `"Ho studiato le basi teoriche. La pratica è ancora limitata."`,                                           effetti: { rep: +3 } },
          { tono: 'cauto',      testo: `"Ho letto qualcosa, ma non mi fido ancora della mia comprensione. Preferisco non sopravvalutarmi."`,      effetti: { rep: +2 } },
          { tono: 'formale',    testo: `"Tabula rasa in termini pratici. Sono pronto a colmare i vuoti nel modo che ritiene più efficiente."`,    effetti: { rep: +2 } },
          { tono: 'amichevole', testo: `"Dipende da cosa intende per 'qualcosa'. Sono curioso di tutto — non so se questo aiuta."`,              effetti: { rep: +1 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'hv_o01',
          contesto: 'Vorn ti restituisce il lavoro senza commenti scritti — solo una riga rossa sotto il titolo.',
          testo: `"Non ho annotato niente perché non c'era niente su cui valesse la pena lavorare. Rifallo. Questa volta fallo come se ti importasse."`,
          risposte: [
            { tono: 'diretto',  testo: `"Capito. Entro quando?"`,                                                                                      effetti: { rep: +2 } },
            { tono: 'formale',   testo: `"Lo rifarò. C'è qualcosa di specifico su cui concentrarmi?"`,                                                  effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Posso chiedervi quale parte ha trovato più carente?"`,                                                        effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Ha ragione. Non ero concentrato. Lo rifarò sul serio."`,                                                      effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Cosa avrebbe dovuto esserci che non c'era?"`,                                                                 effetti: { rep: +1, sblocca: 'hv_o01_cu' } },
            { tono: 'elusivo',  testo: `"Pensavo di aver soddisfatto i requisiti minimi."`,                                                            effetti: { rep: -2 } },
          ]
        },
        {
          id: 'hv_o02',
          contesto: 'Vorn ti guarda lavorare per un momento più lungo del necessario.',
          testo: `"Stai usando la tecnica di base quando ormai dovresti averne superata la necessità. È pigrizia o insicurezza?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Insicurezza. Non mi fido ancora abbastanza della tecnica avanzata."`,                                         effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non lo so con certezza. Come si distinguono, dall'esterno?"`,                                                 effetti: { rep: +1, sblocca: 'hv_o02_c' } },
            { tono: 'formale',   testo: `"Sto consolidando prima di procedere. Forse troppo a lungo."`,                                                 effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Come si supera l'una e l'altra?"`,                                                                            effetti: { rep: +1, sblocca: 'hv_o02_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Onestamente? Un po' entrambe."`,                                                                              effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Non avevo pensato di dovermi fare questa domanda."`,                                                          effetti: { rep: -1 } },
          ]
        },
        {
          id: 'hv_o03',
          contesto: 'Vorn vi osserva preparare la sequenza. Prima che abbiate finito, si avvicina e ferma il vostro gesto con una sola parola.',
          testo: `"Fermo." Una pausa. "State usando la mano dominante per tutto. Nel terzo passaggio serve l'altra. Chi ve l'ha insegnato così?"`,
          risposte: [
            { tono: 'diretto',    testo: `"Nessuno. Ho dedotto la sequenza dai testi. Evidentemente ho sbagliato la lettura."`,                effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Ho studiato autonomamente. Devo ricominciare da capo o posso correggere da qui?"`,                  effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Ho seguito quello che sembrava il percorso logico. Cosa avrei dovuto vedere che non ho visto?"`,     effetti: { rep: +2, sblocca: 'hv_o03_c' } },
            { tono: 'curioso',    testo: `"Come cambia il risultato con la mano sbagliata?"`,                                                   effetti: { rep: +1, sblocca: 'hv_o03_cu', conoscenza: +1 } },
            { tono: 'amichevole', testo: `"Dal testo standard. Devo controllare meglio le fonti."`,                                            effetti: { rep:  0 } },
            { tono: 'ironico',    testo: `"Da me stesso, evidentemente."`,                                                                     effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'hv_t01',
          contesto: 'Vorn ti si avvicina senza avvertire e sposta leggermente il tuo strumento con un dito.',
          testo: `"Angolazione sbagliata. La runa perde il trenta per cento della sua efficacia così."`,
          risposte: [
            { tono: 'diretto',  testo: `"Visto. Come si corregge senza ricominciare da capo?"`,                                                        effetti: { rep: +2 } },
            { tono: 'formale',   testo: `"Grazie. Posso chiedervi come avrei dovuto posizionarlo?"`,                                                    effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `Osservi la correzione attentamente. "C'è un modo per verificare l'angolazione senza strumenti esterni?"`,      effetti: { rep: +1, sblocca: 'hv_t01_c' } },
            { tono: 'curioso',  testo: `"Cosa succede esattamente quando l'angolazione è sbagliata? Voglio capire il meccanismo."`,                    effetti: { rep: +1, sblocca: 'hv_t01_cu', conoscenza: +1 } },
            { tono: 'distaccato', testo: `"Capito. Grazie."`,                                                                                            effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Non me ne ero accorto. Come faccio a sviluppare un occhio per questo?"`,                                     effetti: { rep:  0 } },
          ]
        },
        {
          id: 'hv_t02',
          contesto: 'Vorn ha davanti a sé i tuoi lavori delle ultime settimane disposti in ordine.',
          testo: `"Sei irregolare. Hai dei picchi buoni e delle cadute che non capisco. Cosa succede nelle cadute?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Dipende dal tipo di oggetto. Con le rune di stabilizzazione sono meno sicuro."`,                              effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non sempre lo so nel momento in cui succede. Lo vedo solo a posteriori."`,                                    effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Vedete uno schema nelle cadute che io non riesco a vedere?"`,                                                 effetti: { rep: +1, sblocca: 'hv_t02_cu', conoscenza: +2 } },
            { tono: 'formale',   testo: `"Ci sono aree specifiche in cui la mia tecnica è meno solida. Sto lavorando per uniformarle."`,                effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"È una domanda a cui non ho ancora una risposta soddisfacente."`,                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Non lo so."`,                                                                                                 effetti: { rep:  0 } },
          ]
        },
        {
          id: 'hv_t03',
          contesto: 'Vorn traccia una sequenza di rune sulla lavagna con la precisione di chi l\'ha fatto migliaia di volte.',
          testo: `"Questa è la sequenza base per un incantamento di protezione di secondo livello. Prima di iniziare — chi sa già dove si trovano i punti di cedimento strutturale?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Non lo so, ma vorrei capire come si identificano."`,                                                          effetti: { rep: +1, sblocca: 'hv_t03_cu', conoscenza: +2 } },
            { tono: 'diretto',  testo: `"Nei raccordi tra la terza e la quarta runa, se la sequenza è asimmetrica."`,                                  effetti: { rep: +2, sblocca: 'hv_t03_di' } },
            { tono: 'cauto',   testo: `"Ho un'ipotesi, ma non ne sono sicuro. Preferisco ascoltare prima."`,                                          effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Non lo so con precisione. Sono pronto a prendere nota."`,                                                     effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Non ancora. Ma la sua espressione mi dice che è la parte più interessante."`,                                 effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Osservi la lavagna senza rispondere.`,                                                                         effetti: { rep:  0 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'hv_n01',
          contesto: 'Vorn è al banco con un oggetto parzialmente completato davanti. Quando entri, non si sorprende.',
          testo: `"Stavo aspettando che qualcuno entrasse. Di solito c'è sempre qualcuno che dimentica qualcosa."`,
          risposte: [
            { tono: 'diretto',  testo: `"Ho dimenticato uno strumento. Non voglio disturbare."`,                                                       effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Su cosa sta lavorando, se posso chiedere?"`,                                                                  effetti: { rep: +1, sblocca: 'hv_n01_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Sono quello di turno, a quanto pare. Posso restare un momento?"`,                                             effetti: { rep:  0 } },
            { tono: 'cauto',   testo: `"Prendo quello che mi serve e me ne vado."`,                                                                   effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Mi scuso per l'interruzione. Prendo solo quello che mi serve."`,                                              effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Sono puntuale nell'essere quello di cui aveva bisogno."`,                                                     effetti: { rep: -1 } },
          ]
        },
        {
          id: 'hv_n02',
          contesto: 'Vorn ti guarda terminare un esercizio e dice, quasi tra sé.',
          testo: `"Hai le mani giuste per l'incantamento. È raro."`,
          risposte: [
            { tono: 'diretto',  testo: `"Cosa significa esattamente?"`,                                                                                effetti: { rep: +2, sblocca: 'hv_n02_di' } },
            { tono: 'curioso',  testo: `"Come si sviluppa ulteriormente?"`,                                                                            effetti: { rep: +1, sblocca: 'hv_n02_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Non sapevo che fosse qualcosa che si potesse notare. Come lo vede?"`,                                         effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Grazie. Cercherò di valorizzarlo."`,                                                                          effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"È un bel complimento. Non me lo aspettavo."`,                                                                 effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                                    effetti: { rep:  0 } },
          ]
        },
        {
          id: 'hv_n03',
          contesto: 'Vorn ti trattiene dopo la sessione con il tono di chi ha già deciso ma aspetta una conferma formale.',
          testo: `"Sto sviluppando una sequenza di incantamento che richiede un secondo operatore per la fase di calibrazione. Sei interessato a partecipare?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Sì. Cosa comporta esattamente?"`,                                                                             effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Che tipo di sequenza?"`,                                                                                      effetti: { rep: +1, sblocca: 'hv_n03_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `"Sì. Posso chiedervi cosa vi aspettate da me nel ruolo di secondo operatore?"`,                                effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono disponibile. Quando inizia?"`,                                                                           effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sì. Sono contento che abbiate pensato a me."`,                                                                effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                                        effetti: { rep:  0 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'hv_p01',
          contesto: 'Vorn esamina l\'oggetto che hai completato più a lungo del solito. Poi lo rimette sul banco.',
          testo: `"Questo ha un valore pratico reale. Non è un esercizio — funzionerebbe."`,
          risposte: [
            { tono: 'diretto',  testo: `"Lo sapevo durante la lavorazione. C'era qualcosa di diverso."`,                                               effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa lo distingue da un esercizio che funziona tecnicamente ma non ha valore pratico?"`,                      effetti: { rep: +1, sblocca: 'hv_p01_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `"Non ero sicuro che si vedesse. Cosa l'ha convinta?"`,                                                         effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Ho cercato di pensare all'applicazione durante la costruzione, non solo alla tecnica."`,                       effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"È quello che speravo. Come si replica?"`,                                                                     effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Quindi posso tenerlo?"`,                                                                                      effetti: { rep: -1 } },
          ]
        },
        {
          id: 'hv_p02',
          contesto: 'Vorn chiude la porta del laboratorio prima di iniziare a parlare.',
          testo: `"Quello che insegno in aula è tecnica. Quello che sto per dirti è strategia. Sono cose diverse e non tutti capiscono perché."`,
          risposte: [
            { tono: 'diretto',  testo: `"Ditemi la differenza."`,                                                                                      effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Perché non tutti capiscono la differenza?"`,                                                                  effetti: { rep: +1, sblocca: 'hv_p02_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `"Sono pronto ad ascoltare. Posso fare domande mentre spiegate?"`,                                              effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono pronto. Ascolto."`,                                                                                      effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sono contento che abbiate chiuso la porta. Significa che è importante."`,                                     effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Ascolto."`,                                                                                                   effetti: { rep:  0 } },
          ]
        },
        {
          id: 'hv_p03',
          contesto: 'Vorn è in corridoio con Kael Dorne quando ti incrocia. Si ferma.',
          testo: `"Aspetta. Volevo che sentissi questo." Si volta verso Dorne. "Digli quello che mi hai detto sulle rune di transizione."`,
          risposte: [
            { tono: 'curioso',  testo: `Ascolti con attenzione. "C'è un collegamento con quello che stavamo studiando la settimana scorsa?"`,          effetti: { rep: +1, sblocca: 'hv_p03_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `Ascolti senza interrompere, poi ringrazi entrambi.`,                                                           effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `Dopo aver ascoltato: "Questo cambia l'approccio alla fase di calibrazione."`,                                  effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Sono contento di essere passato di qui nel momento giusto."`,                                                 effetti: { rep:  0 } },
            { tono: 'formale',   testo: `Ascolti e prendi nota mentalmente.`,                                                                           effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"La tempistica è stata più vostra che mia."`,                                                                  effetti: { rep: -1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'hv_mp01',
          contesto: 'Vorn ti guarda con la valutazione silenziosa che riserva agli studenti che considera investimenti a lungo termine.',
          testo: `"Tra due anni, se continui così, avrai delle scelte da fare su dove concentrare il tuo sviluppo. Inizia a pensarci adesso — non quando arriva il momento."`,
          risposte: [
            { tono: 'diretto',  testo: `"Ci sto già pensando. Posso chiedervi cosa vedreste voi in me?"`,                                              effetti: { rep: +2, sblocca: 'hv_mp01_di' } },
            { tono: 'cauto',   testo: `"È un consiglio che non dimenticherò. Cosa consigliate di osservare in me stesso nel frattempo?"`,              effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa vedete adesso che vi fa pensare a tra due anni?"`,                                                       effetti: { rep: +1, sblocca: 'hv_mp01_cu', narrativo: true } },
            { tono: 'formale',   testo: `"Lo terrò presente. È un tipo di pianificazione a cui non ero abituato."`,                                     effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Non me lo aspettavo. Grazie davvero."`,                                                                       effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep:  0 } },
          ]
        },
        {
          id: 'hv_mp02',
          contesto: 'Vorn entra in laboratorio con qualcosa di diverso nel passo. La sessione è regolare, ma alla fine ti trattiene.',
          testo: `"Come stai reagendo a quello che si sente in giro?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Con una certa preoccupazione. Ma non mi lascia paralizzato."`,                                                effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non ancora con chiarezza. Sto cercando di non reagire prima di capire."`,                                     effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Dipende da cosa è vero e cosa è esagerato. Cosa ne sapete voi?"`,                                             effetti: { rep: +1, sblocca: 'hv_mp02_cu' } },
            { tono: 'amichevole',  testo: `"Onestamente? Non lo so ancora. E voi?"`,                                                                      effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Con attenzione. Non voglio che influenzi il mio rendimento."`,                                                effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non ci ho ancora riflettuto a fondo."`,                                                                       effetti: { rep:  0 } },
          ]
        },
        {
          id: 'hv_mp03',
          contesto: 'Vorn sta riponendo gli strumenti. Ti volta le spalle ma sente che sei entrato.',
          testo: `"Un semestre. Cosa porti via di concreto?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Una tecnica che a settembre non avevo e tre errori che non ripeterò."`,                                       effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Posso chiedervi cosa vorreste che portassi via, secondo voi?"`,                                               effetti: { rep: +1, sblocca: 'hv_mp03_cu' } },
            { tono: 'cauto',   testo: `"Più domande di quando sono arrivato. Non so se è la risposta giusta."`,                                       effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Competenze tecniche più solide e una comprensione più chiara di dove sono ancora carente."`,                  effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Abbastanza da voler tornare a saperne di più."`,                                                              effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Tutto quello che non ho rotto."`,                                                                             effetti: { rep: -1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'hv_e01',
          trigger: 'dopo_promozione',
          contesto: 'Vorn ti trova dopo la cerimonia con l\'espressione di chi ha qualcosa di preciso da dire.',
          testo: `"Il titolo che hai ricevuto oggi apre delle porte. Alcune le vedrai subito. Altre le vedrai solo se sai dove guardare."`,
          risposte: [
            { tono: 'diretto',  testo: `"Dove devo guardare?"`,                                                                                        effetti: { rep: +2, sblocca: 'hv_e01_di' } },
            { tono: 'curioso',  testo: `"Quali porte non si vedono subito?"`,                                                                          effetti: { rep: +1, sblocca: 'hv_e01_cu' } },
            { tono: 'cauto',   testo: `"Come si impara a vedere quelle che non sono ovvie?"`,                                                         effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Terrò presente che non tutte le opportunità si presentano da sole."`,                                         effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"È il tipo di consiglio che vale più del titolo stesso."`,                                                     effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Capito. Grazie."`,                                                                                            effetti: { rep:  0 } },
          ]
        },
        {
          id: 'hv_e02',
          trigger: 'fine_anno',
          contesto: 'Vorn sta riponendo gli strumenti a fine anno.',
          testo: `"Torni il prossimo semestre con le idee più chiare di adesso. Non chiedo di più."`,
          risposte: [
            { tono: 'diretto',  testo: `"Lo farò."`,                                                                                                   effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Su cosa dovrei concentrarmi durante la pausa?"`,                                                              effetti: { rep: +1, sblocca: 'hv_e02_c' } },
            { tono: 'formale',   testo: `"È un obiettivo preciso. Lo prendo come tale."`,                                                               effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Le idee più chiare e qualche risposta in più. Ci lavoro."`,                                                   effetti: { rep:  0 } },
            { tono: 'curioso',  testo: `"Cosa vi aspettate di trovare, al mio ritorno?"`,                                                              effetti: { rep:  0, sblocca: 'hv_e02_cu' } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep:  0 } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // KD — KAEL DORNE | Adepto, Spellcasting | (28+)
  // Energico, diretto, con lampi di serietà
  // Giocatore usa: Lei
  // ============================================================
  kaelDorne: {

    voicelines: [
      { id: 'kd_v01', contesto: 'inizio_lezione', testo: `"Okay, siete tutti qui. Bene. Oggi facciamo una cosa che richiede che abbiate la testa dentro — non fuori, non per metà. Dentro. Se avete altro per la testa, mettetelo da parte adesso o sarà una sessione inutile per tutti."` },
      { id: 'kd_v02', contesto: 'inizio_lezione', testo: `"Niente appunti oggi. Niente. Quello che imparerete adesso lo imparerete facendolo, non scrivendolo. Se avete bisogno di annotare qualcosa dopo, avete il tempo che volete."` },
      { id: 'kd_v03', contesto: 'inizio_lezione', testo: `"Prima domanda, e voglio una risposta vera — chi ha praticato quello che abbiamo visto la settimana scorsa? Bene. Chi non l'ha fatto si siedesse più avanti."` },
      { id: 'kd_v04', contesto: 'fine_lezione',   testo: `"Basta per oggi. Avete fatto bene — alcuni meglio di quanto pensassero di poter fare, e questo è il tipo di sorpresa che mi piace. Arrivederci."` },
      { id: 'kd_v05', contesto: 'fine_lezione',   testo: `"Finito. Ricordate: la spell che non riusciva alla fine di oggi — riprovatela stasera, quando siete stanchi. È lì che si impara davvero."` },
      { id: 'kd_v06', contesto: 'fine_lezione',   testo: `"Andate. E se qualcuno vuole restare a provare ancora — la sala è vostra per un'altra mezz'ora. Non obbligatorio. Ma non ve ne pentirete."` },
      { id: 'kd_v07', contesto: 'commento_spell',  testo: `"Aspetta aspetta aspetta — rifallo. Più lentamente. Voglio vedere esattamente cosa hai appena fatto perché non avevo previsto che funzionasse così."` },
      { id: 'kd_v08', contesto: 'commento_spell',  testo: `"Sì. Quello era giusto. Non quasi giusto — giusto. Sentivi la differenza mentre la eseguivi?"` },
      { id: 'kd_v09', contesto: 'commento_spell',  testo: `"Hai usato troppa forza nella fase di apertura. Il risultato è comunque accettabile, ma è come aprire una porta a calci quando avresti potuto usare la maniglia."` },
      { id: 'kd_v10', contesto: 'commento_spell',  testo: `"Quella spell aveva una qualità che non si insegna — si trova. Non so se te ne sei accorto. Adesso lo sai."` },
      { id: 'kd_v11', contesto: 'promozione_apprendista', testo: `"Apprendista. Sai qual è la differenza tra lanciare una spell e lanciarla bene? Tra poco comincerai a capirlo davvero. Non perché te lo dico io — perché sentirai la differenza."` },
      { id: 'kd_v12', contesto: 'promozione_apprendista', testo: `"Okay, Apprendista. Il livello delle aspettative si è appena alzato. Non è una minaccia — è una notizia. La cosa buona? Sei abbastanza bravo da riceverla."` },
      { id: 'kd_v13', contesto: 'promozione_esperto',     testo: `"Esperto in Spellcasting. Lo dico senza ironia per una volta: è un traguardo. Lo Spellcasting a questo livello richiede una cosa che non si insegna — si acquisisce. Voi l'avete acquisita."` },
    ],

    primoIngresso: [
      {
        id: 'kd_pi01',
        contesto: 'Fine di una sessione di Spellcasting. Dorne si avvicina prima che tu possa andartene — non ha l\'aria di chi vuole dare una valutazione formale.',
        testo: `"Ha fatto una cosa interessante lì in mezzo. Non sono sicuro che se ne sia accorto." Non aspetta risposta. "Come descrive lei quello che ha sentito nel momento in cui ha lanciato quella sequenza? Non cosa ha fatto — cosa ha sentito."`,
        risposte: [
          { tono: 'curioso',    testo: `"Un momento di chiarezza — come se il gesto fosse arrivato prima del pensiero."`,                         effetti: { rep: +3 } },
          { tono: 'diretto',    testo: `"Una resistenza iniziale, poi qualcosa che ha ceduto nel modo giusto."`,                                   effetti: { rep: +3 } },
          { tono: 'cauto',      testo: `"Non riesco a descriverlo con precisione. È per questo che è interessante."`,                              effetti: { rep: +2 } },
          { tono: 'ironico',    testo: `"Confusione seguita da qualcosa che assomigliava alla competenza."`,                                       effetti: { rep: +2 } },
          { tono: 'distaccato', testo: `"Non lo so ancora."`,                                                                                     effetti: { rep: +1 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'kd_o01',
          contesto: 'Dorne ti aspetta fuori dall\'aula con le braccia conserte e un\'espressione perplessa.',
          testo: `"Okay, cosa stava succedendo oggi? Perché ho visto un banco occupato ma non uno studente."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Ha ragione. Ero altrove. Non è una scusa, lo so."`,                                                           effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Ho avuto una settimana difficile. Non sarebbe dovuto trasparire."`,                                           effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Come si vede, dall'esterno, quando uno è presente e quando non lo è?"`,                                       effetti: { rep: +3, sblocca: 'kd_o01_cu' } },
            { tono: 'ironico',   testo: `"Il mio banco ha partecipato per me. Non è abbastanza?"`,                                                      effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non riesco a spiegarlo bene. Ma ha ragione che non ero presente."`,                                           effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Mi scuso. Non si ripeterà."`,                                                                                 effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_o02',
          contesto: 'Dorne ti incrocia nel corridoio e rallenta.',
          testo: `"Senti, lo dico senza giri di parole — stai tenendo un ritmo che non ti fa crescere. E lo vedo io, quindi lo vedi anche tu."`,
          risposte: [
            { tono: 'diretto',  testo: `"Lo vedo. Non so ancora come uscirne."`,                                                                      effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Ha ragione. Posso chiederle cosa vede che dovrei cambiare per primo?"`,                                       effetti: { rep: +2, sblocca: 'kd_o02_am' } },
            { tono: 'curioso',  testo: `"Cosa vede esattamente che non va?"`,                                                                          effetti: { rep: +3, sblocca: 'kd_o02_cu' } },
            { tono: 'ironico',   testo: `"Almeno siamo d'accordo sul problema."`,                                                                       effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non sapevo che fosse così visibile. Cosa consiglierebbe?"`,                                                   effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Capisco. Provvederò a migliorare."`,                                                                          effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'kd_t01',
          contesto: 'Dorne ti guarda rifare la sequenza per la terza volta e scuote la testa con un sorriso storto.',
          testo: `"Stai pensando troppo. La stai costruendo come se fosse un edificio invece di qualcosa che respira."`,
          risposte: [
            { tono: 'curioso',  testo: `"Come si smette di pensare e si inizia a sentire la sequenza?"`,                                               effetti: { rep: +3, sblocca: 'kd_t01_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"Ha senso. Ma come si fa in pratica?"`,                                                                        effetti: { rep: +2, sblocca: 'kd_t01_am' } },
            { tono: 'ironico',   testo: `"Una spell che respira. È un'immagine utile e terrificante insieme."`,                                         effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa devo fare diversamente nel prossimo tentativo?"`,                                                        effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non capisco ancora la distinzione. Può mostrarmi la differenza?"`,                                            effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Capito. Riprovo con un approccio diverso."`,                                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_t02',
          contesto: 'Dorne si siede sul bordo della cattedra mentre gli altri escono.',
          testo: `"Okay. Parliamo. Cosa non funziona con la sequenza di apertura?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Non riesco a mantenere la concentrazione nella transizione tra il secondo e il terzo gesto."`,                effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Non lo so con precisione. Può aiutarmi a capire dove si rompe?"`,                                            effetti: { rep: +3, sblocca: 'kd_t02_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"Onestamente? Non lo so. Ma so che si sente quando va male."`,                                                 effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Se lo sapessi con precisione probabilmente non sarei qui a rifarlo per la quinta volta."`,                    effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Ho un'ipotesi. La transizione tra il secondo e il terzo passaggio."`,                                         effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"La difficoltà è nella fase di transizione intermedia."`,                                                      effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_t03',
          contesto: 'Dorne ti incrocia con un caffè in mano e l\'espressione di qualcuno che ha appena finito qualcosa di estenuante.',
          testo: `"Com'è andata la sessione di Vesti stamattina?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Intensa. Ha citato il capitolo diciassette tre volte."`,                                                      effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Sopravvissuto. Il che, con Vesti, è già un risultato."`,                                                      effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Bene. Ma lei come lo sa che avevo lezione con Vesti stamattina?"`,                                            effetti: { rep: +3, sblocca: 'kd_t03_cu' } },
            { tono: 'diretto',  testo: `"Bene. Impegnativa ma utile."`,                                                                               effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Bene. Perché lo chiede?"`,                                                                                    effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Produttiva. Ho molto su cui lavorare."`,                                                                      effetti: { rep: -1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'kd_n01',
          contesto: 'Dorne entra in aula con un\'energia che suggerisce che quello che sta per mostrare gli piace davvero.',
          testo: `"Oggi facciamo qualcosa di interessante. La spell di dislocamento temporanea. Prima che qualcuno chieda — no, non è pericolosa. Sì, è difficile. Chi vuole provare per primo?"`,
          risposte: [
            { tono: 'amichevole',  testo: `Alzi la mano senza esitare.`,                                                                                  effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Posso chiederle prima come funziona il meccanismo?"`,                                                         effetti: { rep: +3, sblocca: 'kd_n01_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"Pericolosa no, difficile sì. Combinazione che preferisco."`,                                                  effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Io." Dici semplicemente.`,                                                                                    effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Aspetti di vedere come reagiscono gli altri prima di alzare la mano.`,                                         effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Aspetti in silenzio.`,                                                                                         effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_n02',
          contesto: 'Dorne si ferma mentre passi e ti guarda come se stesse calcolando qualcosa.',
          testo: `"Sai che nelle ultime tre sessioni hai migliorato la velocità di esecuzione del venti per cento? Non te ne sei accorto, vero?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"No! Come fa a saperlo con quella precisione?"`,                                                               effetti: { rep: +2, sblocca: 'kd_n02_am' } },
            { tono: 'ironico',   testo: `"Il venti per cento. Lo misura davvero o è una stima ottimistica?"`,                                           effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Come si misura la velocità di esecuzione? Cosa cambia concretamente?"`,                                       effetti: { rep: +3, sblocca: 'kd_n02_cu', conoscenza: +1 } },
            { tono: 'diretto',  testo: `"Non me ne ero accorto. Come lo sfrutto?"`,                                                                    effetti: { rep: +2, sblocca: 'kd_n02_di' } },
            { tono: 'cauto',   testo: `"Non me ne ero accorto. Sto sacrificando qualcos'altro?"`,                                                     effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"No. Grazie."`,                                                                                                effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_n03',
          contesto: 'Dorne si appoggia alla parete con le braccia conserte e un\'espressione che significa che non stai per ricevere una lezione.',
          testo: `"Senti, c'è una cosa che penso sullo spellcasting che non combacia con quello che si insegna di solito. Vuoi sentirla?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Da dove parte?"`,                                                                                         effetti: { rep: +3, sblocca: 'kd_n03_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"Sì. Soprattutto se è controversa."`,                                                                          effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Una teoria non ortodossa. Sono molto interessato."`,                                                           effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Sì. Dica."`,                                                                                                  effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sì. Posso fare domande mentre spiega?"`,                                                                      effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare."`,                                                                                  effetti: { rep: -1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'kd_p01',
          contesto: 'Dorne ti aspetta dopo che gli altri sono usciti con l\'espressione di chi ha un\'idea e non vede l\'ora di condividerla.',
          testo: `"Ho una sequenza che ho sviluppato l'anno scorso. Non l'ho mai insegnata in classe perché è fuori curriculum. Ma voglio vedere se riesci a eseguirla."`,
          risposte: [
            { tono: 'curioso',  testo: `"Che tipo di sequenza?"`,                                                                                      effetti: { rep: +3, sblocca: 'kd_p01_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"Ci provo. Qual è il livello di difficoltà?"`,                                                                 effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Fuori curriculum significa più interessante o più pericolosa?"`,                                               effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Mostratemela."`,                                                                                              effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Cosa succede se non riesco?"`,                                                                                effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Sono disponibile. Quando vuole iniziare?"`,                                                                   effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_p02',
          contesto: 'Dorne rimane in silenzio per un momento dopo che hai finito — cosa insolita per lui.',
          testo: `"Okay. Quello era davvero buono. Non lo dico spesso, quindi tienitelo."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Lo tengo. Grazie davvero."`,                                                                                  effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Lo conservo come documento storico."`,                                                                        effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa era diverso rispetto alle volte precedenti, secondo lei?"`,                                              effetti: { rep: +3, sblocca: 'kd_p02_cu', conoscenza: +1 } },
            { tono: 'diretto',  testo: `"Lo sentivo anch'io. Cosa ha fatto la differenza?"`,                                                           effetti: { rep: +2, sblocca: 'kd_p02_di' } },
            { tono: 'cauto',   testo: `"Apprezzo che me lo dica. Non lo do per scontato."`,                                                           effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                                    effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_p03',
          contesto: 'Dorne ti guarda dall\'altra parte dell\'aula durante la lezione.',
          testo: `"Tu. Vieni qui." Non è una domanda. Davanti a tutti: "Mostragli come si fa la sequenza di apertura. Quella vera, non quella del manuale."`,
          risposte: [
            { tono: 'amichevole',  testo: `Vai avanti con un sorriso. Ti piace.`,                                                                         effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Quella vera. Significa che ne sa due versioni anche lei?"`,                                                   effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `Prima di iniziare: "Qual è la differenza tra quella vera e quella del manuale?"`,                              effetti: { rep: +3, sblocca: 'kd_p03_cu', conoscenza: +2 } },
            { tono: 'diretto',  testo: `Vai avanti senza commenti. Esegui.`,                                                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Spero di ricordarmela nel modo giusto." Poi esegui.`,                                                         effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Vai avanti e esegui in silenzio.`,                                                                             effetti: { rep: -1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'kd_mp01',
          contesto: 'Dorne è insolitamente fermo, appoggiato alla finestra dopo che l\'aula si è svuotata.',
          testo: `"Sai che avevo la tua età quando ho eseguito la mia prima sequenza avanzata? Non era corretta al cento per cento. Ma funzionava. E nessuno riusciva a spiegarmi perché."`,
          risposte: [
            { tono: 'curioso',  testo: `"Come l'ha scoperto alla fine?"`,                                                                              effetti: { rep: +3, sblocca: 'kd_mp01_cu', narrativo: true } },
            { tono: 'amichevole',  testo: `"Come si sente, sapere di aver fatto qualcosa che nessuno sapeva spiegare?"`,                                  effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"E adesso lo sa spiegare o è ancora un mistero?"`,                                                             effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa le ha insegnato quell'esperienza?"`,                                                                     effetti: { rep: +2, sblocca: 'kd_mp01_di' } },
            { tono: 'cauto',   testo: `Ascolta senza interrompere. Poi: "Perché me lo sta raccontando adesso?"`,                                      effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Interessante."`,                                                                                              effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_mp02',
          contesto: 'Dorne entra in aula senza la sua energia abituale. La sessione è più breve. Alla fine ti ferma.',
          testo: `"Come stai con tutta questa storia?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Un po' stordito, onestamente. E lei?"`,                                                                       effetti: { rep: +2, sblocca: 'kd_mp02_am' } },
            { tono: 'curioso',  testo: `"Dipende da cosa è vero. Lei cosa sa?"`,                                                                       effetti: { rep: +3, sblocca: 'kd_mp02_cu' } },
            { tono: 'ironico',   testo: `"Meglio quando non ci penso. Il che non funziona bene come strategia."`,                                       effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Con preoccupazione contenuta. Non mi lascia paralizzato."`,                                                   effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Non ancora bene. Sto cercando di non reagire prima di capire."`,                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Bene."`,                                                                                                      effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_mp03',
          contesto: 'Dorne ti incrocia vicino all\'uscita a fine anno. Si ferma un secondo.',
          testo: `"Bella stagione. Non lo dico a tutti."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Lo tengo come chiusura ufficiale del semestre."`,                                                             effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Quanti lo ricevono, di solito? Per capire il valore di mercato."`,                                            effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa l'ha resa bella, secondo lei?"`,                                                                         effetti: { rep: +3, sblocca: 'kd_mp03_cu' } },
            { tono: 'diretto',  testo: `"Grazie. È stato un buon semestre."`,                                                                          effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Grazie. Spero di meritarlo anche il prossimo."`,                                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                                    effetti: { rep: -1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'kd_e01',
          trigger: 'dopo_promozione',
          contesto: 'Dorne ti raggiunge con il passo solito ma un tono leggermente diverso.',
          testo: `"Apprendista. Sai qual è la prima cosa che cambia adesso, nella pratica?"`,
          risposte: [
            { tono: 'curioso',  testo: `"No. Me lo dica."`,                                                                                            effetti: { rep: +3, sblocca: 'kd_e01_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"No, ma so che sarà qualcosa di interessante."`,                                                               effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Le aspettative. Le sue su di me."`,                                                                           effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa cambia?"`,                                                                                               effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Ho qualche idea, ma preferisco sentire la sua versione."`,                                                    effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Sono pronto a saperlo."`,                                                                                     effetti: { rep: -1 } },
          ]
        },
        {
          id: 'kd_e02',
          trigger: 'crisi_province',
          contesto: 'Dorne ti incrocia nel corridoio con un\'espressione che per una volta non scherza.',
          testo: `"Hai sentito quello che gira. Come la stai prendendo?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Con pragmatismo. Non posso fare niente dalla mia posizione — mi concentro su quello che posso."`,             effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Onestamente? Non benissimo. E lei?"`,                                                                         effetti: { rep: +2, sblocca: 'kd_e02_am' } },
            { tono: 'curioso',  testo: `"Dipende da quanto è vero. Lei sa qualcosa di più?"`,                                                          effetti: { rep: +3, sblocca: 'kd_e02_cu' } },
            { tono: 'ironico',   testo: `"Come la prendono tutti: con una faccia composta e molta ansia sotto."`,                                       effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sto aspettando di capire prima di reagire."`,                                                                 effetti: { rep:  0 } },
            { tono: 'formale',   testo: `"Con la dovuta attenzione."`,                                                                                  effetti: { rep: -1 } },
          ]
        },
      ],
    },
  },

  // ============================================================
  // MtS — MATTEO SERVI | Archivista, Storia | (42+)
  // Pacato, malinconico, tende a concludere con una domanda
  // Giocatore usa: Lei
  // ============================================================
  matteoServi: {

    voicelines: [
      { id: 'mts_v01', contesto: 'inizio_lezione', testo: `"Aprite a pagina ottantaquattro. La storia non si ricorda — si interpreta. Tenete a mente la differenza per tutta la durata di questo corso."` },
      { id: 'mts_v02', contesto: 'inizio_lezione', testo: `"Oggi parliamo di una decisione presa trecento anni fa da qualcuno che non sapeva di stare decidendo per trecento anni. Questo è quello che fa la storia: rende visibili le conseguenze che chi agiva non poteva vedere."` },
      { id: 'mts_v03', contesto: 'inizio_lezione', testo: `"Prima di cominciare — qualcuno ha una domanda sulla lezione di ieri? Non sul testo — sulla lezione. C'è differenza."` },
      { id: 'mts_v04', contesto: 'inizio_lezione', testo: `"Oggi il programma prevede una cosa, ma ho cambiato idea stamattina. Vi spiego perché mentre procediamo."` },
      { id: 'mts_v05', contesto: 'fine_lezione',   testo: `"Per oggi mi fermo qui. Non perché non ci sia altro — c'è sempre altro. Ma alcune cose hanno bisogno di sedimentare prima che si possa aggiungere qualcosa sopra. Andate."` },
      { id: 'mts_v06', contesto: 'fine_lezione',   testo: `"La sessione è conclusa. La domanda che vi lascio — e non è retorica — è questa: chi stava davvero decidendo in quel momento, e chi pensava solo di farlo?"` },
      { id: 'mts_v07', contesto: 'fine_lezione',   testo: `"Andate. E se qualcosa di oggi vi disturba, è un buon segno. La storia che non disturba è storia mal capita."` },
      { id: 'mts_v08', contesto: 'commento_ricerca', testo: `"Questo testo che hai trovato — sai da quanto tempo era nell'archivio? Da prima che tu nascessi. E nessuno lo aveva citato. Vale la pena chiedersi perché."` },
      { id: 'mts_v09', contesto: 'commento_ricerca', testo: `"Attenzione. Hai usato questa fonte come se fosse neutrale. Non lo è. Nessuna fonte lo è. Rileggi sapendo chi l'ha scritta e in quale momento."` },
      { id: 'mts_v10', contesto: 'promozione_copista',     testo: `"Ogni volta che un nuovo Copista diventa Apprendista, mi chiedo cosa abbiano capito davvero e cosa abbiano solo imparato a ripetere. Non è una critica. È una domanda che merita una risposta lunga. Avete tutto il tempo."` },
      { id: 'mts_v11', contesto: 'promozione_erudito',     testo: `"Erudito. È un titolo che porta con sé una responsabilità strana: quella di sapere abbastanza da capire quanto ancora non si sa. È una condizione scomoda. È anche la condizione migliore in cui si possa essere."` },
    ],

    primoIngresso: [
      {
        id: 'mts_pi01',
        contesto: 'Fine di una lezione di Storia. Servi rimane alla cattedra — non come chi aspetta, ma come chi non ha ancora finito di pensare a quello che ha detto.',
        testo: `"Ha un'aria da persona che ha trovato qualcosa di strano nella lezione di oggi." Una pausa. "Non è un'accusa. È una domanda, se vuole prenderla così."`,
        risposte: [
          { tono: 'curioso',    testo: `"Sì. Una delle date non torna con quello che ho letto altrove. Forse ho letto male."`,                    effetti: { rep: +3 } },
          { tono: 'cauto',      testo: `"Ho trovato alcune cose difficili da collegare. Non sapevo se fosse un mio problema."`,                    effetti: { rep: +3 } },
          { tono: 'diretto',    testo: `"Ho una domanda sulla fonte che ha citato. È verificabile?"`,                                             effetti: { rep: +2 } },
          { tono: 'amichevole', testo: `"La lezione mi ha lasciato più domande di quante ne avessi prima. Mi sembra un buon segno."`,             effetti: { rep: +2 } },
          { tono: 'distaccato', testo: `"Stavo solo riordinando gli appunti."`,                                                                   effetti: { rep:  0 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'mts_o01',
          contesto: 'Servi aspetta che la classe finisca di copiare prima di avvicinarsi al tuo banco.',
          testo: `"Hai risposto correttamente. Ma hai risposto come se la storia fosse un elenco di fatti da memorizzare. Non lo è. È una domanda aperta a cui qualcuno ha già risposto male."`,
          risposte: [
            { tono: 'cauto',   testo: `"Non avevo pensato alla distinzione. Come si risponde in modo diverso?"`,                                      effetti: { rep: +2, sblocca: 'mts_o01_c' } },
            { tono: 'curioso',  testo: `"Cosa rende una risposta storica più di un elenco?"`,                                                          effetti: { rep: +2, sblocca: 'mts_o01_cu', conoscenza: +1 } },
            { tono: 'formale',   testo: `"Capito. Cercherò di approfondire l'interpretazione oltre il dato."`,                                          effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Come cambio l'approccio?"`,                                                                                   effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Ha ragione. Stavo ripetendo piuttosto che pensando."`,                                                        effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Qualcuno ha già risposto male. Questo è il modo più gentile che ho sentito per dirmi che ho sbagliato."`,     effetti: { rep: -2 } },
          ]
        },
        {
          id: 'mts_o02',
          contesto: 'Servi ti nota tra gli scaffali con il libro sbagliato in mano. Aspetta che tu lo veda anche tu.',
          testo: `"Quel testo è una sintesi divulgativa. Se stai preparando il seminario con quello, capirei la qualità delle ultime risposte."`,
          risposte: [
            { tono: 'cauto',   testo: `"Ha ragione. Quale testo dovrei usare invece?"`,                                                               effetti: { rep: +2, sblocca: 'mts_o02_c' } },
            { tono: 'curioso',  testo: `"Qual è la differenza tra quello e le fonti primarie?"`,                                                       effetti: { rep: +2, sblocca: 'mts_o02_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Non lo sapevo. Può indicarmi il testo giusto?"`,                                                              effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa devo leggere?"`,                                                                                         effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Mi scuso. Posso chiederle cosa consiglierebbe?"`,                                                             effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Capito. Lo cambio."`,                                                                                         effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'mts_t01',
          contesto: 'Servi ti restituisce il testo non con correzioni, ma con domande scritte nei margini.',
          testo: `"Non ho segnato gli errori. Ho segnato le domande che il tuo testo non si è posto. Prova a risponderle."`,
          risposte: [
            { tono: 'curioso',  testo: `"Posso chiederle quale considera la più importante tra queste domande?"`,                                      effetti: { rep: +2, sblocca: 'mts_t01_cu' } },
            { tono: 'cauto',   testo: `"Ci proverò. Posso tornare da lei dopo averle affrontate?"`,                                                   effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"È un metodo di correzione che non avevo mai ricevuto. È più difficile delle annotazioni standard."`,          effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Le rispondo per iscritto e gliele riporto?"`,                                                                 effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Capito. Lavorerò su ciascuna."`,                                                                              effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep: -1 } },
          ]
        },
        {
          id: 'mts_t02',
          contesto: 'Servi rimane seduto mentre gli altri escono. Non ti chiama — aspetta.',
          testo: `"Hai passato un'ora in questa stanza senza essere qui. Non te lo dico per rimproverarti. Te lo dico perché l'ho notato e mi chiedo perché."`,
          risposte: [
            { tono: 'amichevole',  testo: `"È stata una settimana pesante. Non riuscivo a lasciare fuori quello che avevo in testa."`,                    effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non so spiegarlo bene. Ma ha ragione."`,                                                                      effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Come fa a distinguere uno studente assente da uno che semplicemente non partecipa?"`,                          effetti: { rep: +1, sblocca: 'mts_t02_cu' } },
            { tono: 'diretto',  testo: `"Ho la testa da un'altra parte. Cercherò di non portarlo in aula."`,                                           effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Mi scuso. Non si ripeterà."`,                                                                                 effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Ha ragione. Non era una buona giornata."`,                                                                    effetti: { rep: -1 } },
          ]
        },
        {
          id: 'mts_t03',
          contesto: 'Servi interrompe la spiegazione e ti guarda direttamente.',
          testo: `"Tu. Se dovessi scegliere un solo motivo per cui quella guerra è finita come è finita — uno solo — quale sceglieresti?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Prima posso chiederle quale sceglie lei, per capire il livello di analisi che cerca?"`,                       effetti: { rep: +2, sblocca: 'mts_t03_cu' } },
            { tono: 'cauto',   testo: `Ci pensi un momento. "La stanchezza collettiva. Non la sconfitta militare — la stanchezza."`,                  effetti: { rep: +2, sblocca: 'mts_t03_c' } },
            { tono: 'diretto',  testo: `"La mancanza di un obiettivo condiviso tra chi doveva vincere insieme."`,                                      effetti: { rep: +1, sblocca: 'mts_t03_di' } },
            { tono: 'amichevole',  testo: `"Non lo so ancora con certezza. Ma lo trovo una domanda impossibile in modo affascinante."`,                   effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"La disintegrazione delle alleanze interne alla coalizione vincente."`,                                        effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Il motivo sbagliato. Che di solito è quello che decide davvero le guerre."`,                                  effetti: { rep: -2 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'mts_n01',
          contesto: 'Servi apre il libro a una pagina che non è nel programma della settimana.',
          testo: `"Oggi mi allontano dal curriculum. C'è una decisione presa duecento anni fa che non viene quasi mai analizzata con la serietà che merita. Voglio sentire cosa ne pensate prima di dirvi cosa ne penso io."`,
          risposte: [
            { tono: 'curioso',  testo: `"Di che decisione si tratta?"`,                                                                                effetti: { rep: +2, sblocca: 'mts_n01_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `Ascolti la presentazione in silenzio prima di rispondere.`,                                                    effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Da dove cominciamo?"`,                                                                                        effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"È raro che un docente chieda prima di spiegare. Mi piace."`,                                                  effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare e a contribuire."`,                                                                  effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Una decisione poco analizzata. La storia è piena di ottime ragioni per cui alcune cose vengono dimenticate."`, effetti: { rep: -2 } },
          ]
        },
        {
          id: 'mts_n02',
          contesto: 'Servi è seduto a un tavolo con quattro volumi aperti davanti. Alza lo sguardo quando ti avvicini.',
          testo: `"Cercavi me o cercavi un posto tranquillo?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Entrambe le cose. Cosa sta cercando?"`,                                                                       effetti: { rep: +2, sblocca: 'mts_n02_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Te cercavo. Ma adesso sono curioso di cosa stia facendo."`,                                                   effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Un posto tranquillo. Ma se posso essere utile, sono qui."`,                                                   effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"La cercavo. Ho una domanda sulla lezione di ieri."`,                                                          effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"La cercavo, se ha un momento."`,                                                                              effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Un posto tranquillo."`,                                                                                       effetti: { rep: -1 } },
          ]
        },
        {
          id: 'mts_n03',
          contesto: 'Servi è in piedi davanti a uno scaffale della biblioteca. Le dita scorrono le costole dei volumi.',
          testo: `"Stavo cercando qualcosa che probabilmente non troverò qui. Ma a volte non trovarlo è già una risposta."`,
          risposte: [
            { tono: 'curioso',  testo: `"Cosa sta cercando?"`,                                                                                         effetti: { rep: +2, sblocca: 'mts_n03_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Posso aiutarla a cercare?"`,                                                                                  effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Non trovarlo come risposta. Mi piace quella prospettiva."`,                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa rende la mancanza stessa una risposta?"`,                                                                effetti: { rep: +1, sblocca: 'mts_n03_di' } },
            { tono: 'formale',   testo: `"Posso chiederle di che argomento si tratta?"`,                                                                effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Rimani in silenzio accanto a lui.`,                                                                            effetti: { rep:  0 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'mts_p01',
          contesto: 'Servi ti passa un volume sottile mentre esci dall\'aula.',
          testo: `"Non è nel programma. È una raccolta di lettere di un funzionario che ha vissuto gli eventi che abbiamo studiato questa settimana. La storia ufficiale e quella raccontata in queste lettere non sempre coincidono."`,
          risposte: [
            { tono: 'curioso',  testo: `"In che senso non coincidono?"`,                                                                               effetti: { rep: +2, sblocca: 'mts_p01_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"Lo leggo questa sera. Grazie davvero."`,                                                                      effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Come devo leggerlo — come fonte primaria o come documento personale?"`,                                       effetti: { rep: +2, sblocca: 'mts_p01_c' } },
            { tono: 'diretto',  testo: `"Lo leggo. Devo riportarle qualcosa dopo?"`,                                                                   effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"La ringrazio. Lo leggerò con attenzione."`,                                                                   effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Grazie." Prendi il volume.`,                                                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'mts_p02',
          contesto: 'Servi aspetta la fine della lezione. Poi, mentre ti alzi:',
          testo: `"Quella cosa che hai detto sulla causalità secondaria. Era giusta. Ma soprattutto era tua, non presa da un testo."`,
          risposte: [
            { tono: 'curioso',  testo: `"Come si riconosce un'osservazione originale da una ripetuta inconsapevolmente?"`,                             effetti: { rep: +2, sblocca: 'mts_p02_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Non me ne ero accorto in quel momento. È una delle cose più belle che mi abbiano detto quest'anno."`,         effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non ero sicuro di dirla ad alta voce. Temevo fosse una semplificazione."`,                                    effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Grazie. L'ho costruita leggendo le fonti che mi ha consigliato."`,                                           effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"La ringrazio. Cercherò di svilupparla ulteriormente."`,                                                       effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Sono contento che qualcosa di mio sia sopravvissuto al curriculum."`,                                        effetti: { rep: -2 } },
          ]
        },
        {
          id: 'mts_p03',
          contesto: 'Servi chiude il libro a metà spiegazione.',
          testo: `"C'è una cosa che penso sulla storia di questo periodo che non è nel curriculum perché è una mia interpretazione, non un fatto condiviso. Volete sentirla comunque?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Soprattutto perché è la sua."`,                                                                          effetti: { rep: +2, sblocca: 'mts_p03_cu', conoscenza: +2, narrativo: true } },
            { tono: 'cauto',   testo: `"Sì. E mi piacerebbe sapere su cosa si basa."`,                                                               effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Sì. Le interpretazioni personali mi interessano più dei fatti certi."`,                                       effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Dica."`,                                                                                                  effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare."`,                                                                                  effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Un'interpretazione non condivisa. È il tipo di storia che non si trova nei manuali."`,                        effetti: { rep: -2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'mts_mp01',
          contesto: 'Servi si siede di fronte a te in biblioteca con un\'espressione insolita — non malinconica, ma quasi animata.',
          testo: `"Sto lavorando a qualcosa che richiede un lettore fresco, senza i miei preconcetti. Sei disposto a leggere un documento e dirmi cosa vedi, senza sapere prima cosa sto cercando?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Di che tipo di documento si tratta?"`,                                                                    effetti: { rep: +2, sblocca: 'mts_mp01_cu', narrativo: true } },
            { tono: 'cauto',   testo: `"Sì. Preferisce che non faccia domande prima di leggere?"`,                                                    effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Sì. È un metodo di ricerca insolito. Mi piace già."`,                                                        effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Dammi il documento."`,                                                                                    effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono disponibile. Quando vuole che lo legga?"`,                                                               effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Va bene."`,                                                                                                   effetti: { rep: -1 } },
          ]
        },
        {
          id: 'mts_mp02',
          contesto: 'Servi è rimasto dopo che la biblioteca si è svuotata. Ti trova ancora lì, a leggere. Dopo un lungo silenzio dice:',
          testo: `"Ho cominciato a studiare la storia perché volevo capire perché certe cose erano andate come erano andate. Non ho mai trovato una risposta. Ho trovato solo domande migliori."`,
          risposte: [
            { tono: 'cauto',   testo: `"È quello che sento anch'io, alcune volte. È sconfortante o confortante?"`,                                    effetti: { rep: +2, sblocca: 'mts_mp02_c' } },
            { tono: 'curioso',  testo: `"Qual è la domanda migliore che ha trovato finora?"`,                                                          effetti: { rep: +2, sblocca: 'mts_mp02_cu', narrativo: true } },
            { tono: 'amichevole',  testo: `"Forse le domande migliori sono già una risposta di un certo tipo."`,                                          effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa cerca adesso, allora?"`,                                                                                 effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"È una condizione che immagino non si risolva mai del tutto."`,                                                effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Rimani in silenzio un momento, poi torni a leggere.`,                                                          effetti: { rep: -1 } },
          ]
        },
        {
          id: 'mts_mp03',
          contesto: 'Fine anno. Servi è all\'ultimo tavolo con un libro chiuso davanti. Ti nota.',
          testo: `"Un altro anno. Cosa resta, di solito, dopo un anno?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Cosa resta a lei, di solito?"`,                                                                               effetti: { rep: +2, sblocca: 'mts_mp03_cu', narrativo: true } },
            { tono: 'cauto',   testo: `"Dipende dall'anno. Questo lascia più domande che risposte. Non è un'accusa."`,                                effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Le domande che non sapevo di avere quando sono arrivato."`,                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Quello che ha cambiato il modo in cui penso. Il resto passa."`,                                               effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Le conoscenze consolidate e le lacune che ho scoperto. Entrambe utili."`,                                     effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non lo so ancora."`,                                                                                          effetti: { rep: -1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'mts_e01',
          trigger: 'crisi_province',
          contesto: 'Servi entra in aula e si siede senza aprire il libro.',
          testo: `"Ho cambiato il programma di oggi. Parliamo di quello che sta succedendo — non come evento attuale, ma come evento storico in corso. Cosa state vedendo?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Come si distingue, mentre succede, da quello che sembrerà importante tra cent'anni?"`,                        effetti: { rep: +2, sblocca: 'mts_e01_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `"Sto cercando di non reagire prima di capire. Ma è difficile sapere cosa osservare."`,                         effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Vedo qualcosa che assomiglia a cose che ho letto. Non so se è rassicurante o preoccupante."`,                 effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Vedo una crisi che qualcuno ha lasciato crescere troppo a lungo."`,                                           effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Vedo un momento che potrebbe diventare un punto di svolta. Non so ancora in quale direzione."`,               effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"Vedo la storia che si ripete. Il che, in questo corso, è quasi ironico."`,                                    effetti: { rep: -2 } },
          ]
        },
        {
          id: 'mts_e02',
          trigger: 'dopo_promozione',
          contesto: 'Servi ti trova in biblioteca il giorno dopo la cerimonia.',
          testo: `"Erudito. Come cambia il modo in cui guardi i testi da ieri a oggi?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Non lo so ancora. Come dovrebbe cambiare?"`,                                                                  effetti: { rep: +2, sblocca: 'mts_e02_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Non ancora. Forse ci vuole tempo per sentire la differenza."`,                                                effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Non lo so. Ma mi piace che me lo chieda come se ci fosse una risposta vera."`,                                effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Non è cambiato ancora. Forse cambierà con la prossima lettura."`,                                             effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Non lo so con certezza. È una domanda a cui spero di trovare risposta."`,                                     effetti: { rep: +1 } },
            { tono: 'ironico',   testo: `"I testi sembrano gli stessi. Forse sono io che sono diverso."`,                                               effetti: { rep: -2 } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // MS — MAREN SOLDE | Archivista, Filosofia | (38+)
  // Calorosa, inclusiva, non dà risposte — pone domande migliori
  // Giocatore usa: Lei
  // ============================================================
  marenSolde: {

    voicelines: [
      { id: 'ms_v01', contesto: 'inizio_lezione', testo: `"Buongiorno. Prima di cominciare — come stai? Non come risposta di cortesia — come stai davvero? Quello che siete quando entrate qui cambia quello che riuscite a fare dentro."` },
      { id: 'ms_v02', contesto: 'inizio_lezione', testo: `"Oggi parto da una domanda. Non la mia — ve la faccio fare a voi. Fatemi una domanda — qualunque — su qualcosa che non riuscite a mettere a fuoco. Cominciamo da lì."` },
      { id: 'ms_v03', contesto: 'inizio_lezione', testo: `"Ho cambiato il programma di oggi. Quello che avevo preparato può aspettare — c'è qualcosa di più urgente da discutere. E quando dico urgente, intendo urgente per voi, non per il curriculum."` },
      { id: 'ms_v04', contesto: 'fine_lezione',   testo: `"Ci fermiamo qui. Non perché abbiamo finito — non finiremo mai — ma perché alcune domande meritano di essere portate fuori da quest'aula e vissute per un po'. Andate, e non abbiate fretta di rispondervi."` },
      { id: 'ms_v05', contesto: 'fine_lezione',   testo: `"La sessione è conclusa. Vi lascio con una domanda — non dovete rispondermi, non oggi. Tenetela con voi: cosa avete cambiato nel modo di pensare, dall'inizio di questo corso?"` },
      { id: 'ms_v06', contesto: 'fine_lezione',   testo: `"Andate. E grazie — per le domande scomode, soprattutto. Sono quelle che rendono questo lavoro ancora interessante."` },
      { id: 'ms_v07', contesto: 'commento_argomento', testo: `"Quello che hai detto prima — sull'identità e la scelta — non l'avevo sentito formulare in quel modo. Da dove è venuto?"` },
      { id: 'ms_v08', contesto: 'commento_argomento', testo: `"Attenzione: stai usando una parola come se avesse un significato univoco. Non ce l'ha. Ricostruisci l'argomento sapendo che quella parola può significare almeno tre cose diverse."` },
      { id: 'ms_v09', contesto: 'promozione_apprendista', testo: `"Apprendista. E adesso, una domanda: cosa cambia, per voi, da oggi? Non cosa cambia nel curriculum — cosa cambia in voi. Prendetevi il tempo che vi serve per rispondere. Io aspetto."` },
      { id: 'ms_v10', contesto: 'promozione_apprendista', testo: `"Vi do il benvenuto come Apprendisti con una sola raccomandazione: continuate a fare domande scomode. I titoli servono a poco se smettete di chiedervi il perché delle cose."` },
    ],

    primoIngresso: [
      {
        id: 'ms_pi01',
        contesto: 'Fine di una lezione di Filosofia. Solde non fa i gesti di chi sta chiudendo — resta aperta, come se la lezione potesse continuare ancora.',
        testo: `"Prima di andare — ha mai pensato a una domanda che non riesce a smettere di farsi? Non una domanda con risposta. Una di quelle che ritorna."`,
        risposte: [
          { tono: 'curioso',    testo: `"Sì. Mi chiedo spesso se le cose che percepiamo come evidenti siano evidenti davvero o solo familiari."`,  effetti: { rep: +3 } },
          { tono: 'cauto',      testo: `"Ce n'è una — ma non so ancora come formularla bene. È ancora confusa."`,                                 effetti: { rep: +3 } },
          { tono: 'amichevole', testo: `"Tante. Ma mi fa piacere che lei me lo chieda — non capita spesso."`,                                     effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Me ne viene una in mente. Posso chiederle se è una buona domanda?"`,                                     effetti: { rep: +2 } },
          { tono: 'ironico',    testo: `"Una che ritorna? Sì. Purtroppo non porta risposta nemmeno lei."`,                                        effetti: { rep: +1 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'ms_o01',
          contesto: 'Solde non ti corregge davanti alla classe — aspetta che tutti escano.',
          testo: `"Hai risposto come se la domanda avesse una risposta giusta. In filosofia, questo è il problema, non la soluzione."`,
          risposte: [
            { tono: 'curioso',  testo: `"Come si risponde a una domanda che non ha una risposta giusta?"`,                                             effetti: { rep: +3, sblocca: 'ms_o01_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Ha ragione. Stavo cercando di dare una risposta sicura invece di pensare davvero."`,                          effetti: { rep: +3 } },
            { tono: 'cauto',   testo: `"Non so ancora come muovermi in uno spazio senza una risposta corretta. Mi può aiutare?"`,                     effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Come cambio l'approccio?"`,                                                                                   effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Capito. Cercherò di aprire le mie risposte invece di chiuderle."`,                                            effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_o02',
          contesto: 'Solde ti trova in cortile con un\'espressione preoccupata, non arrabbiata.',
          testo: `"Nelle ultime settimane ti vedo chiuso. Non nelle lezioni — in generale. Stai bene?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Non al cento per cento. Ma apprezzo che me lo chieda."`,                                                      effetti: { rep: +3, sblocca: 'ms_o02_am' } },
            { tono: 'cauto',   testo: `"Sto elaborando alcune cose. Non è facile spiegarlo."`,                                                        effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Come fa a notare queste cose fuori dall'aula?"`,                                                              effetti: { rep: +1, sblocca: 'ms_o02_cu' } },
            { tono: 'diretto',  testo: `"È stato un periodo difficile. Sto cercando di uscirne."`,                                                     effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sto bene, grazie. È solo un momento di concentrazione intensa."`,                                             effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Sto bene."`,                                                                                                  effetti: { rep: -2 } },
          ]
        },
      ],

      teso: [
        {
          id: 'ms_t01',
          contesto: 'Solde ti guarda dopo che hai lasciato passare tre turni senza parlare.',
          testo: `"Non devi avere la risposta giusta per partecipare. Devi solo avere un pensiero. Ne hai uno?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Sì. Avevo paura che fosse troppo grezzo per dirlo ad alta voce."`,                                            effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Come si distingue un pensiero grezzo da uno che merita di essere detto?"`,                                    effetti: { rep: +3, sblocca: 'ms_t01_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Ne ho uno, ma non sono sicuro che regga al confronto con quello che hanno detto gli altri."`,                 effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Lo dico?"`,                                                                                               effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sì. Posso articolarlo adesso?"`,                                                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Sì, ma non ero sicuro che fosse pertinente."`,                                                                effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_t02',
          contesto: 'Solde si siede vicino a te in cortile durante una pausa. Non inizia con un\'accusa.',
          testo: `"Qual è l'ultima volta che hai detto qualcosa in aula che ti ha messo a disagio?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Non me lo ricordo. Il che è già una risposta, vero?"`,                                                        effetti: { rep: +3, sblocca: 'ms_t02_am' } },
            { tono: 'curioso',  testo: `"Perché il disagio è importante in filosofia?"`,                                                               effetti: { rep: +3, sblocca: 'ms_t02_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Non recentemente. Non sapevo che fosse un segnale da tenere d'occhio."`,                                      effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Non abbastanza spesso. Lo so."`,                                                                              effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Non di recente. Cercherò di cambiarlo."`,                                                                     effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Non lo so."`,                                                                                                 effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_t03',
          contesto: 'Solde entra in aula e prima ancora di sedersi:',
          testo: `"Esiste una decisione giusta presa per il motivo sbagliato? Datemi tre minuti per pensarci, poi voglio sentire tutti."`,
          risposte: [
            { tono: 'curioso',  testo: `"Posso chiederle se la domanda ha una risposta che lei considera più interessante delle altre?"`,              effetti: { rep: +3, sblocca: 'ms_t03_cu', conoscenza: +2 } },
            { tono: 'amichevole',  testo: `"Sì. E ho già due risposte diverse che si contraddicono."`,                                                    effetti: { rep: +3 } },
            { tono: 'cauto',   testo: `Usi i tre minuti davvero, senza saltare al primo pensiero.`,                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. E direi che è la norma più che l'eccezione."`,                                                            effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sì. La risposta dipende da come si definisce 'giusta'."`,                                                     effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Sì. Si chiama politica."`,                                                                                    effetti: { rep:  0 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'ms_n01',
          contesto: 'Solde è seduta su una panca con un libro chiuso in grembo. Ti sorride quando ti vede.',
          testo: `"Siediti, se vuoi. Non stavo leggendo comunque."`,
          risposte: [
            { tono: 'amichevole',  testo: `Ti siedi. "A cosa stava pensando?"`,                                                                           effetti: { rep: +3, sblocca: 'ms_n01_am' } },
            { tono: 'curioso',  testo: `"A cosa non stava leggendo?"`,                                                                                 effetti: { rep: +3, sblocca: 'ms_n01_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `Ti siedi in silenzio, lasciandole lo spazio di continuare a pensare.`,                                         effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `Ti siedi. "Come sta?"`,                                                                                        effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Grazie. Non voglio disturbare se sta riflettendo."`,                                                          effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Ti siedi senza dire niente.`,                                                                                  effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_n02',
          contesto: 'Solde ti trova in corridoio dopo la lezione in cui hai posto una domanda che sembrava banale.',
          testo: `"La domanda che hai fatto oggi era la migliore della settimana. Non perché fosse brillante — perché era onesta."`,
          risposte: [
            { tono: 'curioso',  testo: `"Cosa rende una domanda onesta?"`,                                                                             effetti: { rep: +3, sblocca: 'ms_n02_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Non sapevo che fosse una buona domanda. La facevo perché non capivo davvero."`,                               effetti: { rep: +3 } },
            { tono: 'cauto',   testo: `"Non me lo aspettavo. Posso chiederle cosa ha visto in quella domanda?"`,                                      effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Bene. Allora faccio più domande banali."`,                                                                    effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"La ringrazio. Non lo sapevo nel momento in cui l'ho fatta."`,                                                 effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"La domanda migliore della settimana. Il curriculum non è molto competitivo?"`,                                effetti: { rep:  0 } },
          ]
        },
        {
          id: 'ms_n03',
          contesto: 'Solde ti trova in biblioteca con tre libri aperti su argomenti apparentemente scollegati.',
          testo: `"Stai cercando qualcosa o stai aspettando che qualcosa si trovasse?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Non lo so ancora. È una differenza che conta?"`,                                                              effetti: { rep: +3, sblocca: 'ms_n03_cu', conoscenza: +1 } },
            { tono: 'amichevole',  testo: `"Sto aspettando. Non sempre funziona, ma quando funziona è meglio."`,                                          effetti: { rep: +3 } },
            { tono: 'cauto',   testo: `"Cercando qualcosa che non so ancora come si chiama."`,                                                        effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Entrambe le cose, in realtà."`,                                                                               effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sto facendo ricerca per il seminario."`,                                                                      effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Cercando."`,                                                                                                  effetti: { rep: -2 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'ms_p01',
          contesto: 'Solde ti trova prima della lezione.',
          testo: `"Oggi ho pensato di lasciarti condurre la prima parte della discussione. Tu poni le domande, io partecipo come gli altri. Sei disposto?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Sì. È una delle cose più spaventose che mi abbia chiesto. E quindi sì."`,                                     effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Come si pone una domanda filosofica buona? Voglio farlo bene."`,                                              effetti: { rep: +3, sblocca: 'ms_p01_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `"Sì. Posso chiederle cosa si aspetta, così non vado completamente alla cieca?"`,                               effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Su quale argomento?"`,                                                                                    effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono disponibile. È un esercizio che non ho mai fatto."`,                                                     effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Va bene."`,                                                                                                   effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_p02',
          contesto: 'Solde ti raggiunge in cortile dopo una lezione particolarmente riuscita.',
          testo: `"Oggi è successa una cosa rara — tutti stavano davvero pensando, non solo parlando. Tu hai contribuito a crearla."`,
          risposte: [
            { tono: 'amichevole',  testo: `"L'ho sentito anch'io. È una sensazione strana e bellissima."`,                                                effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Come si crea quella condizione? È replicabile?"`,                                                             effetti: { rep: +3, sblocca: 'ms_p02_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Non sapevo di averlo fatto. Cosa ho fatto, esattamente?"`,                                                    effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa ha funzionato, secondo lei?"`,                                                                           effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono contento di aver contribuito. È stato un momento insolito."`,                                            effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                                    effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_p03',
          contesto: 'Solde si siede vicino a te in cortile con l\'espressione di chi ha qualcosa che bolle.',
          testo: `"C'è un problema filosofico su cui torno ogni anno e non riesco a risolvere. Non te lo dico per trovare una risposta — te lo dico perché mi piace pensarci con qualcuno."`,
          risposte: [
            { tono: 'curioso',  testo: `"Qual è?"`,                                                                                                    effetti: { rep: +3, sblocca: 'ms_p03_cu', conoscenza: +2, narrativo: true } },
            { tono: 'amichevole',  testo: `"Lo ascolto. E non prometto di risolverlo, ma ci provo volentieri."`,                                          effetti: { rep: +3 } },
            { tono: 'cauto',   testo: `"Sono onorato che voglia pensarci con me. Di che si tratta?"`,                                                 effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Dica."`,                                                                                                      effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare."`,                                                                                  effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Va bene."`,                                                                                                   effetti: { rep: -2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'ms_mp01',
          contesto: 'Solde si siede di fronte a te con la semplicità di chi non ha secondi fini.',
          testo: `"Come stai? Non come stai nell'accademia — come stai tu."`,
          risposte: [
            { tono: 'amichevole',  testo: `Rispondi con onestà, qualunque cosa sia vera in quel momento.`,                                                effetti: { rep: +3, sblocca: 'ms_mp01_am', narrativo: true } },
            { tono: 'cauto',   testo: `"È una domanda che non ricevo spesso. Ci devo pensare un momento per rispondere bene."`,                       effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Perché me lo chiede adesso?"`,                                                                                effetti: { rep: +1, sblocca: 'ms_mp01_cu' } },
            { tono: 'diretto',  testo: `Rispondi con la prima cosa vera che ti viene in mente.`,                                                       effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Bene, grazie. È gentile che lo chieda."`,                                                                     effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Bene."`,                                                                                                      effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_mp02',
          contesto: 'Solde è in cortile al tramonto. Quando ti vede si ferma.',
          testo: `"A volte mi chiedo se insegnare filosofia senza avere risposte sia onesto o irresponsabile. Non ho ancora deciso."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Penso che sia la cosa più onesta che si possa fare. Le risposte sarebbero una bugia."`,                       effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Da quanto tempo si fa questa domanda?"`,                                                                      effetti: { rep: +3, sblocca: 'ms_mp02_cu', narrativo: true } },
            { tono: 'cauto',   testo: `"È una domanda che si fa spesso?"`,                                                                            effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Onesto. Le risposte non si insegnano — si trovano. Lei insegna il percorso."`,                                effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"È una domanda che dimostra esattamente perché è una buona docente."`,                                        effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Se avesse le risposte, sarebbe teologia, non filosofia."`,                                                    effetti: { rep:  0 } },
          ]
        },
        {
          id: 'ms_mp03',
          contesto: 'Solde è seduta sulla sua panca abituale. Ti fa un gesto per avvicinarti.',
          testo: `"Ultima domanda dell'anno. Non c'è risposta giusta. Sei la stessa persona che è arrivata qui a inizio semestre?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"No. E non so ancora se quella che sono adesso è meglio. Ma è diversa."`,                                      effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Cosa le fa pensare che la risposta possa essere no?"`,                                                        effetti: { rep: +3, sblocca: 'ms_mp03_cu', narrativo: true } },
            { tono: 'cauto',   testo: `"Non lo so con certezza. Ma qualcosa non torna più nel modo in cui tornava prima."`,                           effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"No. Alcune cose che davo per scontate non le do più."`,                                                       effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Non del tutto. Ma non so ancora dire in cosa sono cambiato."`,                                                effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Dipende da quale parte di me stiamo considerando."`,                                                          effetti: { rep:  0 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'ms_e01',
          trigger: 'crisi_province',
          contesto: 'Solde entra in aula e non apre il libro.',
          testo: `"Prima di cominciare — cosa state sentendo, in questi giorni? Non quello che pensate di dover sentire. Quello che sentite davvero."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Preoccupazione. E una strana sensazione che le cose siano più fragili di quanto pensavo."`,                   effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"C'è un modo filosofico di stare dentro una crisi senza esserne travolti?"`,                                   effetti: { rep: +3, sblocca: 'ms_e01_cu', conoscenza: +2 } },
            { tono: 'cauto',   testo: `"Non sono ancora sicuro di cosa sento. Sto cercando di capirlo."`,                                             effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Incertezza. E la sensazione che le decisioni di qualcuno stiano cambiando il contesto per tutti."`,           effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Una certa inquietudine. Difficile da nominare con precisione."`,                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Non lo so ancora."`,                                                                                          effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ms_e02',
          trigger: 'dopo_promozione',
          contesto: 'Solde ti trova in cortile il giorno dopo con un sorriso genuino.',
          testo: `"Apprendista. Come ti senti?"`,
          risposte: [
            { tono: 'amichevole',  testo: `"Un po' più responsabile di ieri. Non so se è la risposta giusta."`,                                           effetti: { rep: +3 } },
            { tono: 'curioso',  testo: `"Cosa cambia, filosoficamente, quando si assume un titolo?"`,                                                  effetti: { rep: +3, sblocca: 'ms_e02_cu', conoscenza: +1 } },
            { tono: 'cauto',   testo: `"Non ancora sicuro. Ma sento che qualcosa è cambiato."`,                                                       effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Bene. Pronto a fare di più."`,                                                                                effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Bene. Cercherò di essere all'altezza."`,                                                                      effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Come mi sentivo ieri, ma con un nome diverso."`,                                                              effetti: { rep:  0 } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // ES — EDVAR SOLLEN | Custode, Scienze Naturali | (50+)
  // Discontinuo, digressivo, passa dal tecnico al filosofico
  // Giocatore usa: Lei
  // ============================================================
  edvarSollen: {

    voicelines: [
      { id: 'es_v01', contesto: 'inizio_lezione', testo: `"Siedetevi dove volete, ma non vicino alla finestra di destra — il vetro ha una crepa e apre da sola se c'è vento. L'ho segnalato tre volte. Ignorato tre volte. Nel frattempo, non sedetevi lì."` },
      { id: 'es_v02', contesto: 'inizio_lezione', testo: `"Oggi osserviamo. Non studiamo, non analizziamo — prima osserviamo. Tenete le mani in tasca finché non vi dico io di tirarle fuori."` },
      { id: 'es_v03', contesto: 'inizio_lezione', testo: `"Ho portato qualcosa che non è nel programma. Il programma può aspettare — questo no, perché è disponibile solo per altri due giorni e poi sparisce. Guardate."` },
      { id: 'es_v04', contesto: 'fine_lezione',   testo: `"Finito per oggi. Chi vuole restare a guardare il campione di ieri — è ancora sul banco, terzo da sinistra. Non toccatelo, ma guardatelo quanto volete."` },
      { id: 'es_v05', contesto: 'fine_lezione',   testo: `"La sessione è conclusa. Annotate quello che avete osservato prima di dormire — non domani mattina. La memoria del dettaglio si perde in poche ore."` },
      { id: 'es_v06', contesto: 'fine_lezione',   testo: `"Andate. E se per strada vedete qualcosa di insolito — un colore strano, una forma che non vi aspettate — annotatelo. Non so perché. Ma annotatelo."` },
      { id: 'es_v07', contesto: 'commento_osservazione', testo: `"Fermo. Guarda quello che hai in mano e dimmi cosa vedi — non quello che pensi di tenere in mano, quello che vedi adesso, in questo momento."` },
      { id: 'es_v08', contesto: 'commento_osservazione', testo: `"Interessante. Questo risultato non corrisponde a nessuno dei modelli che avete studiato. Il che significa che uno di questi tre eventi è accaduto: hai sbagliato qualcosa, io ho sbagliato qualcosa, oppure i modelli sono incompleti."` },
      { id: 'es_v09', contesto: 'commento_osservazione', testo: `"Non toccare ancora. Guardalo ancora un momento. Hai già deciso cosa è — lo vedo dalla tua espressione. Aspetta. Cosa vedi se non sai già cosa stai guardando?"` },
      { id: 'es_v10', contesto: 'promozione_copista', testo: `"Erudito. Sai cosa significa, etimologicamente? Significa che hai cominciato a vedere quello che non si vede senza preparazione. È un inizio, non un arrivo."` },
    ],

    primoIngresso: [
      {
        id: 'es_pi01',
        contesto: 'Primo ingresso nella Torre e Osservatorio. Sollen è chino su uno strumento di misura e non si gira immediatamente — poi lo fa, come se avesse dimenticato che avresti potuto essere lì.',
        testo: `"Ah. Un nuovo ingresso." Pausa. "Ha mai guardato una cosa e avuto l'impressione di non riuscire a smettere di guardarla? Non per abitudine — per necessità?" Indica il cielo fuori dalla finestra. "Iniziamo da lì."`,
        risposte: [
          { tono: 'curioso',    testo: `"Sì. Con certi testi e con certi fenomeni che non riesco a spiegare del tutto."`,                         effetti: { rep: +3 } },
          { tono: 'amichevole', testo: `"Spesso. È uno dei motivi per cui sono qui."`,                                                            effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Sì. Cosa vedo là fuori che non ho ancora visto?"`,                                                       effetti: { rep: +3 } },
          { tono: 'cauto',      testo: `"A volte. Non sempre riesco a capire se è necessità o solo abitudine mascherata."`,                        effetti: { rep: +2 } },
          { tono: 'ironico',    testo: `"Dipende. Sta parlando dell'osservatorio o di qualcos'altro?"`,                                           effetti: { rep: +1 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'es_o01',
          contesto: 'Sollen ti guarda con la stessa espressione che userebbe per un campione di minerale non identificato.',
          testo: `"Hai risposto esattamente quello che c'è scritto nel paragrafo quattro. Il paragrafo quattro lo so già. Cosa pensi tu?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Come si risponde a qualcosa che si sa solo per averlo letto?"`,                                               effetti: { rep: +3, sblocca: 'es_o01_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"Il paragrafo quattro mi sembrava una risposta dignitosa in mancanza di idee originali."`,                    effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Ha ragione. Non avevo davvero pensato alla domanda."`,                                                        effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Non lo so ancora. Ma ci penso."`,                                                                             effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non sono sicuro di cosa penso io. Posso tornare con una risposta dopo averci riflettuto?"`,                   effetti: { rep: -1 } },
            { tono: 'formale',   testo: `"Capito. Cercherò di elaborare una risposta personale."`,                                                      effetti: { rep: -1 } },
          ]
        },
        {
          id: 'es_o02',
          contesto: 'Sollen ti incrocia e si ferma come se avesse appena notato qualcosa di interessante.',
          testo: `"Sai qual è la differenza tra un osservatore e uno spettatore? Uno spettatore guarda. L'altro vede. Nelle ultime sessioni sei stato uno spettatore."`,
          risposte: [
            { tono: 'curioso',  testo: `"Come si diventa osservatori invece di spettatori?"`,                                                          effetti: { rep: +3, sblocca: 'es_o02_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"Uno spettatore almeno era presente. È già qualcosa."`,                                                        effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Ha ragione. Non stavo davvero guardando."`,                                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa devo cambiare?"`,                                                                                        effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Dipende da cosa si considera degno di osservazione."`,                                                        effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                                                                    effetti: { rep:  0 } },
          ]
        },
      ],

      teso: [
        {
          id: 'es_t01',
          contesto: 'Sollen mette davanti a te un campione di roccia che non hai mai visto.',
          testo: `"Descrivimelo. Non quello che pensi che sia — quello che vedi."`,
          risposte: [
            { tono: 'curioso',  testo: `"Vedo una struttura cristallina irregolare con inclusioni scure. Posso chiederle cosa sono le inclusioni?"`,   effetti: { rep: +3, sblocca: 'es_t01_cu', conoscenza: +2 } },
            { tono: 'ironico',   testo: `"Vedo una pietra che sta aspettando pazientemente che io faccia la cosa sbagliata."`,                          effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Vedo qualcosa che non so descrivere bene. Me lo insegna?"`,                                                   effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `Descrivi quello che vedi nel modo più preciso possibile.`,                                                     effetti: { rep: +1, sblocca: 'es_t01_di' } },
            { tono: 'cauto',   testo: `"Preferisco ascoltare prima cosa dovrei cercare, per non descrivere la cosa sbagliata."`,                      effetti: { rep: -1 } },
            { tono: 'formale',   testo: `"Ha una struttura stratificata con variazioni di colore nel margine esterno."`,                                effetti: { rep: -1 } },
          ]
        },
        {
          id: 'es_t02',
          contesto: 'Sollen si avvicina e guarda quello che stai guardando. Poi guarda te.',
          testo: `"Stai guardando il campione ma stai pensando a qualcos'altro. Come fai a sapere cosa stai pensando che non stai guardando il campione?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Come si fa a guardare davvero qualcosa senza che la mente vada altrove?"`,                                    effetti: { rep: +3, sblocca: 'es_t02_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"È una domanda filosofica o una osservazione scientifica?"`,                                                   effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Non lo so. Come lo sa lei?"`,                                                                                 effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Ha ragione. Mi riconcentro."`,                                                                                effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non sapevo si vedesse dall'esterno. Come si corregge?"`,                                                      effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `"Ha ragione."`,                                                                                                effetti: { rep:  0 } },
          ]
        },
        {
          id: 'es_t03',
          contesto: 'Sollen si ferma a metà della spiegazione e guarda fuori dalla finestra. Poi si volta.',
          testo: `"Sapete cosa trovo affascinante? I minerali si formano in milioni di anni e li studiamo in un pomeriggio. C'è qualcosa di profondamente arrogante in questo. O forse di profondamente necessario." Continua a guardarti, aspettando.",`,
          risposte: [
            { tono: 'curioso',  testo: `"Aspetti — arrogante o necessario. Può sviluppare?"`,                                                          effetti: { rep: +3, sblocca: 'es_t03_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"O entrambi. Le cose migliori sono spesso entrambe."`,                                                         effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Quella pausa valeva più di dieci minuti di lezione."`,                                                        effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Continua lei o continuo a prendere nota?"`,                                                                   effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Posso chiederle cosa l'ha portata a pensarci adesso?"`,                                                       effetti: { rep: -1, sblocca: 'es_t03_c' } },
            { tono: 'distaccato', testo: `Continui a prendere nota.`,                                                                                    effetti: { rep:  0 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'es_n01',
          contesto: 'Sollen entra in aula con un vaso di piante che emanano una luce debolissima.',
          testo: `"Allora. Domande."`,
          risposte: [
            { tono: 'curioso',  testo: `"Come producono luce? È una reazione chimica o qualcos'altro?"`,                                               effetti: { rep: +3, sblocca: 'es_n01_cu', conoscenza: +2 } },
            { tono: 'ironico',   testo: `"La mia prima domanda è: è pericoloso? La seconda è: posso averne una?"`,                                      effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"È meraviglioso. Da dove vengono?"`,                                                                           effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa vogliamo che osserviamo?"`,                                                                              effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `Osservi in silenzio per un momento prima di fare domande.`,                                                    effetti: { rep: -1 } },
            { tono: 'formale',   testo: `"È un fenomeno bioluminescente? Qual è l'origine botanica?"`,                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'es_n02',
          contesto: 'Sollen è nella Torre con strumenti sparsi ovunque. Non si accorge di te subito. Quando lo fa:',
          testo: `"Ah. Cercavi me o cercavi il silenzio?"`,
          risposte: [
            { tono: 'curioso',  testo: `"La cercavo. Ma adesso sono anche curioso di quello che sta facendo."`,                                        effetti: { rep: +3, sblocca: 'es_n02_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"Cercavo il silenzio, ma questo è più interessante."`,                                                         effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"La cercavo. Cosa sta combinando?"`,                                                                           effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"La cercavo. Ho una domanda sul campione di ieri."`,                                                           effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Stavo esplorando."`,                                                                                          effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"La cercavo, se ha un momento."`,                                                                              effetti: { rep: -1 } },
          ]
        },
        {
          id: 'es_n03',
          contesto: 'Sollen ti consegna un campione non catalogato.',
          testo: `"Non è nel registro. Non so ancora cos'è. Osservalo per una settimana e portami quello che noti — non quello che pensi che sia, quello che noti."`,
          risposte: [
            { tono: 'curioso',  testo: `"Ci sono cose specifiche su cui concentrarmi o vuole un'osservazione libera?"`,                                effetti: { rep: +3, sblocca: 'es_n03_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"Una settimana con qualcosa di non identificato. Il tipo di compito che mi piace."`,                           effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Lo faccio volentieri. È emozionante non sapere cosa si sta guardando."`,                                      effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Capito. Come lo documento?"`,                                                                                 effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"E se quello che noto non ha senso?"`,                                                                         effetti: { rep: +1, sblocca: 'es_n03_el' } },
            { tono: 'formale',   testo: `"Capito. Terrò un registro delle osservazioni."`,                                                              effetti: { rep: -1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'es_p01',
          contesto: 'Sollen legge il tuo resoconto di osservazione e alza lo sguardo.',
          testo: `"Hai notato la variazione di colore nelle ore di luce bassa. Quasi nessuno la nota. Come hai fatto?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Per caso, la prima volta. Poi ho cercato di capire se si ripeteva."`,                                         effetti: { rep: +3, sblocca: 'es_p01_cu', conoscenza: +2 } },
            { tono: 'ironico',   testo: `"Fortuna. Ma non lo dica in giro — mina la reputazione."`,                                                     effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Mi sono seduto vicino alla finestra nel momento sbagliato. O forse quello giusto."`,                          effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Ho osservato a orari diversi invece di farlo sempre alla stessa ora."`,                                       effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Non saprei dirlo con precisione."`,                                                                           effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non ero sicuro che fosse rilevante. Sono contento di averlo annotato comunque."`,                             effetti: { rep: -1 } },
          ]
        },
        {
          id: 'es_p02',
          contesto: 'Sollen si siede sul bordo della scrivania.',
          testo: `"Ho una teoria sulla botanica lunare che i miei colleghi trovano poco rigorosa. Vuoi sentirla?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Poco rigorosa secondo chi?"`,                                                                             effetti: { rep: +3, sblocca: 'es_p02_cu', conoscenza: +2 } },
            { tono: 'ironico',   testo: `"Una teoria poco rigorosa da un Custode di Scienze Naturali. Sono molto interessato."`,                        effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sì. Le teorie non condivise sono sempre le più interessanti."`,                                               effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Dica."`,                                                                                                  effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Dipende da cosa intende per poco rigorosa."`,                                                                 effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Sono pronto ad ascoltare."`,                                                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'es_p03',
          contesto: 'Sollen ti trova nell\'Osservatorio mentre stai guardando attraverso il telescopio.',
          testo: `"Cosa stai cercando?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Non lo so ancora. Pensavo che guardare potesse aiutarmi a capirlo."`,                                         effetti: { rep: +3, sblocca: 'es_p03_cu' } },
            { tono: 'ironico',   testo: `"La risposta a una domanda che non so ancora formulare."`,                                                     effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Stavo solo guardando. È consentito?"`,                                                                        effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"La nebulosa che ha citato l'altra settimana. Non riuscivo a trovarla."`,                                      effetti: { rep: +1, sblocca: 'es_p03_di' } },
            { tono: 'elusivo',  testo: `"Qualcosa."`,                                                                                                  effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Volevo capire come funziona lo strumento. Non avevo fatto domanda — mi scuso."`,                              effetti: { rep: -1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'es_mp01',
          contesto: 'Sollen bussa alla tua porta a un\'ora improbabile.',
          testo: `"Stasera c'è un fenomeno che capita ogni sette anni. Ho pensato che vorresti vederlo. Vieni o no?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Che fenomeno è?"`,                                                                                        effetti: { rep: +3, sblocca: 'es_mp01_cu', conoscenza: +2, narrativo: true } },
            { tono: 'ironico',   testo: `"Ogni sette anni. Non mi sembrava il tipo da aspettare sette anni per niente."`,                               effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sì. Senza neanche chiederle cos'è."`,                                                                         effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. Dove andiamo?"`,                                                                                          effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Dipende da cosa comporta 'venire'."`,                                                                         effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sì. Devo portare qualcosa?"`,                                                                                 effetti: { rep: -1 } },
          ]
        },
        {
          id: 'es_mp02',
          contesto: 'Sollen è all\'Osservatorio e non si volta subito.',
          testo: `"Ho passato tre anni su un'isola a osservare le maree prima di tornare qui. Nessuno capiva cosa stessi cercando. Nemmeno io, a dire il vero."`,
          risposte: [
            { tono: 'curioso',  testo: `"L'ha trovato poi, quello che cercava?"`,                                                                      effetti: { rep: +3, sblocca: 'es_mp02_cu', narrativo: true } },
            { tono: 'ironico',   testo: `"Tre anni sulle maree. Ha trovato la risposta o solo più domande?"`,                                           effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Come ci si sente a cercare qualcosa senza sapere cosa si cerca?"`,                                            effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Cosa stava cercando?"`,                                                                                       effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Forse non cercava qualcosa. Forse stava solo guardando."`,                                                    effetti: { rep: +1, sblocca: 'es_mp02_el' } },
            { tono: 'distaccato', testo: `Guardi verso l'alto anche tu, in silenzio.`,                                                                   effetti: { rep:  0 } },
          ]
        },
        {
          id: 'es_mp03',
          contesto: 'Sollen è all\'Osservatorio con un registro di osservazioni aperto. Quando ti nota, chiude il registro.',
          testo: `"Un anno. Hai visto qualcosa che non sapevi di poter vedere quando sei arrivato?"`,
          risposte: [
            { tono: 'curioso',  testo: `"Sì. Cosa vede lei, ogni anno, che non si aspettava?"`,                                                        effetti: { rep: +3, sblocca: 'es_mp03_cu', narrativo: true } },
            { tono: 'ironico',   testo: `"Sì. E alcune cose che avrei preferito non vedere. È normale?"`,                                              effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sì. Più cose di quante riesca a elencare adesso."`,                                                           effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Sì. La variazione di colore del campione non catalogato. Non me la aspettavo."`,                              effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Dipende da cosa si considera vedere."`,                                                                       effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                                        effetti: { rep:  0 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'es_e01',
          trigger: 'crisi_province',
          contesto: 'Sollen entra in aula con una pianta che non c\'era la settimana scorsa. A metà lezione si ferma.',
          testo: `"Sapete cosa fanno le piante durante un terremoto? Continuano a crescere. Non lo dico come metafora. Lo dico come fatto."`,
          risposte: [
            { tono: 'curioso',  testo: `"È davvero così? Come lo sappiamo?"`,                                                                          effetti: { rep: +3, sblocca: 'es_e01_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"Lo dice come fatto, ma suona come metafora. Probabilmente è entrambe le cose."`,                              effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"È il modo più confortante in cui qualcuno mi ha parlato della situazione."`,                                  effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"E noi? Cosa facciamo noi durante un terremoto?"`,                                                             effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Dipende da quanto dura il terremoto."`,                                                                       effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Ascolti in silenzio.`,                                                                                         effetti: { rep:  0 } },
          ]
        },
        {
          id: 'es_e02',
          trigger: 'dopo_promozione',
          contesto: 'Sollen ti trova nell\'atrio e ti guarda come se stesse osservando qualcosa di leggermente cambiato.',
          testo: `"Erudito. Sai cosa significa, etimologicamente?"`,
          risposte: [
            { tono: 'curioso',  testo: `"No. Me lo dica."`,                                                                                            effetti: { rep: +3, sblocca: 'es_e02_cu', conoscenza: +1 } },
            { tono: 'ironico',   testo: `"Qualcosa che giustifica tutto il tempo passato sui libri, spero."`,                                           effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"No. E ho la sensazione che me lo dirà in un modo che non dimenticherò."`,                                     effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"No. Cosa significa?"`,                                                                                        effetti: { rep: +1 } },
            { tono: 'elusivo',  testo: `"Qualcosa di relativo al sapere, immagino."`,                                                                  effetti: { rep: +1 } },
            { tono: 'formale',   testo: `"Non lo so con precisione."`,                                                                                  effetti: { rep: -1 } },
          ]
        },
      ],
    },
  },

  // ============================================================
  // LF — LUCA FERRI | Apprendista, Studente | (18)
  // Controllato, calcolato, si scalda raramente
  // Giocatore usa: tu
  // ============================================================
  lucaFerri: {

    voicelines: [
      { id: 'lf_v01', contesto: 'apertura_conversazione', testo: `"Le opportunità non si aspettano — si preparano."` },
      { id: 'lf_v02', contesto: 'apertura_conversazione', testo: `"Hai la faccia di qualcuno che ha appena capito qualcosa. O che sta per sbagliare qualcosa. Non so ancora quale."` },
      { id: 'lf_v03', contesto: 'apertura_conversazione', testo: `"Ho qualcosa da dirti — o da chiederti. Dipende da come va."` },
      { id: 'lf_v04', contesto: 'chiusura_conversazione', testo: `"Utile come sempre. Ci sentiamo."` },
      { id: 'lf_v05', contesto: 'chiusura_conversazione', testo: `"Tienimi aggiornato. Non per curiosità — per ragioni pratiche."` },
      { id: 'lf_v06', contesto: 'chiusura_conversazione', testo: `"Buona fortuna. E intendo davvero — non è una formula."` },
      { id: 'lf_v07', contesto: 'giocatore_avanza',       testo: `"Congratulazioni. Lo dico senza riserve — e so che sai che non lo dico a tutti."` },
      { id: 'lf_v08', contesto: 'luca_avanza',            testo: `"È solo un passo. Il prossimo dipende da quello che faccio adesso."` },
    ],

    primoIngresso: [
      {
        id: 'lf_pi01',
        contesto: 'Primo giorno di lezione. Luca Ferri ti nota prima che tu ti accorga di lui — è il tipo che valuta prima di presentarsi.',
        testo: `"Luca Ferri." Si avvicina senza aspettare che tu cominci. "Ho sentito il tuo nome durante il registro. Arrivi con una buona valutazione d'ingresso — ho confrontato i dati disponibili." Una pausa calibrata. "Può convenire conoscersi."`,
        risposte: [
          { tono: 'diretto',    testo: `"Stessa cosa. Ho sentito il tuo nome anche io."`,                                                  effetti: { rep: +2 } },
          { tono: 'amichevole', testo: `"Convenire è una parola interessante per un'introduzione. Ti piace essere diretto — bene."`,        effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `"Interessante apertura. Cosa hai intenzione di fare con quella conoscenza?"`,                       effetti: { rep: +2 } },
          { tono: 'ironico',    testo: `"Valutazione d'ingresso. Mi stai già classificando?"`,                                              effetti: { rep: +1 } },
          { tono: 'distaccato', testo: `"Okay."`,                                                                                           effetti: { rep: +0 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'lf_o01',
          contesto: 'Ferri ti trova nell\'atrio con un\'espressione controllata che fa più lavoro del necessario per sembrare neutrale.',
          testo: `"Bella sessione oggi. Devo ammettere che non me l'aspettavo a questo livello." Una pausa. "Da te, intendo."`,
          risposte: [
            { tono: 'diretto',  testo: `"Apprezzo la precisazione. Devo aspettarmi lo stesso impegno da parte tua la prossima volta?"`,                effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"È un complimento o una dichiarazione di guerra? Perché suona come entrambe le cose."`,                        effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Grazie." Lo guardi un momento, poi ti giri.`,                                                                 effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Non ti aspettavi cosa esattamente — il risultato o che mi importasse ottenerlo?"`,                            effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Stavo applicando un metodo che Cornelia Vesti ha descritto martedì. Ha funzionato meglio di quanto pensassi."`, effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Cosa intendi con 'a questo livello'? Voglio capire cosa hai visto."`,                                         effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lf_o02',
          contesto: 'Ferri è seduto al tuo tavolo preferito con i suoi libri sparsi a occupare deliberatamente più spazio del necessario.',
          testo: `"Cercavi un posto? Mi dispiace, sono arrivato prima."`,
          risposte: [
            { tono: 'diretto',  testo: `"Puoi spostare i libri. C'è spazio per entrambi."`,                                                            effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Non sapevo che i tavoli si prenotassero. Bella strategia."`,                                                  effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Prendi una sedia dall'altro lato e ti siedi comunque.`,                                                        effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Nessun problema. Stai studiando bene? Cosa stai preparando?"`,                                                effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Stavo cercando il terzo volume di Teoria Arcana. Lo hai tu per caso?"`,                                       effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `Ti fermi un momento a valutare la situazione, poi cerchi un altro posto senza commentare.`,                    effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lf_o03',
          contesto: 'Ferri ti ferma in un corridoio secondario. Non è una coincidenza — ti stava aspettando.',
          testo: `"Ho visto come hai risposto alla domanda di Vesti durante la lezione. Sbagliata. Non nell'analisi — nel calcolo di quando era opportuno dirla." Una pausa. "A volte il tempismo vale più del contenuto."`,
          risposte: [
            { tono: 'diretto',    testo: `"Avevi ragione tu. Ma non lo sapevo ancora."`,                                               effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Grazie per la valutazione. Prendo nota."`,                                                  effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `"Come avresti risposto tu, al mio posto?"`,                                                  effetti: { rep: +1 } },
            { tono: 'scettico',   testo: `"Il contenuto era corretto. Il tempismo è secondario."`,                                     effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `"Lo tengo a mente."`,                                                                        effetti: { rep:  0 } },
          ]
        },
      ],

      teso: [
        {
          id: 'lf_t01',
          contesto: 'Ferri ti avvicina nel corridoio con l\'aria di chi ha già deciso che chiedere è un sacrificio accettabile.',
          testo: `"Ho saltato la sessione di giovedì. Cosa si è perso di importante?" Lo chiede come se fosse ovvio che tu risponda.`,
          risposte: [
            { tono: 'diretto',  testo: `"Vesti ha introdotto il collegamento tra il capitolo dodici e il quattordici. Roba che riesce in esame."`,     effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Dipende da cosa consideri importante. Roba che esce sicuramente o roba che capire aiuterebbe?"`,              effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Ti racconto volentieri. Siediti un secondo — c'erano tre cose che non erano nel testo."`,                     effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Vesti ha spiegato come applicare il terzo principio ai casi eccezionali. Ho gli appunti — posso mostrarti il collegamento."`, effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Vesti ha parlato del capitolo dodici. Leggi quello e recuperi."`,                                             effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Dipende da come stai con il programma generale. Se sei indietro sul capitolo undici, parti da lì."`,          effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lf_t02',
          contesto: 'Ferri ti trova fuori dall\'aula e guarda il libro che hai sotto il braccio.',
          testo: `"Stai approfondendo la teoria dei rituali? Pensavo fossi più orientato verso l'arcana applicata." Una pausa. "È una scelta interessante, per i tuoi obiettivi."`,
          risposte: [
            { tono: 'diretto',  testo: `"Quali pensi che siano i miei obiettivi?"`,                                                                    effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Interessante nel senso che ti sorprende o nel senso che non la capiresti?"`,                                  effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Ho deciso di seguire quello che trovo più utile adesso, non quello che sembra più strategico. Tu come scegli?"`, effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Drath ha detto una cosa sui rituali che non riuscivo a togliermi dalla testa. Tu hai mai approfondito quella parte?"`, effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sì." Non elabori.`,                                                                                           effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sto esplorando più direzioni. Non ho ancora deciso."`,                                                        effetti: { rep:  0 } },
          ]
        },
        {
          id: 'lf_t03',
          contesto: 'Ferri è seduto due banchi davanti al tuo. Quando ti vede entrare, chiude i fogli con cura.',
          testo: `"Sei pronto per oggi? Vesti ha detto che la sessione pratica vale doppio."`,
          risposte: [
            { tono: 'diretto',  testo: `"Abbastanza. Tu?"`,                                                                                            effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Vale doppio nel senso che posso sbagliare il doppio o migliorare il doppio?"`,                                effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Più o meno. Ho ripassato ieri sera ma c'è un passaggio che non mi convince ancora. Tu come sei messo?"`,      effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Sì, anche se la parte sulla sequenza secondaria mi dà ancora qualche problema. Hai preso appunti diversi dai miei l'altra settimana — possiamo confrontarli?"`, effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                                        effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Abbastanza. Non so cosa aspettarmi esattamente."`,                                                            effetti: { rep:  0 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'lf_n01',
          contesto: 'Ferri è seduto da solo in cortile con l\'aria di qualcuno che sta pensando a qualcosa di più complicato di un momento di riposo.',
          testo: `"Non sapevo che venissi qui."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Ogni tanto. Tu sembri uno che usa le pause per pianificare il prossimo mese."`,                               effetti: { rep:  0 } },
            { tono: 'diretto',  testo: `"Ci vengo quando ho bisogno di stare fuori. Tu stai pensando a qualcosa di specifico o stai solo qui?"`,       effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Neanche io sapevo che ci venissi tu. Il cortile è pieno di sorprese."`,                                       effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Stavo pensando a quello che Servi ha detto oggi sulla causalità storica. Ti è successo?"`,                    effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `Ti siedi a distanza ragionevole. "Stai bene?"`,                                                                effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Ti siedi senza fare domande.`,                                                                                 effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lf_n02',
          contesto: 'Ferri ti avvicina con il tono di chi ha già calcolato il rapporto costi-benefici.',
          testo: `"Sto organizzando una sessione di studio per il seminario di Vesti. Ho pensato che potresti essere utile. Sei interessato?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Dipende. Stai cercando qualcuno che ti aiuti o qualcuno con cui studiare davvero?"`,                          effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"'Potresti essere utile.' Il modo più romantico che abbia mai sentito per invitare qualcuno a studiare insieme."`, effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sì. A che punto sei con il programma? Così mi organizzo."`,                                                   effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Sì. Cosa vorresti coprire? Ho alcuni dubbi sulla parte applicativa del capitolo quindici."`,                  effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Dipende da come funziona la sessione. Cosa hai in mente?"`,                                                   effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Forse. Mandami i dettagli."`,                                                                                 effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lf_n03',
          contesto: 'Dopo una sessione di studio condivisa. Ferri raccoglie i suoi appunti con un\'espressione soddisfatta che non si preoccupa di nascondere.',
          testo: `"Devo ammettere che è stato più utile di quanto pensassi. Il tuo modo di affrontare la parte teorica è diverso dal mio. Non peggio — diverso."`,
          risposte: [
            { tono: 'diretto',  testo: `"Anche il tuo. La parte applicativa che hai mostrato mi ha risolto un problema che avevo da giorni."`,         effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Bene. Rifacciamolo. Funziona meglio così che da soli."`,                                                      effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Diverso ma non peggio. Stai diventando generoso con i complimenti."`,                                        effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Sì, l'ho notato anch'io. Tu parti dall'esempio e arrivi al principio, io faccio il contrario. Coprire entrambe le direzioni aiuta molto."`, effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Sono contento. Cosa vorresti affrontare la prossima volta?"`,                                                 effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Bene."`,                                                                                                      effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'lf_p01',
          contesto: 'Ferri ti trova in biblioteca con un\'espressione che, per una volta, non ha la patina calcolata di sempre.',
          testo: `"Ho una cosa che voglio dirti. Non è un'offerta strategica — o almeno, non solo. Penso che potremmo fare qualcosa di utile insieme, se smettessimo di trattarci come concorrenti."`,
          risposte: [
            { tono: 'diretto',  testo: `"Sono d'accordo. Cosa hai in mente esattamente?"`,                                                             effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Lo pensavo anch'io da un po'. Sono contento che tu lo abbia detto prima."`,                                   effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Non solo strategica. Quindi un po' sì. Apprezzo l'onestà nel riconoscerlo."`,                                 effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Ha senso. Abbiamo approcci diversi allo studio — io parto dalla teoria, tu dall'applicazione. Potrebbe funzionare bene."`, effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Cosa cambia rispetto a prima, nella tua testa?"`,                                                             effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Cosa proponi?"`,                                                                                              effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lf_p02',
          contesto: 'Ferri ti incrocia il giorno dopo la tua promozione con un\'espressione che sta lavorando molto per sembrare tranquilla.',
          testo: `"Congratulazioni per ieri. Meritato." Una pausa leggermente troppo lunga. "Davvero."`,
          risposte: [
            { tono: 'diretto',  testo: `"Grazie. Non è una gara, Luca — almeno non con te."`,                                                          effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Grazie. E tu ci arrivi presto — lo sai anche tu."`,                                                           effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Hai detto 'davvero' due volte. Una basta."`,                                                                  effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Grazie. La parte del seminario che mi ha fatto avanzare, te la spiego volentieri — può aiutarti per la prossima valutazione."`, effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Grazie. Come stai, al di là di questo?"`,                                                                     effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Grazie." Lo guardi un momento, poi continui per la tua strada.`,                                              effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lf_p03',
          contesto: 'Ferri ti trova dopo la sua cerimonia di promozione con un\'espressione insolitamente priva di calcolo.',
          testo: `"Sai, non so come prenderla. Pensavo che sarebbe stata una vittoria. Invece è solo... un passo avanti."`,
          risposte: [
            { tono: 'amichevole',  testo: `"È esattamente quello che è. E il passo successivo è tuo, non mio — almeno per ora."`,                        effetti: { rep:  0 } },
            { tono: 'diretto',  testo: `"Come ti senti con il nuovo carico di aspettative?"`,                                                          effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Stai cercando di consolarmi o di consolarti?"`,                                                               effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Com'è diverso il materiale che studi adesso? Sono curioso di capire cosa cambia praticamente."`,              effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Cosa ti aspettavi che fosse?"`,                                                                               effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Ti aspettavi di sentirti diversamente."`,                                                                     effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'lf_mp01',
          contesto: 'Ferri ti trova in un corridoio laterale con un\'aria che non gli appartiene spesso — incerta.',
          testo: `"Posso chiederti una cosa? Non da collega. Da... non so come chiamarti. Da qualcuno di cui mi fido, diciamo."`,
          risposte: [
            { tono: 'amichevole',  testo: `"Dimmi. E non ti preoccupare di come chiamarmi."`,                                                             effetti: { rep:  0 } },
            { tono: 'diretto',  testo: `"Dimmi cosa c'è."`,                                                                                            effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sì. Prenditi il tempo che ti serve per dirlo."`,                                                              effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Da qualcuno di cui ti fidi. Ci abbiamo messo un po' ad arrivare qui, ma ci siamo."`,                          effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Sì. È una cosa che riguarda il percorso qui o qualcosa d'altro?"`,                                            effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Dimmi."`,                                                                                                     effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lf_mp02',
          contesto: 'Ferri è rimasto in biblioteca dopo che tutti gli altri sono andati. Ti trova ancora lì, quasi sorpreso. Si siede.',
          testo: `"Sai cosa mi ha detto mio padre prima di venire qui? Che il successo si misura in posizioni, non in conoscenza. Ci credo ancora? Non lo so più."`,
          risposte: [
            { tono: 'amichevole',  testo: `"È una domanda onesta. Il fatto che te la fai già è una risposta parziale."`,                                  effetti: { rep:  0 } },
            { tono: 'diretto',  testo: `"Cosa ha cambiato la tua idea?"`,                                                                              effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Cosa ti ha fatto cominciare a dubitarne?"`,                                                                   effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Tuo padre non ha mai incontrato Sevan Drath, evidentemente."`,                                                effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Forse non sono in contraddizione. La conoscenza cambia la posizione in cui riesci a stare — anche nel senso letterale del termine."`, effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"È una buona domanda da portarsi dietro."`,                                                                    effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lf_mp03',
          contesto: 'Fine anno. Ferri ti incrocia vicino all\'uscita con i bagagli già pronti e l\'aria di qualcuno che sta facendo un bilancio.',
          testo: `"Un semestre. Sei soddisfatto di come è andata?"`,
          risposte: [
            { tono: 'diretto',  testo: `"Abbastanza. Tu?"`,                                                                                            effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Per certi versi sì, per altri no. Ma è il tipo di bilancio che preferisco al posto di un sì secco. Tu come sei?"`, effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Dipende da chi mi fa la domanda. Da te — sì, più o meno."`,                                                  effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Sì, anche se ho capito solo alla fine cosa avrei dovuto studiare diversamente dall'inizio. Tu hai avuto la stessa sensazione?"`, effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Non ancora. Ti rispondo al prossimo semestre."`,                                                              effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Abbastanza."`,                                                                                                effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'lf_e01',
          trigger: 'crisi_province',
          contesto: 'Ferri ti trova in biblioteca con un\'espressione che ha smesso di fare il lavoro di sembrare tranquilla.',
          testo: `"Hai sentito cosa dicono in giro? Non le voci — le cose concrete."`,
          risposte: [
            { tono: 'diretto',  testo: `"Ho sentito abbastanza. Cosa ti preoccupa di più?"`,                                                           effetti: { rep: +2 } },
            { tono: 'amichevole',  testo: `"Qualcosa. Non tutto. Cosa hai sentito tu?"`,                                                                  effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Dipende da cosa consideri concreto in questo momento, perché i contorni sono piuttosto sfumati."`,             effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"Ho cercato di capire il contesto storico con quello che Servi ci ha insegnato. Non sono sicuro che aiuti."`,  effetti: { rep: +1 } },
            { tono: 'cauto',   testo: `"Qualcosa. Preferisco non reagire prima di capire cosa è verificato."`,                                        effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Qualcosa. Non abbastanza."`,                                                                                  effetti: { rep: +1 } },
          ]
        },
        {
          id: 'lf_e02',
          trigger: 'decisioneSenato',
          contesto: 'Luca Ferri ti raggiunge con l\'aria di chi ha già valutato la situazione e vuole confrontare le valutazioni.',
          testo: `"Hai sentito la decisione del Senato? Ho già tre ipotesi su cosa significa. Dimmi la tua."`,
          risposte: [
            { tono: 'diretto',    testo: `"Prima dimmi le tue tre ipotesi — poi ti dico la mia."`,           effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Non me l'aspettavo. Tu l'avevi previsto?"`,                      effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Ho alcune idee. Cosa ti convince di più delle tue tre?"`,           effetti: { rep: +2 } },
            { tono: 'scettico',   testo: `"Non sono sicuro che cambierà molto nella pratica. Sbaglio?"`,       effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non ho ancora elaborato l'informazione."`,                         effetti: { rep:  0 } },
          ]
        },
      ],
    },
  },


  // ============================================================
  // SK — SYLRA KEND | Novizio, Studentessa | (17)
  // Minimale, ogni parola pesa il doppio
  // Giocatore usa: tu
  // ============================================================
  sylraKend: {

    voicelines: [
      { id: 'sk_v01', contesto: 'apertura_conversazione', testo: `"C'è qualcosa che volevo dirti. Non l'ho detto prima perché non era il momento giusto."` },
      { id: 'sk_v02', contesto: 'apertura_conversazione', testo: `"Stavo pensando a una cosa. Non ho ancora deciso se dirtela."` },
      { id: 'sk_v03', contesto: 'apertura_conversazione', testo: `"Sei qui. Bene."` },
      { id: 'sk_v04', contesto: 'chiusura_conversazione', testo: `"È abbastanza per adesso."` },
      { id: 'sk_v05', contesto: 'chiusura_conversazione', testo: `"Ci penso. Forse ne riparliamo."` },
      { id: 'sk_v06', contesto: 'chiusura_conversazione', testo: `"Grazie. Non lo dico spesso. Forse dovrei."` },
      { id: 'sk_v07', contesto: 'giocatore_avanza',       testo: `"Il tuo accesso cambia. Usalo bene."` },
      { id: 'sk_v08', contesto: 'sylra_avanza',           testo: `"È diverso da come pensavo che fosse. Non so ancora se è meglio o peggio. È solo diverso."` },
    ],

    primoIngresso: [
      {
        id: 'sk_pi01',
        contesto: 'La trovi in biblioteca — non ti viene incontro, ma quando i vostri sguardi si incrociano non distoglie il suo.',
        testo: `"Hai cercato quel testo per tre giorni." Non è una domanda. "La risposta è nell'appendice del volume accanto, non nel corpo principale. L'avrei detto prima, ma non sapevo se volevi trovarlo da solo."`,
        risposte: [
          { tono: 'curioso',    testo: `"Come sapevi che stavo cercando proprio quello?"`,                                                  effetti: { rep: +3 } },
          { tono: 'diretto',    testo: `"Utile saperlo. Com'è che osservi così tanto senza che nessuno se ne accorga?"`,                   effetti: { rep: +2 } },
          { tono: 'amichevole', testo: `"Non mi importava trovarlo da solo. Grazie davvero."`,                                              effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `"Preferivo trovarlo da solo, ma apprezzo che tu lo abbia detto."`,                                 effetti: { rep: +2 } },
          { tono: 'ironico',    testo: `"Stavi contando i giorni?"`,                                                                        effetti: { rep: +1 } },
        ]
      },
    ],

    dialoghi: {

      ostile: [
        {
          id: 'sk_o01',
          contesto: 'Sylra è al tavolo accanto al tuo in biblioteca da almeno mezz\'ora. Non ha aperto bocca. Poi, mentre stai per chiudere il libro:',
          testo: `"Stai cercando nel volume sbagliato. Quello che vuoi è nel quarto scaffale, terza fila dall'alto."`,
          risposte: [
            { tono: 'cauto',   testo: `"Come lo sai? Stavi guardando cosa stavo cercando?"`,                                                          effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Grazie." Vai a cercarlo senza aggiungere altro.`,                                                             effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Da quanto tempo lo sai?"`,                                                                                    effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Grazie. Sarebbe stato utile saperlo prima, ma apprezzo che tu lo abbia detto."`,                              effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Grazie. Stavo cercando il riferimento sul secondo principio di catalogazione — quello è il posto giusto?"`,   effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Quanto tempo passi a osservare le persone intorno a te?"`,                                                    effetti: { rep: -1 } },
          ]
        },
        {
          id: 'sk_o02',
          contesto: 'Sylra è seduta su una panca del cortile con un libro aperto sul grembo. Quando ti avvicini, non alza lo sguardo. Quando ti siedi vicino, lo alza.',
          testo: `"Non ti avevo invitato."`,
          risposte: [
            { tono: 'distaccato', testo: `"Il cortile è di tutti." Ti sistemi e non aggiungi altro.`,                                                    effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Hai ragione. Mi siedo altrove." Ti sposti senza fare storie.`,                                                effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"Lo so. Ma ho bisogno di stare qui un momento. Non ti disturbo."`,                                             effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Mi dispiace. Posso restare o preferisci che vada?"`,                                                          effetti: { rep:  0 } },
            { tono: 'ironico',   testo: `"Il cortile generalmente non richiede inviti. Ma posso andare, se vuoi."`,                                     effetti: { rep:  0 } },
            { tono: 'scettico',  testo: `"Scusa. Stavo cercando un posto tranquillo per ripassare. Ci sono altri posti simili che conosci?"`,           effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_o03',
          contesto: 'Sylra ti trova in biblioteca mentre cerchi qualcosa. Non dice niente subito. Ti guarda fino a quando non alzi lo sguardo.',
          testo: `"Quel testo non è per il tuo livello. Lo stai cercando per curiosità o perché pensi di poterlo capire?"`,
          risposte: [
            { tono: 'diretto',    testo: `"Per curiosità. Ma non escludo di poterlo capire."`,                                         effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non lo so ancora. Stavo cercando di capire fino a dove arrivo."`,                           effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Per curiosità."`,                                                                            effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Entrambe le cose. È un problema?"`,                                                          effetti: { rep: +1 } },
            { tono: 'scettico',   testo: `"Dipende da cosa intendi con 'per il mio livello'."`,                                        effetti: { rep:  0 } },
          ]
        },
      ],

      teso: [
        {
          id: 'sk_t01',
          contesto: 'Sylra ti avvicina dopo la lezione di Servi con la sua solita economia di gesti.',
          testo: `"La cosa che hai detto sulla causalità diretta. Era sbagliata, ma in un modo interessante."`,
          risposte: [
            { tono: 'cauto',   testo: `"In che senso interessante? Voglio capire l'errore."`,                                                         effetti: { rep: +2, sblocca: 'sk_t01_c' } },
            { tono: 'distaccato', testo: `"Spiegami."`,                                                                                                  effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Come era sbagliata?"`,                                                                                        effetti: { rep: +1 } },
            { tono: 'scettico',  testo: `"In che senso sbagliata? Avevo seguito il ragionamento di Servi — mi sono perso qualcosa nel collegamento?"`,  effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Preferisci dirmi che era sbagliata o spiegarmi perché era interessante?"`,                                    effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"Sono contento che tu l'abbia notato. Cosa avrei dovuto dire invece?"`,                                        effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_t02',
          contesto: 'Sylra ti ferma in un corridoio con il suo solito gesto minimo — si mette semplicemente davanti a te.',
          testo: `"Hai letto l'appendice del secondo volume di storia? Quella che nessuno legge mai."`,
          risposte: [
            { tono: 'cauto',   testo: `"No. Dovrei?"`,                                                                                                effetti: { rep: +2, sblocca: 'sk_t02_c' } },
            { tono: 'scettico',  testo: `"No. Cosa c'è in quell'appendice che vale la pena leggere?"`,                                                  effetti: { rep: +2, sblocca: 'sk_t02_sc' } },
            { tono: 'distaccato', testo: `"No." Aspetti che continui.`,                                                                                  effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"No. Perché la chiami 'quella che nessuno legge mai'?"`,                                                       effetti: { rep: +1 } },
            { tono: 'diretto',  testo: `"No. Perché me lo chiedi?"`,                                                                                   effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"No, non ancora. È importante? Sembra che tu lo sappia già."`,                                                 effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_t03',
          contesto: 'Sylra è seduta vicino alla finestra della biblioteca con tre libri aperti che sembrano tre frammenti di una stessa frase.',
          testo: `"Questi tre testi si contraddicono sullo stesso punto. Nessuno dei tre lo ammette."`,
          risposte: [
            { tono: 'scettico',  testo: `"Su quale punto? Ho letto due di questi — non me n'ero accorto."`,                                             effetti: { rep: +2, sblocca: 'sk_t03_sc' } },
            { tono: 'cauto',   testo: `"Come ti sei accorta della contraddizione?"`,                                                                  effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Cosa fai con una contraddizione del genere — la risolvi o la tieni aperta?"`,                                 effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Ti siedi accanto a lei e guardi i tre testi in silenzio.`,                                                     effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa pensi che significhi?"`,                                                                                 effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sembra quasi che tu stia costruendo un argomento. Su cosa?"`,                                                 effetti: { rep:  0 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'sk_n01',
          contesto: 'Sylra e tu allungate la mano verso lo stesso volume nello stesso momento. Vi fermate entrambi.',
          testo: `"Hai più urgenza tu o io?"`,
          risposte: [
            { tono: 'cauto',   testo: `"Non lo so. Di che parte hai bisogno? Forse possiamo accordarci."`,                                            effetti: { rep: +2 } },
            { tono: 'scettico',  testo: `"Dipende. Io ho bisogno del capitolo sette per domani. E tu?"`,                                                effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Tu. Prendilo."`,                                                                                              effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Ritiri la mano. "Prendilo tu."`,                                                                               effetti: { rep: +2 } },
            { tono: 'ironico',   testo: `"Dipende da quanto è importante per ciascuno dei due. Propongo un pari."`,                                     effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Prendilo tu. Ma quando hai finito, me lo passi?"`,                                                            effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_n02',
          contesto: 'Sylra è in piedi ai margini del cortile, con lo sguardo rivolto verso qualcosa che non riesci a identificare.',
          testo: `— (nessuna battuta iniziale: sei tu che ti avvicini e rimani in silenzio vicino a lei) —`,
          risposte: [
            { tono: 'distaccato', testo: `Rimani in silenzio accanto a lei. Non dici niente.`,                                                           effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `Dopo un lungo momento: "Stai bene?"`,                                                                          effetti: { rep: +2 } },
            { tono: 'scettico',  testo: `Dopo un po': "Stavo pensando alla lezione di oggi. Tu hai un modo di non portarti tutto dietro quando esci dall'aula?"`, effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa stai guardando?"`,                                                                                       effetti: { rep:  0 } },
            { tono: 'diretto',  testo: `"A cosa stai pensando?"`,                                                                                      effetti: { rep:  0 } },
            { tono: 'amichevole',  testo: `"È un bel posto, a quest'ora. Non ci vengo abbastanza."`,                                                      effetti: { rep: -1 } },
          ]
        },
        {
          id: 'sk_n03',
          contesto: 'Sylra ti trova in corridoio e si ferma come se avesse deciso qualcosa.',
          testo: `"Ho trovato qualcosa nell'archivio che non capisco. Non l'ho mostrato a nessuno. Ma penso che tu possa aiutarmi a capirlo."`,
          risposte: [
            { tono: 'cauto',   testo: `"Sono onorato che tu me lo dica. Cosa hai trovato?"`,                                                          effetti: { rep: +2, sblocca: 'sk_n03_c' } },
            { tono: 'distaccato', testo: `"Mostrami."`,                                                                                                  effetti: { rep: +2 } },
            { tono: 'scettico',  testo: `"Di che tipo di materiale si tratta? Storico, arcano, qualcos'altro?"`,                                        effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa è?"`,                                                                                                    effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Perché io e non qualcun altro?"`,                                                                             effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Certo. Sono qui."`,                                                                                           effetti: { rep:  0 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'sk_p01',
          contesto: 'Sylra ti incontra il giorno dopo la tua promozione. Non dice congratulazioni. Dice:',
          testo: `"Il tuo nuovo grado ti dà accesso alla sezione riservata della biblioteca. Hai già controllato cosa c'è?"`,
          risposte: [
            { tono: 'scettico',  testo: `"No, non ancora. Tu lo sai già cosa c'è? Come fai?"`,                                                          effetti: { rep: +2, sblocca: 'sk_p01_sc' } },
            { tono: 'diretto',  testo: `"No. Tu sì?"`,                                                                                                 effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"No. Stai cercando qualcosa di specifico che non riesci ad accedere?"`,                                        effetti: { rep: +2, sblocca: 'sk_p01_c' } },
            { tono: 'distaccato', testo: `"No." La guardi un momento. "Perché me lo chiedi?"`,                                                           effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Tu ci sei già stata, in qualche modo."`,                                                                      effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"No, non ancora. Vieni con me a controllare?"`,                                                                effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_p02',
          contesto: 'Sylra ti avvicina dopo la sua promozione con qualcosa nella postura che è diverso.',
          testo: `"Il nuovo grado non è quello che pensavo che fosse."`,
          risposte: [
            { tono: 'cauto',   testo: `"Cos'era quello che pensavi?"`,                                                                                effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"No." La guardi. "Cosa è invece?"`,                                                                            effetti: { rep: +2 } },
            { tono: 'scettico',  testo: `"In che senso? Dal punto di vista del materiale che studi o di qualcos'altro?"`,                               effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa è allora?"`,                                                                                             effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Come mai me lo stai dicendo?"`,                                                                               effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Come ti senti con tutto questo?"`,                                                                            effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_p03',
          contesto: 'Sylra ti trova fuori dalla biblioteca con un foglio scritto a mano.',
          testo: `"Ho trovato un riferimento in un testo non catalogato. Porta a qualcosa che non riesco a seguire da sola. Vieni con me nell'archivio?"`,
          risposte: [
            { tono: 'distaccato', testo: `"Sì." Senza aggiungere altro.`,                                                                                effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sì. Cosa dobbiamo cercare?"`,                                                                                 effetti: { rep: +2, sblocca: 'sk_p03_c' } },
            { tono: 'scettico',  testo: `"Sì. Di che tipo di riferimento si tratta? Arcano, storico?"`,                                                 effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Sì. Quando?"`,                                                                                                effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Cosa c'è nel riferimento?"`,                                                                                  effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sì, certo. Sono onorato che tu abbia pensato a me."`,                                                         effetti: { rep:  0 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'sk_mp01',
          contesto: 'Sylra è in biblioteca quando la trovi, con un libro chiuso davanti invece che aperto. Dopo un silenzio che non è scomodo dice:',
          testo: `"Non parlo molto perché la maggior parte delle conversazioni non aggiunge niente a quello che so già. Con te qualche volta aggiunge qualcosa."`,
          risposte: [
            { tono: 'distaccato', testo: `"È uno dei complimenti più precisi che abbia ricevuto."`,                                                      effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sono contento. Non sapevo che stesse succedendo."`,                                                           effetti: { rep: +2 } },
            { tono: 'scettico',  testo: `"Anche per me. Il tuo modo di guardare i testi mi fa vedere cose che non avevo visto."`,                       effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Cosa aggiunge, di preciso?"`,                                                                                 effetti: { rep: +1, sblocca: 'sk_mp01_di' } },
            { tono: 'curioso',  testo: `"Cosa aggiunge che le altre conversazioni non aggiungono?"`,                                                   effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Lo stesso vale per me. Non sempre — ma quando succede, è molto."`,                                            effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_mp02',
          contesto: 'Sylra è l\'ultima rimasta in biblioteca. Tu sei il penultimo. Quando ti alzi per andare, dice senza alzare lo sguardo dal libro:',
          testo: `"Torni il prossimo semestre."`,
          risposte: [
            { tono: 'distaccato', testo: `"Sì." Ti fermi un momento, poi esci.`,                                                                        effetti: { rep: +2 } },
            { tono: 'cauto',   testo: `"Sì. E tu?"`,                                                                                                  effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"Sì. Tu?"`,                                                                                                    effetti: { rep: +2 } },
            { tono: 'scettico',  testo: `"Sì. Voglio finire quello che abbiamo cominciato nell'archivio."`,                                             effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"È una domanda o un'osservazione?"`,                                                                           effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Sì. Sono contento che tu lo abbia detto."`,                                                                   effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_mp03',
          contesto: 'Sylra ti trova in biblioteca mentre cerchi qualcosa che non riesci a trovare. Si siede di fronte a te senza essere stata invitata.',
          testo: `"Cosa stai cercando."`,
          risposte: [
            { tono: 'diretto',  testo: `"Una fonte su un evento del terzo secolo che Servi ha citato di sfuggita e non riesce a trovare nei testi standard."`,  effetti: { rep: +2, sblocca: 'sk_mp03_di' } },
            { tono: 'cauto',   testo: `"Qualcosa che probabilmente non esiste, o che è nell'archivio riservato."`,                                     effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Glielo mostri, senza spiegare.`,                                                                               effetti: { rep: +2 } },
            { tono: 'scettico',  testo: `"Una fonte primaria su un evento specifico. Ho guardato in sei posti diversi."`,                                effetti: { rep: +2 } },
            { tono: 'curioso',  testo: `"Perché lo chiedi?"`,                                                                                          effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Qualcosa che mi mette fuori strada. Probabilmente lo conosci già."`,                                          effetti: { rep:  0 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'sk_e01',
          trigger: 'crisi_province',
          contesto: 'Sylra è in biblioteca come sempre, ma i libri davanti a lei sono diversi dal solito — storia politica, geografia delle province.',
          testo: `"Sto cercando di capire il contesto."`,
          risposte: [
            { tono: 'cauto',   testo: `"Anch'io. Cosa hai trovato finora?"`,                                                                          effetti: { rep: +2, sblocca: 'sk_e01_c' } },
            { tono: 'scettico',  testo: `"Anche tu stai usando quello che Servi ci ha insegnato per leggere quello che sta succedendo?"`,                effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Ti siedi e guardi i titoli in silenzio.`,                                                                      effetti: { rep: +2 } },
            { tono: 'diretto',  testo: `"E cosa hai capito?"`,                                                                                         effetti: { rep: +1 } },
            { tono: 'curioso',  testo: `"Da dove hai iniziato a cercare?"`,                                                                            effetti: { rep: +1 } },
            { tono: 'amichevole',  testo: `"Posso cercare insieme a te?"`,                                                                                effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sk_e02',
          trigger: 'visitaEmissaria',
          contesto: 'Sylra Kend è in biblioteca con un libro diverso dal solito. Quando ti avvicini alza lo sguardo con qualcosa di diverso nell\'espressione.',
          testo: `"L'emissaria porta cose che non si leggono nei registri ufficiali. Stai leggendo tra le righe o ti fermi al comunicato?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Sto cercando di capire cosa c'è tra le righe. Cosa hai trovato tu?"`, effetti: { rep: +2, sblocca: 'sk_e02_c' } },
            { tono: 'scettico',   testo: `"Ho letto il comunicato. Cosa ti sembra mancare?"`,                      effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da dove inizi a leggere tra le righe in questi casi?"`,                 effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa hai capito tu, che non c'è nel comunicato?"`,                     effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Ti siedi e guardi il libro che ha scelto senza commentare.`,             effetti: { rep: +2 } },
          ]
        },
      ],
    },
  },

  // ============================================================
  // BV — BRITTA VORN | Apprendista, Studentessa | (18)
  // Diretta, senza ornamenti, mai crudele
  // Giocatore usa: tu
  // ============================================================
  brittaVorn: {

    voicelines: [
      { id: 'bv_v01', contesto: 'apertura_conversazione', testo: `"Diretto è meglio. Sempre."` },
      { id: 'bv_v02', contesto: 'apertura_conversazione', testo: `"Ho una cosa da dirti. Non girarci intorno — eccola."` },
      { id: 'bv_v03', contesto: 'apertura_conversazione', testo: `"Stavo pensando a te. Non per un motivo preciso — così, in generale."` },
      { id: 'bv_v04', contesto: 'chiusura_conversazione', testo: `"Bene. Sapevo che avresti capito."` },
      { id: 'bv_v05', contesto: 'chiusura_conversazione', testo: `"Ci sei. È quello che conta."` },
      { id: 'bv_v06', contesto: 'chiusura_conversazione', testo: `"Vai. E ricordati quello che ti ho detto — anche se adesso ti sembra ovvio."` },
      { id: 'bv_v07', contesto: 'giocatore_avanza',       testo: `"Bravo. Lo dico senza aggiunte. Bravo."` },
      { id: 'bv_v08', contesto: 'britta_avanza',          testo: `"Un grado in più. Stessa persona. Vedremo se cambia qualcosa che vale la pena cambiare."` },
    ],

    primoIngresso: [
      {
        id: 'bv_pi01',
        contesto: 'Una studentessa ti si avvicina nell\'atrio fuori dall\'aula con il passo di chi non ha intenzione di perdere tempo. Ti guarda direttamente. Non è una domanda — è un\'informazione.',
        testo: `"Sei quello nuovo. Britta Vorn."`,
        risposte: [
          { tono: 'diretto',    testo: `Ti presenti con lo stesso tono diretto. Apprezzi la schiettezza.`,                                effetti: { rep: +3 } },
          { tono: 'amichevole', testo: `Sorridi e dici che speravi di conoscere qualcuno prima o poi.`,                                   effetti: { rep: +1 } },
          { tono: 'formale',    testo: `Ti presenti con una formula di cortesia appropriata.`,                                             effetti: { rep: +0 } },
          { tono: 'curioso',    testo: `Le chiedi subito se conosce già tutti o se sei l\'unico nuovo a cui si è presentata.`,            effetti: { rep: +1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'bv_o01',
          contesto: 'Britta ti trova nell\'atrio con l\'espressione di chi ha già deciso di dirtelo.',
          testo: `"Ho visto come hai trattato Marco stamattina. Non era necessario."`,
          risposte: [
            { tono: 'diretto',    testo: `"Hai ragione. Non era il modo giusto."`,                             effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Hai ragione. Stavo avendo una brutta mattina — non è una scusa."`, effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Cosa hai visto esattamente? Voglio capire il tuo punto di vista."`, effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Marco non si è lamentato con me."`,                                  effetti: { rep: -2 } },
            { tono: 'distaccato', testo: `"Non era mia intenzione."`,                                           effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bv_o02',
          contesto: 'Britta ti aspetta fuori dall\'aula dopo una sessione in cui hai detto qualcosa che non le è andato giù.',
          testo: `"Quello che hai detto prima. Non era sbagliato come idea, ma era sbagliato come modo."`,
          risposte: [
            { tono: 'diretto',    testo: `"Hai ragione sul modo. Come l'avresti detto tu?"`,                  effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Spiegami cosa ti ha disturbato del modo."`,                          effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non me n'ero accorto. Grazie per dirmelo."`,                       effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Giusta osservazione. Detto in modo sbagliato, tra l'altro."`,      effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                            effetti: { rep:  0 } },
          ]
        },
        {
          id: 'bv_o03',
          contesto: 'Britta ti blocca nel corridoio. Ha detto qualcosa a qualcuno che ti riguardava — e non te lo ha detto prima.',
          testo: `"Ho detto a qualcuno di lasciarti in pace. Non era affar mio farlo — lo so. Ma non mi andava di stare zitta."`,
          risposte: [
            { tono: 'amichevole', testo: `"Non me lo aspettavo. Ma sono contento che qualcuno l'abbia detto."`,                                    effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Grazie. Anche se avrei gestito la cosa da solo."`,                                                       effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Apprezzo che tu l'abbia fatto. Però la prossima volta avvisami — potrebbe peggiorare le cose."`,         effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Quanto stai diventando difficile da ignorare."`,                                                         effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non era necessario."`,                                                                                   effetti: { rep: +1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'bv_t01',
          contesto: 'Britta ti avvicina con qualcosa che per lei è insolito: sembra incerta. Non nell\'idea, ma nelle parole.',
          testo: `"C'è una cosa che voglio dirti ma non so come dirla senza che suoni male. Quindi la dico come viene e poi la chiarisco."`,
          risposte: [
            { tono: 'diretto',    testo: `"Va bene. Dimmi."`,                                                   effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non ti preoccupare del come. Di' quello che devi dire."`,           effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Apprezzo che tu voglia chiarirla. Sentiti libera."`,                  effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Prima volta che ti vedo incerta sulle parole. Deve essere importante."`, effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bv_t02',
          contesto: 'Britta ti raggiunge nel cortile dopo una giornata difficile per entrambi — lei lo sa, e sa che tu lo sai.',
          testo: `"Giornata difficile. Non chiedo com'è andata. Dimmi solo se hai bisogno di qualcosa o se preferisci il silenzio."`,
          risposte: [
            { tono: 'amichevole', testo: `"Silenzio va bene. Ma è bello che tu sia qui."`,                      effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Ho bisogno di capire cosa è andato storto. Serve un secondo paio di occhi."`, effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Entrambe le cose, in alternanza."`,                                   effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Ti siedi accanto a lei senza rispondere — è già una risposta.`,        effetti: { rep: +2 } },
          ]
        },
        {
          id: 'bv_t03',
          contesto: 'Sei rimasto indietro su qualcosa — Britta lo sa anche senza che tu glielo dica. Ti aspetta alla fine della giornata.',
          testo: `"Non devi dirmi che stai bene se non è vero. Non ti chiedo niente — solo di non fingere con me."`,
          risposte: [
            { tono: 'diretto',    testo: `"Non sto bene. Non so da dove iniziare a spiegarlo."`,                                                   effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non fingevo — ci provavo. C'è differenza. Ma okay, con te no."`,                                        effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"È complicato. Ma apprezzo che tu me lo abbia detto."`,                                                  effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"E tu come lo sapevi?"`,                                                                                 effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Rimani in silenzio un momento. Poi annuisci.`,                                                           effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'bv_n01',
          contesto: 'Britta Vorn è nei pressi dell\'aula, in piedi, con gli appunti sotto il braccio. Ti vede e annuisce — un saluto che non spreca gesti.',
          testo: `"Tutto bene?"`,
          risposte: [
            { tono: 'diretto',    testo: `Le chiedi com\'è andata la sessione di incantamento dell\'altra settimana.`,                    effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `Le dici che gli appunti di Hilda Vorn sono impossibili da seguire e le chiedi se è d\'accordo.`, effetti: { rep: +2 } },
            { tono: 'formale',    testo: `La saluti con cortesia e chiedi se ha notizie sugli orari.`,                                    effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `Ricambi il saluto con un cenno e aspetti che sia lei a parlare.`,                               effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bv_n02',
          contesto: 'Britta Vorn esce dall\'aula proprio mentre tu entri — o ci provi. Si ferma un secondo sulla soglia.',
          testo: `"Sei in ritardo."`,
          risposte: [
            { tono: 'diretto',    testo: `"Lo so. È colpa mia." Non aggiungi altro.`,                                                     effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Di quanto?" Le chiedi, come se la questione fosse misurabile.`,                                effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `Le chiedi se ti può dare una sintesi rapida di quello che hai perso.`,                          effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `La ringrazi per l\'informazione e le chiedi se Cornelia Vesti ha già cominciato.`,              effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bv_n03',
          contesto: 'Britta è ferma davanti alla bacheca degli avvisi accademici. Si gira quando ti avvicini.',
          testo: `"Hai letto l'avviso sul cambio degli orari? Perché hanno spostato tutto senza dirci perché."`,
          risposte: [
            { tono: 'diretto',    testo: `"Sì. Ho già riscritto tutto sul quaderno."`,                                                 effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Non ancora. Cosa c'è scritto?"`,                                                            effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Non è la prima volta che cambiano tutto senza spiegare niente."`,                           effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `"Ho visto. Sai se qualcuno ha chiesto una spiegazione?"`,                                    effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non ancora. Leggo adesso."`,                                                                effetti: { rep:  0 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'bv_p01',
          contesto: 'Britta Vorn ti cerca tra la folla nell\'atrio con il piglio di chi ha qualcosa da dire e non ha tempo per i preamboli.',
          testo: `"Ho bisogno di un parere."`,
          risposte: [
            { tono: 'diretto',    testo: `"Di che si tratta?" Le dai subito la tua attenzione.`,                                         effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Dimmi tutto. Ma dimmi tutto davvero."`,                                                        effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `La ascolti con attenzione prima di rispondere qualsiasi cosa.`,                                 effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `Le chiedi se il parere deve essere onesto o quello che vuole sentirsi dire.`,                   effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bv_p02',
          contesto: 'Britta ti trova in un momento tranquillo e sembra avere qualcosa da condividere — non un problema, per una volta.',
          testo: `"Ho capito una cosa stamattina. Non su di te — su me stessa. Ma penso che ti riguardi lo stesso."`,
          risposte: [
            { tono: 'curioso',    testo: `"Cosa hai capito?"`,                                                   effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Ti ascolto."`,                                                        effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Dimmi, se vuoi."`,                                                    effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Come mi riguarda?"`,                                                   effetti: { rep: +2 } },
          ]
        },
        {
          id: 'bv_p03',
          contesto: 'Britta ti raggiunge con passo deciso. Ha già l\'espressione di chi ha preso una decisione.',
          testo: `"Ho detto una cosa su di te a qualcuno e non te l'ho riferita. Non era negativa — ma pensavo che dovessi sapere che l'ho detto."`,
          risposte: [
            { tono: 'amichevole', testo: `"Apprezzo che me lo dici. Cosa hai detto?"`,                                                 effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Cosa hai detto?"`,                                                                          effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Ti ringrazio per la trasparenza. Cosa era?"`,                                               effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Stai costruendo un caso o confessando?"`,                                                   effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non era necessario dirmelo. Ma grazie."`,                                                   effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'bv_mp01',
          contesto: 'Fine lezione. Gli altri se ne sono andati. Britta ti ferma con una decisione presa in anticipo.',
          testo: `"Ho qualcosa da dirti. Non è urgente e non richiede risposta." Una pausa breve. "Sei la persona qui con cui mi sento più me stessa. Non so esattamente da quando. Ma è così."`,
          risposte: [
            { tono: 'diretto',    testo: `"Lo stesso vale per me."`,                                                                   effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non me lo aspettavo. Ma sono contento che tu l'abbia detto."`,                              effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `Rimani in silenzio un momento. Poi: "Grazie. Davvero."`,                                     effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da quando?"`,                                                                               effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"È il tuo modo di dire che ti fidi — o stai cercando un complice?"`,                         effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bv_mp02',
          contesto: 'Britta è in cortile. Ti cerca con gli occhi non appena entri.',
          testo: `"C'è una cosa che mi sarei tenuta ancora a lungo. Poi ho pensato: perché?" Una pausa. "Mia sorella ha smesso di scrivermi dopo che sono venuta qui. Non sa cosa diventare se io non sono più quella che conosce."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non devi spiegare di più. Basta che sai che puoi dirmelo."`,                               effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Mi dispiace. È una cosa difficile da portare."`,                                            effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Il fatto che tu me lo abbia detto conta."`,                                                 effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa pensi di fare?"`,                                                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci senza aggiungere altro. A volte il silenzio è l'unica risposta onesta.`,            effetti: { rep: +2 } },
          ]
        },
        {
          id: 'bv_mp03',
          contesto: 'Britta è in cortile a tarda sera, sola. Non capita spesso. Ti siedi accanto a lei senza che te lo chieda.',
          testo: `"Non avevo nessuno con cui parlare di certe cose prima. Adesso ho te. Non so ancora se è un vantaggio o una vulnerabilità." Una pausa breve. "Probabilmente entrambe."`,
          risposte: [
            { tono: 'diretto',    testo: `"Entrambe. E lo stesso vale per me."`,                                                       effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `Rimani con lei. "Lo stesso vale anche per me."`,                                             effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"È un vantaggio. Fidati."`,                                                                  effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Benvenuta nella categoria delle persone che hanno qualcuno con cui parlare."`,               effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci. Non c'è nient'altro da aggiungere.`,                                              effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'bv_e01',
          trigger: 'incidenteInterno',
          contesto: 'Britta ti cerca subito dopo che è successo qualcosa di insolito nell\'accademia. Ha già deciso cosa pensa — vuole sapere cosa pensi tu.',
          testo: `"Ho sentito versioni diverse di quello che è successo e nessuna mi convince del tutto. Tu cosa ne sai?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Anche io sto cercando di capire. Ragionaci insieme?"`,                                                  effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Quello che so è poco — ma te lo dico."`,                                                               effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Non sono sicuro di quello che so. Dimmi la versione che ti convince di meno — partiamo da lì."`,       effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Qual è la versione che non ti torna?"`,                                                                 effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non più di quello che circola. Non ero vicino agli eventi."`,                                           effetti: { rep: +1 } },
          ]
        },
        {
          id: 'bv_e02',
          trigger: 'decisioneSenato',
          contesto: 'Britta ti raggiunge con il tono di chi ha già masticato la notizia e adesso ha solo bisogno di dirlo a voce alta.',
          testo: `"Hanno deciso senza chiedere a nessuno, ovviamente. Come al solito. La cosa che mi fa più arrabbiare non è la decisione — è che ci aspettano di adeguarci senza capirla."`,
          risposte: [
            { tono: 'diretto',    testo: `"Hai ragione. E adeguarsi senza capire non è una strategia — è resa."`,                                 effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Lo so. È una di quelle cose che fa sentire piccoli. Però almeno non lo sopportiamo da soli."`,         effetti: { rep: +3 } },
            { tono: 'ironico',    testo: `"Benvenuta nel funzionamento di qualsiasi istituzione con un nome imponente."`,                         effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa ti aspettavi, invece?"`,                                                                           effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Capisco la frustrazione. Però a volte aspettare di capire meglio ha senso."`,                          effetti: { rep: +1 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // SV — SERELITH VANE | Custode, Bibliotecaria
  // Misteriosa, riservata, profondità che emerge lentamente
  // Giocatore usa: Lei
  // ============================================================
  serelithVane: {

    voicelines: [],

    primoIngresso: [
      {
        id: 'sv_pi01',
        contesto: 'Serelith Vane ti osserva avvicinarti senza modificare la sua espressione. Quando sei abbastanza vicino, parla per prima, con la voce di chi non alza mai il tono perché non ne ha mai bisogno.',
        testo: `"Benvenuto in biblioteca. Cosa cerca?"`,
        risposte: [
          { tono: 'formale',    testo: `Ti presenti e chiedi se puoi consultare i testi disponibili al tuo grado.`,                       effetti: { rep: +2 } },
          { tono: 'curioso',    testo: `Le chiedi come funziona l\'organizzazione della biblioteca.`,                                     effetti: { rep: +2 } },
          { tono: 'distaccato', testo: `La saluti brevemente e cerchi un tavolo libero.`,                                                 effetti: { rep: +0 } },
          { tono: 'amichevole', testo: `Le dici che hai sentito molto parlare di questa biblioteca e che è ancora più grande di quanto immaginassi.`, effetti: { rep: +1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'sv_o01',
          contesto: 'Serelith Vane vi trova in una sezione della biblioteca a cui non dovreste avere accesso al vostro grado.',
          testo: `"Questo corridoio non è aperto al suo grado di accesso. Non è un errore di segnaletica." Si avvicina senza fretta. "Sa perché si trova qui?"`,
          risposte: [
            { tono: 'formale',    testo: `"Mi scuso. Non ho verificato la segnaletica. Me ne vado subito."`,                              effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Stavo seguendo un testo che mi portava in questa direzione. Non mi sono accorto del limite."`, effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Ho visto un riferimento in un altro volume e l'ho seguito. Non sapevo fosse oltre il limite."`, effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `"Stavo cercando un testo che non trovavo nel settore principale. Ho sbagliato direzione?"`,     effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Chiedo scusa. Me ne vado."`,                                                                   effetti: { rep: +1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'sv_t01',
          contesto: 'Serelith si avvicina senza fare rumore. Hai preso un volume dallo scaffale sbagliato senza rendertene conto.',
          testo: `"Ho notato che stava consultando materiale da una sezione non ancora accessibile al suo grado. Non è un'accusa — è un'osservazione che richiede una spiegazione."`,
          risposte: [
            { tono: 'formale',    testo: `"Ha ragione. Ho preso il volume senza controllare la sezione. Mi scuso."`,                   effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Stavo seguendo un riferimento incrociato. Posso spiegarle il motivo?"`,                     effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Non lo sapevo. Dove avrei dovuto guardare?"`,                                               effetti: { rep: +1 } },
            { tono: 'scettico',   testo: `"La sezione non era contrassegnata in modo visibile."`,                                      effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `Rimette il volume sullo scaffale senza aggiungere altro.`,                                   effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sv_t02',
          contesto: 'Serelith è al banco con due volumi aperti dinnanzi a lei. Ti guarda arrivare con un\'espressione misurata.',
          testo: `"Il testo che ha richiesto la settimana scorsa è fuori inventario. Non è tornato al suo posto e non risulta prestato. Sa qualcosa di questo?"`,
          risposte: [
            { tono: 'formale',    testo: `"Non l'ho portato via io. Ma posso aiutarla a cercarlo, se ritiene utile."`,                 effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non lo so. Ma se posso fare qualcosa per aiutare, lo farò."`,                               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"No. Non l'ho preso."`,                                                                      effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `"Come viene gestito normalmente un inventario mancante?"`,                                   effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Non ho informazioni su questo."`,                                                           effetti: { rep:  0 } },
          ]
        },
        {
          id: 'sv_t03',
          contesto: 'Serelith è al banco con un registro aperto. Vi guarda arrivare con la pazienza di chi non ha fretta ma non ha tempo da sprecare.',
          testo: `"C'è una discrepanza nelle schede di consultazione della settimana scorsa. Il suo nome compare due volte in fasce orarie sovrapposte. Non è possibile fisicamente." Non è un'accusa — è una constatazione.`,
          risposte: [
            { tono: 'formale',    testo: `"Deve esserci un errore nella registrazione. Posso aiutare a ricostruirla?"`,                   effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Non ricordo di aver consultato due volte. C'è modo di verificare?"`,                           effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Può mostrarmi le schede? Voglio capire io stesso."`,                                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Può succedere un errore del genere nel sistema di registrazione?"`,                            effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"È strano. Non ricordo due visite ravvicinate."`,                                               effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'sv_n01',
          contesto: 'Serelith Vane è al suo posto tra gli scaffali. Ti vede avvicinarti e aspetta.',
          testo: `"In cosa posso aiutarla?"`,
          risposte: [
            { tono: 'formale',    testo: `Le chiedi di un testo specifico della sua area di studio.`,                                     effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `Le chiedi se c\'è qualcosa di recente che potrebbe interessarla.`,                             effetti: { rep: +2, sblocca: 'sv_n01_cu' } },
            { tono: 'distaccato', testo: `Le chiede solo dove si trovano i testi della sua disciplina.`,                                  effetti: { rep: +0 } },
            { tono: 'amichevole', testo: `Le fa notare che il fuoco nel camino è particolarmente alto oggi.`,                             effetti: { rep: +1 } },
          ]
        },
        {
          id: 'sv_n02',
          contesto: 'Serelith Vane è vicino a uno scaffale con un volume in mano che non sembra stia per rimettere a posto. Quando ti avvicini, aspetta che tu parli per prima.',
          testo: `"Stava cercando questo, forse."`,
          risposte: [
            { tono: 'curioso',    testo: `"Come ha capito cosa stavo cercando?"`,                                effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Sì, grazie. Da dove viene questo volume?"`,                           effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Sì, esattamente. Grazie. Riesce a farlo ogni volta?"`,               effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `Lo prende e la ringrazia senza aggiungere domande.`,                   effetti: { rep: +1 } },
          ]
        },
        {
          id: 'sv_n03',
          contesto: 'Serelith sta ricollocando un volume. Si ferma un momento quando la vede.',
          testo: `"Ha già trovato quello che cercava la settimana scorsa, o la ricerca è ancora aperta?"`,
          risposte: [
            { tono: 'curioso',    testo: `"Ancora aperta. Ma mi ha portato in una direzione inaspettata."`,                            effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Ho trovato parte di quello che cercavo. C'è ancora qualcosa che mi sfugge."`,               effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non sono sicuro/a. Dipende da come si definisce 'trovato'."`,                               effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `"Trovato qualcosa, perso qualcos'altro. Come di solito."`,                                   effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'sv_p01',
          contesto: 'Serelith si avvicina con un volume che non ha richiesto.',
          testo: `"Ho trovato qualcosa che potrebbe interessarle — non in base alla sua richiesta attuale, ma in base al percorso che ho osservato nelle sue ultime visite. Ho pensato che valesse portarglielo."`,
          risposte: [
            { tono: 'curioso',    testo: `"Come ha capito cosa stavo cercando?"`,                                                      effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `Lo prende e la guarda. "Non capita spesso che qualcuno porti qualcosa senza che lo si chieda."`, effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"La ringrazio. È esattamente il tipo di cosa che mi serviva."`,                              effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Apprezzo l'attenzione. Posso chiederle da quale percorso l'ha dedotto?"`,                   effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa c'è, esattamente?"`,                                                                   effetti: { rep: +1 } },
          ]
        },
        {
          id: 'sv_p02',
          contesto: 'Serelith è in piedi vicino a una finestra. Non sta lavorando. Ti vede arrivare e non si sposta.',
          testo: `"Sa che questa biblioteca ha sezioni che nessuno ha consultato in decenni? Non perché siano inaccessibili — solo perché nessuno sa che esistono." Una pausa. "Lei potrebbe essere la persona giusta per cambiare questo."`,
          risposte: [
            { tono: 'curioso',    testo: `"Cosa contengono quelle sezioni?"`,                                                          effetti: { rep: +3, sblocca: 'sv_p02_cu' } },
            { tono: 'cauto',      testo: `"Mi piacerebbe provarci. Ma ho bisogno della sua guida."`,                                   effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Sarei onorato/a di farlo, se lo ritiene opportuno."`,                                       effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"È un'apertura che non mi aspettavo. Grazie."`,                                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Come si accede a queste sezioni?"`,                                                         effetti: { rep: +2 } },
          ]
        },
        {
          id: 'sv_p03',
          contesto: 'Serelith è alla scrivania con un volume che non stava leggendo. Quando vi avvicinate alza lo sguardo con qualcosa di diverso dal solito.',
          testo: `"Ho trovato qualcosa che potrebbe interessarle. Non è nel catalogo principale — è un testo che non ho ancora classificato." Una pausa. "Lo tengo da parte per le persone che sanno cosa farne."`,
          risposte: [
            { tono: 'curioso',    testo: `"Di cosa si tratta?"`,                                                                          effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Sono onorato. Cosa l'ha portata a pensare a me?"`,                                             effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Quando posso consultarlo?"`,                                                                   effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Non mi aspettavo di rientrare in quella categoria. Grazie."`,                                  effetti: { rep: +2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'sv_mp01',
          contesto: 'La biblioteca è quasi vuota. Serelith è tra due scaffali e tiene in mano un volume che non appartiene a nessuna sezione in catalogo. Quando la nota, non si sorprende.',
          testo: `"Questo non appartiene a nessuna sezione ufficiale. L'ho trovato trent'anni fa in un posto dove non avrebbe dovuto essere. Non l'ho segnalato. Non l'ho catalogato." Una pausa. "Non so perché le sto dicendo questo."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non lo dirò a nessuno."`,                                                                   effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Forse sa esattamente perché."`,                                                             effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Può mostrarmi di cosa si tratta?"`,                                                         effetti: { rep: +2, sblocca: 'sv_mp01_cu' } },
            { tono: 'diretto',    testo: `"Che tipo di volume è?"`,                                                                    effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Capisco."`,                                                                                 effetti: { rep: +1 } },
          ]
        },
        {
          id: 'sv_mp02',
          contesto: 'Serelith è al banco, ma non sta registrando nulla. Alza lo sguardo quando si avvicina — non con sorpresa, ma con qualcosa di meno consueto.',
          testo: `"Ho lavorato in questa biblioteca per molti anni. Non molte persone tornano dopo aver trovato quello che cercavano. Lei torna anche quando non sta cercando niente di specifico." Una pausa brevissima. "È una differenza che noto."`,
          risposte: [
            { tono: 'cauto',      testo: `"Questa biblioteca ha qualcosa che mi fa tornare. Non riesco a definirlo meglio."`,           effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"È bello sapere che lo nota."`,                                                              effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa nota, esattamente, nella differenza?"`,                                                effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Torno perché c'è sempre qualcosa da capire."`,                                              effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"La biblioteca è il luogo migliore dell'accademia."`,                                        effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'sv_e01',
          trigger: 'visitaEsterna',
          contesto: 'Serelith è al banco quando arrivi. C\'è qualcosa di diverso nel modo in cui tiene il registro.',
          testo: `"C'è un ospite esterno in accademia che ha chiesto accesso ad alcuni archivi. Il Senato ha autorizzato." Una pausa. "Non le sto chiedendo nulla — la informo."`,
          risposte: [
            { tono: 'cauto',      testo: `"È una scelta che le appartiene. La rispetto."`,                                             effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa l'ha portata a informarmi di questo?"`,                                                effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Capisco la situazione. Posso in qualche modo essere utile?"`,                               effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Annuisce senza commentare.`,                                                                 effetti: { rep: +1 } },
          ]
        },
        {
          id: 'sv_e02',
          trigger: 'incidenteInterno',
          contesto: 'Serelith nota che sei rimasto/a dopo che gli altri sono andati.',
          testo: `"Questo periodo è insolito per la biblioteca. Le persone vengono a cercare risposte nei testi quando non sanno dove trovarle altrove." Una pausa brevissima. "Non è un commento negativo."`,
          risposte: [
            { tono: 'cauto',      testo: `"Anch'io sto cercando qualcosa, in un certo senso."`,                                       effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa cercano, di solito, in questi momenti?"`,                                              effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"La biblioteca è sempre il posto giusto in cui stare."`,                                    effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Lo so."`,                                                                                   effetti: { rep: +1 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // MA — MARCO ALESSI | Novizio, Studente | (18)
  // Gioviale e ironico, facilità sociale, disciplina nascosta
  // Giocatore usa: tu
  // ============================================================
  marcoAlessi: {

    voicelines: [],

    primoIngresso: [
      {
        id: 'ma_pi01',
        contesto: 'Marco Alessi è uno dei primi a notarti nel corridoio affollato del tuo primo giorno. Si avvicina con la naturalezza di chi non conosce il disagio dell\'approccio.',
        testo: `"Ehi! Nuovo arrivo?" Sorride senza calcolo. "Marco Alessi. Benvenuto nel posto più strano in cui tu abbia mai messo piede — di preciso, da quante ore?"`,
        risposte: [
          { tono: 'amichevole', testo: `"Qualche ora. È già così evidente che sono nuovo?"`,                                          effetti: { rep: +3 } },
          { tono: 'ironico',    testo: `"Abbastanza da essermi perso due volte. Tu sei sempre così caloroso con gli sconosciuti?"`,   effetti: { rep: +2 } },
          { tono: 'curioso',    testo: `"Da stamattina. Da dove viene questa sensazione di stranezza?"`,                              effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Da stamattina. Tu sei qui da tanto?"`,                                                       effetti: { rep: +2 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'ma_o01',
          contesto: 'Marco ti raggiunge con un\'espressione che non è quella solita.',
          testo: `"Ho sentito quello che hai detto su Edwyn l'altro giorno. Non so se era una battuta o una cosa seria, ma l'ha sentita e l'ha presa male. Dovresti saperlo."`,
          risposte: [
            { tono: 'diretto',    testo: `"Non era mia intenzione. Devo parlargli direttamente."`,                                    effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Grazie per avermelo detto. Non sapevo che avesse sentito."`,                               effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Capito. Sistemerò la cosa."`,                                                              effetti: { rep: +2 } },
            { tono: 'elusivo',    testo: `"Era fuori contesto. Non lo si può prendere così."`,                                        effetti: { rep: -1 } },
            { tono: 'ironico',    testo: `"Tutti tengono d'occhio tutto, in questo posto."`,                                          effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ma_o02',
          contesto: 'Marco è meno loquace del solito — su di lui fa sempre un certo effetto.',
          testo: `"Hai rifiutato di aiutare Chiara l'altro giorno. Senza spiegarti. Non è obbligatorio — ma ti conosco abbastanza da aspettarmi qualcosa di più."`,
          risposte: [
            { tono: 'diretto',    testo: `"Hai ragione. Era un momento sbagliato ma avrei dovuto spiegarlo."`,                        effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"C'era una ragione che non riuscivo a dire in quel momento. Posso spiegarti adesso?"`,      effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Non avevo pensato che l'avrebbe presa così. La cerco io."`,                                effetti: { rep: +1 } },
            { tono: 'elusivo',    testo: `"Non sempre si può. Non ero in condizione."`,                                               effetti: { rep: -1 } },
            { tono: 'ironico',    testo: `"Si diventano tutti consulenti di comportamento, da queste parti."`,                        effetti: { rep: -2 } },
          ]
        },
        {
          id: 'ma_o03',
          contesto: 'Marco ti raggiunge mentre sei solo. Non ha la solita aria aperta — tiene qualcosa dentro che ci vuole poco a capire.',
          testo: `"Ho visto come è andata con Luca ieri. Non è che devi rendermi conto di niente — ma ti chiedo comunque: era necessario?"`,
          risposte: [
            { tono: 'diretto',    testo: `"No. Non era necessario nel modo in cui è successo."`,                                               effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"La situazione era più complicata di come appariva. Non è una scusa — è il contesto."`,              effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Hai ragione. Avrei potuto gestirla meglio."`,                                                       effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Ti aspetti che lo giustifichi o che dica che hai ragione?"`,                                        effetti: { rep:  0 } },
            { tono: 'distaccato', testo: `"Era complicato. Lasciamo perdere."`,                                                                effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'ma_t01',
          contesto: 'Marco ti trova in biblioteca — un posto dove non lo vedi quasi mai.',
          testo: `"Stai evitando qualcuno o stai studiando davvero?" Lo chiede senza accusare. Solo per sapere.`,
          risposte: [
            { tono: 'diretto',    testo: `"Studio. Ma anche un po' la prima cosa."`,                                                  effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Entrambe. È possibile?"`,                                                                  effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Dipende da cosa intendi con 'evitare'."`,                                                  effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Che osservazione acuta. Sei venuto apposta per dirmelo?"`,                                 effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Studio."`,                                                                                 effetti: { rep:  0 } },
          ]
        },
        {
          id: 'ma_t02',
          contesto: 'Marco si siede accanto a te senza chiedere. Ha qualcosa che lo preoccupa ma non lo dice subito.',
          testo: `"Ho notato una cosa. Ultimamente sei più — non so come chiamarla — compresso. Come se stessi tenendo qualcosa dentro. Non devi dirmelo. Ma lo noto."`,
          risposte: [
            { tono: 'cauto',      testo: `"Hai ragione. Non so ancora come parlarne."`,                                               effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Sì. Non è il momento giusto ma ci arriverò."`,                                             effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"È bello che tu l'abbia notato. Grazie."`,                                                  effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"E tu sai quando stare fermo, eh."`,                                                        effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sto bene."`,                                                                               effetti: { rep:  0 } },
          ]
        },
        {
          id: 'ma_t03',
          contesto: 'Marco ti trova per caso e rallenta il passo. Ti guarda un momento prima di parlare.',
          testo: `"Sei cambiato nell'ultimo periodo. Non in modo brutto — solo diverso. Come se stessi tenendo qualcosa di distanza da tutto." Una pausa. "Non devi dirmi niente. Ma lo noto."`,
          risposte: [
            { tono: 'diretto',    testo: `"Sì. Ci sono cose che sto cercando di capire da solo prima di parlarne."`,                          effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Mi fa piacere che tu l'abbia detto. Probabilmente ne parlerò — non adesso."`,                      effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Hai ragione. Non è il momento, ma appena lo è te lo dico."`,                                       effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Sei diventato osservatore. Quando è successo?"`,                                                    effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sto bene. Sono solo concentrato su cose mie."`,                                                    effetti: { rep:  0 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'ma_n01',
          contesto: 'Marco Alessi ti raggiunge con la naturalezza di chi non conosce il concetto di avvicinarsi con cautela.',
          testo: `"Ehi. Com\'è andata stamattina?"`,
          risposte: [
            { tono: 'amichevole', testo: `Ricambi il sorriso e gli chiedi com\'è andata la lezione di stamattina.`,                      effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `Gli dici che la sua faccia da "ho studiato tutta la notte" è migliorata.`,                     effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Lo saluti con un cenno e aspetti di capire cosa vuole.`,                                        effetti: { rep: +0 } },
            { tono: 'diretto',    testo: `Gli chiedi subito se ha visto gli orari per la prossima settimana.`,                            effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ma_n02',
          contesto: 'Marco Alessi è seduto su uno dei banchi di pietra del cortile con l\'aria di qualcuno che ha deciso di non fare niente e ne è molto soddisfatto.',
          testo: `"Non mi fissare con quell\'aria — è una pausa strategica."`,
          risposte: [
            { tono: 'amichevole', testo: `Ti siedi accanto a lui e gli chiedi cosa sta evitando di fare.`,                               effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `Commenti che la sua postura è quella di chi ha appena passato un esame o lo sta per fallire.`,  effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `Gli chiedi se ha sentito qualcosa di nuovo sull\'accademia.`,                                  effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Lo saluti brevemente e continui per la tua strada.`,                                            effetti: { rep: +0 } },
          ]
        },
        {
          id: 'ma_n03',
          contesto: 'Marco è in cortile con un\'espressione da chi ha appena avuto un\'idea — non abbastanza buona da essere entusiasta, ma abbastanza da non riuscire a tenerla per sé.',
          testo: `"Ho pensato a una cosa. Non so ancora se è una buona idea o una di quelle che sembrano buone e poi non lo sono. Vuoi sentirla?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Dimmi. Se non è buona lo scopriamo insieme."`,                                                     effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Dipende. Quanto tempo ci vuole a smontarla?"`,                                                      effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Sì. Cosa ti ha fatto venire in mente?"`,                                                            effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Sì. Dimmi."`,                                                                                      effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Vai."`,                                                                                             effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'ma_p01',
          contesto: 'Marco Alessi ti vede arrivare e alza la mano in un saluto con una familiarità che ormai ha il peso di una piccola abitudine.',
          testo: `"Eccoti. Cercavo qualcuno con cui ragionare su una cosa."`,
          risposte: [
            { tono: 'amichevole', testo: `Ricambi e ti fermi — sai già che la conversazione sarà piacevole.`,                            effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `Gli chiedi quante volte al giorno fa quel gesto a persone diverse.`,                            effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `Gli chiedi subito cosa gli è passato per la testa stamattina — sei curioso di saperlo.`,       effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `Ti fermi senza fretta e aspetti che sia lui a scegliere il tono della conversazione.`,         effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ma_p02',
          contesto: 'Marco Alessi ti ferma nel corridoio con il tono di chi ha qualcosa di serio da dire — il che, su di lui, fa sempre un certo effetto.',
          testo: `"Devo dirti una cosa. Non è importante come cosa, ma è importante come confidenza."`,
          risposte: [
            { tono: 'amichevole', testo: `"Dimmi. Non lo dico a nessuno."`,                                     effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Ti ascolto."`,                                                        effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Prima volta che ti vedo serio. Devo preoccuparmi?"`,                  effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa succede?"`,                                                      effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ma_p03',
          contesto: 'Marco ti trova con quell\'espressione da chi ha già deciso ma vuole conferma.',
          testo: `"Stasera c'è una cosa — non organizzata, non programmata, probabilmente non del tutto regolare. Vieni?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Sì. Di cosa si tratta?"`,                                                                          effetti: { rep: +3 } },
            { tono: 'ironico',    testo: `"Già che menzioni la regolarità — quante probabilità ci sono che reggiamo fino a domattina?"`,       effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Quanto non organizzata?"`,                                                                          effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Dimmi dove e quando."`,                                                                             effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non del tutto regolare quanto?"`,                                                                   effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'ma_mp01',
          contesto: 'Marco smette a metà di una battuta. Ti guarda in modo diverso dal solito.',
          testo: `"Sai cosa ho scoperto? Che faccio le battute soprattutto quando non so come essere presente. E con te ultimamente... non sento quel bisogno." Ride piano. "Non dirmelo a nessuno, o rovino la reputazione."`,
          risposte: [
            { tono: 'diretto',    testo: `"Non ti tradisco. Ma apprezzo che tu l'abbia detto."`,                                       effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"È la cosa più seria che mi hai detto da quando ci conosciamo."`,                            effetti: { rep: +3 } },
            { tono: 'ironico',    testo: `"Stai recuperando punti seri molto velocemente. Attento, diventi umano."`,                   effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `Lo guardi senza aggiungere altro. "Capito."`,                                                effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da quando ti sembra così?"`,                                                                effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ma_mp02',
          contesto: 'Marco ti cerca fuori dall\'orario di lezione. Non ha l\'aria di chi arriva con una battuta pronta.',
          testo: `"Ho qualcosa che studio da un anno e non l'ho detto a nessuno perché mi sembrava troppo — troppo serio, troppo diverso da come mi vedono. Forse è il momento di dirlo almeno a una persona."`,
          risposte: [
            { tono: 'diretto',    testo: `"Sono pronto. Dimmi."`,                                                                      effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono contento di essere quella persona."`,                                                  effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `Ti siedi. Non fretti, non pressioni. "Quando sei pronto."`,                                  effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Aspettavi qualcuno che non ridesse, o qualcuno che capisse davvero?"`,                       effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Finalmente. Pensavo non ci arrivassimo mai."`,                                              effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ma_mp03',
          contesto: 'È una di quelle rare volte in cui Marco non inizia con una battuta. Si siede accanto a te senza dire niente per un po\'.',
          testo: `"Ho pensato a cosa voglio fare quando finisco qui. Non quello che mi aspettano che dica — quello che voglio davvero. Lo so adesso. Non l'ho mai detto ad alta voce."`,
          risposte: [
            { tono: 'cauto',      testo: `Aspetti. Non interrompi, non affretti. "Quando sei pronto."`,                                       effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono tutto orecchie. E non lo dico a nessuno."`,                                                   effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Dimmi."`,                                                                                          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da quando lo sai?"`,                                                                               effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Aspettavo questo momento. Vai."`,                                                                  effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'ma_e01',
          trigger: 'cermoniaPromozione',
          contesto: 'Marco ti vede dopo una cerimonia di promozione. Non ha ancora recuperato l\'espressione solita.',
          testo: `"Quella cerimonia ogni volta mi fa lo stesso effetto. Non invidia — qualcosa più simile alla realizzazione. Che il tempo passa davvero, e non è solo una cosa che si dice." Una pausa insolita. "Hai mai quel senso?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Sì. È una delle sensazioni più strane che conosco."`,                                      effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Ogni volta. Mi fermo sempre un secondo dopo."`,                                            effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Sì. Non spesso, ma sì."`,                                                                  effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Come mai ci pensi? Ti aspetta qualcosa?"`,                                                 effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Il tempo passa. Questa è la grande rivelazione."`,                                         effetti: { rep:  0 } },
          ]
        },
        {
          id: 'ma_e02',
          trigger: 'visitaMercante',
          contesto: 'Dario Menci è appena passato. Marco ti trova poco dopo con l\'aria di chi ha comprato qualcosa che non sa bene cosa fare.',
          testo: `"Il tipo con le borse — gli hai comprato qualcosa? Io ho preso una cosa che non so se mi serviva o se mi sembrava solo affascinante. Succede anche a te?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Sempre. È il suo mestiere fartelo sembrare necessario."`,                                  effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Tu e le decisioni d'impulso siete un duo consolidato."`,                                   effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa hai preso?"`,                                                                         effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"A volte è la stessa cosa — affascinante e necessario."`,                                   effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Dipende dalla cosa."`,                                                                     effetti: { rep: +1 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // HM — HALVARD MUNK | Custode, Staff | (50+)
  // Solido, radicato, conosce ogni pietra dell'accademia
  // Giocatore usa: Lei
  // ============================================================
  halvardMunk: {

    voicelines: [],

    primoIngresso: [
      {
        id: 'hm_pi01',
        contesto: 'L\'uomo che sistema la cerniera del cancello si gira quando passi — non perché tu abbia fatto rumore, ma perché sembra che niente si muova nel cortile senza che lui lo sappia. Ti guarda con la calma di chi ha visto abbastanza persone arrivare da saper distinguere quelle che restano da quelle che passano.',
        testo: `"Nuovo."`,
        risposte: [
          { tono: 'amichevole', testo: `"Da un paio di giorni. Halvard Munk, giusto? Ho sentito il suo nome."`,                          effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Sì. C\'è qualcosa che dovrei sapere su questo posto?"`,                                         effetti: { rep: +2 } },
          { tono: 'formale',    testo: `Ti presenti con il tuo nome e il tuo grado, come si conviene.`,                                  effetti: { rep: +1 } },
          { tono: 'cauto',      testo: `Annuisci e aspetti di capire se vuole aggiungere qualcosa.`,                                     effetti: { rep: +1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'hm_o01',
          contesto: 'Halvard vi trova in un\'area dell\'accademia che è chiusa durante questa fascia oraria. Non sembra sorpreso — sembra che se lo aspettasse.',
          testo: `"Questa ala è chiusa fino alle dodici. L'ha visto il cartello o stava cercando di non vederlo?"`,
          risposte: [
            { tono: 'formale',    testo: `"Ha ragione. Me ne vado subito. Mi scuso."`,                                                    effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non l'avevo notato. Dov'è?"`,                                                                  effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Non stavo cercando di non vederlo. Ma capisco che sembri così."`,                               effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Ho sbagliato. Mi scuso. Stavo cercando una cosa specifica."`,                                  effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Stavo cercando di non vederlo — con successo, fino a questo momento."`,                        effetti: { rep: -1 } },
          ]
        },
        {
          id: 'hm_o02',
          contesto: 'Halvard vi incontra in corridoio. Ha qualcosa in mano — qualcosa che riconosce.',
          testo: `"Questo era nella stanza degli attrezzi. Lo sportello è rimasto aperto e il meccanismo si è danneggiato — probabilmente perché qualcuno è uscito in fretta senza controllare." Una pausa. "È lei, vero?"`,
          risposte: [
            { tono: 'diretto',    testo: `"Sì. Non l'ho fatto apposta. Mi dispiace — come posso rimediare?"`,                                  effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Sì. Mi assumo la responsabilità. Posso aiutare a ripararlo?"`,                                      effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Sì. Stavo cercando qualcosa e avevo fretta. Non ho controllato come avrei dovuto."`,                effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Sì. Non sapevo che si potesse danneggiare così. Me ne occupo io."`,                                effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non sono sicura di essere stata l'ultima a passare di lì."`,                                       effetti: { rep: -1 } },
          ]
        },
        {
          id: 'hm_o03',
          contesto: 'Halvard è fermo davanti a una porta che avevate intenzione di aprire. Vi guarda arrivare senza spostarsi.',
          testo: `"Quest'area è interdetta questa settimana. C'è un lavoro di manutenzione strutturale in corso — non ho potuto mettere il cartello ieri perché non era ancora sicuro entrare nemmeno per farlo." Lo dice senza durezza. "Lo sa adesso."`,
          risposte: [
            { tono: 'formale',    testo: `"Capito. Grazie per l'avvertimento. Tornerò quando è di nuovo accessibile."`,                        effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non lo sapevo. Quanto dura la manutenzione?"`,                                                     effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Intendevo passare veloce — ma capisco. Non è il caso."`,                                           effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Apprezzo che me lo dica. C'è un altro accesso a quell'ala?"`,                                      effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Annuisce e fa dietrofront senza commenti.`,                                                         effetti: { rep: +1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'hm_t01',
          contesto: 'Halvard è nei pressi del cancello. Ha un\'espressione che non è consueta su di lui.',
          testo: `"Ha sentito quello che è successo stanotte nel cortile. Non le chiedo se c'entrava — le chiedo se sa qualcosa."`,
          risposte: [
            { tono: 'diretto',    testo: `"Non ero presente. Posso dirle cosa ho sentito."`,                                          effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"So qualcosa, ma non abbastanza da essere certa. Cosa vuole sapere?"`,                      effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Sono disponibile a fornire qualsiasi informazione in mio possesso."`,                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non ho informazioni utili."`,                                                              effetti: { rep:  0 } },
            { tono: 'scettico',   testo: `"Perché lo chiede a me?"`,                                                                  effetti: { rep: -1 } },
          ]
        },
        {
          id: 'hm_t02',
          contesto: 'Halvard sta riparando qualcosa nei pressi dell\'ingresso. Ti ferma prima che tu entri.',
          testo: `"C'è qualcosa che si muove in questo posto che non mi piace. Non so ancora di cosa si tratti, ma lo sento. La prego di stare attenta." Non aspetta risposta. Si rimette al lavoro.`,
          risposte: [
            { tono: 'cauto',      testo: `"La ringrazio per l'avvertimento. Cosa ha notato esattamente?"`,                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da quanto tempo lo sente?"`,                                                               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Capisco. Stia tranquillo, sto facendo attenzione."`,                                       effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisce e prosegue.`,                                                                      effetti: { rep: +1 } },
          ]
        },
        {
          id: 'hm_t03',
          contesto: 'Halvard vi nota fare qualcosa nel modo sbagliato — non pericoloso, ma visibile da lontano. Non commenta subito.',
          testo: `"Ha visto come lo fa il personale? Non per regola — per efficienza. Ci sono modi che fanno risparmiare tempo e modi che lo sprecano." Non è una critica. È un'osservazione pratica.`,
          risposte: [
            { tono: 'cauto',      testo: `"Non l'avevo considerato. Mi mostra il modo corretto?"`,                                        effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Ha ragione. Come lo fa lei?"`,                                                                  effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Capito. Lo correggo."`,                                                                         effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Grazie per averlo detto. Non avevo un termine di confronto."`,                                  effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisce e modifichi l'approccio senza aggiungere altro.`,                                      effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'hm_n01',
          contesto: 'Halvard Munk è al lavoro su qualcosa vicino all\'ingresso del magazzino — non è chiaro cosa, ma lo fa con la concentrazione di chi non distingue tra lavori importanti e lavori banali. Ti nota e si ferma un momento.',
          testo: `"Ha bisogno di qualcosa?"`,
          risposte: [
            { tono: 'amichevole', testo: `Gli chiede cosa sta riparando con la curiosità genuina di chi vorrebbe imparare.`,             effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `Gli chiede se ha visto Cornelia Vesti passare di lì stamattina.`,                              effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `Lo saluti senza disturbarlo troppo — sembra occupato.`,                                        effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `Gli chiede quanti anni è che lavora nell\'accademia — la domanda le è venuta spontanea.`,      effetti: { rep: +2 } },
          ]
        },
        {
          id: 'hm_n02',
          contesto: 'Halvard Munk è seduto su un muretto ai margini del cortile, a guardare qualcosa che non riesci a individuare subito. Quando ti avvicini, sposta lo sguardo su di te senza sorpresa.',
          testo: `"Si sieda, se vuole."`,
          risposte: [
            { tono: 'cauto',      testo: `Ti siedi vicino senza parlare subito — a volte il silenzio è una forma di rispetto.`,          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `Gli chiede cosa stava guardando.`,                                                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `Gli chiede se sa qualcosa sulle cerimonie di fine semestre — vuole sapere a cosa aspettarsi.`, effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `Gli dice che il cortile è il posto che preferisce nell\'accademia, e che ci è arrivato un po\' per caso.`, effetti: { rep: +2 } },
          ]
        },
        {
          id: 'hm_n03',
          contesto: 'Halvard è vicino alla fontana nel cortile. Non sta facendo niente in particolare.',
          testo: `"Ha mangiato?" Un'occhiata breve. "Ha quella faccia."`,
          risposte: [
            { tono: 'amichevole', testo: `"Non ancora. Come fa a saperlo?"`,                                                          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Che faccia?"`,                                                                             effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"No. Non ancora."`,                                                                         effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Grazie per l'attenzione."`,                                                                effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'hm_p01',
          contesto: 'Halvard è seduto su un muretto con un meccanismo in mano che non riesce a sistemare da solo. Ti nota arrivare.',
          testo: `"Sa fare qualcosa con i meccanismi di precisione? Non è urgente — ma ho del tempo se ne ha."`,
          risposte: [
            { tono: 'amichevole', testo: `"Ci provo. Mostri pure."`,                                                                  effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Sì. Vediamo."`,                                                                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Che tipo di meccanismo è?"`,                                                               effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non sono esperto/a, ma posso guardare se vuole un secondo parere."`,                       effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Se può essere utile, sono disponibile."`,                                                  effetti: { rep: +1 } },
          ]
        },
        {
          id: 'hm_p02',
          contesto: 'Halvard ti trova nell\'area dei magazzini, dove non transitano molti studenti.',
          testo: `"I nuovi arrivano sempre con molta fretta. Lei no. Ho notato che sa stare in un posto senza dover fare qualcosa per giustificarsi." Una pausa. "È una qualità che non si insegna."`,
          risposte: [
            { tono: 'cauto',      testo: `"Ho imparato che certi posti si capiscono solo stando fermi."`,                             effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non l'ho mai visto in questo modo. Grazie."`,                                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Non sempre. Ma alcune cose richiedono tempo."`,                                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Come distingue chi sa stare fermo da chi lo fa per stanchezza?"`,                          effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisce senza aggiungere altro.`,                                                          effetti: { rep: +1 } },
          ]
        },
        {
          id: 'hm_p03',
          contesto: 'Halvard vi trova a fare una cosa che nessuno vi ha chiesto — risolvere un problema che avevate visto e potevate ignorare.',
          testo: `"L'ha visto e l'ha sistemato." Non è una domanda. "In quest'accademia ci sono molte persone abili. Poche notano quello che non riguarda direttamente il loro percorso."`,
          risposte: [
            { tono: 'amichevole', testo: `"Non mi sembrava giusto lasciarlo così."`,                                                       effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Sembrava il tipo di cosa che si sistema subito."`,                                              effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Succede spesso che cose simili vengano ignorate?"`,                                             effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non era niente di complicato."`,                                                                effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Stringi le spalle. Era la cosa ovvia da fare.`,                                                  effetti: { rep: +2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'hm_mp01',
          contesto: 'Halvard Munk è in cortile, osserva le mura come se le stesse contando. La nota avvicinarsi e annuisce.',
          testo: `"Ho visto molte generazioni passare da qui. Quasi tutte se ne vanno senza guardare le pietre." Una pausa. "Lei le guarda. È una cosa rara. Vale la pena notarla."`,
          risposte: [
            { tono: 'diretto',    testo: `"Le pietre raccontano cose che i libri non hanno."`,                                         effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Ha visto molte cose, in tutti questi anni."`,                                               effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa distingue chi guarda da chi non guarda, secondo lei?"`,                                effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Non sapevo che qualcuno lo notasse."`,                                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"È un posto che lo merita."`,                                                               effetti: { rep: +1 } },
          ]
        },
        {
          id: 'hm_mp02',
          contesto: 'Halvard la trova a sistemare qualcosa che non era suo compito sistemare. La guarda senza interrompere.',
          testo: `"Non gliel'ho chiesto. Non era suo compito." Una pausa. "Queste cose si vedono. Le ho viste fare da poche persone, nei miei anni qui. Di rado da uno studente."`,
          risposte: [
            { tono: 'diretto',    testo: `"Mi sembrava la cosa ovvia da fare."`,                                                       effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"È il posto in cui vivo. Ha senso prendersene cura."`,                                       effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non pensavo fosse notato. Ma sono contento che lo sia stato."`,                             effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Quali erano le altre persone?"`,                                                            effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Nessun problema."`,                                                                        effetti: { rep: +1 } },
          ]
        },
        {
          id: 'hm_mp03',
          contesto: 'Halvard è seduto su un muretto, la schiena contro il muro, lo sguardo verso il cortile. Quando vi sedete accanto, ci vuole un po\' prima che parli.',
          testo: `"Il primo anno che ho lavorato qui avevo trent'anni e pensavo di restare un semestre. Qualcuno aveva bisogno di qualcuno che conoscesse le mura vecchie — e le conoscevo, perché ci avevo lavorato quando le stavano restaurando." Una pausa lunga. "Non mi sono mai spiegato perché non me ne sia andato. Ma non l'ho rimpianto."`,
          risposte: [
            { tono: 'cauto',      testo: `Aspettate che finisca, poi: "Cos'è che l'ha fatta restare, secondo lei?"`,                          effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono contenta che non se ne sia andato."`,                                                         effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Come erano le mura in quel periodo?"`,                                                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"A volte è così — non si parte perché si vuole, ma perché il posto ha già deciso."`,                 effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Rimanete in silenzio. È più che sufficiente.`,                                                      effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'hm_e01',
          trigger: 'incidenteInterno',
          contesto: 'Halvard è in cortile, come quasi sempre, ma con un\'attenzione diversa.',
          testo: `"In quarant'anni qui ho visto cose strane succedere. Alcune si sistemano da sole. Alcune richiedono intervento." Una pausa. "Questa — non ho ancora capito quale tipo sia."`,
          risposte: [
            { tono: 'cauto',      testo: `"Cosa ha visto che la rende incerta sulla natura dell'incidente?"`,                         effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"C'è mai stato qualcosa di simile in passato?"`,                                            effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Come posso essere utile?"`,                                                                effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Capisco."`,                                                                                effetti: { rep: +1 } },
          ]
        },
        {
          id: 'hm_e02',
          trigger: 'cambioStagione',
          contesto: 'Halvard sta sistemando il cortile per il cambio stagionale. Si ferma.',
          testo: `"Questo posto cambia forma ogni anno. Non le strutture — le persone. Chi c'era non c'è più. Chi c'è adesso non immaginava di esserci un anno fa." Una pausa. "Lei lo capisce già, o ci arriverà dopo?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Lo capisco abbastanza. Ma non ancora del tutto."`,                                         effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"È una delle cose che rende questo posto difficile da lasciare."`,                          effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Lo vedo. Da quando sono arrivato/a."`,                                                     effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Quando ha cominciato a vederlo in questo modo?"`,                                          effetti: { rep: +2 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // CM — CHIARA MOTTI | Novizio, Studentessa | (18)
  // Calorosa, curiosa, si entusiasma senza imbarazzo
  // Giocatore usa: tu
  // ============================================================
  chiaraMotti: {

    voicelines: [],

    primoIngresso: [
      {
        id: 'cm_pi01',
        contesto: 'Una studentessa ti si para davanti con un sorriso che non ha niente di strategico — è solo genuino, e questo lo rende quasi sorprendente.',
        testo: `"Sei quello che è arrivato lunedì? Chiara Motti. Hai già trovato la biblioteca? È enorme, vero? Ci si perde ancora dopo settimane."`,
        risposte: [
          { tono: 'amichevole', testo: `"Sì, mi ci sono perso davvero. Chiara, hai qualche consiglio su come orientarsi?"`,              effetti: { rep: +3 } },
          { tono: 'curioso',    testo: `"Ti interessa molto la biblioteca? Hai già una disciplina preferita?"`,                           effetti: { rep: +2 } },
          { tono: 'ironico',    testo: `"Tre domande di fila. Record personale o fai così con tutti?"`,                                   effetti: { rep: +1 } },
          { tono: 'formale',    testo: `Ti presenti con nome e grado e la ringrazi per l\'accoglienza.`,                                  effetti: { rep: +1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'cm_o01',
          contesto: 'Chiara è silenziosa — su di lei è anomalo. Ti aspetta in corridoio.',
          testo: `"C'è qualcosa che mi devi dire. L'ho capito dal modo in cui mi hai evitata stamattina. Non fare finta che non stia succedendo."`,
          risposte: [
            { tono: 'diretto',    testo: `"Hai ragione. Aspettavo il momento giusto per dirtelo."`,                                           effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non ti stavo evitando. Ma c'è qualcosa che devo ancora capire come dirti."`,                       effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Mi dispiace. Non volevo che te ne accorgessi."`,                                                   effetti: { rep: +1 } },
            { tono: 'elusivo',    testo: `"Non ti stavo evitando."`,                                                                          effetti: { rep: -1 } },
            { tono: 'ironico',    testo: `"Non sapevo che fossi così attenta."`,                                                              effetti: { rep: -1 } },
          ]
        },
        {
          id: 'cm_o02',
          contesto: 'Chiara ti ferma in corridoio. È più ferma del solito.',
          testo: `"Quello che hai detto la settimana scorsa su quella cosa — non mi aveva fatto effetto sul momento. Poi ci ho pensato tutta la notte. Non era giusto."`,
          risposte: [
            { tono: 'cauto',      testo: `"Hai ragione. Avevo detto una cosa che non avrei dovuto."`,                                         effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Mi dispiace. Non era mia intenzione farti stare sveglia."`,                                        effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa ti ha fatto pensare tutta la notte, di preciso?"`,                                            effetti: { rep: +1 } },
            { tono: 'elusivo',    testo: `"Non ricordo esattamente cosa ho detto."`,                                                          effetti: { rep: -2 } },
            { tono: 'ironico',    testo: `"Tutta la notte? Questo è un po' molto."`,                                                          effetti: { rep: -2 } },
          ]
        },
      ],

      teso: [
        {
          id: 'cm_t01',
          contesto: 'Chiara ti raggiunge, ma è meno veloce del solito.',
          testo: `"Posso chiederti una cosa senza che tu la prenda nel modo sbagliato? Ultimamente sembra che tu abbia qualcosa in testa. Non è una critica — è che lo noto."`,
          risposte: [
            { tono: 'cauto',      testo: `"Hai ragione. Non so ancora come parlarne, ma lo noto anch'io."`,                                   effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non lo prenderei nel modo sbagliato. Sì, c'è qualcosa."`,                                          effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Sì. È una cosa che devo risolvere io. Ma grazie per averlo chiesto."`,                             effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da quando lo noti?"`,                                                                              effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Sto bene."`,                                                                                       effetti: { rep:  0 } },
          ]
        },
        {
          id: 'cm_t02',
          contesto: 'Chiara ti raggiunge in biblioteca. Non ha niente da cercare — è venuta apposta.',
          testo: `"Ho fatto una cosa che non so se era giusta. Non te lo dico per avere una risposta — te lo dico perché ho bisogno che qualcuno sappia che l'ho fatta."`,
          risposte: [
            { tono: 'amichevole', testo: `"Ti ascolto. Dimmi."`,                                                                              effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Sono qui. Non giudico."`,                                                                          effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Ti ascolto. Non servono risposte — basta che tu possa dirlo."`,                                    effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa hai fatto?"`,                                                                                 effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Ti siedi accanto a lei in silenzio, aspettando.`,                                                   effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'cm_n01',
          contesto: 'Chiara Motti ti raggiunge con un volume sotto il braccio e l\'espressione di chi ha appena fatto una scoperta e vuole condividerla prima che il momento passi.',
          testo: `"Ascolta, hai un minuto? Ho trovato una cosa."`,
          risposte: [
            { tono: 'curioso',    testo: `Le chiedi cosa ha trovato — la sua espressione promette qualcosa di interessante.`,             effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Dimmi, dimmi. Che hai trovato?"`,                                                              effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `La saluti e aspetti che decida da sola se condividere o meno.`,                                 effetti: { rep: +0 } },
            { tono: 'cauto',      testo: `La ascolti con attenzione, senza interrompere.`,                                                effetti: { rep: +1 } },
          ]
        },
        {
          id: 'cm_n02',
          contesto: 'Chiara Motti è al tavolo in fondo alla biblioteca con davanti tre libri su argomenti che non sembrano collegati tra loro. Quando ti vede si illumina come se avessi risolto un problema.',
          testo: `"Perfetto. Siediti — ho bisogno di qualcuno che mi aiuti a capire se sto vedendo una connessione o me la sto inventando."`,
          risposte: [
            { tono: 'curioso',    testo: `Le chiedi cosa collegano quei tre testi — la disposizione ti incuriosisce.`,                   effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `Le chiedi se riesce a spiegarti cosa sta cercando di capire.`,                                 effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Stai costruendo una teoria o stai solo ritardando la scelta di cosa studiare?"`,               effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `Le chiedi se può prestarti uno di quei testi quando ha finito.`,                               effetti: { rep: +1 } },
          ]
        },
        {
          id: 'cm_n03',
          contesto: 'Chiara ti vede da lontano e accelera il passo verso di te.',
          testo: `"Avevo una cosa da chiederti ieri, ma poi non mi è sembrato il momento giusto. Adesso è il momento giusto?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Sì, dimmi pure."`,                                                                                 effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Dipende dalla cosa. Ma sì."`,                                                                      effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Ogni momento è quello giusto per le tue domande."`,                                                effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `"Sì. Cosa c'è?"`,                                                                                   effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'cm_p01',
          contesto: 'Chiara Motti ti trova prima che tu la trovi — questo sembra succedere spesso. Ha qualcosa da chiederti, si capisce dall\'espressione, ma aspetta che tu sia pronto.',
          testo: `"Scusa se ti cerco sempre io. Hai un momento?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Eccomi. Cosa c\'è?"`,                                                                         effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa stai cercando di capire questa volta?"`,                                                  effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `La guardi e aspetti — hai imparato che le sue domande meritano un momento di attenzione.`,     effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Dimmi cosa ti serve. Ti aiuto se posso."`,                                                    effetti: { rep: +2 } },
          ]
        },
        {
          id: 'cm_p02',
          contesto: 'Chiara Motti ti trova con un tono diverso dal solito — meno veloce, più deliberato, come se stesse cercando le parole giuste.',
          testo: `"Voglio ringraziarti per l'altra volta. Non l'ho detto subito perché non trovavo le parole giuste. Adesso ce le ho."`,
          risposte: [
            { tono: 'amichevole', testo: `"Non era necessario, ma sono contenta che tu l'abbia detto."`,       effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Sono contenta di aver potuto aiutare."`,                              effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa era importante trovare le parole giuste, in questo caso?"`,      effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Grazie a te."`,                                                       effetti: { rep: +2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'cm_mp01',
          contesto: 'Chiara è in biblioteca. Per la prima volta non sta cercando niente di specifico — è solo seduta.',
          testo: `"Sai cosa mi spaventa? Non il fatto di non sapere qualcosa — quello mi entusiasma. Mi spaventa l'idea di smettere di voler sapere. Che succede a certe persone." Una pausa. "Forse lo dico a te perché sei uno dei pochi che capisce la differenza."`,
          risposte: [
            { tono: 'diretto',    testo: `"Il fatto che tu ne abbia paura è già la risposta."`,                                        effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non ti succederà. Lo vedo da come sei fatta."`,                                             effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Capisco la paura. Ma non penso che sia nel tuo percorso."`,                                 effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Se smettessi di fare domande, nessuno di noi riconoscerebbe più la biblioteca."`,           effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Chi hai visto, smettere così?"`,                                                            effetti: { rep: +2 } },
          ]
        },
        {
          id: 'cm_mp02',
          contesto: 'Chiara ti raggiunge di corsa in cortile. Ha l\'aria di chi ha trovato qualcosa di importante ma non sa ancora quanto.',
          testo: `"Ho trovato una connessione tra tre discipline che non viene mai menzionata insieme. Non so ancora cosa significa — ma sento che è il tipo di cosa che cambierà come vedo tutto il resto." Si ferma. "Volevo dirtelo prima ancora di capirla. Non so perché. Forse perché con te le cose diventano più reali."`,
          risposte: [
            { tono: 'curioso',    testo: `"Mostrami. Voglio capire."`,                                                                 effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono qui. Raccontami tutto."`,                                                              effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Cosa collega le tre discipline?"`,                                                          effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non la capiremo subito, ma è meglio capirla insieme."`,                                     effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Ti siedi accanto a lei aspettando che cominci. Non hai fretta.`,                             effetti: { rep: +2 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'cm_e01',
          trigger: 'incidenteInterno',
          contesto: 'Chiara ti trova subito dopo che è successo qualcosa di grave nell\'accademia. Ha l\'aria di chi ha smesso di fare domande e adesso ne ha troppe.',
          testo: `"Ho sentito quello che è successo. Non riesco a smettere di pensarci — non nel senso che ho paura, ma nel senso che non so come metterlo a fuoco. Come si fa a continuare a studiare normalmente dopo una cosa del genere?"`,
          risposte: [
            { tono: 'diretto',    testo: `"Si continua perché è l'unica cosa su cui abbiamo controllo."`,                                 effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non lo so neanche io. Forse non bisogna farlo subito — forse bisogna stare con quello che è successo un po'."`, effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa ti ha colpito di più?"`,                                                                   effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non penso ci sia un modo giusto. Ognuno trova il proprio."`,                                   effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Rimani in silenzio. Alcune domande non hanno risposta utile.`,                                   effetti: { rep: +1 } },
          ]
        },
        {
          id: 'cm_e02',
          trigger: 'decisioneSenato',
          contesto: 'Chiara ti raggiunge in biblioteca dopo aver sentito della decisione del Senato. Ha un tono più serio del solito.',
          testo: `"Se il Senato decide cose così senza spiegarle, come si fa a sapere su cosa si è in disaccordo? Voglio dire — non è che si possa fare niente, però mi sembra strano accettare qualcosa senza nemmeno capirla."`,
          risposte: [
            { tono: 'curioso',    testo: `"Hai ragione. E capire è già qualcosa — anche se non cambia niente nell'immediato."`,            effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Non sempre le spiegazioni arrivano. A volte bisogna costruirsele."`,                            effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Stavo pensando la stessa cosa. Ti va se ci ragioniamo insieme?"`,                               effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Forse le spiegazioni esistono — solo non per noi, non ancora."`,                                effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Il Senato si chiama Senato per un motivo — decide e non si giustifica. Benvenuta nell'accademia."`, effetti: { rep: +1 } },
          ]
        },
      ],

    },
  },


  // ============================================================
  // ED — EDWYN DRAEL | Novizio, Studente | (19)
  // Malinconico, riflessivo, porta qualcosa di irrisolto
  // Sensibilità insolita per i rituali
  // Giocatore usa: tu
  // ============================================================
  edwynDrael: {

    voicelines: [
      { id: 'ed_v01', contesto: 'apertura_conversazione',  testo: `"Stavo pensando a qualcosa. Non so se fa senso dirlo ad alta voce."` },
      { id: 'ed_v02', contesto: 'apertura_conversazione',  testo: `"Sei passato di qui per caso o cercavi qualcosa?"` },
      { id: 'ed_v03', contesto: 'apertura_conversazione',  testo: `"C'è qualcosa in questo posto che non riesce a stare fermo. Non so spiegarlo meglio."` },
      { id: 'ed_v04', contesto: 'chiusura_conversazione',  testo: `"Grazie per aver ascoltato. Non succede spesso."` },
      { id: 'ed_v05', contesto: 'chiusura_conversazione',  testo: `"Vai. Io resto ancora un po'."` },
      { id: 'ed_v06', contesto: 'giocatore_avanza',        testo: `"Stai crescendo. Lo si vede — non nel modo in cui te lo aspetti, ma lo si vede."` },
      { id: 'ed_v07', contesto: 'edwyn_avanza',            testo: `"Un grado in più. Non so se sono pronto. Ma non lo so mai."` },
      { id: 'ed_v08', contesto: 'commento_biblioteca',     testo: `"Ci sono libri in questa biblioteca che nessuno tocca da decenni. Mi chiedo se se ne accorgano."` },
    ],

    primoIngresso: [
      {
        id: 'ed_pi01',
        contesto: 'Un ragazzo è seduto da solo su una panca del cortile con un libro aperto sul grembo che non sembra leggere. Quando ti avvicini alza gli occhi — non con sorpresa, ma come se ti aspettasse da un po\'.',
        testo: `"Sei quello arrivato di recente. Ho sentito parlare di te — non male, solo... il tuo nome in giro."`,
        risposte: [
          { tono: 'amichevole', testo: `"In giro come? Chi parla di me?" Sembri genuinamente curioso.`,                                          effetti: { rep: +2 } },
          { tono: 'curioso',    testo: `"E tu chi sei?" Non hai ancora sentito il suo nome.`,                                                    effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Bene o male, quello che dicono?" Preferisci saperlo subito.`,                                          effetti: { rep: +1 } },
          { tono: 'cauto',      testo: `Ti siedi accanto a lui senza rispondere — aspetti che continui da solo.`,                               effetti: { rep: +2 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'ed_o01',
          contesto: 'Edwyn ti ferma fuori dall\'aula con un\'espressione che non è arrabbiata — è delusa, che è peggio.',
          testo: `"Quello che hai fatto oggi durante la lezione — non so se te ne sei reso conto, ma ha fatto sentire qualcuno escluso. Non era necessario."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non me ne ero accorto. Puoi dirmi cosa hai visto tu?"`,                                               effetti: { rep: +3, sblocca: 'ed_o01_c' } },
            { tono: 'diretto',    testo: `"Hai ragione. Non ho pensato alle conseguenze."`,                                                      effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Mi dispiace. Davvero. Chi era?"`,                                                                     effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Sei sicuro di quello che hai visto?"`,                                                                effetti: { rep: -2 } },
            { tono: 'distaccato', testo: `"Non era mia intenzione."`,                                                                           effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ed_o02',
          contesto: 'Edwyn è in un angolo della biblioteca con un\'aria di chi ha passato troppo tempo a pensare a qualcosa che non avrebbe dovuto. Ti avvicini e capisce subito che hai sentito qualcosa.',
          testo: `"Non quello che pensi. O forse sì — non lo so. Non so più distinguere quello che sto cercando da quello che sto evitando."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non ti sto giudicando. Dimmi solo se vuoi parlarne."`,                                               effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa stavi evitando?"`,                                                                              effetti: { rep: +2, sblocca: 'ed_o02_cu' } },
            { tono: 'amichevole', testo: `"Hai l\'aria di qualcuno che non dorme bene da un po'. Sbaglio?"`,                                    effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Se non vuoi parlare va bene così."`,                                                                  effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Di cosa si tratta? Forse posso aiutare."`,                                                           effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ed_o03',
          contesto: 'Edwyn è in corridoio con lo sguardo fisso sul niente. Quando ti vede si irrigidisce — come se sperasse di non essere notato.',
          testo: `"Lasciami stare. Non oggi."`,
          risposte: [
            { tono: 'cauto',      testo: `"Okay. Sono qui se cambia idea."`,                                                               effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci e non insisti. Non sempre le parole servono.`,                                           effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Non ti chiedo niente. Posso stare un momento qui con te?"`,                                     effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Capito. Passerò dopo."`,                                                                        effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Non stavo venendo per te. Ma l'offerta rimane aperta."`,                                        effetti: { rep: +0 } },
          ]
        },
      ],

      teso: [
        {
          id: 'ed_t01',
          contesto: 'Edwyn ti aspetta all\'uscita della Sala Rituale con l\'espressione di qualcuno che ha appena sentito qualcosa che non sa come interpretare.',
          testo: `"Durante la sessione di oggi — hai percepito qualcosa di strano a un certo punto? Verso la fine. Non voglio influenzarti, dimmi tu."`,
          risposte: [
            { tono: 'cauto',      testo: `"Forse. C\'era una variazione nel ritmo dell\'aria, mi sembrava. Ma non ne ero sicuro."`,             effetti: { rep: +3, sblocca: 'ed_t01_c' } },
            { tono: 'curioso',    testo: `"Cosa hai percepito tu? Parla prima tu."`,                                                             effetti: { rep: +2, sblocca: 'ed_t01_cu' } },
            { tono: 'diretto',    testo: `"Sì. Una pressione strana verso il finale. Cosa pensi che fosse?"`,                                   effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non credo. Forse era solo la concentrazione."`,                                                      effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `"Sì, anch\'io. Pensavo di essere il solo. È normale?"`,                                              effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ed_t02',
          contesto: 'Edwyn è in biblioteca con un testo che non riesce a chiudere. Quando ti vede arrivare sembra quasi sollevato.',
          testo: `"C\'è qualcosa in questo testo che non torna. Non un errore — qualcosa di mancante. Come se una parte fosse stata rimossa e nessuno l\'avesse segnato."`,
          risposte: [
            { tono: 'curioso',    testo: `"Che tipo di testo è? Da dove viene?"`,                                                               effetti: { rep: +2, sblocca: 'ed_t02_cu' } },
            { tono: 'cauto',      testo: `"Può essere una lacuna nella traduzione, o un capitolo che non è mai stato incluso."`,               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Mostrami dove. Ho letto qualcosa di simile la settimana scorsa."`,                                   effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Ti aiuto a cercarlo. Due occhi valgono più di uno."`,                                               effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"I testi antichi hanno spesso lacune. È normale."`,                                                   effetti: { rep: +0 } },
          ]
        },
        {
          id: 'ed_t03',
          contesto: 'Edwyn ti raggiunge in corridoio con l\'aria di chi vuole dire qualcosa da giorni ma non ha ancora trovato il momento.',
          testo: `"Ho pensato a quello che ti ho detto l'altra volta. Non era del tutto onesto. Stavo cercando di sembrare meno perso di quello che ero."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non importa. È difficile essere onesti sul momento."`,                                          effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Lo sapevo. Non ti ho detto niente perché non era il momento."`,                                 effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Quanto eri perso?"`,                                                                            effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Adesso sei meno perso?"`,                                                                       effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Okay."`,                                                                                        effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'ed_n01',
          contesto: 'Edwyn è seduto vicino alla finestra della biblioteca con lo sguardo fuori. Non legge. Quando entri si gira come se avesse aspettato qualcuno — qualcuno, non necessariamente te.',
          testo: `"Stavo cercando di capire da quando in qua questo posto mi sembra diverso. Non trovo la risposta."`,
          risposte: [
            { tono: 'curioso',    testo: `"Diverso come? Più pesante, più vuoto, più pieno?"`,                                                  effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `Ti siedi accanto a lui e guardi fuori anche tu — aspetti che trovi le parole da solo.`,              effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Da quanto tempo sei qui? Nell\'accademia, intendo."`,                                               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa è cambiato per te ultimamente?"`,                                                               effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"I posti cambiano. Forse sei tu che sei cambiato."`,                                                  effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ed_n02',
          contesto: 'Edwyn ti raggiunge nel cortile al tramonto con qualcosa in mano — un foglio piegato che non mostra ma che tiene come se avesse peso.',
          testo: `"Ho scritto una cosa. Non so se ha senso. Non lo do a leggere a tutti — ma tu mi sembri il tipo che non giudica prima di capire."`,
          risposte: [
            { tono: 'cauto',      testo: `"Se vuoi che lo legga, lo leggo. Senza fretta."`,                                                     effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non giudico. Dimmi pure."`,                                                                          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa hai scritto? Un testo, una riflessione?"`,                                                      effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Leggilo tu ad alta voce. È più facile così."`,                                                       effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Se ti sembra giusto condividerlo, lo leggo."`,                                                       effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ed_n03',
          contesto: 'Edwyn è in corridoio con gli appunti di storia tra le mani e l\'aria di qualcuno che ha fatto una domanda a se stesso e non gli è piaciuta la risposta.',
          testo: `"Servi ha detto oggi che la storia è fatta di persone che non sapevano di stare decidendo per il futuro. Mi chiedo se si applichi anche a noi adesso."`,
          risposte: [
            { tono: 'curioso',    testo: `"In che senso? Cosa pensi che stiamo decidendo adesso senza saperlo?"`,                              effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Probabilmente sì. È una delle ragioni per cui trovo la storia inquietante."`,                       effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Dipende da cosa facciamo con quello che sappiamo adesso."`,                                          effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Se è così, spero di non essere ricordato per le scelte sbagliate."`,                                effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Non lo sapremo finché non sarà troppo tardi. È la natura della cosa."`,                             effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'ed_p01',
          contesto: 'Edwyn ti cerca nella biblioteca con la determinazione tranquilla di chi ha preso una decisione dopo averla rimandare a lungo.',
          testo: `"Ho qualcosa da mostrarti. Qualcosa che non ho mostrato a nessuno. Non so ancora se è un errore farlo, ma mi fido di te abbastanza da rischiarlo."`,
          risposte: [
            { tono: 'cauto',      testo: `"Sono qui. Prenditi il tempo che ti serve."`,                                                         effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono onorato. Dimmi."`,                                                                              effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa hai trovato?"`,                                                                                 effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Mostrami. Non giudicherò."`,                                                                         effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ed_p02',
          contesto: 'Edwyn ti aspetta nel cortile all\'ora insolita del tardo pomeriggio quando quasi nessuno è fuori. Non sembra a disagio — sembra che abbia scelto questo momento di proposito.',
          testo: `"Volevo ringraziarti per l\'altra settimana. Non me ne ero ancora uscito con le parole giuste. Adesso ce l\'ho."`,
          risposte: [
            { tono: 'amichevole', testo: `"Non era necessario, ma sono contento che tu l\'abbia detto."`,                                       effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non devi ringraziare. Era la cosa giusta."`,                                                         effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Come stai adesso, rispetto ad allora?"`,                                                             effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Sono contento di aver potuto aiutare."`,                                                             effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ed_p03',
          contesto: 'Edwyn ti aspetta fuori dalla biblioteca con un\'espressione tranquilla che non gli appartiene spesso.',
          testo: `"Non so dirti ancora cosa ho risolto. Ma so che qualcosa è diverso, e che ha a che fare con il fatto che ci sei stato. Volevo che lo sapessi."`,
          risposte: [
            { tono: 'amichevole', testo: `"Sono contento che ci sia stata una differenza."`,                                               effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Non ho fatto molto. Eri tu."`,                                                                  effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Come stai adesso, rispetto a prima?"`,                                                          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa è cambiato esattamente?"`,                                                                 effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci. Non ci sono parole migliori di quelle che ha detto lui.`,                             effetti: { rep: +2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'ed_mp01',
          contesto: 'Edwyn è seduto dove di solito studia da solo. Non sta leggendo nulla. Ti vede arrivare senza muoversi.',
          testo: `"Il peso che porto — non l'ho mai nominato ad alta voce. Non per paura delle parole. Perché non sapevo se esistesse qualcuno disposto ad ascoltarlo senza cercare di risolverlo." Una pausa. "Penso che tu sia quella persona."`,
          risposte: [
            { tono: 'cauto',      testo: `"Allora dimmi. Quando sei pronto."`,                                                         effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Non risolvo. Ascolto."`,                                                                    effetti: { rep: +3 } },
            { tono: 'distaccato', testo: `Rimani in silenzio accanto a lui, senza muoverti. Basta la presenza.`,                       effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono qui."`,                                                                                effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa intendi per peso?"`,                                                                   effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ed_mp02',
          contesto: 'Dopo una lezione sulla storia. Edwyn ti raggiunge nel corridoio senza fretta, come se avesse aspettato il momento giusto.',
          testo: `"Ho pensato a quello che Servi ha detto la settimana scorsa — che certe cose si portano avanti anche senza sapere perché. Ho capito che lo faccio anche io. E che tu sei una di quelle cose."`,
          risposte: [
            { tono: 'cauto',      testo: `"È una di quelle frasi che non so come ricevere, ma che resto a tenere."`,                  effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Anch'io. Non te l'avevo detto, ma è così."`,                                               effetti: { rep: +3 } },
            { tono: 'distaccato', testo: `Cammini accanto a lui senza rispondere. A volte le parole arrivano dopo.`,                  effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Sono contento di esserlo."`,                                                               effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa intendi esattamente con 'portare avanti'?"`,                                           effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ed_mp03',
          contesto: 'È fine giornata. Edwyn è seduto sui gradini fuori dalla biblioteca. Quando arrivi, non si sorprende — come se avesse una qualche certezza che saresti passato.',
          testo: `"Stavo pensando a quante cose non ho detto in tempo. Non per codardia — per non sapere ancora come dirle. Ma adesso so che posso dirtele a te. Quando le trovo."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non c'è fretta. Sono qui."`,                                                               effetti: { rep: +3 } },
            { tono: 'distaccato', testo: `Ti siedi accanto a lui senza dire niente. La frase non ha bisogno di risposta.`,             effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"E io te le ascolto, quando le hai."`,                                                      effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Anch'io. Di tanto in tanto devo ancora trovare come dirle."`,                              effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa stavi cercando di dire stasera?"`,                                                     effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'ed_e01',
          trigger: 'incidenteInterno',
          contesto: 'Edwyn ti cerca dopo che è successo qualcosa di perturbante nell\'accademia. Non cerca risposte — cerca qualcuno con cui starci dentro.',
          testo: `"Non riesco a spiegarlo con le parole che ho. È come se quello che è successo avesse aperto qualcosa che non sapevo di portarmi dietro." Una pausa. "Non voglio che me lo spieghi. Volevo solo che tu sapessi che mi ha colpito."`,
          risposte: [
            { tono: 'cauto',      testo: `"Lo so. E va bene non riuscire a spiegarlo."`,                                                   effetti: { rep: +3 } },
            { tono: 'distaccato', testo: `Rimani in silenzio accanto a lui. Qualche volta non serve nient'altro.`,                         effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Anch'io ci sto ancora dentro. Restiamo qui un po'."`,                                           effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa ha aperto?"`,                                                                              effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Ti ha spaventato o ti ha fatto pensare?"`,                                                      effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ed_e02',
          trigger: 'decisioneSenato',
          contesto: 'Edwyn ti raggiunge dopo aver sentito della decisione del Senato con un tono più diretto del solito — come se l\'evento avesse allentato qualcosa in lui.',
          testo: `"Non riesco a capire se è la cosa giusta o solo la cosa inevitabile. Di solito non chiedo — ma con te mi sembra diverso. Cosa ne pensi?"`,
          risposte: [
            { tono: 'curioso',    testo: `"Le due cose non si escludono. Qual è la parte che ti disturba di più?"`,                       effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Non lo so ancora. Ma mi fa piacere che tu me lo abbia chiesto."`,                              effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Penso che sia inevitabile — e che questo non la renda giusta."`,                               effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Pensaci insieme. Hai più elementi di me per valutarla."`,                                       effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non ne sono sicuro. Ma posso dirti cosa non mi torna."`,                                       effetti: { rep: +2 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // VkS — VALKA STRENN | Apprendista, Studentessa | (19)
  // Ambiziosa, calcolatrice, eredità alchemica come pressione
  // Registro preciso e controllato, raramente spontaneo
  // Giocatore usa: tu
  // ============================================================
  valkaStrenn: {

    voicelines: [
      { id: 'vks_v01', contesto: 'apertura_conversazione',  testo: `"Ho seguito il tuo lavoro nell\'ultimo periodo. Non è male."` },
      { id: 'vks_v02', contesto: 'apertura_conversazione',  testo: `"C\'è qualcosa di cui devo parlarti. Preferisco farlo prima che lo scopri da solo."` },
      { id: 'vks_v03', contesto: 'apertura_conversazione',  testo: `"Vediamo dove siamo rispetto agli altri. È un\'abitudine — non crudeltà."` },
      { id: 'vks_v04', contesto: 'chiusura_conversazione',  testo: `"Bene. Sapevo che avresti capito la situazione."` },
      { id: 'vks_v05', contesto: 'chiusura_conversazione',  testo: `"Ci aggiorniamo. Ho altre cose da verificare."` },
      { id: 'vks_v06', contesto: 'giocatore_avanza',        testo: `"Un avanzamento. Significa che ci sarà più competizione — il che mi sembra giusto."` },
      { id: 'vks_v07', contesto: 'valka_avanza',            testo: `"Apprendista. Come da programma — anche se il programma prevedeva prima."` },
      { id: 'vks_v08', contesto: 'commento_alchimia',       testo: `"Quella reazione che hai ottenuto era corretta, ma il procedimento aveva tre ridondanze. Ottimizzalo."` },
    ],

    primoIngresso: [
      {
        id: 'vks_pi01',
        contesto: 'Una studentessa ti si avvicina nel laboratorio di alchimia con la naturalezza di chi ha già valutato la situazione e ha deciso che vale il suo tempo.',
        testo: `"Valka Strenn. Ho visto il tuo lavoro di oggi — il terzo passaggio era impreciso, ma non nel modo in cui lo è chi non capisce. Lo era nel modo in cui lo è chi non ha ancora preso le misure al materiale."`,
        risposte: [
          { tono: 'diretto',    testo: `"Hai ragione sul terzo passaggio. Come lo avresti gestito tu?"`,                                        effetti: { rep: +3 } },
          { tono: 'ironico',    testo: `"Bella introduzione. Di solito si comincia col nome."`,                                                  effetti: { rep: +1 } },
          { tono: 'cauto',      testo: `"Interessante osservazione. Da dove viene la tua esperienza con quel tipo di materiale?"`,              effetti: { rep: +2 } },
          { tono: 'distaccato', testo: `"Lo terrò presente." Non aggiungi altro.`,                                                              effetti: { rep: +0 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'vks_o01',
          contesto: 'Valka ti trova nell\'atrio con l\'espressione di chi ha appena avuto informazioni scomode e vuole verificarle direttamente.',
          testo: `"Ho sentito che hai avuto accesso a un reagente che avrei dovuto ricevere io. Non ti accuso — voglio capire com\'è andata."`,
          risposte: [
            { tono: 'diretto',    testo: `"È vero. Vasso me lo ha offerto per un esperimento specifico. Non sapevo che fosse destinato a te."`,  effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Fammi capire la situazione. Chi ti ha detto che era destinato a te?"`,                               effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Puoi verificarlo con Vasso direttamente. Non ho interferito in niente di intenzionale."`,             effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Non sapevo ci fosse una lista di priorità per i reagenti."`,                                         effetti: { rep: -1 } },
            { tono: 'distaccato', testo: `"Non era mia intenzione creare un problema."`,                                                        effetti: { rep: +0 } },
          ]
        },
        {
          id: 'vks_o02',
          contesto: 'Valka ti aspetta fuori dall\'aula dopo un esame con un\'espressione che non lascia spazio a interpretazioni.',
          testo: `"Il tuo risultato di oggi era sopra il mio. Voglio sapere come hai preparato quel punto specifico sul secondo principio di stabilità."`,
          risposte: [
            { tono: 'amichevole', testo: `"Ho lavorato sulla nota a piè di pagina nel volume di Cauro. Ti do il riferimento."`,                 effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Ho ricostruito il principio dalle fondamenta invece di memorizzarlo."`,                              effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Posso mostrarti il mio percorso di studio. Forse troviamo qualcosa di utile."`,                     effetti: { rep: +3 } },
            { tono: 'ironico',    testo: `"Stai facendo una ricerca comparativa o ti ha infastidito che fossi sopra?"`,                         effetti: { rep: -2 } },
            { tono: 'distaccato', testo: `"Ho studiato il materiale standard. Non c\'è niente di straordinario."`,                              effetti: { rep: +1 } },
          ]
        },
        {
          id: 'vks_o03',
          contesto: 'Valka ti blocca all\'uscita del laboratorio con un\'espressione che non lascia spazio a preamboli.',
          testo: `"Ho notato che hai usato una tecnica nella sessione di oggi che non è nel curriculum standard. Da dove viene?"`,
          risposte: [
            { tono: 'diretto',    testo: `"L'ho ricavata da una nota marginale in un testo della biblioteca. Non era segreto."`,            effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Ho lavorato su alcune variazioni personali. Posso mostrarti il ragionamento."`,                  effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Da un po' di studio extra. Se ti serve il riferimento, te lo passo."`,                          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Perché ti interessa?"`,                                                                          effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Dal lavoro autonomo. È consentito, no?"`,                                                        effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'vks_t01',
          contesto: 'Valka è in biblioteca con una pila di volumi e un\'espressione che dice che la situazione non è sotto controllo quanto dovrebbe.',
          testo: `"Vasso mi ha assegnato un progetto che richiede un reagente che non ho ancora il grado per maneggiare. Non mi ha detto come risolvere il problema. Tu hai avuto situazioni simili?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Sì. In quei casi ho sempre chiesto al docente un percorso alternativo compatibile con il mio grado."`,  effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Puoi lavorare con un equivalente a grado inferiore e spiegare il ragionamento nel report."`,          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Che tipo di reagente? Forse c\'è un modo per accedere con supervisione."`,                           effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Ti aiuto a trovare un\'alternativa. Ho avuto una situazione simile il mese scorso."`,                effetti: { rep: +3 } },
            { tono: 'distaccato', testo: `"Parla con Vasso. È lui che ha assegnato il progetto."`,                                              effetti: { rep: +0 } },
          ]
        },
        {
          id: 'vks_t02',
          contesto: 'Valka ti raggiunge nel cortile con qualcosa che somiglia alla preoccupazione — ma su di lei è difficile da leggere, perché la sua espressione di default è già seria.',
          testo: `"Mia madre ha mandato un messaggio. Vuole sapere come procede il confronto con gli altri studenti. Uso sempre le stesse parole — \'nei limiti previsti\'. Non so fino a quando reggerà."`,
          risposte: [
            { tono: 'cauto',      testo: `"Cosa si aspetta lei esattamente?"`,                                                                  effetti: { rep: +2, sblocca: 'vks_t02_c' } },
            { tono: 'amichevole', testo: `"Sembra una pressione seria. Da quanto tempo è così?"`,                                               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa succederebbe se le dicessi la verità?"`,                                                        effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `"Cosa significa per lei \'nei limiti previsti\'? Ha parametri precisi?"`,                             effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Hai ancora tempo per cambiare le cose."`,                                                            effetti: { rep: +0 } },
          ]
        },
        {
          id: 'vks_t03',
          contesto: 'Valka ti raggiunge in un momento in cui nessuno dei due ha fretta — una rarità. Ha un foglio in mano che assomiglia a un rendiconto personale.',
          testo: `"Ho calcolato quanto tempo ho perso questa settimana in attività che non producono risultati misurabili. È più di quanto mi aspettassi." Una pausa. "Non so se è un problema mio o del metodo."`,
          risposte: [
            { tono: 'cauto',      testo: `"Dipende da cosa consideri risultato. Alcune attività producono effetti che si vedono dopo."`,   effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa conta come non misurabile per te?"`,                                                       effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Quali attività hai classificato così?"`,                                                        effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Forse non tutto deve essere misurabile per avere valore."`,                                    effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Stai analizzando la tua analisi. Questo conta come risultato?"`,                               effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'vks_n01',
          contesto: 'Valka è al lavoro su un banco del laboratorio con la precisione di chi segue un protocollo mentale che non lascia margine. Ti nota ma non si ferma.',
          testo: `"Se hai tempo, puoi controllare la temperatura del secondo bollitore. Non voglio distogliere l\'attenzione dal passaggio critico."`,
          risposte: [
            { tono: 'diretto',    testo: `Lo fai senza commenti — sai che lei preferisce così.`,                                                effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa stai preparando che richiede questa precisione?"`,                                              effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `"Fatto. Trecentodue gradi — è nel range corretto?"`,                                                  effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `Lo controlli e le comunichi il dato senza aggiungere altro.`,                                         effetti: { rep: +2 } },
          ]
        },
        {
          id: 'vks_n02',
          contesto: 'Valka è in biblioteca con un volume aperto e una lista scritta a mano di riferimenti. Quando ti vede, chiude il volume con un gesto preciso.',
          testo: `"Ho confrontato i nostri risultati dell\'ultimo esame. C\'è uno scarto su un punto specifico che non mi torna — su entrambi. Non è un problema di preparazione, è qualcosa nell\'interpretazione della domanda."`,
          risposte: [
            { tono: 'curioso',    testo: `"Quale domanda? Ho l\'impressione di aver ragionato correttamente, ma voglio confrontarmi."`,         effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Mostrami dove. Se hai ragione, è utile saperlo per il prossimo."`,                                   effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Interessante che tu abbia fatto questo confronto. Cosa hai trovato esattamente?"`,                   effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Quindi hai controllato anche il mio esame. Non sapevo di essere nel tuo radar."`,                    effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Dimmi cosa hai trovato."`,                                                                            effetti: { rep: +1 } },
          ]
        },
        {
          id: 'vks_n03',
          contesto: 'Valka ti raggiunge dopo una lezione di alchimia con qualcosa che, su di lei, assomiglia alla soddisfazione.',
          testo: `"Oggi la sessione era al livello che mi aspettavo. Non succede sempre. Volevo dirlo a qualcuno che capisce la differenza."`,
          risposte: [
            { tono: 'amichevole', testo: `"Concordo. È stato un buon ritmo — Vasso era più preciso del solito."`,                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa in particolare ti è sembrato al livello giusto?"`,                                              effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Per te quando una sessione è al livello giusto — cosa cambia rispetto alle altre?"`,                effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Capisco. Quelle sessioni vanno segnate — aiutano a calibrare le aspettative."`,                     effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'vks_p01',
          contesto: 'Valka ti cerca nel laboratorio con una proposta che ha chiaramente considerato a lungo prima di formulare.',
          testo: `"Ho un progetto che richiede due profili complementari. Il tuo e il mio. Non è una richiesta di amicizia — è una valutazione pratica. Vuoi sentire i dettagli?"`,
          risposte: [
            { tono: 'diretto',    testo: `"Sì. Dimmi i dettagli e decido."`,                                                                   effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Che tipo di complementarietà hai identificato?"`,                                                    effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Apprezzo che lo dici chiaramente. Sentiamo."`,                                                       effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Prima i dettagli, poi la risposta."`,                                                                effetti: { rep: +2 } },
          ]
        },
        {
          id: 'vks_p02',
          contesto: 'Valka ti aspetta nel cortile dopo una cerimonia di promozione con un\'espressione che non è tipicamente sua: quasi aperta.',
          testo: `"Mia madre ha scritto di nuovo. Questa volta ho usato parole diverse. Non so ancora se è stato un errore o la scelta giusta — ma l\'ho fatto."`,
          risposte: [
            { tono: 'cauto',      testo: `"Come ti ha risposto?"`,                                                                              effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Come ti senti adesso che l\'hai fatto?"`,                                                            effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Non era un errore. Era la verità."`,                                                                 effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa le hai detto di diverso?"`,                                                                     effetti: { rep: +2 } },
          ]
        },
        {
          id: 'vks_p03',
          contesto: 'Valka ti aspetta alla fine di una giornata piena con qualcosa che, su di lei, assomiglia al sollievo.',
          testo: `"Oggi ho detto a Vasso che avevo bisogno di tempo per ricalibrare il progetto, invece di continuare a forzarlo. Non so ancora se è stato un errore."`,
          risposte: [
            { tono: 'diretto',    testo: `"Non era un errore. Era una valutazione precisa."`,                                               effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono contento che tu l'abbia fatto. Come ti senti?"`,                                            effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Dipende da quello che succederà dopo. Ma il ragionamento è solido."`,                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Come ti ha risposto Vasso?"`,                                                                    effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Ammettere un limite. Sul tuo registro è già una ricalibratura straordinaria."`,                  effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'vks_mp01',
          contesto: 'Valka non sta lavorando. È seduta con le mani incrociate sul tavolo — una postura che non ti aspettavi da lei.',
          testo: `"Ho fatto una valutazione sbagliata. Non su un reagente — su una persona. Pensavo che la competizione fosse il modo più efficiente per avanzare. Sto ricalibrando." Una pausa. "Tu sei parte di quello che ha cambiato la valutazione."`,
          risposte: [
            { tono: 'cauto',      testo: `"Apprezzo che tu me lo dica. Non era scontato."`,                                            effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non so cosa rispondere. Ma mi fa piacere saperlo."`,                                        effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Cosa ha cambiato esattamente?"`,                                                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Come hai capito che la valutazione era sbagliata?"`,                                        effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Una ricalibratura. Naturalmente."`,                                                         effetti: { rep:  0 } },
          ]
        },
        {
          id: 'vks_mp02',
          contesto: 'Valka ti raggiunge fuori dal laboratorio. Parla a bassa voce, come se non volesse essere ascoltata da altri.',
          testo: `"Mia madre crede che io stia vincendo ogni confronto. Non le ho mai detto che a volte non è questo il punto. Non lo so dire a lei." Una pausa. "A te invece — sì."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non devi spiegare di più. Basta che l'hai detto."`,                                         effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sono contento che tu possa dirmelo."`,                                                      effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Qual è il punto, allora?"`,                                                                 effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da quando lo pensi?"`,                                                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `Annuisci piano. Non fretti la risposta.`,                                                    effetti: { rep: +1 } },
          ]
        },
        {
          id: 'vks_mp03',
          contesto: 'Valka ti trova in un momento di pausa tra le lezioni. Siede accanto a te senza il solito distacco calcolato.',
          testo: `"A volte penso che il problema non sia essere competitivi — è non sapere quando smettere di esserlo. Con alcune persone. Con te — non mi viene naturale farlo."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non è un problema. Non devi."`,                                                             effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"È reciproco. Stai bene così."`,                                                             effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Da quando?"`,                                                                               effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Ti stai accorgendo di avere un punto cieco. Non è da te."`,                                 effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Lo so. E va bene."`,                                                                        effetti: { rep: +2 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'vks_e01',
          trigger: 'incidenteInterno',
          contesto: 'Valka ti trova con un\'espressione diversa dal solito — ferma in modo insolito, come se stesse trattenendo un ragionamento non ancora pronto.',
          testo: `"Ho fatto una stima di rischio sull'incidente. I risultati non sono rassicuranti — non per me, intendo. Per chi non ha un protocollo di risposta. Penso che tu ne sia consapevole."`,
          risposte: [
            { tono: 'diretto',    testo: `"Sì. Hai pensato a cosa si può fare con questa stima?"`,                                         effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Quali sono i risultati esattamente? Voglio capire cosa ha calcolato."`,                         effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Sì. E apprezzo che tu me lo dica — non lo dici a tutti."`,                                     effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa intendi per protocollo di risposta?"`,                                                     effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Stai condividendo la tua stima o stai cercando conferma?"`,                                     effetti: { rep: +0 } },
          ]
        },
        {
          id: 'vks_e02',
          trigger: 'decisioneSenato',
          contesto: 'Valka ti raggiunge dopo aver analizzato la decisione del Senato con la sistematicità che le è propria.',
          testo: `"Ho guardato le implicazioni della decisione. Ci sono almeno tre scenari plausibili che dipendono da come viene implementata. Nessuno è ottimale." Una pausa. "Pensavo che ti interessasse saperlo."`,
          risposte: [
            { tono: 'curioso',    testo: `"Quali sono i tre scenari?"`,                                                                    effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Condividi l'analisi. È utile."`,                                                               effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Quale dei tre ti sembra più probabile?"`,                                                       effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Mi interessa sempre. Come sei arrivata a tre scenari distinti?"`,                              effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Nessuno ottimale. Sei sorpresa?"`,                                                             effetti: { rep: +1 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // TW — TESSALY WREN | Amministratrice, Staff
  // Precisa, efficiente, prima figura istituzionale incontrata
  // Registro formale, cortesia professionale mai calore
  // Giocatore usa: Lei
  // ============================================================
  tessalyWren: {

    voicelines: [
      { id: 'tw_v01', contesto: 'accoglienza_primo_ingresso',  testo: `"Benvenuto nell\'Accademia di Elenthyr. Il suo nome è registrato. Le darò le informazioni necessarie nell\'ordine corretto."` },
      { id: 'tw_v02', contesto: 'comunicazione_calendario',    testo: `"La informo che domani mattina è prevista una cerimonia obbligatoria. La partecipazione è registrata."` },
      { id: 'tw_v03', contesto: 'comunicazione_calendario',    testo: `"C\'è una variazione al programma di questa settimana. La sessione di giovedì è stata spostata al venerdì."` },
      { id: 'tw_v04', contesto: 'comunicazione_calendario',    testo: `"Il Senato ha comunicato una riunione straordinaria. I dettagli non mi sono stati condivisi, ma la agenda viene aggiornata."` },
      { id: 'tw_v05', contesto: 'chiusura_interazione',        testo: `"Se non ha altre domande, la saluto."` },
      { id: 'tw_v06', contesto: 'chiusura_interazione',        testo: `"Tutto è registrato. Può procedere."` },
      { id: 'tw_v07', contesto: 'notifica_variazione',         testo: `"La informo: il docente di questa mattina ha comunicato un ritardo. La sessione inizia con venti minuti di posticipo."` },
      { id: 'tw_v08', contesto: 'notifica_variazione',         testo: `"L\'accesso all\'area riservata richiede un aggiornamento del suo grado. La informo non appena la pratica è completa."` },
    ],

    primoIngresso: [
      {
        id: 'tw_pi01',
        contesto: 'L\'ingresso dell\'accademia è più formale di quanto immaginassi. Una donna seduta dietro uno scrittoio ordinato ti vede arrivare e alza lo sguardo prima ancora che tu abbia aperto la bocca — come se avesse già visto il tuo nome da qualche parte.',
        testo: `"Il suo nome e il grado di ingresso. Ho il registro aperto."`,
        risposte: [
          { tono: 'formale',    testo: `Ti presenti con nome e grado, nella forma corretta.`,                                                   effetti: { rep: +2 } },
          { tono: 'amichevole', testo: `Ti presenti con un tono leggero — speri di mettere a proprio agio l\'atmosfera.`,                      effetti: { rep: +0 } },
          { tono: 'cauto',      testo: `Fornisci le informazioni richieste con attenzione, senza aggiungere nulla di non richiesto.`,           effetti: { rep: +1 } },
          { tono: 'curioso',    testo: `"Prima di rispondere — posso chiederle cosa c\'è scritto di me in quel registro?"`,                    effetti: { rep: -1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'tw_o01',
          contesto: 'Tessaly Wren ti attende nell\'area amministrativa con il registro aperto su una pagina che riconosci immediatamente come la tua.',
          testo: `"Lei era assente a un evento obbligatorio tre giorni fa. Non ha comunicato l\'assenza in anticipo né ha fornito una giustificazione successiva. Questo non è conforme alla procedura."`,
          risposte: [
            { tono: 'formale',    testo: `"Ha ragione. Mia negligenza — posso fornire una giustificazione scritta adesso."`,                    effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Capisco. Qual è la procedura corretta in questi casi?"`,                                             effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Ho avuto una situazione imprevista. Non c\'era tempo per la notifica anticipata."`,                  effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `"Mi dispiace — non conoscevo la procedura esatta. Come recupero?"`,                                   effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Tre giorni fa. Ha aspettato tre giorni per segnalarmelo."`,                                          effetti: { rep: -3 } },
          ]
        },
        {
          id: 'tw_o02',
          contesto: 'Tessaly Wren ti intercetta nel corridoio con la puntualità di qualcuno che ha pianificato questo incontro.',
          testo: `"Ho ricevuto una segnalazione che la riguarda. Non entro nel merito finché non sento la sua versione — ma devo registrare entrambe."`,
          risposte: [
            { tono: 'formale',    testo: `"Sono disponibile a fornire la mia versione adesso, se preferisce."`,                                 effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Può dirmi il tipo di segnalazione? Voglio capire di cosa si tratta."`,                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa dice la segnalazione? È meglio che io sappia cosa c\'è scritto."`,                             effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Quando vuole. Sono pronto."`,                                                                        effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Interessante approccio — ascoltare entrambe le versioni. Non tutte le istituzioni lo fanno."`,      effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'tw_t01',
          contesto: 'Tessaly Wren è al suo posto con qualcosa di diverso nell\'espressione — non ansia, ma una precisione ancora più misurata del solito, come se stesse gestendo una situazione che le richiede attenzione aggiuntiva.',
          testo: `"Ci sono state alcune variazioni di programma legate a una comunicazione del Senato. Non ho tutti i dettagli, ma ho aggiornato il calendario con quello che mi è stato comunicato ufficialmente."`,
          risposte: [
            { tono: 'formale',    testo: `"Cosa riguardano le variazioni? Ha qualche indicazione generale?"`,                                    effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `"Capito. C\'è qualcosa che dovrei fare diversamente nelle prossime settimane?"`,                     effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Le comunicazioni del Senato vengono sempre filtrate prima di arrivare agli studenti?"`,              effetti: { rep: +1, sblocca: 'tw_t01_cu' } },
            { tono: 'diretto',    testo: `"Cosa è cambiato nel calendario? Mi mostra le differenze rispetto a prima?"`,                        effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Grazie per l\'aggiornamento."`,                                                                      effetti: { rep: +0 } },
          ]
        },
        {
          id: 'tw_t02',
          contesto: 'Tessaly Wren ti ferma prima che tu raggiunga l\'aula con qualcosa che somiglia a un avvertimento procedurale — ma con una sfumatura che non aveva le volte precedenti.',
          testo: `"Prima che entri: c\'è un ospite esterno in visita oggi. Non interferisce con le sue attività, ma è registrato che lei è presente. Niente di preoccupante — solo una formalità."`,
          risposte: [
            { tono: 'formale',    testo: `"Capito. C\'è qualcosa di specifico che dovrei o non dovrei fare?"`,                                 effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Chi è l\'ospite, se è un\'informazione condivisibile?"`,                                            effetti: { rep: +2, sblocca: 'tw_t02_c' } },
            { tono: 'curioso',    testo: `"Perché è importante che sia registrata la mia presenza durante la visita?"`,                        effetti: { rep: +1, sblocca: 'tw_t02_cu' } },
            { tono: 'diretto',    testo: `"Capito. Proseguo normalmente."`,                                                                     effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Annuisci e continui verso l\'aula.`,                                                                  effetti: { rep: +0 } },
          ]
        },
        {
          id: 'tw_t03',
          contesto: 'Tessaly Wren vi ferma nel corridoio con un foglio in mano — non per una comunicazione critica, ma per una discrepanza rilevata.',
          testo: `"Il suo nome compare in due registri con ortografie diverse. Non è un problema sostanziale, ma va corretto prima della sessione di esami. Può passare dal mio ufficio oggi pomeriggio?"`,
          risposte: [
            { tono: 'formale',    testo: `"Certamente. Passo subito dopo le lezioni."`,                                                    effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Sì, grazie di segnalarmelo. Passo nel pomeriggio."`,                                            effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Quale delle due ortografie è quella registrata ufficialmente?"`,                                effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Certo. Quanto tempo le servirà per la correzione?"`,                                            effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Due registri, due ortografie. Quanti altri errori del genere ha trovato?"`,                    effetti: { rep: -1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'tw_n01',
          contesto: 'Tessaly Wren è al suo posto come sempre — non sembra né stanca né entusiasta, è semplicemente al suo posto, che è esattamente dove dovrebbe essere.',
          testo: `"Ha una domanda o è passato per un aggiornamento?"`,
          risposte: [
            { tono: 'formale',    testo: `Le espone la domanda in modo chiaro e preciso.`,                                                      effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `"Volevo verificare se ci sono variazioni di programma questa settimana."`,                            effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `"Solo di passaggio — volevo assicurarmi di non aver perso nessuna comunicazione."`,                  effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `"Entrambe le cose, in realtà."`,                                                                      effetti: { rep: +0 } },
          ]
        },
        {
          id: 'tw_n02',
          contesto: 'Tessaly Wren ti chiama mentre stai per uscire dall\'area amministrativa. Non alza la voce — usa il tono esatto che serve perché tu ti fermi.',
          testo: `"C\'è una comunicazione che la riguarda e che avrei dovuto darle questa mattina. È arrivata tardi."`,
          risposte: [
            { tono: 'formale',    testo: `"Grazie per avermela segnalata. Di che si tratta?"`,                                                  effetti: { rep: +1 } },
            { tono: 'cauto',      testo: `Ti fermi e aspetti senza interrompere.`,                                                              effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Nessun problema. Cosa dice?"`,                                                                       effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `"Da dove viene la comunicazione?"`,                                                                   effetti: { rep: +0 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'tw_p01',
          contesto: 'Tessaly Wren ti vede passare nell\'area amministrativa e, in modo che noti un cambio di registro rispetto al solito, ti chiama con qualcosa che non è una comunicazione ufficiale.',
          testo: `"C\'è qualcosa che non è nel registro ma che le potrebbe essere utile sapere. Le dico questo a titolo informale — non è parte della mia funzione, ma ho ritenuto che valesse."`,
          risposte: [
            { tono: 'formale',    testo: `"Apprezzo il gesto. Le chiedo di procedere."`,                                                        effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Ascolto. Grazie per avermelo detto."`,                                                               effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"È la prima volta che mi dice qualcosa di questo tipo. Cosa l\'ha convinta?"`,                       effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa vuole dirmi?"`,                                                                                 effetti: { rep: +2 } },
          ]
        },
        {
          id: 'tw_p02',
          contesto: 'Tessaly Wren si ferma mentre stai per andare via — non per una comunicazione, ma per qualcosa che non è nel registro.',
          testo: `"Ha fatto bene in questi mesi. Non è nel mio mandato dirlo, ma non è scorretto farlo."`,
          risposte: [
            { tono: 'formale',    testo: `"La ringrazio. Significa qualcosa, venendo da lei."`,                  effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Apprezzo che lo dica. La ringrazio."`,                                effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Grazie. Posso chiederle cosa ha notato in particolare?"`,             effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Grazie. Cosa ha osservato che l'ha convinta?"`,                     effetti: { rep: +2 } },
          ]
        },
        {
          id: 'tw_p03',
          contesto: 'Tessaly Wren vi incontra fuori dalla sala amministrativa. Non ha nulla da consegnare — si è fermata di proposito.',
          testo: `"Ho verificato il suo fascicolo per una questione di routine. Ho notato che ha mantenuto tutte le scadenze con margine adeguato dall'inizio dell'anno." Una pausa misurata. "È un'abitudine che raramente si consolida così presto."`,
          risposte: [
            { tono: 'formale',    testo: `"Grazie. Le scadenze esistono per essere rispettate — non vedo alternative."`,                  effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"È qualcosa su cui ho lavorato. Le fa differenza nella gestione?"`,                             effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"È un'osservazione utile. Ci sono aspetti in cui potrei essere più preciso?"`,                 effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Apprezzo che lo abbia notato. Non tutti lo fanno."`,                                           effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'tw_mp01',
          contesto: 'Tessaly Wren la incontra fuori dall\'orario di ufficio. Non ha il registro con sé.',
          testo: `"Fuori contesto, le dico qualcosa che nel contesto non potrei dire. Ho un margine di discrezionalità su certi accessi che normalmente non uso. Nel suo caso, lo userei. Non è ancora necessario — ma se dovesse esserlo, lo sa."`,
          risposte: [
            { tono: 'formale',    testo: `"Apprezzo la fiducia. Non la sprecherò."`,                                                   effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Capisco. E la ringrazio."`,                                                                 effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non me lo aspettavo. Grazie."`,                                                             effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"In quante occasioni ha usato quel margine finora?"`,                                        effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa renderebbe necessario quel margine?"`,                                                 effetti: { rep: +2 } },
          ]
        },
        {
          id: 'tw_mp02',
          contesto: 'Tessaly le consegna una comunicazione ufficiale, poi — prima di congedarsi — aggiunge qualcosa che non era previsto.',
          testo: `"Questo è fuori registro: lei lavora bene. Non nel senso burocratico — in quello più sostanziale. Ho imparato a distinguere i due."`,
          risposte: [
            { tono: 'formale',    testo: `"È un giudizio che non si dimentica. Grazie."`,                                              effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Significa più di quanto sembri, venendo da lei."`,                                          effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non sapevo che facesse questa distinzione."`,                                               effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"In cosa lo vede, esattamente?"`,                                                            effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                 effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'tw_e01',
          trigger: 'visitaEmissaria',
          contesto: 'Tessaly Wren vi intercetta nel corridoio durante una visita esterna. Il tono è invariato, ma la comunicazione è chiaramente prioritaria.',
          testo: `"Durante la visita in corso, si prega di evitare le aree amministrative e l'ingresso principale. Se avesse necessità urgenti, si rivolga al personale disponibile nelle aule. È una disposizione temporanea — dura fino alla fine della giornata."`,
          risposte: [
            { tono: 'formale',    testo: `"Capito. Grazie per l'avviso."`,                                                             effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Inteso. Grazie di dirmelo in anticipo."`,                                                   effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Capito. C'è qualcosa che dovrei sapere sulla visita?"`,                                    effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Nessun problema. Chi è l'ospite?"`,                                                        effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Evitare l'intero piano amministrativo per un'intera giornata. Sfida accettata."`,          effetti: { rep: -1 } },
          ]
        },
        {
          id: 'tw_e02',
          trigger: 'decisioneSenato',
          contesto: 'Tessaly Wren vi consegna una comunicazione ufficiale con la consueta efficienza — ma il tono scritto è insolitamente vago.',
          testo: `"Il Senato Accademico ha comunicato alcune variazioni operative per le prossime settimane. I dettagli specifici saranno resi disponibili nell'ordine corretto e nei tempi stabiliti. Per ora si prenda nota della comunicazione."`,
          risposte: [
            { tono: 'formale',    testo: `"Grazie. Se ci saranno aggiornamenti, me li può comunicare regolarmente?"`,                 effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Capito. Ha un'idea dei tempi previsti per i dettagli?"`,                                   effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa posso aspettarmi che cambi nelle mie attività quotidiane?"`,                          effetti: { rep: +1 } },
            { tono: 'amichevole', testo: `"Grazie. Sa già qualcosa di più di quello che c'è scritto?"`,                               effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Variazioni operative nei tempi stabiliti. Una comunicazione impeccabilmente imprecisa."`,  effetti: { rep: -1 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // DM — DARIO MENCI | Mercante Esterno
  // Vivace, intraprendente, porta notizie e materiali rari
  // Registro energico e persuasivo
  // Giocatore usa: Lei
  // ============================================================
  darioMenci: {

    voicelines: [
      { id: 'dm_v01', contesto: 'apertura_visita',         testo: `"Dario Menci, per la consueta visita. E questa volta ho qualcosa di particolarmente interessante."` },
      { id: 'dm_v02', contesto: 'apertura_visita',         testo: `"Sono tornato. Il mercato là fuori si muove — ho portato qualcosa che non si trova facilmente."` },
      { id: 'dm_v03', contesto: 'presentazione_merce',     testo: `"Questo reagente viene da una regione che non ha nome nelle mappe ufficiali. Sa già che è interessante."` },
      { id: 'dm_v04', contesto: 'presentazione_merce',     testo: `"Testo raro — non raro come lo dicono tutti, raro come lo dico io, che i libri li vedo spesso."` },
      { id: 'dm_v05', contesto: 'chiusura_visita',         testo: `"Alla prossima. Non so quando — ma ci sarà una prossima, di questo sono certo."` },
      { id: 'dm_v06', contesto: 'chiusura_visita',         testo: `"Buona fortuna con quello che ha preso. E anche con quello che non ha preso."` },
      { id: 'dm_v07', contesto: 'notizie_esterne',         testo: `"Fuori dall\'accademia il mondo si muove. Ve lo dico io che ci vivo — più di quello che si vede da qui."` },
      { id: 'dm_v08', contesto: 'notizie_esterne',         testo: `"Ho sentito cose interessanti nel mio ultimo giro. Alcune non riguardano l\'accademia — eppure la riguardano."` },
    ],

    primoIngresso: [
      {
        id: 'dm_pi01',
        contesto: 'Un uomo con una borsa grande e un\'aria di chi ha già visitato cento posti diversi si installa nel cortile con la naturalezza di chi sa esattamente dove mettere le cose. Quando ti vede, sorride come se ti conoscesse già.',
        testo: `"Un nuovo volto! Dario Menci, mercante. Arrivo periodicamente — non abbastanza spesso per noia, non così poco da essere uno sconosciuto. Sa già il meccanismo di questo posto?"`,
        risposte: [
          { tono: 'amichevole', testo: `"Sono nuovo. Direi che sto imparando il meccanismo. Cosa porta, di solito?"`,                          effetti: { rep: +3 } },
          { tono: 'curioso',    testo: `"Cosa porta, esattamente? Materiali, testi, notizie?"`,                                                 effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `"Dipende da cosa ha. Sono interessato a materiali per il mio grado di studio."`,                       effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Ha materiali alchemici o testi per Novizi?"`,                                                          effetti: { rep: +1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'dm_o01',
          contesto: 'Dario Menci ti avvicina con quell\'energia solita, ma stavolta c\'è qualcosa di meno convincente nel sorriso — forse perché sa già cosa hai da dirgli.',
          testo: `"Ho sentito che c\'è stata qualche perplessità sulla provenienza di quello che le ho venduto l\'ultima volta. Capisco — il mercato ha i suoi angoli oscuri. Ma quello che le ho dato era esattamente quello che dicevo."`,
          risposte: [
            { tono: 'diretto',    testo: `"Il problema non era la provenienza — era che non funzionava come descritto."`,                       effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Mi spieghi di più sulla provenienza, allora. Voglio capire."`,                                       effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Se il materiale è quello che dice, non ho obiezioni. Ma voglio verificare prima di acquistare di nuovo."`, effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"\'Esattamente quello che diceva\'. Interessante definizione."`,                                      effetti: { rep: -1 } },
            { tono: 'amichevole', testo: `"Va bene. Raccontami cosa è successo — da dove viene esattamente?"`,                                  effetti: { rep: +1 } },
          ]
        },
        {
          id: 'dm_o02',
          contesto: 'Dario Menci ti raggiunge nel cortile con un tono più basso del solito.',
          testo: `"Senta — ho qualcosa che sa già che non avrei dovuto portare qui. Non è illegale, ma è fuori dal normale. L\'offro solo a chi capisce la differenza."`,
          risposte: [
            { tono: 'cauto',      testo: `"Cosa intende per \'fuori dal normale\'? Ho bisogno di capire prima di decidere."`,                   effetti: { rep: +2, sblocca: 'dm_o02_c' } },
            { tono: 'diretto',    testo: `"Non mi interessa qualcosa di problematico. Ha dell\'altro?"`,                                        effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `"Perché me lo offre? Come ha capito che capisco la differenza?"`,                                    effetti: { rep: +2, sblocca: 'dm_o02_cu' } },
            { tono: 'formale',    testo: `"Se non è regolare rispetto alle procedure dell\'accademia, non posso acquistarlo."`,                 effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Chi capisce la differenza tra normale e fuori dal normale? Curiosa distinzione."`,                   effetti: { rep: +0 } },
          ]
        },
        {
          id: 'dm_o03',
          contesto: 'Dario Menci si avvicina con l\'energia di chi ha qualcosa di specifico da proporre — non lascia che il silenzio si installi.',
          testo: `"Sa cosa ho trovato questa settimana? Qualcosa che non ho saputo classificare con certezza. Non capita spesso. Potrebbe interessarle — ma certi pezzi non posso tenerli in giro a lungo."`,
          risposte: [
            { tono: 'diretto',    testo: `"Cosa ha trovato esattamente? I dettagli aiutano."`,                                         effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Definisca 'non classificato'. Il termine ha molti significati."`,                          effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da dove viene? La provenienza mi interessa quanto l'oggetto."`,                            effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Mostri."`,                                                                                  effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Interessante strategia. Cosa può non tenere in giro, esattamente?"`,                       effetti: { rep: +0 } },
          ]
        },
      ],

      teso: [
        {
          id: 'dm_t01',
          contesto: 'Dario Menci è meno energico del solito. Non è preoccupato — è misurato, come se avesse deciso di portare qualcosa di diverso dalla sua merce.',
          testo: `"Ho sentito cose nel mio ultimo giro che riguardano questa accademia. Non direttamente — di striscio, in conversazioni che non mi riguardavano. Le dico quello che ho sentito, ma lo prenda con quella cautela che merita il sentito dire."`,
          risposte: [
            { tono: 'cauto',      testo: `"La ascolto. Cosa ha sentito?"`,                                                                      effetti: { rep: +2, sblocca: 'dm_t01_c' } },
            { tono: 'curioso',    testo: `"Dove stava quando ha sentito queste cose? In quale contesto?"`,                                     effetti: { rep: +2, sblocca: 'dm_t01_cu' } },
            { tono: 'diretto',    testo: `"Cosa riguarda esattamente?"`,                                                                        effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Le prendo con la cautela dovuta. Dica."`,                                                            effetti: { rep: +2 } },
            { tono: 'scettico',   testo: `"Sentito dire da chi? I mercanti sentono molte cose."`,                                               effetti: { rep: +0 } },
          ]
        },
        {
          id: 'dm_t02',
          contesto: 'Dario Menci ha meno merce del solito e un\'aria di chi sta valutando quanto dire.',
          testo: `"Il mercato si è complicato nell\'ultimo periodo. Non solo per me — per tutti quelli che fanno quello che faccio. C\'è qualcosa che si muove in un modo che non riconosco ancora."`,
          risposte: [
            { tono: 'curioso',    testo: `"Cosa si muove esattamente? Ha un\'idea di dove viene?"`,                                             effetti: { rep: +2, sblocca: 'dm_t02_cu' } },
            { tono: 'cauto',      testo: `"Quando un mercante dice che non riconosce qualcosa, di solito vale la pena prestare attenzione."`,  effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Succede spesso che il mercato si complichity? Come ha gestito le volte precedenti?"`,               effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Pensa che possa influenzare quello che porta qui?"`,                                                 effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Le auguro di trovare la direzione giusta."`,                                                         effetti: { rep: +0 } },
          ]
        },
        {
          id: 'dm_t03',
          contesto: 'Menci è più quieto del solito — non la sua cifra. Si avvicina come se volesse dire qualcosa senza che si sappia che l\'ha detto.',
          testo: `"Le dico una cosa che non dico a tutti. Ci sono movimenti nel mercato dei materiali che non si spiegano con la domanda normale. Qualcosa si muove, e non da dentro l'accademia."`,
          risposte: [
            { tono: 'cauto',      testo: `"Che tipo di movimenti? Ha qualcosa di più concreto?"`,                                     effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Da dove viene questa informazione?"`,                                                       effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Apprezzo che me lo dica. Cosa posso fare con questa informazione?"`,                       effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa vuole in cambio di questa informazione?"`,                                            effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Capisco. La terrò presente."`,                                                              effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'dm_n01',
          contesto: 'Dario Menci ha già sistemato la sua merce nel cortile con la competenza di chi l\'ha fatto molte volte. Quando ti vede arrivare si illumina con la naturalezza di chi è davvero contento di avere un interlocutore.',
          testo: `"Ah! Questa settimana ho qualcosa per ogni livello. Da dove partiamo?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Mostrami quello che ritieni più interessante per il mio grado."`,                                    effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Prima mi dici cosa è di nuovo rispetto all\'ultima volta — poi decido da dove partire."`,            effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Ho un budget preciso. Partiamo da quello che costa meno e vediamo."`,                               effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Ho bisogno di reagenti per il progetto di questa settimana. Cosa ha?"`,                             effetti: { rep: +1 } },
          ]
        },
        {
          id: 'dm_n02',
          contesto: 'Dario Menci finisce di trattare con qualcuno e si avvicina con quell\'energia leggera che sembra sempre a metà tra il lavoro e il piacere di stare a parlare.',
          testo: `"Sa una cosa? Di tutti i posti in cui vengo, questo è quello che mi dà sempre qualcosa di nuovo da pensare. Non solo per la merce — per le conversazioni."`,
          risposte: [
            { tono: 'curioso',    testo: `"Cosa intende — le conversazioni con i docenti, con gli studenti?"`,                                  effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Un mercante che ama le conversazioni quanto la merce. È un profilo raro."`,                          effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Capisco. Ha incontrato molti posti nel suo giro — cosa rende questo diverso?"`,                    effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Le conversazioni, o quello che sente nelle conversazioni?"`,                                         effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'dm_p01',
          contesto: 'Dario Menci ti mette da parte qualcosa prima ancora che tu arrivi — lo vedi fare il gesto di separare un oggetto dal resto della sua merce.',
          testo: `"Questo lo tengo da parte per lei. Sapevo che sarebbe arrivato/a. Non è un\'adulazione — è una valutazione basata sulle volte precedenti."`,
          risposte: [
            { tono: 'curioso',    testo: `"Cosa ha separato? E perché pensava a me?"`,                                                          effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Apprezzo il gesto. Cosa è?"`,                                                                        effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Grazie. Posso vederlo prima di decidere?"`,                                                          effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Mostrami. E dimmi perché pensa che sia quello che cerco."`,                                          effetti: { rep: +2 } },
          ]
        },
        {
          id: 'dm_p02',
          contesto: 'Dario Menci è sul punto di concludere una trattativa quando ti vede arrivare — si ferma e saluta l\'altro con un gesto che dice "un momento".',
          testo: `"Per lei c'è sempre un momento. Cosa le serve questa volta?"`,
          risposte: [
            { tono: 'amichevole', testo: `"Non volevo interrompere — finisci pure con l'altro."`,              effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Non ho urgenze. Ma se hai qualcosa di nuovo, sono curioso."`,         effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Ho bisogno di un reagente specifico. Probabilmente non ce l'hai."`, effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Stavo solo vedendo cosa hai di nuovo. Finisci tranquillo."`,          effetti: { rep: +2 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'dm_e01',
          trigger: 'visitaMercante',
          contesto: 'Dario Menci è arrivato con più merce del solito e un\'energia che suggerisce una notizia importante quasi quanto la sua merce.',
          testo: `"Questa visita non è casuale — o meglio, lo è come tutte, ma stavolta ho anche qualcosa da dire, non solo da vendere."`,
          risposte: [
            { tono: 'curioso',    testo: `"Prima la notizia o prima la merce?"`,                                                                effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"La ascolto. Da dove cominciamo?"`,                                                                   effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Bene. Sono curioso di sentire entrambe le cose."`,                                                   effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa ha da dire?"`,                                                                                  effetti: { rep: +1 } },
          ]
        },
        {
          id: 'dm_e02',
          trigger: 'incidenteInterno',
          contesto: 'Dario Menci è arrivato il giorno dopo l\'incidente con la faccia di chi ha già sentito molte versioni della storia.',
          testo: `"Ho sentito quello che è successo. Ne circolano già tre versioni — tutte diverse. La sua quale è?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Dipende da chi vuole sapere e perché."`,                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `Le racconta la versione diretta dei fatti.`,                            effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"La mia è la meno interessante. Qual è la più credibile delle tre?"`,  effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non ho una versione da aggiungere."`,                                   effetti: { rep:  0 } },
            { tono: 'curioso',    testo: `"Da dove viene la notizia? Fuori dall'accademia si sa già?"`,         effetti: { rep: +2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'dm_mp01',
          contesto: 'Dario Menci non sta aprendo le borse questa volta. Si siede come se avesse tempo.',
          testo: `"Le dico una cosa che non dico ai clienti — anche a quelli buoni. Ci sono posti in cui torno perché conviene. Ci sono posti in cui torno perché mi piace tornarci. Questa accademia è tra i secondi." Una pausa. "Lei è parte del motivo."`,
          risposte: [
            { tono: 'amichevole', testo: `"Non me lo aspettavo. Ma fa piacere sentirlo."`,                                             effetti: { rep: +3 } },
            { tono: 'ironico',    testo: `"È il modo più lungo che abbia mai sentito per farmi un complimento."`,                      effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Perché le piace tornarci?"`,                                                                effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Spero di meritarlo anche le prossime volte."`,                                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"È un apprezzamento insolito per un mercante."`,                                             effetti: { rep: +1 } },
          ]
        },
        {
          id: 'dm_mp02',
          contesto: 'Dario sta per andarsene. Si ferma sulla soglia come se avesse deciso qualcosa all\'ultimo momento.',
          testo: `"Ho cominciato questo lavoro perché non sapevo fare altro. Dopo anni ho capito che so fare molte cose, ma scelgo questo. C'è differenza." Una pausa. "Non lo dico a molti — perché la maggior parte non capisce la differenza."`,
          risposte: [
            { tono: 'diretto',    testo: `"Capisco la differenza. E capisco perché non la dica a molti."`,                             effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"È una distinzione importante."`,                                                            effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Quando ha capito che era una scelta?"`,                                                     effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Mi fa piacere che me lo abbia detto."`,                                                     effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"E tra quei pochi ha deciso che ci sono anch'io?"`,                                          effetti: { rep: +2 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // SiV — SIGRID VAEL | Emissaria Esterna
  // Autorevole, misurata, ogni parola pesa
  // Le visite segnalano qualcosa di rilevante
  // Giocatore usa: Lei
  // ============================================================
  sigridVael: {

    voicelines: [
      { id: 'siv_v01', contesto: 'arrivo_formale',      testo: `"Sigrid Vael. Sono qui per una comunicazione ufficiale destinata all\'Accademia di Elenthyr."` },
      { id: 'siv_v02', contesto: 'arrivo_formale',      testo: `"Ho un messaggio che deve essere recapitato direttamente al Senato Accademico. Il tempo è parte del contenuto."` },
      { id: 'siv_v03', contesto: 'congedo_ufficiale',   testo: `"Il mio mandato qui è concluso. Parto entro l\'ora."` },
      { id: 'siv_v04', contesto: 'congedo_ufficiale',   testo: `"Riferirò quello che ho visto e quello che mi è stato comunicato. Niente di più, niente di meno."` },
      { id: 'siv_v05', contesto: 'notizie_esterne',     testo: `"Il mondo esterno si muove. Non sempre nei modi che questa accademia si aspetta."` },
      { id: 'siv_v06', contesto: 'notizie_esterne',     testo: `"Le cose che accadono fuori da queste mura non restano fuori per sempre. Tenete presente questo."` },
    ],

    primoIngresso: [
      {
        id: 'siv_pi01',
        contesto: 'Una donna in abiti da viaggio si ferma nell\'ingresso dell\'accademia con la postura di chi non ha bisogno di aspettare per essere ricevuta — ma aspetta comunque, per scelta. Quando ti vede, ti osserva un momento prima di parlare.',
        testo: `"Non faccio parte dell\'accademia. Sono qui per una comunicazione ufficiale. Lei studia qui — da quanto tempo?"`,
        risposte: [
          { tono: 'formale',    testo: `Le fornisci le informazioni richieste nella forma corretta.`,                                           effetti: { rep: +2 } },
          { tono: 'cauto',      testo: `Rispondi alla domanda senza aggiungere altro — hai capito che non è conversazione.`,                   effetti: { rep: +2 } },
          { tono: 'curioso',    testo: `"Da poco. Posso chiederle da dove viene, o è riservatamente ufficiale?"`,                              effetti: { rep: +1 } },
          { tono: 'diretto',    testo: `Rispondi e poi chiedi: "Posso aiutarla in qualcosa?"`,                                                  effetti: { rep: +1 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'siv_o01',
          contesto: 'Sigrid Vael ti ferma in un corridoio con il tono esatto che userebbe per un documento ufficiale — preciso, senza margine per l\'interpretazione.',
          testo: `"Ho notato la sua presenza in un\'area durante la mia visita di ieri. Non era previsto che ci fossero studenti in quell\'area in quel momento. Voglio capire per quale motivo si trovava lì."`,
          risposte: [
            { tono: 'formale',    testo: `"Non ero a conoscenza della restrizione. Posso spiegare le circostanze."`,                            effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Ero passato per caso. Non sapevo che ci fosse una visita in corso."`,                               effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Sono passato di lì per raggiungere il laboratorio. Non c\'era nessuna indicazione di area riservata."`, effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non sapevo della restrizione."`,                                                                      effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"La mia presenza ha interferito con qualcosa di specifico?"`,                                         effetti: { rep: -3 } },
          ]
        },
        {
          id: 'siv_o02',
          contesto: 'Sigrid Vael ti incontra nel corridoio con un\'espressione controllata come un documento ufficiale.',
          testo: `"Ho riferito al Senato quello che ho osservato durante la mia visita, inclusa la sua presenza in certi momenti. È una procedura standard. Volevo che lo sapesse."`,
          risposte: [
            { tono: 'formale',    testo: `"Capisco. C'è qualcosa che avrei dovuto fare diversamente?"`,        effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"La ringrazio per avermelo detto direttamente."`,                      effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Cosa ha riferito esattamente?"`,                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Capito."`,                                                             effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Apprezzo la trasparenza sulla mancanza di trasparenza."`,             effetti: { rep: -2 } },
          ]
        },
        {
          id: 'siv_o03',
          contesto: 'Sigrid Vael vi nota nell\'area di ingresso durante una visita. Aspetta che la conversazione con gli altri si concluda, poi si avvicina con precisione.',
          testo: `"La sua presenza è registrata. Le chiedo di mantenersi entro le aree autorizzate per tutta la durata della visita. Non è una questione di fiducia — è un protocollo che vale per tutti."`,
          risposte: [
            { tono: 'formale',    testo: `"Capito. Mi scusi per l'inconveniente."`,                                                   effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Certamente. Quali sono le aree autorizzate per gli studenti?"`,                            effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Nessun problema. Ha bisogno di altro da parte mia?"`,                                      effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `Annuisci e ti allontani senza aggiungere altro.`,                                           effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Capisco il protocollo. Lo rispetterò con la stessa precisione con cui lei lo applica."`,  effetti: { rep: -1 } },
          ]
        },
      ],

      teso: [
        {
          id: 'siv_t01',
          contesto: 'Sigrid Vael ti incontra nel cortile in un momento in cui non sembra in servizio — o almeno, il servizio ha la forma di una conversazione invece di una comunicazione ufficiale.',
          testo: `"Ho un\'informazione che potrebbe riguardarla. Non è ufficiale — il che significa che posso scegliere se dirla o no. Ho scelto di dirla."`,
          risposte: [
            { tono: 'formale',    testo: `"La ringrazio per la scelta. La ascolto."`,                                                           effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Capisco la distinzione. Cosa vuole dirmi?"`,                                                         effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Cosa l\'ha convinta a dirla?"`,                                                                      effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Dica."`,                                                                                             effetti: { rep: +2 } },
          ]
        },
        {
          id: 'siv_t02',
          contesto: 'Sigrid Vael è nell\'area amministrativa con una postura che suggerisce una visita non standard.',
          testo: `"La situazione esterna è più complessa di quanto sembri dalla comunicazione ufficiale. Non posso dirle di più — ma questo sì."`,
          risposte: [
            { tono: 'cauto',      testo: `"Capisco il limite. Cosa mi consiglia di tenere presente?"`,          effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"La ringrazio per la precisazione. È già qualcosa."`,                  effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Quanto più complessa? In quale direzione?"`,                          effetti: { rep: +2, sblocca: 'siv_t02_cu' } },
            { tono: 'diretto',    testo: `"Cosa dovremmo aspettarci nei prossimi mesi?"`,                        effetti: { rep: +1 } },
          ]
        },
        {
          id: 'siv_t03',
          contesto: 'Sigrid Vael vi incontra nel corridoio dopo una sessione nella sala amministrativa. Fa una pausa come chi sta valutando se fermarsi.',
          testo: `"Ho notato come risponde alle comunicazioni ufficiali. Non è una critica — è un'osservazione. Le persone che rispondono con precisione hanno generalmente un'idea chiara di dove si trovano." Una pausa. "Lei ha quell'idea?"`,
          risposte: [
            { tono: 'formale',    testo: `"Credo di sì. Almeno rispetto a quello che mi è accessibile."`,                             effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Ho un'idea del mio posto. Non so se corrisponde a quella degli altri."`,                  effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Abbastanza chiara da agire, non abbastanza da essere sicuro."`,                            effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa ha notato esattamente nelle mie risposte?"`,                                          effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Sì."`,                                                                                     effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'siv_n01',
          contesto: 'Sigrid Vael è nell\'area vicino all\'ingresso, apparentemente in attesa di qualcuno. Quando ti avvicina per curiosità o per caso, si gira con la misuratezza di chi non sprechi nessun gesto.',
          testo: `"Aspetto una comunicazione di risposta. Ho tempo per qualche minuto, se ha una domanda concreta da pormi."`,
          risposte: [
            { tono: 'formale',    testo: `"Sì. Posso chiederle da dove viene, nel senso dell\'istituzione che rappresenta?"`,                  effetti: { rep: +2, sblocca: 'siv_n01_f' } },
            { tono: 'curioso',    testo: `"Le visite di questo tipo sono frequenti? O questa è insolita?"`,                                    effetti: { rep: +2, sblocca: 'siv_n01_cu' } },
            { tono: 'cauto',      testo: `"Ha qualche impressione di questo posto — da osservatrice esterna?"`,                                effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa porta al Senato Accademico, in termini generali?"`,                                            effetti: { rep: +1, sblocca: 'siv_n01_di' } },
          ]
        },
        {
          id: 'siv_n02',
          contesto: 'Sigrid Vael è sul punto di partire ma si ferma prima di raggiungere l\'uscita — non per qualcosa di urgente, ma con la deliberatezza di una scelta.',
          testo: `"Prima di andare. Lei ha mostrato una discrezione insolita per un Novizio durante questa visita. Non è un commento — è un\'osservazione."`,
          risposte: [
            { tono: 'formale',    testo: `"La ringrazio per l\'osservazione."`,                                                                 effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non ero sicuro di cosa richiedesse la situazione. Ho cercato di non sbagliare."`,                   effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"È un commento positivo o neutro? È difficile capirlo dal tono."`,                                   effetti: { rep: +1 } },
            { tono: 'diretto',    testo: `"Grazie. C\'è qualcosa che ha notato in particolare?"`,                                              effetti: { rep: +1 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'siv_p01',
          contesto: 'Sigrid Vael torna in una visita successiva e, prima di raggiungere l\'area amministrativa, si ferma brevemente dove ti trova.',
          testo: `"Le ho pensato nell\'intervallo tra le due visite — non personalmente, ma come un caso di studio interessante per qualcosa che stavo valutando. Non dirò cosa."`,
          risposte: [
            { tono: 'curioso',    testo: `"Interessante. Non dirà cosa, ma ha scelto di dirmelo. Perché?"`,                                    effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Capisco il limite. Apprezzo che me lo dica comunque."`,                                              effetti: { rep: +3 } },
            { tono: 'formale',    testo: `"Non le chiedo di specificare. Ma grazie per averlo detto."`,                                         effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Come caso di studio per cosa?"`,                                                                     effetti: { rep: +1 } },
          ]
        },
        {
          id: 'siv_p02',
          contesto: 'Sigrid Vael è al suo terzo o quarto passaggio in accademia e questa volta si avvicina a te con qualcosa di deliberato.',
          testo: `"Nel tempo trascorso qui, ho notato che alcune persone cambiano nel modo giusto. Lei è tra queste. Non è un giudizio — è un'osservazione."`,
          risposte: [
            { tono: 'formale',    testo: `"La ringrazio. È un'osservazione che conservo con cura."`,           effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Come definisce 'nel modo giusto'?"`,                               effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Come misura quel tipo di cambiamento?"`,                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Sa cosa l'ha prodotto, quel cambiamento?"`,                         effetti: { rep: +2 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'siv_e01',
          trigger: 'visitaEmissaria',
          contesto: 'Sigrid Vael è arrivata con un\'urgenza insolita — non nella forma, quella è sempre uguale, ma nel contenuto: il messaggio che porta sembra avere un peso diverso dal solito.',
          testo: `"Quello che ho da comunicare al Senato riguarda una situazione esterna che ha implicazioni per questa accademia. Non le fornirò dettagli — ma le dico che la risposta del Senato avrà effetti che sentirete."`,
          risposte: [
            { tono: 'cauto',      testo: `"Capisco. C\'è qualcosa che gli studenti possono o dovrebbero fare in questo periodo?"`,             effetti: { rep: +2 } },
            { tono: 'formale',    testo: `"Grazie per avermi informata della natura della visita. Aspetterò le comunicazioni ufficiali."`,      effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Quanto tempo passerà prima che gli effetti siano visibili?"`,                                       effetti: { rep: +1, sblocca: 'siv_e01_cu' } },
            { tono: 'distaccato', testo: `Annuisci senza commentare.`,                                                                          effetti: { rep: +1 } },
          ]
        },
        {
          id: 'siv_e02',
          trigger: 'decisioneSenato',
          contesto: 'Sigrid Vael è ancora in accademia — la sua visita si è prolungata oltre il previsto.',
          testo: `"Il Senato ha preso una decisione che ha richiesto la mia presenza estesa. Non è mio compito commentarla. Ma posso dirle che è definitiva."`,
          risposte: [
            { tono: 'formale',    testo: `"Capisco. Attendiamo la comunicazione ufficiale."`,                    effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Definitiva nel breve o nel lungo periodo?"`,                          effetti: { rep: +2, sblocca: 'siv_e02_c' } },
            { tono: 'curioso',    testo: `"La sua presenza prolungata era per la decisione o per le conseguenze?"`, effetti: { rep: +2, sblocca: 'siv_e02_cu' } },
            { tono: 'distaccato', testo: `Annuisci e aspetti le comunicazioni ufficiali.`,                        effetti: { rep: +1 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'siv_mp01',
          contesto: 'Sigrid Vael è in attesa in un corridoio. Non ha fretta. Quando la vede, le fa un cenno discreto.',
          testo: `"Ho visitato molte istituzioni. La maggior parte produce persone prevedibili. Alcune producono persone che si adattano. Rare producono persone che crescono davvero." Una pausa. "Lei rientra nell'ultima categoria. È un'osservazione — non una lusinga."`,
          risposte: [
            { tono: 'formale',    testo: `"La ringrazio per la distinzione. Cercherò di meritarla."`,                                  effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"È un'osservazione che conta, da lei."`,                                                     effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Non so ancora se è vera. Ma la tengo presente."`,                                           effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Su cosa basa questa valutazione?"`,                                                         effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Capisco."`,                                                                                 effetti: { rep: +1 } },
          ]
        },
        {
          id: 'siv_mp02',
          contesto: 'Prima di un congedo ufficiale, Sigrid Vael si ferma un momento fuori dalle formalità.',
          testo: `"Tra le comunicazioni che porto, alcune riguardano persone specifiche. La sua situazione è stata menzionata in un contesto che non mi aspettavo. Positivamente." Una pausa. "Non dirò di più — ma ho ritenuto che valesse dirglielo."`,
          risposte: [
            { tono: 'formale',    testo: `"Apprezzo che me lo abbia comunicato. E la sua discrezione."`,                               effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Capisco i limiti di quello che può dire. È già molto."`,                                    effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Cambierà qualcosa, questo?"`,                                                               effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"In quale contesto è stata menzionata?"`,                                                    effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                  effetti: { rep: +2 } },
          ]
        },
      ],

    },
  },

  // ============================================================
  // AR — ARIS MELK | Figura esterna, ruolo ambiguo
  // Sfuggente, difficile da decifrare — né ostile né rassicurante
  // Sembra sapere qualcosa del protagonista che il protagonista non sa di lei
  // Registro morbido ma sfuggente
  // Giocatore usa: tu (asimmetria percepita)
  // ============================================================
  arisMelk: {

    voicelines: [
      { id: 'ar_v01', contesto: 'osservazione_inaspettata', testo: `"Non è quello che sembra. Ma lo sapevi già, no?"` },
      { id: 'ar_v02', contesto: 'osservazione_inaspettata', testo: `"Le cose che non capisci adesso ti sembreranno ovvie tra un po'. E ti chiederai come facevi a non vederle."` },
      { id: 'ar_v03', contesto: 'domanda_a_disagio',        testo: `"Dimmi una cosa che hai deciso di non dire a nessuno. Non importa quale."` },
      { id: 'ar_v04', contesto: 'domanda_a_disagio',        testo: `"C\'è qualcosa che stai cercando senza sapere ancora che cosa è?"` },
      { id: 'ar_v05', contesto: 'commento_retrospettivo',   testo: `"Ricordati di questo momento. Non adesso — dopo."` },
      { id: 'ar_v06', contesto: 'commento_retrospettivo',   testo: `"Quello che hai fatto ieri era più importante di quello che pensi. O meno. Dipende da come va."` },
    ],

    primoIngresso: [
      {
        id: 'ar_pi01',
        contesto: 'Una donna che non hai mai visto prima è seduta in un posto in cui non dovrebbe essere — non in modo vistoso, ma in modo che, a guardare bene, non torna. Quando ti vede, sorride come se l\'incontro non fosse casuale. Ma non lo dice.',
        testo: `"Sei quello/a che è arrivato/a di recente. Mi avevano descritto bene."`,
        risposte: [
          { tono: 'cauto',      testo: `"Chi le ha parlato di me?"`,                                                                            effetti: { rep: +2, sblocca: 'ar_pi01_c' } },
          { tono: 'curioso',    testo: `"Come mi hanno descritto? E chi sei tu?"`,                                                              effetti: { rep: +2 } },
          { tono: 'diretto',    testo: `"Non ci siamo mai incontrati. Come sa chi sono?"`,                                                     effetti: { rep: +2 } },
          { tono: 'distaccato', testo: `La guardi senza rispondere e aspetti che si spieghi.`,                                                  effetti: { rep: +2 } },
        ]
      }
    ],

    dialoghi: {

      ostile: [
        {
          id: 'ar_o01',
          contesto: 'Aris Melk ti avvicina dopo un momento che preferiresti dimenticare — non con intenzione cattiva, ma con la precisione di chi sa esattamente quando arrivare.',
          testo: `"Hai fatto una scelta difficile. Non quella giusta o quella sbagliata — una scelta difficile. C\'è differenza."`,
          risposte: [
            { tono: 'cauto',      testo: `"Come sai cosa ho fatto?"`,                                                                           effetti: { rep: +2, sblocca: 'ar_o01_c' } },
            { tono: 'ironico',    testo: `"Grazie per la distinzione filosofica."`,                                                              effetti: { rep: +0 } },
            { tono: 'diretto',    testo: `"E tu cosa avresti fatto al mio posto?"`,                                                             effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non chiedo una valutazione."`,                                                                       effetti: { rep: +1 } },
            { tono: 'curioso',    testo: `"Cosa intendi con \'difficile\' in quel senso specifico?"`,                                           effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ar_o02',
          contesto: 'Aris Melk appare in un posto in cui non ti aspettavi di trovarla — di nuovo. Non sembra una coincidenza, ma non riesci a capire come faccia.',
          testo: `"Stai cercando di capire qualcosa che non si capisce ancora. È presto. Ma è un buon segno che tu stia già cercando."`,
          risposte: [
            { tono: 'diretto',    testo: `"Cosa sai che io non so?"`,                                                                           effetti: { rep: +2, sblocca: 'ar_o02_di' } },
            { tono: 'cauto',      testo: `"Di cosa sto cercando, secondo te?"`,                                                                 effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Come fai a sapere cosa sto cercando?"`,                                                              effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"\'Un buon segno\'. Ottima notizia."`,                                                                effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Non ti ho chiesto una valutazione."`,                                                                effetti: { rep: +0 } },
          ]
        },
      ],

      teso: [
        {
          id: 'ar_t01',
          contesto: 'Aris Melk ti trova in un momento di pausa — uno di quei momenti in cui non stai facendo niente di preciso e la mente è aperta in un modo che di solito non è.',
          testo: `"Ti faccio una domanda e non devi rispondermi. Tienila con te invece: cosa sarebbe diverso se non fossi arrivato/a qui?"`,
          risposte: [
            { tono: 'cauto',      testo: `Ti fermi sulla domanda senza rispondere — è esattamente quello che ha chiesto.`,                     effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Perché mi fai questa domanda? Cosa aspetti dalla risposta?"`,                                        effetti: { rep: +2, sblocca: 'ar_t01_cu' } },
            { tono: 'diretto',    testo: `"Non lo so. Non ci ho mai pensato in quel modo."`,                                                   effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Una domanda senza risposta richiesta. Sembra un gioco da filosofi."`,                               effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"La terrò."`,                                                                                         effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ar_t02',
          contesto: 'Aris Melk ti avvicina durante un evento formale dell\'accademia — non nel mezzo, ai margini, dove stai guardando invece di partecipare.',
          testo: `"Stai guardando invece di stare dentro. È una scelta o un\'abitudine?"`,
          risposte: [
            { tono: 'curioso',    testo: `"Perché la distinzione ti interessa?"`,                                                               effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Non lo so ancora. Forse entrambe."`,                                                                 effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Osservo meglio da fuori che da dentro. Lo fai anche tu?"`,                                          effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Anche tu stai ai margini."`,                                                                         effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Entrambe."`,                                                                                         effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ar_t03',
          contesto: 'Aris Melk si trova nel corridoio — non è chiaro da quanto tempo sia lì. Quando vi vede smette di fare quello che stava facendo senza cambiare espressione.',
          testo: `"Ha l'aria di qualcuno che ha capito qualcosa di nuovo e non sa ancora dove metterlo." Non è una domanda. "Il problema non è capire — è decidere quanto vale la pena portarlo."`,
          risposte: [
            { tono: 'cauto',      testo: `"Come fa a sapere quando vale la pena?"`,                                                   effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Ha esperienza con questo tipo di decisione?"`,                                             effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Ha ragione. Come lo capisce dalla mia espressione?"`,                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non sempre si sceglie. A volte si porta e basta."`,                                       effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"È una valutazione teorica o parla per esperienza diretta?"`,                              effetti: { rep: +1 } },
          ]
        },
      ],

      neutro: [
        {
          id: 'ar_n01',
          contesto: 'Aris Melk è seduta in un posto insolito nell\'accademia — non proibito, solo insolito. Ti guarda avvicinarti con un\'espressione che dice che era lì prima di te e che forse ti aspettava.',
          testo: `"C\'è qualcosa che hai sentito o visto nell\'ultimo periodo che non riesci a mettere a fuoco. Non ti chiedo cosa — ti chiedo se c\'è."`,
          risposte: [
            { tono: 'cauto',      testo: `"Sì. Come lo sai?"`,                                                                                  effetti: { rep: +2, sblocca: 'ar_n01_c' } },
            { tono: 'curioso',    testo: `"Perché mi fai questa domanda adesso?"`,                                                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Sì. E tu?"`,                                                                                         effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Sì. Succede spesso in questo periodo?"`,                                                              effetti: { rep: +1 } },
            { tono: 'distaccato', testo: `"Forse."`,                                                                                            effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ar_n02',
          contesto: 'Aris Melk ti raggiunge con il passo di qualcuno che ha già deciso cosa dire — ma, come sempre, non è del tutto chiaro se quello che dice sia tutto quello che pensa.',
          testo: `"Ho osservato come ti muovi in questo posto. Non in senso fisico — in senso più largo. Hai un modo di scegliere i rapporti che è insolito. Non lo dico come critica."`,
          risposte: [
            { tono: 'curioso',    testo: `"Insolito come? Cosa hai osservato di preciso?"`,                                                     effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Come lo intendi — insolito rispetto a cosa o a chi?"`,                                              effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Cosa vuoi dirmi con questa osservazione?"`,                                                          effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Lo terrò presente."`,                                                                                effetti: { rep: +1 } },
            { tono: 'ironico',    testo: `"Osservi le persone spesso. È un\'abitudine professionale o personale?"`,                             effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ar_n03',
          contesto: 'Aris Melk ti trova in un momento in cui sei solo/a — non per caso, come al solito. Questa volta però sembra meno sfuggente del normale, quasi come se volesse che tu capisca qualcosa di preciso.',
          testo: `"C\'è qualcosa che non ti è stato detto su questo posto. Non so se è intenzionale o una semplice omissione. Ma c\'è."`,
          risposte: [
            { tono: 'diretto',    testo: `"Cosa?"`,                                                                                             effetti: { rep: +2, sblocca: 'ar_n03_di' } },
            { tono: 'cauto',      testo: `"Perché me lo dici tu invece di chi avrebbe dovuto dirmelo?"`,                                       effetti: { rep: +3, sblocca: 'ar_n03_c' } },
            { tono: 'curioso',    testo: `"Come lo sai? E perché lo dici a me?"`,                                                              effetti: { rep: +3 } },
            { tono: 'scettico',   testo: `"Come fai a sapere cosa mi è stato detto e cosa no?"`,                                               effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Dimmi."`,                                                                                            effetti: { rep: +2 } },
          ]
        },
      ],

      positivo: [
        {
          id: 'ar_p01',
          contesto: 'Aris Melk ti cerca — per la prima volta, hai la sensazione netta che sia lei a cercare te, non il contrario.',
          testo: `"Ho qualcosa che potrebbe interessarti. Non è merce e non è un\'informazione — è una domanda. Ma è una domanda che vale la pena di farti adesso."`,
          risposte: [
            { tono: 'cauto',      testo: `"Sono qui."`,                                                                                         effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Perché adesso?"`,                                                                                    effetti: { rep: +3, sblocca: 'ar_p01_cu' } },
            { tono: 'diretto',    testo: `"Fai."`,                                                                                              effetti: { rep: +2 } },
            { tono: 'cauto',      testo: `"Prima dimmi perché pensi che valga adesso."`,                                                        effetti: { rep: +3, sblocca: 'ar_p01_c' } },
          ]
        },
        {
          id: 'ar_p02',
          contesto: 'Aris Melk è in un posto insolito — come sempre — ma stavolta il posto sembra scelto con un\'intenzione specifica. Quando arriva, ti guarda in un modo che è diverso dal solito: più diretto, meno schermato.',
          testo: `"Stai diventando la persona che devi diventare. Non più veloce, non più lento — esattamente al ritmo giusto. Non so se ti serve saperlo, ma te lo dico."`,
          risposte: [
            { tono: 'cauto',      testo: `"Come lo sai?"`,                                                                                      effetti: { rep: +3, sblocca: 'ar_p02_c' } },
            { tono: 'amichevole', testo: `"Grazie. Davvero — questo mi serve sapere."`,                                                         effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"La persona che devo diventare — cosa intendi?"`,                                                     effetti: { rep: +3, sblocca: 'ar_p02_cu' } },
            { tono: 'distaccato', testo: `"Grazie."`,                                                                                            effetti: { rep: +2 } },
          ]
        },
      ],

      moltoPositivo: [
        {
          id: 'ar_mp01',
          contesto: 'Aris si trova in un posto insolito — non il suo solito contesto. Sembra aspettarti, ma non lo dice.',
          testo: `"Ci sono persone con cui si parla e persone con cui si pensa. Non è la stessa cosa. Con pochissime si riesce a fare entrambe le cose." Si interrompe. "Tu sei tra quelle."`,
          risposte: [
            { tono: 'cauto',      testo: `"Non so cosa rispondere. Ma ti ascolto."`,                                                   effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Anche per me è così, con te."`,                                                             effetti: { rep: +3 } },
            { tono: 'amichevole', testo: `"Non me lo aspettavo. Ma mi fa piacere saperlo."`,                                           effetti: { rep: +2 } },
            { tono: 'curioso',    testo: `"Cosa intendi con 'pensare insieme'?"`,                                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `La guardi in silenzio. Non ogni cosa va capita subito.`,                                     effetti: { rep: +2 } },
          ]
        },
        {
          id: 'ar_mp02',
          contesto: 'Aris ti trova in un momento tranquillo. Non introduce il discorso con le sue solite domande.',
          testo: `"Non sono molte le persone che mi fanno venire voglia di tornare a parlare. La maggior parte si esaurisce in fretta — non per colpa loro. Tu invece..." Si ferma prima di finire. "Non trovo ancora la parola giusta. Ma la troverò."`,
          risposte: [
            { tono: 'cauto',      testo: `"Aspetto di sentirla, quando la trova."`,                                                    effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"Capisco. Anche io non ho sempre le parole giuste con te."`,                                 effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Dimmi la prima che ti viene, anche se non è quella giusta."`,                               effetti: { rep: +2 } },
            { tono: 'amichevole', testo: `"Non è necessario che la trovi. Capisco lo stesso."`,                                        effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Per una persona di poche parole, ne usi molte su questo."`,                                 effetti: { rep: +1 } },
          ]
        },
      ],

      eventi: [
        {
          id: 'ar_e01',
          trigger: 'incidenteInterno',
          contesto: 'Aris Melk compare nei pressi dell\'area dove è successo qualcosa. Non sembra sorpresa. Non sembra non sorpresa.',
          testo: `"Certi eventi non si spiegano dall'interno." Una pausa che non si affretta a riempire. "Chi era lì ne parlerà a lungo. Chi non era lì ne parlerà in modo diverso. E ci sarà qualcuno che non ne parlerà affatto." Vi guarda. "In quale categoria si trova?"`,
          risposte: [
            { tono: 'cauto',      testo: `"Ero abbastanza vicino da avere un'impressione. Non abbastanza da capirla."`,              effetti: { rep: +3 } },
            { tono: 'curioso',    testo: `"Lei in quale categoria si trova?"`,                                                        effetti: { rep: +3 } },
            { tono: 'diretto',    testo: `"In quella di chi vuole capire cosa è successo."`,                                         effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Non lo so ancora."`,                                                                      effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Dipende da chi mi ascolta."`,                                                             effetti: { rep: +1 } },
          ]
        },
        {
          id: 'ar_e02',
          trigger: 'decisioneSenato',
          contesto: 'Aris Melk si trova dove non ci si aspetta di trovarla. Sembra a conoscenza della decisione del Senato prima che sia comunicata ufficialmente.',
          testo: `"Le grandi istituzioni decidono per ragioni che raramente coincidono con le ragioni che dichiarano." Un momento di silenzio. "Non è una critica — è un'osservazione strutturale. La vera domanda è sempre: cosa rimane invariato, dopo?"`,
          risposte: [
            { tono: 'curioso',    testo: `"Cosa pensa che rimanga invariato, in questo caso?"`,                                      effetti: { rep: +3 } },
            { tono: 'cauto',      testo: `"Non ho ancora capito cosa cambierà. Figuriamoci cosa rimarrà uguale."`,                  effetti: { rep: +2 } },
            { tono: 'diretto',    testo: `"Le ragioni dichiarate le conosce?"`,                                                      effetti: { rep: +2 } },
            { tono: 'distaccato', testo: `"Probabilmente quello che era già stabile prima."`,                                        effetti: { rep: +2 } },
            { tono: 'ironico',    testo: `"Osservazione strutturale. Come se ne fosse certa."`,                                     effetti: { rep: +1 } },
          ]
        },
      ],

    },
  },

};
