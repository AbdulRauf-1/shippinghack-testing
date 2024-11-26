import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Layout from "../../../components/Layout";
import BackButton from "../../../components/BackButton";
import SelectCard from "../../../components/SelectCard";
import CreditCard from "../../../components/CreditCard";
import { useNavigate } from "react-router-dom";

export default function DeliveryService() {
  const navigate = useNavigate();
  const addDeliveryAddressStepNo = JSON.parse(
    localStorage.getItem("addDeliveryAddressStepNo")
  );

  const [modal, setModal] = useState(false);
  const [stepNo, setStepNo] = useState(addDeliveryAddressStepNo);

  const onClose = () => {
    setModal(false);
    navigate("/order-history");
  };

  const handleDownloadReciept = () => {
    const downloadReceiptLink = JSON.parse(
      localStorage.getItem("downloadReceiptLink")
    );
  
    if (downloadReceiptLink) {
      const link = document.createElement("a");
      link.href = downloadReceiptLink;
      link.setAttribute("download", "receipt.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("No downloadReceiptLink found");
    }
  };

  return (
    <Layout
      rightSide={
        <div className="space-y-8">
          <div className="mx-auto flex justify-between w-4/5">
            {/* 1 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${
                  stepNo === 1 || stepNo === 2 || stepNo === 3
                    ? "bg-theme"
                    : "bg-themeText"
                } w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 1 || stepNo === 2 || stepNo === 3
                      ? "text-themeText"
                      : "text-theme"
                  } text-4xl`}
                >
                  1
                </p>
              </div>
              <p className="font-switzer text-lg font-semibold">Send Parcel</p>
            </div>
            {/* 2 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${
                  stepNo === 2 || stepNo === 3 ? "bg-theme" : "bg-themeText"
                } w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 2 || stepNo === 3
                      ? "text-themeText"
                      : "text-theme"
                  } text-4xl`}
                >
                  2
                </p>
              </div>
              <p className="font-switzer text-lg font-semibold">
                Parcel Detail
              </p>
            </div>
            {/* 3 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${
                  stepNo === 3 ? "bg-theme" : "bg-themeText"
                } w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 3 ? "text-themeText" : "text-theme"
                  } text-4xl`}
                >
                  3
                </p>
              </div>
              <p className="font-switzer text-lg font-semibold">
                Add Payment Method
              </p>
            </div>
          </div>

          <div className="space-y-4 font-switzer mx-auto">
            <p className="font-bold text-2xl flex items-center gap-x-2">
              {" "}
              <BackButton onClick={() => window.history.back()} /> Payment
              Method
            </p>
            <div className="space-y-8">
              {/* services types */}
              <div className="flex gap-x-8">
                <SelectCard src="/images/Paypal.webp" desc="Paypal" />
                <SelectCard src="/images/card.webp" desc="Pay Via Card" />
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold text-2xl ">Save Cards</p>
                <button
                  onClick={() => setModal(true)}
                  className="flex items-center gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-5 rounded-md font-switzer font-semibold"
                >
                  <span>
                    <HiOutlinePlusCircle size={22} />
                  </span>{" "}
                  Add New Card
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-8">
                {" "}
                <CreditCard />
                <CreditCard />
              </div>
            </div>
          </div>

          <Modal
            isOpen={modal}
            onClose={onClose}
            isCentered
            motionPreset="slideInBottom"
            size={window.innerWidth < 768 ? "xs":"md"}
          >
            <ModalOverlay />

            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody className="space-y-4 md:space-y-6 lg:space-y-8">
                <div className="flex flex-col gap-y-2 items-center font-switzer">
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
                    onClick={handleDownloadReciept}
                    className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Download Receipt
                  </button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
