'use strict';

// ============================================================
// NARRATIVE.JS — Elenthyr
// Tutti i testi narrativi del gioco: descrizioni dei luoghi,
// testo delle scelte, reazioni dei PNG, dialoghi, monologhi
// cerimoniali, voicelines.
//
// Stile: seconda persona singolare, tempo presente.
// Narratore neutro e descrittivo — non commenta, non giudica.
// Registro italiano colto con arcaismi selezionati.
// Termini inglesi ammessi: Spell, Spellcasting, Skill.
// ============================================================


// ------------------------------------------------------------
// SEQUENZA DI INTRODUZIONE — Nuovo gioco
// Mostrata una sola volta, al primo avvio di una nuova partita.
// Tre passi in sequenza: arrivo, ingresso nel cortile, prima notte.
// ------------------------------------------------------------
const TESTI_INTRODUZIONE = [
  {
    titolo: `L'Accademia di Elenthyr`,
    testo: `L'accademia si vede da lontano — torri di pietra grigia che emergono dalla vegetazione con la familiarità di qualcosa che non ha mai avuto bisogno di annunciarsi. Hai viaggiato per tre giorni. Le scarpe portano ancora il fango dell'ultima tratta. Tieni la lettera di ammissione ripiegata in tasca, consumata agli angoli da quante volte l'hai aperta e richiusa lungo la strada. Ti fermi un momento all'ingresso del viale principale e guardi. Il vento porta un odore di pietra vecchia e qualcosa di bruciato, lontano. Questo posto esiste da prima che tu nascessi.`
  },
  {
    titolo: null,
    testo: `Il cancello è aperto. Nessuno ti ferma. Il cortile interno è più vasto di quanto ti aspettassi, la pietra sotto i piedi consumata da generazioni di passi che non conoscerai mai. Qualcuno ti supera senza guardarti. Qualcun altro ti osserva con la curiosità discreta di chi vuole capire se sei qualcuno da tenere d'occhio. Senti l'odore di cera, di inchiostro, di pietra umida. Qui dentro le voci hanno un'eco breve, come se le pareti le assorbissero prima che possano viaggiare troppo lontano.`
  },
  {
    titolo: null,
    testo: `Tessaly Wren ti viene incontro prima che tu abbia il tempo di chiederti dove andare. Si muove con la precisione di chi non ha mai avuto un momento da sprecare. "Benvenuto nell'Accademia di Elenthyr. Sono Tessaly Wren, amministratrice. La tua stanza è al secondo piano, ala est. Le lezioni iniziano domani mattina." Si ferma un momento, come se stesse rileggendo un elenco interno. "Hai già mangiato?" Non aspetta davvero che tu risponda. Ti accompagna fino alla porta della tua stanza e sparisce nel corridoio con la stessa efficienza con cui è comparsa. La prima notte nell'accademia ti appartiene.`
  }
];


// ------------------------------------------------------------
// DESCRIZIONI DEI LUOGHI
// Prima visita: versione lunga e densa.
// Visite successive: versione breve.
// ------------------------------------------------------------
const DESCRIZIONI_LUOGHI = {

  aule: {
    primaVisita: `Le aule dell'Accademia di Elenthyr hanno l'aria di luoghi che sanno aspettare. I banchi di legno chiaro portano i segni di chi vi ha studiato prima di te — incisioni, macchie di inchiostro, solchi lasciati dal bordo di un testo aperto per troppo tempo. Le finestre sono alte e strette, e la luce che filtrano ha qualcosa di formale, come se anche il sole dovesse rispettare un certo decoro. Dall'altra parte della cattedra, un lavagna coperta di simboli che ancora non sai leggere. La polvere di gesso nell'aria ha un odore che imparerai a conoscere.`,
    visitaSuccessiva: `Le aule ti sono familiari ormai — il legno dei banchi, la luce delle finestre, il silenzio che precede l'inizio di una lezione.`
  },

  biblioteca: {
    primaVisita: `La biblioteca dell'Accademia di Elenthyr si apre dinnanzi a te come una promessa antica. L'aria è densa di carta e inchiostro, calda per il fuoco che arde in fondo alla sala — un fuoco che sembra bruciare da sempre, indifferente alle stagioni. Gli scaffali salgono fino al soffitto a volta, stipati di volumi dalla costola consumata. Qualcuno ha studiato qui prima di te. Molti. I tavoli di legno scuro portano i segni di decenni di gomiti e candele. Serelith Vane ti osserva dall'altro capo della sala senza muoversi, con la pazienza di chi ha tutto il tempo del mondo.`,
    visitaSuccessiva: `La biblioteca è silenziosa come sempre. Il fuoco nel camino è acceso. I volumi al loro posto, la luce bassa, Serelith Vane che si muove tra gli scaffali con passo misurato.`
  },

  laboratorioAlchimia: {
    primaVisita: `L'odore ti raggiunge prima ancora che tu entri — acre, vegetale, con qualcosa di bruciato sotto. Il Laboratorio di Alchimia è un luogo in perenne ebollizione: bollitori che gorgogliano su fiamme basse, alambicchi in vetro colorato, file di reagenti in contenitori ermetici che riflettono la luce arancione delle fiamme. Le superfici di lavoro sono ruvide, segnate da anni di impatto con mortai e pestelli. Pietro Vasso è chinato su qualcosa che emette un vapore verdastro e sorride come se lo aspettasse da anni.`,
    visitaSuccessiva: `Il laboratorio è in attività, come sempre. I bollitori gorgogliano, i vapori salgono, e Pietro Vasso si muove tra i banchi di lavoro con l'energia di chi non considera mai finita una giornata.`
  },

  laboratorioIncantamento: {
    primaVisita: `La prima cosa che percepisci è il ronzio — basso, continuo, come il respiro di qualcosa di molto grande che dorme. Il Laboratorio di Incantamento è più ordinato di quanto ti aspettassi: scaffali di oggetti disposti con precisione chirurgica, strumenti che non sai nominare, cristalli che catturano la luce e la restituiscono alterata. Le superfici lucide riflettono il tuo viso moltiplicato. Hilda Vorn ti osserva senza alzarsi dallo sgabello, con un'espressione che è una valutazione.`,
    visitaSuccessiva: `Il ronzio è sempre lì, costante. Il laboratorio di incantamento ha il suo ritmo proprio, indifferente a chi entra e chi esce.`
  },

  salaRituale: {
    primaVisita: `L'aria cambia prima ancora che tu attraversi la soglia — più densa, più quieta, come se il suono stesso esitasse a entrare. La Sala Rituale è vasta e fredda, costruita in pietra che non ha mai conosciuto il calore del sole. Le voci che senti non provengono da nessun luogo preciso: risuonano nelle pareti, nel pavimento, nell'aria stessa, come se l'edificio respirasse. Ti fermi un momento sulla soglia. Qui si lavora in silenzio — non per regola, ma per necessità.`,
    visitaSuccessiva: `La Sala Rituale è fredda e silenziosa. Le vocalizzazioni nelle pareti, la pressione alle orecchie, l'eco dei propri passi — tutto uguale a ogni volta.`
  },

  cortile: {
    primaVisita: `Il cortile dell'accademia si apre inaspettatamente grande dopo gli interni stretti. La pietra irregolare sotto i piedi, il vento che porta con sé l'odore dell'erba del giardino. Qualcuno cammina lungo il perimetro, qualcun altro è seduto su uno dei banchi di pietra ai lati. Le voci si sovrappongono senza stridere — c'è qualcosa di diverso nel modo in cui la gente parla fuori dalle aule. Halvard Munk sistema qualcosa vicino all'ingresso del magazzino, come se avesse tutto il tempo del mondo.`,
    visitaSuccessiva: `Il cortile è come lo ricordavi — la pietra, il vento, le voci. Un posto dove l'accademia respira in modo diverso.`
  },

  torre: {
    primaVisita: `La Torre è più alta di quanto sembri dall'esterno. La scala a chiocciola porta in cima con una lentezza che sembra deliberata — ogni gradino un'occasione per riconsiderare. In cima, l'Osservatorio: strumenti astronomici di precisione, mappe stellari appese alle pareti, appunti scritti in una grafia fitta che copre ogni superficie disponibile. Il vento filtra dalle fessure con un suono sottile. Edvar Sollen è accanto a un telescopio e non ti ha sentito arrivare, o almeno finge.`,
    visitaSuccessiva: `L'Osservatorio è come sempre — strumenti ovunque, appunti che coprono ogni superficie, il vento dalle fessure.`
  },

  archivioRiservato: {
    primaVisita: `Non ti aspettavi silenzio così. L'Archivio Riservato è separato dal resto della biblioteca da una porta che non avevi notato, e dall'altra parte c'è qualcosa che assomiglia all'isolamento più che al silenzio — come se il rumore del mondo non riuscisse a passare. Gli scaffali sono più alti, i volumi più vecchi, la polvere più spessa. L'eco dei tuoi passi arriva da lontano, da qualche punto che non riesci a individuare. Hai la sensazione di essere arrivato in un posto che aspettava da molto tempo.`,
    visitaSuccessiva: `L'archivio ti accoglie con il suo silenzio pesante, l'odore di polvere vecchia, la luce fioca che non cambia mai.`
  },

  scavi: {
    primaVisita: `Non v'è cartello, non v'è porta — solo un passaggio stretto che scende, e l'aria che sale da sotto con un odore di pietra umida e terra compatta. Non si parla degli Scavi apertamente nell'accademia, ma il nome circola, passato sottovoce da una generazione di studenti all'altra. Nessuno conferma. Nessuno smentisce. I cunicoli si aprono più in basso, più vasti di quanto ti aspettassi, e l'eco dell'acqua che gocciola da qualche parte nell'oscurità è l'unico suono che rompe il silenzio.`,
    visitaSuccessiva: `Gli Scavi, con il loro silenzio profondo e le gocce d'acqua nell'oscurità.`
  }

};


