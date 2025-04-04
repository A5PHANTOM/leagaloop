import React from "react";
import NavBar from "./NavBar";

function Terms() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <NavBar />
      <div className="w-full max-w-4xl bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-xl border border-gray-700 mt-10 overflow-y-auto max-h-[80vh]">
        <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8">
          Terms and Conditions
        </h1>

        <div className="space-y-6">
          {[
            {
              title: "1. General Terms",
              content:
                "The Legal Bot provides legal advice, but it is not a substitute for professional legal consultation. Users must be at least 18 years old to use the Legal Bot services. By using the services, users agree to comply with all applicable laws and regulations.",
            },
            {
              title: "2. Free Membership",
              content: [
                "Users on the free plan are limited to 4 searches per day.",
                "Basic legal advice and frequently asked questions (FAQs).",
                "Responses may take longer compared to paid memberships.",
                "No direct support available.",
              ],
            },
            {
              title: "3. Individual Membership",
              content: [
                "Unlimited searches per day.",
                "Full access to in-depth legal advice and document reviews.",
                "Priority response for legal matters.",
                "Email and chat support included.",
              ],
            },
            {
              title: "4. Family Membership",
              content: [
                "Unlimited searches for up to 6 family members.",
                "Full access to legal advice for family-related matters.",
                "Fast-track response times for urgent cases.",
                "Priority support for family-specific legal issues.",
              ],
            },
            {
              title: "5. Subscription and Payment",
              content: [
                "Subscription-based billing (monthly or annually).",
                "Free Membership: Limited services with no cost.",
                "Subscriptions can be canceled anytime.",
                "No refunds unless required by law.",
              ],
            },
            {
              title: "6. User Responsibilities",
              content: [
                "Users must provide accurate and up-to-date information.",
                "Misuse of services for illegal activities is strictly prohibited.",
              ],
            },
            {
              title: "7. Privacy and Data Usage",
              content:
                "Legal Bot collects and stores user data to enhance services. Data will not be shared with third parties without consent, except as required by law.",
            },
            {
              title: "8. Disclaimers",
              content:
                "Legal Bot is not a law firm and does not provide professional legal representation.",
            },
            {
              title: "9. Changes to Terms",
              content:
                "Legal Bot reserves the right to modify these terms at any time. Users will be notified of major updates.",
            },
            {
              title: "Contact Information",
              content: (
                <>
                  <p className="text-lg text-gray-300">
                    For questions, contact us at:
                  </p>
                  <p className="text-lg text-blue-300">
                    Email: support@legalbot.com
                  </p>
                  <p className="text-lg text-blue-300">
                    Phone: +91-9048310440
                  </p>
                </>
              ),
            },
          ].map((section, index) => (
            <section key={index} className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-300 mb-2">
                {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className="list-disc ml-6 space-y-2 text-gray-300">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg leading-relaxed text-gray-300">
                  {section.content}
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Terms;
