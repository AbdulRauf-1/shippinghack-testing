import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShipmentCard(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (props?.navigate) {
          localStorage.setItem("addDeliveryAddressStepNo", JSON.stringify(2));
          navigate("/payment-method");
        } else if (props?.type) {
          props?.handleShipmentType(props?.type);
        }
      }}
      key={props?.handleShipmentType}
      className={`w-full md:!min-h-full md:w-[380px] relative bg-cardBgColor ${
        props?.bgColor ? "bg-cardColorActive bg-opacity-40" : "bg-cardBgColor"
      } cursor-pointer flex flex-col justify-start items-center rounded-md px-5 md:px-10 shadow-cardShadow font-switzer`}
    >
      <div className="h-28 absolute -top-10">
        <img
        loading="eager|lazy"
          src={props?.src}
          alt="local shipment"
          className="bg-contain w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between items-center space-y-2 pt-28 pb-8">
        <p className="font-semibold text-3xl text-center">{props?.heading}</p>
        <p className="text-themePlaceholder text-opacity-60 text-base font-normal text-center">
          {props?.desc}
        </p>
      </div>
    </div>
  );
}
