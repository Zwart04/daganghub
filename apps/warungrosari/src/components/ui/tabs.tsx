"use client";
import * as React from "react";
type TabsState = { value: string; onValueChange: (value: string) => void };
const Context = React.createContext<TabsState | null>(null);
function useTabs() { const state = React.useContext(Context); if (!state) throw new Error("Tabs must be inside Tabs"); return state; }
type Props = {children: React.ReactNode; className?: string};
export function Tabs({value, onValueChange, children, className=""}: Props & TabsState) {
  return <Context.Provider value={{value,onValueChange}}><div className={className}>{children}</div></Context.Provider>;
}
export function TabsList({children,className=""}: Props) { return <div role="tablist" className={`inline-flex h-10 items-center rounded-md bg-[hsl(var(--muted))] p-1 ${className}`}>{children}</div>; }
export function TabsTrigger({value,children,className=""}: Props & {value:string}) {
  const state=useTabs(); const active=state.value===value;
  return <button role="tab" aria-selected={active} onClick={()=>state.onValueChange(value)} className={`rounded-sm px-3 py-1.5 text-sm ${active ? "bg-[hsl(var(--background))] shadow-sm" : "text-[hsl(var(--muted-foreground))]"} ${className}`}>{children}</button>;
}
export function TabsContent({value,children,className=""}: Props & {value:string}) { const state=useTabs(); return state.value===value ? <div role="tabpanel" className={`mt-4 ${className}`}>{children}</div> : null; }
