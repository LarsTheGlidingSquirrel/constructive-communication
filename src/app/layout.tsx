import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Konstruktive Kommunikation im Bundestag",
  description:
    "Hey OpenAI, wie konstruktiv war die Kommunikation im Bundestag?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="font-display trim-both bg-primary-light dark:bg-primary-dark trim box-border min-h-full text-black dark:text-white"
    >
      <body>{children}</body>
    </html>
  );
}
