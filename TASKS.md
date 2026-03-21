# TASKS.md — ReadIt Technical Debt & Improvements

> Generato il 2026-03-20 tramite scansione approfondita del progetto.
> Organizzato per priorità e area. Ogni task include file coinvolti e motivazione.

---

## CRITICO

- [ ] **[SEC-03] Usare la Supabase Service Role Key nel backend (non la publishable key)**
  - File: `BackEnd/config/db_connection.js`, `BackEnd/.env`
  - Motivo: La chiave publishable è pensata per il frontend; lato server va usata la service role key per operazioni privilegiate.

- [ ] **[BUG-02] Correggere il bottone CTA nella Home — onClick non fa nulla**
  - File: `FrontEnd/src/pages/Home.jsx` (riga 56)
  - Motivo: Il handler contiene `window.location.href` senza assegnazione o navigazione. Il bottone è visivamente cliccabile ma non funziona.

---

## ALTA PRIORITÀ

### Sicurezza Backend

- [ ] **[SEC-04] Aggiungere rate limiting sugli endpoint di autenticazione**
  - File: `BackEnd/server.js`, `BackEnd/routes/auth.routes.js`
  - Libreria consigliata: `express-rate-limit`
  - Motivo: Senza rate limiting, `/login` e `/register` sono vulnerabili ad attacchi brute-force.
  - Esempio: max 10 tentativi / 15 minuti per IP sulle rotte auth.

- [ ] **[SEC-05] Aggiungere security headers con Helmet**
  - File: `BackEnd/server.js`
  - Libreria: `helmet`
  - Motivo: Mancano header come `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Content-Security-Policy`.

- [ ] **[SEC-06] Invalidare il JWT al logout (token blacklist o short-lived tokens)**
  - File: `BackEnd/controllers/auth.controller.js` (logout), `BackEnd/config/jwt.js`
  - Motivo: Attualmente il logout cancella solo il cookie, ma il token JWT rimane valido fino alla scadenza (7 giorni). Un token rubato rimane usabile.
  - Soluzione a breve termine: ridurre la durata a 1 ora + refresh token. Soluzione avanzata: blacklist in Redis/DB.

- [ ] **[SEC-07] Aggiungere link esterni con `rel="noopener noreferrer"`**
  - File: `FrontEnd/src/components/Footer.jsx`
  - Motivo: `target="_blank"` senza `rel` espone al tabnabbing attack.

### Performance Backend

- [ ] **[PERF-01] Spostare il filtro `in_progress` dal JavaScript al database**
  - File: `BackEnd/models/books.model.js` (funzione `getNotFinishedBooksByUserId`)
  - Motivo: La funzione recupera TUTTI i libri dell'utente e poi filtra in JS. Con molti libri causa N+1 e alto uso di memoria.
  - Fix: Usare Supabase `.filter()` o una query con condizione `current_page < total_pages`.

- [ ] **[PERF-02] Aggiungere paginazione alle GET list (backend)**
  - File: `BackEnd/routes/books.routes.js`, `BackEnd/controllers/books.controller.js`, `BackEnd/models/books.model.js`
  - Endpoint coinvolti: `GET /books`, `GET /books/finished`, `GET /books/in_progress`, `GET /books/favorites`
  - Motivo: Senza paginazione, con centinaia di libri si scaricano tutti i record ad ogni richiesta.

### UX Frontend

- [ ] **[UX-01] Sostituire `alert()` e `confirm()` nativi con modal/toast custom**
  - File: `FrontEnd/src/pages/Dashboard.jsx` (righe 75, 80, 83)
  - Motivo: I dialoghi browser bloccano l'UI intera, non sono stilizzabili e danno UX scadente.

- [ ] **[UX-02] Aggiungere loading state sui bottoni durante le operazioni API**
  - File: `FrontEnd/src/pages/Dashboard.jsx` (bottoni "+1 pagina", "Elimina", "Favoriti")
  - Motivo: Senza stato di caricamento, l'utente può cliccare più volte e inviare richieste duplicate.

