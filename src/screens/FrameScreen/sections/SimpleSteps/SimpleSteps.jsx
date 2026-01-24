import { memo, useState } from "react";
import { BookingModal } from "../../../../components/BookingModal/BookingModal";
import "./style.css";

const StepCard = memo(({ step, index }) => (
  <div className="simple-step-card">
    <div className="simple-step-badge">
      <span>Step 0{index + 1}</span>
    </div>
    <div className="simple-step-card-content">
      <div className="simple-step-card-header">
        <h3 className="simple-step-card-title">{step.title}</h3>
        <div className="simple-step-card-icon">
          <img src={step.icon} alt={step.title} loading="lazy" />
        </div>
      </div>
      <p className="simple-step-card-description">{step.description}</p>
    </div>
  </div>
));

StepCard.displayName = "StepCard";

export const SimpleSteps = memo(() => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up to launch your online store and accesspowerful tools to grow your business",
      icon: "https://hdnfltv.com/image/nitimages/mdi_account-plus__1_.webp",
    },
    {
      id: 2,
      title: "Set Up Your Store",
      description: "Add your store name, select your country and category to launch in minutes.",
      icon: "https://hdnfltv.com/image/nitimages/streamline-plump_store-2-solid.webp",
    },
    {
      id: 3,
      title: "Set up your business",
      description: "Start selling by adding your product. Enter product details like name, price and photos to showcase what you're offering.",
      icon: "https://hdnfltv.com/image/nitimages/Frame_1000001880__1_.webp",
    },
  ];

  return (
    <section className="simple-steps-section">
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      
      <div className="simple-steps-container">
        {/* Header */}
        <div className="simple-steps-header">
          <h2 className="simple-steps-title">
            Simple Steps to Make Your Website Live
          </h2>
          <p className="simple-steps-subtitle">
            No need to learn Design or development. We have simplified everything so you can build your store confidently, quickly and without any technical knowledge
          </p>
        </div>

        {/* Steps Grid */}
        <div className="simple-steps-grid">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="simple-steps-cta">
          <button className="simple-steps-btn simple-steps-btn-primary" onClick={openBooking}>
            Book a Call
          </button>
          <a href="#pricing" className="simple-steps-btn simple-steps-btn-secondary">
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
});

SimpleSteps.displayName = "SimpleSteps";
