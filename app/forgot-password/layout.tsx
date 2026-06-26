import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
};

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
