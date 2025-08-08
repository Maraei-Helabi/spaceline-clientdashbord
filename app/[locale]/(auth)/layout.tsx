import { AppHeader } from "@/components/app-header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="bg-brand-secondary-400 container mx-auto h-[calc(100vh-68px)] flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
