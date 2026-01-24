import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../components/SubscriptionModal/style.css";
import "./style.css";

// Payment method icons/logos
const BkashLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6e/BKash_Logo.png"
    alt="bKash"
    className="payment-logo bkash-logo"
  />
);

const NagadLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Nagad_logo.png/320px-Nagad_logo.png"
    alt="Nagad"
    className="payment-logo nagad-logo"
  />
);

const VisaMastercardLogo = () => (
  <div className="visa-mastercard-logos">
    <div className="visa-logo-text">VISA</div>
    <div className="mastercard-circles">
      <div className="mc-circle mc-red"></div>
      <div className="mc-circle mc-orange"></div>
    </div>
  </div>
);

const IslamiBankLogo = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/96/IBBL_Logo.png"
    alt="Islami Bank"
    className="bank-select-logo"
  />
);

const DBBLLogo = () => (
  <div className="dbbl-logo-wrapper">
    <span className="dbbl-text">DBBL</span>
  </div>
);

const DiscountIcon = () => (
  <svg className="discount-icon" viewBox="0 0 24 24" fill="none" stroke="#788197" strokeWidth="1.5">
    <rect x="4" y="5.5" width="16" height="13" rx="2" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const defaultPlan = {
  name: "Premium",
  price: "1200",
};

export const PaymentScreen = () => {
  const location = useLocation();
  const plan = useMemo(() => location.state?.plan ?? defaultPlan, [location.state]);

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

  const price = plan?.price ? parseInt(plan.price, 10) : 20000;
  const actualPrice = price;
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

    setTimeout(() => {
      setLoading(false);
      alert("Payment confirmed! Thank you for subscribing.");
    }, 1500);
  };

  return (
    <div className="payment-page">
      <div className="subscription-modal payment-page-card">
        <div className="subscription-modal-content">
          {/* Left Panel - Item Summary */}
          <div className="modal-left-panel">
            <h2 className="panel-title">Item Summary</h2>

            {/* User Information */}
            <div className="form-section">
              <h3 className="section-title-main">User Information</h3>
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
              <h3 className="section-title-main">Payment Method</h3>
              <div className="payment-methods-row">
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={formData.paymentMethod === "bkash"}
                    onChange={handleChange}
                  />
                  <span className="radio-circle"></span>
                  <BkashLogo />
                </label>
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={formData.paymentMethod === "nagad"}
                    onChange={handleChange}
                  />
                  <span className="radio-circle"></span>
                  <NagadLogo />
                </label>
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                  />
                  <span className="radio-circle"></span>
                  <VisaMastercardLogo />
                </label>
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleChange}
                  />
                  <span className="radio-circle radio-filled"></span>
                  <span className="bank-payment-label">Bank Payment</span>
                </label>
              </div>
            </div>

            {/* Payment Details - Bank Selection */}
            {formData.paymentMethod === "bank" && (
              <div className="form-section">
                <h3 className="section-title-main">Payment Details</h3>
                <div className="bank-selection-row">
                  <label className="bank-option">
                    <input
                      type="radio"
                      name="bank"
                      value="islami"
                      checked={formData.bank === "islami"}
                      onChange={handleChange}
                    />
                    <span className="radio-circle"></span>
                    <IslamiBankLogo />
                  </label>
                  <label className="bank-option">
                    <input
                      type="radio"
                      name="bank"
                      value="dbbl"
                      checked={formData.bank === "dbbl"}
                      onChange={handleChange}
                    />
                    <span className="radio-circle"></span>
                    <DBBLLogo />
                  </label>
                </div>

                <div className="form-row two-cols">
                  <div className="form-group">
                    <label>Bank Account Name</label>
                    <div className="readonly-field-dark">OVERSEAS PRODUCTS</div>
                  </div>
                  <div className="form-group">
                    <label>Bank Account Number</label>
                    <div className="readonly-field-dark">2050 1300 1006 53106</div>
                  </div>
                </div>
              </div>
            )}

            {/* Your Payment Information */}
            <div className="form-section">
              <h3 className="section-title-sub">Your Payment  Information</h3>
              <div className="form-row two-cols">
                <div className="form-group">
                  <label>Transfer ID</label>
                  <input
                    type="text"
                    name="transferId"
                    placeholder="XXXXXXXXXXXXX"
                    value={formData.transferId}
                    onChange={handleChange}
                    className="underline-input"
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
                    className="underline-input"
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
            <h2 className="panel-title-payment">Payment</h2>

            <div className="payment-summary-header">
              <div className="plan-info-block">
                <h3 className="subscription-type">E-commerce Subscription</h3>
                <div className="plan-name-line">
                  <span className="plan-text">Plan:</span>
                  <span className="plan-name-value">{plan?.name}</span>
                </div>
                <p className="hosting-note">Fully managed on our hosting.</p>
              </div>
              <div className="price-large">৳{actualPrice.toLocaleString()}</div>
            </div>

            <div className="discount-input-box">
              <DiscountIcon />
              <input
                type="text"
                name="discountCode"
                placeholder="Discount code"
                value={formData.discountCode}
                onChange={handleChange}
                className="discount-field"
              />
              <button
                className="apply-discount-btn"
                onClick={handleApplyDiscount}
                type="button"
              >
                Apply
              </button>
            </div>

            <div className="price-breakdown-section">
              <div className="price-line">
                <span className="price-label">Subtotal</span>
                <span className="price-value">৳{actualPrice.toLocaleString()}</span>
              </div>
              <div className="price-line">
                <span className="price-label">Discount</span>
                <span className="price-value discount-value">-৳{discount}</span>
              </div>
              <div className="price-line total-line">
                <span className="total-label">Total</span>
                <span className="total-value">৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
