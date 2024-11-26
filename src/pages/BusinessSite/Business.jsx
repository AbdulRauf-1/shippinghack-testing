import React, { useEffect, useState } from "react";
import Navbar from "../internationalShipping/navbar/Navbar";
import { Radio } from "@chakra-ui/react";
import BusinessWorkCard from "../../components/BusinessWorkCard";
import { inputStyle } from "../../utilities/Style";
import BenefitsList from "../../components/BenefitsList";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export default function Business() {
  const accessToken = localStorage.getItem("accessToken");
  const [color, setColor] = useState("bg-white");
  const navigate = useNavigate();
  const [radioStatus, setRadioStatus] = useState(false);
  const [loader, setloader] = useState(false);

  const handleSelect = () => {
    if (accessToken) {
      navigate("/select-package");
    } else {
      navigate("/business-membership-signup");
    }
  };
  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    scrollPosition > 760 ? setColor("bg-theme") : setColor("bg-white");
  };

  useEffect(() => {
    setloader(true);
    setTimeout(() => {
      setloader(false);
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div>
      {/* background Image start */}
      <div
        className="flex items-center justify-center bg-business bg-cover bg-center lg:h-[800px] md:h-[600px] max-md:h-[500px] w-full relative after:content-[''] after:absolute
       after:w-full after:h-full after:bg-black after:top-0 after:right-0 after:bg-opacity-30"
      >
        <Navbar
          bgColor={color}
          bgOpacity={color === "bg-white" ? "bg-opacity-20" : "bg-opacity-100"}
        />

        <div className="relative z-10 space-y-4 text-center max-lg:top-14 max-sm:top-8">
          <p className="font-bold font-helvetica text-themeText text-5xl max-sm:text-4xl max-[500px]:text-3xl max-sm:px-6">
            International Delivery Services for Rising Companies
          </p>
          <p className="font-switzer md:text-xl font-normal text-themeText px-40 max-sm:px-10 max-sm:leading-6">
            The Shipping Hack for Businesses is your ultimate partner for
            international expansion, offering innovative tools and expert
            support throughout your journey.
          </p>
        </div>
      </div>
      {/* background image end */}

      <div className="bg-themeText">
        <div className="w-3/4 mx-auto max-xl:w-11/12">
          {/* Membership pricing and levels */}
          <div className="py-16 max-sm:py-8 space-y-10">
            <div className="space-y-6">
              {" "}
              <p className="font-bold font-helvetica text-4xl max-[500px]:text-3xl text-center">
                Membership Pricing & Levels
              </p>
              <p className="px-5 max-sm:px-2 text-center max-sm:text-left font-switzer font-light text-xl text-themePlaceholder text-opacity-60 leading-tight">
                At The Shipping Hack, our business membership features
                straightforward, transparent pricing structures tailored to
                match your business's growth trajectory. Each tier offers
                substantial discounts on vital services required for
                international product shipments.
              </p>
            </div>
            <div className="grid grid-cols-7 max-lg:grid-cols-6 max-sm:grid-cols-5 grid-rows-11 max-sm:grid-rows-2 border border-borderColor rounded-md [&>div]:px-5 max-sm:[&>div]:px-2">
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 row-span-5 flex flex-col items-center justify-center gap-y-6 max-sm:gap-y-2 p-5">
                <div className="flex gap-x-16 max-lg:flex-col">
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg">
                      $
                      <span className="text-6xl max-sm:text-3xl text-opacity-100 text-themePlaceholder">
                        99
                      </span>{" "}
                      /yr
                    </p>
                    <div className="text-themePlaceholder text-opacity-60 font-switzer max-sm:text-xs">
                      <Radio
                        isChecked={radioStatus}
                        onChange={() => setRadioStatus(!radioStatus)}
                      >
                        {window.innerWidth <= 480 ? "Ann" : "Annual"}
                      </Radio>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-themePlaceholder text-opacity-60 font-switzer text-lg">
                      $
                      <span className="text-6xl max-sm:text-3xl text-opacity-100 text-themePlaceholder">
                        12
                      </span>{" "}
                      /mo
                    </p>
                    <div className="text-themePlaceholder text-opacity-60 font-switzer max-sm:text-xs">
                      <Radio
                        isChecked={!radioStatus}
                        onChange={() => setRadioStatus(!radioStatus)}
                      >
                        {window.innerWidth <= 480 ? "Mo" : "Monthly"}
                      </Radio>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleSelect}
                    className="border border-theme text-theme rounded-md py-2 max-sm:py-1 px-8 max-sm:px-3 font-medium text-sm font-switzer"
                  >
                    Select
                  </button>
                </div>
              </div>
              <div className="border border-borderColor border-opacity-60 row-span-5 bg-theme font-bold text-themeText font-helvetica text-3xl max-md:text-2xl max-sm:text-xl flex items-center justify-center">
                Basic
              </div>
              <div className="border border-borderColor border-opacity-60 row-span-5 bg-[#004B7E] font-bold text-themeText font-helvetica text-3xl max-md:text-2xl max-sm:text-xl flex items-center justify-center">
                Plus
              </div>
              {window.innerWidth <= 480 ? (
                <div className="border border-borderColor border-opacity-60 row-span-5 bg-[#004371] font-bold text-themeText font-helvetica text-3xl max-md:text-2xl max-sm:text-xl flex items-center justify-center">
                  Pre <br /> mium
                </div>
              ) : (
                <div className="border border-borderColor border-opacity-60 row-span-5 bg-[#004371] font-bold text-themeText font-helvetica text-3xl max-md:text-2xl max-sm:text-xl flex items-center justify-center">
                  Premium
                </div>
              )}

              <div className="border border-borderColor border-opacity-60 row-span-5 bg-[#00365C] font-bold text-themeText font-helvetica text-3xl max-md:text-2xl max-sm:text-xl flex items-center justify-center">
                Pro
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm font-switzer">
                Shipment Per Month
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg flex items-center justify-center font-switzer">{`<10`}</div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:[&>div]:text-sm flex items-center justify-center font-switzer">
                10
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                30
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                50+
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm font-switzer">
                Processing
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                $2.25
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                $1.25
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                $0.75
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                Free
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm font-switzer">
                Shipping Discount
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg flex items-center justify-center font-switzer">
                -
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                5%
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                7%
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                10%
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm font-switzer">
                Free Storage
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                45 Days
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                45 Days
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                60 Days
              </div>
              <div className="border border-borderColor border-opacity-60 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                90 Days
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm font-switzer">
                Returns
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-4 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                Full Access
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm font-switzer">
                Pick & Pack
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-4 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center  font-switzer">
                Full Access
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-3 max-lg:col-span-2 max-sm:col-span-1 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm font-switzer">
                Api Access
              </div>
              <div className="border border-borderColor border-opacity-60 col-span-4 text-themePlaceholder text-opacity-60 py-2 text-lg max-sm:text-sm flex items-center justify-center font-switzer">
                Full Access
              </div>
            </div>
          </div>

          {/* simplified international shipping deliver direct to your customers */}
          <div className="py-16 max-xl:py-0 max-sm:py-0 space-y-10 max-sm:space-y-5 px-5 max-sm:px-2">
            <p className="font-bold font-helvetica text-4xl max-[500px]:text-3xl text-center">
              Simplified International Shipping Deliver Direct to Your Customers
            </p>
            <div className="space-y-6 [&>p]:leading-tight max-sm:px-1">
              <p className="text-start font-switzer font-light text-xl text-themePlaceholder text-opacity-60">
                Whether you're plotting your first steps into the global market
                or seeking a leaner solution for your current endeavors,
                Shipping Hack for Business ignites your revenue stream from day
                one. More than just another package forwarding service, we boast
                cutting-edge technology, multilingual customer support, and
                seamless scalability into new territories. Our streamlined
                onboarding process takes mere minutes, freeing you to prioritize
                what truly matters—exceeding your customers' expectations
              </p>
              <p className="text-start font-switzer font-light text-xl text-themePlaceholder text-opacity-60">
                {" "}
                Backed by decades of global shipping expertise, strategically
                positioned warehouses, and interconnected technology, Shipping
                Hack stands as the premier end-to-end international shipping
                partner trusted by countless businesses worldwide.
              </p>
              <p className="text-start font-switzer font-light text-xl text-themePlaceholder text-opacity-60">
                This version emphasizes the efficiency, technology, and
                reliability of Shipping Hack's services, catering to businesses
                seeking seamless expansion into global markets. Let me know if
                you need further adjustments or assistance!
              </p>
            </div>
          </div>

          {/* How Shipping Hack for business works */}
          <div className="py-16 max-sm:py-8 space-y-10 max-sm:space-y-5 px-5 max-sm:px-3">
            <p className="font-bold font-helvetica text-4xl max-[500px]:text-3xl text-center max-xl:mb-8">
              How Shipping Hack for Busines works
            </p>
            {/* 1 */}
            <BusinessWorkCard
              count="1"
              heading="Purchase Your Membership."
              desc="Shipping Hack for Business serves businesses of all sizes and sectors. Sign up for membership to unlock 
              immediate access to our four warehouse locations, enjoy industry-leading pricing, and unparalleled customer service. 
              Partnering with Shipping Hack guarantees your customers receive exceptional service, surpassing expectations with every 
              delivery."
              url="/images/business-work-1.webp"
              reverse={false}
            />

            <hr className="border border-borderColor" />

            {/* 2 */}
            <BusinessWorkCard
              count="2"
              heading="Ship Us Your Products."
              desc="Tailor Your Shipping Experience with Shipping Hack. Opt to send your shipments to any Shipping Hack warehouse based on your requirements. Store packages or dispatch them upon arrival—it's your call. Our California warehouse boasts the lowest rates and quickest shipping times."
              url="/images/business-work-2.webp"
              reverse={true}
            />

            <hr className="border border-borderColor" />

            {/* 3 */}
            <div>
              <BusinessWorkCard
                count="3"
                heading="Choose Your Shipping Solution."
                desc="At Shipping Hack, we've got your shipments covered from start to finish. Our cutting-edge technology takes charge, managing the process seamlessly from A to Z. Once your packages land, we swiftly scan, photograph, and upload them to your account. From there, simply select your preferred shipping method, any additional services you require, and proceed to checkout hassle-free. Plus, take advantage of our automated features like fast mailouts, website integrations, and beyond."
                url="/images/business-work-2.webp"
                reverse={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-theme py-16 max-sm:py-8">
        <div className="w-3/5 mx-auto space-y-10 max-sm:space-y-5 max-lg:w-3/4 max-md:w-10/12 max-sm:w-10/12">
          <p className="text-center font-switzer text-lg text-themeText">
            Join thousands of businesses who trust Shipito with their
            international shipping needs. Fill out the form below and we wil be
            in touch as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-6 gap-y-2 [&>div>label]:text-themeText [&>div>label]:font-switzer">
              <div className="space-y-1 ">
                <label htmlFor="">
                  First Name <span className="text-themeRed">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="">
                  Last Name <span className="text-themeRed">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="Last Name"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="">
                  Email <span className="text-themeRed">*</span>
                </label>
                <input
                  type="email"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="">
                  Country/Region <span className="text-themeRed">*</span>
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="USA"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="">
                  Company name and webiste URL
                  <span className="text-themeRed">*</span>{" "}
                </label>
                <input
                  type="text"
                  name=""
                  id=""
                  className={`${inputStyle}`}
                  placeholder="www."
                />
              </div>
            </div>
            <div className="space-y-2">
              <button className="text-theme bg-white border border-theme font-switzer font-semibold py-2 px-10 rounded-md">
                Submit
              </button>
              <p className="font-switzer font-medium text-themeText max-sm:pt-10">
                Create your own free forms to generate leads from your webiste
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleSelect}
              className="border-2 border-themeText rounded-md text-themeText py-2.5 w-96"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Unlock Exclusive Benefits with shipping hack for business */}
      <div className="py-16 max-sm:py-8 px-6 md:px-10 bg-themeText">
        <div className="mx-auto md:w-3/4 sm:w-[84%] space-y-10 max-sm:space-y-5">
          {/* text */}
          <div className="lg:px-20 md:px-5 space-y-6">
            <p className="font-helvetica text-2xl">
              Unlock Exclusive Benefits with Shipping Hack for Business
            </p>
            <div className="[&>div]:flex [&>div]:items-center [&>div]:gap-x-2 space-y-2">
              <BenefitsList
                no="1"
                desc="Access to well-known shipping carriers, including UPS, DHL, and more"
              />
              <BenefitsList
                no="2"
                desc="Multiple shipping speeds and options"
              />
              <BenefitsList
                no="3"
                desc="Discounted shipping rates and services"
              />
              <BenefitsList
                no="4"
                desc="Industry-leading technology and integrations"
              />
              <BenefitsList
                no="5"
                desc="Multilingual customer service team fluent in 13 languages"
              />
              <BenefitsList
                no="6"
                desc="Decades of global shipping experience"
              />
            </div>
          </div>
          {/* card */}
        </div>
      </div>
      <div className="bg-themebackground max-lg:bg-white mx-auto mb-14 max-xl:w-[88%] xl:w-[72%] py-16 max-sm:py-2 px-16 max-lg:px-0 rounded-md grid grid-cols-2 max-lg:grid-cols-1 place-items-start max-2xl:gap-x-5 max-lg:gap-y-10">
        {/* image start */}
        <div className="h-60 max-lg:w-full max-lg:h-auto items-start max-xl:w-full">
          <img
            loading="eager|lazy"
            src="/images/custom-shipping.webp"
            alt="custom shipping"
            className="w-full h-full object-contain"
          />
        </div>
        {/* card start */}
        <div className="flex flex-col h-full max-xl:space-y-5 xl:space-y-5">
          <p className="font-bold font-helvetica text-3xl">
            Custom Shipping Solutions
          </p>
          <p className="font-switzer font-light text-lg text-themePlaceholder text-opacity-60 leading-tight">
            At Shipping Hack, we're accustomed to handling unique shipping
            demands, recognizing that each business has its distinct needs.
            Let's collaborate to achieve your objectives together.
          </p>
          <button className="border border-theme font-switzer font-semibold text-theme w-60 py-2.5 rounded-md">
            SCHEDULE CONSULTATION
          </button>
        </div>
      </div>
      <div className="bg-theme">
        <Footer />
      </div>
    </div>
  );
}
