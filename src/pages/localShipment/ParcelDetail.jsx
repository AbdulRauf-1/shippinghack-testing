import React, { useState } from "react";
import Navbar from "../internationalShipping/navbar/Navbar";
import SenderOrReceiverDetailCard from "../../components/SenderOrReceiverDetailCard";
import PackageDetailsCard from "../../components/PackageDetailsCard";
import MeasurementCard from "../../components/MeasurementCard";
import { TbShoppingCartSearch } from "react-icons/tb";
import SelectCard from "../../components/SelectCard";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import CreditCard from "../../components/CreditCard";
import Footer from "../../components/Footer";
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
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import Loader from "../../components/Loader";

export default function ParcelDetail() {
  const stepNo = 2;
  const navigate = useNavigate();

  const bookingDetail = JSON.parse(localStorage.getItem("localPackageData"));

  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const onClose = () => {
    setModal(false);
  };

  const handleProceedPayment = async () => {
    // localStorage.setItem(
    //   "paymentData",
    //   JSON.stringify({
    //     bookingId: bookingDetail?.bookingId,
    //     total: bookingDetail?.total,
    //   })
    // );
    // navigate("/payment-method");
    setLoader(true);
    const res = await PostAPI("customer/checkoutSessionsCheck", {
      bookingId: bookingDetail?.bookingId,
      amount: bookingDetail?.total,
      bookingType: "local",
    });
    if (res?.data?.status === "1") {
      setLoader(false);
      success_toaster("Pay vai Stripe");
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          sessionId: res?.data?.data?.id,
          bookingId: bookingDetail?.bookingId,
          total: bookingDetail?.total,
        })
      );
      window.open(res?.data?.data?.url, "_self");
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="bg-themebackground">
      {" "}
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

        {/* order details */}
        <div className="flex flex-col md:flex-row items-start justify-between [&>div]:w-full gap-6 md:gap-x-6 lg:gap-x-10">
          {/* left side */}
          <div className="space-y-6">
            <div className="space-y-2">
              <SenderOrReceiverDetailCard
                heading="Sender"
                virtualBoxNo=""
                name={bookingDetail?.senderData?.senderName}
                email={bookingDetail?.senderData?.senderEmail}
                phone={bookingDetail?.senderData?.senderPhone}
              />
              <SenderOrReceiverDetailCard
                heading="Receiver"
                name={bookingDetail?.receiverData?.receiverName}
                email={bookingDetail?.receiverData?.receiverEmail}
                phone={bookingDetail?.receiverData?.receiverPhone}
              />
            </div>
            <div className="p-4 border border-themePlaceholder border-opacity-20 rounded-md font-switzer space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-theme text-lg font-semibold">
                  Package Detail
                </p>
              </div>
              <div className="space-y-2">
                {/* <PackageDetailsCard
                  companyName="Amazon"
                  name="Example Name"
                  email="example@gmail.com"
                  phoneNo="20489673"
                  ETA="30-2-2023"
                  borderColor="border-themePlaceholder"
                  borderOpacity="border-opacity-20"
                /> */}
                <MeasurementCard
                  width={bookingDetail?.packages[0]?.width}
                  length={bookingDetail?.packages[0]?.length}
                  height={bookingDetail?.packages[0]?.height}
                  weight={bookingDetail?.packages[0]?.weight}
                  category={bookingDetail?.packages[0]?.catText}
                  borderColor="border-themePlaceholder"
                  borderOpacity="border-opacity-20"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md px-5 py-8">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-20 h-24">
                  <img
                    loading="eager|lazy"
                    src="/images/box.webp"
                    alt="box image"
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="font-switzer text-2xl font-semibold text-themePlaceholder">
                  Order#
                  <span className="text-opacity-40 text-themePlaceholder">
                    {" "}
                    {bookingDetail?.bookingId}
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-theme font-switzer font-semibold">
                        Pickup Address
                      </p>
                      <p className="font-switzer text-themePlaceholder text-opacity-60 text-sm">
                        {dayjs(
                          `${bookingDetail?.pickupDate} ${bookingDetail?.pickupStartTime}`
                        ).format("MMMM D,YYYY h:mm A")}{" "}
                      </p>
                    </div>
                    <div className="ps-10 font-switzer text-themePlaceholder text-opacity-60 text-sm">
                      <p>
                        {
                          bookingDetail?.senderData?.pickupAddress
                            ?.streetAddress
                        }
                      </p>
                      <p>
                        Building:{" "}
                        {bookingDetail?.senderData?.pickupAddress?.building},
                        Floor: {bookingDetail?.senderData?.pickupAddress?.floor}
                      </p>
                      <p>
                        Apartment:{" "}
                        {bookingDetail?.senderData?.pickupAddress?.apartment}
                      </p>
                      <p>
                        {bookingDetail?.senderData?.pickupAddress?.district},{" "}
                        {bookingDetail?.senderData?.pickupAddress?.city}
                      </p>
                      <p>
                        {bookingDetail?.senderData?.pickupAddress?.province},{" "}
                        {bookingDetail?.senderData?.pickupAddress?.country}
                      </p>
                      <p>
                        Postal Code:{" "}
                        {bookingDetail?.senderData?.pickupAddress?.postalCode}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-theme font-switzer font-semibold">
                        Drop-Off Address
                      </p>
                      {/* <p className="font-switzer text-themePlaceholder text-opacity-60 text-sm">
                        2:30, 24/7/2023
                      </p> */}
                    </div>
                    <div className="ps-10 font-switzer text-themePlaceholder text-opacity-60 text-sm">
                      <p>{bookingDetail?.senderData?.pickupAddress?.title}</p>
                      <p>
                        {
                          bookingDetail?.receiverData?.dropoffAddress
                            ?.streetAddress
                        }
                      </p>
                      <p>
                        Building:{" "}
                        {bookingDetail?.receiverData?.dropoffAddress?.building},
                        Floor:{" "}
                        {bookingDetail?.receiverData?.dropoffAddress?.floor}
                      </p>
                      <p>
                        Apartment:{" "}
                        {bookingDetail?.receiverData?.dropoffAddress?.apartment}
                      </p>
                      <p>
                        {bookingDetail?.receiverData?.dropoffAddress?.district},{" "}
                        {bookingDetail?.receiverData?.dropoffAddress?.city}
                      </p>
                      <p>
                        {bookingDetail?.receiverData?.dropoffAddress?.province},{" "}
                        {bookingDetail?.receiverData?.dropoffAddress?.country}
                      </p>
                      <p>
                        Postal Code:{" "}
                        {
                          bookingDetail?.receiverData?.dropoffAddress
                            ?.postalCode
                        }
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-between items-center border border-themePlaceholder border-opacity-20 rounded-md px-5">
                  <div className="flex items-center gap-x-4">
                    <div>
                      <TbShoppingCartSearch size={30} />
                    </div>
                    <div>
                      <p className="font-medium text-themePlaceholder font-switzer">
                        Shipping Company
                      </p>
                      <p className="text-themePlaceholder text-opacity-60 font-switzer text-sm">
                        N/A
                      </p>
                    </div>
                  </div>
                  <div className="w-20 h-20">
                    <img
                    loading="eager|lazy"
                      src="/images/delivery-method-fedex.webp"
                      alt="shipping company"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div> */}
              </div>

              <div className="space-y-2">
                {/* <div className="flex justify-between items-center gap-x-4">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Promo Code"
                    className="placeholder:text-inputPlaceholder h-full w-full px-5 py-3 border border-theme outline-none rounded-md bg-transparent"
                  />
                  <button className="bg-theme text-themeText px-8 py-3 rounded-md font-switzer font-medium duration-100">
                    Apply
                  </button>
                </div> */}
                <div className="space-y-1 font-switzer [&>div]:flex [&>div]:justify-between [&>div]:items-center">
                  <div>
                    <p className="text-themePlaceholder text-opacity-60">
                      Weight
                    </p>
                    <p className="text-themePlaceholder">
                      {bookingDetail?.packages[0]?.weight} lbs
                    </p>
                  </div>
                  <div>
                    <p className="text-themePlaceholder text-opacity-60">
                      Category
                    </p>
                    <p className="text-themePlaceholder">
                      {bookingDetail?.packages[0]?.catText}
                    </p>
                  </div>
                  <div className="text-lg text-theme font-bold">
                    <p>Total</p>
                    <p>${bookingDetail?.total}</p>
                  </div>
                </div>
              </div>

              <div> 
                <button
                  onClick={handleProceedPayment}
                  className="font-semibold text-white bg-theme px-5 py-3 w-full h-full rounded-md "
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Select Payment Method */}
        {/* <div className="space-y-4 font-switzer mx-auto">
          <p className="font-bold text-2xl text-start">Select Payment Method</p>
          <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-8">
    
            <div className="flex gap-x-8">
              <SelectCard src="/images/Paypal.webp" desc="Paypal" />
              <SelectCard src="/images/card.webp" desc="Pay Via Card" />
            </div>

            <div className="flex justify-between items-center">
              <p className="font-bold text-2xl ">Save Cards</p>
              <button className="flex items-center gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-5 rounded-md font-switzer font-semibold duration-100">
                <span>
                  <HiOutlinePlusCircle size={22} />
                </span>{" "}
                Add New Card
              </button>
            </div>

            <div>
              <div className="text-crossColor flex justify-center items-center">
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
            </div>
          </div>
        </div> */}
      </div>
      {/* footer start */}
      <div className="bg-theme">
        <Footer />
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
          <ModalHeader>Add Card Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="">Card Holder Name</label>
              <input
                type="text"
                name=""
                id=""
                className={`${inputStyle}`}
                placeholder="Name"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="">Card No</label>
              <input
                type="text"
                name=""
                id=""
                className={`${inputStyle}`}
                placeholder="*** ***** **** 4589"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <label htmlFor="">Expiry</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="10"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="">CVV</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="10"
                />
              </div>
            </div>
            <div className="font-switzer">
              <Checkbox defaultChecked>Save card for future use</Checkbox>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="grid grid-cols-2 gap-x-4 w-full">
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
                Pay
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
