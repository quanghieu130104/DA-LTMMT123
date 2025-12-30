import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

// Props cho Next.js 15 (searchParams là Promise)
interface Props {
  searchParams: Promise<{ cat?: string }>;
}

export default async function Home({ searchParams }: Props) {
  // 1. Lấy tham số từ URL
  const { cat } = await searchParams;

  // 2. Tạo điều kiện lọc
  const whereCondition = cat && cat !== "All" ? { category: cat } : {};

  // 3. Gọi Database
  const posts = await prisma.post.findMany({
    where: whereCondition,
    orderBy: {
      date: 'desc',
    },
  });

  // Danh sách Category (Cập nhật thêm Java, Network cho khớp với Admin)
  const categories = ["Next.js", "Flutter", "JavaScript", "JavaFramework", "Life", "Java", "Network"];

  return (
    // --- 1. NỀN CHÍNH (Deep Space Black + Blobs) ---
    <div className="min-h-screen bg-[#030014] text-neutral-200 selection:bg-purple-500 selection:text-white relative overflow-hidden">
      
      {/* HIỆU ỨNG NỀN (Glow Blobs) - Tạo chiều sâu vũ trụ */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#4c1d95]/30 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#be185d]/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      {/* --- PHẦN 1: HERO SECTION --- */}
      <section className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <span className="text-purple-300 font-medium text-sm tracking-wide">✨ Welcome to my creative space</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
              Xin chào, mình là <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 animate-pulse drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                Quang Hiếu
              </span>
            </h1>
            <h2 className="text-2xl font-semibold text-neutral-400">
              Fullstack Developer & Content Creator 🚀
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
              Mình xây dựng các ứng dụng hiện đại với hiệu suất cao. Chuyên sâu về 
              <span className="text-white font-bold border-b-2 border-purple-500 mx-1 shadow-[0_4px_10px_-4px_rgba(168,85,247,0.5)]">Next.js</span>, 
              <span className="text-white font-bold border-b-2 border-cyan-500 mx-1 shadow-[0_4px_10px_-4px_rgba(6,182,212,0.5)]">Flutter</span> và 
              <span className="text-white font-bold border-b-2 border-pink-500 mx-1 shadow-[0_4px_10px_-4px_rgba(236,72,153,0.5)]">.NET</span>.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#posts" className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-white/10">
                🚀 Khám phá ngay
              </a>
              <Link href="/about" className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold border border-white/10 transition hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Về mình
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-600 rounded-full blur-[80px] opacity-30 animate-pulse"></div>
            {/* Khung ảnh Avatar kiểu Neon Glass */}
            <div className="relative w-80 h-96 lg:w-96 lg:h-[500px] border-2 border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] rotate-3 hover:rotate-0 transition duration-500 group">
               <Image src="/avatar.png" alt="Avatar" fill className="object-cover group-hover:scale-110 transition duration-700" priority />
            </div>
          </div>
        </div>
      </section>

      {/* --- PHẦN 2: DANH SÁCH BÀI VIẾT --- */}
      <section id="posts" className="relative z-10 bg-[#050505]/30 backdrop-blur-sm py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          
          {/* HEADER + FILTER BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
                <div className="h-10 w-2 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">Bài viết mới nhất</h2>
            </div>

            {/* Bộ lọc Category - Style Glassmorphism */}
            <div className="flex flex-wrap gap-2">
                <Link 
                    href="/" 
                    scroll={false}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition border backdrop-blur-md ${
                        !cat 
                        ? "bg-purple-600/20 text-purple-300 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.4)]" 
                        : "bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white"
                    }`}
                >
                    All
                </Link>
                
                {categories.map((c) => (
                    <Link 
                        key={c}
                        href={`/?cat=${c}`}
                        scroll={false}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition border backdrop-blur-md ${
                            cat === c 
                            ? "bg-purple-600/20 text-purple-300 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.4)]" 
                            : "bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        {c}
                    </Link>
                ))}
            </div>
          </div>
          
          {/* GRID BÀI VIẾT */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              // CARD ITEM: Nền kính + Viền Neon khi Hover
              <div key={post.id} className="group relative bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-purple-500/50 transition duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]">
                
                {/* Glow nền nhẹ khi hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-900/20 px-2 py-1 rounded border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                            {new Date(post.date).toLocaleDateString('vi-VN')}
                        </span>
                        {post.category && (
                            <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-neutral-300 uppercase border border-white/10 group-hover:border-purple-500/30 group-hover:text-purple-300 transition">
                                {post.category}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                       {post.title}
                    </h3>

                    <p className="text-neutral-400 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed group-hover:text-neutral-300 transition">
                       {post.description || "Nội dung đang cập nhật..."}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-purple-500/20 transition">
                        <Link 
                           href={`/blog/${post.id}`} 
                           className="inline-flex items-center gap-2 text-white font-semibold group-hover:text-purple-400 transition"
                        >
                           Đọc chi tiết <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </Link>
                    </div>
                </div>
              </div>
            ))}
            
            {posts.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed backdrop-blur-sm">
                    <div className="p-4 rounded-full bg-neutral-900/50 text-4xl mb-4 shadow-inner">🔍</div>
                    <p className="text-white text-lg font-bold">Không tìm thấy bài viết nào.</p>
                    <p className="text-neutral-500">Thử chọn danh mục khác xem sao nhé!</p>
                </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}