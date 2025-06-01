import React, { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 w-full bg-black py-5 flex justify-center items-center z-50">
      <a href="/">
        <img
          className="absolute left-5 w-20 top-4"
          src="/src/assets/Legaloop.webp"
          alt="Legaloop Logo"
        />
      </a>
      <div className="hidden md:flex gap-6 text-white font-bold">
        <a href="/About" className="hover:text-blue-300">About</a>
        <a href="/Terms" className="hover:text-blue-300">Research</a>
        <a href="/Booking" className="hover:text-blue-300">Booking</a>
        <a href="/Chatbot" className="hover:text-blue-300">Company</a>
        <a href="/Lawyer" className="hover:text-blue-300">Lawyer</a>
        <a href="/Contact" className="hover:text-blue-300">Contact Us</a> {/* ✅ Added */}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex flex-col cursor-pointer gap-1 absolute right-5" onClick={toggleMenu}>
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 right-0 bg-black text-white p-5 flex flex-col gap-4 w-48 rounded-bl-lg shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <a href="/About" className="hover:text-blue-300" onClick={toggleMenu}>
          About
        </a>
        <a href="/Terms" className="hover:text-blue-300" onClick={toggleMenu}>
          Research
        </a>
        <a href="/Booking" className="hover:text-blue-300" onClick={toggleMenu}>
          Booking
        </a>
        <a href="/Chatbot" className="hover:text-blue-300" onClick={toggleMenu}>
          Company
        </a>
        <a href="/Lawyer" className="hover:text-blue-300" onClick={toggleMenu}>
          Lawyer
        </a>
        <a href="/Contact" className="hover:text-blue-300" onClick={toggleMenu}>
          Contact Us
        </a> {/* ✅ Added */}
      </div>
    </div>
  );
}

export default NavBar;
