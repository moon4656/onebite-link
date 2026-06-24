import Link from "next/link";
import { folders } from "@/lib/folders";

export default function Sidebar() {
  return (
    <aside className="flex w-56 flex-col gap-1 border-r border-zinc-200 p-4 dark:border-zinc-800">
      <Link
        href="/"
        className="rounded-md px-3 py-2 text-left text-sm font-semibold text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
      >
        ALL
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className="rounded-md px-3 py-2 text-left text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {folder.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
