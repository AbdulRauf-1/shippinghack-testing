import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import { MdOutlineCancel } from "react-icons/md";
import { HiOutlinePlusCircle } from "react-icons/hi";
import PhoneInput from "react-phone-input-2";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import ShipmentCard from "../../../components/ShipmentCard";
import SaveAddressCard from "../../../components/SaveAddressCard";
import { inputStyle } from "../../../utilities/Style";
import Footer from "../../../components/Footer";
import MiniLoader from "../../../components/MiniLoader";
import GetAPI from "../../../utilities/GetAPI";
import { useNavigate } from "react-router-dom";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import { Autocomplete, GoogleMap, MarkerF } from "@react-google-maps/api";
import ChooseDeliveryCard from "../../../components/ChooseDeliveryCard";
import CalculationCard from "../../../components/CalculationCard";
import Loader from "../../../components/Loader";

export default function AddDeliveryAddress() {
  const warehouseData = {
    email: "rico@gmail.com",
    companyName: "Warehouse Puerto Rico",
    companyEmail: null,
    countryCode: "+92",
    phoneNum: "12318413",
    addressDB: {
      title: "Warehouse Puerto Rico",
      streetAddress: "560 Juan J Jimenez street",
      building: "rr",
      floor: "2",
      apartment: "main",
      district: "dcnu",
      city: "San Juan",
      province: "Puerto Rico",
      country: "USA",
      postalCode: "00918",
      lat: "18.411919",
      lng: "-66.0744354",
    },
    addressDBId: 42,
  };
  const stepNo = 1;
  const warehousePackageBookingId = JSON.parse(
    localStorage.getItem("warehousePackageBookingId")
  );
  const navigate = useNavigate();

  const autocompleteRef = useRef(null);
  const scrollEffect = useRef(null);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [attchedAddressId, setAttchedAddressId] = useState("");
  const [serviceType, setServiceType] = useState(""); // deliveryService, selfPickup
  const [addDropOffAddress, setAddDropOffAddress] = useState({
    bookingId: warehousePackageBookingId,
    dropoffAddressId: "",
    dropOffAddress: {
      save: false,
      title: "",
      streetAddress: "",
      building: "",
      floor: "",
      apartment: "",
      district: "",
      city: "",
      ptovince: "",
      country: "",
      postalCode: "",
      lat: "",
      lng: "",
    },
    reciverdetails: {
      reciverName: "",
      reciverEmail: "",
      reciverPhone: "",
    },
    selfPickup: serviceType === "selfPickup" ? true : false,
    addNewAddress: false,
  });

  const { data, reFetch } = GetAPI("customer/getattachaddresses");

  const onClose = () => {
    setModal(false);
  };

  const handleDelete = (addressId) => {
    setAttchedAddressId(addressId);
    setModal(true);
  };

  const handleDeleteAddress = async () => {
    setLoader(true);
    const res = await PostAPI("customer/unattachaddress", {
      attchedAddressId: attchedAddressId,
    });
    if (res?.data?.status === "1") {
      reFetch();
      setLoader(false);
      setModal(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      setModal(false);
      error_toaster(res?.data?.error);
    }
  };

  const calculateRoute = () => {
    if (!autocompleteRef.current) {
      return;
    }
    const place = autocompleteRef.current.getPlace();
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
  };

  const handleServiceType = (type) => {
    setServiceType(type);
    setAddDropOffAddress({
      ...addDropOffAddress,
      selfPickup: type === "selfPickup" ? true : false,
      dropOffAddress: {
        save: false,
        title: "",
        streetAddress: "",
        building: "",
        floor: "",
        apartment: "",
        district: "",
        city: "",
        ptovince: "",
        country: "",
        postalCode: "",
        lat: "",
        lng: "",
      },
      dropoffAddressId: "",
    });
  };

  const handleRecieverDetail = (e) => {
    setAddDropOffAddress({
      ...addDropOffAddress,
      reciverdetails: {
        ...addDropOffAddress?.reciverdetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handlePhone = (e) => {
    if (e.target.value.length < 11) {
      setAddDropOffAddress({
        ...addDropOffAddress,
        reciverdetails: {
          ...addDropOffAddress?.reciverdetails,
          reciverPhone: e.target.value,
        },
      });
    } else if (e.target.value.length > 10) {
      info_toaster("cannot exceed more than 10 digits");
    }
  };

  const handleClick = (addressDetail) => {
    setAddDropOffAddress({
      ...addDropOffAddress,
      dropOffAddress: {
        ...addDropOffAddress?.dropOffAddress,
        title: addressDetail?.addressDB?.title,
        streetAddress: addressDetail?.addressDB?.streetAddress,
        building: addressDetail?.addressDB?.building,
        floor: addressDetail?.addressDB?.floor,
        apartment: addressDetail?.addressDB?.apartment,
        district: addressDetail?.addressDB?.district,
        city: addressDetail?.addressDB?.city,
        ptovince: addressDetail?.addressDB?.province,
        country: addressDetail?.addressDB?.country,
        postalCode: addressDetail?.addressDB?.postalCode,
        lat: addressDetail?.addressDB?.lat,
        lng: addressDetail?.addressDB?.lng,
      },
      dropoffAddressId: addressDetail?.addressDBId,
    });
  };

  const handleGetLogisticCompanies = async () => {
    setLoader(true);
    const res = await PostAPI("customer/getLogisticCompany", {
      bookingId: warehousePackageBookingId,
    });
    if (res?.data?.status === "1") {
      setLoader(false);
      navigate("/parcel-detail");
      localStorage.setItem(
        "warehousePackageLogisticCompanies",
        JSON.stringify(res?.data?.data?.arryofCompanies)
      );
      // setLogisticCompaniesData(res?.data?.data?.arryofCompanies);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addDropOffAddress?.dropoffAddressId === "") {
      info_toaster("Select Address");
    } else if (addDropOffAddress?.reciverdetails?.reciverName === "") {
      info_toaster("Enter receiver name");
    } else if (addDropOffAddress?.reciverdetails?.reciverEmail === "") {
      info_toaster("Enter receiver email");
    } else if (addDropOffAddress?.reciverdetails?.reciverPhone === "") {
      info_toaster("Enter receiver phone number");
    } else {
      setLoader(true);
      const res = await PostAPI("customer/addDropOfAddress", addDropOffAddress);
      if (res?.data?.status === "1") {
        localStorage.setItem(
          "addDropOffAddress",
          JSON.stringify(addDropOffAddress)
        );
        setLoader(false);
        success_toaster(res?.data?.message);
        handleGetLogisticCompanies();
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
      }
    }
  };

  // const handleOrderDetail = async () => {
  //   setLoader(true);
  //   const res = await PostAPI("customer/orderdetails", {
  //     bookingId: warehousePackageBookingId,
  //   });
  //   if (res?.data?.status === "1") {
  //     navigate("/payment-method");
  //     localStorage.setItem("warehousePackageBookingDetail", JSON.stringify(res?.data?.data));
  //     setLoader(false);
  //     success_toaster(res?.data?.message);
  //   } else {
  //     setLoader(false);
  //     error_toaster(res?.data?.error);
  //   }
  // };

  // const handleLogisticCompany = async (companyData) => {
  //   setLoader(true);
  //   const res = await PostAPI("customer/chooseLogisticCompany", {
  //     bookingId: warehousePackageBookingId,
  //     logisticCompanyId: companyData?.id,
  //     charges: companyData?.charges,
  //   });
  //   if (res?.data?.status === "1") {
  //     handleOrderDetail();
  //     setLoader(false);
  //     success_toaster(res?.data?.message);
  //   } else {
  //     setLoader(false);
  //     error_toaster(res?.data?.error);
  //   }
  // };

  useEffect(() => {
    let tempAddDropOffAddress = localStorage.getItem("addDropOffAddress");
    if (tempAddDropOffAddress !== null) {
      tempAddDropOffAddress = JSON.parse(tempAddDropOffAddress);
      setAddDropOffAddress(tempAddDropOffAddress);
      setServiceType(
        tempAddDropOffAddress?.selfPickup
          ? "selfPickup"
          : tempAddDropOffAddress?.dropoffAddressId
          ? "deliveryService"
          : ""
      );
    }
  }, []);

  useEffect(() => {
    if (scrollEffect.current) {
      scrollEffect.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [addDropOffAddress?.dropoffAddressId, serviceType]);

  return data.length === 0 && !modal ? (
    <Loader />
  ) : (
    <div className={`bg-themebackground ${loader ? "h-screen" : "h-auto"}`}>
      <div className="h-16">
        <Navbar bgColor={"bg-theme"} bgOpacity={false} position={"fixed"} />
      </div>
      {loader ? (
        <div className="h-screen flex items-center justify-center">
          <MiniLoader />
        </div>
      ) : (
        <div className="px-6 md:px-10 lg:w-4/6 mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16 py-8 md:py-10">
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
              <p className="font-switzer text-lg font-semibold text-center">
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
              <p className="font-switzer text-lg font-semibold text-center">
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
              <p className="font-switzer text-lg font-semibold text-center">
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
              <div className="flex flex-col md:flex-row gap-14 md:gap-8 mt-8 md:mt-12">
                <ChooseDeliveryCard
                  handleServiceType={handleServiceType}
                  bgColor={serviceType === "deliveryService" ? true : false}
                  src="/images/delivery-service.webp"
                  heading="Delivery Service"
                  desc="Have your package delivered anywhere within airport"
                />
                <ChooseDeliveryCard
                  handleServiceType={handleServiceType}
                  bgColor={serviceType === "selfPickup" ? true : false}
                  src="/images/self-pickup.webp"
                  heading="Self Pickup"
                  desc="Picked your package from warehouse"
                />
              </div>

              {/* Save Address */}
              {serviceType ? (
                <div
                  ref={serviceType ? scrollEffect : null}
                  className="flex flex-col md:flex-row justify-between md:items-center gap-2"
                >
                  <p className="font-bold text-xl md:text-2xl">Save Address</p>
                  {serviceType === "deliveryService" && (
                    <button
                      // onClick={addNewShippingAddress}
                      onClick={() => navigate("/add-address")}
                      className="flex items-center gap-x-2 text-theme border border-theme border-opacity-60 py-2.5 px-5 rounded-md font-switzer font-semibold"
                    >
                      <span>
                        <HiOutlinePlusCircle size={22} />
                      </span>{" "}
                      Add New Shipping Address
                    </button>
                  )}
                </div>
              ) : (
                <></>
              )}

              {/* No Address Found */}
              {serviceType === "deliveryService" ? (
                <div className="space-y-2">
                  {data?.data?.addressData?.find(
                    (address) => address?.type === "dropoff"
                  ) ? null : (
                    <div
                      ref={serviceType ? scrollEffect : null}
                      className="space-y-6"
                    >
                      <div className="text-crossColor flex justify-center items-center">
                        <MdOutlineCancel size={100} />
                      </div>
                      <p className="font-semibold font-switzer text-3xl text-center">
                        No Address Found
                      </p>
                    </div>
                  )}

                  <div className="grid  md:grid-cols-2 gap-6">
                    {data?.data?.addressData?.map(
                      (address, i) =>
                        address?.type === "dropoff" && (
                          <SaveAddressCard
                            active={
                              address?.addressDBId ===
                              addDropOffAddress?.dropoffAddressId
                                ? true
                                : false
                            }
                            handleClick={handleClick}
                            handleDelete={handleDelete}
                            address={address}
                            key={i}
                          />
                        )
                    )}
                  </div>
                </div>
              ) : serviceType === "selfPickup" ? (
                <div className="grid grid-cols-2 gap-6">
                  <SaveAddressCard
                    active={
                      warehouseData?.addressDBId ===
                      addDropOffAddress?.dropoffAddressId
                        ? true
                        : false
                    }
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                    address={warehouseData}
                    key={warehouseData?.email}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Add Receiver Info */}
          <form
            ref={addDropOffAddress?.dropoffAddressId ? scrollEffect : null}
            onSubmit={handleSubmit}
            className="space-y-4 font-switzer mx-auto"
          >
            <p className="font-bold text-2xl text-start">Add Receiver info</p>
            <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5">
              <div className="space-y-4 md:w-3/5">
                <div className="space-y-1">
                  <label htmlFor="reciverName">Name *</label>
                  <input
                    type="text"
                    name="reciverName"
                    id="reciverName"
                    value={addDropOffAddress?.reciverdetails?.reciverName}
                    onChange={handleRecieverDetail}
                    className={`${inputStyle}`}
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="reciverEmail">Email *</label>
                  <input
                    type="email"
                    name="reciverEmail"
                    id="reciverEmail"
                    value={addDropOffAddress?.reciverdetails?.reciverEmail}
                    onChange={handleRecieverDetail}
                    className={`${inputStyle}`}
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="reciverPhone">Phone number*</label>
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
                      className="col-span-1"
                    />
                    <input
                      type="number"
                      name="reciverPhone"
                      id="reciverPhone"
                      value={addDropOffAddress?.reciverdetails?.reciverPhone}
                      onChange={handlePhone}
                      className={`!w-full resize-none font-switzer text-sm px-4  placeholder:text-[#000000] placeholder:text-opacity-60 py-3 rounded-md focus:outline-none bg-themegray border border-borderColor`}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* <div className="space-y-2">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={calculateRoute}
        >
          <div className="relative">
            <input
              type="search"
              className={inputStyle}
              placeholder="Search address"
            />
          </div>
        </Autocomplete>
      </div> */}

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
            {!loader && (
              <div className="font-bold text-lg md:text-xl font-switzer pt-2 md:pt-5">
                Are you sure you want to delete this Address
              </div>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="grid grid-cols-2 gap-x-4 pb-2 md:pb-5">
                <button
                  onClick={() => setModal(false)}
                  className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
                   hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAddress}
                  className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
                   hover:text-theme hover:bg-transparent border hover:border-theme"
                >
                  Confirm
                </button>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* <Modal
        isOpen={modal2}
        onClose={onClose2}
        isCentered
        size={"xl"}
        motionPreset="slideInTop"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center font-switzer text-themePlaceholder text-opacity-80 text-2xl border-b">
            {!loader && "Choose your delivery Company"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="space-y-4 py-5">
                {logisticCompaniesData?.map((company, i) => (
                  <CalculationCard
                    handleLogisticCompany={handleLogisticCompany}
                    company={company}
                    cursor={true}
                  />
                ))}
                <div className="flex justify-end items-center">
                  <button
                    onClick={() => setModal2(false)}
                    className="w-40 py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal> */}

      {/* <Modal
        isOpen={modal}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          {!loader && (
            <ModalHeader className="!font-bold">
              Add Drop-off address
            </ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody>
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="space-y-4 pb-5 !font-switzer">
                <div className="space-y-2">
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={calculateRoute}
                  >
                    <div className="relative">
                      <input
                        type="search"
                        className={inputStyle}
                        placeholder="Search address"
                      />
                    </div>
                  </Autocomplete>
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="title">Address Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="e:g Home, Office"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="streetAddress">Street Name</label>
                  <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Main Blvd Johar town"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="building">Building*</label>
                  <input
                    type="text"
                    name="building"
                    id="building"
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Main Blvd Johar town"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="space-y-1">
                    <label htmlFor="floor">Floor*</label>
                    <input
                      type="text"
                      name="floor"
                      id="floor"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="apartment">Apt*</label>
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="15"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="space-y-1">
                    <label htmlFor="country">Country*</label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="15"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="district">District*</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                  <div className="space-y-1">
                    <label htmlFor="city">City*</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="province">Province*</label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="15"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="postalCode">Postal Code*</label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="10"
                    />
                  </div>
                </div>
                <div>
                  <Checkbox defaultChecked>
                    Save this address for future use
                  </Checkbox>
                </div>
                <div>
                  <button
                    onClick={handleDropOffAddress}
                    className="w-full py-2.5  font-medium bg-theme text-themeText rounded-md
              hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </div>
  );
}
