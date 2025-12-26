import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  // Lấy dữ liệu bài viết cũ
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return <div className="text-white text-center p-10">Không tìm thấy bài viết!</div>;
  }

  // --- SERVER ACTION: Xử lý Cập nhật ---
  async function updatePost(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    // Update vào Database
    await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
        category,
        content,
      },
    });

    // Quay về trang quản lý
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex justify-center items-center py-20 px-4">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-400">
            ✏️ Chỉnh sửa bài viết
          </h1>
          <Link href="/admin" className="text-sm text-neutral-400 hover:text-white transition">
            ✕ Hủy bỏ
          </Link>
        </div>

        <form action={updatePost} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Tiêu đề</label>
            <input 
              name="title" 
              type="text" 
              defaultValue={post.title} // <-- Điền sẵn dữ liệu cũ
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Danh mục</label>
                <select 
                  name="category" 
                  defaultValue={post.category || "Next.js"}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white appearance-none"
                >
                  <option value="Next.js">Next.js</option>
                  <option value="Flutter">Flutter</option>
                  <option value=".NET">.NET</option>
                  <option value="Review">Review</option>
                  <option value="Life">Life</option>
                  <option value="Java" className="bg-[#030014]">Java</option>
  <option value="Network" className="bg-[#030014]">Network</option>
                </select>
             </div>

             <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Mô tả ngắn</label>
                <input 
                  name="description" 
                  type="text" 
                  defaultValue={post.description || ""}
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Nội dung</label>
            <textarea 
              name="content" 
              rows={10} 
              defaultValue={post.content || ""}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white font-mono text-sm leading-relaxed"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-900/30"
          >
            💾 Lưu thay đổi
          </button>

        </form>
      </div>
    </div>
  );
}