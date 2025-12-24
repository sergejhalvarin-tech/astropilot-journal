import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  List,
  GraduationCap,
  FileText,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  Target,
} from "lucide-react";

const navigation = [
  { name: "Панель", href: "/", icon: LayoutDashboard },
  { name: "Новая сделка", href: "/new-trade", icon: PlusCircle },
  { name: "Аналитика", href: "/analytics", icon: BarChart3 },
  { name: "Список сделок", href: "/trades", icon: List },
  { name: "Академия", href: "/academy", icon: GraduationCap },
  { name: "Еженедельный отчет", href: "/weekly-report", icon: FileText },
  { name: "Инструкции", href: "/instructions", icon: BookOpen },
  { name: "Настройки", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            </div>
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
              TradeHUD
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_hsl(var(--hud-green)/0.2)]"
                  : "text-sidebar-foreground hover:bg-muted hover:text-foreground border border-transparent"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-all",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {!collapsed && (
                <span className="font-mono text-xs uppercase tracking-wider truncate">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Status Footer */}
      <div className="border-t border-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Система активна
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
