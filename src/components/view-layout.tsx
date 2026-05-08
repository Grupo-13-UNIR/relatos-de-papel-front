import { NavigationBar } from '@/components/navigation-bar.tsx';
import type { ReactNode } from 'react';
import Footer from '@/components/footer';

export function ViewLayout({
  showSearch,
  fullFooter,
  children,
}: {
  showSearch: boolean;
  fullFooter?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <NavigationBar showSearch={showSearch} />
      </header>
      <main className="flex-1">{children}</main>
      <Footer fullFooter={fullFooter} />
    </div>
  );
}
