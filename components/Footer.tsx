"use client";

import Link from "next/link";
import { Github, Mail, ArrowUp, Zap } from "lucide-react";

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 1. NỀN CHÍNH: Đổi sang màu tím than đậm (#030014) giống trang Viết bài
    <footer className="bg-[#030014] text-neutral-400 border-t border-white/10 relative overflow-hidden">
      
      {/* (Option) Thêm hiệu ứng Glow nhẹ ở footer cho ảo */}
      <div className="absolute bottom-[-50%] left-[-10%] w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      {/* --- PHẦN NỘI DUNG CHÍNH --- */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Cột 1: Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              {/* Icon sét đổi sang gradient tím hồng */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(192,38,211,0.5)]">
                <Zap size={20} className="text-white" />
              </div>
              <span>Blog Lập Trình</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Chia sẻ kiến thức về Java, JavaScript, Node.js và lập trình mạng.
              Hành trình từ Zero đến Hero.
            </p>
          </div>

          {/* Cột 2: Navigation */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm drop-shadow-md">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-purple-400 transition duration-300">Trang chủ</Link></li>
              <li><Link href="/blog" className="hover:text-purple-400 transition duration-300">Blog</Link></li>
              <li><Link href="/certificates" className="hover:text-purple-400 transition duration-300">Chứng chỉ</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition duration-300">Giới thiệu</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition duration-300">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Cột 3: Resources */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm drop-shadow-md">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com" target="_blank" className="flex items-center gap-2 hover:text-purple-400 transition duration-300">
                  <Github size={16} /> GitHub
                </a>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="flex items-center gap-2 hover:text-purple-400 transition duration-300">
                  <Mail size={16} /> Email
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Connect */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm drop-shadow-md">Connect</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Theo dõi để cập nhật những bài viết mới nhất.
            </p>
            <div className="flex gap-4">
              {/* Nút Social đổi sang style kính mờ (Glass) */}
              <a href="#" className="bg-white/5 border border-white/10 p-2 rounded-full hover:bg-purple-600 hover:border-purple-600 hover:text-white transition duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <Github size={20} />
              </a>
              <a href="#" className="bg-white/5 border border-white/10 p-2 rounded-full hover:bg-pink-600 hover:border-pink-600 hover:text-white transition duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                <Mail size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* --- PHẦN DƯỚI CÙNG --- */}
      <div className="border-t border-white/10 bg-[#020010] relative z-10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          
          <p>© 2025 Blog Lập Trình. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>

        </div>
      </div>

      {/* --- NÚT SCROLL TO TOP: Gradient Tím Hồng --- */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition transform hover:-translate-y-1 z-50 animate-bounce duration-[2000ms]"
      >
        <ArrowUp size={24} />
      </button>

    </footer>
  );
}