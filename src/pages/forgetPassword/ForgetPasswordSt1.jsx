import React, { useState } from "react";
import { inputStyle } from "../../utilities/Style";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import MiniLoader from "../../components/MiniLoader";

export default function ForgetPasswordSt1() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      info_toaster("Enter Email");
    } else {
      setLoader(true);
      const res = await PostAPI("customer/forgetpasswordrequest", {
        email: email,
      });
      if (res?.data?.status === "1") {
        navigate("/verify-otp");
        setLoader(false);
        localStorage.setItem("OtpStatus", "forgetPassword");
        localStorage.setItem("otpId", res?.data?.data?.otpId);
        localStorage.setItem("userId", res?.data?.data?.userId);
        localStorage.setItem("email", email);
        setEmail("");
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    }
  };

  return (
    <div className={`bg-themebackground px-4 sm:px-10 h-screen`}>
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
            <div className="space-y-6 w-full">
              <p className="font-medium text-xl text-center text-themePlaceholder text-opacity-60">
                Forgot Password
              </p>
              <p className="text-themePlaceholder text-opacity-60 leading-tight">
                Please enter your E-mail address and we’ll send you a OTP to
                reset your password
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputStyle}`}
                      autoComplete="off"
                      placeholder="@gmail.com"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="outline-none w-full py-2.5 rounded-md bg-theme border border-theme hover:bg-themeText hover:text-theme font-medium text-lg md:text-xl text-themeText"
                >
                  RESET PASSWORD
                </button>
              </form>
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
