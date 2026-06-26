"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { Link } from "@/lib/links";

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

function toLink(row: LinkRow): Link {
  return {
    id: row.id,
    url: row.url,
    title: row.title ?? row.url,
    description: row.description ?? "",
    thumbnailUrl: row.thumbnail_url ?? undefined,
    folderId: row.folder_id,
  };
}

type LinksContextValue = {
  links: Link[];
  addLink: (link: Omit<Link, "id">) => Promise<void>;
  updateLink: (
    id: number,
    updates: Pick<Link, "folderId" | "title" | "description">
  ) => Promise<void>;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>([]);
  const currentUserId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();

    const loadLinks = async (userId: string | undefined) => {
      if (!userId) {
        setLinks([]);
        return;
      }
      const { data } = await supabase
        .from("links")
        .select("id, url, title, description, thumbnail_url, folder_id")
        .eq("user_id", userId)
        .order("id", { ascending: true });
      if (data) setLinks(data.map(toLink));
    };

    supabase.auth.getUser().then(({ data }) => {
      currentUserId.current = data.user?.id;
      loadLinks(data.user?.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const userId = session?.user?.id;
        if (userId === currentUserId.current) return;
        currentUserId.current = userId;
        loadLinks(userId);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const addLink = async (link: Omit<Link, "id">) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnailUrl,
        folder_id: link.folderId,
      })
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();

    if (error || !data) return;
    setLinks((prev) => [...prev, toLink(data)]);
  };

  const updateLink = async (
    id: number,
    updates: Pick<Link, "folderId" | "title" | "description">
  ) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("links")
      .update({
        folder_id: updates.folderId,
        title: updates.title,
        description: updates.description,
      })
      .eq("id", id)
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();

    if (error || !data) return;
    const updated = toLink(data);
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? updated : link))
    );
  };

  return (
    <LinksContext.Provider value={{ links, addLink, updateLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");
  }
  return context;
}
