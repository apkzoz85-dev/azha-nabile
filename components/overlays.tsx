"use client";

import { useEffect, useRef, useState } from "react";
import { contact, site, launch } from "@/lib/config";
import { trackConversion } from "@/lib/track";
import { useUI } from "./ui-state";
import LeadForm from "./lead-form";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import WAButton, { waHref, waMessages } from "./wa-button";


/* ------------------------------ Lead popup ----------------------------- */
export function LeadPopup() {
  const { leadOpen, openLead, closeLead, leadSource } = useUI();
  const fired = useRef(false);

  // auto open: 58% scroll OR 16s — once per session
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("azha_popup") === "1"; } catch {}
    if (seen) return;
    const fire = () => {
      if (fired.current) return;
      fired.current = true;
      try { sessionStorage.setItem("azha_popup", "1"); } catch {}
      openLead("auto-popup");
    };
    const t = setTimeout(fire, 16000);
    const onScroll = () => {
      const h = document.documentElement;
      if ((h.scrollTop + h.clientHeight) / h.scrollHeight >= 0.58) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, [openLead]);

  useEffect(() => {
    if (!leadOpen) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeLead();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [leadOpen, closeLead]);

  if (!leadOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-deep/70 backdrop-blur-sm" onClick={closeLead} role="dialog" aria-modal="true" aria-label="سجل اهتمامك">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl rise" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeLead} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-sand flex items-center justify-center" aria-label="إغلاق"><CloseIcon /></button>
        <p className="eyebrow !text-gold-dark mb-1">{launch.projectEn}</p>
        <h3 className="text-2xl font-bold text-deep mb-1">Island 3 — S-Villa & L-Villa</h3>
        <p className="text-muted text-sm mb-5">عدد محدود جداً. سجّل لتصلك الأسعار والمساحات قبل أي حد.</p>
        <WAButton message={waMessages.brochure} label="ابعتلي الأسعار واتساب" sub="رد خلال دقائق — بدون ما تملا فورم" className="w-full mb-4" />
        <div className="flex items-center gap-3 text-xs text-muted mb-4"><span className="flex-1 h-px bg-sand-2" />أو سيب رقمك ونكلمك<span className="flex-1 h-px bg-sand-2" /></div>
        <LeadForm source={leadSource} />
      </div>
    </div>
  );
}

