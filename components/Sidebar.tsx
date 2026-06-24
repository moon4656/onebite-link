import Link from "next/link";
import { folders } from "@/lib/folders";

export default function Sidebar() {
  return (
    <aside className="flex w-56 flex-col gap-1 border-r border-[var(--border)] p-4">
      <Link
        href="/"
        className="list-item-hover rounded-md px-3 py-2 text-left text-sm font-semibold text-[var(--text)]"
      >
        ALL
      </Link>
      <div className="mt-2 flex flex-col gap-1">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/folder/${folder.id}`}
            className="list-item-hover rounded-md px-3 py-2 text-left text-sm text-[var(--text-sub)]"
          >
            {folder.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
