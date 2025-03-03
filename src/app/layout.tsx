import type { Metadata } from "next";
import { Hanken_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { Providers } from "./provider";
import { AuthProvider } from "@/components/context/authContext";
import { UserContextProvider } from "@/context/userContext";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  weight: ["400", "500", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Snatch Day",
  description: "Snatch Day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hankenGrotesk.variable} ${montserrat.variable} antialiased`}
      >
        <UserContextProvider>
          <AuthProvider>
            <Providers>
              <Suspense fallback={<Loading />}>{children}</Suspense>
          </Providers>
          </AuthProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
