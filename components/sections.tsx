"use client";

import Image from "next/image";
import { launch, units, payment, contact } from "@/lib/config";
import { trackConversion } from "@/lib/track";
import { useUI } from "./ui-state";
import LeadForm from "./lead-form";
import WAButton, { waMessages } from "./wa-button";
import {
  IslandIcon, WaveIcon, KeyIcon, SnowIcon, StarIcon, PinIcon, CheckIcon,
  BedIcon, AreaIcon, SunIcon, ShieldIcon, CupIcon, DumbbellIcon, TreeIcon, WhatsAppIcon,
} from "./icons";

function SectionHead({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className={`text-3xl sm:text-4xl font-bold leading-snug mb-4 ${light ? "text-white" : "text-deep"}`}>{title}</h2>
      {text && <p className={`leading-relaxed ${light ? "text-white/75" : "text-muted"}`}>{text}</p>}
    </div>
  );
}

/* ------------------------------ Highlights ----------------------------- */
export function Highlights() {
  const items = [
    { icon: IslandIcon, t: "Island 3 — جزيرة خاصة", d: "جزيرة محاطة باللاجون من كل الجهات داخل أزها — خصوصية كاملة وسط المياه." },
    { icon: WaveIcon, t: `${launch.distanceToSea} من البحر`, d: "دقائق مشي من شاطئ خليج السويس والمياه الفيروزية." },
    { icon: SunIcon, t: "إطلالة مباشرة على اللاجون", d: "صف أول على اللاجون — المياه أمام باب الفيلا." },
    { icon: SnowIcon, t: "تشطيب كامل", d: "استلام بالمطبخ والتكييفات، جاهزة للسكن بدون تشطيب إضافي." },
    { icon: KeyIcon, t: "60% من الوحدات بحري", d: "أغلب الفيلات موجهة للشمال — هوا بحري وتهوية طبيعية طول السنة." },
    { icon: StarIcon, t: "الطرح الأول", d: "عدد محدود جداً — أولوية الاختيار وأسعار الإطلاق لأول العملاء." },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead eyebrow="Why this launch" title="ليه فيلات الجزيرة مختلفة؟" text="مدار اختارت أميز بقعة داخل أزها العين السخنة: جزيرة بين اللاجون والبحر، لعدد محدود من الفيلات المتشطبة بالكامل." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: I, t, d }) => (
            <div key={t} className="bg-white rounded-2xl p-6 border border-sand-2 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-lagoon-soft text-lagoon flex items-center justify-center mb-4"><I className="w-6 h-6" /></div>
              <h3 className="font-bold text-lg text-deep mb-1.5">{t}</h3>
              <p className="text-muted text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Villas ------------------------------- */
export function Villas() {
  const { openLead } = useUI();
  return (
    <section id="villas" className="py-20 sm:py-24 bg-white">
      <div className="container-x">
        <SectionHead eyebrow="Island 3 Villas" title="فيلات Island 3" text="نموذجين S-Villa و L-Villa على Island 3 — الأسعار والمساحات تقريبية لحين الإعلان الرسمي. سجّل لتصلك قائمة الأسعار النهائية والبرشور." />
        <div className={`grid gap-6 ${units.length > 1 ? "md:grid-cols-2" : "max-w-5xl mx-auto"}`}>
          {units.map((u) => (
            <article key={u.nameEn} className={`rounded-3xl overflow-hidden bg-sand border border-sand-2 ${units.length === 1 ? "md:grid md:grid-cols-2" : ""}`}>
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px]">
                <Image src={u.image} alt={u.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
                <span className="absolute top-4 right-4 bg-deep/85 text-white text-xs font-semibold rounded-full px-3 py-1.5">طرح أول</span>
              </div>
              <div className="p-7 flex flex-col">
                <p className="eyebrow mb-1">{u.nameEn}</p>
                <h3 className="text-2xl font-bold text-deep mb-5">{u.name}</h3>
                <dl className="grid grid-cols-3 gap-3 mb-6 text-center">
                  {[
                    { i: AreaIcon, k: "مساحة المباني", v: u.bua ? `${u.bua} م²` : "تُعلن قريباً" },
                    { i: TreeIcon, k: "الأرض / الحديقة", v: u.land ? `${u.land} م²` : "تُعلن قريباً" },
                    { i: BedIcon, k: "الغرف", v: u.bedrooms ?? "تُعلن قريباً" },
                  ].map(({ i: I, k, v }) => (
                    <div key={k} className="bg-white rounded-xl p-3">
                      <I className="w-5 h-5 mx-auto text-lagoon mb-1" />
                      <dt className="text-[11px] text-muted">{k}</dt>
                      <dd className="font-bold text-deep text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="space-y-2 mb-6">
                  {u.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-ink"><CheckIcon className="w-4 h-4 text-lagoon shrink-0" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-sand-2 pt-5">
                  <div className="mb-4">
                    <div className="text-xs text-muted">السعر يبدأ من</div>
                    <div className="text-xl font-bold text-deep">{u.price ? <>{u.price} <span className="text-sm font-medium">ج.م*</span></> : "اطلب قائمة الأسعار"}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <WAButton message={waMessages.price(u.name.split(" —")[0])} label="السعر واتساب" size="sm" />
                    <button onClick={() => openLead(`unit-${u.nameEn}`)} className="btn-gold !bg-deep hover:!bg-deep-2 !py-2.5 !px-4 text-sm">اطلب التفاصيل</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="text-center text-xs text-muted mt-6">* أسعار استرشادية وقابلة للتغيير حسب الإتاحة وسياسة الشركة المطورة.</p>
      </div>
    </section>
  );
}

/* -------------------------------- Lagoon ------------------------------- */
export function Lagoon() {
  const stats = [
    ["2", "لاجون كريستال للسباحة"],
    ["~18", "هكتار مسطحات مائية"],
    ["~700 م", "واجهة على البحر"],
    ["1.6M", "م² مساحة أزها السخنة"],
  ];
  return (
    <section id="lagoon" className="relative py-20 sm:py-28 bg-deep text-white overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <Image src="/images/lagoon.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep/80 to-deep" />
      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow mb-3">Lagoon Living</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-5">الجزيرة اللي اللاجون حواليها <br />والبحر على بُعد خطوات</h2>
          <p className="text-white/75 leading-relaxed mb-8">
            أزها العين السخنة من أوائل المشروعات في مصر بتقنية Crystal Lagoons — مياه صافية صالحة للسباحة والرياضات المائية طوال السنة.
            فيلات الجزيرة في الطرح الجديد بتقع في الصف الأول على اللاجون، وعلى بُعد {launch.distanceToSea} فقط من الشاطئ.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(([n, l]) => (
              <div key={l} className="border border-white/15 rounded-2xl p-5 bg-white/5">
                <div className="font-display text-3xl text-gold font-semibold mb-1">{n}</div>
                <div className="text-sm text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
          <Image src="/images/lagoon.jpg" alt="لاجون أزها العين السخنة" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Amenities ----------------------------- */
export function Amenities() {
  const list = [
    { i: WaveIcon, t: "Crystal Lagoons للسباحة" },
    { i: SunIcon, t: "بيتش كلوب ولاجون كلوب هاوس" },
    { i: StarIcon, t: "كلوب هاوس" },
    { i: CupIcon, t: "AZHA Downtown" },
    { i: KeyIcon, t: "فنادق 5 نجوم" },
    { i: DumbbellIcon, t: "جيم وسبا" },
    { i: TreeIcon, t: "سنترال بارك" },
    { i: ShieldIcon, t: "أمن وحراسة 24/7" },
  ];
  return (
    <section id="amenities" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead eyebrow="Amenities" title="مجتمع ساحلي متكامل طول السنة" text="كل اللي محتاجه داخل أزها — من الشاطئ والكلوب هاوس لحد المطاعم والخدمات اليومية." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {list.map(({ i: I, t }) => (
            <div key={t} className="bg-white rounded-2xl p-5 text-center border border-sand-2">
              <I className="w-7 h-7 mx-auto text-gold mb-3" />
              <div className="font-semibold text-deep text-sm sm:text-base">{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Gallery ------------------------------ */
export function Gallery() {
  const imgs = [1, 2, 3, 4, 5, 6].map((n) => `/images/gallery-${n}.jpg`);
  return (
    <section className="pb-20 sm:pb-24">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:h-[520px]">
          {imgs.map((src, i) => (
            <div key={src} className={`relative rounded-2xl overflow-hidden aspect-square md:aspect-auto ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : ""} ${i === 5 ? "hidden md:block" : ""}`}>
              <Image src={src} alt={`أزها العين السخنة ${i + 1}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Location ------------------------------ */
export function Location() {
  const points = [
    "على الجانب الأيسر من العين السخنة — حوالي 50 دقيقة من القاهرة",
    "واجهة بحرية حوالي 700 متر على خليج السويس",
    "وصول مباشر عبر طريق القاهرة – العين السخنة",
  ];
  const distances = [
    ["العاصمة الإدارية", "82 كم"],
    ["القاهرة الجديدة", "114 كم"],
    ["مطار القاهرة", "126 كم"],
    ["ميناء العين السخنة", "12 كم"],
    ["بورتو السخنة", "38 كم"],
    ["قناة السويس", "40 كم"],
  ];
  return (
    <section id="location" className="py-20 sm:py-24 bg-white">
      <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow mb-3">Location</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep leading-snug mb-5">الأقرب للقاهرة… <br />والأقرب للبحر جوه أزها</h2>
          <ul className="space-y-3 mb-6">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3"><PinIcon className="w-5 h-5 text-lagoon mt-0.5 shrink-0" /><span>{p}</span></li>
            ))}
          </ul>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {distances.map(([k, v]) => (
              <div key={k} className="rounded-xl bg-sand px-4 py-3">
                <div className="font-display text-2xl text-deep font-semibold" dir="ltr">{v.replace(" كم", "")}<span className="text-sm font-sans text-muted"> km</span></div>
                <div className="text-xs text-muted">{k}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-sand-2 aspect-[4/3] bg-sand">
          <iframe
            title="موقع أزها العين السخنة"
            src="https://www.google.com/maps?q=Azha+Ain+Sokhna&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Payment ------------------------------ */
export function Payment() {
  const { openLead } = useUI();
  const cells = [
    ["المقدم", payment.downPayment ?? "يُعلن مع الطرح"],
    ["سنوات التقسيط", payment.years ? `حتى ${payment.years} سنوات` : "أنظمة ممتدة"],
    ["الاستلام", payment.delivery ?? "يُعلن مع الطرح"],
  ];
  return (
    <section id="payment" className="py-20 sm:py-24">
      <div className="container-x">
        <div className="rounded-[2rem] bg-gradient-to-br from-deep to-deep-2 text-white p-8 sm:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow mb-3">Payment Plans</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-snug mb-4">أنظمة سداد الطرح الأول</h2>
            <ul className="space-y-2 text-white/80 mb-6">
              {payment.notes.map((n) => <li key={n} className="flex gap-2"><CheckIcon className="w-5 h-5 text-gold shrink-0" />{n}</li>)}
            </ul>
            <div className="flex flex-wrap gap-3">
              <WAButton message={waMessages.payment} label="خطة السداد على واتساب" />
              <button onClick={() => openLead("payment")} className="btn-ghost">اطلب خطة السداد</button>
            </div>
          </div>
          <div className="grid gap-3">
            {cells.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-2xl bg-white/7 border border-white/12 px-5 py-4">
                <span className="text-white/70">{k}</span>
                <span className="font-bold text-gold text-lg">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Contact section -------------------------- */
export function ContactSection() {
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  return (
    <section id="contact" className="py-20 sm:py-24 bg-sand-2/50">
      <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow mb-3">Register Interest</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep leading-snug mb-4">الفيلات محدودة جداً <br />سجّل قبل اكتمال الطرح</h2>
          <p className="text-muted leading-relaxed mb-6">
            سيب بياناتك ومستشارنا هيتواصل معاك بقائمة الأسعار، المساحات المتاحة، ومخطط الجزيرة — أو كلّمنا مباشرة.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${contact.phone}`} onClick={() => trackConversion("call")} className="btn-gold !bg-deep hover:!bg-deep-2" dir="ltr">{contact.phone}</a>
            <a href={wa} target="_blank" rel="noopener" onClick={() => trackConversion("whatsapp")} className="btn-gold !bg-[#25D366] hover:!bg-[#1fb457]">
              <WhatsAppIcon /> واتساب
            </a>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-7 shadow-xl">
          <LeadForm source="contact" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Masterplan ---------------------------- */
export function Masterplan() {
  const { openLead } = useUI();
  return (
    <section id="masterplan" className="py-20 sm:py-24 bg-white">
      <div className="container-x">
        <SectionHead eyebrow="Island 3 Masterplan" title="Island 3 في قلب اللاجون" text="جزيرة محاطة بالمياه من كل الجهات، بين قرى Lyra وAtria وTucana وIsland 4 — في الجزء الأقرب للبحر والبيتش كلوب." />
        <div className="rounded-3xl overflow-x-auto border border-sand-2 bg-sand" dir="ltr">
          <Image src="/images/masterplan-island.jpg" alt="ماستر بلان Island 3 أزها العين السخنة" width={2000} height={871} sizes="(max-width:768px) 800px, 1200px" className="w-full min-w-[760px] md:min-w-0 h-auto" />
        </div>
        <p className="text-center text-xs text-muted mt-3"><span className="md:hidden">اسحب لرؤية المخطط كاملاً — </span>مخطط مبدئي من المطور للتوضيح فقط</p>
        <div className="text-center mt-8">
          <div className="flex flex-wrap justify-center gap-3">
            <WAButton message={waMessages.masterplan} label="ابعتلي المخطط والمتاح واتساب" />
            <button onClick={() => openLead("masterplan")} className="btn-gold !bg-deep hover:!bg-deep-2">اطلب الوحدات المتاحة</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Finishing specs ------------------------ */
export function Specs() {
  const specs = [
    ["المعيشة والسفرة", "أرضيات بورسلين — حوائط وأسقف دهان أبيض"],
    ["غرف النوم والدريسنج", "أرضيات بورسلين — دواليب ماستر بلاكيه أبيض مط"],
    ["المطبخ", "دواليب بلاكيه أبيض مط — رخامة وسبلاش جرانيت"],
    ["الحمامات", "أرضيات بورسلين — أطقم بيضاء وخلاطات كروم — وحدات فانيتي بسطح رخام"],
    ["الأبواب", "أبواب Flush بدهان لاكيه أبيض مط"],
    ["التكييف", "تكييفات سبليت مُركّبة"],
  ];
  return (
    <section id="specs" className="py-20 sm:py-24">
      <div className="container-x grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
          <Image src="/images/gallery-3.jpg" alt="فيلات أزها العين السخنة متشطبة بالكامل" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow mb-3">Finishing Specifications</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep leading-snug mb-6">استلام متشطب بالكامل <br />بالمطبخ والتكييفات</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-white rounded-2xl p-4 border border-sand-2">
                <div className="flex items-center gap-2 font-bold text-deep mb-1"><CheckIcon className="w-4 h-4 text-lagoon" />{k}</div>
                <p className="text-sm text-muted leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WhatsApp strip ------------------------- */
export function WhatsAppStrip({ message = waMessages.brochure, title = "عايز الأسعار والبرشور دلوقتي؟", text = "ابعتلنا على واتساب ومستشارنا يبعتلك قائمة أسعار Island 3 والمخطط خلال دقائق." }: { message?: string; title?: string; text?: string }) {
  return (
    <section className="py-10">
      <div className="container-x">
        <div className="rounded-3xl bg-[#e9fbef] border border-[#bdeccd] px-6 py-7 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-right">
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex w-14 h-14 shrink-0 rounded-2xl bg-[#25D366] text-white items-center justify-center"><WhatsAppIcon className="w-8 h-8" /></span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-deep mb-1">{title}</h3>
              <p className="text-muted text-sm sm:text-base">{text}</p>
            </div>
          </div>
          <WAButton message={message} label="ابدأ محادثة واتساب" size="lg" className="shrink-0 w-full md:w-auto" />
        </div>
      </div>
    </section>
  );
}
