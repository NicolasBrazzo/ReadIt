import { Copy, CopyrightIcon, Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-300 text-black relative flex flex-col gap-10 items-center justify-center p-10">
      <div className="z-20 flex justify-center w-full">
        <div className="flex-1 flex-center-col">
          <h3 className="text-2xl font-semibold">Social</h3>
          <ul className="flex flex-col gap-3 mt-3">
            <a href="https://github.com/NicolasBrazzo" target="_blank">
              <li className="flex gap-2">
                <Github /> <span>GitHub</span>
              </li>
            </a>
            <a href="https://www.instagram.com/brazz0_/" target="_blank">
              <li className="flex gap-2">
                <Instagram /> <span>Instagram</span>
              </li>
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-brazzo-a91509286/"
              target="_blank"
            >
              <li className="flex gap-2">
                <Linkedin /> <span>Linkedin</span>
              </li>
            </a>
          </ul>
        </div>
        <div className="flex-1 flex-center-col gap-2">
          <h3 className="text-2xl font-semibold">Links</h3>
          <ul className="flex-center-col">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/dashboard"}>
              <li>Dashboard</li>
            </Link>
            <Link to={"/login"}>
              <li>Login</li>
            </Link>
            <Link to={"/signup"}>
              <li>Signup</li>
            </Link>
          </ul>
        </div>
        <div className="flex-1 flex-center-col gap-2">
          <h3 className="text-2xl font-semibold">Info</h3>
          <ul className="flex-center-col">
            <li>Privacy policy</li>
            <li className="mt-3">Support Email: </li>
            <li>readit.support@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="z-20 text-center">
        <h3 className="text-2xl">Thanks for using ReadIt</h3>
        <h2 className="zen-dots text-3xl">Deisgned by Brazzo Nicolas</h2>
      </div>

      <div className="flex-center-center gap-2"> 
        <CopyrightIcon/> 
        <p>2025 ReadIt</p>
      </div>
    </footer>
  );
};
