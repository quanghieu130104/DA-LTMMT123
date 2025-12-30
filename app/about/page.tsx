import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    // 🔴 SỬA Ở ĐÂY: Đã xóa 'bg-neutral-950'
    // Chỉ giữ lại min-h-screen và text color thôi. Nền sẽ trong suốt để hiện mây tím từ Layout.
    <div className="min-h-screen text-neutral-200 selection:bg-purple-500 selection:text-white pb-20">
      
      <div className="container mx-auto px-4 pt-10 md:pt-20">
        
        {/* --- PHẦN 1: INTRO & AVATAR --- */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          {/* Avatar với khung viền Cyberpunk */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 bg-neutral-900">
               <Image 
                 src="/avatar.png" 
                 alt="Avatar" 
                 fill 
                 className="object-cover"
               />
            </div>
          </div>

          {/* Text giới thiệu */}
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Hi, mình là <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Quang Hiếu</span> 👋
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed mb-6">
              Mình là một lập trình viên đam mê công nghệ. Mình thích xây dựng những sản phẩm thực tế, từ ứng dụng di động mượt mà với 
              <span className="text-cyan-400 font-bold mx-1 border-b border-cyan-500/50">Flutter</span> 
              đến các hệ thống web mạnh mẽ bằng 
              <span className="text-purple-400 font-bold mx-1 border-b border-purple-500/50">.NET</span> và 
              <span className="text-white font-bold mx-1 border-b border-white/50">Next.js</span>.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://github.com/quanghieu130104" target="_blank" className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition backdrop-blur-sm">
                Github
              </a>
              <a href="https://www.facebook.com/ccthui123.kmm" target="_blank" className="px-6 py-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 text-blue-400 font-medium transition backdrop-blur-sm">
                Facebook
              </a>
              <a 
    href="/Cv-hutech.pdf" 
    target="_blank" 
    className="px-6 py-2 rounded-full bg-orange-600/20 hover:bg-orange-600/40 border border-orange-500/50 text-orange-400 font-bold transition backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.2)]"
  >
    Xem CV 📄
  </a>
            </div>
          </div>
        </div>

        {/* --- PHẦN 2: TECH STACK (Kỹ năng) --- */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-10 text-center relative inline-block left-1/2 -translate-x-1/2 drop-shadow-md">
            Công nghệ sử dụng
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"></span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             <TechCard name="Next.js" icon="⚡" color="border-white/20 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
             <TechCard name="Flutter" icon="📱" color="border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
             <TechCard name=".NET Core" icon="💻" color="border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
             <TechCard name="Tailwind CSS" icon="🎨" color="border-sky-500/30 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]" />
             <TechCard name="SQL Server" icon="🗄️" color="border-red-500/30 hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
             <TechCard name="Prisma" icon="💎" color="border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
             <TechCard name="Git" icon="📦" color="border-orange-500/30 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
             <TechCard name="Figma" icon="🖌️" color="border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]" />
          </div>
        </div>

        {/* --- PHẦN 3: MY JOURNEY (Hành trình) --- */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center drop-shadow-md">Hành trình của mình</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-500 before:to-transparent">
            
            <TimelineItem 
              year="2025" 
              title="Xây dựng Blog Cá Nhân" 
              desc="Hoàn thiện blog cá nhân sử dụng Next.js 15, Prisma và Tailwind CSS với giao diện Cyberpunk." 
            />
            
            <TimelineItem 
              year="2024" 
              title="Dự án Website Bán Đồng Hồ" 
              desc="Phát triển đồ án website thương mại điện tử fullstack sử dụng ASP.NET Core MVC và SQL Server." 
            />

             <TimelineItem 
              year="2023" 
              title="Bắt đầu học Lập trình Mobile" 
              desc="Làm quen với Dart & Flutter. Xây dựng các ứng dụng mobile đầu tiên chạy đa nền tảng." 
            />

          </div>
        </div>

      </div>
    </div>
  );
}

// --- Sub-Components (Đã nâng cấp Glassmorphism) ---

function TechCard({ name, icon, color }: { name: string, icon: string, color: string }) {
  return (
    // Thêm backdrop-blur và bg trong suốt
    <div className={`bg-white/5 backdrop-blur-sm border ${color} p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition duration-300 group`}>
      <span className="text-4xl group-hover:scale-110 transition duration-300 filter drop-shadow-lg">{icon}</span>
      <span className="font-semibold text-neutral-300 group-hover:text-white transition">{name}</span>
    </div>
  )
}

function TimelineItem({ year, title, desc }: { year: string, title: string, desc: string }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      {/* Icon mốc thời gian */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500 bg-[#030014] shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
        <div className="w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_5px_#c084fc]"></div>
      </div>
      
      {/* Nội dung - Thêm Glassmorphism */}
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:border-purple-500/50 hover:bg-white/10 transition duration-300 shadow-lg">
        <div className="flex items-center justify-between space-x-2 mb-1">
          <div className="font-bold text-white text-lg">{title}</div>
          <time className="font-mono text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded border border-purple-500/30">{year}</time>
        </div>
        <div className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition">
          {desc}
        </div>
      </div>
    </div>
  )
}