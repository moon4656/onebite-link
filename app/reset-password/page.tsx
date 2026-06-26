"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const canSubmit = password && confirmPassword;

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    if (password !== confirmPassword) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setToast("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-6">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 rounded-md bg-[var(--error)] px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8 shadow-sm">
        <h1 className="text-center text-xl font-semibold text-[var(--text)]">
          한입 링크
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="새 비밀번호를 입력해주세요"
            className="h-9 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력해주세요"
            className="h-9 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="btn-primary h-9 rounded-md text-sm font-medium text-white disabled:opacity-50"
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  );
}
