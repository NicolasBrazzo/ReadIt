import { createContext, useContext, useState } from "react";
import api from "../api/client"; // ✅ USA L'ISTANZA API
import { useAuth } from "./AuthProvider";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("in_progress");
  const { user } = useAuth();

  // GET /books - Carica tutti i libri
  const fetchBooks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await api.get("/books"); // ✅ RIMOSSO withCredentials
      console.log("res", res);
      setBooks(res.data.books);
      setCurrentView("all");
      return { ok: true };
    } catch (err) {
      console.error("Fetch books error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    } finally {
      setLoading(false);
    }
  };

  // GET /books/finished - Carica tutti i libri Finiti
  const fetchFinishedBooks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await api.get("/books/finished"); // ✅ RIMOSSO withCredentials
      setBooks(res.data.books);
      setCurrentView("finished");
      return { ok: true };
    } catch (err) {
      console.error("Fetch books error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    } finally {
      setLoading(false);
    }
  };

  // GET /books/in_progress - Carica tutti i libri in progress
  const fetchNotFinishedBooks = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await api.get("/books/in_progress"); // ✅ RIMOSSO withCredentials
      setBooks(res.data.books);
      setCurrentView("in_progress");
      return { ok: true };
    } catch (err) {
      console.error("Fetch books error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    } finally {
      setLoading(false);
    }
  };

  // Funzione helper per ricaricare la vista corrente
  const refreshCurrentView = async () => {
    switch (currentView) {
      case "all":
        await fetchBooks();
        break;
      case "finished":
        await fetchFinishedBooks();
        break;
      case "in_progress":
        await fetchNotFinishedBooks();
        break;
      default:
        await fetchNotFinishedBooks();
    }
  };

  // POST /books - Crea nuovo libro
  const createBook = async (bookData) => {
    try {
      const res = await api.post("/books", bookData); // ✅ RIMOSSO withCredentials

      // Ricarica la vista corrente dopo aver creato
      await refreshCurrentView();

      return { ok: true, book: res.data.book };
    } catch (err) {
      console.error("Create book error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // PUT /books/:id - Aggiorna libro completo
  const updateBook = async (bookId, bookData) => {
    try {
      await api.put(`/books/${bookId}`, bookData); // ✅ RIMOSSO withCredentials

      // Ricarica la vista corrente per ottenere i dati aggiornati dal server
      await refreshCurrentView();

      return { ok: true };
    } catch (err) {
      console.error("Update book error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // PATCH /books/:id/progress - Aggiorna solo progresso
  const updateProgress = async (bookId, currentPage) => {
    try {
      await api.patch(
        `/books/${bookId}/progress`,
        { currentPage }
      ); // ✅ RIMOSSO withCredentials

      // Ricarica la vista corrente per mantenere sincronizzato
      await refreshCurrentView();

      return { ok: true };
    } catch (err) {
      console.error("Update progress error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // DELETE /books/:id - Elimina libro
  const deleteBook = async (bookId) => {
    try {
      await api.delete(`/books/${bookId}`); // ✅ RIMOSSO withCredentials

      // Rimuovi dallo stato locale
      setBooks(books.filter((book) => book.id !== bookId));

      return { ok: true };
    } catch (err) {
      console.error("Delete book error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // Calcola percentuale di lettura - USA SNAKE_CASE
  const getProgress = (book) => {
    if (!book.total_pages) return 0;
    return Math.round((book.current_page / book.total_pages) * 100);
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        fetchBooks,
        fetchFinishedBooks,
        fetchNotFinishedBooks,
        createBook,
        updateBook,
        updateProgress,
        deleteBook,
        getProgress,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within BooksProvider");
  }
  return context;
}