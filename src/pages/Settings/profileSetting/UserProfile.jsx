import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { inputStyle } from "../../../utilities/Style";
import ProfileComponent from "../../../components/ProfileComponent";
import GetAPI from "../../../utilities/GetAPI";
import { BASE_URL } from "../../../utilities/URL";
import { PostAPI } from "../../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../../utilities/Toaster";
import { PutAPI } from "../../../utilities/PutAPI";
import MiniLoader from "../../../components/MiniLoader";
import Loader from "../../../components/Loader";
import { FaCamera } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function UserProfile() {
  const options = [
    {
      value: 1,
      label: "Customer",
    },
    {
      value: 3,
      label: "Business User",
    },
  ];
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState("");
  const [loader, setLoader] = useState("");
  const [modal, setModal] = useState(false);

  const { data, reFetch } = GetAPI("customer/getprofile");
  console.log("🚀 ~ UserProfile ~ data:", data?.data?.userData);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
    isProfileChanged: false,
    email: "",
    phoneNum: "",
    profileImageLink: "",
    userTypeId: "",
  });

  const onClose = () => {
    setModal(false);
  };

  const handleShow = (state) => {
    setShow(state);
  };

  const handleDetail = (state) => {
    setDetail(state);
  };

  const handleImg = (e) => {
    const files = e.target.files;
    const file = files[0];
    if (file) {
      const profileImageLink = URL.createObjectURL(file);
      setProfileData({
        ...profileData,
        profileImage: file,
        isProfileChanged: true,
        profileImageLink: profileImageLink,
      });
    }
  };

  const handleChange = (e) => {
    if (e.value) {
      setProfileData({ ...profileData, userTypeId: e.value });
    } else {
      setProfileData({ ...profileData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdateData = async (status) => {
    if (status === "profile" && profileData?.profileImageLink === "") {
      info_toaster("Select new profile photo");
    } else {
      if (profileData?.firstName === "") {
        info_toaster("Enter First Name");
      } else if (profileData?.lastName == "") {
        info_toaster("Enter Last Name");
      } else {
        const formData = new FormData();
        formData.append("firstName", profileData?.firstName);
        formData.append("lastName", profileData?.lastName);
        formData.append("profileImage", profileData?.profileImage);
        formData.append("isProfileChanged", profileData?.isProfileChanged);
        formData.append("email", profileData?.email);
        formData.append("phoneNum", profileData?.phoneNum);
        formData.append("userTypeId", profileData?.userTypeId);
        setLoader(status);
        const res = await PutAPI("customer/updateprofile", formData);
        if (res?.data?.status === "1") {
          reFetch();
          setLoader("");
          setShow(false);
          setModal(false);
          success_toaster(res?.data?.message);
          localStorage.setItem("userTypeId", res?.data?.data);
        } else {
          setLoader(false);
          error_toaster(res?.data?.error);
        }
      }
    }
  };

  useEffect(() => {
    if (data && data?.data && data?.data?.userData?.firstName) {
      setProfileData({
        firstName: data?.data?.userData?.firstName,
        lastName: data?.data?.userData?.lastName,
        profileImage: data?.data?.userData?.image,
        isProfileChanged: false,
        email: data?.data?.userData?.email,
        phoneNum: data?.data?.userData?.phoneNum,
        profileImageLink: "",
        userTypeId: data?.data?.userData?.userTypeId,
      });
    }
  }, [data]);

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      title="User Profile"
      rightSide={
        <div className="space-y-6">
          <div
            className="rounded-full h-24 w-24 relative border-2 border-theme overflow-hidden"
            // onClick={() => document.querySelector(".handleImg").click()}
          >
            <img
              loading="eager|lazy"
              src={`${BASE_URL}${data?.data?.userData?.image}`}
              alt="user profile image"
              className="w-full h-full object-contain absolute rounded-full"
            />
            {/* <input
                type="file"
                name="profileImage"
                id="profileImage"
                onChange={handleImg}
                className="absolute h-full w-full hidden handleImg"
              /> */}
            <div
              onClick={() => setModal(true)}
              className="absolute cursor-pointer py-[2px] bottom-0 left-0 bg-customGradientBg flex items-center justify-center w-full"
            >
              <FaCamera color="#000000" opacity={"0.6"} size={"16px"} />
            </div>
          </div>
          {/* <button
              type="button"
              onClick={handleUpdateData}
              disabled={!profileData?.isProfileChanged}
              className={`w-20 font-switzer border 
                   text-white bg-theme border-theme disabled:cursor-not-allowed text-xl rounded-md px-2 py-1 ${
                     profileData?.isProfileChanged &&
                     "hover:text-theme hover:bg-themeText"
                   }`}
            >
              Save
            </button> */}

          {loader === "notProfile" ? (
            <MiniLoader />
          ) : (
            <div className="grid grid-cols-5 font-switzer border-b">
              <ProfileComponent
                text1="First Name"
                text2={data?.data?.userData?.firstName}
                matchedText="First Name"
                value={profileData?.firstName}
                onChange={handleChange}
                name={"firstName"}
                placeholderText="Enter First Name"
                show={show}
                handleShow={handleShow}
                detail={detail}
                handleDetail={handleDetail}
                handleUpdateData={() => handleUpdateData("notProfile")}
                edit={true}
              />

              <ProfileComponent
                text1="Last Name"
                text2={data?.data?.userData?.lastName}
                matchedText="Last Name"
                value={profileData?.lastName}
                onChange={handleChange}
                name={"lastName"}
                placeholderText="Enter Last Name"
                show={show}
                handleShow={handleShow}
                detail={detail}
                handleDetail={handleDetail}
                handleUpdateData={() => handleUpdateData("notProfile")}
                edit={true}
              />

              <ProfileComponent
                text1="User Type"
                text2={
                  data?.data?.userData?.userTypeId === 1
                    ? "Customer"
                    : "Business User"
                }
                matchedText="User Type"
                value={
                  profileData?.userTypeId === 1
                    ? {
                        value: 1,
                        label: "Customer",
                      }
                    : {
                        value: 3,
                        label: "Business User",
                      }
                }
                onChange={handleChange}
                name={"userTypeId"}
                placeholderText="Change User Type"
                show={show}
                handleShow={handleShow}
                detail={detail}
                handleDetail={handleDetail}
                options={options}
                handleUpdateData={() => handleUpdateData("notProfile")}
                edit={data?.data?.userData?.userTypeId === 1 ? false : true}
              />

              <ProfileComponent
                text1="Email address"
                text2={data?.data?.userData?.email}
                matchedText="Email address"
                value={profileData?.email}
                onChange={handleChange}
                name={"email"}
                placeholderText="Enter Email Address"
                show={show}
                handleShow={handleShow}
                detail={detail}
                handleDetail={handleDetail}
                handleUpdateData={() => handleUpdateData("notProfile")}
                edit={false}
              />

              <ProfileComponent
                text1="Phone Number"
                text2={data?.data?.userData?.phoneNum}
                matchedText="Phone Number"
                value={profileData?.phoneNum}
                onChange={handleChange}
                name={"Phone Number"}
                placeholderText="Enter Phone Number"
                show={show}
                handleShow={handleShow}
                detail={detail}
                handleDetail={handleDetail}
                handleUpdateData={() => handleUpdateData("notProfile")}
                edit={false}
              />

              <ProfileComponent
                text1="Virtual Box Number"
                text2={data?.data?.virtualBoxNumber}
                matchedText="Virtual Box Number"
                value={profileData?.email}
                onChange={handleChange}
                name={"Virtual Box Number"}
                placeholderText="Enter Virtual Box Number"
                show={show}
                handleShow={handleShow}
                detail={detail}
                handleDetail={handleDetail}
                handleUpdateData={() => handleUpdateData("notProfile")}
                edit={false}
              />

              <ProfileComponent
                text1="Warehouse Address"
                text2={data?.data?.warehouseAddress}
                matchedText="Warehouse Address"
                value={profileData?.email}
                onChange={handleChange}
                name={"Warehouse Address"}
                placeholderText="Enter Warehouse Address"
                show={show}
                handleShow={handleShow}
                detail={detail}
                handleDetail={handleDetail}
                handleUpdateData={() => handleUpdateData("notProfile")}
                edit={false}
              />

              {/* <ProfileComponent
              text1="Phone number"
              text2={`${data?.data?.userData?.countryCode} ${data?.data?.userData?.phoneNum}`}
              matchedText="Phone number"
              placeholderText="Enter Phone Number"
              show={show}
              handleShow={handleShow}
              detail={detail}
              handleDetail={handleDetail}
            /> */}
            </div>
          )}

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
                {!loader && " Update Profile Picture"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {loader === "profile" ? (
                  <MiniLoader />
                ) : (
                  <div className="space-y-5 py-5">
                    <div
                      className="h-36 md:h-60 w-full relative overflow-hidden cursor-pointer"
                      onClick={() =>
                        document.querySelector(".handleImg").click()
                      }
                    >
                      <img
                        loading="eager|lazy"
                        src={
                          profileData?.profileImageLink
                            ? profileData?.profileImageLink
                            : `${BASE_URL}${data?.data?.userData?.image}`
                        }
                        alt="user profile image"
                        className="w-full h-full object-contain md:object-fill absolute"
                      />
                      <input
                        type="file"
                        name="profileImage"
                        id="profileImage"
                        onChange={handleImg}
                        className="absolute h-full w-full hidden handleImg"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-x-2">
                      <button
                        onClick={() => setModal(false)}
                        className="w-28 py-2.5 font-switzer font-medium bg-transparent text-theme rounded-md
           hover:text-themeText hover:bg-theme border border-theme hover:border-theme"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateData("profile")}
                        className="w-28 py-2.5 font-switzer font-medium bg-theme text-themeText rounded-md
           hover:text-theme hover:bg-transparent border hover:border-theme"
                      >
                        Update
                      </button>
                    </div>
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
