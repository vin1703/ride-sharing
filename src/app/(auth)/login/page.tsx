'use client';

import { setDriverInfo } from "@/lib/driverSlice";
import { useAppDispatch } from "@/lib/hooks";
import { setUserInfo } from "@/lib/passengerSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identity, setIdentity] = useState('passenger');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      let response;

      if (identity === 'passenger') {
        response = await axios.post('http://localhost:3000/api/auth/login/passenger', { email, password });

        const name = response?.data?.user?.name;
        const token = response?.data?.token;
        const id = response?.data?.user?.id;

        dispatch(setUserInfo({ id, name, email, token }));
        router.push('/passenger');
      } else if (identity === 'driver') {
        response = await axios.post('http://localhost:3000/api/auth/login/driver', { email, password });

        const id = response?.data?.driver?.id;
        const isAvailable = response?.data?.driver?.isAvailable;
        const token = response?.data?.token;
        const name = response?.data?.driver?.name;

        dispatch(setDriverInfo({ id, name, email, isAvailable, token }));
        router.push('/driver');
      }
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  // Subscribe to the backend channel (without listening to messages here)

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Role Selection (Radio Buttons) */}
          <div className="mb-6">
            <p className="block text-sm font-medium mb-2">Role</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="driver"
                  name="role"
                  value="driver"
                  onChange={(e) => setIdentity(e.target.value)}
                  className="h-4 w-4 text-yellow-500 border-gray-700 focus:ring-yellow-500"
                />
                <label htmlFor="driver" className="ml-2 text-sm text-gray-300">Driver</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="passenger"
                  name="role"
                  defaultChecked
                  value="passenger"
                  onChange={(e) => setIdentity(e.target.value)}
                  className="h-4 w-4 text-yellow-500 border-gray-700 focus:ring-yellow-500"
                />
                <label htmlFor="passenger" className="ml-2 text-sm text-gray-300">Passenger</label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-300">Login</button>
        </form>

        {/* Link to Register */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Don't have an account? <a href="/register" className="text-yellow-500 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
