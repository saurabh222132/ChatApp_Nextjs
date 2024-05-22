"use client";
import { selectLoggedInUser } from "@/redux/features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { checkAuthAsync } from "@/redux/features/auth/AuthSlice";

const Protected = (props) => {
  const loggedinUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);
  if (!loggedinUser) {
    return <div> {redirect("/login")} </div>;
  } else {
    return props.children;
  }
};

export default Protected;
