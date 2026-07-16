import { useState, useEffect } from "react";
import { useCreateBook, useUpdateBook } from "../queries/books.mutations";
import { BOOK_GENRES } from "../../constants";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { Alert } from "./ui/Alert";

export const AddBookForm = ({ setOpenFormBook, bookToEdit = null }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState("0");
  const [genre, setGenre] = useState("");
  const createMutation = useCreateBook();
  const updateMutation = useUpdateBook();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const submitting = createMutation.isPending || updateMutation.isPending;

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
    setError("");

    const bookData = {
      title,
      author,
      total_pages: parseInt(totalPages),
      current_page: parseInt(currentPage),
      genre: genre || null,
    };

    try {
      if (isUpdating && bookToEdit) {
        await updateMutation.mutateAsync({ bookId: bookToEdit.id, bookData });
      } else {
        await createMutation.mutateAsync(bookData);
      }
      setTitle("");
      setAuthor("");
      setTotalPages("");
      setCurrentPage("0");
      setGenre("");
      setOpenFormBook(false);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <form id="addBookForm" onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Title">
          <Input
            type="text"
            name="title"
            placeholder="Book title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>

        <Field label="Author">
          <Input
            name="author"
            type="text"
            placeholder="Author name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Field>

        <Field label="Total Pages">
          <Input
            name="totPages"
            type="number"
            placeholder="e.g. 320"
            value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)}
            required
          />
        </Field>

        <Field label="Current Page">
          <Input
            name="curPages"
            type="number"
            placeholder="e.g. 0"
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
          />
        </Field>
      </div>

      <Field label="Genre">
        <Select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="" className="bg-surface">— Select genre —</option>
          {BOOK_GENRES.map((g) => (
            <option key={g} value={g} className="bg-surface">
              {g}
            </option>
          ))}
        </Select>
      </Field>

      {error && <Alert kind="err">{error}</Alert>}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={() => setOpenFormBook(false)}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1" loading={submitting}>
          {isUpdating ? "Update" : "Add Book"}
        </Button>
      </div>
    </form>
  );
};
