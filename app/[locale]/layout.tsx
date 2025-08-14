import { ThemeProvider } from "@/providers/theme-provider";
import { LocaleProvider } from "@/providers/locale-provider";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

import "../globals.css";
import { DirectionProvider } from "@/providers/direction-provider";
import { SessionProvider } from "@/providers/session-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Metadata } from "next";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'ar' ? 'ادارة اشتراكات ستارلينك' : 'Starlink Subscription Management';
  
  const imageUrl =
    process.env.NEXT_PUBLIC_NEXT_AUTH_URL + `/api/og?title=${title}`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_NEXT_AUTH_URL ?? ''),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    icons: { icon: '/logo.svg' },
    openGraph: {
      type: 'website',
      title,
      images: imageUrl,
    },
    appleWebApp: { title },
    twitter: {
      title,
      images: imageUrl,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";
  setRequestLocale(locale);
  return (
    <html
      lang={locale}
      dir={dir}
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white dark:bg-black transition-colors duration-75 ease-in-out">
        <LocaleProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DirectionProvider dir={dir}>
              <Toaster />
              <ReactQueryProvider>
                <SessionProvider>{children}</SessionProvider>
              </ReactQueryProvider>
            </DirectionProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
