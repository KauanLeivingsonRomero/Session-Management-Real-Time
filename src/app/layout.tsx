import type { Metadata } from "next";
import "./globals.css";
import PusherProvider from "@/context/pusher";
import SessionProvider from "@/context/session";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <html lang="pt-br">
      <body>
        <PusherProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </PusherProvider>
      </body>
    </html>
  );
}
