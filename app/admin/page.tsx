import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Mail } from "lucide-react";

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({ orderBy: { date: 'desc' } });
  const certs = await prisma.certificate.findMany({ orderBy: { createdAt: 'desc' } });
  
  // Đếm tin nhắn (Optional)
  const contactCount = await prisma.contact.count();

  async function deletePost(formData: FormData) {
    "use server";
    const postId = formData.get("id") as string;
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath("/admin");
    revalidatePath("/"); 
  }

  async function deleteCert(formData: FormData) {
    "use server";
    const certId = formData.get("id") as string;
    await prisma.certificate.delete({ where: { id: certId } });
    revalidatePath("/admin");
    revalidatePath("/certificates"); 
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* --- HEADER & NÚT TẠO MỚI (SỬA Ở ĐÂY) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-neutral-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard 🛠️</h1>
          </div>
          
          <div className="flex gap-3">
            {/* 1. Nút Hộp thư đến (ĐẶT Ở ĐÂY MỚI ĐÚNG) */}
            <Link 
              href="/admin/contacts" 
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition border border-neutral-700 flex items-center gap-2 relative"
            >
              <Mail size={18} /> Hộp thư
              {contactCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs border-2 border-neutral-900">
                  {contactCount}
                </span>
              )}
            </Link>

            {/* 2. Nút Thêm chứng chỉ */}
            <Link 
              href="/admin/certificates/create" 
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition border border-neutral-700 flex items-center gap-2"
            >
              📜 Thêm chứng chỉ
            </Link>

            {/* 3. Nút Viết bài mới */}
            <Link 
              href="/admin/create" 
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-purple-900/20"
            >
              ✍️ Viết bài mới
            </Link>
          </div>
        </div>

        {/* --- PHẦN 1: QUẢN LÝ BÀI VIẾT (Giữ nguyên) --- */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📝 Danh sách bài viết <span className="text-sm font-normal text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">{posts.length}</span>
          </h2>
          
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-neutral-400 border-b border-neutral-800 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Tiêu đề</th>
                  <th className="p-4 font-medium">Ngày</th>
                  <th className="p-4 font-medium text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-neutral-800/30 transition">
                    <td className="p-4 font-medium text-white">{post.title}</td>
                    <td className="p-4 text-neutral-500 text-sm">{new Date(post.date).toLocaleDateString('vi-VN')}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <Link href={`/admin/edit/${post.id}`} className="px-3 py-1.5 text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500 hover:text-white transition">Sửa</Link>
                      <form action={deletePost}>
                          <input type="hidden" name="id" value={post.id} />
                          <button type="submit" className="px-3 py-1.5 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500 hover:text-white transition">Xóa</button>
                      </form>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && <tr><td colSpan={3} className="p-6 text-center text-neutral-500">Chưa có bài viết nào.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- PHẦN 2: QUẢN LÝ CHỨNG CHỈ --- */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            🏆 Danh sách chứng chỉ <span className="text-sm font-normal text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">{certs.length}</span>
          </h2>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
             <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-neutral-400 border-b border-neutral-800 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Ảnh</th>
                  <th className="p-4 font-medium">Tên chứng chỉ</th>
                  <th className="p-4 font-medium">Nơi cấp</th>
                  <th className="p-4 font-medium text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {certs.map((cert) => (
                  <tr key={cert.id} className="hover:bg-neutral-800/30 transition">
                    <td className="p-4">
                        <div className="relative w-10 h-10 bg-white/5 rounded border border-white/10 p-1">
                            <Image src={cert.image} alt="icon" fill className="object-contain" />
                        </div>
                    </td>
                    <td className="p-4 font-medium text-white">{cert.title}</td>
                    <td className="p-4 text-neutral-500 text-sm">{cert.issuer}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <Link 
                        href={`/admin/certificates/edit/${cert.id}`} 
                        className="px-3 py-1.5 text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500 hover:text-white transition"
                      >
                        Sửa
                      </Link>

                      {/* ❌ ĐÃ XÓA NÚT HỘP THƯ Ở ĐÂY (VÌ SAI CHỖ) */}

                      <form action={deleteCert}>
                          <input type="hidden" name="id" value={cert.id} />
                          <button 
                            type="submit" 
                            className="px-3 py-1.5 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500 hover:text-white transition"
                          >
                            Xóa
                          </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {certs.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-neutral-500">Chưa có chứng chỉ nào.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}