/* --------------------------- Floating buttons -------------------------- */
export function FloatingButtons() {
  const [bubble, setBubble] = useState(false);
  useEffect(() => {
    let closed = false;
    try { closed = sessionStorage.getItem("azha_wa_bubble") === "0"; } catch {}
    if (closed) return;
    // يظهر بعد ما العميل يعدّي الهيرو (عشان مايغطيش الفورم) + 6 ثواني على الأقل
    let ready = false, past = false;
    const tryShow = () => { if (ready && past) setBubble(true); };
    const t = setTimeout(() => { ready = true; tryShow(); }, 6000);
    const onScroll = () => { if (window.scrollY > window.innerHeight * 0.9) { past = true; tryShow(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);
  const hide = () => { setBubble(false); try { sessionStorage.setItem("azha_wa_bubble", "0"); } catch {} };
  return (
    <div className="hidden md:flex fixed bottom-6 left-6 z-40 flex-col gap-3 items-end">
      {bubble && (
        <div className="relative mb-1 w-72 bg-white rounded-2xl rounded-bl-sm shadow-2xl p-4 rise border border-sand-2">
          <button onClick={hide} className="absolute top-2 left-2 w-6 h-6 rounded-full bg-sand flex items-center justify-center" aria-label="إغلاق"><CloseIcon className="w-3.5 h-3.5" /></button>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative w-9 h-9 rounded-full bg-deep text-gold flex items-center justify-center font-display font-bold">A<span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-white" /></span>
            <div><div className="font-bold text-deep text-sm">مستشار أزها السخنة</div><div className="text-[11px] text-[#1a9e4b]">متاح الآن على واتساب</div></div>
          </div>
          <p className="text-sm text-ink/80 mb-3 leading-relaxed">أهلاً 👋 عايز أسعار S-Villa و L-Villa في Island 3؟ ابعتلنا وهنرد عليك فوراً.</p>
          <a href={waHref(waMessages.hero)} target="_blank" rel="noopener" onClick={() => { trackConversion("whatsapp"); hide(); }} className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1fb457] text-white font-bold py-2.5 text-sm">
            <WhatsAppIcon /> ابدأ المحادثة
          </a>
        </div>
      )}
      <a href={waHref(waMessages.hero)} target="_blank" rel="noopener" onClick={() => trackConversion("whatsapp")} className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform" aria-label="واتساب">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <WhatsAppIcon className="w-7 h-7 relative" />
      </a>
      <a href={`tel:${contact.phone}`} onClick={() => trackConversion("call")} className="w-14 h-14 rounded-full bg-deep text-white ring-2 ring-white/70 flex items-center justify-center shadow-xl hover:scale-110 transition-transform" aria-label="اتصل بنا">
        <PhoneIcon className="w-6 h-6" />
      </a>
    </div>
  );
}

/* ---------------------------- Mobile bottom bar ------------------------ */
export function MobileBar() {
  const { openLead } = useUI();
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-sand-2 grid grid-cols-3 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
      <a href={`tel:${contact.phone}`} onClick={() => trackConversion("call")} className="flex flex-col items-center gap-1 py-2.5 text-deep text-xs font-semibold">
        <PhoneIcon /> اتصال
      </a>
      <a href={waHref(waMessages.hero)} target="_blank" rel="noopener" onClick={() => trackConversion("whatsapp")} className="flex flex-col items-center justify-center gap-0.5 py-2 bg-[#25D366] text-white text-xs font-bold">
        <WhatsAppIcon className="w-6 h-6" /> الأسعار واتساب
      </a>
      <button onClick={() => openLead("mobile-bar")} className="flex flex-col items-center justify-center gap-1 py-2.5 text-gold-dark text-xs font-semibold">
        <span className="text-base leading-none">★</span> احجز أولويتك
      </button>
    </div>
  );
}

/* ----------------------------- Cookie consent -------------------------- */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  const { setPrivacyOpen } = useUI();
  useEffect(() => {
    try { setShow(!localStorage.getItem("azha_cookie")); } catch { setShow(true); }
  }, []);
  const decide = (v: string) => {
    try { localStorage.setItem("azha_cookie", v); } catch {}
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-sm z-50 bg-deep text-white rounded-2xl p-5 shadow-2xl text-sm">
      <p className="text-white/85 leading-relaxed mb-3">
        نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الإعلانات.{" "}
        <button onClick={() => setPrivacyOpen(true)} className="underline text-gold">اعرف المزيد</button>
      </p>
      <div className="flex gap-2">
        <button onClick={() => decide("accepted")} className="btn-gold !py-2 !px-4 text-sm flex-1">موافق</button>
        <button onClick={() => decide("essential")} className="flex-1 rounded-full border border-white/30 py-2 hover:bg-white/10">الضرورية فقط</button>
      </div>
    </div>
  );
}

/* ------------------------------ Privacy modal -------------------------- */
export function PrivacyModal() {
  const { privacyOpen, setPrivacyOpen } = useUI();
  if (!privacyOpen) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-deep/70" onClick={() => setPrivacyOpen(false)} role="dialog" aria-modal="true" aria-label="سياسة الخصوصية">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-7 sm:p-9" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setPrivacyOpen(false)} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-sand flex items-center justify-center" aria-label="إغلاق"><CloseIcon /></button>
        <h3 className="text-2xl font-bold text-deep mb-5">سياسة الخصوصية وإخلاء المسؤولية</h3>
        <div className="space-y-4 text-sm text-ink/85 leading-relaxed">
          <section>
            <h4 className="font-bold text-deep mb-1">من نحن</h4>
            <p>{site.agentDisclosure}</p>
          </section>
          <section>
            <h4 className="font-bold text-deep mb-1">البيانات التي نجمعها</h4>
            <p>نجمع الاسم ورقم الهاتف ونوع الوحدة ووقت التواصل المفضل عند تعبئة النموذج طوعاً، بغرض التواصل معك بخصوص المشروع فقط.</p>
          </section>
          <section>
            <h4 className="font-bold text-deep mb-1">استخدام البيانات</h4>
            <p>لا نبيع بياناتك أو نشاركها مع أطراف خارجية لأغراض تسويقية. قد تتم مشاركتها مع فريق المبيعات المختص بالمشروع لإتمام الاستفسار.</p>
          </section>
          <section>
            <h4 className="font-bold text-deep mb-1">ملفات تعريف الارتباط والإعلانات</h4>
            <p>نستخدم أدوات قياس مثل Google Ads لقياس فعالية الإعلانات. يمكنك رفض الملفات غير الضرورية من شريط الموافقة أو من إعدادات المتصفح.</p>
          </section>
          <section>
            <h4 className="font-bold text-deep mb-1">إخلاء المسؤولية</h4>
            <p>جميع الأسعار والمساحات وأنظمة السداد المعروضة استرشادية وقابلة للتغيير وفقاً لسياسة الشركة المطورة والإتاحة وقت الحجز. الصور للتوضيح فقط. يُرجى التأكد من التفاصيل النهائية مع الشركة المطورة قبل التعاقد.</p>
          </section>
          <section>
            <h4 className="font-bold text-deep mb-1">حقوقك</h4>
            <p>يمكنك طلب حذف بياناتك أو التوقف عن التواصل في أي وقت عبر الاتصال على {contact.phone}.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Footer ------------------------------ */
export function Footer() {
  const { setPrivacyOpen } = useUI();
  return (
    <footer className="bg-deep text-white/70 pt-14 pb-28 md:pb-10 text-sm">
      <div className="container-x">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div>
            <div className="font-display text-3xl tracking-[0.3em] text-white font-semibold">AZHA</div>
            <div className="font-display text-[10px] tracking-[0.45em] text-gold mb-3">AIN SOKHNA</div>
            <p className="max-w-sm">فيلات Island 3 — من {launch.developer}.</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href={`tel:${contact.phone}`} onClick={() => trackConversion("call")} className="hover:text-gold" dir="ltr">{contact.phone}</a>
            <button onClick={() => setPrivacyOpen(true)} className="text-right hover:text-gold">سياسة الخصوصية وإخلاء المسؤولية</button>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 space-y-2 text-xs leading-relaxed text-white/55">
          <p><strong className="text-white/75">إفصاح: </strong>{site.agentDisclosure}</p>
          <p><strong className="text-white/75">أسعار استرشادية: </strong>الأسعار والمساحات وأنظمة السداد المعروضة استرشادية وقابلة للتغيير دون إشعار مسبق. الصور للتوضيح.</p>
          <p>© {new Date().getFullYear()} {site.brand}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
