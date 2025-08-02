import React, { useState } from 'react';
import { LogOut, Home, Users, Package, BarChart3, Settings, Shield, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
function AdminDashboard() {
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
            // navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleNavigation = (path) => {
        // In your actual app, use navigate(path) here
        console.log(`Navigating to: ${path}`);
        alert(`Would navigate to: ${path}`);
        // Close mobile menu after navigation
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black shadow-lg border-b-4 border-red-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="flex items-center">
                            <div className="bg-red-600 text-white px-3 py-1 rounded font-bold text-lg">
                                CE
                            </div>
                            <span className="ml-3 text-white font-semibold text-xl">
                                COMBAT ELITE
                            </span>
                            <span className="ml-2 text-red-500 text-sm">Admin</span>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex space-x-8">
                            <button
                                onClick={() => handleNavigation('/admin/dashboard')}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Dashboard
                            </button>
                            <button
                                onClick={() => handleNavigation('/admin/users')}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Users
                            </button>
                            <button
                                onClick={() => handleNavigation('/admin/products')}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <Package className="w-4 h-4 mr-2" />
                                Products
                            </button>
                            <button
                                onClick={() => handleNavigation('/admin/orders')}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Orders
                            </button>
                            <button
                                onClick={() => handleNavigation('/admin/settings')}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </button>
                        </nav>

                        {/* Right side buttons */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleNavigation('/')}
                                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className="md:hidden px-4 pb-4">
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => handleNavigation('/admin/dashboard')}
                            className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => handleNavigation('/admin/users')}
                            className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Users
                        </button>
                        <button
                            onClick={() => handleNavigation('/admin/products')}
                            className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                            <Package className="w-4 h-4 mr-2" />
                            Products
                        </button>
                        <button
                            onClick={() => handleNavigation('/admin/orders')}
                            className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Orders
                        </button>
                        <button
                            onClick={() => handleNavigation('/admin/settings')}
                            className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </button>

                        {/* Mobile Home and Logout buttons */}
                        <div className="border-t border-gray-700 pt-2 mt-2">
                            <button
                                onClick={() => handleNavigation('/')}
                                className="w-full text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center mb-2"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

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