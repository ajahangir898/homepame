import { memo, useState, useEffect, useCallback } from "react";
import "./style.css";

// Sample website showcases data
const websiteShowcases = [
  {
    id: 1,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
  {
    id: 2,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
  {
    id: 3,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
  {
    id: 4,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
  {
    id: 5,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
  {
    id: 6,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
  {
    id: 7,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
  {
    id: 8,
    image: "https://hdnfltv.com/image/nitimages/softlab_it_website_banner_1.webp",
    link: "#",
  },
];

// Memoized Website Card Component
const WebsiteCard = memo(({ showcase }) => (
  <div className="website-card">
    <div className="website-image-container">
      <img
        src={showcase.image}
        alt="Website Preview"
        className="website-image"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="website-card-footer">
      <a href={showcase.link} className="view-website-btn">
        View Website
      </a>
    </div>
  </div>
));

WebsiteCard.displayName = "WebsiteCard";

// Pagination Dot Component
const PaginationDot = memo(({ index, isActive, onClick }) => (
  <button
    className={`pagination-dot ${isActive ? "pagination-dot-active" : ""}`}
    onClick={() => onClick(index)}
    aria-label={`Go to slide ${index + 1}`}
  />
));

PaginationDot.displayName = "PaginationDot";

export const OnlineStoreShowcase = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 4;
  const totalSlides = Math.ceil(websiteShowcases.length / itemsPerPage);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleDotClick = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Get current visible items
  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerPage;
    return websiteShowcases.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="online-store-showcase">
      <div className="showcase-container">
        {/* Header Section */}
        <div className="showcase-header">
          <h2 className="showcase-title">Create an Online Store Today</h2>
          <p className="showcase-subtitle">
            Innovative web development and digital marketing strategies to scale your business.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="showcase-carousel-wrapper">
          <div className="showcase-carousel">
            {getCurrentItems().map((showcase) => (
              <WebsiteCard key={showcase.id} showcase={showcase} />
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="showcase-pagination">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <PaginationDot
                key={index}
                index={index}
                isActive={currentSlide === index}
                onClick={handleDotClick}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="showcase-cta">
          <button className="build-website-btn">
            Build a Website
          </button>
          <a href="#pricing" className="subscription-link">
            Subscription Packages
          </a>
        </div>
      </div>
    </section>
  );
});

OnlineStoreShowcase.displayName = "OnlineStoreShowcase";
