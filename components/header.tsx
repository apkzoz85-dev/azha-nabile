"use client";

import { useEffect, useState } from "react";
import { contact } from "@/lib/config";
import { trackConversion } from "@/lib/track";
import { PhoneIcon } from "./icons";
import { useUI } from "./ui-state";

const links = [
  { href: "#villas", label: "الفيلات" },
  { href: "#masterplan", label: "الماستر بلان" },
  { href: "#lagoon", label: "اللاجون" },
  { href: "#amenities", label: "الخدمات" },
  { href: "#location", label: "الموقع" },
  { href: "#payment", label: "السداد" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openLead } = useUI();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-deep/95 backdrop-blur shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <a href="#top" className="flex flex-col leading-none text-white" aria-label="Azha Ain Sokhna">
          <span className="font-display text-2xl md:text-3xl tracking-[0.3em] font-semibold">AZHA</span>
          <span className="font-display text-[10px] tracking-[0.45em] text-gold">AIN SOKHNA</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-white/85 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-gold transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${contact.phone}`}
            onClick={() => trackConversion("call")}
            className="hidden sm:inline-flex items-center gap-2 text-white text-sm font-semibold px-3 py-2 rounded-full hover:bg-white/10"
            dir="ltr"
          >
            <PhoneIcon className="w-4 h-4" /> {contact.phone}
          </a>
          <button onClick={() => openLead("header")} className="btn-gold !py-2.5 !px-5 text-sm">
            سجّل اهتمامك
          </button>
        </div>
      </div>
    </header>
  );
}
