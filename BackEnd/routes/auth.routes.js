// solo definizioni delle rotte. Facile vedere tutti gli endpoint disponibili

// Cosa fa: Definisce gli endpoint (URL) dell'API
// Perché separato:

// Vista d'insieme chiara di tutte le rotte
// Facile vedere quale URL chiama quale funzione
// Puoi aggiungere middleware specifici per rotta

// Quando viene usato: Quando arriva una richiesta HTTP

const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);
router.post('/logout', logout);

module.exports = router;