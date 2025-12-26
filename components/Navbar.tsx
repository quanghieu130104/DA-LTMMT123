"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Github } from "lucide-react"; // 1. Import thêm icon Github

export default function Navbar() {
  const pathname = usePathname();

  // Danh sách các link trong Menu
  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/about" },
    { name: "Chứng chỉ", href: "/certificates" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white group">
          <div className="bg-purple-600 p-1.5 rounded-lg group-hover:bg-pink-600 transition duration-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Zap size={20} className="text-white" />
          </div>
          <span>Hieu's Blog</span>
        </Link>

        {/* MENU LINKS & SOCIAL */}
        <div className="hidden md:flex items-center gap-6"> {/* Tăng gap để thoáng hơn */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                    isActive 
                      ? "text-white bg-white/10 shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                  
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_5px_#a855f7]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CHỖ MỚI THÊM: Nút GitHub */}
          <div className="h-6 w-[1px] bg-white/10 mx-2"></div> {/* Thanh gạch dọc phân cách */}
          
          <Link
            href="https://github.com/quanghieu130104" // 2. Link GitHub của bạn
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition duration-300 group"
          >
            <Github size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">GitHub</span>
          </Link>
        </div>

        {/* NÚT MOBILE MENU */}
        <div className="md:hidden flex items-center gap-4">
            {/* Thêm icon Github cho mobile để người dùng dễ thấy */}
            <Link href="https://github.com/quanghieu130104" target="_blank">
                <Github size={20} className="text-neutral-400" />
            </Link>
        </div>

      </div>
    </nav>
  );
}