"use client";

import { useForm } from "react-hook-form";

import {
  LoginUserAsync,
  checkAuthAsync,
  selectLoggedInUser,
  selectLoginMessage,
} from "@/redux/features/auth/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import loginlogo from "./chatapp.svg";
import Image from "next/image";

const Login = () => {
  const dispatch = useDispatch();
  const LoggedInuser = useSelector(selectLoggedInUser);
  const loginMessage = useSelector(selectLoginMessage);
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  const onSubmitForm = (data) => {
    console.log(data);
    dispatch(LoginUserAsync(data));
  };
  return (
    <div className="px-2">
      {LoggedInuser ? (
        <h1> {router.push("/homepage")} </h1>
      ) : (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div>
                <Image src={loginlogo} className="w-32 mx-auto" alt="Logo" />
              </div>
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                  Login to ChatMe
                </h1>
                <div className="w-full flex-1 mt-8">
                  <div className="flex flex-col items-center">
                    <button
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      onClick={() => {
                        window.open(
                          "http://localhost:5000/auth/google/callback",
                          "_self"
                        );
                      }}
                    >
                      <div className="bg-white p-2 rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                          <path
                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                            fill="#4285f4"
                          />
                          <path
                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                            fill="#34a853"
                          />
                          <path
                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                            fill="#fbbc04"
                          />
                          <path
                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                            fill="#ea4335"
                          />
                        </svg>
                      </div>
                      <span className="ml-4">Login with Google</span>
                    </button>
                  </div>
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or login with e-mail
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          required: true,
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email format",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                          required: true,
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                            message:
                              "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number",
                          },
                        })}
                      />
                      {errors.password && (
                        <span className="text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                      {loginMessage ? (
                        <span className={"text-red-500"}>{loginMessage}</span>
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy={7} r={4} />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Login</span>
                      </button>
                      <a href="/register">
                        {" "}
                        <div className="mt-6 text-ls   text-center">
                          Or
                          <span className="border-b text-blue-600 border-blue-700 border-dotted">
                            {" "}
                            create an account{" "}
                          </span>
                        </div>
                      </a>

                      <p className="mt-6 text-xs text-gray-600 text-center">
                        I agree to abide by chatme&apos;s
                        <a
                          href="#"
                          className="border-b border-gray-500 border-dotted"
                        >
                          Terms of Service
                        </a>
                        and its
                        <a
                          href="#"
                          className="border-b border-gray-500 border-dotted"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
