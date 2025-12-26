import { prisma } from "@/lib/prisma";
import { Mail, Calendar, User, MessageSquare } from "lucide-react";

// Tự động refresh dữ liệu mỗi khi vào trang (để thấy tin nhắn mới nhất)
export const dynamic = 'force-dynamic';

export default async function ContactInbox() {
  // Lấy tin nhắn từ Database, mới nhất lên đầu
  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-8 min-h-screen text-neutral-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hộp thư đến 📬</h1>
          <p className="text-neutral-400">Quản lý các tin nhắn liên hệ từ người xem.</p>
        </div>
        <div className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-purple-300 font-bold">
          Tổng: {contacts.length} tin nhắn
        </div>
      </div>

      {/* Danh sách tin nhắn */}
      <div className="grid gap-6">
        {contacts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
             <p className="text-neutral-500 text-lg">📭 Chưa có tin nhắn nào cả.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div 
              key={contact.id} 
              className="group bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition duration-300 shadow-lg"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                
                {/* Thông tin người gửi */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      {contact.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-neutral-400 mt-1">
                      <span className="flex items-center gap-1 hover:text-purple-400 transition">
                         <Mail size={14} /> {contact.email}
                      </span>
                      <span className="flex items-center gap-1">
                         <Calendar size={14} /> 
                         {new Date(contact.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nút hành động (Ví dụ: Trả lời qua mail) */}
                <a 
                  href={`mailto:${contact.email}`}
                  className="px-4 py-2 bg-white/5 hover:bg-purple-600 rounded-lg text-sm font-medium transition border border-white/10 hover:border-purple-500"
                >
                  Phản hồi ngay ✉️
                </a>
              </div>

              {/* Nội dung tin nhắn */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-neutral-300 leading-relaxed italic relative">
                 <MessageSquare size={20} className="absolute top-[-10px] left-4 text-purple-500 bg-[#0a0a0a] p-1 rounded-full" />
                 "{contact.message}"
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}