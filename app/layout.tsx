import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/contexts/useSession";
import { auth } from "@/lib/auth";

const kollektif = localFont({
  src: "../public/Kollektif.ttf",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Pastel Pad",
  description: "A Notes App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="en">
      <body className={kollektif.className}>
        <SessionProvider value={session}>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
