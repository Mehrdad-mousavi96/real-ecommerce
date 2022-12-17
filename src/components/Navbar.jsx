import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../useContext";
import { AiFillCaretDown } from "react-icons/ai";

const Navbar = () => {
  const userContext = useContext(UserContext);
  const [drop, setDrop] = useState(false);

  const logout = () => userContext.dispatch({ type: "logout" });

  return (
    <nav className="bg-gray-800 w-full h-16 flex items-center justify-between mx-auto fixed">
      <div className=" max-w-7xl px-2 sm:px-6 lg:px-8">
        <div>
          <div className="flex space-x-4">
            {userContext.user.isLoggedIn && (
              <Link
                to={"/dashboard"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            )}

            {!userContext.user.isLoggedIn && (
              <Link
                to={"/"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}

            {!userContext.user.isLoggedIn && (
              <Link
                to={"/register"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            )}
            {userContext.user.isLoggedIn && (
              <Link
                to={"/store"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Store
              </Link>
            )}

            {userContext.user.isLoggedIn && (
              <Link
                onClick={logout}
                to={"/login"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
      {userContext.user.isLoggedIn && (
        <div className="mr-3 flex items-center ">
          <button
            onClick={() => setDrop(!drop)}
            type="button"
            className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
          >
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </button>
          <span
            onClick={() => setDrop(!drop)}
            className="text-white ml-1 cursor-pointer"
          >
            <AiFillCaretDown />
          </span>

          <div className={!drop && "hidden"}>
            <div>
              <div className="dropdown relative ">
                <ul className="top-5 right-0 absolute w-28 bg-gray-700 flex justify-center items-center flex-col rounded-md py-2">
                  <li className="text-white text-sm py-2 bg-transparent hover:bg-gray-600 w-full flex items-center justify-center cursor-pointer tracking-wider font-semibold">
                    {userContext.user.isLoggedIn && (
                      <p className="text-gray-300">
                        {userContext.user.currentUserName.toUpperCase()}
                      </p>
                    )}
                  </li>
                  <li className=" text-white text-sm py-2 bg-transparent hover:bg-gray-600 w-full flex items-center justify-center cursor-pointer tracking-wider font-semibold">
                    Settings
                  </li>
                  <li className=" text-white text-sm py-2 bg-transparent hover:bg-gray-600 w-full flex items-center justify-center cursor-pointer tracking-wider font-semibold">
                    {userContext.user.isLoggedIn && (
                      <Link onClick={logout} to={"/login"}>
                        Logout
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

<ul
  class="py-1 text-sm text-gray-700 dark:text-gray-200"
  aria-labelledby="dropdownDefault"
>
  <li>
    <a
      href="#"
      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      Dashboard
    </a>
  </li>
  <li>
    <a
      href="#"
      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      Settings
    </a>
  </li>
  <li>
    <a
      href="#"
      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      Earnings
    </a>
  </li>
  <li>
    <a
      href="#"
      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      Sign out
    </a>
  </li>
</ul>;
