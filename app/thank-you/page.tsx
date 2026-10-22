import type { Metadata } from "next";
import { contact } from "@/lib/config";

export const metadata: Metadata = {
  title: "شكراً لتسجيلك | Azha Ain Sokhna",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  return (
    <main className="min-h-[100svh] bg-deep text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-lg">
        <div className="w-20 h-20 mx-auto rounded-full bg-gold/15 text-gold flex items-center justify-center text-4xl mb-6">✓</div>
        <p className="eyebrow mb-2">Thank you</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">تم استلام طلبك بنجاح</h1>
        <p className="text-white/75 leading-relaxed mb-8">
          مستشارنا هيتواصل معاك في أقرب وقت بقائمة أسعار فيلات الجزيرة في أزها العين السخنة. لو حابب تسرّع، كلّمنا مباشرة.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={wa} className="btn-gold !bg-[#25D366]">واتساب</a>
          <a href={`tel:${contact.phone}`} className="btn-ghost" dir="ltr">{contact.phone}</a>
          <a href="/" className="btn-ghost">الرجوع للصفحة</a>
        </div>
      </div>
    </main>
  );
}
