import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function CreatePostPage() {
  
  // --- SERVER ACTION (Hàm xử lý trên Server) ---
  // Hàm này sẽ chạy trực tiếp trên Server khi bạn bấm nút "Đăng bài"
  async function createPost(formData: FormData) {
    "use server"; // Đánh dấu đây là Server Action

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    // 1. Lưu vào Database
    await prisma.post.create({
      data: {
        title,
        description,
        category,
        content,
        date: new Date(),
      },
    });

    // 2. Quay về trang chủ
    redirect("/admin");
  }

  // --- GIAO DIỆN FORM ---
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex justify-center items-center py-20 px-4">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            ✍️ Viết bài mới
          </h1>
          <Link href="/admin" className="text-sm text-neutral-400 hover:text-white transition">
            ✕ Hủy bỏ
          </Link>
        </div>

        {/* Form nhập liệu */}
        <form action={createPost} className="space-y-6">
          
          {/* 1. Tiêu đề */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Tiêu đề bài viết</label>
            <input 
              name="title" 
              type="text" 
              required
              placeholder="Ví dụ: Hướng dẫn học Next.js cơ bản..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition text-white placeholder-neutral-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* 2. Danh mục (Category) */}
             <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Danh mục</label>
                <select 
                  name="category" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition text-white appearance-none"
                >
                  <option value="Next.js">Next.js</option>
                  <option value="Flutter">Flutter</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="JavaFramework">JavaFramework</option>
                  <option value="Life">Life</option>
                  <option value="java">Java</option>
                </select>
             </div>

             {/* 3. Mô tả ngắn */}
             <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Mô tả ngắn</label>
                <input 
                  name="description" 
                  type="text" 
                  required
                  placeholder="Tóm tắt nội dung..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition text-white placeholder-neutral-600"
                />
             </div>
          </div>

          {/* 4. Nội dung chính */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Nội dung chi tiết</label>
            <textarea 
              name="content" 
              rows={10} 
              required
              placeholder="Viết nội dung bài viết ở đây..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition text-white placeholder-neutral-600 font-mono text-sm leading-relaxed"
            ></textarea>
          </div>

          {/* Nút Submit */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition transform active:scale-95 shadow-lg shadow-purple-900/30"
          >
            🚀 Đăng bài viết
          </button>

        </form>
      </div>
    </div>
  );
}