import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants: Record<string, string> = {
      default: "border-transparent bg-blue-600 text-white",
      secondary: "border-transparent bg-gray-100 text-gray-900",
      destructive: "border-transparent bg-red-500 text-white",
      outline: "text-gray-700",
      success: "border-transparent bg-green-500 text-white",
      warning: "border-transparent bg-yellow-500 text-white",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
