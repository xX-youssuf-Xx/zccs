// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAI8Uj7DaVwsio6D6QyV5vuhLFGHthoCts",
  authDomain: "zccs-35f2e.firebaseapp.com",
  projectId: "zccs-35f2e",
  storageBucket: "zccs-35f2e.appspot.com",
  messagingSenderId: "70101685108",
  appId: "1:70101685108:web:8df036ea2d5d3a62b05221",
  measurementId: "G-W3TJX8S2EV",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
