import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { AuthProvider, PrivateRoute } from "./context/AuthProvider";
import { BooksProvider } from "./context/BooksProvider";
import { Terms } from "./pages/Terms";
import { CookiePolicy } from "./pages/CookiePolicy";
import { Privacy } from "./pages/Privacy";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
    <AuthProvider>
      <BooksProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/terms" element={<Terms/>}/>
            <Route path="/cookie-policy" element={<CookiePolicy/>}/>
            <Route path="/privacy-policy" element={<Privacy/>}/>

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
    <Analytics/>
    </>
  );
}

export default App;
