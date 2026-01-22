import "./style.css";

// Base Skeleton Component with shimmer animation
export const Skeleton = ({ width, height, variant = "rectangular", className = "" }) => {
  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={{
        width: width || "100%",
        height: height || "20px",
      }}
    />
  );
};

// ========== HERO SECTION SKELETON ==========
// Matches exact layout of Frame.jsx - centered content
export const HeroSkeleton = () => {
  return (
    <div className="frame-skeleton">
      {/* Navigation */}
      <nav className="nav-skeleton">
        <div className="nav-left-skeleton">
          <Skeleton width="160px" height="45px" className="logo-skeleton" />
        </div>
        <div className="nav-menu-skeleton">
          <Skeleton width="75px" height="18px" />
          <Skeleton width="75px" height="18px" />
          <Skeleton width="75px" height="18px" />
          <Skeleton width="60px" height="18px" />
          <Skeleton width="50px" height="18px" />
        </div>
        <div className="nav-right-skeleton">
          <Skeleton width="60px" height="20px" />
          <Skeleton width="55px" height="18px" />
          <Skeleton width="110px" height="42px" variant="rounded" className="btn-skeleton" />
        </div>
      </nav>

      {/* Hero Content - CENTERED like real design */}
      <div className="hero-content-skeleton">
        <Skeleton width="220px" height="14px" className="caption-skeleton" />
        
        <div className="title-skeleton-row">
          <Skeleton width="280px" height="52px" className="title-skeleton" />
          <Skeleton width="200px" height="52px" className="title-skeleton orange" />
        </div>
        
        <Skeleton width="520px" height="18px" className="desc-skeleton" />
        
        {/* CTA Buttons - centered */}
        <div className="cta-skeleton">
          <Skeleton width="130px" height="48px" variant="rounded" className="btn-primary-skeleton" />
          <Skeleton width="140px" height="48px" variant="rounded" className="btn-secondary-skeleton" />
        </div>
      </div>

      {/* Hero Image Area - BELOW content, centered */}
      <div className="hero-image-skeleton">
        <Skeleton width="700px" height="350px" variant="rounded" className="main-image-skeleton" />
      </div>
    </div>
  );
};

// ========== SERVICES SECTION SKELETON ==========
// Matches exact layout of FrameWrapper services section
const ServiceCardSkeleton = () => (
  <div className="service-card-skeleton">
    <div className="service-icon-skeleton-wrapper">
      <Skeleton width="48px" height="48px" variant="rectangular" />
    </div>
    <Skeleton width="100px" height="22px" className="service-title-skel" />
    <Skeleton width="120px" height="14px" className="service-tech-skel" />
    <Skeleton width="100%" height="12px" />
    <Skeleton width="85%" height="12px" />
  </div>
);

export const ServicesSkeleton = () => {
  return (
    <div className="services-section-skeleton">
      {/* Section Header */}
      <div className="section-header-skeleton">
        <Skeleton width="320px" height="42px" className="section-title-skel" />
        <Skeleton width="480px" height="18px" className="section-subtitle-skel" />
      </div>

      {/* Services Grid - 4x2 */}
      <div className="services-grid-skeleton">
        {[...Array(8)].map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>

      {/* CTA Button */}
      <div className="services-cta-skeleton">
        <Skeleton width="160px" height="48px" variant="rounded" />
      </div>

      {/* How It Works Section */}
      <div className="how-works-skeleton">
        <Skeleton width="200px" height="42px" className="section-title-skel centered" />
        
        <div className="steps-grid-skeleton">
          {/* Step 1 */}
          <div className="step-card-skeleton step-1-skel">
            <div className="step-icon-skel">
              <Skeleton width="60px" height="60px" variant="circular" />
            </div>
            <Skeleton width="160px" height="22px" />
            <Skeleton width="90%" height="12px" />
            <Skeleton width="80%" height="12px" />
          </div>
          
          {/* Step 2 - Middle card (elevated) */}
          <div className="step-card-skeleton step-2-skel">
            <div className="step-icon-skel">
              <Skeleton width="60px" height="60px" variant="circular" />
            </div>
            <Skeleton width="180px" height="22px" />
            <Skeleton width="90%" height="12px" />
            <Skeleton width="85%" height="12px" />
          </div>
          
          {/* Step 3 */}
          <div className="step-card-skeleton step-3-skel">
            <div className="step-icon-skel">
              <Skeleton width="60px" height="60px" variant="circular" />
            </div>
            <Skeleton width="100px" height="22px" />
            <Skeleton width="90%" height="12px" />
            <Skeleton width="75%" height="12px" />
          </div>
        </div>
        
        {/* Learn More */}
        <div className="learn-more-skeleton">
          <Skeleton width="100px" height="18px" />
          <Skeleton width="24px" height="24px" variant="circular" />
        </div>
      </div>
    </div>
  );
};

// ========== PRICING SECTION SKELETON ==========
const PricingCardSkeleton = ({ variant = "default" }) => (
  <div className={`pricing-card-skeleton ${variant}`}>
    <Skeleton width="140px" height="24px" className="plan-name-skel" />
    <Skeleton width="180px" height="12px" />
    
    <div className="price-skeleton">
      <Skeleton width="160px" height="36px" />
    </div>
    
    <div className="features-skeleton">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="feature-item-skel">
          <Skeleton width="20px" height="20px" variant="circular" />
          <Skeleton width="140px" height="14px" />
        </div>
      ))}
    </div>
    
    <Skeleton width="100%" height="44px" variant="rounded" className="btn-skel" />
  </div>
);

