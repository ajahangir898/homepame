import "./style.css";

export const FrameWrapper = () => {
  const services = [
    {
      id: 1,
      title: "Web",
      tech: "Next.js, React",
      description: "Professional web development using modern frameworks like Next.js and React.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/group-33653@2x.png",
    },
    {
      id: 2,
      title: "Ecommerce",
      tech: "Powerful, Scalable",
      description: "Secure eCommerce stores with smooth checkout and high conversions.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/flask.svg",
    },
    {
      id: 3,
      title: "App",
      tech: "React Native, Flutter",
      description: "Build cross-platform mobile apps with smooth performance.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/pound.svg",
    },
    {
      id: 4,
      title: "Interface Design",
      tech: "UI/UX, Figma",
      description: "Engaging and intuitive interface design for better user experience.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/group-33653-1@2x.png",
    },
    {
      id: 5,
      title: "Social Media",
      tech: "SEO, Digital Marketing",
      description: "Grow your presence with strategic SEO and marketing campaigns.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/group-33653-2@2x.png",
    },
    {
      id: 6,
      title: "Software",
      tech: "Electron.js",
      description: "Custom desktop applications tailored to your business needs.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/puzzle-1.svg",
    },
    {
      id: 7,
      title: "Brand Identity",
      tech: "Logo, Style Guide, Assets",
      description: "Creating a unique brand voice and visual identity that stands out.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/group-33653-3@2x.png",
    },
    {
      id: 8,
      title: "Maintenance",
      tech: "Security, Updates, Logs",
      description: "24/7 support to keep your apps secure, updated, and running smoothly.",
      icon: "https://c.animaapp.com/6PVGKTMi/img/puzzle.svg",
    },
  ];

  const steps = [
    {
      id: 1,
      title: "Define the problem",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      id: 2,
      title: "Develop a Solution",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
    {
      id: 3,
      title: "Refine",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    },
  ];

  return (
    <div className="frame-wrapper">
      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="section-header">
          <h2 className="section-title">Services & Technologies</h2>
          <p className="section-subtitle">
            Innovative web development and digital marketing strategies to scale your business.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <img src={service.icon} alt={service.title} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-tech">{service.tech}</p>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>

        <button className="cta-btn">
          Our services
          <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title centered">How it Works</h2>

        <div className="steps-container">
          <div className="step-card step-card-1">
            <div className="step-icon step-icon-1">
              <img src="https://hdnfltv.com/image/nitimages/Search.webp" alt="Define Problem" />
            </div>
            <h3 className="step-title">Define the problem</h3>
            <p className="step-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <div className="step-decoration step-decoration-1"></div>
          </div>
          
          <div className="step-card step-card-2">
            <div className="step-icon step-icon-2">
              <img src="https://hdnfltv.com/image/nitimages/Group.webp" alt="Develop a Solution" />
            </div>
            <h3 className="step-title">Develop a Solution</h3>
            <p className="step-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <div className="step-decoration step-decoration-2"></div>
          </div>
          
          <div className="step-card step-card-3">
            <div className="step-icon step-icon-3">
              <img src="https://hdnfltv.com/image/nitimages/Group__1_.webp" alt="Refine" />
            </div>
            <h3 className="step-title">Refine</h3>
            <p className="step-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <div className="step-decoration step-decoration-3"></div>
          </div>
        </div>

        <button className="learn-more-btn centered">
          Learn more
          <svg className="arrow-circle" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </section>
    </div>
  );
};
