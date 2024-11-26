import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DropOffAddressCard(props) {
  return (
    <div
      onClick={() =>
        props?.onClick(props?.address?.addressDBId, props?.address?.type)
      }
      key={props?.address?.addressDBId} 
      className={`${
        props?.active
          ? "border border-themeTeal shadow-md"
          : "border border-themePlaceholder border-opacity-20"
      } gap-x-4  p-4 rounded-md space-y-2 cursor-pointer`}
    >
      <div className="flex justify-between items-center ">
        <p className="font-semibold text-themeTeal text-xl">
          {props?.address?.addressDB?.title}
        </p>
        <div className="flex items-center gap-x-2">
          {/* <button>
          <MdOutlineModeEdit size={30} />
        </button> */}
          <button
            onClick={() => props?.handleDelete(props?.address?.addressDB?.id)}
          >
            <RiDeleteBin6Line size={30} color="#FF0000" />
          </button>
        </div>
      </div>
      {/* <p className="font-switzer font-medium text-themePlaceholder text-lg">
      {props?.address?.addressDB?.title}
    </p> */}
      <div>
        <p className="text-themePlaceholder text-opacity-60 font-switzer">
          {props?.address?.addressDB?.streetAddress}
        </p>
        <p className="text-themePlaceholder text-opacity-60 font-switzer">
          {props?.address?.addressDB?.building},{" "}
          {props?.address?.addressDB?.floor},{" "}
          {props?.address?.addressDB?.apartment}
        </p>
        <p className="text-themePlaceholder text-opacity-60 font-switzer">
          {props?.address?.addressDB?.district},{" "}
          {props?.address?.addressDB?.city},{" "}
          {props?.address?.addressDB?.province},{" "}
          {props?.address?.addressDB?.country},{" "}
          {props?.address?.addressDB?.postalCode}
        </p>
      </div>
    </div>
  );
}
