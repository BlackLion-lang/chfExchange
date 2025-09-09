// Force dynamic runtime so we can use Node.js APIs
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const wallet = req.nextUrl.searchParams.get("wallet");
  if (!wallet) {
    return NextResponse.json({ error: "Wallet missing" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json({ error: "No uploads folder" }, { status: 404 });
  }

  // Support multiple files: find all files starting with wallet
  const files = fs.readdirSync(uploadDir).filter(f => f.startsWith(wallet));
  if (files.length === 0) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Always serve the latest file (by mtime)
  let latestFile = files[0];
  let latestMtime = 0;

  for (const file of files) {
    const stats = fs.statSync(path.join(uploadDir, file));
    if (stats.mtimeMs > latestMtime) {
      latestMtime = stats.mtimeMs;
      latestFile = file;
    }
  }

  const filePath = path.join(uploadDir, latestFile);
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${latestFile}`,
    },
  });
}
