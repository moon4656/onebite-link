"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "@/components/NewFolderModal";

export default function Header() {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  return (
    <header className="nav-blur sticky top-0 z-10 flex h-12 w-full items-center justify-between border-b border-[var(--border)] px-4">
      <span className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          className="flex h-9 items-center gap-1 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] hover:bg-[var(--hover-bg)]"
        >
          <span aria-hidden>+</span>
          새 폴더
        </button>
        <Link
          href="/new"
          className="btn-primary flex h-9 items-center gap-1 rounded-md px-4 text-sm font-medium text-white"
        >
          <span aria-hidden>+</span>
          새 링크
        </Link>
      </div>
      <NewFolderModal
        open={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
      />
    </header>
  );
}
