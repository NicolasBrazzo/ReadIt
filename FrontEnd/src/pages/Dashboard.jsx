import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import { useBooks } from "../context/BooksProvider";
import { AddBookForm } from "../components/AddBookForm";
import { Check, Heart, X } from "lucide-react";
import {
  abbreviateText,
  capitalizeFirstLetter,
} from "../utils/utilityFunctions";
import { BOOK_GENRES } from "../../constants";

export const Dashboard = () => {
  const [openFormBook, setOpenFormBook] = useState(false);
  const [booksVisualization, setBooksVisualization] = useState("Progress");
  const [bookToEdit, setBookToEdit] = useState(null);

  const { user, logout, loading: authLoading } = useAuth();
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

  const handleViewAllBooks = () => {
    setBooksVisualization("All");
    fetchBooks();
  };

  const handleViewInProgressBooks = () => {
    setBooksVisualization("Progress");
    fetchNotFinishedBooks();
  };

  const handleViewFinishedBooks = () => {
    setBooksVisualization("Finished");
    fetchFinishedBooks();
  };

  if (authLoading) {
    return <div>Loading authentication...</div>;
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return <div>Caricamento libri...</div>;
  }

  const handleUpdateProgress = async (bookId, newPage) => {
    const result = await updateProgress(bookId, newPage);
    if (!result.ok) {
      alert(result.message);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (confirm("Sei sicuro di voler eliminare questo libro?")) {
      const result = await deleteBook(bookId);
      if (!result.ok) {
        alert(result.message);
      }
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

  return (
    <div>
      <Navbar />
      <div className="m-10 flex flex-col gap-10">
        <div className="flex flex-col xl:flex-row items-center justify-between">
          <h1 className="text-2xl w-fit sm:3xl md:text-[50px] zen-dots text-white">
            <span className="text-primary">Welcome</span>{" "}
            {capitalizeFirstLetter(user?.name)}
          </h1>
          <button onClick={() => logout()}>Logout</button>

          <div className="flex gap-3">
            <button
              className="underline hover:text-primary"
              onClick={() => {
                if (openFormBook) {
                  handleCloseForm();
                } else {
                  setBookToEdit(null);
                  setOpenFormBook(true);
                }
              }}
            >
              {openFormBook ? "Cancel" : "Add book"}
            </button>

            <button
              className="underline text-primary"
              onClick={() => {
                if (booksVisualization === "All") {
                  handleViewInProgressBooks();
                } else {
                  handleViewAllBooks();
                }
              }}
            >
              {booksVisualization === "All"
                ? "View in progress Books"
                : "View all books"}
            </button>

            <button
              className="underline text-primary"
              onClick={handleViewFinishedBooks}
            >
              View Finished Books
            </button>
          </div>
        </div>

        {openFormBook && (
          <AddBookForm
            setOpenFormBook={handleCloseForm}
            bookToEdit={bookToEdit}
          />
        )}

        {/* Barra filtri */}
        <div className="flex flex-wrap gap-3 items-center p-4 border border-white/20 rounded bg-white/5">
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-3 py-2 rounded border border-white/30 bg-transparent text-white text-sm"
          >
            <option value="" className="bg-black">All genres</option>
            {BOOK_GENRES.map((g) => (
              <option key={g} value={g} className="bg-black">
                {g}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter by author..."
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="px-3 py-2 rounded border border-white/30 bg-transparent text-white text-sm placeholder-white/40"
          />

          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-3 py-2 rounded border text-sm transition-colors ${
              showOnlyFavorites
                ? "border-primary bg-primary/20 text-primary"
                : "border-white/30 text-white/70 hover:border-white"
            }`}
          >
            <Heart size={14} fill={showOnlyFavorites ? "currentColor" : "none"} />
            Favorites
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded border border-white/30 text-white/60 text-sm hover:text-white"
            >
              <X size={12} />
              Reset
            </button>
          )}
        </div>

        <h2 className="comfoorta text-2xl font-bold">
          {booksVisualization === "All"
            ? "All books:"
            : booksVisualization === "Finished"
            ? "Books Finished:"
            : booksVisualization === "Progress"
            ? "Books in progress:"
            : ""}
        </h2>

        <div className="flex flex-col flex-wrap sm:flex-row sm:gap-[5%] lg:gap-[3%]">
          {filteredBooks.length === 0 ? (
            <p className="text-white text-center w-full py-30">
              No books found, add one
            </p>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="border-3 w-full sm:w-[45%] lg:w-[30%] mb-[3%] border-white p-1"
              >
                <div className="w-full h-full border-l-4 border-b-4 border-l-primary border-b-primary p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-2xl">
                      <h3 className="font-bold">
                        {capitalizeFirstLetter(abbreviateText(book.title))}
                      </h3>
                      <h4>
                        {capitalizeFirstLetter(abbreviateText(book.author, 30))}
                      </h4>
                      {book.genre && (
                        <span className="text-xs font-normal text-primary border border-primary px-2 py-0.5 rounded mt-1 inline-block">
                          {book.genre}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {book.current_page === book.total_pages && (
                        <Check className="bg-green-400 text-black" />
                      )}
                      <button
                        onClick={() => handleToggleFavorite(book)}
                        className="text-primary hover:scale-110 transition-transform"
                        title={book.is_favorite ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart
                          size={20}
                          fill={book.is_favorite ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>

                  <hr className="my-5" />

                  <div className="flex gap-5 flex-col">
                    <div className="flex justify-between gap-3">
                      <div className="flex-1 bg-white text-black font-semibold py-3 px-2">
                        <h4>Progress:</h4>
                        <p className="text-2xl font-bold">
                          {book.current_page}/{book.total_pages}
                        </p>
                      </div>
                      <div className="flex-1 bg-primary py-3 px-2">
                        <h4>Complete:</h4>
                        <p className="text-2xl font-bold">
                          {getProgress(book)}%
                        </p>
                      </div>
                    </div>
                    <div className="flex-between-col zen-dots text-xl w-full">
                      <button
                        className="bg-white text-black w-full py-2"
                        onClick={() => {
                          handleCloseForm();
                          handleUpdateProgress(book.id, book.current_page + 1);
                        }}
                      >
                        +1 page
                      </button>
                    </div>
                    <div className="flex gap-3 w-full">
                      <button
                        className="w-full border-2 py-2 px-4 border-white comfoorta"
                        onClick={() => handleEditBook(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full font-bold bg-primary py-2 px-4 comfoorta border border-white"
                        onClick={() => {
                          handleCloseForm();
                          handleDeleteBook(book.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