// ------------------------------------------------------------
// TESTI DELLE ATTIVITÀ AUTOMATICHE
// (Riposo, Socialità, Studio)
// Ogni attività ha più varianti per evitare ripetizioni.
// ------------------------------------------------------------
const TESTI_ATTIVITA = {

  riposo: [
    `Torni alla tua stanza. La finestra lascia passare un po' di luce, il letto è stretto ma silenzioso. Ti distendi per un momento senza pensare a niente in particolare. Quando ti rialzi, qualcosa pesa meno.`,
    `La stanza è silenziosa. Ti siedi sul bordo del letto e lasci che il silenzio faccia il suo lavoro. Non dormi — stai solo fermo, per una volta. Basta così.`,
    `Torni ai tuoi alloggi con il passo di chi non ha fretta. Qualche minuto di quiete, lontano dalle aule e dagli sguardi. Quando esci di nuovo ti senti più presente.`,
    `Hai bisogno di stare fermo, e lo riconosci. Ti siedi, lasci che i pensieri si depositino come la polvere dopo una giornata di vento. Quando ti rialzi, qualcosa si è messo al suo posto.`,
    `La stanza è più piccola di quella in cui sei cresciuto. La differenza non ti pesa più quanto una volta. Ti distendi, ascolti i suoni del corridoio che si allontanano, aspetti che il giorno diventi distanza.`,
    `Riposo. Non è dormire — è fare spazio. Ci vuole pratica, ma comincia ad avere un senso.`
  ],

  socialita: [
    `Passi del tempo con gli altri studenti — scambi qualche parola nel corridoio, ti fermi a sentire una conversazione, partecipi senza troppo impegno. Non è niente di memorabile. Ma qualcosa, nell'accademia, registra la tua presenza.`,
    `Una pausa nel cortile, qualche scambio informale. Non cerchi niente di specifico — e forse è proprio questo che rende l'incontro più semplice del solito.`,
    `Ti mescoli alla vita dell'accademia per un po'. Visi familiari, qualche parola, qualche cenno di saluto. La tua reputazione è fatta anche di queste piccole presenze.`,
    `Le conversazioni nel cortile seguono le loro correnti. Entri in una, esci da un'altra, contribuisci qualcosa di poco conto. Ma la tua presenza viene registrata — non da nessuno in particolare, da tutti in modo diffuso.`,
    `C'è qualcosa di utile nell'essere visti senza uno scopo preciso. Non chiedi niente, non offri niente — sei semplicemente lì. L'accademia funziona anche così.`,
    `Un pomeriggio tra le conversazioni degli altri. Ascolti più di quanto parli. Impari qualcosa che non si trova sui testi.`
  ],

  studio: [
    `Passi in biblioteca e apri qualcosa di pertinente a ciò che ti aspetta. Non è ricerca — è preparazione. Le pagine scorrono, qualcosa entra. Quando ti alzi, sei più pronto di prima.`,
    `Uno slot di studio mirato. Rivedi gli appunti, torni sui passaggi meno chiari, cerchi di costruire qualcosa di solido prima che arrivi il momento di dimostrarlo.`,
    `La biblioteca, un tavolo, qualche ora di lavoro metodico. Non brillante — solido. La differenza, a volte, sta proprio qui.`,
    `Ci sono pagine che non entrano al primo tentativo. Le rileggi, le lasci stare, le torni a trovare più tardi. Alla fine, qualcosa cede — non le pagine, ma la tua resistenza a lasciarti istruire.`,
    `Studio metodico, senza aspettarsi illuminazioni. Le illuminazioni arrivano solo a chi ha già fatto il lavoro. Oggi fai il lavoro.`,
    `Prendi gli appunti che non avevi preso durante la lezione, riempi i vuoti, costruisci qualcosa di coerente. Non è eccitante. È necessario.`
  ]

};


// ------------------------------------------------------------
// TESTI OPZIONI DI SCELTA — toni standard per i dialoghi
// I toni disponibili per ogni risposta del giocatore.
// Usati come etichette in aria-label e come indicatori
// narrativi nel box dialogo.
// ------------------------------------------------------------
const TONI_RISPOSTA = {
  formale:    'Formale',
  amichevole: 'Amichevole',
  ironico:    'Ironico',
  distaccato: 'Distaccato',
  diretto:    'Diretto',
  cauto:      'Cauto',
  curioso:    'Curioso',
  elusivo:    'Elusivo',
  scettico:   'Scettico'
};


// ------------------------------------------------------------
// MONOLOGHI CERIMONIALI DEI DOCENTI
// Un pool per ogni docente, organizzato per disciplina
// e grado raggiunto dal protagonista.
// Le cerimonie Magister/Custode e superiori usano i monologhi
// di Valdric Sonn.
// ------------------------------------------------------------
const MONOLOGHI_CERIMONIALI = {

  corneliaVesti: {
    apprendista: [
      `"Il primo passo non è il più difficile. È il più necessario. Da questo momento, avete qualcosa che non potete più restituire: la consapevolezza di ciò che non sapete ancora. Procedete."`,
      `"Apprendista. Il titolo non vi appartiene — lo portate in prestito fino a quando non lo meriterete davvero. Cominciate."`
    ],
    esperto: [
      `"Esperto in Teoria Arcana. Le fondamenta sono poste. Ciò che costruirete su di esse vi appartiene — e vi appartiene anche ogni errore che farete. Non dimenticate né gli uni né gli altri."`,
      `"Ho visto studenti raggiungere questo grado e fermarsi, convinti di essere arrivati. Non fatelo. Questo è un punto di partenza che ha richiesto tempo per essere raggiunto."`
    ]
  },

  pietroVasso: {
    apprendista: [
      `"Benvenuto nel laboratorio come Apprendista! Sai cosa cambia, adesso? Che posso darti reagenti più interessanti. E anche quelli più pericolosi. Non necessariamente in quest'ordine."`,
      `"Apprendista! Finalmente. Sai quante volte ho spiegato la differenza tra un estratto volatile e uno stabile? Adesso puoi scoprirla da solo. È molto più divertente."`
    ],
    esperto: [
      `"Esperto. Sai cosa significa? Significa che quando qualcosa va storto nel laboratorio, d'ora in poi devi sapere perché. Congratulazioni — è una responsabilità, non solo un titolo."`
    ]
  },

  kaelDorne: {
    apprendista: [
      `"Apprendista. Sai qual è la differenza tra lanciare una spell e lanciarla bene? Tra poco comincerai a capirlo davvero. Non perché te lo dico io — perché sentirai la differenza. È lì che inizia tutto."`,
      `"Okay, Apprendista. Il livello delle aspettative si è appena alzato. Non è una minaccia — è una notizia. La cosa buona? Sei abbastanza bravo da riceverla."`
    ],
    esperto: [
      `"Esperto in Spellcasting. Lo dico senza ironia per una volta: è un traguardo. Lo Spellcasting a questo livello richiede una cosa che non si insegna — si acquisisce. Voi l'avete acquisita."`
    ]
  },

  matteoServi: {
    apprendista: [
      `"Ogni volta che un nuovo Copista diventa Apprendista, mi chiedo cosa abbiano capito davvero e cosa abbiano solo imparato a ripetere. Non è una critica. È una domanda che merita una risposta lunga. Avete tutto il tempo."`
    ],
    erudito: [
      `"Erudito. È un titolo che porta con sé una responsabilità strana: quella di sapere abbastanza da capire quanto ancora non si sa. È una condizione scomoda. È anche la condizione migliore in cui si possa essere."`
    ]
  },

  marenSolde: {
    apprendista: [
      `"Apprendista. E adesso, una domanda: cosa cambia, per voi, da oggi? Non cosa cambia nel curriculum — cosa cambia in voi. Prendetevi il tempo che vi serve per rispondere. Io aspetto."`,
      `"Vi do il benvenuto come Apprendiste e Apprendisti con una sola raccomandazione: continuate a fare domande scomode. I titoli servono a poco se smettete di chiedervi il perché delle cose."`
    ]
  },

  sevanDrath: {
    esperto: [
      `"Il rituale non perdona chi si avvicina a esso per convenienza. Chi raggiunge questo grado ha dimostrato qualcosa che va oltre la tecnica. Non lo dimenticate nelle settimane che verranno."`,
      `"Esperto. Il suono di quel titolo è diverso, qui, in questa sala. Cercate di tenerlo a mente la prossima volta che entrerete."`
    ]
  },

  hildaVorn: {
    apprendista: [
      `"Apprendista nell'Incantamento. Avete dimostrato di saper leggere le rune di base — ora il lavoro vero comincia. L'incantamento non è una disciplina che si impara. È una disciplina con cui si convive."`,
      `"Bene. Apprendista. Adesso si lavora sul serio."`
    ]
  },

  edvarSollen: {
    erudito: [
      `"Erudito. Sapete cosa mi ha sorpreso di più, seguendo il vostro percorso? Non quello che avete imparato — quello che vi siete rifiutati di smettere di osservare. È lì che sta la differenza. Continuate a guardare."`
    ]
  },

  // Valdric Sonn presiede Magister, Custode, Alto Maestro, Arcimago
  valdricSonn: {
    magister: [
      `"Magister. Questo titolo è stato portato da chi vi ha preceduto con il peso di ciò che sapevano. Ora appartiene a voi — con lo stesso peso, e con la stessa opportunità. Non sprecatela."`,
      `"Ho presieduto molte di queste cerimonie. Ogni volta mi chiedo se chi riceve il titolo comprende davvero cosa porta con sé. Raramente ne sono certo. Di voi, oggi, lo sono un poco di più."`
    ],
    custode: [
      `"Custode. L'Erudizione a questo livello non è più un percorso — è una responsabilità verso ciò che si è custodito prima di voi e ciò che verrà dopo. Portatelo con la serietà che merita."`,
      `"In questa accademia ho visto molti studiosi. Pochi diventano Custodi. Il titolo non è un premio — è un'aspettativa che avete dimostrato di poter portare. Continuate a farlo."`
    ],
    altoMaestro: [
      `"Alto Maestro. Non aggiungo altro. Chi è arrivato fin qui sa già tutto ciò che occorre sapere sul peso di questo titolo."`
    ]
  }

};


// ------------------------------------------------------------
// NOTA: I dialoghi dei PNG sono stati migrati in dialoghi.js.
// Il file dialoghi.js va caricato dopo narrative.js (vedi index.html).
// ------------------------------------------------------------


// ------------------------------------------------------------
// TESTI DI SISTEMA E INTERFACCIA
// Messaggi informativi, etichette, istruzioni.
// ------------------------------------------------------------
const TESTI_SISTEMA = {
  caricamento:              `Caricamento in corso…`,
  salvataggioCronologico:   `Partita salvata.`,
  erroreCaricamento:        `Impossibile caricare il salvataggio. Il file potrebbe essere danneggiato.`,
  nuovaPartita:             `Benvenuto nell'Accademia di Elenthyr.`,
  notteNonGiocabile:        `Trascorri la notte nel tuo alloggio. Al mattino tutto ricomincia.`,
  slotOccupato:             `Questo slot è già stato completato.`
};


