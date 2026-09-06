import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "NIRIKSHAK AI — MPLADS Integrity Platform",
  description: "Government-grade investigation and integrity analysis dashboard for MPLADS spending data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="h-full"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const root = document.documentElement;

  try {
    const storedLanguage = localStorage.getItem("nirikshak_lang");
    const language =
      storedLanguage === "en" ||
      storedLanguage === "hi" ||
      storedLanguage === "ta" ||
      storedLanguage === "ur"
        ? storedLanguage
        : "en";

    root.lang = language;
    root.dir = language === "ur" ? "rtl" : "ltr";
  } catch {
    root.lang = "en";
    root.dir = "ltr";
  }
})();`,
          }}
        />
      </head>
      <body className="h-full antialiased selection:bg-blue-500 selection:text-white">
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
