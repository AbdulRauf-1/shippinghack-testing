import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import ShipmentCard from "../../../components/ShipmentCard";
import ShipmentTypeCard from "../../../components/ShipmentTypeCard";
import Loader from "../../../components/Loader";
import GetAPI from "../../../utilities/GetAPI";
import { BASE_URL } from "../../../utilities/URL";
import { useNavigate } from "react-router-dom";
import MiniLoader from "../../../components/MiniLoader";
import { info_toaster } from "../../../utilities/Toaster";

export default function SendParcel() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const scrollEffect = useRef(null);
  const [shipmentType, setShipmentType] = useState(""); // international, local
  const [packageType, setPackageType] = useState(""); // single, multiple, consolidation

  const { data } = GetAPI("customer/homepage");

  const handleShipmentType = (type) => {
    // setLoader(true);
    setShipmentType(type);
    setPackageType("");
    // setTimeout(() => {
    // setLoader(false);
    // }, 200);
  };

  const handlePackageType = (type) => {
    setPackageType(type);
  };

  useEffect(() => {
    if (scrollEffect.current) {
      scrollEffect.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [packageType, shipmentType]);

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="Send Parcel"
      rightSide={
        loader ? (
          <MiniLoader />
        ) : (
          <div
            style={{ minHeight: "calc(100vh - 440px)" }}
            className="space-y-8 sm:space-y-10"
          >
            {/* shipment */}

            <div className="flex flex-col sm:flex-row max-sm:justify-center max-md:justify-between gap-y-16 md:gap-y-20 sm:gap-x-6 lg:gap-x-6 xl:gap-x-10 mt-16">
              <ShipmentCard
                handleShipmentType={handleShipmentType}
                type={"local"}
                bgColor={shipmentType === "local" ? true : false}
                src={BASE_URL + data?.data?.bookingTypeData[2]?.image}
                heading={data?.data?.bookingTypeData[2]?.title}
                desc={data?.data?.bookingTypeData[2]?.description}
              />
              <ShipmentCard
                handleShipmentType={handleShipmentType}
                type={"international"}
                bgColor={shipmentType === "international" ? true : false}
                src={BASE_URL + data?.data?.bookingTypeData[0]?.image}
                heading={data?.data?.bookingTypeData[0]?.title}
                desc={data?.data?.bookingTypeData[0]?.description}
              />
            </div>
            <div
              ref={shipmentType === "international" ? scrollEffect : null}
            ></div>
            {/* shipment type */}
            {shipmentType === "international" ? (
              <div className="space-y-4">
                <p className="font-switzer font-bold text-2xl">
                  Select Shipment Type
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10">
                  <ShipmentTypeCard
                    heading="ONE PACKAGE"
                    type="single"
                    handlePackageType={handlePackageType}
                    bgColor={packageType === "single" ? true : false}
                    src={BASE_URL + data?.data?.selectPackageType[0]?.image}
                    desc1={data?.data?.selectPackageType[0]?.title}
                    detail1={data?.data?.selectPackageType[0]?.description}
                  />

                  <ShipmentTypeCard
                    heading="Multiple Packages"
                    type="multiple"
                    handlePackageType={handlePackageType}
                    bgColor={packageType === "multiple" ? true : false}
                    src={BASE_URL + data?.data?.selectPackageType[1]?.image}
                    desc1={data?.data?.selectPackageType[1]?.title}
                    detail1={data?.data?.selectPackageType[1]?.description}
                  />

                  <ShipmentTypeCard
                    heading="CONSOLIDATION"
                    type="consolidation"
                    handlePackageType={handlePackageType}
                    bgColor={packageType === "consolidation" ? true : false}
                    src={BASE_URL + data?.data?.selectPackageType[2]?.image}
                    desc1={data?.data?.selectPackageType[2]?.title}
                    detail1={data?.data?.selectPackageType[2]?.description}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* button */}
            <div className="flex justify-end items-center">
              <button
                ref={
                  packageType === "single" ||
                  packageType === "multiple" ||
                  packageType === "consolidation"
                    ? scrollEffect
                    : null
                }
                onClick={() => {
                  if (shipmentType === "") {
                    info_toaster("Select shipping");
                  } else if (
                    packageType === "" &&
                    shipmentType === "international"
                  ) {
                    info_toaster("Select Shipment Type");
                  } else {
                    if (shipmentType === "international") {
                      navigate("/send-parcel-internationally");
                      localStorage.setItem(
                        "internationalPackageType",
                        packageType
                      );
                    } else if (shipmentType === "local") {
                      // navigate("/send-parcel-locally");
                      info_toaster("Work in Progress");
                      localStorage.removeItem("localPackageData");
                    }
                  }
                }}
                className="py-2 sm:py-2.5 px-16 sm:px-20 md:px-24 text-xl font-switzer font-medium bg-theme text-themeText rounded-md
                 hover:text-theme hover:bg-transparent border hover:border-theme"
              >
                Continue
              </button>
            </div>
          </div>
        )
      }
    />
  );
}
