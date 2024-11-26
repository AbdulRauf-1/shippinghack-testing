import React from "react";
import { inputStyle } from "../../utilities/Style";
import { useNavigate } from "react-router-dom";

export default function BusinessMembershipStep1() {
  const navigate = useNavigate()
  return (
    <div className="px-20 bg-themebackground">
      <div className="w-56 h-24">
        <img
        loading="eager|lazy"
          src="/images/logo.webp"
          alt="logo"
          className="w-full h-full object-contain"
        /> 
      </div> 

      <div className="font-switzer py-10">
        <div className="grid grid-cols-6 gap-x-10 place-items-start w-[90%] mx-auto">
          {/* Left Side Card */}
          <div className="px-10 py-10 space-y-10 col-span-4 bg-themeText shadow-lg rounded-md">
            <p className="text-themePlaceholder text-opacity-60 text-4xl font-light">
              Payment
            </p>

            <div className="flex gap-x-2 items-center">
              <input type="checkbox" name="" id="" className="h-5 w-5" />
              <label
                htmlFor=""
                className="font-light text-xl text-themePlaceholder text-opacity-60"
              >
                Autobill me next time and give me a discount on my membership*
              </label>
            </div>

            {/* payment Method */}
            <div className="space-y-6">
              <p className="text-2xl text-themePlaceholder font-normal">
                Payment Method
              </p>
              <div className="flex items-end gap-x-4 [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:gap-y-2">
                <div>
                  <div className="w-12 h-10">
                    <img
                    loading="eager|lazy"
                      src="/images/visa.webp"
                      alt="visa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xl text-themePlaceholder text-opacity-60">
                    Visa
                  </p>
                  <input type="radio" name="" id="" className="w-6 h-6" />
                </div>
                <div>
                  <div className="w-12 h-10">
                    <img
                    loading="eager|lazy"
                      src="/images/master-card.webp"
                      alt="visa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xl text-themePlaceholder text-opacity-60">
                    Mastercard
                  </p>
                  <input type="radio" name="" id="" className="w-6 h-6" />
                </div>
                <div>
                  <div className="w-12 h-10">
                    <img
                    loading="eager|lazy"
                      src="/images/american-express.webp"
                      alt="visa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xl text-center text-themePlaceholder text-opacity-60 leading-none">
                    American <br /> Express
                  </p>
                  <input type="radio" name="" id="" className="w-6 h-6" />
                </div>
                <div>
                  <div className="w-12 h-10">
                    <img
                    loading="eager|lazy"
                      src="/images/other.webp"
                      alt="visa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xl text-themePlaceholder text-opacity-60">
                    Other
                  </p>
                  <input type="radio" name="" id="" className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-6">
              <p className="text-2xl text-themePlaceholder font-normal">
                Billing Address
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="space-y-1 ">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Company Name</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Please Select your Country"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Street Address</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Street Address"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Apt/Number</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Apt/Number"
                  />
                </div>
                <div className="grid grid-cols-3 gap-x-6">
                  <div className="space-y-1 ">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label htmlFor="">State/Prefecture/Province</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="State/Prefecture/Province"
                    />
                  </div>
                  <div className="space-y-1 ">
                    <label htmlFor="">Postal Code</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${inputStyle}`}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Phone</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                    placeholder="Phone"
                  />
                </div>
              </div>
            </div>

            <div>
              <button onClick={() => navigate('/order-payment')} className="text-xl py-2.5 w-full rounded-md bg-theme text-themeText">
                Make Payment
              </button>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="bg-theme px-5 py-6 space-y-6 rounded-md col-span-2 ">
            <p className="text-2xl text-themeText font-medium">
              PURCHASE SUMMARY
            </p>
            <p className="flex justify-between items-center text-themeText">
              <span className="text-lg leading-tight">
                BUSINESS (ANNUAL) MEMBERSHIP 
              </span>{" "} 
              <span className="text-xl">$99.00USD</span>
            </p>
            <p className="text-themeText flex items-center justify-between">
              <span className="text-xl ">TOTAL</span>
              <span className="text-lg">
                $ <span className="text-3xl">99.00</span> USD
              </span>
            </p>
          </div>
        </div>
        <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-10">
        Copyright &copy; Shipping Hack 2024. All rights reserved
      </p>
      </div>
    </div>
  );
}
