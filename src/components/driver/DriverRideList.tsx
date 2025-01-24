"use client";

export default function DriverRideList() {
  const rides = [
    {
      id: 1,
      passenger: "John Doe",
      pickup: "Location A",
      dropoff: "Location B",
      status: "Pending",
    },
    {
      id: 2,
      passenger: "Jane Smith",
      pickup: "Location C",
      dropoff: "Location D",
      status: "In Progress",
    },
    {
      id: 3,
      passenger: "Michael Brown",
      pickup: "Location E",
      dropoff: "Location F",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-4">
      {rides.map((ride) => (
        <div
          key={ride.id}
          className="p-4 border-b border-gray-600 last:border-none flex justify-between items-center"
        >
          <div>
            <p className="font-medium text-gray-200">Passenger: {ride.passenger}</p>
            <p className="text-sm text-gray-400">
              Pickup: {ride.pickup} | Dropoff: {ride.dropoff}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              ride.status === "Pending"
                ? "bg-yellow-500 text-black"
                : ride.status === "In Progress"
                ? "bg-blue-500 text-white"
                : "bg-green-500 text-black"
            }`}
          >
            {ride.status}
          </span>
        </div>
      ))}
    </div>
  );
}
