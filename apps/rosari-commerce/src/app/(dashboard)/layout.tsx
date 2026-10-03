import { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { TopBar } from '@/components/TopBar';

/**
 * DashboardLayout — shared shell for all /dashboard/* routes.
 * Provides the persistent sidebar + top bar so individual pages
 * only need to render their own content. Keeps navigation state
 * outside page components for fast client transitions.
 *
 * Accessibility: sidebar is hidden on mobile via CSS (handled in
 * DashboardSidebar), main content always has at least p-6 padding.
 * Dark mode tokens are inherited from globals.css hsl(var(--...)).
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <main className="flex flex-1 flex-col overflow-auto">
        <TopBar />
        <div className="min-h-0 flex-1 p-6">
          {/* page content injected here */}
          {children}
        </div>
        {/* footer hint for demo users */}
        <footer className="border-t px-6 py-3 text-center text-xs text-muted-foreground">
          Rosari Commerce OS — demo: admin@rosari.id / password123
        </footer>
      </main>
    </div>
  );
}
