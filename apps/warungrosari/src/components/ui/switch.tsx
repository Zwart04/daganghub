import * as React from "react";
export function Switch({ checked, onCheckedChange, className="" }: { checked: boolean; onCheckedChange: (v:boolean)=>void; className?: string }) {
  return (
    <button role="switch" aria-checked={checked} onClick={()=>onCheckedChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--input))]" } ${className}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
