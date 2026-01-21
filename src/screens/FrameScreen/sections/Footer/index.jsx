import { useState } from "react";
import "./style.css";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              alt="Company Logo"
              src="https://c.animaapp.com/6PVGKTMi/img/group-2036@2x.png"
            />
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-title">Company</h4>
              <a href="#about" className="footer-link">About</a>
              <a href="#contact" className="footer-link">Contact</a>
              <a href="#blogs" className="footer-link">Blogs</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Quick Links</h4>
              <a href="#downloads" className="footer-link">Downloads</a>
              <a href="#forum" className="footer-link">Forum</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Legal</h4>
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms &amp; Services</a>
              <a href="#use" className="footer-link">Terms of Use</a>
              <a href="#refund" className="footer-link">Refund Policy</a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-title">Join Our Newsletter</h4>
            <p className="newsletter-text">
              * Will send you weekly updates for your better tool management.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {subscribed && <p className="success-message">Thank you for subscribing!</p>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 SystemNext IT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
