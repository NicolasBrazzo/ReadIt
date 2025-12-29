// gestisce validazione, hash, token

// **Cosa fa**: Contiene tutta la **logica dell'applicazione**
// **Perché separato**:
// - È il "cervello" dell'app: decide cosa fare e in che ordine
// - Coordina model, librerie (bcrypt, jwt), validazione
// - Se cambi la logica (es: invio email di conferma), modifichi solo qui

// **Quando viene usato**: Quando una route riceve una richiesta

// **Flusso completo**:
// ```
// User clicca "Register"
// → Frontend chiama POST /register
// → Route riceve la richiesta
// → Controller.register() fa tutta la logica
// → Model salva nel DB
// → Controller risponde al frontend

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/user.model");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SALT_ROUNDS,
  COOKIE_OPTIONS,
} = require("../config/jwt");

const register = async (req, res) => {
  console.log(req);
  try {
    const { name, email, password } = req.body;

    // Validazione input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Controlla se email esiste già
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Crea utente
    const result = await createUser(name, email, hashedPassword);

    // Genera JWT
    const token = jwt.sign({ name, id: result.insertId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validazione input
    if (!email || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    // Trova utente
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Verifica password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Genera JWT
    const token = jwt.sign({ name: user.name, id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.json({
      message: "Success",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};

const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ authenticated: false });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Logout failed" });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
