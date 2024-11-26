import React from "react";

export default function CreditCard(props) {
  return (
    <div
      onClick={props?.handleSelectCard}
      className=" cursor-pointer bg-[#255e86] relative rounded-md px-5 py-4 md:py-6 lg:py-8 overflow-hidden"
    >
      <div className="absolute h-full w-full right-0 top-0">
        <img
          loading="lazy"
          src="/images/card-curve.webp"
          alt="card curve"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative space-y-10 md:space-y-12 lg:space-y-14">
        {/* top */}
        <div className="space-y-1">
          <p className="text-themeText text-xl font-medium">Credit Card</p>
          <p className="text-themeText text-xl font-bold tracking-widest">
            **** **** **** {props?.last4}
          </p>
        </div>
        {/* bottom */}
        <div className="[&>p]:flex [&>p]:justify-between space-y-1">
          <p className="text-sm text-themeText opacity-90 font-extralight">
            <span>Card Holder</span> <span>Expires</span>
          </p>
          <p className="text-themeText font-medium text-xl flex justify-between items-center">
            <span>{props?.name}</span>{" "}
            <span>
              {props?.exp_month}/{props?.exp_year}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
