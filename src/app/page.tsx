import Link from "next/link";
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Your Ride, Your Way
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Whether you're commuting to work or exploring the city, we've got
            you covered with reliable and affordable rides at your fingertips.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-300">
            <Link href='http://localhost:3000/register'>Register</Link>
            </button>
            <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow hover:bg-gray-600 transition duration-300">
            <Link href='http://localhost:3000/login'>Login</Link> 
            </button>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src="/ride-sharing.webp"
            alt="Ride Sharing Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why choose?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img
                src="/ride-fast.png"
                alt="Fast Rides"
                className="mx-auto mb-4 h-16"
              />
              <h3 className="text-xl font-semibold mb-2">Fast Rides</h3>
              <p className="text-gray-400">
                Get matched with a driver within seconds and reach your
                destination quickly.
              </p>
            </div>
            <div>
              <img
                src="/affordable.png"
                alt="Affordable Prices"
                className="mx-auto mb-4 h-16"
              />
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-400">
                Experience the best rides at unbeatable prices.
              </p>
            </div>
            <div>
              <img
                src="/safe.png"
                alt="Safety First"
                className="mx-auto mb-4 h-16"
              />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-400">
                Your safety is our top priority with highly-rated drivers and
                secure rides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
