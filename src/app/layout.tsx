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
      className="font-display bg-primary-light dark:bg-primary-dark box-border min-h-full text-black dark:text-white"
    >
      <body>
        <div className="grid grid-cols-1 grid-rows-[auto_auto] lg:grid-cols-[1fr_minmax(0,64rem)_1fr]">
          {/* <header className="shadow-bottom-glow col-span-full col-start-1 border-b-1 border-b-white/30">
            
          </header> */}
          <aside className="lg:col-start-1 lg:col-end-2"></aside>
          <main className="overflow-clip px-5 py-10 lg:col-start-2 lg:col-end-3">
            {children}
          </main>
          <aside className="lg:col-start-3 lg:col-end-4"></aside>
        </div>
      </body>
    </html>
  );
}
