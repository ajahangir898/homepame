import { memo, useEffect, useRef, useState } from "react";
import "./style.css";

// Custom hook for scroll-based animation
const useScrollAnimation = (ref) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calculate progress: 0 when element enters viewport, 1 when it's centered
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - elementTop) / (windowHeight + elementHeight * 0.5)
      ));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return scrollProgress;
};

// Curved Dashed Line SVG Component
const CurvedLine = ({ className, flip }) => (
  <svg 
    className={className} 
    width="68" 
    height="156" 
    viewBox="0 0 68 156" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={flip ? { transform: 'scaleX(-1)' } : {}}
  >
    <path d="M65.5005 72.0017L66.4776 72.2147L65.5005 72.0017ZM28.8917 81.8825L29.5598 81.1384L28.8917 81.8825ZM16.4229 155.881L27.9494 155.193L21.5905 145.555L16.4229 155.881ZM16.2836 0.999642L16.2664 1.99949C16.9369 2.01103 17.6019 2.0376 18.2613 2.07882L18.3237 1.08077L18.3861 0.0827142C17.6965 0.039611 17.0013 0.0118434 16.3008 -0.00021039L16.2836 0.999642ZM22.3599 1.5193L22.2061 2.50741C23.5282 2.71317 24.826 2.97881 26.0987 3.30098L26.3441 2.33155L26.5895 1.36213C25.2567 1.02476 23.8978 0.746615 22.5137 0.531197L22.3599 1.5193ZM30.2346 3.51243L29.8999 4.45476C31.1531 4.89987 32.3793 5.4011 33.5776 5.9549L33.9972 5.04716L34.4167 4.13941C33.1638 3.5604 31.8811 3.03601 30.5693 2.57011L30.2346 3.51243ZM37.6074 6.91572L37.109 7.78267C38.2592 8.44393 39.3803 9.15508 40.4712 9.91253L41.0415 9.09111L41.6118 8.2697C40.4754 7.48062 39.3064 6.73898 38.1058 6.04877L37.6074 6.91572ZM44.2837 11.5447L43.6487 12.3172C44.6734 13.1595 45.6672 14.044 46.6291 14.9673L47.3216 14.2459L48.014 13.5245C47.0161 12.5666 45.984 11.6478 44.9187 10.7721L44.2837 11.5447ZM50.149 17.1672L49.4058 17.8363C50.2949 18.824 51.1516 19.8461 51.9749 20.8991L52.7627 20.2831L53.5505 19.6672C52.6993 18.5786 51.813 17.521 50.8922 16.4982L50.149 17.1672ZM55.1587 23.5676L54.3319 24.1301C55.0809 25.231 55.796 26.3587 56.4763 27.5097L57.3372 27.0008L58.198 26.492C57.4965 25.3051 56.7587 24.1416 55.9855 23.0051L55.1587 23.5676ZM59.2972 30.564L58.4066 31.0189C59.0138 32.2075 59.5854 33.4157 60.1206 34.64L61.0369 34.2394L61.9532 33.8389C61.4021 32.5782 60.8133 31.3338 60.1877 30.1091L59.2972 30.564ZM62.5544 38.0122L61.616 38.3577C62.0781 39.6129 62.5027 40.8805 62.8888 42.1572L63.846 41.8678L64.8032 41.5783C64.4056 40.2639 63.9685 38.9588 63.4928 37.6667L62.5544 38.0122ZM64.9069 45.7932L63.9341 46.0252C64.245 47.3288 64.5157 48.6379 64.7454 49.9489L65.7304 49.7764L66.7154 49.6038C66.4787 48.2526 66.1998 46.9039 65.8796 45.5612L64.9069 45.7932ZM66.307 53.8008L65.3132 53.9114C65.4615 55.2441 65.5665 56.5749 65.6272 57.8999L66.6262 57.8542L67.6251 57.8084C67.5624 56.4392 67.454 55.0652 67.3009 53.6901L66.307 53.8008ZM66.6742 61.9216L65.6744 61.8988C65.6439 63.2383 65.5661 64.5677 65.44 65.883L66.4355 65.9784L67.4309 66.0738C67.5617 64.709 67.6423 63.3311 67.6739 61.9444L66.6742 61.9216ZM65.8918 70.0093L64.9068 69.8367C64.7919 70.4923 64.6642 71.1432 64.5234 71.7888L65.5005 72.0017L66.4776 72.2147C66.6242 71.5419 66.7572 70.8642 66.8768 70.182L65.8918 70.0093ZM65.5005 72.0017L64.5234 71.7888C64.3806 72.4439 64.2334 73.0885 64.082 73.7226L65.0546 73.9549L66.0273 74.1872C66.1818 73.54 66.332 72.8826 66.4776 72.2147L65.5005 72.0017ZM64.0776 77.7017L63.1156 77.4286C62.7521 78.7094 62.3697 79.9425 61.9698 81.1292L62.9175 81.4486L63.8651 81.7679C64.2757 80.5494 64.6676 79.2855 65.0396 77.9747L64.0776 77.7017ZM61.5647 85.1303L60.6362 84.759C60.1437 85.9903 59.6305 87.1642 59.0983 88.2827L60.0013 88.7123L60.9043 89.1419C61.4554 87.9837 61.9855 86.7709 62.4932 85.5017L61.5647 85.1303ZM58.1991 92.1749L57.33 91.6802C56.6765 92.8283 56.0006 93.9064 55.3051 94.9177L56.129 95.4844L56.953 96.0511C57.6818 94.9914 58.3877 93.865 59.0682 92.6696L58.1991 92.1749ZM53.7654 98.5915L53.0009 97.9469C52.1562 98.9487 51.2891 99.8669 50.4035 100.706L51.0913 101.432L51.7791 102.158C52.7204 101.266 53.6386 100.293 54.53 99.236L53.7654 98.5915ZM48.1045 103.932L47.5127 103.126C46.4704 103.891 45.4086 104.562 44.3326 105.146L44.8095 106.025L45.2863 106.904C46.4426 106.277 47.5812 105.557 48.6964 104.738L48.1045 103.932ZM41.2496 107.64L40.9026 106.702C39.7095 107.144 38.5047 107.491 37.2945 107.751L37.5046 108.728L37.7146 109.706C39.0156 109.426 40.3121 109.053 41.5965 108.578L41.2496 107.64ZM33.6369 109.281L33.5633 108.284C32.3012 108.377 31.0401 108.385 29.7872 108.315L29.7317 109.314L29.6762 110.312C31.0115 110.387 32.359 110.379 33.7106 110.279L33.6369 109.281ZM25.8512 108.861L26.0257 107.876C24.7742 107.654 23.5398 107.361 22.3307 107.005L22.048 107.964L21.7653 108.923C23.0428 109.3 24.3494 109.61 25.6767 109.845L25.8512 108.861ZM18.363 106.663L18.7446 105.738C17.5583 105.249 16.4087 104.702 15.305 104.108L14.8313 104.989L14.3575 105.869C15.5202 106.495 16.7312 107.071 17.9814 107.587L18.363 106.663ZM11.4876 102.962L12.0499 102.135C10.9772 101.405 9.96949 100.635 9.03781 99.8359L8.38694 100.595L7.73606 101.354C8.72588 102.203 9.79286 103.019 10.9253 103.789L11.4876 102.962ZM5.58177 97.8639L6.32634 97.1963C5.44489 96.2132 4.68614 95.2148 4.0644 94.2221L3.2169 94.7529L2.3694 95.2837C3.05856 96.384 3.88842 97.4732 4.83722 98.5314L5.58177 97.8639ZM1.55479 91.2302L2.5097 90.9333C2.32645 90.344 2.20308 89.7703 2.14017 89.2164L1.14656 89.3293L0.152945 89.4421C0.231417 90.1331 0.38315 90.8301 0.599883 91.5271L1.55479 91.2302ZM1.14656 89.3293L2.14017 89.2164C2.06434 88.5487 2.01848 87.9058 2.00079 87.2879L1.0012 87.3165L0.00160524 87.3451C0.0209891 88.0222 0.071082 88.7213 0.152945 89.4421L1.14656 89.3293ZM1.30394 83.319L2.28524 83.5115C2.54511 82.1866 2.96948 81.0333 3.5255 80.0463L2.65425 79.5555L1.78299 79.0647C1.11263 80.2546 0.619619 81.6124 0.32264 83.1265L1.30394 83.319ZM5.25902 76.5321L5.86727 77.3259C6.80501 76.6073 7.89421 76.0776 9.10967 75.7471L8.84729 74.7821L8.58492 73.8171C7.13661 74.2109 5.80881 74.851 4.65077 75.7384L5.25902 76.5321ZM12.8264 74.3524L12.7915 75.3518C13.9785 75.3933 15.2338 75.5815 16.5376 75.9238L16.7915 74.9565L17.0454 73.9893C15.6117 73.613 14.2094 73.4001 12.8614 73.353L12.8264 74.3524ZM20.5684 76.3143L20.1545 77.2246C21.2768 77.7349 22.4167 78.3512 23.5625 79.0759L24.097 78.2308L24.6316 77.3857C23.4125 76.6145 22.1922 75.9541 20.9823 75.404L20.5684 76.3143ZM27.3599 80.5766L26.7313 81.3544C27.2302 81.7576 27.728 82.1816 28.2237 82.6266L28.8917 81.8825L29.5598 81.1384C29.0387 80.6706 28.5146 80.2241 27.9884 79.7989L27.3599 80.5766ZM28.8917 81.8825L28.2237 82.6266C28.676 83.0327 29.113 83.4587 29.5346 83.9037L30.2605 83.2159L30.9864 82.5281C30.5286 82.0449 30.0531 81.5812 29.5598 81.1384L28.8917 81.8825ZM32.6698 86.1777L31.8504 86.7509C32.5444 87.743 33.1819 88.7983 33.7625 89.9098L34.6489 89.4468L35.5352 88.9839C34.9171 87.8004 34.2353 86.6709 33.4891 85.6044L32.6698 86.1777ZM36.2226 92.9328L35.2901 93.2939C35.7304 94.4309 36.1202 95.6106 36.4595 96.8267L37.4227 96.558L38.3859 96.2893C38.0301 95.0138 37.6201 93.7723 37.1552 92.5717L36.2226 92.9328ZM38.2884 100.287L37.3056 100.472C37.5327 101.681 37.7146 102.916 37.8512 104.173L38.8454 104.065L39.8395 103.957C39.6975 102.651 39.5082 101.364 39.2712 100.103L38.2884 100.287ZM39.1217 107.882L38.1224 107.919C38.1683 109.158 38.1728 110.411 38.1357 111.673L39.1353 111.703L40.1348 111.732C40.1732 110.426 40.1686 109.129 40.121 107.845L39.1217 107.882ZM38.9011 115.52L37.9054 115.427C37.7899 116.669 37.6352 117.915 37.4414 119.161L38.4295 119.315L39.4177 119.469C39.6177 118.182 39.7774 116.896 39.8968 115.613L38.9011 115.52ZM37.7277 123.073L36.7507 122.86C36.4836 124.083 36.1789 125.301 35.8366 126.51L36.7987 126.783L37.7609 127.055C38.1144 125.806 38.429 124.549 38.7047 123.286L37.7277 123.073ZM35.6444 130.428L34.7009 130.096C34.2853 131.28 33.8326 132.45 33.343 133.602L34.2635 133.993L35.1839 134.384C35.6904 133.192 36.1584 131.982 36.5879 130.759L35.6444 130.428ZM32.6536 137.461L31.7612 137.009C31.1949 138.129 30.5915 139.227 29.9515 140.298L30.81 140.811L31.6685 141.324C32.3332 140.211 32.959 139.072 33.546 137.912L32.6536 137.461ZM28.7299 144.019L27.912 143.443C27.1916 144.468 26.4343 145.461 25.6401 146.418L26.4098 147.057L27.1795 147.695C28.0085 146.695 28.798 145.66 29.5479 144.594L28.7299 144.019ZM23.8479 149.894L23.135 149.193C22.2608 150.082 21.3496 150.93 20.4016 151.734L21.0483 152.497L21.695 153.259C22.6903 152.415 23.6456 151.526 24.5608 150.596L23.8479 149.894Z" fill="#E6E6E6"/>
  </svg>
);

