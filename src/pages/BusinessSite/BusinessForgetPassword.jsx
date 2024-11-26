import React, { useState } from "react";
import { PostAPI } from "../../utilities/PostAPI";
import { Link, useNavigate } from "react-router-dom";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { inputStyle } from "../../utilities/Style";
import MiniLoader from "../../components/MiniLoader";

export default function BusinessForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const res = await PostAPI("business/forgetpasswordrequest", {
      email: email,
    });
    if (res?.data?.status === "1") {
      setLoader(false);
      navigate("/business-verify-OTP");
      localStorage.setItem("OtpStatus", "businessForgetPassword");
      localStorage.setItem("otpId", res?.data?.data?.otpId);
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
            <div className=" space-y-6 w-full">
              <p className="font-medium text-xl text-center text-themePlaceholder text-opacity-60">
                Business Account Forgot Password
              </p>
              <p className="text-themePlaceholder text-opacity-60 leading-tight">
                Please enter E-mail address of you Business Account and we’ll
                send you a OTP to reset your password
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputStyle}`}
                      autoComplete="off"
                      placeholder="@gmail.com"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-theme border-theme font-medium text-xl text-themeText"
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
