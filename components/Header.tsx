import Link from "next/link";

export default function Header() {
  return (
    <header className="nav-blur sticky top-0 z-10 flex h-12 w-full items-center justify-between border-b border-[var(--border)] px-4">
      <span className="text-base font-semibold text-[var(--text)]">
        한입 링크
      </span>
      <Link
        href="/new"
        className="btn-primary flex h-9 items-center gap-1 rounded-md px-4 text-sm font-medium text-white"
      >
        <span aria-hidden>+</span>
        새 링크
      </Link>
    </header>
  );
}
