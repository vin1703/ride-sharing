"use client"

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setUserInfo } from "@/lib/passengerSlice";
import { setDriverInfo } from "@/lib/driverSlice";
import { io } from "socket.io-client";
function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [name,setName] = useState<string>('');
  const [email,setEmail] = useState('');
  const [identity,setIdentity] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const handleRegister = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(identity==="driver"){
      const response = await axios.post("http://localhost:3000/api/auth/register/driver",{
        name,
        email,
        password
      })
      const id = response?.data?.driver?.id;
      const isAvailable:boolean = response?.data?.driver?.isAvailable;
      const token:string = response.data.token;
      dispatch(setDriverInfo({id,name,email,isAvailable,token}))
      router.push('/driver');
    }
    else if(identity==="passenger"){
      const response = await axios.post("http://localhost:3000/api/auth/register/passenger",{
        name,
        email,
        password
      })
      const token = response?.data?.token;
      const id  = response?.data?.user?.id;
      dispatch(setUserInfo({id,name,email,token}))

      router.push('/passenger');
    }
  }
  return (

    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value = {name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value = {email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value = {password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value = {confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Role Selection (Driver or Passenger) */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Role</label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="driver"
                  name="role"
                  value="driver"
                  onChange={(e)=>setIdentity(e.target.value)}
                  className="h-5 w-5 text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor="driver" className="ml-2 text-sm text-gray-300">
                  Driver
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="passenger"
                  name="role"
                  value="passenger"
                  onChange={(e)=>setIdentity(e.target.value)}
                  className="h-5 w-5 text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor="passenger" className="ml-2 text-sm text-gray-300">
                  Passenger
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="http://localhost:3000/login" className="text-yellow-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
