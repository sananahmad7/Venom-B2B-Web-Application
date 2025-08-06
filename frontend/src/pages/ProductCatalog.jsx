import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown, ChevronRight, Star, Package, AlertCircle, Eye, Heart, ShoppingCart, ArrowLeft, ArrowRight, X, Plus, Minus } from 'lucide-react';
import useProductStore from '../store/useProductStore';

const VenumProductCatalog = () => {
    const { products, featuredProducts, getAllProducts } = useProductStore();
    useEffect(() => {
        getAllProducts();
    }, [products])
    // Mock data that matches your product model structure
    // const [products, setProducts] = useState([
    //     {
    //         _id: '1',
    //         name: 'Elite Boxing Gloves Pro',
    //         sku: 'VEN-BOX-001',
    //         description: 'Professional grade boxing gloves with premium leather construction and advanced padding technology.',
    //         category: 'Boxing',
    //         packageInfo: {
    //             itemsPerPackage: 2,
    //             unitPrice: 89.99,
    //             currency: 'USD'
    //         },
    //         availableStock: 250,
    //         image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=600&fit=crop&crop=center',
    //         isActive: true,
    //         isFeatured: true,
    //     },
    //     {
    //         _id: '2',
    //         name: 'Professional MMA Gloves',
    //         sku: 'VEN-MMA-002',
    //         description: 'Open-finger MMA gloves designed for professional competition and training.',
    //         category: 'MMA',
    //         packageInfo: {
    //             itemsPerPackage: 2,
    //             unitPrice: 59.99,
    //             currency: 'USD'
    //         },
    //         availableStock: 180,
    //         image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center',
    //         isActive: true,
    //         isFeatured: false,
    //     },
    //     {
    //         _id: '3',
    //         name: 'Premium BJJ Gi',
    //         sku: 'VEN-BJJ-003',
    //         description: 'Competition-grade BJJ Gi made from premium pearl weave cotton.',
    //         category: 'BJJ',
    //         packageInfo: {
    //             itemsPerPackage: 1,
    //             unitPrice: 119.99,
    //             currency: 'USD'
    //         },
    //         availableStock: 95,
    //         image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=600&fit=crop&crop=center',
    //         isActive: true,
    //         isFeatured: true,
    //     },
    //     {
    //         _id: '4',
    //         name: 'Muay Thai Training Gloves',
    //         sku: 'VEN-MT-004',
    //         description: 'Traditional Muay Thai gloves with authentic Thai craftsmanship.',
    //         category: 'Muay Thai',
    //         packageInfo: {
    //             itemsPerPackage: 2,
    //             unitPrice: 74.99,
    //             currency: 'USD'
    //         },
    //         availableStock: 0,
    //         image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=600&fit=crop&crop=center',
    //         isActive: true,
    //         isFeatured: false,
    //     },
    //     {
    //         _id: '5',
    //         name: 'Elite Training Shorts',
    //         sku: 'VEN-TR-005',
    //         description: 'High-performance training shorts with 4-way stretch fabric.',
    //         category: 'Training',
    //         packageInfo: {
    //             itemsPerPackage: 3,
    //             unitPrice: 44.99,
    //             currency: 'USD'
    //         },
    //         availableStock: 320,
    //         image: 'https://images.unsplash.com/photo-1566884253880-c6b1c3cb7b38?w=600&h=600&fit=crop&crop=center',
    //         isActive: true,
    //         isFeatured: false,
    //     },
    //     {
    //         _id: '6',
    //         name: 'Performance Rashguard',
    //         sku: 'VEN-APP-006',
    //         description: 'Moisture-wicking rashguard with compression fit.',
    //         category: 'Apparel',
    //         packageInfo: {
    //             itemsPerPackage: 1,
    //             unitPrice: 39.99,
    //             currency: 'USD'
    //         },
    //         availableStock: 145,
    //         image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center',
    //         isActive: true,
    //         isFeatured: true,
    //     }
    // ]);
    const [isLoading, setIsLoading] = useState(false);

    // STATE MANAGEMENT
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortBy, setSortBy] = useState('name');

    // FILTERS STATE
    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        inStock: false,
        featured: false,
        active: true
    });

    // BREADCRUMB STATE
    const [breadcrumbs, setBreadcrumbs] = useState([
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/products' }
    ]);

    // Load products on component mount (simulated)
    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    // CATEGORIES FROM YOUR MODEL
    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'Boxing', name: 'Boxing' },
        { id: 'MMA', name: 'MMA' },
        { id: 'BJJ', name: 'BJJ' },
        { id: 'Muay Thai', name: 'Muay Thai' },
        { id: 'Training', name: 'Training' },
        { id: 'Apparel', name: 'Apparel' }
    ];

    // FILTERED AND SORTED PRODUCTS
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Price filter
        filtered = filtered.filter(product => {
            const price = product.packageInfo.unitPrice;
            return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        });

        // Stock filter
        if (filters.inStock) {
            filtered = filtered.filter(product => product.availableStock > 0);
        }

        // Featured filter
        if (filters.featured) {
            filtered = filtered.filter(product => product.isFeatured);
        }

        // Active filter
        if (filters.active) {
            filtered = filtered.filter(product => product.isActive);
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price':
                    return a.packageInfo.unitPrice - b.packageInfo.unitPrice;
                case 'stock':
                    return b.availableStock - a.availableStock;
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchQuery, selectedCategory, filters, sortBy, products]);

    // FILTER HANDLERS
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            priceRange: [0, 1000],
            inStock: false,
            featured: false,
            active: true
        });
        setSelectedCategory('all');
        setSearchQuery('');
    };

    // BREADCRUMB HANDLER
    useEffect(() => {
        let newBreadcrumbs = [
            { label: 'Home', path: '/' },
            { label: 'Products', path: '/products' }
        ];

        if (selectedCategory !== 'all') {
            const category = categories.find(cat => cat.id === selectedCategory);
            if (category) {
                newBreadcrumbs.push({ label: category.name, path: `/products/${category.id}` });
            }
        }

        setBreadcrumbs(newBreadcrumbs);
    }, [selectedCategory]);

    // Get unique values for filters
    const getUniqueValues = (field) => {
        return [...new Set(products.map(product => {
            if (field === 'price') return Math.floor(product.packageInfo.unitPrice / 50) * 50;
            return product[field];
        }))].filter(Boolean);
    };

    // PRODUCT DETAIL MODAL
    const ProductDetailModal = ({ product, onClose }) => {
        if (!product) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-black">{product.name}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 grid lg:grid-cols-2 gap-8">
                        <div>
                            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-24 h-24 text-gray-300" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="mb-6">
                                <div className="text-red-600 font-semibold mb-2">{product.category} • {product.sku}</div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-gray-300" />
                                        ))}
                                    </div>
                                    {product.isFeatured && (
                                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <h3 className="font-bold text-black mb-4">Package Information</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Items per Package</span>
                                        <span className="font-bold text-black">{product.packageInfo.itemsPerPackage}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Unit Price</span>
                                        <span className="font-bold text-red-600">
                                            ${product.packageInfo.unitPrice} {product.packageInfo.currency}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Package Price</span>
                                        <span className="font-bold text-green-600">
                                            ${(product.packageInfo.unitPrice * product.packageInfo.itemsPerPackage).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-gray-600 text-sm">Available Stock</div>
                                    <div className={`text-xl font-bold ${product.availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.availableStock > 0 ? `${product.availableStock} units` : 'Out of Stock'}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-gray-600 text-sm">Status</div>
                                    <div className={`text-xl font-bold ${product.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex space-x-4">
                                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 font-bold rounded-xl transition-colors">
                                    Request Quote
                                </button>
                                <button className="flex-1 border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 py-3 px-6 font-bold rounded-xl transition-colors">
                                    Add to Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                <button className="hover:text-red-600 transition-colors">
                                    {crumb.label}
                                </button>
                                {index < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 max-w-md relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products, SKU, or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:border-red-600 transition-colors"
                            >
                                <Filter className="w-5 h-5" />
                                <span>Filters</span>
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price">Sort by Price</option>
                                <option value="stock">Sort by Stock</option>
                                <option value="category">Sort by Category</option>
                            </select>

                            <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-3 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-3 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    <div className={`w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
                            <h3 className="font-bold text-black mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${selectedCategory === category.id ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-black">Filters</h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000])}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.inStock}
                                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                                        className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                    />
                                    <span className="text-sm text-gray-700">In Stock Only</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.featured}
                                        onChange={(e) => handleFilterChange('featured', e.target.checked)}
                                        className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                    />
                                    <span className="text-sm text-gray-700">Featured Products</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.active}
                                        onChange={(e) => handleFilterChange('active', e.target.checked)}
                                        className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                    />
                                    <span className="text-sm text-gray-700">Active Products Only</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-black">
                                    {selectedCategory === 'all' ? 'All Products' : selectedCategory}
                                </h1>
                                <p className="text-gray-600">
                                    {filteredProducts.length} products found
                                </p>
                            </div>
                        </div>

                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-600 transition-all duration-300 group"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="w-16 h-16 text-gray-300" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                                {product.availableStock === 0 && (
                                                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                                                        Out of Stock
                                                    </span>
                                                )}
                                                {product.isFeatured && (
                                                    <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="bg-white p-2 rounded-xl shadow-lg hover:bg-gray-50"
                                                >
                                                    <Eye className="w-5 h-5 text-gray-700" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="text-red-600 text-sm font-semibold mb-1">{product.category}</div>
                                            <h3 className="text-lg font-bold mb-2 text-black group-hover:text-red-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <div className="text-2xl font-bold text-red-600">
                                                        ${product.packageInfo.unitPrice}
                                                    </div>
                                                    <div className="text-gray-500 text-sm">
                                                        {product.packageInfo.itemsPerPackage} items/pkg
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600">SKU: {product.sku}</div>
                                                    <div className={`text-sm font-semibold ${product.availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {product.availableStock > 0 ? `${product.availableStock} in stock` : 'Out of stock'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 font-bold rounded-xl transition-colors text-sm"
                                                >
                                                    View Details
                                                </button>
                                                <button className="p-2 border border-gray-300 hover:border-red-600 hover:text-red-600 rounded-xl transition-colors">
                                                    <Heart className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredProducts.map(product => (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-600 transition-all duration-300 p-6"
                                    >
                                        <div className="flex gap-6">
                                            <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package className="w-12 h-12 text-gray-300" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="text-red-600 text-sm font-semibold mb-1">
                                                            {product.category} • {product.sku}
                                                            {product.isFeatured && (
                                                                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                                                    Featured
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-xl font-bold mb-2 text-black">{product.name}</h3>
                                                        <p className="text-gray-600 mb-4">{product.description}</p>

                                                        <div className="flex items-center space-x-6">
                                                            <div>
                                                                <div className="text-sm text-gray-600">Unit Price</div>
                                                                <div className="text-2xl font-bold text-red-600">
                                                                    ${product.packageInfo.unitPrice}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-600">Items/Package</div>
                                                                <div className="text-lg font-bold text-black">
                                                                    {product.packageInfo.itemsPerPackage}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-600">Stock</div>
                                                                <div className={`text-lg font-bold ${product.availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {product.availableStock > 0 ? product.availableStock : 'Out of Stock'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col space-y-2 ml-6">
                                                        <button
                                                            onClick={() => setSelectedProduct(product)}
                                                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 font-bold rounded-xl transition-colors"
                                                        >
                                                            View Details
                                                        </button>
                                                        <button className="border border-gray-300 hover:border-red-600 hover:text-red-600 py-2 px-6 font-bold rounded-xl transition-colors">
                                                            Add to Favorites
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold rounded-xl transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default VenumProductCatalog;