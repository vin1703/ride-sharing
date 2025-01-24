import redis from "@/lib/redis/redis";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function PATCH(req:Request) {
  try {
    const { driverId, passengerId, status, distance, pickUpLocation, dropOffLocation, driverName } = await req.json();

    const rideInfo = {
      status,
      driverId,
      distance,
      pickUpLocation,
      dropOffLocation,
      driverName,
    };

    // Check if Redis is connected

    // Log the data being published
    console.log("Publishing to channel:", `passenger:${passengerId}`, 'Data:', rideInfo);

    // Publish message to Redis
    await redis.publish(`passenger:${passengerId}`, JSON.stringify(rideInfo));
    console.log("Message published successfully");

    // Uncomment the following if you need to update the ride in the database
    // const updatedRide = await prisma.ride.update({
    //   where: { passengerId: passengerId, status: "PENDING" },
    //   data: {
    //     status,
    //     driverId,
    //   },
    // });

    return NextResponse.json({ rideInfo });
  } catch (e) {
    console.error("Error in PATCH handler:", e);
    return NextResponse.json({ error: "Failed to update ride" });
  }
}
