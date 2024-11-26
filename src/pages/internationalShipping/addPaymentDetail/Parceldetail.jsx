import React, { useEffect, useRef, useState } from "react";
import { TbShoppingCartSearch } from "react-icons/tb";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
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
import Navbar from "../navbar/Navbar";
import DeliveryMethodCard from "../../../components/DeliveryMethodCard";
import SenderOrReceiverDetailCard from "../../../components/SenderOrReceiverDetailCard";
import PackageDetailsCard from "../../../components/PackageDetailsCard";
import MeasurementCard from "../../../components/MeasurementCard";
import SelectCard from "../../../components/SelectCard";
import CreditCard from "../../../components/CreditCard";
import Footer from "../../../components/Footer";
import { inputStyle } from "../../../utilities/Style";
import { useNavigate } from "react-router-dom";
import ShippingCompanyCard from "../../../components/ShippingCompanyCard";
import GetAPI from "../../../utilities/GetAPI";
import MiniLoader from "../../../components/MiniLoader";
import { PostAPI } from "../../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../../utilities/Toaster";
import AddressCardPkDo from "../../../components/AddressCardPkDo";
import { BASE_URL } from "../../../utilities/URL";
import Loader from "../../../components/Loader";

export default function PaymentMethod() {
  const stepNo = 2;
  const warehousePackageBookingId = JSON.parse(
    localStorage.getItem("warehousePackageBookingId")
  );
  const warehousePackageLogisticCompanies = JSON.parse(
    localStorage.getItem("warehousePackageLogisticCompanies")
  );
  const navigate = useNavigate();

  const scrollEffect = useRef(null);
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [companyId, setCompanyId] = useState(false);
  const [bookingDetail, setBookingDetail] = useState("");

  const onClose = () => {
    setModal(false);
  };

  const handleOrderDetail = async () => {
    setLoader(true);
    const res = await PostAPI("customer/orderdetails", {
      bookingId: warehousePackageBookingId,
    });
    if (res?.data?.status === "1") {
      setBookingDetail(res?.data?.data);
      setLoader(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  const handleLogisticCompany = async (companyData) => {
    setLoader(true);
    const res = await PostAPI("customer/chooseLogisticCompany", {
      bookingId: warehousePackageBookingId,
      logisticCompanyId: companyData?.id,
      charges: companyData?.charges,
    });
    if (res?.data?.status === "1") {
      handleOrderDetail();
      setCompanyId(companyData?.id);
      setLoader(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.message);
      navigate("/membership");
    }
  };

  const handleProceedPayment = async () => {
    // localStorage.setItem(
    //   "paymentData",
    //   JSON.stringify({
    //     bookingId: bookingDetail?.id,
    //     total: bookingDetail?.total,
    //   })
    // );
    // navigate("/payment-method");
    setLoader(true);
    const res = await PostAPI("customer/checkoutSessionsCheck", {
      bookingId: bookingDetail?.id,
      amount: bookingDetail?.total,
      bookingType: "international",
    });
    // console.log("res?.data?.id:- ", );
    if (res?.data?.status === "1") {
      setLoader(false);
      success_toaster("Pay vai Stripe");
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          sessionId: res?.data?.data?.id,
          bookingId: bookingDetail?.id,
          total: bookingDetail?.total,
        })
      );
      window.open(res?.data?.data?.url, "_self");
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  useEffect(() => {
    if (scrollEffect.current) {
      scrollEffect.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [bookingDetail]);

  return loader ? (
    <Loader />
  ) : (
    <div className="bg-themebackground">
      <div className="h-16">
        <Navbar bgColor={"bg-theme"} bgOpacity={false} position={"fixed"} />
      </div>
      {/* <div className="h-screen flex items-center justify-center">
          {" "}

        </div> */}

      <div className="px-6 md:px-10 lg:w-3/5 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 py-8 md:py-10">
        {/* steps design start */}
        <div className="mx-auto md:w-[90%] grid grid-cols-3 gap-x-4">
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

        {/* Choose Method */}
        <div className="space-y-4 font-switzer mx-auto">
          <p className="font-bold text-2xl text-start">
            Select Delivery Method
          </p>

          <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-4 md:p-8 lg:p-10 space-y-8">
            {loader ? (
              <div className="p-10">
                <MiniLoader />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 flex-wrap">
                {warehousePackageLogisticCompanies?.map((company, i) => (
                  <DeliveryMethodCard
                    key={i}
                    handleLogisticCompany={handleLogisticCompany}
                    active={company?.id === companyId ? true : false}
                    company={company}
                  />
                ))}
                {/* <DeliveryMethodCard src="/images/delivery-method-fedex.webp" /> */}
                {/* <DeliveryMethodCard src="/images/delivery-method-dhl.webp" /> */}
              </div>
            )}
          </div>
        </div>

        {/* order details */}

        {bookingDetail && (
          <div ref={scrollEffect} className="space-y-4">
            <p className="font-bold text-2xl text-start">Parcel Detail</p>
            <div className="flex flex-col md:flex-row items-start justify-between [&>div]:w-full gap-4 md:gap-x-8 lg:gap-x-10">
              {/* left side */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <SenderOrReceiverDetailCard
                    heading="Sender"
                    virtualBoxNo=""
                    name={bookingDetail?.senderName}
                    email={bookingDetail?.senderEmail}
                    phone={bookingDetail?.senderPhone}
                  />
                  <SenderOrReceiverDetailCard
                    heading="Receiver"
                    name={bookingDetail?.receiverName}
                    email={bookingDetail?.receiverEmail}
                    phone={bookingDetail?.receiverPhone}
                  />
                </div>
                <div className="p-4 border border-themePlaceholder border-opacity-20 rounded-md font-switzer space-y-3">
                  {bookingDetail?.packages?.map((pkg, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center">
                        <p className="text-theme text-lg font-semibold">
                          Package Detail ({i + 1}/
                          {bookingDetail?.packages.length})
                        </p>
                      </div>
                      <div className="space-y-2">
                        <PackageDetailsCard
                          companyName={
                            bookingDetail?.packages[i]?.ecommerceCompany
                          }
                          name={bookingDetail?.packages[i]?.name}
                          email={bookingDetail?.packages[i]?.email}
                          phoneNo={bookingDetail?.packages[i]?.phone}
                          ETA={bookingDetail?.packages[i]?.ETA}
                          borderColor="border-themePlaceholder"
                          borderOpacity="border-opacity-20"
                        />
                        <MeasurementCard
                          width={bookingDetail?.packages[i]?.width}
                          length={bookingDetail?.packages[i]?.length}
                          height={bookingDetail?.packages[i]?.height}
                          weight={bookingDetail?.packages[i]?.weight}
                          category={bookingDetail?.packages[i]?.category}
                          borderColor="border-themePlaceholder"
                          borderOpacity="border-opacity-20"
                        />
                      </div>
                    </div>
                  ))}
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
                        {bookingDetail?.id}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="text-theme font-switzer font-semibold">
                            Pickup Address
                          </p>
                          {/* <p className="font-switzer text-themePlaceholder text-opacity-60 text-sm">
                            {bookingDetail?.pickupDate},{" "}
                            {bookingDetail?.pickupStartTime}
                          </p> */}
                        </div>

                        <AddressCardPkDo
                          title={bookingDetail?.pickupAddress?.title}
                          streetAddress={
                            bookingDetail?.pickupAddress?.streetAddress
                          }
                          building={bookingDetail?.pickupAddress?.building}
                          floor={bookingDetail?.pickupAddress?.floor}
                          apartment={bookingDetail?.pickupAddress?.apartment}
                          district={bookingDetail?.pickupAddress?.district}
                          city={bookingDetail?.pickupAddress?.city}
                          province={bookingDetail?.pickupAddress?.province}
                          country={bookingDetail?.pickupAddress?.country}
                          postalCode={bookingDetail?.pickupAddress?.postalCode}
                        />
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
                        <AddressCardPkDo
                          title={bookingDetail?.dropoffAddress?.title}
                          streetAddress={
                            bookingDetail?.dropoffAddress?.streetAddress
                          }
                          building={bookingDetail?.dropoffAddress?.building}
                          floor={bookingDetail?.dropoffAddress?.floor}
                          apartment={bookingDetail?.dropoffAddress?.apartment}
                          district={bookingDetail?.dropoffAddress?.district}
                          city={bookingDetail?.dropoffAddress?.city}
                          province={bookingDetail?.dropoffAddress?.province}
                          country={bookingDetail?.dropoffAddress?.country}
                          postalCode={bookingDetail?.dropoffAddress?.postalCode}
                        />
                      </div>
                    </div>
                    <ShippingCompanyCard
                      companyName={bookingDetail?.logisticCompany?.title}
                      rate={`$ ${bookingDetail?.total}`}
                      src={BASE_URL + bookingDetail?.logisticCompany?.logo}
                    />
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
                        <button className="bg-theme text-themeText px-8 py-3 rounded-md font-switzer font-medium">
                          Apply
                        </button>
                      </div> */}
                    <div className="space-y-1 font-switzer [&>div]:flex [&>div]:justify-between [&>div]:items-center">
                      <div>
                        <p className="text-themePlaceholder text-opacity-60">
                          Billable weight
                        </p>
                        <p className="text-themePlaceholder">
                          {bookingDetail?.billableWeight} lbs
                        </p>
                      </div>
                      <div>
                        <p className="text-themePlaceholder text-opacity-60">
                          Category
                        </p>
                        <p className="text-themePlaceholder">
                          {bookingDetail?.packages?.map((pkg, i) =>
                            bookingDetail?.packages.length - 1 === i
                              ? pkg?.category
                              : pkg?.category + ", "
                          )}
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
                      className="font-semibold text-white bg-theme px-5 py-3 w-full h-full rounded-md"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
              <button className="flex items-center gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-5 rounded-md font-switzer font-semibold">
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

      {/* <Modal
        isOpen={modal}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "xs" : "md"}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-4">
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
      </Modal> */}
    </div>
  );
}
