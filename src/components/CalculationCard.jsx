import React from "react";
import { BASE_URL } from "../utilities/URL";

export default function CalculationCard(props) {
  return (
    <div
      key={props?.company?.name}
      className="py-2 px-5 border border-themePlaceholder border-opacity-20 rounded-md flex items-center gap-x-6"
    >
      <div className="flex items-center">
        <img
        loading="lazy"
          src={`${BASE_URL}${props?.company?.logo}`}
          alt="charges card"
          className="object-contain h-16 w-32"
        />
      </div>
      <div className="w-full space-y-1 font-switzer text-themePlaceholder [&>p]:flex [&>p]:justify-between">
        <p className="text-themePlaceholder font-semibold font-switzer text-xl">
          {props?.company?.name}
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">ETA</span>{" "}
          <span>{props?.company?.ETA}</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">Weight</span>{" "}
          <span>{props?.company?.Actualweight}</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">
            Dimensional Weight
          </span>{" "}
          <span>{props?.company?.dimensionalWeight}</span>
        </p>
        <p className="text-sm">
          <span className="text-opacity-60 text-themePlaceholder">
            Charged Weight
          </span>{" "}
          <span>{props?.company?.chargedWeight}</span>
        </p>
        <p className="text-lg">
          <span className="text-opacity-60 text-themePlaceholder">
            Delivery Charges:{" "}
            <span className="text-themeRed font-bold text-xl">
              ${props?.company?.charges}
            </span>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
