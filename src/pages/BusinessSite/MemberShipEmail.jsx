import React from "react";

export default function MemberShipEmail() {
  return (
    <div className="px-20 bg-themebackground">
      <div className="w-56 h-24">
        <img
        loading="eager|lazy"
          src="/images/logo.webp"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>   

      <div className="font-switzer py-10">
        <div className="bg-themeText w-3/5 mx-auto space-y-10 px-20 py-10 shadow-lg">
          <div>
            <p className="text-themePlaceholder text-4xl font-semibold">
              Check Your Email
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-themePlaceholder text-opacity-60">
              We’ve sent a message to Aysha@gmail.com with a link to activate
              your account.
            </p>
            <p className="text-lg text-themePlaceholder text-opacity-60">
              Didn’t get an email?
            </p>
            <p className="text-lg text-themePlaceholder text-opacity-60">
              If you don’t see an email from us within a couple of minutes, a
              few things could have happened:
            </p>
            <ul className="space-y-4 list-disc px-5">
              <li className="text-lg text-themePlaceholder text-opacity-60">
                The email is in your SPAM folder
              </li>
              <li className="text-lg text-themePlaceholder text-opacity-60">
                The email address you entered had a mistake or typo
              </li>
              <li className="text-lg text-themePlaceholder text-opacity-60">
                You accidentally gave us another email address
              </li>
              <li className="text-lg text-themePlaceholder text-opacity-60">
                We can't deliver email to this address
              </li>
            </ul>
            <p className="text-lg text-theme">
              Re-Enter your email and try again
            </p>
          </div>
        </div>
        <p className="font-switzer text-themePlaceholder text-opacity-60 font-light text-sm text-center pt-10">
          Copyright &copy; Shipping Hack 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}