- [ ] **[UX-03] Aggiungere feedback di successo per mutazioni (toast notification)**
  - File: `FrontEnd/src/pages/Dashboard.jsx`, `FrontEnd/src/context/BooksProvider.jsx`
  - Operazioni: delete, update progress, toggle favorito
  - Motivo: L'utente non riceve conferma visiva che l'azione è andata a buon fine.

- [ ] **[UX-04] Aggiungere Error Boundary in App.jsx**
  - File: `FrontEnd/src/App.jsx`
  - Motivo: Senza Error Boundary, un crash in qualsiasi componente rompe l'intera applicazione senza fallback.

---

## MEDIA PRIORITÀ

### Sicurezza Frontend

- [ ] **[SEC-08] Valutare migrazione da localStorage a httpOnly cookie per il JWT**
  - File: `FrontEnd/src/api/client.js`, `FrontEnd/src/context/AuthProvider.jsx`, `BackEnd/config/jwt.js`
  - Motivo: localStorage è vulnerabile a XSS. Il backend ha già la configurazione per i cookie (`COOKIE_OPTIONS` in `jwt.js`) ma non viene usata.
  - Nota: richiede anche implementare CSRF protection.

- [ ] **[SEC-09] Validare/sanitizzare l'URL dell'avatar**
  - File: `BackEnd/controllers/auth.controller.js`, `FrontEnd/src/pages/Profile.jsx`
  - Motivo: Avatar URL accettata senza validazione. Un URL con protocollo `javascript:` potrebbe causare XSS.

### Backend

- [ ] **[BE-01] Aggiungere `.env.example` con tutti i campi richiesti**
  - File: `BackEnd/.env.example` (da creare)
  - Contenuto: `PORT`, `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV`

- [ ] **[BE-02] Rimuovere dipendenze inutilizzate: `mysql2` e `sql2`**
  - File: `BackEnd/package.json`
  - Motivo: Il progetto usa Supabase, non MySQL. Queste dipendenze aumentano il bundle e la superficie di attacco.

- [ ] **[BE-03] Migliorare l'health check per verificare la connessione al DB**
  - File: `BackEnd/server.js`
  - Motivo: L'endpoint `/health` restituisce `{ status: "ok" }` anche se il database è irraggiungibile.

- [ ] **[BE-04] Standardizzare gli HTTP status code nelle risposte**
  - File: `BackEnd/controllers/auth.controller.js`, `BackEnd/controllers/books.controller.js`
  - Esempi: "utente non trovato" dovrebbe essere 404, errori di validazione 422, creazione riuscita 201.

- [ ] **[BE-05] Eliminare logica duplicata di validazione — estrarre in `validators.js`**
  - File: `BackEnd/controllers/auth.controller.js`
  - Motivo: La validazione della password e le conversioni stringa→numero sono ripetute in più punti.

