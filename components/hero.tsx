"use client";

import Image from "next/image";
import { launch, contact } from "@/lib/config";
import { trackConversion } from "@/lib/track";
import LeadForm from "./lead-form";
import { WhatsAppIcon } from "./icons";

export default function Hero() {
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  return (
    <section id="top" className="relative min-h-[100svh] flex items-end lg:items-center overflow-hidden bg-deep">
      <Image src="/images/hero.jpg" alt="فيلات أزها العين السخنة على اللاجون" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/55 to-deep/30" />
      <div className="absolute inset-0 bg-gradient-to-l from-deep/70 via-transparent to-transparent hidden lg:block" />

      <div className="container-x relative z-10 grid lg:grid-cols-[1.25fr_0.85fr] gap-10 items-center pt-32 pb-14 lg:py-36">
        <div className="text-white">
          <span className="rise inline-flex items-center gap-2 bg-gold/95 text-white text-sm font-semibold rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> {launch.badge}
          </span>
          <p className="rise eyebrow mb-3">{launch.developerEn} presents</p>
          <h1 className="rise-2 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.25] mb-5">
            تطرح شركة مدار <br className="hidden sm:block" />
            <span className="text-gold">أفخم فيلات</span> أزها السخنة
          </h1>
          <p className="rise-3 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed mb-8">{launch.subheadline}</p>

          <ul className="rise-3 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mb-8">
            {[
              ["جزيرة", "خاصة"],
              [launch.distanceToSea, "من البحر"],
              ["لاجون", "إطلالة مباشرة"],
              ["تشطيب كامل", "مطبخ + تكييفات"],
            ].map(([a, b]) => (
              <li key={a} className="border border-white/20 bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3">
                <div className="text-gold font-bold text-lg">{a}</div>
                <div className="text-white/75 text-sm">{b}</div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 lg:hidden">
            <a href="#contact" className="btn-gold">احجز أولويتك</a>
            <a href={wa} target="_blank" rel="noopener" onClick={() => trackConversion("whatsapp")} className="btn-ghost">
              <WhatsAppIcon /> واتساب
            </a>
          </div>
        </div>

        <div className="hidden lg:block bg-white rounded-3xl p-7 shadow-2xl rise-3">
          <p className="eyebrow !text-gold-dark mb-1">First Launch</p>
          <h2 className="text-2xl font-bold text-deep mb-1">احجز أولويتك الآن</h2>
          <p className="text-muted text-sm mb-5">عدد الفيلات محدود جداً — سجّل بياناتك وهنتواصل معاك بالأسعار والمساحات.</p>
          <LeadForm source="hero" />
        </div>
      </div>
    </section>
  );
}