// ------------------------------------------------------------
// TESTI DELLO SLOT NOTTE AUTO-SALTATO
// Mostrati al posto del pulsante quando la notte non è giocabile.
// ------------------------------------------------------------
const TESTI_NOTTE_SALTATA = [
  `Torni ai tuoi alloggi prima che la notte si faccia tarda. Qualche ora di sonno, e domani ricomincia.`,
  `La notte è per chi ha qualcosa da fare nell'oscurità. Stasera non è il caso. Ti addormenti presto e ti svegli riposato.`,
  `L'accademia di notte ha i suoi ritmi, che imparerai col tempo. Per ora, dormi.`,
  `Sera tardi. Spegni la candela, ascolti il silenzio dell'ala est per qualche minuto, poi lasci andare il giorno.`
];


// ------------------------------------------------------------
// TESTI STAGIONALI
// Brevi testi atmosferici mostrati al cambio di stagione.
// Organizzati per stagione, con 3 varianti ciascuna.
// ------------------------------------------------------------
const TESTI_STAGIONALI = {

  autunno: [
    `L'autunno è tornato all'accademia con la sua solita precisione. L'aria ha una qualità ferma e densa che non appartiene alle altre stagioni. Le foglie nei giardini cambiano colore lentamente, come se l'anno si prendesse il tempo di congedarsi in modo appropriato.`,
    `La stagione è cambiata. Il cielo ha quella luce obliqua che appartiene solo all'autunno — più bassa, più lunga, capace di rendere ogni cosa leggermente più seria di quanto non sia. L'accademia risponde al cambio con la sua consueta flemma.`,
    `Autunno. L'anno accademico porta con sé una qualità propria — nuovi ingressi, attività riprese, la sensazione diffusa che qualcosa ricomincia. L'aria è più fresca. Il camino in biblioteca è già acceso.`
  ],

  inverno: [
    `L'inverno è arrivato senza preavviso, come sempre. Il cortile si è svuotato nelle ore più fredde, i corridoi si percorrono con i mantelli stretti. Dentro, i camini bruciano più a lungo e la luce delle candele dura fino a tardi.`,
    `La stagione più silenziosa dell'anno è cominciata. Il freddo ha reso ogni spazio più raccolto — le conversazioni si tengono vicino alle fonti di calore, le sessioni di studio durano più a lungo. C'è qualcosa di concentrato in questo inverno.`,
    `Fuori la luce svanisce prima. Dentro, le candele durano di più. L'inverno ha il suo modo di costringere all'interiorità, e l'accademia lo sa — diventa un posto diverso in questa stagione.`
  ],

  primavera: [
    `La primavera è arrivata lentamente, come sempre — prima nei giardini, poi nell'aria dei corridoi, poi ovunque. Qualcosa si è allentato. Le finestre rimangono aperte più a lungo. Le conversazioni nel cortile durano fino a tardi.`,
    `La stagione è cambiata e con essa qualcosa nell'umore generale dell'accademia. La luce dura di più, il freddo ha lasciato gli interni. C'è una qualità diversa nei gesti di tutti — più aperti, meno conservati.`,
    `Primavera. Il cortile è tornato ad essere quello che è — un luogo di sosta, di incontri, di conversazioni che non hanno fretta di finire. L'aria porta qualcosa che non c'era prima: la promessa che non tutte le cose rimangono come sono.`
  ],

  estate: [
    `L'estate rallenta tutto. Il calore entra negli spazi che il vento non raggiunge, e l'accademia risponde con il suo ritmo più lento. Le giornate sono lunghe, le ombre corte nelle ore centrali. Si lavora di più la mattina e la sera.`,
    `La stagione più solitaria dell'accademia è cominciata. Alcuni sono partiti. Altri si sono ritirati a lavorare nell'ombra degli interni. Il cortile si svuota nelle ore di punta del calore e si ripopola al tramonto. La biblioteca, invece, rimane sempre piena.`,
    `Estate. L'anno accademico formale si è fermato, ma il lavoro non si ferma mai davvero. C'è qualcosa di diverso nel modo di studiare in questa stagione — meno strutturato, più personale. Come se il calore sciogliesse alcune rigidità.`
  ]

};


