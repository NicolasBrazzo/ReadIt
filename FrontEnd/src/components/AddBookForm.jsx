import { useState, useEffect } from "react";
import { useBooks } from "../context/BooksProvider";
import { X } from "lucide-react";
import { BOOK_GENRES } from "../../constants";

export const AddBookForm = ({ setOpenFormBook, bookToEdit = null }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState("0");
  const [genre, setGenre] = useState("");
  const { createBook, updateBook } = useBooks();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  // Popola il form se stiamo editando un libro
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || "");
      setAuthor(bookToEdit.author || "");
      setTotalPages(bookToEdit.total_pages?.toString() || "");
      setCurrentPage(bookToEdit.current_page?.toString() || "0");
      setGenre(bookToEdit.genre || "");
      setIsUpdating(true);
    }
  }, [bookToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      total_pages: parseInt(totalPages),
      current_page: parseInt(currentPage),
      genre: genre || null,
    };

    let result;

    if (isUpdating && bookToEdit) {
      result = await updateBook(bookToEdit.id, bookData);
    } else {
      result = await createBook(bookData);
    }

    if (result.ok) {
      setTitle("");
      setAuthor("");
      setTotalPages("");
      setCurrentPage("0");
      setGenre("");
      setOpenFormBook(false);
    } else {
      setError(result.message);
    }
  };

  return (
    <form
      id="addBookForm"
      onSubmit={handleSubmit}
      className="p-6 border-3 border-primary rounded flex flex-col gap-5 mt-10"
    >
      <div className="flex-center-between">
        <h2 className="text-2xl mb-4 comfoorta">
          {isUpdating ? "Edit Book" : "Add New Book"}
        </h2>
        <button type="button" onClick={() => setOpenFormBook(false)}>
          <X className="bg-primary rounded" />
        </button>
      </div>

      <div className="md:flex justify-around items-center gap-5">
        <div className="flex-1">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="author">Author:</label>
          <input
            name="author"
            type="text"
            placeholder="Author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="flex-1">
          <label htmlFor="totPages">Total pages:</label>
          <input
            name="totPages"
            type="number"
            placeholder="Total pages..."
            value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)}
            required
          />
          <label htmlFor="curPages">Current Page:</label>
          <input
            name="curPages"
            type="number"
            placeholder="Current Page..."
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="genre">Genre:</label>
        <select
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded bg-white text-sm"
        >
          <option value="">— Select genre —</option>
          {BOOK_GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="text-full-center">
        <p className="text-red-400">{error}</p>
      </div>

      <div className="text-full-center">
        <button
          type="submit"
          className="text-white px-4 py-2 w-fit rounded border bg-black hover:bg-gray-950"
        >
          {isUpdating ? "Update Book" : "Add Book"}
        </button>
      </div>
    </form>
  );
};
