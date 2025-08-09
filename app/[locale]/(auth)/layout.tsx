import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AppHeader } from "@/components/app-header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!!session?.user) return redirect("/");

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="bg-brand-secondary-400 container mx-auto h-[calc(100vh-68px)] flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
