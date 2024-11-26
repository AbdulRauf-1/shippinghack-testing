import React from "react";
import PackageStatus from "./PackageStatus";
import GetAPI from "../utilities/GetAPI";
import { PostAPI } from "../utilities/PostAPI";

export default function ExpectedPackagesCard(props) {
  return (
    <div
      onClick={props?.onClick}
      className={`cursor-pointer p-3 md:p-5 border rounded-md font-switzer space-y-2 ${
        props?.orderNo === props?.bookingDetailsDataId
          ? "shadow-md border-themePlaceholder border-opacity-25"
          : "border-borderColor"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-1 md:gap-x-2">
          <div className="h-10 w-10">
            <img
              loading="lazy"
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
    </div>
  );
}
