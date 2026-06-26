"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const canSubmit = email.trim() && password;

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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setToast("이메일 또는 비밀번호가 올바르지 않습니다.");
      setIsSubmitting(false);
      return;
    }

    router.push("/");
  };

  const handleKakaoLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: window.location.origin },
    });
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="h-9 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="btn-primary h-9 rounded-md text-sm font-medium text-white disabled:opacity-50"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="self-center"
          >
            <Image
              src="/kakao_login_large_narrow.png"
              alt="카카오 로그인"
              width={366}
              height={90}
              className="h-9 w-auto"
              priority
            />
          </button>
        </form>
        <p className="text-center text-sm text-[var(--text-sub)]">
          <Link
            href="/forgot-password"
            className="text-[var(--accent)] hover:underline"
          >
            비밀번호 찾기
          </Link>
        </p>
        <p className="text-center text-sm text-[var(--text-sub)]">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[var(--accent)] hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
