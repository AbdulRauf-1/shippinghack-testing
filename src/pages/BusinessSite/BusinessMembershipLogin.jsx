import React, { useState } from "react";
import MiniLoader from "../../components/MiniLoader";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { inputStyle } from "../../utilities/Style";
import { error_toaster, info_toaster } from "../../utilities/Toaster";
import { loginAPI } from "../../utilities/PostAPI";

export default function BusinessMembershipLogin() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [disable, setdisbale] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setdisbale(true);
    setLoader(true);
    const res = await loginAPI("business/login", {
      email: data?.email,
      password: data?.password,
      signedBy: "",
      dvToken: "hhkhkhkkhkhkk",
    });
    if (res?.data?.status === "1") {
      setdisbale(false);
      setLoader(false);
      navigate("/select-package");
      localStorage.setItem("userType", "business");
      localStorage.setItem("userId", res?.data?.data?.userId);
      localStorage.setItem("accessToken", res?.data?.data?.accessToken);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("firstName", res?.data?.data?.firstName);
      localStorage.setItem("lastName", res?.data?.data?.lastName);
      localStorage.setItem("email", res?.data?.data?.email);
      localStorage.setItem("joinedOn", res?.data?.data?.joinedOn);
      localStorage.setItem("phoneNum", res?.data?.data?.phoneNum);
      info_toaster(res?.data?.message);
    } else {
      setLoader(false);
      setdisbale(false);
      error_toaster(res?.data?.error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-themebackground">
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
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <p className="font-medium text-xl text-center text-themePlaceholder text-opacity-60">
                Business Login
              </p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data?.email}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    autoComplete="off"
                    placeholder="@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={data?.password}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <button
                disabled={disable}
                type="submit"
                className="w-full py-2.5 rounded-md bg-theme border-theme font-medium text-xl text-themeText"
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
              <div className="flex gap-x-2 justify-center">
                <FaFacebook color="#1877F2" size={"40px"} />
                {/* <FcGoogle size={"40px"} /> */}
              </div>
            </div>
          )}

          {!loader && (
            <div className="space-y-10">
              <Link
                className="font-light text-lg text-theme text-center block"
                to="/business-forgot-password"
              >
                Forgot Password?
              </Link>
              <p className="text-themePlaceholder text-opacity-60 font-light">
                Don't have an account?{" "}
                <Link className="text-theme" to="/business-membership-signup">
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
