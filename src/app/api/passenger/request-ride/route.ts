import { Queue } from "bullmq";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import redis from "@/lib/redis/redis";

const prisma = new PrismaClient();

const rideQueue = new Queue("rides-queue", {
  connection: redis, // Pass the Redis connection to the queue
});

interface Details {
  passengerId: string;
  pickupLocation: string;
  dropoffLocation: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { passengerId, pickupLocation, dropoffLocation }: Details =
      await req.json();

    const ride = {
      passengerId,
      pickUpLocation: pickupLocation,
      dropOffLocation: dropoffLocation,
    };

    console.log("Ride:", ride);

    // Add to the ride queue
    await rideQueue.add("new-ride", ride);

    // Uncomment if you want to save to Prisma database
    // const newRide = await prisma.ride.create({
    //   data: ride,
    // });

    return NextResponse.json({ message: "Ride created successfully", ride });
  } catch (error) {
    console.error("Error creating ride:", error);

    return new Response(
      JSON.stringify({ error: "Failed to create ride" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
