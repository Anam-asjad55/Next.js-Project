"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { AuthProvider } from "../context/AuthContext";
import { UIProvider } from "../context/UIContext"; 
import { JourneyProvider } from "../context/JourneyContext"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>
          <UIProvider>
            <JourneyProvider>
              <Navbar />
              <ScrollToTop />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </JourneyProvider>
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}