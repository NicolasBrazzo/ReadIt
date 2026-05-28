# TASKS.md — ReadIt MVP da Demo

> Set minimo per avere un prototipo presentabile a un recruiter:
> (1) funzionale al 100% senza bug visibili, (2) curato in demo, (3) pulito a una lettura del codice.
> Tutto il resto è rimandato (vedi *Out of scope*).

---

## UX — primo impatto della demo

- [x] **Sostituire `alert()` / `confirm()` con toast** (es. `react-hot-toast`)
  - File: `FrontEnd/src/pages/Dashboard.jsx` (righe 75, 80, 83)
  - I dialoghi nativi del browser fanno sembrare l'app amatoriale.

- [x] **Loading state sui bottoni Dashboard** (`+1 pagina`, `Elimina`, `Favoriti`)
  - File: `FrontEnd/src/pages/Dashboard.jsx`
  - Evita doppi click → richieste duplicate e mostra reattività.

- [ ] **Toast di conferma su mutazioni** (delete, update progress, toggle favorito)
  - File: `FrontEnd/src/pages/Dashboard.jsx`, `FrontEnd/src/context/BooksProvider.jsx`
  - Feedback positivo per ogni azione utente.

- [ ] **Error Boundary in `App.jsx`**
  - File: `FrontEnd/src/App.jsx`
  - Un crash random durante la demo non deve produrre schermata bianca.

- [ ] **Allineare lo stile di Profile.jsx alla Dashboard refactored**
  - File: `FrontEnd/src/pages/Profile.jsx`
  - Usa ancora il vecchio stile (border-3); incoerenza visiva evidente tra pagine.

---

## Feature core per dirsi "completo"

- [ ] **Stats nella Dashboard** — totale libri, pagine lette, libro più avanzato
  - File: `FrontEnd/src/pages/Dashboard.jsx`
  - Trasforma la lista in una vera app di tracking.

- [ ] **Rating 1–5 ⭐ + campo Note dopo "finito"**
  - File: backend (nuovi campi + endpoint), `FrontEnd/src/pages/Dashboard.jsx`
  - Al momento "finire un libro" non sblocca nulla, l'engagement crolla.

- [ ] **Ricerca per titolo + ordinamento card** (per progresso / titolo / data aggiunta)
  - File: `FrontEnd/src/pages/Dashboard.jsx`
  - Già esiste il filtro per autore — completare il pattern UX.

---

## Sicurezza minima (controllo recruiter sul codice)

- [ ] **Usare la Supabase Service Role Key nel backend** (non la publishable key)
  - File: `BackEnd/config/db_connection.js`, `BackEnd/.env`
  - Errore classico che un revisore senior nota in 30 secondi.

- [ ] **Aggiungere `rel="noopener noreferrer"` a tutti i `target="_blank"`**
  - File: `FrontEnd/src/components/Footer.jsx`
  - Quick win, previene tabnabbing, dimostra attenzione ai dettagli.

- [ ] **Validare l'URL avatar** (rifiutare protocolli `javascript:` ecc.)
  - File: `BackEnd/controllers/auth.controller.js`, `FrontEnd/src/pages/Profile.jsx`
  - XSS prevention basilare su un campo user-controlled.

---

## Cleanup repo (per chi clona il progetto)

- [ ] **Creare `BackEnd/.env.example`** con tutti i campi richiesti
  - Contenuto: `PORT`, `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV`
  - Un recruiter che prova a far girare il progetto in locale deve sapere cosa configurare.

- [ ] **Rimuovere dipendenze inutilizzate `mysql2` e `sql2`**
  - File: `BackEnd/package.json`
  - Il progetto usa Supabase; chi apre il `package.json` si chiede perché ci sono driver MySQL.

- [ ] **Spostare il filtro `in_progress` dal JS al DB**
  - File: `BackEnd/models/books.model.js` (`getNotFinishedBooksByUserId`)
  - Ora carica tutti i libri e poi filtra in JavaScript — pattern visibile a un reviewer senior. Sostituire con query Supabase con condizione `current_page < total_pages`.

---

## Out of scope per il prototipo (post-demo)

Volontariamente esclusi per non gonfiare lo scope dell'MVP:

- **Test & qualità**: test unitari (Jest/Vitest/RTL), TypeScript migration, OpenAPI/Swagger, logging strutturato (Pino/Winston), graceful shutdown, skeleton loader, ARIA avanzate.
- **Auth avanzata**: refresh token, JWT blacklist, migrazione a httpOnly cookie, password reset via email, verifica email, GDPR delete account.
- **Hardening**: rate limiting, Helmet headers, health check con probe DB, standardizzazione status code.
- **Performance**: paginazione (BE + FE), AbortController, debounce filtri, timeout Axios.
- **Refactoring**: DRY del BooksProvider, estrazione validators, refactor `getMe`, costanti per view state.
- **Feature aggiuntive**: lista "Want to Read", reading streak, stima completamento, upload avatar reale (Supabase Storage), export CSV/PDF, profilo pubblico condivisibile.
