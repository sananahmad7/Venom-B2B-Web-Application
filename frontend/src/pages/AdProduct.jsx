import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Package, Upload, Star, Trash2, Edit, Loader2 } from 'lucide-react';
import useProductStore from '../store/useProductStore';

// Move CreateProductForm outside of the main component
const CreateProductForm = React.memo(({
    formData,
    handleInputChange,
    handleSubmit,
    isCreating,
    categories
}) => (
    <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-8 text-center">Create New Product</h2>

        <div className="space-y-6">
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    Product Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    placeholder="e.g., Professional Boxing Gloves Package"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    SKU <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    placeholder="e.g., VEN-BOX-001"
                    required
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
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Package Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="packagePrice"
                        value={formData.packagePrice}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        placeholder="89.99"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Items Per Package <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="itemsPerPackage"
                        value={formData.itemsPerPackage}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        placeholder="12"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Available Stock (Packages)</label>
                <input
                    type="number"
                    name="availableStock"
                    value={formData.availableStock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    placeholder="250"
                />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    required
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
                    disabled
                >
                    <Upload size={20} />
                    Upload Image (Coming Soon)
                </button>
            </div>

            <button
                onClick={handleSubmit}
                disabled={isCreating}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                {isCreating ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        Creating Product...
                    </>
                ) : (
                    <>
                        <Plus size={20} />
                        Create Product
                    </>
                )}
            </button>
        </div>
    </div>
));

// Move ProductsList outside as well
const ProductsList = React.memo(({
    products,
    isLoading,
    setActiveTab,
    handleDelete,
    handleToggleFeatured
}) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        {isLoading ? (
            <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-red-600" />
                <span className="ml-2 text-gray-600">Loading products...</span>
            </div>
        ) : products.length === 0 ? (
            <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Get started by creating your first product.</p>
                <button
                    onClick={() => setActiveTab('create')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Create Product
                </button>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price/Package</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Featured</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center border border-gray-300">
                                            <Package size={24} className="text-gray-500" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-600">{product.sku}</div>
                                            <div className="text-xs text-gray-500">{product.packageInfo.itemsPerPackage} items/package</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-red-600">${product.packageInfo.unitPrice}</div>
                                    <div className="text-xs text-gray-500">
                                        ${(product.packageInfo.unitPrice / product.packageInfo.itemsPerPackage).toFixed(2)} per item
                                    </div>
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
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleToggleFeatured(product._id)}
                                        className={`p-1 rounded transition-colors ${product.isFeatured ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        <Star size={18} fill={product.isFeatured ? 'currentColor' : 'none'} />
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                            title="Edit Product"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            title="Delete Product"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
));

const AdProduct = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        packagePrice: '',
        itemsPerPackage: '',
        availableStock: '',
        sku: ''
    });

    const {
        products,
        isLoading,
        isCreating,
        createProduct,
        getAllProducts,
        deleteProduct,
        toggleFeatured
    } = useProductStore();

    const categories = ['Boxing', 'MMA', 'BJJ', 'Muay Thai', 'Training', 'Apparel'];

    // Fetch products on component mount
    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    // Memoize event handlers to prevent unnecessary re-renders
    const handleInputChange = useCallback((e) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.sku || !formData.category || !formData.packagePrice || !formData.itemsPerPackage) {
            return alert("Please fill all required fields");
        }

        if (parseFloat(formData.packagePrice) <= 0) {
            return alert("Package price must be greater than 0");
        }

        if (parseInt(formData.itemsPerPackage) <= 0) {
            return alert("Items per package must be greater than 0");
        }

        const productData = {
            name: formData.name,
            sku: formData.sku.toUpperCase(),
            description: formData.description,
            category: formData.category,
            packageInfo: {
                itemsPerPackage: parseInt(formData.itemsPerPackage),
                unitPrice: parseFloat(formData.packagePrice),
            },
            availableStock: parseInt(formData.availableStock) || 0,
        };

        const success = await createProduct(productData);
        if (success) {
            // Reset form
            setFormData({
                name: '',
                description: '',
                category: '',
                packagePrice: '',
                itemsPerPackage: '',
                availableStock: '',
                sku: ''
            });
            // Switch to products tab
            setActiveTab('products');
        }
    }, [formData, createProduct, setActiveTab]);

    const handleDelete = useCallback(async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
        }
    }, [deleteProduct]);

    const handleToggleFeatured = useCallback(async (productId) => {
        await toggleFeatured(productId);
    }, [toggleFeatured]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
                    <p className="text-gray-600">Manage your B2B product catalog</p>
                </div>

                {/* Navigation Tabs */}
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
                        Products ({products.length})
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'create' && (
                    <CreateProductForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        isCreating={isCreating}
                        categories={categories}
                    />
                )}
                {activeTab === 'products' && (
                    <ProductsList
                        products={products}
                        isLoading={isLoading}
                        setActiveTab={setActiveTab}
                        handleDelete={handleDelete}
                        handleToggleFeatured={handleToggleFeatured}
                    />
                )}
            </div>
        </div>
    );
};

export default AdProduct;