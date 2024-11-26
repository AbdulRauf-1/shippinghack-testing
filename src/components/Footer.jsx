import React from "react";
import { BsSend, BsYoutube } from "react-icons/bs";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div>
      <div className="w-4/5 mx-auto grid grid-cols-4 justify-items-end py-12 max-lg:w-11/12 max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:justify-items-start">
        {/* 1 */}
        <div className="space-y-8 w-full max-sm:col-span-2">
          <div className="w-72 h-16 max-lg:w-56 max-lg:h-auto max-sm:w-40 max-sm:h-auto">
            <img
              loading="lazy"
              src="/images/logo-white.webp"
              alt="white logo"
              className="bg-contain w-full h-full"
            />
          </div>
          <div className="space-y-1">
            <p className="text-themeText font-medium">Download the App</p>
            <div>
              <img
                loading="lazy"
                src="/images/google-play.webp"
                alt="google play"
                className="object-contain h-10 w-28"
              />
            </div>
            <div>
              <img
                loading="lazy"
                src="/images/app-store.webp"
                alt="app store"
                className="object-contain h-10 w-28"
              />
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="[&>p]:font-switzer space-y-2 max-sm:mt-10">
          <p className="text-themeText text-xl">About us</p>
          <p className="text-themeText text-sm text-opacity-70">Who we are</p>
          <p className="text-themeText text-xs text-opacity-70">FAQ's</p>
          <p className="text-themeText text-sm text-opacity-70">Locations</p>
          <p className="text-themeText text-sm text-opacity-70">Warehouses</p>
          <p className="text-themeText text-sm text-opacity-70">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
        {/* 3 */}
        <div className="[&>p]:font-switzer space-y-2 max-sm:mt-10">
          <p className="text-themeText text-xl">Resouces</p>
          <p className="text-themeText text-sm text-opacity-70">Services</p>
          <p className="text-themeText text-sm text-opacity-70">Delivery</p>
          <p className="text-themeText text-sm text-opacity-70">Contact Us</p>
          <p className="text-themeText text-sm text-opacity-70">
            Help & Support
          </p>
          <p className="text-themeText text-sm text-opacity-70">
            <Link to="/terms-and-conditions">Term & Conditions</Link>
          </p>
        </div>
        {/* 4 */}
        <div className="flex flex-col justify-between max-md:mt-10">
          <div className="space-y-4  text-sm">
            <div className="flex items-center gap-x-3">
              <IoMailOutline
                size={20}
                className="text-opacity-60 text-themeText"
              />
              <div>
                <p className=" text-themeText text-opacity-90">
                  Business inquiries
                </p>
                <p className="text-opacity-60 text-themeText font-light">
                  Sales@company.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <BsSend size={20} className="text-opacity-60 text-themeText" />
              <div>
                <p className=" text-themeText text-opacity-90">Order details</p>
                <p className="text-opacity-60 text-themeText font-light">
                  Order@Shippinghack.com
                </p>
              </div>
            </div>
          </div>
          <div className="text-themeText flex gap-x-3 justify-center text-2xl max-md:mt-4 max-md:justify-start">
            <a
              target="_blank"
              href="https://www.facebook.com/"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>{" "}
            <a
              target="_blank"
              href="https://www.twitter.com/"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>{" "}
            <a
              target="_blank"
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
            >
              <RiInstagramFill />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/"
              rel="noopener noreferrer"
            >
              <BsYoutube />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <p className="font-switzer font-light text-center px-2 py-6 text-base text-opacity-60 text-themeText max-lg:text-sm max-sm:text-sm">
        Copyright &copy; 2022 Shipping Hack. All Rights Reserved. |
        <u> Privacy Policy</u> | <u>Terms of Use</u>
      </p>
    </div>
  );
}
