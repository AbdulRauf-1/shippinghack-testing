import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import PackagesInWarehouseCard from "../../../components/PackagesInWarehouseCard";
import WarehousePackageDetail from "../../../components/WarehousePackageDetail";
import GetAPI from "../../../utilities/GetAPI";
import SenderOrReceiverDetailCard from "../../../components/SenderOrReceiverDetailCard";
import MiniLoader from "../../../components/MiniLoader";
import Loader from "../../../components/Loader";
import { error_toaster, success_toaster } from "../../../utilities/Toaster";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function PackagesInWarehouse() {
  const [packagesInWarehouseData, setPackagesInWarehouseData] = useState("");
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  // const scrollRef = useRef(null);
  const [count, setCount] = useState(5); // 5

  const { data } = GetAPI("customer/packagesInWarehouse");

  const onClose = () => {
    setModal(false);
  };

  const handleBookingDetail = async (id) => {
    setLoader(true);
    const res = await PostAPI("customer/orderdetails", {
      bookingId: id,
    });
    console.log(`🚀 ~ handleBookingDetail ~ res: ${id}`, res?.data);
    if (res?.data?.status === "1") {
      setPackagesInWarehouseData(res?.data?.data);
      setLoader(false);
      success_toaster(res?.data?.message);
      if (window.innerWidth < 768) {
        setModal(true);
      }
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  const handleCompanyName = (packages) => {
    let companyNames = "";
    packages.map((name, i) => {
      companyNames = `${name?.ecommerceCompany?.title}, ${companyNames}`;
    });
    return companyNames;
  };

  const handleSee = () => {
    setLoader(true);
    count === 5 ? setCount(data?.data?.bookingData.length) : setCount(5);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  };

  useEffect(() => {
    if (data && data.data && data.data.bookingData.length > 0) {
      handleBookingDetail(data.data.bookingData[0].id);
    }
  }, [data]);

  // useEffect(() => {
  //   if (scrollRef.current && window.innerWidth >= 786) {
  //     scrollRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [packagesInWarehouseData]);

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      // scrollRef={scrollRef}
      title="Packages in Warehouse"
      rightSide={
        loader ? (
          <div className="h-screen flex items-center justify-center">
            <MiniLoader />
          </div>
        ) : data?.data?.bookingData.length === 0 ? (
          <p className="text-center text-themeRed font-helvetica text-2xl" style={{ height: "calc(100vh - 440px)" }}>
            No Package is Warehouse !!
          </p>
        ) : (
          <div className="grid grid-cols-6 gap-6">
            {/* Left Side Cards */}

            <div className="col-span-6 md:col-span-4 space-y-4">
              {data?.data?.bookingData?.slice(0, count).map((booking, i) => (
                <PackagesInWarehouseCard
                  onClick={() => handleBookingDetail(booking?.id)}
                  key={booking?.id}
                  bookingStatusId={booking?.bookingStatus?.id}
                  packagesInWarehouseData={packagesInWarehouseData}
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
            <div className="hidden md:block col-span-2 relative">
              <WarehousePackageDetail
                packagesInWarehouseData={packagesInWarehouseData}
                statusTextColor="text-statusSend"
                statusBgColor="bg-statusSend"
              />
            </div>

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
                        packagesInWarehouseData={packagesInWarehouseData}
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
          </div>
        )
      }
    />
  );
}
