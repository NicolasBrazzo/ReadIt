const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const booksRoutes = require("./routes/books.routes"); // ✅ AGGIUNGI

const app = express();
const PORT = process.env.PORT || 5500;

// ✅ 1. PRIMA express.json() e urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 2. POI CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Aggiungi entrambe
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ 3. POI cookieParser
app.use(cookieParser());

// ✅ 4. INFINE le rotte
app.use('/', authRoutes);
app.use('/books', booksRoutes);


// Gestione errori 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Gestione errori globale
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend ON at port ${PORT}`);
});
