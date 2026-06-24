"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFolders } from "@/lib/folders-context";
import type { Folder } from "@/lib/folders";

export default function EditFolderModal({
  folder,
  onClose,
}: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const { renameFolder } = useFolders();
  const [name, setName] = useState("");

  useEffect(() => {
    if (folder) setName(folder.name);
  }, [folder]);

  if (!folder) return null;

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    renameFolder(folder.id, trimmed);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-sm flex-col gap-4 rounded-md bg-[var(--card-bg)] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">
          폴더 이름 수정
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="폴더 이름을 입력해주세요"
          autoFocus
          className="h-11 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="btn-primary h-9 rounded-md px-4 text-sm font-medium text-white disabled:opacity-50"
          >
            저장
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
