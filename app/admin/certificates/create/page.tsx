import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function CreateCertificatePage() {
  
  async function createCert(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    const date = formData.get("date") as string;
    const image = formData.get("image") as string;       // Link Logo (Ảnh nhỏ)
    const proofImage = formData.get("proofImage") as string; // Link Ảnh to/PDF (Mới thêm)
    const link = formData.get("link") as string;
    const status = "Verified"; // Mặc định là đã xác thực

    await prisma.certificate.create({
      data: {
        title,
        issuer,
        date,
        image,
        proofImage: proofImage || null, // Nếu để trống thì lưu là null
        link: link || null,
        status,
      },
    });

    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-8 flex justify-center items-center">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          📜 Thêm Chứng Chỉ Mới
        </h1>

        <form action={createCert} className="space-y-5">
          
          {/* Tên chứng chỉ */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Tên chứng chỉ</label>
            <input 
                name="title" 
                required 
                placeholder="Ví dụ: AWS Certified Cloud Practitioner" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" 
            />
          </div>

          {/* Nơi cấp & Năm */}
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Nơi cấp (Issuer)</label>
               <input name="issuer" required placeholder="Amazon Web Services" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
            </div>
            <div>
               <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Năm cấp</label>
               <input name="date" required placeholder="2024" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
            </div>
          </div>

          {/* Link Logo (Ảnh nhỏ hiển thị ở danh sách) */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Link Logo (Ảnh nhỏ)</label>
            <input 
                name="image" 
                required 
                placeholder="/aws-logo.png (hoặc link online)" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" 
            />
            <p className="text-[10px] text-neutral-500 mt-1">Ảnh icon nhỏ hiện ngoài danh sách.</p>
          </div>

          {/* Link Ảnh Bằng Khen (Hiện trong Popup) - MỚI THÊM */}
          <div className="bg-purple-900/10 p-4 rounded-xl border border-purple-500/20">
            <label className="block text-xs font-bold text-purple-400 uppercase mb-1">Link Bằng Khen (PDF/Ảnh to)</label>
            <input 
                name="proofImage" 
                placeholder="/certificates/aws-cert.pdf" 
                className="w-full bg-neutral-950 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" 
            />
            <p className="text-[10px] text-purple-300/50 mt-1">
                Link file PDF hoặc ảnh chụp màn hình bằng khen. Nhớ bắt đầu bằng dấu <code>/</code> nếu file trong thư mục public.
            </p>
          </div>

          {/* Link xác thực */}
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Link xác thực (Credly)</label>
            <input name="link" placeholder="https://credly.com/..." className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Link href="/admin" className="px-6 py-3 rounded-xl bg-neutral-800 text-neutral-400 font-bold hover:bg-neutral-700 transition">
              Hủy
            </Link>
            <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition shadow-lg shadow-purple-900/20">
              + Thêm Chứng Chỉ
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}