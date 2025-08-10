import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AppHeader } from "@/components/app-header";
import { PagesNavigation } from "@/components/pages-navigation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/login");
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="bg-brand-secondary-400 container mx-auto mb-16 px-2 py-4">
        {children}
      </main>
      <PagesNavigation />
    </div>
  );
}
