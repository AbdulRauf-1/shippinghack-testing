import React, { useEffect, useState } from "react";
import { inputStyle } from "../../utilities/Style";
import { Checkbox } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import MiniLoader from "../../components/MiniLoader";
import Loader from "../../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function BusinessMembershipSignup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState("");
  const [disable, setdisbale] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referral: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data?.firstName === "") {
      info_toaster("enter first name");
    } else if (data.lastName === "") {
      info_toaster("enter last name");
    } else if (data?.businessName === "") {
      info_toaster("enter business name");
    } else if (data?.email === "") {
      info_toaster("enter email");
    } else if (data?.password === "") {
      info_toaster("enter password");
    } else if (data?.confirmPassword === "") {
      info_toaster("enter confirm password ");
    } else if (data?.password !== data?.confirmPassword) {
      info_toaster("password and confirm password not matched");
    } else {
      setLoader("mini");
      setdisbale(true);
      const res = await PostAPI("business/registerBusiness", {
        firstName: data?.firstName,
        lastName: data?.lastName,
        businessName: data?.businessName,
        email: data?.email,
        password: data?.password,
        referral: data?.referral,
      });
      if (res?.data?.status === "1") {
        setLoader("");
        setdisbale(false);
        setData({
          firstName: "",
          lastName: "",
          businessName: "",
          email: "",
          password: "",
          confirmPassword: "",
          referral: "",
        });
        navigate("/business-verify-OTP");
        localStorage.setItem("OtpStatus", "businesSignup");
        localStorage.setItem("userId", res?.data?.data?.userId);
        localStorage.setItem("otpId", res?.data?.data?.otpId);
        success_toaster(res?.data?.message);
      } else {
        setLoader("");
        setdisbale(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  useEffect(() => {
    setLoader("main");
    setTimeout(() => {
      setLoader("");
    }, 200);
  }, []);

  return loader === "main" ? (
    <Loader />
  ) : (
    <div
      className={`px-4 sm:px-10 lg:px-20 bg-themebackground ${
        loader && "h-screen"
      }`}
    >
      <Link to="/">
        <div className="w-56 md:w-72 h-24 md:h-28">
          <img
            loading="eager|lazy"
            src="/images/logo.webp"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      <form onSubmit={handleSubmit} className="font-switzer space-y-6 md:space-y-8 lg:py-10">
        <div className="bg-themeText md:w-4/6 lg:w-3/5 mx-auto space-y-6 md:space-y-8 lg:space-y-10 px-6 md:px-10 lg:px-20 py-10 shadow-lg">
          <div className="space-y-2">
            <p className="text-themePlaceholder text-4xl font-semibold">
              Welcome
            </p>
            <p className="text-themePlaceholder text-opacity-60 md:text-lg">
              We are excited you are here. Lets get you signed up. Please fill
              out the information below
            </p>
          </div>
          {loader === "mini" ? (
            <MiniLoader />
          ) : (
            <div className="space-y-6">
              {/* Inputs list */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={data?.firstName}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="First Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={data?.lastName}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Last Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={data?.businessName}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data?.email}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="@gmail.com"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password">Password</label>
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type={passwordVisibility?.password ? "text" : "password"}
                      autoComplete="off"
                      name="password"
                      id="password"
                      value={data?.password}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="Enter Password"
                    />{" "}
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
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type={
                        passwordVisibility?.confirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      id="confirmPassword"
                      value={data?.confirmPassword}
                      onChange={handleChange}
                      className={`${inputStyle}`}
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
                <div className="space-y-1">
                  <label htmlFor="referral">
                    Enter Referral Code (Optional)
                  </label>
                  <div>
                    <input
                      type="text"
                      name="referral"
                      id="referral"
                      value={data?.referral}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="ARF408"
                    />
                    <p className="font-light text-themePlaceholder text-opacity-80">
                      Referrer’s Suite Number
                    </p>
                  </div>
                </div>
              </div>

              {/* create account */}
              <div className="space-y-4">
                <p className="flex items-start gap-x-2">
                  <div>
                    <input type="checkbox" name="" id="" className="w-4 md:w-6 h-4 md:h-6" />
                  </div>
                  <label
                    htmlFor=""
                    className="leading-tight text-themePlaceholder max-sm:text-sm text-opacity-80 font-light "
                  >
                    I don’t want to receive emails about new Shipping Hack
                    services, Shipping Hack info, or special offers
                  </label>
                </p>
                <button
                  disabled={disable}
                  type="submit"
                  className="bg-theme text-themeText rounded-md py-2.5 md:text-lg w-full"
                >
                  Create Your Account
                </button>
              </div>

              {/* br line */}
              <div className="flex items-center gap-x-2 md:gap-x-4 [&>div]:w-full ">
                <div>
                  <hr className="bg-themePlaceholder bg-opacity-80" />
                </div>{" "}
                <p className="text-themePlaceholder text-opacity-60 text-lg">
                  Or
                </p>{" "}
                <div className="bg-themePlaceholder bg-opacity-80">
                  <hr />
                </div>
              </div>

              {/* button facebook and policy */}
              <div className="space-y-4 md:space-y-4">
                <div className="w-4/5 mx-auto">
                  <button className="text-[#3D5A98] border border-[#3D5A98] rounded-md py-2.5 w-full font-medium md:text-lg">
                    Signup with Facebook
                  </button>
                </div>
                <div className="space-y-2">
                  {/* <Link
                    className="font-light text-lg text-theme text-center block"
                    to="/business-forgot-password"
                  >
                    Forgot Password?
                  </Link> */}
                  <p className="text-themePlaceholder text-center text-opacity-60 font-light md:text-lg">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="text-theme">
                      Login
                    </Link>
                  </p>
                </div>
                <p className="[&>span]:text-theme md:text-lg leading-tight">
                  By creating an account, you agree to Shipping Hack’s{" "}
                  <span>Terms of Services</span> and{" "}
                  <span>Privacy Policy.</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-10">
          Copyright &copy; Shipping Hack 2024. All rights reserved
        </p>
      </form>
    </div>
  );
}
