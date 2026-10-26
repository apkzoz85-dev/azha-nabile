"use client";

import { contact } from "@/lib/config";
import { trackConversion } from "@/lib/track";
import { WhatsAppIcon } from "./icons";

// رسائل جاهزة حسب مكان الزرار — العميل بيضغط Send بس
export const waMessages = {
  general: contact.whatsappMessage,
  hero: "مرحباً، عايز أسعار ومساحات فيلات أزها السخنة Island 3",
  price: (unit: string) => `مرحباً، عايز سعر ${unit} في أزها السخنة Island 3 والمتاح حالياً`,
  masterplan: "مرحباً، ابعتلي مخطط Island 3 في أزها السخنة والوحدات المتاحة",
  payment: "مرحباً، عايز أنظمة السداد لفيلات أزها السخنة Island 3",
  brochure: "مرحباً، ابعتلي البرشور وقائمة أسعار أزها السخنة Island 3",
};

export function waHref(message: string = waMessages.general) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

type Props = {
  message?: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  sub?: string; // سطر صغير تحت الزرار
};

export default function WAButton({ message, label = "كلّمنا واتساب", className = "", size = "md", sub }: Props) {
  const pad = size === "lg" ? "py-4 px-7 text-lg" : size === "sm" ? "py-2.5 px-4 text-sm" : "py-3.5 px-6";
  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener"
      onClick={() => trackConversion("whatsapp")}
      className={`inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1fb457] text-white font-bold shadow-lg shadow-[#25D366]/25 transition-all hover:-translate-y-0.5 ${pad} ${className}`}
    >
      <WhatsAppIcon className={size === "lg" ? "w-6 h-6" : "w-5 h-5"} />
      <span className="flex flex-col leading-tight text-right">
        <span>{label}</span>
        {sub && <span className="text-[11px] font-medium text-white/85">{sub}</span>}
      </span>
    </a>
  );
}
