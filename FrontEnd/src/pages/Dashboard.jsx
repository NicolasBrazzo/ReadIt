import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import { useBooks } from "../context/BooksProvider";
import { AddBookForm } from "../components/AddBookForm";
import { Loader } from "../components/Loader";
import { BOOK_GENRES, VIEWS } from "../../constants";
import {
  Check,
  Heart,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  BookMarked,
  Library,
  Plus,
} from "lucide-react";
import {
  abbreviateText,
  capitalizeFirstLetter,
} from "../utils/utilityFunctions";


export const Dashboard = () => {
  const [openFormBook, setOpenFormBook] = useState(false);
  const [booksVisualization, setBooksVisualization] = useState(VIEWS.PROGRESS);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [expandedBookId, setExpandedBookId] = useState(null);

  const { user, loading: authLoading } = useAuth();
  const {
    filteredBooks,
    loading,
    fetchBooks,
    fetchFinishedBooks,
    fetchNotFinishedBooks,
    updateProgress,
    deleteBook,
    getProgress,
    toggleBookFavorite,
    filterGenre,
    setFilterGenre,
    filterAuthor,
    setFilterAuthor,
    showOnlyFavorites,
    setShowOnlyFavorites,
    resetFilters,
  } = useBooks();

  useEffect(() => {
    if (!authLoading && user) {
      fetchNotFinishedBooks();
    }
  }, [authLoading, user]);

  const handleViewChange = (view) => {
    setBooksVisualization(view);
    setExpandedBookId(null);
    if (view === VIEWS.ALL) fetchBooks();
    else if (view === VIEWS.PROGRESS) fetchNotFinishedBooks();
    else if (view === VIEWS.FINISHED) fetchFinishedBooks();
  };

  if (authLoading || loading) {
    return <Loader fullscreen />;
  }

  if (!user) {
    return null;
  }

  const handleUpdateProgress = async (bookId, newPage) => {
    const result = await updateProgress(bookId, newPage);
    if (!result.ok) alert(result.message);
  };

  const handleDeleteBook = async (bookId) => {
    if (confirm("Sei sicuro di voler eliminare questo libro?")) {
      const result = await deleteBook(bookId);
      if (!result.ok) alert(result.message);
    }
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setOpenFormBook(true);
  };

  const handleCloseForm = () => {
    setOpenFormBook(false);
    setBookToEdit(null);
  };

  const handleToggleFavorite = async (book) => {
    await toggleBookFavorite(book.id, !book.is_favorite);
  };

  const hasActiveFilters = filterGenre || filterAuthor || showOnlyFavorites;

  const tabs = [
    { id: VIEWS.PROGRESS, label: "In Progress", icon: BookOpen },
    { id: VIEWS.ALL, label: "All Books", icon: Library },
    { id: VIEWS.FINISHED, label: "Finished", icon: BookMarked },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 mx-5 md:mx-10 my-8 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl md:text-5xl zen-dots text-white">
            <span className="text-primary">Welcome</span>{" "}
            {capitalizeFirstLetter(user?.name)}
          </h1>
          <button
            onClick={() => { setBookToEdit(null); setOpenFormBook(true); }}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 hover:bg-primary/80 transition-colors"
          >
            <Plus size={18} /> Add Book
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/20">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleViewChange(id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                booksVisualization === id
                  ? id === VIEWS.FINISHED
                    ? "border-green-400 text-green-400"
                    : "border-primary text-primary"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-3 py-2 rounded border border-white/20 bg-black text-white text-sm"
          >
            <option value="">All genres</option>
            {BOOK_GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter by author..."
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="px-3 py-2 rounded border border-white/20 bg-black text-white text-sm placeholder-white/30 mb-0"
          />

          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-3 py-2 rounded border text-sm transition-colors ${
              showOnlyFavorites
                ? "border-primary bg-primary/20 text-primary"
                : "border-white/20 text-white/50 hover:border-white hover:text-white"
            }`}
          >
            <Heart size={14} fill={showOnlyFavorites ? "currentColor" : "none"} />
            Favorites
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded border border-white/20 text-white/40 text-sm hover:text-white"
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>

        {/* Book grid */}
        {filteredBooks.length === 0 ? (
          <div className="flex-center-col gap-4 py-24 text-white/40">
            <BookOpen size={48} strokeWidth={1} />
            <p className="text-lg">No books found — add one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book) => {
              const isExpanded = expandedBookId === book.id;
              const progress = getProgress(book);
              const isFinished = book.current_page === book.total_pages;

              return (
                <div
                  key={book.id}
                  className="border border-white/20 bg-white/3 flex flex-col overflow-hidden"
                >
                  {/* Card header — always visible */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white leading-tight truncate">
                          {capitalizeFirstLetter(abbreviateText(book.title, 40))}
                        </h3>
                        <p className="text-white/50 text-sm truncate">
                          {capitalizeFirstLetter(abbreviateText(book.author, 30))}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {isFinished && (
                          <Check size={16} className="text-green-400" />
                        )}
                        <button
                          onClick={() => handleToggleFavorite(book)}
                          className="text-primary hover:scale-110 transition-transform"
                          title={book.is_favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart size={16} fill={book.is_favorite ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-xs text-white/50 mb-1">
                        <span>p. {book.current_page} / {book.total_pages}</span>
                        <span className={isFinished ? "text-green-400" : "text-primary"}>{progress}%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isFinished ? "bg-green-400" : "bg-primary"}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {book.genre && (
                      <span className="text-xs text-primary border border-primary/50 px-2 py-0.5 rounded w-fit">
                        {book.genre}
                      </span>
                    )}
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpandedBookId(isExpanded ? null : book.id)}
                    className="flex items-center justify-center gap-1 py-2 text-xs text-white/40 hover:text-white border-t border-white/10 transition-colors"
                  >
                    {isExpanded ? (
                      <><ChevronUp size={14} /> Hide</>
                    ) : (
                      <><ChevronDown size={14} /> Details</>
                    )}
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-4 flex flex-col gap-3 bg-white/5">
                      {!isFinished && (
                        <button
                          className="w-full bg-white text-black py-2 text-sm font-bold zen-dots hover:bg-white/90 transition-colors"
                          onClick={() => handleUpdateProgress(book.id, book.current_page + 1)}
                        >
                          +1 page
                        </button>
                      )}
                      <div className="flex gap-2">
                        <button
                          className="flex-1 border border-white/30 py-2 text-sm hover:border-white transition-colors"
                          onClick={() => handleEditBook(book)}
                        >
                          Edit
                        </button>
                        <button
                          className="flex-1 bg-primary py-2 text-sm font-bold hover:bg-primary/80 transition-colors"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal AddBookForm */}
      {openFormBook && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex-center-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseForm(); }}
        >
          <div className="w-full max-w-2xl">
            <AddBookForm setOpenFormBook={handleCloseForm} bookToEdit={bookToEdit} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
