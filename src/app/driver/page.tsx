"use client";
import DriverRideList from "@/components/driver/DriverRideList";
import AvailabilityToggle from "@/components/driver/AvailabilityToggle";
import NewRideAcceptance from "@/components/driver/NewRideAcceptance";
import withAuth from "@/components/shared/withAuth";

function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
            Driver Dashboard
          </h1>
          <p className="text-gray-300 text-lg mt-2 md:mt-0">
            Manage your rides efficiently and stay updated in real time.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Availability Toggle */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-yellow-400">Your Availability</h2>
            <AvailabilityToggle />
          </div>

          {/* New Ride Acceptance */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-yellow-400">New Ride Request</h2>
            <NewRideAcceptance />
          </div>
        </aside>

        {/* Right Section */}
        <section className="lg:col-span-8">
          {/* Ride List */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-yellow-400">Assigned Rides</h2>
            <DriverRideList />
          </div>
        </section>
      </main>
    </div>
  );
}

export default withAuth(DriverDashboard);
