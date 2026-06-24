"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/lib/folders-context";
import { useLinks } from "@/lib/links-context";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !folderId || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const og = await res.json();

      addLink({
        folderId,
        url: og.url ?? url,
        title: og.title ?? url,
        description: og.description ?? "",
        thumbnailUrl: og.thumbnailUrl ?? undefined,
      });

      router.push(`/folder/${folderId}`);
    } catch {
      setError("링크 정보를 가져오지 못했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4 p-6"
    >
      <input
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="링크를 입력해주세요"
        className="h-11 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
      />
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
      {error && <p className="text-xs text-[var(--error)]">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary h-11 rounded-md text-sm font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
