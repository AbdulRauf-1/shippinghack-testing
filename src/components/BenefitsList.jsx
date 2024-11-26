import React from "react";
export default function BenefitsList(props) {
  return (
    <div>
      <div className="text-themeText bg-theme w-6 h-6 shrink-0 rounded-full text-lg flex items-center justify-center">
        {props?.no}
      </div>{" "}
      <span className="text-themePlaceholder text-opacity-60 font-light text-lg">
        {props?.desc}
      </span>
    </div>
  );
}