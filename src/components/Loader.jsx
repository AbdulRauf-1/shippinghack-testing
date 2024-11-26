import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="bg-theme w-full h-screen flex items-center justify-center">
      <CirclesWithBar
        height="120"
        width="120"
        color="#FFFFFF"
        outerCircleColor="#FFFFFF"
        innerCircleColor="#FFFFFF"
        barColor="#FFFFFF"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
