import React from "react";

export default function SenderOrReceiverDetailCard(props) {
  return (
    <div className="p-2 border border-themePlaceholder border-opacity-20 rounded-md">
      <div className="space-y-1 font-switzer text-themePlaceholder [&>p]:flex [&>p]:justify-between">
        <p className="text-theme font-semibold font-switzer">
          {props?.heading}
        </p>
        {/* {props?.heading === "Sender" && (
          <p className="text-sm">
            <span className="text-opacity-60 text-themePlaceholder">
              Virtual Box Number
            </span>{" "}
            <span>{props?.virtualBoxNo}</span>
          </p>
        )} */}
        <p className="text-sm"> 
          <span className="text-opacity-60 text-themePlaceholder">
            {props?.heading === "Sender" ? "Sender" : "Receiver"} Name
          </span>{" "}
          <span>{props?.name}</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Email</span>{" "}
          <span>{props?.email}</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Phone</span>{" "}
          <span>{props?.phone}</span>
        </p>
      </div>
    </div>
  );
}
