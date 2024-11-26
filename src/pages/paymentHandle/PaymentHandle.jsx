import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import MiniLoader from "../../components/MiniLoader";
import { PostAPI } from "../../utilities/PostAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";

export default function PaymentHandle() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleDownloadReciept = async () => {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    setLoader(true);
    // console.log(
    //   "diehwiu",
    //   `customer/retrieveSession/?bookingId=${sessionData?.bookingId}&sessionId=${sessionData?.sessionId}&amount=${sessionData?.total}`
    // );
    const res = await PostAPI(`customer/downloadLabel`, {
      bookingId: sessionData?.bookingId,
    });
    console.log("🚀 ~ handleDownloadReciept ~ res:", res?.data?.data);
    if (res?.data?.status === "1") {
      setLoader(false);
      success_toaster(
        `Receipt${
          res?.data?.data?.Url.length > 0 ? "s " : " "
        }downloaded successfully`
      );
      res?.data?.data?.Url.map(({ label }) => {
        if (label) {
          const link = document.createElement("a");
          link.href = label;
          link.download = "";
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  return (
    <Layout
      title="Order Completed"
      rightSide={
        loader ? (
          <MiniLoader />
        ) : (
          <div className="space-y-8 sm:space-y-10">
            <div className="flex flex-col gap-y-2  items-center font-switzer">
              <div className="w-48">
                <img
                  loading="eager|lazy"
                  src="/images/order-completed.webp"
                  alt="order completed image"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-semibold text-2xl text-themePlaceholder">
                Your Order is Completed
              </p>
              <p className="text-themePlaceholder text-opacity-60 text-center w-[70%]">
                You will be receiving a confirmation email with order detail
              </p>
            </div>

            <div className="flex gap-4 pt-6 w-full justify-end">
              <button
                onClick={handleDownloadReciept}
                className="w-56 py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
             hover:text-themeText hover:bg-theme border border-theme hover:border-theme duration-150"
              >
                Download Receipt
              </button>
              <button
                onClick={() => navigate("/order-history")}
                className="w-56 py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-themeText border border-theme hover:border-theme duration-150"
              >
                My Orders
              </button>
            </div>
          </div>
        )
      }
    />
  );
}
