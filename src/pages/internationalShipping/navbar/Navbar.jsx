import React, { useState } from "react";
import { BsSend, BsCashCoin } from "react-icons/bs";
import { AiOutlineCalculator } from "react-icons/ai";
import { SlExclamation } from "react-icons/sl";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { LuPackageSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import MiniLoader from "../../../components/MiniLoader";
import { CircularProgress } from "@chakra-ui/react";
import { info_toaster, success_toaster } from "../../../utilities/Toaster";
import {
  FaAngleDown,
  FaAngleUp,
  FaBars,
  FaRegUser,
  FaRegAddressBook,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import ListItem from "../../../components/ListItem";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineGroups2 } from "react-icons/md";
import { TbPackageExport, TbPackageImport, TbPackages } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [toggle, setToggle] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const loginStatus = localStorage.getItem("loginStatus");

  const handleLogout = () => {
    setLoader(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
      setLoader(false);
      success_toaster("Logout Successfully");
    }, 500);
  };

  return (
    <>
      <div
        className={`px-20 py-2 top-0 flex justify-between items-center ${
          props.position ? props.position : "fixed"
        } z-50 w-full ${props.bgColor ? props.bgColor : "bg-transparent"} ${
          props?.bgOpacity ? props?.bgOpacity : "bg-opacity-100"
        } max-xl:px-10 max-md:px-6`}
      >
        {/* icon start */}
        <div>
          <Link
            to="/"
            className="flex gap-x-2 md:gap-x-1 lg:gap-x-2 items-center"
          >
            <div className="w-8 h-6.5 md:w-8.5 md:h-7.5 lg:w-8 lg:h-8 xl:w-10 xl:h-9 ">
              <img
                loading="lazy"
                src="/images/Logo1.webp"
                alt="Logo"
                className="w-full h-full object-fill"
              />
            </div>
            <p className="font-bold text-themeText md:w-40 lg:w-auto text-sm  lg:text-base">
              THE SHIPPING HACK
            </p>
          </Link>
        </div>
        {/* icon end */}
        {/* nav start */}
        <ul className="[&>li]:text-themeText flex md:gap-x-2.5 min-[800px]:gap-x-2 min-[854px]:gap-x-4 lg:gap-x-3 xl:gap-x-6 items-center font-switzer md:justify-end font-light max-md:hidden max-lg:py-3 min-[768px]:!py-3.5 max-[829px]:!py-3.5 max-lg:w-full">
          <li className="md:text-xs  min-[830px]:text-sm lg:text-sm">
            <Link
              to="/send-parcel"
              className="flex items-center gap-x-2 md:gap-x-0.5   min-[900px]:gap-x-1"
            >
              <span>
                <BsSend
                  color="white"
                  className="text-[20px] max-xl:text-[14px]"
                />
              </span>{" "}
              SEND PARCEL
            </Link>
          </li>
          <li className="md:text-xs min-[830px]:text-sm lg:text-sm">
            <Link
              to="/track-order"
              className="flex items-center gap-x-2 md:gap-x-0.5  min-[900px]:gap-x-1"
            >
              <span>
                <LuPackageSearch
                  color="white"
                  className="text-[20px] max-xl:text-[14px]"
                />
              </span>{" "}
              TRACK ORDER
            </Link>
          </li>
          <li className="md:text-xs min-[830px]:text-sm lg:text-sm">
            <Link
              to="/shipping-calculator"
              className="flex items-center gap-x-2 md:gap-x-0.5  min-[900px]:gap-x-1"
            >
              <span>
                <AiOutlineCalculator
                  color="white"
                  className="text-[20px] max-xl:text-[14px] "
                />
              </span>{" "}
              SHIPPING CALCULATOR
            </Link>
          </li>
          <li className="md:text-xs min-[830px]:text-sm lg:text-sm">
            <Link
              to="/shipping-calculator"
              className="flex items-center gap-x-2 md:gap-x-0.5  min-[900px]:gap-x-1"
            >
              <span>
                <SlExclamation
                  color="white"
                  className="text-[20px] max-xl:text-[14px]"
                />
              </span>{" "}
              ABOUT US
            </Link>
          </li>
          <li className="md:text-xs min-[830px]:text-sm lg:text-sm">
            <Link
              to="/shipping-calculator"
              className="flex items-center gap-x-2 md:gap-x-0.5  min-[900px]:gap-x-1"
            >
              <span>
                <RxQuestionMarkCircled
                  color="white"
                  className="text-[20px] max-xl:text-[14px]"
                />
              </span>{" "}
              HELP
            </Link>
          </li>
        </ul>
        {/* nav end */}
        {/* buttons start */}
        {accessToken && loginStatus ? (
          <div className="[&>button]:font-switzer [&>button]:font-bold [&>button]:rounded-md [&>button]:text-sm max-lg:[&>button]:text-[12px] [&>button]:w-32 [&>button]:py-3 max-[800px]:[&>button]:py-1 max-[800px]:[&>button]:my-2 max-[800px]:[&>button]:text-[10px] max-lg:[&>button]:py-2 max-lg:[&>button]:my-1 flex items-center gap-x-4">
            {loader ? (
              <div className="w-32">
                {" "}
                <CircularProgress isIndeterminate color="#00538C" />
              </div>
            ) : (
              <>
                <ul>
                  <li
                    onClick={() => setToggle(!toggle)}
                    className={`${
                      toggle ? "rounded-none" : "rounded-md"
                    } relative px-2 py-2.5 max-lg:py-2 font-switzer font-bold cursor-pointer flex items-center justify-end gap-x-1 max-lg:ml-auto text-theme max-lg:text-sm bg-white duration-150  border ${
                      window.innerWidth < 1024
                        ? "border-theme"
                        : "border-themeText"
                    }  hover:text-themeText hover:bg-theme max-md:hidden max-lg:absolute max-lg:top-[75px] right-8 lg:right-0`}
                  >
                    {toggle ? (
                      <FaAngleDown className="" size={"22px"} />
                    ) : (
                      <FaAngleUp className="" size={"22px"} />
                    )}
                    <h4 className="max-lg:hidden">My Account</h4>
                    <LuUser2 className="hidden text-2xl max-lg:block" />
                    <ul
                      className={`${
                        toggle ? "setting overflow-hidden" : "hidden"
                      } absolute right-0 xl:left-0 top-[103%] bg-themegray w-52 px-1 py-2 flex flex-col gap-y-1 border border-borderColor
                  [&>li]:cursor-pointer 
                    `}
                    >
                      <ListItem
                        rounded="rounded-none"
                        text="Membership"
                        acitve={props?.title === "Membership" ? true : false}
                        navigate="/membership"
                      />
                      <ListItem
                        rounded="rounded-none"
                        text="User Profile"
                        acitve={props?.title === "User Profile" ? true : false}
                        navigate="/user-profile"
                      />
                      {/* <ListItem
                        rounded="rounded-none"
                        text="Add Payment Method"
                        acitve={
                          props?.title === "Add Payment Method" ? true : false
                        }
                        navigate="/add-payment-method"
                      /> */}

                      <ListItem
                        rounded="rounded-none"
                        text="Add Address"
                        acitve={props?.title === "Add Address" ? true : false}
                        navigate="/add-address"
                      />
                      <ListItem
                        rounded="rounded-none"
                        text="Logout"
                        onClick={handleLogout}
                      />
                    </ul>
                  </li>
                </ul>
                <button className="md:hidden text-white">
                  <FaBars
                    className="text-xl ml-auto"
                    onClick={() => {
                      setToggle(true);
                    }}
                  />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="[&>button]:font-switzer [&>button]:font-bold [&>button]:rounded-md [&>button]:text-sm [&>button]:w-32 [&>button]:py-3 max-xl:w-24 flex items-center gap-x-4">
            <button
              className="text-theme bg-themeText hover:text-themeText hover:bg-theme max-lg:text-white border border-white max-lg:bg-transparent hover:border-theme duration-100 max-md:hidden max-lg:absolute max-lg:top-[75px] max-lg:right-8"
              onClick={() => navigate("/sign-in")}
            >
              LOGIN
            </button>

            <button className="md:hidden text-white">
              <FaBars
                className="text-xl ml-auto"
                onClick={() => {
                  setToggle(true);
                }}
              />
            </button>
            {/* <button
            className="text-white border border-white"
            onClick={() => navigate("/sign-up")}
          >
            SIGNUP
          </button> */}
          </div>
        )}
        {/* buttons end */}
      </div>
      {/* ========Toggle Show=========== */}
      <div
        className={`overflow-y-scroll h-full w-full bg-white fixed  duration-300  left-0 px-5 py-7 z-50 ${
          toggle && window.innerWidth < 768 ? "top-[0px]" : "top-[-1000px]"
        }`}
      >
        <div>
          <Link to="/" className="flex gap-x-2 items-center">
            <div className="">
              <img
                loading="lazy"
                src="/images/LogoB.webp"
                alt="Logo"
                className="w-full h-full object-fill"
              />
            </div>
          </Link>
        </div>

        {accessToken && loginStatus ? (
          <div className="mt-5 flex justify-center gap-2 sm:w-10/12 mx-auto">
            <button
              className="text-white bg-theme w-1/3 max-sm:w-48 p-2.5 rounded-md font-medium border hover:bg-white hover:text-theme border-theme hover:border-theme duration-100 max-md:py-3 "
              onClick={handleLogout}
            >
              LOGOUT
            </button>
            <button
              className="text-theme bg-white w-1/3 max-sm:w-48 p-2.5 border-theme border-[1px] rounded-md font-medium hover:bg-theme hover:text-white hover:border-theme duration-100 max-md:py-3 "
              onClick={() => navigate("/business")}
            >
              FOR BUSINESS
            </button>
          </div>
        ) : (
          <div className="mt-5 flex justify-center gap-2 sm:w-10/12 mx-auto">
            <button
              className="text-white bg-theme w-1/3 p-2.5 rounded-md font-medium border hover:bg-white hover:text-theme border-theme hover:border-theme duration-100 max-md:py-3 "
              onClick={() => navigate("/sign-in")}
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className="text-theme bg-white w-1/3 p-2.5 border-theme border-[1px] rounded-md font-medium hover:bg-theme hover:text-white hover:border-theme duration-100 max-md:py-3 "
            >
              SIGN UP
            </button>
          </div>
        )}
        <div className="bg-white w-full mt-6">
          <ul className="space-y-8">
            <li className="text-sm group">
              <Link
                to="/send-parcel"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <BsSend className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                SEND PARCEL
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/expected-packages"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <TbPackageImport className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                Expected Packages
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/packages-in-warehouse"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <TbPackages className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                Packages in Warehouse
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/sent-packages"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <TbPackageExport className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                Sent Packages
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/order-history"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <FiPackage className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                Order History
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/track-order"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <LuPackageSearch className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                TRACK ORDER
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/shipping-calculator"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <AiOutlineCalculator className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                SHIPPING CALCULATOR
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/membership"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <MdOutlineGroups2 className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                MEMBERSHIP
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/user-profile"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <FaRegUser className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                USER PROFILE
              </Link>
            </li>
            {/* <li className="text-sm group">
              <Link
                to="/add-payment-method"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <BsCashCoin className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                ADD PAYMENT METHOD
              </Link>
            </li> */}
            <li className="text-sm group">
              <Link
                to="/add-address"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <FaRegAddressBook className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                ADD ADDRESS
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/shipping-calculator"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <SlExclamation className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                ABOUT US
              </Link>
            </li>
            <li className="text-sm group">
              <Link
                to="/shipping-calculator"
                className="flex items-center gap-x-2 font-medium text-gray-800 group-hover:text-theme"
              >
                <span>
                  <RxQuestionMarkCircled className="text-[20px] text-gray-800 group-hover:text-theme" />
                </span>{" "}
                HELP
              </Link>
            </li>
          </ul>
        </div>
        <IoMdClose
          className="absolute top-5 right-5 max-sm:right-3 text-3xl cursor-pointer"
          onClick={() => setToggle(false)}
        />
      </div>
    </>
  );
}
