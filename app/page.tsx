import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import IncludedSection from "@/components/sections/IncludedSection";
import InsuranceSection from "@/components/sections/InsuranceSection";
import AreasSection from "@/components/sections/AreasSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import LogisticsSection from "@/components/sections/LogisticsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <IncludedSection />
        <InsuranceSection />
        <AreasSection />
        <ReviewsSection />
        <LogisticsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
