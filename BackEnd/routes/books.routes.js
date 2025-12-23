const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getUserBooks,
  getFinishedUserBooks,
  getNotFinishedUserBooks,
  getBook,
  createNewBook,
  updateBookInfo,
  updateProgress,
  removeBook
} = require('../controllers/books.controller');

// ⚠️ IMPORTANTE: Tutte le rotte books sono protette (serve login)
router.use(authMiddleware);

// GET /books - Lista libri dell'utente
router.get('/', getUserBooks);

// GET /books/in_progress - Lista libri dell'utente finiti
router.get("/in_progress", getNotFinishedUserBooks)

// GET /books/finished - Lista libri dell'utente finiti
router.get("/finished", getFinishedUserBooks)

// GET /books/:id - Singolo libro
router.get('/:id', getBook);

// POST /books - Crea nuovo libro
router.post('/', createNewBook);

// PUT /books/:id - Aggiorna libro completo
router.put('/:id', updateBookInfo);

// PATCH /books/:id/progress - Aggiorna solo progresso
router.patch('/:id/progress', updateProgress);

// DELETE /books/:id - Elimina libro
router.delete('/:id', removeBook);

module.exports = router;