import React from "react";
import PackageStatus from "./PackageStatus";

export default function OrderHistoryCard(props) {
  return (
    <div
      onClick={props?.onClick}
      className={`cursor-pointer p-5 border rounded-md font-switzer space-y-2 ${
        props?.index === props?.orderHistoryDataId
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
              {" "}
              {props?.orderNo}
            </span>
          </p>
        </div>
        <p>{props?.date}</p>
      </div>
      <div>
        <p className="font-medium text-themePlaceholder text-xl">
          {props?.type === "localOrders" ? "Pickup Address" : "Company Name"}
        </p>
        <p className="text-opacity-60 text-themePlaceholder ps-10">
          {props?.head1}
        </p>
        {props?.head2 && (
          <p className="font-medium text-themePlaceholder text-xl">
            Destionation
          </p>
        )}
        <p className="text-opacity-60 text-themePlaceholder ps-10">
          {props?.head2}
        </p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-theme text-2xl font-semibold font-switzer">
            {props?.price}
          </p>
          <div>
            <PackageStatus
              text={props?.status}
              bgColor={props?.statusBgColor}
              color={props?.statusTextColor}
            />
          </div>
        </div>
      </div>
      {props?.type === "localOrders" && props?.status === "Order Created" && (
        <div className="flex justify-end gap-x-4 pt-4">
          {!props?.paymentConfirmed && (
            <button
              onClick={props?.handleProceedPayment}
              className="font-semibold border border-theme text-white bg-theme hover:text-theme hover:bg-themeText px-5 py-3 h-full rounded-md duration-150"
            >
              Proceed to Payment
            </button>
          )}
          <button
            onClick={props?.handleCancelOrder}
            className="font-semibold border border-theme hover:text-white hover:bg-theme text-theme px-5 py-3 h-full rounded-md duration-150"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
}
