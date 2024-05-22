import { useDispatch, useSelector } from "react-redux";
import {
  selectOnlineUsers,
  selectSelectedUser,
  selectTotalUsers,
  setSlectedUser,
} from "../auth/AuthSlice";
import { UserDisplayCard } from "./leftSideBarUserList";
import { ContentShowingPage } from "./contentpage";
import { useState } from "react";

export const Sidebar = ({ isHiddenOnMobile }) => {
  const totalUsers = useSelector(selectTotalUsers);
  const onlineUsers = useSelector(selectOnlineUsers);
  const dispatch = useDispatch();
  return (
    <div
      className={
        isHiddenOnMobile
          ? "  md:block mt-30 h-full rounded overflow-y-scroll bg-slate-200 "
          : "hidden md:block mt-30 h-full rounded overflow-y-scroll bg-slate-200 "
      }
    >
      <ul className=" h-full">
        {totalUsers.map((user, index) => {
          let status = "offline";

          let userfound = onlineUsers.filter(function (onlineUser) {
            console.log("ONline user :", onlineUser, "User : ", user.email);
            return onlineUser.email === user.email;
          });
          // console.log("UserFound", userfound);
          // console.log("online user", onlineUsers);
          if (userfound.length != 0) status = "online";
          return (
            <UserDisplayCard
              email={user.email}
              name={user.name}
              status={status}
            ></UserDisplayCard>
          );
        })}
      </ul>
    </div>
  );
};
