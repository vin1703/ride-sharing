'use client'
interface RideStatusProps {
  ride: {
    id: string;
    startLocation: string;
    endLocation: string;
    status: any;
  };
}

export default function RideStatus({ ride }: RideStatusProps) {
  const { id, startLocation, endLocation, status } = ride;

  // Status Colors
  const statusColors: any = {
    pending: "bg-yellow-500 text-yellow-100",
    completed: "bg-green-500 text-green-100",
    canceled: "bg-red-500 text-red-100",
  };

  return (
    <div className="bg-gray-700 shadow-xl rounded-2xl p-6 transition-transform transform hover:scale-105">
      <h3 className="text-lg font-semibold text-white mb-2">Ride ID: {id}</h3>
      <p className="text-gray-300">
        <strong>Start:</strong> {startLocation}
      </p>
      <p className="text-gray-300">
        <strong>End:</strong> {endLocation}
      </p>
      <div className="mt-4">
        <span
          className={`inline-block px-6 py-2 text-sm font-bold rounded-full ${statusColors[status]} mb-2`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}
