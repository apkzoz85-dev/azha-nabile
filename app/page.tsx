import Header from "@/components/header";
import Hero from "@/components/hero";
import { Highlights, Villas, Lagoon, Amenities, Gallery, Location, Payment, ContactSection, Masterplan, Specs } from "@/components/sections";
import { LeadPopup, FloatingButtons, MobileBar, CookieConsent, PrivacyModal, Footer } from "@/components/overlays";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Villas />
        <Masterplan />
        <Lagoon />
        <Specs />
        <Amenities />
        <Gallery />
        <Location />
        <Payment />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
      <MobileBar />
      <CookieConsent />
      <LeadPopup />
      <PrivacyModal />
    </>
  );
}
