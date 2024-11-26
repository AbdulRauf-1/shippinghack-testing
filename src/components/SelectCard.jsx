import React from "react";

export default function SelectCard(props) {
  return (
    <div className="w-72 relative bg-cardBgColor flex flex-col justify-end rounded-md px-5 py-8 shadow-cardShadow font-switzer space-y-4">
      <div className="h-20 w-16 mx-auto">
        <img
        loading="eager|lazy"
          src={props?.src}
          alt="delivery method fedex"
          className="bg-contain w-full h-full"
        />
      </div>
      <p className="text-center text-themePlaceholder font-semibold text-3xl">{props?.desc}</p>
    </div>
  );
}
