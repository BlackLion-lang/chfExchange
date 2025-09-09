import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;
    const walletAddress = (data.get("walletAddress") as string)?.trim();

    if (!file || !walletAddress) {
      return NextResponse.json(
        { error: "Missing file or wallet address" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Remove any existing files for this wallet (any extension)
    const existingFiles = fs
      .readdirSync(uploadDir)
      .filter((f) => f.startsWith(walletAddress));
    for (const oldFile of existingFiles) {
      fs.unlinkSync(path.join(uploadDir, oldFile));
    }

    // Save new file as walletAddress + original extension
    const ext = path.extname(file.name);
    const filePath = path.join(uploadDir, `${walletAddress}${ext}`);

    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    const fileUrl = `/uploads/${walletAddress}${ext}`;
    return NextResponse.json({ fileUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
