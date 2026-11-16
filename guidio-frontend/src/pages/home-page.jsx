import { SkipLink } from "@/components/skip-link";
import { LandingBenefits } from "@/features/landing/landing-benefits";
import { LandingCta } from "@/features/landing/landing-cta";
import { LandingFaq } from "@/features/landing/landing-faq";
import { LandingFeatures } from "@/features/landing/landing-features";
import { LandingFooter } from "@/features/landing/landing-footer";
import { LandingHero } from "@/features/landing/landing-hero";
import { LandingHowItWorks } from "@/features/landing/landing-how-it-works";
import { LandingJourney } from "@/features/landing/landing-journey";
import { LandingNavbar } from "@/features/landing/landing-navbar";

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />

      <LandingNavbar />

      <main id="main-content">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingJourney />
        <LandingBenefits />
        <LandingFaq />
        <LandingCta />
      </main>

      <LandingFooter />
    </div>
  );
}

export default HomePage;