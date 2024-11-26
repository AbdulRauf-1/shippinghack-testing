import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Form, Link, useNavigate } from "react-router-dom";
import { currentDate } from "../../utilities/Date";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import MiniLoader from "../../components/MiniLoader";

export default function BusinessMembershipStep4() {
  const subscriptionData = JSON.parse(localStorage.getItem("subscriptionData"));
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const handleCancel = () => {
    navigate("/select-package");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const res = await PostAPI("business/CreateSubscription", {
      planId: subscriptionData?.planId,
      billingFrequency: subscriptionData?.billingFrequency,
      cardToken: subscriptionData?.cardToken,
    });
    if (res?.data?.status === "1") {
      navigate("/account-activation-completed");
      localStorage.setItem("userTypeId", 3);
      setLoader(false);
      success_toaster(res?.data?.message);
      localStorage.removeItem("subscriptionData");
    } else {
      setLoader(false);
      error_toaster(res?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`px-6 md:px-10 lg:px-20 bg-themebackground pb-10 ${
        loader ? "h-screen" : "h-auto"
      }`}
    >
      <Link to="/">
        <div className="w-56 h-24">
          <img
            loading="eager|lazy"
            src="/images/logo.webp"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      <div className="space-y-4 md:space-y-5 p-6 md:p-8 lg:p-10 shadow-lg rounded-lg bg-themeText lg:w-3/4 mx-auto font-switzer">
        {/* order Summary */}
        {loader ? (
          <MiniLoader />
        ) : (
          <div className="space-y-4">
            <p className="text-themePlaceholder text-2xl md:text-3xl">
              Confirm Membership
            </p>
            <div className="space-y-1 [&>p]:flex grid grid-cols-3">
              <p className="text-themePlaceholder text-opacity-80 text-lg md:text-xl">
                Reference:
              </p>{" "}
              <p className="text-themePlaceholder text-opacity-60 text-lg md:text-xl col-span-2 max-sm:text-end">
                {subscriptionData?.planId}
              </p>
              <p className="text-themePlaceholder text-opacity-80 text-lg md:text-xl">
                Description:
              </p>{" "}
              <p className="text-themePlaceholder text-opacity-60 text-lg md:text-xl col-span-2 max-sm:flex max-sm:justify-end">
                Shipping Hack
              </p>
              <p className="text-themePlaceholder text-opacity-80 text-lg md:text-xl">
                Amount (USD):
              </p>{" "}
              <p className="text-themePlaceholder text-opacity-60 text-lg md:text-xl col-span-2 max-sm:flex max-sm:justify-end">
                {subscriptionData?.amount}
              </p>
            </div>
          </div>
        )}

        {!loader && <hr className="text-themePlaceholder text-opacity-20" />}
        {/* cardholder Authentication */}

        {!loader && (
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="flex justify-between items-center">
                <span className="text-themePlaceholder text-xl md:text-2xl">
                  Cardholder authentication
                </span>{" "}
                <span className="block h-8 w-12">
                  <img
                    loading="eager|lazy"
                    src="/images/master-card.webp"
                    alt="card-info"
                    className="w-full h-full object-contain"
                  />
                </span>
              </p>
              <div className="space-y-2 md:space-y-4">
                <p className="text-lg md:text-xl text-themePlaceholder text-opacity-80 leading-tight">
                  Please do not click the refresh or back button as this may
                  interrupt or terminate your <br /> transaction.
                </p>
                <p className="text-base text-themePlaceholder text-opacity-60 leading-tight">
                  To increase the security of online transaction, card issuers
                  have introduced 3D secure. you have chosen a card that is part
                  of 3D secure scheme so you will need to authenticate yourself
                  with your bank.
                </p>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2">
              <div className="h-8 w-12">
                <img
                  loading="eager|lazy"
                  src="/images/master-card.webp"
                  alt="card-info"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="h-full w-[1px] bg-themePlaceholder bg-opacity-60 text-themeText">
                .
              </div>
              <p className="text-xl md:text-2xl text-themePlaceholder text-opacity-60">
                ID CHECK
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-themePlaceholder">
                Transaction
              </p>
              {/* <p className="text-sm text-themePlaceholder text-opacity-60">
              Enter the confirmation code you received to confirm the
              transaction. <br /> Code has been sent to: ************0958
            </p> */}
              <div className="grid grid-cols-2 md:grid-cols-7 gap-y-2 text-xs">
                <p className="text-themePlaceholder text-opacity-60 md:col-start-3">
                  Merchant
                </p>
                <p className="text-themePlaceholder">The Shipping Hack</p>
                <p className="text-themePlaceholder text-opacity-60 md:col-start-3">
                  Amount
                </p>
                <p className="text-themePlaceholder">
                  USD {subscriptionData?.amount}
                </p>
                <p className="text-themePlaceholder text-opacity-60 md:col-start-3">
                  Date
                </p>
                <p className="text-themePlaceholder">{currentDate}</p>
                <p className="text-themePlaceholder text-opacity-60 md:col-start-3">
                  Card Number
                </p>
                <p className="text-themePlaceholder">
                  ************{subscriptionData?.cardNumber}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* <hr className="text-themePlaceholder text-opacity-20" /> */}

        {/* Confirmation Code */}
        {/* <div className="grid grid-cols-7">
          <p className=" col-start-3 text-sm text-themePlaceholder text-opacity-80">
            Confirmation code
          </p>
          <div className="[&>div>button]:rounded-md [&>div>button]:px-5 col-span-2 space-y-4">
            <div>
              <button className="text-themePlaceholder text-opacity-60 border border-borderColor bg-themegray py-2">
                Enter Code
              </button>
            </div>
            <div>
              <button className="text-theme border border-theme py-2">
                Request new code
              </button>
            </div>
          </div>
        </div> */}

        {!loader && <hr className="text-themePlaceholder text-opacity-20" />}

        {/* cancel and confirm buttons */}
        {!loader && (
          <div className="md:w-2/5 mx-auto space-y-6">
            <div className="flex justify-center items-center gap-x-4 md:gap-x-6 font-medium [&>button]:py-2.5 [&>button]:w-24  [&>button]:md:w-32 [&>button]:rounded-md">
              <button
                type="button"
                onClick={handleCancel}
                className="text-theme border border-theme py-2.5  rounded-md hover:text-themeText hover:bg-theme"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-theme border border-theme text-themeText hover:bg-themeText hover:text-theme"
              >
                Confirm
              </button>
            </div>
            <p className="text-lg md:text-xl text-theme text-center">Help</p>
          </div>
        )}

        <div className="[&>p]:text-center space-y-2 md:space-y-4">
          <p className="text-themePlaceholder text-opacity-60 text-sm">
            When you submit your transaction for processing by Worldpay you
            confirm you acceptance fo Worldpay’s privacy policy.
          </p>
          <p className="text-themePlaceholder text-opacity-80 text-xs md:text-sm">
            &copy; Worldpay 2013-2024. All rights reserved.
          </p>
        </div>
      </div>
    </form>
  );
}
