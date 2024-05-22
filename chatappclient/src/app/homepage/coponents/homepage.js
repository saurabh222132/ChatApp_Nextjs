"use client";
import { selectLoggedInUser } from "@/redux/features/auth/AuthSlice";
import { Navbar } from "@/redux/features/navbar/navbar";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { addOnlineUsers } from "@/redux/features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import socket from "@/app/socket/socket";
import { io } from "socket.io-client";

export const HomepageContent = () => {
  // const socket = useMemo(() => {
  //   return io("http://localhost:5000");
  // }, []);
  const dispatch = useDispatch();

  const loggedinUser = useSelector(selectLoggedInUser);
  console.log(loggedinUser);
  // useEffect(() => {
  //   // const socket = io("http://localhost:5000");
  //   // dispatch(setSocketInstance(socket));

  //   console.log("scoket", socket, "socket", typeof socket);

  //   socket.on("connect", () => {
  //     console.log("connected", socket.id);

  //     socket.emit("onlineUserSend", {
  //       email: loggedinUser.email,
  //       socketId: socket.id,
  //     });
  //   });

  //   socket.on("list-of-online-user-after-any-socket-disconnect", (data) => {
  //     dispatch(addOnlineUsers(data));
  //   });

  //   socket.on("addNewUserToOnlineList", (data) => {
  //     console.log("Received online users", data);
  //     dispatch(addOnlineUsers(data));
  //   });
  //   socket.on("get-message", (data) => {
  //     console.log("get data from other users", data);
  //   });
  // }, []);

  return (
    <div>
      <Navbar></Navbar>

      {/* <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-700 p-4 text-2xl text-green-400 font-bold">
          <h1>Hello viewers</h1>
          <h4>Welcome to my chat App</h4>
          <h4>This App is in currently in Production Mode.</h4>
          <h4>it will be awaitlable soon! wait for the service</h4>
        </div>
      </div> */}
    </div>
  );
};
