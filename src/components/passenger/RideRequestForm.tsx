'use client';

import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/lib/hooks";


export default function RideRequestForm() {
  // const dispatch = useAppDispatch();
  const userId:string = useAppSelector(state=>state?.passenger?.id);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<string[]>([]);

  const handleRideRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/passenger/request-ride", {
      passengerId: userId,
      pickupLocation,
      dropoffLocation,
    });
    // console.log("response:", response.data);
  };

  const fetchSuggestions = async (query: string, type: "pickup" | "dropoff") => {
    if (query.length < 3) {
      return; // Optional: Trigger search after 3 characters to reduce API calls
    }

    const apiKey = "c9fa87f57f79452685cd447424b3c0f6"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&no_annotations=1`;

    try {
      const { data } = await axios.get(url);
      const suggestions = data.results.map((result: any) => result.formatted);

      if (type === "pickup") {
        setPickupSuggestions(suggestions);
      } else {
        setDropoffSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching address suggestions", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleRideRequest}>
      {/* Pickup Location */}
      <div>
        <label className="block text-gray-300 font-medium mb-1">Start Location</label>
        <input
          type="text"
          value={pickupLocation}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-white"
          placeholder="Enter your starting point"
          onChange={(e) => {
            setPickupLocation(e.target.value);
            fetchSuggestions(e.target.value, "pickup"); // Fetch suggestions on input change
          }}
        />
        {/* Pickup Suggestions */}
        {pickupSuggestions.length > 0 && (
          <div className="mt-2 bg-gray-800 rounded-lg shadow-lg">
            {pickupSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 text-white cursor-pointer hover:bg-gray-600"
                onClick={() => {setPickupLocation(suggestion)
                  setPickupSuggestions([]);}
                }
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dropoff Location */}
      <div>
        <label className="block text-gray-300 font-medium mb-1">End Location</label>
        <input
          type="text"
          value={dropoffLocation}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-white"
          placeholder="Enter your destination"
          onChange={(e) => {
            setDropoffLocation(e.target.value);
            fetchSuggestions(e.target.value, "dropoff"); // Fetch suggestions on input change
          }}
        />
        {/* Dropoff Suggestions */}
        {dropoffSuggestions.length > 0 && (
          <div className="mt-2 bg-gray-800 rounded-lg shadow-lg">
            {dropoffSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 text-white cursor-pointer hover:bg-gray-600"
                onClick={() => {setDropoffLocation(suggestion)
                  setDropoffSuggestions([]);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow-500 text-black py-3 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors"
      >
        Request Ride
      </button>
    </form>
  );
}
