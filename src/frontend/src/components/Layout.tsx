import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F0F2F5" }}
    >
      <Header />

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-xl mx-auto w-full">{children}</div>
      </main>

      <BottomNav />
    </div>
  );
}
