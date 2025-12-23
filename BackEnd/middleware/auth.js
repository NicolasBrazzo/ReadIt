// verifica autenticazione per rotte protette

// Cosa fa: Verifica che l'utente sia autenticato
// Perché separato:

// Riutilizzabilità: usi lo stesso middleware per 10+ rotte protette
// DRY (Don't Repeat Yourself): scrivi la logica una volta sola

// Quando viene usato: Prima che il controller venga eseguito

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;