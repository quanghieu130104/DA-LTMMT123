"use client";

import { useState } from "react";
import { sendContact } from "@/actions/contact";
import { Mail, MapPin, Phone, Send, Github, Facebook, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Hàm xử lý khi bấm nút Gửi
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Chặn load lại trang
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const result = await sendContact(formData);

    if (result.success) {
      setStatus({ success: true, message: "Tin nhắn của bạn đã được gửi thành công! 🚀" });
      (event.target as HTMLFormElement).reset(); // Xóa trắng form
    } else {
      setStatus({ success: false, message: result.error });
    }
    
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen text-neutral-200 pb-20 relative overflow-hidden"
      style={{
         // Giữ nguyên nền tím than đồng bộ
         backgroundColor: '#030014',
         backgroundImage: `
             radial-gradient(circle at 0% 0%, rgba(76, 29, 149, 0.4) 0%, transparent 50%), 
             radial-gradient(circle at 100% 100%, rgba(190, 24, 93, 0.3) 0%, transparent 50%)
         `
      }}
    >
      {/* Hiệu ứng đốm sáng */}
      <div className="fixed top-20 right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Liên hệ với <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Quang Hiếu</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Bạn có câu hỏi về lập trình, muốn hợp tác dự án hay đơn giản là rủ mình đi cafe? 
            Đừng ngần ngại để lại tin nhắn nhé!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
          <div className="space-y-8">
            {/* Card thông tin */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Thông tin liên lạc</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-900/30 rounded-full text-purple-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 font-semibold uppercase tracking-wider">Email</p>
                    <a href="mailto:hieunguyen130104@gmail.com" className="text-white hover:text-purple-400 transition text-lg">hieunguyen130104@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-900/30 rounded-full text-pink-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 font-semibold uppercase tracking-wider">Điện thoại</p>
                    <p className="text-white text-lg">0792126564</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-900/30 rounded-full text-blue-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400 font-semibold uppercase tracking-wider">Địa chỉ</p>
                    <p className="text-white text-lg">TP. Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mạng xã hội */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-white mb-4">Kết nối mạng xã hội</h3>
              <div className="flex gap-4">
                <a href="#" className="p-4 bg-neutral-900 rounded-full hover:bg-white hover:text-black transition duration-300 border border-white/10 group">
                  <Github size={24} />
                </a>
                <a href="#" className="p-4 bg-blue-900/20 rounded-full hover:bg-blue-600 hover:text-white text-blue-400 transition duration-300 border border-blue-500/30">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM LIÊN HỆ */}
          <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative">
            {/* Viền neon trang trí */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            <h3 className="text-2xl font-bold text-white mb-6">Gửi tin nhắn</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-300">Họ và tên</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="Nhập tên của bạn"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-neutral-300">Lời nhắn</label>
                <textarea 
                  required
                  name="message"
                  rows={5}
                  placeholder="Bạn muốn trao đổi về vấn đề gì?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition resize-none"
                ></textarea>
              </div>

              {/* Thông báo trạng thái */}
              {status && (
                <div className={`p-4 rounded-xl text-sm font-medium ${status.success ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] transition transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi ngay <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}