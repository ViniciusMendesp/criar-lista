import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";

import "./globals.css";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Criar-lista",
  description: "Criador de lista de compra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-background font-mono antialiased, ")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
