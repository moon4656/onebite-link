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
import type { Folder } from "@/lib/folders";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const currentUserId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();

    const loadFolders = async (userId: string | undefined) => {
      if (!userId) {
        setFolders([]);
        return;
      }
      const { data } = await supabase
        .from("folders")
        .select("id, name")
        .eq("user_id", userId)
        .order("id", { ascending: true });
      if (data) setFolders(data);
    };

    supabase.auth.getUser().then(({ data }) => {
      currentUserId.current = data.user?.id;
      loadFolders(data.user?.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const userId = session?.user?.id;
        if (userId === currentUserId.current) return;
        currentUserId.current = userId;
        loadFolders(userId);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const addFolder = async (name: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();

    if (error || !data) return;
    setFolders((prev) => [...prev, data]);
  };

  const deleteFolder = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) return;
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = async (id: number, name: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", id);

    if (error) return;
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder))
    );
  };

  return (
    <FoldersContext.Provider
      value={{ folders, addFolder, deleteFolder, renameFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }
  return context;
}
