import {
  auth,
  providerGoogle,
  providerFacebook,
  providerApple,
  generateToken,
} from "../firebaseFile/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { error_toaster, info_toaster, success_toaster } from "./Toaster";
import { loginAPI } from "./PostAPI";

export const handleGoogleLogin = async (navigate, setdisbale) => {
  try {
    setdisbale(true);

    const result = await signInWithPopup(auth, providerGoogle);
    const user = result.user;
    console.log("result.user", result.user?.providerData);
    let email =
      user.email ||
      user.providerData.find((profile) => profile.providerId === "google.com")
        ?.email;

    if (!email) {
      console.log(
        "Unable to retrieve email. Make sure the user has granted permission to access their email."
      );
      setdisbale(false);
      return;
    }

    const dvToken = await generateToken();

    const res = await loginAPI("customer/login", {
      email: email,
      signedBy: "google",
      dvToken: dvToken,
    });

    if (res?.data?.status === "1") {
      setdisbale(false);
      localStorage.setItem("userTypeId", res?.data?.data?.userTypeId);
      localStorage.setItem("userId", res?.data?.data?.userId);
      localStorage.setItem("accessToken", res?.data?.data?.accessToken);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("firstName", res?.data?.data?.firstName);
      localStorage.setItem("lastName", res?.data?.data?.lastName);
      localStorage.setItem("email", res?.data?.data?.email);
      localStorage.setItem("joinedOn", res?.data?.data?.joinedOn);
      localStorage.setItem("phoneNum", res?.data?.data?.phoneNum);
      navigate("/send-parcel");
      success_toaster(res?.data?.message);
    } else if (res?.data?.status === "3") {
      localStorage.setItem("userId", res?.data?.data?.userId);
      success_toaster(res?.data?.message);
      navigate("/sign-up-complete-profile");
    } else {
      setdisbale(false);
      error_toaster(res?.data?.error);
    }
  } catch (error) {
    console.log(error);
    error_toaster(error);
  } finally {
    setdisbale(false);
  }
};

export const handleFacebookLogin = async (navigate, setDisable) => {
  try {
    setDisable(true);
    const result = await signInWithPopup(auth, providerFacebook);
    const user = result?.user;

    console.log("result?.user?.email", result?.user?.providerData);

    let email =
      user?.email ||
      user?.providerData?.find(
        (profile) => profile.providerId === "facebook.com"
      )?.email;

    if (!email) {
      console.log(
        "Unable to retrieve email. Make sure the user has granted permission to access their email."
      );
      setDisable(false);
      return;
    }

    const dvToken = await generateToken();
    const res = await loginAPI("customer/login", {
      email: email,
      signedBy: "facebook",
      dvToken: dvToken,
    });

    if (res?.data?.status === "1") {
      setDisable(false);
      localStorage.setItem("userTypeId", res?.data?.data?.userTypeId);
      localStorage.setItem("userId", res?.data?.data?.userId);
      localStorage.setItem("accessToken", res?.data?.data?.accessToken);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("firstName", res?.data?.data?.firstName);
      localStorage.setItem("lastName", res?.data?.data?.lastName);
      localStorage.setItem("email", res?.data?.data?.email);
      localStorage.setItem("joinedOn", res?.data?.data?.joinedOn);
      localStorage.setItem("phoneNum", res?.data?.data?.phoneNum);
      navigate("/send-parcel");
      success_toaster(res?.data?.message);
    } else if (res?.data?.status === "3") {
      localStorage.setItem("userId", res?.data?.data?.userId);
      success_toaster(res?.data?.message);
      navigate("/sign-up-complete-profile");
    } else {
      setDisable(false);
      error_toaster(res?.data?.error);
    }
  } catch (error) {
    console.log(error);
    error_toaster(error);
  } finally {
    setDisable(false);
  }
};

export const handleAppleLogin = async (navigate, setdisbale) => {
  try {
    setdisbale(true);
    const result = await signInWithPopup(auth, providerApple);
    const user = result?.user;
    const dvToken = await generateToken();
    const res = await loginAPI("customer/login", {
      email: user?.email,
      signedBy: "apple",
      dvToken: dvToken,
    });
    console.log(user?.email);
    if (res?.data?.status === "1") {
      setdisbale(false);
      localStorage.setItem("userTypeId", res?.data?.data?.userTypeId);
      localStorage.setItem("userId", res?.data?.data?.userId);
      localStorage.setItem("accessToken", res?.data?.data?.accessToken);
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("firstName", res?.data?.data?.firstName);
      localStorage.setItem("lastName", res?.data?.data?.lastName);
      localStorage.setItem("email", res?.data?.data?.email);
      localStorage.setItem("joinedOn", res?.data?.data?.joinedOn);
      localStorage.setItem("phoneNum", res?.data?.data?.phoneNum);
      navigate("/send-parcel");
      success_toaster(res?.data?.message);
    } else if (res?.data?.status === "3") {
      localStorage.setItem("userId", res?.data?.data?.userId);
      success_toaster(res?.data?.message);
      navigate("/sign-up-complete-profile");
    } else {
      setdisbale(false);
      error_toaster(res?.data?.error);
    }
  } catch (error) {
    console.log(error);
    error_toaster(error);
  } finally {
    setdisbale(false);
  }
};
