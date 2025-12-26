import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Mail, Plus, FileText, Award, Trash2, Edit } from "lucide-react"; // Import thêm icon cho đẹp

export default async function AdminDashboard() {
  // Lấy dữ liệu từ Database
  const posts = await prisma.post.findMany({ orderBy: { date: 'desc' } });
  const certs = await prisma.certificate.findMany({ orderBy: { createdAt: 'desc' } });
  
  // Đếm số lượng tin nhắn liên hệ
  const contactCount = await prisma.contact.count();

  // Action xóa bài viết
  async function deletePost(formData: FormData) {
    "use server";
    const postId = formData.get("id") as string;
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath("/admin");
    revalidatePath("/"); 
  }

  // Action xóa chứng chỉ
  async function deleteCert(formData: FormData) {
    "use server";
    const certId = formData.get("id") as string;
    await prisma.certificate.delete({ where: { id: certId } });
    revalidatePath("/admin");
    revalidatePath("/certificates"); 
  }

  return (
    // 👇 QUAN TRỌNG: Thêm 'pt-24' để nội dung không bị Header che mất
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-6 pt-24 md:p-8 md:pt-28 pb-20">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* --- HEADER DASHBOARD --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard 🛠️</h1>
            <p className="text-neutral-500">Quản lý toàn bộ nội dung website của bạn.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* 1. Nút Hộp thư đến */}
            <Link 
              href="/admin/contacts" 
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition border border-neutral-700 flex items-center gap-2 relative"
            >
              <Mail size={18} /> Hộp thư
              {contactCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs border-2 border-neutral-900 animate-pulse">
                  {contactCount}
                </span>
              )}
            </Link>

            {/* 2. Nút Thêm chứng chỉ */}
            <Link 
              href="/admin/certificates/create" 
              className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition border border-neutral-700 flex items-center gap-2"
            >
              <Award size={18} /> Thêm chứng chỉ
            </Link>

            {/* 3. Nút Viết bài mới */}
            <Link 
              href="/admin/create" 
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-purple-900/20"
            >
              <FileText size={18} /> Viết bài mới
            </Link>
          </div>
        </div>

        {/* --- PHẦN 1: QUẢN LÝ BÀI VIẾT --- */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📝 Danh sách bài viết 
            <span className="text-sm font-normal text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              {posts.length}
            </span>
          </h2>
          
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-neutral-400 border-b border-neutral-800 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Tiêu đề</th>
                  <th className="p-4 font-medium hidden md:table-cell">Ngày</th>
                  <th className="p-4 font-medium text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-neutral-800/30 transition group">
                    <td className="p-4 font-medium text-white">
                      {post.title}
                      {/* Hiển thị ngày ở dòng dưới cho mobile */}
                      <div className="md:hidden text-xs text-neutral-500 mt-1">
                        {new Date(post.date).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                    <td className="p-4 text-neutral-500 text-sm hidden md:table-cell">
                      {new Date(post.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/edit/${post.id}`} className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500 hover:text-white transition" title="Sửa">
                          <Edit size={16} />
                        </Link>
                        <form action={deletePost}>
                            <input type="hidden" name="id" value={post.id} />
                            <button type="submit" className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500 hover:text-white transition" title="Xóa">
                              <Trash2 size={16} />
                            </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-neutral-500">
                      Chưa có bài viết nào. Hãy bấm nút "Viết bài mới" ở trên nhé!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- PHẦN 2: QUẢN LÝ CHỨNG CHỈ --- */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            🏆 Danh sách chứng chỉ 
            <span className="text-sm font-normal text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
              {certs.length}
            </span>
          </h2>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
             <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-neutral-400 border-b border-neutral-800 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Ảnh</th>
                  <th className="p-4 font-medium">Tên chứng chỉ</th>
                  <th className="p-4 font-medium hidden md:table-cell">Nơi cấp</th>
                  <th className="p-4 font-medium text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {certs.map((cert) => (
                  <tr key={cert.id} className="hover:bg-neutral-800/30 transition group">
                    <td className="p-4 w-16">
                        <div className="relative w-10 h-10 bg-white/5 rounded border border-white/10 p-1">
                           {/* Dùng try-catch hoặc fallback ảnh nếu link sai */}
                           {cert.image && <Image src={cert.image} alt="icon" fill className="object-contain" />}
                        </div>
                    </td>
                    <td className="p-4 font-medium text-white">
                      {cert.title}
                      <div className="md:hidden text-xs text-neutral-500 mt-1">{cert.issuer}</div>
                    </td>
                    <td className="p-4 text-neutral-500 text-sm hidden md:table-cell">{cert.issuer}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/certificates/edit/${cert.id}`} 
                          className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500 hover:text-white transition"
                        >
                          <Edit size={16} />
                        </Link>
                        <form action={deleteCert}>
                            <input type="hidden" name="id" value={cert.id} />
                            <button 
                              type="submit" 
                              className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded hover:bg-red-500 hover:text-white transition"
                            >
                              <Trash2 size={16} />
                            </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {certs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-neutral-500">
                      Chưa có chứng chỉ nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}