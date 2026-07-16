# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ReadIt** is a book-tracking web app that encourages reading through social engagement. Users can track books they're reading or have finished, update progress, and share their activity.

- **Author**: Nicolas Brazzo
- **Deployment**: Frontend on Vercel, Backend hosted separately

## Repository Structure

```
ReadIt.vercel.app/
├── FrontEnd/    # React 19 + Vite + TailwindCSS v4
└── BackEnd/     # Node.js + Express + Supabase (PostgreSQL)
```

## Commands

### Frontend (`FrontEnd/`)
```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

### Backend (`BackEnd/`)
```bash
npm run dev      # nodemon dev server (localhost:5550)
npm start        # Production server
```

## Architecture

### Frontend

**State Management**: React Context API for global client state (no Redux/Zustand); TanStack Query for server state.
- `AuthProvider` (`context/`) — user auth state, login/logout/register
- Books data (list views + stats) is server state managed by TanStack Query, not Context — see `queries/books.queries.js` (query key factory + `useQuery` hooks, keyed per view: `all`/`finished`/`in_progress`/`stats`) and `queries/books.mutations.js` (`useMutation` hooks for create/update/progress/favorite/delete, with cache invalidation). Client-only UI state (filters, favorites-only toggle) lives locally in `pages/Dashboard.jsx`. `QueryClient` is instantiated in `api/queryClient.js` and provided in `main.jsx`.

**API Client**: Single Axios instance in `api/client.js` with a request interceptor that automatically attaches the JWT Bearer token from localStorage to all requests. Used both directly by `AuthProvider` and as the fetcher inside TanStack Query's `queryFn`/`mutationFn`.

**Routing** (`App.jsx`): `BrowserRouter` with a `PrivateRoute` wrapper guarding `/dashboard`. All unknown routes redirect to `/`.

**Animations**: GSAP + `@gsap/react` for UI animations, via custom hooks in `hooks/`.

### Backend

**Pattern**: MVC-like — Routes → Controllers → Models → Supabase.

**Auth**: JWT (7-day expiry) returned to frontend, stored in localStorage. The auth middleware (`middleware/auth.js`) validates the token on all `/books/*` routes and protected auth routes (`/me`, `/logout`).

**Database**: Supabase PostgreSQL. Models in `models/` act as the data access layer; controllers in `controllers/` handle business logic.

**API Routes**:
- `POST /register`, `POST /login`, `GET /me`, `POST /logout`
- `GET /books`, `POST /books`, `PUT /books/:id`, `DELETE /books/:id`
- `GET /books/in_progress`, `GET /books/finished`, `PATCH /books/:id/progress`

### Environment Variables

**Frontend** (`.env` in `FrontEnd/`):
- `VITE_API_URL` — backend base URL

**Backend** (`.env` in `BackEnd/`):
- `SUPABASE_URL`, `SUPABASE_KEY` — Supabase project credentials
- `PORT` — defaults to 5550

### Deployment

- Frontend: Vercel (`FrontEnd/vercel.json`) — SPA rewrites all paths to `index.html`, output from `dist/`
- CORS is configured in `BackEnd/server.js` to allow `localhost:5173` (dev) and the Vercel production URL
