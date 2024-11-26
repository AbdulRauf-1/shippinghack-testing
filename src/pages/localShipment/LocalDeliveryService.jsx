import React, { useState } from "react";
import Layout from "../../components/Layout";
import BackButton from "../../components/BackButton";
import SelectCard from "../../components/SelectCard";
import { HiOutlinePlusCircle } from "react-icons/hi";
import CreditCard from "../../components/CreditCard";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { inputStyle } from "../../utilities/Style";
import Navbar from "../internationalShipping/navbar/Navbar";
import { MdOutlineCancel } from "react-icons/md";
import MiniLoader from "../../components/MiniLoader";
import GetAPI from "../../utilities/GetAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export default function LocalDeliveryService() {
  const stepNo = 3;
  const navigate = useNavigate();

  const paymentData = JSON.parse(localStorage.getItem("paymentData"));

  const [saveCardStatus, setSaveCardStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [noOfCards, setNoOfCards] = useState(4);
  const [cardData, setCardData] = useState({
    cardName: "",
    cardExpYear: "",
    cardExpMonth: "",
    cardNumber: "",
    cardCVC: "",
  });
  const [pmId, setPmId] = useState("");
  const { data } = GetAPI("customer/cards");

  const onClose = () => {
    setModal(false);
    // navigate("/order-history");
  };
  const onClose2 = () => {
    setModal2(false);
  };

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSee = () => {
    if (data?.data?.cards.length < 5) {
      info_toaster("All Cards are displayed");
    } else {
      setLoader2(true);
      setNoOfCards(noOfCards === 4 ? data?.data?.cards.length : 4);
      setTimeout(() => {
        setLoader2(false);
      }, 500);
    }
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

  // const handleSave = async () => {
  //   setLoader(true);
  //   const res = await PostAPI("customer/addcard", {
  //     cardName: cardData?.cardName,
  //     cardExpYear: cardData?.cardExpYear,
  //     cardExpMonth: cardData?.cardExpMonth,
  //     cardNumber: cardData?.cardNumber,
  //     cardCVC: cardData?.cardCVC,
  //   });
  //   if (res?.data?.status === "1") {
  //     reFetch();
  //     setLoader(false);
  //     setCardData({
  //       cardName: "",
  //       cardExpYear: "",
  //       cardExpMonth: "",
  //       cardNumber: "",
  //       cardCVC: "",
  //     });
  //     success_toaster(res?.data?.message);
  //   } else {
  //     setLoader(false);
  //     error_toaster(res?.data?.error);
  //   }
  // };

  const handleSaveCard = () => {
    setSaveCardStatus(!saveCardStatus);
  };

  const handlePay = async () => {
    if (cardData?.cardName === "") {
      info_toaster("Enter Cardholder name");
    } else if (cardData?.cardNumber === "") {
      info_toaster("Enter card number");
    } else if (cardData?.cardExpMonth === "") {
      info_toaster("Enter card expiry month");
    } else if (cardData?.cardExpYear === "") {
      info_toaster("Enter card expiry year");
    } else if (cardData?.cardCVC === "") {
      info_toaster("Enter card CVV");
    } else {
      setLoader(true);
      const res = await PostAPI("customer/makepaymentbynewcard", {
        cardName: cardData?.cardName,
        cardExpYear: cardData?.cardExpYear,
        cardExpMonth: cardData?.cardExpMonth,
        cardNumber: cardData?.cardNumber,
        cardCVC: cardData?.cardCVC,
        amount: paymentData?.total,
        saveStatus: saveCardStatus,
        bookingId: paymentData?.bookingId,
      });
      if (res?.data?.status === "1") {
        setModal3(true);
        localStorage.removeItem("localPackageData");
        localStorage.removeItem("addDropOffAddress");
        localStorage.removeItem("paymentData");
        localStorage.removeItem("warehousePackageBookingId");
        localStorage.removeItem("warehousePackageLogisticCompanies");
        setLoader(false);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  const handleSelectCard = (cardInfo) => {
    setModal2(true);
    setPmId(cardInfo?.id);
  };

  // const handlePaymentNewCard = async () => {
  //   setLoader(true);
  //   const res = await PostAPI("customer/payment", {
  //     cardName: cardData?.cardName,
  //     cardExpYear: cardData?.cardExpYear,
  //     cardExpMonth: cardData?.cardExpMonth,
  //     cardNumber: cardData?.cardNumber,
  //     cardCVC: cardData?.cardCVC,
  //     amount: paymentData?.total,
  //     saveStatus: saveCardStatus,
  //     bookingId: paymentData?.bookingId,
  //   });
  // };

  const handlePaymentSavedCard = async () => {
    setLoader(true);
    const res = await PostAPI("customer/makepaymentBySavedCard", {
      amount: paymentData?.total,
      pmId: pmId,
      bookingId: paymentData?.bookingId,
    });
    if (res?.data?.status === "1") {
      setModal3(true);
      localStorage.setItem(
        "downloadReceiptLink",
        JSON.stringify(res?.data?.data?.label)
      );
      localStorage.removeItem("localPackageData");
      localStorage.removeItem("addDropOffAddress");
      localStorage.removeItem("paymentData");
      localStorage.removeItem("warehousePackageBookingId");
      localStorage.removeItem("warehousePackageLogisticCompanies");
      setLoader(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.message);
    }
  };

  const handleDownloadReciept = () => {
    const downloadReceiptLink = JSON.parse(
      localStorage.getItem("downloadReceiptLink")
    );
    setLoader(true);
    if (downloadReceiptLink) {
      const link = document.createElement("a");
      link.href = downloadReceiptLink;
      link.setAttribute("download", "receipt.pdf");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      navigate("/order-history");
      setLoader(false);
    } else {
      console.error("No downloadReceiptLink found");
      navigate("/order-history");
      setLoader(false);
    }
  };

  return data.length === 0 ? (
    <Loader />
  ) : (
    <div className="bg-themebackground">
      <div className="h-16">
        <Navbar bgColor={"bg-theme"} bgOpacity={false} position={"fixed"} />
      </div>

      <div className="px-6 md:px-10 lg:w-[90%] xl:w-3/4 2xl:w-3/5 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 py-8 md:py-10">
        {/* steps design start */}
        <div className="mx-auto md:w-[90%] lg:w-8/12 grid grid-cols-3 gap-x-4">
          {/* 1 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`${
                stepNo === 1 || stepNo === 2 || stepNo === 3
                  ? "bg-theme"
                  : "bg-themeText"
              } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
            >
              <p
                className={`${
                  stepNo === 1 || stepNo === 2 || stepNo === 3
                    ? "text-themeText"
                    : "text-theme"
                } text-3xl md:text-4xl`}
              >
                1
              </p>
            </div>
            <p className="font-switzer text-lg font-semibold text-center">
              Send Parcel
            </p>
          </div>
          {/* 2 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`${
                stepNo === 2 || stepNo === 3 ? "bg-theme" : "bg-themeText"
              } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
            >
              <p
                className={`${
                  stepNo === 2 || stepNo === 3 ? "text-themeText" : "text-theme"
                } text-3xl md:text-4xl`}
              >
                2
              </p>
            </div>
            <p className="font-switzer text-lg font-semibold text-center">
              Parcel Detail
            </p>
          </div>
          {/* 3 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`${
                stepNo === 3 ? "bg-theme" : "bg-themeText"
              } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
            >
              <p
                className={`${
                  stepNo === 3 ? "text-themeText" : "text-theme"
                } text-3xl md:text-4xl`}
              >
                3
              </p>
            </div>
            <p className="font-switzer text-lg font-semibold text-center">
              Add Payment Method
            </p>
          </div>
        </div>

        {/* <div className="space-y-4 font-switzer mx-auto">
          <p className="font-bold text-2xl text-start">Select Payment Method</p>
          <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-8">
            <div className="flex gap-x-8">
              <SelectCard src="/images/Paypal.webp" desc="Paypal" />
              <SelectCard src="/images/card.webp" desc="Pay Via Card" />
            </div>
          </div>
        </div> */}

        <div className="space-y-4 font-switzer mx-auto">
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl">Save Cards</p>
            <button
              onClick={() => {
                setCardData({
                  cardName: "",
                  cardExpYear: "",
                  cardExpMonth: "",
                  cardNumber: "",
                  cardCVC: "",
                });
                setModal(true);
              }}
              className="flex items-center gap-x-2 text-theme border border-theme hover:text-themeText hover:bg-theme border-opacity-60 py-2.5 px-2 sm:px-5 rounded-md font-switzer font-semibold"
            >
              <span>
                <HiOutlinePlusCircle size={22} />
              </span>{" "}
              Add New Card
            </button>
          </div>
          {loader2 ? (
            <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-8">
              <MiniLoader />
            </div>
          ) : (
            <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-4 lg:space-y-8">
              <div className="space-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
                {data?.data?.cards?.slice(0, noOfCards)?.map((cardInfo, i) => (
                  <CreditCard
                    key={i}
                    handleSelectCard={() => handleSelectCard(cardInfo)}
                    name={cardInfo?.billing_details?.name}
                    exp_month={
                      cardInfo?.card?.exp_month < 10
                        ? `0${cardInfo?.card?.exp_month}`
                        : cardInfo?.card?.exp_month
                    }
                    exp_year={cardInfo?.card?.exp_year}
                  />
                ))}
              </div>
              <div className="flex justify-end items-center">
                <button
                  onClick={handleSee}
                  className="border border-theme hover:bg-theme hover:text-white bg-transparent text-theme duration-150 rounded-md py-2.5 w-32 font-medium font-switzer"
                >
                  {noOfCards === 4 ? "See More" : "See Less"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modal}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "sm" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{!loader && "Add Card Detail"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loader ? (
              <MiniLoader />
            ) : (
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
                <div className="grid grid-cols-2 gap-x-5 justify-between items-center">
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
                <div className="flex items-center flex-row-reverse justify-end gap-x-2">
                  <label htmlFor="">Save this address for future use</label>
                  <input
                    type="checkbox"
                    checked={saveCardStatus}
                    onChange={handleSaveCard}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {!loader && (
              <div className="grid grid-cols-2 gap-x-4 w-full">
                <button
                  onClick={() => setModal(false)}
                  className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePay}
                  className="border border-theme bg-white text-theme hover:bg-theme hover:text-themeText rounded-md py-2.5 px-8 font-medium font-switzer"
                >
                  Pay
                </button>
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modal2}
        onClose={onClose2}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "xs" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!loader && (
              <div className="font-bold text-lg md:text-xl !font-switzer  text-center">
                Are you sure !
              </div>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="font-switzer text-lg lg:text-xl space-y-4">
                <p>You want to proceed to payment with this card ?</p>
                <div className="grid grid-cols-2 gap-x-4 pb-5">
                  <button
                    onClick={() => setModal2(false)}
                    className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePaymentSavedCard}
                    className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
 
      <Modal
        isOpen={modal3}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "sm" : "md"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody className="space-y-8">
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="flex flex-col gap-y-2  items-center font-switzer">
                <div className="w-48">
                  <img
                    loading="eager|lazy"
                    src="/images/order-completed.webp"
                    alt="order completed image"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-semibold text-2xl text-themePlaceholder">
                  Your Order is Completed
                </p>
                <p className="text-themePlaceholder text-opacity-60 text-center w-[70%]">
                  You will be receiving a confirmation email with order detail
                </p>
              </div>
            )}
            {!loader && (
              <div className="flex flex-col gap-y-5 py-8 w-full">
                <button
                  onClick={() => navigate("/order-history")}
                  className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                >
                  My Orders
                </button>
                <button
                  onClick={handleDownloadReciept}
                  className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                >
                  Download Receipt
                </button>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

{
  /* <div className="flex justify-between items-center">
<p className="font-bold text-2xl ">Save Cards</p>
<button className="flex items-center gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-5 rounded-md font-switzer font-semibold duration-100">
  <span>
    <HiOutlinePlusCircle size={22} />
  </span>{" "}
  Add New Card
</button>
</div>

<div> */
}
{
  /* <div className="text-crossColor flex justify-center items-center">
  <MdOutlineCancel size={100} />
</div>
<p className="font-semibold font-switzer text-3xl text-center">
  No Card Found
</p>
</div>

<div className="grid grid-cols-2 gap-x-8">
{" "}
<CreditCard />
<CreditCard />
</div> */
}

{
  /* <Layout
      rightSide={
        <div className="space-y-8">
          <div className="mx-auto flex justify-between w-4/5"> */
}
{
  /* 1 */
}
{
  /* <div className="flex flex-col items-center gap-2">
              <div className="bg-theme w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer">
                <p className="text-themeText text-4xl">1</p>
              </div>
              <p className="font-switzer text-lg font-semibold ">
                Parcel Detail
              </p>
            </div> */
}
{
  /* 2 */
}
{
  /* <div className="flex flex-col items-center gap-2">
              <div className="bg-theme w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer">
                <p className="text-themeText text-4xl">2</p>
              </div>
              <p className="font-switzer text-lg font-semibold">
                Add pickup & DropOFF Address
              </p>
            </div> */
}
{
  /* 3 */
}
{
  /* <div className="flex flex-col items-center gap-2">
              <div className="bg-theme w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer">
                <p className="text-themeText text-4xl">3</p>
              </div>
              <p className="font-switzer text-lg font-semibold ">
                Add Payment Method
              </p>
            </div> */
}
// </div>

// <div className="space-y-4 font-switzer mx-auto">
//   <p className="font-bold text-2xl flex items-center gap-x-2">
//     {" "}
//     <BackButton onClick={() => window.history.back()} /> Payment
//     Method
//   </p>
//   <div className="space-y-8">
{
  /* services types */
}
// <div className="flex gap-x-8">
//   <SelectCard src="/images/Paypal.webp" desc="Paypal" />
//   <SelectCard src="/images/card.webp" desc="Pay Via Card" />
// </div>

// <div className="flex justify-between items-center">
//   <p className="font-bold text-2xl ">Save Cards</p>
//   <button
//     onClick={() => setModal(true)}
//     className="flex items-center gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-5 rounded-md font-switzer font-semibold"
//   >
//     <span>
//       <HiOutlinePlusCircle size={22} />
//     </span>{" "}
//     Add New Card
//   </button>
// </div>

//     <div className="grid grid-cols-2 gap-x-8">
//       {" "}
//       <CreditCard />
//       <CreditCard />
//     </div>
//   </div>
// </div>
{
  /* 
          <Modal
            isOpen={modal}
            onClose={onClose}
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody className="space-y-8">
                <div className="flex flex-col gap-y-2  items-center font-switzer">
                  <div className="w-48">
                    <img
                    loading="eager|lazy"
                      src="/images/order-completed.webp"
                      alt="order completed image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="font-semibold text-2xl text-themePlaceholder">
                    Your Order is Completed
                  </p>
                  <p className="text-themePlaceholder text-opacity-60 text-center w-[70%]">
                    You will be receiving a confirmation email with order detail
                  </p>
                </div>
                <div className="flex flex-col gap-y-5 py-8 w-full">
                  <button
                    className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                  >
                    My Orders
                  </button>
                  <button
                    className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Download Receipt
                  </button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal> */
}
{
}
{
  /* </div>
      }
    /> */
}
