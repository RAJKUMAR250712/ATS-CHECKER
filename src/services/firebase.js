import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAcumSIU19c6bGDQUazS38nG_4mJw-69TU", // 🔥 MUST NOT BE EMPTY
  authDomain: "ats-checker-674f7.firebaseapp.com",
  projectId: "ats-checker-674f7",
  storageBucket: "ats-checker-674f7.firebasestorage.app",
  messagingSenderId: "764820990065",
  appId: "1:764820990065:web:e4789378d103ed1efb53d0",
  measurementId: "G-H4DXEVE6TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;


