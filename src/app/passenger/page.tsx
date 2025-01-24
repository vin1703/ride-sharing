'use client';

import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import RideRequestForm from '@/components/passenger/RideRequestForm';
import RideStatus from '@/components/passenger/RideStatus';
import withAuth from '@/components/shared/withAuth';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setRideDetails } from '@/lib/passengerSlice';

const PassengerDashboard = () => {
  const userInfo = useAppSelector(state => state.passenger);
  const dispatch = useAppDispatch();

  const [rides, setRides] = useState([
    { id: '1', startLocation: 'New York', endLocation: 'Los Angeles', status: 'pending' },
    { id: '2', startLocation: 'Chicago', endLocation: 'Houston', status: 'completed' },
    { id: '3', startLocation: 'San Francisco', endLocation: 'Seattle', status: 'canceled' },
  ]);

  // const [rideDetails, setRideDetails] = useState({
  //   driverName: '',
  //   driverId: '',
  //   distance: '',
  //   pickUpLocation: '',
  //   dropOffLocation: '',
  //   status: '',
  //   progress: 30,  // Example progress value
  //   driverProgress: 50,  // Example driver progress value
  //   eta: 'N/A', // Default value for ETA
  // });

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // On connection
    socket.on("connect", () => {
      console.log("Connected to WebSocket server with ID:", socket.id);
    });

    // On receiving ride details from server
    socket.emit("subscribe", (`passenger:${userInfo.id}`));

    const channel = `passenger:${userInfo.id}`;
    socket.on(channel, (message) => {
      console.log("Received ride details:", message);
      const parsedMessage = JSON.parse(message);
      dispatch(setRideDetails(parsedMessage));
    });

    // Cleanup on disconnection
    return () => {
      socket.disconnect();
      console.log("Disconnected from WebSocket server");
    };
  }, [userInfo.id]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Hero Header */}
      <header className="bg-gray-800 text-white shadow-lg p-8 rounded-b-3xl mb-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Ride Dashboard</h1>
          <p className="text-lg text-gray-300">Plan your trips, track rides, and stay updated—all in one place.</p>
          <p className="text-2xl font-semibold text-gray-100 mt-4">{userInfo.name}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-10 flex flex-wrap gap-10">
        {/* Flex container for parallel Ride Request and Ride Details cards */}
        <div className="flex gap-10 w-full">
          {/* Ride Request Section */}
          <section className="bg-gray-700 shadow-xl rounded-xl p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6">Request a Ride</h2>
            <RideRequestForm />
          </section>

          {/* Ride Details Section */}
          {userInfo?.rideDetails!=null && (
            <section className="bg-gray-700 shadow-xl rounded-xl p-6 w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-6">Current Ride Status</h2>
              <div className="text-gray-300 space-y-4">
                {/* Driver Name and ETA in the same line */}
                <div className="flex justify-between space-x-4">
                  <div className="flex items-center justify-between w-1/2">
                    <span>Driver</span>
                    <span className="font-semibold text-white">{userInfo?.rideDetails?.driverName || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between w-1/2">
                    <span>Journey</span>
                    <span className="font-semibold text-white">{userInfo?.rideDetails?.distance || "N/A"} KM</span>
                  </div>
                </div>

                {/* Pick-Up and Drop-Off Locations in the same line */}
                <div className="flex justify-between space-x-4">
                  <div className="flex items-center justify-between w-1/2">
                    <span>Pick-up</span>
                    <span className="font-semibold text-white">{userInfo?.rideDetails?.pickUpLocation || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between w-1/2">
                    <span>Drop-off</span>
                    <span className="font-semibold text-white">{userInfo?.rideDetails?.dropOffLocation || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Driver's Distance and Trip Progress Bar */}
              <div className="mt-6">
                <div className="text-gray-300 mb-2">Driver's Distance</div>
                <div className="bg-gray-600 w-full h-2 rounded-full mt-2 relative">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${userInfo?.rideDetails?.driverProgress || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-gray-300 mb-2">Trip Progress</div>
                <div className="bg-gray-600 w-full h-2 rounded-full mt-2 relative">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${userInfo?.rideDetails?.progress || 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Ride Status */}
              <div className="mt-6">
                <span className="text-gray-300">Status: </span>
                <span className="font-semibold text-blue-400">{userInfo?.rideDetails?.status || "Active"}</span>
              </div>
            </section>
          )}
        </div>

        {/* Ride Status Section */}
        <section className="w-full">
          <h2 className="text-2xl font-semibold mb-6">Your Rides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {rides.length > 0 ? (
              rides.map((ride) => <RideStatus key={ride.id} ride={ride} />)
            ) : (
              <div className="col-span-full text-center text-gray-400">
                You have no active rides. Start by requesting one!
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default withAuth(PassengerDashboard);
