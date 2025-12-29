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

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};


