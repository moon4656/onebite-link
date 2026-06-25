import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-6">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8 shadow-sm">
        <h1 className="text-center text-xl font-semibold text-[var(--text)]">
          한입 링크
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="h-11 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="h-11 rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            className="btn-primary h-11 rounded-md text-sm font-medium text-white"
          >
            회원가입
          </button>
        </form>
        <p className="text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
