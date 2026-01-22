import { memo } from "react";
import "./style.css";

const RadioIcon = ({ color = "#15803d", filled = false }) => {
  if (filled) {
    return (
      <div 
        className="marketing-radio-filled" 
        style={{ backgroundColor: color }}
      />
    );
  }
  return (
    <div className="marketing-radio-icon" style={{ borderColor: color }} />
  );
};

const MarketingCard = memo(({ card }) => (
  <div className={`marketing-card marketing-card-${card.theme}`}>
    <div className="marketing-card-header">
      <h3 className="marketing-card-title">{card.title}</h3>
      <p className="marketing-card-subtitle">{card.subtitle}</p>
    </div>
    
    <ul className="marketing-card-features">
      {card.features.map((feature, index) => (
        <li key={index} className="marketing-feature-item">
          <RadioIcon 
            color={card.radioColor} 
            filled={card.filledIndex === index} 
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button className={`marketing-card-btn marketing-card-btn-${card.theme}`}>
      Get Appointment
    </button>
  </div>
));

MarketingCard.displayName = "MarketingCard";

export const EmpoweringTech = memo(() => {
  const marketingCards = [
    {
      title: "Facebook Marketing",
      subtitle: "Proven strategies to boost your online sales.",
      theme: "green",
      radioColor: "#15803d",
      filledIndex: 2,
      features: [
        "Post Create and Boost (x1) 1000 BDT",
        "Post Create and Boost (x3) 2500 BDT",
        "Post Create and Boost (x8) 5000 BDT"
      ]
    },
    {
      title: "SEO",
      subtitle: "Better rankings. More traffic. Higher revenue.",
      theme: "orange",
      radioColor: "#f97316",
      filledIndex: -1,
      features: [
        "On Page SEO",
        "Off Page SEO",
        "Local SEO",
        "Technical SEO"
      ]
    },
    {
      title: "Contract Basis",
      subtitle: "Grow your business with long-term organic growth.",
      theme: "blue",
      radioColor: "#2563eb",
      filledIndex: -1,
      features: [
        "Full Stack Digital Marketing Package",
        "E-commerce F-commerce Basic Setup"
      ]
    }
  ];

  return (
    <section className="empowering-tech-section" id="empowering-tech">
      <div className="empowering-tech-container">
        <div className="empowering-tech-header">
          <span className="empowering-tech-label">Boost Your Sales</span>
          <h2 className="empowering-tech-title">
            <span className="text-lime">Empowering </span>
            <span className="text-orange">Tech,</span>
            <span className="text-lime"> Enriching </span>
            <span className="text-sky">Trade</span>
          </h2>
          <p className="empowering-tech-subtitle">
            Maximize Your Global Reach and Strategically Multiply Your Business Revenue.
          </p>
        </div>
        
        <div className="marketing-cards-grid">
          {marketingCards.map((card, index) => (
            <MarketingCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
});

EmpoweringTech.displayName = "EmpoweringTech";
