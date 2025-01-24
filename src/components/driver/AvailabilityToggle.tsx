"use client";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AvailabilityToggle() {
  const [isAvailable, setIsAvailable] = useState(false);
  const driverId = useAppSelector((state) => state.driver.id);

  // Explicitly typing to handle both Node.js and browser environments
  const [locationUpdateInterval, setLocationUpdateInterval] = useState<number | null>(null);

  const startUpdatingLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }

    const updateLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // alert(`latitude:${latitude},longitude:${longitude}`)
            await axios.post("http://localhost:4000/api/driver/location", {
              driverId,
              latitude,
              longitude,
            });
          } catch (err) {
            console.error("Error updating location:", err);
          }
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    };

    // Update location immediately and start an interval
    await updateLocation();
    const interval = window.setInterval(updateLocation, 5000); // Use `window.setInterval` for browser context
    setLocationUpdateInterval(interval);
  };

  const stopUpdatingLocation = async () => {
    if (locationUpdateInterval !== null) {
      clearInterval(locationUpdateInterval); // Now works without TypeScript error
      setLocationUpdateInterval(null);
    }

    try {
      const res = await axios.delete("http://localhost:4000/api/driver/location",{
        data : {driverId},
      })
      console.log("Driver's key deleted from Geo index.");
    } catch (err) {
      console.error("Error deleting driver's location:", err);
    }
  };

  const toggleAvailability = async () => {
    if (isAvailable) {
      setIsAvailable(false);
      await stopUpdatingLocation();
    } else {
      setIsAvailable(true);
      await startUpdatingLocation();
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (isAvailable) {
        await stopUpdatingLocation();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (locationUpdateInterval !== null) {
        clearInterval(locationUpdateInterval);
      }
    };
  }, [isAvailable, locationUpdateInterval]);

  return (
    <div className="flex items-center justify-between">
      <span className="text-lg font-medium text-gray-300">Availability:</span>
      <button
        onClick={toggleAvailability}
        className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
          isAvailable
            ? "bg-green-500 text-black hover:bg-green-600"
            : "bg-gray-600 text-white hover:bg-gray-500"
        }`}
      >
        {isAvailable ? "Online" : "Offline"}
      </button>
    </div>
  );
}
