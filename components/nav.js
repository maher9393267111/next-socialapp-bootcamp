import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState,logout] = useContext(UserContext);

  useEffect(() => {
    process.window && setCurrent(window.location.pathname);
  }, [process.window && window.location.pathname]);

  const router = useRouter();

  const logoutfunc = () => {
 
    logout();
    router.push("/login");
  };

  return (
    <nav
      className="nav d-flex justify-content-between"
      style={{ backgroundColor: "blue" }}
    >
      <Link href="/">
        <a
          className={`nav-link text-light logo ${current === "/" && "active"}`}
        >
          MERNCAMP
        </a>
      </Link>

      {state !== null ? (
        <>
          <Link href="/user/dashboard">
            <a
              className={`nav-link text-light ${
                current === "/user/dashboard" && "active"
              }`}
            >
              {state && state.user && state.user.name}
            </a>
          </Link>

          <a onClick={logoutfunc} className="nav-link text-light">
            Logout
          </a>
        </>
      ) : (
        <>
          <Link href="/login">
            <a
              className={`nav-link text-light ${
                current === "/login" && "active"
              }`}
            >
              Login
            </a>
          </Link>

          <Link href="/register">
            <a
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;



export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return {
      props: {
          token
      }
  }
}