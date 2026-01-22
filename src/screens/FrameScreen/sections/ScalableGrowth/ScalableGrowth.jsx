import { memo } from "react";
import "./style.css";

const RadioIcon = ({ color = "#15803d", filled = false, theme = "green" }) => {
  if (theme === "green") {
    return (
      <img 
        src="https://hdnfltv.com/image/nitimages/check-circle__4_.webp" 
        alt="radio" 
        className="scalable-radio-icon-img"
      />
    );
  }
  return (
    <div className="radio-icon" style={{ borderColor: color }}>
      {filled && <div className="radio-filled" style={{ backgroundColor: color }}></div>}
    </div>
  );
};

const WebsiteCard = memo(({ card }) => (
  <div className={`website-card website-card-${card.theme}`}>
    <div className="website-card-header">
      <h3 className="website-card-title">{card.title}</h3>
      <p className="website-card-subtitle">{card.subtitle}</p>
    </div>
    
    <ul className="website-card-features">
      {card.features.map((feature, index) => (
        <li key={index} className="website-feature-item">
          <RadioIcon color={card.radioColor} theme={card.theme} filled={card.theme === 'blue' && index === card.features.length - 1} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <p className="hosting-note">Hosting charges will add on your storage requirements.</p>
    
    <button className={`website-card-btn website-card-btn-${card.theme}`}>
      {card.btnText}
    </button>
  </div>
));

WebsiteCard.displayName = "WebsiteCard";

const AppCard = memo(({ app }) => (
  <div className="app-card">
    <div className="app-card-content">
      <h3 className="app-card-title">{app.title}</h3>
      <p className="app-card-subtitle">{app.subtitle}</p>
    </div>
    <button className={`app-card-btn app-card-btn-${app.theme}`}>
      Contact Us
    </button>
  </div>
));

AppCard.displayName = "AppCard";

export const ScalableGrowth = memo(() => {
  const websiteCards = [
    {
      title: "Ready Website",
      subtitle: "Fully managed on our hosting.",
      theme: "green",
      radioColor: "#15803d",
      btnText: "Get Licence",
      features: [
        "WordPress Website - 5,000 BDT",
        "PHP Laravel Website 9,999 BDT",
        "Next.js Website 20,000 BDT"
      ]
    },
    {
      title: "Custom Website",
      subtitle: "Flexible hosting: Yours or ours.",
      theme: "orange",
      radioColor: "#f97316",
      btnText: "Contact Us",
      features: [
        "WordPress Website (With 5 Reviews) 9,999 BDT",
        "PHP Laravel Website (With 5 Reviews) Starting From 15,000 BDT",
        "Next.js Website (With 5 Reviews) Starting From 30,000 BDT"
      ]
    },
    {
      title: "Website With Source Code",
      subtitle: "Your hosting or our managed servers.",
      theme: "blue",
      radioColor: "#2563eb",
      btnText: "Contact Us",
      features: [
        "WordPress Website (With 5 Reviews) Starting From 15,000 BDT",
        "PHP Laravel Website (With 5 Reviews) Starting From 45,000 BDT",
        "Next.js Website (With 5 Reviews) Starting From 90,000 BDT"
      ]
    }
  ];

  const appCards = [
    {
      title: "Flutter App",
      subtitle: "APK Build Only Trusted by Google",
      theme: "orange"
    },
    {
      title: "Google Play Store",
      subtitle: "APK Build With Upload to Play store+ App Store",
      theme: "blue"
    }
  ];

  return (
    <section className="scalable-growth-section" id="scalable-growth">
      <div className="scalable-growth-container">
        <div className="scalable-growth-header">
          <span className="scalable-growth-label">CHOOSE YOUR PLAN</span>
          <h2 className="scalable-growth-title">
            <span className="text-orange">Scalable</span>
            <span className="text-slate"> Digital</span>
            <span className="text-sky"> Growth</span>
          </h2>
          <p className="scalable-growth-subtitle">
            Conversion-optimized websites and data-driven marketing designed to grow your revenue and brand.
          </p>
        </div>
        
        <div className="website-cards-grid">
          {websiteCards.map((card, index) => (
            <WebsiteCard key={index} card={card} />
          ))}
        </div>

        <div className="app-cards-grid">
          {appCards.map((app, index) => (
            <AppCard key={index} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
});

ScalableGrowth.displayName = "ScalableGrowth";
