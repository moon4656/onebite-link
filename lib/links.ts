import { LinkItem } from "@/components/LinkCard";

export type Link = LinkItem & {
  folderId: string;
};

function thumbnail(bg: string, fg: string, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="${bg}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="40" font-weight="700" fill="${fg}">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const links: Link[] = [
  {
    id: "1",
    folderId: "1",
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서입니다.",
    thumbnailUrl: thumbnail("#000000", "#ffffff", "Next.js"),
  },
  {
    id: "2",
    folderId: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크입니다.",
    thumbnailUrl: thumbnail("#0f172a", "#38bdf8", "Tailwind"),
  },
  {
    id: "3",
    folderId: "1",
    title: "React Docs",
    url: "https://react.dev",
    description: "React 공식 문서입니다.",
    thumbnailUrl: thumbnail("#0b1320", "#61dafb", "React"),
  },
];
