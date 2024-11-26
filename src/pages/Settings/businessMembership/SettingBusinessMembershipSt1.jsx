import React, { useState } from "react";
import { inputStyle } from "../../../utilities/Style";
import Select from "react-select";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function SettingBusinessMembershipSt1() {
  const [modal, setModal] = useState(true);

  const onClose = () => {
    setModal(false);
  };

  return (
    <div className="px-20 bg-themebackground">
      <div className="w-56 h-24">
        <img
        loading="eager|lazy"
          src="/images/logo.webp"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="font-switzer py-10">
        <div className="grid grid-cols-6 gap-x-10 place-items-start w-[90%] mx-auto">
          {/* Left Side Card */}
          <div className="w-full px-10 py-10 space-y-10 col-span-4 bg-themeText shadow-lg rounded-md">
            <p className="text-themePlaceholder text-4xl font-light">
              Order Payment
            </p>

            {/* FORM */}
            <div className="space-y-6">
              <p className="text-xl text-themePlaceholder font-switzer font-light">
                Payment Amount: $10.00
              </p>
              <div className="space-y-4">
                <div className="space-y-1 ">
                  <label htmlFor="">Payment Method</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Visa"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Billing Address</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Please Select your Country"
                  />
                </div>
                <div className="flex gap-x-2 items-center">
                  <input type="checkbox" name="" id="" className="h-5 w-5" />
                  <label
                    htmlFor=""
                    className="text-themePlaceholder  text-opacity-60"
                  >
                    Save my payment information for future payments
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-4">
              <button className="text-xl py-2.5 w-44 rounded-md bg-themeText text-theme border border-theme duration-100">
                CANCEL
              </button>
              <button className="text-xl py-2.5 w-44 rounded-md bg-theme text-themeText duration-100">
                NEXT
              </button>
            </div>

            {/* select payment method */}
            <div>
              <Select placeholder="Payment Methods" />
            </div>
          </div>

          {/* Right Side Card */}
          <div className="bg-theme px-5 py-6 space-y-6 rounded-md col-span-2 ">
            <p className="text-2xl text-themeText font-medium">
              PURCHASE SUMMARY
            </p>
            <p className="flex justify-between items-center text-themeText">
              <span className="text-lg leading-tight">
                BUSINESS (ANNUAL) MEMBERSHIP
              </span>{" "}
              <span className="text-xl">$99.00USD</span>
            </p>
            <p className="text-themeText flex items-center justify-between">
              <span className="text-xl ">TOTAL</span>
              <span className="text-lg">
                $ <span className="text-3xl">99.00</span> USD
              </span>
            </p>
          </div>
        </div>
        <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-10">
          Copyright &copy; Shipping Hack 2024. All rights reserved
        </p>
      </div>

      <Modal 
        isOpen={modal}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={"4xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            style={{
              fontWeight: "300",
              fontSize: "40px",
              color: "#000000",
            }}
            className="font-switzer"
          >
            Add Address
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="space-y-6 font-switzer">
              <div className="space-y-4">
                <div className="space-y-1 ">
                  <label htmlFor="">Nickname for this Address</label>
                  <input 
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Nickname"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="space-y-1 ">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Company Name</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Please Select your Country"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Street Address</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Street Address"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Apt/Number</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Apt/Number"
                  />
                </div>
                <div className="grid grid-cols-3 gap-x-6">
                  <div className="space-y-1 ">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label htmlFor="">State/Prefecture/Province</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="State/Prefecture/Province"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label htmlFor="">Postal Code</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="space-y-1 ">
                    <label htmlFor="">Phone</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label htmlFor="">Tax ID/Business ID</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="flex gap-x-2 items-center">
                  <input type="checkbox" name="" id="" className="h-5 w-5" />
                  <label
                    htmlFor=""
                    className="text-themePlaceholder  text-opacity-60"
                  >
                    Make this your default address
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-4 py-5">
              <button
                onClick={() => setModal(false)}
                className="w-36 text-xl py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
              >
                Cancel
              </button>
              <button
                className="w-36 text-xl py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-transparent border hover:border-theme"
              >
                Save
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