// ------------------------------------------------------------
// TESTI DELLE ATTIVITÀ NEI LUOGHI
// Testi narrativi per ciascun tipo di attività svolta in un luogo.
// Organizzati per id attività. La chiave 'dialogo' ha sottochavi
// per luogo specifico, con fallback '_generico'.
// ------------------------------------------------------------
const TESTI_ATTIVITA_LUOGO = {

  studio: [
    `Trovi un tavolo libero e apri i testi che hai portato con te. Le ore passano con una lentezza particolare — quella lentezza che non è noia ma concentrazione. Quando alzi lo sguardo la luce è cambiata.`,
    `Lavori sugli appunti dell'ultima lezione, integrando quello che non era chiaro con quello che trovi nei volumi a disposizione. Qualcosa si organizza nella mente in modo che non si aspettava.`,
    `Studio metodico, senza scorciatoie. Non è entusiasmante. Ma quando finisci, qualcosa è cambiato — non molto, ma in modo permanente.`,
    `Prendi posto a un tavolo e sistemi i materiali con attenzione — c'è qualcosa di preparatorio in questo gesto, come accordare uno strumento. Poi cominci. Le ore passano in modo diverso quando si lavora davvero.`,
    `Lo studio ha le sue stagioni interne: ore di resistenza, ore di flusso. Oggi è un giorno di flusso. Lo riconosci solo verso la fine, quando ti accorgi che il tempo è passato senza che tu te ne accorgessi.`
  ],

  ricercaTesti: [
    `Scorri gli scaffali con una domanda precisa in testa. Le costole dei volumi scorrono sotto le dita. Alla fine trovi quello che cercavi — o qualcosa di più interessante di quello che cercavi.`,
    `La ricerca richiede pazienza. Non tutto è dove dovrebbe essere, non tutto è indicizzato nel modo giusto. Ma la biblioteca ha una logica propria, e dopo un po' riesci a sentirla.`,
    `Un volume che non avevi considerato finisce tra le mani quasi per caso. Contiene esattamente quello che serviva — o lo fa sorgere in modi che non ti aspettavi.`,
    `La biblioteca ha una logica propria che impari a sentire con il tempo. Oggi sei più vicino a capirla. Trovi quello che cercavi, o qualcosa che indica dove cercarlo.`,
    `Non tutti i testi utili stanno dove ti aspetti. Spesso quello di cui hai bisogno è vicino a quello che non cercavi — qualcosa che la biblioteca sa e tu stai ancora imparando.`
  ],

  praticaAlchemica: [
    `Ti metti al banco di lavoro e prepari i reagenti nell'ordine corretto. Il processo richiede attenzione costante: una distrazione al momento sbagliato ha conseguenze. Alla fine qualcosa si trasforma, come doveva.`,
    `L'alchimia non perdona l'approssimazione. Ogni passaggio ha il suo ritmo, ogni reagente la sua soglia. Lavori lentamente, con la precisione che la materia richiede. Il risultato non è perfetto ma è reale.`,
    `Il lavoro pratico ha una qualità diversa dallo studio. Le mani imparano qualcosa che le parole non trasmettono. Esci dal laboratorio con le dita che sanno ancora.`,
    `Pietro Vasso ti lancia un'occhiata di quando in quando — non per controllare, ma per vedere a che punto sei. La pratica alchemica ha un ritmo che si impara dal banco di lavoro, non dai testi.`,
    `Ogni sessione lascia qualcosa alle mani — non solo le macchie dei reagenti, ma una conoscenza che non passa attraverso le parole. Lo senti nella fluidità dei gesti verso la fine.`
  ],

  praticaIncantamento: [
    `Le rune richiedono concentrazione totale. Non è sufficiente conoscerle — bisogna sentirne la risonanza, riconoscere il modo in cui interagiscono tra loro quando vengono accostate. Lavori finché qualcosa si allinea.`,
    `L'incantamento è lento oggi. Le rune sembrano resistere, come se richiedessero qualcosa che non hai ancora capito di dover dare. Poi, improvvisamente, la sequenza si risolve.`,
    `Passi il tempo a lavorare su una combinazione che ti ha dato problemi. Non c'è rivelazione improvvisa — solo il lento accumulo di comprensione pratica che viene dal fare e rifare.`,
    `Le rune cambiano leggermente di sessione in sessione — non le rune stesse, ma la tua capacità di leggerle. Oggi qualcosa è più chiaro. Non del tutto, ma abbastanza.`,
    `L'incantamento richiede di mantenere due cose in equilibrio: la precisione tecnica e qualcosa di meno definibile. La tecnica si insegna. L'altro si acquisisce.`
  ],

  praticaRituale: [
    `Il rituale richiede un tipo di presenza che è diverso dall'attenzione ordinaria — più ampio, più quieto. Ci entri gradualmente, come in un'acqua fredda. Quando esci, qualcosa è rimasto là dentro.`,
    `La progressione del rituale ha il suo ritmo proprio, indifferente alla fretta. Ti adegui. Alla fine la risonanza si stabilizza e rimane per un momento prima di dissolversi.`,
    `Non ogni sessione produce risultati visibili. Ma la pratica lascia qualcosa — una disposizione, un riconoscimento, una soglia abbassata. Lo saprai la prossima volta.`,
    `La Sala Rituale ha un effetto sull'attenzione — la estende, la affina, la mette in contatto con qualcosa di più ampio del momento presente. Quando esci, porti qualcosa di quella qualità con te.`,
    `Il rituale di oggi è andato come deve andare. Non sempre i risultati sono visibili. Non sempre i risultati sono il punto.`
  ],

  creazioneOggetti: [
    `La creazione richiede intenzione prima che tecnica. Lavori sull'oggetto con attenzione, incorporando ciò che hai imparato. Il risultato porta ancora i segni del processo — non è un difetto.`,
    `L'oggetto prende forma attraverso passaggi successivi, ciascuno dei quali modifica quelli precedenti. Quando finisci, riconosci qualcosa di tuo nel risultato.`,
    `La creazione di oggetti magici richiede una presenza che è diversa dall'attenzione ordinaria — bisogna essere contemporaneamente precisi e aperti a quello che l'oggetto vuole diventare.`,
    `Ogni oggetto che crei porta il segno di quello che sapevi al momento della sua creazione. Con il tempo, guarderai i lavori di oggi e vedrai quanto hai imparato.`,
    `Il risultato è reale. Non perfetto — reale. Prendi la differenza come parte del processo.`
  ],

  socialita: [
    `Passi del tempo nel cortile con gli altri. Non cerchi niente di specifico. Le conversazioni si intrecciano e si sciolgono con la naturalezza delle cose che non hanno uno scopo preciso. È riposante.`,
    `Qualche scambio informale, qualche risata, qualche momento di quiete condivisa. Non è niente di memorabile. Ma lascia qualcosa di leggero.`,
    `Il cortile ha le sue correnti sociali, e tu le stai imparando. Chi sta con chi, chi evita chi, chi si sposta ai margini e perché. Non è calcolo — è osservazione.`,
    `Passi del tempo con gli altri senza uno scopo dichiarato. A volte è questo che costruisce le cose più durevoli.`,
    `Sei presente. Non in modo strategico — in modo genuino. C'è una differenza, nell'accademia, tra chi è presente e chi no.`
  ],

  incontro: [
    `Incontri qualcuno per caso — o per qualcosa che assomiglia al caso. La conversazione è breve ma lascia il segno di un'attenzione ricevuta.`,
    `C'è un momento in cui gli sguardi si incrociano e qualcosa si scambia senza parole. Poi la vita dell'accademia riprende il suo ritmo e ognuno va per la sua strada.`,
    `Cerchi qualcuno con cui parlare e lo trovi — o forse è lui che trovava te. Le conversazioni nell'accademia hanno spesso una direzione che nessuno dei due interlocutori ha scelto consapevolmente.`,
    `L'incontro dura poco. Ma ha la qualità di certi oggetti piccoli che pesano più di quello che si aspetta.`,
    `Qualcosa è stato detto che resterà — non sai ancora cosa, e forse non lo saprai finché non tornerà in mente più tardi, in un contesto diverso.`
  ],

  ricercaAvanzata: [
    `La ricerca a questo livello richiede una mente capace di tenere insieme molte cose contemporaneamente. Lavori lentamente, controllando ogni passaggio. Alla fine qualcosa si apre.`,
    `Non tutto quello che cerchi è qui. Ma quello che trovi indica dove guardare dopo — e questa è già una forma di risposta.`,
    `La ricerca avanzata ha i suoi ritmi propri — più lenta, più ramificata, meno lineare dello studio ordinario. Ma porta in luoghi che lo studio ordinario non raggiunge.`,
    `Hai trovato una connessione che non avevi cercato. Questo è il modo in cui funziona la ricerca di questo livello — non si va dove si vuole, si va dove la conoscenza ti porta.`,
    `Alla fine di questa sessione hai più domande di quante ne avessi all'inizio. È il segno che la ricerca sta funzionando.`
  ],

  osservazione: [
    `Passi del tempo con gli strumenti, registrando quello che il cielo e gli elementi mostrano. Non è spettacolare. È pazienza applicata a qualcosa di molto grande e molto lento.`,
    `L'osservazione richiede di stare fermi più a lungo di quanto sembri necessario. Poi, quando smetti di aspettarti qualcosa, lo vedi.`,
    `L'osservazione astronomica richiede di accettare che la maggior parte del tempo non succede niente di visibile. E poi, quando succede, non puoi perderlo se eri là.`,
    `Stai fermo, stai attento, registri quello che vedi. Non tutto quello che registri sarà utile. Ma l'abitudine di registrare lo è.`,
    `Edvar Sollen si muove intorno ai suoi strumenti senza disturbare la tua concentrazione. In questo luogo il silenzio è una forma di rispetto che va in entrambe le direzioni.`
  ],

  ricercaStoria: [
    `Apri un volume di storia dell'accademia e ti immergi in secoli di eventi annotati con la cura di chi sapeva che sarebbero stati letti dopo. La materia ha una sua densità — non solo di fatti, ma di prospettiva. Quando chiudi il volume, qualcosa è cambiato nel modo in cui guardi il corridoio fuori dalla finestra.`,
    `Cerchi fonti su un periodo che non hai mai approfondito. Le cronache hanno la loro logica interna — bisogna imparare a leggerle tra le righe oltre che in superficie. Trovi qualcosa di utile, e con esso una domanda che non avevi.`,
    `Due testi sulla stessa epoca raccontano gli stessi eventi in modo incompatibile. Ci passi del tempo sopra. Alla fine non risolvi la contraddizione, ma capisci meglio perché esiste — e questo è già qualcosa.`,
    `La ricerca storica richiede di saper tenere in mente molte cose contemporaneamente senza perdere il filo. Oggi quel filo regge. Trovi quello che cercavi, o qualcosa che ti indica dove guardare.`,
    `Un testo di seconda mano cita una fonte che non hai ancora letto. Lo annoti. La biblioteca ha i suoi strati, e impari a muoverti tra di essi con un po' più di fluidità.`
  ],

  ricercaFilosofia: [
    `Scegli un testo che ti è stato consigliato e ti siedi a lavorarci. La filosofia richiede un tipo di attenzione diversa dallo studio ordinario — non assimili, confronti. Alla fine hai più domande di prima, e questo è il segno che ha funzionato.`,
    `Ti fermi su un argomento che sembrava semplice e che si rivela complesso quanto basta da meritare il tempo che gli stai dedicando. Non arrivi a una conclusione. Ma arrivi a un posto più preciso del punto da cui sei partito.`,
    `Lavori su un testo di logica che procede per sillogismi. La catena regge fino a un certo punto, poi qualcosa scricchiola. Torni indietro, trovi la frattura, capisci perché è là. È un lavoro lento. È il tipo di lavoro che conta.`,
    `Maren Solde ha lasciato alcune note a margine nel volume che hai scelto — brevi, precise, con la sua caratteristica abitudine di finire con una domanda aperta. Le leggi tutte prima di cominciare a leggere il testo stesso.`,
    `La filosofia ha il suo modo di far sembrare che le parole stiano in piedi da sole, quando in realtà stanno in piedi solo grazie a tutto quello che non viene detto. Oggi riesci a vedere qualcosa di quel non-detto. Non abbastanza, ma qualcosa.`
  ],

  ricercaScienze: [
    `Lavori su testi di classificazione botanica o mineralogica — il tipo di ricerca che richiede attenzione ai dettagli e capacità di tenere insieme grandi quantità di informazioni correlate. Alla fine qualcosa si organizza.`,
    `Le scienze naturali hanno la loro forma di bellezza: la precisione del dettaglio che rivela qualcosa di più grande. Trovi nel testo quello che cercavi, e con esso una connessione che non avevi previsto.`,
    `Le mappe stellari della Torre e le classificazioni della biblioteca si sovrappongono in modo inaspettato. Noti una correlazione che non sapevi fosse stata documentata. La annoti per riferimento futuro.`,
    `Passi del tempo con i registri di osservazione di chi è venuto prima. I dati hanno la loro eloquenza — se sai come leggerli. Oggi riesci a leggerne un po' di più.`,
    `Il testo che hai scelto è più tecnico di quanto ti aspettassi, ma procede con una logica interna che puoi seguire. Arrivi alla fine con qualcosa di più di quello che avevi all'inizio.`
  ],

  ricercaLetteratura: [
    `Lavori su testi di retorica antica — come sono costruite le argomentazioni, quale effetto cercano di produrre, cosa rivelano di chi le ha scritte. È una forma di lettura diversa da tutte le altre.`,
    `Cerchi esempi di uno stile narrativo che hai incontrato in un altro testo. La biblioteca ha più di quello che ti aspetti su questo. Alla fine hai un quadro più chiaro di una tradizione che prima era solo un nome.`,
    `La letteratura richiede di tenere in mente due livelli contemporaneamente: quello che il testo dice e quello che fa. Oggi riesci a tenerli separati abbastanza a lungo da imparare qualcosa su entrambi.`,
    `Trovi un volume di commento a un'opera maggiore. I commenti a volte sono più interessanti dell'opera stessa — rivelano come una generazione ha letto qualcosa, che è diverso da come lo leggiamo noi. Ci passi più tempo di quanto avessi previsto.`,
    `Passi del tempo su figure retoriche e i loro usi — come l'ironia funziona diversamente in contesti diversi, come il silenzio diventa uno strumento. È un lavoro sottile. Alla fine qualcosa è più chiaro.`
  ],

  ricercaRara: [
    `I testi dell'archivio riservato hanno una densità diversa — non solo di contenuto, ma di presenza. Come se portassero il peso di chi li ha scritti e di chi li ha cercati prima di te.`,
    `Trovi quello che cercavi in un volume che non aveva ragione di trovarsi qui. Serelith Vane non dice niente. Ma sai che lo sapeva.`,
    `I testi rari hanno una fisicità diversa dagli altri — carta più pesante, inchiostro diverso, una densità che si sente nelle mani prima ancora che negli occhi.`,
    `Trovi quello che cercavi in un posto inaspettato. Serelith Vane non dice niente. Il modo in cui non dice niente è preciso quanto se avesse parlato.`,
    `L'archivio riservato non dà le sue cose facilmente. Ma oggi è stato generoso, a modo suo.`
  ],

  sblocaggioReagente: [
    `Il preparato ha trovato il suo punto di completamento. L'intervento al momento esatto ha fatto la differenza — troppo presto o troppo tardi, e il risultato sarebbe stato altro.`,
    `La materia ha raggiunto la sua forma definitiva. C'è qualcosa di soddisfacente nel riconoscere il momento giusto e non lasciarselo sfuggire.`,
    `Il processo si è chiuso nel modo che doveva. La pratica alchemica ha questa esigenza di precisione — non approssimativa, non retorica. Reale.`,
    `Pietro Vasso annuisce senza commentare. Il silenzio ha la qualità di un giudizio positivo trattenuto.`,
    `Il preparato è completo. Porti via qualcosa di più di quello che avevi portato — non solo il risultato, ma la comprensione del momento in cui è diventato tale.`
  ],

  dissolvenza: [
    `L'incisione runica si è completata nel momento preciso della canalizzazione. La runa pulsa una volta, poi si stabilizza — il segno che la trasmissione è avvenuta correttamente.`,
    `Il ritmo dell'oscillazione ha trovato il suo punto di equilibrio. Hai aspettato il momento giusto e hai agito. L'oggetto porta ora quello che doveva portare.`,
    `La canalizzazione si è chiusa. C'è qualcosa di definitivo nel modo in cui la runa smette di vibrare — come una nota che finisce esattamente dove deve finire.`,
    `Hilda Vorn esamina il risultato con attenzione. Non dice niente. Il modo in cui non dice niente è eloquente quanto una valutazione esplicita.`,
    `L'incantamento è completo. Il ritmo dell'oscillazione ha richiesto pazienza — quella qualità che non si insegna nei testi ma si sviluppa nel tempo, al banco di lavoro.`
  ],

  dialogo: {
    aule: `Scambi qualche parola con uno dei docenti o degli studenti presenti nell'aula. La conversazione è breve, dettata dal contesto. Qualcosa rimane nell'aria anche dopo che finisce.`,
    biblioteca: `Avvicini qualcuno tra gli scaffali. Le parole vengono tenute basse per rispetto del silenzio. Il contenuto della conversazione è sproporzionatamente denso rispetto al tono con cui viene detto.`,
    laboratorioAlchimia: `Pietro Vasso commenta quello che stai facendo con la naturalezza di chi non distingue tra lavoro e conversazione. Impari qualcosa senza renderti conto di starlo imparando.`,
    laboratorioIncantamento: `Hilda Vorn ti rivolge qualche parola. Il tono è cordiale. La valutazione che contiene è precisa.`,
    salaRituale: `Sevan Drath parla poco. Quello che dice ha un peso che non si misura nella quantità.`,
    cortile: `La conversazione si svolge all'aperto, tra il vento e i passi sulla pietra. È più facile parlare qui che altrove — il cielo sopra rende tutto meno formale.`,
    torre: `Edvar Sollen ti parla di qualcosa che stava osservando prima che arrivassi. Non è chiaro se considera la tua presenza un'interruzione o un'opportunità.`,
    archivioRiservato: `Serelith Vane sceglie con cura le parole che usa in questo luogo. Sono poche. Sono esatte.`,
    scavi: `Non c'è nessuno qui con cui parlare. O forse c'è qualcuno, ma non si mostra.`,
    _generico: `La conversazione è breve. Ma lascia qualcosa — un'idea, una domanda, la sensazione di essere stati visti.`
  },

  // Testo di fallback per attività non ancora mappate
  _generico: `Passi del tempo in questo luogo a fare ciò che hai scelto di fare. Non tutto si racconta. Qualcosa è rimasto.`

};


