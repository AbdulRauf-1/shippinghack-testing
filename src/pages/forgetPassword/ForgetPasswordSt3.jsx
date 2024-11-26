import React from "react";
import { inputStyle } from "../../utilities/Style";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import MiniLoader from "../../components/MiniLoader";

export default function ForgetPasswordSt3() {
  const navigate = useNavigate();
  const otpId = JSON.parse(localStorage.getItem("otpId"));
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [password, setpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      info_toaster("Enter New Password");
    } else if (confirmpassword === "") {
      info_toaster("Confirm New Password");
    } else if (password !== confirmpassword) {
      info_toaster("password and match password not matched");
    } else {
      setLoader(true);
      const res = await PostAPI("customer/changepasswordotp", {
        password: password,
        otpId: otpId,
        userId: userId,
      });
      if (res?.data?.status === "1") {
        navigate("/sign-in");
        setLoader(false);
        localStorage.removeItem("otpId");
        localStorage.removeItem("userId")
        localStorage.removeItem("email")
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
        <div className="font-switzer border bg-themeText border-themeText shadow-lg  px-2 sm:px-10 pb-8 md:pb-10 pt-2 md:pt-5 space-y-4 md:space-y-6 rounded-md flex flex-col items-center">
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
            <form onSubmit={handleSubmit} className=" space-y-6 w-full">
              <p className="font-medium text-xl text-center text-themePlaceholder text-opacity-60">
                Update Password
              </p>
              <p className="text-themePlaceholder text-opacity-60 leading-tight">
                You forgot password? Don’t worry! fill the fields are shown
                below.
              </p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setpassword(e.target.value)}
                    className={`${inputStyle}`}
                    // autoComplete="off"
                    placeholder="**********"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    name=""
                    id="confirmPassword"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    className={`${inputStyle}`}
                    // autoComplete="off"
                    placeholder="***********"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-md border bg-theme border-theme hover:text-theme hover:bg-themeText font-medium text-lg md:text-xl text-themeText"
              >
                Update password
              </button>
            </form>
          )}
        </div>

        <p className="font-switzer font-light text-sm text-center py-6 text-opacity-60 text-themePlaceholder">
          Copyright © Shipping Hack 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}
