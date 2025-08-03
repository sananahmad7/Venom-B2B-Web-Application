import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function AdminLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call your zustand logout
            logout();
            // Redirect to home (if you want to go to admin-login then change route here)
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="sticky top-1 w-full z-40 bg-gray-900 text-white backdrop-blur-sm border-b border-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/admin-dashboard" className="text-xl font-bold">
                        Admin Panel
                    </Link>
                    <div className="flex items-center space-x-8">
                        <Link to="/admin-dashboard" className="hover:text-red-400">
                            Dashboard
                        </Link>
                        <Link to="/admin/orders" className="hover:text-red-400">
                            Orders
                        </Link>
                        <Link to="/admin/products" className="hover:text-red-400">
                            Products
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
            <main className="p-4">{children}</main>
        </>
    );
}

export default AdminLayout;
