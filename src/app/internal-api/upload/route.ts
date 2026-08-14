import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const category = formData.get("category") as string || "general";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedFiles = [];
    const publicUploadsDir = path.join(process.cwd(), "public", "uploads", category);
    
    // Ensure the directory exists
    await mkdir(publicUploadsDir, { recursive: true });

    for (const file of files) {
      // Validate file
      if (!(file instanceof File)) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const ext = path.extname(file.name) || (file.type.startsWith("video/") ? ".mp4" : ".jpg");
      const filename = `${crypto.randomUUID()}${ext}`;
      const filepath = path.join(publicUploadsDir, filename);
      
      await writeFile(filepath, buffer);
      
      uploadedFiles.push({
        originalName: file.name,
        url: `/uploads/${category}/${filename}`,
        mimeType: file.type,
      });
    }

    return NextResponse.json({ files: uploadedFiles });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
