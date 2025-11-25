import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Premium E-commerce",
  description: "A premium shopping experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="container" style={{ padding: '20px', minHeight: '80vh' }}>
            {children}
          </main>
          <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid var(--border)', marginTop: '40px', color: '#888' }}>
            &copy; 2024 ShopPremium. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