// ------------------------------------------------------------
// TESTI DI TRANSIZIONE TRA I GIORNI
// Mostrati al termine di tutti gli slot (fine giornata)
// e all'inizio del giorno successivo.
// ------------------------------------------------------------
const TESTI_TRANSIZIONE_GIORNO = {

  fine: [
    `La giornata si chiude. Torni ai tuoi alloggi con la mente ancora accesa di ciò che hai visto, fatto, imparato. Le pareti dell'accademia assorbono il silenzio della sera con la familiarità di chi lo conosce da secoli.`,
    `Il giorno finisce come finiscono i giorni nell'accademia — con la sensazione di non aver avuto abbastanza tempo, e con qualcosa di nuovo che è entrato senza fare rumore.`,
    `Sera. La luce cambia, i corridoi si svuotano lentamente, le voci si ritirano nelle stanze. Porti con te quello che il giorno ti ha dato. Non sai ancora quanto vale.`,
    `La giornata ha il suo peso. Lo senti nelle spalle, negli occhi, nelle dita. Ti fermi un momento prima di tornare ai tuoi alloggi. L'accademia di notte ha un'aria diversa — più antica, più silenziosa.`
  ],

  inizio: [
    `Un nuovo giorno. L'accademia si sveglia intorno a te con la sua solita precisione — i suoni del mattino, l'aria fresca dei corridoi, la luce che entra obliqua dalle finestre strette.`,
    `Il mattino porta con sé quella qualità particolare che hanno solo le ore più early — quando tutto è ancora possibile e niente è ancora andato storto. L'accademia aspetta.`,
    `Ti svegli. Fuori, l'accademia ha già ripreso il suo ritmo. Dentro, per un momento, sei ancora sospeso tra il sonno e il giorno. Poi anche tu riprendi.`,
    `Un altro giorno nell'accademia di Elenthyr. Ogni giorno somiglia agli altri e nessun giorno è uguale. Questo lo capisci solo dopo un po' di tempo.`
  ]

};


// ------------------------------------------------------------
// TESTI DEGLI EVENTI OBBLIGATORI
// Placeholder narrativi per lezioni, esami e cerimonie.
// Da espandere con pool più ampi man mano che i contenuti crescono.
// ------------------------------------------------------------
const TESTI_EVENTI_OBBLIGATORI = {

  lezione: [
    `La lezione procede secondo il ritmo del docente. Prendi nota, segui, assorbi quello che puoi. Non tutto entra subito — alcune cose richiedono di essere riviste da soli, dopo.`,
    `Ascolti, scrivi, fai domande quando le domande hanno senso. La lezione ha la sua struttura e tu ti muovi dentro di essa. Alla fine c'è qualcosa che prima non c'era.`,
    `Il docente procede. Tu segui. C'è qualcosa di semplice e necessario in questo — qualcuno che sa, qualcuno che impara. La relazione più antica del mondo.`,
    `Il docente non si ferma ad aspettare che tutti abbiano capito — il ritmo è quello del curriculum, non quello di chi ascolta. Annoti quello che puoi, decidi cosa approfondire dopo, da solo.`,
    `Ci sono lezioni che lasciano qualcosa di preciso, e lezioni che lasciano solo la sensazione di aver assistito a qualcosa di importante senza averlo capito del tutto. Questa è nel mezzo — e il mezzo ha il suo valore.`
  ],

  esame: [
    `L'esame ha il suo peso specifico. Ci entri con quello che hai preparato e lasci che sia il risultato a parlare. Qualunque esso sia, è reale.`,
    `Ti siedi, leggi le domande, rispondi. Non c'è spazio per il rimpianto durante un esame — solo per la concentrazione. Il rimpianto, se necessario, viene dopo.`,
    `L'esame misura qualcosa. Non tutto quello che sai — questo lo sai. Ma qualcosa. E quel qualcosa conta.`,
    `L'esame ha quella qualità particolare che hanno i momenti in cui si viene valutati — il tempo sembra scorrere in modo diverso, più lento e più veloce insieme. Ti concentri su quello che sai.`,
    `Rispondere alle domande di un esame è un atto di distillazione: devi estrarre da quello che hai imparato solo quello che viene chiesto, nella forma in cui viene chiesto. Ci vuole una disciplina diversa dallo studio.`
  ],

  cerimonia: [
    `La cerimonia si svolge con la solennità che le spetta. Ci sono parole che devono essere dette, gesti che devono essere compiuti. Fai la tua parte. Qualcosa cambia — anche se non riesci ancora a dire esattamente cosa.`,
    `Stai fermo nella tua posizione mentre la cerimonia si dispiega intorno a te. C'è qualcosa di potente nel rispettare una forma che esiste da prima di te e che esisterà dopo.`,
    `Le cerimonie dell'accademia hanno una storia lunga. Quella storia è presente in ogni parola, in ogni gesto. Ti ci inserisci come ci si inserisce in un fiume — senza fermare il flusso, diventandone parte.`,
    `Le cerimonie dell'accademia esistono da prima di te e continueranno dopo. Stai nella tua posizione, ascolti le parole che devono essere dette, compi i gesti che devono essere compiuti. È più semplice di quanto sembri — e più pesante di quanto ci si aspetti.`,
    `Ogni cerimonia ha la sua durata propria, indifferente alla fretta o alla stanchezza di chi vi partecipa. Aspetti. Poi finisce, e qualcosa ha cambiato la sua forma senza che tu riesca a dire esattamente come.`
  ]

};


// ------------------------------------------------------------
// TESTI DELLE CERIMONIE DI ASCENSIONE DEI COETANEI
// Mostrati al protagonista che assiste alla cerimonia.
// La stringa '{nome}' viene sostituita col nome del coetaneo,
// '{grado}' con il grado raggiunto.
// ------------------------------------------------------------
const TESTI_CERIMONIE_COETANEI = [
  `{nome} riceve il titolo di {grado} con la stessa compostezza con cui ha affrontato tutto il resto. Il docente pronuncia le parole di rito. L'aula risponde in silenzio. Tu sei presente, come si deve.`,
  `La cerimonia per {nome} è breve nella forma e pesante nella sostanza. {grado} — un titolo che qualcuno porta leggero e qualcuno porta come un impegno. Dal modo in cui {nome} si raddrizza mentre lo riceve, sembra appartenere alla seconda categoria.`,
  `Assisti alla cerimonia di {nome}. {grado}. Le parole del docente riempiono la sala con la loro precisione cerimoniale. Quando tutto finisce, gli occhi di {nome} incrociano i tuoi per un momento — e in quel momento c'è qualcosa che non si nomina.`,
  `{nome} avanza al grado di {grado}. Sei nella sala, fai parte dei presenti, partecipi con la tua presenza a qualcosa che l'accademia considera importante. Il titolo appartiene a {nome}. Ma la cerimonia appartiene a tutti.`,
  `La progressione di {nome} era attesa — o almeno lo sembrava a chi la osservava dall'esterno. {grado}. Il docente compie i gesti di rito. {nome} li riceve. Qualcosa nella stanza si assesta in una posizione leggermente diversa da prima.`
];


