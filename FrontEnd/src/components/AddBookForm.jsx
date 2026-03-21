import { useState, useEffect } from "react";
import { useBooks } from "../context/BooksProvider";
import { X } from "lucide-react";
import { BOOK_GENRES } from "../../constants";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full bg-transparent border border-white/20 px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-primary transition-colors rounded-none mb-0";

export const AddBookForm = ({ setOpenFormBook, bookToEdit = null }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState("0");
  const [genre, setGenre] = useState("");
  const { createBook, updateBook } = useBooks();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

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

    const result = isUpdating && bookToEdit
      ? await updateBook(bookToEdit.id, bookData)
      : await createBook(bookData);

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
    <div className="bg-black border border-white/20 border-l-2 border-l-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h2 className="zen-dots text-lg text-white">
          {isUpdating ? "Edit Book" : "Add New Book"}
        </h2>
        <button
          type="button"
          onClick={() => setOpenFormBook(false)}
          className="text-white/40 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form */}
      <form id="addBookForm" onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title">
            <input
              type="text"
              name="title"
              placeholder="Book title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          <Field label="Author">
            <input
              name="author"
              type="text"
              placeholder="Author name..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          <Field label="Total Pages">
            <input
              name="totPages"
              type="number"
              placeholder="e.g. 320"
              value={totalPages}
              onChange={(e) => setTotalPages(e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          <Field label="Current Page">
            <input
              name="curPages"
              type="number"
              placeholder="e.g. 0"
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Genre">
          <select
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={inputClass}
          >
            <option value="" className="bg-black">— Select genre —</option>
            {BOOK_GENRES.map((g) => (
              <option key={g} value={g} className="bg-black">{g}</option>
            ))}
          </select>
        </Field>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setOpenFormBook(false)}
            className="flex-1 border border-white/20 py-2 text-sm text-white/60 hover:text-white hover:border-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-primary py-2 text-sm font-bold text-white hover:bg-primary/80 transition-colors zen-dots"
          >
            {isUpdating ? "Update" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};
