import React,{useState} from 'react'
import "./Terms.css"
import NavBar from './NavBar'
function Terms() {
  return (
    <div>
      <NavBar/>
    <div>
       <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      
      <section className="terms-section">
        <h2>1. General Terms</h2>
        <p>
          The Legal Bot provides legal advice, but it is not a substitute for professional legal consultation. Users must be at least 18 years old to use the Legal Bot services. By using the services, users agree to comply with all applicable laws and regulations.
        </p>
      </section>
      
      <section className="terms-section">
        <h2>2. Free Membership</h2>
        <ul>
          <li>Search Limit: Users on the free plan are limited to 4 searches per day.</li>
          <li>Content: The Free Membership provides access to basic legal advice and frequently asked questions (FAQs).</li>
          <li>Availability: Responses may take longer compared to paid memberships.</li>
          <li>Support: No direct support is available for Free Members.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>3. Individual Membership</h2>
        <ul>
          <li>Search Limit: Unlimited searches per day for the individual user.</li>
          <li>Content: Full access to in-depth legal advice, personalized guidance, and document reviews.</li>
          <li>Response Time: Priority response for quicker assistance on legal matters.</li>
          <li>Support: Email and chat support are available with a response time guarantee.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>4. Family Membership</h2>
        <ul>
          <li>Search Limit: Unlimited searches for up to 6 family members under one account.</li>
          <li>Content: Full access to legal advice for family-related matters such as wills, estate planning, and family disputes.</li>
          <li>Response Time: Fast track response times for urgent matters affecting family members.</li>
          <li>Support: Priority support with access to family-specific legal services.</li>
          <li>Family Members: The maximum number of members on a Family plan is 6. Only immediate family members residing at the same address may be included.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>5. Subscription and Payment</h2>
        <ul>
          <li>Billing: Individual and Family memberships are subscription-based and billed either monthly or annually, depending on the selected plan.</li>
          <li>Free Membership: Free membership offers limited services with no subscription fee.</li>
          <li>Cancellation: Subscriptions may be canceled at any time. Upon cancellation, the user will retain access until the end of the current billing cycle.</li>
          <li>Refund Policy: There are no refunds for payments made under the subscription plans unless required by applicable law.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>6. User Responsibilities</h2>
        <ul>
          <li>Accuracy: Users must ensure the information provided to the Legal Bot is accurate and up-to-date.</li>
          <li>Prohibited Activities: Users must not use the Legal Bot services for illegal activities, spamming, or disruptive behavior.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>7. Privacy and Data Usage</h2>
        <p>
        The Legal Bot collects and stores user data, including search queries and interactions, for the purpose of providing legal services. The data may be used to improve services, but it will not be shared with third parties without the user’s consent, except as required by law.
        </p>
      </section>

      <section className="terms-section">
        <h2>8. Disclaimers</h2>
        <p>
          The Legal Bot is not a law firm, and the services provided do not constitute legal advice, representation, or professional legal services. The content provided by the Legal Bot is for informational purposes only and should not be relied upon as legal advice.
        </p>
      </section>

      <section className="terms-section">
        <h2>9. Changes to Terms</h2>
        <p>
          The Legal Bot reserves the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the services will be deemed acceptance of the updated terms.
        </p>
      </section>

      <section className="terms-section">
        <h2>Contact Information</h2>
        <p>For any questions or concerns about these terms, please contact us at:</p>
        <p>Email: support@legalbot.com</p>
        <p>Phone: +91-9048310440</p>
      </section>
    </div>
    </div>
    </div>
  )
}

export default Terms
