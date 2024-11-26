import React from "react";
import { inputStyle } from "../../utilities/Style";
import { useNavigate } from "react-router-dom";

export default function BusinessMembershipStep3() {
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

      <div className="space-y-5 p-10 shadow-lg rounded-lg bg-themeText w-3/4 mx-auto font-switzer">
        {/* order Summary */}
        <div className="space-y-4">
          <p className="text-themePlaceholder text-3xl">Order Summary</p>
          <div className="space-y-1 [&>p]:flex grid grid-cols-3">
            <p className="text-themePlaceholder text-opacity-80 text-xl">
              Reference:
            </p>{" "}
            <p className="text-themePlaceholder text-opacity-60 text-xl col-span-2">
              ST2555644
            </p>
            <p className="text-themePlaceholder text-opacity-80 text-xl">
              Description:
            </p>{" "}
            <p className="text-themePlaceholder text-opacity-60 text-xl col-span-2">
              Shipping Hack order MB565664
            </p>
            <p className="text-themePlaceholder text-opacity-80 text-xl">
              Amount (USD):
            </p>{" "}
            <p className="text-themePlaceholder text-opacity-60 text-xl col-span-2">
              $10.000
            </p>
          </div>
        </div>

        <hr className="text-themePlaceholder text-opacity-20" />

        {/* express checkout */}
        <div className="space-y-4">
          <p className="text-2xl text-themePlaceholder">Express Checkout</p>
          <button className="text-xl flex items-center gap-x-1 text-themeText bg-theme px-6 py-3 rounded-md duration-100">
            Buy with{" "}
            <span className="w-5 h-5 block">
              <img
                loading="eager|lazy"
                src="/images/google.webp"
                alt="google image"
                className="w-full h-full bg-contain"
              />
            </span>{" "}
            Pay
          </button>
        </div>

        <hr className="text-themePlaceholder text-opacity-20" />

        {/* payment details */}
        <div className="space-y-4">
          <div>
            <p className="text-themePlaceholder text-opacity-80 text-xl">
              Payment details
            </p>
            <p className="text-sm text-themePlaceholder text-opacity-65">
              <span className="text-[#A10808]">*</span>Indicates a required
              field
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2">
              <label htmlFor="" className="text-xl">
                Card number<span className="text-[#A10808]">*</span>
              </label>
              <input
                type="text"
                name=""
                id=""
                className={`${inputStyle}`}
                placeholder=""
              />
              <p className="text-sm text-[#A10808]">
                Enter a valid card number
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="" className="text-xl">
                Cardholder’s name<span className="text-[#A10808]">*</span>
              </label>
              <input
                type="text"
                name=""
                id=""
                className={`${inputStyle}`}
                placeholder="Zeeshan Nawaz"
              />
            </div>
            <div className="space-y-2 w-2/4">
              <label htmlFor="" className="text-xl">
                Expiry Date<span className="text-[#A10808]">*</span>
              </label>
              <input
                type="date"
                name=""
                id=""
                className={`${inputStyle} w-40`}
                placeholder=""
              />
            </div>
            <div className="gap-y-2 flex items-end justify-between">
              <div className="w-2/4 ">
                <label htmlFor="" className="text-xl">
                  Security Code<span className="text-[#A10808]">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle} w-40`}
                  placeholder=""
                />
              </div>
              <div className="flex items-center h-full gap-x-4">
                <p className="text-sm text-themePlaceholder text-opacity-60 flex items-center gap-x-2">
                  <span className="w-4 h-4 block">
                    <img
                      loading="eager|lazy"
                      src="/images/credit-card.webp"
                      alt="small card"
                      className="w-full h-full object-contain"
                    />
                  </span>
                  Last 3 digits on the back of card
                </p>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <p className="text-themePlaceholder text-opacity-80 text-xl">
              Billing address
            </p>
            <p className="text-themePlaceholder text-opacity-60">
              20 ali town, lahore, 54000, Pakistan
            </p>
          </div>

          {/* buttons */}
          <div className="flex items-center justify-between [&>button]:rounded-md [&>button]:text-xl [&>button]:py-2.5 [&>button]:w-56">
            <button className="text-theme border border-theme duration-100">
              Cancel
            </button>
            <button
              onClick={() => navigate("/cardholder-authentication")}
              className="bg-theme bordre border-theme text-themeText duration-100"
            >
              Continue
            </button>
          </div>
        </div>

        <hr className="text-themePlaceholder text-opacity-20" />

        <div className="[&>p]:text-center space-y-4">
          <p className="text-themePlaceholder text-opacity-60 text-sm">
            When you submit your transaction for processing by Worldpay you
            confirm you acceptance fo Worldpay’s privacy policy.
          </p>
          <p className="text-themePlaceholder text-opacity-80 text-sm">
            &copy; Worldpay 2013-2024. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
