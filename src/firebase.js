// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBNB2DJqE0Ueq8zjqPeKXIvyeegEM-Nsrs",
  authDomain: "legaloop-56ec7.firebaseapp.com",
  projectId: "legaloop-56ec7",
  storageBucket: "legaloop-56ec7.firebasestorage.app",
  messagingSenderId: "351740394697",
  appId: "1:351740394697:web:27fcf12a0d3a19b407a118",
  measurementId: "G-Y3YQMDQW7Y"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Get Firebase Auth instance
export const auth = getAuth(app);
