import { prisma } from "@/lib/prisma";
import CertificatesClient from "./CertificatesClient"; // Import file vừa tạo

export default async function CertificatesPage() {
  // Lấy dữ liệu từ Database
  const certData = await prisma.certificate.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div 
      className="min-h-screen text-neutral-200 selection:bg-purple-500 selection:text-white pb-20 relative"
      // Giữ nguyên nền Gradient "Chiêu cuối" của bạn
      style={{ 
        backgroundColor: '#000000',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(147, 51, 234, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%)
        `,
        backgroundAttachment: 'fixed'
      }} 
    >
      
      {/* Nội dung chính */}
      <div className="container mx-auto px-4 mt-10 relative z-10">
        
        {/* HEADER (Giữ nguyên cho đẹp) */}
        <div className="text-center max-w-2xl mx-auto mb-16 pt-10">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]">
             <span className="text-purple-300 font-bold text-xs tracking-widest uppercase">✨ My Journey</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl">
            Chứng chỉ của tôi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">.</span>
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-lg mx-auto">
            Tổng hợp những cột mốc và kỹ năng mình đã tích lũy được trong hành trình chinh phục công nghệ.
          </p>
        </div>

        {/* THỐNG KÊ (Giữ nguyên) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {[
                { icon: "🏆", count: certData.length, label: "Tổng số" },
                { icon: "⚡", count: certData.filter(c => c.status === 'Verified').length, label: "Đã xác thực" },
                { icon: "📅", count: "2025", label: "Năm gần nhất" }
            ].map((box, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center shadow-2xl group">
                    <div className="text-5xl mb-4 drop-shadow-lg group-hover:scale-110 transition duration-300">{box.icon}</div>
                    <div className="text-4xl font-bold text-white mb-2">{box.count}</div>
                    <div className="text-xs text-neutral-400 font-bold uppercase tracking-[0.2em]">{box.label}</div>
                </div>
            ))}
        </div>

        {/* 👇 GỌI FILE CLIENT ĐỂ XỬ LÝ CLICK VÀ POPUP 👇 */}
        <CertificatesClient data={certData} />
        
      </div>
    </div>
  );
}