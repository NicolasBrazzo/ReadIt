// verifica autenticazione per rotte protette

// Cosa fa: Verifica che l'utente sia autenticato
// Perché separato:

// Riutilizzabilità: usi lo stesso middleware per 10+ rotte protette
// DRY (Don't Repeat Yourself): scrivi la logica una volta sola

// Quando viene usato: Prima che il controller venga eseguito

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt"); // ✅ IMPORTA DA CONFIG

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET); // ✅ USA LA STESSA COSTANTE
    
    req.user = decoded; // Questo conterrà { name, id, iat, exp }
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message); // ✅ DEBUG
    return res.status(401).json({ error: "Invalid token" });
  }
};

