import { AppHeader } from "@/components/app-header";
import { PagesNavigation } from "@/components/pages-navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="bg-brand-secondary-400 container mx-auto mb-16">
        {children}
      </main>
      <PagesNavigation />
    </div>
  );
}
