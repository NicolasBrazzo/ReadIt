import { createContext, useContext, useState } from "react";
import api from "../api/client";
import { useAuth } from "./AuthProvider";

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("in_progress");
  const { user, loading: authLoading } = useAuth();

  // Filtri
  const [filterGenre, setFilterGenre] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // GET /books - Carica tutti i libri
  const fetchBooks = async () => {
    if (!user || authLoading) return;

    setLoading(true);
    try {
      const res = await api.get("/books");
      setBooks(res.data.books);
      setCurrentView("all");
      return { ok: true };
    } catch (err) {
      console.error("Fetch books error:", err);
      if (err.response?.status === 401) {
        return { ok: false, message: "Not authenticated" };
      }
      return { ok: false, message: err.response?.data?.error || err.message };
    } finally {
      setLoading(false);
    }
  };
  // GET /books/finished - Carica tutti i libri Finiti
  const fetchFinishedBooks = async () => {
    if (!user || authLoading) return;

    setLoading(true);
    try {
      const res = await api.get("/books/finished");
      setBooks(res.data.books);
      setCurrentView("finished");
      return { ok: true };
    } catch (err) {
      console.error("Fetch books error:", err);
      if (err.response?.status === 401) {
        return { ok: false, message: "Not authenticated" };
      }
      return { ok: false, message: err.response?.data?.error || err.message };
    } finally {
      setLoading(false);
    }
  };
  // GET /books/in_progress - Carica tutti i libri in progress
  const fetchNotFinishedBooks = async () => {
    if (!user || authLoading) return;

    setLoading(true);
    try {
      const res = await api.get("/books/in_progress");
      setBooks(res.data.books);
      setCurrentView("in_progress");
      return { ok: true };
    } catch (err) {
      console.error("Fetch books error:", err);
      if (err.response?.status === 401) {
        return { ok: false, message: "Not authenticated" };
      }
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
      const res = await api.post("/books", bookData);
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
      await api.put(`/books/${bookId}`, bookData);
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
      await api.patch(`/books/${bookId}/progress`, { currentPage });
      await refreshCurrentView();
      return { ok: true };
    } catch (err) {
      console.error("Update progress error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // PATCH /books/:id/favorite - Toggle preferito
  const toggleBookFavorite = async (bookId, isFavorite) => {
    try {
      const res = await api.patch(`/books/${bookId}/favorite`, { is_favorite: isFavorite });
      setBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, is_favorite: isFavorite } : b))
      );
      return { ok: true, book: res.data.book };
    } catch (err) {
      console.error("Toggle favorite error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // DELETE /books/:id - Elimina libro
  const deleteBook = async (bookId) => {
    try {
      await api.delete(`/books/${bookId}`);
      setBooks(books.filter((book) => book.id !== bookId));
      return { ok: true };
    } catch (err) {
      console.error("Delete book error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // Calcola percentuale di lettura
  const getProgress = (book) => {
    if (!book.total_pages) return 0;
    return Math.round((book.current_page / book.total_pages) * 100);
  };

  // Libri filtrati (client-side)
  const filteredBooks = books.filter((book) => {
    if (showOnlyFavorites && !book.is_favorite) return false;
    if (filterGenre && book.genre !== filterGenre) return false;
    if (filterAuthor && !book.author.toLowerCase().includes(filterAuthor.toLowerCase())) return false;
    return true;
  });

  const resetFilters = () => {
    setFilterGenre("");
    setFilterAuthor("");
    setShowOnlyFavorites(false);
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        filteredBooks,
        loading,
        fetchBooks,
        fetchFinishedBooks,
        fetchNotFinishedBooks,
        createBook,
        updateBook,
        updateProgress,
        toggleBookFavorite,
        deleteBook,
        getProgress,
        filterGenre,
        setFilterGenre,
        filterAuthor,
        setFilterAuthor,
        showOnlyFavorites,
        setShowOnlyFavorites,
        resetFilters,
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
