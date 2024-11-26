import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Navbar from "../internationalShipping/navbar/Navbar";
import { inputStyle } from "../../utilities/Style";
import { HiOutlinePlusCircle } from "react-icons/hi";
import SaveAddressCard from "../../components/SaveAddressCard";
import { MdOutlineCancel } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import Footer from "../../components/Footer";
import { json, useNavigate } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import DropOffAddressCard from "../../components/DropOffAddressCard";
import MiniLoader from "../../components/MiniLoader";
import { BASE_URL } from "../../utilities/URL";
import { currentDate } from "../../utilities/Date";
import Loader from "../../components/Loader";

export default function SendParcelSteps() {
  const options = [];
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  // const currentDate = currentDate

  const scrollEffect = useRef(null);
  const [stepNo, setStepNo] = useState(1);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [displayAddress, setDisplayAddress] = useState(0);
  const [recieverCountryCode, setRecieverCountryCode] = useState("+92");
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [packageDetail, setPackageDetail] = useState({
    pickupDate: "",
    pickupStartTime: "",
    pickupEndTime: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    vehicleTypeId: 3,
    packages: [
      {
        weight: "",
        length: "",
        width: "",
        height: "",
        categoryId: "",
        catText: "",
        note: "",
      },
    ],
    addNewPickup: false,
    pickupAddressId: "",
    pickupAddress: {
      save: true,
      title: "",
      streetAddress: "",
      building: "",
      floor: "",
      apartment: "",
      district: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
      lat: "",
      lng: "",
      userId: "",
    },
    addNewDropoff: false,
    dropoffAddressId: "",
    dropoffAddress: {
      save: true,
      title: "",
      streetAddress: "",
      building: "",
      floor: "",
      apartment: "",
      district: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
      lat: "",
      lng: "",
      userId: "",
    },
  });

  const { data } = GetAPI("customer/getAllCategory");
  const { data: dropoffAddresses, reFetch } = GetAPI(
    "customer/getattachaddresses"
  );
  const { data: restrictedItems } = GetAPI("customer/restricteditems");

  data?.data?.map((obj, i) =>
    options.push({
      value: obj?.id,
      label: obj?.title,
    })
  );

  const onClose = () => {
    setModal(false);
  };

  const onClose2 = () => {
    setModal2(false);
  };

  const handleChange = (e) => {
    setPackageDetail({ ...packageDetail, [e.target.name]: e.target.value });
  };

  const handlePhone = (e) => {
    if (e.target.value.length < 11) {
      setPackageDetail({ ...packageDetail, receiverPhone: e.target.value });
    }else if (e.target.value.length > 10) {
      info_toaster("cannot exceed more than 10 digits");
    }
  };

  const handlePackageDetails = (e) => {
    setPackageDetail({
      ...packageDetail,
      packages: [
        {
          ...packageDetail.packages[0],
          [e.target.name]: e.target.value,
        },
      ],
    });
  };

  const handleDisplayAddress = () => {
    if (packageDetail?.packages[0]?.categoryId === "") {
      info_toaster("select category");
    } else if (packageDetail?.packages[0]?.weight === "") {
      info_toaster("enter weight");
    } else if (packageDetail?.packages[0]?.weight > 150) {
      info_toaster("weight limit exceeds");
    } else if (packageDetail?.packages[0]?.length === "") {
      info_toaster("enter length");
    } else if (packageDetail?.packages[0]?.width === "") {
      info_toaster("enter width");
    } else if (packageDetail?.packages[0]?.height === "") {
      info_toaster("enter height");
    } else if (packageDetail?.packages[0]?.note === "") {
      info_toaster("Enter note");
    } else {
      setStepNo(2);
      setDisplayAddress(1);
    }
  };

  const handleStep2 = () => {
    if (packageDetail?.pickupDate === "") {
      info_toaster("Select pickup date");
    } else if (packageDetail?.pickupDate === currentDate) {
      info_toaster("Pickup Date cannot be current date");
    } else if (packageDetail?.pickupDate < currentDate) {
      info_toaster("Pickup Date cannot be less than current date");
    } else if (packageDetail?.pickupStartTime === "") {
      info_toaster("Select pickup start time");
    } else if (packageDetail?.pickupEndTime === "") {
      info_toaster("Select pickup end time");
    } else if (
      packageDetail?.pickupStartTime === packageDetail?.pickupEndTime
    ) {
      info_toaster("Pickup start and pickup end time cannot be same");
    } else if (packageDetail?.pickupStartTime >= packageDetail?.pickupEndTime) {
      info_toaster("Incorrect pickup start and pickup end time");
    } else if (packageDetail?.pickupAddressId === "") {
      info_toaster("Select Pickup Address");
    } else {
      setStepNo(3);
      setDisplayAddress(2);
    }
  };

  const handleCategoryName = (state) => {
    setPackageDetail({
      ...packageDetail,
      packages: [
        {
          ...packageDetail.packages[0],
          categoryId: state?.value,
          catText: state?.label,
        },
      ],
    });
  };

  const handleDelete = (addressId) => {
    setModal(true);
    setAddressId(addressId);
  };

  const handleDeleteAddress = async () => {
    setLoading(true);
    const res = await PostAPI("customer/unattachaddress", {
      attchedAddressId: addressId,
    });
    if (res?.data?.status === "1") {
      setLoading(false);
      setModal(false);
      reFetch();
      success_toaster(res?.data?.message);
      if (addressId === packageDetail?.dropoffAddressId) {
        setPackageDetail({
          ...packageDetail,
          dropoffAddressId: "",
          dropoffAddress: {
            save: true,
            title: "",
            streetAddress: "",
            building: "",
            floor: "",
            apartment: "",
            district: "",
            city: "",
            province: "",
            country: "",
            postalCode: "",
            lat: "",
            lng: "",
            userId: "",
          },
        });
      } else if (addressId === packageDetail?.pickupAddressId) {
        setPackageDetail({
          ...packageDetail,
          pickupAddressId: "",
          pickupAddress: {
            save: true,
            title: "",
            streetAddress: "",
            building: "",
            floor: "",
            apartment: "",
            district: "",
            city: "",
            province: "",
            country: "",
            postalCode: "",
            lat: "",
            lng: "",
            userId: "",
          },
        });
      }
    } else {
      error_toaster(res?.data?.error);
      setLoading(false);
    }
  };

  const handleClick = (addressDBId, type) => {
    const address = dropoffAddresses?.data?.addressData?.find(
      (address) => address?.addressDBId === addressDBId
    );
    if (type === "pickup" && address?.type === "pickup") {
      setPackageDetail({
        ...packageDetail,
        pickupAddressId: addressDBId,
        pickupAddress: {
          ...packageDetail.pickupAddress,
          save: true,
          title: address?.addressDB?.title,
          streetAddress: address?.addressDB?.streetAddress,
          building: address?.addressDB?.building,
          floor: address?.addressDB?.floor,
          apartment: address?.addressDB?.apartment,
          district: address?.addressDB?.district,
          city: address?.addressDB?.city,
          province: address?.addressDB?.province,
          country: address?.addressDB?.country,
          postalCode: address?.addressDB?.postalCode,
          lat: address?.addressDB?.lat,
          lng: address?.addressDB?.lng,
          userId: userId,
        },
      });
    } else {
      setPackageDetail({
        ...packageDetail,
        dropoffAddressId: addressDBId,
        dropoffAddress: {
          ...packageDetail.dropoffAddress,
          save: true,
          title: address?.addressDB?.title,
          streetAddress: address?.addressDB?.streetAddress,
          building: address?.addressDB?.building,
          floor: address?.addressDB?.floor,
          apartment: address?.addressDB?.apartment,
          district: address?.addressDB?.district,
          city: address?.addressDB?.city,
          province: address?.addressDB?.province,
          country: address?.addressDB?.country,
          postalCode: address?.addressDB?.postalCode,
          lat: address?.addressDB?.lat,
          lng: address?.addressDB?.lng,
          userId: userId,
        },
      });
    }
  };

  const handleSubmit = async () => {
    if (packageDetail?.dropoffAddressId === "") {
      info_toaster("Select Address");
    } else if (packageDetail?.receiverName === "") {
      info_toaster("Enter receiver name");
    } else if (packageDetail?.receiverEmail === "") {
      ("Enter reciever email");
    } else if (packageDetail?.receiverPhone === "") {
      info_toaster("Enter reciever Phone number");
    } else if (
      packageDetail?.receiverPhone.length < 10 ||
      packageDetail?.receiverPhone.length > 10
    ) {
      info_toaster("Invalid phone number");
    } else {
      setLoading(true);
      const res = await PostAPI("customer/createbookingloc", packageDetail);

      if (res?.data?.status === "1") {
        setLoading(false);
        navigate("/send-parcel-locally-detail");
        success_toaster(res?.data?.message);
        localStorage.setItem(
          "localPackageData",
          JSON.stringify(res?.data?.data)
        );
      } else {
        setLoading(false);
        error_toaster(res?.data?.error);
      }
    }
  };

  useEffect(() => {
    let localPackageData = localStorage.getItem("localPackageData");
    if (localPackageData !== null) {
      localPackageData = JSON.parse(localPackageData);
      setPackageDetail({
        pickupDate: localPackageData?.pickupDate,
        pickupStartTime: localPackageData?.pickupStartTime,
        pickupEndTime: localPackageData?.pickupEndTime,
        receiverName: localPackageData?.receiverData?.receiverName,
        receiverEmail: localPackageData?.receiverData?.receiverEmail,
        receiverPhone: localPackageData?.receiverData?.receiverPhone,
        vehicleTypeId: 3,
        packages: [
          {
            weight: localPackageData?.packages[0]?.weight,
            length: localPackageData?.packages[0]?.length,
            width: localPackageData?.packages[0]?.width,
            height: localPackageData?.packages[0]?.height,
            categoryId: localPackageData?.packages[0]?.categoryId,
            catText: localPackageData?.packages[0]?.catText,
            note: localPackageData?.packages[0]?.note,
          },
        ],
        addNewPickup: false,
        pickupAddressId: localPackageData?.senderData?.pickupAddress?.id,
        pickupAddress: {
          save: true,
          title: localPackageData?.senderData?.pickupAddress?.title,
          streetAddress:
            localPackageData?.senderData?.pickupAddress?.streetAddress,
          building: localPackageData?.senderData?.pickupAddress?.building,
          floor: localPackageData?.senderData?.pickupAddress?.floor,
          apartment: localPackageData?.senderData?.pickupAddress?.apartment,
          district: localPackageData?.senderData?.pickupAddress?.district,
          city: localPackageData?.senderData?.pickupAddress?.city,
          province: localPackageData?.senderData?.pickupAddress?.province,
          country: localPackageData?.senderData?.pickupAddress?.country,
          postalCode: localPackageData?.senderData?.pickupAddress?.postalCode,
          lat: localPackageData?.senderData?.pickupAddress?.lat,
          lng: localPackageData?.senderData?.pickupAddress?.lng,
          userId: localPackageData?.senderData?.pickupAddress?.lng?.userId,
        },
        addNewDropoff: false,
        dropoffAddressId: localPackageData?.receiverData?.dropoffAddress?.id,
        dropoffAddress: {
          save: true,
          title: localPackageData?.receiverData?.dropoffAddress?.title,
          streetAddress:
            localPackageData?.receiverData?.dropoffAddress?.streetAddress,
          building: localPackageData?.receiverData?.dropoffAddress?.building,
          floor: localPackageData?.receiverData?.dropoffAddress?.floor,
          apartment: localPackageData?.receiverData?.dropoffAddress?.apartment,
          district: localPackageData?.receiverData?.dropoffAddress?.district,
          city: localPackageData?.receiverData?.dropoffAddress?.city,
          province: localPackageData?.receiverData?.dropoffAddress?.province,
          country: localPackageData?.receiverData?.dropoffAddress?.country,
          postalCode:
            localPackageData?.receiverData?.dropoffAddress?.postalCode,
          lat: localPackageData?.receiverData?.dropoffAddress?.lat,
          lng: localPackageData?.receiverData?.dropoffAddress?.lng,
          userId: localPackageData?.receiverData?.dropoffAddress?.title,
        },
      });
      setDisplayAddress(2);
    }
  }, []);

  useEffect(() => {
    if (scrollEffect.current) {
      scrollEffect.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stepNo]);

  return (
    <div className={`bg-themebackground`}>
      <div className="h-16">
        <Navbar bgColor={"bg-theme"} bgOpacity={false} position={"fixed"} />
      </div>
      {loading ? (
        <div
          className={`${
            loading ? "h-screen flex items-center justify-center" : "h-auto"
          }`}
        >
          <MiniLoader />
        </div>
      ) : (
        <div className="px-6 md:px-10 lg:w-3/5 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 py-8 md:py-10">
          {/* steps design start */}
          <div className="mx-auto md:w-[90%] grid grid-cols-3 gap-x-4">
            {/* 1 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${
                  stepNo === 1 || stepNo === 2 || stepNo === 3
                    ? "bg-theme"
                    : "bg-themeText"
                } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 1 || stepNo === 2 || stepNo === 3
                      ? "text-themeText"
                      : "text-theme"
                  } text-3xl md:text-4xl`}
                >
                  1
                </p>
              </div>
              <p className="font-switzer md:text-lg font-semibold text-center">
                Send Parcel
              </p>
            </div>
            {/* 2 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${
                  stepNo === 2 || stepNo === 3 ? "bg-theme" : "bg-themeText"
                } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 2 || stepNo === 3
                      ? "text-themeText"
                      : "text-theme"
                  } text-3xl md:text-4xl`}
                >
                  2
                </p>
              </div>
              <p className="font-switzer md:text-lg font-semibold text-center">
                Parcel Detail
              </p>
            </div>
            {/* 3 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${
                  stepNo === 3 ? "bg-theme" : "bg-themeText"
                } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 3 ? "text-themeText" : "text-theme"
                  } text-3xl md:text-4xl`}
                >
                  3
                </p>
              </div>
              <p className="font-switzer md:text-lg font-semibold text-center">
                Add Payment Method
              </p>
            </div>
          </div>

          {/* Package Details */}
          {(stepNo === 1 || stepNo === 2 || stepNo === 3) && (
            <div
              ref={stepNo === 1 ? scrollEffect : null}
              className="space-y-4 font-switzer mx-auto"
            >
              <p className="font-bold text-2xl text-start">Package Details</p>
              <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 ">
                <div className="md:w-[90%] lg:w-4/5 space-y-4 sm:sapce-y-6 md:space-y-8">
                  <div className="space-y-4">
                    {" "}
                    <div className="space-y-1">
                      <label htmlFor="">Category*</label>
                      <Select
                        value={
                          packageDetail?.packages[0]?.categoryId
                            ? {
                                value: packageDetail?.packages[0]?.categoryId,
                                label: packageDetail?.packages[0]?.catText,
                              }
                            : null
                        }
                        onChange={(state) => handleCategoryName(state) || null}
                        options={options}
                        placeholder="Select Category"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="text-start space-y-1">
                        <label htmlFor="weight">Weight*</label>
                        <div className="relative flex items-center justify-end">
                          <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={packageDetail?.packages[0]?.weight}
                            onChange={handlePackageDetails}
                            className={`${inputStyle}`}
                            placeholder="Enter weight"
                          />
                          <p className="absolute right-2  text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                            lbs
                          </p>
                        </div> 
                      </div>
                      <div className="text-start space-y-1">
                        <label htmlFor="length">Length*</label>
                        <div className="relative flex items-center justify-end">
                          <input
                            type="number"
                            name="length"
                            id="length"
                            value={packageDetail?.packages[0]?.length}
                            onChange={handlePackageDetails}
                            className={`${inputStyle}`}
                            placeholder="Enter length"
                          />
                          <p className="absolute right-2  text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                            inch
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="text-start space-y-1">
                        <label htmlFor="width" className="">
                          Width*
                        </label>
                        <div className="relative flex items-center justify-end">
                          <input
                            type="number"
                            name="width"
                            id="width"
                            value={packageDetail?.packages[0]?.width}
                            onChange={handlePackageDetails}
                            className={`${inputStyle}`}
                            placeholder="Enter Width"
                          />
                          <p className="absolute right-2  text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                            inch
                          </p>
                        </div>
                      </div>
                      <div className="text-start space-y-1">
                        <label htmlFor="height">Height*</label>
                        <div className="relative flex items-center justify-end">
                          <input
                            type="number"
                            name="height"
                            id="height"
                            value={packageDetail?.packages[0]?.height}
                            onChange={handlePackageDetails}
                            className={`${inputStyle}`}
                            placeholder="Enter Height"
                          />
                          <p className="absolute right-2  text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                            inch
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="space-y-1">
                  <label htmlFor="">ETA</label>
                  <input
                    type="date"
                    name=""
                    id=""
                    className={`${inputStyle}`}
                  />
                </div> */}
                    <div className="space-y-1">
                      <label htmlFor="note">Add Note*</label>
                      <textarea
                        name="note"
                        id="note"
                        rows="4"
                        value={packageDetail?.packages[0]?.note}
                        onChange={handlePackageDetails}
                        placeholder="Text here"
                        className="w-full font-switzer text-sm px-4 border py-3 placeholder:text-[#000000] placeholder:text-opacity-60  rounded-md outline-none bg-themegray border-borderColor"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleDisplayAddress}
                      className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Pickup Address */}
          {(displayAddress === 1 || displayAddress === 2) && (
            <div
              ref={stepNo === 2 ? scrollEffect : null}
              className="space-y-4 font-switzer  mx-auto"
            >
              <p className="font-bold text-2xl text-start">
                Add Pickup address
              </p>
              <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-4 ">
                <div className="md:flex justify-between items-center max-sm:space-y-4">
                  <p className="font-bold text-xl md:text-2xl">Save Address</p>
                  {/* <div className=""> */}
                  <button
                    type="button"
                    onClick={() => navigate("/add-address")}
                    className="max-sm:w-full flex items-center max-sm:justify-center gap-x-1 sm:gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-1 sm:px-2 md:px-5 rounded-md font-switzer font-semibold"
                  >
                    <span>
                      <HiOutlinePlusCircle size={22} />
                    </span>{" "}
                    Add New Shipping Address
                  </button>
                  {/* </div> */}
                </div>

                <div className="space-y-6">
                  {dropoffAddresses?.data?.addressData?.find(
                    (address) => address?.type === "pickup"
                  ) ? null : (
                    <div className="space-y-6">
                      <div className="text-crossColor flex justify-center items-center">
                        <MdOutlineCancel size={100} />
                      </div>
                      <p className="font-semibold font-switzer text-3xl text-center">
                        No Address Found
                      </p>
                    </div>
                  )}

                  <div className="space-6 grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {dropoffAddresses?.data?.addressData?.map(
                      (address, i) =>
                        address?.type === "pickup" && (
                          <DropOffAddressCard
                            key={i}
                            active={
                              address?.addressDBId ===
                              packageDetail?.pickupAddressId
                                ? true
                                : false
                            }
                            onClick={handleClick}
                            address={address}
                            handleDelete={handleDelete}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className="md:w-[90%] lg:w-4/5 space-y-8">
                  <div className="space-y-6">
                    <p className="font-bold text-2xl">Add Sender info</p>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label htmlFor="pickupDate">PickUp Date *</label>
                        <input
                          type="date"
                          name="pickupDate"
                          id="pickupDate"
                          value={packageDetail?.pickupDate}
                          onChange={handleChange}
                          className={`${inputStyle}`}
                          placeholder="Enter your Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="pickupStartTime">
                          PickUp Start Time *
                        </label>
                        <input
                          type="time"
                          name="pickupStartTime"
                          id="pickupStartTime"
                          value={packageDetail?.pickupStartTime}
                          onChange={handleChange}
                          className={`${inputStyle}`}
                          placeholder="Enter your Email"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="pickupEndTime">PickUp End Time *</label>
                        <input
                          type="time"
                          name="pickupEndTime"
                          id="pickupEndTime"
                          value={packageDetail?.pickupEndTime}
                          onChange={handleChange}
                          className={`${inputStyle}`}
                          placeholder="Enter your Email"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleStep2}
                      className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Drop-off Address */}
          {displayAddress === 2 && (
            <div
              ref={stepNo === 3 ? scrollEffect : null}
              className="space-y-4 font-switzer  mx-auto"
            >
              <p className="font-bold text-2xl text-start">
                Add Drop-off address
              </p>
              <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-4 ">
                <div className="md:flex justify-between items-center max-sm:space-y-4">
                  <p className="font-bold text-xl md:text-2xl">Save Address</p>
                  <button
                    type="button"
                    onClick={() => navigate("/add-address")}
                    className="max-sm:w-full flex items-center max-sm:justify-center gap-x-1 sm:gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-1 sm:px-2 md:px-5 rounded-md font-switzer font-semibold"
                  >
                    <span>
                      <HiOutlinePlusCircle size={22} />
                    </span>{" "}
                    Add New Shipping Address
                  </button>
                </div>

                <div className="space-y-6">
                  {dropoffAddresses?.data?.addressData?.find(
                    (address) => address?.type === "dropoff"
                  ) ? null : (
                    <div className="space-y-6">
                      <div className="text-crossColor flex justify-center items-center">
                        <MdOutlineCancel size={100} />
                      </div>
                      <p className="font-semibold font-switzer text-3xl text-center">
                        No Address Found
                      </p>
                    </div>
                  )}

                  <div className="space-6 grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {dropoffAddresses?.data?.addressData?.map(
                      (address, i) =>
                        address?.type === "dropoff" && (
                          <DropOffAddressCard
                            key={i}
                            active={
                              address?.addressDBId ===
                              packageDetail?.dropoffAddressId
                                ? true
                                : false
                            }
                            onClick={handleClick}
                            address={address}
                            handleDelete={handleDelete}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className="md:w-[90%] lg:w-4/5 space-y-8">
                  <div className="space-y-6">
                    <p className="font-bold text-2xl">Add Receiver info</p>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label htmlFor="receiverName">Name *</label>
                        <input
                          type="text"
                          name="receiverName"
                          id="receiverName"
                          value={packageDetail?.receiverName}
                          onChange={handleChange}
                          className={`${inputStyle}`}
                          placeholder="Enter your Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="receiverEmail">Email *</label>
                        <input
                          type="email"
                          name="receiverEmail"
                          id="receiverEmail"
                          onChange={handleChange}
                          value={packageDetail?.receiverEmail}
                          className={`${inputStyle}`}
                          placeholder="Enter your Email"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="phoneNum">Phone number*</label>
                        <div className="flex space-x-3 w-full">
                          <PhoneInput
                            inputStyle={{
                              display: "block",
                              width: "100px",
                              height: "45px",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                              color: "black",
                              border: "1px solid #E2E8F0",
                              borderRadius: "6px",
                            }}
                            country={"pr"}
                            onChange={(phone) => setRecieverCountryCode(phone)}
                            className="col-span-1"
                          />
                          <input
                            type="number"
                            name="receiverPhone"
                            value={packageDetail?.receiverPhone}
                            onChange={handlePhone}
                            className={`!w-full resize-none font-switzer text-sm px-4  placeholder:text-[#000000] placeholder:text-opacity-60 py-3 rounded-md focus:outline-none bg-themegray border border-borderColor`}
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setModal2(true)}
                      type="button"
                      className="w-full py-2.5 font-switzer font-medium text-themeText rounded-md
           hover:text-themeRed hover:bg-themeText border border-themeRed bg-themeRed hover:border-themeRed"
                    >
                      Restricted Items will not be send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-theme">
        <Footer />
      </div>

      <Modal
        isOpen={modal}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "xs" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!loading && (
              <div className="font-bold text-lg md:text-xl font-switzer pt-2 md:pt-5">
                Are you sure you want to delete this Address
              </div>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <MiniLoader />
            ) : (
              <div className="grid grid-cols-2 gap-x-4  pb-5">
                <button
                  onClick={() => setModal(false)}
                  className="w-32 md:w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAddress}
                  className="w-32 md:w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                >
                  Confirm
                </button>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modal2}
        onClose={onClose2}
        isCentered
        size={window.innerWidth < 768 ? "sm" : "xl"}
        motionPreset="slideInTop"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center font-switzer text-themePlaceholder text-opacity-80 text-2xl border-b">
            Following Items are strictly restricted
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            {restrictedItems?.data ? (
              <>
                <div className="grid grid-cols-4 gap-6 py-5">
                  {restrictedItems?.data?.itemsList?.map((item, i) => (
                    <div
                      key={i}
                      className="space-y-2 flex flex-col items-center"
                    >
                      <div>
                        <img
                          loading="eager|lazy"
                          src={`${BASE_URL}${item?.image}`}
                          alt="restricted item"
                          className="bg-contain"
                        />
                      </div>
                      <p className="text-themePlaceholder font-medium text-center">
                        {item?.title}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => setModal2(false)}
                    className="w-full py-2.5 mb-5 font-switzer font-medium bg-theme text-themeText rounded-md hover:bg-themeText hover:text-theme border border-theme"
                  >
                    I Understand
                  </button>
                </div>
              </>
            ) : (
              <MiniLoader />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* <Modal
      isOpen={modal}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="!font-bold">Add Drop-off address</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-4">
          <div className="space-y-1 relative flex items-center justify-end font-switzer">
            <input
              type="text"
              name=""
              id=""
              className={`${inputStyle}`}
              placeholder="Johar Town Lahore, Pakistan 54700"
            />
            <div className="absolute pr-4">
              <IoSearch
                size={24}
                style={{ color: "#000000", opacity: "0.4" }}
              />
            </div>
          </div>
          <div className="space-y-1 font-switzer">
            <label htmlFor="">Address Title</label>
            <input
              type="text"
              name=""
              id=""
              className={`${inputStyle}`}
              placeholder="e:g Home, Office"
            />
          </div>
          <div className="space-y-1 font-switzer">
            <label htmlFor="">Street Name</label>
            <input
              type="text"
              name=""
              id=""
              className={`${inputStyle}`}
              placeholder="Main Blvd Johar town"
            />
          </div>
          <div className="space-y-1 font-switzer">
            <label htmlFor="">Building*</label>
            <input
              type="text"
              name=""
              id=""
              className={`${inputStyle}`}
              placeholder="Main Blvd Johar town"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-4 font-switzer">
            <div className="space-y-1">
              <label htmlFor="">Floor*</label>
              <input
                type="text"
                name=""
                id=""
                className={`${inputStyle}`}
                placeholder="10"
              />
            </div>
            <div className="space-y-1 font-switzer">
              <label htmlFor="">Apt*</label>
              <input
                type="text"
                name=""
                id=""
                className={`${inputStyle}`}
                placeholder="15"
              />
            </div>
          </div>
          <div className="space-y-1 font-switzer">
            <label htmlFor="">Description</label>
            <input
              type="text"
              name=""
              id=""
              className={`${inputStyle}`}
              placeholder="e.g Nearest landmark"
            />
          </div>
          <div className="font-switzer">
            <Checkbox defaultChecked>
              Save this address for future use
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
          >
            Next
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal> */}
    </div>
  );
}
