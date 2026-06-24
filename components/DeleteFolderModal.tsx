"use client";

import { createPortal } from "react-dom";
import { useFolders } from "@/lib/folders-context";
import type { Folder } from "@/lib/folders";

export default function DeleteFolderModal({
  folder,
  onClose,
}: {
  folder: Folder | null;
  onClose: () => void;
}) {
  const { deleteFolder } = useFolders();

  if (!folder) return null;

  const handleDelete = () => {
    deleteFolder(folder.id);
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
          폴더 삭제
        </h2>
        <p className="text-sm text-[var(--text-sub)]">
          &quot;{folder.name}&quot; 폴더를 삭제하시겠습니까?
        </p>
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
            onClick={handleDelete}
            className="h-9 rounded-md bg-[var(--error)] px-4 text-sm font-medium text-white hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
