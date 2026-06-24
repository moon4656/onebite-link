"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { links as initialLinks, type Link } from "@/lib/links";

type LinksContextValue = {
  links: Link[];
  addLink: (link: Omit<Link, "id">) => void;
  updateLink: (
    id: string,
    updates: Pick<Link, "folderId" | "title" | "description">
  ) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks);

  const addLink = (link: Omit<Link, "id">) => {
    setLinks((prev) => [...prev, { ...link, id: crypto.randomUUID() }]);
  };

  const updateLink = (
    id: string,
    updates: Pick<Link, "folderId" | "title" | "description">
  ) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...updates } : link))
    );
  };

  return (
    <LinksContext.Provider value={{ links, addLink, updateLink }}>
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
