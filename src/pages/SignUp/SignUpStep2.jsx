import React, { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { inputStyle } from "../../utilities/Style";
import { Form, Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import MiniLoader from "../../components/MiniLoader";

export default function SignUpStep2() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+92",
    phoneNum: "",
    dvToken: "hhsloorrue",
    userId: userId,
    profileImage: "",
    profileImageUrl: "",
  });
  const [loader, setLoader] = useState(false);

  const handleFileUplaod = () => {
    document.querySelector(".fileUplaod").click();
  };

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handlePhone = (e) => {
    if (e.target.value.length < 11) {
      setSignUpData({ ...signUpData, phoneNum: e.target.value });
    } else if (e.target.value.length > 10) {
      info_toaster("cannot exceed more than 10 digits");
    }
  };

  const handleProfileImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setSignUpData({
        ...signUpData,
        profileImage: file,
        profileImageUrl: imageUrl,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signUpData?.profileImage === "") {
      info_toaster("Select profile photo");
    } else if (signUpData?.firstName === "") {
      info_toaster("Enter first name");
    } else if (signUpData?.lastName === "") {
      info_toaster("Enter last name");
    } else if (signUpData?.phoneNum === "") {
      info_toaster("Enter phone number");
    } else if (
      signUpData?.phoneNum.length < 10 ||
      signUpData?.phoneNum.length > 10
    ) {
      info_toaster("Invalid phone number");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("firstName", signUpData?.firstName);
      formData.append("lastName", signUpData?.lastName);
      formData.append("countryCode", signUpData?.countryCode);
      formData.append("phoneNum", signUpData?.phoneNum);
      formData.append("dvToken", signUpData?.dvToken);
      formData.append("userId", userId);
      formData.append("profileImage", signUpData?.profileImage);
      const res = await PostAPI("customer/register", formData);
      console.log("🚀 ~ handleSubmit signupstep 2 ~ res:", res?.data);
      if (res?.data?.status === "1") {
        navigate("/send-parcel");
        setLoader(false);
        setSignUpData({
          firstName: "",
          lastName: "",
          countryCode: "+92",
          phoneNum: "",
          dvToken: "hhsloorrue",
          userId: userId,
          profileImage: "",
          profileImageUrl: "",
        });
        localStorage.setItem("userTypeId", res?.data?.data?.data?.userTypeId);
        localStorage.setItem("userId", res?.data?.data?.data?.userId);
        localStorage.setItem("accessToken", res?.data?.data?.data?.accessToken);
        localStorage.setItem("loginStatus", true);
        localStorage.setItem("firstName", res?.data?.data?.data?.firstName);
        localStorage.setItem("lastName", res?.data?.data?.data?.lastName);
        localStorage.setItem("email", res?.data?.data?.data?.email);
        localStorage.setItem("joinedOn", res?.data?.data?.data?.joinedOn);
        localStorage.setItem("phoneNum", res?.data?.data?.data?.phoneNum);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    }
  };

  return (
    <div className={`bg-themebackground px-4 sm:px-10 ${loader && "h-screen"}`}>
      <div className="py-10 md:w-4/6 lg:w-2/5 mx-auto">
        {loader ? (
          <div className="border bg-themeText border-themeText shadow-lg px-2 sm:px-10 pb-8 md:pb-10 pt-5 space-y-4 md:space-y-6 rounded-md">
            <div className="flex flex-col items-center gap-y-4">
              <p className="font-bold font-helvetica md:text-3xl text-theme">
                Complete your profile
              </p>
              <p className="font-light text-themePlaceholder text-opacity-60 font-switzer duration-100">
                We just need few details from you.
              </p>
            </div>
            <MiniLoader />
          </div>
        ) : (
          <div className="border bg-themeText border-themeText shadow-lg px-2 sm:px-10 pb-8 md:pb-10 pt-5 space-y-4 md:space-y-6 rounded-md flex flex-col items-center">
            {/* upper section */}
            <div className="flex flex-col items-center gap-y-4">
              <p className="font-bold font-helvetica text-3xl text-theme">
                Complete your profile
              </p>
              <p className="font-light text-themePlaceholder text-opacity-60 font-switzer duration-100">
                We just need few details from you.
              </p>

              <div className="flex flex-col items-center gap-2">
                {signUpData?.profileImage ? (
                  <button
                    className="h-16 md:h-20 w-16 md:w-32"
                    onClick={handleFileUplaod}
                  >
                    <img
                      loading="eager|lazy"
                      src={
                        signUpData?.profileImage
                          ? `${signUpData?.profileImageUrl}`
                          : ""
                      }
                      alt="profile image"
                      className="w-full h-full object-fill"
                    />
                  </button>
                ) : (
                  <button
                    onClick={handleFileUplaod}
                    className="w-16 md:w-20 h-16 md:h-20 relative bg-[#F4F5FA] rounded-full flex items-center justify-center"
                  >
                    <LuImagePlus
                      size={"30px"}
                      color="#000000"
                      opacity={"60%"}
                    />
                  </button>
                )}
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleProfileImage}
                  id="profileImage"
                  className="hidden h-full w-full absolute fileUplaod outline-none"
                />
                <p className="text-themePlaceholder text-opacity-60 font-switzer">
                  Upload picture
                </p>
              </div>
            </div>

            {/* Form section */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 w-full font-switzer"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={signUpData?.firstName}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    autoComplete="off"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="lasttName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={signUpData?.lastName}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    autoComplete="off"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phoneNum">Phone number</label>
                  <div className="flex space-x-3 w-full">
                    <PhoneInput
                      inputStyle={{
                        display: "block",
                        width: window.innerWidth < 768 ? "85px" : "100px",
                        height: "45px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        color: "black",
                        border: "1px solid #E2E8F0",
                        borderRadius: "6px",
                      }}
                      country={"pr"}
                      onChange={(countryCode) =>
                        setSignUpData({
                          ...signUpData,
                          countryCode: countryCode,
                        })
                      }
                      className="col-span-1"
                    />
                    <input
                      type="number"
                      name="phoneNum"
                      value={signUpData?.phoneNum}
                      onChange={handlePhone}
                      className={`!w-full resize-none font-switzer text-sm px-4  placeholder:text-[#000000] placeholder:text-opacity-60 py-3 rounded-md focus:outline-none bg-themegray border border-borderColor`}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
              <button className="w-full py-2.5 font-switzer rounded-md bg-theme border-theme font-medium text-lg md:text-xl text-themeText duration-100">
                Submit & Proceed
              </button>
              {/* <p className="text-center text-theme font-switzer">
              <Link to="/">Skip This Step</Link>
            </p> */}
            </form>
          </div>
        )}
        <p className="font-switzer font-light text-sm text-center py-6 text-opacity-60 text-themePlaceholder">
          Copyright © Shipping Hack 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}
