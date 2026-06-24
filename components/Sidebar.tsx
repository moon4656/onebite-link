"use client";

import { useState } from "react";
import Link from "next/link";
import { useFolders } from "@/lib/folders-context";
import type { Folder } from "@/lib/folders";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import EditFolderModal from "@/components/EditFolderModal";

export default function Sidebar() {
  const { folders } = useFolders();
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null);
  const [editTarget, setEditTarget] = useState<Folder | null>(null);

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
          <div key={folder.id} className="group relative flex items-center">
            <Link
              href={`/folder/${folder.id}`}
              className="list-item-hover flex-1 rounded-md px-3 py-2 text-left text-sm text-[var(--text-sub)]"
            >
              {folder.name}
            </Link>
            <div className="absolute right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                aria-label={`${folder.name} 폴더 수정`}
                onClick={(e) => {
                  e.preventDefault();
                  setEditTarget(folder);
                }}
                className="rounded-md p-1 text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--accent)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="M15 5l4 4" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={`${folder.name} 폴더 삭제`}
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteTarget(folder);
                }}
                className="rounded-md p-1 text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--error)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <EditFolderModal
        folder={editTarget}
        onClose={() => setEditTarget(null)}
      />
      <DeleteFolderModal
        folder={deleteTarget}
        onClose={() => setDeleteTarget(null)}
      />
    </aside>
  );
}
