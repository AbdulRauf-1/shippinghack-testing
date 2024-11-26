import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import ExpectedPackagesCard from "../../../components/ExpectedPackagesCard";
import { TbShoppingCartSearch } from "react-icons/tb";
import SenderOrReceiverDetailCard from "../../../components/SenderOrReceiverDetailCard";
import { inputStyle } from "../../../utilities/Style";
import GetAPI from "../../../utilities/GetAPI";
import Loader from "../../../components/Loader";
import WarehousePackageDetail from "../../../components/WarehousePackageDetail";
import { error_toaster, success_toaster } from "../../../utilities/Toaster";
import { PostAPI } from "../../../utilities/PostAPI";
import OrderHistoryCard from "../../../components/OrderHistoryCard";
import MiniLoader from "../../../components/MiniLoader";
import dayjs from "dayjs";
import Select from "react-select";

export default function CancelOrder() {
  const options = [];
  const [status, setStatus] = useState("localOrders"); // internationalOrders
  const [orderHistoryData, setOrderHistoryData] = useState("");
  const [delID, setDelID] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modalType, setModalType] = useState("sure"); //sure, reason, cancelled
  // const scrollRef = useRef(null);
  const [count, setCount] = useState(5); // 5
  const [reason, setReason] = useState(null);
  const [reasonText, setReasonText] = useState("");

  const { data, reFetch } = GetAPI("customer/myorders");
  const { data: reasonsData } = GetAPI("customer/getReasons");

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

  const handleOrderHistory = async (id) => {
    setLoader(true);
    const res = await PostAPI("customer/orderdetails", {
      bookingId: id,
    });
    if (res?.data?.status === "1") {
      setOrderHistoryData(res?.data?.data);
      setLoader(false);
      success_toaster(res?.data?.message);
      if (window.innerWidth < 768) {
        setModal(true);
      }
    } else {
      setLoader(false);
      error_toaster(res?.data?.message);
    }
  };

  const handleSee = () => {
    setLoader(true);
    count === 5 ? setCount(data?.data?.[status].length) : setCount(5);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  };

  const handleProceedPayment = async (bookingId, total) => {
    setLoader(true);
    const res = await PostAPI("customer/checkoutSessionsCheck", {
      bookingId: bookingId,
      amount: total,
      bookingType: "local",
    });
    if (res?.data?.status === "1") {
      setLoader(false);
      success_toaster("Pay vai Stripe");
      localStorage.setItem(
        "sessionData",
        JSON.stringify({
          sessionId: res?.data?.data?.id,
          bookingId: bookingId,
          total: total,
        })
      );
      window.open(res?.data?.data?.url, "_self");
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  const handleCancelOrder = (bookingId) => {
    setModal2(true);
    setDelID(bookingId);
    setReason(null);
  };

  const confirmCancelOrder = async () => {
    setLoader(true);
    const res = await PostAPI("customer/cancelbooking", {
      bookingId: delID,
      reasonId: reason?.value,
      reasonText: reasonText ? reasonText : reason?.label,
    });
    if (res?.data?.status === "1") {
      reFetch();
      setModal2(false);
      setLoader(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  useEffect(() => {
    if (
      (data && data?.data && data?.data?.localOrders.length > 0) ||
      (data && data?.data && data?.data?.internationalOrders.length > 0)
    ) {
      status === "localOrders" && data?.data?.localOrders.length > 0
        ? handleOrderHistory(data?.data?.localOrders[0]?.id)
        : data?.data?.internationalOrders.length > 0
        ? handleOrderHistory(data?.data?.internationalOrders[0]?.id)
        : "";
    }
    setCount(5);
  }, [data, status]);

  // useEffect(() => {
  //   if (scrollRef.current && window.innerWidth >= 768) {
  //     scrollRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [orderHistoryData]);

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      // scrollRef={scrollRef}
      title="Order History"
      rightSide={
        loader ? (
          <MiniLoader />
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => setStatus("localOrders")}
                className={`w-40 border border-theme ${
                  status === "localOrders"
                    ? "bg-theme text-themeText"
                    : "bg-themeText text-theme"
                } rounded-md py-2.5 px-2 font-medium font-switzer`}
              >
                Local
              </button>
              <button
                onClick={() => setStatus("internationalOrders")}
                className={`w-40 border border-theme ${
                  status === "internationalOrders"
                    ? "bg-theme text-themeText"
                    : "bg-themeText text-theme"
                } rounded-md py-2.5 px-2 font-medium font-switzer`}
              >
                International
              </button>
            </div>
            {/* <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaChevronDown />}
              className="!font-medium !font-switzer !text-theme !text-xl !bg-transparent border-b !border-b-theme !rounded-none"
            >
              Actions
            </MenuButton>
            <MenuList className="!bg-[#F4F3F3] !rounded-md">
              <MenuItem className="!bg-[#F4F3F3] !text-themePlaceholder !text-opacity-80 !font-switzer !py-2.5">
                Local Parcel
              </MenuItem>
              <MenuItem className="!bg-[#F4F3F3] !text-themePlaceholder !text-opacity-80 !font-switzer">
                International Parcel
              </MenuItem>
            </MenuList>
          </Menu> */}

            {data?.data?.[status].length === 0 ? (
              <p
                className="text-center text-themeRed text-2xl font-helvetica"
                style={{ height: "calc(100vh - 440px)" }}
              >
                No {status} History !!
              </p>
            ) : (
              <div className="grid grid-cols-6 gap-6">
                {/* Left Side Cards */}
                <div className="col-span-6 md:col-span-4 space-y-4">
                  {data?.data?.[status]?.slice(0, count).map((booking, i) => (
                    <OrderHistoryCard
                      onClick={() => handleOrderHistory(booking?.id)}
                      handleProceedPayment={() =>
                        handleProceedPayment(booking?.id, booking?.total)
                      }
                      handleCancelOrder={() => handleCancelOrder(booking?.id)}
                      type={status}
                      index={booking?.id}
                      key={booking?.id}
                      orderHistoryDataId={orderHistoryData?.id}
                      orderNo={booking?.trackingId}
                      date={dayjs(booking?.createdAt).format(
                        "MMMM D, YYYY h:mm A"
                      )}
                      // date={booking?.createdAt}
                      head1={
                        status === "internationalOrders"
                          ? booking?.logisticCompany?.title
                          : `${booking?.pickupAddress?.streetAddress} ${booking?.pickupAddress?.district}
                        ${booking?.pickupAddress?.city} ${booking?.pickupAddress?.province} ${booking?.pickupAddress?.country}`
                      }
                      head2={
                        booking?.dropoffAddress
                          ? `${booking?.dropoffAddress?.streetAddress} ${booking?.dropoffAddress?.district}
                        ${booking?.dropoffAddress?.city} ${booking?.dropoffAddress?.province} ${booking?.dropoffAddress?.country}`
                          : ""
                      }
                      price={`$${booking?.total}`}
                      status={booking?.bookingStatus?.title}
                      paymentConfirmed={
                        booking?.paymentConfirmed ? true : false
                      }
                      statusTextColor="text-statusOngoing"
                      statusBgColor="bg-statusOngoing"
                    />
                  ))}
                  <div
                    className={`justify-end ${
                      data?.data?.[status].length > 5 ? "flex" : "hidden"
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

                {/* Right side */}
                <div className="hidden md:block md:col-span-2 relative">
                  <WarehousePackageDetail
                    packagesInWarehouseData={orderHistoryData}
                    statusTextColor="text-statusSend"
                    statusBgColor="bg-statusSend"
                  />
                </div>
              </div>
            )}

            <Modal
              size={window.innerWidth < 640 ? "xs" : "sm"}
              isOpen={modal}
              onClose={onClose}
              isCentered
              motionPreset="slideInBottom"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {!loader && (
                    <div className="!font-switzer !font-semibold !text-xl !text-center">
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
                      <WarehousePackageDetail
                        packagesInWarehouseData={orderHistoryData}
                        statusTextColor="text-statusSend"
                        statusBgColor="bg-statusSend"
                      />
                    </div>
                  )}
                  <div className="pt-4 flex justify-end">
                    {" "}
                    <button
                      onClick={() => setModal(false)}
                      className="w-32 py-2.5 font-switzer font-medium hover:bg-transparent  hover:text-theme rounded-md
                   text-themeText bg-theme border border-theme "
                    >
                      Cancel
                    </button>
                  </div>
                </ModalBody>
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
                          onClick={onClose2}
                          className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmCancelOrder}
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
          </div>
        )
      }
    />
  );
}
