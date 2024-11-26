import React from "react";
import PackageStatus from "./PackageStatus";
import MeasurementCard from "./MeasurementCard";
import PackageDetailsCard from "./PackageDetailsCard";
import { PostAPI } from "../utilities/PostAPI";

export default function PackageDetailCard(props) {
  return (
    <div className="space-y-4 font-switzer sticky top-28">
      {props?.bookingDetailsData?.trackingId && (
        <p className="font-semibold text-xl text-themePlaceholder">
          Order#
          <span className="text-themePlaceholder text-opacity-40">
            {" "}
            {props?.bookingDetailsData?.trackingId}
          </span>
        </p>
      )}

      {props?.bookingDetailsData?.packages?.map((pkge, i) => (
        <div
          key={i}
          className="p-4 border border-borderColor rounded-md font-switzer space-y-3"
        >
          <div className="flex justify-between items-center">
            <p className="text-theme text-lg font-semibold">
              Package Detail ({i + 1}/
              {props?.bookingDetailsData?.packages.length})
            </p>
            <PackageStatus
              id={props?.bookingDetailsData?.trackingId}
              text={pkge?.arrived}
              bgColor={props?.statusBgColor}
              color={props?.statusTextColor}
            />
          </div>
          <div className="space-y-2">
            <PackageDetailsCard
              companyName={pkge?.ecommerceCompany}
              name={pkge?.name}
              email={pkge?.email}
              phoneNo={pkge?.phone}
              ETA={pkge?.ETA}
            />
            <MeasurementCard
              width={pkge?.width}
              length={pkge?.length}
              height={pkge?.height}
              weight={pkge?.weight}
              category={pkge?.category}
            />
          </div>
        </div>
      ))}
      <div className="max-md:flex max-md:justify-end">
        {props?.bookingDetailsData?.trackingId && (
          <button
            onClick={() => props?.handleClick(props?.bookingDetailsData?.id)}
            className="w-full text-theme font-switzer font-semibold text-center py-2.5  rounded-md
        border border-theme hover:bg-theme hover:text-white bg-white  duration-150
        "
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
