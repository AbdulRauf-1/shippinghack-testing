import React from "react";

export default function PackageStatus(props) {
  return (
    <div
      className={`${props?.color} ${props?.bgColor} bg-opacity-20 text-sm rounded-3xl px-2 py-1 text-center`}
    >
      {props?.text[0].toUpperCase() + props?.text.slice(1)}
    </div>
  );
}
