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
        className="h-11 rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-black dark:focus:border-zinc-50"
      />
      <select
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
        className="h-11 rounded-md border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-black dark:focus:border-zinc-50"
      >
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="h-11 rounded-full bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        저장
      </button>
    </form>
  );
}
