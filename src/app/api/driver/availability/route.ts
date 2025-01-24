// /src/app/api/driver/availability/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { driverId, isAvailable } = await req.json();

    const updatedDriver = await prisma.driver.update({
      where: { id: String(driverId) },
      data: { isAvailable },
    });

    return NextResponse.json({ driver: updatedDriver }, { status: 200 });
  } catch (error) {
    console.error("Error updating driver availability:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
