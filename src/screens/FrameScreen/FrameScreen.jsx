import { useState, useEffect, Suspense, lazy } from "react";
import { PageSkeleton, HeroSkeleton, ServicesSkeleton, ContactSkeleton, FooterSkeleton } from "../../components/Skeleton";
import { preloadImages } from "../../components/LazyImage";
import { AnimatedSection } from "../../components/AnimatedSection";
import "./style.css";

// Lazy load sections for better performance
const Frame = lazy(() => import("./sections/Frame").then(m => ({ default: m.Frame })));
const OnlineStoreShowcase = lazy(() => import("./sections/OnlineStoreShowcase").then(m => ({ default: m.OnlineStoreShowcase })));
const BusinessFeatures = lazy(() => import("./sections/BusinessFeatures").then(m => ({ default: m.BusinessFeatures })));
const SimpleSteps = lazy(() => import("./sections/SimpleSteps").then(m => ({ default: m.SimpleSteps })));
const FrameWrapper = lazy(() => import("./sections/FrameWrapper").then(m => ({ default: m.FrameWrapper })));
const Pricing = lazy(() => import("./sections/Pricing").then(m => ({ default: m.Pricing })));
const EmpoweringTech = lazy(() => import("./sections/EmpoweringTech").then(m => ({ default: m.EmpoweringTech })));
const Group = lazy(() => import("./sections/Group").then(m => ({ default: m.Group })));
const Footer = lazy(() => import("./sections/Footer").then(m => ({ default: m.Footer })));
const SisterConcerns = lazy(() => import("./sections/SisterConcerns").then(m => ({ default: m.SisterConcerns })));

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

      <AnimatedSection animation="slide-up" delay={0}>
        <Suspense fallback={<ServicesSkeleton />}>
          <OnlineStoreShowcase />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection animation="slide-up" delay={100}>
        <Suspense fallback={<ServicesSkeleton />}>
          <BusinessFeatures />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection animation="slide-up" delay={100}>
        <Suspense fallback={<ServicesSkeleton />}>
          <SimpleSteps />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection animation="fade" delay={100}>
        <Suspense fallback={<ServicesSkeleton />}>
          <Pricing />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection animation="slide-up" delay={100}>
        <Suspense fallback={<ServicesSkeleton />}>
          <EmpoweringTech />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection animation="scale" delay={100}>
        <Suspense fallback={<ServicesSkeleton />}>
          <FrameWrapper />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection animation="slide-up" delay={100}>
        <Suspense fallback={<ServicesSkeleton />}>
          <SisterConcerns />
        </Suspense>
      </AnimatedSection>

      <AnimatedSection animation="slide-up" delay={100}>
        <Suspense fallback={<ContactSkeleton />}>
          <Group />
        </Suspense>
      </AnimatedSection>
      
      <AnimatedSection animation="fade" delay={200}>
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </AnimatedSection>
    </div>
  );
};
