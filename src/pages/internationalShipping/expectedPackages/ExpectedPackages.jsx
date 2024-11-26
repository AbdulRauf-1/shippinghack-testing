import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import ExpectedPackagesCard from "../../../components/ExpectedPackagesCard";
import PackageDetailCard from "../../../components/PackageDetailCard";
import GetAPI from "../../../utilities/GetAPI";
import Loader from "../../../components/Loader";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import MiniLoader from "../../../components/MiniLoader";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Select from "react-select";
import { inputStyle } from "../../../utilities/Style";
import dayjs from "dayjs";

export default function ExpectedPackages() {
  const options = [];
  const scrollRef = useRef(null);
  const [bookingDetailsData, setBookingDetailsData] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [reason, setReason] = useState(null);
  const [reasonText, setReasonText] = useState("");
  const [count, setCount] = useState(5); // 5

  const { data, reFetch } = GetAPI("customer/expectedPackages");
  const { data: reasonsData } = GetAPI("customer/getReasons");
  console.log("🚀 ~ ExpectedPackages ~ reasonsData:", reasonsData)

  reasonsData?.data?.map((reason, i) =>
    options.push({
      value: reason?.id,
      label: reason?.reason,
    })
  );

  const onClose = () => {
    setModal(false);
  };

  const onClose2 = () => {
    setModal2(false);
  };

  const handleCompanyName = (packages) => {
    let companyNames = "";
    packages.map((name, i) => {
      companyNames = `${name?.ecommerceCompany?.title}, ${companyNames}`;
    });
    return companyNames;
  };

  const handleBookingDetail = async (id) => {
    setLoader(true);
    const res = await PostAPI("customer/orderdetails", {
      bookingId: id,
    });
    if (res?.data?.status === "1") {
      setBookingDetailsData(res?.data?.data);
      setLoader(false);
      success_toaster(res?.data?.message);
      if (window.innerWidth < 768) {
        setModal2(true);
      }
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  const handleClick = (bookingId) => {
    setBookingId(bookingId);
    setReason({
      value: "",
      label: "",
    });
    setModal(true);
  };

  const handleCancelOrder = async () => {
    if (reason?.value === "") {
      info_toaster("Select Reason First");
    } else {
      setLoader(true);
      const res = await PostAPI("customer/cancelbooking", {
        bookingId: bookingId,
        reasonId: reason?.value,
        reasonText: reasonText ? reasonText : reason?.label,
      });
      if (res?.data?.status === "1") {
        reFetch();
        setModal(false);
        setLoader(false);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    }
  };

  const handleSee = () => {
    setLoader(true);
    count === 5 ? setCount(data?.data?.bookingData.length) : setCount(5);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  };

  useEffect(() => {
    if (data && data?.data && data?.data?.bookingData?.length > 0) {
      handleBookingDetail(data?.data?.bookingData[0]?.id);
    }
  }, [data]);


  useEffect(() => {
    if (scrollRef.current && window.innerWidth >= 786) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bookingDetailsData]);

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      scrollRef={scrollRef}
      title="Expected Packages"
      rightSide={
        loader ? (
          <MiniLoader />
        ) : data?.data?.bookingData.length === 0 ? (
          <p className="text-center text-themeRed font-helvetica text-2xl"  style={{ height: "calc(100vh - 440px)" }}>
            No Expected Packages !!
          </p>
        ) : (
          <div
            // ref={scrollRef}
            className="md:grid md:grid-cols-6 gap-4 md:gap-4 lg:gap-6"
          >
            {/* Left Side Cards */}
            <div className="md:col-span-4 space-y-4">
              {data?.data?.bookingData.slice(0, count).map((booking, i) => (
                <ExpectedPackagesCard
                  key={booking?.id}
                  onClick={() => handleBookingDetail(booking?.id)}
                  bookingDetailsDataId={bookingDetailsData?.id}
                  orderNo={booking?.id}
                  status={booking?.bookingStatus?.title}
                  statusTextColor="text-statusOngoing"
                  statusBgColor="bg-statusOngoing"
                  packageType={
                    booking?.packages.length > 1
                      ? "Multiple Packages"
                      : "Single Package"
                  }
                  companyName={
                    booking?.packages.length > 1
                      ? handleCompanyName(booking?.packages)
                      : booking?.packages[0]?.ecommerceCompany?.title
                  }
                  date={booking?.createdAt}
                  // date={dayjs(booking?.createdAt).format("MMMM D, YYYY h:mm A")}
                />
              ))}
              <div
                className={`justify-end ${
                  data?.data?.bookingData.length > 5 ? "flex" : "hidden"
                }`}
              >
                <button
                  onClick={handleSee}
                  className="border border-theme hover:bg-theme hover:text-white bg-white text-theme duration-150 rounded-md py-2.5 w-32 font-medium font-switzer"
                >
                  See {count === 5 ? "More" : "Less"}
                </button>
              </div>
            </div>

            {/* Package Detail */}
            <div className="hidden relative md:block md:col-span-2">
              <PackageDetailCard
                handleClick={handleClick}
                bookingDetailsData={bookingDetailsData}
                statusTextColor="text-statusOngoing"
                statusBgColor="bg-statusOngoing"
              />
            </div>

            <Modal
              isOpen={modal}
              onClose={onClose}
              isCentered
              motionPreset="slideInBottom"
              size={window.innerWidth < 768 ? "xs" : "md"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {!loader && (
                    <div className="font-switzer font-semibold text-lg md:text-xl !text-center">
                      Reason of Cancelation
                    </div>
                  )}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {loader ? (
                    <MiniLoader />
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Select
                            value={reason?.value ? reason : null}
                            onChange={(selectedOption) =>
                              setReason(selectedOption || null)
                            }
                            options={options}
                            placeholder="Select Reason"
                          />
                        </div>
                        {reason?.label === "other" && (
                          <div>
                            {" "}
                            <textarea
                              name="reasonText"
                              id="reasonText"
                              value={reasonText}
                              onChange={(e) => setReasonText(e.target.value)}
                              placeholder="Write reason of cancellation here....."
                              rows={5}
                              className={inputStyle}
                            ></textarea>{" "}
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 pb-5">
                        <button
                          onClick={onClose}
                          className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCancelOrder}
                          className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>

            <Modal
              size={window.innerWidth < 640 ? "xs" : "sm"}
              isOpen={modal2}
              onClose={onClose2}
              isCentered
              motionPreset="slideInBottom"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {!loader && (
                    <div className="font-switzer font-semibold text-lg md:text-xl !text-center">
                      Order Detail
                    </div>
                  )}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {loader ? (
                    <MiniLoader />
                  ) : (
                    <div className="space-y-4">
                      <PackageDetailCard
                        handleClick={handleClick}
                        bookingDetailsData={bookingDetailsData}
                        statusTextColor="text-statusOngoing"
                        statusBgColor="bg-statusOngoing"
                      />
                    </div>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        )
      }
    />
  );
}
