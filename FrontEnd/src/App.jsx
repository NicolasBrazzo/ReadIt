import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { AuthProvider, PrivateRoute } from "./context/AuthProvider";
import { BooksProvider } from "./context/BooksProvider";

function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* rotta protetta: avvolgiamo il componente nella PrivateRoute */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* fallback semplice */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </BooksProvider>
    </AuthProvider>
  );
}

export default App;
