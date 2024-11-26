import React from "react";
import PackageStatus from "./PackageStatus";
import { useNavigate } from "react-router-dom";
import { info_toaster } from "../utilities/Toaster";

export default function PackagesInWarehouseCard(props) {
  const navigate = useNavigate();

  const handleAddDeliveryAddress = () => {
    if (props?.bookingStatusId === 7) {
      info_toaster("Please wait for Re-measurement of your parcel");
    } else if (props?.bookingStatusId === 8) {
      localStorage.setItem("addDeliveryAddressStepNo", JSON.stringify(1));
      localStorage.setItem(
        "warehousePackageBookingId",
        JSON.stringify(props?.orderNo)
      );
      localStorage.removeItem("addDropOffAddress");
      navigate("/add-delivery-address");
    }
  };

  return (
    <div
      onClick={props?.onClick}
      className={`cursor-pointer p-5 border rounded-md font-switzer space-y-2 ${
        props?.orderNo === props?.packagesInWarehouseData?.id
          ? "shadow-md border-themePlaceholder border-opacity-25"
          : "border-borderColor"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <div className="h-10 w-10">
            <img
              loading="eager|lazy"
              src="/images/box.webp"
              alt="card box"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="font-semibold text-2xl text-themePlaceholder">
            Order#
            <span className="text-themePlaceholder text-opacity-40">
            {" "}{props?.orderNo}
            </span>
          </p>
        </div>
        <div>
          <PackageStatus
            key={props?.index}
            text={props?.status}
            bgColor={props?.statusBgColor}
            color={props?.statusTextColor}
          />
        </div>
      </div>
      <div>
        <p className="text-opacity-60 text-themePlaceholder">
          {props?.packageType}
        </p>
        <p className="font-medium text-themePlaceholder text-xl">Companies</p>
        <p className="text-opacity-60 text-themePlaceholder ps-10">
          {props?.companyName}
        </p>
        <p className="text-opacity-60 text-themePlaceholder">{props?.date}</p>
      </div>
      {(props?.bookingStatusId === 7 || props?.bookingStatusId === 8) && (
        <div>
          <button
            className="bg-theme text-themeText px-5 py-2.5 rounded-md"
            onClick={handleAddDeliveryAddress}
          >
            Add Delivery Address
          </button>
        </div>
      )}
    </div>
  );
}
