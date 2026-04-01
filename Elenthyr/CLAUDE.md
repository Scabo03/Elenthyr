# ELENTHYR — Game Design Document

## Descrizione generale

Elenthyr è un'avventura interattiva per browser mobile (PWA ottimizzata per Safari su iPhone) ambientata nell'Accademia di Elenthyr, un antico ordine di maghi e studiosi. Il giocatore interpreta un giovane di origini basso-borghesi ammesso per merito all'Accademia, e ne segue la crescita graduale in competenze arcane, erudizione, carisma e relazioni nel corso di un tempo di gioco potenzialmente illimitato.

Il gioco non ha un finale predefinito. La progressione è qualitativa e narrativa — emerge dal testo e dalle reazioni dei personaggi, non da numeri visibili. Le scelte del giocatore hanno peso reale: alcune aprono possibilità, altre le precludono. La reputazione è tracciata individualmente per ogni personaggio ricorrente.

Il gioco è scritto interamente in italiano, con alcuni termini inglesi selezionati coerenti con il registro arcano-accademico. Termini ammessi e non traducibili: Spell (sostantivo femminile — la spell, le spell, una spell), Spellcasting, Skill. Tutti i testi narrativi sono scritti da Claude Code seguendo le linee guida di stile contenute in questo documento.

---

## Piattaforma e requisiti tecnici

Elenthyr è una Progressive Web App (PWA) ottimizzata per Safari su iPhone. Questa è la piattaforma prioritaria e l'unico ambiente di test valido. I test automatici in Node.js sono utili esclusivamente per verificare la logica pura del motore di gioco — mai per interfaccia, navigazione, audio, aptici o compatibilità browser. Nessuna funzionalità può essere considerata implementata finché non è stata verificata manualmente su dispositivo fisico iPhone con Safari, con VoiceOver attivo, e con la cache svuotata.

**Struttura dei file**

La separazione delle responsabilità tra i file è rigida e va mantenuta per tutta la durata dello sviluppo:

- `index.html` — struttura, markup e caricamento degli script
- `style.css` — stile, layout, decorazioni visive tematiche
- `game-engine.js` — logica di gioco, progressione, stato del personaggio, reputazione PNG, sistema di gradi
- `ui.js` — gestione dell'interfaccia, transizioni tra schermate, rendering del testo
- `audio.js` — gestione di tutti i canali audio (musica, ambientale, voci), voicelines, feedback sonori
- `data.js` — strutture dati: personaggi, luoghi, eventi, trigger, configurazione dei gradi
- `narrative.js` — tutti i testi narrativi del gioco: descrizioni dei luoghi, testo delle scelte, reazioni dei PNG
- `dialoghi.js` — dialoghi interattivi di tutti i PNG, organizzati per contesto, livello di relazione ed eventi attivi
- `minigames.js` — logica di tutti i minigiochi, indipendente dal motore principale
- `test-engine.js` — test automatici per la logica pura del motore in Node.js
- `service-worker.js` — gestione cache offline e aggiornamenti PWA
- `manifest.json` — configurazione PWA

Nessuna logica di gioco va inserita in `ui.js`. Nessuna logica di interfaccia va inserita in `game-engine.js`. I testi narrativi stanno in `narrative.js` e non vanno dispersi in altri file. I minigiochi comunicano con `game-engine.js` solo attraverso un'interfaccia definita — non accedono direttamente allo stato del gioco.

**Ordine di caricamento degli script in index.html**

L'ordine è rigido e va rispettato:
1. `data.js`
2. `narrative.js`
3. `dialoghi.js`
4. `audio.js`
5. `game-engine.js`
6. `minigames.js`
7. `ui.js`

Tutti gli script sono caricati con attributo `defer` per compatibilità Safari iOS.

**Requisiti di compatibilità Safari iOS**

Applicare obbligatoriamente i seguenti polyfill e fallback:

- `replaceChildren()` non supportato prima di Safari 14 — aggiungere polyfill in cima a `ui.js`
- Proprietà CSS `dvh` non supportata prima di Safari 16 — usare sempre `100vh` come fallback prima di `100dvh`
- Proprietà CSS `inset` non supportata da Safari 14.0 — usare sempre `top`, `right`, `bottom`, `left` espliciti
- `:focus-visible` non supportato prima di Safari iOS 15.4 — aggiungere sempre `:focus` come selettore parallelo
- Non usare mai `!important` su classi di visibilità gestite dinamicamente via JavaScript — causa bug silenziosi difficili da individuare

**Web Audio API su Safari iOS**

Il contesto audio deve essere inizializzato o ripreso esclusivamente in risposta diretta a un gesto esplicito dell'utente. Safari blocca qualsiasi avvio automatico. Il sistema gestisce tre canali indipendenti e regolabili separatamente: musica tematica, audio ambientale, voci e voicelines. I file audio esterni sono cachati nel service worker. I feedback sonori brevi per le interazioni sono generati sinteticamente via Web Audio API, senza file esterni.

**Feedback aptico**

Il feedback aptico è riservato a contesti specifici: minigiochi di Alchimia, Incantamento, Rituali e Spellcasting. Va testato esclusivamente su dispositivo fisico.

**Salvataggio**

Il salvataggio avviene tramite localStorage, automaticamente dopo ogni scelta significativa. È disponibile una funzione di esportazione del salvataggio come file di testo e di reimportazione. Un solo profilo di gioco per dispositivo.

**Protocollo di test obbligatorio**

Prima di considerare qualsiasi funzionalità completata, nell'ordine:
1. Verificare su iPhone reale con Safari
2. Verificare con VoiceOver attivo
3. Verificare con cache di Safari svuotata (Impostazioni → Safari → Cancella cronologia e dati sito web)
4. Eseguire i test automatici Node.js solo per la logica pura del motore

I test automatici non sostituiscono mai il test su dispositivo fisico.

**Flussi di navigazione**

Prima di modificare qualsiasi flusso di navigazione o transizione tra schermate, Claude Code deve produrre una mappa completa in italiano di tutti i possibili stati e percorsi, e attendere conferma esplicita prima di implementare qualsiasi modifica. I bug architetturali vanno risolti rifacendo il sistema — non rattoppando i sintomi uno alla volta.

**Convenzioni di codice**

Tutto il codice è scritto in italiano — nomi di variabili, funzioni, commenti, etichette. Le eccezioni sono i termini tecnici JavaScript e le API browser che non hanno traduzione. I commenti sono obbligatori per ogni funzione non banale.

---

## Accessibilità e VoiceOver

L'accessibilità non è una funzionalità aggiuntiva di Elenthyr — è un requisito fondamentale dell'intera architettura. Il gioco deve essere completamente giocabile da utenti ciechi o ipovedenti tramite VoiceOver su iPhone, senza alcuna perdita di contenuto o funzionalità rispetto all'esperienza visiva.

**Regole fondamentali**

Ogni elemento interattivo deve avere un `aria-label` descrittivo e significativo. Non sono accettabili etichette generiche come "pulsante 1" o "opzione A".

I messaggi dinamici usano `aria-live="polite"` in modo che VoiceOver li legga non appena appaiono senza interrompere ciò che sta già leggendo.

I contenitori di informazioni correlate usano `role="group"` con `aria-label` descrittivo.

I pulsanti di conferma e avanzamento devono sempre apparire prima del contenuto a cui si riferiscono nel DOM.

Tutti gli elementi puramente decorativi hanno `aria-hidden="true"`. VoiceOver non deve agganciarsi a nessun elemento senza contenuto informativo reale.

Le emoji non vanno usate come unico veicolo di informazione. Se usate, vanno accompagnate da testo alternativo o nascoste con `aria-hidden="true"`.

**Ordine di navigazione**

L'ordine degli elementi nel DOM deve rispecchiare il flusso logico del gioco. In ogni schermata VoiceOver legge nell'ordine: contesto o descrizione della situazione, poi le opzioni disponibili.

**Ergonomia della navigazione VoiceOver**

I testi correlati vanno raggruppati in un unico elemento leggibile da VoiceOver — non distribuiti in box separati.

Quando il giocatore effettua una scelta, la schermata deve aggiornarsi portando il focus di VoiceOver direttamente sul risultato della scelta.

I pulsanti di azione successiva devono essere immediatamente raggiungibili dopo la lettura del contenuto, senza dover tornare in cima alla pagina.

Il numero di elementi interattivi distinti per schermata va tenuto al minimo necessario. Se una schermata richiede più di dieci swipe per essere navigata completamente, va riprogettata.

