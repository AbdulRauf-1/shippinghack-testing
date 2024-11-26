import React from "react";
import PackageStatus from "./PackageStatus";
import MeasurementCard from "./MeasurementCard";
import PackageDetailsCard from "./PackageDetailsCard";
import SenderOrReceiverDetailCard from "./SenderOrReceiverDetailCard";
import MeasurementCard2 from "./MeasurementCard2";
import ShippingCompanyCard from "./ShippingCompanyCard";
import { BASE_URL } from "../utilities/URL";
import AddressCardPkDo from "./AddressCardPkDo";
import { FaPrint } from "react-icons/fa6";

export default function WarehousePackageDetail(props) {
  console.log(
    "🚀 ~ WarehousePackageDetail ~ props:",
    props?.packagesInWarehouseData
  );
  return (
    <div className="space-y-4 font-switzer sticky top-28 h-[600px] pb-6 overflow-y-auto scroll-container">
      {props?.packagesInWarehouseData?.trackingId && (
        <p className="font-semibold text-xl text-themePlaceholder">
          Order#
          <span className="text-themePlaceholder text-opacity-40">
            {" "}
            {props?.packagesInWarehouseData?.trackingId}
          </span>
        </p>
      )}

      <div>
        {props?.packagesInWarehouseData?.pickupAddress?.streetAddress && (
          <p className="text-theme font-helvetica">Pick-Up</p>
        )}

        <AddressCardPkDo
          title={props?.packagesInWarehouseData?.pickupAddress?.title}
          streetAddress={
            props?.packagesInWarehouseData?.pickupAddress?.streetAddress
          }
          building={props?.packagesInWarehouseData?.pickupAddress?.building}
          floor={props?.packagesInWarehouseData?.pickupAddress?.floor}
          apartment={props?.packagesInWarehouseData?.pickupAddress?.apartment}
          district={props?.packagesInWarehouseData?.pickupAddress?.district}
          city={props?.packagesInWarehouseData?.pickupAddress?.city}
          province={props?.packagesInWarehouseData?.pickupAddress?.province}
          country={props?.packagesInWarehouseData?.pickupAddress?.country}
          postalCode={props?.packagesInWarehouseData?.pickupAddress?.postalCode}
        />

        {props?.packagesInWarehouseData?.dropoffAddress?.streetAddress && (
          <p className="text-theme font-helvetica">Drop-Off</p>
        )}

        {props?.packagesInWarehouseData?.dropoffAddress && (
          <AddressCardPkDo
            title={props?.packagesInWarehouseData?.dropoffAddress?.title}
            streetAddress={
              props?.packagesInWarehouseData?.dropoffAddress?.streetAddress
            }
            building={props?.packagesInWarehouseData?.dropoffAddress?.building}
            floor={props?.packagesInWarehouseData?.dropoffAddress?.floor}
            apartment={
              props?.packagesInWarehouseData?.dropoffAddress?.apartment
            }
            district={props?.packagesInWarehouseData?.dropoffAddress?.district}
            city={props?.packagesInWarehouseData?.dropoffAddress?.city}
            province={props?.packagesInWarehouseData?.dropoffAddress?.province}
            country={props?.packagesInWarehouseData?.dropoffAddress?.country}
            postalCode={
              props?.packagesInWarehouseData?.dropoffAddress?.postalCode
            }
          />
        )}
      </div>

      {props?.packagesInWarehouseData?.logisticCompany?.title && (
        <ShippingCompanyCard
          companyName={props?.packagesInWarehouseData?.logisticCompany?.title}
          src={`${BASE_URL}${props?.packagesInWarehouseData?.logisticCompany?.logo}`}
        />
      )}

      <MeasurementCard2
        billableWeight={props?.packagesInWarehouseData?.billableWeight}
        subTotal={props?.packagesInWarehouseData?.subTotal}
        discount={props?.packagesInWarehouseData?.discount}
        total={props?.packagesInWarehouseData?.total}
      />

      {props?.packagesInWarehouseData?.senderName && (
        <SenderOrReceiverDetailCard
          heading="Sender"
          // virtualBoxNo="3265326"
          name={props?.packagesInWarehouseData?.senderName}
          email={props?.packagesInWarehouseData?.senderEmail}
          phone={props?.packagesInWarehouseData?.senderPhone}
        />
      )}

      {props?.packagesInWarehouseData?.receiverName && (
        <SenderOrReceiverDetailCard
          heading="Receiver"
          name={props?.packagesInWarehouseData?.receiverName}
          email={props?.packagesInWarehouseData?.receiverEmail}
          phone={props?.packagesInWarehouseData?.receiverPhone}
        />
      )}

      <div className="space-y-4">
        {/* package detail */}
        {props?.packagesInWarehouseData?.packages?.map((pkge, i) => (
          <div
            key={i + 1}
            className="p-4 border border-borderColor rounded-md font-switzer space-y-3"
          >
            <div className="flex justify-between items-center">
              <p className="text-theme text-lg font-semibold">
                Package Detail ({i + 1}/
                {props?.packagesInWarehouseData?.packages.length})
              </p>
              {pkge?.arrived && (
                <PackageStatus
                  text={pkge?.arrived}
                  bgColor={props?.statusBgColor}
                  color={props?.statusTextColor}
                />
              )}
            </div>
            {pkge?.logisticCompanyTrackingNum && (
              <div className="flex items-center justify-between flex-wrap">
                <div>
                  <p>Tracking ID</p>{" "}
                  <p className="font-semibold">
                    {pkge?.logisticCompanyTrackingNum}
                  </p>
                </div>

                <button
                  onClick={() =>
                    window.open(
                      "https://www.fedex.com/en-pk/tracking.html",
                      "_blank"
                    )
                  }
                  className=" border border-theme bg-themeText text-theme hover:bg-theme hover:text-themeText duration-150 rounded-md px-2 py-1"
                >
                  Track Order
                </button>
              </div>
            )}
            {pkge?.fedexLabel && (
              <div className="flex justify-end items-center">
                <button
                  onClick={() => window.open(`${pkge?.fedexLabel}`, "_blank")}
                  className="font-switzer flex items-center gap-x-2"
                >
                  <span className="text-sm text-themePlaceholder">
                    Print label
                  </span>{" "}
                  <FaPrint color="#00538C" size={20} />
                </button>
              </div>
            )}
            <div className="space-y-2">
              {pkge?.ecommerceCompany && (
                <PackageDetailsCard
                  companyName={pkge?.ecommerceCompany}
                  name={pkge?.name}
                  email={pkge?.email}
                  phoneNo={pkge?.phone}
                  ETA={pkge?.ETA}
                />
              )}
              <MeasurementCard
                width={pkge?.width}
                length={pkge?.length}
                height={pkge?.height}
                weight={pkge?.weight}
                category={pkge?.category}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
