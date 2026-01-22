import { memo } from "react";
import "./style.css";

const CheckIcon = ({ color = "#15803d", theme = "green" }) => {
  if (theme === "green") {
    return (
      <img 
        src="https://hdnfltv.com/image/nitimages/check-circle.webp" 
        alt="check" 
        className="pricing-check-icon-img"
      />
    );
  }
  if (theme === "blue") {
    return (
      <img 
        src="https://hdnfltv.com/image/nitimages/check-circle__1_.webp" 
        alt="check" 
        className="pricing-check-icon-img"
      />
    );
  }
  if (theme === "orange") {
    return (
      <img 
        src="https://hdnfltv.com/image/nitimages/check-circle__2__1769103709.webp" 
        alt="check" 
        className="pricing-check-icon-img"
      />
    );
  }
  if (theme === "premium") {
    return (
      <img 
        src="https://hdnfltv.com/image/nitimages/check-circle__3_.webp" 
        alt="check" 
        className="pricing-check-icon-img"
      />
    );
  }
  return (
    <div className="pricing-check-icon-wrapper">
      <div className="pricing-check-icon-box" style={{ backgroundColor: color }}></div>
    </div>
  );
};

const PricingCard = memo(({ plan }) => (
  <div className={`pricing-card pricing-card-${plan.theme}`}>
    <div className="pricing-card-header">
      <div className="pricing-card-title-section">
        <h3 className="pricing-plan-name">{plan.name}</h3>
        <p className="pricing-plan-tagline">Hands-free hosting & updates.</p>
      </div>
      <div className="pricing-card-price">
        <span className="pricing-price-amount">৳{plan.price}</span>
        <span className="pricing-price-period">/Month</span>
      </div>
    </div>
    
    <div className="pricing-features-grid">
      <ul className="pricing-features-left">
        {plan.leftFeatures.map((feature, index) => (
          <li key={index} className="pricing-feature-item">
            <CheckIcon color={plan.checkColor} theme={plan.theme} />
            <div className="pricing-feature-text">
              <span>{feature.text}</span>
              {feature.subtext && <span className="pricing-feature-subtext">{feature.subtext}</span>}
            </div>
          </li>
        ))}
      </ul>
      <ul className="pricing-features-right">
        {plan.rightFeatures.map((feature, index) => (
          <li key={index} className="pricing-feature-item">
            <CheckIcon color={plan.checkColor} theme={plan.theme} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <button className={`pricing-subscribe-btn pricing-subscribe-btn-${plan.theme}`}>
      SUBSCRIBE NOW
    </button>
  </div>
));

PricingCard.displayName = "PricingCard";

export const Pricing = memo(() => {
  const plans = [
    {
      name: "Startup",
      price: "300",
      theme: "green",
      checkColor: "#15803d",
      leftFeatures: [
        { text: "Free Sub-Domain & Hosting" },
        { text: "User Friendly Dashboard" },
        { text: "Unlimited Product Upload" },
        { text: "Live Chat Support" },
        { text: "Next.js Performance" },
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" }
      ],
      rightFeatures: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme"
      ]
    },
    {
      name: "Enterprise",
      price: "600",
      theme: "blue",
      checkColor: "#3b82f6",
      leftFeatures: [
        { text: "Free Sub-Domain & Hosting" },
        { text: "User Friendly Dashboard" },
        { text: "Unlimited Product Upload" },
        { text: "Live Chat Support" },
        { text: "Next.js Performance" },
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" }
      ],
      rightFeatures: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme",
        "Business Report"
      ]
    },
    {
      name: "Advanced",
      price: "900",
      theme: "orange",
      checkColor: "#f97316",
      leftFeatures: [
        { text: "Free Sub-Domain & Hosting" },
        { text: "User Friendly Dashboard" },
        { text: "Unlimited Product Upload" },
        { text: "Live Chat Support" },
        { text: "Next.js Performance" },
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" }
      ],
      rightFeatures: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme",
        "Business Report",
        "Theme Customization Request"
      ]
    },
    {
      name: "Premium",
      price: "1200",
      theme: "premium",
      checkColor: "#2563eb",
      leftFeatures: [
        { text: "Free Sub-Domain & Hosting" },
        { text: "User Friendly Dashboard" },
        { text: "Unlimited Product Upload" },
        { text: "Live Chat Support" },
        { text: "Next.js Performance" },
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" }
      ],
      rightFeatures: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme",
        "Business Report",
        "Full Frontend Customization"
      ]
    }
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header-section">
          <span className="pricing-label">Create Your Shop</span>
          <h2 className="pricing-title">
            <span className="text-brown">Go </span>
            <span className="text-orange">digital</span>
            <span className="text-brown"> for free: Start your </span>
            <span className="text-sky">shop</span>
          </h2>
          <p className="pricing-subtitle">
            Smart automation and Ready-to-launch business websites
          </p>
        </div>
        
        <div className="pricing-cards-grid">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";
