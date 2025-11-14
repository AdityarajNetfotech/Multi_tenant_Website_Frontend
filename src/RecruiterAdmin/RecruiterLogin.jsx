import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import img from "../assets/RecruiterLogin.png";
import { useNavigate } from "react-router-dom";

const RecruiterLogin = () => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoading(true);
        setError("");

        if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email");
            setLoading(false);
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError("Please enter a valid 10-digit phone number");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            console.log("Login data:", {
                fullName,
                phoneNumber,
                email,
                password
            });
            
            localStorage.setItem('recruiterData', JSON.stringify({
                fullName,
                phoneNumber,
                email
            }));

            setLoading(false);
            navigate("/SuperAdmin-Dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF05]">
            <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-10 mt-5">
                Welcome Back
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full">
                <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
                    <p className="text-2xl text-[#0496FF] text-center font-medium mb-8">
                        Login to Your AIRecruiter
                    </p>
                    <img
                        src={img}
                        alt="Illustration"
                        className="h-[400px] w-full md:w-auto mx-auto"
                    />
                </div>

                <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-md mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-800 font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter Full Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-medium mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter Phone Number"
                            maxLength="10"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 font-medium mb-1">
                            Email ID
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email ID"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-800 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-gray-800 font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-[150px] bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors mb-2 disabled:bg-blue-300"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecruiterLogin;