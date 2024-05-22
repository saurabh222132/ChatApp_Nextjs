import socket from "@/app/socket/socket";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedUser } from "../auth/AuthSlice";
// import { selectSocketInstance } from "../auth/AuthSlice";

export const ContentShowingPage = ({ setIsHiddenOnMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const socket = useSelector(selectSocketInstance);
  const selectedSocket = useSelector(selectSelectedUser);
  const [message, setMessage] = useState("");
  console.log(message);
  const toggleNavbar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    setIsHiddenOnMobile(!isOpen);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("recived-message", {
      message: "Hello sir",
      email: selectedSocket,
    });
    // socket.emit("recived-message", { message: "Hello users" });
  };

  return (
    <div className=" md:relative bg-slate-200 w-screen rounded py-1">
      {/* Humbarger menu for the mobile screenn */}
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
      <div className="inputfield md:bottom-14 bottom-3 flex absolute w-full ">
        <input
          type="text"
          value={message}
          placeholder="Put Your messages Here"
          onChange={(e) => {
            e.preventDefault();
            setMessage(e.target.value);
          }}
          className=" px-2 mx-2 rounded focus-ring-info  w-full"
        ></input>
        <span className=" ">
          <button
            onClick={sendMessage}
            className=" bg-green-600 text-xl rounded-lg mx-2 p-2"
          >
            send
          </button>
        </span>
      </div>
    </div>
  );
};
