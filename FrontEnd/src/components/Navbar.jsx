import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { Avatar } from "./ui/Avatar";
import { ThemeToggle } from "./ThemeToggle";

const linkClass = ({ isActive }) =>
  `link relative flex items-center gap-2 font-mono text-[13px] uppercase tracking-wide transition-colors ${
    isActive ? "active text-accent" : "text-text-2 hover:text-text"
  }`;

export const Navbar = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 px-5 py-4">
        <NavLink to="/" end className="text-xl font-black tracking-tight text-text">
          Read<span className="text-accent">-It</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
            <span className="line-navbar"></span>
          </NavLink>
          {user ? (
            <NavLink to="/profile" className={linkClass}>
              <Avatar src={user.avatar_url} name={user.name} size="sm" />
              Profile
              <span className="line-navbar"></span>
            </NavLink>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
              <span className="line-navbar"></span>
            </NavLink>
          )}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border text-text-2 hover:text-text"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md px-5 py-5 flex flex-col gap-4">
          <NavLink to="/" end onClick={closeMobile} className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/dashboard" onClick={closeMobile} className={linkClass}>
            Dashboard
          </NavLink>
          {user ? (
            <NavLink to="/profile" onClick={closeMobile} className={linkClass}>
              <Avatar src={user.avatar_url} name={user.name} size="sm" />
              Profile
            </NavLink>
          ) : (
            <NavLink to="/login" onClick={closeMobile} className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};
