import { CopyrightIcon, Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const FooterLink = ({ to, children }) => (
  <Link to={to} className="text-text-2 hover:text-accent transition-colors text-[14px]">
    {children}
  </Link>
);

export const Footer = () => {
  return (
    <footer className="bg-surface-2 border-t border-border text-text">
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-black tracking-tight">
            Read<span className="text-accent">-It</span>
          </h2>
          <p className="text-text-2 text-[14px] leading-relaxed">
            Thanks for using ReadIt.
          </p>
          <p className="text-text-3 text-[13px] font-mono">Designed by Brazzo Nicolas</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-mono uppercase text-[12px] tracking-wide text-text-3">Social</h3>
          <a
            href="https://github.com/NicolasBrazzo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors text-[14px]"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://www.instagram.com/brazz0_/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors text-[14px]"
          >
            <Instagram size={16} /> Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-brazzo-a91509286/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-text-2 hover:text-accent transition-colors text-[14px]"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-mono uppercase text-[12px] tracking-wide text-text-3">Links</h3>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/dashboard">Dashboard</FooterLink>
          <FooterLink to="/login">Login</FooterLink>
          <FooterLink to="/signup">Signup</FooterLink>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-mono uppercase text-[12px] tracking-wide text-text-3">Info</h3>
          <FooterLink to="/privacy-policy">Privacy policy</FooterLink>
          <FooterLink to="/cookie-policy">Cookie policy</FooterLink>
          <FooterLink to="/terms">Terms &amp; Conditions</FooterLink>
        </div>
      </div>

      <div className="border-t border-border px-5 py-6 flex items-center justify-center gap-2 text-text-3 text-[13px]">
        <CopyrightIcon size={14} />
        <p>2025 ReadIt</p>
      </div>
    </footer>
  );
};
