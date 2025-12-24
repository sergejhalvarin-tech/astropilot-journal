import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-mono uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-hud",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_15px_hsl(var(--hud-red)/0.3)]",
        outline:
          "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary shadow-[0_0_10px_hsl(var(--hud-green)/0.1)]",
        secondary:
          "bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30",
        ghost:
          "text-foreground hover:bg-muted hover:text-primary",
        link:
          "text-primary underline-offset-4 hover:underline",
        hud:
          "bg-card border border-hud-green/30 text-hud-green hover:bg-hud-green/10 hover:border-hud-green/60 shadow-[0_0_15px_hsl(var(--hud-green)/0.2)]",
        hudCyan:
          "bg-card border border-hud-cyan/30 text-hud-cyan hover:bg-hud-cyan/10 hover:border-hud-cyan/60 shadow-[0_0_15px_hsl(var(--hud-cyan)/0.2)]",
        hudAmber:
          "bg-card border border-hud-amber/30 text-hud-amber hover:bg-hud-amber/10 hover:border-hud-amber/60 shadow-[0_0_15px_hsl(var(--hud-amber)/0.2)]",
        hudRed:
          "bg-card border border-hud-red/30 text-hud-red hover:bg-hud-red/10 hover:border-hud-red/60 shadow-[0_0_15px_hsl(var(--hud-red)/0.2)]",
        success:
          "bg-success text-success-foreground hover:bg-success/90 shadow-[0_0_15px_hsl(var(--success)/0.3)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
        iconSm: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
