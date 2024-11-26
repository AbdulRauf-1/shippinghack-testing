import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
} from "@chakra-ui/react";
import { Slider } from "primereact/slider";
import { MdKeyboardArrowDown } from "react-icons/md";
import { SlCalculator } from "react-icons/sl";
import Navbar from "../internationalShipping/navbar/Navbar";
import Footer from "../../components/Footer";
import { inputStyle } from "../../utilities/Style";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import MiniLoader from "../../components/MiniLoader";
import CalculationCard from "../../components/CalculationCard";
import Loader from "../../components/Loader";

export default function ShippingCalculator() {
  const options = [
    { value: "puerto", label: "Puerto Rico" },
    { value: "USA", label: "USA" },
  ];
  const options2 = [{ value: "puerto", label: "Puerto Rico" }];
  const shippingTypeOptions = [
    { value: "International", label: "International" },
    { value: "Local", label: "Local" },
  ];

  const [calculationData, setCalculationData] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
  });
  const [origin, setOrigin] = useState({ value: "", label: "" });
  const [destination, setDestination] = useState({ value: "", label: "" });
  const [shipmentType, setShipmentType] = useState({ value: "", label: "" });

  const [loading, setLoading] = useState("");

  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

  const onClose = () => {
    setModal(false);
  };

  const handleChange = (e) => {
    setCalculationData({ ...calculationData, [e.target.name]: e.target.value });
  };

  const handleCalculate = async () => {
    // if (origin?.value === "") {
    //   info_toaster("select origin");
    // } else if (destination?.value === "") {
    //   info_toaster("select destination");
    // } else
    const AddAnotherPackageData = JSON.parse(
      localStorage.getItem("AddAnotherPackageData")
    );
    if (AddAnotherPackageData.length > 0) {
      calculate(AddAnotherPackageData);
    } else {
      if (calculationData?.weight === "") {
        info_toaster("Enter weight");
      } else if (calculationData?.weight <= 0) {
        info_toaster("Invalid weight value");
      } else if (calculationData?.length === "") {
        info_toaster("Enter length");
      } else if (calculationData?.length <= 0) {
        info_toaster("Invalid length value");
      } else if (calculationData?.width === "") {
        info_toaster("Enter Width");
      } else if (calculationData?.width <= 0) {
        info_toaster("Invalid width value");
      } else if (calculationData?.height === "") {
        info_toaster("Enter Height");
      } else if (calculationData?.height <= 0) {
        info_toaster("Enter height value");
      } else {
        const AddAnotherPackageData = JSON.parse(
          localStorage.getItem("AddAnotherPackageData")
        );
        if (AddAnotherPackageData.length === 0) {
          calculate([calculationData]);
        } else {
          AddAnotherPackageData.push(calculationData);
          calculate(AddAnotherPackageData);
        }
      }
    }
  };

  const calculate = async (packages) => {
    if (shipmentType.value === "") {
      info_toaster("Select Shipment Type");
    } else {
      setLoading("calculation");
      const res = await PostAPI("customer/shippingCalculater", {
        origin: origin?.value,
        destination: destination?.value,
        packages: packages,
        bookingType: shipmentType?.value, //International || Local
      });
      if (res?.data?.status === "1") {
        setData(res?.data?.data?.arryofCompanies);
        setModal(true);
        setLoading("");
        setCalculationData({
          weight: "",
          length: "",
          width: "",
          height: "",
        });
        setOrigin({ value: "", label: "" });
        setDestination({ value: "", label: "" });
        setShipmentType({ value: "", label: "" });
        localStorage.setItem("AddAnotherPackageData", JSON.stringify([]));
        success_toaster(res?.data?.message);
      } else {
        setLoading("");
        error_toaster(res?.data?.error);
      }
    }
  };

  const handleAddAnotherPackage = () => {
    if (calculationData?.weight === "") {
      info_toaster("Enter weight");
    } else if (calculationData?.length === "") {
      info_toaster("Enter length");
    } else if (calculationData?.width === "") {
      info_toaster("Enter width");
    } else if (calculationData?.height === "") {
      info_toaster("Enter height");
    } else {
      const AddAnotherPackageData = JSON.parse(
        localStorage.getItem("AddAnotherPackageData")
      );
      if (AddAnotherPackageData.length === 0) {
        localStorage.setItem(
          "AddAnotherPackageData",
          JSON.stringify([calculationData])
        );
        success_toaster("package added successfully");
      } else {
        AddAnotherPackageData.push(calculationData);
        localStorage.setItem(
          "AddAnotherPackageData",
          JSON.stringify(AddAnotherPackageData)
        );
        success_toaster("package added successfully");
      }
      setCalculationData({
        weight: "",
        length: "",
        width: "",
        height: "",
      });
    }
  };

  const handleShipmentType = (val) => {
    setShipmentType(val);
    if (val?.label === "International") {
      setOrigin({ value: "USA", label: "USA" });
      setDestination({ value: "puerto", label: "Puerto Rico" });
    } else {
      setOrigin({ value: "puerto", label: "Puerto Rico" });
      setDestination({ value: "puerto", label: "Puerto Rico" });
    }
  };

  useEffect(() => {
    let AddAnotherPackageData = localStorage.getItem("AddAnotherPackageData");
    if (AddAnotherPackageData === null) {
      localStorage.setItem("AddAnotherPackageData", JSON.stringify([]));
    } else {
      AddAnotherPackageData = JSON.parse(AddAnotherPackageData);
      if (AddAnotherPackageData.length > 0) {
        const lastIndex = AddAnotherPackageData.length - 1;
        setCalculationData(AddAnotherPackageData[lastIndex]);
      }
    }
    setLoading("start");
    setTimeout(() => {
      setLoading("");
    }, 200);
  }, []);

  return loading === "start" ? (
    <Loader />
  ) : (
    <div>
      {/* welcome to our shipping calculator start */}
      <div className="bg-theme">
        <div className="h-16">
          <Navbar bgColor={"bg-theme"} bgOpacity={false} position={"fixed"} />
        </div>
        <div className="lg:w-[90%] xl:w-4/5 mx-auto px-8 lg:px-20 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-6 md:pb-8 lg:pb-10 space-y-4">
          <p className="font-helvetica font-bold text-3xl md:text-4xl text-white">
            Welcome to our shipping calculator
          </p>
          <p className="font-switzer font-medium md:text-xl text-themeText">
            Which of our warehouses will be shipping your package?
          </p>
          <p className="font-switzer font-medium text-themeText text-opacity-80 hidden lg:block">
            For a precise cost estimate, kindly input the package weight,
            dimensions, and value. Explore our locations page to discover which
            warehouse best suits your needs. Shipping estimates exclude service
            fees, customs duties, and taxes. Delivery times provided are
            estimates and may vary, excluding customs processing duration.
            Customs procedures vary by country; contact your local customs
            office for accurate estimates. Please select a warehouse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-y-8 md:gap-x-4 font-switzer xl:w-4/5 py-5">
            <div className="flex flex-col gap-y-2 font-normal  w-full">
              <label htmlFor="shipmentType" className="text-themeText text-xs">
                Shipment Type*
              </label>
              <Select
                onChange={(val) => handleShipmentType(val) || null}
                options={shippingTypeOptions}
                value={shipmentType?.value ? shipmentType : null}
                placeholder="Select Shipment Type"
              />
            </div>
            <div className="flex flex-col gap-y-2 font-normal  w-full">
              <label htmlFor="from" className="text-themeText text-xs">
                Origin*
              </label>
              {/* <Select
                defaultValue={{ value: "USA", label: "USA" }}
                onChange={setOrigin || null}
                options={options}
                isDisabled
                value={origin.value ? origin : null}
                placeholder="Your Origin"
              /> */}
              <div className="bg-themegray rounded-md px-5 py-2 h-full w-full">
                {origin?.label ? origin?.label : "Origin"}
              </div>
            </div>
            <div className="flex flex-col gap-y-2 font-normal w-full">
              <label htmlFor="to" className="text-themeText text-xs">
                Destination*
              </label>
              {/* <Select
                defaultValue={{ value: "puerto", label: "Puerto Rico" }}
                onChange={setDestination || null}
                options={options2}
                value={destination.value ? destination : null}
                placeholder="Your Destination"
              /> */}
              <div className="bg-themegray rounded-md px-5 py-2 h-full w-full">
                {destination?.label ? destination?.label : "Destination"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* welcome to our shipping calculator end */}

      {/* center portion start */}
      <div
        className={`bg-themeText ${
          loading ? "py-32" : "py-6 sm:py-8 md:py-10 lg:py-12"
        } xl:px-20`}
      >
        {loading === "calculation" ? (
          <MiniLoader />
        ) : (
          <div className="px-8 xl:w-4/5 mx-auto space-y-6">
            {/* choose shipping compnay start */}
            {/* <div className="space-y-8">
            <p className="font-switzer font-medium text-opacity-80 text-3xl">
              Choose Shipping Company
            </p>
            <div className="flex items-end gap-x-16">
              <div className="text-center space-y-4">
                <div>
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/Fedex.webp"
                    alt="fedex"
                    className="w-36 h-16 bg-contain"
                  />
                </div>
                <Radio size={"lg"} />
              </div>
              <div className="text-center space-y-9">
                <div>
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/DHL.webp"
                    alt="DHL"
                    className="w-36 h-8 bg-contain"
                  />
                </div>
                <Radio size={"lg"} />
              </div>
            </div>
          </div> */}
            {/* choose shipping company end */}

            {/* Choose a common Item to ship start */}
            {/* <div className="space-y-8">
            <p className="font-switzer font-medium text-opacity-80 text-3xl">
              Choose a common item to ship
            </p>
            <div className="flex items-end gap-x-10 font-semibold">
              <div className="text-center space-y-4 ">
                <div className="flex justify-center">
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/t-shirt.webp"
                    alt="fedex"
                    className="w-20 h-20 bg-contain"
                  />
                </div>
                <Radio size={"lg"} style={{}}>
                  T-Shirt
                </Radio>
              </div>
              <div className="text-center space-y-4 ">
                <div className="flex justify-center">
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/jeans.webp"
                    alt="fedex"
                    className="w-20 h-20 bg-contain"
                  />
                </div>
                <Radio size={"lg"} style={{}}>
                  Jeans
                </Radio>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/sneakers.webp"
                    alt="fedex"
                    className="w-20 h-20 bg-contain"
                  />
                </div>
                <Radio size={"lg"} style={{}}>
                  Sneakers
                </Radio>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/mobile.webp"
                    alt="fedex"
                    className="w-20 h-20 bg-contain"
                  />
                </div>
                <Radio size={"lg"} style={{}}>
                  Smart Phone
                </Radio>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/tablet.webp"
                    alt="fedex"
                    className="w-20 h-20 bg-contain"
                  />
                </div>
                <Radio size={"lg"} style={{}}>
                  Tablet
                </Radio>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/laptop.webp"
                    alt="fedex"
                    className="w-20 h-20 bg-contain"
                  />
                </div>
                <Radio size={"lg"} style={{}}>
                  Laptop
                </Radio>
              </div>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {" "}
                  <img
                  loading="eager|lazy"
                    src="/images/large.webp"
                    alt="fedex"
                    className="w-20 h-20 bg-contain"
                  />
                </div>
                <Radio size={"lg"} style={{}}>
                  Large Items
                </Radio>
              </div>
            </div>
          </div> */}
            {/* Choose a common Item to ship end */}

            {/* <p className="font-switzer font-light text-themeRed">
            *Please keep in mind that prices may vary and are Subject to change
          </p> */}

            {/* shipping weight start */}
            <div className="space-y-5 pb-2 sm:pb-4">
              <p className="font-switzer font-light text-2xl sm:text-xl">
                Shipping Weight
              </p>
              <div className="flex items-center gap-x-2 sm:gap-x-3 md:gap-x-4">
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={calculationData?.weight}
                  onChange={handleChange}
                  className="placeholder:text-themePlaceholder 
                    placeholder:text-opacity-60 font-switzer border border-borderColor w-16 sm:w-20 text-2xl py-2 text-end pr-3 rounded-md"
                  placeholder="0.0"
                />
                <p className="max-md:pr-1 flex items-center">
                  lbs{" "}
                  <span>
                    <MdKeyboardArrowDown size={12} />
                  </span>
                </p>
                <div className="relative w-full">
                  <div
                    className="absolute
                    opacity-60 font-switzer text-xs left-0 top-full pt-1 text-themePlaceholder"
                  >
                    {calculationData?.weight ? calculationData?.weight : 0} lbs
                  </div>
                  <Slider
                    onChange={(e) =>
                      setCalculationData({
                        ...calculationData,
                        weight: e.value,
                      })
                    }
                    className="h-2"
                    value={calculationData?.weight}
                    color="#00538C"
                  />
                </div>
              </div>

              {/* <div className="flex items-center gap-x-4">
              <p className="font-light font-switzer text-themePlaceholder">
                Package Value
              </p>
              <div>
                <span className="font-light font-switzer text-themePlaceholder opacity-60 pr-1">
                  $
                </span>
                <input
                  type="text"
                  name=""
                  id=""
                  className="placeholder:text-themePlaceholder 
                    placeholder:text-opacity-60 font-switzer border border-borderColor w-52 text-lg py-2 text-end pr-3 rounded-md"
                  placeholder="0.0"
                />
              </div>
              <p className="text-lg font-switzer text-themePlaceholder ">USD</p>
            </div> */}

              {/* <div className="flex gap-x-4 items-center">
              <p className="font-light font-switzer text-themePlaceholder">
                Package Dimensions
              </p>
              <input type="checkbox" name="" id="" className="h-4 w-4" />
            </div> */}

              {/* <p className="font-light text-themePlaceholder opacity-60 text-xs font-switzer">
              Please Check box to enter package dimensions.
            </p> */}
            </div>
            {/* shipping weight end */}

            {/*  */}
            <div className="bg-themebackground rounded-md px-4 py-8 sm:p-8 space-y-10">
              {/* <div className="flex gap-x-10 items-center">
              <Radio
                size={"md"}
                style={{ border: "2px solid #000000", opacity: "0.6" }}
              >
                cm
              </Radio>
              <Radio
                size={"md"}
                style={{ border: "2px solid #000000", opacity: "0.6" }}
              >
                inch
              </Radio>
            </div> */}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:gap-x-4 lg:gap-x-10">
                <div className="space-y-12 xl:space-y-14 col-span-2">
                  {/* length */}
                  <div className="flex items-center gap-x-4 sm:gap-x-8 lg:gap-x-10">
                    <div className="relative">
                      <p className="absolute font-switzer text-opacity-60 text-themePlaceholder  bottom-full left-0">
                        Length
                      </p>
                      <input
                        type="number"
                        name="length"
                        id="length"
                        value={calculationData?.length}
                        onChange={handleChange}
                        className="placeholder:text-themePlaceholder 
                    placeholder:text-opacity-60 font-switzer border border-borderColor w-16 sm:w-20 text-2xl py-2 text-end pr-3 rounded-md"
                        placeholder="0"
                      />
                    </div>
                    <div className="relative w-full">
                      <div
                        className="absolute
                    opacity-60 border-[1px] border-theme rounded-md px-2.5 py-1.5 font-switzer text-xs -left-2 top-full mt-4 text-themePlaceholder"
                      >
                        {calculationData?.length ? calculationData?.length : 0}{" "}
                        in
                      </div>
                      <Slider
                        onChange={(e) =>
                          setCalculationData({
                            ...calculationData,
                            length: e.value,
                          })
                        }
                        className="w-full h-2"
                        value={calculationData?.length}
                        color="#00538C"
                      />
                    </div>
                  </div>
                  {/* width */}
                  <div className="flex items-center gap-x-4 sm:gap-x-8 lg:gap-x-10">
                    <div className="relative">
                      <p className="absolute font-switzer text-opacity-60 text-themePlaceholder  bottom-full left-0">
                        Width
                      </p>
                      <input
                        type="number"
                        name="width"
                        id="width"
                        value={calculationData?.width}
                        onChange={handleChange}
                        className="placeholder:text-themePlaceholder 
                    placeholder:text-opacity-60 font-switzer border border-borderColor w-16 sm:w-20 text-2xl py-2 text-end pr-3 rounded-md"
                        placeholder="0"
                      />
                    </div>
                    <div className="relative w-full">
                      <div
                        className="absolute
                    opacity-60 border-[1px] border-theme rounded-md px-2.5 py-1.5 font-switzer text-xs -left-2 top-full mt-4 text-themePlaceholder"
                      >
                        {calculationData?.width ? calculationData?.width : 0} in
                      </div>
                      <Slider
                        onChange={(e) =>
                          setCalculationData({
                            ...calculationData,
                            width: e.value,
                          })
                        }
                        className="w-full h-2"
                        value={calculationData?.width}
                        color="#00538C"
                      />
                    </div>
                  </div>
                  {/* height */}
                  <div>
                    <div className="flex items-center gap-x-4 sm:gap-x-8 lg:gap-x-10">
                      <div className="relative">
                        <p className="absolute font-switzer text-opacity-60 text-themePlaceholder bottom-full left-0">
                          Height
                        </p>
                        <input
                          type="number"
                          name="height"
                          id="height"
                          value={calculationData?.height}
                          onChange={handleChange}
                          className="placeholder:text-themePlaceholder 
                    placeholder:text-opacity-60 font-switzer border border-borderColor w-16 sm:w-20 text-2xl py-2 text-end pr-3 rounded-md"
                          placeholder="0"
                        />
                      </div>
                      <div className="relative w-full">
                        <div
                          className="absolute 
                    font-switzer text-xs -left-2 top-full mt-4"
                        >
                          <p className="text-themePlaceholder px-2.5 h-auto py-1.5 border-[1px] border-theme rounded-md opacity-60">
                            {calculationData?.height
                              ? calculationData?.height
                              : 0}{" "}
                            in
                          </p>
                        </div>

                        <Slider
                          onChange={(e) =>
                            setCalculationData({
                              ...calculationData,
                              height: e.value,
                            })
                          }
                          className="w-full h-2"
                          value={calculationData?.height}
                          color="#00538C"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 max-md:pt-10 md:col-span-1 ">
                  <img
                    loading="eager|lazy"
                    src="/images/package-size.webp"
                    alt="packagsize"
                    className="bg-contain h-full w-full"
                  />
                </div>
              </div>
            </div>
            {/*  */}

            <div className="h-full flex flex-col justify-between items-center gap-y-3 sm:gap-y-5 md:gap-y-7 lg:gap-y-8">
              <button
                onClick={handleAddAnotherPackage}
                className="font-switzer sm:text-lg lg:text-xl text-theme "
              >
                + ADD ANOTHER PACKAGE
              </button>
              <button
                onClick={handleCalculate}
                className="w-48 sm:w-52 md:w-56 lg:w-60 border-[2px] border-theme bg-theme flex justify-center items-center gap-x-2
                      rounded-md py-2.5 md:py-3 text-themeText font-switzer text-sm hover:text-theme hover:bg-themeText"
              >
                <SlCalculator size={18} /> CALCULATE
              </button>
            </div>
          </div>
        )}
      </div>
      {/* center portion end */}

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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center font-switzer text-themePlaceholder text-opacity-80 text-2xl border-b">
            Calculations
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="space-y-4 py-5">
              {data?.map((company, i) => (
                <CalculationCard company={company} />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="w-32 py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
              >
                Cancel
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
