import Link from "next/link";
import { prisma } from "@/lib/prisma";
// Import icon từ lucide-react (đảm bảo bạn đã cài: npm i lucide-react)
import { ArrowLeft, Calendar, Tag } from "lucide-react"; 
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  return {
    title: post ? `${post.title} | Quang Hiếu Blog` : "Bài viết không tồn tại",
  };
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  // --- GIAO DIỆN 404 (Nếu không tìm thấy bài) ---
  if (!post) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative text-white"
        style={{ backgroundColor: '#030014' }} // Ép màu nền đen tím
      >
        <div className="w-24 h-24 bg-red-500/10 border border-red-500/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
             <span className="text-4xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Không tìm thấy bài viết!</h1>
        <Link href="/" className="px-6 py-2 bg-red-600 rounded-full hover:bg-red-500 transition">← Về trang chủ</Link>
      </div>
    );
  }

  // --- GIAO DIỆN CHÍNH ---
  return (
    <div 
        className="min-h-screen text-neutral-200 pb-20 relative overflow-hidden"
        // 👇 DÙNG STYLE TRỰC TIẾP ĐỂ ÉP MÀU NỀN & GRADIENT (Chắc chắn 100% sẽ hiện)
        style={{
            backgroundColor: '#030014', // Màu nền tím than
            backgroundImage: `
                radial-gradient(circle at 0% 0%, rgba(76, 29, 149, 0.4) 0%, transparent 50%), 
                radial-gradient(circle at 100% 100%, rgba(190, 24, 93, 0.3) 0%, transparent 50%)
            `
        }}
    >
      
      {/* Container chính */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        
        {/* Nút Quay lại */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-purple-500 transition duration-300 mb-12 backdrop-blur-sm"
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* HEADER */}
          <header className="mb-12 text-center">
            
            {/* Meta Info */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                </div>
                
                {post.category && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-900/30 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase">
                        <Tag size={14} />
                        {post.category}
                    </div>
                )}
            </div>
            
            {/* Tiêu đề */}
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              {post.title}
            </h1>
            
            {/* Gạch chân Neon */}
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
          </header>

          {/* NỘI DUNG BÀI VIẾT */}
          {/* Style kính mờ + Viền sáng nhẹ */}
          <div 
            className="rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-md shadow-2xl"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.6)' }}
          >
             <MarkdownRenderer content={post.content || post.description || "Nội dung đang cập nhật..."} />
          </div>
          
        </article>
      </div>
    </div>
  );
}