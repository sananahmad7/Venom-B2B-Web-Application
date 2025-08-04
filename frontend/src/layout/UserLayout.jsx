import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

function UserLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-1 w-full z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">V</span>
                            </div>
                            <Link to="/" className="text-2xl font-bold text-black hidden sm:block">
                                Venom
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                                Home
                            </Link>
                            <Link to="/products" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                                Catalog
                            </Link>
                            <Link to="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                                About
                            </Link>

                            <Link to="/inquiry" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                                B2B Inquiry
                            </Link>
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-700 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-100">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="text-gray-700 hover:text-red-600 transition-colors relative p-2 rounded-lg hover:bg-gray-100">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button
                                className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden border-t border-gray-200 py-4 bg-white rounded-b-xl">
                            <div className="flex flex-col space-y-4">
                                <Link to="/" className="text-gray-700 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-gray-50">
                                    Home
                                </Link>
                                <Link
                                    to="/products"
                                    className="text-gray-700 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-gray-50"
                                >
                                    Catalog
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-gray-700 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-gray-50"
                                >
                                    About
                                </Link>

                                <Link
                                    to="/inquiry"
                                    className="text-gray-700 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-gray-50"
                                >
                                    B2B Inquiry
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <main>{children}</main>
        </>
    );
}

export default UserLayout;
