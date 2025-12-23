import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="w-full flex gap-5 justify-center md:justify-between px-5 mt-7 md:text-4xl zen-dots">
      <div>
        <Link className="link" to={"/"}>
          Home <div className="line-navbar"></div>
        </Link>
      </div>
      <div className="flex md:gap-20 gap-5">
        <Link className="link" to={"/dashboard"}>
          Dashboard <div className="line-navbar"></div>
        </Link>
        <Link className="link" to={"/login"}>
          Login <div className="line-navbar"></div>
        </Link>
      </div>
    </nav>
  );
};
