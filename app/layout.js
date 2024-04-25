import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "P7 work platform",
  description: "For P7 clew",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="max-w-3xl mx-auto">
            <Navbar />
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
