// /src/app/api/driver/rides/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const driverId = url.searchParams.get("driverId");

  if (!driverId) {
    return NextResponse.json({ error: "Driver ID is required" }, { status: 400 });
  }

  try {
    const rides = await prisma.ride.findMany({
      where: {
        driverId:(driverId),
        status: { in: ["PENDING", "IN_PROGRESS"] },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ rides }, { status: 200 });
  } catch (error) {
    console.error("Error fetching driver rides:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
