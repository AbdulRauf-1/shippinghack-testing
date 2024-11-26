import React from "react";
import { inputStyle } from "../../utilities/Style";
import { useNavigate } from "react-router-dom";

export default function BusinessMembershipStep2() {
  const navigate = useNavigate();
  return (
    <div className="px-20 bg-themebackground pb-10">
      <div className="w-56 h-24">
        <img
        loading="eager|lazy"
          src="/images/logo.webp"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-10 py-16 px-5 w-2/5 mx-auto font-switzer  bg-themeText shadow-lg rounded-md">
        {/* order payment detail */}
        <div className="space-y-8">
          <p className="text-themePlaceholder text-4xl font-light text-center">
            Order Payment
          </p>
          <div className="space-y-4">
            <p className="text-themePlaceholder text-opacity-60 text-xl leading-tight">
              The payment method you selected supports payments in multiple
              currencies. If you would like to pay in a currency other than USA,
              please select the currenct from the list below. Upon completion of
              your payment, your order will clear for shipment.
            </p>
            <p className="text-themePlaceholder text-xl">
              USD payment Amount
              <span className="text-themePlaceholder text-opacity-60">
                : $10.00
              </span>
            </p>
          </div>
        </div>

        {/* payment amount */}
        <div className="space-y-12">
          <div className="space-y-2">
            <label htmlFor="">Payment Amount in Alternative Currency:</label>
            <input
              type="text"
              name=""
              id=""
              className={`${inputStyle}`}
              placeholder="USA - $10.00"
            />
          </div>
          <div className="flex items-center justify-between [&>button]:rounded-md [&>button]:text-xl [&>button]:py-2.5 [&>button]:px-12">
            <button className="text-theme border border-theme duration-100">
              Cancel
            </button>
            <button
              onClick={() => navigate("/order-summary")}
              className="bg-theme bordre border-theme text-themeText duration-100"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-10">
        Copyright &copy; Shipping Hack 2024. All rights reserved
      </p>
    </div>
  );
}
