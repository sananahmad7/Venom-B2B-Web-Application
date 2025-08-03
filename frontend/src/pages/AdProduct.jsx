import React, { useState } from 'react';
import { Plus, Package, Upload, Star, Trash2, Edit } from 'lucide-react';

const AdProduct = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        packagePrice: '',
        itemsPerPackage: '',
        minimumOrderQuantity: '',
        availableStock: '',
        sku: ''
    });

    // Filler data - will be replaced with backend state
    const products = [
        {
            _id: '1',
            name: 'Professional Boxing Gloves Package',
            sku: 'VEN-BOX-001',
            category: 'Boxing',
            packageInfo: {
                itemsPerPackage: 12,
                unitPrice: 89.99
            },
            minimumOrderQuantity: 5,
            availableStock: 250,
            images: [{ url: '/api/placeholder/60/60', isPrimary: true }],
            isActive: true,
            isFeatured: true
        },
        {
            _id: '2',
            name: 'MMA Training Pads Set',
            sku: 'VEN-MMA-002',
            category: 'MMA',
            packageInfo: {
                itemsPerPackage: 8,
                unitPrice: 124.99
            },
            minimumOrderQuantity: 3,
            availableStock: 180,
            images: [{ url: '/api/placeholder/60/60', isPrimary: true }],
            isActive: true,
            isFeatured: false
        },
        {
            _id: '3',
            name: 'BJJ Gi Bundle',
            sku: 'VEN-BJJ-003',
            category: 'BJJ',
            packageInfo: {
                itemsPerPackage: 6,
                unitPrice: 199.99
            },
            minimumOrderQuantity: 2,
            availableStock: 95,
            images: [{ url: '/api/placeholder/60/60', isPrimary: true }],
            isActive: true,
            isFeatured: true
        },
        {
            _id: '4',
            name: 'Muay Thai Shin Guards Pack',
            sku: 'VEN-MT-004',
            category: 'Muay Thai',
            packageInfo: {
                itemsPerPackage: 10,
                unitPrice: 79.99
            },
            minimumOrderQuantity: 4,
            availableStock: 320,
            images: [{ url: '/api/placeholder/60/60', isPrimary: true }],
            isActive: true,
            isFeatured: false
        },
        {
            _id: '5',
            name: 'Training Equipment Bundle',
            sku: 'VEN-TRN-005',
            category: 'Training',
            packageInfo: {
                itemsPerPackage: 15,
                unitPrice: 149.99
            },
            minimumOrderQuantity: 3,
            availableStock: 150,
            images: [{ url: '/api/placeholder/60/60', isPrimary: true }],
            isActive: false,
            isFeatured: true
        }
    ];

    const categories = ['Boxing', 'MMA', 'BJJ', 'Muay Thai', 'Training', 'Apparel'];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission - will connect to backend API
        console.log('Product data:', formData);
    };

    const CreateProductForm = () => (
        <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-8 text-center">Create New Product</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        placeholder="e.g., Professional Boxing Gloves Package"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">SKU</label>
                    <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        placeholder="e.g., VEN-BOX-001"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                        placeholder="Professional grade boxing gloves with premium leather construction..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Package Price ($)</label>
                        <input
                            type="number"
                            name="packagePrice"
                            value={formData.packagePrice}
                            onChange={handleInputChange}
                            step="0.01"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            placeholder="89.99"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Items Per Package</label>
                        <input
                            type="number"
                            name="itemsPerPackage"
                            value={formData.itemsPerPackage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            placeholder="12"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Minimum Order (Packages)</label>
                        <input
                            type="number"
                            name="minimumOrderQuantity"
                            value={formData.minimumOrderQuantity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            placeholder="5"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Available Stock (Packages)</label>
                        <input
                            type="number"
                            name="availableStock"
                            value={formData.availableStock}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            placeholder="250"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-4">Product Image</label>
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:border-red-500 transition-colors"
                    >
                        <Upload size={20} />
                        Upload Image
                    </button>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Create Product
                </button>
            </div>
        </div>
    );

    const ProductsList = () => (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price/Package</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">MOQ</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Featured</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                            src={product.images[0].url}
                                            alt={product.name}
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-600">{product.sku}</div>
                                            <div className="text-xs text-gray-500">{product.packageInfo.itemsPerPackage} items/package</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-red-600">${product.packageInfo.unitPrice}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{product.availableStock} packages</div>
                                    <div className="text-xs text-gray-500">{product.availableStock * product.packageInfo.itemsPerPackage} total items</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {product.minimumOrderQuantity} packages
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className={`p-1 rounded ${product.isFeatured ? 'text-yellow-500' : 'text-gray-400'}`}>
                                        <Star size={18} fill={product.isFeatured ? 'currentColor' : 'none'} />
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'create'
                                ? 'bg-red-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        <Plus size={20} />
                        Create Product
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'products'
                                ? 'bg-red-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                    >
                        <Package size={20} />
                        Products
                    </button>
                </div>

                {activeTab === 'create' && <CreateProductForm />}
                {activeTab === 'products' && <ProductsList />}
            </div>
        </div>
    );
};

export default AdProduct;