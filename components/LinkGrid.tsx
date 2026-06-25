"use client";

import LinkCard from "./LinkCard";
import { useLinks } from "@/lib/links-context";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const { links } = useLinks();
  const filteredLinks = folderId
    ? links.filter((link) => link.folderId === Number(folderId))
    : links;

  return (
    <section className="grid flex-1 grid-cols-2 content-start gap-4 p-6 auto-rows-min sm:grid-cols-3 lg:grid-cols-4">
      {filteredLinks.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </section>
  );
}
