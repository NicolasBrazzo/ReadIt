import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import { useBooks } from "../context/BooksProvider";
import { AddBookForm } from "../components/AddBookForm";
import { Loader } from "../components/Loader";
import { BOOK_GENRES, VIEWS } from "../../constants";
import {
  Card,
  Badge,
  ProgressBar,
  Disclosure,
  Button,
  Tabs,
  Modal,
  EmptyState,
  Select,
  Input,
} from "../components/ui";
import {
  Check,
  Heart,
  X,
  BookOpen,
  BookMarked,
  Library,
  Plus,
  Loader2,
  BarChart3,
  TrendingUp,
  Tag,
} from "lucide-react";
import {
  abbreviateText,
  capitalizeFirstLetter,
} from "../utils/utilityFunctions";
import { showSuccess } from "../utils/toast";


const StatCard = ({ icon: Icon, label, value, tone }) => {
  const toneClass = tone === "ok" ? "text-ok" : tone === "accent" ? "text-accent" : "text-text";
  return (
    <Card className="p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-text-3 text-[11px] uppercase tracking-wide font-mono">
        <Icon size={14} /> {label}
      </div>
      <span className={`text-3xl md:text-4xl font-black ${toneClass}`}>
        {value}
      </span>
    </Card>
  );
};

export const Dashboard = () => {
  const [openFormBook, setOpenFormBook] = useState(false);
  const [booksVisualization, setBooksVisualization] = useState(VIEWS.PROGRESS);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [expandedBookId, setExpandedBookId] = useState(null);
  const [pendingActions, setPendingActions] = useState(new Set());

  const isPending = (action, bookId) => pendingActions.has(`${action}-${bookId}`);
  const runWithPending = async (action, bookId, fn) => {
    const key = `${action}-${bookId}`;
    setPendingActions((prev) => new Set(prev).add(key));
    try {
      await fn();
    } finally {
      setPendingActions((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

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
    fetchStats,
    stats,
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
    else if (view === VIEWS.STATS) fetchStats();
  };

  if (authLoading || loading) {
    return <Loader fullscreen />;
  }

  if (!user) {
    return null;
  }

  const handleUpdateProgress = (bookId, newPage, totalPages) =>
    runWithPending("progress", bookId, async () => {
      const result = await updateProgress(bookId, newPage);
      if (!result.ok) return;
      if (newPage >= totalPages) {
        showSuccess("Libro finito! 🎉");
      } else {
        showSuccess(`Pagina ${newPage}`, { autoClose: 1000 });
      }
    });

  const handleDeleteBook = (bookId) =>
    runWithPending("delete", bookId, async () => {
      const result = await deleteBook(bookId);
      if (result.ok) showSuccess("Libro eliminato");
    });

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setOpenFormBook(true);
  };

  const handleCloseForm = () => {
    setOpenFormBook(false);
    setBookToEdit(null);
  };

  const handleToggleFavorite = (book) =>
    runWithPending("favorite", book.id, async () => {
      const result = await toggleBookFavorite(book.id, !book.is_favorite);
      if (!result.ok) return;
      showSuccess(
        book.is_favorite ? "Removed from favorites" : "Added to favorites",
        { autoClose: 1500 }
      );
    });

  const hasActiveFilters = filterGenre || filterAuthor || showOnlyFavorites;

  const tabs = [
    { value: VIEWS.PROGRESS, label: "In Progress", icon: BookOpen },
    { value: VIEWS.ALL, label: "All Books", icon: Library },
    { value: VIEWS.FINISHED, label: "Finished", icon: BookMarked, tone: "ok" },
    { value: VIEWS.STATS, label: "Stats", icon: BarChart3 },
  ];

  const isStatsView = booksVisualization === VIEWS.STATS;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 mx-5 md:mx-10 my-8 flex flex-col gap-8 min-h-[80vh]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-h1 text-text">
            <span className="text-accent">Welcome</span>{" "}
            {capitalizeFirstLetter(user?.name)}
          </h1>
          <Button icon={Plus} onClick={() => { setBookToEdit(null); setOpenFormBook(true); }}>
            Add Book
          </Button>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} value={booksVisualization} onChange={handleViewChange} />

        {/* Filters — nascosti in vista Stats */}
        {!isStatsView && (
        <div className="flex flex-wrap gap-3 items-center">
          <div className="w-48">
            <Select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
            >
              <option value="">All genres</option>
              {BOOK_GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Select>
          </div>

          <div className="w-56">
            <Input
              type="text"
              placeholder="Filter by author..."
              value={filterAuthor}
              onChange={(e) => setFilterAuthor(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-field border text-[13px] font-mono transition-colors ${
              showOnlyFavorites
                ? "border-accent bg-accent-soft text-accent-text"
                : "border-border text-text-2 hover:border-text-3 hover:text-text"
            }`}
          >
            <Heart size={14} fill={showOnlyFavorites ? "currentColor" : "none"} />
            Favorites
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2.5 text-text-3 text-[13px] font-mono hover:text-text transition-colors"
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>
        )}

        {/* Stats panel */}
        {isStatsView ? (
          !stats ? (
            <EmptyState
              icon={BarChart3}
              title="No stats yet"
              description="Add some books to start tracking your reading stats."
            />
          ) : (
            <div className="flex flex-col gap-4">
              {/* 4 stat numeriche */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Library} label="Total books" value={stats.total_books} />
                <StatCard icon={BookOpen} label="In progress" value={stats.in_progress_count} />
                <StatCard icon={BookMarked} label="Finished" value={stats.finished_count} tone="ok" />
                <StatCard icon={Heart} label="Favorites" value={stats.favorites_count} tone="accent" />
              </div>

              {/* Pagine + genere */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2 p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-text-2 text-[14px]">
                      <TrendingUp size={16} /> Average progress
                    </div>
                    <span className="text-accent text-2xl font-black">{stats.average_progress}%</span>
                  </div>
                  <ProgressBar value={stats.average_progress} />
                  <p className="text-text-3 text-[14px]">
                    {stats.total_pages_read.toLocaleString()} / {stats.total_pages.toLocaleString()} pages read
                  </p>
                </Card>

                <Card className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-text-2 text-[14px]">
                    <Tag size={16} /> Favorite genre
                  </div>
                  {stats.favorite_genre ? (
                    <span className="text-accent text-xl font-bold">{stats.favorite_genre}</span>
                  ) : (
                    <span className="text-text-3 text-[14px] italic">No genre yet</span>
                  )}
                </Card>
              </div>

              {/* Libro più avanzato */}
              <Card className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-text-2 text-[14px]">
                  <BookOpen size={16} /> Most advanced book
                </div>
                {stats.most_advanced_book ? (
                  <>
                    <h3 className="text-h2 text-text">
                      {capitalizeFirstLetter(stats.most_advanced_book.title)}
                    </h3>
                    <p className="text-text-3 text-[14px]">
                      by {capitalizeFirstLetter(stats.most_advanced_book.author)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <ProgressBar value={stats.most_advanced_book.progress} trackClassName="flex-1" />
                      <span className="text-accent font-bold">{stats.most_advanced_book.progress}%</span>
                    </div>
                  </>
                ) : (
                  <span className="text-text-3 text-[14px] italic">No book in progress</span>
                )}
              </Card>
            </div>
          )
        ) : filteredBooks.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No books found"
            description="Add your first book to start tracking your progress."
            action={
              <Button icon={Plus} onClick={() => { setBookToEdit(null); setOpenFormBook(true); }}>
                Add Book
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book) => {
              const isExpanded = expandedBookId === book.id;
              const progress = getProgress(book);
              const isFinished = book.current_page === book.total_pages;

              return (
                <Card key={book.id} className="flex flex-col overflow-hidden">
                  {/* Card header — always visible */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-text leading-tight truncate">
                          {capitalizeFirstLetter(abbreviateText(book.title, 40))}
                        </h3>
                        <p className="text-text-2 text-[14px] truncate">
                          {capitalizeFirstLetter(abbreviateText(book.author, 30))}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {isFinished && (
                          <Check size={16} className="text-ok" />
                        )}
                        <button
                          onClick={() => handleToggleFavorite(book)}
                          disabled={isPending("favorite", book.id)}
                          className="text-accent hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                          title={book.is_favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                          {isPending("favorite", book.id) ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Heart size={16} fill={book.is_favorite ? "currentColor" : "none"} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-[12px] text-text-3 mb-1">
                        <span>p. {book.current_page} / {book.total_pages}</span>
                        <span className={isFinished ? "text-ok" : "text-accent"}>{progress}%</span>
                      </div>
                      <ProgressBar value={progress} tone={isFinished ? "ok" : "accent"} />
                    </div>

                    {book.genre && (
                      <Badge variant="outline" tone="accent" className="w-fit">
                        {book.genre}
                      </Badge>
                    )}
                  </div>

                  {/* Expand toggle + details */}
                  <Disclosure
                    open={isExpanded}
                    onToggle={() => setExpandedBookId(isExpanded ? null : book.id)}
                    label={isExpanded ? "Hide" : "Details"}
                    className="px-4"
                  >
                    <div className="flex flex-col gap-3">
                      {!isFinished && (
                        <Button
                          size="sm"
                          className="w-full"
                          loading={isPending("progress", book.id)}
                          onClick={() => handleUpdateProgress(book.id, book.current_page + 1, book.total_pages)}
                        >
                          {isPending("progress", book.id) ? "Updating..." : "+1 page"}
                        </Button>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          disabled={isPending("delete", book.id)}
                          onClick={() => handleEditBook(book)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-1"
                          loading={isPending("delete", book.id)}
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          {isPending("delete", book.id) ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </div>
                  </Disclosure>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        open={openFormBook}
        onClose={handleCloseForm}
        title={bookToEdit ? "Edit Book" : "Add New Book"}
        size="lg"
      >
        <AddBookForm setOpenFormBook={handleCloseForm} bookToEdit={bookToEdit} />
      </Modal>

      <Footer />
    </div>
  );
};
