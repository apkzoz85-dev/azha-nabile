"use client";

import { useState } from "react";
import { forms, launch } from "@/lib/config";
import { trackConversion } from "@/lib/track";
import { useUI } from "./ui-state";

const unitOptions = ["فيلا مستقلة على الجزيرة", "فيلا توين / تاون", "شاليه", "غير محدد"];
const timeOptions = ["الآن", "صباحاً", "مساءً", "واتساب فقط"];

export default function LeadForm({ source, dark = false }: { source: string; dark?: boolean }) {
  const { setPrivacyOpen } = useUI();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return; // honeypot
    const phone = String(fd.get("phone") || "").replace(/\s|-/g, "");
    if (!/^(\+?\d{10,15})$/.test(phone)) {
      setErr("من فضلك أدخل رقم موبايل صحيح");
      return;
    }
    setErr("");
    setStatus("sending");
    fd.append("access_key", forms.web3formsKey);
    fd.append("subject", forms.subject);
    fd.append("from_name", launch.projectEn);
    fd.append("source", source);
    fd.append("page", typeof window !== "undefined" ? window.location.href : "");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      trackConversion("form");
      window.location.href = "/thank-you";
    } catch {
      setStatus("error");
      setErr("حدث خطأ أثناء الإرسال، حاول مرة أخرى أو تواصل معنا واتساب.");
    }
  }

  const label = dark ? "text-white/80" : "text-muted";

  return (
    <form onSubmit={onSubmit} className="grid gap-3" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div>
        <label className={`block text-sm mb-1 ${label}`} htmlFor={`name-${source}`}>الاسم</label>
        <input id={`name-${source}`} name="name" required className="field" placeholder="الاسم بالكامل" autoComplete="name" />
      </div>
      <div>
        <label className={`block text-sm mb-1 ${label}`} htmlFor={`phone-${source}`}>رقم الموبايل / واتساب</label>
        <input id={`phone-${source}`} name="phone" required inputMode="tel" dir="ltr" className="field text-right" placeholder="01XXXXXXXXX" autoComplete="tel" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={`block text-sm mb-1 ${label}`} htmlFor={`unit-${source}`}>نوع الوحدة</label>
          <select id={`unit-${source}`} name="unit" className="field">
            {unitOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className={`block text-sm mb-1 ${label}`} htmlFor={`time-${source}`}>وقت التواصل</label>
          <select id={`time-${source}`} name="best_time" className="field">
            {timeOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      {err && <p className="text-sm text-red-500" role="alert">{err}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-gold w-full mt-1 disabled:opacity-60">
        {status === "sending" ? "جارٍ الإرسال..." : "احجز أولويتك في الطرح الأول"}
      </button>
      <p className={`text-xs leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
        بإرسال بياناتك فأنت توافق على{" "}
        <button type="button" onClick={() => setPrivacyOpen(true)} className="underline">سياسة الخصوصية</button>{" "}
        والتواصل معك بخصوص المشروع.
      </p>
    </form>
  );
}
