import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import img from "../assets/CandidateLogin.png";
import { useNavigate } from "react-router-dom";

const CandidateLogin = () => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [qualification, setQualification] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoading(true);
        setError("");

        if (!fullName || !phoneNumber || !email || !qualification || !otp) {
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

        const otpRegex = /^[0-9]{6}$/;
        if (!otpRegex.test(otp)) {
            setError("Please enter a valid 6-digit OTP");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            console.log("Login data:", {
                fullName,
                phoneNumber,
                email,
                qualification,
                otp
            });

            localStorage.setItem('candidateData', JSON.stringify({
                fullName,
                phoneNumber,
                email,
                qualification
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

                    <div className="mb-4">
                        <label className="block text-gray-800 font-medium mb-1">
                            Qualification
                        </label>
                        <input
                            type="text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            placeholder="Enter Qualification"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-800 font-medium mb-1">
                            OTP
                        </label>

                        <div className="flex gap-2">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={otp[index] || ""}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, "");
                                        if (!value) return;

                                        const newOtp = otp.split("");
                                        newOtp[index] = value;
                                        setOtp(newOtp.join(""));

                                        if (index < 5) {
                                            document.getElementById(`otp-${index + 1}`).focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace") {
                                            const newOtp = otp.split("");
                                            newOtp[index] = "";
                                            setOtp(newOtp.join(""));

                                            if (index > 0) {
                                                document.getElementById(`otp-${index - 1}`).focus();
                                            }
                                        }
                                    }}
                                    id={`otp-${index}`}
                                    className="w-12 h-12 border rounded-lg text-center text-xl 
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ))}

                            <button className="text-blue-600 text-sm ml-2">Send</button>
                        </div>
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

export default CandidateLogin;