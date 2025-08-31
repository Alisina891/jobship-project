import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { image, oldPublicId } = await req.json();

    // اگر عکس قبلی وجود داشت پاک شود
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    // آپلود عکس جدید
    const result = await cloudinary.uploader.upload(image, {
      folder: "profile_pics",
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
