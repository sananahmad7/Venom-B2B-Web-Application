import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore'; // update path as needed
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLoggingIn } = useAuthStore();

    const handleLogin = async () => {
        if (!email || !password) {
            return alert("Email and password are required");
        }

        const success = await login({ email, password });
        if (success) {
            navigate("/admin-dashboard");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-white flex relative">
            {/* Back to Home Button */}
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center text-red-600 hover:text-red-800 transition-colors z-10"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-semibold text-sm">Back to Home</span>
            </button>

            {/* Left Section - Login Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="flex items-center space-x-3 mb-12">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">CE</span>
                        </div>
                        <span className="text-2xl font-black text-black">COMBAT ELITE</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-black mb-2">Welcome back</h1>
                        <p className="text-gray-600">Please enter your details</p>
                    </div>

                    <div className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoggingIn}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center space-x-2 shadow-lg"
                        >
                            {isLoggingIn ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Sign in</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section stays unchanged */}
            {/* ... Your existing right section code here ... */}
        </div>
    );
};

export default AdminLogin;