Dopo ogni azione del giocatore, il focus di VoiceOver viene gestito esplicitamente via JavaScript.

**Test obbligatorio con VoiceOver**

Ogni schermata va testata con VoiceOver attivo su iPhone reale prima di essere considerata completata. Durante il test, simulare una sessione di gioco completa usando solo VoiceOver, senza guardare lo schermo.

**Testi alternativi per i minigiochi**

I minigiochi sono progettati come audio-first e aptici-first. Ogni istruzione, ogni feedback di riuscita o fallimento, ogni stato del minigioco deve essere comunicato tramite audio, aptico e testo leggibile da VoiceOver.

**Salvataggio e impostazioni**

Le schermate di impostazioni sono completamente navigabili con VoiceOver. I controlli del volume sono slider con valori leggibili da VoiceOver.

---

## Interfaccia e navigazione

Il gioco non ha spostamento fisico nello spazio. Tutta la navigazione avviene tramite menu a livelli e scelte testuali. Non esistono mappe da esplorare né personaggi da muovere.

**Fascia superiore permanente**

Presente in tutte le schermate del gioco, mai nascosta. Contiene a sinistra l'indicazione di stagione, giorno e semestre (es. "Autunno · Giorno 12 · S1"), e a destra il pulsante impostazioni con icona ingranaggio. Durante la fase post-accademica il semestre non appare: "Autunno · Giorno 12". VoiceOver legge questa fascia come un gruppo con etichetta descrittiva completa.

**Fascia calendario**

Immediatamente sotto la fascia superiore permanente. Contiene 3-4 box orizzontali che mostrano il giorno corrente e i 2-3 giorni successivi. Ogni box mostra il giorno e una sintesi compatta degli impegni calendarizzati. Quando VoiceOver aggancia un box, legge in modo esteso gli impegni del giorno corrispondente. La fascia è compatta e non ingombrante visivamente.

**Schermata principale del giorno**

Sotto il calendario, gli slot della giornata sono presentati in ordine cronologico fisso:

Mattina · Tarda mattina · Pranzo · Primo pomeriggio · Tardo pomeriggio · Sera · Notte

Ogni slot contiene o un impegno obbligatorio o un'opzione di tempo libero. Gli slot con impegno obbligatorio mostrano il nome dell'evento e un pulsante per parteciparvi. Gli slot di tempo libero mostrano un pulsante che apre la scelta del tipo di attività.

**Slot notturno**

La notte appare come slot nella schermata principale ma è giocabile attivamente solo una volta per settimana — negli altri quattro giorni è automaticamente saltata senza interazione. Quando giocata, offre accesso a eventi notturni misteriosi o clandestini, e a uno slot aggiuntivo per prepararsi a un esame o completare una task in scadenza. Luoghi accessibili di notte: Laboratorio di Alchimia, Laboratorio di Incantamento, Torre e Osservatorio, Sala Rituale, Archivio Riservato.

Giocare la notte introduce un malus alle attività del giorno successivo, più pesante dello speculare bonus che si ottiene scegliendo Riposo durante un slot diurno. Il malus si annulla automaticamente al termine della giornata senza sonno — non si accumula oltre le 24 ore.

**Tipi di attività nel tempo libero**

*Riposo* — effetto immediato e automatico. Produce un piccolo bonus alle attività svolte per il resto della giornata. Narrativamente il personaggio torna alla propria stanza. Nessuna scelta ulteriore.

*Socialità* — effetto immediato e automatico. Produce un piccolo bonus di reputazione. Nessuna scelta ulteriore.

*Studio* — effetto immediato e automatico. Durante la fase accademica produce bonus a lezioni ed esami. Narrativamente il personaggio studia in biblioteca. Nessuna scelta di luogo. Nella fase post-accademica produce piccoli bonus permanenti alle discipline più carenti del personaggio.

*Ricerca* — apre il flusso di scelta del luogo e dell'attività specifica. Permette di portare avanti progetti, esplorare discipline, avanzare nella progressione. È l'unica opzione che dà accesso ai luoghi dell'accademia e ai minigiochi.

**Flusso di navigazione — Ricerca**

Slot tempo libero → scelta tipo attività (Ricerca) → scelta del luogo → schermata del luogo → svolgimento attività → ritorno automatico alla schermata principale del giorno.

Non esiste pulsante "indietro" nel flusso normale. L'unica eccezione è la schermata di scelta del luogo, dove è possibile tornare indietro alla scelta del tipo di attività se non si è ancora entrati in nessun luogo.

**Schermata di scelta del luogo**

Mostra i luoghi disponibili per la Ricerca. Ogni luogo è un box con nome e breve sommario delle attività disponibili. I luoghi non ancora sbloccati appaiono con aspetto visivamente attenuato e una breve indicazione del requisito mancante — sono leggibili da VoiceOver con etichetta descrittiva completa ma non sono interattivi.

**Schermata del luogo**

Nuova schermata separata. L'audio ambientale del luogo parte con dissolvenza morbida. Mostra nome del luogo, breve descrizione testuale dell'ambiente, e attività disponibili. Le attività non accessibili per grado insufficiente sono visibili ma marcate come non disponibili, con breve spiegazione del requisito mancante. Dialoghi, interazioni con i PNG e minigiochi si svolgono all'interno di questa schermata, mantenendo audio ambientale, decorazioni e atmosfera del luogo attivi per tutta la durata.

Lezioni, esami e cerimonie si svolgono sempre nell'interfaccia tematica del luogo corrispondente — nessuna schermata o tema apposito per gli eventi obbligatori.

**Pannelli sovrapposti**

Usati esclusivamente per notifiche del narratore esterno, avvisi di sistema e messaggi informativi. Contengono uno o più paragrafi di testo e un solo pulsante "Ok" per chiudere. Alta opacità e contrasto elevato rispetto allo sfondo sottostante. Il pulsante "Ok" è il primo elemento del pannello nel DOM. Mentre il pannello è aperto, tutto il contenuto sottostante è inerte e nascosto a VoiceOver tramite `aria-hidden="true"`.

**Sistema di dialogo**

Le conversazioni con i PNG si svolgono all'interno della schermata del luogo, mantenendo colore tematico, decorazioni e audio ambientale attivi per tutta la durata.

La lunghezza di ogni conversazione è determinata dal motore in base a: livello di relazione col PNG, grado del protagonista, eventi attivi nell'accademia, luogo e momento della giornata. Tre lunghezze: breve (2-3 scambi), media (5-6 scambi), lunga (10-20 scambi).

Il box di dialogo è composto da due elementi nell'ordine seguente: in alto il testo del PNG (uno o al massimo due elementi di testo), in basso almeno quattro caselle contenenti le possibili risposte del giocatore. Ogni casella ha un tono distinto — formale, amichevole, ironico, distaccato e simili. Il tono scelto contribuisce alla relazione tracciata col PNG. L'effetto di ogni risposta non è visibile prima della scelta. Il giocatore non può interrompere un dialogo avviato.

Ogni PNG ha centinaia di linee di dialogo pre-generate in `narrative.js`, organizzate per contesto, livello di relazione, grado del protagonista ed eventi attivi. Il motore seleziona le linee appropriate evitando ripetizioni ravvicinate.

VoiceOver legge prima il testo del PNG, poi le caselle di risposta in sequenza. Ogni casella ha un'etichetta descrittiva che include il tono oltre al contenuto.

**Stile visivo**

Chiaro e leggibile, ottimizzato per testo su mobile. Ogni luogo ha un colore tematico vivido e saturo definito nella sezione Luoghi. Gli elementi decorativi — bordi, divisori, motivi tematici — sono puramente visivi con `aria-hidden="true"`. Nessun `!important` su proprietà di visibilità. Il numero di elementi interattivi distinti per schermata è ridotto al minimo.

**Impostazioni**

Accessibili tramite pulsante ingranaggio nella fascia superiore permanente. Contengono: tre slider di volume indipendenti (musica, audio ambientale, voci), funzione di esportazione e importazione del salvataggio, informazioni sulla versione del gioco. Completamente navigabili con VoiceOver.

---

## Luoghi dell'accademia

Tutti i luoghi sono accessibili solo durante le ore diurne, secondo gli slot della giornata, ad eccezione dei luoghi accessibili di notte indicati nella sezione Interfaccia. Ogni luogo ha un colore tematico vivido e saturo, un paesaggio sonoro ambientale distinto con due o tre varianti di loop che si alternano in ordine non prevedibile, e decorazioni visive tematiche con `aria-hidden="true"`. L'audio ambientale parte con dissolvenza morbida all'ingresso e si dissolve all'uscita.

