import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Layout from "../../../components/Layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";
import GetAPI from "../../../utilities/GetAPI";
import Loader from "../../../components/Loader";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import MiniLoader from "../../../components/MiniLoader";
import { useNavigate } from "react-router-dom";
import { inputStyle } from "../../../utilities/Style";
import { PutAPI } from "../../../utilities/PutAPI";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function MyMembership() {
  const navigate = useNavigate();
  const userTypeId = localStorage.getItem("userTypeId");
  const [modal, setModal] = useState(""); // delete, buy
  const [loader, setLoader] = useState(false);
  const [businessUserData, setBusinessUserData] = useState({
    businessName: "",
    referral: "",
  });

  const { data, reFetch } = GetAPI("business/getSubID");
  const { data: userBrainTreeStatus } = GetAPI("business/checkCustomer");

  const onClose = () => {
    setModal("");
  };

  const handleChange = (e) => {
    setBusinessUserData({
      ...businessUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modal === "delete") {
      setLoader(true);
      const res = await PostAPI(
        `business/CancelSubscription/?subscriptionId=${data?.data?.subscriptionId}`
      );
      if (res?.data?.status === "1") {
        setLoader(false);
        success_toaster(res?.data?.message);
        setModal("");
        reFetch();
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    } else {
      if (businessUserData === "") {
        info_toaster("Business name null");
      } else {
        setLoader(true);
        const res = await PutAPI(`business/convertCustomer`, {
          businessName: businessUserData?.businessName,
          referral: businessUserData?.referral,
        });
        if (res?.data?.status === "1") {
          setLoader(false);
          success_toaster(res?.data?.message);
          navigate("/select-package");
          localStorage.setItem("userTypeId", res?.data?.data?.userTypeId);
          setModal("");
          reFetch();
        } else {
          setLoader(false);
          error_toaster(res?.data?.error);
        }
      }
    }
  };

  const handleMembership = () => {
    if (data?.data) {
      info_toaster("Subscription is already active");
    } else {
      if (userTypeId === "3" || userBrainTreeStatus?.data?.userExists) {
        navigate("/business");
      } else {
        setModal("buy");
      }
    }
  };

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Membership"
      rightSide={
        data?.length === 0 ? (
          <Loader />
        ) : (
          <div className="space-y-6 md:space-y-8 lg:space-y-10 font-switzer flex flex-col justify-between">
            {data?.data ? (
              <div className="space-y-4">
                <p className="text-themePlaceholder text-opacity-80 text-xl">
                  Sigi Tech
                </p>
                <div className="[&>p]:text-themePlaceholder [&>p]:text-opacity-60 space-y-1">
                  <p>444 Alaska Avenue</p>
                  <p>Suit #AUW240</p>
                  <p>Torrance, CA 90503</p>
                  <p>USA</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-themeRed text-xl md:text-2xl font-helvetica py-24">
                No Membership is Activated Yet !!
              </p>
            )}
            {data?.data && (
              <p className="font-bold text-2xl md:text-3xl">
                Membership Status
              </p>
            )}
            {data?.data && (
              <div className="grid grid-cols-5 md:grid-cols-7 md:grid-rows-3 gap-y-4 text-lg md:text-xl [&>p]:text-themePlaceholder [&>p]:text-opacity-60">
                {/* <p className="col-span-3">Current Membership Type</p> */}
                {/* <p className="col-span-4">Free Member</p> */}
                <p className="col-span-3">Your Current Billing Cycle</p>
                <p className="col-span-2 md:col-span-4">
                  {data?.data?.subscriptiondata?.transactions[0]?.planId.includes(
                    "MONTHLY"
                  )
                    ? "Monthly"
                    : "Yearly"}
                </p>
                <p className="col-span-3">Membership Fee</p>
                <p className="col-span-2 md:col-span-4">
                  <span className="text-sm">$</span>
                  {data?.data?.subscriptiondata?.subscription?.price}
                </p>
              </div>
            )}

            <div className="flex flex-row max-sm:flex-col-reverse items-end md:items-center sm:justify-end gap-4">
              {data?.data && (
                <button
                  onClick={() => setModal("delete")}
                  className="gap-x-2 text-theme border border-theme  hover:text-themeText hover:bg-theme
              border-opacity-60 max-sm:w-52 py-2.5 px-2 md:px-5 rounded-md font-switzer font-semibold duration-100 text-center"
                >
                  Cancel Membership
                </button>
              )}
              <button
                onClick={handleMembership}
                className="flex items-center gap-x-1 md:gap-x-2 hover:text-theme hover:bg-themeText border border-theme  text-themeText bg-theme
              border-opacity-60 max-sm:w-52 py-2.5 px-2 md:px-5 rounded-md font-switzer font-semibold duration-100"
              >
                {" "}
                <span>
                  <HiOutlinePlusCircle />
                </span>
                {data?.data ? "Upgrade" : "Buy"} Membership
              </button>
            </div>

            <Modal
              isOpen={modal ? true : false}
              onClose={onClose}
              isCentered
              motionPreset="slideInBottom"
              size={window.innerWidth < 768 ? "sm" : "2xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {!loader && modal === "delete" ? (
                    <p className="text-xl md:text-2xl font-switzer text-themePlaceholder text-center pt-2 md:pt-5 text-opacity-80">
                      Cancel Subscription!
                    </p>
                  ) : (
                    !loader && (
                      <p className="text-xl md:text-2xl font-switzer text-themePlaceholder text-center pt-2 md:pt-5 text-opacity-80">
                        Buy MemberShip
                      </p>
                    )
                  )}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {!loader && modal === "delete" ? (
                    <div>
                      <p className="flex items-center justify-center gap-x-2 pb-4 md:pb-6 text-lg md:text-2xl text-themePlaceholder text-opacity-60">
                        <div>
                          <FaExclamationCircle color="#00538C" size={"30px"} />
                        </div>{" "}
                        Are you sure you want to cancel your membership?
                      </p>
                    </div>
                  ) : (
                    !loader && (
                      <div>
                        <div className="space-y-1">
                          <label htmlFor="businessName">Business Name*</label>
                          <input
                            type="text"
                            name="businessName"
                            id="businessName"
                            value={businessUserData?.businessName}
                            onChange={handleChange}
                            className={`${inputStyle}`}
                            placeholder="Enter business name"
                          />
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
                              value={businessUserData?.referral}
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
                    )
                  )}

                  {loader ? (
                    <MiniLoader />
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex justify-end items-center gap-x-4 pb-5"
                    >
                      <button
                        type="button"
                        onClick={() => setModal("")}
                        className="w-28 py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-28 py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-transparent border hover:border-theme"
                      >
                        {modal === "delete" ? "Yes" : "Submit"}
                      </button>
                    </form>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        )

        // <p className="text-center text-themeRed text-2xl font-helvetica">
        //   No Membership is Activated Yet !!
        // </p>
      }
    />
  );
}
