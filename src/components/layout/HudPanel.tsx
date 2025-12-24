import * as React from "react";
import { cn } from "@/lib/utils";

interface HudPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  status?: "online" | "warning" | "error";
  glowColor?: "green" | "cyan" | "amber" | "red";
  corners?: boolean;
}

const HudPanel = React.forwardRef<HTMLDivElement, HudPanelProps>(
  ({ className, title, subtitle, status, glowColor = "green", corners = false, children, ...props }, ref) => {
    const glowClasses = {
      green: "border-hud-green/30 shadow-[0_0_20px_hsl(var(--hud-green)/0.15)]",
      cyan: "border-hud-cyan/30 shadow-[0_0_20px_hsl(var(--hud-cyan)/0.15)]",
      amber: "border-hud-amber/30 shadow-[0_0_20px_hsl(var(--hud-amber)/0.15)]",
      red: "border-hud-red/30 shadow-[0_0_20px_hsl(var(--hud-red)/0.15)]",
    };

    const topLineColors = {
      green: "from-transparent via-hud-green/50 to-transparent",
      cyan: "from-transparent via-hud-cyan/50 to-transparent",
      amber: "from-transparent via-hud-amber/50 to-transparent",
      red: "from-transparent via-hud-red/50 to-transparent",
    };

    const statusColors = {
      online: "bg-hud-green",
      warning: "bg-hud-amber",
      error: "bg-hud-red",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded border bg-gradient-to-b from-card to-background overflow-hidden",
          glowClasses[glowColor],
          corners && "hud-corners",
          className
        )}
        {...props}
      >
        {/* Top glow line */}
        <div className={cn("absolute top-0 left-0 right-0 h-px bg-gradient-to-r", topLineColors[glowColor])} />
        
        {/* Header */}
        {(title || status) && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-3">
              {status && (
                <span className={cn("w-2 h-2 rounded-full animate-pulse-glow", statusColors[status])} />
              )}
              <div>
                {title && (
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  }
);

HudPanel.displayName = "HudPanel";

export { HudPanel };
