import React, { useState, useRef } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import img from "../assets/RecruiterLogin.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const otpRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];

    const handleOtpChange = (index, value) => {
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);

        const focusIndex = Math.min(pastedData.length, 5);
        otpRefs[focusIndex].current.focus();
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        setStep(2);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        console.log("OTP:", otpValue);
        setStep(3);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log("New Password:", password);
        console.log("Confirm Password:", confirmPassword);
        alert("Password Reset Done!");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF05] flex items-center justify-center px-4">
            <div className="max-w-6xl w-full">
                <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-900 mb-10">
                    Forgot Password
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
                        <p className="text-2xl text-[#0496FF] text-center font-medium mb-8">
                            Reset Your Password
                        </p>
                        <img
                            src={img}
                            alt="Illustration"
                            className="h-[400px] w-full md:w-auto mx-auto"
                        />
                    </div>

                    <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-md mx-auto">

                        {step === 1 && (
                            <form onSubmit={handleSendOtp}>
                                <p className="text-gray-600 text-center mb-6">
                                    Enter your email to receive OTP
                                </p>

                                <div className="mb-6">
                                    <label className="block text-gray-800 font-medium mb-1">
                                        Email ID
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 mb-4"
                                >
                                    Send OTP
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="w-full flex items-center justify-center text-gray-600 hover:text-blue-600"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Login
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleVerifyOtp}>
                                <p className="text-gray-600 text-center mb-2">
                                    Enter the OTP sent to
                                </p>
                                <p className="text-blue-600 text-center font-medium mb-6">
                                    {email}
                                </p>

                                <div className="mb-6">
                                    <label className="block text-gray-800 font-medium mb-3 text-center">
                                        Enter OTP
                                    </label>
                                    <div className="flex justify-center gap-2">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={otpRefs[index]}
                                                type="text"
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={handlePaste}
                                                maxLength={1}
                                                className="w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 mb-4"
                                >
                                    Verify OTP
                                </button>

                                <p className="text-center text-sm text-gray-600">
                                    Didn't receive OTP?{" "}
                                    <button
                                        type="button"
                                        onClick={() => console.log("Resend OTP")}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Resend
                                    </button>
                                </p>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handleResetPassword}>
                                <p className="text-gray-600 text-center mb-6">
                                    Create your new password
                                </p>

                                <div className="mb-4 relative">
                                    <label className="block text-gray-800 font-medium mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600"
                                >
                                    Reset Password
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;