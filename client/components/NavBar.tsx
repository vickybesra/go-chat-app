import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoLogOutSharp } from "react-icons/io5";
import { API_URL } from "../constants";
import { AuthContext } from "@/modules/auth_provider";

const NavBar = () => {
  const classname = "px-2 text-white text-basetransition-colors";
  const { setAuthenticated, user } = useContext(AuthContext);
  const router = useRouter();
  
  const handleLogoutClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/logout`);
      if (response.ok) {
        localStorage.removeItem("user_info");
        router.push("/login");
        setAuthenticated(false);
        window.alert("Logout successful");
        return;
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="flex px-3 py-3 items-center justify-between w-full h-full bg-zinc-500">
      <Link className={classname + "order-1"} href="/">
        <AiFillHome />
      </Link>
      <div className="flex order-2 items-center">
        <span className={classname + "mr-2"}>Hello, {user.username}</span>
        <Link className={classname} href="/login" onClick={handleLogoutClick}>
          <IoLogOutSharp />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
