"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendContact(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Vui lòng điền đầy đủ thông tin!" };
    }

    // Lưu vào Database
    await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    // Reset lại cache nếu cần (ví dụ nếu có trang hiển thị danh sách admin)
    revalidatePath("/admin/contacts");

    return { success: true };
  } catch (error) {
    console.error("Lỗi gửi liên hệ:", error);
    return { success: false, error: "Có lỗi xảy ra, vui lòng thử lại sau!" };
  }
}