I luoghi non ancora sbloccati appaiono nella schermata di scelta con aspetto visivamente attenuato e indicazione del requisito mancante. Sono leggibili da VoiceOver ma non interattivi.

In ogni luogo è sempre possibile incontrare i docenti della relativa disciplina e avere interazioni randomizzate con i coetanei. Le interazioni con i coetanei non consumano lo slot e non interrompono l'attività principale — producono eventualmente piccoli bonus sociali o reputazionali. Le interazioni con i docenti consumano lo slot e al termine ritornano automaticamente alla schermata principale. Le interazioni con i coetanei variano per peso e durata in base al rapporto pregresso e agli eventi attivi nell'accademia.

---

**Aule e sale lezioni**
Colore tematico: arancione.
Paesaggio sonoro: voci distanti e sovrapposte, scricchiolio di legno, atmosfera formale e raccolta.
Accessibile da: tutti i gradi.
Attività disponibili: lezioni (evento obbligatorio), minigiochi guidati durante le lezioni, esami (evento obbligatorio).
Note: lezioni ed esami sono entrambi eventi obbligatori. I minigiochi durante le lezioni sono guidati e risk-free — fungono da tutorial mascherato per le meccaniche. L'atmosfera e il tema visivo delle aule accompagnano qualsiasi evento accademico formale che si svolga in questo luogo.

---

**Biblioteca**
Colore tematico: blu elettrico.
Paesaggio sonoro: silenzio pesante, sfoglio di carte, scricchiolio di penna, fuoco nel camino in lontananza.
Accessibile da: tutti i gradi, con sezioni riservate ai gradi superiori.
Attività disponibili: studio (attività automatica), ricerca di testi, consultazione di volumi per grado, interazione con Serelith Vane.
Note: la biblioteca è divisa in sezioni per grado di accesso. Le sezioni non ancora accessibili sono visibili ma visivamente attenuate con indicazione del requisito mancante. È il luogo principale per l'attività Studio.

---

**Laboratorio di Alchimia**
Colore tematico: verde.
Paesaggio sonoro: gorgoglio di bollitori, gocce, fiamme basse, vapori, tintinnio di vetro.
Accessibile da: Apprendista in su.
Attività disponibili: pratica alchemica (minigioco Minesweeper dei Reagenti), Sbloccaggio Reagente, interazione con Pietro Vasso.
Note: non ogni attività alchemica richiede il completamento di un minigioco. Alcune attività producono testo narrativo e scelte di dialogo senza meccanica interattiva.

---

**Laboratorio di Incantamento**
Colore tematico: viola.
Paesaggio sonoro: ronzio magico basso e continuo, risonanza di metallo, tintinnio di cristalli.
Accessibile da: Apprendista in su.
Attività disponibili: pratica di incantamento (minigioco Memory delle Rune), Dissolvenza, creazione di oggetti magici, interazione con Hilda Vorn.
Note: non ogni attività di incantamento richiede il completamento di un minigioco.

---

