import type { Metadata } from "next";
import { Hanken_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import { Suspense } from "react";
import Loading from "./loading";
import { Providers } from "./provider";
import { AuthProvider } from "@/context/authContext";
import { UserContextProvider } from "@/context/userContext";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/isCheckout";
import { SocketProvider } from "@/context/SocketContext";
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
          <SocketProvider>
            {/* <AuthProvider> */}
              <CartProvider>
                <CheckoutProvider>
                  <Providers>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                    <Toaster />
                  </Providers>
                </CheckoutProvider>
              </CartProvider>
            {/* </AuthProvider> */}
          </SocketProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