// ------------------------------------------------------------
// REBUS ACCESSIBILE — contenuto per disciplina
// Ogni domanda ha: risposta (stringa), indizi (array dal più
// generico al più specifico), opzioni (array di 4 risposte).
// Le opzioni includono sempre la risposta corretta.
// ------------------------------------------------------------
const REBUS_ACCESSIBILE = {

  storia: [
    {
      risposta: 'Il Senato Accademico',
      indizi: [
        'Un organo di governo che ha guidato l\'accademia per generazioni.',
        'Le sue decisioni non vengono mai annunciate direttamente — si diffondono come voci nei corridoi.',
        'È composto da tre figure di grado Alto Maestro o superiore.',
        'Gestisce affari interni, relazioni esterne e risorse dell\'accademia.',
        'I suoi membri attuali sono Valdric Sonn, Brennar Ostk e Livia Cauro.'
      ],
      opzioni: ['Il Senato Accademico', 'Il Consiglio dei Docenti', 'La Corte degli Antichi', 'L\'Assemblea dei Custodi']
    },
    {
      risposta: 'L\'Archivio Riservato',
      indizi: [
        'È il luogo più inaccessibile dell\'accademia.',
        'Vi si accede solo dopo aver raggiunto un grado sufficientemente elevato.',
        'Custodisce testi che non si trovano altrove.',
        'La sua esistenza è nota a tutti, ma il suo contenuto è ignoto ai più.',
        'È sotto la custodia diretta di Serelith Vane.'
      ],
      opzioni: ['L\'Archivio Riservato', 'La Biblioteca Segreta', 'Il Deposito dei Testi Perduti', 'Il Vault degli Arcimagi']
    },
    {
      risposta: 'Il grado di Arcimago',
      indizi: [
        'È la distinzione più alta che l\'accademia di Elenthyr possa conferire.',
        'Nella storia dell\'accademia è stato raggiunto da pochissimi.',
        'Chi lo porta esercita un\'autorità che non è solo accademica.',
        'La cerimonia di conferimento richiede la presenza di tutti i gradi superiori a Custode.',
        'Attualmente appartiene a Valdric Sonn.'
      ],
      opzioni: ['Il grado di Arcimago', 'Il titolo di Alto Maestro', 'L\'onore del Custode', 'La dignità del Magister']
    },
    {
      risposta: 'La fase post-accademica',
      indizi: [
        'Rappresenta una transizione significativa nel percorso di uno studente.',
        'Non è un abbandono dell\'accademia, ma un cambiamento nel modo in cui la si abita.',
        'Il calendario si apre, gli impegni obbligatori si riducono, la ricerca diventa libera.',
        'Comincia quando si raggiunge il grado di Esperto o Archivista.',
        'Segna il passaggio dalla struttura accademica alla pratica autonoma.'
      ],
      opzioni: ['La fase post-accademica', 'Il tirocinio avanzato', 'L\'anno di perfezionamento', 'Il periodo di ricerca libera']
    },
    {
      risposta: 'Le cerimonie di ascensione',
      indizi: [
        'Avvengono sempre di mattina, nel primo slot disponibile.',
        'Sanciscono formalmente un avanzamento già avvenuto nella sostanza.',
        'I coetanei sono tenuti a presenziare.',
        'Ai gradi più alti richiedono la presenza dell\'Arcimago in persona.',
        'Ogni docente competente ha un monologo cerimoniale dedicato per l\'occasione.'
      ],
      opzioni: ['Le cerimonie di ascensione', 'Gli esami di stato', 'Le sessioni formali', 'I riti di promozione']
    }
  ],

  filosofia: [
    {
      risposta: 'La sapienza',
      indizi: [
        'Si distingue dalla conoscenza perché non accumula — seleziona.',
        'Non può essere insegnata direttamente, ma può essere coltivata attraverso la pratica riflessiva.',
        'Nel sistema accademico di Elenthyr è il traguardo implicito di ogni percorso di studio.',
        'Si manifesta nel sapere quando non sapere è la risposta giusta.',
        'Maren Solde la descrive come "la conoscenza che sa di sé".'
      ],
      opzioni: ['La sapienza', 'L\'erudizione', 'La competenza', 'La conoscenza']
    },
    {
      risposta: 'Il principio di non-contraddizione',
      indizi: [
        'È uno dei fondamenti della logica classica.',
        'Afferma che una proposizione non può essere allo stesso tempo vera e falsa.',
        'Viene messo in discussione dai paradossi auto-referenziali.',
        'Nella tradizione filosofica dell\'accademia è il punto di partenza di ogni argomentazione.',
        'Il paradosso del mentitore lo mette sotto pressione senza risolverlo.'
      ],
      opzioni: ['Il principio di non-contraddizione', 'Il principio del terzo escluso', 'Il principio di identità', 'Il principio di causalità']
    },
    {
      risposta: 'Il paradosso dell\'autorità',
      indizi: [
        'È una contraddizione che si trova al cuore di ogni sistema gerarchico.',
        'Si formula così: chi ha l\'autorità di stabilire chi ha autorità?',
        'Si manifesta nell\'accademia ogni volta che l\'accesso a una conoscenza dipende da chi non si può interrogare.',
        'La soluzione proposta da Maren Solde è che l\'autorità legittima si riconosce dall\'interno, non dall\'esterno.',
        'Non ha una soluzione definitiva — e questa irresolvibilità è parte della sua natura.'
      ],
      opzioni: ['Il paradosso dell\'autorità', 'Il dilemma del custode', 'La contraddizione gerarchica', 'Il problema del fondamento']
    },
    {
      risposta: 'Falso — la premessa è discutibile',
      indizi: [
        'Esamina questo sillogismo: "Tutto ciò che è antico è sapiente."',
        '"L\'accademia è antica."',
        '"Quindi l\'accademia è sapiente."',
        'Il sillogismo è formalmente valido nella struttura.',
        'Ma la prima premessa non regge all\'esame — l\'antichità non implica saggezza.'
      ],
      opzioni: ['Falso — la premessa è discutibile', 'Vero — formalmente valido', 'Indeterminato', 'Contraddittorio in sé']
    },
    {
      risposta: 'La reputazione',
      indizi: [
        'È un concetto che vive interamente nello spazio tra le persone, non in nessuna di esse.',
        'Non può essere costruita direttamente — solo le sue condizioni possono esserlo.',
        'Cambia in base alle azioni, ma non sempre in modo proporzionale.',
        'Nell\'accademia di Elenthyr, la sua assenza è più pesante della sua presenza.',
        'Ogni PNG ha la propria valutazione di questa qualità del protagonista.'
      ],
      opzioni: ['La reputazione', 'Il carisma', 'Il prestigio', 'L\'autorevolezza']
    }
  ],

  scienzeNaturali: [
    {
      risposta: 'La cristallizzazione',
      indizi: [
        'È un processo che trasforma una sostanza in uno stato solido a struttura ordinata.',
        'In alchimia, indica anche il momento in cui un preparato assume una forma stabile e definitiva.',
        'La velocità del processo influisce sulla qualità e sulle proprietà del risultato.',
        'Pietro Vasso la descrive come "il momento in cui la materia decide cosa vuole essere".',
        'Richiede condizioni precise: temperatura, purezza del composto, assenza di contaminanti.'
      ],
      opzioni: ['La cristallizzazione', 'La sublimazione', 'La distillazione', 'La precipitazione']
    },
    {
      risposta: 'La risonanza',
      indizi: [
        'È un fenomeno in cui un sistema risponde con maggiore ampiezza a certe frequenze.',
        'Nella Sala Rituale è il principio che governa l\'efficacia delle vocalizzazioni.',
        'Nell\'incantamento descrive il rapporto tra runa e supporto quando sono perfettamente compatibili.',
        'In fisica, si verifica quando la frequenza naturale di un sistema coincide con quella della forza applicata.',
        'Sevan Drath la usa come metafora per descrivere il rapporto tra il praticante e il rituale.'
      ],
      opzioni: ['La risonanza', 'La vibrazione', 'La frequenza', 'L\'interferenza']
    },
    {
      risposta: 'La Sala Rituale',
      indizi: [
        'È un luogo con caratteristiche acustiche particolari — l\'eco vi persiste più del normale.',
        'La pietra con cui è costruita assorbe e restituisce l\'energia in modo non ordinario.',
        'La temperatura è più bassa della media del resto dell\'edificio, indipendentemente dalla stagione.',
        'L\'aria ha una densità percepibile che influisce sulla concentrazione.',
        'Le vocalizzazioni prodotte al suo interno non si esauriscono ma si sovrappongono continuamente.'
      ],
      opzioni: ['La Sala Rituale', 'Il Laboratorio di Alchimia', 'L\'Archivio Riservato', 'La Torre e Osservatorio']
    },
    {
      risposta: 'Il ciclo delle stagioni',
      indizi: [
        'Nell\'accademia di Elenthyr struttura il tempo in periodi di sessanta giorni.',
        'Influenza l\'atmosfera narrativa di ogni periodo: apertura, rallentamento, raccoglimento, isolamento.',
        'Le discipline legate alla natura e all\'astronomia lo studiano come fenomeno ciclico regolare.',
        'Edvar Sollen usa le sue osservazioni per registrare correlazioni tra fenomeni celesti e terrestri.',
        'È diviso in quattro periodi: Primavera, Estate, Autunno, Inverno.'
      ],
      opzioni: ['Il ciclo delle stagioni', 'Il ciclo lunare', 'Il ciclo accademico', 'Il ciclo delle maree']
    },
    {
      risposta: 'Le rune',
      indizi: [
        'Sono simboli con proprietà fisiche oltre che semantiche.',
        'La loro efficacia dipende dalla precisione della forma e dalla qualità del supporto su cui sono incise.',
        'I materiali su cui vengono tracciate influenzano il tipo di effetto che producono.',
        'Hilda Vorn le descrive come "interfacce tra il linguaggio e la materia".',
        'Sono l\'oggetto principale della pratica di Incantamento nell\'accademia.'
      ],
      opzioni: ['Le rune', 'I glifi', 'I sigilli', 'I simboli arcani']
    }
  ],

  letteratura: [
    {
      risposta: 'L\'ironia',
      indizi: [
        'È una figura retorica che dice il contrario di quello che intende.',
        'Funziona solo in un contesto che permette al lettore di riconoscerla.',
        'Si distingue dal sarcasmo per l\'assenza di intento direttamente offensivo.',
        'Nell\'accademia è usata più frequentemente dai docenti di quanto sembrerebbe appropriato.',
        'Kael Dorne la usa spesso nei suoi commenti sugli errori degli studenti.'
      ],
      opzioni: ['L\'ironia', 'Il sarcasmo', 'L\'eufemismo', 'L\'iperbole']
    },
    {
      risposta: 'La seconda persona',
      indizi: [
        'È una scelta narrativa che crea un effetto di immediata identificazione tra lettore e protagonista.',
        'Si usa raramente nella narrativa classica ma più frequentemente nei testi formativi.',
        'Richiede che il narratore si rivolga direttamente al "tu".',
        'Riduce la distanza tra il narratore e chi legge, portando il lettore dentro l\'azione.',
        'È la voce narrativa usata per raccontare la storia del protagonista nell\'accademia di Elenthyr.'
      ],
      opzioni: ['La seconda persona', 'La prima persona', 'Il narratore onnisciente', 'Il discorso indiretto libero']
    },
    {
      risposta: 'Il registro formale',
      indizi: [
        'È una varietà di lingua caratterizzata da lessico elevato e strutture sintattiche elaborate.',
        'Si distingue dal registro informale per l\'assenza di colloquialismi e contrazioni.',
        'Nell\'accademia di Elenthyr è il registro standard dei testi accademici e delle comunicazioni ufficiali.',
        'Cornelia Vesti lo usa anche fuori dall\'aula — un\'estensione del suo rigore professionale.',
        'Contrasta con il registro più informale di docenti come Pietro Vasso e Kael Dorne.'
      ],
      opzioni: ['Il registro formale', 'Il registro elevato', 'Il registro accademico', 'Il registro letterario']
    },
    {
      risposta: 'La descrizione multisensoriale',
      indizi: [
        'È una tecnica narrativa che coinvolge più di un senso nella rappresentazione di un luogo o momento.',
        'Non si limita alla vista ma include udito, tatto, olfatto.',
        'Crea un effetto di presenza che la sola descrizione visiva non produce.',
        'Nei testi dell\'accademia è particolarmente presente nelle descrizioni dei laboratori e della Sala Rituale.',
        'È la tecnica narrativa principale usata nelle descrizioni dei luoghi di Elenthyr.'
      ],
      opzioni: ['La descrizione multisensoriale', 'L\'ekfrasis', 'La sinestesia', 'Il locus amoenus']
    },
    {
      risposta: 'Il tono',
      indizi: [
        'È l\'atteggiamento dell\'autore verso il soggetto e il lettore, espresso attraverso le scelte lessicali.',
        'Può essere formale, amichevole, ironico, distaccato, curioso, elusivo.',
        'Nel sistema di dialogo dell\'accademia, ogni risposta ha un tono distinto che influenza le relazioni.',
        'I PNG reagiscono in modo diverso ai toni — alcuni preferiscono il formale, altri l\'amichevole.',
        'Scegliere il tono sbagliato può danneggiare una relazione anche quando il contenuto è corretto.'
      ],
      opzioni: ['Il tono', 'Il registro', 'Lo stile', 'Il punto di vista']
    }
  ]

};


