import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import { useBooks } from "../context/BooksProvider";
import { AddBookForm } from "../components/AddBookForm";
import { Check } from "lucide-react";
import {
  abbreviateText,
  capitalizeFirstLetter,
} from "../utils/utilityFunctions";

export const Dashboard = () => {
  const [openFormBook, setOpenFormBook] = useState(false);
  const [booksVisualization, setBooksVisualization] = useState("Progress");
  const [bookToEdit, setBookToEdit] = useState(null);

  const { user, logout, loading: authLoading } = useAuth();
  const {
    books,
    loading,
    fetchBooks,
    fetchFinishedBooks,
    fetchNotFinishedBooks,
    updateProgress,
    deleteBook,
    getProgress,
  } = useBooks();

  // Carica i libri quando il componente viene montato
  useEffect(() => {
    if (!authLoading && user) {
      fetchNotFinishedBooks();
    }
  }, [authLoading, user]);

  // Switch per settare la visualizzazione dei libri
  // useEffect(() => {
  //   if (!authLoading && user) {
  //     // ✅ Solo se autenticato
  //     switch (booksVisualization) {
  //       case "Progress":
  //         fetchNotFinishedBooks();
  //         break;
  //       case "All":
  //         fetchBooks();
  //         break;
  //       case "Finished":
  //         fetchFinishedBooks();
  //         break;
  //       default:
  //         fetchNotFinishedBooks();
  //         break;
  //     }
  //   }
  // }, [booksVisualization, authLoading, user]);

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

  // ✅ Mostra loading durante il check auth
  if (authLoading) {
    return <div>Loading authentication...</div>;
  }

  // ✅ Se non autenticato, il PrivateRoute ti reindirizzerà
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

  if (loading) {
    return <div>Caricamento libri...</div>;
  }

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

            {/* ✅ USA LE NUOVE FUNZIONI */}
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
          {books.length === 0 ? (
            <p className="text-white text-center w-full">
              No books founded, add one
            </p>
          ) : (
            books.map((book) => (
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
                    </div>
                    {book.current_page === book.total_pages && (
                      <Check className="bg-green-400 text-black" />
                    )}
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