// Feature Badge Component
const FeatureBadge = memo(({ icon, label, color, position }) => (
  <div className={`feature-badge feature-badge-${position}`}>
    <div className={`feature-badge-icon ${color}`}>
      <img src={icon} alt={label} loading="lazy" decoding="async" />
    </div>
    <span className="feature-badge-label">{label}</span>
  </div>
));

FeatureBadge.displayName = "FeatureBadge";

// Dashboard Image with scroll shuffle animation
const DashboardImage = memo(({ scrollProgress }) => {
  // Create shuffle effect based on scroll
  const shuffleY = (1 - scrollProgress) * 50;
  const shuffleRotate = (1 - scrollProgress) * 3;
  const shuffleScale = 0.95 + (scrollProgress * 0.05);
  const opacity = 0.5 + (scrollProgress * 0.5);

  return (
    <div 
      className="dashboard-image-container dashboard-shuffle"
      style={{
        transform: `translateY(${shuffleY}px) rotate(${shuffleRotate}deg) scale(${shuffleScale})`,
        opacity: opacity,
      }}
    >
      <div className="dashboard-top-bar">
        <div className="traffic-lights">
          <span className="traffic-light red"></span>
          <span className="traffic-light yellow"></span>
          <span className="traffic-light green"></span>
        </div>
      </div>
      <img
        src="https://i.postimg.cc/90Zwf02f/a3aeb16c957edf3d354cc5ef65be78de296d5e8b.png"
        alt="Business Dashboard Preview"
        className="dashboard-image"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

DashboardImage.displayName = "DashboardImage";

export const BusinessFeatures = memo(() => {
  const sectionRef = useRef(null);
  const scrollProgress = useScrollAnimation(sectionRef);

  const features = [
    {
      id: 1,
      icon: "https://hdnfltv.com/image/nitimages/exchange-alt.webp",
      label: "INTEGRATED SYSTEM",
      color: "bg-purple",
      position: "left",
    },
    {
      id: 2,
      icon: "https://hdnfltv.com/image/nitimages/eye.webp",
      label: "MONITORED CASH FLOW",
      color: "bg-coral",
      position: "right",
    },
    {
      id: 3,
      icon: "https://hdnfltv.com/image/nitimages/dice-d20.webp",
      label: "INVENTORY MANAGEMENT",
      color: "bg-teal",
      position: "bottom-left",
    },
  ];

  return (
    <section className="business-features-section" ref={sectionRef}>
      <div className="business-features-container">
        {/* Header Section */}
        <div className="business-features-header">
          <p className="business-features-subtitle">
            We offer a SaaS dashboard with live chat and AI-powered assistance to create landing pages, manage products, and complete tasks faster.
          </p>
          <h2 className="business-features-title">
            Support for essential Business features
          </h2>
        </div>

        {/* Dashboard Preview Section */}
        <div className="dashboard-preview-wrapper">
          {/* Decorative Cloud Bars */}
          <div 
            className="decorative-bar decorative-bar-1"
            style={{
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              opacity: 0.3 + (scrollProgress * 0.7),
            }}
          ></div>
          <div 
            className="decorative-bar decorative-bar-2"
            style={{
              transform: `translateY(${(1 - scrollProgress) * 20}px)`,
              opacity: 0.5 + (scrollProgress * 0.5),
            }}
          ></div>
          
          {/* Decorative Ellipse */}
          <img 
            src="" 
            alt="" 
            className="decorative-ellipse"
            loading="lazy"
          />

          {/* Main Dashboard Image with Shuffle Animation */}
          <DashboardImage scrollProgress={scrollProgress} />

          {/* Feature Badge - Left (Integrated System) */}
          <div 
            className="feature-badge-wrapper feature-badge-wrapper-left"
            style={{
              transform: `translateX(${(1 - scrollProgress) * -50}px)`,
              opacity: scrollProgress,
            }}
          >
            <FeatureBadge
              icon={features[0].icon}
              label={features[0].label}
              color={features[0].color}
              position={features[0].position}
            />
            <CurvedLine className="curved-line curved-line-left" />
          </div>

          {/* Feature Badge - Right (Monitored Cash Flow) */}
          <div 
            className="feature-badge-wrapper feature-badge-wrapper-right"
            style={{
              transform: `translateX(${(1 - scrollProgress) * 50}px)`,
              opacity: scrollProgress,
            }}
          >
            <CurvedLine className="curved-line curved-line-right" flip={true} />
            <FeatureBadge
              icon={features[1].icon}
              label={features[1].label}
              color={features[1].color}
              position={features[1].position}
            />
          </div>

          {/* Feature Badge - Bottom Left (Inventory Management) */}
          <div 
            className="feature-badge-wrapper feature-badge-wrapper-bottom"
            style={{
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              opacity: scrollProgress,
            }}
          >
            <FeatureBadge
              icon={features[2].icon}
              label={features[2].label}
              color={features[2].color}
              position={features[2].position}
            />
            <CurvedLine className="curved-line curved-line-bottom" />
          </div>
        </div>

        {/* CTA Button */}
        <a href="#pricing" className="view-pricing-btn">
          View Pricing
        </a>
      </div>
    </section>
  );
});

BusinessFeatures.displayName = "BusinessFeatures";
