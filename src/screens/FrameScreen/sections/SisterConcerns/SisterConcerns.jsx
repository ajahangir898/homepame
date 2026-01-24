import { memo } from "react";
import "./style.css";

export const SisterConcerns = memo(() => {
  return (
    <section className="sister-concerns-section">
      <div className="sister-concerns-container">
        <div className="sister-concerns-inner">
          <div className="sister-concerns-header">
            <h2 className="sister-concerns-title">Our Sister Concerns</h2>
            <p className="sister-concerns-subtitle">A venture of SystemNext IT</p>
          </div>

          <div className="sister-concerns-logo-wrapper">
            <img
              src="https://hdnfltv.com/image/nitimages/image_955.webp"
              alt="Overseas Products Logo"
              className="sister-logo-main"
            />
            <img
              src="https://hdnfltv.com/image/nitimages/fa5f05eb360601ac12ec34855f96d6224c8cc9aa.webp"
              alt="Overseas Products Text"
              className="sister-logo-text"
            />
            <a
              href="https://www.opbd.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="sister-website-link"
            >
              www.opbd.shop
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

SisterConcerns.displayName = "SisterConcerns";
