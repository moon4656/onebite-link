"use client";

import { useState } from "react";
import EditLinkModal from "./EditLinkModal";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
};

export default function LinkCard({
  link,
}: {
  link: LinkItem & { folderId: string };
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const showImage = Boolean(link.thumbnailUrl) && !imageFailed;
  const imgSrc = link.thumbnailUrl?.startsWith("data:")
    ? link.thumbnailUrl
    : `/api/image-proxy?url=${encodeURIComponent(link.thumbnailUrl ?? "")}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)]">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex flex-col"
      >
        <div className="flex h-32 items-center justify-center bg-[var(--hover-bg)] text-xs text-[var(--text-sub)]">
          {showImage ? (
            <img
              src={imgSrc}
              alt={link.title}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            "No Image"
          )}
        </div>
        <div className="flex flex-col gap-1 p-4">
          <p className="truncate text-sm font-semibold text-[var(--text)]">
            {link.title}
          </p>
          <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
            {link.description}
          </p>
        </div>
      </a>
      <button
        type="button"
        aria-label={`${link.title} 링크 수정`}
        onClick={() => setIsEditing(true)}
        className="absolute right-2 top-2 rounded-md bg-[var(--card-bg)] p-1.5 text-[var(--text-sub)] opacity-0 hover:text-[var(--accent)] group-hover:opacity-100"
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
      {isEditing && (
        <EditLinkModal
          link={link as LinkItem & { folderId: string }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
