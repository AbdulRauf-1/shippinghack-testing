import React, { useState } from "react";
import { inputStyle } from "../../utilities/Style";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { Link, useNavigate } from "react-router-dom";
import MiniLoader from "../../components/MiniLoader";

export default function BusinessUpdatePassword() {
  const navigate = useNavigate();
  const otpId = JSON.parse(localStorage.getItem("otpId"));
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [password, setpassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const res = await PostAPI("business/changepasswordotp", {
      password: password,
      otpId: otpId,
      userId: userId,
    });
    if (res?.data?.status === "1") {
      setLoader(false);
      navigate("/business-membership-login");
      localStorage.removeItem("otpId");
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  return (
    <div className="bg-themebackground h-screen">
      <div className="py-10 w-2/5 mx-auto">
        <div className="font-switzer border bg-themeText border-themeText shadow-lg  px-10 pb-10 pt-5 space-y-6 rounded-md flex flex-col items-center">
          {/* image */}
          <Link to="/">
            <div className="w-72 h-28">
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
                Business Account Update Password
              </p>
              <p className="text-themePlaceholder text-opacity-60 leading-tight">
                You forgot password? Don’t worry! fill the fields are shown
                below.
              </p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setpassword(e.target.value)}
                    className={`${inputStyle}`}
                    autoComplete="off"
                    placeholder="**********"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name=""
                    id="confirmPassword"
                    className={`${inputStyle}`}
                    autoComplete="off"
                    placeholder="***********"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-theme border-theme font-medium text-xl text-themeText"
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
