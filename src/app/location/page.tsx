"use client"
import { useState } from "react";

const CurrentLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  return (
    <div>
      <h1>Current Location</h1>
      <button onClick={fetchLocation}>Get Current Location</button>
      {location && (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default CurrentLocation;
