import React from "react";

export default function AddressCardPkDo(props) {
  return (
    <div className="ps-10 font-switzer text-themePlaceholder text-opacity-60 text-sm">
      <p>{props?.title}</p>
      <p>{props?.streetAddress}</p>
      <p>
        {props?.building &&
          "Building:" + props?.building &&
          props?.building + ","}
        {props?.floor && "Floor: " + props?.floor}
      </p>
      {props?.apartment && <p>Apartment: {props?.apartment}</p>}
      <p>
        {props?.district && props?.district + ","} {props?.city}
      </p>
      <p>
        {props?.province && props?.province + ","} {props?.country}
      </p>
      {props?.postalCode && <p>Postal Code: {props?.postalCode}</p>}
    </div>
  );
}
