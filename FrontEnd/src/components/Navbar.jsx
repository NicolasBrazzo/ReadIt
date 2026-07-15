import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Avatar } from "./ui/Avatar";

export const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full flex gap-5 justify-center md:justify-between px-5 mt-7 md:text-4xl font-bold text-text">
      <div>
        <Link className="link" to={"/"}>
          Home <div className="line-navbar"></div>
        </Link>
      </div>
      <div className="flex md:gap-20 gap-5 items-center">
        <Link className="link" to={"/dashboard"}>
          Dashboard <div className="line-navbar"></div>
        </Link>
        {user ? (
          <Link className="link flex items-center gap-2" to={"/profile"}>
            <Avatar src={user.avatar_url} name={user.name} size="sm" />
            Profile <div className="line-navbar"></div>
          </Link>
        ) : (
          <Link className="link" to={"/login"}>
            Login <div className="line-navbar"></div>
          </Link>
        )}
      </div>
    </nav>
  );
};
