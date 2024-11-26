import React from "react";
import { IoStarSharp } from "react-icons/io5";

export default function TestemonialBox() {
  return (
    <div className="relative bg-transparent pb-6">
      <div className="bg-cardTheme rounded-sm px-2 space-y-5 py-2 relative z-10">
        <div className="flex gap-x-2">
          <IoStarSharp color="#FF8C1D" />
          <IoStarSharp color="#FF8C1D" />
          <IoStarSharp color="#FF8C1D" />
          <IoStarSharp color="#FF8C1D" />
          <IoStarSharp color="#FF8C1D" />
        </div> 
        <div className="space-y-3">
          <p className="text-theme font-bold font-switze leading-none">
            "Excellent Service & worth every dollar"
          </p>
          <p className="text-xs font-switzer">
            I have been using them for several months. The service is great and
            you save on shipping and get the packages faster that you otherwise
            would. Paying duties upfront also is convenient. If you follow the
            instructions on the site, you should not have any issues.
          </p>
        </div>
        <div className="flex gap-x-2 items-center pt-2 pb-6">
          <div className="w-9 h-9">
            <img
            loading="eager|lazy"
              src="/images/alena.webp"
              alt="alena"
              className="bg-contain h-full w-full"
            />
          </div>
          <div>
            <p className="text-sm text-theme font-switzer font-semibold">
              Alena
            </p>
            <div className="w-5 h-3">
              <img
              loading="eager|lazy"
                src="/images/uk-flag.webp"
                alt="uk flag"
                className="bg-contain h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-32 w-10 left-2 -bottom-9">
        <img
        loading="eager|lazy"
          src="/images/traingle.webp"
          alt="traingle"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
