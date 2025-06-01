import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Chatbot from "./pages/Chatbot";
import Booking from "./pages/Booking";
import LawyerPage from "./pages/Lawyer";
import ContactUs from "./pages/ContactUs"; // ✅ <-- added this

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={!user ? <AuthPage /> : <Navigate to="/home" />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      <Route path="/about" element={user ? <About /> : <Navigate to="/" />} />
      <Route path="/terms" element={user ? <Terms /> : <Navigate to="/" />} />
      <Route path="/chatbot" element={user ? <Chatbot /> : <Navigate to="/" />} />
      <Route path="/booking" element={user ? <Booking /> : <Navigate to="/" />} />
      <Route path="/lawyer" element={user ? <LawyerPage /> : <Navigate to="/" />} />
      <Route path="/contact" element={user ? <ContactUs /> : <Navigate to="/" />} /> {/* ✅ added this */}
    </Routes>
  );
}

export default App;
