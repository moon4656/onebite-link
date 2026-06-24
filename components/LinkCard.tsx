export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
};

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)]"
    >
      <div className="flex h-32 items-center justify-center bg-[var(--hover-bg)] text-xs text-[var(--text-sub)]">
        {link.thumbnailUrl ? (
          <img
            src={link.thumbnailUrl}
            alt={link.title}
            className="h-full w-full object-cover"
          />
        ) : (
          "No Image"
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="truncate text-sm font-semibold text-[var(--text)]">
          {link.title}
        </p>
        <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
          {link.description}
        </p>
      </div>
    </a>
  );
}
