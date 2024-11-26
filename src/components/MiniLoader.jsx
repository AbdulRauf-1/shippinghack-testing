import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

export default function MiniLoader() {
  return (
    <div className="bg-transparent w-full py-5 flex items-center justify-center">
      <CirclesWithBar
        height="120"
        width="120"
        color="#00538C"
        outerCircleColor="#00538C"
        innerCircleColor="#00538C"
        barColor="#00538C"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div> 
  );
}
