import HeroSection from "@/components/home/HeroSection"
import TrustStrip from "@/components/home/TrustStrip"
import BrandsSection from "@/components/home/BrandsSection"
import QuoteFormSection from "@/components/home/QuoteFormSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import AnyCarSection from "@/components/home/AnyCarSection"
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection"
import ServiceAreasSection from "@/components/home/ServiceAreasSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import CTASection from "@/components/home/CTASection"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <BrandsSection />
      <QuoteFormSection />
      <HowItWorksSection />
      <AnyCarSection />
      <WhyChooseUsSection />
      <ServiceAreasSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
