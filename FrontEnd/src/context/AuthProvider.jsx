// src/context/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import api from "../api/client";

const API_URL = import.meta.env.VITE_API_URL;

// Cosa fa: crea il context React che conterrà user, loading, login (e logout se aggiunto).
// Quando è usato: al momento del rendering, permette ai componenti figli di accedere ai dati di autenticazione tramite useContext.
// Effetto: nessun effetto runtime, solo la creazione di un contenitore.
const AuthContext = createContext(null);

// Incapsulatore dello stato e della logica auth
export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    console.log("🔍 Checking auth, token:", token ? "exists" : "missing"); // ✅ DEBUG

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/me");
      if (res.data?.authenticated) {
        setUser(res.data.user);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const register = async (credentials) => {
    try {
      console.log("📤 Sending credentials:", credentials);
      const res = await api.post("/register", credentials);
      console.log("📥 Response:", res.data);

      if (res.data?.message === "Success" && res.data?.token) {
        console.log("✅ Token received, saving..."); // ✅ DEBUG
        localStorage.setItem("token", res.data.token);
        console.log("✅ Token saved:", localStorage.getItem("token")); // ✅ DEBUG

        await checkAuth();
        return { ok: true };
      }

      return { ok: false, message: res.data?.error || "Registration failed" };
    } catch (err) {
      console.error("Register error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  // LOGIN
  const login = async (credentials) => {
    try {
      const res = await api.post("/login", credentials);

      if (res.data?.message === "Success" && res.data?.token) {
        // Salva il token
        localStorage.setItem("token", res.data.token);

        // Ricontrolla l'auth per popolare user
        await checkAuth();
        return { ok: true };
      }

      return { ok: false, message: res.data?.error || "Login failed" };
    } catch (err) {
      console.error("Login error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      // Ignora errori dal backend
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// PrivateRoute component (da usare come wrapper attorno alle rotte protette)
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
