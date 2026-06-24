import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <LinkGrid folderId={folderId} />
      </div>
    </div>
  );
}
