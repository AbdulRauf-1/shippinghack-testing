import React from "react";
export default function GridBox(props) {
  return (
    <div
      style={{ backgroundColor: props.bg }}
      className="px-[40px] max-lg:px-7 max-sm:px-4 max-[500px]:px-1"
    >
      <img
        loading="eager|lazy"
        src={props.src}
        alt={props.alt}
        className="object-contain h-20 w-full"
      />
    </div>
  );
}
