import { useState } from "react";
import "./style.css";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({ type: "error", message: "Please enter your email" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email" });
      return;
    }
    setStatus({ type: "success", message: "Thanks for subscribing!" });
    setEmail("");
    setTimeout(() => setStatus({ type: "", message: "" }), 3000);
  };

  return (
    <footer className="footer">
      <div className="footer-divider"></div>
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo">
            <img
              src="https://c.animaapp.com/6PVGKTMi/img/group-2036@2x.png"
              alt="System Next IT"
            />
            <p className="footer-tagline">Innovation & Technology</p>
          </div>

          {/* Links Section */}
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-title">Company</h4>
              <a href="#" className="footer-link">About</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Legal</h4>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms & Services</a>
              <a href="#" className="footer-link">Terms of Use</a>
              <a href="#" className="footer-link">Refund Policy</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-title">Quick Links</h4>
              <a href="#" className="footer-link">SaaS Subscription</a>
              <a href="#" className="footer-link">Website Building</a>
              <a href="#" className="footer-link">Service & Technology</a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <h4 className="newsletter-title">Join Our Newsletter</h4>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            <p className="newsletter-text">
              * Will send you weekly updates for your better tool management.
            </p>
            {status.message && (
              <p className={`${status.type}-message`}>{status.message}</p>
            )}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>© 2026 SystemNext IT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
