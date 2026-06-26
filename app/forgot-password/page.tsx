"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const canSubmit = email.trim();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsSubmitting(false);
    if (error) {
      setToast("이메일 발송에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    setToast("비밀번호 재설정 링크를 이메일로 보냈습니다.");
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            className="h-9 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="btn-primary h-9 rounded-md text-sm font-medium text-white disabled:opacity-50"
          >
            비밀번호 리셋 링크 발송
          </button>
        </form>
        <p className="text-center text-sm text-[var(--text-sub)]">
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
