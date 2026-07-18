import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useBooksListQuery, useBookStatsQuery } from "../queries/books.queries";
import {
  useUpdateBookProgress,
  useDeleteBook,
  useToggleBookFavorite,
} from "../queries/books.mutations";
import { usePendingActions } from "../hooks/usePendingActions";
import { AddBookForm } from "../components/AddBookForm";
import { Loader } from "../components/Loader";
import { DashboardHeader } from "../components/DashboardHeader";
import { BookFilters } from "../components/BookFilters";
import { StatsPanel } from "../components/StatsPanel";
import { BookCard } from "../components/BookCard";
import { VIEWS } from "../../constants";
import { Button, Tabs, Modal, EmptyState } from "../components/ui";
import { BookOpen, BookMarked, Library, Plus, BarChart3 } from "lucide-react";
import { showSuccess } from "../utils/toast";

// Mappa i tab della UI (VIEWS) sulla "view" attesa dalle query dei libri
const VIEW_TO_QUERY = {
  [VIEWS.PROGRESS]: "in_progress",
  [VIEWS.ALL]: "all",
  [VIEWS.FINISHED]: "finished",
};

const TABS = [
  { value: VIEWS.PROGRESS, label: "In Progress", icon: BookOpen },
  { value: VIEWS.ALL, label: "All Books", icon: Library },
  { value: VIEWS.FINISHED, label: "Finished", icon: BookMarked, tone: "ok" },
  { value: VIEWS.STATS, label: "Stats", icon: BarChart3 },
];

export const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeView, setActiveView] = useState(VIEWS.PROGRESS);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [expandedBookId, setExpandedBookId] = useState(null);
  const { isPending, runWithPending } = usePendingActions();

  const [filterGenre, setFilterGenre] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { user } = useAuth();

  const isStatsView = activeView === VIEWS.STATS;
  const listView = VIEW_TO_QUERY[activeView] ?? "in_progress";

  const listQuery = useBooksListQuery(listView, { enabled: !isStatsView });
  const statsQuery = useBookStatsQuery({ enabled: isStatsView });

  const stats = statsQuery.data ?? null;
  const isContentLoading = isStatsView ? statsQuery.isLoading : listQuery.isLoading;

  const filteredBooks = useMemo(
    () =>
      (listQuery.data ?? []).filter((book) => {
        if (showOnlyFavorites && !book.is_favorite) return false;
        if (filterGenre && book.genre !== filterGenre) return false;
        if (filterAuthor && !book.author.toLowerCase().includes(filterAuthor.toLowerCase())) return false;
        return true;
      }),
    [listQuery.data, filterGenre, filterAuthor, showOnlyFavorites]
  );

  const resetFilters = () => {
    setFilterGenre("");
    setFilterAuthor("");
    setShowOnlyFavorites(false);
  };

  const updateProgressMutation = useUpdateBookProgress();
  const deleteMutation = useDeleteBook();
  const toggleFavoriteMutation = useToggleBookFavorite();

  const handleViewChange = (view) => {
    setActiveView(view);
    setExpandedBookId(null);
  };

  if (!user) {
    return null;
  }

  const handleOpenAddForm = () => {
    setBookToEdit(null);
    setIsFormOpen(true);
  };

  const handleUpdateProgress = (bookId, newPage, totalPages) =>
    runWithPending("progress", bookId, async () => {
      try {
        await updateProgressMutation.mutateAsync({ bookId, currentPage: newPage });
        if (newPage >= totalPages) {
          showSuccess("Libro finito! 🎉");
        } else {
          showSuccess(`Pagina ${newPage}`, { autoClose: 1000 });
        }
      } catch {
        // errore già mostrato dall'onError della mutation
      }
    });

  const handleDeleteBook = (bookId) =>
    runWithPending("delete", bookId, async () => {
      try {
        await deleteMutation.mutateAsync(bookId);
        showSuccess("Libro eliminato");
      } catch {
        // errore già mostrato dall'onError della mutation
      }
    });

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setBookToEdit(null);
  };

  const handleToggleFavorite = (book) =>
    runWithPending("favorite", book.id, async () => {
      try {
        await toggleFavoriteMutation.mutateAsync({
          bookId: book.id,
          isFavorite: !book.is_favorite,
        });
        showSuccess(
          book.is_favorite ? "Removed from favorites" : "Added to favorites",
          { autoClose: 1500 }
        );
      } catch {
        // errore già mostrato dall'onError della mutation
      }
    });

  const hasActiveFilters = filterGenre || filterAuthor || showOnlyFavorites;

  return (
    <>
    <div className="flex-1 mx-5 md:mx-10 my-8 flex flex-col gap-8 min-h-[80vh]">

        <DashboardHeader userName={user?.name} onAddBook={handleOpenAddForm} />

        <Tabs tabs={TABS} value={activeView} onChange={handleViewChange} />

        {/* Filtri nascosti in vista Stats */}
        {!isStatsView && (
          <BookFilters
            genre={filterGenre}
            onGenreChange={setFilterGenre}
            author={filterAuthor}
            onAuthorChange={setFilterAuthor}
            showOnlyFavorites={showOnlyFavorites}
            onToggleFavorites={() => setShowOnlyFavorites(!showOnlyFavorites)}
            hasActiveFilters={hasActiveFilters}
            onReset={resetFilters}
          />
        )}

        {/* Contenuto: solo quest'area mostra il loader, Navbar/Tabs restano sempre visibili */}
        {isContentLoading ? (
          <Loader />
        ) : isStatsView ? (
          <StatsPanel stats={stats} />
        ) : filteredBooks.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No books found"
            description="Add your first book to start tracking your progress."
            action={
              <Button icon={Plus} onClick={handleOpenAddForm}>
                Add Book
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isExpanded={expandedBookId === book.id}
                onToggleExpand={() =>
                  setExpandedBookId(expandedBookId === book.id ? null : book.id)
                }
                isFavoritePending={isPending("favorite", book.id)}
                onToggleFavorite={() => handleToggleFavorite(book)}
                isProgressPending={isPending("progress", book.id)}
                onIncrementProgress={() =>
                  handleUpdateProgress(book.id, book.current_page + 1, book.total_pages)
                }
                isDeletePending={isPending("delete", book.id)}
                onEdit={() => handleEditBook(book)}
                onDelete={() => handleDeleteBook(book.id)}
              />
            ))}
          </div>
        )}
      </div>

    <Modal
      open={isFormOpen}
      onClose={handleCloseForm}
      title={bookToEdit ? "Edit Book" : "Add New Book"}
      size="lg"
    >
      <AddBookForm onClose={handleCloseForm} bookToEdit={bookToEdit} />
    </Modal>
    </>
  );
};
