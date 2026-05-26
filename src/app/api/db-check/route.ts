import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT 1 as ok`;
    await prisma.$disconnect();
    return NextResponse.json({ connected: true, result });
  } catch (error) {
    return NextResponse.json(
      { connected: false, error: String(error) },
      { status: 500 }
    );
  }
}
