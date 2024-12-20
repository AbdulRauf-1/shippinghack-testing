import React, { useEffect, useRef, useState } from "react";
import { inputStyle } from "../../utilities/Style";
import { Link, useNavigate } from "react-router-dom";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import { stringify } from "postcss";
import MiniLoader from "../../components/MiniLoader";

export default function ForgetPasswordSt2() {
  const otpId = JSON.parse(localStorage.getItem("otpId"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const OtpStatus = localStorage.getItem("OtpStatus");
  const email = localStorage.getItem("email");

  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleVerifyOTP = async () => {
    if (OtpStatus === "signUp") {
      setLoader(true);
      const res = await PostAPI("customer/verifyotpsignup", {
        OTP: `${inputRefs.current[0].value}${inputRefs.current[1].value}${inputRefs.current[2].value}${inputRefs.current[3].value}`,
        otpId: otpId,
        userId: userId,
      });
      if (res?.data?.status === "1") {
        navigate("/sign-up-complete-profile");
        setLoader(false);
        localStorage.removeItem("otpId");
        localStorage.removeItem("OtpStatus");
        localStorage.setItem("userId", JSON.stringify(userId));
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    } else if (OtpStatus === "forgetPassword") {
      setLoader(true);
      const res = await PostAPI("/customer/verifyotp", {
        OTP: `${inputRefs.current[0].value}${inputRefs.current[1].value}${inputRefs.current[2].value}${inputRefs.current[3].value}`,
        otpId: otpId,
      });
      if (res?.data?.status === "1") {
        navigate("/update-password");
        setLoader(false);
        localStorage.setItem("userId", res?.data?.data?.userId);
        localStorage.setItem("otpId", res?.data?.data?.otpId);
        localStorage.removeItem("OtpStatus");
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    }
  };

  const handleInput = (event, index) => {
    const value = event.target.value;
    if (value.length >= 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (
      inputRefs.current[0].value.length === 1 &&
      inputRefs.current[1].value.length === 1 &&
      inputRefs.current[2].value.length === 1 &&
      inputRefs.current[3].value.length === 1
    ) {
      handleVerifyOTP();
    }
  };

  const handleKeyDown = (event, index) => {
    const value = event.target.value;
    if (event.key === "Backspace" && value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = "";
    }
  }; 

  const handleResendOtp = async () => {
    setLoader(true);
    const res = await PostAPI("customer/resendOTP", {
      userId: userId,
    });
    if (res?.data?.status === "1") {
      setLoader(false);
      setTimer(60);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    if (timer === 0) {
      clearTimeout(intervalId);
    }
    return () => clearTimeout(intervalId);
  }, [timer]); 

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
                Verify OTP
              </p>
              <p className="text-themePlaceholder text-opacity-60 leading-tight">
                We send OTP number to this email {email}.{" "}
                {/* <Link to="/forgot-password" className="text-theme"> */}
                <u
                  className="text-theme cursor-pointer"
                  onClick={() => window.history.back()}
                >
                  Change email
                </u>
                {/* </Link> */}
              </p>
              <div className="space-y-6">
                {/* 4 inputs */}
                <div className="flex justify-center items-center gap-x-4 md:gap-x-6 [&>input]:w-16 [&>input]:h-[88px] [&>input]:rounded-lg [&>input]:border [&>input]:border-themePlaceholder [&>input]:border-opacity-60">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <input
                      key={index}
                      type="number"
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="input-code text-6xl flex justify-center px-3.5"
                    />
                  ))}
                </div>
                {/*  */}
                <div className="space-y-2 [&>p]:text-center flex justify-center flex-col items-center">
                  <p className="text-themePlaceholder">
                    00:{timer < 10 ? `0${timer}` : timer}
                  </p>
                  <button
                    disabled={timer === 0 ? false : true}
                    onClick={handleResendOtp}
                    className="text-lg text-theme disabled:cursor-not-allowed"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
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
