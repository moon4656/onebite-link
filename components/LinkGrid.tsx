import LinkCard from "./LinkCard";
import { links } from "@/lib/links";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const filteredLinks = folderId
    ? links.filter((link) => link.folderId === folderId)
    : links;

  return (
    <section className="grid flex-1 grid-cols-2 gap-4 content-start p-6 sm:grid-cols-3 lg:grid-cols-4 auto-rows-min">
      {filteredLinks.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </section>
  );
}
