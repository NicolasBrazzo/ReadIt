import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { AuthProvider, PrivateRoute } from "./context/AuthProvider";
import { Terms } from "./pages/Terms";
import { CookiePolicy } from "./pages/CookiePolicy";
import { Privacy } from "./pages/Privacy";
import { Analytics } from "@vercel/analytics/react"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/terms" element={<Terms/>}/>
            <Route path="/cookie-policy" element={<CookiePolicy/>}/>
            <Route path="/privacy-policy" element={<Privacy/>}/>

            {/* rotte protette */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* fallback semplice */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
    </AuthProvider>
    <Analytics/>
    <ToastContainer />
    </>
  );
}

export default App;
