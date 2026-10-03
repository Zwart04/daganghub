import * as React from "react";
export function Badge({ className="", variant="default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default"|"secondary"|"outline"|"destructive" }) {
  const map: Record<string,string> = {
    default: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
    secondary: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    outline: "border border-[hsl(var(--border))] text-[hsl(var(--foreground))]",
    destructive: "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]",
  };
  return <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${map[variant]} ${className}`} {...props} />;
}
