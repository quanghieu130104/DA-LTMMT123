import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog của Nguyễn Đào Quang Hiếu",
  description: "Chia sẻ kiến thức về lập trình và cuộc sống"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // 1. Ép màu nền tím than đậm
        style={{ 
          backgroundColor: '#030014', 
          color: '#e2e8f0',
          minHeight: '100vh',
          position: 'relative', // Để chứa các đốm sáng
          overflowX: 'hidden'   // Tránh thanh cuộn ngang do hiệu ứng loang
        }}
      >
        {/* --- 2. THÊM HIỆU ỨNG GLOBAL (DÙNG FIXED ĐỂ NÓ ĐI THEO KHI CUỘN) --- */}
        {/* Đốm tím góc trên trái */}
        <div style={{
           position: 'fixed', top: '-10%', left: '-10%', width: '600px', height: '600px',
           background: 'rgba(76, 29, 149, 0.3)', borderRadius: '50%', filter: 'blur(120px)',
           zIndex: -1, pointerEvents: 'none'
        }} />
        
        {/* Đốm hồng góc dưới phải */}
        <div style={{
           position: 'fixed', bottom: '10%', right: '-5%', width: '500px', height: '500px',
           background: 'rgba(190, 24, 93, 0.2)', borderRadius: '50%', filter: 'blur(120px)',
           zIndex: -1, pointerEvents: 'none'
        }} />
        
        <Navbar />
        
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <main style={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>

      </body>
    </html>
  );
}