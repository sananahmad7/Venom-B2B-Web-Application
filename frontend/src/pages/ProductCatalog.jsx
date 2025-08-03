import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown, ChevronRight, Star, Package, AlertCircle, Eye, Heart, ShoppingCart, ArrowLeft, ArrowRight, X, Plus, Minus } from 'lucide-react';

const VenumProductCatalog = () => {
    // STATE MANAGEMENT
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [sortBy, setSortBy] = useState('name');

    // FILTERS STATE
    const [filters, setFilters] = useState({
        priceRange: [0, 1000],
        materials: [],
        sizes: [],
        colors: [],
        sports: [],
        inStock: false
    });

    // BREADCRUMB STATE
    const [breadcrumbs, setBreadcrumbs] = useState([
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/products' }
    ]);

    // MOCK DATA - Replace this entire section with backend JSON response
    const productData = {
        categories: [
            {
                id: 'boxing',
                name: 'Boxing',
                subcategories: [
                    { id: 'gloves', name: 'Boxing Gloves' },
                    { id: 'bags', name: 'Heavy Bags' },
                    { id: 'pads', name: 'Focus Pads' },
                    { id: 'apparel', name: 'Boxing Apparel' }
                ]
            },
            {
                id: 'mma',
                name: 'MMA',
                subcategories: [
                    { id: 'gloves', name: 'MMA Gloves' },
                    { id: 'shorts', name: 'Fight Shorts' },
                    { id: 'rash-guards', name: 'Rash Guards' },
                    { id: 'gear', name: 'Training Gear' }
                ]
            },
            {
                id: 'bjj',
                name: 'BJJ',
                subcategories: [
                    { id: 'gis', name: 'BJJ Gis' },
                    { id: 'belts', name: 'Belts' },
                    { id: 'rash-guards', name: 'Rash Guards' },
                    { id: 'shorts', name: 'Grappling Shorts' }
                ]
            },
            {
                id: 'muay-thai',
                name: 'Muay Thai',
                subcategories: [
                    { id: 'gloves', name: 'Muay Thai Gloves' },
                    { id: 'pads', name: 'Thai Pads' },
                    { id: 'shorts', name: 'Muay Thai Shorts' },
                    { id: 'shin-guards', name: 'Shin Guards' }
                ]
            }
        ],
        products: [
            {
                id: 1,
                name: 'Elite Boxing Gloves Pro',
                category: 'boxing',
                subcategory: 'gloves',
                sport: 'Boxing',
                brand: 'Venum',
                sku: 'VEN-BOX-001',
                description: 'Professional grade boxing gloves with premium leather construction and advanced padding technology.',
                images: [
                    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1566884253880-c6b1c3cb7b38?w=600&h=600&fit=crop&crop=center'
                ],
                pricing: {
                    retail: 129.99,
                    tiers: [
                        { quantity: '1-49', price: 89.99 },
                        { quantity: '50-99', price: 79.99 },
                        { quantity: '100+', price: 69.99 }
                    ]
                },
                moq: 50,
                stock: 250,
                inStock: true,
                rating: 4.8,
                reviews: 156,
                materials: ['Genuine Leather', 'High-density Foam'],
                sizes: ['8oz', '10oz', '12oz', '14oz', '16oz'],
                colors: ['Black', 'Red', 'White', 'Blue'],
                features: ['Hook & Loop Closure', 'Reinforced Stitching', 'Moisture-Wicking Lining'],
                tags: ['professional', 'training', 'sparring']
            },
            {
                id: 2,
                name: 'Professional MMA Gloves',
                category: 'mma',
                subcategory: 'gloves',
                sport: 'MMA',
                brand: 'Venum',
                sku: 'VEN-MMA-002',
                description: 'Open-finger MMA gloves designed for professional competition and training.',
                images: [
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=600&fit=crop&crop=center'
                ],
                pricing: {
                    retail: 89.99,
                    tiers: [
                        { quantity: '1-24', price: 59.99 },
                        { quantity: '25-49', price: 54.99 },
                        { quantity: '50+', price: 49.99 }
                    ]
                },
                moq: 25,
                stock: 180,
                inStock: true,
                rating: 4.7,
                reviews: 89,
                materials: ['Synthetic Leather', 'EVA Foam'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Black', 'Red', 'Blue'],
                features: ['Open Finger Design', 'Adjustable Straps', 'Flexible Construction'],
                tags: ['competition', 'training', 'grappling']
            },
            {
                id: 3,
                name: 'Premium BJJ Gi',
                category: 'bjj',
                subcategory: 'gis',
                sport: 'BJJ',
                brand: 'Venum',
                sku: 'VEN-BJJ-003',
                description: 'Competition-grade BJJ Gi made from premium pearl weave cotton.',
                images: [
                    'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop&crop=center'
                ],
                pricing: {
                    retail: 179.99,
                    tiers: [
                        { quantity: '1-19', price: 119.99 },
                        { quantity: '20-39', price: 109.99 },
                        { quantity: '40+', price: 99.99 }
                    ]
                },
                moq: 20,
                stock: 95,
                inStock: true,
                rating: 4.9,
                reviews: 234,
                materials: ['Pearl Weave Cotton', 'Ripstop Pants'],
                sizes: ['A0', 'A1', 'A2', 'A3', 'A4'],
                colors: ['White', 'Blue', 'Black'],
                features: ['IBJJF Approved', 'Pre-shrunk', 'Reinforced Stress Points'],
                tags: ['competition', 'training', 'premium']
            },
            {
                id: 4,
                name: 'Muay Thai Training Gloves',
                category: 'muay-thai',
                subcategory: 'gloves',
                sport: 'Muay Thai',
                brand: 'Venum',
                sku: 'VEN-MT-004',
                description: 'Traditional Muay Thai gloves with authentic Thai craftsmanship.',
                images: [
                    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=600&fit=crop&crop=center'
                ],
                pricing: {
                    retail: 109.99,
                    tiers: [
                        { quantity: '1-29', price: 74.99 },
                        { quantity: '30-59', price: 69.99 },
                        { quantity: '60+', price: 64.99 }
                    ]
                },
                moq: 30,
                stock: 0,
                inStock: false,
                rating: 4.6,
                reviews: 67,
                materials: ['Thai Leather', 'Multi-layer Foam'],
                sizes: ['8oz', '10oz', '12oz', '14oz', '16oz'],
                colors: ['Gold', 'Red', 'Black', 'Blue'],
                features: ['Traditional Design', 'Hand Stitched', 'Velcro Closure'],
                tags: ['traditional', 'training', 'authentic']
            },
            {
                id: 5,
                name: 'Elite Training Shorts',
                category: 'mma',
                subcategory: 'shorts',
                sport: 'MMA',
                brand: 'Venum',
                sku: 'VEN-MMA-005',
                description: 'High-performance fight shorts with 4-way stretch fabric.',
                images: [
                    'https://images.unsplash.com/photo-1566884253880-c6b1c3cb7b38?w=600&h=600&fit=crop&crop=center'
                ],
                pricing: {
                    retail: 69.99,
                    tiers: [
                        { quantity: '1-49', price: 44.99 },
                        { quantity: '50-99', price: 39.99 },
                        { quantity: '100+', price: 34.99 }
                    ]
                },
                moq: 50,
                stock: 320,
                inStock: true,
                rating: 4.5,
                reviews: 123,
                materials: ['Polyester Blend', '4-Way Stretch'],
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                colors: ['Black', 'Navy', 'Red', 'Camo'],
                features: ['Side Slits', 'Reinforced Seams', 'Quick Dry'],
                tags: ['training', 'competition', 'flexible']
            },
            {
                id: 6,
                name: 'Heavy Training Bag',
                category: 'boxing',
                subcategory: 'bags',
                sport: 'Boxing',
                brand: 'Venum',
                sku: 'VEN-BOX-006',
                description: 'Professional heavy bag for gym and home training.',
                images: [
                    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop&crop=center'
                ],
                pricing: {
                    retail: 249.99,
                    tiers: [
                        { quantity: '1-9', price: 179.99 },
                        { quantity: '10-19', price: 164.99 },
                        { quantity: '20+', price: 149.99 }
                    ]
                },
                moq: 10,
                stock: 45,
                inStock: true,
                rating: 4.8,
                reviews: 78,
                materials: ['Synthetic Leather', 'Textile Filling'],
                sizes: ['100lbs', '120lbs', '150lbs'],
                colors: ['Black', 'Red'],
                features: ['Reinforced Chains', 'Double Stitching', 'Shock Absorbing'],
                tags: ['training', 'gym', 'heavy-duty']
            }
        ],
        filterOptions: {
            materials: ['Genuine Leather', 'Synthetic Leather', 'Thai Leather', 'Pearl Weave Cotton', 'Polyester Blend', 'High-density Foam', 'EVA Foam', 'Multi-layer Foam'],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '8oz', '10oz', '12oz', '14oz', '16oz', 'A0', 'A1', 'A2', 'A3', 'A4', '100lbs', '120lbs', '150lbs'],
            colors: ['Black', 'White', 'Red', 'Blue', 'Gold', 'Navy', 'Camo'],
            sports: ['Boxing', 'MMA', 'BJJ', 'Muay Thai']
        }
    };

    // FILTERED AND SORTED PRODUCTS
    const filteredProducts = useMemo(() => {
        let filtered = productData.products;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Subcategory filter
        if (selectedSubcategory !== 'all') {
            filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
        }

        // Price filter
        filtered = filtered.filter(product => {
            const price = product.pricing.tiers[0].price;
            return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        });

        // Material filter
        if (filters.materials.length > 0) {
            filtered = filtered.filter(product =>
                filters.materials.some(material =>
                    product.materials.includes(material)
                )
            );
        }

        // Size filter
        if (filters.sizes.length > 0) {
            filtered = filtered.filter(product =>
                filters.sizes.some(size =>
                    product.sizes.includes(size)
                )
            );
        }

        // Color filter
        if (filters.colors.length > 0) {
            filtered = filtered.filter(product =>
                filters.colors.some(color =>
                    product.colors.includes(color)
                )
            );
        }

        // Sport filter
        if (filters.sports.length > 0) {
            filtered = filtered.filter(product =>
                filters.sports.includes(product.sport)
            );
        }

        // Stock filter
        if (filters.inStock) {
            filtered = filtered.filter(product => product.inStock);
        }

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price':
                    return a.pricing.tiers[0].price - b.pricing.tiers[0].price;
                case 'rating':
                    return b.rating - a.rating;
                case 'stock':
                    return b.stock - a.stock;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchQuery, selectedCategory, selectedSubcategory, filters, sortBy, productData.products]);

    // FILTER HANDLERS
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: Array.isArray(prev[filterType])
                ? prev[filterType].includes(value)
                    ? prev[filterType].filter(item => item !== value)
                    : [...prev[filterType], value]
                : value
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            priceRange: [0, 1000],
            materials: [],
            sizes: [],
            colors: [],
            sports: [],
            inStock: false
        });
        setSelectedCategory('all');
        setSelectedSubcategory('all');
        setSearchQuery('');
    };

    // BREADCRUMB HANDLER
    useEffect(() => {
        let newBreadcrumbs = [
            { label: 'Home', path: '/' },
            { label: 'Products', path: '/products' }
        ];

        if (selectedCategory !== 'all') {
            const category = productData.categories.find(cat => cat.id === selectedCategory);
            if (category) {
                newBreadcrumbs.push({ label: category.name, path: `/products/${category.id}` });
            }
        }

        if (selectedSubcategory !== 'all') {
            const category = productData.categories.find(cat => cat.id === selectedCategory);
            const subcategory = category?.subcategories.find(sub => sub.id === selectedSubcategory);
            if (subcategory) {
                newBreadcrumbs.push({ label: subcategory.name, path: `/products/${selectedCategory}/${subcategory.id}` });
            }
        }

        setBreadcrumbs(newBreadcrumbs);
    }, [selectedCategory, selectedSubcategory]);

    // Get current category's subcategories
    const currentSubcategories = selectedCategory !== 'all'
        ? productData.categories.find(cat => cat.id === selectedCategory)?.subcategories || []
        : [];

    // PRODUCT DETAIL MODAL
    const ProductDetailModal = ({ product, onClose }) => {
        if (!product) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-black">{product.name}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 grid lg:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div>
                            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex space-x-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${index === currentImageIndex ? 'border-red-600' : 'border-gray-200'
                                            }`}
                                    >
                                        <img src={image} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="mb-6">
                                <div className="text-red-600 font-semibold mb-2">{product.sport} • {product.sku}</div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">({product.reviews} reviews)</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Bulk Pricing */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <h3 className="font-bold text-black mb-4">Bulk Pricing Tiers</h3>
                                <div className="space-y-3">
                                    {product.pricing.tiers.map((tier, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-gray-600">{tier.quantity} units</span>
                                            <span className="font-bold text-red-600">${tier.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Retail Price</span>
                                        <span className="text-gray-400 line-through">${product.pricing.retail}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stock & MOQ */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-gray-600 text-sm">Minimum Order</div>
                                    <div className="text-xl font-bold text-black">{product.moq} units</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-gray-600 text-sm">Available Stock</div>
                                    <div className={`text-xl font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.inStock ? `${product.stock} units` : 'Out of Stock'}
                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-black mb-2">Available Sizes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map(size => (
                                            <span key={size} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">{size}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-black mb-2">Available Colors</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.colors.map(color => (
                                            <span key={color} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">{color}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-black mb-2">Materials</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.materials.map(material => (
                                            <span key={material} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">{material}</span>
                                        ))}
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* Breadcrumbs */}
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

                    {/* Search and Controls */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 max-w-md relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products, SKU, or keywords..."
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
                                <option value="rating">Sort by Rating</option>
                                <option value="stock">Sort by Stock</option>
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
                    {/* Sidebar */}
                    <div className={`w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        {/* Categories */}
                        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
                            <h3 className="font-bold text-black mb-4">Categories</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedSubcategory('all');
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${selectedCategory === 'all' ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    All Products
                                </button>
                                {productData.categories.map(category => (
                                    <div key={category.id}>
                                        <button
                                            onClick={() => {
                                                setSelectedCategory(category.id);
                                                setSelectedSubcategory('all');
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${selectedCategory === category.id ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {category.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${selectedCategory === category.id ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        {selectedCategory === category.id && (
                                            <div className="ml-4 mt-2 space-y-1">
                                                <button
                                                    onClick={() => setSelectedSubcategory('all')}
                                                    className={`w-full text-left px-3 py-1 rounded-lg text-sm transition-colors ${selectedSubcategory === 'all' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                                                        }`}
                                                >
                                                    All {category.name}
                                                </button>
                                                {category.subcategories.map(subcategory => (
                                                    <button
                                                        key={subcategory.id}
                                                        onClick={() => setSelectedSubcategory(subcategory.id)}
                                                        className={`w-full text-left px-3 py-1 rounded-lg text-sm transition-colors ${selectedSubcategory === subcategory.id ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {subcategory.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Advanced Filters */}
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

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                                        }))}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            priceRange: [prev.priceRange[0], parseInt(e.target.value) || 1000]
                                        }))}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                            </div>

                            {/* Materials */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Materials</h4>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {productData.filterOptions.materials.map(material => (
                                        <label key={material} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={filters.materials.includes(material)}
                                                onChange={() => handleFilterChange('materials', material)}
                                                className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                            <span className="text-sm text-gray-700">{material}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Sizes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {productData.filterOptions.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => handleFilterChange('sizes', size)}
                                            className={`px-3 py-1 text-sm rounded-lg border transition-colors ${filters.sizes.includes(size)
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-red-600'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Colors</h4>
                                <div className="flex flex-wrap gap-2">
                                    {productData.filterOptions.colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => handleFilterChange('colors', color)}
                                            className={`px-3 py-1 text-sm rounded-lg border transition-colors ${filters.colors.includes(color)
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-red-600'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sports */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Sports</h4>
                                <div className="space-y-2">
                                    {productData.filterOptions.sports.map(sport => (
                                        <label key={sport} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={filters.sports.includes(sport)}
                                                onChange={() => handleFilterChange('sports', sport)}
                                                className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                            <span className="text-sm text-gray-700">{sport}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* In Stock Only */}
                            <div>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.inStock}
                                        onChange={() => handleFilterChange('inStock', !filters.inStock)}
                                        className="rounded border-gray-300 text-red-600 focus:ring-red-600"
                                    />
                                    <span className="text-sm text-gray-700">In Stock Only</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-black">
                                    {selectedCategory === 'all' ? 'All Products' :
                                        productData.categories.find(cat => cat.id === selectedCategory)?.name}
                                </h1>
                                <p className="text-gray-600">
                                    {filteredProducts.length} products found
                                </p>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-600 transition-all duration-300 group"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                {!product.inStock && (
                                                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                                                        Out of Stock
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
                                            <div className="flex items-center space-x-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                                <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                                            </div>

                                            <div className="text-red-600 text-sm font-semibold mb-1">{product.sport}</div>
                                            <h3 className="text-lg font-bold mb-2 text-black group-hover:text-red-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <div className="text-2xl font-bold text-red-600">
                                                        ${product.pricing.tiers[0].price}
                                                    </div>
                                                    <div className="text-gray-400 text-sm line-through">
                                                        ${product.pricing.retail}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600">MOQ: {product.moq}</div>
                                                    <div className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                                        {product.inStock ? `${product.stock} in stock` : 'Out of stock'}
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
                                        key={product.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-600 transition-all duration-300 p-6"
                                    >
                                        <div className="flex gap-6">
                                            <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-1 mb-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                                                />
                                                            ))}
                                                            <span className="text-gray-500 text-sm ml-2">({product.reviews})</span>
                                                        </div>

                                                        <div className="text-red-600 text-sm font-semibold mb-1">{product.sport} • {product.sku}</div>
                                                        <h3 className="text-xl font-bold mb-2 text-black">{product.name}</h3>
                                                        <p className="text-gray-600 mb-4">{product.description}</p>

                                                        <div className="flex items-center space-x-6">
                                                            <div>
                                                                <div className="text-sm text-gray-600">Bulk Price</div>
                                                                <div className="text-2xl font-bold text-red-600">${product.pricing.tiers[0].price}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-600">MOQ</div>
                                                                <div className="text-lg font-bold text-black">{product.moq} units</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-600">Stock</div>
                                                                <div className={`text-lg font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {product.inStock ? product.stock : 'Out of Stock'}
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

                        {/* No Results */}
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

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => {
                        setSelectedProduct(null);
                        setCurrentImageIndex(0);
                    }}
                />
            )}
        </div>
    );
};

export default VenumProductCatalog;