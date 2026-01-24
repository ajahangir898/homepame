import { useState, useEffect, Suspense, lazy } from "react";
import { PageSkeleton, HeroSkeleton, ServicesSkeleton, ContactSkeleton, FooterSkeleton } from "../../components/Skeleton";
import { preloadImages } from "../../components/LazyImage";
import "./style.css";

// Lazy load sections for better performance
const Frame = lazy(() => import("./sections/Frame").then(m => ({ default: m.Frame })));
const OnlineStoreShowcase = lazy(() => import("./sections/OnlineStoreShowcase").then(m => ({ default: m.OnlineStoreShowcase })));
const FrameWrapper = lazy(() => import("./sections/FrameWrapper").then(m => ({ default: m.FrameWrapper })));
const Pricing = lazy(() => import("./sections/Pricing").then(m => ({ default: m.Pricing })));
const ScalableGrowth = lazy(() => import("./sections/ScalableGrowth").then(m => ({ default: m.ScalableGrowth })));
const EmpoweringTech = lazy(() => import("./sections/EmpoweringTech").then(m => ({ default: m.EmpoweringTech })));
const Group = lazy(() => import("./sections/Group").then(m => ({ default: m.Group })));
const Footer = lazy(() => import("./sections/Footer").then(m => ({ default: m.Footer })));

// Critical images to preload
const CRITICAL_IMAGES = [
  "https://c.animaapp.com/6PVGKTMi/img/frame-1000001802@4x.png",
  "https://c.animaapp.com/6PVGKTMi/img/nature-17.png",
];

export const FrameScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ultra-fast load - show content immediately
    const loadApp = async () => {
      // Minimal 50ms delay for smooth transition
      setTimeout(() => setIsLoading(false), 50);
      
      // Preload images in background (non-blocking)
      preloadImages(CRITICAL_IMAGES).catch(() => {});
    };

    loadApp();
  }, []);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="frame-screen">
      <Suspense fallback={<HeroSkeleton />}>
        <Frame />
      </Suspense>

      <Suspense fallback={<ServicesSkeleton />}>
        <OnlineStoreShowcase />
      </Suspense>
      
      <Suspense fallback={<ServicesSkeleton />}>
        <FrameWrapper />
      </Suspense>

      <Suspense fallback={<ServicesSkeleton />}>
        <Pricing />
      </Suspense>

      <Suspense fallback={<ServicesSkeleton />}>
        <ScalableGrowth />
      </Suspense>

      <Suspense fallback={<ServicesSkeleton />}>
        <EmpoweringTech />
      </Suspense>
      
      {/* <section className="rocket-section">
        <img
          className="rocket-bg"
          alt="Rocket Background"
          src="https://c.animaapp.com/6PVGKTMi/img/group-427320681.png"
          loading="lazy"
        />
        <img
          className="rocket-icon"
          alt="Rocket Launch"
          src="https://c.animaapp.com/6PVGKTMi/img/material-symbols-light-rocket-launch-outline.svg"
          loading="lazy"
        />
      </section> */}

      <Suspense fallback={<ContactSkeleton />}>
        <Group />
      </Suspense>
      
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
};
