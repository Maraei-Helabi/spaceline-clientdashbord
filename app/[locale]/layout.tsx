import { ThemeProvider } from "@/providers/theme-provider";
import { LocaleProvider } from "@/providers/locale-provider";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

import "../globals.css";
import { DirectionProvider } from "@/providers/direction-provider";

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
              {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              ...existing code...
            </header> */}
              {children}
            </DirectionProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
