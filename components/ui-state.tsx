"use client";

import { createContext, useContext, useState } from "react";

type UI = {
  leadOpen: boolean;
  openLead: (source?: string) => void;
  closeLead: () => void;
  leadSource: string;
  privacyOpen: boolean;
  setPrivacyOpen: (v: boolean) => void;
};

const Ctx = createContext<UI | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSource, setLeadSource] = useState("popup");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  return (
    <Ctx.Provider
      value={{
        leadOpen,
        leadSource,
        openLead: (s = "button") => {
          setLeadSource(s);
          setLeadOpen(true);
        },
        closeLead: () => setLeadOpen(false),
        privacyOpen,
        setPrivacyOpen,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useUI() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useUI outside provider");
  return c;
}
