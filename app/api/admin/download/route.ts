// Force dynamic runtime so we can use Node.js APIs
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const wallet = req.nextUrl.searchParams.get("wallet");
  const preview = req.nextUrl.searchParams.get("preview"); // ?preview=true

  if (!wallet) {
    return NextResponse.json({ error: "Wallet missing" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json({ error: "No uploads folder" }, { status: 404 });
  }

  const files = fs.readdirSync(uploadDir).filter((f) => f.startsWith(wallet));
  if (files.length === 0) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const latestFile = files[0]; // always 1 file per wallet now
  const filePath = path.join(uploadDir, latestFile);
  const fileBuffer = fs.readFileSync(filePath);

  // detect type
  const ext = path.extname(latestFile).toLowerCase();
  let mimeType = "application/octet-stream";
  if (ext === ".pdf") mimeType = "application/pdf";
  else if ([".jpg", ".jpeg"].includes(ext)) mimeType = "image/jpeg";
  else if (ext === ".png") mimeType = "image/png";
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
      ...(preview
        ? {} // inline preview
        : { "Content-Disposition": `attachment; filename=${latestFile}` }),
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
  });
}
