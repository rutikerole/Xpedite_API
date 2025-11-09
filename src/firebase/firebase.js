// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // if you want DB
import { getAuth } from "firebase/auth"; // if you want auth
import { getStorage } from "firebase/storage"; // if you want file storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDocn2_1-tG2DIdHK4a1px9Lv6yKPCaYV0",
  authDomain: "xpedite-api.firebaseapp.com",
  projectId: "xpedite-api",
  storageBucket: "xpedite-api.appspot.com",
  messagingSenderId: "841303161005",
  appId: "1:841303161005:web:0bb4baab93d0831895ee24",
  measurementId: "G-JGN12MV9WF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services you want
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
