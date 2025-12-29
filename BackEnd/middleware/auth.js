// verifica autenticazione per rotte protette

// Cosa fa: Verifica che l'utente sia autenticato
// Perché separato:

// Riutilizzabilità: usi lo stesso middleware per 10+ rotte protette
// DRY (Don't Repeat Yourself): scrivi la logica una volta sola

// Quando viene usato: Prima che il controller venga eseguito

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

