import { NavigationBar } from '@/components/navigation-bar.tsx';
import type { ReactNode } from 'react';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner.tsx';

export function ViewLayout({ showSearch, children }: { showSearch: boolean; children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <NavigationBar showSearch={showSearch} />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
