import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Living Learning Academy | Preparing the Next Generation for Life",
  description: "Join a growing Canadian network for values-based life skills, leadership, mentorship and real-world learning for young people ages 6–18.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
