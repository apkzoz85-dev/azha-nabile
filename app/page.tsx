import Header from "@/components/header";
import Hero from "@/components/hero";
import { Highlights, Villas, Lagoon, Amenities, Gallery, Location, Payment, ContactSection, Masterplan, Specs, WhatsAppStrip } from "@/components/sections";
import { LeadPopup, FloatingButtons, MobileBar, CookieConsent, PrivacyModal, Footer } from "@/components/overlays";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Villas />
        <WhatsAppStrip />
        <Masterplan />
        <Lagoon />
        <Specs />
        <Amenities />
        <WhatsAppStrip title="محتاج تشوف الجزيرة على الطبيعة؟" text="احجز زيارة لموقع أزها السخنة أو اطلب فيديو للفيلات على واتساب." message="مرحباً، عايز أحجز زيارة لأزها السخنة Island 3" />
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
