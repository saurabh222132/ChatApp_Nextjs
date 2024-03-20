"use client";
import { useEffect } from "react";
import {
  LoginUserByGoogleAsync,
  selectLoggedInUser,
} from "@/redux/features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { PageLoading } from "@/redux/commonfiles/PageLoading";

const GoogleLoginRedirect = () => {
  const dispatch = useDispatch();
  const loggedInuser = useSelector(selectLoggedInUser);
  const router = useRouter();
  useEffect(() => {
    dispatch(LoginUserByGoogleAsync());
  }, []);
  return (
    <div>
      {" "}
      {!loggedInuser ? <PageLoading></PageLoading> : router.push("/homepage")}
    </div>
  );
};
export default GoogleLoginRedirect;
