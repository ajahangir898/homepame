import { memo } from "react";
import "./style.css";

const CheckIcon = () => (
  <svg className="check-icon" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="none" />
    <path d="M7 12l4 4 6-7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const FeatureItem = ({ text, subtext }) => (
  <div className="feature-item">
    <CheckIcon />
    <div className="feature-text">
      <span>{text}</span>
      {subtext && <span className="feature-subtext">{subtext}</span>}
    </div>
  </div>
);

const PricingCard = memo(({ plan }) => (
  <div className="pricing-card">
    {plan.badge && <span className={`card-badge ${plan.badgeColor}`}>{plan.badge}</span>}
    
    <div className="card-top">
      <div className="plan-info">
        <h3 className="plan-name">{plan.name}</h3>
        <p className="plan-tagline">{plan.tagline}</p>
      </div>
      <div className="plan-price">
        <span className="price-value">৳{plan.price}</span>
        <span className="price-period">/Month</span>
      </div>
    </div>
    
    <div className="features-grid">
      <div className="features-column">
        {plan.featuresLeft.map((feature, index) => (
          <FeatureItem 
            key={index} 
            text={typeof feature === 'object' ? feature.text : feature}
            subtext={typeof feature === 'object' ? feature.subtext : null}
          />
        ))}
      </div>
      <div className="features-column">
        {plan.featuresRight.map((feature, index) => (
          <FeatureItem 
            key={index} 
            text={typeof feature === 'object' ? feature.text : feature}
            subtext={typeof feature === 'object' ? feature.subtext : null}
          />
        ))}
      </div>
    </div>
    
    <button className={`subscribe-btn ${plan.btnStyle}`}>
      SUBSCRIBE NOW
    </button>
  </div>
));

PricingCard.displayName = "PricingCard";

export const CreateYourShop = memo(() => {
  const plans = [
    {
      name: "Startup",
      tagline: "Hands-free hosting & updates.",
      price: "300",
      featuresLeft: [
        "Free Sub-Domain & Hosting",
        "User Friendly Dashboard",
        "Unlimited Product Upload",
        "Live Chat Support",
        "Next.js Performance",
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" },
      ],
      featuresRight: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme",
      ],
      btnStyle: "btn-outline",
    },
    {
      name: "Enterprise",
      badge: "Enterprise",
      badgeColor: "badge-purple",
      tagline: "Hands-free hosting & updates.",
      price: "600",
      featuresLeft: [
        "Free Sub-Domain & Hosting",
        "User Friendly Dashboard",
        "Unlimited Product Upload",
        "Live Chat Support",
        "Next.js Performance",
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" },
      ],
      featuresRight: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme",
        "Business Report",
      ],
      btnStyle: "btn-filled",
    },
    {
      name: "Advanced",
      badge: "Advanced",
      badgeColor: "badge-blue",
      tagline: "Hands-free hosting & updates.",
      price: "900",
      featuresLeft: [
        "Free Sub-Domain & Hosting",
        "User Friendly Dashboard",
        "Unlimited Product Upload",
        "Live Chat Support",
        "Next.js Performance",
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" },
      ],
      featuresRight: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme",
        "Business Report",
        "Theme Customization Request",
      ],
      btnStyle: "btn-outline",
    },
    {
      name: "Premium",
      badge: "Premium",
      badgeColor: "badge-orange",
      tagline: "Hands-free hosting & updates.",
      price: "1200",
      featuresLeft: [
        "Free Sub-Domain & Hosting",
        "User Friendly Dashboard",
        "Unlimited Product Upload",
        "Live Chat Support",
        "Next.js Performance",
        { text: "Initial Load Time 0.2 sec", subtext: "(no reload time)" },
      ],
      featuresRight: [
        "SSL & Security",
        "Mobile First Approach",
        "Customizable Theme",
        "Business Report",
        "Full Frontend Customization",
      ],
      btnStyle: "btn-filled",
    },
  ];

  return (
    <section className="create-shop-section" id="create-shop">
      <div className="create-shop-container">
        <div className="shop-header">
          <span className="shop-label">Create Your Shop</span>
          <h2 className="shop-title">
            Go <span className="text-green">digital</span> for free: Start your <span className="text-orange">shop</span>
          </h2>
          <p className="shop-subtitle">
            Smart automation and Ready-to-launch business websites
          </p>
        </div>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
});

CreateYourShop.displayName = "CreateYourShop";
