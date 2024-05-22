import Script from "next/script";
import React, { useState } from "react";
import { Sidebar } from "./leftSlideBar";
import { ContentShowingPage } from "./contentpage";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSideBarforMobileOpen, setMobileSideBar] = useState(false);
  const toggleNavbar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-white   h-screen  shadow-lg">
      <div className="  bg-white text-xl  container mx-auto flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <span className="text-gray-800 font-semibold text-2xl">Logo</span>
          <ul className="hidden md:flex space-x-4 ml-8">
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Groups
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Users
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <div className="hidden md:block relative">
            <button
              onMouseEnter={toggleProfileMenu}
              onMouseLeave={toggleProfileMenu}
              className="flex items-center focus:outline-none"
            >
              <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                <svg
                  className="h-4 w-4 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              {isProfileOpen && (
                <div className="absolute top-10 right-0 bg-white shadow-md py-2 rounded-md">
                  <ul className="flex flex-col">
                    <li>
                      <a
                        href="#"
                        className="text-gray-800 hover:bg-gray-200 px-4 py-2 block"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-800 hover:bg-gray-200 px-4 py-2 block"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </div>
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Responsive Menu */}
      {isOpen && (
        <div className="md:hidden absolute bg-white w-full ">
          <ul className="flex flex-col space-y-2 px-4 py-2">
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Groups
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Users
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 hover:text-blue-500">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className="flex h-full  w-full ">
        <Sidebar isHiddenOnMobile={isSideBarforMobileOpen}></Sidebar>
        <ContentShowingPage
          setIsHiddenOnMobile={setMobileSideBar}
        ></ContentShowingPage>
      </div>
    </nav>
  );
};
