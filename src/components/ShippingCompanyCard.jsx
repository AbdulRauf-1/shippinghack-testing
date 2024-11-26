import React from "react";
import { TbShoppingCartSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function ShippingCompanyCard(props) {
  return (
    <div
      className={`flex justify-between gap-x-4 items-center border border-themePlaceholder border-opacity-20 rounded-md px-5`}
    >
      <div className="flex items-center gap-x-4">
        <div>
          <TbShoppingCartSearch size={30} />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-themePlaceholder font-switzer">
            {props?.companyName}
          </p>
        </div>
      </div>
      <div className="w-20 h-20 py-4">
        <img
          loading="eager|lazy"
          src={props?.src}
          alt="shipping company"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
