import React from "react";

export default function MarqueeCard() {
  return (
    <div className="h-20 md:h-24 lg:h-28 lg:w-64 xl:w-80">
      <img
        loading="eager|lazy"
        src="/images/mini-1.webp"
        alt="mini-first-image"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
