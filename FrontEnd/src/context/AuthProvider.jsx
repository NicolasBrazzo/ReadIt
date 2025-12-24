// src/context/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

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
    // Assicuriamoci che axios mandi i cookie
    axios.defaults.withCredentials = true;

    // L'utente è connesso?
    const check = async () => {
      try {
        const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
        if (res.data?.authenticated) {
          // console.log("Utente autenticato", res.data.user);
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  // SIGNUP
  const register = async (credentials) => {
    try {
      console.log("📤 Sending credentials:", credentials);

      const res = await axios.post(`${API_URL}/register`, credentials, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("📥 Response:", res.data);

      if (res.data?.message === "Success") {
        const me = await axios.get(`${API_URL}/me`, { withCredentials: true });
        if (me.data?.authenticated) {
          console.log(me.data.user, "USER  DATA");
          setUser(me.data.user);
          return { ok: true };
        }
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
      const res = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true,
      });
      if (res.data?.message === "Success") {
        const me = await axios.get(`${API_URL}/me`, { withCredentials: true });
        if (me.data?.authenticated) {
          setUser(me.data.user);
          return { ok: true };
        }
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  const logout = async () => {
    // Se vuoi un logout server-side, crea /logout che pulisce il cookie.
    // Qui gestiamo solo lo stato client-side. Possiamo anche chiamare il backend.
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (e) {
      // ignore se non esiste
    }
    setUser(null);
  };

  // !! se scommenti logout inseriscilo dopo login, ...
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

  if (loading) return <div>Loading...</div>; // o spinner
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
