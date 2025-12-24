import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-56 min-h-screen">
        {/* Top Status Bar */}
        <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {new Date().toLocaleDateString("ru-RU", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="font-mono text-sm font-semibold text-primary">
              {new Date().toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Подключено
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 animate-hud-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
