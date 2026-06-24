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
      className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div className="flex h-32 items-center justify-center bg-zinc-100 text-xs text-zinc-400 dark:bg-zinc-900">
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
      <div className="flex flex-col gap-1 p-3">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {link.title}
        </p>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {link.description}
        </p>
      </div>
    </a>
  );
}
