import { Copy, CopyrightIcon, Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-surface-2 border-t border-border text-text relative flex flex-col gap-10 items-center justify-center p-10">
      <div className="z-20 flex flex-col gap-5 sm:flex-row justify-center w-full">
        <div className="flex-1 flex-center-col">
          <h3 className="text-2xl font-bold">Social</h3>
          <ul className="flex flex-col gap-3 mt-3">
            <a href="https://github.com/NicolasBrazzo" target="_blank" className="hover:text-accent transition-colors">
              <li className="flex gap-2">
                <Github /> <span>GitHub</span>
              </li>
            </a>
            <a href="https://www.instagram.com/brazz0_/" target="_blank" className="hover:text-accent transition-colors">
              <li className="flex gap-2">
                <Instagram /> <span>Instagram</span>
              </li>
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-brazzo-a91509286/"
              target="_blank"
              className="hover:text-accent transition-colors"
            >
              <li className="flex gap-2">
                <Linkedin /> <span>Linkedin</span>
              </li>
            </a>
          </ul>
        </div>
        <div className="flex-1 flex-center-col gap-2">
          <h3 className="text-2xl font-bold">Links</h3>
          <ul className="flex-center-col">
            <Link to={"/"} className="hover:text-accent transition-colors">
              <li>Home</li>
            </Link>
            <Link to={"/dashboard"} className="hover:text-accent transition-colors">
              <li>Dashboard</li>
            </Link>
            <Link to={"/login"} className="hover:text-accent transition-colors">
              <li>Login</li>
            </Link>
            <Link to={"/signup"} className="hover:text-accent transition-colors">
              <li>Signup</li>
            </Link>
          </ul>
        </div>
        <div className="flex-1 flex-center-col gap-2">
          <h3 className="text-2xl font-bold">Info</h3>
          <ul className="flex-center-col">
             <li>
              <Link to={"/privacy-policy"} className="hover:text-accent transition-colors">Privacy policy</Link>
            </li>
             <li>
              <Link to={"/cookie-policy"} className="hover:text-accent transition-colors">Cookie policy</Link>
            </li>
            <li>
              <Link to={"/terms"} className="hover:text-accent transition-colors">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="z-20 text-center">
        <h3 className="text-2xl text-text-2">Thanks for using ReadIt</h3>
        <h2 className="text-h1 text-text">Deisgned by Brazzo Nicolas</h2>
      </div>

      <div className="flex-center-center gap-2">
        <CopyrightIcon />
        <p>2025 ReadIt</p>
      </div>
    </footer>
  );
};
