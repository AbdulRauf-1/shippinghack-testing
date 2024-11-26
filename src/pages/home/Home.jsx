import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import Navbar from "../internationalShipping/navbar/Navbar";
import GridBox from "../../components/GridBox";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import TestemonialBox from "../../components/TestemonialBox";
import Footer from "../../components/Footer";
import { inputStyle } from "../../utilities/Style";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Marquee from "react-fast-marquee";
import MarqueeCard from "../../components/MarqueeCard";
import { success_toaster } from "../../utilities/Toaster";

export default function Home() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const [expand, setExpand] = useState(window.innerWidth >= 640 ? 0 : 1);
  const [loader, setloader] = useState(false);

  const handleLeft = () => {
    document.querySelector(".swiper-button-prev").click();
  };

  const handleRight = () => {
    document.querySelector(".swiper-button-next").click();
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `655 South Hope Street 901 LOS ANGELES, CALIFORNIA 90503 USA`
    );
    success_toaster("Address copy to clipboard");
  };

  useEffect(() => {
    setloader(true);
    setTimeout(() => {
      setloader(false);
    }, 200);
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="relative">
      {/* center line start */}
      <div className="w-[1px] absolute left-2/4 bg-borderColor bg-opacity-80 z-10 h-full max-md:w-0"></div>
      <div className="fixed left-2/4 bg-black w-2 h-2 rounded-full -ml-1 top-60 z-20 max-md:w-0"></div>
      {/* center line end */}

      {/* navbar start */}
      <Navbar bgColor={"bg-black"} bgOpacity={"bg-opacity-70"} />
      {/* navbar end */}

      {/* banner section start */}
      <div
        className={`${
          expand === 1 || expand === 0
            ? "bg-banner-1"
            : expand === 2
            ? "bg-banner-2"
            : "bg-banner-3"
        } bg-cover bg-center w-full h-[700px] max-sm:h-[500px] max-md:h-[600px] grid relative z-20 ${
          expand === 0 ? "grid-cols-3" : "grid-cols-4 max-sm:grid-cols-5"
        }`}
      >
        <div
          className={`h-[640px] top-[60px] max-sm:h-[440px] max-md:h-[540px] px-20 max-xl:px-10 max-md:px-4 cursor-pointer border-r border-white relative before:absolute before:bg-black 
          before:bg-opacity-50 before:w-full before:h-full before:top-0 before:left-0
           ${
             expand === 1
               ? "col-span-2 max-sm:col-span-3"
               : "col-span-1 before:bg-opacity-70"
           }`}
          onMouseEnter={() => setExpand(1)}
          onMouseLeave={() => setExpand(0)}
        >
          <div
            className={`relative  flex items-center h-full ${
              expand === 1 ? "block" : "hidden"
            }`}
          >
            <div className="space-y-8 max-md:space-y-4 max-sm:space-y-2">
              <p className="text-white font-helvetica text-5xl max-xl:text-4xl leading-tight max-md:text-3xl">
                Your Gateway to Hassle-Free International Shipping!
              </p>
              <p className="text-white text-2xl font-semibold max-md:text-lg max-md:leading-6 max-md:font-normal max-md:font-switzer max-sm:leading-6">
                Buy Products in the USA, and We'll Ship Them to You
              </p>
              <div className="flex items-center gap-x-4 max-[960px]:gap-x-2">
                <button
                  onClick={() => navigate("/sign-up")}
                  className="text-theme bg-white font-semibold rounded-md py-3 w-56 max-md:hidden max-xl:w-48 max-[960px]:w-32 max-[960px]:text-sm max-md:w-20 max-md:text-[10px] max-md:py-2 font-switzer hover:bg-theme hover:text-white hover:transition hover:duration-150 hover:ease-linear"
                >
                  Sign Up Now
                </button>
                <button
                  onClick={() => navigate("/business")}
                  className="text-theme bg-white font-semibold rounded-md py-3 w-56 max-xl:w-48 max-[960px]:w-36 max-[960px]:text-sm max-md:text-base max-md:py-2 font-switzer hover:bg-theme hover:text-white hover:transition hover:duration-150 hover:ease-linear max-sm:mt-2"
                >
                  For Business
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`h-[640px] top-[60px] max-sm:h-[440px] max-md:h-[540px] px-20 max-xl:px-10 max-md:px-4 cursor-pointer relative text-white before:absolute before:bg-black before:opacity-50 before:w-full before:h-full before:top-0 before:left-0 ${
            expand === 2
              ? "col-span-2 max-sm:col-span-3"
              : "col-span-1 before:opacity-70"
          }`}
          onMouseEnter={() => setExpand(2)}
          onMouseLeave={() => setExpand(0)}
        >
          <div
            className={`relative flex items-center h-full ${
              expand === 2 ? "block" : "hidden"
            }`}
          >
            <div className="space-y-8 max-md:space-y-4 max-sm:space-y-2">
              <p className="text-white font-helvetica text-5xl max-xl:text-4xl leading-tight max-md:text-3xl">
                Unlock Savings with Consolidated Shipping Solutions
              </p>
              <p className="text-white text-2xl font-semibold max-md:text-lg max-md:leading-6 max-md:font-normal max-md:font-switzer max-sm:leading-6">
                Buy Products in the USA, and We'll Ship Them to You
              </p>
              <div className="flex items-center gap-x-4 max-[960px]:gap-x-2">
                <button
                  onClick={() => navigate("/sign-up")}
                  className="text-theme bg-white font-semibold rounded-md py-3 w-56 max-md:hidden max-xl:w-48 max-[960px]:w-32 max-[960px]:text-sm max-md:w-20 max-md:text-[10px] max-md:py-2 font-switzer hover:bg-theme hover:text-white hover:transition hover:duration-150 hover:ease-linear"
                >
                  Sign Up Now
                </button>
                <button
                  onClick={() => navigate("/business")}
                  className="text-theme bg-white font-semibold rounded-md py-3 w-56 max-xl:w-48 max-[960px]:w-36 max-[960px]:text-sm  max-md:text-base max-md:py-2 font-switzer hover:bg-theme hover:text-white hover:transition hover:duration-150 hover:ease-linear max-sm:mt-2"
                >
                  For Business
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`h-[640px] top-[60px] max-sm:h-[440px] max-md:h-[540px] px-20 max-xl:px-10 max-md:px-4 cursor-pointer border-l border-white relative text-white before:absolute before:bg-black before:opacity-50 before:w-full before:h-full before:top-0 before:left-0 ${
            expand === 3
              ? "col-span-2 max-sm:col-span-3"
              : "col-span-1 before:opacity-70"
          }`}
          onMouseEnter={() => setExpand(3)}
          onMouseLeave={() => setExpand(0)}
        >
          <div
            className={`relative flex items-center h-full ${
              expand === 3 ? "block" : "hidden"
            }`}
          >
            <div className="space-y-8 max-md:space-y-4 max-sm:space-y-2">
              <p className="text-white font-helvetica text-5xl max-xl:text-4xl leading-tight max-md:text-3xl">
                Seamless Global Shipping: Consolidate, Ship, Save!
              </p>
              <p className="text-white text-2xl font-semibold max-md:text-lg max-md:leading-6 max-md:font-normal max-md:font-switzer max-sm:leading-6">
                Buy Products in the USA, and We'll Ship Them to You
              </p>
              <div className="flex items-center gap-x-4 max-[960px]:gap-x-2">
                <button
                  onClick={() => navigate("/sign-up")}
                  className="text-theme bg-white font-semibold rounded-md py-3 w-56 max-md:hidden max-xl:w-48 max-[960px]:w-36 max-[960px]:text-sm max-md:w-20 max-md:text-[10px] max-md:py-2 font-switzer hover:bg-theme hover:text-white hover:transition hover:duration-150 hover:ease-linear"
                >
                  Sign Up Now
                </button>
                <button
                  onClick={() => navigate("/business")}
                  className="text-theme bg-white font-semibold rounded-md py-3 w-56 max-xl:w-48 max-[960px]:w-32 max-[960px]:text-sm  max-md:text-base max-md:py-2 font-switzer hover:bg-theme hover:text-white hover:transition hover:duration-150 hover:ease-linear max-sm:mt-2"
                >
                  For Business
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banner section end */}

      {/* mini section start */}
      <div className="relative z-20 bg-[#FFFFFF]">
        <Marquee speed={"100"}>
          <MarqueeCard src="/images/mini-1.webp" />
          <MarqueeCard src="/images/mini-1.webp" />
          <MarqueeCard src="/images/mini-1.webp" />
          <MarqueeCard src="/images/mini-2.webp" />
          <MarqueeCard src="/images/mini-3.webp" />
          <MarqueeCard src="/images/mini-3.webp" />
        </Marquee>
      </div>
      {/* mini section end */}

      {/* track order section start */}
      <div className="relative z-20 bg-theme flex items-center justify-center">
        <div className="w-2/4 py-16 flex items-center max-[872px]:w-[70%] max-md:w-[85%] max-sm:w-[90%] max-lg:w-[60%] max-sm:py-8 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-lg:py-6">
          <div className="[&>p]:text-white ">
            <p className="font-bold text-3xl py-2 font-helvetica max-xl:text-xl max-sm:text-xl max-sm:py-0 max-sm:leading-0">
              Track Your Parcel with Ease
            </p>
            <p className="text-sm font-switzer font-semibold max-sm:leading-5 max-sm:py-1 max-sm:font-normal max-md:font-normal">
              Enter your tracking number below to monitor the status and
              location of your parcel in real-time. Our advanced tracking system
              ensures that you stay informed every step of the way
            </p>
          </div>
          <div className="flex items-center justify-end ps-20 font-helvetica max-sm:ps-0">
            <button
              onClick={() => navigate("/track-order")}
              className="bg-white outline-none text-sm text-[#00538C] rounded-md py-3 w-36 max-sm:w-36 font-semibold max-sm:text-xs max-sm:px-1 max-lg:text-sm max-lg:w-40"
            >
              TRACK ORDER
            </button>
          </div>
        </div>
      </div>
      {/* tract order section end */}

      {/* how its works section start */}
      <div className="py-12 relative z-20 bg-baseColor max-sm:pt-5 max-lg:py-10 px-6 md:px-10">
        <p className="text-center font-bold text-6xl font-helvetica max-sm:py-2 max-[450px]:text-4xl max-sm:text-5xl">
          How It Works?
        </p>
        <div className="w-full flex justify-center items-center lg:h-[600px] pt-6 pb-3 xl:pb-12 xl:pt-14 bg-baseColor sm:h-[400px] h-[300px] md:h-[500px]  lg:pb-8 lg:pt-10">
          <img
            loading="lazy"
            src="/images/map.gif"
            alt="map"
            className=" lg:w-3/5 h-full object-fill mx-auto"
          />
        </div>
      </div>
      {/* how it works section end */}

      {/* how it work timeline start */}
      <div className="flex justify-center bg-baseColor">
        <div className="w-11/12">
          <div className="px-5 grid space-y-56 mx-auto max-sm:space-y-16 max-lg:space-y-20 max-md:space-y-10">
            <div className="grid grid-cols-2 max-[500px]:grid-cols-1">
              <div className="h-64 max-[500px]:order-2">
                <img
                  loading="lazy"
                  src="/images/shop-online.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="space-y-4 ps-24 max-lg:ps-10 flex flex-col justify-center">
                <p className="flex items-center justify-start font-helvetica text-[32px] font-bold max-[682px]:text-[22px] max-[500px]:order-1 max-[500px]:ps-0 max-[500px]:mb-6 text-center max-sm:justify-center">
                  Shop online at your favourite stores.
                </p>
                <Link to="/getting-started">
                  <button className="border border-theme text-theme hover:text-themeText hover:bg-theme duration-150 py-2.5 w-56 rounded-md font-switzer font-semibold">
                    See how to get started
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="h-60 px-24 max-lg:px-12 max-md:p-4 max-[500px]:col-span-2 max-[500px]:order-2">
                <img
                  loading="lazy"
                  src="/images/ship-new-address.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="space-y-4 ps-24 max-lg:ps-10 flex flex-col justify-center">
                <div>
                  <p className="flex items-center justify-start font-helvetica text-[32px] font-bold  max-[682px]:text-[22px] max-[500px]:order-1 max-[500px]:ps-0 max-[500px]:col-span-2 max-[500px]:mx-auto  max-[500px]:mb-6 text-center">
                    Use your Shipping hack address.
                  </p>
                  <div className="font-switzer">
                    <p className="font-normal text-lg">
                      Username: {firstName} {lastName}
                    </p>
                    <p className="text-themePlaceholder text-opacity-60 ">
                      655 South Hope Street 901 <br /> LOS ANGELES, <br />{" "}
                      CALIFORNIA 90503 <br />
                      USA
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleCopyAddress}
                    className="border border-theme text-theme hover:text-themeText hover:bg-theme duration-150 py-2.5 w-56 rounded-md font-switzer font-semibold"
                  >
                    Copy my Address
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <p className="font-bold font-helvetica text-5xl py-40 relative z-20 bg-baseColor max-xl:text-4xl max-sm:text-3xl">
            You can select your Shipment Method
          </p> */}
          {window.innerWidth > 500 ? (
            <p className="font-bold font-helvetica text-5xl py-40 relative z-20 bg-baseColor max-xl:text-4xl max-lg:py-20 max-sm:py-4 max-md:py-8 max-md:text-5xl max-sm:text-5xl max-[500px]:text-4xl">
              You can select your <br /> Shipment Method
            </p>
          ) : (
            <p className="font-bold font-helvetica text-5xl py-40 relative z-20 bg-baseColor max-xl:text-4xl max-[500px]:text-2xl text-center max-[500px]:py-8 max-lg:py-20 max-sm:py-4 max-md:py-10 max-md:text-5xl max-sm:text-5xl">
              You can select your Shipment Method
            </p>
          )}

          <div className="px-10 space-y-5  max-sm:pt-6 max-sm:px-6 max-sm:space-y-8">
            <div className="grid grid-cols-2">
              <p className="flex items-center justify-start font-helvetica text-[32px] font-bold ps-40 max-lg:ps-0 max-lg:justify-center max-[682px]:text-[22px] max-[500px]:text-lg max-[500px]:px-0 max-sm:justify-start">
                One Package
              </p>
              <div className="h-56 p-6 max-sm:h-28 max-sm:p-0 max-sm:ml-auto">
                <img
                  loading="lazy"
                  src="/images/one-package.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <p className="flex items-center justify-start font-helvetica text-[32px] font-bold ps-40 max-lg:ps-0 max-lg:justify-center max-[682px]:text-[22px] max-[500px]:text-lg max-[500px]:px-0 max-sm:justify-start">
                Multiple Packages
              </p>
              <div className="h-64 p-10 max-sm:h-28 max-sm:p-0 max-sm:ml-auto">
                <img
                  loading="lazy"
                  src="/images/multiple-packages.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <p className="flex items-center justify-start font-helvetica text-[32px] font-bold ps-40 max-lg:ps-0 max-lg:justify-center max-[682px]:text-[22px] max-[500px]:text-lg max-[500px]:px-0 max-sm:justify-start">
                Consolidation
              </p>
              <div className="h-64 p-10 max-sm:h-28 max-sm:p-0 max-sm:ml-auto">
                <img
                  loading="lazy"
                  src="/images/consolidation.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
          {window.innerWidth > 500 ? (
            <p className="relative z-20 bg-baseColor font-bold font-helvetica text-5xl pt-28 pb-14 max-xl:text-4xl max-sm:pt-14 max-md:text-5xl max-sm:text-5xl max-[500px]:text-4xl">
              Select Shipping <br />
              Company & Pay
            </p>
          ) : (
            <p className="relative z-20 bg-baseColor font-bold font-helvetica text-5xl pt-28 sm:pb-14 max-xl:text-4xl text-center max-sm:pt-14  max-md:text-5xl max-sm:text-5xl max-[500px]:text-3xl">
              Select Shipping Company & Pay
            </p>
          )}

          <div className="px-10 sm:space-y-20 max-md:px-5">
            <div className="grid grid-cols-2">
              <div className="h-24 max-sm:w-32 flex justify-end ps-24 max-lg:ps-0">
                <img
                  loading="lazy"
                  src="/images/Fedex.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
              {/* <p className="flex items-center justify-start font-helvetica text-2xl font-bold ps-24">Shop online at your favourite stores.</p> */}
            </div>
            <div className="grid grid-cols-2">
              <p className="flex items-center justify-start font-helvetica text-2xl font-bold "></p>
              <div className="h-24 max-w-[430px] px-24 order-2 max-lg:px-14 max-sm:px-0 max-sm:w-34 max-sm:ml-auto">
                <img
                  loading="lazy"
                  src="/images/DHL.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          {window.innerWidth > 500 ? (
            <p className="relative z-20 bg-baseColor font-bold font-helvetica text-5xl pt-40 pb-14 max-xl:text-4xl max-sm:pt-6 max-md:pt-0 max-md:text-5xl max-sm:text-5xl max-[500px]:text-4xl">
              Choose your <br />
              delivery method
            </p>
          ) : (
            <p className="relative z-20 bg-baseColor font-bold font-helvetica text-5xl pt-40 pb-14 max-xl:text-4xl text-center max-sm:pt-6 max-md:pt-0 max-md:text-5xl max-sm:text-5xl max-[500px]:text-3xl">
              Choose your delivery method
            </p>
          )}

          <div className="px-10 space-y-56 max-sm:space-y-6 max-sm:flex max-sm:px-0 max-sm:justify-between max-md:space-y-10">
            <div className="grid grid-cols-2 max-sm:grid-cols-1">
              <div className="h-64 md:px-24 max-sm:h-32">
                <img
                  loading="lazy"
                  src="/images/self-pickup.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="flex items-center justify-start font-helvetica text-[32px] font-bold ps-24 max-sm:ps-0 max-sm:justify-center max-[682px]:text-[22px] max-sm:text-xl max-md:pt-4">
                Self Pickup
              </p>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1">
              <div className="h-64 md:px-24 max-sm:h-28">
                <img
                  loading="lazy"
                  src="/images/delivery-service.webp"
                  alt="shop online"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="flex items-center justify-start font-helvetica text-[32px] max-md:text-center font-bold sm:ps-24 max-sm:ps-0 max-sm:justify-center max-[682px]:text-[22px] max-sm:text-xl max-md:pt-4">
                Delivery service
              </p>
            </div>
          </div>

          <div className="relative z-20 py-32 sm:py-40 md:py-48 lg:py-52 xl:py-60 bg-baseColor font-bold font-helvetica text-5xl max-[800px]:text-3xl max-sm:text-3xl flex justify-center ">
            <div className="relative">
              <p>Order Completed</p>
              {/* left poppet start  */}
              <div className="absolute h-52 w-52 -left-32 max-sm:-left-6 -top-16 max-[800px]:w-40 max-[800px]:h-40 max-sm:w-28 max-sm:h-28 max-sm:-top-6">
                <img
                  loading="lazy"
                  src="/images/left-order-poppet.webp"
                  alt="left poppet"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* left poppet end */}

              {/* right poppet start */}
              <div className="absolute h-52 w-52 -right-20 max-sm:-right-6 -top-16 max-[800px]:w-40 max-[800px]:h-40 max-sm:w-28 max-sm:h-28 max-sm:-top-5">
                <img
                  loading="lazy"
                  src="/images/right-order-poppet.webp"
                  alt="right poppet"
                  className="h-full w-full object-contain"
                />
              </div>
              {/* right poppet end */}
            </div>
          </div>
        </div>
      </div>
      {/* how it work timeline end */}

      {/* shipping rates start */}
      <div
        className="bg-best-shipping w-full h-60 bg-cover relative z-20 bg-transparent max-sm:h-52 max-[480px]:h-60
       before:content-[''] before:absolute before:w-full before:h-full before:text-black before:bg-black before:opacity-60 before:z-0 flex justify-center items-center"
      >
        <div className=" a md:px-10 absolute z-10 text-white max-sm:w-[90%] space-y-5 max-md:w-[85vw] max-sm:space-y-2">
          <p className="font-helvetica text-3xl max-sm:leading-6 max-sm:text-xl">
            Find the Best Shipping Rates Now!
          </p>
          <p className="pr-28 text-sm font-switzer max-sm:text-sm max-sm:leading-5 max-sm:pr-2 max-sm:pb-2">
            Catch the best deal for your parcel! Explore rates from leading
            shipping companies like DHL, FedEx, and more. With Shipping Hack,
            compare prices effortlessly before sending your shipment
          </p>
          <button
            onClick={() => navigate("/track-order")}
            className="bg-[#00538C] outline-none text-white py-3 w-36 rounded-md font-semibold text-sm max-sm:w-36 max-sm:text-sm max-md:text-[12px] max-md:py-2"
          >
            TRACK ORDER
          </button>
        </div>
      </div>
      {/* shipping rates end */}

      {/* go to us brands start */}
      <div className="relative z-20 bg-baseColor px-20 py-16 max-md:px-10 max-sm:px-4 max-md:py-8 max-sm:py-6">
        <p className="text-black text-center text-6xl font-helvetica px-20 max-[1032px]:text-5xl max-[1032px]:px-8 max-sm:text-5xl max-sm:px-0 max-[500px]:text-3xl">
          DISCOVER THE GO-TO US BRANDS FOR YOUR SHOPPING NEEDS
        </p>

        <div className="grid grid-cols-8 grid-rows-2 pt-10 [&>div]:h-44 max-md:grid-cols-4 max-xl:[&>div]:h-36 max-lg:[&>div]:h-24 [&>div]:flex [&>div]:justify-center [&>div]:items-center max-sm:pt-4">
          <GridBox bg="#AE4343" alt="go-to brands 1" src="/images/6pm.webp" />
          <GridBox bg="#F2F2F2" alt="go-to brands 2" src="/images/ebay.webp" />
          <GridBox bg="#012A60" alt="go-to brands 3" src="/images/gap.webp" />
          <GridBox
            bg="#F2F2F2"
            alt="go-to brands 4"
            src="/images/amazon.webp"
          />
          <GridBox bg="#EA299E" alt="go-to brands 5" src="/images/ipsy.webp" />
          <GridBox
            bg="#F2F2F2"
            alt="go-to brands 6"
            src="/images/american-eagle.webp"
          />
          <GridBox bg="#EA299E" alt="go-to brands 7" src="/images/ipsy.webp" />
          <GridBox
            bg="#F2F2F2"
            alt="go-to brands 8"
            src="/images/american-eagle.webp"
          />
          <GridBox
            bg="#F2F2F2"
            alt="go-to brands 9"
            src="/images/oshkosh.webp"
          />
          <GridBox bg="#AE4343" alt="go-to brands 10" src="/images/h&m.webp" />
          <GridBox bg="#F2F2F2" alt="go-to brands 11" src="/images/polo.webp" />
          <GridBox bg="#012A60" alt="go-to brands 12" src="/images/gilt.webp" />
          <GridBox
            bg="#F2F2F2"
            alt="go-to brands 13"
            src="/images/zappos.webp"
          />
          <GridBox bg="#012A60" alt="go-to brands 14" src="/images/gilt.webp" />
          <GridBox
            bg="#F2F2F2"
            alt="go-to brands 15"
            src="/images/zappos.webp"
          />
          <GridBox
            bg="#000000"
            alt="go-to brands 16"
            src="/images/sephora.webp"
          />
        </div>
      </div>
      {/* go to us brands end */}

      {/* download our app start */}
      <div className="relative z-20 bg-download-app bg-cover w-full grid grid-cols-1 gap-y-4 sm:grid-cols-2 py-6 sm:py-10 place-items-center">
        <div className="h-[440px] max-sm:max-h-[220px] mx-auto w-11/12 max-[994px]:w-[80%] max-sm:w-full max-sm:col-span-1">
          <img
            loading="lazy"
            src="/images/download-app.webp"
            alt="download app"
            className="object-contain w-full h-full mx-auto"
          />
        </div>
        <div className="text-white text-center space-y-20 flex flex-col items-start px-20 max-xl:px-10 max-[994px]:pl-0 max-sm:col-span-2 max-sm:pl-10 max-md:space-y-10 max-sm:space-y-0">
          <p className="text-5xl text-center font-semibold font-switzer mx-auto max-[994px]:text-3xl max-[994px]:mx-auto max-sm:text-3xl max-[500px]:text-[20px] max-[500px]:leading-6">
            For Fast Services <br /> Download Our App
          </p>
          <div className="space-y-3 sm:space-y-5 md:space-y-6 mx-auto">
            <p className="font-switzer text-3xl font-semibold max-[994px]:text-2xl max-sm:text-lg ">
              Available At
            </p>
            <div className="flex flex-row gap-x-8 sm:px-5 max-[994px]:gap-x-3 max-[500px]:gap-y-2">
              <img
                loading="lazy"
                src="/images/google-play.webp"
                alt="google play"
                className="object-contain h-20 w-44 max-[994px]:w-32 max-[994px]:h-auto max-sm:w-28 max-[500px]:w-32"
              />
              <img
                loading="lazy"
                src="/images/app-store.webp"
                alt="app store"
                className="object-contain h-20 w-44 max-[994px]:w-32 max-[994px]:h-auto max-sm:w-28 max-[500px]:w-32"
              />
            </div>
          </div>
        </div>
      </div>
      {/* download our app end */}

      {/* what does customer say about section start */}
      <div className=" bg-theme flex justify-center py-20 relative z-20 max-md:py-10 max-sm:py-2">
        <div className="overflow-hidden w-4/5 max-[1400px]:w-[90%] max-xl:w-[95%]">
          <p className="text-center text-white font-switzer py-4 text-3xl sm:text-4xl lg:text-5xl">
            Whats our customers says about us.
          </p>

          <div className="py-10 flex items-center max-md:py-5 max-sm:py-2">
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center pe-1 mx-4">
              <button onClick={handleLeft}>
                <AiFillCaretLeft color="#00538C" size={32} />{" "}
              </button>
            </div>
            <Swiper
              loop={true}
              modules={[Navigation]}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },

                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },

                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              navigation={true}
            >
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
              <SwiperSlide>
                <TestemonialBox />
              </SwiperSlide>
            </Swiper>
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center ps-1 mx-4">
              <button onClick={handleRight}>
                <AiFillCaretRight color="#00538C" size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* what does customer say about section end */}

      {/* accordian list start */}
      <div className="bg-baseColor px-6 md:px-10 pt-14 pb-70 relative z-30 space-y-14 max-sm:px-10 max-[500px]:px-6 max-sm:pt-8 max-sm:pb-80 max-lg:pb-2 max-md:pb-80">
        <Accordion
          allowMultiple
          className=" grid grid-cols-3 gap-x-5 gap-y-7 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:gap-y-4"
        >
          {[
            {
              heading:
                "How does The Shipping Hack calculate shipping costs to Puerto Rico?",
              desc: "Shipping costs with The Shipping Hack are determined by the billable weight of the package, which takes into account both actual weight and dimensional weight (also known as volumetric weight). The greater of these two weights is used to calculate the final delivery fee.",
            },
            {
              heading:
                "What is actual weight, and how is it measured for packages sent to Puerto Rico?",
              desc: "Actual weight is the physical weight of your package, measured in pounds (lbs) or kilograms (kg) using a scale. This weight is an essential factor in calculating the shipping cost.",
            },
            {
              heading:
                "What is dimensional weight, and why does it affect shipping charges?",
              desc: `Dimensional weight (volumetric weight) considers the amount of space a package occupies. It is calculated using the formula: Dimensional Weight (lbs)=Length (in) x Width (in) x Height (in)139\text{Dimensional Weight (lbs)} = \frac{\text{Length (in) x Width (in) x Height (in)}}{139}Dimensional Weight (lbs)=139Length (in) x Width (in) x Height (in)
                     Dimensional weight is important for large, lightweight packages that take up significant space in transit. The larger of the actual or dimensional weight is used as the billable weight to fairly calculate shipping fees.`,
            },
            {
              heading:
                "What is billable weight, and how does it determine the final cost of shipping to Puerto Rico?",
              desc: "Billable weight is the greater value between the actual weight and dimensional weight of your package. This weight is used to calculate the final shipping cost, ensuring a fair charge based on both size and weight.",
            },
            {
              heading:
                "How can I estimate the cost to ship a package to Puerto Rico with The Shipping Hack?",
              desc: "Use our Shipping Cost Calculator to get an estimate for shipping costs. Input the actual weight and dimensions of your package to calculate the billable weight, providing an accurate estimate for delivery to Puerto Rico.",
            },
            {
              heading:
                "Are there size and weight restrictions for packages shipped to Puerto Rico?",
              desc: "Yes, The Shipping Hack adheres to FedEx guidelines. Each package should not exceed 150 lbs (68 kg), 108 inches (274 cm) in length, or 165 inches (419 cm) in combined length and girth (length + 2x width + 2x height). Oversized packages may incur extra fees or handling requirements.",
            },
            {
              heading:
                "Does The Shipping Hack offer package consolidation to reduce shipping costs?",
              desc: "Yes, we offer package consolidation to combine multiple packages into one shipment. This helps reduce shipping costs by lowering the total billable weight, especially for bulky shipments. Select this option when arranging your shipment, and our team will consolidate your packages for maximum savings.",
            },
            {
              heading:
                "What items are restricted from shipping to Puerto Rico with The Shipping Hack?",
              desc: `Certain items cannot be shipped due to safety or legal restrictions. These include:
                    Hazardous materials, such as flammable liquids and explosives
                    Perishable goods, like food items that require refrigeration
                    Firearms, ammunition, and other weapons
                    Improperly packaged lithium batteries
                    Alcoholic beverages
                    Live animals
                    For a complete list or questions about specific items, please contact our support team.`,
            },
            {
              heading:
                "How do I pick up my package from The Shipping Hack’s warehouse in San Juan, Puerto Rico?",
              desc: "If you select the warehouse pickup option, you’ll receive a notification when your package is ready for collection. Bring a valid ID and your order confirmation to pick up your package at 560 Juan J Jimenez Street, San Juan, Puerto Rico, 00918.",
            },
            {
              heading:
                "Will The Shipping Hack offer local delivery within Puerto Rico?",
              desc: "Yes! Starting in January, The Shipping Hack will offer local delivery within Puerto Rico. Once your package arrives at our San Juan warehouse, you can select local delivery for door-to-door service in Puerto Rico.",
            },
          ]?.map((faq, i) => (
            <div key={i + 1}>
              <AccordionItem className="shadow-sm border border-borderColor bg-[#FFFFFF] bg-opacity-70 rounded-md">
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          className="font-semibold py-2"
                        >
                          {faq?.heading}
                        </Box>
                        {isExpanded ? (
                          <div className="w-4 h-4 rounded-full bg-theme">
                            <AiOutlineMinus className="text-white" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-theme">
                            <AiOutlinePlus className="text-white" />
                          </div>
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>{faq?.desc}</AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </div>
          ))}
        </Accordion>

        {/* <div className="w-4/5 left-2/4 -translate-x-2/4 border bg-white px-10 py-10 absolute z-40 rounded-md:bottom-0 max-md:bottom-10">
          <div className="grid grid-cols-2 gap-x-20 max-md:grid-cols-1">
            <div className="flex flex-col justify-center items-center gap-y-4">
              <div className="w-72 h-16 max-lg:w-60">
                <img
                 loading="lazy"
                  src="/images/logo-blue.webp"
                  alt="blue logo"
                  className="bg-contain w-full h-full"
                />
              </div>
              <p className="font-helvetica text-5xl font-bold pt-4 text-center max-xl:text-4xl max-lg:text-2xl max-[814px]:whitespace-nowrap max-[814px]:pt-0">
                Get in touch with us!
              </p>
              <p className="font-switzer text-center w-4/5 px-8 text-lg max-xl:w-[90%] max-[1100px]:w-[100%] max-[1100px]:px-4 max-lg:text-sm max-md:text-lg max-md:mb-8 max-md:w-[80%]">
                Let's hear what you are looking for and we'll help you fild the
                best solution
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <input
                type="text"
                name=""
                id=""
                placeholder="First Name"
                className={inputStyle}
              />
              <input
                type="email"
                name=""
                id=""
                placeholder="Email"
                className={inputStyle}
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Company"
                className={inputStyle}
              />
              <textarea
                name=""
                id=""
                placeholder="Your message"
                rows={5}
                className={inputStyle}
              ></textarea>
              <div className="px-12 max-sm:px-0">
                <button className="rounded-md py-2.5 bg-theme text-themeText font-switzer w-full font-medium duration-100">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* accordian list end */}

      <div className="bg-baseColor px-20 pt-14 pb-96 relative z-30 space-y-14 max-sm:px-0 max-sm:pt-0">
        <div className="w-4/5 left-2/4 -translate-x-2/4 border bg-white px-6 lg:px-10 py-6 md:py-8 lg:py-10 absolute z-40 rounded-md:bottom-0 max-md:bottom-10 max-sm:w-[90%]">
          <div className="grid grid-cols-2 max-md:grid-cols-1">
            <div className="flex flex-col justify-center items-center gap-y-4">
              <div className="w-72 h-16 max-lg:w-60">
                <img
                  loading="lazy"
                  src="/images/logo-blue.webp"
                  alt="blue logo"
                  className="bg-contain w-full h-full"
                />
              </div>
              <p className="font-helvetica text-5xl font-bold pt-4 text-center max-xl:text-4xl max-lg:text-2xl max-[814px]:whitespace-nowrap max-[814px]:pt-0">
                Get in touch with us!
              </p>
              <p className="font-switzer text-center w-4/5 px-8 text-lg max-xl:w-[90%] max-[1100px]:w-[100%] max-[1100px]:px-4 max-lg:text-sm max-md:text-lg max-md:mb-8 max-md:w-[80%] max-sm:w-full max-sm:leading-4 max-sm:text-sm">
                Let's hear what you are looking for and we'll help you find the
                best solution
              </p>
            </div>
            <div className="flex flex-col gap-y-4 xl:px-10">
              <input
                type="text"
                name=""
                id=""
                placeholder="First Name"
                className={inputStyle}
              />
              <input
                type="email"
                name=""
                id=""
                placeholder="Email"
                className={inputStyle}
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Company"
                className={inputStyle}
              />
              <textarea
                name=""
                id=""
                placeholder="Your message"
                rows={5}
                className={inputStyle}
              ></textarea>
              <div className="px-12 max-sm:px-0">
                <button className="rounded-md py-2.5 bg-theme text-themeText font-switzer w-full font-medium duration-100">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer section start */}
      <footer className="bg-theme pt-32 relative z-20 max-sm:pt-0 max-md:pt-0">
        <Footer />
      </footer>

      {/* footer section end */}
    </div>
  );
}
