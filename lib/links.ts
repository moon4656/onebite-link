import { LinkItem } from "@/components/LinkCard";

export type Link = LinkItem & {
  folderId: string;
};

export const links: Link[] = [
  {
    id: "1",
    folderId: "1",
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서입니다.",
  },
  {
    id: "2",
    folderId: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크입니다.",
  },
  {
    id: "3",
    folderId: "1",
    title: "React Docs",
    url: "https://react.dev",
    description: "React 공식 문서입니다.",
  },
];