export const PricingSkeleton = () => (
  <div className="pricing-section-skeleton">
    <div className="pricing-header-skeleton">
      <Skeleton width="140px" height="14px" className="label-skel" />
      <Skeleton width="360px" height="44px" />
      <Skeleton width="300px" height="16px" />
    </div>
    
    <div className="pricing-cards-skeleton">
      <PricingCardSkeleton />
      <PricingCardSkeleton variant="featured" />
      <PricingCardSkeleton />
    </div>
  </div>
);

// ========== CONTACT SECTION SKELETON ==========
export const ContactSkeleton = () => {
  return (
    <div className="contact-section-skeleton">
      <div className="contact-wrapper-skeleton">
        {/* Contact Info Card */}
        <div className="contact-info-skeleton">
          <Skeleton width="180px" height="28px" />
          <Skeleton width="280px" height="14px" />
          
          <div className="contact-details-skeleton">
            <div className="contact-item-skel">
              <Skeleton width="40px" height="40px" variant="circular" />
              <Skeleton width="180px" height="14px" />
            </div>
            <div className="contact-item-skel">
              <Skeleton width="40px" height="40px" variant="circular" />
              <Skeleton width="200px" height="14px" />
            </div>
            <div className="contact-item-skel">
              <Skeleton width="40px" height="40px" variant="circular" />
              <Skeleton width="160px" height="14px" />
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="social-skeleton">
            <Skeleton width="36px" height="36px" variant="circular" />
            <Skeleton width="36px" height="36px" variant="circular" />
            <Skeleton width="36px" height="36px" variant="circular" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-skeleton">
          <div className="form-row-skel">
            <div className="form-field-skel">
              <Skeleton width="80px" height="12px" />
              <Skeleton width="100%" height="48px" variant="rounded" />
            </div>
            <div className="form-field-skel">
              <Skeleton width="80px" height="12px" />
              <Skeleton width="100%" height="48px" variant="rounded" />
            </div>
          </div>
          <div className="form-row-skel">
            <div className="form-field-skel">
              <Skeleton width="60px" height="12px" />
              <Skeleton width="100%" height="48px" variant="rounded" />
            </div>
            <div className="form-field-skel">
              <Skeleton width="100px" height="12px" />
              <Skeleton width="100%" height="48px" variant="rounded" />
            </div>
          </div>
          <div className="form-field-skel full">
            <Skeleton width="70px" height="12px" />
            <Skeleton width="100%" height="120px" variant="rounded" />
          </div>
          <Skeleton width="140px" height="48px" variant="rounded" className="submit-btn-skel" />
        </div>
      </div>
    </div>
  );
};

// ========== FOOTER SKELETON ==========
export const FooterSkeleton = () => {
  return (
    <div className="footer-section-skeleton">
      <div className="footer-content-skeleton">
        {/* Logo */}
        <div className="footer-logo-skeleton">
          <Skeleton width="140px" height="50px" />
        </div>

        {/* Links Columns */}
        <div className="footer-links-skeleton">
          <div className="footer-col-skeleton">
            <Skeleton width="80px" height="16px" className="col-title-skel" />
            <Skeleton width="50px" height="12px" />
            <Skeleton width="60px" height="12px" />
            <Skeleton width="45px" height="12px" />
          </div>
          <div className="footer-col-skeleton">
            <Skeleton width="60px" height="16px" className="col-title-skel" />
            <Skeleton width="90px" height="12px" />
            <Skeleton width="100px" height="12px" />
            <Skeleton width="85px" height="12px" />
            <Skeleton width="80px" height="12px" />
          </div>
          <div className="footer-col-skeleton">
            <Skeleton width="90px" height="16px" className="col-title-skel" />
            <Skeleton width="55px" height="12px" />
            <Skeleton width="75px" height="12px" />
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter-skeleton">
          <Skeleton width="180px" height="22px" />
          <div className="newsletter-form-skel">
            <Skeleton width="200px" height="48px" variant="rounded" />
            <Skeleton width="100px" height="48px" variant="rounded" />
          </div>
          <Skeleton width="260px" height="12px" />
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom-skeleton">
        <Skeleton width="280px" height="14px" />
      </div>
    </div>
  );
};

// ========== FULL PAGE SKELETON ==========
export const PageSkeleton = () => {
  return (
    <div className="page-skeleton">
      <HeroSkeleton />
    </div>
  );
};
