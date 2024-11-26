import React from "react";

export default function ShipmentTypeCard(props) {
  return (
    <div
      onClick={() => props?.handlePackageType(props?.type)}
      key={props?.heading}
      className={`max-h-full cursor-pointer ${
        props?.bgColor ? "bg-cardColorActive bg-opacity-40" : "bg-cardBgColor"
      } text-themePlaceholder flex flex-col justify-center text-center rounded-md px-5 sm:px-10 md:px-16 py-5 shadow-cardShadow font-switzer`}
    >
      <div className="space-y-6">
        <p className="font-bold text-2xl">{props?.heading}</p>
        <div className="w-28 h-28 mx-auto">
          <img
            loading="eager|lazy"
            src={props?.src}
            alt="select shipment image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-4 flex flex-col items-center">
          <p className="w-[320px] font-semibold text-xl text-center text-opacity-80 leading-tight">
            {props?.desc1}
          </p>
          <p className="w-[320px] text-center font-light text-base text-opacity-80 leading-tight">
            {props?.detail1}
          </p>
        </div>
      </div>
    </div>
  );
}
