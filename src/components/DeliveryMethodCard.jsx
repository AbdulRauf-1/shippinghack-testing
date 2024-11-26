import React from "react";
import { BASE_URL } from "../utilities/URL";

export default function DeliveryMethodCard(props) {
  return (
    <div
      key={props?.company?.id}
      onClick={() => props?.handleLogisticCompany(props?.company)}
      className={`${
        props?.active ? "bg-cardColorActive bg-opacity-40" : "bg-cardBgColor"
      } relative flex flex-col justify-end rounded-md px-5 py-8 shadow-cardShadow font-switzer space-y-4 cursor-pointer`}
    >
      <div className="h-12 w-44 mx-auto">
        <img
        loading="lazy"
          src={`${BASE_URL}${props?.company?.logo}`}
          alt={props?.company?.name}
          className="bg-contain w-full h-full"
        />
      </div>
      <div className="text-start space-y-1 flex items-end gap-x-2">
        <p className="text-themePlaceholder text-opacity-80 font-switzer text-lg">
          Delivery Charges:{" "}
        </p>
        {/* <p className="text-themePlaceholder text-opacity-60 font-switzer text-sm">
          ETA: 4-5 Business days
        </p> */}
        <p className="text-themeRed font-switzer text-xl font-semibold">
          ${props?.company?.charges}
        </p>
      </div>
    </div>
  );
}