// ------------------------------------------------------------
// QUIZ ERUDIZIONE — domande testuali per disciplina
// Usati da RebusAccessibile in alternativa al Rebus.
// rispostaCorretta: indice (0-based) dell'opzione corretta.
// ------------------------------------------------------------
const QUIZ_ERUDIZIONE = {

  storia: [
    {
      domanda: 'Quale organo di governo si occupa della gestione operativa dell\'accademia?',
      opzioni: ['Il Senato Accademico', 'Il Consiglio dei Docenti', 'L\'Assemblea dei Custodi', 'Il Comitato dei Magistri'],
      rispostaCorretta: 0
    },
    {
      domanda: 'Chi presiede le cerimonie di ascensione al grado di Magister o superiore?',
      opzioni: ['Il docente della disciplina', 'Brennar Ostk', 'Valdric Sonn', 'Livia Cauro'],
      rispostaCorretta: 2
    },
    {
      domanda: 'Quando si verifica la transizione alla fase post-accademica?',
      opzioni: ['Al termine del quarto semestre', 'Al raggiungimento del grado di Esperto o Archivista', 'Dopo dieci anni nell\'accademia', 'Su decisione del Senato Accademico'],
      rispostaCorretta: 1
    },
    {
      domanda: 'Quale luogo dell\'accademia è accessibile solo a partire dal grado di Magister?',
      opzioni: ['La Torre e Osservatorio', 'La Sala Rituale', 'L\'Archivio Riservato', 'Il Laboratorio di Alchimia'],
      rispostaCorretta: 2
    },
    {
      domanda: 'Quante stagioni compongono un anno nell\'accademia di Elenthyr?',
      opzioni: ['Due', 'Tre', 'Quattro', 'Sei'],
      rispostaCorretta: 2
    }
  ],

  filosofia: [
    {
      domanda: 'Quale delle seguenti conclusioni segue logicamente dalle premesse: "Tutti gli studenti dell\'accademia studiano almeno una disciplina. Il protagonista è uno studente dell\'accademia"?',
      opzioni: ['Il protagonista studia almeno una disciplina', 'Il protagonista è di ramo arcana', 'Il protagonista conosce la magia', 'Il protagonista è il più bravo'],
      rispostaCorretta: 0
    },
    {
      domanda: 'La proposizione "Questo testo è interessante" è classificabile come:',
      opzioni: ['Soggettiva', 'Oggettiva', 'Contraddittoria', 'Tautologica'],
      rispostaCorretta: 0
    },
    {
      domanda: 'Se ogni scelta apre alcune possibilità e ne preclude altre, e il protagonista ha già effettuato scelte, allora:',
      opzioni: ['Alcune possibilità non sono più accessibili', 'Tutte le possibilità rimangono aperte', 'Le scelte passate possono essere annullate', 'Le scelte future sono determinate'],
      rispostaCorretta: 0
    },
    {
      domanda: 'Un sillogismo è "formalmente valido" quando:',
      opzioni: ['La conclusione è vera', 'La conclusione segue necessariamente dalle premesse', 'Le premesse sono dimostrabili', 'L\'argomentazione non ammette eccezioni'],
      rispostaCorretta: 1
    },
    {
      domanda: 'Quale termine descrive la capacità di un sistema di valori di resistere alle eccezioni senza franare?',
      opzioni: ['Rigidità', 'Coerenza', 'Assolutezza', 'Dogmatismo'],
      rispostaCorretta: 1
    }
  ],

  scienzeNaturali: [
    {
      domanda: 'Quale caratteristica fisica distingue la Sala Rituale dagli altri luoghi dell\'accademia?',
      opzioni: ['Alta temperatura e luminosità intensa', 'Aria densa e temperatura inferiore alla media', 'Assenza completa di eco', 'Forte umidità e odore di pietra bagnata'],
      rispostaCorretta: 1
    },
    {
      domanda: 'In alchimia, cosa indica il termine "cristallizzazione"?',
      opzioni: ['Dissoluzione di un solido in un liquido', 'Trasformazione in uno stato solido stabile', 'Evaporazione accelerata di un composto', 'Combinazione di due elementi instabili'],
      rispostaCorretta: 1
    },
    {
      domanda: 'La risonanza si verifica quando:',
      opzioni: ['Un sistema assorbe tutta l\'energia applicata', 'La frequenza naturale di un sistema coincide con quella della forza applicata', 'Un materiale resiste alle vibrazioni esterne', 'Il suono si propaga più lentamente del normale'],
      rispostaCorretta: 1
    },
    {
      domanda: 'Quanti giorni dura una stagione nell\'accademia di Elenthyr?',
      opzioni: ['30', '45', '60', '90'],
      rispostaCorretta: 2
    },
    {
      domanda: 'I materiali su cui vengono incise le rune influenzano:',
      opzioni: ['La durata dell\'incantamento soltanto', 'Solo l\'estetica del risultato', 'Il tipo di effetto che la runa produce', 'La velocità di apprendimento del praticante'],
      rispostaCorretta: 2
    }
  ],

  letteratura: [
    {
      domanda: 'Quale figura retorica dice il contrario di ciò che intende, senza intento direttamente offensivo?',
      opzioni: ['La metafora', 'L\'ironia', 'L\'iperbole', 'La metonimia'],
      rispostaCorretta: 1
    },
    {
      domanda: 'La "descrizione multisensoriale" è una tecnica narrativa che:',
      opzioni: ['Usa solo la vista per descrivere un luogo', 'Coinvolge più sensi nella rappresentazione', 'Sostituisce le parole con immagini', 'Descrive solo l\'udito e il tatto'],
      rispostaCorretta: 1
    },
    {
      domanda: 'In narrativa, il "tono" si riferisce a:',
      opzioni: ['Il ritmo della prosa', 'L\'atteggiamento dell\'autore verso soggetto e lettore', 'L\'altezza della voce del narratore', 'Il periodo storico in cui è ambientato il testo'],
      rispostaCorretta: 1
    },
    {
      domanda: 'La narrazione in seconda persona si rivolge al lettore usando:',
      opzioni: ['Io', 'Tu', 'Egli/Ella', 'Noi'],
      rispostaCorretta: 1
    },
    {
      domanda: 'Il "registro formale" si distingue da quello informale per:',
      opzioni: ['L\'uso di abbreviazioni e contrazioni', 'La presenza di lessico elevato e strutture elaborate', 'Il tono umoristico', 'La brevità delle frasi'],
      rispostaCorretta: 1
    }
  ]

};


// ------------------------------------------------------------
// TESTI FALLIMENTO MINIGIOCO
// Mostrati nel pannello risultato quando il minigioco termina
// con esito negativo. Tre fasce in base al grado del protagonista.
// Il testo viene selezionato casualmente dalla fascia appropriata.
// ------------------------------------------------------------
const TESTI_FALLIMENTO_MINIGIOCO = {

  fasciaBase: [
    `Non è andata come speravi. Ma gli errori a questo livello fanno parte del percorso — sono la materia prima con cui si costruisce la comprensione.`,
    `Qualcosa non ha funzionato. Hai ancora molto da imparare, ed è esattamente dove dovresti essere in questo momento.`,
    `Il risultato non è quello che ti aspettavi. A questo grado, ogni tentativo conta — riuscito o no. Quello che hai imparato oggi non si vede ancora, ma è lì.`,
    `Non è bastato. Succede. La differenza tra chi progredisce e chi si ferma non sta nel fallire o meno, ma nel tornare al banco di lavoro il giorno dopo.`
  ],

  fasciaMedia: [
    `Un passo falso. Non il primo, probabilmente non l'ultimo. Conta come reagisci nelle ore che seguono.`,
    `Non è bastato. La disciplina richiede più di quanto hai portato oggi — e tu lo sai già. Questo è il momento di capire perché.`,
    `Il risultato non è quello che ti serve. A questo punto del percorso, i fallimenti iniziano ad avere un peso diverso. Non catastrofico — ma reale.`,
    `Hai mancato l'obiettivo. Prendi nota di dove è andato storto. Non per colpevolizzarti — per non ripeterlo.`
  ],

  fasciaAlta: [
    `A questo livello, un fallimento non è solo un errore tecnico. È un segnale che qualcosa va rivisto nel metodo, non solo nell'esecuzione.`,
    `Hai mancato l'obiettivo. Chi ti ha formato se ne accorgerà — non come un giudizio, ma come un'osservazione. E lo dovrà diventare anche per te.`,
    `Il risultato non è accettabile per il grado che porti. Non è una questione di aspettative esterne — è una questione di standard che appartengono a te.`,
    `A questo punto del percorso ci si aspetta una certa costanza. Oggi non c'è stata. Capire perché è più importante del risultato stesso.`
  ]

};


