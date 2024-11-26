import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { inputStyle } from "../../utilities/Style";
import { Link, useNavigate } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import MiniLoader from "../../components/MiniLoader";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import CreditCard from "../../components/CreditCard";

export default function SelectPackage() {
  const navigate = useNavigate();
  const [sliceValue, setSliceValue] = useState(4);
  const [modal, setModal] = useState(""); // save, new, confirm
  const [loader, setloader] = useState(false);
  const [cardData, setCardData] = useState({
    cardName: "",
    cardExpYear: "",
    cardExpMonth: "",
    cardNumber: "",
    cardCVC: "",
  });
  const [subscriptionData, setSubscriptionData] = useState({
    planId: "",
    billingFrequency: "",
    cardToken: "",
    amount: "",
  });
  const [packagesData, setPackagesData] = useState({});

  const { data } = GetAPI("business/getAllPlans");
  const { data: cardsData } = GetAPI("business/customerAllCards");

  const onClose = () => {
    setModal(false);
  };

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleRadioButton = (category, tenure) => {
    setPackagesData({ ...packagesData, [`${category}`]: tenure });
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

  const handleSeeMore = () => {
    setloader(true);
    setTimeout(() => {
      if (sliceValue === 4) {
        const noOfCards = cardsData?.data.length;
        setSliceValue(noOfCards);
      } else {
        setSliceValue(4);
      }
      setloader(false);
    }, 500);
  };

  const handleSelect = (plan, frequency) => {
    setSubscriptionData({
      ...subscriptionData,
      planId: plan?.id,
      billingFrequency: frequency,
      amount: plan?.price,
    });
    setModal("save");
    setCardData({
      cardName: "",
      cardExpYear: "",
      cardExpMonth: "",
      cardNumber: "",
      cardCVC: "",
    });
  };

  const handleSelectCard = (cardInfo) => {
    setSubscriptionData({
      ...subscriptionData,
      cardToken: cardInfo?.cardToken,
    });
    setloader(true);
    setTimeout(() => {
      setModal("confirm");
      setloader(false);
    }, 200);
  };

  const handlePay = async () => {
    if (modal === "new") {
      if (cardData?.cardName === "") {
        info_toaster("enter card holder name");
      } else if (cardData?.cardNumber === "") {
        info_toaster("enter card number");
      } else if (cardData?.cardExpMonth === "") {
        info_toaster("enter card expiry month");
      } else if (cardData?.cardExpYear === "") {
        info_toaster("enter card expiry year");
      } else if (cardData?.cardCVC === "") {
        info_toaster("enter card CVV");
      } else {
        setloader(true);
        const res = await PostAPI("business/newCard", {
          cardDetails: {
            number: cardData?.cardNumber,
            cardholderName: cardData?.cardName,
            expire_month: cardData?.cardExpMonth,
            expire_year: cardData?.cardExpYear,
            cvv2: cardData?.cardCVC,
          },
        });
        if (res?.data?.status === "1") {
          navigate("/confirm-membership");
          localStorage.setItem(
            "subscriptionData",
            JSON.stringify({
              planId: subscriptionData?.planId,
              billingFrequency: subscriptionData?.billingFrequency,
              cardToken: res?.data?.data?.token,
              amount: subscriptionData?.amount,
              cardNumber: cardData?.cardNumber.substring(
                cardData?.cardNumber.length - 4
              ),
            })
          );
          setloader(false);
          success_toaster(res?.data?.message);
          setModal("");
        } else {
          setloader(false);
          error_toaster(res?.data?.error);
          setModal(false);
        }
      }
    } else {
      setloader(true);
      localStorage.setItem(
        "subscriptionData",
        JSON.stringify({
          planId: subscriptionData?.planId,
          billingFrequency: subscriptionData?.billingFrequency,
          cardToken: subscriptionData?.cardToken,
          amount: subscriptionData?.amount,
          cardNumber: "****",
        })
      );
      setTimeout(() => {
        navigate("/confirm-membership");
        setloader(false);
        success_toaster("Card selected successfully");
      }, 300);
    }
  };

  useEffect(() => {
    const obj = {};
    if (data?.data !== undefined) {
      {
        Object.entries(data?.data)
          .slice(0, -1)
          ?.map(([category, plans]) => {
            if (plans.length > 0) {
              obj[category] = "monthly";
            }
          });
        setPackagesData(obj);
      }
    }
  }, [data]);

  return data.length === 0 ? (
    <Loader />
  ) : (
    <div className="px-6 md:px-10 lg:px-20 bg-themebackground">
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

      <div className="font-switzer py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="bg-themeText lg:w-9/12 mx-auto space-y-6 md:space-y-8 lg:space-y-10 px-2 md:px-5 lg:px-10 xl:px-20 py-6 md:py-8 lg:py-10 shadow-lg rounded-md">
          <div>
            <p className="text-themePlaceholder text-opacity-60 text-3xl md:text-4xl font-light">
              Let’s Get Started
            </p>
          </div>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {/* packages */}
            <div className="grid grid-cols-2 md:grid-cols-3 h-full border border-borderColor border-opacity-80 font-switzer">
              {/* 1 */}
              {Object.entries(data.data)
                .slice(0, -1)
                .map(([category, plans]) => (
                  <div
                    key={category}
                    className="border-r-[1px] border-b-[1px] border-borderColor"
                  >
                    <p className="bg-theme font-medium text-lg md:text-xl text-themeText text-center py-4">
                      {category}
                    </p>
                    {plans.map((plan) =>
                      packagesData[category] === "monthly" &&
                      plan?.name.includes("MONTHLY") ? (
                        <div className="px-10 py-5 flex flex-col items-center gap-y-6  md:gap-y-12">
                          <p className="text-xl md:text-2xl text-themePlaceholder text-opacity-80 text-center leading-tight">
                            {plan?.description}
                            {/* <br /> Membership */}
                          </p>
                          <div className="flex flex-col justify-between h-44 md:h-52 lg:h-64">
                            <div className="space-y-4 md:space-y-6 lg:space-y-8">
                              <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg">
                                {plan?.currencyIsoCode}
                                <span className="text-4xl md:text-5xl lg:text-6xl text-opacity-100 text-themePlaceholder">
                                  {plan?.price}
                                </span>{" "}
                              </p>
                              <p className="text-center">
                                {plan?.name.includes("MONTHLY")
                                  ? "/Month"
                                  : "/Year"}
                              </p>
                            </div>
                            <div className="font-light text-themePlaceholder text-opacity-60 text-lg lg:text-xl flex flex-col items-center">
                              <Radio
                                isChecked={true}
                                onChange={() =>
                                  handleRadioButton(category, "monthly")
                                }
                              >
                                Monthly
                              </Radio>
                              <Radio
                                isChecked={false}
                                onChange={() =>
                                  handleRadioButton(category, "yearly")
                                }
                              >
                                Annual
                              </Radio>
                            </div>
                          </div>
                          <div className="text-center space-y-4 md:pb-8 lg:pb-10">
                            <button
                              onClick={() => handleSelect(plan, "MONTHLY")}
                              className="px-10 md:px-12 lg:px-14 xl:px-16 text-theme border border-theme py-2.5 font-medium text-xl rounded-md"
                            >
                              Select
                            </button>
                            <p className="font-light md:text-lg text-themePlaceholder text-opacity-80 leading-tight">
                              All the basic for sending your first package
                            </p>
                          </div>
                        </div>
                      ) : packagesData[category] === "yearly" &&
                        plan?.name.includes("Yearly") ? (
                        <div className="px-10 py-5 flex flex-col items-center gap-y-6  md:gap-y-12">
                          <p className="text-xl md:text-2xl text-themePlaceholder text-opacity-80 text-center leading-tight">
                            {plan?.description}
                            {/* <br /> Membership */}
                          </p>
                          <div className="flex flex-col justify-between h-44 md:h-60 lg:h-64">
                            <div className="space-y-4 md:space-y-6 lg:space-y-8">
                              <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg">
                                {plan?.currencyIsoCode}
                                <span className="text-4xl md:text-5xl lg:text-6xl text-opacity-100 text-themePlaceholder">
                                  {plan?.price}
                                </span>{" "}
                              </p>
                              <p className="text-center">
                                {plan?.name.includes("MONTHLY")
                                  ? "/Month"
                                  : "/Year"}
                              </p>
                            </div>
                            <div className="font-light text-themePlaceholder text-opacity-60 text-lg lg:text-xl flex flex-col items-center">
                              <Radio
                                isChecked={false}
                                onChange={() =>
                                  handleRadioButton(category, "monthly")
                                }
                              >
                                Monthly
                              </Radio>
                              <Radio
                                isChecked={true}
                                onChange={() =>
                                  handleRadioButton(category, "yearly")
                                }
                              >
                                Annual
                              </Radio>
                            </div>
                          </div>
                          <div className="text-center space-y-4 md:pb-8 lg:pb-10">
                            <button
                              onClick={() => handleSelect(plan, "Yearly")}
                              className="px-10 md:px-12 lg:px-14 xl:px-16 text-theme border border-theme py-2.5 font-medium text-xl rounded-md"
                            >
                              Select
                            </button>
                            <p className="font-light md:text-lg text-themePlaceholder text-opacity-80 leading-tight">
                              All the basic for sending your first package
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )
                    )}
                  </div>
                ))}

              {/* 2 */}
              {/* <div className="border-r-[1px] border-borderColor">
                <p className="bg-[#004B7E] font-medium text-xl text-themeText text-center py-4">
                  Frequent Shipper
                </p>
                <div className="px-10 py-5 flex flex-col items-center gap-y-12">
                  <p className="text-2xl text-themePlaceholder text-opacity-80 text-center leading-tight">
                    Premium <br /> Membership
                  </p>
                  <div className="flex flex-col justify-between h-64">
                    <div className="space-y-8">
                      <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg">
                        $
                        <span className="text-6xl text-opacity-100 text-themePlaceholder">
                          55
                        </span>{" "}
                        /yr
                      </p>
                      <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg ">
                        <del>$</del>
                        <span className="text-6xl text-opacity-100 text-themePlaceholder">
                          <del>60</del>
                        </span>{" "}
                        <del>/yr</del>
                      </p>
                    </div>
                    <div className="font-light text-themePlaceholder text-opacity-60 text-xl flex flex-col items-center">
                      <Radio>Monthly</Radio>
                      <Radio>Annual</Radio>
                    </div>
                  </div>
                  <div className="text-center space-y-4 pb-10">
                    <button
                      onClick={() => navigate("/payment-methods")}
                      className="px-16 text-theme border border-theme py-2.5 font-medium text-xl rounded-md"
                    >
                      Select
                    </button>
                    <p className="font-light text-lg text-themePlaceholder text-opacity-80 leading-tight">
                      All the basic for sending your first package
                    </p>
                  </div>
                </div>
              </div> */}

              {/* 3 */}
              {/* <div>
                <p className="bg-[#00365C] font-medium text-xl text-themeText text-center py-4">
                  High Volume Shipper
                </p>
                <div className="px-10 py-5 flex flex-col items-center gap-y-12 ">
                  <p className="text-2xl text-themePlaceholder text-opacity-80 text-center leading-tight">
                    Business <br /> Membership
                  </p>
                  <div className="flex flex-col justify-between h-64">
                    <div className="space-y-8">
                      <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg">
                        $
                        <span className="text-6xl text-opacity-100 text-themePlaceholder">
                          89
                        </span>{" "}
                        /yr
                      </p>
                      <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg ">
                        <del>$</del>
                        <span className="text-6xl text-opacity-100 text-themePlaceholder">
                          <del>99</del>
                        </span>{" "}
                        <del>/yr</del>
                      </p>
                    </div>
                    <div className="font-light text-themePlaceholder text-opacity-60 text-xl flex flex-col items-center">
                      <Radio>Monthly</Radio>
                      <Radio>Annual</Radio>
                    </div>
                  </div>
                  <div className="text-center space-y-4 pb-10">
                    <button
                      onClick={() => navigate("/payment-methods")}
                      className="px-16 text-theme border border-theme py-2.5 font-medium text-xl rounded-md"
                    >
                      Select
                    </button>
                    <p className="font-light text-lg text-themePlaceholder text-opacity-80 leading-tight">
                      All the basic for sending your first package
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="*Required a Credit card on file"
                  className={`placeholder:text-[#C30B0B] border border-[#C30B0B] placeholder:text-opacity-80 w-full py-2 px-2 md:px-5 md:text-lg focus:outline-none`}
                />
              </div>
              <div className="flex gap-x-2 items-start md:items-center">
                <div>
                  <input type="checkbox" name="" id="" className="h-5 w-5" />
                </div>
                <label
                  htmlFor=""
                  className="font-light text-lg md:text-xl text-themePlaceholder text-opacity-60 leading-tight"
                >
                  Autobill me next time and give me a discount on my membership*
                </label>
              </div>
            </div>
          </div>
        </div>
        <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-8 md:pt-8 lg:pt-10">
          Copyright &copy; Shipping Hack 2024. All rights reserved
        </p>
      </div>

      <Modal
        isOpen={
          modal === "save" || modal === "new" || modal === "confirm"
            ? true
            : false
        }
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "sm" : modal === "save" ? "4xl" : "2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="!font-switzer !text-2xl !text-center">
            {!loader &&
              (modal === "save"
                ? "Make Payment"
                : modal === "new"
                ? "Add Card Detail"
                : "Are you sre you want to make payment by this card")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="space-y-5">
              {!loader && (modal === "save" || modal === "new") && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      modal === "save" ? setModal("new") : setModal("save");
                      setloader(true);
                      setTimeout(() => {
                        setloader(false);
                      }, 200);
                    }}
                    className="font-switzer text-lg bg-theme text-themeText hover:bg-themeText hover:text-theme duration-150 border border-theme rounded-md py-2.5 px-5"
                  >
                    {modal === "save"
                      ? "Make Payment by New Card"
                      : "Make Payment by Saved Card"}
                  </button>
                </div>
              )}
              {loader ? (
                <MiniLoader />
              ) : modal === "save" ? (
                cardsData?.data?.length === 0 ? (
                  <p className="text-xl md:text-2xl font-helvetica text-themeRed text-center">
                    No Card is Saved yet !!
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    {cardsData?.data
                      ?.slice(0, sliceValue)
                      ?.map((cardInfo, i) => (
                        <CreditCard
                          key={i}
                          name={cardInfo?.cardholderName}
                          exp_month={cardInfo?.cardExpMonth.slice(0, 2)}
                          last4={cardInfo?.card?.cards?.last4}
                          exp_year={cardInfo?.cardExpMonth.slice(3)}
                          handleSelectCard={() => handleSelectCard(cardInfo)}
                        />
                      ))}
                  </div>
                )
              ) : modal === "new" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="cardName"
                      className="font-medium text-themePlaceholder text-opacity-80"
                    >
                      Cardholder’s name{" "}
                      <span className="text-[#A10808]">*</span>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-5 justify-between items-center">
                    <div className="space-y-2">
                      <label
                        htmlFor=""
                        className="font-medium text-themePlaceholder text-opacity-80"
                      >
                        Expiration date{" "}
                        <span className="text-[#A10808]">*</span>
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
              ) : (
                <></>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            {!loader && (
              <div className="flex items-center justify-end gap-x-4 w-full pb-3">
                <button
                  onClick={() => {
                    setloader("true");
                    setTimeout(() => {
                      setloader(false);
                    }, 200);
                    modal === "confirm" ? setModal("save") : setModal("");
                  }}
                  className="w-32 py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
          hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                >
                  Cancel
                </button>
                {modal === "save" ? (
                  cardsData?.data?.length > 4 && (
                    <button
                      onClick={handleSeeMore}
                      className="border border-theme hover:bg-theme hover:text-white bg-white text-theme duration-150 rounded-md py-2.5 w-32 font-medium font-switzer"
                    >
                      {sliceValue === 4 ? "See More" : "See Less"}
                    </button>
                  )
                ) : (
                  <button
                    onClick={handlePay}
                    className="w-32 border border-theme hover:bg-white hover:text-theme bg-theme text-themeText rounded-md py-2.5 px-8 font-medium font-switzer"
                  >
                    {modal === "confirm" ? "Confirm" : "Pay"}
                  </button>
                )}
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
