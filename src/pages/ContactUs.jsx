import React from "react";

function ContactUs() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-blue-400">Contact Us</h1>
      <p className="text-lg md:text-xl max-w-2xl text-center mb-10 text-gray-300">
        Are you a lawyer interested in joining Legaloop? Reach out to us and get your profile featured on our platform.
      </p>

      <div className="bg-zinc-900 rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-3xl flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold text-blue-300">Email</h2>
          <p className="text-gray-400">legaloop@bearitt.com</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-300">Phone</h2>
          <p className="text-gray-400">+91 88917 67397</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-300">Website</h2>
          <a
            href="https://www.bearitt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            www.bearitt.com
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-md text-gray-400 max-w-xl">
        Let us help you grow your legal practice. Contact us today to get your profile listed and become a part of India’s evolving legal ecosystem with <span className="text-white font-semibold">Legaloop</span>.
      </p>
    </div>
  );
}

export default ContactUs;
