import React, { useState } from "react";
import { inputStyle, inputStyle2 } from "../../utilities/Style";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, PostAPI } from "../../utilities/PostAPI";
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

export default function SignUpStep1() {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loader, setLoader] = useState(false);
  const [disable, setdisbale] = useState(false);

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signUpData?.email === "") {
      info_toaster("Enter Email");
    } else if (signUpData?.password === "") {
      info_toaster("Enter password");
    } else if (signUpData?.confirmPassword === "") {
      info_toaster("Enter confirm Password");
    } else if (signUpData?.password !== signUpData?.confirmPassword) {
      info_toaster("password and confirm password not matched");
    } else {
      setLoader(true);
      const res = await PostAPI("customer/sendotp", {
        email: signUpData?.email,
        password: signUpData?.password,
        dvToken: "hhkhkhkkhkhkk",
      });
      if (res?.data?.status === "1") {
        navigate("/verify-otp");
        setLoader(false);
        setSignUpData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        localStorage.setItem("OtpStatus", "signUp");
        localStorage.setItem("userId", res?.data?.data?.userId);
        localStorage.setItem("otpId", res?.data?.data?.otpId);
        localStorage.setItem("email", signUpData?.email);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    }

    // localStorage.setItem(
    //   "signUpDataStep1",
    //   JSON.stringify({
    //     email: signUpData?.email,
    //     password: signUpData?.password,
    //   })
    // );
  };

  return (
    <div
      className={`bg-themebackground px-4 sm:px-10 ${loader && "!h-screen"}`}
    >
      <div className="py-10 md:w-4/6 lg:w-2/5 mx-auto">
        {loader ? (
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
            <MiniLoader />
          </div>
        ) : (
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
            <form onSubmit={handleSubmit} className=" space-y-6 w-full">
              <p className="font-medium text-xl text-center text-themePlaceholder text-opacity-60">
                Signup
              </p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={signUpData?.email}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    autoComplete="off"
                    placeholder="@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="enterPassword">Create Password</label>
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type={passwordVisibility?.password ? "text" : "password"}
                      name="password"
                      id="enterPassword"
                      value={signUpData?.password}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      autoComplete="off"
                      placeholder="Enter Password"
                    />
                    <div
                      className="absolute right-3"
                      onClick={() =>
                        setPasswordVisibility({
                          ...passwordVisibility,
                          password: !passwordVisibility?.password,
                        })
                      }
                    >
                      {passwordVisibility?.password ? (
                        <FaEye size={"25px"} />
                      ) : (
                        <FaEyeSlash size={"25px"} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="confirmPassword">Confirm Password</label>{" "}
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type={
                        passwordVisibility?.confirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      id="confirmPassword"
                      value={signUpData?.confirmPassword}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      autoComplete="off"
                      placeholder="Confirm Password"
                    />
                    <div
                      className="absolute right-3"
                      onClick={() =>
                        setPasswordVisibility({
                          ...passwordVisibility,
                          confirmPassword: !passwordVisibility?.confirmPassword,
                        })
                      }
                    >
                      {passwordVisibility?.confirmPassword ? (
                        <FaEye size={"25px"} />
                      ) : (
                        <FaEyeSlash size={"25px"} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-theme border border-theme hover:text-theme hover:bg-themeText outline-none font-medium text-lg md:text-xl text-themeText"
              >
                SignUp
              </button>
            </form>

            {/* or continue with google */}
            <div className="space-y-2">
              <p className="text-themePlaceholder text-opacity-60">
                Or continue with
              </p>
              <div className="flex gap-x-2 justify-center items-center">
                <button
                  type="button"
                  disabled={disable}
                  onClick={async () =>
                    await handleFacebookLogin(navigate, setdisbale)
                  }
                >
                  <FaFacebook color="#1877F2" size={"40px"} />
                </button>
                <button
                  type="button"
                  disabled={disable}
                  onClick={async () =>
                    await handleGoogleLogin(navigate, setdisbale)
                  }
                >
                  <FcGoogle size={"40px"} />
                </button>
                <button
                  type="button"
                  disabled={disable}
                  onClick={async () =>
                    await handleAppleLogin(navigate, setdisbale)
                  }
                >
                  <FaApple size={"40px"} />
                </button>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <Link
                className="font-light md:text-lg text-theme text-center block"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
              <p className="text-themePlaceholder text-opacity-60 font-light">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-theme">
                  Login
                </Link>
              </p>
            </div>
          </div>
        )}

        <p className="font-switzer font-light md:text-sm text-center py-6 text-opacity-60 text-themePlaceholder">
          Copyright © Shipping Hack 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}
