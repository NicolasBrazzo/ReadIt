const {
  createBook,
  getBooksByUserId,
  getFinishedBooksByUserId,
  getNotFinishedBooksByUserId,
  getBookById,
  updateBook,
  updateCurrentPage,
  deleteBook,
} = require("../models/books.model");

// GET /books - Ottieni tutti i libri dell'utente loggato
const getUserBooks = async (req, res) => {
  try {
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;    
    const books = await getBooksByUserId(userId);
    
    const response = { books };

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch books" });
  }
};

// GET /books/finished - Ottieni tutti i libri finiti dell'utente loggato
const getFinishedUserBooks = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;
    
    const books = await getFinishedBooksByUserId(userId);    
    const response = { books };

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch finished books" });
  }
};

// GET /books/in_progress - Ottieni tutti i libri NON finiti dell'utente loggato
const getNotFinishedUserBooks = async (req, res) => {
  try {
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;
    const books = await getNotFinishedBooksByUserId(userId);
    const response = { books };

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch in progress books" });
  }
};

// GET /books/:id - Ottieni un singolo libro
const getBook = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const bookId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Verifica che il libro appartenga all'utente loggato (snake_case)
    if (book.user_id !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    return res.json({ book });
  } catch (error) {
    console.error("Get book error:", error);
    return res.status(500).json({ error: "Failed to fetch book" });
  }
};

// POST /books - Crea un nuovo libro
const createNewBook = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { title, author, total_pages, current_page } = req.body;
    const userId = req.user.id;

    // Validazione campi obbligatori
    if (!title || !author || !total_pages) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Converti in numeri
    const totalPagesNum = parseInt(total_pages, 10);
    const currentPageNum = parseInt(current_page, 10) || 0;

    // Validazione numeri
    if (isNaN(totalPagesNum)) {
      return res.status(400).json({ error: "Invalid total pages number" });
    }

    if (isNaN(currentPageNum)) {
      return res.status(400).json({ error: "Invalid current page number" });
    }

    if (totalPagesNum <= 0) {
      return res.status(400).json({ error: "Total pages must be greater than 0" });
    }

    if (currentPageNum < 0) {
      return res.status(400).json({ error: "Current page cannot be negative" });
    }

    if (currentPageNum > totalPagesNum) {
      return res
        .status(400)
        .json({ error: "Current page cannot be greater than total pages" });
    }

    const book = await createBook(
      userId,
      title,
      author,
      totalPagesNum,
      currentPageNum
    );

    return res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    console.error("Create book error:", error);
    return res.status(500).json({ error: "Failed to create book" });
  }
};

// PUT /books/:id - Aggiorna un libro completo
const updateBookInfo = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const bookId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { title, author, total_pages, current_page } = req.body;

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    // Validazione campi obbligatori
    if (!title || !author || !total_pages || current_page === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Converti in numeri
    const totalPagesNum = parseInt(total_pages, 10);
    const currentPageNum = parseInt(current_page, 10);

    // Validazione numeri
    if (isNaN(totalPagesNum) || isNaN(currentPageNum)) {
      return res.status(400).json({ error: "Invalid number format" });
    }

    if (totalPagesNum <= 0) {
      return res.status(400).json({ error: "Total pages must be greater than 0" });
    }

    if (currentPageNum < 0) {
      return res.status(400).json({ error: "Current page cannot be negative" });
    }

    if (currentPageNum > totalPagesNum) {
      return res
        .status(400)
        .json({ error: "Current page cannot be greater than total pages" });
    }

    // Verifica che il libro esista e appartenga all'utente
    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.user_id !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updatedBook = await updateBook(
      bookId,
      title,
      author,
      totalPagesNum,
      currentPageNum
    );

    return res.json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Update book error:", error);
    return res.status(500).json({ error: "Failed to update book" });
  }
};

// PATCH /books/:id/progress - Aggiorna solo la pagina corrente
const updateProgress = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const bookId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { currentPage } = req.body;

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    if (currentPage === undefined) {
      return res.status(400).json({ error: "Missing currentPage" });
    }

    // Converti in numero
    const currentPageNum = parseInt(currentPage, 10);

    if (isNaN(currentPageNum)) {
      return res.status(400).json({ error: "Invalid current page number" });
    }

    if (currentPageNum < 0) {
      return res.status(400).json({ error: "Current page cannot be negative" });
    }

    // Verifica che il libro appartenga all'utente
    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.user_id !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (currentPageNum > book.total_pages) {
      return res.status(400).json({ 
        error: "Current page cannot be greater than total pages",
        totalPages: book.total_pages 
      });
    }

    const updatedBook = await updateCurrentPage(bookId, currentPageNum);

    return res.json({
      message: "Progress updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Update progress error:", error);
    return res.status(500).json({ error: "Failed to update progress" });
  }
};

// DELETE /books/:id - Elimina un libro
const removeBook = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const bookId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    // Verifica che il libro appartenga all'utente
    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.user_id !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await deleteBook(bookId);

    return res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete book error:", error);
    return res.status(500).json({ error: "Failed to delete book" });
  }
};

module.exports = {
  getUserBooks,
  getFinishedUserBooks,
  getNotFinishedUserBooks,
  getBook,
  createNewBook,
  updateBookInfo,
  updateProgress,
  removeBook,
};