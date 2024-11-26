import React from "react";
import Layout from "../../../components/Layout";
import { MdOutlineCancel } from "react-icons/md";
import SaveAddressCard from "../../../components/SaveAddressCard";
import { HiOutlinePlusCircle } from "react-icons/hi";

export default function SavedAddressList() {
  return (
    <Layout
      button={true}
      buttonText="Add New Shipping Address"
      buttonIcon={<HiOutlinePlusCircle size={22} />}
      rightSide={
        <div>
          {/* <div className="flex justify-end">
              <button className="flex items-center gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-5 rounded-md font-switzer font-semibold duration-100">
                <span>
                  <HiOutlinePlusCircle size={22} />
                </span>{" "}
                Add New Shipping Address
              </button>
            </div> */}
          {/* No Address Found */}
          <div className="space-y-2">
            <p className="font-switzer text-themePlaceholder text-opacity-60">
              Please select your shipping address from the save addresses or add
              a new shipment address
            </p>
            <div className="text-crossColor flex justify-center items-center">
              <MdOutlineCancel size={100} />
            </div>
            <p className="font-semibold font-switzer text-3xl text-center">
              No Address Found
            </p>

            <div className="grid grid-cols-2 gap-x-6">
              <SaveAddressCard />
              <SaveAddressCard />
            </div>
          </div>
        </div>
      }
    />
  );
}
