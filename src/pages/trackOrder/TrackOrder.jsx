import React, { useEffect, useState } from "react";
import Navbar from "../internationalShipping/navbar/Navbar";
import { inputStyle2 } from "../../utilities/Style";
import Footer from "../../components/Footer";
import GetAPI from "../../utilities/GetAPI";
import { PostAPI } from "../../utilities/PostAPI";

export default function TrackOrder() {
  const [color, setColor] = useState("bg-white");
  // const { data } = GetAPI("customer/trackorder")

  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    scrollPosition > 740 ? setColor("bg-theme") : setColor("bg-white");
  };

  useEffect(() => {
    // const getData = async () => {
    //   const res = await PostAPI("customer/trackorder", {
    //     trackingId: "TSH-641-XVBKAF",
    //   });
    // };
    // getData();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* background Image start */}
      <div className="bg-track-order bg-contain bg-center h-[800px] w-full">
        <Navbar
          bgColor={color}
          bgOpacity={color === "bg-white" ? "bg-opacity-30" : "bg-opacity-100"}
        />
      </div>
      {/* background image end */}

      {/* center section start */}
      <div className="py-16 bg-themeText">
        <div className="mx-auto flex flex-col items-center gap-y-12  w-3/4">
          <div className="text-center">
            <p className="font-helvetica text-5xl font-bold ">
              Track Your Shipment
            </p>
            <p className="font-switzer text-themePlaceholder opacity-80 pt-4">
              Enter any Combination of Shipping Hack tracking Reference number
            </p>
          </div>

          <div className="w-3/5 relative flex items-center">
            <input
              type="text"
              name=""
              id=""
              placeholder="Tracking Number"
              className={`${inputStyle2} `}
            />
            <button
              className="font-switzer font-semibold text-white bg-theme absolute right-0 
            px-4 py-2 mr-1 rounded-md"
            >
              Track Shipment
            </button>
          </div>

          <div
            className="w-full grid grid-cols-2 gap-x-6 rounded-sm bg-themeText bg-opacity-10 shadow-2xl border border-themeText border-opacity-10
          p-10 [&>div]:bg-themebackground [&>div]:rounded-sm [&>div]:font-switzer [&>div]:p-5"
          >
            <div className="[&>p]:py-1">
              <p className="font-semibold text-xl">Shipment Booking Detail</p>
              <p className="font-light text-lg text-opacity-80 text-themePlaceholder">
                Tracking Number
              </p>
              <p className="font-semibold text-xl">Shipping Detail</p>
              <p className="font-light text-lg text-opacity-80 text-themePlaceholder">
                Agent Reference Number
              </p>
              <p className="font-light text-lg text-opacity-80 text-themePlaceholder">
                Origin
              </p>
              <p className="font-light text-lg text-opacity-80 text-themePlaceholder">
                Destination
              </p>
              <p className="font-light text-lg text-opacity-80 text-themePlaceholder">
                Booking Date
              </p>
            </div>
            <div className="[&>p]:py-1">
              <p className="font-semibold text-xl">Shipment Track Summary</p>
              <p className="font-light text-lg text-opacity-80 text-themePlaceholder">
                Current Status
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* center section end */}

      {/* footer */}
      <div className="bg-theme">
        <Footer />
      </div>
      {/* footer */}
    </div>
  );
}
