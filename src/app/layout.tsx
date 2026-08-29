import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceWorkerRegistration } from "@/components/layout/sw-registration";
import { Labiba } from "@/components/assistant/labiba";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  variable: "--font-tajawal",
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "مهاراتنا الرقمية - منصة تعليمية",
  description: "منصة تعليمية شاملة لمادة المهارات الرقمية في المنهاج الأردني الجديد",
  keywords: ["المهارات الرقمية", "المنهاج الأردني", "تعليم", "حاسوب", "برمجة"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "مهاراتنا الرقمية",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className={`${tajawal.className} antialiased min-h-screen flex flex-col`}>
        <ServiceWorkerRegistration />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Labiba />
      </body>
    </html>
  );
}