- [ ] **[BE-06] Refactoring `getMe` — rimuovere parsing manuale del token (già fatto dall'auth middleware)**
  - File: `BackEnd/controllers/auth.controller.js` (funzione `getMe`)
  - Motivo: La funzione ripete la logica di verifica JWT invece di usare `req.user` già popolato dal middleware.

### Frontend

- [ ] **[FE-01] Aggiungere timeout alle richieste Axios**
  - File: `FrontEnd/src/api/client.js`
  - Motivo: Senza timeout le richieste possono restare pending indefinitamente.

- [ ] **[FE-02] Aggiungere cancellazione richieste Axios con AbortController**
  - File: `FrontEnd/src/api/client.js`, `FrontEnd/src/context/BooksProvider.jsx`
  - Motivo: Se l'utente naviga via durante un fetch, il componente viene aggiornato anche se smontato (memory leak / warning React).

- [ ] **[FE-03] Aggiungere debounce sul filtro per autore in Dashboard**
  - File: `FrontEnd/src/pages/Dashboard.jsx`
  - Motivo: Il filtro ricalcola ad ogni keystroke causando re-render non necessari.

- [ ] **[FE-04] Refactoring BooksProvider — DRY le funzioni di fetch duplicate**
  - File: `FrontEnd/src/context/BooksProvider.jsx`
  - Motivo: `fetchBooks`, `fetchFinishedBooks`, `fetchNotFinishedBooks` hanno lo stesso pattern di error handling ripetuto 3 volte.

- [ ] **[FE-05] Rimuovere o implementare TypeScript (ora installato ma non usato)**
  - File: `FrontEnd/package.json`
  - Motivo: TypeScript è listato come devDependency ma il progetto usa `.jsx` senza tsconfig. Va scelto: migrare a TS o rimuovere la dipendenza.

- [ ] **[FE-06] Aggiungere paginazione nel rendering dei libri (frontend)**
  - File: `FrontEnd/src/pages/Dashboard.jsx`
  - Motivo: Tutti i libri vengono renderizzati in una sola lista. Con molti libri degrada le performance.

- [ ] **[FE-07] Aggiungere costanti per i view state invece di magic strings**
  - File: `FrontEnd/src/context/BooksProvider.jsx`
  - Motivo: "all", "finished", "in_progress" sono hardcoded in più posti. Un typo causa bug silenziosi.

---

## BASSA PRIORITÀ

### Feature mancanti

- [ ] **[FEAT-01] Implementare password reset via email**
  - File: Backend — nuovi endpoint `/forgot-password`, `/reset-password/:token`
  - Motivo: Gli utenti non possono recuperare l'accesso se dimenticano la password.

- [ ] **[FEAT-02] Implementare verifica email alla registrazione**
  - File: `BackEnd/controllers/auth.controller.js`
  - Motivo: Chiunque può registrarsi con email false. Impedisce spam e garantisce contatti reali.

- [ ] **[FEAT-03] Implementare eliminazione account (richiesto da GDPR)**
  - File: Backend — nuovo endpoint `DELETE /profile`
  - Motivo: Gli utenti devono poter cancellare i propri dati. Obbligo GDPR per utenti EU.

- [ ] **[FEAT-04] Implementare refresh token per JWT**
  - File: `BackEnd/config/jwt.js`, `BackEnd/controllers/auth.controller.js`
  - Motivo: Access token con lunga durata (7 giorni) aumenta il rischio. Short-lived token + refresh token è lo standard.

### Qualità codice

- [ ] **[QA-01] Aggiungere test unitari e di integrazione (backend)**
  - Stack consigliato: Jest + Supertest
  - Copertura minima: controllers, models, middleware auth
  - Motivo: Zero test significa alto rischio di regressioni a ogni modifica.

- [ ] **[QA-02] Aggiungere test per i componenti React (frontend)**
  - Stack consigliato: Vitest + React Testing Library
  - Priorità: AuthProvider, BooksProvider, AddBookForm, Dashboard

- [ ] **[QA-03] Aggiungere ARIA labels e migliorare l'accessibilità**
  - File: `FrontEnd/src/components/AddBookForm.jsx`, `FrontEnd/src/components/Navbar.jsx`, `FrontEnd/src/pages/Dashboard.jsx`
  - Motivo: Mancano label su input, aria-label su bottoni icona, focus management nei modal.

- [ ] **[QA-04] Aggiungere skeleton loader al posto di testi "Caricamento..."**
  - File: `FrontEnd/src/pages/Dashboard.jsx` (riga 69)
  - Motivo: Il testo "Caricamento libri..." non ha stile né animazione. Un skeleton migliora la perceived performance.

- [ ] **[QA-05] Aggiungere graceful shutdown al server Node**
  - File: `BackEnd/server.js`
  - Motivo: Senza gestione dei segnali `SIGTERM`/`SIGINT`, le connessioni aperte vengono troncate bruscamente al deploy.

- [ ] **[QA-06] Aggiungere logging strutturato (Winston o Pino)**
  - File: `BackEnd/` (tutti i controller)
  - Motivo: I log attuali sono `console.log`/`console.error` non strutturati. In produzione è difficile filtrare e tracciare errori.

- [ ] **[QA-07] Aggiungere documentazione API (OpenAPI/Swagger o Postman collection)**
  - Motivo: Nessuna documentazione degli endpoint rende difficile il test e l'integrazione.

---

## Riepilogo conteggio

| Priorità  | Totale |
|-----------|--------|
| Critico   | 5      |
| Alta      | 8      |
| Media     | 13     |
| Bassa     | 10     |
| **TOT**   | **36** |
