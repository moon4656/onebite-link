"use client";

import { useState } from "react";
import { folders } from "@/lib/folders";

export default function NewLinkForm() {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  return (
    <form className="flex w-full max-w-md flex-col gap-4 p-6">
      <input
        type="url"
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
      <button
        type="submit"
        className="btn-primary h-11 rounded-md text-sm font-medium text-white"
      >
        저장
      </button>
    </form>
  );
}
