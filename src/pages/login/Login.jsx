import React, { useState } from "react";
import { inputStyle } from "../../utilities/Style";
import { FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { PostAPI, loginAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import MiniLoader from "../../components/MiniLoader";
import {
  handleAppleLogin,
  handleFacebookLogin,
  handleGoogleLogin,
} from "../../utilities/LoginMethods";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";

export default function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [disable, setdisbale] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        setLoader(true);
        setdisbale(true);
        let res = await loginAPI("customer/login", {
          email: values?.email,
          password: values?.password,
          signedBy: "",
          dvToken: "hhkhkhkkhkhkk",
        });
        if (res?.data?.status === "1") {
          setdisbale(false);
          setLoader(false);
          localStorage.setItem("userTypeId", res?.data?.data?.userTypeId);
          localStorage.setItem("userId", res?.data?.data?.userId);
          localStorage.setItem("accessToken", res?.data?.data?.accessToken);
          localStorage.setItem("loginStatus", true);
          localStorage.setItem("firstName", res?.data?.data?.firstName);
          localStorage.setItem("lastName", res?.data?.data?.lastName);
          localStorage.setItem("email", res?.data?.data?.email);
          localStorage.setItem("joinedOn", res?.data?.data?.joinedOn);
          localStorage.setItem("phoneNum", res?.data?.data?.phoneNum);
          navigate("/send-parcel");
          success_toaster(res?.data?.message);
        } else {
          setLoader(false);
          setdisbale(false);
          error_toaster(res?.data?.error);
        }
        action.resetForm();
      },
    });

  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (data?.email === "") {
  //     info_toaster("Enter Email");
  //   } else if (data?.password === "") {
  //     info_toaster("Enter password");
  //   } else {
  //     setdisbale(true);
  //     setLoader(true);
  //     const res = await loginAPI("customer/login", {
  //       email: data?.email,
  //       password: data?.password,
  //       signedBy: "",
  //       dvToken: "hhkhkhkkhkhkk",
  //     });
  //     if (res?.data?.status === "1") {
  //       setdisbale(false);
  //       setLoader(false);
  //       localStorage.setItem("userTypeId", res?.data?.data?.userTypeId);
  //       localStorage.setItem("userId", res?.data?.data?.userId);
  //       localStorage.setItem("accessToken", res?.data?.data?.accessToken);
  //       localStorage.setItem("loginStatus", true);
  //       localStorage.setItem("firstName", res?.data?.data?.firstName);
  //       localStorage.setItem("lastName", res?.data?.data?.lastName);
  //       localStorage.setItem("email", res?.data?.data?.email);
  //       localStorage.setItem("joinedOn", res?.data?.data?.joinedOn);
  //       localStorage.setItem("phoneNum", res?.data?.data?.phoneNum);
  //       setData({
  //         email: "",
  //         password: "",
  //       });
  //       navigate("/send-parcel");
  //       info_toaster(res?.data?.message);
  //     } else {
  //       setLoader(false);
  //       setdisbale(false);
  //       error_toaster(res?.data?.error);
  //     }
  //   }
  // };

  return (
    <div className={`bg-themebackground px-4 sm:px-10 ${loader && "h-screen"}`}>
      <div className="py-10 md:w-4/6 lg:w-2/5 mx-auto">
        <div className="font-switzer border bg-themeText border-themeText shadow-lg px-2 sm:px-10 pb-8 md:pb-10 pt-2 md:pt-5 space-y-4 md:space-y-6 rounded-md flex flex-col items-center">
          {/* image */}
          <Link to="/">
            <div className="w-56 md:w-72 h-24 md:h-28">
              <img
                loading="eager|lazy"
                src="/images/logo.webp"
                alt="shipping hack logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Signup */}
          {loader ? (
            <MiniLoader />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6 w-full"
            >
              <p className="font-medium text-xl text-center text-themePlaceholder text-opacity-60">
                Login
              </p>
              <div className="space-y-2 md:space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputStyle}`}
                    autoComplete="off"
                    placeholder="@gmail.com"
                  />
                  {errors.email && touched.email && (
                    <div className="px-4 text-red-600 space-y-1 pb-1">
                      {/* <hr className="border-none h-0.5 bg-black bg-opacity-20" /> */}
                      <p>{errors.email}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="password">Password</label>
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type={passwordVisibility ? "text" : "password"}
                      name="password"
                      id="password"
                      value={values?.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputStyle}`}
                      placeholder="Enter Password"
                    />
                    <div
                      className="absolute right-3"
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {passwordVisibility ? (
                        <FaEye size={"25px"} />
                      ) : (
                        <FaEyeSlash size={"25px"} />
                      )}
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <div className="px-4 text-red-600 space-y-1 pb-1">
                      {/* <hr className="border-none h-0.5 bg-black bg-opacity-20" /> */}
                      <p>{errors.password}</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="w-full py-2.5 rounded-md border bg-theme border-theme hover:text-theme hover:bg-themeText font-medium text-lg md:text-xl text-themeText"
              >
                Login
              </button>
            </form>
          )}

          {/* or continue with google */}
          {!loader && (
            <div className="space-y-2">
              <p className="text-themePlaceholder text-opacity-60">
                Or continue with
              </p>
              <div className="flex gap-x-2 justify-center items-center">
                <button
                  type="button"
                  // disabled={disable}
                  onClick={async () =>
                    await handleFacebookLogin(navigate, setdisbale)
                  }
                >
                  <FaFacebook color="#1877F2" size={"40px"} />
                </button>
                <button
                  type="button"
                  // disabled={disable}
                  onClick={async () =>
                    await handleGoogleLogin(navigate, setdisbale)
                  }
                >
                  <FcGoogle size={"40px"} />
                </button>
                <button
                  type="button"
                  // disabled={disable}
                  onClick={async () =>
                    await handleAppleLogin(navigate, setdisbale)
                  }
                >
                  <FaApple size={"40px"} />
                </button>
              </div>
            </div>
          )}

          {!loader && (
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <Link
                className="font-light md:text-lg text-theme text-center block"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
              <p className="text-themePlaceholder text-opacity-60 font-light">
                Don't have an account?{" "}
                <Link className="text-theme" to="/sign-up">
                  Sign-up now
                </Link>
              </p>
            </div>
          )}
        </div>

        <p className="font-switzer font-light text-sm text-center py-6 text-opacity-60 text-themePlaceholder">
          Copyright © Shipping Hack 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}
