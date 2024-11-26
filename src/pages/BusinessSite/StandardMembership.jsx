import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useStatStyles,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function StandardMembership() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [modal, setModal] = useState(true);

  const onClose = () => {
    setModal(false);
  };

  const handleGetStarted = () => {
    if (accessToken) {
      navigate("/membership");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="px-6 md:px-10 lg:px-20 bg-themebackground pb-10">
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

      <div className="space-y-6 md:space-y-8 lg:space-y-10 sm:py-12 py-8 md:py-10 lg:py-16 px-5 md:px-8 lg:px-10 lg:w-2/4 mx-auto font-switzer  bg-themeText shadow-lg rounded-md">
        <p className="text-themePlaceholder text-opacity-60 text-2xl md:text-3xl lg:text-4xl md:text-center">
          Account Activation Complete!
        </p>
        {/* content */}
        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <div className="flex justify-center">
              <div className=" border border-theme rounded-full w-20 md:w-24 h-20 md:h-24 flex items-center justify-center">
                <FaCheck
                  color="#00538C"
                  size={window.innerWidth < 768 ? 50 : 60}
                />
              </div>
            </div>
            <p className="font-light text-lg md:text-xl text-themePlaceholder leading-tight">
              Your account has been veified.You will have access as a Standard
              Member untilpayment for your initial clears.
            </p>
            <p className="text-themePlaceholder text-opacity-60 font-light text-lg md:text-xl">
              Here is your Shipping Hack U.S. address
            </p>
            <p className="text-themePlaceholder text-opacity-60 font-light text-lg md:text-xl leading-normal">
              Sigi Tech <br />
              444 Alaska Avenue <br />
              Suite #AUW240 <br />
              Torrance, CA 90503 <br />
              USA
            </p>
          </div>
          <p className="text-themePlaceholder text-opacity-60 font-light text-lg md:text-xl">
            Click below to start using your account.
          </p>
        </div>
        {/* button */}
        <div className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className="w-96 text-themeText bg-theme hover:bg-themeText hover:text-theme duration-150 border border-theme font-medium py-2.5 rounded-md"
          >
            Get Started
          </button>
        </div>
      </div>
      <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-6 md:pt-8 lg:pt-10">
        Copyright &copy; Shipping Hack 2024. All rights reserved
      </p>

      <Modal
        size={window.innerWidth < 768 ? "sm" : "md"}
        isOpen={modal}
        onClose={onClose}
        // isCentered
        motionPreset="slideInTop"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center font-switzer text-themePlaceholder text-opacity-80 text-lg md:text-2xl border-b ">
            Success!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="font-switzer flex items-center gap-x-2 py-2 md:py-5">
              <div className="border border-theme rounded-full w-10 h-10 flex items-center justify-center">
                <FaCheck color="#00538C" size={25} />
              </div>
              <p className="font-light text-themePlaceholder text-opacity-60 text-lg md:text-2xl">
                Your Account has been activated
              </p>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
