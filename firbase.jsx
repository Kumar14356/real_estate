// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-Vk-1wlBFIhDPiSc_AHOeKP6MCCyqmo8",
  authDomain: "rental-surat.firebaseapp.com",
  projectId: "rental-surat",
  storageBucket: "rental-surat.firebasestorage.app",
  messagingSenderId: "465789903236",
  appId: "1:465789903236:web:ba5ae60375d3e4c3b73dd1",
  measurementId: "G-R4M1K29NFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);