import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmailLink() {
  const navigate = useNavigate();
  return (
    <div className="bg-themebackground h-screen">
      {/* card */}

      <div className="font-switzer py-20">
        <div className="bg-themeText w-2/5 mx-auto shadow-lg px-20 py-10 rounded-md flex flex-col items-center">
          {/* image */}
          <div className="w-72 h-28"> 
            <img
            loading="eager|lazy"
              src="/images/logo.webp"
              alt="shipping hack logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-4">
            <p className="text-xl text-themePlaceholder text-opacity-60">
              We’re glad you’re here sigi tech
            </p>
            <button
              onClick={() => navigate("/sign-in")}
              className="bg-theme text-themeText py-2.5 px-20 rounded-md text-xl font-medium"
            >
              Activate Account
            </button>
          </div>
        </div>
        <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-10">
          Copyright &copy; Shipping Hack 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}
