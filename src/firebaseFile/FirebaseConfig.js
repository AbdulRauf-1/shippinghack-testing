import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getToken, getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfM7LxNGbnV_U9fJdd8Ua4Q9Wb5gAznw0",
  authDomain: "theshippinghack.firebaseapp.com",
  databaseURL: "https://theshippinghack-default-rtdb.firebaseio.com",
  projectId: "theshippinghack",
  storageBucket: "theshippinghack.appspot.com",
  messagingSenderId: "247214193332",
  appId: "1:247214193332:web:0c6aef98cb06c00cb3f5e1",
  measurementId: "G-BEDDRLNJB7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope("email");

const providerFacebook = new FacebookAuthProvider();
providerFacebook.addScope("email");

const providerApple = new OAuthProvider("apple.com");
providerApple.addScope("email");
providerApple.addScope("name");

const messaging = getMessaging(app);

const generateToken = async () => {
  // const permission = await Notification.requestPermission();
  // if (permission === "granted") {
  const token = await getToken(messaging, {
    vapidKey:
      "BNXuGEz-PtAURt1i307M_ZW0z5Y_mdWF8f1W6WjF3_ldSrNVpYZPgEnp0-WnhmuoRGKT8NVzGtHmdMWCJphhxp0",
  });
  return token;
  // }
};

export { auth, providerGoogle, providerFacebook, providerApple, generateToken };
