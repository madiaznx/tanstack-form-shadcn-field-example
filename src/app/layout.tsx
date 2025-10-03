import "@/app/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TanStack Form + Shadcn Field Example",
  description: "Example implementation of TanStack Form + Shadcn Field",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
