import React, { useState } from 'react';
import { LogOut, Home, Users, Package, BarChart3, Settings, Shield, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logout } = useAuthStore();
    const handleLogout = async () => {
        try {
            // Replace this with your actual zustand store logout function
            // Example: useAuthStore.getState().logout();

            // For now, we'll simulate the logout process
            console.log('Logging out...');
            logout();
            // In your actual implementation, navigate to home page after logout
            //navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleNavigation = (path) => {
        console.log(`Navigating to: ${path}`);
        navigate(path);
        alert(`Would navigate to: ${path}`);
        // Close mobile menu after navigation
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome to the Combat Elite admin panel. Use the navigation above to manage your application.</p>

                    {/* Placeholder for dashboard content */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-lg text-white">
                            <h3 className="text-lg font-semibold">Total Users</h3>
                            <p className="text-3xl font-bold mt-2">-</p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-lg text-white">
                            <h3 className="text-lg font-semibold">Total Products</h3>
                            <p className="text-3xl font-bold mt-2">-</p>
                        </div>
                        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg text-white">
                            <h3 className="text-lg font-semibold">Total Orders</h3>
                            <p className="text-3xl font-bold mt-2">-</p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-800 to-black p-6 rounded-lg text-white">
                            <h3 className="text-lg font-semibold">Revenue</h3>
                            <p className="text-3xl font-bold mt-2">-</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;