**Sala Rituale**
Colore tematico: rosso rubino.
Paesaggio sonoro: acustica a cattedrale, vocalizzazioni imponenti senza testo riconoscibile, riverberazione profonda a volume contenuto. Atmosfera di solennità e concentrazione.
Accessibile da: inizio della fase post-accademica (Esperto o Archivista in su).
Attività disponibili: pratica rituale (minigioco Labirinto dell'Equilibrio), cerimonie formali dell'accademia, interazione con Sevan Drath.
Note: il paesaggio sonoro della Sala Rituale è unico nel gioco. Il volume è deliberatamente contenuto per non compromettere la concentrazione. Accessibile anche di notte.

---

**Cortile e giardino**
Colore tematico: azzurro cielo.
Paesaggio sonoro: vento leggero, uccelli, passi su pietra, foglie.
Accessibile da: tutti i gradi.
Attività disponibili: socialità (effetto automatico), incontri informali con PNG, conversazioni spontanee.
Note: luogo principale per le interazioni sociali informali. Non ospita minigiochi né attività di ricerca strutturata. È uno dei pochi luoghi dove i PNG si trovano al di fuori dei loro ruoli istituzionali.

---

**Torre e Osservatorio**
Colore tematico: blu notte.
Paesaggio sonoro: vento alto e sostenuto, meccanismi di precisione, silenzio rarefatto.
Accessibile da: Esperto in su.
Attività disponibili: ricerca avanzata in Teoria Arcana e Scienze Naturali, osservazione astronomica, interazione con Edvar Sollen.
Note: luogo con forte connotazione contemplativa. Accessibile anche di notte.

---

**Archivio Riservato**
Colore tematico: giallo ocra.
Paesaggio sonoro: silenzio pesante, polvere, rara eco lontana. Atmosfera di isolamento e mistero trattenuto.
Accessibile da: Magister o Custode in su.
Attività disponibili: ricerca avanzata in tutte le discipline, accesso a testi rari, interazione con Serelith Vane in contesto riservato.
Note: il luogo più inaccessibile dell'accademia. L'accesso è uno dei traguardi più significativi della progressione. Accessibile anche di notte.

---

## Personaggi

Ogni personaggio ricorrente ha una scheda con i seguenti campi: nome, ruolo, grado, archetipo, relazione iniziale col protagonista, luogo principale, voicelines, note narrative.

La relazione tra il protagonista e ogni PNG è tracciata individualmente dal motore di gioco su una scala interna non visibile al giocatore. Cambia in base alle scelte del giocatore, agli eventi in corso nell'accademia e al tempo trascorso.

---

**Valdric Sonn**
Ruolo: Arcimago, capo dell'Accademia di Elenthyr.
Grado: Arcimago.
Archetipo: autorevole e perspicace. Non cerca rapporti personali ma osserva tutto.
Relazione iniziale: neutrale distante. Il protagonista è uno tra i tanti nuovi ingressi.
Luogo principale: non ha un luogo fisso accessibile al giocatore. Appare in occasione di cerimonie, eventi formali e momenti narrativi significativi.
Voicelines: cerimonie di inizio e fine semestre, promozioni di grado al livello Magister o Custode e superiori, eventi eccezionali.
Note narrative: proviene da origini modeste, fatto che non menziona mai ma che non nasconde. Ha costruito tutto sul merito. Quando parla col protagonista lascia sempre la sensazione di essere stati misurati con precisione. Il suo registro è sempre formale, anche nei rari momenti di calore. Presiede personalmente le cerimonie di ascensione al grado di Magister o Custode.

---

**Brennar Ostk**
Ruolo: Alto Maestro, gestione operativa dell'accademia.
Grado: Alto Maestro.
Archetipo: pragmatico e diretto. Poca pazienza per le sottigliezze, molta per i problemi concreti.
Relazione iniziale: neutrale funzionale. Tratta tutti con la stessa efficienza sbrigativa.
Luogo principale: aree amministrative, presente occasionalmente in qualsiasi luogo per questioni operative.
Voicelines: comunicazioni operative, inizio e fine semestre, eventi logistici.
Note narrative: si occupa di orari, risorse, accessi, dispute tra docenti. Non ha interesse per la politica interna. È la persona a cui rivolgersi per questioni pratiche. Membro del Senato Accademico.

---

**Livia Cauro**
Ruolo: Alto Maestro, relazioni esterne dell'accademia.
Grado: Alto Maestro.
Archetipo: elegante e strategica. Ogni parola è misurata, nulla è casuale.
Relazione iniziale: neutrale formale. Cortese con tutti per principio, calorosa con nessuno per abitudine.
Luogo principale: aree amministrative e ingresso dell'accademia. Presente durante visite esterne.
Voicelines: arrivo di figure esterne, eventi diplomatici, cerimonie con ospiti.
Note narrative: gestisce i rapporti con il mondo esterno. È lei che riceve Sigrid Vael. Ha una memoria prodigiosa e una capacità strategica che raramente mostra apertamente. Membro del Senato Accademico.

---

**Cornelia Vesti**
Ruolo: docente di Teoria Arcana.
Grado: Magister.
Archetipo: fredda e formale con chiunque. Non è crudeltà — è uno standard che non abbassa per nessuno.
Relazione iniziale: neutrale professionale. Il protagonista è un nuovo studente come tutti gli altri.
Luogo principale: aule e sale lezioni.
Voicelines: inizio e fine lezione, commento neutro durante esercitazioni.
Note narrative: ha scritto testi fondamentali del curriculum — il protagonista studia le sue parole prima ancora di incontrarla. Non cerca rapporti personali con gli studenti per principio. È temuta da tutti per una presenza che non ammette approssimazione. Il suo registro è sempre formale, anche fuori dall'aula.

---

**Pietro Vasso**
Ruolo: docente di Alchimia.
Grado: Adepto.
Archetipo: gioviale e ironico. Appassionato del suo lavoro in modo contagioso.
Relazione iniziale: aperta e disponibile. È tra i docenti più accessibili fin dal primo incontro.
Luogo principale: Laboratorio di Alchimia.
Voicelines: inizio e fine lezione, commento durante esperimenti, reazione a riuscita o fallimento di una pratica alchemica.
Note narrative: il suo entusiasmo per l'alchimia è genuino. Tende a parlare dei reagenti come se fossero personaggi con una loro personalità. Ricorda il nome degli studenti fin dalla prima settimana. Il suo registro è informale anche in contesti ufficiali.

---

**Sevan Drath**
Ruolo: docente di Rituali.
Grado: Alto Maestro.
Archetipo: misterioso e riservato. Presente senza essere accessibile.
Relazione iniziale: distante e impenetrabile. Non ostile — semplicemente altrove, anche quando è in stanza.
Luogo principale: Sala Rituale.
Voicelines: inizio e fine lezione rituale, rare osservazioni durante la pratica.
Note narrative: è il docente di grado più alto tra quelli che insegnano. Parla poco e solo quando necessario. Il suo passato è sconosciuto anche ai colleghi più anziani. Il suo registro è sempre misurato, quasi cerimoniale.

---

**Hilda Vorn**
Ruolo: docente di Incantamento.
Grado: Magister.
Archetipo: ambiziosa e calcolatrice. Cortese in superficie, strategica nella sostanza.
Relazione iniziale: formalmente cordiale. Valuta rapidamente l'utilità potenziale di ogni nuovo studente.
Luogo principale: Laboratorio di Incantamento.
Voicelines: inizio e fine lezione, commento durante la creazione di oggetti, osservazione sulla qualità del lavoro.
Note narrative: ha i propri obiettivi all'interno dell'accademia. Riconosce il talento e sa valorizzarlo quando le conviene. Il suo registro alterna calore strategico e freddezza professionale.

---

**Kael Dorne**
Ruolo: docente di Spellcasting.
Grado: Adepto.
Archetipo: energico e brillante. Una stella nascente che lo sa e non lo nasconde del tutto.
Relazione iniziale: informale e curiosa. Tende a trattare gli studenti quasi da pari.
Luogo principale: aule e sale lezioni.
Voicelines: inizio e fine lezione, reazione entusiasta a una spell riuscita, commento ironico su un errore.
Note narrative: è il docente più giovane dell'accademia. Ha una padronanza dello Spellcasting che va oltre il suo grado formale. Alcuni colleghi lo guardano con rispetto e diffidenza. Il suo registro è informale e diretto, con lampi di serietà quando necessario.

---

**Matteo Servi**
Ruolo: docente di Storia.
Grado: Archivista.
Archetipo: malinconico e riflessivo. Porta il peso della storia come se fosse personale.
Relazione iniziale: cordiale e mite. Accoglie i nuovi studenti con una gentilezza quieta.
Luogo principale: aule e sale lezioni, biblioteca.
Voicelines: inizio e fine lezione, commento durante la consultazione di testi storici, osservazione malinconica su eventi del passato.
Note narrative: ha sulla quarantina ma sembra più vecchio per come parla del passato. Ha un rapporto profondo con la biblioteca e con Serelith Vane. Il suo registro è sempre pacato, con una tendenza a concludere i discorsi con una domanda aperta.

---

**Maren Solde**
Ruolo: docente di Filosofia.
Grado: Archivista.
Archetipo: calorosa e disponibile. La più accessibile tra i docenti di erudizione.
Relazione iniziale: aperta e incoraggiante. Mette a proprio agio chiunque fin dal primo incontro.
Luogo principale: aule e sale lezioni, cortile e giardino.
Voicelines: inizio e fine lezione, domanda socratica durante una discussione, commento di incoraggiamento.
Note narrative: insegna filosofia come se fosse una conversazione in corso da secoli a cui tutti sono invitati. Non dà risposte — pone domande migliori. Frequenta il cortile al di fuori delle lezioni. Il suo registro è caldo e inclusivo.

---

**Edvar Sollen**
Ruolo: docente di Scienze Naturali.
Grado: Custode.
Archetipo: eccentrico e imprevedibile. La sua mente segue percorsi che gli altri faticano a seguire.
Relazione iniziale: distratta ma non irrispettosa. Tende a dimenticare i nomi ma ricorda ogni dettaglio scientifico.
Luogo principale: Torre e Osservatorio, aule e sale lezioni.
Voicelines: inizio e fine lezione, osservazione entusiasta su un fenomeno naturale, domanda apparentemente fuori contesto.
Note narrative: i suoi interessi spaziano dalla botanica all'astronomia alla mineralogia. Ha riempito la Torre di strumenti, campioni e appunti che solo lui sa interpretare. Il suo registro è discontinuo — passa da spiegazioni tecniche a digressioni filosofiche senza preavviso.

---

**Luca Ferri**
Ruolo: studente coetaneo.
Grado iniziale: Apprendista.
Archetipo: ambizioso e calcolatore, ma non privo di umanità.
Relazione iniziale: cordiale e valutativa.
Luogo principale: aule, biblioteca, laboratorio di alchimia.
Voicelines: commento competitivo dopo un esame, osservazione sul clima dell'accademia, proposta di collaborazione.
Note narrative: proviene da una famiglia con aspirazioni di ascesa sociale. Sa come muoversi negli ambienti formali. Il rapporto col protagonista può evolvere verso una rivalità rispettosa o un'alleanza pragmatica.

---

**Sylra Kend**
Ruolo: studente coetanea.
Grado iniziale: Novizio.
Archetipo: misteriosa e riservata. Osserva molto, parla poco.
Relazione iniziale: neutrale e distante.
Luogo principale: biblioteca, cortile.
Voicelines: osservazione inaspettatamente acuta, breve commento su un testo.
Note narrative: nessuno sa molto di lei. Sembra sempre sapere più di quanto lasci trasparire. Il suo rapporto con la biblioteca è quasi reverenziale. Il registro è minimale — poche parole, sempre precise.

---

**Britta Vorn**
Ruolo: studente coetanea.
Grado iniziale: Apprendista.
Archetipo: diretta e leale. Dice quello che pensa senza cattiveria.
Relazione iniziale: aperta e senza secondi fini.
Luogo principale: aule, laboratorio di incantamento, cortile.
Voicelines: commento franco dopo una lezione, offerta spontanea di aiuto, reazione onesta a una scelta del protagonista.
Note narrative: non ha legami di sangue con Hilda Vorn nonostante il cognome — coincidenza che genera occasionalmente situazioni imbarazzanti. È tra i coetanei più affidabili. Il suo registro è diretto e privo di ornamenti.

---

**Marco Alessi**
Ruolo: studente coetaneo.
Grado iniziale: Novizio.
Archetipo: gioviale e ironico. Alleggerisce qualsiasi situazione con una battuta.
Relazione iniziale: immediata e informale.
Luogo principale: aule, cortile.
Voicelines: battuta dopo un esame difficile, commento ironico su un docente, proposta di pausa.
Note narrative: la sua facilità sociale nasconde una disciplina nello studio che pochi sospettano. È la persona più facile da avvicinare tra i coetanei. Il registro è leggero e ironico, con momenti di serietà inaspettata.

---

**Edwyn Drael**
Ruolo: studente coetaneo.
Grado iniziale: Novizio.
Archetipo: malinconico e riflessivo. Porta con sé qualcosa di irrisolto.
Relazione iniziale: riservata ma non fredda.
Luogo principale: biblioteca, sala rituale, cortile.
Voicelines: osservazione pensierosa durante uno studio condiviso, domanda esistenziale, ringraziamento inaspettato.
Note narrative: sembra portare un peso che non nomina mai direttamente. Ha una sensibilità insolita per i rituali. Il rapporto col protagonista può diventare uno dei più profondi del gioco se coltivato con attenzione. Il registro è quieto e a volte frammentato.

---

**Valka Strenn**
Ruolo: studente coetanea.
Grado iniziale: Apprendista.
Archetipo: ambiziosa e calcolatrice, più esplicita di Luca Ferri nel mostrarlo.
Relazione iniziale: formalmente cortese, sostanzialmente competitiva.
Luogo principale: aule, laboratorio di alchimia, biblioteca.
Voicelines: commento sul proprio rendimento, osservazione sulle gerarchie tra studenti, proposta di competizione velata.
Note narrative: proviene da una famiglia con una lunga tradizione nell'alchimia. Considera questa eredità una responsabilità e una pressione. Il registro è preciso e controllato, raramente spontaneo.

---

**Chiara Motti**
Ruolo: studente coetanea.
Grado iniziale: Novizio.
Archetipo: calorosa e curiosa. Si entusiasma facilmente e lo dimostra senza imbarazzo.
Relazione iniziale: aperta e generosa.
Luogo principale: aule, biblioteca, cortile.
Voicelines: domanda entusiasta dopo una lezione, condivisione di una scoperta, invito a esplorare un argomento insieme.
Note narrative: ha una curiosità intellettuale che attraversa tutte le discipline senza fermarsi su nessuna. È la più aperta tra i coetanei. Il registro è caldo, veloce e ricco di domande.

---

**Serelith Vane**
Ruolo: bibliotecaria.
Grado: Custode.
Archetipo: misteriosa e riservata, con una profondità che emerge lentamente.
Relazione iniziale: formalmente cortese e professionale.
Luogo principale: biblioteca, archivio riservato.
Voicelines: accoglienza al primo ingresso in biblioteca, indicazione di un testo, avviso sull'accesso a sezioni riservate, rara osservazione personale su un volume.
Note narrative: conosce ogni testo della biblioteca. Ha un rapporto silenzioso ma evidente con Matteo Servi. L'accesso alle sezioni riservate passa sempre attraverso di lei. Il registro è preciso e controllato, con rare aperture che acquistano peso proprio per la loro rarità.

---

**Halvard Munk**
Ruolo: custode dell'accademia.
Grado: nessun grado accademico.
Archetipo: solido e radicato. Conosce ogni pietra dell'edificio meglio di chiunque altro.
Relazione iniziale: neutrale e pratica.
Luogo principale: presente in tutti i luoghi fisici, specialmente cortile e aree di passaggio.
Voicelines: indicazione pratica su un luogo, commento sull'accademia, rara osservazione sulla natura umana.
Note narrative: è nell'accademia da più anni di quasi tutti i docenti. Ha visto generazioni di studenti passare. Non è coinvolto nelle dinamiche accademiche ma le osserva con lucidità disincantata. Il suo registro è diretto, concreto, privo di ornamenti accademici.

---

**Tessaly Wren**
Ruolo: amministratrice dell'accademia.
Grado: nessun grado accademico.
Archetipo: precisa ed efficiente. Sa tutto di tutti dal punto di vista burocratico.
Relazione iniziale: professionale e neutra.
Luogo principale: aree amministrative, ingresso dell'accademia.
Voicelines: accoglienza al primo ingresso in accademia, comunicazione di un impegno calendarizzato, notifica di variazione di programma.
Note narrative: gestisce registri, accessi, calendari e comunicazioni formali. È la prima figura istituzionale che il protagonista incontra. Il suo registro è formale e preciso, con una cortesia professionale che non diventa mai calore.

---

**Dario Menci**
Ruolo: mercante esterno.
Grado: nessun grado accademico.
Archetipo: vivace e intraprendente. Sa vendere qualsiasi cosa, compresa la propria compagnia.
Relazione iniziale: immediatamente cordiale.
Luogo principale: ingresso dell'accademia e cortile durante le sue visite periodiche.
Voicelines: annuncio del suo arrivo, presentazione di materiali rari, commento sul mondo esterno.
Note narrative: porta notizie, materiali alchemici, testi rari e oggetti di provenienza varia. Le sue visite sono periodiche ma non regolari. Il registro è energico e persuasivo.

---

**Sigrid Vael**
Ruolo: emissaria esterna.
Grado: nessun grado accademico.
Archetipo: autorevole e misurata. Ogni parola ha un peso preciso.
Relazione iniziale: formalmente distante. Non è nell'accademia per il protagonista.
Luogo principale: ingresso dell'accademia, aree amministrative durante le visite.
Voicelines: arrivo formale, comunicazione di notizie dal mondo esterno, congedo ufficiale.
Note narrative: porta messaggi da istituzioni o figure esterne. Le sue visite segnalano sempre qualcosa di rilevante nel mondo esterno. Il suo registro è sempre formale e controllato.

---

**Aris Melk**
Ruolo: figura esterna dal ruolo ambiguo.
Grado: nessun grado accademico.
Archetipo: sfuggente e difficile da decifrare. Né ostile né rassicurante.
Relazione iniziale: curiosa e leggermente asimmetrica — sembra sapere qualcosa del protagonista che il protagonista non sa di lei.
Luogo principale: variabile — appare in contesti diversi senza una routine definita.
Voicelines: osservazione inaspettata, domanda che lascia a disagio, commento che acquisisce senso solo in retrospettiva.
Note narrative: il suo ruolo si chiarisce nel tempo. Claude Code non deve anticipare o rivelare la sua natura — ogni interazione deve essere coerente con il mistero che la circonda. Il registro è morbido ma sfuggente.

---

## Progressione e sistema di gradi

La crescita del protagonista non è mai rappresentata da numeri visibili. Emerge dal testo narrativo, dalle reazioni dei PNG, dall'accesso a nuovi luoghi e attività, e dalla qualità dei dialoghi disponibili.

**Aree di progressione**

*Ramo Arcana* — competenza nelle discipline magiche e pratiche: Teoria Arcana, Spellcasting, Rituali, Alchimia, Incantamento.

*Ramo Erudizione* — cultura accademica e intellettuale: Storia, Filosofia, Scienze Naturali, Letteratura.

*Asse Sociale* — carisma, diplomazia, capacità di lettura delle persone. Cresce attraverso le interazioni con i PNG, le scelte nei dialoghi e gli eventi sociali.

Ogni disciplina ha una progressione interna propria. Il grado del protagonista in ciascun ramo è determinato dalla disciplina più avanzata di quel ramo.

**Gerarchia dei gradi**

Gradi condivisi:
- Arcimago
- Alto Maestro

Ramo Arcana (dal più alto al più basso sotto Alto Maestro):
- Magister
- Adepto
- Esperto
- Apprendista
- Novizio

Ramo Erudizione (dal più alto al più basso sotto Alto Maestro):
- Custode
- Archivista
- Erudito
- Copista
- Allievo

Il protagonista inizia come Novizio nel ramo Arcana e Allievo nel ramo Erudizione.

**Avanzamento di grado**

Alcune promozioni sono formali e sancite dall'accademia con una cerimonia — in particolare il passaggio da Apprendista ad Esperto e da Copista a Erudito, che segnano la transizione alla fase post-accademica. Altre promozioni emergono naturalmente dal riconoscimento progressivo.

Ogni avanzamento di grado è sancito da una cerimonia formale. La cerimonia viene calendarizzata automaticamente nel primo slot mattutino libero successivo al raggiungimento del nuovo grado. Le cerimonie avvengono sempre di mattina. Le cerimonie di ascensione dei coetanei sono eventi obbligatori per il protagonista — i coetanei avanzano secondo pattern randomizzati, su discipline diverse e a ritmi diversi.

Durante la cerimonia, il docente competente per la disciplina declama un breve monologo formale, coerente con il suo archetipo. Le cerimonie di ascensione al grado di Magister o Custode sono presiedute dall'Arcimago Valdric Sonn in persona. Ogni docente e l'Arcimago hanno pool dedicati di monologhi cerimoniali in `narrative.js`, distinti per disciplina e per grado raggiunto.

La progressione può essere irreversibile: alcune scelte aprono percorsi e ne precludono altri.

**Transizione alla fase post-accademica**

Raggiunto il grado di Esperto nel ramo Arcana o Archivista nel ramo Erudizione, la struttura temporale cambia. I semestri con lezioni ed esami obbligatori lasciano il posto alle stagioni, con calendario molto più libero. Gli impegni obbligatori si limitano a cerimonie e eventi istituzionali. L'opzione Studio cambia significato.

**Visibilità della progressione**

Il grado attuale del protagonista non appare mai come statistica isolata. Emerge nel testo narrativo — un docente che cambia registro, una sezione della biblioteca che diventa accessibile, un PNG che chiede consiglio.

**Reputazione individuale**

La reputazione con ogni PNG è tracciata separatamente dal motore su una scala interna non visibile al giocatore. Cambia in base alle scelte nei dialoghi, al tono delle risposte, alle attività svolte, agli eventi in corso e al tempo trascorso. Influenza la disponibilità dei PNG, il tono dei dialoghi, l'accesso a informazioni e opportunità esclusive.

**Task assegnate dai PNG**

Le interazioni con docenti e coetanei possono generare task opzionali in cambio di vantaggi reputazionali e relazionali. Le task non sono mai obbligatorie.

*Task dei docenti* — più articolate e strutturate. Possono richiedere più passaggi, l'uso di più luoghi, o il completamento di un minigioco specifico. La ricompensa è proporzionalmente maggiore.

*Task dei coetanei* — più semplici e sbrigative. Richiedono generalmente un solo passaggio. Producono piccoli vantaggi sociali e reputazionali immediati.

Le task attive sono tracciate dal motore e hanno una scadenza narrativa implicita. Le task possono diventare argomento di conversazione con qualsiasi PNG, non solo con chi le ha assegnate o ricevute.

**Espedienti narrativi**

Gli eventi narrativi attivi influenzano il contenuto delle conversazioni per tutta la loro durata. Fonti degli espedienti narrativi: visite di Sigrid Vael (notizie dal mondo esterno), visite di Dario Menci (voci di mercato), cerimonie e eventi stagionali, cerimonie di ascensione, eventi interni all'accademia (incidenti, dispute, scoperte), decisioni del Senato Accademico, cambi di stagione, task assegnate.

Durata degli eventi:
- Evento minore (piccoli incidenti, cerimonie di ascensione, task): almeno 7 giorni.
- Evento rilevante (cerimonie istituzionali, arrivo di ambascerie, decisioni del Senato Accademico, dispute tra docenti): almeno 15 giorni.
- Evento maggiore (guerre, crisi esterne, litigi tra membri influenti, eventi misteriosi): fino a 30 giorni.

Gli eventi attivi si sovrappongono e si sommano. Il motore tiene traccia della durata residua di ogni evento.

**Il Senato Accademico**

Organo di governo dell'accademia, composto da Valdric Sonn, Brennar Ostk e Livia Cauro. Le sue decisioni sono eventi narrativi di media rilevanza — sempre vaghe e indirette, mai dettagliate. Il protagonista ne viene a conoscenza attraverso voci, commenti dei docenti o comunicazioni formali di Tessaly Wren.

---

## Minigiochi

I minigiochi sono componenti interattive integrate nel flusso di gioco in tre contesti: durante le lezioni nei primi due semestri in forma guidata e risk-free come tutorial mascherato, durante gli esami in forma completa come verifica delle competenze, e durante le attività di ricerca come meccanica principale. Non ogni attività nei luoghi richiede il completamento di un minigioco — molte interazioni producono testo narrativo e scelte di dialogo senza meccanica interattiva.

Tutti i minigiochi sono progettati come audio-first e aptici-first — completamente giocabili senza guardare lo schermo.

**Sistema di tentativi e rendimenti decrescenti**

Al primo tentativo — risultato ottimale, beneficio massimo.
Al secondo o terzo tentativo — risultato buono, beneficio ridotto.
Oltre il terzo tentativo — risultato accettabile, beneficio minimo.

Conseguenze del fallimento per grado:
- *Novizio/Allievo* — nessuna conseguenza meccanica. Le reazioni dei PNG variano: delusione, disapprovazione, sdegno, solidarietà o vicinanza.
- *Apprendista/Copista → Esperto/Erudito* — numero di fallimenti tollerati decrescente. Fallimenti ripetuti producono piccoli effetti negativi sulla reputazione.
- *Da Adepto/Archivista in su* — nessuna tolleranza. Il fallimento completo della task produce effetto negativo crescente sulla reputazione individuale.

**Difficoltà crescente**

Al crescere del grado nella disciplina corrispondente, i minigiochi diventano progressivamente più difficili. La difficoltà scala automaticamente.

---

**Memory delle Rune — Incantamento**

*Contesto narrativo:* riconoscere e abbinare coppie di rune attraverso la loro firma sonora e aptica. Competenza fondamentale dell'incantamento.

*Meccanica:* serie di elementi nascosti presentati uno alla volta, ciascuno con firma sonora e pattern aptico unici. Il giocatore abbina le coppie basandosi su ascolto e tatto. Coppia corretta: feedback positivo. Coppia errata: feedback negativo, elementi tornano nascosti.

*Difficoltà:* Novizio: 4 coppie, suoni molto distinti. Apprendista: 6 coppie, suoni mediamente distinti. Esperto: 8 coppie, suoni simili. Adepto e oltre: 10+ coppie, suoni molto simili, pattern aptici sottili.

*Feedback sonoro:* firma timbrica unica per ogni runa. Coppia confermata: accordo armonioso. Coppia errata: breve dissonanza.

*Feedback aptico:* impulso distinto per ogni selezione. Coppia confermata: trillo aptico soddisfacente. Coppia errata: vibrazione discontinua.

*VoiceOver:* ogni elemento etichettato con nome e stato (nascosta, rivelata, abbinata). Annuncio del risultato di ogni selezione.

---

**Minesweeper dei Reagenti — Alchimia**

*Contesto narrativo:* maneggiare, utilizzare e combinare ingredienti senza attivarne le proprietà pericolose. Logica deduttiva applicata alla pratica alchemica.

*Meccanica:* griglia di celle che rappresentano reagenti. Alcune celle contengono reagenti pericolosi. Ogni cella sicura esaminata rivela quante celle pericolose si trovano nelle celle adiacenti. Il giocatore identifica ed isola i reagenti pericolosi senza toccarli. Toccare una cella pericolosa fallisce il minigioco.

*Difficoltà:* Novizio: griglia piccola, pochi pericoli, distanze chiare. Apprendista: griglia media, pericoli più numerosi. Esperto: griglia più grande, pericoli ravvicinati. Adepto e oltre: griglia ampia, reagenti molto simili, margine minimo.

*Feedback sonoro:* cella sicura: suono cristallino. Numero di pericoli adiacenti: sequenza di impulsi sonori corrispondente. Cella pericolosa: suono di impatto basso e prolungato. Completamento: accordo soddisfacente.

*Feedback aptico:* cella sicura: impulso leggero. Numero di pericoli: serie di micro-impulsi ritmici. Cella pericolosa: vibrazione intensa e prolungata.

*Sbloccaggio Reagente:* alcune attività alchemiche avanzate richiedono la ricerca del punto di equilibrio chimico attraverso micro-vibrazioni aptiche crescenti. Impulso breve e secco indica posizionamento corretto. Vibrazione rauca indica errore imminente.

*VoiceOver:* ogni cella identificata da coordinate (es. "A1", "B3"). Annuncio del contenuto informativo di ogni cella esaminata.

---

**Labirinto dell'Equilibrio — Rituali**

*Contesto narrativo:* percorso mentale e spirituale verso l'equilibrio energetico richiesto da un rituale. Non uno spostamento fisico ma una navigazione tra stati di tensione e rilascio.

*Meccanica:* struttura logica a nodi che rappresentano fasi del rituale. Il giocatore sceglie una direzione o tensione da applicare e riceve feedback sonoro e aptico. Un segnale cresce in intensità avvicinandosi all'equilibrio. Il minigioco termina quando il giocatore raggiunge e mantiene l'equilibrio per un numero sufficiente di passaggi.

*Durata:* è il minigioco più lungo — coerente con la natura dei rituali.

*Difficoltà:* Novizio: struttura semplice, segnali molto chiari. Apprendista: struttura media, segnali meno immediati. Esperto: struttura complessa, nodi interdipendenti. Adepto e oltre: struttura ramificata, equilibri multipli simultanei.

*Feedback sonoro:* l'audio ambientale della Sala Rituale è parte integrante del minigioco. I segnali di avvicinamento si sovrappongono all'audio ambientale crescendo in intensità. Il raggiungimento dell'equilibrio produce una risoluzione armonica che si fonde con le vocalizzazioni.

*Feedback aptico:* è il minigioco con il feedback aptico più penetrante e continuo. Vibrazioni crescenti in frequenza e intensità avvicinandosi all'equilibrio. Mantenimento dell'equilibrio: pattern aptico regolare e sostenuto. Perdita dell'equilibrio: vibrazione irregolare e decrescente.

*VoiceOver:* ogni nodo etichettato con descrizione dello stato del rituale. Annuncio della direzione scelta e del feedback ricevuto.

---

**Mastermind delle Formule — Teoria Arcana**

*Contesto narrativo:* ricostruire la sequenza corretta dei simboli che compongono una formula arcana attraverso ragionamento logico e tentativi progressivi.

*Meccanica:* sequenza segreta di simboli in ordine preciso. Il giocatore propone una sequenza e riceve due tipi di feedback: quanti simboli sono corretti nella posizione giusta, e quanti sono corretti ma nella posizione sbagliata. Il giocatore affina progressivamente l'ipotesi entro un numero limitato di tentativi.

*Difficoltà:* Novizio: sequenze di 3 simboli, pool ridotto. Apprendista: 4 simboli, pool medio. Esperto: 5 simboli, pool ampio, simboli simili. Adepto e oltre: 6+ simboli, pool molto ampio, feedback parziale.

*Feedback sonoro:* ogni simbolo ha firma sonora distinta. Posizione corretta: suono preciso e risoluto. Simbolo corretto ma posizione sbagliata: suono incerto e sospeso. Completamento: sequenza armonica che rappresenta la formula attivata.

*Feedback aptico:* impulso netto per posizione corretta, impulso doppio per simbolo fuori posto.

*VoiceOver:* ogni simbolo identificato da nome descrittivo. Feedback di ogni tentativo letto in modo esteso ("tre simboli corretti nella posizione giusta, uno corretto nella posizione sbagliata").

---

**Rebus Accessibile — Erudizione**

*Contesto narrativo:* decodificare testi antichi, ricostruire termini perduti, identificare concetti attraverso descrizioni indirette. Competenza trasversale a tutte le discipline erudite.

*Meccanica:* serie di indizi in sequenza dal più generico al più specifico. Il giocatore identifica il termine o concetto corretto tra una serie di opzioni. Più indizi vengono ascoltati prima di rispondere, minore è il risultato finale.

*Varianti per disciplina:* Storia: eventi, figure storiche, istituzioni. Filosofia: sillogismi, paradossi, concetti astratti. Scienze Naturali: fenomeni, specie, proprietà di materiali. Letteratura: stili, riferimenti retorici, descrizioni di opere.

*Difficoltà:* Allievo: indizi molto espliciti, opzioni chiaramente distinte. Copista: indizi meno diretti. Erudito: indizi obliqui, opzioni quasi equivalenti. Archivista e oltre: indizi frammentari, conoscenza approfondita e trasversale richiesta.

*Quiz testuali:* in aggiunta al Rebus, le discipline erudite includono brevi quiz di comprensione testuale, logica e ragionamento con risposte multiple. Domande storiche per Storia, sillogismi per Filosofia, identificazione di proprietà per Scienze Naturali, completamento di testi per Letteratura.

*Feedback sonoro:* risposta corretta: suono sobrio e soddisfacente, coerente con il registro accademico. Risposta errata: suono neutro e riflessivo. Nessun suono da quiz televisivo.

*VoiceOver:* tutti gli indizi hanno trascrizione completa. Le opzioni includono il tono oltre al contenuto. Il numero di indizi già ascoltati è sempre comunicato.

---

**Meccanica di Spellcasting — Spellcasting**

*Contesto narrativo:* lanciare una spell richiede concentrazione, tempismo e precisione. Ogni spell ha una struttura ritmica di elementi energetici da attivare nel momento esatto.

*Meccanica:* ispirata alla meccanica dei forzieri magici di Kingdoms of Amalur: Reckoning. Una serie di elementi energetici appaiono in sequenza con ritmo proprio. Il giocatore interviene al momento esatto per ciascun elemento. La precisione complessiva determina la qualità della spell.

*Difficoltà:* Novizio: 2-3 elementi, ritmo lento, finestra ampia. Apprendista: 4 elementi, ritmo medio. Esperto: 5-6 elementi, ritmi diversi, finestre strette. Adepto e oltre: 7+ elementi, ritmi sovrapposti, finestre minime.

*Feedback sonoro:* ogni elemento ha firma sonora che cresce in intensità avvicinandosi al momento ottimale. Intervento corretto: suono netto e risoluto. Intervento fuori tempo: suono smorzato. Completamento: combinazione sonora che rappresenta la spell attivata.

*Feedback aptico:* vibrazione crescente che raggiunge il picco nel momento ottimale. Intervento corretto: impulso netto. Intervento fuori tempo: vibrazione smorzata e irregolare.

*VoiceOver:* ogni elemento annunciato con nome e stato. Il momento ottimale è comunicato da segnale sonoro distintivo. Istruzioni complete prima dell'avvio.

---

## Sistema audio

L'audio è una componente strutturale di Elenthyr, non un elemento decorativo. È organizzato in tre canali indipendenti e regolabili separatamente: musica tematica, audio ambientale, voci e voicelines.

**Inizializzazione**

Il contesto audio deve essere inizializzato esclusivamente in risposta diretta a un gesto esplicito dell'utente. Se sospeso, viene ripreso automaticamente al tocco successivo.

**Paesaggi sonori per luogo**

Ogni paesaggio sonoro è composto da due o tre varianti di loop leggermente diverse che si alternano in ordine non prevedibile. Le transizioni tra varianti avvengono con dissolvenza breve e impercettibile.

Aule e sale lezioni — voci distanti e sovrapposte, scricchiolio di legno, atmosfera formale e raccolta.
Biblioteca — silenzio pesante, sfoglio di carte, scricchiolio di penna, fuoco nel camino in lontananza.
Laboratorio di Alchimia — gorgoglio di bollitori, gocce, fiamme basse, vapori, tintinnio di vetro.
Laboratorio di Incantamento — ronzio magico basso e continuo, risonanza di metallo, tintinnio di cristalli.
Sala Rituale — acustica a cattedrale, vocalizzazioni imponenti senza testo riconoscibile, riverberazione profonda a volume contenuto.
Cortile e giardino — vento leggero, uccelli, passi su pietra, foglie.
Torre e Osservatorio — vento alto e sostenuto, meccanismi di precisione, silenzio rarefatto.
Archivio Riservato — silenzio pesante, polvere, rara eco lontana.

**Feedback sonori per le interazioni**

Ogni scelta del giocatore produce un feedback sonoro coerente con l'ambientazione — nessun suono stereotipato. I suoni di riuscita e fallimento sono sobri e tematici. Il silenzio è usato come scelta narrativa in certi momenti. Durante i minigiochi il canale audio ambientale rimane attivo a volume ridotto.

**Feedback aptico**

Riservato ai minigiochi di Alchimia, Incantamento, Rituali e Spellcasting. Ogni minigioco ha un vocabolario aptico proprio. Va testato esclusivamente su dispositivo fisico.

**Voicelines — trigger e struttura**

Ogni PNG principale ha un pool di voicelines pre-generate con voci distinte. Trigger attivi:
- Inizio lezione
- Fine lezione
- Approccio al PNG in un luogo
- Completamento di uno studio o ricerca
- Evento stagionale o cerimonia
- Cerimonia di ascensione (monologhi cerimoniali dei docenti e dell'Arcimago)

Ogni trigger ha almeno 5-6 varianti per PNG. Il motore evita ripetizioni ravvicinate.

Le voicelines sono puramente evocative — non veicolano informazioni necessarie al gioco e non hanno testo corrispondente a schermo. Si collocano in momenti in cui VoiceOver non è attivo.

**Gestione dei file audio**

I file audio esterni sono in formato compatibile con Safari iOS e inclusi nel service worker. I feedback sonori brevi sono generati sinteticamente via Web Audio API senza file esterni.

---

## Tono narrativo e scrittura

Tutti i testi narrativi di Elenthyr sono scritti da Claude Code seguendo le linee guida di questa sezione. La coerenza stilistica è prioritaria.

**Persona narrativa e tempo**

Seconda persona singolare, tempo presente. Il narratore si rivolge direttamente al protagonista.

**Stile della prosa**

Densa e letteraria, con descrizioni ricche e curate. Registro italiano colto con arcaismi selezionati per atmosfera — mai decorativi, sempre funzionali al senso. Arcaismi accettabili: "v'è", "dinnanzi", "sovente". Termini inglesi ammessi e non traducibili: Spell (femminile), Spellcasting, Skill.

**Il narratore**

Neutro e descrittivo. Non commenta, non giudica, non suggerisce. La voce emotiva emerge dai PNG, dal contesto e dall'atmosfera. Il narratore descrive ciò che il protagonista percepisce senza interpretarlo.

**Descrizioni multisensoriali**

Le descrizioni coinvolgono tutti i sensi. Profilo sensoriale dei luoghi principali:

Biblioteca — odore di carta antica e inchiostro, calore del camino, silenzio che ha peso fisico, superficie fredda dei tavoli di legno scuro.
Laboratorio di Alchimia — acre dei vapori, calore delle fiamme, superficie ruvida dei mortai, gorgoglio costante dei bollitori.
Sala Rituale — risonanza dell'aria, freschezza della pietra, sensazione di pressione alle orecchie, eco dei propri passi.
Torre e Osservatorio — vento che filtra dalle fessure, odore di metallo e polvere di stelle, freddo che sale dal basso.
Cortile — aria aperta, variabile con le stagioni, passi su pietra irregolare, suoni dell'accademia in lontananza.

**Registri emotivi**

Malinconia e nostalgia — testi legati alla storia dell'accademia, dialoghi di Matteo Servi, momenti di riflessione solitaria.
Meraviglia e stupore — primi contatti con la magia, scoperte in biblioteca, accesso a un nuovo luogo.
Tensione e peso delle scelte — situazioni in cui una risposta esclude le altre, esami, valutazioni formali.
Calore nelle relazioni personali — dialoghi con PNG amichevoli, momenti di connessione genuina con i coetanei.
Solennità nei momenti rituali e cerimoniali — cerimonie, Sala Rituale, promozioni di grado formali.

**Vocabolario tecnico per disciplina**

Spellcasting — flusso, canalizzazione, precisione del gesto arcano.
Rituali — equilibrio, risonanza, progressione cerimoniale.
Alchimia — reagenti, proprietà chimiche, trasformazioni della materia.
Incantamento — rune, glifi, trasmissione di proprietà negli oggetti.
Teoria Arcana — formule, principi fondamentali, termini astratti e teorici.
Storia — termini storiografici, riferimenti a epoche e figure del passato.
Filosofia — termini logici e metafisici, domande aperte, sillogismi.
Scienze Naturali — terminologia botanica, astronomica, mineralogica.
Letteratura — riferimenti retorici, stili, tradizioni narrative.

Alcuni termini arcani originali sono riservati agli elementi chiave del mondo di Elenthyr e vanno usati con coerenza assoluta. Questi termini verranno definiti e aggiunti al documento durante lo sviluppo.

**Lunghezza dei testi**

Descrizioni dei luoghi alla prima visita: le più lunghe. Alle visite successive si accorciano progressivamente. Opzioni di scelta: brevi per decisioni routinarie, elaborate fino a tre righe per scelte con peso narrativo significativo.

**Esempi di riferimento stilistico**

*Descrizione — primo ingresso in biblioteca:*
"La biblioteca dell'Accademia di Elenthyr si apre dinnanzi a te come una promessa antica. L'aria è densa di carta e inchiostro, calda per il fuoco che arde in fondo alla sala — un fuoco che sembra bruciare da sempre, indifferente alle stagioni. Gli scaffali salgono fino al soffitto a volta, stipati di volumi dalla costola consumata. Qualcuno ha studiato qui prima di te. Molti. I tavoli di legno scuro portano i segni di decenni di gomiti e candele. Serelith Vane ti osserva dall'altro capo della sala senza muoversi, con la pazienza di chi ha tutto il tempo del mondo."

*Descrizione — primo ingresso in Sala Rituale:*
"L'aria cambia prima ancora che tu attraversi la soglia — più densa, più quieta, come se il suono stesso esitasse a entrare. La Sala Rituale è vasta e fredda, costruita in pietra che non ha mai conosciuto il calore del sole. Le voci che senti non provengono da nessun luogo preciso: risuonano nelle pareti, nel pavimento, nell'aria stessa, come se l'edificio respirasse. Ti fermi un momento sulla soglia. Qui si lavora in silenzio — non per regola, ma per necessità."

*Opzione di scelta — tono formale:*
"Ringrazi il Magister per la sua spiegazione e prendi congedo con una formula di cortesia appropriata."

*Opzione di scelta — tono ironico:*
"Osservi che la teoria esposta dal Magister, per quanto elegante, sembra ignorare almeno tre eccezioni documentate."

*Opzione di scelta — tono amichevole:*
"Dici a Marco che hai capito poco ma che almeno siete nella stessa barca."

---

## Sistema temporale e calendario

**Unità di tempo**

- 1 settimana = 5 giorni
- 1 mese = 4 settimane = 20 giorni
- 1 stagione = 3 mesi = 60 giorni
- 1 semestre = 1 stagione = 60 giorni

**Struttura dell'anno**

L'anno è composto da quattro stagioni di 60 giorni ciascuna. Nella fase accademica, due stagioni consecutive costituiscono l'anno accademico attivo (S1 e S2). Le altre due stagioni sono periodi con struttura simile alla fase post-accademica — calendario libero con soli eventi occasionali. Le uniche interruzioni formali sono due pause di 10 giorni ciascuna: la pausa estiva (centrata sul solstizio d'estate) e la pausa invernale (centrata sul solstizio d'inverno). Durante le pause non ci sono lezioni né esami, ma ci sono eventi obbligatori — gala, celebrazioni di anniversari, cerimonie stagionali.

**Fase accademica**

Attiva dall'inizio del gioco fino al raggiungimento del grado di Esperto o Archivista. Ogni semestre ha lezioni con impegni obbligatori distribuiti negli slot della giornata, e una sessione finale di esami. Il cambio di semestre è marcato da una cerimonia istituzionale.

**Fase post-accademica**

Attiva da Esperto o Archivista in poi. Le stagioni hanno calendario libero. Gli impegni obbligatori si limitano a cerimonie istituzionali, eventi del Senato Accademico con effetti narrativi, e cerimonie di ascensione.

**Slot giornalieri**

Ogni giorno è diviso in sette slot fissi nell'ordine: Mattina · Tarda mattina · Pranzo · Primo pomeriggio · Tardo pomeriggio · Sera · Notte.

Lo slot notturno è giocabile attivamente solo una volta per settimana. Negli altri quattro giorni è automaticamente saltato.

**Stagioni e atmosfera narrativa**

Primavera — ripresa, apertura, nuovi ingressi, aria più leggera.
Estate — rallentamento, caldo, studio intenso, presenza ridotta di figure esterne.
Autunno — raccoglimento, preparazione, arrivo di nuovi studenti nella fase accademica, atmosfera più cupa.
Inverno — isolamento, interiorità, fuochi accesi, presenza più marcata degli spazi interni.

**Indicatore temporale permanente**

Fase accademica: "Autunno · Giorno 12 · S1". Fase post-accademica: "Autunno · Giorno 12". Formato fisso, presente in tutte le schermate.

---

## Appendice — Gli Scavi ⚠️

*Questa appendice è temporanea. Gli Scavi vanno rimossi in un commit dedicato prima della versione finale pubblica. Sono uno strumento di test attivo per tutta la fase di sviluppo e per tutti i commit intermedi.*

**Descrizione narrativa**

Gli Scavi sono un luogo leggendario di cui si mormora tra gli studenti dell'Accademia di Elenthyr — cunicoli sotterranei antichi, precedenti alla costruzione dell'accademia stessa, la cui esistenza non è mai confermata né smentita ufficialmente. Nessun docente ne parla apertamente. Nessun testo in biblioteca li menziona con precisione. Eppure il nome circola, passato sottovoce da una generazione di studenti all'altra.

**Accesso**

Visibili come luogo fin dall'inizio del gioco nella schermata di scelta del luogo. Nessun grado minimo, nessuna chiave, nessun prerequisito.

**Funzione di test**

Gli Scavi contengono una schermata dedicata al test di tutte le meccaniche di gioco:

- Tutti i minigiochi in tutte le difficoltà disponibili, selezionabili liberamente senza prerequisiti.
- Simulazione manuale del grado del protagonista in entrambi i rami.
- Simulazione manuale degli eventi narrativi di qualsiasi rilevanza.
- Simulazione manuale delle cerimonie di ascensione per qualsiasi grado e PNG.
- Test dei paesaggi sonori di tutti i luoghi con tutte le varianti di loop.
- Test delle voicelines di ogni PNG per ogni trigger.
- Test del feedback aptico di tutti i minigiochi in isolamento.
- Navigazione di tutte le schermate del gioco in qualsiasi stato.

**Paesaggio sonoro**

Silenzio profondo, gocce d'acqua lontane, eco ovattata.

**Colore tematico**

Grigio pietra — neutro e distinto da tutti gli altri luoghi.

**Nota tecnica**

La schermata di test è implementata in `scavi-test.js`, separato dagli altri file. Non interagisce con il salvataggio reale. Tutte le operazioni di test sono isolate e non producono effetti permanenti sullo stato di gioco.

Rimozione dalla versione finale: eliminare `scavi-test.js`, rimuovere il riferimento agli Scavi in `data.js`, rimuovere il riferimento in `service-worker.js`. Nessun altro file va modificato.
