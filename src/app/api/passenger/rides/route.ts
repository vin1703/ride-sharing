
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const passengerId = url.searchParams.get("passengerId");

  if (!passengerId) {
    return NextResponse.json({ error: "Passenger ID is required" }, { status: 400 });
  }

  try {
    const rides = await prisma.ride.findMany({
      where: { passengerId: (passengerId) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ rides }, { status: 200 });
  } catch (error) {
    console.error("Error fetching passenger rides:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
