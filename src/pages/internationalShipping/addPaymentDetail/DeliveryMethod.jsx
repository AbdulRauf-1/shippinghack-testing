import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import ShipmentCard from "../../../components/ShipmentCard";
import PickupAddressCard from "../../../components/PickupAddressCard";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
export default function DeliveryMethod() {
  const addDeliveryAddressStepNo = JSON.parse(
    localStorage.getItem("addDeliveryAddressStepNo")
  );
  const navigate = useNavigate();
  const [stepNo, setStepNo] = useState(addDeliveryAddressStepNo);

  // no nood of this as this is in AddDeliveryAddress page already
  return (
    <div className="bg-themebackground">
      <div className="h-16">
        <Navbar bgColor={"bg-theme"} bgOpacity={false} position={"fixed"} />
      </div>
      <div className="w-3/5 mx-auto space-y-16 py-10">
        {/* steps design start */}
        <div className="w-8/12 mx-auto flex justify-between">
          {/* 1 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`${
                stepNo === 1 || stepNo === 2 || stepNo === 3
                  ? "bg-theme"
                  : "bg-themeText"
              } w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
            >
              <p
                className={`${
                  stepNo === 1 || stepNo === 2 || stepNo === 3
                    ? "text-themeText"
                    : "text-theme"
                } text-4xl`}
              >
                1
              </p>
            </div>
            <p className="font-switzer text-lg font-semibold">Send Parcel</p>
          </div>
          {/* 2 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`${
                stepNo === 2 || stepNo === 3 ? "bg-theme" : "bg-themeText"
              } w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
            >
              <p
                className={`${
                  stepNo === 2 || stepNo === 3 ? "text-themeText" : "text-theme"
                } text-4xl`}
              >
                2
              </p>
            </div>
            <p className="font-switzer text-lg font-semibold">Parcel Detail</p>
          </div>
          {/* 3 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`${
                stepNo === 3 ? "bg-theme" : "bg-themeText"
              } w-12 h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
            >
              <p
                className={`${
                  stepNo === 3 ? "text-themeText" : "text-theme"
                } text-4xl`}
              >
                3
              </p>
            </div>
            <p className="font-switzer text-lg font-semibold">
              Add Payment Method
            </p>
          </div>
        </div>

        {/* Choose Delivery Method */}
        <div className="space-y-4 font-switzer mx-auto">
          <p className="font-bold text-2xl text-start">
            Choose Delivery Method
          </p>
          <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-8">
            {/* services types */}
            <div className="flex gap-x-8 mt-12">
              <ShipmentCard
                navigate="/payment-method"
                src="/images/delivery-service.webp"
                heading="Delivery Service"
                desc="Have your package delivered anuywhere within airport"
              />
              <ShipmentCard
                navigate="/payment-method"
                src="/images/self-pickup.webp"
                heading="Self Pickup"
                desc="Picked your package from warehouse"
              />
            </div>

            {/* Save Address */}
            <div className="space-y-4">
              <p className="font-bold text-2xl ">Save Address</p>

              <div className="space-y-4">
                <p className="font-switzer text-themePlaceholder text-opacity-60">
                  Please pick up the package from the following warehouse
                  address
                </p>

                <div className="w-96">
                  <PickupAddressCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-theme">
        <Footer />
      </div>
    </div>
  );
}
