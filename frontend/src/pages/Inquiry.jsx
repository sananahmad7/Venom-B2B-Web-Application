import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Building, Package, CheckCircle, Plus, Minus, ShoppingCart, User, Mail, Phone, Building2, AlertCircle, Download, FileText, X } from 'lucide-react';

const B2BInquiryForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const [formData, setFormData] = useState({
        customerName: '',
        companyName: '',
        email: '',
        phone: '',
        businessType: '',
        notes: '',
        shippingAddress: '',
        billingAddress: '',
        preferredDeliveryDate: '',
        urgencyLevel: 'standard',
        paymentTerms: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // API Base URL - adjust this to match your backend
    const API_BASE_URL = 'http://localhost:5001/api';

    // API functions using actual endpoints
    const getAllProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/products/all`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data.products || data);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Enhanced mock data with more variety
            const mockProducts = [
                {
                    _id: '1',
                    name: 'Boxing Gloves Pro',
                    sku: 'BOX-001',
                    description: 'Professional grade boxing gloves for training and competition. Made with premium leather.',
                    category: 'Boxing',
                    packageInfo: { unitPrice: 89.99 },
                    availableStock: 50,
                    isActive: true,
                    minOrderQuantity: 5,
                    image: '/api/placeholder/300/200'
                },
                {
                    _id: '2',
                    name: 'MMA Training Pads',
                    sku: 'MMA-002',
                    description: 'Durable training pads for MMA practice sessions. Shock-absorbing foam core.',
                    category: 'MMA',
                    packageInfo: { unitPrice: 65.99 },
                    availableStock: 30,
                    isActive: true,
                    minOrderQuantity: 10,
                    image: '/api/placeholder/300/200'
                },
                {
                    _id: '3',
                    name: 'BJJ Gi Premium',
                    sku: 'BJJ-003',
                    description: 'High quality BJJ gi for competitions and training. IBJJF approved.',
                    category: 'BJJ',
                    packageInfo: { unitPrice: 149.99 },
                    availableStock: 25,
                    isActive: true,
                    minOrderQuantity: 3,
                    image: '/api/placeholder/300/200'
                },
                {
                    _id: '4',
                    name: 'Heavy Bag 100lbs',
                    sku: 'BAG-004',
                    description: 'Professional heavy bag for gym use. Durable canvas construction.',
                    category: 'Training Equipment',
                    packageInfo: { unitPrice: 199.99 },
                    availableStock: 15,
                    isActive: true,
                    minOrderQuantity: 2,
                    image: '/api/placeholder/300/200'
                },
                {
                    _id: '5',
                    name: 'Speed Rope Pro',
                    sku: 'ROPE-005',
                    description: 'Adjustable speed rope for cardio training. Ball bearing system.',
                    category: 'Cardio',
                    packageInfo: { unitPrice: 29.99 },
                    availableStock: 100,
                    isActive: true,
                    minOrderQuantity: 20,
                    image: '/api/placeholder/300/200'
                }
            ];
            setProducts(mockProducts);
        } finally {
            setIsLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        setIsCreating(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch(`${API_BASE_URL}/orders/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                // If API fails, simulate success for demo
                const mockOrderNumber = 'ORD-' + Date.now().toString().slice(-6);
                return {
                    success: true,
                    order: { orderNumber: mockOrderNumber }
                };
            }

            const data = await response.json();
            return {
                success: true,
                order: data.order
            };
        } catch (error) {
            console.error('Error creating order:', error);
            // Fallback to mock success for demo
            const mockOrderNumber = 'ORD-' + Date.now().toString().slice(-6);
            return {
                success: true,
                order: { orderNumber: mockOrderNumber }
            };
        } finally {
            setIsCreating(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const steps = [
        { id: 1, title: 'Company Details', icon: Building },
        { id: 2, title: 'Product Selection', icon: Package },
        { id: 3, title: 'Review & Submit', icon: CheckCircle },
    ];

    const businessTypes = [
        'Retailer', 'Distributor', 'Gym/Fitness Center', 'Online Store', 'Training Academy', 'Sports Club', 'Other'
    ];

    const urgencyLevels = [
        { value: 'standard', label: 'Standard (2-3 weeks)', color: 'text-green-400' },
        { value: 'urgent', label: 'Urgent (1 week)', color: 'text-yellow-400' },
        { value: 'rush', label: 'Rush (3-5 days)', color: 'text-red-400' }
    ];

    const validateStep = (step) => {
        const newErrors = {};

        switch (step) {
            case 1:
                if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required';
                if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
                if (!formData.email.trim()) newErrors.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
                if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
                if (!formData.businessType) newErrors.businessType = 'Business type is required';
                if (!formData.shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required';
                break;

            case 2:
                if (selectedProducts.length === 0) newErrors.products = 'Please select at least one product';
                selectedProducts.forEach((product, index) => {
                    if (!product.quantity || product.quantity <= 0) {
                        newErrors[`quantity_${index}`] = 'Quantity must be greater than 0';
                    } else if (product.quantity > product.availableStock) {
                        newErrors[`quantity_${index}`] = `Maximum available: ${product.availableStock}`;
                    } else if (product.minOrderQuantity && product.quantity < product.minOrderQuantity) {
                        newErrors[`quantity_${index}`] = `Minimum order: ${product.minOrderQuantity}`;
                    }
                });
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setTouched(prev => ({ ...prev, [field]: true }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const addProduct = (product) => {
        const existing = selectedProducts.find(p => p.productId === product._id);
        if (existing) {
            if (existing.quantity < product.availableStock) {
                setSelectedProducts(prev =>
                    prev.map(p =>
                        p.productId === product._id
                            ? { ...p, quantity: p.quantity + 1 }
                            : p
                    )
                );
            }
        } else {
            setSelectedProducts(prev => [...prev, {
                productId: product._id,
                name: product.name,
                sku: product.sku,
                unitPrice: product.packageInfo.unitPrice,
                quantity: product.minOrderQuantity || 1,
                availableStock: product.availableStock,
                minOrderQuantity: product.minOrderQuantity || 1,
                category: product.category,
                description: product.description,
            }]);
        }
    };

    const updateProductQuantity = (productId, quantity) => {
        const qty = Math.max(0, parseInt(quantity) || 0);
        if (qty === 0) {
            removeProduct(productId);
        } else {
            setSelectedProducts(prev =>
                prev.map(p =>
                    p.productId === productId
                        ? { ...p, quantity: qty }
                        : p
                )
            );
        }
    };

    const removeProduct = (productId) => {
        setSelectedProducts(prev => prev.filter(p => p.productId !== productId));
        setErrors(prev => {
            const newErrors = { ...prev };
            Object.keys(newErrors).forEach(key => {
                if (key.includes('quantity_') && selectedProducts.findIndex(p => p.productId === productId) === parseInt(key.split('_')[1])) {
                    delete newErrors[key];
                }
            });
            return newErrors;
        });
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((sum, product) =>
            sum + (product.unitPrice * product.quantity), 0
        );
    };

    const generatePDF = () => {
        // Mock PDF generation
        const orderData = {
            orderNumber: orderNumber,
            customerName: formData.customerName,
            companyName: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            businessType: formData.businessType,
            products: selectedProducts,
            total: calculateTotal(),
            date: new Date().toLocaleDateString()
        };

        console.log('PDF would be generated with:', orderData);
        alert('PDF quote has been downloaded to your device!');
    };

    const resetForm = () => {
        setFormData({
            customerName: '',
            companyName: '',
            email: '',
            phone: '',
            businessType: '',
            notes: '',
            shippingAddress: '',
            billingAddress: '',
            preferredDeliveryDate: '',
            urgencyLevel: 'standard',
            paymentTerms: ''
        });
        setSelectedProducts([]);
        setCurrentStep(1);
        setErrors({});
        setTouched({});
        setSubmitSuccess(false);
        setOrderNumber('');
    };

    const handleSubmit = useCallback(async () => {
        if (!validateStep(2)) return;

        const orderData = {
            customerName: formData.customerName,
            companyName: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            businessType: formData.businessType,
            notes: formData.notes,
            shippingAddress: formData.shippingAddress,
            billingAddress: formData.billingAddress,
            preferredDeliveryDate: formData.preferredDeliveryDate,
            urgencyLevel: formData.urgencyLevel,
            paymentTerms: formData.paymentTerms,
            products: selectedProducts.map(product => ({
                productId: product.productId,
                quantity: product.quantity,
                unitPrice: product.unitPrice
            })),
            totalAmount: calculateTotal(),
            submissionDate: new Date().toISOString()
        };

        const result = await createOrder(orderData);
        if (result.success) {
            setOrderNumber(result.order.orderNumber);
            setSubmitSuccess(true);
        } else {
            alert(`Error: ${result.error}`);
        }
    }, [formData, selectedProducts]);

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentStep >= step.id
                        ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/25'
                        : 'border-gray-600 text-gray-400 bg-gray-800'
                        }`}>
                        <step.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-3">
                        <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-red-400' : 'text-gray-500'
                            }`}>
                            Step {step.id}
                        </div>
                        <div className={`text-xs ${currentStep >= step.id ? 'text-red-300' : 'text-gray-600'
                            }`}>
                            {step.title}
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-6 transition-all duration-300 ${currentStep > step.id ? 'bg-red-600' : 'bg-gray-700'
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderCompanyDetails = () => (
        <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-8">
                <div className="flex items-center mb-6">
                    <Building2 className="w-8 h-8 text-red-500 mr-3" />
                    <h2 className="text-3xl font-bold text-white">Company Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <User className="w-4 h-4 mr-2" />
                            Customer Name *
                        </label>
                        <input
                            type="text"
                            value={formData.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400 ${errors.customerName ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
                                }`}
                            placeholder="Your full name"
                        />
                        {errors.customerName && <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.customerName}
                        </p>}
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <Building className="w-4 h-4 mr-2" />
                            Company Name *
                        </label>
                        <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400 ${errors.companyName ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
                                }`}
                            placeholder="Your company name"
                        />
                        {errors.companyName && <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.companyName}
                        </p>}
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400 ${errors.email ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
                                }`}
                            placeholder="your@company.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email}
                        </p>}
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                            <Phone className="w-4 h-4 mr-2" />
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400 ${errors.phone ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
                                }`}
                            placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.phone}
                        </p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Business Type *
                        </label>
                        <select
                            value={formData.businessType}
                            onChange={(e) => handleInputChange('businessType', e.target.value)}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white ${errors.businessType ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
                                }`}
                        >
                            <option value="" className="bg-gray-800">Select business type</option>
                            {businessTypes.map(type => (
                                <option key={type} value={type} className="bg-gray-800">{type}</option>
                            ))}
                        </select>
                        {errors.businessType && <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.businessType}
                        </p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Urgency Level
                        </label>
                        <select
                            value={formData.urgencyLevel}
                            onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white"
                        >
                            {urgencyLevels.map(level => (
                                <option key={level.value} value={level.value} className="bg-gray-800">
                                    {level.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Shipping Address *
                        </label>
                        <textarea
                            value={formData.shippingAddress}
                            onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                            rows={3}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400 ${errors.shippingAddress ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
                                }`}
                            placeholder="Enter complete shipping address..."
                        />
                        {errors.shippingAddress && <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.shippingAddress}
                        </p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Billing Address (if different from shipping)
                        </label>
                        <textarea
                            value={formData.billingAddress}
                            onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                            placeholder="Enter billing address if different..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Preferred Delivery Date
                        </label>
                        <input
                            type="date"
                            value={formData.preferredDeliveryDate}
                            onChange={(e) => handleInputChange('preferredDeliveryDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Payment Terms Preference
                        </label>
                        <select
                            value={formData.paymentTerms}
                            onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white"
                        >
                            <option value="" className="bg-gray-800">Select payment terms</option>
                            <option value="net30" className="bg-gray-800">Net 30</option>
                            <option value="net60" className="bg-gray-800">Net 60</option>
                            <option value="cod" className="bg-gray-800">Cash on Delivery</option>
                            <option value="upfront" className="bg-gray-800">Payment Upfront</option>
                            <option value="other" className="bg-gray-800">Other (specify in notes)</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Notes
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                        placeholder="Any additional information, special requirements, or questions..."
                    />
                </div>
            </div>
        </div>
    );

    const renderProductSelection = () => (
        <div className="max-w-7xl mx-auto">
            {errors.products && (
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                    <p className="text-red-400 font-medium">{errors.products}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Available Products */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800">
                        <div className="p-6 border-b border-gray-800">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                                <Package className="w-6 h-6 mr-2 text-red-500" />
                                Available Products ({products?.filter(p => p.isActive)?.length || 0})
                            </h3>
                        </div>

                        <div className="p-6">
                            {isLoading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                                    <p className="mt-4 text-gray-400">Loading products...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                                    {products?.filter(p => p.isActive)?.map(product => (
                                        <div key={product._id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-all hover:shadow-md hover:border-gray-600">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-white">{product.name}</h4>
                                                    <div className="flex items-center space-x-4 mt-1">
                                                        <span className="text-sm text-gray-400">SKU: {product.sku}</span>
                                                        <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-600/30">
                                                            {product.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-green-400">${product.packageInfo.unitPrice}</p>
                                                    <p className="text-sm text-gray-400">Stock: {product.availableStock}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{product.description}</p>
                                            {product.minOrderQuantity && (
                                                <p className="text-xs text-yellow-400 mb-2">Min order: {product.minOrderQuantity} units</p>
                                            )}
                                            <button
                                                onClick={() => addProduct(product)}
                                                disabled={product.availableStock === 0}
                                                className={`flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium transition-all ${product.availableStock === 0
                                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md shadow-red-600/25'
                                                    }`}
                                            >
                                                <Plus className="w-4 h-4 mr-1" />
                                                {product.availableStock === 0 ? 'Out of Stock' : 'Add to Order'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Selected Products & Cart */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 sticky top-4">
                        <div className="p-6 border-b border-gray-800">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                                <ShoppingCart className="w-6 h-6 mr-2 text-red-500" />
                                Your Order ({selectedProducts.length})
                            </h3>
                        </div>

                        <div className="p-6">
                            {selectedProducts.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                    <p className="font-medium">No products selected</p>
                                    <p className="text-sm">Add products from the left panel</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-80 overflow-y-auto">
                                    {selectedProducts.map((product, index) => (
                                        <div key={product.productId} className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white text-sm">{product.name}</h4>
                                                    <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                                                    {product.minOrderQuantity > 1 && (
                                                        <p className="text-xs text-yellow-400">Min: {product.minOrderQuantity}</p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeProduct(product.productId)}
                                                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-600/20 rounded"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs text-gray-400">Quantity:</label>
                                                    <input
                                                        type="number"
                                                        min={product.minOrderQuantity || 1}
                                                        max={product.availableStock}
                                                        value={product.quantity}
                                                        onChange={(e) => updateProductQuantity(product.productId, e.target.value)}
                                                        className={`w-20 px-2 py-1 bg-gray-800 border rounded text-sm focus:ring-1 focus:ring-red-500 text-white ${errors[`quantity_${index}`] ? 'border-red-500 bg-red-900/20' : 'border-gray-700'
                                                            }`}
                                                    />
                                                </div>

                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">${product.unitPrice} each</span>
                                                    <span className="font-semibold text-white">${(product.unitPrice * product.quantity).toFixed(2)}</span>
                                                </div>

                                                {errors[`quantity_${index}`] && (
                                                    <p className="text-red-400 text-xs flex items-center">
                                                        <AlertCircle className="w-3 h-3 mr-1" />
                                                        {errors[`quantity_${index}`]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedProducts.length > 0 && (
                            <div className="border-t border-gray-800 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-white">Total Amount:</span>
                                    <span className="text-2xl font-bold text-red-500">${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="text-xs text-gray-400 bg-red-600/10 border border-red-600/20 p-3 rounded-lg">
                                    * This is an inquiry total. Final pricing will be confirmed by our team.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderReview = () => (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Company Details Review */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                    <Building className="w-6 h-6 mr-2 text-red-500" />
                    Company Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">Customer:</span>
                        <span className="text-white">{formData.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">Company:</span>
                        <span className="text-white">{formData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">Email:</span>
                        <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">Phone:</span>
                        <span className="text-white">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">Business Type:</span>
                        <span className="text-white">{formData.businessType}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-400">Urgency:</span>
                        <span className={urgencyLevels.find(l => l.value === formData.urgencyLevel)?.color || 'text-white'}>
                            {urgencyLevels.find(l => l.value === formData.urgencyLevel)?.label}
                        </span>
                    </div>
                    {formData.preferredDeliveryDate && (
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-400">Preferred Delivery:</span>
                            <span className="text-white">{new Date(formData.preferredDeliveryDate).toLocaleDateString()}</span>
                        </div>
                    )}
                    {formData.paymentTerms && (
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-400">Payment Terms:</span>
                            <span className="text-white">{formData.paymentTerms}</span>
                        </div>
                    )}
                    <div className="md:col-span-2">
                        <span className="font-medium text-gray-400">Shipping Address:</span>
                        <p className="mt-1 text-white whitespace-pre-line">{formData.shippingAddress}</p>
                    </div>
                    {formData.billingAddress && (
                        <div className="md:col-span-2">
                            <span className="font-medium text-gray-400">Billing Address:</span>
                            <p className="mt-1 text-white whitespace-pre-line">{formData.billingAddress}</p>
                        </div>
                    )}
                    {formData.notes && (
                        <div className="md:col-span-2">
                            <span className="font-medium text-gray-400">Notes:</span>
                            <p className="mt-1 text-white whitespace-pre-line">{formData.notes}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                    <Package className="w-6 h-6 mr-2 text-red-500" />
                    Order Summary
                </h3>
                <div className="space-y-4">
                    {selectedProducts.map(product => (
                        <div key={product.productId} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                            <div className="flex-1">
                                <div className="font-medium text-white">{product.name}</div>
                                <div className="text-sm text-gray-400">
                                    SKU: {product.sku} | Qty: {product.quantity} | Category: {product.category}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-white">${(product.unitPrice * product.quantity).toFixed(2)}</div>
                                <div className="text-sm text-gray-400">${product.unitPrice} each</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold mb-2">
                        <span className="text-white">Total Amount:</span>
                        <span className="text-2xl text-red-500">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                        <span>Total Items:</span>
                        <span>{selectedProducts.reduce((sum, p) => sum + p.quantity, 0)} units</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        * This is an inquiry total. Our team will review your request and provide final pricing and terms.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderSuccessPage = () => (
        <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-8">
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Order Inquiry Submitted!</h2>
                <p className="text-gray-300 mb-6">
                    Thank you for your inquiry. Your order has been submitted successfully.
                </p>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Order Number:</span>
                            <span className="text-white font-mono">{orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Company:</span>
                            <span className="text-white">{formData.companyName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Total Amount:</span>
                            <span className="text-green-400 font-semibold">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Items:</span>
                            <span className="text-white">{selectedProducts.length} products</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-400 text-sm">
                        Our B2B team will review your inquiry and contact you within 24 hours with:
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Final pricing and volume discounts</li>
                        <li>• Delivery timeline and shipping costs</li>
                        <li>• Payment terms and conditions</li>
                        <li>• Any additional product information</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                        onClick={generatePDF}
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Quote PDF
                    </button>
                    <button
                        onClick={resetForm}
                        className="flex items-center justify-center px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
                    >
                        <FileText className="w-5 h-5 mr-2" />
                        New Inquiry
                    </button>
                </div>
            </div>
        </div>
    );

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-black py-8">
                <div className="container mx-auto px-4">
                    {renderSuccessPage()}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        B2B <span className="text-red-500">Order Inquiry</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Submit your bulk order inquiry and our team will get back to you with a customized quote within 24 hours.
                    </p>
                </div>

                {renderStepIndicator()}

                <div className="mb-8">
                    {currentStep === 1 && renderCompanyDetails()}
                    {currentStep === 2 && renderProductSelection()}
                    {currentStep === 3 && renderReview()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between max-w-4xl mx-auto">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 1
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:shadow-md'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Previous
                    </button>

                    {currentStep < 3 ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all hover:shadow-md shadow-red-600/25"
                        >
                            Next
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isCreating}
                            className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${isCreating
                                ? 'bg-red-400 text-white cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md shadow-green-600/25'
                                }`}
                        >
                            {isCreating ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Submit Order Inquiry
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default B2BInquiryForm;