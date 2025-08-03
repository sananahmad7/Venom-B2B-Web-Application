import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Play, Users, Trophy, Star, Zap, Menu, X, Building2, Globe, Package } from 'lucide-react';

const VenumB2BHomepage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadTime, setLoadTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Performance indicator simulation
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setLoadTime(prev => {
    //             if (prev >= 100) {
    //                 setIsLoading(false);
    //                 clearInterval(timer);
    //                 return 100;
    //             }
    //             return prev + 3;
    //         });
    //     }, 40);

    //     return () => clearInterval(timer);
    // }, []);

    // Featured products data for B2B
    const featuredProducts = [
        {
            id: 1,
            name: "Elite Boxing Glove Collection",
            price: "From $89.99",
            originalPrice: "Retail: $129.99",
            imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=400&fit=crop&crop=center",
            category: "Boxing Equipment",
            rating: 4.9,
            isNew: true,
            moq: "Min. Order: 50 units"
        },
        {
            id: 2,
            name: "Professional MMA Gear Set",
            price: "From $159.99",
            originalPrice: "Retail: $219.99",
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
            category: "MMA Equipment",
            rating: 4.8,
            isNew: false,
            moq: "Min. Order: 25 units"
        },
        {
            id: 3,
            name: "Premium BJJ Gi Bundle",
            price: "From $119.99",
            originalPrice: "Retail: $179.99",
            imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&h=400&fit=crop&crop=center",
            category: "BJJ Equipment",
            rating: 5.0,
            isNew: true,
            moq: "Min. Order: 20 units"
        },
        {
            id: 4,
            name: "Muay Thai Training Bundle",
            price: "From $199.99",
            originalPrice: "Retail: $279.99",
            imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop&crop=center",
            category: "Muay Thai Equipment",
            rating: 4.7,
            isNew: false,
            moq: "Min. Order: 15 units"
        }
    ];

    // Product categories for B2B
    const categories = [
        {
            name: "Boxing",
            imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&h=200&fit=crop&crop=center",
            count: "120+ SKUs",
            bgColor: "bg-gray-50",
            description: "Gloves, bags, pads & accessories"
        },
        {
            name: "MMA",
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
            count: "85+ SKUs",
            bgColor: "bg-gray-50",
            description: "Gloves, shorts, rash guards & gear"
        },
        {
            name: "BJJ",
            imageUrl: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=300&h=200&fit=crop&crop=center",
            count: "95+ SKUs",
            bgColor: "bg-gray-50",
            description: "Gis, belts, rash guards & mats"
        },
        {
            name: "Muay Thai",
            imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center",
            count: "70+ SKUs",
            bgColor: "bg-gray-50",
            description: "Gloves, pads, shorts & shin guards"
        },
        {
            name: "Training",
            imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop&crop=center",
            count: "150+ SKUs",
            bgColor: "bg-gray-50",
            description: "Heavy bags, speed bags & equipment"
        },
        {
            name: "Apparel",
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
            count: "200+ SKUs",
            bgColor: "bg-gray-50",
            description: "T-shirts, hoodies & fight wear"
        }
    ];

    // B2B focused stats
    const stats = [
        { label: "Global Distributors", value: "500+", icon: Globe },
        { label: "Gym Partners", value: "2,500+", icon: Building2 },
        { label: "Product SKUs", value: "800+", icon: Package },
        { label: "Years in Business", value: "25+", icon: Zap }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    // if (isLoading) {
    //     return (
    //         <div className="min-h-screen bg-white flex items-center justify-center">
    //             <div className="text-center">
    //                 <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
    //                 <h2 className="text-black text-2xl font-bold mb-3">Venum B2B</h2>
    //                 <p className="text-gray-600 text-lg mb-4">Loading wholesale catalog...</p>
    //                 <div className="w-80 bg-gray-200 rounded-full h-2">
    //                     <div
    //                         className="bg-red-600 h-2 rounded-full transition-all duration-300"
    //                         style={{ width: `${loadTime}%` }}
    //                     ></div>
    //                 </div>
    //                 <p className="text-gray-500 text-sm mt-3">{loadTime}% Complete</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Performance Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                <div className="h-full bg-red-600 w-full"></div>
            </div>

            {/* Hero Section */}
            <section className="relative h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <img
                        src="/ok.jpg"
                        alt="Combat sports training facility"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                </div>

                {/* Diagonal Overlays */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-red-700/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-white/5 to-transparent"></div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <div className="mb-4">
                            <span className="text-red-600 font-semibold text-sm tracking-wider uppercase">Wholesale Partners</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white">
                            <span className="text-white">POWER YOUR</span>
                            <br />
                            <span className="text-red-600">BUSINESS.</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-lg">
                            Premium Venum combat sports equipment for wholesale buyers, distributors, and gym owners worldwide.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold text-lg transition-all transform hover:scale-105 shadow-lg rounded-xl">
                                Request Catalog
                            </button>
                            <button className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 font-bold text-lg transition-all flex items-center space-x-2 rounded-xl">
                                <Play className="w-5 h-5" />
                                <span>Partnership Benefits</span>
                            </button>
                        </div>
                        <div className="mt-8 flex items-center space-x-6 text-sm text-gray-400">
                            <span>• Bulk Pricing Available</span>
                            <span>• Global Shipping</span>
                            <span>• Marketing Support</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="hidden lg:flex justify-center items-center">
                        <div className="relative">
                            <div className="w-80 h-96 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                                <img
                                    src="/gym.jpg"
                                    alt="Venum professional equipment"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-2xl flex items-center justify-center text-6xl text-white" style={{ display: 'none' }}>
                                    🥊
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                                <span className="text-white font-bold text-xs">B2B</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Categories Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-16">
                        <h2 className="text-4xl font-black mb-4 text-black">Wholesale Product Categories</h2>
                        <p className="text-gray-600 text-lg">Complete range of Venum combat sports equipment for your business</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-red-600 hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl" style={{ display: 'none' }}>
                                        📷
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2 text-black group-hover:text-red-600 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-red-600 text-sm font-semibold mb-1">{category.count}</p>
                                    <p className="text-gray-500 text-sm">{category.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Stats & Partnership */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-6 mb-8">
                            <div className="h-px w-20 bg-red-600"></div>
                            <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Official UFC Partner</span>
                            <div className="h-px w-20 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl font-black mb-6 text-white">Trusted Worldwide</h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            Join our global network of distributors, retailers, and gym owners who trust Venum quality
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                                        <stat.icon className="w-8 h-8 text-red-600" />
                                    </div>
                                </div>
                                <div className="text-4xl font-black mb-3 text-white">{stat.value}</div>
                                <div className="text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-black mb-2">Featured Collections</h2>
                            <p className="text-gray-600">Best-selling wholesale products with volume discounts</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 border border-gray-300 hover:border-red-600 hover:text-red-600 flex items-center justify-center transition-colors rounded-xl hover:shadow-lg"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 border border-gray-300 hover:border-red-600 hover:text-red-600 flex items-center justify-center transition-colors rounded-xl hover:shadow-lg"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                                    <div className="bg-gray-50 hover:bg-white hover:shadow-2xl border border-gray-200 hover:border-red-600 rounded-2xl overflow-hidden transition-all duration-300 group">
                                        <div className="relative">
                                            {product.isNew && (
                                                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full z-10">
                                                    NEW
                                                </div>
                                            )}
                                            <div className="aspect-square overflow-hidden bg-gray-100">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-6xl" style={{ display: 'none' }}>
                                                    📷
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-center space-x-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                    <span className="text-gray-500 text-sm ml-2">({product.rating})</span>
                                                </div>
                                                <div className="text-red-600 text-sm font-semibold mb-2">{product.category}</div>
                                                <h3 className="text-xl font-bold mb-3 text-black group-hover:text-red-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <span className="text-2xl font-bold text-red-600">{product.price}</span>
                                                    <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
                                                </div>
                                                <div className="text-gray-600 text-sm mb-4">{product.moq}</div>
                                                <button className="w-full bg-black hover:bg-red-600 text-white py-3 px-6 font-bold transition-colors rounded-xl">
                                                    Request Quote
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">V</span>
                                </div>
                                <span className="text-2xl font-black text-black">VENUM B2B</span>
                            </div>
                            <p className="text-gray-600 mb-6 max-w-md">
                                Premium combat sports equipment for wholesale buyers, distributors, and gym owners.
                                Built for businesses that demand excellence.
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>• Wholesale Pricing</span>
                                <span>• Global Distribution</span>
                                <span>• Business Support</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-black mb-4">Categories</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">Boxing Equipment</a>
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">MMA Gear</a>
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">BJJ Equipment</a>
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">Muay Thai Gear</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-black mb-4">B2B Support</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">Become a Distributor</a>
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">Wholesale Catalog</a>
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">Pricing & Terms</a>
                                <a href="#" className="block text-gray-600 hover:text-red-600 transition-colors py-1 rounded-lg hover:bg-gray-100 px-2 -mx-2">Bulk Orders</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © 2024 Venum B2B. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6">
                            <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-500 hover:text-red-600 text-sm transition-colors">Distributor Agreement</a>

                            {/* Admin Login (Discreet Link) */}
                            <a
                                href="/admin-login"
                                className="text-[10px] text-gray-300 hover:text-red-500 transition-colors hidden md:inline-block"
                                title="Admin Access"
                            >
                                Admin
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VenumB2BHomepage;