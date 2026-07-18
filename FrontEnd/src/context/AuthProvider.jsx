import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import api from "../api/client";
import { Loader } from "../components/Loader";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");

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

  const register = async (credentials) => {
  try {
    const res = await api.post("/register", credentials);
    if (res.data?.message === "Success" && res.data?.token) {
      localStorage.setItem("token", res.data.token);
      await checkAuth();
      return { ok: true };
    }
    return {
      ok: false,
      message: res.data?.error || "Registration failed",
      details: res.data?.details || []
    };
  } catch (err) {
    console.error("Register error:", err);
    return {
      ok: false,
      message: err.response?.data?.error || err.message,
      details: err.response?.data?.details || []
    };
  }
};

  const login = async (credentials) => {
    try {
      const res = await api.post("/login", credentials);

      if (res.data?.message === "Success" && res.data?.token) {
        localStorage.setItem("token", res.data.token);
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
      // L'utente esce comunque anche se la chiamata al backend fallisce
    }

    localStorage.removeItem("token");
    setUser(null);
    queryClient.clear();
  };

  const updateUserProfile = async (data) => {
    try {
      const res = await api.put("/profile", data);
      if (res.data?.user) {
        setUser((prev) => ({ ...prev, ...res.data.user }));
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.response?.data?.error || err.message };
    }
  };

  const changePassword = async (data) => {
    try {
      await api.patch("/profile/password", data);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        message: err.response?.data?.error || err.message,
        details: err.response?.data?.details || [],
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullscreen />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