// ------------------------------------------------------------
// TESTI INCIDENTI INTERNI
// Pool di descrizioni brevi per gli eventi casuali che animano
// la vita dell'accademia. Selezionata una descrizione a caso
// al momento della generazione dell'evento.
// ------------------------------------------------------------
const TESTI_INCIDENTI_INTERNI = [
  `Un incidente nel laboratorio di alchimia — nessun ferito, ma l'ala est ha odore di zolfo bruciato da tre giorni.`,
  `Una disputa tra due docenti è trapelata fuori dall'aula. Il contenuto non è chiaro, ma i toni sì.`,
  `Un testo raro è risultato mancante dall'archivio. Serelith Vane non ha fatto commenti. Il che significa molto.`,
  `Qualcosa di strano è stato osservato nella torre di notte — una luce che non avrebbe dovuto esserci.`,
  `Una sessione di rituali è stata interrotta bruscamente. La Sala Rituale è rimasta chiusa per il resto della giornata.`
];


// ------------------------------------------------------------
// TESTI TUTORIAL MINIGIOCHI
// Mostrati una sola volta, alla prima occorrenza di ogni minigioco.
// Tracciamento in game-engine.js: tutorialVisti[].
// ------------------------------------------------------------
const TESTI_TUTORIAL_MINIGIOCHI = {
  memoryRune: `Scopri due rune alla volta toccandole. Ogni runa emette un pattern sonoro unico. Se le due rune hanno lo stesso pattern, rimangono scoperte. Se sono diverse, si ricoprono e perdi un tentativo. Trova tutte le coppie per completare il minigioco.`,
  minesweeperReagenti: `La griglia contiene reagenti sicuri e instabili. I numeri indicano quanti reagenti instabili si trovano nelle celle adiacenti. Marca le celle che ritieni instabili e rivela quelle sicure. Non rivelare mai una cella instabile.`,
  mastermindFormule: `Devi indovinare la formula segreta: una sequenza di simboli nell'ordine corretto. Dopo ogni tentativo ricevi tre tipi di feedback sonoro: tono alto per simbolo corretto nel posto giusto, doppio bip per simbolo corretto nel posto sbagliato, tono basso per simbolo errato. Usa i tentativi precedenti per ragionare.`,
  meccanicaSpellcasting: `Devi premere il pulsante al momento giusto, quando l'energia raggiunge la zona sicura. Hai qualche secondo di preparazione prima di ogni fase — usa questo tempo per agganciare il pulsante con VoiceOver. Il suono ti guida: diventa più acuto quando sei vicino alla zona sicura.`,
  labirintoEquilibrio: `Guida l'energia attraverso il labirinto mantenendo l'equilibrio. La barra di tensione indica il tuo stato: tienila nella zona verde. Ogni movimento consuma equilibrio — pianifica il percorso prima di agire.`,
  rebusAccessibile: `Ti vengono presentati tre enigmi in sequenza, di difficoltà crescente. Ogni enigma descrive una situazione del mondo di Elenthyr e richiede ragionamento per essere risolto. Leggi attentamente il testo prima di scegliere la risposta.`,
  sblocaggioReagente: `Individua la combinazione corretta di reagenti per aprire il sigillo. Ogni tentativo ti dice quanti reagenti sono corretti e quanti sono nella posizione giusta. Usa la logica per restringere le possibilità.`,
  dissolvenza: `Sincronizzati con il ritmo del sigillo magico. La frequenza oscilla come un pendolo: intervieni quando la sincronizzazione è al massimo. Ascolta e senti il ritmo prima di agire.`
};


// ------------------------------------------------------------
// TESTI INTRODUZIONE LEZIONE CON MINIGIOCO
// Mostrati prima di ogni minigioco durante le lezioni, nella
// voce del docente della disciplina. Pool di varianti per
// evitare ripetizioni ravvicinate.
// Organizzati per idDisciplina.
// ------------------------------------------------------------
const TESTI_INTRO_LEZIONE = {
  incantamento: [
    `La Magistra Hilda Vorn dispone davanti a voi un set di lastre di rame incise con simboli antichi. «L'incantamento comincia con il riconoscimento», dice, studiandovi. «Ogni glifo ha una firma. Imparatela prima di tracciarla.»`,
    `Vorn indica un pannello di rune disposte in sequenza. «Le rune si abbinano per risonanza», dice. «Il vostro compito oggi è trovare quelle coppie. Usate l'ascolto, non la vista.»`,
    `«La memoria è il fondamento dell'incantamento», enuncia la Magistra Vorn senza preamboli. «Oggi alleniamo la memoria. Riconoscete le rune per la firma sonora e abbinate le coppie.»`
  ],
  alchimia: [
    `Pietro Vasso aggiusta il grembiule e indica la griglia di vasi disposta sul banco. «Qualcuno qui vi farebbe molto felici, qualcun altro molto meno», dice con mezzo sorriso. «Capite quali sono quali prima di toccarli.»`,
    `«Il laboratorio non perdona le mani frettolose», dice il Docente Vasso, posando un vasetto con cura elaborata. «Studiate la griglia. I numeri vi dicono quanto siete vicini al pericolo. Leggeteli.»`,
    `Vasso indica la griglia di reagenti. «Bello questo. Pericolosissimo, ma bello.» Vi guarda con aria amichevole. «Oggi imparate a distinguere. Segnate quelli instabili, rivelate quelli sicuri.»`
  ],
  rituali: [
    `Sevan Drath vi indica il centro della sala con un gesto misurato. Non spiega subito. Poi, dopo un lungo silenzio: «L'equilibrio non si trova — si costruisce. Muovetevi con intenzione.»`,
    `L'Alto Maestro vi osserva in silenzio dalla soglia della Sala Rituale. «Prima di procedere», dice alla fine, «dovete saper navigare la tensione energetica. Oggi è quello che farete.»`,
    `«Il rituale ha una struttura interna», dice Sevan Drath. «Ogni nodo rappresenta uno stato di tensione. Trovate l'equilibrio. Procedete.»`
  ],
  teoriaArcana: [
    `La Magistra Cornelia Vesti pone davanti a voi una sequenza di simboli arcani incompleta. «Le formule hanno una logica interna», dice, senza alzare lo sguardo. «Trovate la struttura nascosta. Non ammetto approssimazioni.»`,
    `«Ogni formula arcana è un sistema chiuso», enuncia la Magistra Vesti. «Oggi la decodificate. Avete un numero finito di tentativi — usateli con metodo.»`,
    `Cornelia Vesti scrive una sequenza sulla lavagna, poi la cancella con gesto secco. «Ricostruitela», dice. «Non a memoria — per ragionamento. È la differenza tra uno studente e un teorico.»`
  ],
  spellcasting: [
    `Kael Dorne batte le mani una volta. «Oggi lanciate davvero», dice. «Niente teoria — senso del ritmo puro. Aspettate il momento esatto, poi intervenite. Troppo presto o troppo tardi non conta.»`,
    `«La spell non aspetta», dice il Docente Dorne. «Ha la sua struttura ritmica e voi vi adattate ad essa, non il contrario. Ascoltate. Poi agite.»`,
    `Dorne vi guarda con quella sua espressione sospesa tra sfida e curiosità. «Ogni elemento energetico ha una finestra. Trovatela. Intervenite dentro quella finestra.»`
  ],
  storia: [
    `Il Docente Matteo Servi chiude il libro e vi guarda. «Il passato non si studia — si interroga», dice. «Oggi troverete alcune domande che non hanno risposta immediata. È quello il punto.»`,
    `«La storia è fatta di strati», dice Servi con la sua calma riflessiva. «Ogni evento ne porta altri con sé. Oggi riconoscerete questi strati e troverete il filo corretto.»`,
    `Servi indica la serie di enigmi storici sul banco. «Queste non sono domande da manuale», dice. «Richiedono di sapere dove guardare. Usate quello che sapete.»`
  ],
  filosofia: [
    `La Docente Maren Solde vi sorride con la sua consueta apertura. «Nessuna domanda è assurda finché non si smette di porla», dice. «Oggi avrete qualche enigma da sciogliere. Non cercate la risposta giusta — cercate quella onesta.»`,
    `«La filosofia comincia dove le certezze finiscono», dice Maren Solde. «Ragionate ad alta voce, anche solo dentro di voi. È lì che trovate la risposta.»`,
    `«Oggi», dice la Docente Solde con quella voce che rende ogni lezione un invito, «avremo a che fare con alcuni paradossi. Non scoraggiatevi se la prima risposta sembra sbagliata.»`
  ],
  scienzeNaturali: [
    `Edvar Sollen si interrompe a metà di una frase non correlata, vi fissa, poi sorride come se avesse risolto qualcosa. «Ah, sì, voi. L'osservazione rigorosa è il fondamento», dice. «Osservate, ragionate, rispondete. Nell'ordine.»`,
    `«Il fenomeno naturale non mente», dice Sollen, distogliendo lo sguardo da qualcosa sull'orizzonte. «Mente la nostra interpretazione. Oggi alleniamo la seconda — che è quella che conta davvero.»`,
    `Il Custode Sollen annota qualcosa sul taccuino mentre aspettate. «Ah», dice infine. «Sì. Oggi avete alcune domande di osservazione. Prendete il tempo che vi serve.»`
  ],
  letteratura: [
    `I testi sul banco attendono. Ciascuno di essi richiede attenzione e precisione prima di cedere il proprio senso. Leggete con cura — non ogni risposta è in superficie.`,
    `La lezione di letteratura oggi procede per enigmi. Non si tratta di memoria ma di comprensione: ogni testo richiede di essere interrogato, non solo letto.`,
    `Ogni testo porta in sé una struttura che si può imparare a riconoscere. Oggi allenerete questo riconoscimento su esempi dal canone.`
  ]
};
