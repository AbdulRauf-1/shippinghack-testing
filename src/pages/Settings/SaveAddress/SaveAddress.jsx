import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout";
import { Autocomplete, GoogleMap, MarkerF } from "@react-google-maps/api";
import { inputStyle } from "../../../utilities/Style";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Select from "react-select";
import { MdOutlineCancel } from "react-icons/md";
import GetAPI from "../../../utilities/GetAPI";
import Loader from "../../../components/Loader";
import SaveAddressCard from "../../../components/SaveAddressCard";
import MiniLoader from "../../../components/MiniLoader";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import { BASE_URL } from "../../../utilities/URL";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SaveAddress() {
  const containerStyle = {
    width: "100%",
    height: "300px",
    marginBottom: "12px",
  };
  const options = [
    {
      value: "dropoff",
      label: "Dropoff Address",
    },
    {
      value: "pickup",
      label: "Pickup Address",
    },
  ];
  const [address, setAddress] = useState({
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
  });
  console.log("🚀 ~ SaveAddress ~ address:", address);
  const [center, setCenter] = useState({ lat: 40.712776, lng: -74.005974 });
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState("");
  const [addressId, setAddressId] = useState("");
  const [addressType, setAddressType] = useState({
    value: "",
    label: "",
  });
  const [description, setDescription] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(center);
  const autocompleteRef = useRef(null);
  const geocoder = useRef(null);
  const mapRef = useRef(null);

  const { data, reFetch } = GetAPI("customer/getattachaddresses");

  const onClose = () => {
    setModal(true);
  };

  // const getAddressComponent = (components, types) => {
  //   const component = components.find((component) =>
  //     component.types.some((type) => types.includes(type))
  //   );
  //   return component ? component.long_name : "";
  // };

  const handleLocationData = (lat, lng) => {
    geocoder.current.geocode(
      { location: { lat, lng } },
      async (results, status) => {
        if (status === "OK" && results.length > 0) {
          const components = results[0].address_components;

          let postalCode = null;

          for (const addresses of results) {
            const addressesData = addresses?.address_components;
            postalCode = getAddressComponent(addressesData, ["postal_code"]);
            if (postalCode) {
              break;
            }
          }
          setFormattedAddress(results[0].formatted_address);
          setAddress({
            ...address,
            lat,
            lng,
            postalCode: postalCode || "",
            country: getAddressComponent(components, ["country"]),
            province: getAddressComponent(components, [
              "administrative_area_level_1",
            ]),
            city: getAddressComponent(components, [
              "locality",
              "sublocality",
              "administrative_area_level_2",
            ]),
            district: getAddressComponent(components, [
              "sublocality_level_1",
              "neighborhood",
              "administrative_area_level_3",
            ]),
            streetAddress: results[0].formatted_address.split(",")[0],
          });
        } else {
          console.error("Geocoder error:", status);
          setFormattedAddress("");
          setAddress({
            ...address,
            lat,
            lng,
            postalCode: "Not Available",
            country: null,
            province: null,
            city: null,
            district: null,
            streetAddress: "",
          });
        }
      }
    );
  };

  const calculateRoute = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.address_components) {
      return;
    }
    // const components = place.address_components;
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    setMarkerPosition({ lat, lng });
    handleLocationData(lat, lng);
  };

  const getAddressComponent = (components, types) => {
    for (const component of components) {
      if (types.some((type) => component.types.includes(type))) {
        return component.long_name;
      }
    }
    return null;
  };

  // const getDynamicPostalCode = async (lat, lng) => {
  //   try {
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=postal_code&key=AIzaSyAVYbP2F93xvY4i59UVNfAfYR62dmbKNFA`
  //     );
  //     const data = await response.json();
  //     console.log("Full API Response: ", data);

  //     if (data.status === "OK" && data.results.length > 0) {
  //       const components = data.results[0].address_components;
  //       console.log("Address Components: ", components);

  //       const postalCode = getAddressComponent(components, ["postal_code"]);
  //       if (!postalCode) {
  //         // Fallback: Extract from formatted_address
  //         const formattedAddress = data.results[0].formatted_address;
  //         console.log("Formatted Address: ", formattedAddress);

  //         const postalCodeFromAddress = formattedAddress.match(/\b\d{5,6}\b/);
  //         return postalCodeFromAddress
  //           ? postalCodeFromAddress[0]
  //           : "Not Available";
  //       }
  //       return postalCode;
  //     } else {
  //       console.error("Geocoding API error:", data.status);
  //       return "Not Available";
  //     }
  //   } catch (error) {
  //     console.error("Error fetching postal code:", error);
  //     return "Not Available";
  //   }
  // };

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      setMarkerPosition({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    }
  };

  const handleDragEnd = () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter(); // Get the map's current center
    const lat = center.lat();
    const lng = center.lng();
    handleLocationData(lat, lng);
  };

  const handleDelete = (addressId) => {
    setModal(true);
    setAddressId(addressId);
  };

  const handleDeleteAddress = async () => {
    setLoading("mini");
    const res = await PostAPI("customer/unattachaddress", {
      attchedAddressId: addressId,
    });
    if (res?.data?.status === "1") {
      setLoading("");
      setModal(false);
      reFetch();
      success_toaster(res?.data?.message);
    } else {
      error_toaster(res?.data?.error);
      setLoading("");
    }
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address?.lat === "" || address?.lng === "") {
      info_toaster("Select Address on Map");
    } else if (addressType?.value === "") {
      info_toaster("Select address type");
    } else if (address?.title === "") {
      info_toaster("Enter address title");
    } else if (address?.country === "") {
      info_toaster("Enter country name");
    } else if (address?.city === "") {
      info_toaster("Enter city name");
    } else if (address?.province === "") {
      info_toaster("Enter state name");
    } else if (address?.streetAddress === "") {
      info_toaster("Enter Street Address");
    }
    // else if (address?.building === "") {
    //   info_toaster("Enter building no");
    // } else if (address?.floor === "") {
    //   info_toaster("Enter Floor no");
    // } else if (address?.apartment === "") {
    //   info_toaster("Enter apartment");
    // }
    else if (address?.postalCode === "") {
      info_toaster("Enter Postal Code");
    } else if (description === "") {
      info_toaster("Enter description");
    } else if (address?.city === "") {
      info_toaster("City cannot be empty");
    } else {
      setLoading("main");
      const res = await PostAPI("customer/attachaddress", {
        type: addressType?.value,
        addressData: {
          title: address?.title,
          streetAddress: address?.streetAddress,
          building: address?.building,
          floor: address?.floor,
          apartment: address?.apartment,
          district: address?.district,
          city: address?.city,
          province: address?.province,
          country: address?.country,
          postalCode: address?.postalCode,
          lat: address?.lat,
          lng: address?.lng,
        },
      });
      if (res?.data?.status === "1") {
        setLoading("");
        reFetch();
        setAddress({
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
        });
        setDescription("");
        success_toaster(res?.data?.message);
      } else {
        error_toaster(res?.data?.error);
        setLoading("");
      }
    }
  };

  const handleAddressType = (val) => {
    if (val?.value === "pickup") {
      setCenter({ lat: 39.8283, lng: -98.5795 });
      setMarkerPosition({ lat: 39.8283, lng: -98.5795 });
    } else {
      setCenter({ lat: 18.200178, lng: -66.664513 });
      setMarkerPosition({ lat: 18.200178, lng: -66.664513 });
    }
    setAddressType(val);
  };

  useEffect(() => {
    if (!geocoder.current) {
      geocoder.current = new window.google.maps.Geocoder();
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMarkerPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.error("Error retrieving location");
      }
    );
  }, []);

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      button={true}
      buttonText="Back"
      buttonIcon={<IoMdArrowRoundBack size={"20px"} />}
      title="Add Address"
      rightSide={
        <div className="space-y-8">
          {loading === "main" ? (
            <MiniLoader />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6 md:gap-x-8 lg:gap-x-10"
            >
              {/* left side */}
              <div className="space-y-5">
                <div>
                  <GoogleMap
                    zoom={12}
                    center={center}
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    onLoad={(map) => (mapRef.current = map)}
                    onCenterChanged={handleCenterChanged}
                    onDragEnd={handleDragEnd}
                  >
                    <MarkerF position={markerPosition} />
                  </GoogleMap>
                </div>
                <div className="space-y-2">
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={() => {
                      const place = autocompleteRef.current.getPlace();
                      if (place) {
                        calculateRoute();
                        setCenter({
                          lat: place.geometry.location.lat(),
                          lng: place.geometry.location.lng(),
                        });
                      }
                    }}
                  >
                    <div className="relative">
                      <input
                        value={formattedAddress}
                        type="search"
                        className={inputStyle}
                        placeholder="Search address"
                        onChange={(e) => setFormattedAddress(e.target.value)}
                      />
                    </div>
                  </Autocomplete>
                </div>
              </div>

              {/* right side */}
              <div className="font-switzer space-y-4">
                <div className="space-y-1">
                  <label htmlFor="title">Select Address Type*</label>
                  <Select
                    onChange={(val) => handleAddressType(val)}
                    options={options}
                    placeholder="Select Address Type"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="title">Address Title*</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={address?.title}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Enter Address title e.g Home, Office, Apartment..."
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="country">Country*</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={address?.country}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Enter country name"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="city">City*</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={address?.city}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="province">Province*</label>
                    <input
                      type="text"
                      name="province"
                      id="province"
                      value={address?.province}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="Enter Province"
                    />
                  </div>
                </div>

                <div className="space-y-1 ">
                  <label htmlFor="streetAddress">Street Name*</label>
                  <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    // here i am showing the street name
                    value={address?.streetAddress}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Enter street name"
                  />
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="building">Building</label>
                  <input
                    type="text"
                    name="building"
                    id="building"
                    value={address?.building}
                    onChange={handleChange}
                    className={`${inputStyle}`}
                    placeholder="Enter building name"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="floor">Floor</label>
                    <input
                      type="text"
                      name="floor"
                      id="floor"
                      value={address?.floor}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="Enter floor"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="apartment">Apt</label>
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="Enter apartment"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="postalCode">Postal Code*</label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={address?.postalCode}
                      onChange={handleChange}
                      className={`${inputStyle}`}
                      placeholder="Postal code"
                    />
                  </div>
                </div>
                <div className="space-y-1 ">
                  <label htmlFor="">Description*</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputStyle}`}
                    placeholder="Enter description e.g. Nearest landmark"
                  />
                </div>
                <div>
                  <Checkbox defaultChecked>
                    Save this address for future use
                  </Checkbox>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5  font-medium bg-theme text-themeText rounded-md
              hover:text-theme hover:bg-transparent border hover:border-theme"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}

          {!loading && (
            <div className="space-y-4 md:space-y-6">
              <p className="font-switzer font-bold text-themePlaceholder text-2xl">
                Saved Address
              </p>
              {data?.data?.addressData.length === 0 ? (
                <div className="space-y-4 md:space-y-6">
                  <div className="text-crossColor flex justify-center items-center">
                    <MdOutlineCancel size={100} />
                  </div>
                  <p className="font-semibold font-switzer text-xl md:text-2xl lg:text-3xl text-center">
                    No Address Found
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                  {data?.data?.addressData?.map((address, i) => (
                    <SaveAddressCard
                      key={i}
                      address={address}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <Modal
            size={window.innerWidth < 768 ? "sm" : "md"}
            isOpen={modal}
            onClose={onClose}
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {loading === "mini" ? (
                  <></>
                ) : (
                  <div className="!font-bold !text-xl !font-switzer pt-5">
                    Are you sure you want to delete this Address ?
                  </div>
                )}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {loading === "mini" ? (
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
        </div>
      }
    />
  );
}
