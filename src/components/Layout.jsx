import React, { useEffect, useState } from "react";
import Navbar from "../pages/internationalShipping/navbar/Navbar";
import ListItem from "./ListItem";
import Footer from "./Footer";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Loader from "./Loader";
import { success_toaster } from "../utilities/Toaster";

export default function Layout(props) {
  const navigate = useNavigate();

  const [activeItemName, setActiveItemName] = useState(props?.title);
  const [display, setDisplay] = useState(true);
  const [loader, setLaoder] = useState(false);

  const handleLogout = () => {
    setLaoder(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
      setLaoder(false);
      success_toaster("Logout Successfully");
    }, 500);
  };

  // useEffect(() => {
  //   if (
  //     props?.title === "User Profile" ||
  //     props?.title === "Add Payment Method" ||
  //     props?.title === "Add Address"
  //   ) {
  //     setDisplay(true);
  //   } else {
  //     setDisplay(false);
  //   }
  // }, []);

  return loader ? (
    <Loader />
  ) : (
    <div>
      <div ref={props?.scrollRef} className="relative w-full h-16">
        <Navbar
          title={props?.title}
          bgColor={"bg-theme"}
          bgOpacity={false}
          position={"fixed"}
        />
      </div>
      {/* middle section start */}
      <div className="bg-themeText">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6 xl:gap-x-10 mx-auto 2xl::w-4/5 xl:w-10/12 max-md:px-6 max-xl:px-10 py-8 sm:py-10 md:py-12 lg:py-16">
          {/* left bar portion */}
          <div className="hidden relative lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <ul className="flex flex-col gap-y-2 bg-themegray rounded-md p-5 w-full border border-borderColor">
                <ListItem
                  rounded="rounded-md"
                  text="Send Parcel"
                  acitve={props?.title === "Send Parcel" ? true : false}
                  navigate="/send-parcel"
                  onClick={() => {
                    setDisplay(false);
                    // setActiveItemName("Send Parcel");
                  }}
                />
                <ListItem
                  rounded="rounded-md"
                  text="Expected Packages"
                  acitve={props?.title === "Expected Packages" ? true : false}
                  navigate="/expected-packages"
                  onClick={() => {
                    setDisplay(false);
                    // setActiveItemName("Expected Packages");
                  }}
                />
                <ListItem
                  rounded="rounded-md"
                  text="Packages in Warehouse"
                  acitve={
                    props?.title === "Packages in Warehouse" ? true : false
                  }
                  navigate="/packages-in-warehouse"
                  onClick={() => {
                    setDisplay(false);
                  }}
                />
                <ListItem
                  rounded="rounded-md"
                  text="Sent Packages"
                  acitve={props?.title === "Sent Packages" ? true : false}
                  navigate="/sent-packages"
                  onClick={() => {
                    setDisplay(false);
                  }}
                />
                <ListItem
                  rounded="rounded-md"
                  text="Order History"
                  acitve={props?.title === "Order History" ? true : false}
                  navigate="/order-history"
                  onClick={() => {
                    setDisplay(false);
                  }}
                />
                {/* <ListItem
                rounded="rounded-md"
                text="Membership"
                acitve={props?.title === "Membership" ? true : false}
                onClick={() => {
                  setDisplay(false);
                  navigate("/membership");
                }}
              /> */}
                {/* <ListItem
              rounded="rounded-md"
                text="Warehouse Address"
                acitve={activeItemName === "Warehouse Address" ? true : false}
                onClick={() => {
                  setDisplay(false);
                  setActiveItemName("Warehouse Address");
                }}
              /> */}

                {/* <ListItem
                rounded="rounded-md"
                text="Settings"
                showIcon={true}
                icon={
                  display ? (
                    <FaAngleDown size={"22px"} />
                  ) : (
                    <FaAngleUp size={"22px"} />
                  )
                }
                acitve={
                  props?.title === "User Profile" ||
                  props?.title === "Add Payment Method" ||
                  props?.title === "Add Address" ||
                  display
                    ? true
                    : false
                }
                onClick={() => {
                  setDisplay(!display);
                }}
              /> */}

                {/* <div
                className={`setting ${
                  display ? " space-y-2 block overflow-hidden" : "hidden"
                }`}
              >
                <ListItem
                  rounded="rounded-md"
                  text="User Profile"
                  acitve={props?.title === "User Profile" ? true : false}
                  onClick={() => {
                    setDisplay(true);
                    navigate("/user-profile");
                  }}
                />

                <ListItem
                  rounded="rounded-md"
                  text="Add Payment Method"
                  acitve={props?.title === "Add Payment Method" ? true : false}
                  onClick={() => {
                    setDisplay(true);
                    navigate("/add-payment-method");
                  }}
                />

                <ListItem
                  rounded="rounded-md"
                  text="Add Address"
                  acitve={props?.title === "Add Address" ? true : false}
                  onClick={() => {
                    setDisplay(true);
                    navigate("/add-address");
                  }}
                />
              </div> */}

                {/* <ListItem
                rounded="rounded-md"
                text="Logout"
                acitve={activeItemName === "Logout" ? true : false}
                onClick={handleLogout}
              /> */}
              </ul>
            </div>
          </div>
          {/* right side portion */}
          <div className="md:col-span-9 space-y-6">
            <div className="flex items-end gap-x-2">
              {props?.button && (
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-x-1 text-themeText bg-theme hover:text-theme hover:bg-themeText border border-theme 
              border-opacity-60 py-2 px-2 rounded-md font-switzer font-semibold"
                >
                  {" "}
                  <span>{props?.buttonIcon && props?.buttonIcon}</span>
                  {props?.buttonText}
                </button>
              )}
              <p className="font-switzer font-bold text-3xl">
                {activeItemName}
              </p>
            </div>
            <div>{props?.rightSide}</div>
          </div>
        </div>
      </div>
      {/* middle section end */}

      <div className="bg-theme">
        <Footer />
      </div>
    </div>
  );
}
