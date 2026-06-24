"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";
import type { Link } from "@/lib/links";

export default function EditLinkModal({
  link,
  onClose,
}: {
  link: Link | null;
  onClose: () => void;
}) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();
  const [folderId, setFolderId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (link) {
      setFolderId(link.folderId);
      setTitle(link.title);
      setDescription(link.description);
    }
  }, [link]);

  if (!link) return null;

  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !folderId) return;
    updateLink(link.id, {
      folderId,
      title: trimmedTitle,
      description: description.trim(),
    });
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
          링크 수정
        </h2>
        <select
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="h-11 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          autoFocus
          className="h-11 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력해주세요"
          rows={3}
          className="resize-none rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
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
            disabled={!title.trim()}
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
