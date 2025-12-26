import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCertificatePage({ params }: Props) {
  // 1. Lấy ID từ URL
  const { id } = await params;

  // 2. Tìm chứng chỉ cũ trong Database
  const cert = await prisma.certificate.findUnique({
    where: { id },
  });

  // Nếu không thấy thì báo lỗi 404
  if (!cert) {
    notFound();
  }

  // 3. Action cập nhật (Server Action)
  async function updateCert(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    const date = formData.get("date") as string;
    const image = formData.get("image") as string;
    const proofImage = formData.get("proofImage") as string;
    const link = formData.get("link") as string;

    await prisma.certificate.update({
      where: { id }, // Tìm đúng cái id này để sửa
      data: {
        title,
        issuer,
        date,
        image,
        proofImage: proofImage || null,
        link: link || null,
      },
    });

    // Sửa xong thì quay về trang Admin
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-8 flex justify-center items-center">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          ✏️ Chỉnh sửa Chứng chỉ
        </h1>

        <form action={updateCert} className="space-y-5">
          
          {/* Tên chứng chỉ */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Tên chứng chỉ</label>
            <input 
                name="title" 
                defaultValue={cert.title} // Điền sẵn dữ liệu cũ
                required 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" 
            />
          </div>

          {/* Nơi cấp & Ngày */}
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Nơi cấp</label>
               <input name="issuer" defaultValue={cert.issuer} required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
            </div>
            <div>
               <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Ngày cấp</label>
               <input name="date" defaultValue={cert.date} required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
            </div>
          </div>

          {/* Link Logo */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Link Logo</label>
            <input name="image" defaultValue={cert.image} required className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
          </div>

          {/* Link Ảnh Bằng Khen */}
          <div className="bg-purple-900/10 p-4 rounded-xl border border-purple-500/20">
            <label className="block text-xs font-bold text-purple-400 uppercase mb-1">Link Ảnh Bằng Khen (Proof Image)</label>
            <input name="proofImage" defaultValue={cert.proofImage || ""} className="w-full bg-neutral-950 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
          </div>

          {/* Link xác thực */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Link xác thực</label>
            <input name="link" defaultValue={cert.link || ""} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Link href="/admin" className="px-6 py-3 rounded-xl bg-neutral-800 text-neutral-400 font-bold hover:bg-neutral-700 transition">
              Hủy
            </Link>
            <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
              Lưu thay đổi
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}