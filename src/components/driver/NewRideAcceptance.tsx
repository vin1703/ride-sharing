'use client';

import { setAcceptedRide } from "@/lib/driverSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { useEffect, useState} from "react";
import { io, Socket } from "socket.io-client";

export default function NewRideAcceptance() {
  const driverData = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();
  const [acceptButtonText, setAcceptButtonText] = useState("Accept Ride");
  // const [rideRequest, setRideRequest] = useState({
  //   passengerId: "",
  //   pickUpLocation: "",
  //   dropOffLocation: "",
  //   betweenDistance: "",
  // });

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // On connection
    socket.on("connect", () => {
      console.log("Connected to WebSocket server with ID:", socket.id);
    });

    // On receiving message from server
    socket.emit("subscribe", (`driver:${driverData.id}`));

    // Emit a test message to the server
    // socket.emit("message", "driverId");
    const channel = `driver:${driverData.id}`
    socket.on(channel,(message)=>{
      // setRideRequest(JSON.parse(message));
      dispatch(setAcceptedRide(JSON.parse(message)));
    })
    // Cleanup on disconnection
    return () => {
      socket.disconnect();
      console.log("Disconnected from WebSocket server");
    };
  }, []);

  const handleAcceptRide = async () => {
    try {
      // Handle accepting the ride (e.g., API call to update status)
      const response = await axios.patch("http://localhost:3000/api/driver/rideAccept", {
        status: "In Progress",
        passengerId : driverData.AcceptedRide.passengerId,
        driverId: driverData?.id,
        driverName: driverData?.name,
        pickUpLocation: driverData.AcceptedRide?.pickUpLocation,
        dropOffLocation: driverData.AcceptedRide?.dropOffLocation,
        distance: driverData.AcceptedRide?.betweenDistance,
      });

      if (response.status === 200) {
        setAcceptButtonText("Ride Accepted");
      }
    } catch (error) {
      console.error("Error accepting the ride:", error);
    }
  };

  return driverData.AcceptedRide?.passengerId === "" ? (
    <div className="text-center space-y-4 mt-6 text-gray-400">No Request to Show</div>
  ) : (
    <div className="text-left space-y-4 mt-6">
      <p className="text-lg font-medium text-yellow-500">driver ID:</p>
      <p className="text-md font-medium text-gray-300 ">{driverData.AcceptedRide?.passengerId}</p>

      <p className="text-lg font-medium text-yellow-500">Pickup Location:</p>
      <p className="text-md font-medium text-gray-300">{driverData.AcceptedRide?.pickUpLocation}</p>

      <p className="text-lg font-medium text-yellow-500">Dropoff Location:</p>
      <p className="text-md font-medium text-gray-300">{driverData.AcceptedRide?.dropOffLocation}</p>

      <p className="text-lg font-medium text-yellow-500">Distance:</p>
      <p className="text-md font-medium text-gray-300">{driverData.AcceptedRide?.betweenDistance} km</p>

      <button
        onClick={handleAcceptRide}
        className="w-full px-6 py-3 rounded-lg text-lg font-semibold bg-yellow-500 text-black hover:bg-yellow-600 transition-colors"
      >
        {acceptButtonText}
      </button>
    </div>
  );
}
