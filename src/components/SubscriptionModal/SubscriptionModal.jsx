import { useState } from "react";
import "./style.css";

// Payment method icons
const BkashIcon = () => (
  <img src="https://hdnfltv.com/image/nitimages/bkash-logo.webp" alt="bKash" className="payment-method-icon" />
);

const NagadIcon = () => (
  <img src="https://hdnfltv.com/image/nitimages/nagad-logo.webp" alt="Nagad" className="payment-method-icon" />
);

const VisaIcon = () => (
  <div className="payment-method-icon-group">
    <img src="https://hdnfltv.com/image/nitimages/visa-logo.webp" alt="Visa" className="payment-method-icon" />
    <img src="https://hdnfltv.com/image/nitimages/mastercard-logo.webp" alt="Mastercard" className="payment-method-icon" />
  </div>
);

const IslamiBankIcon = () => (
  <img src="https://hdnfltv.com/image/nitimages/islami-bank-logo.webp" alt="Islami Bank" className="bank-logo" />
);

const DutchBanglaIcon = () => (
  <img src="https://hdnfltv.com/image/nitimages/dbbl-logo.webp" alt="Dutch Bangla Bank" className="bank-logo" />
);

export const SubscriptionModal = ({ isOpen, onClose, plan }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    paymentMethod: "bank",
    bank: "islami",
    transferId: "",
    bankAccountNumber: "",
    discountCode: "",
  });
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !plan) return null;

  const price = parseInt(plan.price) * 1000; // Convert to full price (e.g., 300 -> 300000 for display, but actually 20000 for premium)
  const actualPrice = plan.name === "Premium" ? 20000 : price;
  const discount = discountApplied ? 500 : 0;
  const total = actualPrice - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyDiscount = () => {
    if (formData.discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Payment confirmed! Thank you for subscribing.");
      onClose();
    }, 1500);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="subscription-modal-overlay" onClick={handleOverlayClick}>
      <div className="subscription-modal">
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="subscription-modal-content">
          {/* Left Panel - Item Summary */}
          <div className="modal-left-panel">
            <h2 className="panel-title">Item Summary</h2>
            
            {/* User Information */}
            <div className="form-section">
              <h3 className="section-title">User Information</h3>
              <div className="form-row three-cols">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="01X XXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h3 className="section-title">Payment Method</h3>
              <div className="payment-methods">
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={formData.paymentMethod === "bkash"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <div className="bkash-icon">
                    <span className="bkash-text">bKash</span>
                  </div>
                </label>
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={formData.paymentMethod === "nagad"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <div className="nagad-icon">
                    <span className="nagad-text">নগদ</span>
                  </div>
                </label>
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <div className="card-icons">
                    <span className="visa-text">VISA</span>
                    <div className="mastercard-icon"></div>
                  </div>
                </label>
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom radio-filled"></span>
                  <span className="payment-label">Bank Payment</span>
                </label>
              </div>
            </div>

            {/* Payment Details */}
            {formData.paymentMethod === "bank" && (
              <div className="form-section">
                <h3 className="section-title">Payment Details</h3>
                <div className="bank-selection">
                  <label className="bank-option">
                    <input
                      type="radio"
                      name="bank"
                      value="islami"
                      checked={formData.bank === "islami"}
                      onChange={handleChange}
                    />
                    <span className="bank-logo-wrapper islami-bank">
                      <span className="bank-name">Islami Bank</span>
                    </span>
                  </label>
                  <label className="bank-option">
                    <input
                      type="radio"
                      name="bank"
                      value="dbbl"
                      checked={formData.bank === "dbbl"}
                      onChange={handleChange}
                    />
                    <span className="bank-logo-wrapper dbbl">
                      <span className="bank-name-dbbl">DBBL</span>
                    </span>
                  </label>
                </div>
                
                <div className="form-row two-cols">
                  <div className="form-group">
                    <label>Bank Account Name</label>
                    <div className="readonly-field">OVERSEAS PRODUCTS</div>
                  </div>
                  <div className="form-group">
                    <label>Bank Account Number</label>
                    <div className="readonly-field">2050 1300 1006 53106</div>
                  </div>
                </div>
              </div>
            )}

            {/* Your Payment Information */}
            <div className="form-section">
              <h3 className="section-title">Your Payment Information</h3>
              <div className="form-row two-cols">
                <div className="form-group">
                  <label>Transfer ID</label>
                  <input
                    type="text"
                    name="transferId"
                    placeholder="XXXXXXXXXXXXX"
                    value={formData.transferId}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Bank Account Number</label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    placeholder="XXXX XXXX XXXX XXXXX"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <p className="terms-text">
              By Clicking "Confirm Payment" I agree to the companies term of services
            </p>

            <button 
              className="confirm-payment-btn" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>

          {/* Right Panel - Payment Summary */}
          <div className="modal-right-panel">
            <h2 className="panel-title">Payment</h2>
            
            <div className="payment-summary">
              <div className="plan-info">
                <h3 className="plan-type">E-commerce Subscription</h3>
                <div className="plan-name-row">
                  <span className="plan-label">Plan: </span>
                  <span className="plan-value">{plan.name}</span>
                </div>
                <p className="plan-description">Fully managed on our hosting.</p>
              </div>
              
              <div className="plan-price">৳{actualPrice.toLocaleString()}</div>
            </div>

            <div className="discount-section">
              <div className="discount-input-wrapper">
                <svg className="discount-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <input
                  type="text"
                  name="discountCode"
                  placeholder="Discount code"
                  value={formData.discountCode}
                  onChange={handleChange}
                  className="discount-input"
                />
                <button 
                  className="apply-btn"
                  onClick={handleApplyDiscount}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>৳{actualPrice.toLocaleString()}</span>
              </div>
              <div className="price-row discount-row">
                <span>Discount</span>
                <span className="discount-amount">-৳{discount}</span>
              </div>
              <div className="price-row total-row">
                <span>Total</span>
                <span className="total-amount">৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
