import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { inputStyle } from "../../../utilities/Style";
import CreditCard from "../../../components/CreditCard";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import GetAPI from "../../../utilities/GetAPI";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import Loader from "../../../components/Loader";
import MiniLoader from "../../../components/MiniLoader";

export default function AddPaymentDetail() {
  const [loader, setLoader] = useState(""); // save, see
  const [cardData, setCardData] = useState({
    cardName: "",
    cardExpYear: "",
    cardExpMonth: "",
    cardNumber: "",
    cardCVC: "",
  });
  const [sliceValue, setSliceValue] = useState(4);

  const { data, reFetch } = GetAPI("customer/cards");

  // const [modal, setModal] = useState(true);
  // const onClose = () => {
  //   setModal(false);
  // };

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleExpirationDate = (e) => {
    let value = e.target.value.replace(/[^0-9\/]/g, "").substring(0, 5);
    if (value.length === 2 && !value.includes("/")) {
      value += "/";
    }

    e.target.value = value;

    let numbers = value.split("/");
    let cardExpMonth = numbers[0] || "";
    let cardExpYear = `20${numbers[1]}` || "";
    setCardData({
      ...cardData,
      cardExpMonth,
      cardExpYear,
    });
  };

  const handleCVV = (e) => {
    e.target.value = e.target.value.substring(0, 3);
    setCardData({ ...cardData, cardCVC: e.target.value });
  };

  const handleCancel = () => {
    setCardData({
      cardName: "",
      cardExpYear: "",
      cardExpMonth: "",
      cardNumber: "",
      cardCVC: "",
    });
    const expirationDateInput = document.querySelector(".handleExpirationDate");
    if (expirationDateInput) {
      expirationDateInput.setAttribute("value", "");
      expirationDateInput.value = "";
    }
  };

  const handleSave = async () => {
    if (cardData?.cardName === "") {
      info_toaster("Enter CardHolder Name");
    } else if (cardData?.cardNumber === "") {
      info_toaster("Enter card number");
    } else if (cardData?.cardExpMonth === "") {
      info_toaster("Enter card expiry month");
    } else if (cardData?.cardExpYear === "") {
      info_toaster("Enter card expiry year");
    } else if (cardData?.cardCVC === "") {
      info_toaster("Enter card CVV ");
    } else {
      setLoader("save");
      const res = await PostAPI("customer/addcard", {
        cardName: cardData?.cardName,
        cardExpYear: cardData?.cardExpYear,
        cardExpMonth: cardData?.cardExpMonth,
        cardNumber: cardData?.cardNumber,
        cardCVC: cardData?.cardCVC,
      });
      if (res?.data?.status === "1") {
        reFetch();
        setLoader("");
        success_toaster(res?.data?.message);
      } else {
        setLoader("");
        error_toaster(res?.data?.error);
      }
    }
  };

  const handleSeeMore = () => {
    setLoader("see");
    setTimeout(() => {
      if (sliceValue === 4) {
        const noOfCards = data?.data?.cards.length;
        setSliceValue(noOfCards);
      } else {
        setSliceValue(4);
      }
      setLoader("");
    }, 500);
  };

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Add Payment Method"
      rightSide={
        loader === "save" ? (
          <MiniLoader />
        ) : (
          <div className="space-y-6 md:space-y-8">
            <div className="md:w-2/4 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="cardName"
                    className="font-medium text-themePlaceholder text-opacity-80"
                  >
                    Cardholder’s name <span className="text-[#A10808]">*</span>
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    id="cardName"
                    value={cardData?.cardName}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="cardNumber"
                    className="font-medium text-themePlaceholder text-opacity-80"
                  >
                    Card number <span className="text-[#A10808]">*</span>
                  </label>
                  <input
                    type="number"
                    name="cardNumber"
                    id="cardNumber"
                    value={cardData?.cardNumber}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="****************5864"
                  />
                  {/* <p className="text-sm text-[#A10808]">
                Enter a valid card number
              </p> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 max-md:gap-y-4 justify-between items-center">
                  <div className="space-y-2">
                    <label
                      htmlFor=""
                      className="font-medium text-themePlaceholder text-opacity-80"
                    >
                      Expiration date <span className="text-[#A10808]">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      onChange={handleExpirationDate}
                      className={`${inputStyle} handleExpirationDate`}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="cardCVC"
                      className="font-medium text-themePlaceholder text-opacity-80"
                    >
                      CVV <span className="text-[#A10808]">*</span>
                    </label>
                    <input
                      type="number"
                      name="cardCVC"
                      id="cardCVC"
                      value={cardData?.cardCVC}
                      onChange={handleCVV}
                      className={`${inputStyle}`}
                      placeholder="827"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-5 justify-between items-center">
                <button
                  onClick={handleCancel}
                  className="border border-theme bg-white text-theme hover:bg-theme hover:text-themeText rounded-md py-2.5 px-8 font-medium font-switzer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="border border-theme hover:bg-white hover:text-theme bg-theme text-themeText rounded-md py-2.5 px-8 font-medium font-switzer"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <p className="font-switzer font-bold text-themePlaceholder text-2xl">
                Save Cards
              </p>
              {loader === "see" ? (
                <MiniLoader />
              ) : data?.data?.cards.length === 0 ? (
                <p className="text-2xl font-helvetica text-themeRed text-center">
                  No Card is Saved yet !!
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                  {data?.data?.cards
                    ?.slice(0, sliceValue)
                    ?.map((cardInfo, i) => (
                      <CreditCard
                        key={i}
                        name={cardInfo?.billing_details?.name}
                        exp_month={
                          cardInfo?.card?.exp_month < 10
                            ? `0${cardInfo?.card?.exp_month}`
                            : cardInfo?.card?.exp_month
                        }
                        last4={cardInfo?.card?.cards?.last4}
                        exp_year={cardInfo?.card?.exp_year}
                      />
                    ))}
                  {/* <CreditCard />
              <CreditCard /> */}
                </div>
              )}

              {data?.data?.cards.length > 4 && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSeeMore}
                    className="border border-theme hover:bg-theme hover:text-white bg-white text-theme duration-150 rounded-md py-2.5 w-32 font-medium font-switzer"
                  >
                    {sliceValue === 4 ? "See More" : "See Less"}
                  </button>
                </div>
              )}
            </div>

            {/* <Modal
            isOpen={modal}
            onClose={onClose}
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <div className="!font-bold !text-xl !font-switzer pt-5">
                  Are you sure you want to cancel this order
                </div>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="grid grid-cols-2 gap-x-4 pb-5">
                  <button
                    className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Yes
                  </button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal> */}
          </div>
        )
      }
    />
  );
}
