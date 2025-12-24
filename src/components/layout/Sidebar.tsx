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
  LogIn,
  UserPlus,
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

const authNavigation = [
  { name: "Вход", href: "/login", icon: LogIn },
  { name: "Регистрация", href: "/register", icon: UserPlus },
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

      {/* Auth Navigation */}
      <div className="border-t border-border p-2 space-y-2">
        {/* Кнопка регистрации - выделенная */}
        <Link
          to="/register"
          className={cn(
            "group flex items-center gap-3 rounded px-3 py-3 text-sm font-medium transition-all duration-200",
            "bg-gradient-to-r from-primary/20 to-hud-cyan/20 text-primary border border-primary/40",
            "hover:from-primary/30 hover:to-hud-cyan/30 hover:border-primary/60",
            "shadow-[0_0_15px_hsl(var(--hud-green)/0.2)]"
          )}
        >
          <UserPlus className="h-5 w-5 shrink-0 text-primary" />
          {!collapsed && (
            <span className="font-mono text-xs uppercase tracking-wider truncate">
              Регистрация
            </span>
          )}
        </Link>
        
        {/* Кнопка входа */}
        <Link
          to="/login"
          className={cn(
            "group flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-all duration-200",
            location.pathname === "/login"
              ? "bg-hud-cyan/10 text-hud-cyan border border-hud-cyan/30"
              : "text-sidebar-foreground hover:bg-muted hover:text-foreground border border-transparent"
          )}
        >
          <LogIn
            className={cn(
              "h-5 w-5 shrink-0 transition-all",
              location.pathname === "/login" ? "text-hud-cyan" : "text-muted-foreground group-hover:text-foreground"
            )}
          />
          {!collapsed && (
            <span className="font-mono text-xs uppercase tracking-wider truncate">
              Вход
            </span>
          )}
        </Link>
      </div>

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
