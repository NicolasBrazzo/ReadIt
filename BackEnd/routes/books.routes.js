const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getUserBooks,
  getFinishedUserBooks,
  getNotFinishedUserBooks,
  getFavoritesBooks,
  getBook,
  createNewBook,
  updateBookInfo,
  updateProgress,
  toggleBookFavorite,
  removeBook
} = require('../controllers/books.controller');

// ⚠️ IMPORTANTE: Tutte le rotte books sono protette (serve login)
router.use(authMiddleware);

// GET /books - Lista libri dell'utente
router.get('/', getUserBooks);

// GET /books/in_progress - Lista libri dell'utente in corso
router.get("/in_progress", getNotFinishedUserBooks);

// GET /books/finished - Lista libri dell'utente finiti
router.get("/finished", getFinishedUserBooks);

// GET /books/favorites - Lista libri preferiti
router.get("/favorites", getFavoritesBooks);

// GET /books/:id - Singolo libro
router.get('/:id', getBook);

// POST /books - Crea nuovo libro
router.post('/', createNewBook);

// PUT /books/:id - Aggiorna libro completo
router.put('/:id', updateBookInfo);

// PATCH /books/:id/progress - Aggiorna solo progresso
router.patch('/:id/progress', updateProgress);

// PATCH /books/:id/favorite - Toggle preferito
router.patch('/:id/favorite', toggleBookFavorite);

// DELETE /books/:id - Elimina libro
router.delete('/:id', removeBook);

module.exports = router;