"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { links as initialLinks, type Link } from "@/lib/links";

type LinksContextValue = {
  links: Link[];
  addLink: (link: Omit<Link, "id">) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const addLink = (link: Omit<Link, "id">) => {
    setLinks((prev) => [...prev, { ...link, id: crypto.randomUUID() }]);
  };

  return (
    <LinksContext.Provider value={{ links, addLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
