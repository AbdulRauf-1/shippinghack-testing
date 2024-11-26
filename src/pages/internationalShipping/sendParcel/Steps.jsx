import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";
import { inputStyle } from "../../../utilities/Style";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import GetAPI from "../../../utilities/GetAPI";
import Loader from "../../../components/Loader";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import { PostAPI } from "../../../utilities/PostAPI";
import { BASE_URL } from "../../../utilities/URL";
import MiniLoader from "../../../components/MiniLoader";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { currentDate } from "../../../utilities/Date";

export default function Steps() {
  const internationalPackageType = localStorage.getItem(
    "internationalPackageType"
  );
  const navigate = useNavigate();
  const options = [];
  const categoryOptions = [];

  const scrollEffect = useRef(null);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [loader, setLoader] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const [id, setId] = useState({
    label: "", // delete, edit
    value: "",
  });
  const [addPackages, setAddPackages] = useState(false);
  const [stepNo, setStepNo] = useState(3);
  console.log("🚀 ~ Steps ~ stepNo:", stepNo);
  const [packagesData, setPackagesData] = useState({
    trackingNum: "",
    name: "",
    email: "",
    countryCode: "+92",
    phone: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    deliveryDate: "",
    note: "",
    categoryId: "",
    catText: "",
    eta: "",
    ecommerceCompanyId: "",
    ecommerceCompanyName: "",
  });

  const [summaryDetailData, setSummaryDetailData] = useState([]);

  const { data } = GetAPI("customer/getAllCategory");
  const { data: companiesData } = GetAPI("customer/idsforbooking");
  const { data: restrictedItems } = GetAPI("customer/restricteditems");

  companiesData?.data?.ecommerceCompanies?.map((obj, i) =>
    options.push({
      value: obj?.id,
      label: obj?.title,
    })
  );

  data?.data?.map((obj, i) =>
    categoryOptions.push({
      value: obj?.id,
      label: obj?.title,
    })
  );

  const onClose = () => {
    setModal(false);
    setAddPackages(true);
  };
  const onClose2 = () => {
    setModal2(false);
  };
  const onClose3 = () => {
    setModal3(false);
    setId({ label: "", value: "" });
  };

  const handleChange = (e) => {
    setPackagesData({ ...packagesData, [e.target.name]: e.target.value });
  };

  const handlePhone = (e) => {
    if (e.target.value.length < 11) {
      setPackagesData({ ...packagesData, phone: e.target.value });
    } else if (e.target.value.length > 10) {
      info_toaster("cannot exceed more than 10 digits");
    }
  };

  const handleCompanyName = (state) => {
    setPackagesData({
      ...packagesData,
      ecommerceCompanyId: state?.value,
      ecommerceCompanyName: state?.label,
    });
  };

  const handleCategoryName = (state) => {
    setPackagesData({
      ...packagesData,
      categoryId: state?.value,
      catText: state?.label,
    });
  };

  const handleETA = (e) => {
    setPackagesData({
      ...packagesData,
      eta: e.target.value,
      deliveryDate: e.target.value,
    });
  };

  const handleStep1 = () => {
    if (packagesData?.trackingNum === "") {
      info_toaster("Enter Tracking Number");
    } else if (packagesData?.ecommerceCompanyId === "") {
      info_toaster("Select Company Name");
    } else if (packagesData?.name === "") {
      info_toaster("Enter Name");
    } else if (packagesData?.email === "") {
      info_toaster("Enter Email");
    } else if (packagesData?.phone === "") {
      info_toaster("Enter Phone Number");
    } else if (
      packagesData?.phone.length < 10 ||
      packagesData?.phone.length > 10
    ) {
      info_toaster("Invalid Phone Number");
    } else {
      localStorage.setItem("sendParcelShipmentStepNo", 2);
      setStepNo(2);
      // setId({ label: "", value: "" });
    }
  };

  const handleStep2 = () => {
    if (packagesData?.trackingNum === "") {
      info_toaster("Enter Tracking Number");
    } else if (packagesData?.ecommerceCompanyId === "") {
      info_toaster("Select Company Name");
    } else if (packagesData?.name === "") {
      info_toaster("Enter Name");
    } else if (packagesData?.email === "") {
      info_toaster("Enter Email");
    } else if (packagesData?.phone === "") {
      info_toaster("Enter Phone Number");
    } else if (
      packagesData?.phone.length < 10 ||
      packagesData?.phone.length > 10
    ) {
      info_toaster("Invalid Phone Number");
    } else if (packagesData?.categoryId === "") {
      info_toaster("Select Category");
    } else if (packagesData?.width === "") {
      info_toaster("Enter width");
    } else if (packagesData?.height === "") {
      info_toaster("Enter height");
    } else if (packagesData?.length === "") {
      info_toaster("Enter Length");
    } else if (packagesData?.length > 119) {
      info_toaster("Length limits exceed");
    } else if (packagesData?.weight === "") {
      info_toaster("Enter weight");
    } else if (packagesData?.weight > 150) {
      info_toaster("weight limit exceeds");
    } else if (
      +packagesData?.length +
        2 * +packagesData?.height +
        2 * +packagesData?.width >
      165
    ) {
      info_toaster(
        "Incorrect Width and Height Values",
        packagesData?.length,
        " ",
        packagesData?.height,
        " ",
        packagesData?.width
      );
      console.log(
        "Incorrect Width and Height Values",
        packagesData?.length,
        " ",
        packagesData?.height,
        " ",
        packagesData?.width
      );
    } else if (packagesData?.eta === "") {
      info_toaster("select ETA date");
    } else if (packagesData?.eta === currentDate) {
      info_toaster("ETA cannot be current date");
    } else if (packagesData?.eta < currentDate) {
      info_toaster("ETA cannot be previous than current date");
    } else if (packagesData?.note === "") {
      info_toaster("Enter note");
    } else {
      const internationalPackagesData = JSON.parse(
        localStorage.getItem("internationalPackagesData")
      );
      if (id?.label === "edit") {
        internationalPackagesData[id?.value] = packagesData;
        localStorage.setItem(
          "internationalPackagesData",
          JSON.stringify(internationalPackagesData)
        );
        setSummaryDetailData(internationalPackagesData);
        success_toaster("Package updated Successfully");
        setStepNo(3);
      } else {
        if (internationalPackagesData.length === 0) {
          localStorage.setItem(
            "internationalPackagesData",
            JSON.stringify([packagesData])
          );
          setSummaryDetailData([packagesData]);
        } else {
          internationalPackagesData.push(packagesData);
          localStorage.setItem(
            "internationalPackagesData",
            JSON.stringify(internationalPackagesData)
          );
          setSummaryDetailData(internationalPackagesData);
        }
        localStorage.setItem("sendParcelShipmentStepNo", JSON.stringify(3));
        info_toaster("Package Added Successfully!");
        setStepNo(3);
      }
      setPackagesData({
        trackingNum: "",
        name: "",
        email: "",
        countryCode: "+92",
        phone: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        deliveryDate: "",
        note: "",
        categoryId: "",
        catText: "",
        eta: "",
        ecommerceCompanyId: "",
        ecommerceCompanyName: "",
      });
      setId({ label: "", value: "" });
    }
  };

  const handleAddAnotherPackage = () => {
    // const internationalPackagesData = JSON.parse(
    //   localStorage.getItem("internationalPackagesData")
    // );
    // if (internationalPackagesData.length === 0) {
    //   localStorage.setItem(
    //     "internationalPackagesData",
    //     JSON.stringify([packagesData])
    //   );
    // } else {
    //   internationalPackagesData.push(packagesData);
    //   localStorage.setItem(
    //     "internationalPackagesData",
    //     JSON.stringify(internationalPackagesData)
    //   );
    // }
    setPackagesData({
      trackingNum: "",
      name: "",
      email: "",
      countryCode: "+92",
      phone: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      deliveryDate: "",
      note: "",
      categoryId: "",
      catText: "",
      eta: "",
      ecommerceCompanyId: "",
      ecommerceCompanyName: "",
    });
    setStepNo(1);
    localStorage.setItem("sendParcelShipmentStepNo", JSON.stringify(1));
    setId({ value: "", label: "" });
  };

  const handleAddAddPackage = () => {
    setStepNo(1);
  };

  const handleUnderstand = () => {
    setModal(false);
    setAddPackages(true);
  };

  const handleDeletePackage = () => {
    setLoader(true);
    setTimeout(() => {
      const internationalPackagesData = JSON.parse(
        localStorage.getItem("internationalPackagesData")
      );
      internationalPackagesData.splice(id?.value, 1);
      localStorage.setItem(
        "internationalPackagesData",
        JSON.stringify(internationalPackagesData)
      );
      setSummaryDetailData(internationalPackagesData);
      setLoader(false);
      setModal3(false);
      success_toaster("Package deleted successfully");
      setId({ value: "", label: "" });
      setPackagesData({
        trackingNum: "",
        name: "",
        email: "",
        countryCode: "+92",
        phone: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        deliveryDate: "",
        note: "",
        categoryId: "",
        catText: "",
        eta: "",
        ecommerceCompanyId: "",
        ecommerceCompanyName: "",
      });
      if (internationalPackagesData.length === 0) {
        setStepNo(3);
      }
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const internationalPackagesData = JSON.parse(
      localStorage.getItem("internationalPackagesData")
    );

    if (addPackages) {
      const packagesData = [];
      internationalPackagesData?.map((pkg, i) =>
        packagesData.push({
          trackingNum: pkg?.trackingNum,
          name: pkg?.name,
          email: pkg?.email,
          countryCode: pkg?.countryCode,
          phone: pkg?.phone,
          weight: pkg?.weight,
          length: pkg?.length,
          width: pkg?.width,
          height: pkg?.height,
          deliveryDate: pkg?.deliveryDate,
          note: pkg?.note,
          categoryId: pkg?.categoryId,
          catText: pkg?.catText,
          eta: pkg?.eta,
          ecommerceCompanyId: pkg?.ecommerceCompanyId,
        })
      );
      setLoader(true);
      const res = await PostAPI("customer/createbookingint", {
        packages: packagesData,
        consolidate:
          internationalPackageType === "consolidation" ? true : false,
      });
      if (res?.data?.status === "1") {
        setModal2(true);
        setLoader(false);
        localStorage.removeItem("internationalPackageType");
        localStorage.setItem("internationalPackagesData", JSON.stringify([]));
        setPackagesData({
          trackingNum: "",
          name: "",
          email: "",
          countryCode: "+92",
          phone: "",
          weight: "",
          length: "",
          width: "",
          height: "",
          deliveryDate: "",
          note: "",
          categoryId: "",
          catText: "",
          eta: "",
          ecommerceCompanyId: "",
          ecommerceCompanyName: "",
        });
        setStepNo(3);
        setSummaryDetailData([]);
        setAddPackages(false);
        setOrderNo(res?.data?.data?.Order);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.error);
        setAddPackages(false);
      }
    } else if (internationalPackagesData.length > 0) {
      setModal(true);
    } else if (internationalPackagesData.length === 0) {
      localStorage.setItem("sendParcelShipmentStepNo", JSON.stringify(1));
      setStepNo(3);
    }
  };

  const handleDelete = (id) => {
    setId({
      label: "delete",
      value: id,
    });
    setModal3(true);
  };

  const handleEdit = (id) => {
    setId({ label: "edit", value: id });
    setStepNo(1);
    const internationalPackagesData = JSON.parse(
      localStorage.getItem("internationalPackagesData")
    );
    const editPackage = internationalPackagesData[id];
    setPackagesData(editPackage);
  };

  useEffect(() => {
    let internationalPackagesData = localStorage.getItem(
      "internationalPackagesData"
    );
    if (internationalPackagesData === null) {
      localStorage.setItem("internationalPackagesData", JSON.stringify([]));
    } else {
      internationalPackagesData = JSON.parse(internationalPackagesData);
      if (internationalPackagesData.length > 0) {
        setStepNo(3);
        localStorage.setItem("sendParcelShipmentStepNo", JSON.stringify(3));
        setSummaryDetailData(internationalPackagesData);
        const lastIndex = internationalPackagesData.length - 1;
        setPackagesData(internationalPackagesData[lastIndex]);
      }
    }
  }, []);

  useEffect(() => {
    if (scrollEffect.current) {
      scrollEffect.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stepNo]);

  return data.length === 0 && restrictedItems.length === 0 ? (
    <Loader />
  ) : (
    <div className={`bg-themebackground ${loader ? "h-screen" : "h-auto"}`}>
      <div className="h-16">
        <Navbar bgColor={"bg-theme"} bgOpacity={false} position={"fixed"} />
      </div>
      {loader && id.label !== "delete" ? (
        <div className="h-screen flex items-center justify-center">
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
                  stepNo === 1 || stepNo === 2 ? "bg-theme " : "bg-themeText"
                } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 1 || stepNo === 2
                      ? "text-themeText"
                      : "text-theme"
                  } text-3xl md:text-4xl`}
                >
                  1
                </p>
              </div>
              <p className="font-switzer text-lg font-semibold text-center">
                Parcel Detail
              </p>
            </div>
            {/* 2 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={` ${
                  stepNo === 2 ? "bg-theme" : "bg-themeText"
                } w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
              >
                <p
                  className={`${
                    stepNo === 2 ? "text-themeText" : "text-theme"
                  } text-3xl md:text-4xl`}
                >
                  2
                </p>
              </div>
              <p className="font-switzer text-lg font-semibold text-center">
                Delivery Info
              </p>
            </div>
            {/* 3 */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={` ${
                  stepNo === 3 ? "bg-theme" : "bg-themeText"
                }  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold font-switzer`}
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
                Summary Detail
              </p>
            </div>
          </div>

          {/* Summary detail */}
          {(stepNo === 1 || stepNo === 2 || stepNo === 3) && (
            <div
              ref={stepNo == 3 ? scrollEffect : null}
              className="space-y-4 font-switzer mx-auto"
            >
              <p className="font-bold text-2xl text-start">Summary Detail</p>

              <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md px-2 py-4 sm:p-5 space-y-4">
                {/* heading */}
                {summaryDetailData.length === 0 ? (
                  <p className="text-center text-xl text-themeRed">
                    No Package is Added yet !
                  </p>
                ) : (
                  summaryDetailData?.map((summary, i) => (
                    <div key={i} className="space-y-6 p-1 sm:p-5">
                      <div className="flex items-center font-semibold text-xl ">
                        <div className="h-10 w-10">
                          <img
                            loading="eager|lazy"
                            src="/images/box.webp"
                            alt="summary detail"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p>
                          <span className="text-themePlaceholder">Order#</span>
                          <span className="text-themePlaceholder text-opacity-40">
                            {" "}
                            {summary?.trackingNum}
                          </span>{" "}
                          <span className="text-theme">
                            ({i + 1}/{summaryDetailData.length})
                          </span>
                        </p>
                      </div>

                      {/* package detail */}
                      <div className="border border-borderColor p-5 rounded-md font-switzer">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold text-theme">
                              Package Detail
                            </p>
                            <div className="flex items-center gap-x-2">
                              <MdOutlineModeEdit
                                onClick={() => handleEdit(i)}
                                size={"30px"}
                                color="#00538C"
                                className="cursor-pointer"
                              />
                              <RiDeleteBinLine
                                onClick={() => handleDelete(i)}
                                size={"30px"}
                                color="#F30B0B"
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                          <div className="space-y-1 font-switzer text-themePlaceholder [&>p]:flex [&>p]:justify-between">
                            <p>
                              <span className="text-opacity-60">
                                Company Name
                              </span>{" "}
                              <span className="font-semibold">
                                {summary?.ecommerceCompanyName}
                              </span>
                            </p>
                            <p>
                              <span className="text-opacity-60">
                                Tracking Number
                              </span>{" "}
                              <span className="font-semibold">
                                {summary?.trackingNum}
                              </span>
                            </p>
                            <p>
                              <span className="text-opacity-60">Category</span>{" "}
                              <span className="font-semibold">
                                {summary?.catText}
                              </span>
                            </p>
                            <p>
                              <span className="text-opacity-60">WxHxL</span>{" "}
                              <span className="font-semibold">
                                {summary?.width}x{summary?.height}x
                                {summary?.length}
                              </span>
                            </p>
                            <p>
                              <span className="text-opacity-60">Weight</span>{" "}
                              <span className="font-semibold">
                                {summary?.weight} lb
                              </span>
                            </p>
                            <p>
                              <span className="text-opacity-60">ETA</span>{" "}
                              <span className="font-semibold">
                                {summary?.eta}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* buttons */}

                <div className="space-y-4">
                  {summaryDetailData.length === 0 ? (
                    <button
                      type="button"
                      onClick={handleAddAddPackage}
                      className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border-2 border-theme"
                    >
                      Add Package
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddAnotherPackage}
                      className={`${
                        internationalPackageType === "single"
                          ? "hidden"
                          : "block"
                      } w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border-2 border-theme`}
                    >
                      Add another package
                    </button>
                  )}

                  {summaryDetailData.length >= 1 && (
                    <button
                      onClick={handleSubmit}
                      disabled={summaryDetailData.length === 0 ? true : false}
                      className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border-2 border-theme disabled:cursor-not-allowed"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* tracking Info start */}
          {(stepNo === 1 || stepNo === 2) && (
            <div
              ref={stepNo === 1 ? scrollEffect : null}
              className="space-y-4 font-switzer mx-auto"
            >
              <p className="font-bold text-2xl text-start">Tracking Info</p>
              <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="trackingNum">Company Tracking Number*</label>
                  <input
                    type="text"
                    name="trackingNum"
                    id="trackingNum"
                    onChange={handleChange}
                    value={packagesData?.trackingNum}
                    className={`${inputStyle}`}
                    placeholder="Enter your trackig number"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="">Company Name*</label>
                  <Select
                    value={
                      packagesData?.ecommerceCompanyId
                        ? {
                            value: packagesData?.ecommerceCompanyId,
                            label: packagesData?.ecommerceCompanyName,
                          }
                        : null
                    }
                    onChange={(state) => handleCompanyName(state) || null}
                    options={options}
                    placeholder="Select Company Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="name">Name on parcel*</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={packagesData?.name}
                    className={`${inputStyle}`}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={packagesData?.email}
                    className={`${inputStyle}`}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phoneNum">Phone No.</label>
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
                      onChange={(phone) =>
                        setPackagesData({ ...packagesData, countryCode: phone })
                      }
                      className="col-span-1"
                    />
                    <input
                      onChange={handlePhone}
                      name="phone"
                      id="phone"
                      type="number"
                      maxLength={10}
                      value={packagesData?.phone}
                      className={`!w-full resize-none font-switzer text-sm px-4  placeholder:text-[#000000] placeholder:text-opacity-60 py-3 rounded-md focus:outline-none bg-themegray border border-borderColor`}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <button
                    // disabled={stepNo > 1}
                    onClick={handleStep1}
                    className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
                   enabled:hover:text-theme enabled:hover:bg-transparent border enabled:hover:border-theme disabled:cursor-not-allowed"
                  >
                    {id?.label === "edit" ? "Next" : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Package Details */}
          {stepNo === 2 && (
            <div
              ref={stepNo == 2 ? scrollEffect : null}
              className="space-y-4 font-switzer  mx-auto"
            >
              <p className="font-bold text-2xl text-start">Package Details</p>
              <div className="border border-borderColor border-opacity-60 bg-bgForm rounded-md p-5 space-y-4 ">
                <div className="space-y-1">
                  <div className="space-y-1">
                    <label htmlFor="">Category*</label>
                    <Select
                      value={
                        packagesData?.categoryId
                          ? {
                              value: packagesData?.categoryId,
                              label: packagesData?.catText,
                            }
                          : null
                      }
                      onChange={(state) => handleCategoryName(state) || null}
                      options={categoryOptions}
                      placeholder="Select Category"
                    />
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
                        onChange={handleChange}
                        value={packagesData?.width}
                        className={`${inputStyle}`}
                        placeholder="Enter Width"
                      />
                      <p className="absolute right-2 text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                        inch
                      </p>
                    </div>
                  </div>
                  <div className="text-start space-y-1">
                    <label htmlFor="height">Height</label>
                    <div className="relative flex items-center justify-end">
                      <input
                        type="number"
                        name="height"
                        id="height"
                        onChange={handleChange}
                        value={packagesData?.height}
                        className={`${inputStyle}`}
                        placeholder="Enter Height"
                      />
                      <p className="absolute right-2 text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                        inch
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="text-start space-y-1">
                    <label htmlFor="length" className="">
                      Length*
                    </label>
                    <div className="relative flex items-center justify-end">
                      <input
                        type="number"
                        name="length"
                        id="length"
                        onChange={handleChange}
                        value={packagesData?.length}
                        className={`${inputStyle}`}
                        placeholder="Enter Length"
                      />
                      <p className="absolute right-2 text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                        inch
                      </p>
                    </div>
                  </div>
                  <div className="text-start space-y-1">
                    <label htmlFor="weight">Weight*</label>
                    <div className="relative flex items-center justify-end">
                      <input
                        type="number"
                        name="weight"
                        id="weight"
                        onChange={handleChange}
                        value={packagesData?.weight}
                        className={`${inputStyle}`}
                        placeholder="Enter Weight"
                      />
                      <p className="absolute right-2 text-[#000000] text-opacity-60 bg-bgForm rounded-md px-2 border">
                        lbs
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="eta">ETA</label>
                  <input
                    type="date"
                    name=""
                    id=""
                    value={packagesData?.eta}
                    onChange={handleETA}
                    className={`${inputStyle}`}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="note">Add Note*</label>
                  <textarea
                    name="note"
                    id="note"
                    rows="4"
                    onChange={handleChange}
                    value={packagesData?.note}
                    placeholder="Text here"
                    className="w-full font-switzer text-sm px-4 border py-3 placeholder:text-[#000000] placeholder:text-opacity-60  rounded-md outline-none bg-themegray border-borderColor"
                  />
                </div>

                <div>
                  <button
                    disabled={stepNo > 2}
                    onClick={handleStep2}
                    className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             enabled:hover:text-theme enabled:hover:bg-transparent border enabled:hover:border-theme disabled:cursor-not-allowed"
                  >
                    {id?.label === "edit" ? "Update" : "Add Package"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* footer */}
      <div className="bg-theme">
        <Footer />
      </div>
      {/* footer */}

      <Modal
        isOpen={modal}
        onClose={onClose}
        isCentered
        size={window.innerWidth < 768 ? "sm" : "xl"}
        motionPreset="slideInTop"
        closeOnOverlayClick={false}
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
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 py-4 md:py-5">
                  {restrictedItems?.data?.itemsList?.map((item, i) => (
                    <div
                      key={i}
                      className="space-y-2 flex flex-col items-center"
                    >
                      <div key={i}>
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
                    onClick={handleUnderstand}
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

      <Modal
        isOpen={modal2}
        onClose={onClose2}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "sm" : "md"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody className="space-y-8">
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
                Your Order is Created
              </p>
              <p className="text-themePlaceholder text-opacity-60 text-center w-[70%]">
                You order({orderNo}) has been added successfully
              </p>
            </div>
            <div className="flex flex-col gap-y-5 py-8 w-full">
              <button
                onClick={() => {
                  setModal2(false);
                  navigate("/send-parcel");
                }}
                className="w-full py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
             hover:text-theme hover:bg-transparent border hover:border-theme"
              >
                ok
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modal3}
        onClose={onClose3}
        isCentered
        motionPreset="slideInBottom"
        size={window.innerWidth < 768 ? "xs" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!loader && (
              <div className="font-bold text-lg md:text-xl !font-switzer pt-5">
                Are you sure you want to delete this package ?
              </div>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loader ? (
              <MiniLoader />
            ) : (
              <div className="grid grid-cols-2 gap-x-4 pb-5">
                <button
                  onClick={() => setModal(false)}
                  className="w-full py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
                   hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePackage}
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
    </div>
  );
}
