export type Link = {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  folderId: number | null;
};
