import { Suspense, lazy, useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { ChakraProvider } from "@chakra-ui/react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./App.css";
import "react-phone-input-2/lib/style.css";
import { useJsApiLoader } from "@react-google-maps/api";
import { ToastContainer } from "react-toastify";
import SignUpStep1 from "./pages/SignUp/SignUpStep1";
import EmailLink from "./pages/BusinessSite/EmailLink";
import SignUpStep2 from "./pages/SignUp/SignUpStep2";
import Login from "./pages/login/Login";
import ForgetPasswordSt1 from "./pages/forgetPassword/ForgetPasswordSt1";
import ForgetPasswordSt2 from "./pages/forgetPassword/ForgetPasswordSt2";
import ForgetPasswordSt3 from "./pages/forgetPassword/ForgetPasswordSt3";
import Loader from "./components/Loader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utilities/ProtectedRoute";
import Home from "./pages/home/Home";
// import ShippingCalculator from "./pages/shippingCalculator/ShippingCalculator"
// import TrackOrder from "./pages/trackOrder/TrackOrder";
// import SendParcel from "./pages/internationalShipping/sendParcel/SendParcel";
// import Steps from "./pages/internationalShipping/sendParcel/Steps";
// import PackagesInWarehouse from "./pages/internationalShipping/packagesInWarehouse/PackagesInWarehouse";
// import ExpectedPackages from "./pages/internationalShipping/expectedPackages/ExpectedPackages";
// import SendPackages from "./pages/internationalShipping/sendPackages/SendPackages";
// import CancelOrder from "./pages/Settings/orderHistory/OrderHistory";
// import AddPaymentDetail from "./pages/Settings/addPaymentDetail/AddPaymentDetail";
// import SaveAddress from "./pages/Settings/saveAddress/SaveAddress";
// import MyMembership from "./pages/Settings/myMembership/MyMembership";
// import UserProfile from "./pages/Settings/profileSetting/UserProfile";
// import AddDeliveryAddress from "./pages/internationalShipping/addAddress/AddDeliveryAddress";
// import PaymentMethod from "./pages/internationalShipping/addPaymentDetail/Parceldetail";
// import DeliveryService from "./pages/internationalShipping/addPaymentDetail/DeliveryService";
// import SendParcelSteps from "./pages/localShipment/SendParcelSteps";
// import ParcelDetail from "./pages/localShipment/ParcelDetail";
// import LocalDeliveryService from "./pages/localShipment/LocalDeliveryService";
import Business from "./pages/BusinessSite/Business";
import BusinessMembershipSignup from "./pages/BusinessSite/BusinessMembershipSignup";
import BusinessMembershipLogin from "./pages/BusinessSite/BusinessMembershipLogin";
import BusinessVerifyOtp from "./pages/BusinessSite/BusinessVerifyOtp";
import BusinessForgetPassword from "./pages/BusinessSite/BusinessForgetPassword";
import BusinessUpdatePassword from "./pages/BusinessSite/BusinessUpdatePassword";
import MemberShipEmail from "./pages/BusinessSite/MemberShipEmail";
// import SelectPackage from "./pages/BusinessSite/SelectPackage";
import BusinessMembershipStep1 from "./pages/BusinessSite/BusinessMembershipStep1";
import BusinessMembershipStep2 from "./pages/BusinessSite/BusinessMembershipStep2";
import BusinessMembershipStep3 from "./pages/BusinessSite/BusinessMembershipStep3";
import NoInternet from "./pages/errors/NoInternet";
import TermCondition from "./pages/termCondition/TermCondition";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import GettingStarted from "./pages/gettingStarted/GettingStarted";
// import PaymentHandle from "./pages/paymentHandle/PaymentHandle";
// import BusinessMembershipStep4 from "./pages/businessSite/BusinessMembershipStep4";
// import StandardMembership from "./pages/businessSite/StandardMembership";
const googleMapsLibraries = ["places"];
const googleMapsApiKey = "AIzaSyAVYbP2F93xvY4i59UVNfAfYR62dmbKNFA";

function App() {
  const [isOnline, setIsOnline] = useState(true);

  const ShippingCalculator = lazy(() =>
    import("./pages/shippingCalculator/ShippingCalculator")
  );
  const TrackOrder = lazy(() => import("./pages/trackOrder/TrackOrder"));
  const SendParcel = lazy(() =>
    import("./pages/internationalShipping/sendParcel/SendParcel")
  );
  const Steps = lazy(() =>
    import("./pages/internationalShipping/sendParcel/Steps")
  );
  const ExpectedPackages = lazy(() =>
    import("./pages/internationalShipping/expectedPackages/ExpectedPackages")
  );
  const PackagesInWarehouse = lazy(() =>
    import(
      "./pages/internationalShipping/packagesInWarehouse/PackagesInWarehouse"
    )
  );
  const SendPackages = lazy(() =>
    import("./pages/internationalShipping/sendPackages/SendPackages")
  );
  const CancelOrder = lazy(() =>
    import("./pages/Settings/orderHistory/OrderHistory")
  );
  const AddPaymentDetail = lazy(() =>
    import("./pages/Settings/AddPaymentDetail/AddPaymentDetail")
  );
  const SaveAddress = lazy(() =>
    import("./pages/Settings/SaveAddress/SaveAddress")
  );
  const MyMembership = lazy(() =>
    import("./pages/Settings/MyMembership/MyMembership")
  );
  const UserProfile = lazy(() =>
    import("./pages/Settings/profileSetting/UserProfile")
  );
  const AddDeliveryAddress = lazy(() =>
    import("./pages/internationalShipping/addAddress/AddDeliveryAddress")
  );
  const PaymentMethod = lazy(() =>
    import("./pages/internationalShipping/addPaymentDetail/Parceldetail")
  );
  const DeliveryService = lazy(() =>
    import("./pages/internationalShipping/addPaymentDetail/DeliveryService")
  );
  const SendParcelSteps = lazy(() =>
    import("./pages/localShipment/SendParcelSteps")
  );
  const ParcelDetail = lazy(() => import("./pages/localShipment/ParcelDetail"));
  const LocalDeliveryService = lazy(() =>
    import("./pages/localShipment/LocalDeliveryService")
  );
  const SelectPackage = lazy(() =>
    import("./pages/BusinessSite/SelectPackage")
  );
  const BusinessMembershipStep4 = lazy(() =>
    import("./pages/BusinessSite/BusinessMembershipStep4")
  );
  const StandardMembership = lazy(() =>
    import("./pages/BusinessSite/StandardMembership")
  );
  const PaymentHandle = lazy(() =>
    import("./pages/paymentHandle/PaymentHandle")
  );

  const handleAppStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleAppStatus);
    window.addEventListener("offline", handleAppStatus);

    return () => {
      window.removeEventListener("online", handleAppStatus);
      window.removeEventListener("offline", handleAppStatus);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: googleMapsLibraries,
  });
  if (!isLoaded) {
    return <Loader />;
  }

  return isOnline ? (
    <>
      <ToastContainer />
      <ChakraProvider>
        <PrimeReactProvider>
          <Router>
            <Routes>
              <Route exact path="/" Component={Home} />

              <Route exact path="/getting-started" Component={GettingStarted} />

              {/* SIGN UP & SIGN IN */}
              <Route exact path="/sign-up" Component={SignUpStep1} />
              <Route
                exact
                path="/sign-up-complete-profile"
                Component={SignUpStep2}
              />
              <Route exact path="/sign-in" Component={Login} />
              {/* FORGOT PASSWORD */}
              <Route
                exact
                path="/forgot-password"
                Component={ForgetPasswordSt1}
              />
              <Route exact path="/verify-OTP" Component={ForgetPasswordSt2} />
              <Route
                exact
                path="/update-password"
                Component={ForgetPasswordSt3}
              />
              <Route
                exact
                path="/shipping-calculator"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={ShippingCalculator} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/track-order"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={TrackOrder} />
                  </Suspense>
                }
              />
              {/* INTERNATIONAL SHIPPING */}
              <Route
                exact
                path="/send-parcel"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={SendParcel} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/send-parcel-internationally"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={Steps} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/expected-packages"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={ExpectedPackages} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/packages-in-warehouse"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={PackagesInWarehouse} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/sent-packages"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={SendPackages} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/order-history"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={CancelOrder} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/add-payment-method"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={AddPaymentDetail} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/add-address"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={SaveAddress} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/membership"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={MyMembership} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/user-profile"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={UserProfile} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/add-delivery-address"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={AddDeliveryAddress} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/payment-success"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={PaymentHandle} />
                  </Suspense>
                }
              />
              {/* <Route
                exact
                path="/delivery-method"
                element={<ProtectedRoute Component={DeliveryMethod} />}
              /> */}
              <Route
                exact
                path="/parcel-detail"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={PaymentMethod} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/delivery-service"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={DeliveryService} />
                  </Suspense>
                }
              />
              {/* Local Shipping */}
              <Route
                exact
                path="/send-parcel-locally"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={SendParcelSteps} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/send-parcel-locally-detail"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={ParcelDetail} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/payment-method"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={LocalDeliveryService} />
                  </Suspense>
                }
              />
              {/* Business  */}
              <Route exact path="/business" Component={Business} />
              <Route
                exact
                path="/business-membership-signup"
                Component={BusinessMembershipSignup}
              />
              <Route
                exact
                path="/business-membership-login"
                Component={BusinessMembershipLogin}
              />
              <Route
                exact
                path="/business-verify-OTP"
                Component={BusinessVerifyOtp}
              />
              <Route
                exact
                path="/business-forgot-password"
                Component={BusinessForgetPassword}
              />
              <Route
                exact
                path="/business-update-password"
                Component={BusinessUpdatePassword}
              />
              <Route
                exact
                path="/signup-confirm-email"
                Component={MemberShipEmail}
              />
              <Route exact path="/account-activation" Component={EmailLink} />
              <Route
                exact
                path="/select-package"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={SelectPackage} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/payment-methods"
                Component={BusinessMembershipStep1}
              />
              <Route
                exact
                path="/order-payment"
                Component={BusinessMembershipStep2}
              />
              <Route
                exact
                path="/order-summary"
                Component={BusinessMembershipStep3}
              />
              <Route
                exact
                path="/confirm-membership"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={BusinessMembershipStep4} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/account-activation-completed"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProtectedRoute Component={StandardMembership} />
                  </Suspense>
                }
              />

              <Route
                exact
                path="/terms-and-conditions"
                Component={TermCondition}
              />
              <Route exact path="/privacy-policy" Component={PrivacyPolicy} />
            </Routes>
          </Router>

          {/* Signup & Login */}
          {/* <SignUpStep1 /> */}
          {/* <SignUpStep2 /> */}
          {/* <Login /> */}

          {/* Forget Password */}
          {/* <ForgetPasswordSt1 /> */}
          {/* <ForgetPasswordSt2 /> */}
          {/* <ForgetPasswordSt3 /> */}

          {/* <Home /> */}
          {/* <ShippingCalculator /> */}
          {/* <TrackOrder /> */}

          {/* INTERNATIONAL SHIPMENT PAGES START */}
          {/* <ShipmentType /> */}
          {/* <Steps /> */}
          {/* <ExpectedPackages /> */}
          {/* <PackagesInWarehouse /> */}
          {/* <SendPackages /> */}
          {/* <AddDeliveryAddress /> */}
          {/* <DeliveryMethod /> */}
          {/* <PaymentMethod /> */}
          {/* <DeliveryService /> */}

          {/* LOCAL SHIPMENT PAGES START */}
          {/* <SendParcel /> */}
          {/* <SendParcelSteps /> */}
          {/* <ParcelDetail /> */}
          {/* <LocalDeliveryService /> */}

          {/* Business */}
          {/* <Business /> */}
          {/* <MemberShipSelect /> */}
          {/* <MemberShipEmail /> */}
          {/* <EmailLink /> */}
          {/* <AfterLogin /> */}
          {/* <BusinessMembershipStep1 /> */}
          {/* <BusinessMembershipStep2 /> */}
          {/* <BusinessMembershipStep3 /> */}
          {/* <BusinessMembershipStep4 /> */}
          {/* <StandardMembership />  */}

          {/* Settings */}
          {/* <CancelOrder /> */}
          {/* <AddPaymentDetail /> */}
          {/* <SaveAddress isLoaded={isLoaded} /> */}
          {/* <SavedAddressList /> */}
          {/* <MyMembership /> */}
          {/* <SettingBusinessMembershipSt1 /> */}
          {/* <UserProfile /> */}
        </PrimeReactProvider>
      </ChakraProvider>
    </>
  ) : (
    <NoInternet />
  );
}

export default App;
